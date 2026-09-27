// jobs-artifacts — pure (no mock)
import { API_PREFIX, buildApiHeaders, unwrapEnvelope } from "./internal/runtime.js";
import { buildJobDetailEndpoint } from "./http.js";
import { t } from "@retainpdf/i18n";
function buildOcrJobDetailEndpoint(jobId, apiPrefix) {
    return buildJobDetailEndpoint(jobId, apiPrefix).replace(/\/jobs\//, "/ocr/jobs/");
}
/**
 * Read the stable, public artifact projection used by the Reader.
 * The detailed manifest is intentionally a separate endpoint and can be empty
 * for older completed jobs even when published downloads are available.
 */
export async function fetchJobArtifacts(jobId, apiPrefix = API_PREFIX) {
    const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/artifacts`, { headers: buildApiHeaders() });
    if (resp.ok)
        return unwrapEnvelope(await resp.json());
    if (resp.status !== 404) {
        throw new Error(t("k_f17679a2", [resp.status]));
    }
    const ocrResp = await fetch(`${buildOcrJobDetailEndpoint(jobId, apiPrefix)}/artifacts`, { headers: buildApiHeaders() });
    if (ocrResp.ok)
        return unwrapEnvelope(await ocrResp.json());
    if (ocrResp.status === 404)
        return null;
    throw new Error(t("k_9412bdfb", [ocrResp.status]));
}
export async function fetchJobArtifactsManifest(jobId, apiPrefix = API_PREFIX) {
    const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/artifacts-manifest`, { headers: buildApiHeaders() });
    if (!resp.ok) {
        if (resp.status === 404) {
            const ocrResp = await fetch(`${buildOcrJobDetailEndpoint(jobId, apiPrefix)}/artifacts-manifest`, { headers: buildApiHeaders() });
            if (ocrResp.ok)
                return unwrapEnvelope(await ocrResp.json());
            if (ocrResp.status === 404)
                return { items: [] };
        }
        if (resp.status === 404)
            return { items: [] };
        throw new Error(t("k_b12db8a1", [resp.status]));
    }
    return unwrapEnvelope(await resp.json());
}
export async function fetchJobMarkdown(jobId, apiPrefix = API_PREFIX) {
    const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/markdown`, { headers: buildApiHeaders() });
    if (!resp.ok) {
        if (resp.status === 404)
            return null;
        throw new Error(t("k_5a4bde5c", [resp.status]));
    }
    return unwrapEnvelope(await resp.json());
}
export async function fetchJobMarkdownDocument(jobId, apiPrefix = API_PREFIX) {
    const resp = await fetch(`${buildJobDetailEndpoint(jobId, apiPrefix)}/markdown/document`, { headers: buildApiHeaders() });
    if (!resp.ok) {
        if (resp.status === 404)
            return null;
        throw new Error(t("k_f0a8c685", [resp.status]));
    }
    return unwrapEnvelope(await resp.json());
}
