import { t } from "@retainpdf/i18n";
// Vendored from frontend/web/src/js/features/job-runtime/stage-pin-state.ts — pure stage pin logic
export function currentDisplayedStagePin(state) {
    const s = state;
    return {
        jobId: `${s?.["currentJobDisplayedStageJobId"] || ""}`.trim(),
        stageKey: `${s?.["currentJobDisplayedStageKey"] || ""}`.trim(),
    };
}
export function resetDisplayedStagePin(state, jobId) {
    if (!state)
        return;
    state["currentJobDisplayedStageKey"] = "";
    state["currentJobDisplayedStageJobId"] = `${jobId || ""}`.trim();
}
export function setDisplayedStagePin(state, stageKey) {
    if (!state)
        return;
    state["currentJobDisplayedStageKey"] = `${stageKey || ""}`.trim();
}
export function keepDisplayedStageForward({ state, stageKey, jobId = "", trusted = false, }) {
    const normalizedJobId = `${jobId || ""}`.trim();
    const pin = currentDisplayedStagePin(state);
    if (pin.jobId !== normalizedJobId) {
        resetDisplayedStagePin(state, normalizedJobId);
    }
    const previous = currentDisplayedStagePin(state).stageKey;
    const next = `${stageKey || ""}`.trim();
    if (next === "failed" || next === "canceled") {
        setDisplayedStagePin(state, next);
        return { stageKey: next, keptPrevious: false };
    }
    if (trusted && next) {
        setDisplayedStagePin(state, next);
        return { stageKey: next, keptPrevious: false };
    }
    const fallback = previous || "";
    setDisplayedStagePin(state, fallback);
    return { stageKey: fallback, keptPrevious: Boolean(fallback) };
}
export function pinnedStagePresentation(stageKey = "") {
    switch (stageKey) {
        case "done":
            return { label: t("k_33246f6a"), detail: t("k_aefbc670") };
        case "render":
            return { label: t("k_2c5dc51e"), detail: t("k_7c939ac7") };
        case "translate":
            return { label: t("k_2bd00473"), detail: t("k_576f69cb") };
        case "ocr":
            return { label: t("k_20bbd095"), detail: t("k_d0689981") };
        default:
            return { label: t("k_bd3488d0"), detail: t("k_4f1f8aa3") };
    }
}
export function resolvePinnedStagePresentation({ state, jobId = "", presentation, }) {
    const stagePresentation = { ...(presentation || {}) };
    const displayStage = keepDisplayedStageForward({
        state,
        stageKey: stagePresentation["stageKey"],
        jobId,
        trusted: Boolean(stagePresentation["stageKeyTrusted"]),
    });
    stagePresentation["stageKey"] = displayStage.stageKey;
    if (!displayStage.keptPrevious)
        return stagePresentation;
    const pinned = pinnedStagePresentation(displayStage.stageKey);
    return {
        ...stagePresentation,
        visualStageKey: displayStage.stageKey,
        label: pinned.label,
        detail: pinned.detail,
        progressText: "",
        progressCurrent: null,
        progressTotal: null,
        progressIndeterminate: false,
    };
}
