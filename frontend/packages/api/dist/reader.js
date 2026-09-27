// reader — pure
import { buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildJobDetailEndpoint, submitJson } from "./http.js";
import { t } from "@retainpdf/i18n";
export async function fetchReaderRegions(jobId, apiPrefix) {
    const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/reader/regions`, { headers: buildApiHeaders() });
    if (!resp.ok) {
        if (resp.status === 404)
            return { items: [] };
        throw new Error(t("k_a9c02c00", [resp.status]));
    }
    return unwrapEnvelope(await resp.json());
}
export async function fetchReaderMetadata(jobId, apiPrefix) {
    const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/reader/metadata`, { headers: buildApiHeaders() });
    if (!resp.ok) {
        if (resp.status === 404)
            return null;
        throw new Error(t("k_2230697d", [resp.status]));
    }
    return unwrapEnvelope(await resp.json());
}
export async function fetchReaderAiChat(jobId, payload, apiPrefix) {
    return submitJson(`${buildJobDetailEndpoint(jobId, apiPrefix)}/reader/ai/chat`, payload);
}
