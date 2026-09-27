import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildApiEndpoint } from "./http.js";
import { t } from "@retainpdf/i18n";
async function credentialRequest(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...buildApiHeaders(),
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...(options.headers || {}),
        },
    });
    const envelope = await response.json().catch(() => null);
    if (!response.ok) {
        const error = new Error(`${envelope?.message || envelope?.error?.message || t("k_02da2344")}(${response.status})`);
        error.status = response.status;
        error.code = `${envelope?.code || envelope?.error_code || envelope?.error?.code || envelope?.details?.code || ""}`.trim();
        throw error;
    }
    return unwrapEnvelope(envelope);
}
export function listCredentials(apiPrefix, { includeValues = false } = {}) {
    return credentialRequest(`${buildApiEndpoint(apiPrefix, "credentials")}${includeValues ? "?include_values=true" : ""}`, { cache: "no-store" });
}
export function createCredential(apiPrefix, input) {
    return credentialRequest(buildApiEndpoint(apiPrefix, "credentials"), {
        method: "POST",
        body: JSON.stringify(input),
    });
}
export function updateCredential(apiPrefix, credentialRef, input) {
    return credentialRequest(buildApiEndpoint(apiPrefix, `credentials/${encodeURIComponent(credentialRef)}`), { method: "PUT", body: JSON.stringify(input) });
}
export function deleteCredential(apiPrefix, credentialRef, expectedRevision) {
    const query = Number.isFinite(expectedRevision)
        ? `?expected_revision=${encodeURIComponent(String(expectedRevision))}`
        : "";
    return credentialRequest(`${buildApiEndpoint(apiPrefix, `credentials/${encodeURIComponent(credentialRef)}`)}${query}`, { method: "DELETE" });
}
