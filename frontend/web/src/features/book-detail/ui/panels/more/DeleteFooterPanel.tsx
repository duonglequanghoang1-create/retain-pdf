// 右栏：错误提示 + 删除确认（ConfirmDialog 二次确认）。

import { useState } from "react";
import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import { Trash2 } from "lucide-react";
import { t } from "@retainpdf/i18n";

/**
 * @param {object} props
 * @param {string} [props.error]
 * @param {string|boolean} props.busy
 * @param {() => void} props.onDelete
 * @param {string} [props.title] 确认框展示的书名
 */
export function DeleteFooterPanel({
  error,
  busy,
  onDelete,
  title = "",
  blockedFavoriteCount = 0,
  onClearFavorites,
  onDismissBlocked,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const bookName = `${title || ""}`.trim();
  // 第一次删除被收藏挡住时，hook 会把结构化 409 的条数传下来，这里弹出第二步确认。
  const clearFavoritesOpen = blockedFavoriteCount > 0;
  return (
    <>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      <div className="book-detail-delete-panel border-t border-border/30 pt-3">
        <button
          id="book-detail-delete-btn"
          type="button"
          disabled={Boolean(busy)}
          onClick={() => setConfirmOpen(true)}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:bg-muted hover:text-foreground disabled:opacity-55"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          删除
        </button>
        <ConfirmDialog
          id="book-detail-delete-confirm"
          title={t("k_50706caa")}
          description={bookName ? t("k_196f4686", [bookName]) : t("k_5bb20c68")}
          confirmLabel={t("k_3755f56f")}
          tone="danger"
          level="nested"
          open={confirmOpen}
          pending={busy === "delete"}
          onOpenChange={(next) => { if (!next) setConfirmOpen(false); }}
          onConfirm={() => { setConfirmOpen(false); onDelete(); }}
        />
        <ConfirmDialog
          id="book-detail-clear-favorites-confirm"
          title={t("k_77642d4f")}
          description={t("k_753a22cb", [blockedFavoriteCount])}
          confirmLabel={t("k_cc185f1c")}
          tone="danger"
          level="nested"
          open={clearFavoritesOpen}
          pending={busy === "delete"}
          onOpenChange={(next) => { if (!next) onDismissBlocked?.(); }}
          onConfirm={() => onClearFavorites?.()}
        />
      </div>
    </>
  );
}
