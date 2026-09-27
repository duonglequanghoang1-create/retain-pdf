import { APP_VERSION } from "../generated/app-version.js";
import { t } from "@retainpdf/i18n";

function cleanText(value) {
  return `${value ?? ""}`.trim();
}

function cleanStack(value) {
  return cleanText(value).split("\n").slice(0, 8).join("\n");
}

function inferErrorMessage(error) {
  if (!error) {
    return t("k_5f76edc5");
  }
  if (typeof error === "string") {
    return error;
  }
  return cleanText(error.message) || cleanText(error.statusText) || String(error);
}

function inferHttpStatus(error, context) {
  const status = context?.status ?? error?.status ?? error?.statusCode ?? error?.httpStatus;
  return status === undefined || status === null || status === "" ? "" : `${status}`;
}

function inferUrl(error, context) {
  return cleanText(context?.url) || cleanText(context?.endpoint) || cleanText(error?.url);
}

function normalizeDetails(details: any = {}) {
  return Object.entries(details)
    .map(([key, value]) => [key, cleanText(value)])
    .filter(([key, value]) => value && !/api[-_]?key|token|secret|password/i.test(key));
}

export function buildErrorDiagnostic(error, context: any = {}) {
  const message = inferErrorMessage(error);
  const operation = cleanText(context.operation) || t("k_3d9fa23c");
  const status = inferHttpStatus(error, context);
  const url = inferUrl(error, context);
  const jobId = cleanText(context.jobId) || cleanText(error?.jobId);
  const now = typeof context.now === "function" ? context.now() : new Date().toISOString();
  const details = normalizeDetails(context.details || {});
  const stack = context.includeStack === false ? "" : cleanStack(error?.stack);

  const diagnosticLines = [
    t("k_aab009ec"),
    t("k_c47bcd8b", [now]),
    t("k_58694835", [APP_VERSION]),
    t("k_af0bb987", [operation]),
    jobId ? `job_id: ${jobId}` : "",
    status ? t("k_bae52236", [status]) : "",
    url ? `URL: ${url}` : "",
    t("k_bd0cf246", [message]),
    ...details.map(([key, value]) => `${key}: ${value}`),
    stack ? t("k_389b3da7", [stack]) : "",
    cleanText(globalThis.navigator?.userAgent) ? `User-Agent: ${cleanText(globalThis.navigator?.userAgent)}` : "",
  ].filter(Boolean);

  return {
    kind: "error-diagnostic",
    summary: t("k_717a7015", [operation, message]),
    diagnostic: diagnosticLines.join("\n"),
  };
}

export function messageForErrorBox(value) {
  if (value && typeof value === "object" && value.kind === "error-diagnostic") {
    return value.summary || value.diagnostic || t("k_09e424b5");
  }
  return value;
}
