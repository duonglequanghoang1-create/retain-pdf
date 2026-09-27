import { canonicalStageOf, hasCanonicalEventContract, } from "../presentation/job-stage-presentation-utils.js";
import { substageDetail, substageLabel, } from "../contract/job-stage-substage-contract.js";
import { stageSubtypeOfPayload, } from "../contract/job-stage-substage-adapter.js";
import { firstNonEmpty } from "./job-status-summary-helpers.js";
import { USER_STAGE_FLOW, USER_STAGE_TOTAL, } from "./job-status-summary-stage-constants.js";
import { isJobTerminal } from "../../job/core.js";
import { t } from "@retainpdf/i18n";
function publicStageKeyOf(payload) {
    const canonicalStage = canonicalStageOf(payload);
    if (canonicalStage) {
        return canonicalStage;
    }
    return "";
}
function stageKeyOf(payload) {
    const publicStageKey = publicStageKeyOf(payload);
    if (publicStageKey) {
        return publicStageKey;
    }
    if (hasCanonicalEventContract(payload)) {
        return "";
    }
    return "";
}
function stageSubtypeOf(payload) {
    return stageSubtypeOfPayload(payload);
}
function stageFlowForKey(stageKey) {
    return USER_STAGE_FLOW.find((stage) => stage.key === stageKey) || null;
}
function normalizedStageText(payload) {
    const stageKey = stageKeyOf(payload);
    const substage = firstNonEmpty(payload.substage, payload.payload?.substage);
    return `${stageKey} ${substage}`.toLowerCase();
}
function detailForPayload(payload, fallback) {
    const subtype = stageSubtypeOf(payload);
    const detail = subtype ? substageDetail(subtype) : "";
    if (detail) {
        return detail;
    }
    return fallback;
}
function successDetailForWorkflow(payload) {
    const workflow = `${payload?.workflow || ""}`.trim().toLowerCase();
    return workflow === "ocr"
        ? t("k_cb70ac9b")
        : t("k_aefbc670");
}
function userStageFor(payload) {
    const stageKey = stageKeyOf(payload);
    if (payload.status === "succeeded" && isJobTerminal(payload)) {
        return {
            key: "done",
            label: t("k_33246f6a"),
            detail: successDetailForWorkflow(payload),
            step: USER_STAGE_TOTAL,
            total: USER_STAGE_TOTAL,
        };
    }
    if (payload.status === "failed") {
        return {
            key: "failed",
            label: t("k_3e3c8068"),
            detail: t("k_0b270e1f"),
            step: null,
            total: USER_STAGE_TOTAL,
        };
    }
    if (payload.status === "canceled") {
        return {
            key: "canceled",
            label: t("k_a5ffdc95"),
            detail: t("k_6df9b765"),
            step: null,
            total: USER_STAGE_TOTAL,
        };
    }
    if ((payload.status === "queued"
        || stageKey === "queued")
        && !["ocr", "translate", "render"].includes(stageKey)) {
        return {
            key: "queued",
            label: t("k_4dcbbcfa"),
            detail: detailForPayload(payload, t("k_dc6aee22")),
            step: null,
            total: USER_STAGE_TOTAL,
        };
    }
    const directStage = stageFlowForKey(stageKey);
    if (directStage) {
        const matchIndex = USER_STAGE_FLOW.findIndex((stage) => stage.key === directStage.key);
        return {
            ...directStage,
            detail: detailForPayload(payload, directStage.detail),
            step: matchIndex + 1,
            total: USER_STAGE_TOTAL,
        };
    }
    if (payload.status === "running") {
        return {
            key: "running",
            label: t("k_fcb979ef"),
            detail: detailForPayload(payload, t("k_999b283e")),
            step: null,
            total: USER_STAGE_TOTAL,
        };
    }
    return {
        key: "idle",
        label: t("k_bd3488d0"),
        detail: t("k_bb57f21e"),
        step: null,
        total: USER_STAGE_TOTAL,
    };
}
function userStageLabel(payload) {
    const stage = userStageFor(payload);
    if (stage.step && stage.total && !isJobTerminal(payload)) {
        const subtype = stageSubtypeOf(payload);
        const subtypeLabel = substageLabel(subtype) || stage.label;
        return t("k_ec81c80c", [stage.step, stage.total, subtypeLabel]);
    }
    return stage.label;
}
export { USER_STAGE_FLOW, USER_STAGE_TOTAL, detailForPayload, normalizedStageText, publicStageKeyOf, stageFlowForKey, stageKeyOf, stageSubtypeOf, successDetailForWorkflow, userStageFor, userStageLabel, };
