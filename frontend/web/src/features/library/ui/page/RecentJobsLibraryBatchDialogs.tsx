import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import { t } from "@retainpdf/i18n";

// 批量删除的两步确认弹窗(从 RecentJobsLibrary 抽出,保持同一 id/文案/回调)。
export function RecentJobsLibraryBatchDialogs({
  pendingDeleteIds,
  pendingBlockedDelete,
  blockedFavoriteTotal,
  batchBusy,
  onCancelDelete,
  onConfirmDelete,
  onCancelBlocked,
  onConfirmBlocked,
}) {
  return (
    <>
      <ConfirmDialog
        id="batch-delete-confirm-dialog"
        open={Boolean(pendingDeleteIds)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) onCancelDelete();
        }}
        title={t("k_57d9aa94")}
        description={t("k_f568237b", [pendingDeleteIds?.length || 0])}
        confirmLabel={t("k_3c06abe1")}
        pending={batchBusy}
        tone="danger"
        onConfirm={onConfirmDelete}
      />
      <ConfirmDialog
        id="batch-delete-favorites-confirm-dialog"
        open={Boolean(pendingBlockedDelete)}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) onCancelBlocked();
        }}
        title={t("k_61195208")}
        description={t("k_1d61d7c6", [pendingBlockedDelete?.length || 0, blockedFavoriteTotal])}
        confirmLabel={t("k_cc185f1c")}
        pending={batchBusy}
        tone="danger"
        onConfirm={onConfirmBlocked}
      />
    </>
  );
}
