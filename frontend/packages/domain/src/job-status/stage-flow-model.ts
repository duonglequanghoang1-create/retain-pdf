import { t } from "@retainpdf/i18n";

export const STATUS_STAGE_FLOW = Object.freeze(["ocr", "translate", "render", "done"]);

export const STATUS_STAGE_LABELS = Object.freeze({
  ocr: "OCR",
  translate: t("k_23141370"),
  render: t("k_0d2759cb"),
  done: t("k_33246f6a"),
});

export function isStatusStageKey(stageKey = "") {
  return STATUS_STAGE_FLOW.includes(`${stageKey || ""}`.trim());
}

export function statusStageLabel(stageKey = "", fallback = t("k_bd3488d0")) {
  const normalized = `${stageKey || ""}`.trim();
  if (STATUS_STAGE_LABELS[normalized]) {
    return STATUS_STAGE_LABELS[normalized];
  }
  if (normalized === "failed") {
    return t("k_3e3c8068");
  }
  if (normalized === "canceled") {
    return t("k_a5ffdc95");
  }
  return fallback;
}

export function statusStageIndex(stageKey = "") {
  return STATUS_STAGE_FLOW.indexOf(`${stageKey || ""}`.trim());
}

export function isSelectableStatusStage(stageKey = "", currentStageKey = "") {
  const selectedIndex = statusStageIndex(stageKey);
  const currentIndex = statusStageIndex(currentStageKey);
  if (selectedIndex < 0 || currentIndex < 0) {
    return false;
  }
  return selectedIndex <= currentIndex;
}

export function resolveSelectedStatusStage({
  currentStageKey = "",
  selectedStageKey = "",
  manualStageSelection = false,
}: any = {}) {
  const current = `${currentStageKey || ""}`.trim();
  const selected = `${selectedStageKey || ""}`.trim();
  if (manualStageSelection && isSelectableStatusStage(selected, current)) {
    return {
      selectedStageKey: selected,
      manualStageSelection: true,
    };
  }
  return {
    selectedStageKey: isStatusStageKey(current) ? current : "",
    manualStageSelection: false,
  };
}

export function effectiveStatusFlowStageKey(snapshot = null) {
  const stageKey = `${snapshot?.stageKey || ""}`.trim();
  return isStatusStageKey(stageKey) ? stageKey : "";
}
