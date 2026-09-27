import { EmptyState } from "@/ui/icons/EmptyState.jsx";
import { t } from "@retainpdf/i18n";

// 图书馆空态/加载态/错误态(从 RecentJobsLibrary 抽出,保持同一 DOM 契约)。
export function RecentJobsLibraryEmpty({ mode, errorMessage, emptyMessage, onUpload }) {
  return (
    <div id="recent-jobs-empty" className={mode === "list" ? "hidden" : undefined}>
      {mode === "loading" ? (
        <div className="events-empty">正在加载最近任务…</div>
      ) : mode === "error" ? (
        <div className="events-empty">{errorMessage}</div>
      ) : (
        <EmptyState
          instrument="microscope"
          title={emptyMessage || t("k_6e705816")}
          hint={t("k_a3291124")}
        >
          <button
            type="button"
            className="app-button empty-state-action"
            onClick={onUpload}
          >
            上传 PDF
          </button>
        </EmptyState>
      )}
    </div>
  );
}
