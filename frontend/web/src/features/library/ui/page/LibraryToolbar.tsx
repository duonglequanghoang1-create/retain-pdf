// 书架工具栏(照搬 PDF_MD_lib 的 LibraryCollectionContextBar):左侧上下文标签 +
// 数量;右侧排序下拉 + 网格/列表切换(筛选按钮在后续阶段接)。

import { cn } from "@retainpdf/ui/lib/utils";
import { t } from "@retainpdf/i18n";

const SORT_OPTIONS = [
  { value: "updated", label: t("k_80920cd6") },
  { value: "created", label: t("k_89ff67ee") },
  { value: "opened", label: t("k_acb9bd27") },
  { value: "title", label: t("k_748d7dc7") },
];

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="14" height="14">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconList() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="14" height="14" strokeLinecap="round">
      <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </svg>
  );
}
function IconCheckSquare(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" width="14" height="14" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

export function LibraryToolbar({
  count, viewMode, setViewMode, sortMode, setSortMode, filterSlot = null,
  batchMode = false, onToggleBatchMode = null,
}) {
  return (
    <div className="mb-4 border-b border-border/10 pb-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate text-[15px] font-semibold tracking-tight text-foreground/90 sm:text-[16px]">{t("k_271083ed")}</span>
          {Number.isFinite(count) ? (
            <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-muted/45 px-2 text-[11px] tabular-nums text-muted-foreground/70">{count}</span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {onToggleBatchMode ? (
            <button
              type="button"
              title={t("k_eae7c2c8")} aria-label={t("k_eae7c2c8")} aria-pressed={batchMode}
              onClick={() => onToggleBatchMode(!batchMode)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-[var(--btn-radius)] px-3 text-xs transition active:scale-95",
                batchMode ? "bg-secondary text-secondary-foreground" : "border border-border text-foreground hover:bg-muted/30",
              )}
            ><IconCheckSquare className="opacity-70" />{t("k_1ba909c4")}</button>
          ) : null}

          {filterSlot}

          <label className="inline-flex h-8 shrink-0 items-center rounded-[var(--btn-radius)] px-2.5 text-xs transition-colors hover:bg-muted/30">
            <span className="sr-only">{t("k_dc35af8d")}</span>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
              aria-label={t("k_3bf3689a")}
              className="h-full max-w-[7.5rem] cursor-pointer rounded-none border-0 bg-transparent py-0 pl-0 pr-5 text-xs text-foreground/90 outline-none"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>

          <div className="hidden h-5 w-px bg-border/15 sm:block" aria-hidden />

          <div className="inline-flex h-8 shrink-0 items-center rounded-[var(--btn-radius)] bg-muted/20 p-0.5" role="group" aria-label={t("k_cebbb470")}>
            <button
              type="button" title={t("k_cd1bbb12")} aria-label={t("k_63a3454e")} aria-pressed={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
              className={cn("inline-flex h-7 w-7 items-center justify-center rounded-[var(--btn-radius)] transition active:scale-90",
                viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground/45 hover:bg-background/60 hover:text-foreground")}
            ><IconGrid /></button>
            <button
              type="button" title={t("k_d46f82fd")} aria-label={t("k_1fd2104d")} aria-pressed={viewMode === "list"}
              onClick={() => setViewMode("list")}
              className={cn("inline-flex h-7 w-7 items-center justify-center rounded-[var(--btn-radius)] transition active:scale-90",
                viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground/45 hover:bg-background/60 hover:text-foreground")}
            ><IconList /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
