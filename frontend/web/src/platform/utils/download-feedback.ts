import { formatTransferSize } from "./downloads.js";
import { t } from "@retainpdf/i18n";

export interface DownloadToastState {
  visible?: boolean;
  title?: string;
  status?: string;
  meta?: string;
  percent?: number;
  tone?: string;
}

export interface DownloadToastElement extends HTMLElement {
  setState(state: DownloadToastState): void;
  hide(): void;
}

export interface ShowDownloadToastOptions {
  title?: string;
  status?: string;
  meta?: string;
  percent?: number;
  tone?: string;
}

export interface UpdateDownloadProgressOptions {
  filename?: string;
  receivedBytes?: number;
  totalBytes?: number;
  percent?: number;
}

let hideTimer = 0;

function toastElement(): DownloadToastElement | null {
  return (document.querySelector("download-toast") || document.getElementById("download-toast")) as DownloadToastElement | null;
}

function clearHideTimer() {
  if (hideTimer) {
    window.clearTimeout(hideTimer);
    hideTimer = 0;
  }
}

function summarizeProgress(receivedBytes, totalBytes, percent) {
  const receivedText = formatTransferSize(receivedBytes);
  if (Number.isFinite(totalBytes) && totalBytes > 0) {
    const totalText = formatTransferSize(totalBytes);
    const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
    return {
      status: t("k_ba323f16", [safePercent.toFixed(0)]),
      meta: `${receivedText} / ${totalText}`,
      percent: safePercent,
    };
  }
  return {
    status: t("k_1dce1b57"),
    meta: receivedText ? t("k_e7e6dd69", [receivedText]) : t("k_138c396c"),
    percent: NaN,
  };
}

export function showDownloadToast({
  title = t("k_327d59b5"),
  status = t("k_90ae404e"),
  meta = t("k_138c396c"),
  percent = NaN,
  tone = "progress",
}: ShowDownloadToastOptions = {}) {
  clearHideTimer();
  toastElement()?.setState({
    visible: true,
    title,
    status,
    meta,
    percent,
    tone,
  });
}

export function showDownloadPreparing(filename = "") {
  showDownloadToast({
    title: filename ? t("k_7f879ba2", [filename]) : t("k_327d59b5"),
    status: t("k_90ae404e"),
    meta: t("k_138c396c"),
    percent: NaN,
    tone: "progress",
  });
}

export function updateDownloadProgress({
  filename = "",
  receivedBytes = 0,
  totalBytes = NaN,
  percent = NaN,
}: UpdateDownloadProgressOptions = {}) {
  const summary = summarizeProgress(receivedBytes, totalBytes, percent);
  showDownloadToast({
    title: filename ? t("k_7f879ba2", [filename]) : t("k_327d59b5"),
    status: summary.status,
    meta: summary.meta,
    percent: summary.percent,
    tone: "progress",
  });
}

export function completeDownloadToast(filename = "") {
  clearHideTimer();
  toastElement()?.setState({
    visible: true,
    title: filename ? t("k_7f879ba2", [filename]) : t("k_4bbcf947"),
    status: t("k_3c4a08d9"),
    meta: t("k_02811b84"),
    percent: 100,
    tone: "success",
  });
  hideTimer = window.setTimeout(() => {
    toastElement()?.hide();
    hideTimer = 0;
  }, 1500);
}

export function failDownloadToast(message = t("k_e0dab22b")) {
  clearHideTimer();
  toastElement()?.setState({
    visible: true,
    title: t("k_e0dab22b"),
    status: message,
    meta: t("k_0bb32f48"),
    percent: 100,
    tone: "error",
  });
  hideTimer = window.setTimeout(() => {
    toastElement()?.hide();
    hideTimer = 0;
  }, 1800);
}
