import { t } from "@retainpdf/i18n";

export const DEFAULT_OCR_PROVIDER = "paddle";

export const OCR_PROVIDER_DEFINITIONS = [
  {
    id: "paddle",
    label: "PaddleOCR",
    description: t("k_094864a6"),
    tokenField: "paddle_token",
    runtimeConfigKey: "paddleToken",
    tokenLabel: "Paddle Access Token",
    tokenPlaceholder: "Paddle Access Token",
    validationButtonLabel: t("k_3bd5c384"),
    validationIdleMessage: t("k_90b74980"),
    validationMissingMessage: t("k_97bcefb0"),
    validationUnavailableMessage: "",
    docsUrl: "https://aistudio.baidu.com/account/accessToken",
    docsLabel: t("k_ac6fc394"),
    supportsValidation: true,
  },
  {
    id: "mineru",
    label: "MinerU",
    description: t("k_72b2aae2"),
    tokenField: "mineru_token",
    runtimeConfigKey: "mineruToken",
    tokenLabel: "MinerU API Token",
    tokenPlaceholder: "MinerU API Token",
    validationButtonLabel: t("k_9f95c19b"),
    validationIdleMessage: t("k_90b74980"),
    validationMissingMessage: t("k_70253b9d"),
    validationUnavailableMessage: "",
    docsUrl: "https://mineru.net/apiManage/docs",
    docsLabel: t("k_3bf60f4e"),
    supportsValidation: true,
  },
];

export const TRANSLATION_PROVIDER_DEFINITION = {
  id: "openai-compatible",
  label: t("k_9656be5f"),
  keyLabel: "API Key",
  keyPlaceholder: t("k_8f79e857"),
  description: t("k_d36279db"),
  docsUrl: "https://platform.deepseek.com/api_keys",
  docsLabel: "DeepSeek Key",
  validationButtonLabel: t("k_37c6909c"),
  validationIdleMessage: t("k_90b74980"),
  validationMissingMessage: t("k_9bee382b"),
  validationSuccessMessage: t("k_8310b9f2"),
  validationNetworkMessage: t("k_ce7a36fa"),
  validationUnauthorizedMessage: t("k_c0c5e7df"),
};

export const DEEPSEEK_TRANSLATION_BASE_URL = "https://api.deepseek.com/v1";
export const QWEN_TRANSLATION_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
export const ANTHROPIC_TRANSLATION_BASE_URL = "https://api.anthropic.com/v1";
export const OPENAI_TRANSLATION_BASE_URL = "https://api.openai.com/v1";
export const ZHIPU_TRANSLATION_BASE_URL = "https://open.bigmodel.cn/api/paas/v4";

export const TRANSLATION_PROVIDER_OPTIONS = [
  {
    id: "qwen",
    label: "Qwen",
    baseUrl: QWEN_TRANSLATION_BASE_URL,
    defaultModel: "qwen3.8-flash",
    defaultWorkers: 20,
    maxWorkers: 50,
    logoUrl: "src/assets/providers/qwen.svg",
    billingUrl: "https://platform.qianwenai.com/home/billing/overview",
    billingLabel: t("k_19ff1315"),
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    baseUrl: DEEPSEEK_TRANSLATION_BASE_URL,
    defaultModel: "deepseek-flash",
    defaultWorkers: 50,
    maxWorkers: 100,
    logoUrl: "src/assets/providers/deepseek.svg",
    docsUrl: TRANSLATION_PROVIDER_DEFINITION.docsUrl,
    docsLabel: TRANSLATION_PROVIDER_DEFINITION.docsLabel,
  },
  {
    id: "anthropic",
    label: "Anthropic",
    baseUrl: ANTHROPIC_TRANSLATION_BASE_URL,
    defaultModel: "claude-sonnet-5",
    defaultWorkers: 50,
    maxWorkers: 100,
    logoUrl: "src/assets/providers/anthropic.svg",
  },
  {
    id: "openai",
    label: "OpenAI",
    baseUrl: OPENAI_TRANSLATION_BASE_URL,
    defaultModel: "gpt-5.6-luna",
    defaultWorkers: 50,
    maxWorkers: 100,
    logoUrl: "src/assets/providers/openai.svg",
  },
  {
    id: "zhipu",
    label: t("k_90fd8f04"),
    baseUrl: ZHIPU_TRANSLATION_BASE_URL,
    defaultModel: "GLM-5.3-Flash",
    defaultWorkers: 5,
    maxWorkers: 50,
    logoUrl: "src/assets/providers/zai.svg",
    docsUrl: "https://bigmodel.cn/usercenter/proj-mgmt/apikeys",
    docsLabel: t("k_9cd4ae6b"),
    billingUrl: "https://bigmodel.cn/finance-center/finance/pay",
    billingLabel: t("k_e7c80480"),
  },
  {
    id: "custom",
    label: t("k_ed2da8c7"),
    baseUrl: "",
    defaultModel: "",
    defaultWorkers: 5,
    maxWorkers: 100,
    recommendedWorkers: 5,
    logoUrl: "",
  },
];

export function normalizeTranslationProvider(value = "") {
  const provider = `${value || ""}`.trim().toLowerCase();
  return TRANSLATION_PROVIDER_OPTIONS.some((item) => item.id === provider) ? provider : "custom";
}

export function inferTranslationProvider(baseUrl = "") {
  const raw = `${baseUrl || ""}`.trim();
  if (!raw) return "custom";
  if (isOfficialDeepSeekBaseUrl(raw)) return "deepseek";
  try {
    const parsed = new URL(raw);
    const normalizedPath = parsed.pathname.replace(/\/+$/, "");
    if (
      parsed.hostname.toLowerCase() === "dashscope.aliyuncs.com"
      && normalizedPath === "/compatible-mode/v1"
    ) {
      return "qwen";
    }
    if (parsed.hostname.toLowerCase() === "api.anthropic.com" && normalizedPath === "/v1") {
      return "anthropic";
    }
    if (parsed.hostname.toLowerCase() === "api.openai.com" && normalizedPath === "/v1") {
      return "openai";
    }
    if (
      parsed.hostname.toLowerCase() === "open.bigmodel.cn"
      && normalizedPath === "/api/paas/v4"
    ) {
      return "zhipu";
    }
  } catch {
    // 空值和未完成输入都属于自定义接口。
  }
  return "custom";
}

export function getTranslationProviderDefinition(provider = "") {
  const normalized = normalizeTranslationProvider(provider);
  return TRANSLATION_PROVIDER_OPTIONS.find((item) => item.id === normalized)
    || TRANSLATION_PROVIDER_OPTIONS[TRANSLATION_PROVIDER_OPTIONS.length - 1];
}

export function isOfficialDeepSeekBaseUrl(value = "") {
  const raw = `${value || ""}`.trim();
  if (!raw) return true;
  try {
    return new URL(raw).hostname.toLowerCase() === "api.deepseek.com";
  } catch {
    return false;
  }
}

export function normalizeOcrProvider(value) {
  const provider = `${value || ""}`.trim().toLowerCase();
  return OCR_PROVIDER_DEFINITIONS.some((item) => item.id === provider) ? provider : DEFAULT_OCR_PROVIDER;
}

export function getOcrProviderDefinition(provider) {
  return OCR_PROVIDER_DEFINITIONS.find((item) => item.id === normalizeOcrProvider(provider)) || OCR_PROVIDER_DEFINITIONS[0];
}
