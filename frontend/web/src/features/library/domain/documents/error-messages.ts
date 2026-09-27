// 文档域的友好错误文案（纯函数，无副作用）。

import {
  blockedFavoriteCount,
  isDeleteBlockedByFavorites,
} from "./delete-blocked-favorites.js";
import { t } from "@retainpdf/i18n";

export type ErrorLike = {
  message?: string;
  status?: number;
  errorCode?: string;
  reason?: string;
} | string | null | undefined;

// 翻译失败的友好文案:后端最常见的失败是"没配 OCR/翻译凭据"
// (如 paddle_token is required),原文对用户没意义,给一句可操作提示;其余
// 错误至少把后端消息透出来(不再静默)。
export function friendlyTranslateError(error: ErrorLike, { reusingOcr = false } = {}): string {
  const message = typeof error === "string" ? error : `${error?.message || error || ""}`;
  const errorCode = typeof error === "object" && error
    ? `${error.errorCode || error.reason || ""}`.trim()
    : "";
  const structured = `${errorCode} ${message}`;
  if (/OCR_PAGE_COVERAGE_MISMATCH/i.test(structured)) {
    return t("k_7f9063cd");
  }
  if (/OCR_(?:JOB_NOT_FOUND|JOB_NOT_SUCCEEDED|ARTIFACT_MISSING|ARTIFACT_NOT_REUSABLE)/i.test(structured)) {
    return t("k_f971ccc0");
  }
  const credentialish = /(token|key|凭据|令牌|密钥|credential)/i.test(message);
  const missing = /(required|需要|缺|未配置|not configured|missing)/i.test(message);
  if (credentialish && missing) {
    return reusingOcr
      ? t("k_80c3c51f")
      : t("k_f012efb5");
  }
  return message || t("k_08df2867");
}

export function friendlyDocumentDeleteError(error: ErrorLike): string {
  const message = typeof error === "string" ? error : `${error?.message || error || ""}`;
  const status = typeof error === "object" && error ? error.status : undefined;
  if (isDeleteBlockedByFavorites(error) || status === 409 || message.includes("(409)")) {
    // 结构化字段优先；message 正则只作为旧错误源的兜底。
    const structured = blockedFavoriteCount(error);
    const count = structured > 0 ? structured : Number(message.match(/\d+/)?.[0]);
    return Number.isFinite(count) && count > 0
      ? t("k_3b35b854", [count])
      : t("k_fb86d2b0");
  }
  return message || t("k_c69ac417");
}
