// glossaries — pure
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildApiEndpoint, submitJson } from "./http.js";
import { t } from "@retainpdf/i18n";

export async function fetchGlossaries(apiPrefix: string): Promise<any> {
  const resp = await fetch(buildApiEndpoint(apiPrefix, "glossaries"), { headers: buildApiHeaders() });
  if (!resp.ok) throw new Error(t("k_e566b4ef", [resp.status]));
  return unwrapEnvelope(await resp.json());
}

export async function fetchGlossary(glossaryId: string, apiPrefix?: string): Promise<any> {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) throw new Error(t("k_048670d4"));
  const resp = await fetch(buildApiEndpoint(apiPrefix as string, `glossaries/${encodeURIComponent(normalizedGlossaryId)}`), { headers: buildApiHeaders() });
  if (!resp.ok) throw new Error(t("k_2169805e", [resp.status]));
  return unwrapEnvelope(await resp.json());
}

export async function createGlossary(apiPrefix: string, payload: unknown): Promise<any> {
  return submitJson(buildApiEndpoint(apiPrefix, "glossaries"), payload);
}

export async function updateGlossary(apiPrefix: string, glossaryId: string, payload: unknown): Promise<any> {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) throw new Error(t("k_3facc259"));
  const resp = await fetch(buildApiEndpoint(apiPrefix, `glossaries/${encodeURIComponent(normalizedGlossaryId)}`), {
    method: "PUT",
    headers: buildApiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(t("k_002f4d31", [resp.status, text]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function deleteGlossary(apiPrefix: string, glossaryId: string): Promise<any> {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) throw new Error(t("k_00f5150c"));
  const resp = await fetch(buildApiEndpoint(apiPrefix, `glossaries/${encodeURIComponent(normalizedGlossaryId)}`), { method: "DELETE", headers: buildApiHeaders() });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(t("k_89f3a37e", [resp.status, text]));
  }
  return unwrapEnvelope(await resp.json());
}

export async function exportGlossaryCsv(apiPrefix: string, glossaryId: string): Promise<Response> {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) throw new Error(t("k_7bbecdd1"));
  const resp = await fetch(buildApiEndpoint(apiPrefix, `glossaries/${encodeURIComponent(normalizedGlossaryId)}/export.csv`), { headers: buildApiHeaders() });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`导出术语表失败: ${resp.status} ${text || "unknown error"}`);
  }
  return resp;
}

export async function parseGlossaryCsv(apiPrefix: string, csvText: string): Promise<any> {
  return submitJson(buildApiEndpoint(apiPrefix, "glossaries/parse-csv"), { csv_text: `${csvText || ""}` });
}
