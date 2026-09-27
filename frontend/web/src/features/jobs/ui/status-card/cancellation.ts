// 取消判定：两卡共用「有任务 + 状态非空 + 非终态」。

import { isTerminalStatus } from "@retainpdf/domain/job";
import type {
  HasCancellableStatusCardJobOptions,
  StatusCardCancelDescription,
} from "./types.js";
import { t } from "@retainpdf/i18n";

// 两卡共用的可取消判定：有任务 + 状态非空 + 非终态。
// 白名单会漏掉 processing 等后端状态词，这里用非终态判断。
export function hasCancellableStatusCardJob(
  jobId: unknown,
  status: unknown,
  options: HasCancellableStatusCardJobOptions = {},
): boolean {
  const trimmedJobId = `${jobId ?? ""}`.trim();
  if (!trimmedJobId) return false;
  if (options.excludeDocPrefix && trimmedJobId.startsWith("doc:")) return false;
  const normalizedStatus = `${status ?? ""}`.trim().toLowerCase();
  if (normalizedStatus === "" || normalizedStatus === "cancelled") return false;
  return !isTerminalStatus(normalizedStatus);
}

export function describeStatusCardCancel(
  jobId: unknown,
  status: unknown,
  cancelDisabled: unknown,
  options: HasCancellableStatusCardJobOptions = {},
): StatusCardCancelDescription {
  const cancellable = hasCancellableStatusCardJob(jobId, status, options);
  const busy = Boolean(cancelDisabled);
  return {
    cancellable,
    disabled: !cancellable || busy,
    busy,
    title: busy ? t("k_138ab28d") : t("k_c4422259"),
    label: busy ? t("k_733d8ca1") : t("k_d258a63c"),
  };
}
