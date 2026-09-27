// translation-debug — pure
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildJobDetailEndpoint } from "./http.js";
import { t } from "@retainpdf/i18n";

export async function fetchTranslationDiagnostics(jobId: string, apiPrefix?: string): Promise<any> {
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/translation/diagnostics`, { headers: buildApiHeaders() });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error(t("k_51d95fa6"));
    throw new Error(t("k_0779d3d5", [resp.status]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function fetchTranslationItems(
  jobId: string,
  apiPrefix: string | undefined,
  { limit = 20, offset = 0, page = "", finalStatus = "", errorType = "", route = "", q = "" }: { limit?: number; offset?: number; page?: string; finalStatus?: string; errorType?: string; route?: string; q?: string } = {},
): Promise<any> {
  const params = new URLSearchParams();
  params.set("limit", `${limit}`);
  params.set("offset", `${offset}`);
  if (`${page ?? ""}`.trim()) params.set("page", `${page}`.trim());
  if (`${finalStatus ?? ""}`.trim()) params.set("final_status", `${finalStatus}`.trim());
  if (`${errorType ?? ""}`.trim()) params.set("error_type", `${errorType}`.trim());
  if (`${route ?? ""}`.trim()) params.set("route", `${route}`.trim());
  if (`${q ?? ""}`.trim()) params.set("q", `${q}`.trim());
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/translation/items?${params.toString()}`, { headers: buildApiHeaders() });
  if (!resp.ok) {
    if (resp.status === 404) return { items: [], total: 0, limit, offset };
    throw new Error(t("k_fb4c8d86", [resp.status]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function fetchTranslationItem(jobId: string, itemId: string, apiPrefix?: string): Promise<any> {
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/translation/items/${itemId}`, { headers: buildApiHeaders() });
  if (!resp.ok) {
    if (resp.status === 404) throw new Error(t("k_a7086aaf"));
    throw new Error(t("k_6393162b", [resp.status]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function replayTranslationItem(jobId: string, itemId: string, apiPrefix?: string): Promise<any> {
  const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/translation/items/${itemId}/replay`, { method: "POST", headers: buildApiHeaders() });
  if (!resp.ok) {
    const contentType = resp.headers.get("content-type") || "";
    if (resp.status === 404) throw new Error(t("k_4fc2db96"));
    if (contentType.includes("application/json")) {
      const errorPayload: any = await resp.json();
      throw new Error(t("k_d9b1fe28", [errorPayload.message || JSON.stringify(errorPayload)]));
    }
    const text = await resp.text();
    throw new Error(t("k_596858f6", [resp.status, text]));
  }
  return unwrapEnvelope(await resp.json());
}
