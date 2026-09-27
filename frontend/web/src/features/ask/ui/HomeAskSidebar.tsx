// Notion 式左侧历史：可折叠 + 重命名 + 按时间分组

import { useEffect, useRef, useState } from "react";
import {
  Check,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import type { HomeAskSession } from "./use-home-ask-runtime.js";
import { t as tr } from "@retainpdf/i18n";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function groupLabel(updatedAt: string, now = Date.now()): string {
  const t = Date.parse(updatedAt);
  if (!Number.isFinite(t)) return tr("k_c371ec78");
  const day = startOfDay(new Date(t));
  const today = startOfDay(new Date(now));
  const diffDays = Math.round((today - day) / 86400000);
  if (diffDays <= 0) return tr("k_17e83cc2");
  if (diffDays === 1) return tr("k_59c4fcb0");
  if (diffDays < 7) return tr("k_767768b5");
  if (diffDays < 30) return tr("k_c9e8f0be");
  return tr("k_c371ec78");
}

function groupSessions(sessions: HomeAskSession[]) {
  const order = [tr("k_17e83cc2"), tr("k_59c4fcb0"), tr("k_767768b5"), tr("k_c9e8f0be"), tr("k_c371ec78")];
  const map = new Map<string, HomeAskSession[]>();
  for (const s of sessions) {
    const label = groupLabel(s.updatedAt);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(s);
  }
  return order
    .filter((k) => map.has(k))
    .map((label) => ({ label, items: map.get(label)! }));
}

function displayTitle(raw: string): string {
  const m = `${raw || ""}`.match(/^fork-(\d+)-(.*)$/i);
  if (!m) return raw || tr("k_8200c3d5");
  const rest = m[2].trim();
  return rest ? tr("k_07ad5074", [rest, m[1]]) : tr("k_bfe8bdfc", [m[1]]);
}

export type HomeAskSidebarProps = {
  sessions: HomeAskSession[];
  activeId: string;
  loading?: boolean;
  busy?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void | Promise<boolean>;
};

export function HomeAskSidebar({
  sessions,
  activeId,
  loading = false,
  busy = false,
  collapsed = false,
  onCollapsedChange,
  onNew,
  onSelect,
  onDelete,
  onRename,
}: HomeAskSidebarProps) {
  const [pendingDelete, setPendingDelete] = useState<HomeAskSession | null>(null);
  const groups = groupSessions(sessions);
  const [editingId, setEditingId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editingId) return;
    const el = editInputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [editingId]);

  const startRename = (s: HomeAskSession) => {
    if (busy) return;
    setEditingId(s.id);
    // 编辑框展示存储原名（含 fork-n- 前缀时也允许整段改）
    setEditTitle(s.title || "");
  };

  const cancelRename = () => {
    setEditingId("");
    setEditTitle("");
  };

  const commitRename = async () => {
    const id = editingId;
    const title = editTitle.trim();
    if (!id) return;
    if (!title) {
      cancelRename();
      return;
    }
    setEditingId("");
    await onRename(id, title);
  };

  if (collapsed) {
    return (
      <aside
        className="home-ask-sidebar is-collapsed"
        aria-label={tr("k_49bb3c52")}
      >
        <button
          type="button"
          className="home-ask-sidebar-icon-btn"
          title={tr("k_c146ce85")}
          aria-label={tr("k_6ae4a2a4")}
          aria-expanded={false}
          onClick={() => onCollapsedChange?.(false)}
        >
          <PanelLeftOpen size={16} strokeWidth={2.1} aria-hidden />
        </button>
        <button
          type="button"
          className="home-ask-sidebar-icon-btn"
          disabled={busy}
          title={tr("k_1b7abf96")}
          aria-label={tr("k_1b7abf96")}
          onClick={onNew}
        >
          <MessageSquarePlus size={16} strokeWidth={2.1} aria-hidden />
        </button>
      </aside>
    );
  }

  return (
    <aside className="home-ask-sidebar" aria-label={tr("k_f8b27fa9")}>
      <div className="home-ask-sidebar-head">
        <div className="home-ask-sidebar-head-row">
          <span className="home-ask-sidebar-brand">历史</span>
          <button
            type="button"
            className="home-ask-sidebar-icon-btn home-ask-sidebar-collapse"
            title={tr("k_37b948c3")}
            aria-label={tr("k_864f1cbc")}
            aria-expanded={true}
            onClick={() => onCollapsedChange?.(true)}
          >
            <PanelLeftClose size={15} strokeWidth={2.1} aria-hidden />
          </button>
        </div>
        <button
          type="button"
          className="home-ask-sidebar-new"
          disabled={busy}
          title={tr("k_1b7abf96")}
          onClick={onNew}
        >
          <MessageSquarePlus size={15} strokeWidth={2.1} aria-hidden />
          <span>新对话</span>
        </button>
      </div>

      <div className="home-ask-sidebar-scroll">
        {loading && sessions.length === 0 ? (
          <p className="home-ask-sidebar-empty">加载历史…</p>
        ) : sessions.length === 0 ? (
          <p className="home-ask-sidebar-empty">暂无历史对话</p>
        ) : (
          groups.map((g) => (
            <div key={g.label} className="home-ask-sidebar-group">
              <div className="home-ask-sidebar-group-label">{g.label}</div>
              <ul className="home-ask-sidebar-list">
                {g.items.map((s) => {
                  const active = s.id === activeId;
                  const title = displayTitle(s.title);
                  const editing = editingId === s.id;
                  return (
                    <li key={s.id} className="home-ask-sidebar-row">
                      {editing ? (
                        <div className="home-ask-sidebar-edit">
                          <input
                            ref={editInputRef}
                            className="home-ask-sidebar-edit-input"
                            value={editTitle}
                            maxLength={80}
                            disabled={busy}
                            aria-label={tr("k_b259c016")}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                void commitRename();
                              } else if (e.key === "Escape") {
                                e.preventDefault();
                                cancelRename();
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            type="button"
                            className="home-ask-sidebar-icon-btn"
                            disabled={busy || !editTitle.trim()}
                            aria-label={tr("k_fe0e9e6e")}
                            title={tr("k_fadf24db")}
                            onClick={(e) => {
                              e.stopPropagation();
                              void commitRename();
                            }}
                          >
                            <Check size={13} strokeWidth={2.5} aria-hidden />
                          </button>
                          <button
                            type="button"
                            className="home-ask-sidebar-icon-btn"
                            disabled={busy}
                            aria-label={tr("k_89fdd63b")}
                            title={tr("k_4d0b4688")}
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelRename();
                            }}
                          >
                            <X size={13} strokeWidth={2.5} aria-hidden />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            className={`home-ask-sidebar-item${active ? " is-active" : ""}`}
                            disabled={busy}
                            title={tr("k_995932e0", [title])}
                            onClick={() => onSelect(s.id)}
                            onDoubleClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              startRename(s);
                            }}
                          >
                            <span className="home-ask-sidebar-item-title">{title}</span>
                          </button>
                          <button
                            type="button"
                            className="home-ask-sidebar-rename"
                            disabled={busy}
                            aria-label={tr("k_304cb6f9", [title])}
                            title={tr("k_1cd80fd7")}
                            onClick={(e) => {
                              e.stopPropagation();
                              startRename(s);
                            }}
                          >
                            <Pencil size={12} strokeWidth={2.2} aria-hidden />
                          </button>
                          <button
                            type="button"
                            className="home-ask-sidebar-del"
                            disabled={busy}
                            aria-label={tr("k_65154fc0", [title])}
                            title={tr("k_3755f56f")}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPendingDelete(s);
                            }}
                          >
                            <Trash2 size={13} strokeWidth={2.2} aria-hidden />
                          </button>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
      <ConfirmDialog
        id="home-ask-delete-confirm"
        title={tr("k_3559dc2d")}
        description={pendingDelete ? tr("k_31be3a6b", [displayTitle(pendingDelete.title)]) : tr("k_28ea67dc")}
        confirmLabel={tr("k_3755f56f")}
        tone="danger"
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => { if (!open) setPendingDelete(null); }}
        onConfirm={() => { if (pendingDelete) onDelete(pendingDelete.id); setPendingDelete(null); }}
      />
    </aside>
  );
}
