import { resolveDisplayedStagePresentation } from "@retainpdf/domain/job-status";
import { buildEventsPresentation } from "./events.js";
import { buildStageHistoryPresentation } from "./history.js";
import { isJobTerminal } from "@retainpdf/domain/job";
import {
  resolveJobActions,
} from "@retainpdf/domain/job";
import {
  summarizeInvocationProtocol,
  summarizeInvocationSchemaVersion,
  summarizeRuntimeField,
} from "@retainpdf/domain/job";
import {
  formatEventTimestamp,
  resolveLiveDurations,
} from "./utils.js";
import { summarizeStageName } from "@retainpdf/domain/job";
import type { JobLike, JobPayload } from "@retainpdf/domain/job";
import { t } from "@retainpdf/i18n";

/** Options forwarded to resolveLiveDurations / stage history. */
export interface StatusDetailDurationOptions {
  finishedAtFallback?: string;
  now?: string | Date | null;
}

export interface StatusDetailSnapshotOptions {
  durationOptions?: StatusDetailDurationOptions;
}

/** Stage presentation fields consumed by the status-detail headline/runtime. */
interface StagePresentationLike {
  detail?: string;
  progressText?: string;
  [key: string]: unknown;
}

type StatusDetailJob = JobLike | JobPayload | null | undefined;

function diagnosticValueText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return `${value}`;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return `${value}`;
  }
}

function redactDiagnosticText(value: string): string {
  return value
    .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [REDACTED]")
    .replace(
      /((?:"?(?:api[_-]?key|access[_-]?token|authorization|password|secret)"?)\s*[:=]\s*")([^"]*)(")/gi,
      "$1[REDACTED]$3",
    )
    .replace(
      /((?:\b(?:api[_-]?key|access[_-]?token|authorization|password|secret)\b)\s*[:=]\s*)([^\s,;]+)/gi,
      "$1[REDACTED]",
    )
    .replace(/([?&](?:api[_-]?key|access[_-]?token|token|key)=)[^&\s]+/gi, "$1[REDACTED]");
}

function firstDiagnosticValue(
  sources: Record<string, unknown>[],
  keys: string[],
): unknown {
  for (const source of sources) {
    for (const key of keys) {
      const text = diagnosticValueText(source[key]);
      if (text && text !== "-") return source[key];
    }
  }
  return "";
}

/**
 * Builds a copyable failure report from diagnostic fields only. Request payloads
 * are deliberately excluded because legacy jobs may still contain inline keys.
 */
export function buildFailureLogText(job: StatusDetailJob): string {
  const jobRecord = (job || {}) as Record<string, unknown>;
  const failure = (job?.failure || {}) as Record<string, unknown>;
  const failureDiagnostic = (job?.failure_diagnostic || {}) as Record<string, unknown>;
  const diagnostics = (job?.diagnostics || job?.failure_diagnostics || {}) as Record<string, unknown>;
  const sources = [diagnostics, failure, failureDiagnostic, jobRecord];
  const fields: Array<[string, unknown]> = [
    ["Job ID", jobRecord.job_id],
    [t("k_62e951a6"), jobRecord.status],
    [t("k_4ca39faa"), firstDiagnosticValue(sources, ["failed_stage", "stage", "provider_stage", "display_stage"])],
    [t("k_e08c1d4f"), firstDiagnosticValue(sources, ["failure_code", "error_code", "provider_code", "code"])],
    ["Trace ID", firstDiagnosticValue(sources, ["trace_id", "provider_trace_id"])],
    ["Request ID", firstDiagnosticValue(sources, ["request_id", "provider_request_id"])],
    [t("k_46d4c1b4"), firstDiagnosticValue(sources, ["summary", "final_failure_summary", "detail", "message"])],
    [t("k_4917290f"), firstDiagnosticValue(sources, ["root_cause", "raw_exception_type", "error_type"])],
    [t("k_c5134eb1"), firstDiagnosticValue(sources, ["suggestion", "recovery_hint"])],
    [t("k_5d55174a"), firstDiagnosticValue(sources, ["raw_exception_type", "exception_type"])],
    [t("k_b1eec751"), firstDiagnosticValue(sources, ["raw_exception_message", "exception_message"])],
    [t("k_e8131fef"), firstDiagnosticValue(sources, ["raw_excerpt", "stderr_tail", "stdout_tail"])],
    ["Traceback", firstDiagnosticValue(sources, ["traceback", "stack_trace", "stack"])],
  ];
  const lines = fields.flatMap(([label, value]) => {
    const text = diagnosticValueText(value);
    return text && text !== "-" ? [`${label}: ${text}`] : [];
  });
  const logTail = Array.isArray(job?.log_tail)
    ? job.log_tail.map(diagnosticValueText).filter(Boolean)
    : [];
  if (logTail.length) {
    lines.push("", t("k_70f1aab1"), ...logTail);
  }
  if (!lines.length) return t("k_aa261a2a");
  return redactDiagnosticText(lines.join("\n"));
}

function stageIconMarkup(job: StatusDetailJob, stageText: string | undefined): string {
  const text = `${stageText || ""}`.toLowerCase();
  const status = `${job?.status || ""}`.trim();
  if (status === "succeeded" && isJobTerminal(job)) {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  if (status === "failed") {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M15 9l-6 6M9 9l6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  if (text.includes("排队")) {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M8 7h8M8 12h8M8 17h5M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  }
  if (text.includes("翻译")) {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h8M8 6c0 6-2 10-5 12M8 6c1 3 3.5 6.5 7 9M14 6h6M17 6v12M14 18h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  if (text.includes("解析") || text.includes("ocr")) {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M7 4h7l5 5v11a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 4v5h5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none"><path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function statusDetailNote(job: StatusDetailJob = {}): string {
  return job.status === "failed"
    ? t("k_447360ea")
    : job.status === "succeeded" && isJobTerminal(job)
      ? t("k_737b0598")
      : t("k_daa88539");
}

function headlineStatus(job: StatusDetailJob = {}) {
  const status = `${job?.status || ""}`.trim().toLowerCase();
  if (status === "failed") return { statusLabel: t("k_3e3c8068"), tone: "failed" as const };
  if (status === "succeeded" && isJobTerminal(job)) {
    return { statusLabel: t("k_e99b48a2"), tone: "success" as const };
  }
  if (["running", "validating"].includes(status)) {
    return { statusLabel: t("k_fcb979ef"), tone: "running" as const };
  }
  if (["queued", "pending"].includes(status)) {
    return { statusLabel: t("k_4dcbbcfa"), tone: "neutral" as const };
  }
  return { statusLabel: t("k_4f1f8aa3"), tone: "neutral" as const };
}

function buildHeadline(job: StatusDetailJob, stageText: string | undefined) {
  return {
    iconMarkup: stageIconMarkup(job, stageText),
    jobId: job?.job_id || "-",
    note: statusDetailNote(job),
    ...headlineStatus(job),
  };
}

function summarizeMathMode(job: StatusDetailJob): string {
  const mathMode = `${(job as JobPayload)?.request_payload_math_mode || ""}`.trim();
  if (mathMode === "placeholder") {
    return t("k_d4f698d0");
  }
  if (mathMode === "direct_typst") {
    return t("k_7a005173");
  }
  return mathMode || "-";
}

function publicStageForRuntime(job: StatusDetailJob = {}): string {
  return `${job?.stage_snapshot?.publicStage || job?.display_stage || ""}`;
}

function runtimeStageDetail(presentation: StagePresentationLike = {}): string {
  return `${presentation.detail || presentation.progressText || ""}`;
}

function buildRuntimeDetails(
  job: StatusDetailJob,
  eventsPayload: unknown,
  durationOptions: StatusDetailDurationOptions = {},
) {
  const durations = resolveLiveDurations(job, durationOptions);
  const presentation = resolveDisplayedStagePresentation(job, eventsPayload) as StagePresentationLike;
  return {
    currentStage: summarizeStageName(publicStageForRuntime(job), runtimeStageDetail(presentation)),
    stageElapsed: durations.stageElapsedText,
    totalElapsed: durations.totalElapsedText,
    retryCount: `${job?.retry_count ?? 0}`,
    lastTransition: job?.last_stage_transition_at ? formatEventTimestamp(job.last_stage_transition_at) : "-",
    terminalReason: summarizeRuntimeField(job?.terminal_reason),
    inputProtocol: summarizeInvocationProtocol(job),
    stageSpecVersion: summarizeInvocationSchemaVersion(job),
    mathMode: summarizeMathMode(job),
  };
}

function buildFailureDetails(job: StatusDetailJob) {
  const failure = (job?.failure || {}) as Record<string, unknown>;
  const failureDiagnostic = (job?.failure_diagnostic || {}) as Record<string, unknown>;
  const diagnostics = (job?.diagnostics || job?.failure_diagnostics || {}) as Record<string, unknown>;
  const logTail = Array.isArray(job?.log_tail) ? job.log_tail : [];
  const failureLastLogLine = failure.last_log_line
    || failureDiagnostic.last_log_line
    || failure.raw_excerpt
    || failure.raw_exception_message
    || (logTail.length ? logTail[logTail.length - 1] : "");
  const retryable = failure.retryable ?? failureDiagnostic.retryable;
  return {
    summary: summarizeRuntimeField(
      diagnostics.summary || diagnostics.detail || failure.summary || failure.detail || job?.final_failure_summary || failureDiagnostic.summary || failureDiagnostic.detail || failure.raw_excerpt,
    ),
    category: summarizeRuntimeField(
      diagnostics.failure_category || diagnostics.category || diagnostics.error_type || failure.category || failure.failure_category || job?.final_failure_category || failureDiagnostic.type || failureDiagnostic.error_kind || failure.error_type || failure.failure_code,
    ),
    stage: summarizeRuntimeField(
      diagnostics.failed_stage || diagnostics.stage || failure.stage || failure.failed_stage || failure.provider_stage || failureDiagnostic.stage || failureDiagnostic.failed_stage,
    ),
    rootCause: summarizeRuntimeField(
      diagnostics.root_cause || diagnostics.raw_exception_type || failure.root_cause || failureDiagnostic.root_cause || failure.raw_exception_type || failure.upstream_host,
    ),
    suggestion: summarizeRuntimeField(
      diagnostics.suggestion || failure.suggestion || failureDiagnostic.suggestion || failure.failure_code,
    ),
    lastLogLine: summarizeRuntimeField(
      diagnostics.raw_excerpt || diagnostics.detail || failureLastLogLine,
    ),
    logText: buildFailureLogText(job),
    retryable: typeof (diagnostics.retryable ?? retryable) === "boolean" ? ((diagnostics.retryable ?? retryable) ? t("k_30160a21") : t("k_8bf5c10a")) : "-",
  };
}

export function buildStatusDetailSnapshot(
  job: StatusDetailJob,
  eventsPayload: unknown,
  {
    durationOptions = {},
  }: StatusDetailSnapshotOptions = {},
) {
  const presentation = resolveDisplayedStagePresentation(job, eventsPayload) as StagePresentationLike;
  const actions = resolveJobActions(job);
  const rerunEnabled = Boolean(actions.rerunEnabled && actions.rerun);

  return {
    headline: buildHeadline(job, presentation.detail),
    runtime: buildRuntimeDetails(job, eventsPayload, durationOptions),
    failure: buildFailureDetails(job),
    stageHistory: buildStageHistoryPresentation(job, durationOptions),
    events: buildEventsPresentation(eventsPayload),
    rerun: {
      enabled: rerunEnabled,
      status: rerunEnabled
        ? t("k_0df37973")
        : t("k_fab2d822"),
    },
  };
}
