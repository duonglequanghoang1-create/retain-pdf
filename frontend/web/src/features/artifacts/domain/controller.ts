import {
  downloadProtectedResponse,
  formatTransferSize,
  prepareDownloadTarget,
} from "@/platform/utils/downloads.js";
import {
  completeDownloadToast,
  failDownloadToast,
  showDownloadPreparing,
  updateDownloadProgress,
} from "@/platform/utils/download-feedback.js";
import { buildErrorDiagnostic } from "@/platform/utils/error-diagnostics.js";
import {
  downloadActionForLink,
  defaultDownloadNameResolver,
  resolveDownloadActionTarget,
} from "./download-actions.js";
import { createArtifactDownloadsRuntimePort } from "./runtime-port.js";
import { t } from "@retainpdf/i18n";

export function mountArtifactDownloadsFeature({
  state,
  fetchProtected,
  setText,
  runtimePort = createArtifactDownloadsRuntimePort(),
  viewPort,
  downloadNameResolver = defaultDownloadNameResolver,
}: any) {
  function summarizeDownloadProgress(receivedBytes, totalBytes, percent) {
    const receivedText = formatTransferSize(receivedBytes);
    if (Number.isFinite(totalBytes) && totalBytes > 0) {
      const totalText = formatTransferSize(totalBytes);
      const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
      return t("k_c08be5cc", [receivedText, totalText, safePercent.toFixed(0)]);
    }
    return receivedText ? t("k_e4c14873", [receivedText]) : t("k_1dce1b57");
  }

  async function handleProtectedArtifactClick(event, matchedLink = null) {
    const link = matchedLink || event.currentTarget;
    if (!link) {
      return;
    }
    const disabled = viewPort.isLinkDisabled(link);
    const url = link.dataset.url || "";
    if (disabled || !url) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setText("error-box", "-");
    const action = downloadActionForLink(link);
    const jobId = runtimePort.currentJobId(state) || "result";
    const {
      fallbackName,
      preferredName,
      preferSuggestedName,
    } = resolveDownloadActionTarget({
      action,
      state,
      jobId,
      nameResolver: downloadNameResolver,
    });
    // 惰性:响应确认成功之后才问保存位置（见 downloads.ts）。
    const downloadTarget = () => prepareDownloadTarget(preferredName);

    try {
      viewPort.setLinkBusy(link, true, t("k_a0ef0da2"));
      showDownloadPreparing(preferredName);
      await downloadProtectedResponse({
        fetchResponse: () => fetchProtected(url),
        url,
        fallbackName,
        preferredName: preferSuggestedName ? preferredName : "",
        target: downloadTarget,
        onProgress: ({ filename, receivedBytes, totalBytes, percent, done }) => {
          if (done) {
            setText("error-box", t("k_f10e354e", [filename]));
            viewPort.setLinkBusy(link, true, t("k_e99b48a2"));
            completeDownloadToast(filename);
            return;
          }
          setText("error-box", summarizeDownloadProgress(receivedBytes, totalBytes, percent));
          viewPort.setLinkBusy(
            link,
            true,
            Number.isFinite(percent) ? `${Math.max(0, Math.min(100, Number(percent) || 0)).toFixed(0)}%` : t("k_a0ef0da2"),
          );
          updateDownloadProgress({
            filename,
            receivedBytes,
            totalBytes,
            percent,
          });
        },
      });
    } catch (err) {
      setText("error-box", buildErrorDiagnostic(err, {
        operation: t("k_4ae24771"),
        url,
        jobId,
        details: {
          action,
          filename: preferredName,
        },
      }));
      failDownloadToast(err.message || t("k_e0dab22b"));
    } finally {
      viewPort.setLinkBusy(link, false);
    }
  }

  function bindEvents() {
    const unbind = viewPort.bindProtectedLinks(handleProtectedArtifactClick);
    return typeof unbind === "function" ? unbind : () => {};
  }

  return {
    bindEvents,
    handleProtectedArtifactClick,
  };
}
