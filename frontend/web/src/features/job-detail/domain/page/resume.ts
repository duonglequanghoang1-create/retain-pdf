import { firstJobIdFromPayload, firstNonEmpty as firstNonEmptyText } from "@retainpdf/domain/job";
import { buildDetailPageUrl } from "./routing.js";
import { retryJobStage } from "@retainpdf/api/jobs-actions";
import { API_PREFIX } from "@/platform/config/api-constants.js";
import { t } from "@retainpdf/i18n";

export { summarizeResumePlan } from "@retainpdf/domain/job";

export function bindRerunButton({
  detailPageState,
  getJobId,
  resumePort,
  setText,
}) {
  const button = document.getElementById("detail-rerun-btn") as HTMLButtonElement | null;
  button?.addEventListener("click", async () => {
    const jobId = detailPageState.job?.job_id || getJobId();
    const actionUrl = `${detailPageState.rerunActionUrl || ""}`.trim();
    if (!button || (!jobId && !actionUrl)) {
      setText("detail-rerun-status", t("k_fab2d822"));
      return;
    }
    // 409 后的二次确认走同一按钮的两步态（整页无 React，不用 ConfirmDialog）：
    // 首击 409 → 按钮变“确认仍要重试”，再击执行。其他路径清确认态。
    if (button.dataset?.confirmRisk === "1") {
      button.disabled = true;
      await retryTranslationWithRisk({ button, jobId, setText });
      return;
    }
    button.disabled = true;
    setText("detail-rerun-status", t("k_c9b88c89"));
    try {
      const payload = await resumePort.submit({ actionUrl, jobId });
      const nextJobId = firstJobIdFromPayload(payload);
      if (!nextJobId) {
        setText("detail-rerun-status", t("k_e9f16272"));
        return;
      }
      setText("detail-rerun-status", t("k_a384f4fc", [nextJobId]));
      window.location.href = buildDetailPageUrl(nextJobId);
    } catch (error) {
      const message = error.message || String(error);
      // 409 翻译歧义：通用重跑被后端暂停，直接报死用户就卡住了。
      // 给出路：二次确认重复风险后，用 retry-stage(translation) 显式重跑。
      if (/409|ambiguous/i.test(message)) {
        setText("detail-rerun-status", t("k_7ce89e95"));
        if (button.dataset) button.dataset.confirmRisk = "1";
        button.disabled = false;
        return;
      }
      setText("detail-rerun-status", message);
      if (button.dataset) button.dataset.confirmRisk = "";
      button.disabled = false;
    }
  });
}

async function retryTranslationWithRisk({ button, jobId, setText }) {
  const clearConfirm = () => { if (button.dataset) button.dataset.confirmRisk = ""; };
  try {
    setText("detail-rerun-status", t("k_7c36f9fe"));
    const retried = await retryJobStage(jobId, API_PREFIX, "translation", {
      ambiguous_request_policy: "accept_duplicate_risk",
    });
    const retryJobId = `${retried?.job_id || ""}`.trim();
    if (!retryJobId) {
      setText("detail-rerun-status", t("k_4bd539e6"));
      clearConfirm();
      button.disabled = false;
      return;
    }
    setText("detail-rerun-status", t("k_9624d08d", [retryJobId]));
    window.location.href = buildDetailPageUrl(retryJobId);
    return;
  } catch (retryError) {
    setText("detail-rerun-status", retryError.message || String(retryError));
    clearConfirm();
    button.disabled = false;
    return;
  }
}

