import { resolveRecoverableJobId } from "./active-job-recovery.js";
import { createRecentJobsRuntimePort } from "./job-runtime-port.js";
import { createRecentJobsReaderPort } from "./reader-port.js";
import { createRecentJobsNavigationPort } from "./navigation-port.js";
import { t } from "@retainpdf/i18n";

export function createRecentJobActions({
  apiPrefix,
  deleteLibraryBook,
  startPolling,
  openReader,
  currentJobId = () => "",
  jobRuntimePort = createRecentJobsRuntimePort({
    openJob: startPolling,
    currentJobId,
  }),
  readerPort = createRecentJobsReaderPort({
    openReader,
  }),
  closeRecentJobsDialog,
  activeJobRecoveryPort,
  navigationPort = createRecentJobsNavigationPort({
    closeDialog: closeRecentJobsDialog,
    currentJobId,
    jobRuntimePort,
    readerPort,
  }),
  renderCurrentRecentJobs,
  renderRecentJobsEmpty,
  renderRecentJobsError,
  statePort,
}: any) {
  let activeJobRecoveryAttempted = false;

  function selectJob(jobId) {
    const normalizedJobId = `${jobId || ""}`.trim();
    if (!normalizedJobId) {
      renderRecentJobsError(t("k_a2310d1d"), { reset: false });
      return;
    }
    navigationPort.openJob(normalizedJobId);
  }

  // 409 = 删除保护:该 job 被收藏引用,不能自动 force,必须让用户先处理收藏
  function friendlyDeleteError(error) {
    const message = `${error?.message || error || ""}`;
    if (error?.status === 409 || message.includes("(409)")) {
      // 结构化 favorite_count 优先；message 正则仅为旧错误源兜底。
      const structured = Number(error?.favoriteCount);
      const count = Number.isFinite(structured) && structured > 0
        ? structured
        : message.match(/\d+/)?.[0];
      return count
        ? t("k_3b35b854", [count])
        : t("k_fb86d2b0");
    }
    return message || t("k_72250c59");
  }

  async function deleteJob(jobId) {
    const normalizedJobId = `${jobId || ""}`.trim();
    if (!normalizedJobId || !deleteLibraryBook) {
      return;
    }
    try {
      await deleteLibraryBook(apiPrefix, normalizedJobId);
    } catch (error) {
      renderRecentJobsError(friendlyDeleteError(error), { reset: false });
      return;
    }
    statePort.removeJobFamily(normalizedJobId);
    const nextItems = statePort.getSnapshot().items;
    if (nextItems.length === 0) {
      renderRecentJobsEmpty(t("k_6e705816"));
      return;
    }
    renderCurrentRecentJobs({ reset: true });
  }

  function openJobReader(jobId, documentId = "") {
    const normalizedJobId = `${jobId || ""}`.trim();
    if (!normalizedJobId) {
      renderRecentJobsError(t("k_1c5642fe"), { reset: false });
      return;
    }
    navigationPort.openReader(normalizedJobId, `${documentId || ""}`.trim());
  }

  function recoverActiveJob(items = []) {
    if (activeJobRecoveryAttempted) {
      return;
    }
    if (navigationPort.currentJobId()) {
      activeJobRecoveryAttempted = true;
      return;
    }
    activeJobRecoveryAttempted = true;
    const jobId = resolveRecoverableJobId(items, activeJobRecoveryPort);
    if (!jobId) {
      return;
    }
    navigationPort.recoverJob(jobId);
  }

  return {
    deleteJob,
    openJobReader,
    recoverActiveJob,
    selectJob,
  };
}
