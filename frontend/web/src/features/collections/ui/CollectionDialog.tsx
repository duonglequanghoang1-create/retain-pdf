// 新建/管理合集对话框。外层走共享 AppDialog，内部保留名称与书目勾选表单，
// 焦点归还继续由 useDialogReturnFocus 负责。
//
// 交互借鉴参考项目 PDF_MD_lib 的 FolderManageModal(名称输入 + 从书库勾选),
// 简化成单栏勾选(不做手动排序——本次不做拖拽/排序,见调研计划「不做的事」)。
//
// dialogStore.payload = 正在编辑的 CollectionRecord,或 null(新建模式)。
// open() 由 CollectionsView.jsx（兼容名 CategoriesView）调用。这个对话框和 CollectionsView 是 HomeApp.jsx
// 下的兄弟节点(不是父子),保存/删除成功后没法直接 prop 回调回去——靠
// services.collections.reloadSignal(一个只有 version 字段的极简 store)桥接,
// 这里 bump 一次,CollectionsView 订阅到变化就重新拉取列表。

import { useEffect, useState } from "react";
import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogHeader,
  DialogShell,
  DialogTitle,
} from "@/ui/components/dialog.js";
import { Button as ButtonBase } from "@/ui/Button.jsx";
import { t } from "@retainpdf/i18n";

// Button.size 在未注解源文件里被推断为必填;unstyled 路径运行时不用 size。
const Button = ButtonBase as any;
import { useDialogState } from "@/ui/hooks/use-dialog-state.js";
import type {
  CollectionsController,
  CollectionsDialogStore,
  CollectionsReloadSignal,
} from "./CollectionsView.jsx";
import { useDialogReturnFocus } from "@/ui/hooks/use-dialog-return-focus.js";

export type CollectionDialogProps = {
  controller: CollectionsController;
  dialogStore: CollectionsDialogStore;
  reloadSignal: CollectionsReloadSignal;
};

export function CollectionDialog({
  controller,
  dialogStore,
  reloadSignal,
}: CollectionDialogProps) {
  const dialogState = useDialogState(dialogStore);
  const open = Boolean(dialogState.open);
  const editing = dialogState.payload;
  const isCreate = !editing;
  const { onCloseAutoFocus } = useDialogReturnFocus(open);

  const [name, setName] = useState("");
  const [allDocuments, setAllDocuments] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [originalIds, setOriginalIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setConfirmDeleteOpen(false);
      return undefined;
    }
    let cancelled = false;
    setError("");
    setName(editing?.name || "");
    // 已有书目数据时 soft 重拉（切编辑目标），不整表 loading 闪空
    setLoading((prev) => (allDocuments.length === 0 ? true : prev));
    const documentsPromise = controller.listAllDocuments();
    const memberIdsPromise = editing
      ? controller.listCollectionDocumentIds(editing.collection_id)
      : Promise.resolve([]);
    Promise.all([documentsPromise, memberIdsPromise])
      .then(([documents, memberIds]) => {
        if (cancelled) {
          return;
        }
        setAllDocuments(documents);
        setSelectedIds(memberIds);
        setOriginalIds(memberIds);
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        setError(err?.message || t("k_cb240c1e"));
      })
      .finally(() => {
        if (cancelled) {
          return;
        }
        setLoading(false);
      });
    // 关闭后快速为另一个合集重新打开(比如先编辑"化学"再编辑"机器学习"),
    // 两次 fetch 谁先 resolve 不确定——没有这个守卫的话,后关闭的那次请求
    // 如果晚到,会把已经在显示"机器学习"的表单覆盖回"化学"的书目数据。
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editing?.collection_id]);

  function handleOpenChange(nextOpen) {
    if (!nextOpen) {
      dialogStore.close();
    }
  }

  function toggleDocument(documentId) {
    setSelectedIds((prev) => (prev.includes(documentId)
      ? prev.filter((id) => id !== documentId)
      : [...prev, documentId]));
  }

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(t("k_3dfea34e"));
      return;
    }
    setSaving(true);
    setError("");
    try {
      let collectionId = editing?.collection_id || "";
      if (isCreate) {
        const created = await controller.createCollection({ name: trimmed }) as {
          collection_id?: string;
        };
        collectionId = created.collection_id || "";
      } else if (trimmed !== editing.name) {
        await controller.patchCollection(collectionId, { name: trimmed });
      }
      const toAdd = selectedIds.filter((id) => !originalIds.includes(id));
      const toRemove = originalIds.filter((id) => !selectedIds.includes(id));
      if (toAdd.length) {
        await controller.addDocuments(collectionId, toAdd);
      }
      for (const documentId of toRemove) {
        await controller.removeDocument(collectionId, documentId);
      }
      reloadSignal.actions.bump();
      dialogStore.close();
    } catch (err) {
      setError(err?.message || (isCreate ? t("k_e66e5a72") : t("k_1aae87e6")));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    setError("");
    try {
      await controller.deleteCollection(editing.collection_id);
      reloadSignal.actions.bump();
      dialogStore.close();
    } catch (err) {
      setError(err?.message || t("k_fce1d8bc"));
      setSaving(false);
    } finally {
      setConfirmDeleteOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          id="collection-manage-dialog"
          className="collection-manage-dialog"
          onCloseAutoFocus={onCloseAutoFocus}
          showCloseButton={false}
        >
          <DialogShell className="desktop-shell">
            <DialogHeader className="desktop-head">
              <DialogTitle asChild>
                <h2>{isCreate ? t("k_5a21456c") : t("k_941ff076")}</h2>
              </DialogTitle>
              <DialogCloseButton id="collection-manage-close-btn" />
            </DialogHeader>
            <DialogBody className="desktop-body collection-manage-body">
              <label className="collection-name-field">
                <span>名称</span>
                <input
                  id="collection-name-input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t("k_1ff6f468")}
                  autoFocus
                />
              </label>
              <div className="collection-doc-picker">
                <p className="muted">从书库勾选加入这个合集的书</p>
                {loading ? (
                  <div className="collection-doc-list-empty">正在加载书目…</div>
                ) : allDocuments.length === 0 ? (
                  <div className="collection-doc-list-empty">书库暂无书</div>
                ) : (
                  <ul className="collection-doc-list">
                    {allDocuments.map((doc) => (
                      <li key={doc.document_id}>
                        <label className="collection-doc-item">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(doc.document_id)}
                            onChange={() => toggleDocument(doc.document_id)}
                          />
                          <span className="collection-doc-title" title={doc.title}>{doc.title || doc.source_filename}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {error ? <p className="collection-manage-error">{error}</p> : null}
            </DialogBody>
            <div className="collection-manage-actions">
              {!isCreate ? (
                <Button
                  id="collection-delete-btn"
                  className="app-button secondary danger"
                  disabled={saving}
                  onClick={() => setConfirmDeleteOpen(true)}
                >
                  删除合集
                </Button>
              ) : <span />}
              <Button
                id="collection-save-btn"
                className="app-button"
                disabled={saving || loading}
                onClick={handleSave}
              >
                {saving ? t("k_6644f061") : t("k_fadf24db")}
              </Button>
            </div>
            <ConfirmDialog
              id="collection-delete-confirm"
              title={t("k_485aa434")}
              description={editing?.name ? t("k_b1daeac1", [editing.name]) : t("k_a29b7d63")}
              confirmLabel={t("k_3755f56f")}
              tone="danger"
              level="nested"
              open={confirmDeleteOpen}
              pending={saving}
              onOpenChange={(next) => { if (!next) setConfirmDeleteOpen(false); }}
              onConfirm={handleDelete}
            />
          </DialogShell>
        </DialogContent>
    </Dialog>
  );
}
