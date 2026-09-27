// 右栏：标题 / 作者 / 标签 + 编辑表单。

import { btn } from "../ui.jsx";
import { Check, Pencil, X } from "lucide-react";
import { t as tr } from "@retainpdf/i18n";

/**
 * @param {object} props
 * @param {boolean} props.editing
 * @param {string} props.titleText
 * @param {string} props.tagsText
 * @param {string[]} props.tags
 * @param {string[]} props.authors
 * @param {string|number|null|undefined} props.year
 * @param {string} props.displayTitle 展示用标题
 * @param {string} props.busy
 * @param {() => void} props.onStartEdit
 * @param {() => void} props.onCancelEdit
 * @param {() => void} props.onSave
 * @param {(v: string) => void} props.onTitleChange
 * @param {(v: string) => void} props.onTagsTextChange
 */
export function TitleMetaPanel({
  editing,
  titleText,
  tagsText,
  tags,
  authors,
  year,
  displayTitle,
  busy,
  onStartEdit,
  onCancelEdit,
  onSave,
  onTitleChange,
  onTagsTextChange,
}) {
  return (
    <div className="flex items-start justify-between gap-3 pr-8">
      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="space-y-2.5">
            <input
              id="book-detail-title-input"
              type="text"
              value={titleText}
              autoFocus
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <div>
              <p className="mb-1 text-xs text-muted-foreground">{tr("k_9894d32a")}</p>
              <input
                id="book-detail-tags-input"
                type="text"
                value={tagsText}
                placeholder={tr("k_304976bd")}
                onChange={(e) => onTagsTextChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button className={btn("outline")} disabled={busy === "meta"} onClick={onCancelEdit}>
                <X className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />{tr("k_4d0b4688")}
              </button>
              <button
                id="book-detail-save-btn"
                className={btn("default")}
                disabled={busy === "meta"}
                onClick={onSave}
              >
                <Check className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                {busy === "meta" ? tr("k_6644f061") : tr("k_fadf24db")}
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1
              className="book-detail-title line-clamp-2 break-words text-xl font-bold leading-snug tracking-tight"
              title={displayTitle}
            >
              {displayTitle || "-"}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {authors.length ? authors.join("、") : tr("k_9c5bde2a")}
              {year ? ` · ${year}` : ""}
            </p>
            {tags.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
      {!editing ? (
        <button
          id="book-detail-edit-btn"
          type="button"
          onClick={onStartEdit}
          className="shrink-0 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Pencil className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />{tr("k_a7f814c0")}
        </button>
      ) : null}
    </div>
  );
}
