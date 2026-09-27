import {
  resolveSubmitReadiness,
  SUBMIT_BLOCK_REASONS,
} from "@/platform/contracts/submit-readiness-contract.js";
import type {
  CurrentSubmitReadinessOptions,
  HandleSubmitReadinessBlockOptions,
} from "./contracts.js";
import { asBudgetState } from "./normalizers.js";
import { t } from "@retainpdf/i18n";

export function currentSubmitReadiness({
  workflow,
  configPort,
  desktopMode,
  desktopConfigured,
  uploadId,
  currentRenderSourceJobId,
  hasBrowserCredentials,
  workflowNeedsUpload,
  workflowNeedsCredentials,
  currentBudgetState,
}: CurrentSubmitReadinessOptions = {}) {
  return resolveSubmitReadiness({
    workflow,
    isMock: Boolean(configPort?.isMock?.()),
    desktopMode,
    desktopConfigured,
    uploadId,
    renderSourceJobId: currentRenderSourceJobId?.(),
    hasBrowserCredentials: Boolean(hasBrowserCredentials?.()),
    needsUpload: workflowNeedsUpload?.(workflow),
    needsCredentials: workflowNeedsCredentials?.(workflow),
    budgetBlocking: Boolean(asBudgetState(currentBudgetState?.())?.blocking),
  });
}

export function handleSubmitReadinessBlock({
  readiness,
  openSetupDialog,
  openBrowserCredentialsDialog,
  currentBudgetState,
  setText,
}: HandleSubmitReadinessBlockOptions = {}) {
  switch (readiness?.reason) {
    case SUBMIT_BLOCK_REASONS.DESKTOP_NOT_CONFIGURED:
      openSetupDialog?.();
      setText("error-box", t("k_6a45255c"));
      return true;
    case SUBMIT_BLOCK_REASONS.MISSING_CREDENTIALS:
      setText("error-box", t("k_7f6141aa"));
      openBrowserCredentialsDialog?.();
      return true;
    case SUBMIT_BLOCK_REASONS.MISSING_UPLOAD:
      setText("error-box", t("k_fddea773"));
      return true;
    case SUBMIT_BLOCK_REASONS.MISSING_RENDER_SOURCE:
      setText("error-box", t("k_20ad9b7c"));
      return true;
    case SUBMIT_BLOCK_REASONS.BUDGET_BLOCKING: {
      const budget = asBudgetState(currentBudgetState?.());
      setText("error-box", `余额不足：${budget?.message || t("k_e5f1e80f")}。请充值后再提交。`);
      return true;
    }
    default:
      return false;
  }
}
