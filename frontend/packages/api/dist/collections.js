// collections — pure
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildApiEndpoint } from "./http.js";
import { t } from "@retainpdf/i18n";
export async function listCollections(apiPrefix) {
    const resp = await fetch(buildApiEndpoint(apiPrefix, "collections"), { headers: buildApiHeaders() });
    if (!resp.ok)
        throw new Error(t("k_6913ace3", [resp.status]));
    return unwrapEnvelope(await resp.json());
}
export async function createCollection(apiPrefix, { name, parentId = "" } = {}) {
    const resp = await fetch(buildApiEndpoint(apiPrefix, "collections"), {
        method: "POST",
        headers: { ...buildApiHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ name, parent_id: parentId || undefined }),
    });
    if (!resp.ok) {
        const envelope = await resp.json().catch(() => null);
        throw new Error(`${envelope?.message || t("k_3d903957")}(${resp.status})`);
    }
    return unwrapEnvelope(await resp.json());
}
export async function patchCollection(apiPrefix, collectionId, payload = {}) {
    const normalized = `${collectionId || ""}`.trim();
    if (!normalized)
        throw new Error(t("k_de75b8f3"));
    const resp = await fetch(buildApiEndpoint(apiPrefix, `collections/${encodeURIComponent(normalized)}`), {
        method: "PATCH",
        headers: { ...buildApiHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!resp.ok) {
        const envelope = await resp.json().catch(() => null);
        throw new Error(`${envelope?.message || t("k_6c613e95")}(${resp.status})`);
    }
    return unwrapEnvelope(await resp.json());
}
export async function deleteCollection(apiPrefix, collectionId) {
    const normalized = `${collectionId || ""}`.trim();
    if (!normalized)
        throw new Error(t("k_de75b8f3"));
    const resp = await fetch(buildApiEndpoint(apiPrefix, `collections/${encodeURIComponent(normalized)}`), { method: "DELETE", headers: buildApiHeaders() });
    if (!resp.ok) {
        const envelope = await resp.json().catch(() => null);
        throw new Error(`${envelope?.message || t("k_41da5ea1")}(${resp.status})`);
    }
    return unwrapEnvelope(await resp.json());
}
export async function addDocumentsToCollection(apiPrefix, collectionId, documentIds = []) {
    const normalized = `${collectionId || ""}`.trim();
    if (!normalized)
        throw new Error(t("k_de75b8f3"));
    const resp = await fetch(buildApiEndpoint(apiPrefix, `collections/${encodeURIComponent(normalized)}/documents`), {
        method: "POST",
        headers: { ...buildApiHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ document_ids: documentIds }),
    });
    if (!resp.ok) {
        const envelope = await resp.json().catch(() => null);
        throw new Error(`${envelope?.message || t("k_a8e3b0fe")}(${resp.status})`);
    }
    return unwrapEnvelope(await resp.json());
}
export async function removeDocumentFromCollection(apiPrefix, collectionId, documentId) {
    const normalizedCollectionId = `${collectionId || ""}`.trim();
    const normalizedDocumentId = `${documentId || ""}`.trim();
    if (!normalizedCollectionId || !normalizedDocumentId)
        throw new Error(t("k_7ee1562b"));
    const resp = await fetch(buildApiEndpoint(apiPrefix, `collections/${encodeURIComponent(normalizedCollectionId)}/documents/${encodeURIComponent(normalizedDocumentId)}`), {
        method: "DELETE",
        headers: buildApiHeaders(),
    });
    if (!resp.ok) {
        const envelope = await resp.json().catch(() => null);
        throw new Error(`${envelope?.message || t("k_9c67a7f9")}(${resp.status})`);
    }
    return unwrapEnvelope(await resp.json());
}
