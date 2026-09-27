// 翻译凭据 profile 的纯逻辑：默认值、归一化与校验文案。

import {
  getTranslationProviderDefinition,
} from "@/platform/config/providers.js";
import { t } from "@retainpdf/i18n";

export type TranslationProfile = {
  apiKey: string;
  baseUrl: string;
  model: string;
  workers: number;
};

export function translationConfigError(baseUrl = "", model = "") {
  const normalizedBaseUrl = `${baseUrl || ""}`.trim();
  if (!normalizedBaseUrl) return t("k_eca9c972");
  try {
    const parsed = new URL(normalizedBaseUrl);
    if (!["http:", "https:"].includes(parsed.protocol) || !parsed.host) {
      return t("k_3f81e5fa");
    }
    if (parsed.username || parsed.password) {
      return t("k_93c576ec");
    }
  } catch {
    return t("k_3f81e5fa");
  }
  if (!`${model || ""}`.trim()) return t("k_12c5d83b");
  return "";
}

export function translationWorkersError(value: unknown, providerId = "custom") {
  const workers = Number(value);
  const definition = getTranslationProviderDefinition(providerId);
  const maxWorkers = Number(definition.maxWorkers) || 100;
  if (!Number.isInteger(workers) || workers < 1 || workers > maxWorkers) {
    return t("k_68488514", [maxWorkers]);
  }
  return "";
}

export function translationProfileDefaults(providerId = "custom"): TranslationProfile {
  const definition = getTranslationProviderDefinition(providerId);
  return {
    apiKey: "",
    baseUrl: definition.baseUrl || "",
    model: definition.defaultModel || "",
    workers: Number(definition.defaultWorkers) || 5,
  };
}

export function normalizeTranslationProfile(
  providerId = "custom",
  candidate: Record<string, unknown> = {},
): TranslationProfile {
  const defaults = translationProfileDefaults(providerId);
  const definition = getTranslationProviderDefinition(providerId);
  const workers = Number(candidate.workers);
  const maxWorkers = Number(definition.maxWorkers) || 100;
  return {
    apiKey: typeof candidate.apiKey === "string" ? candidate.apiKey : defaults.apiKey,
    baseUrl: providerId === "custom"
      ? `${candidate.baseUrl || defaults.baseUrl}`.trim()
      : defaults.baseUrl,
    model: `${candidate.model || defaults.model}`.trim(),
    workers: Number.isInteger(workers) && workers > 0 && workers <= maxWorkers
      ? workers
      : defaults.workers,
  };
}

type CredentialDialogLike = HTMLDialogElement | HTMLElement | boolean | null;

export function dialogDataset(dialog: CredentialDialogLike): DOMStringMap | undefined {
  if (dialog && typeof dialog === "object" && "dataset" in dialog) {
    return (dialog as HTMLElement).dataset;
  }
  return undefined;
}
