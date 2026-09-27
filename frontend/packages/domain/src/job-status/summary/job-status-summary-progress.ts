import {
  looksLikeProviderPercentProgress,
} from "./job-status-summary-helpers.js";
import { stageKeyOf, stageSubtypeOf, userStageFor } from "./job-status-summary-stage.js";
import {
  publicProgressOf,
} from "../progress/job-stage-progress-adapter.js";
import { t } from "@retainpdf/i18n";

export function summarizeStageProgressText(payload) {
  const progress = publicProgressOf(payload);
  const stage = userStageFor(payload);
  return progressTextForStageProgress({
    stageKey: stageKeyOf(payload),
    substageKey: stageSubtypeOf(payload),
    stage,
    progress,
  });
}

export function progressTextForStageProgress({
  stageKey = "",
  substageKey = "",
  stage = null,
  progress = {},
}: any = {}) {
  const current = progress.current;
  const total = progress.total;
  if (current === null || total === null || total <= 0) {
    return "";
  }
  const subtype = substageKey;
  const stageInfo = stage || { key: stageKey };
  const progressUnit = progress.unit || "";
  if (progressUnit === "percent") {
    return current > 0 ? t("k_b5937f62", [current]) : t("k_fcb979ef");
  }
  if (stageInfo.key === "render" && subtype === "render_compile") {
    return current >= total ? t("k_5b1f964f") : t("k_47682e9e");
  }
  if (stageInfo.key === "render" && subtype === "render_prewarm") {
    return t("k_f2d0e055", [current, total]);
  }
  if (stageInfo.key === "render" && subtype === "render_prepare") {
    return t("k_603455c5", [current, total]);
  }
  if (progressUnit === "page") {
    if (stageInfo.key === "ocr" && current <= 0) {
      return t("k_e8930319", [total]);
    }
    if (stageInfo.key === "render" && current <= 0) {
      return t("k_fcbbb211", [total]);
    }
    if (stageInfo.key === "render" && current >= total) {
      return t("k_9c3bee51", [total]);
    }
    return t("k_64aa4d66", [current, total]);
  }
  if (progressUnit === "batch") {
    return t("k_6a574df9", [current, total]);
  }
  if (progressUnit === "step") {
    if (stageInfo.key === "render") {
      return t("k_603455c5", [current, total]);
    }
    return t("k_7407e378", [current, total]);
  }
  if (subtype === "continuation_review" || subtype === "page_policies") {
    return t("k_64aa4d66", [current, total]);
  }
  if (subtype === "domain_inference" || subtype === "translation_prepare") {
    return t("k_7407e378", [current, total]);
  }
  if (stageInfo.key === "translate") {
    return t("k_6a574df9", [current, total]);
  }
  if (stageInfo.key === "ocr") {
    if (looksLikeProviderPercentProgress(current, total)) {
      return current > 0 ? `OCR ${current}%` : t("k_7b1e2576");
    }
    return t("k_64aa4d66", [current, total]);
  }
  if (stageInfo.key === "render") {
    return t("k_64aa4d66", [current, total]);
  }
  return t("k_7407e378", [current, total]);
}
