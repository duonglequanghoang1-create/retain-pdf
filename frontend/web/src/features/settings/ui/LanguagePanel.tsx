// 设置 · 语言：切换界面语言。
//
// 为什么不放在组件里直接改 html lang：这个面板只负责改状态，真正的重绘靠
// useLocale() 订阅 setLocale() 的通知——t() 读的是模块级变量，React 不会
// 自己知道它变了。

import { getLocale, setLocale, t } from "@retainpdf/i18n";
import type { Locale } from "@retainpdf/i18n";
import { useLocale } from "@/platform/i18n/use-i18n.js";

const OPTIONS: Array<{ locale: Locale; label: string; note: string }> = [
  { locale: "zh", label: t("k_93659150"), note: "Simplified Chinese" },
  { locale: "vi", label: "Tiếng Việt", note: "Vietnamese" },
];

export function LanguagePanel() {
  const current = useLocale();
  return (
    <section className="app-settings-language" data-settings-language>
      <p className="app-settings-language-hint">{t("k_6ebd1b72")}</p>
      <div className="app-settings-language-options" role="radiogroup" aria-label={t("k_d5d8edd1")}>
        {OPTIONS.map((option) => {
          const active = option.locale === current;
          return (
            <button
              key={option.locale}
              type="button"
              role="radio"
              aria-checked={active}
              data-language-option={option.locale}
              className={active ? "app-settings-language-option is-active" : "app-settings-language-option"}
              onClick={() => setLocale(option.locale)}
            >
              <span className="app-settings-language-label">{option.label}</span>
              <span className="app-settings-language-note">{option.note}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export { getLocale };
export type { Locale };
