import { t } from "@retainpdf/i18n";

// mock-only 适配器:index.ts 的 mockable() 只在 mock 模式调用这些实现。
export async function validateMineruToken(apiPrefix, payload) {
  void apiPrefix;
  void payload;
  return {
    ok: true,
    status: "valid",
    summary: t("k_16d5af72"),
  };
}

export async function validatePaddleToken(apiPrefix, payload) {
  void apiPrefix;
  void payload;
  return {
    ok: true,
    valid: true,
    summary: "mock mode: token validation skipped",
  };
}

export async function validateDeepSeekToken(apiPrefix, payload) {
  void apiPrefix;
  void payload;
  return {
    ok: true,
    valid: true,
    summary: "mock mode: token validation skipped",
  };
}

export async function queryDeepSeekBalance(apiPrefix, payload) {
  void apiPrefix;
  void payload;
  return {
    ok: true,
    status: "available",
    summary: t("k_dab6be46"),
    is_available: true,
    balance_infos: [
      {
        currency: "CNY",
        total_balance: "100.00",
        granted_balance: "0.00",
        topped_up_balance: "100.00",
      },
    ],
  };
}
