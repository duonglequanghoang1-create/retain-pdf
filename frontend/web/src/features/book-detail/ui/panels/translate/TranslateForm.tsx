// 详情「翻译」Tab：发起 / 重新翻译表单。
// 从原 TranslateWorkspacePanel 抽出；书已在馆，无需 WorkflowPanel 上传瓦片。

import type { ReactNode } from "react";
import { Check, Languages } from "lucide-react";
import { btn } from "../ui.jsx";
import { t } from "@retainpdf/i18n";

export type BookTranslateLaunchFormProps = {
  canTranslate: boolean;
  readerAvailable?: boolean;
  isActive?: boolean;
  statusTone?: string;
  rangeOn: boolean;
  startPage: string | number;
  endPage: string | number;
  pageCount?: number;
  busy?: string;
  error?: string;
  ocrReuse?: { jobId: string } | null;
  /** 与「翻译整本」同排的附加动作（例如「仅 OCR」按钮），统一成一行。 */
  extraActions?: ReactNode;
  onRangeOnChange: (value: boolean) => void;
  onStartPageChange: (value: string) => void;
  onEndPageChange: (value: string) => void;
  onTranslate: () => void;
};

export function BookTranslateLaunchForm({
  canTranslate,
  readerAvailable = false,
  isActive = false,
  statusTone = "",
  rangeOn,
  startPage,
  endPage,
  pageCount,
  busy = "",
  error = "",
  ocrReuse = null,
  extraActions = null,
  onRangeOnChange,
  onStartPageChange,
  onEndPageChange,
  onTranslate,
}: BookTranslateLaunchFormProps) {
  return (
    <div className="book-translate-launch-form space-y-2.5">
      {error ? (
        <p
          id="book-detail-translate-error"
          className="rounded-md border border-foreground/20 bg-muted/40 px-3 py-2 text-xs text-foreground"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {canTranslate ? (
        <div className="book-detail-processing-actions flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {ocrReuse ? (
              <span
                className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-muted px-2 py-1 text-[11px] font-medium text-foreground"
                data-ocr-reuse="true"
                title={t("k_ea1da0a5", [ocrReuse.jobId])}
              >
                <Check className="size-3" aria-hidden="true" />
                {t("k_e969b7ca")}
              </span>
            ) : null}
            <label className="flex cursor-pointer select-none items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-muted-foreground/40"
                checked={rangeOn}
                onChange={(e) => onRangeOnChange(e.target.checked)}
              />
              {t("k_ba58b1c0")}
            </label>
            {rangeOn ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={startPage}
                  aria-label={t("k_f574ab40")}
                  onChange={(e) => onStartPageChange(e.target.value)}
                  className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm"
                />
                <span className="text-xs text-muted-foreground">–</span>
                <input
                  type="number"
                  min="1"
                  value={endPage}
                  aria-label={t("k_9a0c7c96")}
                  onChange={(e) => onEndPageChange(e.target.value)}
                  className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm"
                />
                <span className="text-[11px] text-muted-foreground/70">
                  / {pageCount || "?"} {t("k_73422182")}
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {extraActions}
            <button
              id="book-detail-translate-btn"
              type="button"
              className={btn("default")}
              disabled={Boolean(busy)}
              onClick={onTranslate}
            >
              <Languages className="mr-1 size-4" aria-hidden="true" />
              {busy === "translate"
                ? t("k_17e519c5")
                : rangeOn
                  ? t("k_b4e70a37")
                  : statusTone === "failed"
                    ? t("k_57c7f6a1")
                    : t("k_8963c2ba")}
            </button>
          </div>
        </div>
      ) : extraActions ? (
        <div className="book-detail-processing-actions flex flex-wrap items-center justify-end gap-2">
          {readerAvailable ? <p className="book-detail-processing-hint">{t("k_5729306f")}</p> : null}
          {extraActions}
        </div>
      ) : readerAvailable ? (
        <p className="book-detail-processing-hint">{t("k_5729306f")}</p>
      ) : isActive ? (
        null
      ) : null}
    </div>
  );
}
