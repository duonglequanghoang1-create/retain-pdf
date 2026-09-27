// 详情页 hero 区:标题/分享提示、四个动作链接、断点恢复按钮、任务元信息。
// DOM 结构与类名照搬旧 detail.html,保证像素平权。
//
// 注意:#detail-rerun-btn 的 disabled 由旧世界逻辑(overview-renderer.js /
// resume.js bindRerunButton)在挂载后命令式管理;JSX 里恒定渲染 disabled,
// React 后续重渲染不会碰它(虚拟 DOM 无 diff),命令式写入得以保留。

import { MetaRow } from "./JobSummaryCard.jsx";
import { t } from "@retainpdf/i18n";

function ActionLink({ id, link, onClick, children }: any) {
  const enabled = Boolean(link?.enabled);
  const href = enabled && link?.url ? link.url : "#";
  return (
    <a
      id={id}
      className={enabled ? "button-link secondary" : "button-link secondary disabled"}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={link ? !enabled : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function DetailHeader({ t, links, onProtectedDownload }) {
  return (
    <section className="detail-hero">
      <div className="detail-hero-top">
        <div>
          <h1>{t("k_b19fb2fe")}</h1>
          <p id="detail-head-note">{t("detail-head-note", t("k_8b5abcda"))}</p>
        </div>
        <div className="detail-actions">
          <ActionLink id="detail-reader-btn" link={links["detail-reader-btn"]}>{t("k_5ca75802")}</ActionLink>
          <ActionLink
            id="detail-pdf-btn"
            link={links["detail-pdf-btn"]}
            onClick={onProtectedDownload((jobId) => `${jobId}.pdf`)}
          >
            {t("k_8aa3abe1")}
          </ActionLink>
          <ActionLink
            id="detail-markdown-raw-btn"
            link={links["detail-markdown-raw-btn"]}
            onClick={onProtectedDownload((jobId) => `${jobId}.md`)}
          >
            Markdown
          </ActionLink>
          <ActionLink
            id="detail-markdown-json-btn"
            link={links["detail-markdown-json-btn"]}
            onClick={onProtectedDownload((jobId) => `${jobId}-markdown.json`)}
          >
            Markdown JSON
          </ActionLink>
        </div>
      </div>
      <div className="detail-task-actions" aria-label={t("k_2ab11880")}>
        <button id="detail-rerun-btn" type="button" className="detail-trigger-btn" disabled>{t("k_edc186b1")}</button>
        <span id="detail-rerun-status" className="detail-inline-note">{t("detail-rerun-status", t("k_eabf123e"))}</span>
      </div>
      <div className="detail-meta-list">
        <MetaRow label={t("k_04151642")} id="detail-job-id" mono value={t("detail-job-id")} />
        <MetaRow label={t("k_4563f51a")} id="detail-status-summary" value={t("detail-status-summary")} />
        <MetaRow label={t("k_0a2489f6")} id="detail-stage-detail" value={t("detail-stage-detail")} />
        <MetaRow label={t("k_754a8a2e")} id="detail-finished-at" value={t("detail-finished-at")} />
      </div>
    </section>
  );
}
