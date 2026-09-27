import { t } from "@retainpdf/i18n";
import { isMockMode, mockScenario } from "@/platform/config/runtime.js";
// Mock 演示模式提示条：URL 带 ?mock=demo / parallel 等时显示。
// 引导用户打开馆藏书 → 翻译 Tab → 翻译整本，看 live 进度动画。

export function MockModeBanner() {
  if (!isMockMode()) {
    return null;
  }
  const scenario = mockScenario() || "demo";
  return (
    <div
      id="mock-mode-banner"
      className="mock-mode-banner"
      role="status"
      data-mock-scenario={scenario}
    >
      <strong>{t("k_b7ae19ec")}</strong>
      <span>
        {t("k_58872c2b")}
      </span>
    </div>
  );
}
