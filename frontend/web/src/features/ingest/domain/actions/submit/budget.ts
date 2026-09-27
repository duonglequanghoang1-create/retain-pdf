import { t } from "@retainpdf/i18n";
import { withTimeout } from "@/platform/utils/async-timeout.js";
import {
  DEEPSEEK_BALANCE_CHECK_TIMEOUT_MS,
  type EnsureDeepSeekBudgetReadyOptions,
  type NeedsDeepSeekBudgetCheckOptions,
} from "./contracts.js";
import { asBalanceResult, asBudgetState } from "./normalizers.js";

export function needsDeepSeekBudgetCheck({
  workflow,
  workflowNeedsUpload,
  currentBudgetState,
}: NeedsDeepSeekBudgetCheckOptions = {}) {
  const budget = asBudgetState(currentBudgetState?.());
  return Boolean(workflowNeedsUpload?.(workflow)) && Boolean(budget?.visible);
}

export async function ensureDeepSeekBudgetReady({
  workflow,
  workflowNeedsUpload,
  currentBudgetState,
  refreshDeepSeekBalance,
  setText,
  timeoutMs = DEEPSEEK_BALANCE_CHECK_TIMEOUT_MS,
}: EnsureDeepSeekBudgetReadyOptions = {}) {
  if (!needsDeepSeekBudgetCheck({ workflow, workflowNeedsUpload, currentBudgetState })) {
    return true;
  }
  setText("error-box", t("k_bb0af01d"));
  try {
    const result = asBalanceResult(await withTimeout(
      refreshDeepSeekBalance?.({ silent: true }) || Promise.resolve(null),
      timeoutMs,
      t("k_4d0424f2"),
    ));
    if (result?.status === "missing_key") {
      setText("error-box", t("k_717b5efb"));
      return false;
    }
    if (result?.status === "network_error") {
      setText("error-box", t("k_6fdb64df"));
      return false;
    }
  } catch (error) {
    setText("error-box", (error as { message?: string })?.message || t("k_cb4731e8"));
    return false;
  }
  const budget = asBudgetState(currentBudgetState?.());
  if (budget?.blocking) {
    setText("error-box", t("k_9a613ffd", [budget.message]));
    return false;
  }
  if (budget?.visible && !budget.balanceChecked) {
    setText("error-box", t("k_80b71de5"));
    return false;
  }
  return true;
}
