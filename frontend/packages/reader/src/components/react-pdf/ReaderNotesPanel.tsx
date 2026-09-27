// 批注悬浮窗：列表 / 笔记 / 删除 / 导出 / 定位

import { useEffect, useState } from "react";
import { StickyNote } from "lucide-react";
import type { ReaderNote } from "../../annotations/types.js";
import { ReaderFloatShell } from "./ReaderFloatShell.js";
import { t } from "@retainpdf/i18n";

export type ReaderNotesPanelProps = {
  open: boolean;
  groups: Array<{ page: number; items: ReaderNote[] }>;
  count: number;
  onClose: () => void;
  onJump: (note: ReaderNote) => void;
  onUpdateNote: (id: string, note: string) => void;
  onRemove: (id: string) => void;
  onExport: () => Promise<boolean>;
};

function NoteItem({
  note,
  onJump,
  onUpdateNote,
  onRemove,
}: {
  note: ReaderNote;
  onJump: (note: ReaderNote) => void;
  onUpdateNote: (id: string, note: string) => void;
  onRemove: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.note);

  useEffect(() => {
    if (!editing) {
      setDraft(note.note);
    }
  }, [note.note, editing]);

  return (
    <article className="reader-notes-item">
      <div className="reader-notes-item-top">
        <span className="reader-notes-kind">
          {note.pane === "translated" ? t("k_647e0016") : t("k_4d69dbdf")}
        </span>
        <div className="reader-notes-item-actions">
          <button type="button" className="reader-notes-link" onClick={() => onJump(note)}>
            {t("k_84476c81")}
          </button>
          <button type="button" className="reader-notes-danger" onClick={() => onRemove(note.id)}>
            {t("k_3755f56f")}
          </button>
        </div>
      </div>
      <p className="reader-notes-quote">{note.quote}</p>
      {editing ? (
        <div className="reader-notes-editor">
          <textarea
            className="reader-notes-textarea"
            value={draft}
            placeholder={t("k_5818db9d")}
            rows={3}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="reader-notes-editor-actions">
            <button
              type="button"
              className="reader-notes-primary"
              onClick={() => {
                onUpdateNote(note.id, draft);
                setEditing(false);
              }}
            >
              {t("k_fadf24db")}
            </button>
            <button type="button" className="reader-notes-link" onClick={() => setEditing(false)}>
              {t("k_4d0b4688")}
            </button>
          </div>
        </div>
      ) : note.note ? (
        <button
          type="button"
          className="reader-notes-note"
          onClick={() => setEditing(true)}
          title={t("k_e49002b0")}
        >
          {note.note}
        </button>
      ) : (
        <button type="button" className="reader-notes-add-note" onClick={() => setEditing(true)}>
          {t("k_efb37dd0")}
        </button>
      )}
    </article>
  );
}

export function ReaderNotesPanel({
  open,
  groups,
  count,
  onClose,
  onJump,
  onUpdateNote,
  onRemove,
  onExport,
}: ReaderNotesPanelProps) {
  const [copied, setCopied] = useState(false);

  return (
    <ReaderFloatShell
      id="reader-notes-panel"
      open={open}
      title={t("k_290d5385")}
      subtitle={t("k_eb6db838")}
      titleIcon={<StickyNote size={14} strokeWidth={2.25} aria-hidden />}
      storageKey="retainpdf.reader.notes-float.pos.v1"
      ariaLabel={t("k_290d5385")}
      onClose={onClose}
      toolbar={(
        <>
          <span className="reader-notes-count">{count} {t("k_bce2ef61")}</span>
          <button
            type="button"
            className="reader-notes-export"
            disabled={copied || count === 0}
            onClick={async () => {
              const ok = await onExport();
              if (ok) {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1800);
              }
            }}
          >
            {copied ? t("k_e381a576") : t("k_2ece443b")}
          </button>
        </>
      )}
    >
      {count === 0 ? (
        <p className="reader-notes-empty">
          {t("k_496a8d50")}
        </p>
      ) : (
        groups.map((group) => (
          <section key={group.page} className="reader-notes-group">
            <h3 className="reader-notes-group-title">{t("k_dae828fe")} {group.page} {t("k_73422182")}</h3>
            {group.items.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onJump={onJump}
                onUpdateNote={onUpdateNote}
                onRemove={onRemove}
              />
            ))}
          </section>
        ))
      )}
    </ReaderFloatShell>
  );
}
