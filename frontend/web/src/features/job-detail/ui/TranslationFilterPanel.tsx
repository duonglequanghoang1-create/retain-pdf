// 翻译调试:状态筛选 + 检索输入(受控草稿态,点击"刷新"或回车才提交
// applyTranslationFilter——镜像旧世界 readTranslationFilterQuery 只在提交时
// 读一次表单值的语义,不是每个按键都请求)。

import { useState } from "react";
import { STATUS_DETAIL_DIALOG_IDS } from "../domain/status-detail-dom-ids.js";
import { t } from "@retainpdf/i18n";

const FINAL_STATUS_OPTIONS = [
  { value: "", label: t("k_778fc8f9") },
  { value: "translated", label: t("k_6b1aa462") },
  { value: "partially_translated", label: t("k_89351c86") },
  { value: "kept_origin", label: t("k_a80b7cd4") },
  { value: "failed", label: t("k_3e3c8068") },
];

export function TranslationFilterPanel({ query, onApply }) {
  const [finalStatus, setFinalStatus] = useState(query.finalStatus || "");
  const [q, setQ] = useState(query.q || "");
  const ids = STATUS_DETAIL_DIALOG_IDS.translation;

  function submit() {
    onApply({ finalStatus: finalStatus.trim(), q: q.trim() });
  }

  return (
    <section className="translation-filter-panel">
      <div className="translation-filter-row">
        <label className="translation-filter-field">
          <span className="label">{t("k_62e951a6")}</span>
          <select
            id={ids.filterFinalStatus}
            value={finalStatus}
            onChange={(event) => setFinalStatus(event.target.value)}
          >
            {FINAL_STATUS_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className="translation-filter-field translation-filter-search">
          <span className="label">{t("k_1c037676")}</span>
          <input
            id={ids.filterQuery}
            type="search"
            placeholder={t("k_8b989f94")}
            value={q}
            onChange={(event) => setQ(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submit();
              }
            }}
          />
        </label>
        <button id={ids.filterApply} type="button" className="button-link secondary" onClick={submit}>{t("k_38108eaa")}</button>
      </div>
    </section>
  );
}
