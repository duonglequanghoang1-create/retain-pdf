import {
  buildFrontendPageUrl,
  isMockMode,
} from "@/platform/config/runtime.js";
import { t } from "@retainpdf/i18n";

export function createJobDetailConfigPort({
  buildPageUrl = buildFrontendPageUrl,
  isMock = isMockMode,
} = {}) {
  function buildReaderPageUrl(jobId) {
    const normalizedJobId = `${jobId || ""}`.trim();
    if (!normalizedJobId) {
      return "";
    }
    return buildPageUrl("./reader.html", {
      job_id: normalizedJobId,
    });
  }

  function buildDetailPageUrl(jobId) {
    const normalizedJobId = `${jobId || ""}`.trim();
    if (!normalizedJobId) {
      return "";
    }
    return buildPageUrl("./detail.html", {
      job_id: normalizedJobId,
    });
  }

  function detailShareNote() {
    return isMock()
      ? t("k_76563e98")
      : t("k_97837c4d");
  }

  return Object.freeze({
    buildDetailPageUrl,
    buildReaderPageUrl,
    detailShareNote,
    isMock,
  });
}

export const defaultJobDetailConfigPort = createJobDetailConfigPort();
