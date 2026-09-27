// favorites — pure
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildApiEndpoint } from "./http.js";
import { t } from "@retainpdf/i18n";
export async function createFavorite(apiPrefix, payload = {}) {
    const resp = await fetch(buildApiEndpoint(apiPrefix, "favorites"), {
        method: "POST",
        headers: { ...buildApiHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!resp.ok) {
        const envelope = await resp.json().catch(() => null);
        throw new Error(`${envelope?.message || t("k_29994d85")}(${resp.status})`);
    }
    return unwrapEnvelope(await resp.json());
}
export async function fetchFavorites(apiPrefix, { documentId = "" } = {}) {
    const params = new URLSearchParams();
    if (`${documentId || ""}`.trim())
        params.set("document_id", `${documentId}`.trim());
    const query = params.toString();
    const resp = await fetch(`${buildApiEndpoint(apiPrefix, "favorites")}${query ? `?${query}` : ""}`, { headers: buildApiHeaders() });
    if (!resp.ok)
        throw new Error(t("k_f851a7d6", [resp.status]));
    return unwrapEnvelope(await resp.json());
}
export async function deleteFavorite(apiPrefix, favoriteId) {
    const normalized = `${favoriteId || ""}`.trim();
    if (!normalized)
        throw new Error(t("k_659d27f6"));
    const resp = await fetch(buildApiEndpoint(apiPrefix, `favorites/${encodeURIComponent(normalized)}`), { method: "DELETE", headers: buildApiHeaders() });
    if (!resp.ok)
        throw new Error(t("k_d5631c19", [resp.status]));
    return unwrapEnvelope(await resp.json());
}
