// 底栏：页码（可点跳转）+ 缩放 +/- / 模式默认重置。

import { t } from "@retainpdf/i18n";
import { useEffect, useState, type ReactNode } from "react";
import {
  READER_ZOOM_DEFAULT,
  READER_ZOOM_MAX,
  READER_ZOOM_MIN,
  defaultZoomForMode,
  stepReaderZoom,
  zoomToDisplayPercent,
  type ReaderZoomMode,
} from "../../pdf/reader-zoom.js";
import { clampPageNumber } from "../../pdf/scroll-to-page.js";
import { ReaderShortcutsHelp } from "./ReaderShortcutsHelp.js";
import { useReaderContext, useReaderHudContext } from "./reader-context.js";

export type ReaderZoomHudProps = {
  /** 以下显示值缺省时从 reader context / hud context 取 */
  userZoom?: number;
  onZoomChange?: (zoom: number) => void;
  currentPage?: number;
  numPages?: number;
  onGoToPage?: (page: number) => void;
  /** 点百分比时重置到该模式默认缩放 */
  mode?: ReaderZoomMode | string;
  modeControls?: ReactNode;
};

export function ReaderZoomHud(props: ReaderZoomHudProps) {
  const ctx = useReaderContext();
  const hud = useReaderHudContext();
  const { mode = "compare", modeControls } = props;
  const userZoom = props.userZoom ?? ctx?.userZoom ?? READER_ZOOM_DEFAULT;
  const onZoomChange = props.onZoomChange ?? ctx?.onZoomChange ?? (() => {});
  const currentPage = props.currentPage ?? hud?.currentPage ?? 1;
  const numPages = props.numPages ?? hud?.numPages ?? 0;
  const onGoToPage = props.onGoToPage ?? ctx?.goToPage;
  // zoom 本身就是「占阅读区全宽的比例」：0.5→50%，1→100%
  const percent = zoomToDisplayPercent(userZoom);
  const canZoomOut = userZoom > READER_ZOOM_MIN + 0.001;
  const canZoomIn = userZoom < READER_ZOOM_MAX - 0.001;
  const resetZoom = defaultZoomForMode(mode);
  const resetLabel = t("k_b6028958");

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(`${currentPage}`);

  useEffect(() => {
    if (!editing) {
      setDraft(`${Math.min(Math.max(currentPage, 1), Math.max(numPages, 1))}`);
    }
  }, [currentPage, numPages, editing]);

  const commitPage = () => {
    setEditing(false);
    if (!onGoToPage || numPages <= 0) {
      return;
    }
    const parsed = Number(`${draft}`.trim());
    onGoToPage(clampPageNumber(parsed, numPages));
  };

  return (
    <div className="reader-react-hud" data-reader-hud="true">
      {modeControls ? <div className="reader-react-hud-group reader-react-hud-modes">{modeControls}</div> : null}
      <div className="reader-react-hud-group" aria-label={t("k_7b0930e2")}>
        {editing ? (
          <form
            className="reader-react-hud-page-form"
            onSubmit={(event) => {
              event.preventDefault();
              commitPage();
            }}
          >
            <input
              className="reader-react-hud-page-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label={t("k_8e74907f")}
              value={draft}
              autoFocus
              onChange={(event) => setDraft(event.target.value.replace(/[^\d]/g, ""))}
              onBlur={commitPage}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setEditing(false);
                  setDraft(`${currentPage}`);
                }
              }}
            />
            <span className="reader-react-hud-page-suffix">/ {numPages || "—"}</span>
          </form>
        ) : (
          <button
            type="button"
            className="reader-react-hud-page reader-react-hud-page-btn"
            aria-label={numPages > 0 ? t("k_ee96acf0", [currentPage, numPages]) : t("k_7b0930e2")}
            title={numPages > 0 ? t("k_37c06fc1") : undefined}
            disabled={!onGoToPage || numPages <= 0}
            onClick={() => {
              if (!onGoToPage || numPages <= 0) return;
              setDraft(`${currentPage}`);
              setEditing(true);
            }}
          >
            {numPages > 0
              ? `${Math.min(currentPage, numPages)} / ${numPages}`
              : "—"}
          </button>
        )}
      </div>
      <div className="reader-react-hud-group" aria-label={t("k_12e2ed4d")}>
        <button
          type="button"
          className="reader-react-hud-btn"
          aria-label={t("k_11f8516f")}
          disabled={!canZoomOut}
          onClick={() => onZoomChange(stepReaderZoom(userZoom, -1))}
        >
          −
        </button>
        <button
          type="button"
          className="reader-react-hud-btn reader-react-hud-zoom-label"
          aria-label={t("k_cf99c3ca", [resetLabel])}
          title={resetLabel}
          onClick={() => onZoomChange(resetZoom)}
        >
          {percent}%
        </button>
        <button
          type="button"
          className="reader-react-hud-btn"
          aria-label={t("k_d7f48a05")}
          disabled={!canZoomIn}
          onClick={() => onZoomChange(stepReaderZoom(userZoom, 1))}
        >
          +
        </button>
      </div>
      <div className="reader-react-hud-group reader-react-hud-help" aria-label={t("k_adf465eb")}>
        <ReaderShortcutsHelp />
      </div>
    </div>
  );
}
