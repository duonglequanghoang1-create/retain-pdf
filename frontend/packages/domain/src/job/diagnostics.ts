import {
  firstDefined,
  firstNonEmpty,
} from "./core.js";
import { t } from "@retainpdf/i18n";

export function summarizeStatus(status) {
  switch (status) {
    case "queued":
      return t("k_d8111aff");
    case "running":
      return t("k_46561e0e");
    case "succeeded":
      return t("k_5486f1b5");
    case "canceled":
      return t("k_3dfb6b95");
    case "failed":
      return t("k_ca244a1b");
    default:
      return t("k_099f473a");
  }
}

export function summarizePublicError(payload) {
  if (payload.status === "canceled") {
    return t("k_3dfb6b95");
  }
  if (payload.status === "failed") {
    const detail = firstNonEmpty(
      payload.failure?.summary,
      payload.failure?.detail,
      payload.final_failure_summary,
      payload.failure_diagnostic?.summary,
      payload.failure_diagnostic?.detail,
      payload.stage_detail,
      payload.error,
      payload.raw_response?.message,
      payload.failure?.raw_excerpt,
      payload.failure?.raw_exception_message,
      payload.failure?.suggestion,
    );
    return detail || t("k_3b8b2a96");
  }
  if (payload.error) {
    return payload.error;
  }
  return "-";
}

export function summarizeDiagnostic(payload) {
  const failure = payload.failure;
  if (failure) {
    const retryable = firstDefined(failure.retryable, payload.failure_diagnostic?.retryable);
    const lines = [
      `阶段: ${firstNonEmpty(failure.stage, failure.failed_stage, failure.provider_stage) || "-"}`,
      `分类: ${firstNonEmpty(failure.category, failure.failure_category, failure.error_type, failure.failure_code) || "-"}`,
      `摘要: ${firstNonEmpty(failure.summary, failure.detail, failure.raw_excerpt, failure.raw_exception_message) || "-"}`,
      `可重试: ${typeof retryable === "boolean" ? (retryable ? t("k_30160a21") : t("k_8bf5c10a")) : "-"}`,
    ];
    if (firstNonEmpty(failure.upstream_host, failure.provider)) {
      lines.push(t("k_fd9632fb", [firstNonEmpty(failure.upstream_host, failure.provider)]));
    }
    if (firstNonEmpty(failure.root_cause, failure.raw_exception_type)) {
      lines.push(t("k_3c0210a8", [firstNonEmpty(failure.root_cause, failure.raw_exception_type)]));
    }
    if (failure.suggestion) {
      lines.push(t("k_91d5e093", [failure.suggestion]));
    }
    if (firstNonEmpty(failure.last_log_line, failure.raw_excerpt)) {
      lines.push(t("k_101e7375", [firstNonEmpty(failure.last_log_line, failure.raw_excerpt)]));
    }
    return lines.join("\n");
  }
  const diag = payload.failure_diagnostic;
  if (!diag) {
    return "-";
  }
  const lines = [
    `阶段: ${diag.stage || diag.failed_stage || "-"}`,
    `类型: ${diag.type || diag.error_kind || diag.error_type || "-"}`,
    `摘要: ${diag.summary || diag.detail || diag.raw_excerpt || "-"}`,
    `可重试: ${typeof diag.retryable === "boolean" ? (diag.retryable ? t("k_30160a21") : t("k_8bf5c10a")) : "-"}`,
  ];
  if (diag.upstream_host) {
    lines.push(t("k_b09f7be1", [diag.upstream_host]));
  }
  if (diag.root_cause || diag.raw_exception_type) {
    lines.push(t("k_3c0210a8", [diag.root_cause || diag.raw_exception_type]));
  }
  if (diag.suggestion) {
    lines.push(t("k_91d5e093", [diag.suggestion]));
  }
  if (diag.last_log_line || diag.raw_excerpt) {
    lines.push(t("k_101e7375", [diag.last_log_line || diag.raw_excerpt]));
  }
  return lines.join("\n");
}
