import { buildErrorDiagnostic } from "@/platform/utils/error-diagnostics.js";
import type { RunSubmitFlowOptions, SetTextFn } from "./contracts.js";
import { t } from "@retainpdf/i18n";

// 提交失败的归一口径：missing_upload 由调用方判定并复位上传态；其余错误统一
// 落 error-box 诊断（operation/url/details 与原 submit-flow.ts 一致）。
export function reportSubmitError({
  err,
  workflow,
  apiPrefix,
  uploadId,
  currentRenderSourceJobId,
  collectRunPayload,
  setText,
}: {
  err: unknown;
  workflow?: string;
  apiPrefix?: string;
  uploadId?: string;
  currentRenderSourceJobId?: RunSubmitFlowOptions["currentRenderSourceJobId"];
  collectRunPayload?: RunSubmitFlowOptions["collectRunPayload"];
  setText?: SetTextFn;
}) {
  const isOcr = `${workflow || (collectRunPayload?.() as any)?.workflow || ""}`.trim() === "ocr";
  setText("error-box", buildErrorDiagnostic(err, {
    operation: t("k_72036345"),
    url: `${apiPrefix || ""}${isOcr ? "/ocr/jobs" : "/jobs"}`,
    details: {
      workflow,
      upload_id: uploadId,
      render_source_job_id: currentRenderSourceJobId?.(),
    },
  }));
}
