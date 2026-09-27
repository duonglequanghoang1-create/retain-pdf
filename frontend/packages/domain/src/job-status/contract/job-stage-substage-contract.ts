import { t } from "@retainpdf/i18n";

const SUBSTAGE_DEFINITIONS = Object.freeze([
  {
    key: "ocr_submitting",
    stageKey: "ocr",
    aliases: ["ocr_submitting"],
    label: t("k_ebd26da4"),
    cardLabel: t("k_ebd26da4"),
    detail: t("k_0dcc7f0b"),
    progressRange: [0, 5],
    defaultProgressUnit: "step",
  },
  {
    key: "ocr_upload",
    stageKey: "ocr",
    aliases: ["ocr_upload", "mineru_upload"],
    label: t("k_a977650d"),
    cardLabel: t("k_a977650d"),
    detail: t("k_9bfdc543"),
    progressRange: [5, 15],
    defaultProgressUnit: "page",
  },
  {
    key: "ocr_processing",
    stageKey: "ocr",
    aliases: ["provider_processing", "mineru_processing", "ocr_processing"],
    label: t("k_9417cc31"),
    cardLabel: t("k_9417cc31"),
    detail: t("k_b30bb0a6"),
    progressRange: [15, 85],
    defaultProgressUnit: "page",
  },
  {
    key: "ocr_result_ready",
    stageKey: "ocr",
    aliases: ["ocr_result_ready"],
    label: t("k_e666110c"),
    cardLabel: t("k_e666110c"),
    detail: t("k_660d5fb4"),
    progressRange: [85, 90],
    defaultProgressUnit: "step",
  },
  {
    key: "normalizing",
    stageKey: "ocr",
    aliases: ["normalizing"],
    label: t("k_8a385b9d"),
    cardLabel: t("k_8a385b9d"),
    detail: t("k_73fe7f77"),
    progressRange: [90, 99],
    defaultProgressUnit: "step",
  },
  {
    key: "translation_prepare",
    stageKey: "translate",
    aliases: ["translation_prepare"],
    label: t("k_a74d9db6"),
    cardLabel: t("k_cc3ce6df"),
    detail: t("k_1a93fc08"),
    progressRange: [0, 5],
    defaultProgressUnit: "step",
  },
  {
    key: "domain_inference",
    stageKey: "translate",
    aliases: ["domain_inference"],
    label: t("k_503844ab"),
    cardLabel: t("k_388b18c8"),
    detail: t("k_cfecb8f6"),
    progressRange: [5, 10],
    defaultProgressUnit: "step",
  },
  {
    key: "page_policies",
    stageKey: "translate",
    aliases: ["page_policies", "page_policy"],
    label: t("k_2c828364"),
    cardLabel: t("k_2c828364"),
    detail: t("k_732e5e99"),
    progressRange: [18, 28],
    defaultProgressUnit: "page",
  },
  {
    key: "continuation_review",
    stageKey: "translate",
    aliases: ["continuation_review", "cross_page", "cross_column"],
    label: t("k_febacf6e"),
    cardLabel: t("k_84010a7b"),
    detail: t("k_b28be318"),
    progressRange: [10, 18],
    defaultProgressUnit: "page",
  },
  {
    key: "translation_batches",
    stageKey: "translate",
    aliases: ["translation_batches", "translating"],
    label: t("k_23141370"),
    cardLabel: t("k_47578ad1"),
    detail: t("k_576f69cb"),
    progressRange: [28, 82],
    defaultProgressUnit: "batch",
  },
  {
    key: "translation_tail_retry",
    stageKey: "translate",
    aliases: ["translation_tail_retry", "tail_retry"],
    label: t("k_811047c6"),
    cardLabel: t("k_811047c6"),
    detail: t("k_d27d5ec8"),
    progressRange: [82, 88],
    defaultProgressUnit: "batch",
  },
  {
    key: "garbled_repair",
    stageKey: "translate",
    aliases: ["garbled_repair"],
    label: t("k_f23b37b4"),
    cardLabel: t("k_f23b37b4"),
    detail: t("k_4235173c"),
    progressRange: [88, 93],
    defaultProgressUnit: "step",
  },
  {
    key: "agent_repair",
    stageKey: "translate",
    aliases: ["agent_repair"],
    label: t("k_b9ffb273"),
    cardLabel: t("k_b9ffb273"),
    detail: t("k_c7cf6d64"),
    progressRange: [93, 97],
    defaultProgressUnit: "step",
  },
  {
    key: "final_untranslated_recovery",
    stageKey: "translate",
    aliases: ["final_untranslated_recovery", "untranslated_recovery"],
    label: t("k_30da5a65"),
    cardLabel: t("k_30da5a65"),
    detail: t("k_b03e6241"),
    progressRange: [97, 99],
    defaultProgressUnit: "step",
  },
  {
    key: "render_prepare",
    stageKey: "render",
    aliases: ["render_prepare", "render_preprocess"],
    label: t("k_cc3ce6df"),
    cardLabel: t("k_cc3ce6df"),
    detail: t("k_11fccbe8"),
  },
  {
    key: "render_prewarm",
    stageKey: "render",
    aliases: ["render_prewarm"],
    label: t("k_8f5daed0"),
    cardLabel: t("k_8f5daed0"),
    detail: t("k_6ed4c202"),
  },
  {
    key: "render_pages",
    stageKey: "render",
    aliases: ["render_pages", "rendering"],
    label: t("k_06dfb846"),
    cardLabel: t("k_06dfb846"),
    detail: t("k_906d4232"),
  },
  {
    key: "render_compile",
    stageKey: "render",
    aliases: ["render_compile", "compile"],
    label: t("k_8669ee9e"),
    cardLabel: t("k_8669ee9e"),
    detail: t("k_47682e9e"),
  },
]);

const SUBSTAGE_BY_KEY = Object.freeze(Object.fromEntries(
  SUBSTAGE_DEFINITIONS.map((item) => [item.key, item]),
));

const SUBSTAGE_ALIAS_TO_KEY = Object.freeze(Object.fromEntries(
  SUBSTAGE_DEFINITIONS.flatMap((item) => [
    [item.key, item.key],
    ...(item.aliases || []).map((alias) => [alias, item.key]),
  ]),
));

export function normalizeSubstageKey(value = "") {
  const normalized = `${value || ""}`.trim().toLowerCase();
  return SUBSTAGE_ALIAS_TO_KEY[normalized] || "";
}

export function substageDefinitionForKey(key = "") {
  return SUBSTAGE_BY_KEY[normalizeSubstageKey(key) || key] || null;
}

export function substageDetail(key = "") {
  return substageDefinitionForKey(key)?.detail || "";
}

export function substageLabel(key = "") {
  return substageDefinitionForKey(key)?.label || "";
}

export function substageCardLabel(key = "") {
  const definition = substageDefinitionForKey(key);
  return definition?.cardLabel || definition?.label || "";
}

export function substagesForStage(stageKey = "") {
  const normalizedStage = `${stageKey || ""}`.trim();
  return SUBSTAGE_DEFINITIONS
    .filter((item) => item.stageKey === normalizedStage)
    .slice()
    .sort((left, right) => {
      const leftStart = Number(left.progressRange?.[0] ?? Number.POSITIVE_INFINITY);
      const rightStart = Number(right.progressRange?.[0] ?? Number.POSITIVE_INFINITY);
      if (leftStart !== rightStart) {
        return leftStart - rightStart;
      }
      return SUBSTAGE_DEFINITIONS.indexOf(left) - SUBSTAGE_DEFINITIONS.indexOf(right);
    })
    .map((item) => ({
      key: item.key,
      label: substageCardLabel(item.key),
    }));
}

export function substageLabelsForStage(stageKey = "") {
  return Object.fromEntries(
    SUBSTAGE_DEFINITIONS
      .filter((item) => item.stageKey === stageKey)
      .map((item) => [item.key, item.label]),
  );
}

export function substageProgressRange(key = "") {
  const range = substageDefinitionForKey(key)?.progressRange;
  return Array.isArray(range) && range.length === 2 ? range : null;
}

export function substageDefaultProgressUnit(key = "") {
  return substageDefinitionForKey(key)?.defaultProgressUnit || "";
}

export function visualStageKeyForSubstage(stageKey = "", substage = "") {
  const normalizedStage = `${stageKey || ""}`.trim();
  const normalizedSubstage = normalizeSubstageKey(substage);
  if (normalizedStage === "ocr" && normalizedSubstage) {
    if (normalizedSubstage === "normalizing") {
      return "ocr_normalizing";
    }
    return normalizedSubstage;
  }
  return "";
}
