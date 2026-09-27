import { t as n } from "@retainpdf/i18n";
const g = Object.freeze({
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
function p({ jobId: e = "", jobPayload: t = null, manifestPayload: a = null } = {}) {
  return {
    currentJobId: e,
    currentJobManifest: a || null,
    currentJobManifestJobId: e,
    currentJobSnapshot: t || null
  };
}
function $(e, t) {
  return e === "sideBySide" && (!t.source || !t.translated) ? n("k_66e6dcca") : !t.source && (e === "source" || e === "sideBySide") ? n("k_7b19b7fd") : !t.translated && (e === "translated" || e === "sideBySide") ? n("k_5c3a0605") : n("k_2ee72c4b");
}
function D({
  resolveSourcePdfDownloadName: e = (y, f) => f || "",
  resolveTranslatedPdfDownloadName: t = (y, f) => f || "",
  createRuntimePort: a = null,
  resolveSourcePdf: o = (y) => ""
} = {}) {
  function y({ jobId: c = "", jobPayload: l = null, manifestPayload: m = null } = {}) {
    let _ = "", u = "";
    if (a) {
      const x = a({
        getCurrentJobId: (i) => (i == null ? void 0 : i.currentJobId) || "",
        getCurrentJobSnapshot: (i) => (i == null ? void 0 : i.currentJobSnapshot) || null,
        getCachedManifestFor: (i, P) => (i == null ? void 0 : i.currentJobManifest) || null
      }).currentArtifactUrls(p({ jobId: c, jobPayload: l, manifestPayload: m }));
      _ = x.translatedPdf || "", u = x.sideBySidePdf || "";
    }
    const r = o(m) || "", d = typeof r == "string" ? r : r && typeof r == "object" && (r.resource_url || r.resource_path || r.resourceUrl || r.resourcePath) || "", s = typeof r == "string" ? r : d || r;
    return {
      source: typeof s == "string" ? s : s || "",
      sideBySide: (typeof s == "string" ? s : d || r) && _ ? u : "",
      translated: _
    };
  }
  function f(c, { jobId: l, jobPayload: m, manifestPayload: _ }) {
    var r;
    const u = `${l || "result"}-${((r = g[c]) == null ? void 0 : r.fallbackSuffix) || "download"}.pdf`, k = p({ jobId: l, jobPayload: m, manifestPayload: _ });
    return c === "source" ? e(k, u) || u : c === "translated" && t(k, u) || u;
  }
  return Object.freeze({
    resolveReaderDownloadUrls: y,
    resolveReaderDownloadName: f,
    readerDownloadNameState: p,
    disabledReason: $,
    trimString: S,
    READER_DOWNLOAD_ACTIONS: g
  });
}
const I = D(), N = I.resolveReaderDownloadUrls, A = I.resolveReaderDownloadName;
function v(e = {}) {
  const t = `${(e == null ? void 0 : e.favorite_id) || ""}`.trim(), a = `${(e == null ? void 0 : e.quote_text) || ""}`.trim();
  if (!t || !a)
    return null;
  const o = Number(e.page_idx);
  return {
    favoriteId: t,
    documentId: `${e.document_id || ""}`.trim(),
    jobId: `${e.job_id || ""}`.trim(),
    pageIdx: Number.isFinite(o) && o >= 0 ? o : 0,
    blockId: `${e.block_id || ""}`.trim(),
    kind: `${e.kind || ""}`.trim() || "sentence",
    quoteText: a,
    translatedQuoteText: `${e.translated_quote_text || ""}`.trim(),
    note: `${e.note || ""}`.trim(),
    createdAt: `${e.created_at || ""}`.trim()
  };
}
function O(e = [], t = []) {
  const a = new Set(
    (Array.isArray(t) ? t : []).map((o) => `${(o == null ? void 0 : o.serverFavoriteId) || ""}`.trim()).filter(Boolean)
  );
  return (Array.isArray(e) ? e : []).filter((o) => (o == null ? void 0 : o.favoriteId) && !a.has(o.favoriteId));
}
function B({
  jobId: e = "",
  apiPrefix: t = "",
  documentByJobId: a = async (c, l) => null,
  submitFavorite: o = async (c, l) => null,
  loadFavorites: y = async (c, l) => ({ favorites: [] }),
  removeFavorite: f = async (c, l) => null
} = {}) {
  let c = null;
  function l() {
    return c || (c = (async () => {
      try {
        const r = await a(t, e);
        return `${(r == null ? void 0 : r.document_id) || ""}`.trim();
      } catch {
        return "";
      }
    })()), c;
  }
  async function m(r = {}) {
    const d = `${r.blockId || ""}`.trim(), s = `${r.quoteText || ""}`.trim();
    if (!d || !s)
      return null;
    try {
      const b = await o(t, {
        job_id: e,
        page_idx: Number(r.pageIdx) || 0,
        block_id: d,
        quote_text: s,
        translated_quote_text: `${r.translatedQuoteText || ""}`,
        kind: "sentence"
      });
      return console.info(n("k_e5e470e8"), (b == null ? void 0 : b.favorite_id) || ""), b;
    } catch (b) {
      return console.error(n("k_b00c4d9d"), b), null;
    }
  }
  async function _() {
    const r = await l();
    if (!r)
      return [];
    try {
      const { favorites: d = [] } = await y(t, { documentId: r });
      return (Array.isArray(d) ? d : []).map(v).filter(Boolean);
    } catch (d) {
      return console.warn(n("k_d2ad92a3"), d), [];
    }
  }
  async function u(r) {
    const d = `${r || ""}`.trim();
    if (!d)
      return !1;
    try {
      return await f(t, d), !0;
    } catch (s) {
      return console.error(n("k_389a65eb"), s), !1;
    }
  }
  async function k(r = {}, d = "") {
    if (!(r != null && r.favoriteId))
      return null;
    try {
      const s = await o(t, {
        job_id: `${r.jobId || e || ""}`.trim() || void 0,
        page_idx: Number(r.pageIdx) || 0,
        block_id: `${r.blockId || ""}`.trim(),
        quote_text: `${r.quoteText || ""}`,
        translated_quote_text: `${r.translatedQuoteText || ""}`,
        kind: `${r.kind || "sentence"}`,
        note: `${d || ""}`
      });
      return await u(r.favoriteId), v(s);
    } catch (s) {
      return console.error(n("k_f643e159"), s), null;
    }
  }
  return Object.freeze({
    loadServerFavorites: _,
    recreateFavoriteNote: k,
    removeServerFavorite: u,
    resolveDocumentId: l,
    syncFavorite: m
  });
}
function R() {
  return Object.freeze({
    boot: n("k_4268c4a0"),
    metadata: n("k_9f2b6df7"),
    both: n("k_2a3a255d"),
    sourceOnly: n("k_16baf569"),
    translatedOnly: n("k_49013855"),
    ready: n("k_ed712d1e"),
    failed: n("k_239dbe09")
  });
}
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
function F(e, t = R()) {
  if (!(e != null && e.metadataReady))
    return { percent: 8, text: t.boot, stage: "boot" };
  const a = Number(e.sourceDone) + Number(e.translatedDone), o = 24 + a * 30;
  return a === 0 ? { percent: o, text: t.both, stage: "pdfs" } : a === 1 ? {
    percent: o,
    text: e.sourceDone ? t.sourceOnly : t.translatedOnly,
    stage: "pdfs"
  } : { percent: 92, text: t.ready, stage: "readying" };
}
export {
  g as R,
  D as a,
  J as b,
  F as c,
  B as d,
  O as e,
  $ as f,
  R as g,
  j as h,
  A as i,
  N as j,
  v as n,
  p as r,
  S as t
};
//# sourceMappingURL=page-state-CmBNULWh.js.map
