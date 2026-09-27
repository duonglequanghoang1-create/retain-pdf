// search — pure
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildApiEndpoint } from "./http.js";
import { t } from "@retainpdf/i18n";

export async function searchLibrary(apiPrefix: string, q: string, { limit = 20 }: { limit?: number } = {}): Promise<any> {
  const query = `${q || ""}`.trim();
  if (!query) return { hits: [] };
  const params = new URLSearchParams();
  params.set("q", query);
  params.set("limit", `${limit}`);
  const resp = await fetch(`${buildApiEndpoint(apiPrefix, "search")}?${params.toString()}`, { headers: buildApiHeaders() });
  if (!resp.ok) throw new Error(t("k_96709407", [resp.status]));
  return unwrapEnvelope(await resp.json());
}
