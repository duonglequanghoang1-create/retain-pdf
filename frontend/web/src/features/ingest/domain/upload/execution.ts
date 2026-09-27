// 选文件后的上传执行：大小/页数校验、提交请求、成功后落会话状态与页码范围。
//
// 从 controller.ts 抽出。依赖全部经参数注入，controller 只做装配。

import { withTimeout } from "@/platform/utils/async-timeout.js";
import { buildErrorDiagnostic } from "@/platform/utils/error-diagnostics.js";
import type { UploadPayload, UploadState, UploadStatePort } from "./state.js";
import type { UploadConfigPortLike, UploadResponsePayload, UploadViewPort } from "./ports.js";
import { t } from "@retainpdf/i18n";

const BALANCE_CHECK_TIMEOUT_MS = 12000;

export interface FileUploadHandlerDeps {
  viewPort: UploadViewPort;
  uploadState: Partial<UploadStatePort>;
  updateUploadState: (payload?: UploadPayload) => UploadState;
  updateAppliedPageRange: (value?: string) => UploadState;
  renderPageRangeSummary: () => void;
  currentPageRanges: () => string;
  resetUploadedFile?: () => void;
  resetUploadProgress?: () => void;
  clearFileInputValue?: () => void;
  setText: (id: string, value?: unknown) => void;
  applyWorkflowMode: () => void;
  refreshSubmitControls: () => void;
  refreshDeepSeekBalance?: ((options?: {
    silent?: boolean;
  }) => Promise<{ status?: string } | unknown>) | null;
  configPort: UploadConfigPortLike;
  apiPrefix?: string;
  frontMaxBytes: number;
  frontMaxPageCount: number;
  countPdfPages?: (file: File) => Promise<number> | number;
  defaultFileLabel: string;
  collectUploadFormData: (file: File) => FormData | unknown;
  submitUploadRequest: (
    url: string,
    formData: unknown,
    setProgress?: (loaded: number, total: number) => void,
  ) => Promise<UploadResponsePayload>;
  setUploadProgress?: (loaded: number, total: number) => void;
}

function formatByteLimit(bytes: unknown): string {
  const mb = Number(bytes) / (1024 * 1024);
  return Number.isFinite(mb) && mb > 0 ? `${Math.round(mb)}MB` : t("k_25e74dce");
}

export function createFileUploadHandler(deps: FileUploadHandlerDeps) {
  const {
    viewPort,
    uploadState,
    updateUploadState,
    updateAppliedPageRange,
    renderPageRangeSummary,
    currentPageRanges,
    resetUploadedFile,
    resetUploadProgress,
    clearFileInputValue,
    setText,
    applyWorkflowMode,
    refreshSubmitControls,
    refreshDeepSeekBalance,
    configPort,
    apiPrefix,
    frontMaxBytes,
    frontMaxPageCount,
    countPdfPages,
    defaultFileLabel,
    collectUploadFormData,
    submitUploadRequest,
    setUploadProgress,
  } = deps;

  async function handleFileSelected(): Promise<void> {
    const file = viewPort.selectedFile();
    uploadState.reset?.();
    resetUploadedFile?.();
    resetUploadProgress?.();
    viewPort.clearPageRanges();
    renderPageRangeSummary();
    applyWorkflowMode();
    viewPort.setFileLabel(file, defaultFileLabel);
    if (!file) {
      return;
    }
    if (file.size > frontMaxBytes) {
      setText("error-box", t("k_e9741cf5", [formatByteLimit(frontMaxBytes)]));
      viewPort.showUploadStatus(t("k_f9c82d72"));
      return;
    }
    if (frontMaxPageCount && countPdfPages) {
      viewPort.showUploadStatus(t("k_08138d5e"));
      try {
        const localPageCount = await countPdfPages(file);
        if (!Number.isFinite(localPageCount) || localPageCount <= 0) {
          setText("error-box", t("k_b368abfa"));
          viewPort.showUploadStatus(t("k_87a79315"));
          clearFileInputValue?.();
          return;
        }
        if (localPageCount > frontMaxPageCount) {
          setText("error-box", t("k_884de361", [frontMaxPageCount]));
          viewPort.showUploadStatus(t("k_4a863adb"));
          clearFileInputValue?.();
          return;
        }
      } catch (err) {
        setText("error-box", buildErrorDiagnostic(err, {
          operation: t("k_7a58b04c"),
          details: {
            file_name: file.name,
            file_size: file.size,
            max_pages: frontMaxPageCount,
          },
        }));
        viewPort.showUploadStatus(t("k_87a79315"));
        clearFileInputValue?.();
        return;
      }
    }
    setText("error-box", "-");
    viewPort.showUploadStatus(t("k_c5624ed9"));

    const uploadUrl = configPort.buildUploadUrl(apiPrefix);
    try {
      const payload = await submitUploadRequest(
        uploadUrl,
        collectUploadFormData(file),
        setUploadProgress,
      );
      const uploadedPageCount = Number(payload.page_count || 0);
      if (frontMaxPageCount > 0 && uploadedPageCount > frontMaxPageCount) {
        setText("error-box", t("k_884de361", [frontMaxPageCount]));
        viewPort.showUploadStatus(t("k_4a863adb"));
        clearFileInputValue?.();
        resetUploadedFile?.();
        return;
      }
      const snapshot = updateUploadState({
        uploadId: payload.upload_id || "",
        documentId: payload.document_id || "",
        uploadedFileName: payload.filename || file.name,
        uploadedPageCount,
        uploadedBytes: Number(payload.bytes || file.size || 0),
      });
      viewPort.writePageRanges({
        start: uploadedPageCount > 0 ? "1" : "",
        end: uploadedPageCount > 0 ? `${uploadedPageCount}` : "",
      });
      updateAppliedPageRange(currentPageRanges());
      viewPort.markUploadReady(!!snapshot.uploadId);
      // 成功态只落一条稳定文案：余额检查全程静默，只在失败/缺失时追加一句，
      // 不再覆盖成功态（曾在 800ms 内连刷三条状态造成闪烁）。
      const uploadDoneStatus = t("k_29e5ffad");
      viewPort.showUploadStatus(uploadDoneStatus);
      clearFileInputValue?.();
      renderPageRangeSummary();
      refreshSubmitControls();
      if (refreshDeepSeekBalance) {
        void withTimeout(
          refreshDeepSeekBalance({ silent: true }),
          BALANCE_CHECK_TIMEOUT_MS,
          t("k_2e709003"),
        )
          .then((result) => {
            const status = `${(result as { status?: string } | null | undefined)?.status || ""}`;
            if (status === "network_error" || status === "missing_key") {
              viewPort.showUploadStatus(t("k_ff2c0e0c", [uploadDoneStatus]));
            }
          })
          .catch(() => {
            viewPort.showUploadStatus(t("k_ff2c0e0c", [uploadDoneStatus]));
          })
          .finally(() => {
            refreshSubmitControls();
          });
      }
    } catch (err) {
      resetUploadedFile?.();
      clearFileInputValue?.();
      setText("error-box", buildErrorDiagnostic(err, {
        operation: t("k_4b7553c2"),
        url: uploadUrl,
        details: {
          file_name: file.name,
          file_size: file.size,
          max_pages: frontMaxPageCount,
        },
      }));
      viewPort.showUploadStatus(t("k_a6f80569"));
      applyWorkflowMode();
    }
  }

  return { handleFileSelected };
}
