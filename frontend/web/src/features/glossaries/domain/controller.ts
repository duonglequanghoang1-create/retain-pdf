import {
  completeDownloadToast,
  failDownloadToast,
  showDownloadPreparing,
  updateDownloadProgress,
} from "@/platform/utils/download-feedback.js";
import {
  downloadProtectedResponse,
  prepareDownloadTarget,
} from "@/platform/utils/downloads.js";
import { t } from "@retainpdf/i18n";

export type GlossariesFeature = {
  bindEvents: () => void;
  open: () => unknown;
  reloadGlossaries: () => unknown;
  save: () => unknown;
};

export function mountGlossariesFeature({
  apiPrefix,
  fetchGlossaries,
  fetchGlossary,
  createGlossary,
  updateGlossary,
  deleteGlossary,
  exportGlossaryCsv,
  parseGlossaryCsv,
  refreshWorkflowGlossaries,
  view = {},
  viewPort,
}: any): GlossariesFeature {
  const state = {
    items: [],
    selectedId: "",
    currentDetail: null,
    draftOnly: false,
  };
  // 并发选择守卫：只保留最后一次 selectGlossary 的回包，过期响应直接丢弃。
  let selectRequestSeq = 0;

  function renderList() {
    viewPort.renderList(state.items, state.selectedId);
  }

  function renderDraft(detail: any = {}) {
    state.currentDetail = {
      glossary_id: detail.glossary_id || "",
      name: detail.name || "",
      entries: Array.isArray(detail.entries) ? detail.entries : [],
    };
    viewPort.renderEditor(state.currentDetail);
  }

  async function reloadGlossaries({ keepSelection = true }: any = {}) {
    const payload = await fetchGlossaries(apiPrefix);
    state.items = Array.isArray(payload?.items) ? payload.items : [];
    if (!keepSelection || !state.items.some((item) => item.glossary_id === state.selectedId)) {
      state.selectedId = state.items[0]?.glossary_id || "";
    }
    renderList();
    if (state.selectedId) {
      await selectGlossary(state.selectedId);
    } else {
      state.draftOnly = true;
      renderDraft({ name: "", entries: [] });
    }
    return state.items;
  }

  async function selectGlossary(glossaryId) {
    const normalizedGlossaryId = `${glossaryId || ""}`.trim();
    if (!normalizedGlossaryId) {
      return;
    }
    const requestSeq = ++selectRequestSeq;
    state.selectedId = normalizedGlossaryId;
    state.draftOnly = false;
    renderList();
    viewPort.setStatus(t("k_aad1fdac"));
    try {
      const detail = await fetchGlossary(normalizedGlossaryId, apiPrefix);
      if (requestSeq !== selectRequestSeq) {
        return;
      }
      renderDraft(detail);
      viewPort.setStatus("");
    } catch (err) {
      if (requestSeq !== selectRequestSeq) {
        return;
      }
      viewPort.setStatus(err.message || String(err), "error");
    }
  }

  async function open() {
    viewPort.openDialog();
    viewPort.setStatus(t("k_aad1fdac"));
    try {
      await reloadGlossaries();
      viewPort.setStatus("");
    } catch (err) {
      viewPort.setStatus(err.message || String(err), "error");
    }
  }

  function close() {
    viewPort.closeDialog();
  }

  function createNew() {
    state.selectedId = "";
    state.draftOnly = true;
    renderList();
    renderDraft({
      name: t("k_839a79a2"),
      entries: [],
    });
    viewPort.addEntryRow();
    viewPort.setStatus(t("k_fe9eff54"));
  }

  async function save() {
    const payload = viewPort.readEditorPayload();
    if (!payload.name.trim()) {
      viewPort.setStatus(t("k_c4928d20"), "error");
      return;
    }
    if (payload.skippedMissingTarget?.length > 0) {
      viewPort.setStatus(t("k_c99dab37"), "error");
      return;
    }
    delete payload.skippedMissingTarget;
    viewPort.setStatus(t("k_d8d9e214"));
    try {
      const saved = state.selectedId && !state.draftOnly
        ? await updateGlossary(apiPrefix, state.selectedId, payload)
        : await createGlossary(apiPrefix, payload);
      state.selectedId = saved.glossary_id || state.selectedId;
      state.draftOnly = false;
      await reloadGlossaries();
      await refreshWorkflowGlossaries?.({ force: true, selectedId: state.selectedId });
      viewPort.setStatus(t("k_1522ab04"), "valid");
    } catch (err) {
      viewPort.setStatus(err.message || String(err), "error");
    }
  }

  async function deleteCurrent() {
    if (!state.selectedId || state.draftOnly) {
      renderDraft({ name: "", entries: [] });
      state.draftOnly = false;
      viewPort.setStatus("");
      return;
    }
    viewPort.setStatus(t("k_ac8071a6"));
    try {
      await deleteGlossary(apiPrefix, state.selectedId);
      state.selectedId = "";
      await reloadGlossaries({ keepSelection: false });
      await refreshWorkflowGlossaries?.({ force: true, selectedId: "" });
      viewPort.setStatus(t("k_d415ff17"), "valid");
    } catch (err) {
      viewPort.setStatus(err.message || String(err), "error");
    }
  }

  async function exportCurrent() {
    if (!state.selectedId || state.draftOnly) {
      viewPort.setStatus(t("k_838d2666"), "error");
      return;
    }
    if (typeof exportGlossaryCsv !== "function") {
      viewPort.setStatus(t("k_86a8539c"), "error");
      return;
    }
    const fallbackName = `${state.currentDetail?.name || state.selectedId || "glossary"}.csv`;
    // 惰性:响应确认成功之后才问保存位置（见 downloads.ts）。
    const downloadTarget = () => prepareDownloadTarget(fallbackName);
    viewPort.setStatus(t("k_9126e978"));
    try {
      showDownloadPreparing(fallbackName);
      const filename = await downloadProtectedResponse({
        fetchResponse: () => exportGlossaryCsv(apiPrefix, state.selectedId),
        fallbackName,
        target: downloadTarget,
        onProgress: ({ filename: progressFilename, receivedBytes, totalBytes, percent, done }) => {
          if (done) {
            completeDownloadToast(progressFilename);
            return;
          }
          updateDownloadProgress({ filename: progressFilename, receivedBytes, totalBytes, percent });
        },
      });
      viewPort.setStatus(t("k_2113e8a5", [filename]), "valid");
    } catch (err) {
      const message = err.message || String(err);
      viewPort.setStatus(message, "error");
      failDownloadToast(message);
    }
  }

  async function applyImport() {
    const csvText = viewPort.readCsvText();
    if (!csvText.trim()) {
      viewPort.setStatus(t("k_8ce45748"), "error");
      return;
    }
    viewPort.setStatus(t("k_9e8b243d"));
    try {
      const payload = await parseGlossaryCsv(apiPrefix, csvText);
      renderDraft({
        ...viewPort.readEditorPayload(),
        entries: Array.isArray(payload?.entries) ? payload.entries : [],
      });
      viewPort.clearCsvText();
      viewPort.setImportVisible(false);
      viewPort.setStatus(t("k_74f72fa8", [Number(payload?.entry_count) || 0]), "valid");
    } catch (err) {
      viewPort.setStatus(err.message || String(err), "error");
    }
  }

  function bindEvents() {
    viewPort.bindEvents({
      open,
      close,
      reload: () => reloadGlossaries().catch((err) => viewPort.setStatus(err.message || String(err), "error")),
      selectGlossary,
      createNew,
      addRow: () => viewPort.addEntryRow(),
      save,
      deleteCurrent,
      exportCurrent,
      showImport: () => viewPort.setImportVisible(true),
      hideImport: () => viewPort.setImportVisible(false),
      applyImport,
    });
  }

  return {
    bindEvents,
    open,
    reloadGlossaries,
    save,
  };
}
