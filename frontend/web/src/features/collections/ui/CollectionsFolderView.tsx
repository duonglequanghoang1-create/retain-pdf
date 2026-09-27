// 文件夹展开后的详情视图:返回按钮 + 标题 + loading/error/empty/书目网格。
import { EmptyState } from "@/ui/icons/EmptyState.jsx";
import { BookCard, buildDefaultBookCardActions } from "@/features/library/index.js";
import type { CollectionsLibraryActions } from "./types.js";
import { t } from "@retainpdf/i18n";

type CollectionsFolderViewProps = {
  folder: { collection_id?: string; name?: string };
  loading: boolean;
  error: string;
  items: any[];
  onBack: () => void;
  onRetry: () => void;
  libraryActions: CollectionsLibraryActions;
};

export function CollectionsFolderView({
  folder,
  loading,
  error,
  items,
  onBack,
  onRetry,
  libraryActions,
}: CollectionsFolderViewProps) {
  return (
    <section id="categories-folder-view" className="library-view categories-view collections-view" aria-label={t("k_b60fcad7", [folder.name])} data-collections-view="true">
      <div className="categories-folder-head collections-folder-head">
        <button
          id="categories-back-btn"
          type="button"
          className="categories-back-btn"
          onClick={onBack}
        >
          {t("k_960da141")}
        </button>
        <h2>{folder.name}</h2>
      </div>
      {loading ? (
        <div className="events-empty">{t("k_1d08846f")}</div>
      ) : error ? (
        <div className="events-empty">
          <p>{error}</p>
          <button
            type="button"
            className="app-button secondary"
            style={{ marginTop: 12 }}
            onClick={onRetry}
          >
            {t("k_e2d53a6d")}
          </button>
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          instrument="balance"
          title={t("k_24dfc179")}
          hint={t("k_a44949d2")}
        />
      ) : (
        <div className="recent-jobs-list library-grid">
          {items.map((item) => (
            <BookCard
              key={item.job_id}
              item={item}
              actions={buildDefaultBookCardActions(item, {
                onReader: libraryActions.openJobReader,
                onReadSource: libraryActions.openSourceReader,
              })}
              onSelect={libraryActions.selectJob}
              onOpenDetail={libraryActions.openBookDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
}
