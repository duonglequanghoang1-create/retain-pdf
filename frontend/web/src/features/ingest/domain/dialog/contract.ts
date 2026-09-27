import { APP_DIALOG_IDS } from "@/platform/contracts/app-contract.js";
import { t } from "@retainpdf/i18n";

export const TRANSLATION_WORKFLOW_MODES = Object.freeze({
  UPLOAD: "upload",
  STATUS: "status",
});

export const TRANSLATION_WORKFLOW_DIALOG = {
  ids: {
    dialog: APP_DIALOG_IDS.translationWorkflow,
    title: "translation-workflow-title",
    closeButton: "translation-workflow-close-btn",
  },
  datasets: {
    open: "open",
  },
  datasetValues: {
    open: "1",
    closed: "0",
  },
  classes: {
    hidden: "hidden",
    rootOpen: "translation-workflow-open",
    statusMode: "is-status-mode",
    uploadMode: "is-upload-mode",
  },
  copy: {
    statusTitle: t("k_01eaf9f5"),
    uploadTitle: t("k_34be0e84"),
    uploadDescription: t("k_2897cfa9"),
  },
};
