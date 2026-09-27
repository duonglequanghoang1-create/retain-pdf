// 翻译选项面板（主弹窗内联展开，非第二层 Dialog）。
//
// DOM id "page-range-dialog" / "page-range-title" 为历史契约（测试与样式锚点），保留不改。

import type { FormEvent } from "react";
import { BookOpen, FileText, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/ui/components/button.js";
import { useStoreSnapshot } from "@/ui/hooks/use-store.js";
import {
  useHomeFeatures,
  useHomeUploadViewStore,
  useHomeWorkflowViewActions,
  useHomeWorkflowViewStore,
} from "@/ui/context/home-services-context.js";
import type { UploadViewStore } from "../../domain/upload-store.js";
import { t } from "@retainpdf/i18n";

export function TranslationOptionsPanel() {
  const uploadViewStore = useHomeUploadViewStore();
  const workflowViewStore = useHomeWorkflowViewStore();
  const workflowViewActions = useHomeWorkflowViewActions();
  const features = useHomeFeatures();
  const upload = useStoreSnapshot(uploadViewStore);
  const workflow = useStoreSnapshot(workflowViewStore);

  if (!upload.translationOptionsOpen) return null;

  const selectedId = `${workflow.selectedGlossaryId || ""}`.trim();
  const hasSelected = !selectedId
    || workflow.glossaries.some((glossary) => glossary.glossaryId === selectedId);
  const maxAttr = upload.pageRangeMax > 0 ? { max: `${upload.pageRangeMax}` } : {};

  function handlePageInput(source: "start" | "end", event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    (uploadViewStore as unknown as UploadViewStore).actions.setPageRange(
      source === "start" ? { start: value } : { end: value },
    );
    features.uploadFeature?.constrainPageRanges({ source });
  }

  return (
    <section
      id="page-range-dialog"
      className="translation-options-panel"
      aria-labelledby="page-range-title"
    >
      <div className="translation-options-head">
        <div>
          <h3 id="page-range-title">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {t("k_813235a2")}
          </h3>
          <p id="page-range-limit-text">{t("k_3d1a07c1")}</p>
        </div>
        <Button
          id="page-range-close-btn"
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={t("k_716fc131")}
          onClick={() => (uploadViewStore as unknown as UploadViewStore).actions.closeTranslationOptions()}
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <div className="translation-options-grid">
        <fieldset className="translation-options-range">
          <legend>
            <FileText className="h-4 w-4" aria-hidden="true" />
            {t("k_6271cba4")}
          </legend>
          <div>
            <label htmlFor="page-range-start">{t("k_f574ab40")}</label>
            <input
              id="page-range-start"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              autoComplete="off"
              placeholder="1"
              {...maxAttr}
              value={upload.pageRangeStart}
              onInput={(event) => handlePageInput("start", event)}
            />
          </div>
          <span className="translation-options-range-separator" aria-hidden="true">—</span>
          <div>
            <label htmlFor="page-range-end">{t("k_9a0c7c96")}</label>
            <input
              id="page-range-end"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              autoComplete="off"
              placeholder={upload.pageRangeMax > 0 ? `${upload.pageRangeMax}` : t("k_3e19f7db")}
              {...maxAttr}
              value={upload.pageRangeEnd}
              onInput={(event) => handlePageInput("end", event)}
            />
          </div>
        </fieldset>

        <label className="translation-options-glossary" htmlFor="job-glossary-id">
          <span>
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {t("k_12f4ade1")}
          </span>
          <select
            id="job-glossary-id"
            value={selectedId}
            onChange={(event) => workflowViewActions.setSelectedGlossaryId(event.target.value)}
          >
            <option value="">{t("k_24e17be6")}</option>
            {workflow.glossaries.map((glossary) => (
              <option key={glossary.glossaryId} value={glossary.glossaryId}>
                {glossary.name}
                {Number.isFinite(glossary.entryCount) ? ` (${glossary.entryCount})` : ""}
              </option>
            ))}
            {!hasSelected ? (
              <option value={selectedId}>{t("k_fb016575", [selectedId])}</option>
            ) : null}
          </select>
        </label>
      </div>

      <div className="translation-options-actions">
        <Button
          id="page-range-clear-btn"
          type="button"
          variant="outline"
          onClick={() => features.uploadFeature?.clearPageRanges()}
        >
          {t("k_8e604d07")}
        </Button>
        <Button
          id="page-range-apply-btn"
          type="button"
          onClick={() => features.uploadFeature?.applyPageRanges()}
        >
          {t("k_33246f6a")}
        </Button>
      </div>
    </section>
  );
}
