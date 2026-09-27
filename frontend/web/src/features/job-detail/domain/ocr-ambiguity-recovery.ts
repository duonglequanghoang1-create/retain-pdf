import type {
  OcrAmbiguityReceiptField,
  OcrAmbiguityResolutionKind,
  OcrAmbiguityResolutionRequest,
  OcrAmbiguityResolutionView,
  OcrAmbiguityView,
} from "@/platform/api/index.js";
import { t } from "@retainpdf/i18n";

type LooseRecord = Record<string, any>;
export type OcrReceiptValues = Partial<Record<OcrAmbiguityReceiptField["name"], string>>;
export type OcrRecoveryOutcome = { ok: boolean; conflict: boolean };

const RECEIPT_FIELD_NAMES = new Set(["task_id", "batch_id", "upload_url", "trace_id"]);
const RESOLUTIONS = new Set(["bind_existing_receipt", "accept_duplicate_risk"]);

function asRecord(value: unknown): LooseRecord {
  return value && typeof value === "object" ? value as LooseRecord : {};
}

function unwrapJob(value: unknown): LooseRecord {
  const snapshot = asRecord(value);
  const job = asRecord(snapshot.job);
  const rawResponse = asRecord(job.raw_response || snapshot.raw_response);
  return { ...snapshot, ...rawResponse, ...job };
}

function normalizeReceiptField(value: unknown): OcrAmbiguityReceiptField | null {
  const field = asRecord(value);
  const name = `${field.name || ""}`.trim();
  if (!RECEIPT_FIELD_NAMES.has(name)) return null;
  return {
    name: name as OcrAmbiguityReceiptField["name"],
    label: `${field.label || name}`.trim(),
    required: field.required === true,
    secret: field.secret === true,
  };
}

export function readOcrAmbiguityView(value: unknown): OcrAmbiguityView | null {
  const job = unwrapJob(value);
  const diagnostics = asRecord(
    job.failure_diagnostic || job.failure_diagnostics || job.diagnostics,
  );
  const candidate = asRecord(job.ocr_ambiguity || diagnostics.ocr_ambiguity);
  const revision = Number(candidate.resolution_revision);
  if (
    candidate.status !== "ambiguous"
    || !["paddle", "mineru"].includes(`${candidate.provider || ""}`)
    || !Number.isSafeInteger(revision)
    || revision < 0
  ) return null;

  const receiptFields = Array.isArray(candidate.receipt_fields)
    ? candidate.receipt_fields.map(normalizeReceiptField).filter(Boolean)
    : [];
  const allowedResolutions = Array.isArray(candidate.allowed_resolutions)
    ? candidate.allowed_resolutions
      .map((item) => `${item || ""}`.trim())
      .filter((item) => RESOLUTIONS.has(item))
    : [];
  return {
    status: "ambiguous",
    provider: candidate.provider,
    operation: candidate.operation,
    resolution_revision: revision,
    allowed_resolutions: allowedResolutions as OcrAmbiguityResolutionKind[],
    receipt_fields: receiptFields as OcrAmbiguityReceiptField[],
  } as OcrAmbiguityView;
}

export function requiresOcrAmbiguityResolution(value: unknown): boolean {
  if (readOcrAmbiguityView(value)) return true;
  const job = unwrapJob(value);
  const failure = asRecord(job.failure);
  const diagnostic = asRecord(
    job.failure_diagnostic || job.failure_diagnostics || job.diagnostics,
  );
  return [
    failure.failure_code,
    failure.category,
    diagnostic.failure_code,
    diagnostic.category,
    job.final_failure_category,
  ].some((code) => `${code || ""}`.trim().toLowerCase() === "ocr_request_ambiguous");
}

export function ocrRecoveryJobId(payload: unknown): string {
  const response = asRecord(payload);
  const data = asRecord(response.data);
  const submission = asRecord(response.submission || data.submission);
  return `${submission.job_id || submission.id || ""}`.trim();
}

export function buildOcrAmbiguityRequest(
  descriptor: OcrAmbiguityView,
  resolution: OcrAmbiguityResolutionKind,
  values: OcrReceiptValues = {},
): OcrAmbiguityResolutionRequest {
  if (!descriptor.allowed_resolutions.includes(resolution)) {
    throw new Error(t("k_f551f0af"));
  }
  const request: OcrAmbiguityResolutionRequest = {
    resolution,
    resolution_revision: descriptor.resolution_revision,
  };
  if (resolution === "accept_duplicate_risk") return request;

  for (const field of descriptor.receipt_fields) {
    const fieldValue = `${values[field.name] || ""}`.trim();
    if (field.required && !fieldValue) throw new Error(t("k_6fc875b0", [field.label]));
    if (fieldValue) request[field.name] = fieldValue;
  }
  return request;
}

type ResolveOcrAmbiguityArgs = {
  job: unknown;
  descriptor: OcrAmbiguityView | null;
  resolution: OcrAmbiguityResolutionKind;
  values?: OcrReceiptValues;
  apiPrefix?: string;
  resolveOcrAmbiguity: (
    jobId: string,
    apiPrefix: string | undefined,
    request: OcrAmbiguityResolutionRequest,
  ) => Promise<OcrAmbiguityResolutionView | unknown>;
  refreshDiagnostics?: () => Promise<unknown>;
  startPolling?: (jobId: string) => void;
  closeDialog?: () => void;
  setPending?: (pending: boolean) => void;
  setStatus?: (status: string) => void;
  setGlobalError?: (message: string) => void;
};

function isConflictError(error: unknown): boolean {
  if (Number(asRecord(error).status) === 409) return true;
  const message = error instanceof Error ? error.message : String(error);
  return /(^|\D)409(\D|$)/.test(message);
}

export async function resolveOcrAmbiguityRecovery({
  job,
  descriptor,
  resolution,
  values,
  apiPrefix,
  resolveOcrAmbiguity,
  refreshDiagnostics,
  startPolling,
  closeDialog,
  setPending,
  setStatus,
  setGlobalError,
}: ResolveOcrAmbiguityArgs): Promise<OcrRecoveryOutcome> {
  const unwrappedJob = unwrapJob(job);
  const jobId = `${unwrappedJob.job_id || unwrappedJob.id || ""}`.trim();
  if (!jobId) {
    setStatus?.(t("k_7af6eb4c"));
    return { ok: false, conflict: false };
  }
  if (!descriptor) {
    setStatus?.(t("k_9515ebb9"));
    return { ok: false, conflict: true };
  }

  let request: OcrAmbiguityResolutionRequest;
  try {
    request = buildOcrAmbiguityRequest(descriptor, resolution, values);
  } catch (error) {
    setStatus?.(error instanceof Error ? error.message : String(error));
    return { ok: false, conflict: false };
  }

  setPending?.(true);
  setStatus?.(
    resolution === "bind_existing_receipt"
      ? t("k_6531314d")
      : t("k_a13dce4a"),
  );
  try {
    const response = await resolveOcrAmbiguity(jobId, apiPrefix, request);
    const nextJobId = ocrRecoveryJobId(response);
    if (!nextJobId) throw new Error(t("k_66549475"));
    closeDialog?.();
    setGlobalError?.("");
    startPolling?.(nextJobId);
    return { ok: true, conflict: false };
  } catch (error) {
    if (isConflictError(error)) {
      setStatus?.(t("k_8798dd6b"));
      await refreshDiagnostics?.();
      return { ok: false, conflict: true };
    }
    const message = error instanceof Error ? error.message : String(error);
    setStatus?.(t("k_0796a95d", [message]));
    return { ok: false, conflict: false };
  } finally {
    setPending?.(false);
  }
}
