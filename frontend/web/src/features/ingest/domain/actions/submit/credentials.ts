import type { EnsureOcrCredentialsForSubmitOptions } from "./contracts.js";
import { t } from "@retainpdf/i18n";

export async function ensureOcrCredentialsForSubmit({
  workflow,
  desktopMode,
  workflowNeedsCredentials,
  ensureOcrCredentialsReady,
  openBrowserCredentialsDialog,
  setText,
}: EnsureOcrCredentialsForSubmitOptions = {}) {
  if (!workflowNeedsCredentials?.(workflow)) {
    return true;
  }
  return Boolean(await ensureOcrCredentialsReady?.({
    onMissingToken: () => {
      setText("error-box", t("k_7f6141aa"));
      if (!desktopMode) {
        openBrowserCredentialsDialog?.();
      }
    },
    onInvalidToken: (result) => {
      setText("error-box", result.summary || t("k_8b539dcb"));
      if (!desktopMode) {
        openBrowserCredentialsDialog?.();
      }
    },
  }));
}
