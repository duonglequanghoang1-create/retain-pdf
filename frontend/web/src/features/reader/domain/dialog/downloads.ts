import {
  downloadProtectedResponse,
  formatTransferSize,
  prepareDownloadTarget,
} from "@/platform/utils/downloads.js";
import {
  completeDownloadToast,
  showDownloadPreparing,
  updateDownloadProgress,
} from "@/platform/utils/download-feedback.js";
import { t } from "@retainpdf/i18n";

export function summarizeDownloadProgress(receivedBytes, totalBytes, percent) {
  const receivedText = formatTransferSize(receivedBytes);
  if (Number.isFinite(totalBytes) && totalBytes > 0) {
    const totalText = formatTransferSize(totalBytes);
    const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
    return t("k_c08be5cc", [receivedText, totalText, safePercent.toFixed(0)]);
  }
  return receivedText ? t("k_e4c14873", [receivedText]) : t("k_1dce1b57");
}

export async function downloadProtectedResource(
  fetchProtected,
  url,
  fallbackName,
  preferredName = "",
  onStatus = null,
  onBusy = null,
) {
  const trimmedName = `${preferredName || ""}`.trim();
  const suggestedName = trimmedName || fallbackName;
  // 惰性:响应确认成功之后才问保存位置（见 downloads.ts）。
  const downloadTarget = () => prepareDownloadTarget(suggestedName);
  if (typeof onBusy === "function") {
    onBusy(true, t("k_a0ef0da2"));
  }
  try {
    showDownloadPreparing(suggestedName);
    return await downloadProtectedResponse({
      fetchResponse: () => fetchProtected(url),
      url,
      fallbackName,
      preferredName: trimmedName,
      target: downloadTarget,
      onProgress: ({ filename, receivedBytes, totalBytes, percent, done }) => {
        if (typeof onStatus === "function") {
          onStatus({ filename, receivedBytes, totalBytes, percent, done });
        }
        if (typeof onBusy === "function") {
          onBusy(
            true,
            done
              ? t("k_e99b48a2")
              : Number.isFinite(percent)
                ? `${Math.max(0, Math.min(100, Number(percent) || 0)).toFixed(0)}%`
                : t("k_a0ef0da2"),
          );
        }
        if (done) {
          completeDownloadToast(filename);
          return;
        }
        updateDownloadProgress({ filename, receivedBytes, totalBytes, percent });
      },
    });
  } finally {
    if (typeof onBusy === "function") {
      window.setTimeout(() => onBusy(false), 240);
    }
  }
}
