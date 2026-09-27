import { t } from "@retainpdf/i18n";
import {
  isStructuredReaderRegion,
  projectReaderRegion,
  readerRegionContent,
  readerRegionKindForRegion,
  type ReaderRegionHighlight,
  type ReaderRegionSelection,
} from "../shared/data/reader-regions.js";
import type { ReaderPaneId } from "./reader-dom-contract.js";

type ReaderStructureSelectionLayerProps = {
  pane: ReaderPaneId;
  width: number;
  height: number;
  regions: ReaderRegionHighlight[];
  onSelect?: (selection: ReaderRegionSelection) => void;
};

const KIND_LABEL = {
  formula: t("k_3f27035a"),
  table: t("k_150074c2"),
  figure: t("k_be8da62e"),
  text: t("k_f4d3dab8"),
  region: t("k_17fc93c9"),
} as const;

/**
 * 独立于 PDF canvas / textLayer 的 OCR 结构选择层。
 * 容器本身不拦截事件，仅公式、表格和图片的命中框可交互，正文仍走
 * pdf.js 原生文字选择。
 */
export function ReaderStructureSelectionLayer({
  pane,
  width,
  height,
  regions,
  onSelect,
}: ReaderStructureSelectionLayerProps) {
  const targets = regions.flatMap((highlight) => {
    if (!isStructuredReaderRegion(highlight.region)) return [];
    const rect = projectReaderRegion(highlight, width, height);
    return rect ? [{ highlight, rect }] : [];
  });

  if (!targets.length) return null;

  return (
    <div className="reader-structure-selection-layer" aria-label={t("k_3688cbc3")}>
      {targets.map(({ highlight, rect }) => {
        const region = highlight.region;
        const kind = readerRegionKindForRegion(region);
        const label = KIND_LABEL[kind];
        return (
          <button
            key={region.itemId}
            type="button"
            className={`reader-structure-selection-target is-${kind}`}
            data-reader-region-id={region.itemId}
            data-reader-region-kind={kind}
            style={rect}
            aria-label={t("k_05b1d745", [label])}
            title={t("k_2a0fa2fb", [label])}
            onClick={(event) => {
              event.stopPropagation();
              const viewportRect = event.currentTarget.getBoundingClientRect();
              onSelect?.({
                selectionType: "region",
                region,
                kind,
                page: highlight.box.page,
                pane,
                rect: {
                  left: viewportRect.left,
                  top: viewportRect.top,
                  width: viewportRect.width,
                  height: viewportRect.height,
                },
              });
            }}
          >
            <span className="reader-structure-selection-label" aria-hidden="true">{label}</span>
            <span className="sr-only">{readerRegionContent(region, pane)}</span>
          </button>
        );
      })}
    </div>
  );
}
