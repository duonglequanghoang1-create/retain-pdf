import { t as n } from "../i18n-Bsr2eycf.js";
const v = Object.freeze({
  source: {
    fallbackSuffix: "source",
    label: n("k_87e9f577"),
    operation: n("k_ad2b73a4")
  },
  sideBySide: {
    fallbackSuffix: "side-by-side",
    label: n("k_cfe9fa15"),
    operation: n("k_bc9c0d0d")
  },
  translated: {
    fallbackSuffix: "translated",
    label: n("k_d93c8aae"),
    operation: n("k_edbcfc1a")
  }
});
function S(e) {
  return typeof e == "string" ? e.trim() : "";
}
function p({ jobId: e = "", jobPayload: t = null, manifestPayload: d = null } = {}) {
  return {
    currentJobId: e,
    currentJobManifest: d || null,
    currentJobManifestJobId: e,
    currentJobSnapshot: t || null
  };
}
function R(e, t) {
  return e === "sideBySide" && (!t.source || !t.translated) ? n("k_66e6dcca") : !t.source && (e === "source" || e === "sideBySide") ? n("k_7b19b7fd") : !t.translated && (e === "translated" || e === "sideBySide") ? n("k_5c3a0605") : n("k_2ee72c4b");
}
function $({
  resolveSourcePdfDownloadName: e = (m, f) => f || "",
  resolveTranslatedPdfDownloadName: t = (m, f) => f || "",
  createRuntimePort: d = null,
  resolveSourcePdf: o = (m) => ""
} = {}) {
  function m({ jobId: l = "", jobPayload: s = null, manifestPayload: y = null } = {}) {
    let _ = "", u = "";
    if (d) {
      const x = d({
        getCurrentJobId: (i) => (i == null ? void 0 : i.currentJobId) || "",
        getCurrentJobSnapshot: (i) => (i == null ? void 0 : i.currentJobSnapshot) || null,
        getCachedManifestFor: (i, P) => (i == null ? void 0 : i.currentJobManifest) || null
      }).currentArtifactUrls(p({ jobId: l, jobPayload: s, manifestPayload: y }));
      _ = x.translatedPdf || "", u = x.sideBySidePdf || "";
    }
    const r = o(y) || "", a = typeof r == "string" ? r : r && typeof r == "object" && (r.resource_url || r.resource_path || r.resourceUrl || r.resourcePath) || "", c = typeof r == "string" ? r : a || r;
    return {
      source: typeof c == "string" ? c : c || "",
      sideBySide: (typeof c == "string" ? c : a || r) && _ ? u : "",
      translated: _
    };
  }
  function f(l, { jobId: s, jobPayload: y, manifestPayload: _ }) {
    var r;
    const u = `${s || "result"}-${((r = v[l]) == null ? void 0 : r.fallbackSuffix) || "download"}.pdf`, k = p({ jobId: s, jobPayload: y, manifestPayload: _ });
    return l === "source" ? e(k, u) || u : l === "translated" && t(k, u) || u;
  }
  return Object.freeze({
    resolveReaderDownloadUrls: m,
    resolveReaderDownloadName: f,
    readerDownloadNameState: p,
    disabledReason: R,
    trimString: S,
    READER_DOWNLOAD_ACTIONS: v
  });
}
const I = $(), N = I.resolveReaderDownloadUrls, O = I.resolveReaderDownloadName;
function g(e = {}) {
  const t = `${(e == null ? void 0 : e.favorite_id) || ""}`.trim(), d = `${(e == null ? void 0 : e.quote_text) || ""}`.trim();
  if (!t || !d)
    return null;
  const o = Number(e.page_idx);
  return {
    favoriteId: t,
    documentId: `${e.document_id || ""}`.trim(),
    jobId: `${e.job_id || ""}`.trim(),
    pageIdx: Number.isFinite(o) && o >= 0 ? o : 0,
    blockId: `${e.block_id || ""}`.trim(),
    kind: `${e.kind || ""}`.trim() || "sentence",
    quoteText: d,
    translatedQuoteText: `${e.translated_quote_text || ""}`.trim(),
    note: `${e.note || ""}`.trim(),
    createdAt: `${e.created_at || ""}`.trim()
  };
}
function A(e = [], t = []) {
  const d = new Set(
    (Array.isArray(t) ? t : []).map((o) => `${(o == null ? void 0 : o.serverFavoriteId) || ""}`.trim()).filter(Boolean)
  );
  return (Array.isArray(e) ? e : []).filter((o) => (o == null ? void 0 : o.favoriteId) && !d.has(o.favoriteId));
}
function B({
  jobId: e = "",
  apiPrefix: t = "",
  documentByJobId: d = async (l, s) => null,
  submitFavorite: o = async (l, s) => null,
  loadFavorites: m = async (l, s) => ({ favorites: [] }),
  removeFavorite: f = async (l, s) => null
} = {}) {
  let l = null;
  function s() {
    return l || (l = (async () => {
      try {
        const r = await d(t, e);
        return `${(r == null ? void 0 : r.document_id) || ""}`.trim();
      } catch {
        return "";
      }
    })()), l;
  }
  async function y(r = {}) {
    const a = `${r.blockId || ""}`.trim(), c = `${r.quoteText || ""}`.trim();
    if (!a || !c)
      return null;
    try {
      const b = await o(t, {
        job_id: e,
        page_idx: Number(r.pageIdx) || 0,
        block_id: a,
        quote_text: c,
        translated_quote_text: `${r.translatedQuoteText || ""}`,
        kind: "sentence"
      });
      return console.info(n("k_e5e470e8"), (b == null ? void 0 : b.favorite_id) || ""), b;
    } catch (b) {
      return console.error(n("k_b00c4d9d"), b), null;
    }
  }
  async function _() {
    const r = await s();
    if (!r)
      return [];
    try {
      const { favorites: a = [] } = await m(t, { documentId: r });
      return (Array.isArray(a) ? a : []).map(g).filter(Boolean);
    } catch (a) {
      return console.warn(n("k_d2ad92a3"), a), [];
    }
  }
  async function u(r) {
    const a = `${r || ""}`.trim();
    if (!a)
      return !1;
    try {
      return await f(t, a), !0;
    } catch (c) {
      return console.error(n("k_389a65eb"), c), !1;
    }
  }
  async function k(r = {}, a = "") {
    if (!(r != null && r.favoriteId))
      return null;
    try {
      const c = await o(t, {
        job_id: `${r.jobId || e || ""}`.trim() || void 0,
        page_idx: Number(r.pageIdx) || 0,
        block_id: `${r.blockId || ""}`.trim(),
        quote_text: `${r.quoteText || ""}`,
        translated_quote_text: `${r.translatedQuoteText || ""}`,
        kind: `${r.kind || "sentence"}`,
        note: `${a || ""}`
      });
      return await u(r.favoriteId), g(c);
    } catch (c) {
      return console.error(n("k_f643e159"), c), null;
    }
  }
  return Object.freeze({
    loadServerFavorites: _,
    recreateFavoriteNote: k,
    removeServerFavorite: u,
    resolveDocumentId: s,
    syncFavorite: y
  });
}
const D = Object.freeze({
  boot: n("k_4268c4a0"),
  metadata: n("k_9f2b6df7"),
  both: n("k_2a3a255d"),
  sourceOnly: n("k_16baf569"),
  translatedOnly: n("k_49013855"),
  ready: n("k_ed712d1e"),
  failed: n("k_239dbe09")
});
function J() {
  return {
    reader: {
      totalPages: 0,
      currentPage: 0,
      primaryViewerKey: ""
    },
    progress: {
      metadataReady: !1,
      sourceDone: !1,
      translatedDone: !1
    },
    bootProgressBar: {
      value: 0,
      target: 0,
      rafId: 0
    }
  };
}
function j(e) {
  e != null && e.progress && (e.progress.metadataReady = !1, e.progress.sourceDone = !1, e.progress.translatedDone = !1);
}
function F(e, t = D) {
  if (!(e != null && e.metadataReady))
    return { percent: 8, text: t.boot, stage: "boot" };
  const d = Number(e.sourceDone) + Number(e.translatedDone), o = 24 + d * 30;
  return d === 0 ? { percent: o, text: t.both, stage: "pdfs" } : d === 1 ? {
    percent: o,
    text: e.sourceDone ? t.sourceOnly : t.translatedOnly,
    stage: "pdfs"
  } : { percent: 92, text: t.ready, stage: "readying" };
}
export {
  v as READER_DOWNLOAD_ACTIONS,
  D as READER_PROGRESS_COPY,
  F as computeReaderProgressSnapshot,
  $ as createReaderDownloadResolver,
  J as createReaderPageState,
  B as createReaderServerFavoritesPort,
  A as dedupeServerFavorites,
  R as disabledReason,
  g as normalizeServerFavorite,
  p as readerDownloadNameState,
  j as resetReaderProgressState,
  O as resolveReaderDownloadName,
  N as resolveReaderDownloadUrls,
  S as trimString
};
//# sourceMappingURL=state.js.map
