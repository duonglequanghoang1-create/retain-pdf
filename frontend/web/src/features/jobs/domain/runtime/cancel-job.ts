import { t } from "@retainpdf/i18n";

/**
 * 取消当前任务：按 workflow 路由到 OCR / 通用取消接口，
 * 请求期间锁取消按钮，失败解锁，成功保持锁定直到权威状态变为 canceled。
 * fetch 回包增加超时兜底：N 秒无权威回包则恢复可点并提示，避免 fetch hang
 * 导致“取消中”永久锁定。
 */

// 权威回包等待上限：超时后解禁取消按钮，由用户决定是否重试取消。
export const CANCEL_FETCH_TIMEOUT_MS = 8000;

function describeCancelError(cause: unknown): string {
  const message = `${(cause as Error)?.message || cause || ""}`.trim();
  const base = message || t("k_1879afad");
  const punctuated = /[。！？!?.]$/.test(base) ? base : `${base}。`;
  return t("k_0230fb01", [punctuated]);
}

export function createCancelCurrentJob({
  currentJobPort,
  shellViewPort,
  setText,
  cancelJob,
  cancelOcrJob,
  apiPrefix,
  fetchJob,
  cancelFetchTimeoutMs = CANCEL_FETCH_TIMEOUT_MS,
}: any) {
  return async function cancelCurrentJob() {
    const jobId = currentJobPort.jobId();
    if (!jobId) {
      setText("error-box", t("k_4b50f87b"));
      return;
    }
    shellViewPort.setCancelDisabled(true);
    try {
      const snapshot = currentJobPort.snapshot?.() || {};
      const job = snapshot?.job && typeof snapshot.job === "object" ? snapshot.job : snapshot;
      const raw = job?.raw_response && typeof job.raw_response === "object" ? job.raw_response : job;
      const workflow = `${snapshot?.workflow || job?.workflow || raw?.workflow || ""}`.trim();
      const cancel = workflow === "ocr" ? cancelOcrJob : cancelJob;
      if (typeof cancel !== "function") {
        throw new Error(t("k_914e05a9"));
      }
      await cancel(jobId, apiPrefix);
      if (typeof fetchJob !== "function") return;
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      try {
        await Promise.race([
          fetchJob(jobId),
          new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
              const timeoutError = new Error(
                t("k_1d8d72df", [Math.round(cancelFetchTimeoutMs / 1000)]),
              );
              timeoutError.name = "CancelFetchTimeoutError";
              reject(timeoutError);
            }, cancelFetchTimeoutMs);
            // 注意：此处不 unref——fetch hang 时兜底定时器是唯一的恢复手段，
            // unref 会让它在 Node 环境下永不触发，按钮永久锁定。
          }),
        ]);
      } finally {
        if (timeoutId !== undefined) clearTimeout(timeoutId);
      }
    } catch (err) {
      // 请求失败/权威回包超时都允许用户重试；成功时保持锁定，直到权威状态变为 canceled。
      shellViewPort.setCancelDisabled(false);
      const message = describeCancelError(err);
      if (err?.name === "CancelFetchTimeoutError") {
        setText("error-box", t("k_38442107", [message]));
      } else {
        setText("error-box", message);
      }
    }
  };
}
