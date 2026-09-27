import { t } from "@retainpdf/i18n";

export const USER_STAGE_FLOW = [
  {
    key: "ocr",
    label: t("k_9417cc31"),
    detail: t("k_d0689981"),
    matches: ["ocr", "parse", "mineru", "paddle", "normaliz", "document", "submit", "startup"],
  },
  {
    key: "translate",
    label: t("k_23141370"),
    detail: t("k_576f69cb"),
    matches: ["translat"],
  },
  {
    key: "render",
    label: t("k_0d2759cb"),
    detail: t("k_7c939ac7"),
    matches: ["render", "sav"],
  },
];

export const USER_STAGE_TOTAL = USER_STAGE_FLOW.length + 1;
