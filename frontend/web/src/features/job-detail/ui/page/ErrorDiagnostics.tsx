// 失败调试上下文卡片。#detail-failure-debug-context 是「命令式孤岛」:
// 内容由保留的旧模块 src/js/job-detail/failure.js(经 overview-renderer.js)
// 在数据加载后以 innerHTML 写入。React 侧用 memo 固定为叶子容器、
// 不渲染动态子节点,重渲染时不会触碰命令式写入的内容。

import { t } from "@retainpdf/i18n";
import { memo } from "react";

export const ErrorDiagnostics = memo(function ErrorDiagnostics() {
  return (
    <article className="detail-card detail-card-wide">
      <h2>{t("k_07e65230")}</h2>
      <div id="detail-failure-debug-context" className="detail-debug-context">
        <div className="detail-empty">{t("k_bdac57b5")}</div>
      </div>
    </article>
  );
});
