import { t } from "@retainpdf/i18n";

// ProviderPanels 家族共享的纯展示辅助。

export function storedSecretPlaceholder(label: string) {
  return t("k_446543a9", [label]);
}

export function resetHandlerFor(handlers) {
  return handlers?.resetOcrValidation || handlers?.resetPaddleValidation;
}
