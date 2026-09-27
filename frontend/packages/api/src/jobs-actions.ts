// jobs-actions — pure (no mock)
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildJobDetailEndpoint, submitJson } from "./http.js";
import { t } from "@retainpdf/i18n";

export type OcrAmbiguityResolutionKind = "bind_existing_receipt" | "accept_duplicate_risk";

export interface OcrAmbiguityResolutionRequest {
  resolution: OcrAmbiguityResolutionKind;
  resolution_revision: number;
  task_id?: string;
  batch_id?: string;
  upload_url?: string;
  trace_id?: string;
}

export interface OcrAmbiguityReceiptField {
  name: "task_id" | "batch_id" | "upload_url" | "trace_id";
  label: string;
  required: boolean;
  secret: boolean;
}

export interface OcrAmbiguityView {
  status: "ambiguous";
  provider: "paddle" | "mineru";
  operation:
    | "submit_local_file"
    | "submit_remote_url"
    | "create_extract_task"
    | "apply_upload_url";
  resolution_revision: number;
  allowed_resolutions: OcrAmbiguityResolutionKind[];
  receipt_fields: OcrAmbiguityReceiptField[];
}

export interface JobDiagnosticsView {
  failure_code: string | null;
  ocr_ambiguity: OcrAmbiguityView | null;
  [key: string]: unknown;
}

export interface OcrAmbiguityResolutionView {
  resolution: OcrAmbiguityResolutionKind;
  provider: string;
  operation: string;
  submission: {
    job_id: string;
    source_job_id: string;
    status: string;
    workflow: string;
    rerun_from_stage: string;
    [key: string]: unknown;
  };
}

export type JobRetryStage = "ocr" | "translation" | "render";

export interface JobStageRetryActionView {
  stage: JobRetryStage;
  label: string;
  can_retry: boolean;
  reason?: string;
  disabled_reason?: string;
  will_reuse?: string[];
  will_rerun?: string[];
  danger?: boolean;
  action?: {
    method?: string;
    url?: string;
    body?: Record<string, unknown>;
  } | null;
}

export interface JobStageActionsView {
  job_id: string;
  stages: JobStageRetryActionView[];
}

export async function fetchJobDiagnostics(jobId: string, apiPrefix?: string): Promise<JobDiagnosticsView | null> {
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/diagnostics`, { headers: buildApiHeaders() });
  if (!resp.ok) {
    if (resp.status === 404) return null;
    throw new Error(t("k_88acd1e5", [resp.status]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function fetchResumePlan(jobId: string, apiPrefix?: string): Promise<any> {
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/resume-plan`, { headers: buildApiHeaders() });
  if (!resp.ok) {
    if (resp.status === 404) return null;
    throw new Error(t("k_34d8f2d5", [resp.status]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function resumeJob(jobId: string, apiPrefix?: string): Promise<any> {
  return submitJson(`${buildJobDetailEndpoint(jobId, apiPrefix)}/resume`, {});
}

export async function cancelJob(jobId: string, apiPrefix?: string): Promise<any> {
  return submitJson(`${buildJobDetailEndpoint(jobId, apiPrefix)}/cancel`, {});
}

export async function cancelOcrJob(jobId: string, apiPrefix?: string): Promise<any> {
  const endpoint = buildJobDetailEndpoint(jobId, apiPrefix).replace(/\/jobs\//, "/ocr/jobs/");
  return submitJson(`${endpoint}/cancel`, {});
}

export async function resolveOcrAmbiguity(
  jobId: string,
  apiPrefix: string | undefined,
  request: OcrAmbiguityResolutionRequest,
): Promise<OcrAmbiguityResolutionView> {
  return submitJson(
    `${buildJobDetailEndpoint(jobId, apiPrefix)}/ocr/resolve-ambiguity`,
    request,
  );
}

export async function fetchJobStageActions(jobId: string, apiPrefix?: string): Promise<JobStageActionsView | null> {
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/stage-actions`, { headers: buildApiHeaders() });
  if (!resp.ok) {
    if (resp.status === 404) return null;
    throw new Error(t("k_f72b24f7", [resp.status]));
  }
  return unwrapEnvelope<JobStageActionsView>(await resp.json());
}

export async function retryJobStage(jobId: string, apiPrefix: string | undefined, stage: string, payload: Record<string, unknown> = {}): Promise<any> {
  const normalizedStage = `${stage || ""}`.trim();
  if (!normalizedStage) throw new Error(t("k_707893d5"));
  const result: any = await submitJson(`${buildJobDetailEndpoint(jobId, apiPrefix)}/retry-stage`, { stage: normalizedStage, ...payload });
  const bookMeta: any = payload && typeof payload === "object" ? payload : {};
  const nextJobId = `${result?.job_id || result?.id || jobId}`.trim();
  return {
    ...result,
    job_id: nextJobId,
    source_job_id: jobId,
    document_id: result?.document_id || bookMeta.document_id,
    title: bookMeta.title || bookMeta.display_name || result?.title,
    display_name: bookMeta.display_name || bookMeta.title || result?.display_name,
    cover_url: bookMeta.cover_url || result?.cover_url,
    thumbnail_url: bookMeta.thumbnail_url || result?.thumbnail_url,
    page_count: bookMeta.page_count ?? result?.page_count,
    library_only: false,
    active_job_id: nextJobId,
  };
}

export async function rerunJob(actionUrl: string): Promise<any> {
  return submitJson(actionUrl, {});
}
