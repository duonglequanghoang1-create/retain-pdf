// Markdown 悬浮预览：任务识别/译文 Markdown 产物

import { useRef, useState, type CSSProperties, type RefObject } from "react";
import { ChevronDown, ChevronUp, FileCode2, ListTree, Search } from "lucide-react";
import { findMarkdownSearchTargets } from "../../shared/content/markdown-search.js";
import { ReaderFloatShell } from "./ReaderFloatShell.js";
import { useReaderMarkdownDocument } from "./useReaderMarkdownDocument.js";
import { t } from "@retainpdf/i18n";

export type { MarkdownOutlineItem } from "../../shared/content/markdown-outline.js";
export { buildMarkdownOutline } from "../../shared/content/markdown-outline.js";
export {
  clearMarkdownSearchHighlights,
  findMarkdownSearchTargets,
} from "../../shared/content/markdown-search.js";
export {
  isProtectedMarkdownAssetUrl,
  startMarkdownImageLoading,
} from "../../shared/content/markdown-images.js";

export type ReaderMarkdownPanelProps = {
  open: boolean;
  jobId: string;
  sourceOnly: boolean;
  layout?: "floating" | "docked" | "workspace";
  side?: "left" | "right";
  onClose: () => void;
};

export function ReaderMarkdownPanel({
  open,
  jobId,
  sourceOnly,
  layout = "floating",
  side = "right",
  onClose,
}: ReaderMarkdownPanelProps) {
  const searchMatchesRef = useRef<HTMLElement[]>([]);
  const searchQueryRef = useRef("");
  const reapplySearchRef = useRef<() => void>(() => {});
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMatchCount, setSearchMatchCount] = useState(0);
  const [activeSearchIndex, setActiveSearchIndex] = useState(-1);

  const {
    contentRef,
    status,
    setStatus,
    outline,
    outlineComplete,
    setOutlineComplete,
    outlineCompleteRef,
    pendingResume,
    rebuildOutline,
    renderAllRef,
    pendingAnchorRef,
    resumeCleanupRef,
  } = useReaderMarkdownDocument({
    open,
    jobId,
    sourceOnly,
    searchQueryRef,
    reapplySearchRef,
  });

  const activateSearchMatch = (index: number, scroll = true) => {
    const matches = searchMatchesRef.current;
    matches.forEach((element) => element.classList.remove("reader-markdown-search-hit-active"));
    if (matches.length === 0) {
      setActiveSearchIndex(-1);
      return;
    }
    const normalized = (index + matches.length) % matches.length;
    const target = matches[normalized];
    target.classList.add("reader-markdown-search-hit-active");
    setActiveSearchIndex(normalized);
    if (scroll && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  const applySearch = (query: string, scroll = false) => {
    const needle = `${query || ""}`.trim();
    // 搜索要覆盖整篇：让分段渲染器解除视口暂停并把剩余块全部渲染；渲染完成后
    // 会再调一次 applySearch 重算匹配。
    renderAllRef.current = needle.length > 0;
    if (renderAllRef.current) resumeCleanupRef.current?.();
    if (!contentRef.current) return;
    const matches = findMarkdownSearchTargets(contentRef.current, query);
    searchMatchesRef.current = matches;
    setSearchMatchCount(matches.length);
    activateSearchMatch(matches.length > 0 ? 0 : -1, scroll);
  };

  reapplySearchRef.current = () => applySearch(searchQueryRef.current);

  return (
    <ReaderFloatShell
      id="reader-markdown-panel"
      open={open}
      title="Markdown"
      subtitle={layout === "docked" ? t("k_0d0bb3d6") : t("k_c21d200b")}
      titleIcon={<FileCode2 size={14} strokeWidth={2.25} aria-hidden />}
      storageKey="retainpdf.reader.markdown-float.pos.v1"
      ariaLabel={t("k_c712492f")}
      width={420}
      placement={layout === "workspace" ? "workspace" : layout === "docked" ? "dock-right" : "floating"}
      showHeader={layout !== "workspace"}
      className={layout === "workspace" ? `is-pane-${side}` : undefined}
      onClose={onClose}
      toolbar={(
        <span className="reader-notes-count">{status || t("k_b19bae5d")}</span>
      )}
    >
      <div className="reader-markdown-nav" aria-label={t("k_23ca2df7")}>
        <label className="reader-markdown-search">
          <Search size={13} aria-hidden />
          <input
            type="search"
            value={searchQuery}
            placeholder={t("k_24740e4e")}
            aria-label={t("k_8095db41")}
            onChange={(event) => {
              const query = event.target.value;
              searchQueryRef.current = query;
              setSearchQuery(query);
              applySearch(query, false);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" || searchMatchCount === 0) return;
              event.preventDefault();
              activateSearchMatch(activeSearchIndex + (event.shiftKey ? -1 : 1));
            }}
          />
          {searchQuery ? (
            <span className="reader-markdown-search-count" aria-live="polite">
              {searchMatchCount > 0 ? `${activeSearchIndex + 1}/${searchMatchCount}` : "0/0"}
            </span>
          ) : null}
          <button
            type="button"
            aria-label={t("k_b9dbcb51")}
            disabled={searchMatchCount === 0}
            onClick={() => activateSearchMatch(activeSearchIndex - 1)}
          >
            <ChevronUp size={13} aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t("k_f28ae565")}
            disabled={searchMatchCount === 0}
            onClick={() => activateSearchMatch(activeSearchIndex + 1)}
          >
            <ChevronDown size={13} aria-hidden />
          </button>
        </label>
        <button
          type="button"
          className="reader-markdown-outline-toggle"
          aria-expanded={outlineOpen}
          disabled={outline.length === 0}
          onClick={() => {
            // 打开目录前重算一次：覆盖所有已挂载块，而非只依赖增量追加。
            rebuildOutline();
            setOutlineComplete(outlineCompleteRef.current);
            setOutlineOpen((value) => !value);
          }}
        >
          <ListTree size={13} aria-hidden />
          {t("k_41e5243e")}{outline.length > 0 ? ` ${outline.length}` : ""}
        </button>
        {pendingResume ? (
          <button
            type="button"
            className="reader-markdown-resume"
            onClick={() => resumeCleanupRef.current?.()}
          >
            {t("k_4a467776")}
          </button>
        ) : null}
      </div>
      {outlineOpen && outline.length > 0 ? (
        <nav className="reader-markdown-outline" aria-label={t("k_f15eb0a3")}>
          {!outlineComplete ? (
            <p className="reader-markdown-outline-note">{t("k_5782b942")}</p>
          ) : null}
          {outline.map((item) => (
            <button
              key={item.id}
              type="button"
              style={{ "--reader-md-outline-level": item.level - 1 } as CSSProperties}
              onClick={() => {
                const target = [...(contentRef.current?.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6") || [])]
                  .find((heading) => heading.id === item.id);
                if (target && typeof target.scrollIntoView === "function") {
                  target.scrollIntoView({ block: "start", behavior: "smooth" });
                  return;
                }
                // 目标章节还没渲染：续带整篇并在命中后自动滚动，避免点了没反应。
                pendingAnchorRef.current = item.id;
                renderAllRef.current = true;
                resumeCleanupRef.current?.();
                setStatus(t("k_6cddd39b"));
              }}
            >
              {item.text}
            </button>
          ))}
        </nav>
      ) : null}
      {status && !contentRef.current?.childNodes?.length ? (
        <p className="reader-notes-empty">{status}</p>
      ) : null}
      <article
        ref={contentRef as RefObject<HTMLElement>}
        id="reader-markdown-content"
        className="reader-markdown-content reader-float-markdown-content"
      />
    </ReaderFloatShell>
  );
}
