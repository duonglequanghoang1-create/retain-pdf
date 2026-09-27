var Cn = (e) => {
  throw TypeError(e);
};
var Ln = (e, t, n) => t.has(e) || Cn("Cannot " + n);
var et = (e, t, n) => (Ln(e, t, "read from private field"), n ? n.call(e) : t.get(e)), zn = (e, t, n) => t.has(e) ? Cn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Dn = (e, t, n, r) => (Ln(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
import { jsxs as z, jsx as h, Fragment as At } from "react/jsx-runtime";
import { t as p } from "@retainpdf/i18n";
import { useMemo as q, useState as C, useEffect as $, useCallback as N, useRef as x, useLayoutEffect as $e, memo as an, forwardRef as po, useImperativeHandle as sn, createContext as cn, useContext as ln, useSyncExternalStore as ho, useId as dn, Suspense as go, lazy as un } from "react";
import { requireAdapter as ve, getReaderAdapters as de } from "./adapters.js";
import { i as bo, d as yo, j as vo, g as Re, t as ct, R as wo, f as So } from "./page-state-CmBNULWh.js";
import { d as ko } from "./ask-answerer-I2yuqneN.js";
import "@retainpdf/api/conversations";
import { r as Po, b as Io } from "./page-config-Ct7qR5rm.js";
import { c as Ro, n as _o, f as Dt, h as On, a as To, b as Eo, i as kr, p as Nt, g as Pr, r as Ir, j as Fn, e as Mo } from "./reader-regions-DsePY7B_.js";
import { i as Ao, c as No } from "./live-translation-CbniFg2b.js";
import { d as xo, b as Co, c as Lo } from "./view-model-BUJHLlQm.js";
import { toast as qt, Toaster as zo } from "sonner";
import { X as Qe, Radio as Do, FileText as Rr, Columns2 as _r, Languages as Tr, FileCode2 as Er, Sparkles as fn, GripHorizontal as Oo, StickyNote as xt, Sigma as Fo, Table2 as $o, Type as jo, Image as Uo, Check as Bo, Copy as Ho, Keyboard as Wo, Download as Jo, Bookmark as qo } from "lucide-react";
import { pdfjs as Vo, Page as Ko, Document as Go } from "react-pdf";
import { e as Yo, m as Zo, a as Xo } from "./markdown-math-DjIC5Aa5.js";
const Qo = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.isMockMode) == null ? void 0 : n.call(t, ...e)) ?? !1;
}, ea = "", ta = Object.freeze({
  progress: "retainpdf-reader-progress"
}), na = (e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveResourceUrl) == null ? void 0 : n.call(t, e)) ?? e;
}, xl = (...e) => {
  var n;
  return (((n = de()) == null ? void 0 : n.fetchProtected) ?? fetch)(...e);
}, Ae = () => ve("defaultReaderDataPort"), $n = () => ve("defaultReaderPageConfigPort"), Cl = {
  get apiPrefix() {
    return Ae().apiPrefix;
  },
  fetchProtected: (...e) => Ae().fetchProtected(...e),
  loadMarkdownPayload: (e) => Ae().loadMarkdownPayload(e),
  loadMarkdownSource: (e) => Ae().loadMarkdownSource(e),
  loadMarkdownRange: (e, t, n, r, a) => Ae().loadMarkdownRange(e, t, n, r, a),
  loadJobPayload: (e) => Ae().loadJobPayload(e),
  loadReaderPayload: (e, t) => Ae().loadReaderPayload(e, t),
  get liveTranslation() {
    return Ae().liveTranslation;
  }
}, Mr = {
  messageTargetOrigin: () => $n().messageTargetOrigin(),
  readerJobId: () => $n().readerJobId()
}, ra = () => {
  var e;
  return ((e = de()) == null ? void 0 : e.liveTranslation) ?? null;
}, lt = () => {
  var t;
  const e = de();
  return (e == null ? void 0 : e.pdf) ?? {
    fetchProtected: (e == null ? void 0 : e.fetchProtected) ?? ((t = e == null ? void 0 : e.defaultReaderDataPort) == null ? void 0 : t.fetchProtected) ?? fetch,
    resolvePdfjsVendorUrl: (n = "") => {
      var r;
      return ((r = e == null ? void 0 : e.resolvePdfjsVendorUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, mn = () => {
  const e = de();
  if (e != null && e.sessionData) return e.sessionData;
  const t = e == null ? void 0 : e.defaultReaderDataPort;
  if (!t) throw new Error("Reader adapter missing: defaultReaderDataPort (call setReaderAdapters)");
  return {
    loadReaderPayload: t.loadReaderPayload,
    loadJobPayload: t.loadJobPayload,
    fetchDocumentByJobId: (...n) => ve("fetchDocumentByJobId")(...n),
    fetchProtected: t.fetchProtected,
    resolveResourceUrl: e.resolveResourceUrl ?? ((n) => n),
    resolveReaderSourcePdf: (n) => {
      var r;
      return ((r = e.resolveReaderSourcePdf) == null ? void 0 : r.call(e, n)) ?? null;
    },
    resolveReaderTranslatedPdfUrl: (n, r) => {
      var a;
      return ((a = e.resolveReaderTranslatedPdfUrl) == null ? void 0 : a.call(e, n, r)) ?? "";
    },
    resolveReaderArtifactUrl: (n) => {
      var r;
      return ((r = e.resolveReaderArtifactUrl) == null ? void 0 : r.call(e, n)) ?? "";
    }
  };
}, Ll = () => {
  var e;
  return ((e = de()) == null ? void 0 : e.aiOperations) ?? null;
}, zl = () => {
  var e;
  return ((e = de()) == null ? void 0 : e.conversations) ?? null;
}, Dl = () => {
  var e;
  return ((e = de()) == null ? void 0 : e.askChat) ?? null;
}, oa = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderAnchor) == null ? void 0 : n.call(t, ...e)) ?? null;
}, aa = () => {
  var e, t;
  return ((t = (e = de()) == null ? void 0 : e.resolveReaderDocumentId) == null ? void 0 : t.call(e)) ?? "";
}, sa = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderJobId) == null ? void 0 : n.call(t, ...e)) ?? "";
}, ia = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderDownloadName) == null ? void 0 : n.call(t, ...e)) ?? bo(...e);
}, ca = (...e) => {
  var t, n;
  return ((n = (t = de()) == null ? void 0 : t.resolveReaderDownloadUrls) == null ? void 0 : n.call(t, ...e)) ?? vo(...e);
}, la = (...e) => ve("downloadProtectedResource")(...e), da = (...e) => ve("failDownloadToast")(...e), Ol = (e, t) => ve("resolveMarkdownAssetUrl")(e, t), Fl = (e = {}) => {
  const t = de();
  return ko({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) || "/api/v1",
    ask: t == null ? void 0 : t.askDocumentAi,
    documentByJobId: t == null ? void 0 : t.fetchDocumentByJobId,
    ...e
  });
}, pn = "/api/v1", $l = (e = pn, t = {}) => {
  var n;
  return ve("fetchFavorites")(
    ((n = de()) == null ? void 0 : n.apiPrefix) ?? e,
    t
  );
};
function jl(e = {}) {
  const t = de();
  return yo({
    apiPrefix: (t == null ? void 0 : t.apiPrefix) ?? pn,
    documentByJobId: (...n) => ve("fetchDocumentByJobId")(...n),
    submitFavorite: (...n) => ve("createFavorite")(...n),
    loadFavorites: (...n) => ve("fetchFavorites")(...n),
    removeFavorite: (...n) => ve("deleteFavorite")(...n),
    ...e
  });
}
function ua() {
  const e = () => {
    var r;
    return Po(
      ((r = globalThis.location) == null ? void 0 : r.search) || ""
    );
  }, [t, n] = C(e);
  return $(() => {
    var l, c, i, d;
    const r = () => n(e()), a = (c = (l = globalThis.history) == null ? void 0 : l.pushState) == null ? void 0 : c.bind(globalThis.history), o = (d = (i = globalThis.history) == null ? void 0 : i.replaceState) == null ? void 0 : d.bind(globalThis.history);
    let s = !1;
    if (a && o)
      try {
        const u = (f) => function(...m) {
          const w = f.apply(this, m);
          return r(), globalThis.dispatchEvent(new Event("pushstate")), globalThis.dispatchEvent(new Event("replacestate")), globalThis.dispatchEvent(new Event("locationchange")), w;
        };
        globalThis.history.pushState = u(a), globalThis.history.replaceState = u(o), s = !0;
      } catch {
      }
    return window.addEventListener("popstate", r), window.addEventListener("hashchange", r), window.addEventListener("pushstate", r), window.addEventListener("replacestate", r), window.addEventListener("locationchange", r), () => {
      if (window.removeEventListener("popstate", r), window.removeEventListener("hashchange", r), window.removeEventListener("pushstate", r), window.removeEventListener("replacestate", r), window.removeEventListener("locationchange", r), s && a && o)
        try {
          globalThis.history.pushState = a, globalThis.history.replaceState = o;
        } catch {
        }
    };
  }, []), t;
}
function fa() {
  const e = ua(), t = q(() => sa(Mr), [e]), n = q(() => aa(), [e]), r = t || n ? `job:${t}|document:${n}` : `location:${e}`;
  return { locationKey: e, jobId: t, routeDocumentId: n, sessionIdentity: r };
}
function ma(e) {
  const {
    routeDocumentId: t,
    jobId: n,
    sessionIdentity: r,
    sessionIdentityRef: a,
    documentIdRef: o,
    sessionJobIdRef: s,
    switchToSourceMode: l
  } = e, [c, i] = C({
    documentId: "",
    jobId: ""
  }), [d, u] = C({
    documentId: "",
    jobId: ""
  }), f = c.documentId === t ? c.jobId : "", m = d.documentId === t ? d.jobId : "", w = n || f, [g, y] = C({
    jobId: "",
    documentId: ""
  }), v = g.jobId === w ? g.documentId : "", P = t || v, S = !!t && !w, [b, k] = C(null), A = (b == null ? void 0 : b.sessionIdentity) === r && b.documentId === P ? b : null, E = S || !!A, O = N((T) => {
    const R = `${T.documentId || ""}`.trim();
    if (!R || o.current && o.current !== R) return;
    if (!o.current && s.current)
      y({
        jobId: s.current,
        documentId: R
      });
    else if (!o.current)
      return;
    const I = `${T.revision || ""}`.trim() || `${Date.now()}`;
    k({
      documentId: R,
      revision: I,
      sessionIdentity: a.current
    }), l();
  }, []);
  $(() => {
    k((T) => T && T.sessionIdentity !== r ? null : T);
  }, [r]);
  const _ = N((T) => {
    switch (T.type) {
      case "resolved-document-job":
        i({ documentId: T.documentId, jobId: T.jobId });
        break;
      case "cleared-resolved-document-job":
        i({ documentId: "", jobId: "" });
        break;
      case "missing-document-job":
        u({ documentId: T.documentId, jobId: T.jobId });
        break;
      case "resolved-job-document":
        y((R) => R.jobId === T.jobId && R.documentId === T.documentId ? R : { jobId: T.jobId, documentId: T.documentId });
        break;
      case "committed-source":
        k({
          documentId: T.documentId,
          revision: T.revision,
          sessionIdentity: T.sessionIdentity
        });
        break;
    }
  }, []);
  return {
    resolvedDocumentJob: c,
    setResolvedDocumentJob: i,
    missingDocumentJob: d,
    setMissingDocumentJob: u,
    documentJobId: f,
    rejectedDocumentJobId: m,
    sessionJobId: w,
    resolvedJobDocument: g,
    setResolvedJobDocument: y,
    jobDocumentId: v,
    documentId: P,
    sourceOnly: S,
    committedDocumentSource: b,
    setCommittedDocumentSource: k,
    activeCommittedDocumentSource: A,
    sourceViewOnly: E,
    refreshCommittedDocument: O,
    applyIdentityEvent: _
  };
}
const pa = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function jn(e) {
  return `${(e == null ? void 0 : e.status) || ""}`.trim().toLowerCase();
}
function ha(e) {
  var r, a, o, s;
  if (!e || typeof e != "object") return "";
  const t = e, n = [
    t.document_id,
    t.documentId,
    (r = t.document) == null ? void 0 : r.document_id,
    (a = t.book_summary) == null ? void 0 : a.document_id,
    (s = (o = t.request_payload) == null ? void 0 : o.source) == null ? void 0 : s.document_id
  ];
  for (const l of n) {
    const c = `${l || ""}`.trim();
    if (c) return c;
  }
  return "";
}
function Un(e, t) {
  const n = `/api/v1/documents/${encodeURIComponent(e)}/source.pdf`, r = `${t || ""}`.trim();
  return na(r ? `${n}?version=${encodeURIComponent(r)}` : n);
}
function ga(e, t = "") {
  const n = `${e || ""}`.trim(), r = `${t || ""}`.trim();
  return !!(!n || r && (n === r || n === `${r}.pdf`) || /^\d{8,14}-[0-9a-f]{4,}$/i.test(n));
}
function ba(e, t) {
  var r;
  const n = [
    e == null ? void 0 : e.title,
    e == null ? void 0 : e.display_name,
    e == null ? void 0 : e.source_file_name,
    (r = e == null ? void 0 : e.book_summary) == null ? void 0 : r.source_file_name
  ];
  for (const a of n) {
    const o = `${a || ""}`.trim();
    if (o && !ga(o, t))
      return o.replace(/\.pdf$/i, "");
  }
  return "";
}
function Vt({
  percent: e,
  text: t,
  stage: n
}) {
  var r;
  try {
    (r = window.parent) == null || r.postMessage(
      {
        type: ta.progress,
        stage: n,
        percent: e,
        text: t
      },
      Mr.messageTargetOrigin()
    );
  } catch {
  }
}
function Rt(e, t, n, r = "progress") {
  e({
    loading: !0,
    percent: t,
    text: n,
    stage: r,
    failed: !1
  }), Vt({ percent: t, text: n, stage: r });
}
function ya(e) {
  const {
    sessionJobId: t,
    sessionIdentity: n,
    sessionIdentityRef: r,
    sessionJobIdRef: a,
    sessionEpochRef: o,
    closingRef: s
  } = e, [l, c] = C(null), [i, d] = C(null), [u, f] = C(""), [m, w] = C(0), g = u === n ? l : null, y = u === n ? i : null, v = jn(g), P = pa.has(v), S = N(() => {
    w((_) => _ + 1);
  }, []), b = N((_) => {
    c(_.jobPayload), d(_.manifestPayload), f(_.sessionIdentity);
  }, []), k = N((_) => {
    c(null), d(null), f(_);
  }, []), A = x(""), E = x(""), O = N(async () => {
    const _ = a.current;
    if (!_ || A.current === _) return;
    const T = mn().loadJobPayload;
    if (typeof T != "function") return;
    const R = o.current.value;
    A.current = _;
    try {
      const I = await T(_);
      if (s.current || o.current.value !== R || a.current !== _ || !I || typeof I != "object")
        return;
      const M = jn(I);
      c(I), f(r.current), M === "succeeded" && E.current !== _ && (E.current = _, w((D) => D + 1));
    } catch {
    } finally {
      A.current === _ && (A.current = "");
    }
  }, []);
  return $(() => {
    E.current = "";
  }, [n]), $(() => {
    if (!t || P || !g) return;
    const _ = window.setInterval(() => {
      O();
    }, 1e3);
    return () => window.clearInterval(_);
  }, [P, O, g, t]), {
    jobPayload: l,
    setJobPayload: c,
    manifestPayload: i,
    setManifestPayload: d,
    payloadSessionIdentity: u,
    setPayloadSessionIdentity: f,
    scopedJobPayload: g,
    scopedManifestPayload: y,
    jobStatus: v,
    jobTerminal: P,
    jobRefreshRevision: m,
    refreshJobArtifacts: S,
    refreshJobStatus: O,
    publishPayload: b,
    clearPayload: k
  };
}
function Kt(e) {
  document.body.classList.remove(
    "reader-mode-source",
    "reader-mode-translated",
    "reader-mode-compare"
  ), document.body.classList.add(`reader-mode-${e}`);
}
function va(e, t) {
  e(t), Kt(t);
}
function wa(e) {
  const [t, n] = C(e ? "source" : "compare"), r = N((o) => {
    e && o !== "source" || (n(o), Kt(o));
  }, [e]), a = N((o) => {
    va(n, o);
  }, []);
  return $(() => (e && document.documentElement.classList.add("reader-source-only"), Kt(t), () => {
    document.documentElement.classList.remove("reader-source-only");
  }), [e, t]), { mode: t, setMode: r, setModeState: n, switchSessionMode: a };
}
function Bn(e) {
  return typeof e == "string" ? e.trim() : `${e ?? ""}`.trim();
}
function Sa(e) {
  const t = (e == null ? void 0 : e.data) ?? e, n = t && typeof t == "object" ? t : {};
  return {
    activeJobId: Bn(n.active_job_id),
    activeVersionId: Bn(n.active_version_id)
  };
}
function ka(e) {
  const { link: t, rejectedDocumentJobId: n, hasCommittedSource: r } = e, a = t.activeJobId && t.activeJobId !== n && !t.activeJobId.startsWith("doc:") ? t.activeJobId : "";
  return a ? { kind: "follow-active-job", jobId: a, activeVersionId: t.activeVersionId } : t.activeVersionId && !r ? { kind: "open-committed-source", documentId: "", revision: t.activeVersionId } : { kind: "open-source-url" };
}
function Pa(e) {
  const {
    payloadDocumentId: t,
    linkedActiveJobId: n,
    linkedActiveVersionId: r,
    sessionJobId: a,
    hasCommittedSource: o
  } = e;
  return t && r && n === a && !o ? { kind: "restore-committed-source", documentId: t, revision: r } : { kind: "open-job-artifacts" };
}
function Ia(e) {
  return e.status === 404 && !e.jobId && !!e.routeDocumentId && !!e.documentJobId && e.sessionJobId === e.documentJobId;
}
function Ra(e) {
  return e ? { data: e.data.slice() } : null;
}
const _a = 2, we = /* @__PURE__ */ new Map();
function Gt(e, t) {
  we.delete(e), we.set(e, t);
}
function Ta(e) {
  if (we.size < _a) return;
  const t = we.keys().next().value;
  t && we.delete(t);
}
function Ot(e) {
  const t = `${e || ""}`.trim();
  if (!t || !we.has(t)) return null;
  const n = we.get(t);
  return Gt(t, n), n;
}
async function Ar(e, t = lt().fetchProtected, n = {}) {
  const r = `${e || ""}`.trim();
  if (!r)
    return null;
  if (we.has(r)) {
    const l = we.get(r);
    return Gt(r, l), l;
  }
  const a = await t(r, { signal: n.signal });
  if (!a.ok) {
    const l = new Error(p("k_de0fb59f", [a.status]));
    throw l.status = a.status, l;
  }
  const o = await a.arrayBuffer(), s = { data: new Uint8Array(o) };
  return we.has(r) ? Gt(r, s) : (Ta(), we.set(r, s)), s;
}
function Ea(e = "", t = null) {
  const [n, r] = C(
    () => t || Ot(e)
  ), [a, o] = C(
    () => !!`${e || ""}`.trim() && !t && !Ot(e)
  ), [s, l] = C("");
  return $(() => {
    if (t) {
      r(t), o(!1), l("");
      return;
    }
    const c = `${e || ""}`.trim();
    if (!c) {
      r(null), o(!1), l("");
      return;
    }
    const i = Ot(c);
    if (i) {
      r(i), o(!1), l("");
      return;
    }
    let d = !1;
    return o(!0), l(""), r(null), Ar(c).then((u) => {
      d || (r(u), o(!1));
    }).catch((u) => {
      d || (r(null), o(!1), l((u == null ? void 0 : u.message) || String(u)));
    }), () => {
      d = !0;
    };
  }, [e, t]), { file: n, loading: a, error: s };
}
function Ma(e) {
  const { sessionEpochRef: t, closingRef: n, abort: r, sessionEpoch: a } = e;
  let o = !1;
  const s = () => r.signal.aborted || n.current || t.current.value !== a;
  return {
    signal: r.signal,
    isClosedOrStale: s,
    isInactive: () => o || s(),
    markFailed: () => {
      o = !0;
    }
  };
}
async function Yt(e) {
  const { url: t, label: n, percentStart: r, percentEnd: a, fence: o, setBoot: s } = e;
  if (!t || o.isInactive())
    return null;
  Rt(s, r, n, "download");
  const l = await Ar(t, lt().fetchProtected, {
    signal: o.signal
  });
  return o.isInactive() ? null : (Rt(s, a, n, "download"), l);
}
async function Aa(e) {
  const { sourceFinal: t, translatedFinal: n, fence: r, setBoot: a } = e;
  Rt(a, 25, p("k_328c9cd3"), "download");
  const o = [];
  let s = null, l = null;
  return t && o.push(
    Yt({
      url: t,
      label: p("k_a459b8ea"),
      percentStart: 30,
      percentEnd: 55,
      fence: r,
      setBoot: a
    }).then((d) => {
      s = d;
    })
  ), n && o.push(
    Yt({
      url: n,
      label: p("k_ff535e9e"),
      percentStart: 55,
      percentEnd: 85,
      fence: r,
      setBoot: a
    }).then((d) => {
      l = d;
    })
  ), await Promise.all(o), r.isInactive() ? { status: "inactive" } : !!t && !s || !!n && !l ? { status: "incomplete" } : { status: "downloaded", sourceBytes: s, translatedBytes: l };
}
const wt = {
  regions: null,
  metadata: null
};
function Na(e) {
  const {
    sessionJobId: t,
    jobId: n,
    routeDocumentId: r,
    documentJobId: a,
    rejectedDocumentJobId: o,
    sourceOnly: s,
    locationKey: l,
    sessionIdentity: c,
    committedSource: i,
    applyIdentityEvent: d,
    publishPayload: u,
    clearPayload: f,
    switchSessionMode: m,
    jobRefreshRevision: w,
    sessionEpochRef: g,
    closingRef: y,
    activeLoadAbortRef: v
  } = e, [P, S] = C(""), [b, k] = C(""), [A, E] = C(null), [O, _] = C(null), [T, R] = C(!1), [I, M] = C(""), [D, L] = C([]), [j, H] = C(() => ({
    source: null,
    translated: null
  })), [Z, oe] = C(
    wt
  ), [ae, re] = C({
    loading: !0,
    percent: 4,
    text: Re().boot,
    stage: "progress",
    failed: !1
  });
  return $(() => {
    const ie = new AbortController(), B = g.current.value, K = Ma({
      sessionEpochRef: g,
      closingRef: y,
      abort: ie,
      sessionEpoch: B
    });
    v.current = ie;
    const X = mn();
    if (y.current)
      return ie.abort(), () => {
        v.current === ie && (v.current = null);
      };
    function Q(ee, V) {
      K.markFailed(), re({
        loading: !1,
        percent: 100,
        text: ee,
        stage: "failed",
        failed: !0
      }), Vt({ percent: 100, text: V, stage: "failed" });
    }
    function ue() {
      R(!0), re({
        loading: !1,
        percent: 100,
        text: Re().ready,
        stage: "ready",
        failed: !1
      }), Vt({ percent: 100, text: Re().ready, stage: "ready" });
    }
    function ge() {
      return i != null && i.documentId ? Un(
        i.documentId,
        i.revision
      ) : Qo() ? ea : X.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}/source.pdf`);
    }
    async function he() {
      let ee = { activeJobId: "", activeVersionId: "" };
      try {
        const be = await X.fetchProtected(
          X.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(r)}`)
        );
        if (be != null && be.ok) {
          const Le = await be.json().catch(() => null);
          ee = Sa(Le);
        }
      } catch {
      }
      const V = ka({
        link: ee,
        rejectedDocumentJobId: o,
        hasCommittedSource: !!i
      });
      if (V.kind === "follow-active-job") {
        if (K.isInactive()) return;
        d({
          type: "resolved-document-job",
          documentId: r,
          jobId: V.jobId
        }), V.activeVersionId ? (i || d({
          type: "committed-source",
          documentId: r,
          revision: V.activeVersionId,
          sessionIdentity: c
        }), m("source")) : m("compare");
        return;
      }
      if (V.kind === "open-committed-source") {
        if (K.isInactive()) return;
        d({
          type: "committed-source",
          documentId: r,
          revision: V.revision,
          sessionIdentity: c
        }), m("source");
        return;
      }
      const se = ge();
      if (K.isInactive()) return;
      S(se), k(""), M(""), f(c);
      const Pe = await Yt({
        url: se,
        label: p("k_a459b8ea"),
        percentStart: 30,
        percentEnd: 85,
        fence: K,
        setBoot: re
      });
      if (!K.isInactive()) {
        if (!Pe) {
          Q(p("k_fe7fe549"), p("k_e1efc0e5"));
          return;
        }
        E(Pe), ue();
      }
    }
    async function U() {
      var vt;
      const ee = await ((vt = X.loadSessionSnapshot) == null ? void 0 : vt.call(X, {
        jobId: t,
        documentId: r,
        routeDocumentId: r,
        committedSource: i,
        includeOptionalArtifacts: !i
      })), V = ee ? {
        jobPayload: ee.sourcePayload,
        manifestPayload: ee.manifestPayload,
        readerMetadata: ee.readerMetadata,
        regionsPayload: ee.regions,
        readerErrors: ee.readerErrors
      } : await X.loadReaderPayload(t, {
        // committedSource 分支会丢弃 regions/metadata（旧页序已失效），
        // 直接跳过这两个可选请求，避免无效网络往返。
        includeOptionalArtifacts: !i
      });
      if (K.isInactive()) return;
      let se = null;
      if (n && !r) {
        try {
          se = await X.fetchDocumentByJobId(pn, t);
        } catch {
        }
        if (K.isInactive()) return;
      }
      const Pe = ha(V.jobPayload) || `${(se == null ? void 0 : se.document_id) || ""}`.trim();
      Pe && !r && d({
        type: "resolved-job-document",
        jobId: t,
        documentId: Pe
      });
      const be = Pa({
        payloadDocumentId: Pe,
        linkedActiveJobId: `${(se == null ? void 0 : se.active_job_id) || ""}`.trim(),
        linkedActiveVersionId: `${(se == null ? void 0 : se.active_version_id) || ""}`.trim(),
        sessionJobId: t,
        hasCommittedSource: !!i
      });
      if (be.kind === "restore-committed-source") {
        if (K.isInactive()) return;
        d({
          type: "committed-source",
          documentId: be.documentId,
          revision: be.revision,
          sessionIdentity: c
        }), m("source");
        return;
      }
      const Le = X.resolveReaderSourcePdf(V.manifestPayload), bt = X.resolveReaderTranslatedPdfUrl(V.jobPayload, V.manifestPayload), zt = typeof Le == "string" ? Le : X.resolveReaderArtifactUrl(Le), yt = r || Pe, Ie = i != null && i.documentId ? Un(
        i.documentId,
        i.revision
      ) : zt || (yt ? X.resolveResourceUrl(`/api/v1/documents/${encodeURIComponent(yt)}/source.pdf`) : ""), Me = i ? "" : bt || "";
      if (S(Ie || ""), k(Me), M(ba(V.jobPayload, t)), u({
        jobPayload: V.jobPayload || null,
        manifestPayload: V.manifestPayload || null,
        sessionIdentity: c
      }), L(i ? [] : Ro(V.regionsPayload)), H(i ? { source: null, translated: null } : _o(V.readerMetadata)), oe(i ? wt : V.readerErrors ?? wt), !Ie && !Me) {
        Q(Re().failed, Re().failed);
        return;
      }
      const Be = await Aa({
        sourceFinal: Ie || "",
        translatedFinal: Me,
        fence: K,
        setBoot: re
      });
      if (Be.status !== "inactive") {
        if (Be.status === "incomplete") {
          Q(p("k_bfc6cc21"), p("k_e897a20b"));
          return;
        }
        E(Be.sourceBytes), _(Be.translatedBytes), ue();
      }
    }
    async function ce() {
      R(!1), E(null), _(null), L([]), H({ source: null, translated: null }), oe(wt), Rt(re, 8, Re().metadata, "metadata");
      try {
        if (s) {
          await he();
          return;
        }
        if (!t) {
          Q(Re().failed, Re().failed);
          return;
        }
        await U();
      } catch (ee) {
        if (K.isClosedOrStale() || (ee == null ? void 0 : ee.name) === "AbortError") return;
        K.markFailed();
        const V = Number(ee == null ? void 0 : ee.status);
        if (Ia({
          status: V,
          jobId: n,
          routeDocumentId: r,
          documentJobId: a,
          sessionJobId: t
        })) {
          d({ type: "missing-document-job", documentId: r, jobId: t }), d({ type: "cleared-resolved-document-job" }), m("source");
          return;
        }
        const se = ee instanceof Error ? ee.message : Re().failed;
        Q(se, se);
      }
    }
    return ce(), () => {
      ie.abort(), v.current === ie && (v.current = null);
    };
  }, [t, r, a, o, s, l, i, w, n, c, d, u, f, m]), {
    sourceUrl: P,
    translatedUrl: b,
    sourceFile: A,
    translatedFile: O,
    assetsReady: T,
    title: I,
    regions: D,
    readerMetadata: j,
    readerErrors: Z,
    boot: ae
  };
}
function xa() {
  const e = x(!1), t = x(null), { locationKey: n, jobId: r, routeDocumentId: a, sessionIdentity: o } = fa(), s = x({ identity: "", value: 0 });
  s.current.identity !== o && (s.current = {
    identity: o,
    value: s.current.value + 1
  }, e.current = !1);
  const l = x(o), c = x(""), i = x(""), d = x(() => {
  }), u = N(() => d.current(), []), f = ma({
    routeDocumentId: a,
    jobId: r,
    sessionIdentity: o,
    sessionIdentityRef: l,
    documentIdRef: c,
    sessionJobIdRef: i,
    switchToSourceMode: u
  }), {
    sessionJobId: m,
    documentId: w,
    sourceOnly: g,
    sourceViewOnly: y
  } = f, { mode: v, setMode: P, switchSessionMode: S } = wa(y);
  d.current = () => {
    S("source");
  }, l.current = o, c.current = w, i.current = m;
  const b = ya({
    sessionJobId: m,
    sessionIdentity: o,
    sessionIdentityRef: l,
    sessionJobIdRef: i,
    sessionEpochRef: s,
    closingRef: e
  }), {
    scopedJobPayload: k,
    scopedManifestPayload: A,
    jobStatus: E,
    jobTerminal: O,
    jobRefreshRevision: _,
    refreshJobArtifacts: T,
    refreshJobStatus: R
  } = b, I = Na({
    sessionJobId: m,
    jobId: r,
    routeDocumentId: a,
    documentJobId: f.documentJobId,
    rejectedDocumentJobId: f.rejectedDocumentJobId,
    sourceOnly: g,
    locationKey: n,
    sessionIdentity: o,
    committedSource: f.activeCommittedDocumentSource,
    applyIdentityEvent: f.applyIdentityEvent,
    publishPayload: b.publishPayload,
    clearPayload: b.clearPayload,
    switchSessionMode: S,
    jobRefreshRevision: _,
    sessionEpochRef: s,
    closingRef: e,
    activeLoadAbortRef: t
  }), M = N(() => {
    var L;
    e.current = !0, (L = t.current) == null || L.abort();
  }, []), D = q(
    () => ({
      fetchProtected: mn().fetchProtected,
      jobId: m,
      jobPayload: k,
      manifestPayload: A,
      sourceUrl: I.sourceUrl,
      translatedUrl: I.translatedUrl,
      sourceOnly: y
    }),
    [m, k, A, I.sourceUrl, I.translatedUrl, y]
  );
  return {
    jobId: m,
    jobStatus: E,
    workflow: `${(k == null ? void 0 : k.workflow) || ""}`.trim().toLowerCase(),
    jobTerminal: O,
    documentId: w,
    sessionIdentity: o,
    sourceOnly: g,
    mode: v,
    setMode: P,
    sourceUrl: I.sourceUrl,
    translatedUrl: I.translatedUrl,
    sourceFile: I.sourceFile,
    translatedFile: I.translatedFile,
    assetsReady: I.assetsReady,
    boot: I.boot,
    title: I.title,
    regions: I.regions,
    readerMetadata: I.readerMetadata,
    readerErrors: I.readerErrors,
    download: D,
    refreshJobArtifacts: T,
    refreshJobStatus: R,
    refreshCommittedDocument: f.refreshCommittedDocument,
    prepareClose: M
  };
}
const Ca = 160, La = 8, za = 960;
function Da() {
  const e = x(null), [t, n] = C(null), [r, a] = C(za), o = N((s) => {
    e.current = s, n(s);
  }, []);
  return $(() => {
    const s = t;
    if (!s || typeof ResizeObserver > "u")
      return;
    const l = (i) => {
      !Number.isFinite(i) || i < Ca || a((d) => Math.abs(d - i) < La ? d : i);
    }, c = new ResizeObserver((i) => {
      var d, u;
      l(((u = (d = i[0]) == null ? void 0 : d.contentRect) == null ? void 0 : u.width) ?? s.clientWidth);
    });
    return c.observe(s), l(s.clientWidth), () => c.disconnect();
  }, [t]), {
    shellRef: e,
    shellEl: t,
    shellWidth: r,
    bindShell: o
  };
}
function Oa(e) {
  const { mode: t, sourceOnly: n, assetsReady: r, hasSource: a, hasTranslated: o } = e, s = r && a, l = r && o && !n, c = t === "source" || t === "compare", i = !n && (t === "translated" || t === "compare");
  return {
    mountSource: s,
    mountTranslated: l,
    showSource: c,
    showTranslated: i,
    compareMode: t === "compare" && c && i && s && l,
    primaryPane: t === "translated" ? "translated" : "source"
  };
}
const Ft = { source: 0, translated: 0 };
function Fa(e, t) {
  const {
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    sourceUrl: o,
    translatedUrl: s,
    sourceFile: l,
    translatedFile: c
  } = e, i = `${(t == null ? void 0 : t.identityKey) || ""}\0${o}\0${s}`, d = x(i);
  d.current = i;
  const [u, f] = C(() => ({
    identity: i,
    pages: Ft
  })), [m, w] = C(() => ({ identity: i, tick: 0 })), g = u.identity === i ? u.pages : Ft, y = m.identity === i ? m.tick : 0, v = Oa({
    mode: n,
    sourceOnly: r,
    assetsReady: a,
    hasSource: !!l || !!o,
    hasTranslated: !!c
  }), { primaryPane: P } = v, S = N((R, I) => {
    d.current === i && f((M) => {
      const D = M.identity === i ? M.pages : Ft;
      return D[I] === R && M.identity === i ? M : {
        identity: i,
        pages: { ...D, [I]: R }
      };
    });
  }, [i]), b = x(null), k = N(() => {
    b.current && clearTimeout(b.current);
    const R = i;
    b.current = setTimeout(() => {
      b.current = null, d.current === R && w((I) => ({
        identity: R,
        tick: I.identity === R ? I.tick + 1 : 1
      }));
    }, 60);
  }, [i]);
  $(() => (b.current && (clearTimeout(b.current), b.current = null), f((R) => R.identity === i && R.pages.source === 0 && R.pages.translated === 0 ? R : { identity: i, pages: { source: 0, translated: 0 } }), w((R) => R.identity === i && R.tick === 0 ? R : { identity: i, tick: 0 }), () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [i]);
  const A = q(
    () => Math.max(g.source, g.translated),
    [g]
  ), E = P === "translated" ? g.translated : g.source || g.translated, O = t == null ? void 0 : t.userZoom, _ = t == null ? void 0 : t.shellWidth, T = `${i}-${y}-${O}-${n}-${g.source}-${g.translated}-${_}`;
  return {
    ...v,
    numPagesByPane: g,
    hudNumPages: A,
    primaryNumPages: E,
    metricsTick: y,
    onNumPages: S,
    onMetrics: k,
    rowSyncRevision: T
  };
}
const Ye = "data-reader-page", Ze = "data-reader-pane", hn = "data-natural-height", $a = "reader-react-root", ja = "reader-react-grid", Ua = "reader-react-scroll-shell", Ba = "reader-react-pdf-pane", Nr = "reader-react-pdf-page", _t = "reader-react-pdf-page-placeholder", gn = "reader-react-pdf-page-slot";
function dt(e, t) {
  const n = e != null ? `[${Ye}="${e}"]` : `[${Ye}]`;
  return t ? `${n}[${Ze}="${t}"]` : n;
}
function Ha() {
  return `.${gn}[${Ye}]`;
}
function Ct(e) {
  return Number(e.getAttribute(Ye));
}
const xr = 0.25, Cr = 1, Wa = 0.05, ht = 0.5, Ja = 16, qa = 8;
function at(e) {
  return ht;
}
function Lt(e) {
  return Number.isFinite(e) ? Math.min(Cr, Math.max(xr, e)) : ht;
}
function ut(e, t) {
  const n = Lt(Number(e) + t * Wa);
  return Math.round(n * 100) / 100;
}
function Va(e) {
  return Math.round(Lt(e) * 100);
}
function Ka(e) {
  const n = (Number(e) || 0) - Ja - qa;
  return Math.max(160, Math.floor(n));
}
function Ga(e, t = ht) {
  const n = Lt(t);
  return Ka((Number(e) || 0) * n);
}
function Ya(e, t) {
  if (!e || !Number.isFinite(t) || t <= 0 || Math.abs(t - 1) < 1e-3)
    return;
  const n = e.scrollLeft + e.clientWidth / 2, r = e.scrollTop + e.clientHeight / 2, a = Array.from(
    e.querySelectorAll(`[${Ze}]`)
  ).map((s) => ({
    pane: s,
    cx: s.scrollLeft + s.clientWidth / 2,
    hadOverflow: s.scrollWidth > s.clientWidth + 1
  })), o = () => {
    e.scrollLeft = Math.max(0, n * t - e.clientWidth / 2), e.scrollTop = Math.max(0, r * t - e.clientHeight / 2);
    for (const { pane: s, cx: l, hadOverflow: c } of a) {
      const i = Math.max(0, s.scrollWidth - s.clientWidth);
      if (i <= 0) {
        s.scrollLeft = 0;
        continue;
      }
      c ? s.scrollLeft = Math.min(
        i,
        Math.max(0, l * t - s.clientWidth / 2)
      ) : s.scrollLeft = i / 2;
    }
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(o);
  });
}
const Za = "retainpdf:reader:view:v1:", Hn = /* @__PURE__ */ new Set([
  "source",
  "translated",
  "markdown",
  "ai"
]), Xa = /* @__PURE__ */ new Set([
  "source",
  "compare",
  "translated"
]);
function Lr() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function Zt(e) {
  return `${e || ""}`.trim();
}
function Qa({
  documentId: e,
  jobId: t
}) {
  const n = Zt(e);
  if (n) return `document:${n}`;
  const r = Zt(t);
  return r ? `job:${r}` : "";
}
function zr(e) {
  const t = Zt(e);
  return t ? `${Za}${t}` : "";
}
function es(e) {
  if (!e || typeof e != "object") return;
  const t = Math.floor(Number(e.page)), n = Number(e.fraction);
  if (!(!Number.isFinite(t) || t < 1 || !Number.isFinite(n)))
    return {
      page: t,
      fraction: Math.max(0, Math.min(1, n))
    };
}
function ts(e) {
  if (e === null) return null;
  if (!e || typeof e != "object") return;
  const t = `${e.left || ""}`, n = `${e.right || ""}`;
  if (!(!Hn.has(t) || !Hn.has(n) || t === n))
    return { left: t, right: n };
}
function ns(e) {
  return e === null ? null : e === "markdown" || e === "ai" ? e : void 0;
}
function rs(e) {
  return Xa.has(e) ? e : void 0;
}
function Dr(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  if (t.schema !== "retainpdf_reader_view_v1") return null;
  const n = es(t.anchor), r = Number(t.zoom), a = rs(t.mode), o = ts(t.splitLayout), s = ns(t.assistantPanel);
  return {
    schema: "retainpdf_reader_view_v1",
    ...n ? { anchor: n } : {},
    ...Number.isFinite(r) ? { zoom: Math.max(0.25, Math.min(1, r)) } : {},
    ...a !== void 0 ? { mode: a } : {},
    ...o !== void 0 ? { splitLayout: o } : {},
    ...s !== void 0 ? { assistantPanel: s } : {},
    updatedAt: Number.isFinite(Number(t.updatedAt)) ? Number(t.updatedAt) : 0
  };
}
function Te(e, t = Lr()) {
  const n = zr(e);
  if (!n || !t) return null;
  try {
    const r = t.getItem(n);
    return r ? Dr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function Tt(e, t, n = Lr()) {
  const r = zr(e);
  if (!r || !n) return null;
  const a = Te(e, n), o = Dr({
    schema: "retainpdf_reader_view_v1",
    ...a || {},
    ...t,
    updatedAt: Date.now()
  });
  if (!o) return null;
  try {
    return n.setItem(r, JSON.stringify(o)), o;
  } catch {
    return null;
  }
}
function os(e, t, n = "") {
  const [r, a] = C(() => {
    var u;
    return ((u = Te(n)) == null ? void 0 : u.zoom) ?? at();
  }), o = x(r), s = x(n);
  o.current = r;
  const l = x(1);
  $(() => {
    var f;
    if (s.current === n) return;
    s.current = n;
    const u = ((f = Te(n)) == null ? void 0 : f.zoom) ?? at();
    l.current = 1, o.current = u, a(u);
  }, [e, n]);
  const c = N((u) => {
    const f = Lt(u), m = o.current;
    Math.abs(f - m) < 5e-4 || (l.current = f / (m || 1), Tt(s.current, { zoom: f }), a(f));
  }, []), i = N((u) => {
    c(ut(o.current, u));
  }, [c]), d = N((u) => {
    c(at());
  }, [c]);
  return $e(() => {
    const u = l.current;
    Math.abs(u - 1) < 1e-3 || (l.current = 1, Ya(t == null ? void 0 : t.current, u));
  }, [r, t]), { userZoom: r, onZoomChange: c, stepZoom: i, resetZoom: d };
}
function as(e, t = !0) {
  const [n, r] = C(null), a = N(() => {
    var l, c;
    r(null);
    const s = (l = globalThis.getSelection) == null ? void 0 : l.call(globalThis);
    (c = s == null ? void 0 : s.removeAllRanges) == null || c.call(s);
  }, []), o = e.current ?? null;
  return $(() => {
    if (!t)
      return;
    const s = () => {
      var L, j;
      const g = e.current, y = (L = globalThis.getSelection) == null ? void 0 : L.call(globalThis);
      if (!g || !y || y.isCollapsed || !y.rangeCount) {
        r(null);
        return;
      }
      const v = y.getRangeAt(0);
      if (!g.contains(v.commonAncestorContainer)) {
        r(null);
        return;
      }
      const P = `${y.toString() || ""}`.replace(/\s+/g, " ").trim();
      if (P.length < 2) {
        r(null);
        return;
      }
      let S = v.commonAncestorContainer;
      S.nodeType === Node.TEXT_NODE && (S = S.parentElement);
      const b = (j = S == null ? void 0 : S.closest) == null ? void 0 : j.call(
        S,
        dt()
      );
      if (!b || !g.contains(b)) {
        r(null);
        return;
      }
      const k = Math.max(1, Math.floor(Ct(b) || 1)), E = b.getAttribute(Ze) === "translated" ? "translated" : "source", O = v.getClientRects(), _ = O[O.length - 1] || v.getBoundingClientRect();
      if (!_ || _.width === 0 && _.height === 0) {
        r(null);
        return;
      }
      const T = typeof window < "u" ? window.innerWidth : 800, R = typeof window < "u" ? window.innerHeight : 600, I = 16, M = Math.min(Math.max(I, _.left), T - I), D = Math.min(Math.max(I, _.top), R - I);
      r({
        selectionType: "text",
        quote: P,
        page: k,
        pane: E,
        rect: {
          left: M,
          top: D,
          width: _.width,
          height: _.height
        }
      });
    }, l = () => {
      window.setTimeout(s, 0);
    }, c = () => {
      l();
    }, i = () => l(), d = () => l(), u = () => {
      l();
    }, f = (g) => {
      g.key === "Escape" && a();
    }, m = () => {
      r((g) => g && null);
    };
    document.addEventListener("mouseup", c), document.addEventListener("pointerup", i), document.addEventListener("touchend", d), document.addEventListener("selectionchange", u), document.addEventListener("keyup", f);
    const w = o ?? e.current;
    return w == null || w.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("scroll", m, { passive: !0, capture: !0 }), () => {
      document.removeEventListener("mouseup", c), document.removeEventListener("pointerup", i), document.removeEventListener("touchend", d), document.removeEventListener("selectionchange", u), document.removeEventListener("keyup", f), w == null || w.removeEventListener("scroll", m), window.removeEventListener("scroll", m, !0);
    };
  }, [t, o, a]), { selection: n, clearSelection: a };
}
function ss(e) {
  const { mode: t, setMode: n, beginModeSwitch: r } = e, a = x(t), o = x(n), s = x(r);
  return a.current = t, o.current = n, s.current = r, { setModeKeepingPage: N((c) => {
    c !== a.current && (s.current(), o.current(c));
  }, []) };
}
function is() {
  const [e, t] = C(null), n = N((s) => {
    t(s);
  }, []), r = N((s = null) => {
    t((l) => !s || l === s ? null : l);
  }, []), a = N((s) => {
    t((l) => l === s ? null : s);
  }, []), o = N(
    (s) => e === s,
    [e]
  );
  return { active: e, open: n, close: r, toggle: a, isOpen: o };
}
const bn = 48;
function Or(e, t = bn) {
  return e.getBoundingClientRect().top + t;
}
function Fr(e, t) {
  if (!e.length)
    return null;
  let n = null, r = -1 / 0;
  for (const c of e) {
    const i = c.getBoundingClientRect();
    i.height < 8 || i.width < 8 || i.top <= t + 1 && i.top >= r && (n = c, r = i.top);
  }
  if (!n && (n = e.find((i) => {
    const d = i.getBoundingClientRect();
    return d.height >= 8 && d.width >= 8;
  }) ?? e[0] ?? null, n)) {
    const i = [...e].reverse().find((d) => {
      const u = d.getBoundingClientRect();
      return u.height >= 8 && u.width >= 8;
    });
    i && i.getBoundingClientRect().bottom < t && (n = i);
  }
  if (!n)
    return null;
  const a = Ct(n);
  if (!Number.isFinite(a) || a < 1)
    return null;
  const o = n.getBoundingClientRect(), s = o.height > 0 ? o.height : 1, l = Math.min(1, Math.max(0, (t - o.top) / s));
  return { el: n, page: a, fraction: l };
}
function $t(e, t, n = bn) {
  if (!e)
    return null;
  const r = dt(void 0, t), a = Array.from(e.querySelectorAll(r));
  if (!a.length || e.getBoundingClientRect().height <= 0)
    return null;
  const s = Or(e, n), l = Fr(a, s);
  return l ? { page: l.page, fraction: l.fraction } : null;
}
function yn(e, t, n = "auto", r, a = bn) {
  if (!e || !t)
    return !1;
  const o = Math.max(1, Math.floor(Number(t.page) || 1)), s = Math.min(1, Math.max(0, Number(t.fraction) || 0));
  let l = null;
  if (r && (l = e.querySelector(dt(o, r))), l || (l = e.querySelector(dt(o))), !l)
    return !1;
  const c = e.getBoundingClientRect(), i = l.getBoundingClientRect();
  if (c.height <= 0 || i.height < 8 && l.offsetHeight < 8)
    return !1;
  const d = i.height > 0 ? i.height : l.offsetHeight, u = e.scrollTop + (i.top - c.top), f = Math.max(0, u + s * d - a);
  return n === "auto" ? e.scrollTop = f : e.scrollTo({ top: f, behavior: n }), !0;
}
function cs(e, t, n = "smooth", r) {
  return yn(
    e,
    { page: t, fraction: 0 },
    n,
    r
  );
}
function Xt(e, t, n) {
  const r = (n == null ? void 0 : n.behavior) ?? "auto", a = (n == null ? void 0 : n.delaysMs) ?? [0, 32, 120, 280];
  let o = !1, s = !1;
  const l = [], c = () => {
    var d;
    if (o) return;
    yn(
      e(),
      t,
      r,
      n == null ? void 0 : n.pane
    ) && !s && (s = !0, (d = n == null ? void 0 : n.onDone) == null || d.call(n));
  };
  for (const i of a)
    i <= 0 ? requestAnimationFrame(() => {
      requestAnimationFrame(c);
    }) : l.push(setTimeout(c, i));
  return () => {
    o = !0;
    for (const i of l)
      clearTimeout(i);
  };
}
function ls(e, t, n) {
  return Xt(
    e,
    { page: t, fraction: 0 },
    n
  );
}
function Et(e, t) {
  if (!Number.isFinite(e))
    return 1;
  const n = Math.max(1, Math.floor(e));
  return !Number.isFinite(t) || t <= 0 ? n : Math.min(t, n);
}
function ye(e) {
  return {
    page: Math.max(1, Math.floor(Number(e.page) || 1)),
    fraction: Math.min(1, Math.max(0, Number(e.fraction) || 0))
  };
}
function ds(e, t, n = !0, r = "", a) {
  const [o, s] = C(1);
  return $(() => {
    if (!n || t <= 0) {
      s(1);
      return;
    }
    const l = e.current;
    if (!l)
      return;
    let c = !1, i = null, d = 0;
    const u = dt(void 0, a), f = () => {
      if (c) return;
      const g = Array.from(l.querySelectorAll(u));
      if (!g.length)
        return;
      const y = Or(l), v = Fr(g, y);
      v && s(v.page);
    }, m = () => {
      c || (d && cancelAnimationFrame(d), d = requestAnimationFrame(() => {
        d = 0, f();
      }));
    }, w = () => {
      if (c) return;
      if (!Array.from(l.querySelectorAll(u)).length) {
        i = setTimeout(w, 120);
        return;
      }
      f(), l.addEventListener("scroll", m, { passive: !0 });
    };
    return w(), () => {
      c = !0, i && clearTimeout(i), d && cancelAnimationFrame(d), l.removeEventListener("scroll", m);
    };
  }, [e, t, n, r, a]), o;
}
const us = `canvas, .react-pdf__Page, .${Nr}, .${_t}`, Wn = /* @__PURE__ */ new WeakMap();
function fs(e) {
  const t = Number(e.getAttribute(hn));
  if (Number.isFinite(t) && t > 0)
    return t;
  let n = Wn.get(e);
  if ((n == null || !n.isConnected) && (n = e.querySelector(us), Wn.set(e, n)), n) {
    const a = n.getBoundingClientRect().height;
    if (Number.isFinite(a) && a > 0)
      return a;
  }
  const r = e.getBoundingClientRect().height;
  return Number.isFinite(r) && r > 0 ? r : 0;
}
function ms(e, t) {
  if (e.size !== t.size) return !1;
  for (const [n, r] of t)
    if (e.get(n) !== r) return !1;
  return !0;
}
function ps(e) {
  const t = /* @__PURE__ */ new Map();
  e.querySelectorAll(Ha()).forEach((r) => {
    const a = Ct(r);
    if (!Number.isFinite(a) || a < 1) return;
    const o = fs(r);
    if (o <= 0) return;
    const s = t.get(a) || { height: 0, count: 0 };
    s.height = Math.max(s.height, o), s.count += 1, t.set(a, s);
  });
  const n = /* @__PURE__ */ new Map();
  return t.forEach((r, a) => {
    r.count >= 2 && r.height > 0 && n.set(a, Math.ceil(r.height));
  }), n;
}
function hs(e, t, n = "", r) {
  const [a, o] = C(() => /* @__PURE__ */ new Map()), s = x(a), l = x(r);
  return l.current = r, $e(() => {
    if (!t) {
      s.current.size !== 0 && (s.current = /* @__PURE__ */ new Map(), o(s.current));
      return;
    }
    let c = !1, i = 0, d = !1, u = !1;
    const f = () => {
      var k;
      if (c) return;
      const S = e.current;
      if (!S) return;
      const b = ps(S);
      ms(s.current, b) || (s.current = b, o(b)), d && !u && (u = !0, (k = l.current) == null || k.call(l));
    }, m = () => {
      cancelAnimationFrame(i), i = requestAnimationFrame(() => {
        requestAnimationFrame(f);
      });
    };
    m();
    const w = window.setTimeout(m, 100), g = window.setTimeout(() => {
      d = !0, m();
    }, 300), y = window.setTimeout(m, 700), v = e.current;
    let P = null;
    return v && typeof ResizeObserver < "u" && (P = new ResizeObserver(() => m()), P.observe(v)), () => {
      c = !0, cancelAnimationFrame(i), window.clearTimeout(w), window.clearTimeout(g), window.clearTimeout(y), P == null || P.disconnect();
    };
  }, [e, t, n]), a;
}
const gs = [0, 48, 140, 320, 560], bs = 700, ys = [80, 200, 400], vs = 500, ws = 50, Ss = 180, Jn = [0, 48, 140, 320, 700, 1200];
function ks(e, t) {
  var R;
  const {
    primaryPane: n,
    mode: r,
    enabled: a = !0,
    persistenceKey: o = "",
    restoreReady: s = !0
  } = t, l = x(
    ((R = Te(o)) == null ? void 0 : R.anchor) || { page: 1, fraction: 0 }
  ), c = x(null), i = x(!1), d = x(r), u = x(null), f = x(null), m = x(null), w = x(null), g = x(o), y = x(""), v = x(n);
  v.current = n;
  const P = N(() => {
    var I;
    (I = u.current) == null || I.call(u), u.current = null, f.current != null && (clearTimeout(f.current), f.current = null);
  }, []), S = N((I = !1) => {
    w.current != null && (clearTimeout(w.current), w.current = null);
    const M = () => {
      w.current = null, Tt(g.current, {
        anchor: ye(l.current)
      });
    };
    I ? M() : w.current = setTimeout(M, Ss);
  }, []), b = N((I) => {
    l.current = ye(I), c.current = null, m.current != null && clearTimeout(m.current), m.current = setTimeout(() => {
      m.current = null, i.current = !1;
    }, ws);
  }, []);
  $(() => {
    if (!a)
      return;
    let I = !1, M = null, D = null, L = null;
    const j = () => {
      if (I) return;
      const H = e.current;
      if (!H) {
        L = setTimeout(j, 50);
        return;
      }
      M = H, D = () => {
        if (i.current)
          return;
        const Z = $t(M, v.current);
        Z && (l.current = Z, S());
      }, M.addEventListener("scroll", D, { passive: !0 }), i.current || D();
    };
    return j(), () => {
      I = !0, L != null && clearTimeout(L), M && D && M.removeEventListener("scroll", D);
    };
  }, [a, r, n, e, S]), $e(() => {
    var M;
    if (g.current === o) return;
    S(!0), P(), m.current != null && (clearTimeout(m.current), m.current = null), g.current = o, y.current = "";
    const I = (M = Te(o)) == null ? void 0 : M.anchor;
    l.current = I ? ye(I) : { page: 1, fraction: 0 }, c.current = null, i.current = !!o, d.current = r;
  }, [o, r, S, P]), $(() => {
    var M;
    if (!a || !s || !o || y.current === o) return;
    y.current = o;
    const I = ye(
      ((M = Te(o)) == null ? void 0 : M.anchor) || { page: 1, fraction: 0 }
    );
    return l.current = I, c.current = I, i.current = !0, P(), u.current = Xt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: v.current,
        delaysMs: Jn,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, Math.max(...Jn) + 160), () => P();
  }, [a, s, o, e, b, P]), $(() => {
    if (d.current === r)
      return;
    if (d.current = r, !a) {
      i.current = !1, c.current = null, P();
      return;
    }
    const I = c.current ? ye(c.current) : ye(l.current);
    return i.current = !0, c.current = I, l.current = I, P(), u.current = Xt(
      () => e.current,
      I,
      {
        behavior: "auto",
        pane: n,
        // 等页宽/行高同步后再钉；同一 locked 幂等，不会越滚越远
        delaysMs: gs,
        onDone: () => b(I)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(I);
    }, bs), () => {
      P();
    };
  }, [r, a, n, e, b, P]), $(() => () => {
    P(), m.current != null && (clearTimeout(m.current), m.current = null), S(!0);
  }, [P, S]);
  const k = N(() => {
    const I = $t(
      e.current,
      v.current
    );
    return ye(I || l.current);
  }, [e]), A = N(() => {
    i.current = !0;
    const I = $t(
      e.current,
      v.current
    ), M = ye(I ?? l.current);
    return l.current = M, c.current = M, S(), M;
  }, [e, S]), E = N((I, M, D) => {
    const L = D || v.current, j = Et(I, M || 1), H = { page: j, fraction: 0 };
    l.current = H, i.current = !0, c.current = H, S(), P(), cs(e.current, j, "smooth", L), u.current = ls(
      () => e.current,
      j,
      {
        behavior: "auto",
        pane: L,
        delaysMs: ys,
        onDone: () => b(H)
      }
    ), f.current = setTimeout(() => {
      f.current = null, b(H);
    }, vs);
  }, [e, b, P, S]), O = N(() => ye(l.current), []), _ = N(() => i.current, []), T = N(() => {
    if (!i.current || !c.current)
      return;
    const I = ye(c.current);
    yn(
      e.current,
      I,
      "auto",
      v.current
    );
  }, [e]);
  return {
    lockFromShell: k,
    beginModeSwitch: A,
    goToPage: E,
    getAnchor: O,
    isRestoring: _,
    repinIfRestoring: T
  };
}
function Ps(e, t) {
  if (!e) return null;
  if (e.blockId && t) {
    const a = t(e.blockId);
    if (a != null && Number.isFinite(a) && a >= 1)
      return Math.floor(a);
  }
  if (e.pageIdx === null || e.pageIdx === void 0) return null;
  const n = Number(e.pageIdx);
  if (!Number.isFinite(n)) return null;
  const r = Math.floor(n) + 1;
  return r >= 1 ? r : null;
}
function $r(e, t, n) {
  const r = `${(n == null ? void 0 : n.jobId) || ""}`.trim(), a = `${(n == null ? void 0 : n.documentId) || ""}`.trim(), o = `j:${r}:d:${a}`;
  return t == null ? `${o}:none:${(e == null ? void 0 : e.blockId) || ""}` : `${o}:p:${t}:b:${(e == null ? void 0 : e.blockId) || ""}`;
}
const Is = [0, 80, 200, 400, 800], Rs = 120, _s = 400;
function Ts(e, t, n) {
  const { enabled: r, numPages: a, goToPage: o, resolveBlockPage: s, onAnchorApplied: l, jobId: c, documentId: i } = e, d = x(o);
  d.current = o;
  const u = x(s);
  u.current = s;
  const f = x(l);
  f.current = l;
  const m = x(n);
  m.current = n, $(() => {
    var S, b;
    if (!r || !Number.isFinite(a) || a < 1)
      return;
    const w = oa(), g = Ps(w, u.current), y = $r(w, g, { jobId: c, documentId: i });
    if (t.current === y)
      return;
    if (g == null) {
      t.current = y, (S = m.current) == null || S.call(m);
      return;
    }
    t.current = y, w && ((b = f.current) == null || b.call(f, w, g));
    const v = [];
    let P = 0;
    for (const k of Is)
      P = Math.max(P, k), v.push(
        setTimeout(() => {
          d.current(g);
        }, k)
      );
    return v.push(
      setTimeout(() => {
        var k;
        (k = m.current) == null || k.call(m);
      }, P + Rs)
    ), () => {
      for (const k of v) clearTimeout(k);
    };
  }, [r, a, c, i, t]);
}
function Es(e) {
  var o;
  const t = globalThis.window;
  if (!t || typeof ((o = t.history) == null ? void 0 : o.replaceState) != "function") return;
  const n = t.location, r = `${e || ""}`, a = `${n.pathname}${r ? `?${r}` : ""}${n.hash || ""}`;
  t.history.replaceState(null, "", a);
}
function Ms(e, t, n) {
  const {
    syncEnabled: r,
    currentPage: a,
    resolveBlockPage: o,
    syncDebounceMs: s = _s,
    jobId: l,
    documentId: c,
    applyReaderSearch: i
  } = e, d = x(o);
  d.current = o;
  const u = x(i);
  u.current = i;
  const f = x(0);
  $(() => {
    if (!n || !r || !t.current || !Number.isFinite(a) || a < 1 || f.current === a) return;
    const m = setTimeout(() => {
      var v;
      const w = ((v = globalThis.location) == null ? void 0 : v.search) || "", g = Io(w, a, d.current);
      if (f.current = a, g === null) return;
      const y = `${new URLSearchParams(g).get("block_id") || ""}`.trim();
      t.current = $r(
        { blockId: y },
        a,
        { jobId: l, documentId: c }
      ), (u.current || Es)(g);
    }, s);
    return () => clearTimeout(m);
  }, [
    n,
    r,
    a,
    s,
    l,
    c,
    t
  ]);
}
function As(e) {
  const t = x(""), [n, r] = C(!1), a = N(() => r(!0), []), o = {
    enabled: e.enabled,
    numPages: e.numPages,
    goToPage: e.goToPage,
    resolveBlockPage: e.resolveBlockPage,
    onAnchorApplied: e.onAnchorApplied,
    jobId: e.jobId,
    documentId: e.documentId
  };
  Ts(o, t, a), Ms(e, t, n);
}
const tt = {
  layoutByPage: /* @__PURE__ */ new Map(),
  pagesByPage: /* @__PURE__ */ new Map(),
  lastSeq: 0,
  connection: "idle",
  jobStatus: "",
  error: ""
};
function Ns(e) {
  return new Map(((e == null ? void 0 : e.pages) || []).map((t) => [t.page_idx, t]));
}
function qn(e, t) {
  return e.attempt !== t.attempt ? e.attempt < t.attempt ? -1 : 1 : e.generation !== t.generation ? e.generation < t.generation ? -1 : 1 : 0;
}
function jr(e, t, n) {
  if (n.page_idx !== t.page_idx) return "retry";
  const r = qn(n, t);
  if (r < 0 || r === 0 && n.page_hash !== t.page_hash) return "retry";
  if (!e) return "accept";
  const a = qn(n, e);
  return a < 0 ? "ignore" : a === 0 ? n.page_hash === e.pageHash ? "ignore" : "retry" : "accept";
}
function xs(e, t, n) {
  if (t.seq <= e.lastSeq) return e;
  const r = e.pagesByPage.get(t.page_idx), a = jr(r, t, n);
  if (a === "retry") return e;
  if (a === "ignore")
    return { ...e, lastSeq: t.seq, connection: "live", error: "" };
  const o = new Map(n.items.map((c) => [c.item_id, c])), s = new Map((r == null ? void 0 : r.changedAtSeqById) || []);
  for (const c of t.changed_item_ids)
    o.has(c) && s.set(c, t.seq);
  const l = new Map(e.pagesByPage);
  return l.set(t.page_idx, {
    attempt: n.attempt,
    generation: n.generation,
    pageHash: n.page_hash,
    itemsById: o,
    changedAtSeqById: s,
    lastEventSeq: t.seq
  }), {
    ...e,
    pagesByPage: l,
    lastSeq: t.seq,
    connection: "live",
    error: ""
  };
}
const Vn = [250, 500, 1e3, 2e3, 4e3], jt = [80, 160, 320, 640, 1e3, 1500], Kn = [250, 500, 1e3, 2e3, 4e3, 5e3], Cs = /* @__PURE__ */ new Set(["succeeded", "failed", "cancelled", "canceled"]);
function Qt(e, t) {
  return new Promise((n, r) => {
    if (t.aborted) {
      r(new DOMException("Aborted", "AbortError"));
      return;
    }
    const a = () => {
      clearTimeout(o), r(new DOMException("Aborted", "AbortError"));
    }, o = setTimeout(() => {
      t.removeEventListener("abort", a), n();
    }, e);
    t.addEventListener("abort", a, { once: !0 });
  });
}
function vn(e) {
  return Ao(e) ? `${e.code || ""}`.trim() : "";
}
function St(e, t) {
  const n = vn(e);
  return n === "LIVE_TRANSLATION_PAGE_NOT_COMMITTED" ? p("k_c83066ad") : n === "LIVE_TRANSLATION_LAYOUT_NOT_READY" ? p("k_ce1e39de") : `${(e == null ? void 0 : e.message) || ""}`.trim() || t;
}
async function Ls(e, t, n, r, a) {
  let o = null;
  for (let s = 0; ; s += 1) {
    try {
      const c = await a.fetchPage(e, t.page_idx, { signal: r });
      if (jr(n.pagesByPage.get(t.page_idx), t, c) !== "retry")
        return c;
      o = No(
        "Authoritative page snapshot has not reached the event generation",
        409,
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      );
    } catch (c) {
      if ((c == null ? void 0 : c.name) === "AbortError") throw c;
      o = c;
      const i = vn(c);
      if (i && ![
        "LIVE_TRANSLATION_PAGE_NOT_COMMITTED",
        "LIVE_TRANSLATION_SNAPSHOT_UNAVAILABLE"
      ].includes(i)) throw c;
    }
    const l = jt[Math.min(s, jt.length - 1)];
    if (await Qt(l, r), s >= jt.length + 2) throw o;
  }
}
function zs({
  jobId: e,
  jobStatus: t,
  enabled: n,
  liveTranslationPort: r = void 0
}) {
  const [a, o] = C(tt), s = x(a), l = x("");
  s.current = a;
  const c = `${e || ""}`.trim(), i = `${t || ""}`.trim().toLowerCase(), d = Cs.has(i) ? i : "";
  return $(() => {
    if (!n || !c) {
      l.current = "", s.current = tt, o(tt);
      return;
    }
    const u = r === void 0 ? ra() : r, f = l.current === c;
    if (l.current = c, !u) {
      const S = {
        ...f ? s.current : tt,
        connection: d ? "terminal" : "unavailable",
        jobStatus: i,
        error: p("k_cfad2cb5")
      };
      s.current = S, o(S);
      return;
    }
    const m = new AbortController();
    let w = !1;
    const g = {
      ...f ? s.current : tt,
      connection: d ? "terminal" : "connecting",
      jobStatus: i,
      error: ""
    };
    s.current = g, o(g);
    const y = (S) => {
      m.signal.aborted || o((b) => {
        const k = S(b);
        return s.current = k, k;
      });
    }, v = async () => {
      let S = 0;
      for (; !m.signal.aborted; )
        try {
          const b = await u.fetchLayout(c, { signal: m.signal });
          w = !0, y((k) => ({
            ...k,
            layoutByPage: Ns(b),
            jobStatus: i,
            error: ""
          }));
          return;
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError") return;
          const k = vn(b);
          if (!(k === "LIVE_TRANSLATION_LAYOUT_NOT_READY" || !k)) {
            y((E) => ({
              ...E,
              connection: d ? "terminal" : "unavailable",
              jobStatus: i,
              error: St(b, p("k_cfad2cb5"))
            }));
            return;
          }
          if (d) {
            y((E) => ({
              ...E,
              connection: "terminal",
              jobStatus: i,
              error: ""
            }));
            return;
          }
          y((E) => ({
            ...E,
            connection: "connecting",
            jobStatus: i,
            error: St(b, p("k_ce1e39de"))
          })), await Qt(Vn[Math.min(S, Vn.length - 1)], m.signal).catch(() => {
          }), S += 1;
        }
    };
    return (async () => {
      if (await v(), !w || m.signal.aborted) return;
      let S = 0;
      for (; !m.signal.aborted; ) {
        d || y((b) => ({
          ...b,
          connection: b.lastSeq > 0 ? "reconnecting" : "connecting",
          jobStatus: i,
          // 保留已有错误：首页还没提交（lastSeq 为 0）时恰恰是最容易出错的阶段，
          // 此前这里把它清成空串，UI 于是一直显示「连接中」，用户看到的是
          // "正在努力"，实际可能已经在反复失败。
          error: b.error
        }));
        try {
          await u.streamEvents(c, {
            afterSeq: s.current.lastSeq,
            signal: m.signal,
            onEvent: async (b) => {
              if (b.seq <= s.current.lastSeq) return;
              let k;
              try {
                k = await Ls(
                  c,
                  b,
                  s.current,
                  m.signal,
                  u
                );
              } catch (A) {
                if ((A == null ? void 0 : A.name) === "AbortError" || m.signal.aborted) throw A;
                y((E) => ({
                  ...E,
                  lastSeq: Math.max(E.lastSeq, b.seq),
                  error: St(A, p("k_8317c1c5"))
                }));
                return;
              }
              y((A) => {
                const E = xs(A, b, k);
                return d ? {
                  ...E,
                  connection: "terminal",
                  jobStatus: i
                } : {
                  ...E,
                  jobStatus: i
                };
              }), S = 0;
            }
          });
        } catch (b) {
          if ((b == null ? void 0 : b.name) === "AbortError" || m.signal.aborted) return;
          y((k) => ({
            ...k,
            connection: d ? "terminal" : "reconnecting",
            jobStatus: i,
            error: St(b, p("k_ebf42cdd"))
          }));
        }
        if (m.signal.aborted) return;
        if (d) {
          y((b) => ({
            ...b,
            connection: "terminal",
            jobStatus: i
          }));
          return;
        }
        await Qt(Kn[Math.min(S, Kn.length - 1)], m.signal).catch(() => {
        }), S += 1;
      }
    })(), () => m.abort();
  }, [n, r, c, d]), a;
}
const Ds = 2e3;
function Os(e) {
  if (typeof e == "number") {
    const r = Number(e);
    return !Number.isFinite(r) || r < 0 ? null : Math.floor(r) + 1;
  }
  if (!e || typeof e != "object") return null;
  const t = e.page_idx;
  if (t != null && `${t}`.trim() !== "") {
    const r = Number(t);
    return !Number.isFinite(r) || r < 0 ? null : Math.floor(r) + 1;
  }
  const n = e.page;
  if (n != null && `${n}`.trim() !== "") {
    const r = Number(n);
    return !Number.isFinite(r) || r < 1 ? null : Math.floor(r);
  }
  return null;
}
const Fs = /* @__PURE__ */ new Set(["book", "translate"]);
function Ur(e) {
  return !!(e.jobId && e.sourceUrl && Fs.has(e.workflow));
}
function $s(e) {
  return !!(Ur(e) && !(e.jobStatus === "succeeded" && e.translatedUrl));
}
function js() {
  const e = xa(), t = Ur({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    workflow: e.workflow
  }), n = $s({
    jobId: e.jobId,
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    jobStatus: e.jobStatus,
    workflow: e.workflow
  }), r = zs({
    jobId: e.jobId,
    jobStatus: e.jobStatus,
    enabled: t
  }), a = is(), { shellRef: o, shellEl: s, shellWidth: l, bindShell: c } = Da(), i = Qa({
    documentId: e.documentId,
    jobId: e.jobId
  }), d = `${i}\0${e.jobId}\0${e.sourceUrl}\0${e.translatedUrl}`, { userZoom: u, onZoomChange: f } = os(e.mode, o, i), m = Fa(
    {
      mode: e.mode,
      sourceOnly: e.sourceOnly,
      assetsReady: e.assetsReady,
      sourceUrl: e.sourceUrl,
      translatedUrl: e.translatedUrl,
      sourceFile: e.sourceFile,
      translatedFile: e.translatedFile
    },
    { userZoom: u, shellWidth: l, identityKey: d }
  ), {
    beginModeSwitch: w,
    goToPage: g,
    repinIfRestoring: y
  } = ks(o, {
    primaryPane: m.primaryPane,
    mode: e.mode,
    enabled: !e.boot.loading,
    persistenceKey: i,
    restoreReady: m.primaryNumPages > 0
  });
  $(() => {
    y();
  }, [l, y]);
  const v = hs(
    o,
    m.compareMode,
    m.rowSyncRevision,
    y
  ), P = ds(
    o,
    m.primaryNumPages,
    !e.boot.loading,
    `${e.mode}-${u}-${m.metricsTick}`,
    m.primaryPane
  ), S = N((B, K) => {
    var Q, ue;
    const X = Math.max(
      Number(m.hudNumPages) || 0,
      Number(m.primaryNumPages) || 0,
      Number((Q = m.numPagesByPane) == null ? void 0 : Q.source) || 0,
      Number((ue = m.numPagesByPane) == null ? void 0 : ue.translated) || 0
    );
    g(B, X, K);
  }, [g, m.hudNumPages, m.primaryNumPages, m.numPagesByPane]), [b, k] = C(null), A = x(null), E = N((B) => {
    A.current && clearTimeout(A.current), k(B), B && (A.current = setTimeout(() => k(null), Ds));
  }, []);
  $(() => () => {
    A.current && clearTimeout(A.current);
  }, []);
  const O = N((B) => {
    const K = Dt(e.regions, B);
    return K ? On(K, m.primaryPane).page : null;
  }, [e.regions, m.primaryPane]), _ = N((B, K) => {
    const X = K || m.primaryPane, Q = typeof B == "object" && B ? `${B.block_id || ""}`.trim() : "", ue = typeof B == "object" && B ? `${B.image_url || ""}`.trim() : "", ge = typeof B == "object" && B ? B.page_idx != null ? Number(B.page_idx) + 1 : B.page != null ? Number(B.page) : null : typeof B == "number" ? B + 1 : null, he = To(e.regions, ue, ge) || Dt(e.regions, Q) || (typeof B == "object" ? Eo(e.regions, B) : null);
    let U = he ? On(he, X).page : null;
    U == null && (U = Os(B)), !(U == null || U < 1) && (E(he), S(U, X));
  }, [E, S, m.primaryPane, e.regions]);
  As({
    enabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    syncEnabled: !e.boot.loading && !e.boot.failed && e.assetsReady,
    numPages: m.hudNumPages || 0,
    currentPage: P,
    goToPage: S,
    resolveBlockPage: O,
    jobId: e.jobId,
    documentId: e.documentId,
    onAnchorApplied: (B) => {
      E(Dt(e.regions, B.blockId));
    }
  });
  const { setModeKeepingPage: T } = ss({
    mode: e.mode,
    setMode: e.setMode,
    beginModeSwitch: w
  }), [R, I] = C(null), {
    selection: M,
    clearSelection: D
  } = as(o, !e.boot.loading && !e.boot.failed), L = N(() => {
    I(null), D();
  }, [D]), j = N((B) => {
    D(), I(B);
  }, [D]);
  $(() => {
    M && I(null);
  }, [M]), $(() => {
    const B = o.current;
    if (!B) return;
    const K = () => I(null);
    return B.addEventListener("scroll", K, { passive: !0 }), () => B.removeEventListener("scroll", K);
  }, [s, o]);
  const H = M || R;
  $(() => {
    E(null), L();
  }, [d, E, L]);
  const Z = !e.boot.loading && !e.boot.failed, oe = q(() => a, [a.active, a.open, a.close, a.toggle, a.isOpen]), ae = q(() => ({ bindShell: c, shellEl: s, shellWidth: l, shellRef: o }), [c, s, l, o]), re = q(() => ({
    sourceUrl: e.sourceUrl,
    translatedUrl: e.translatedUrl,
    sourceFile: e.sourceFile,
    translatedFile: e.translatedFile
  }), [e.sourceUrl, e.translatedUrl, e.sourceFile, e.translatedFile]), ie = q(() => ({
    session: e,
    boot: e.boot,
    sourceOnly: e.sourceOnly,
    mode: e.mode,
    userZoom: u,
    onZoomChange: f,
    shell: ae,
    panes: m,
    sessionFiles: re,
    rowHeights: v,
    goToPage: S,
    activeRegion: b,
    jumpToAnchor: _,
    setModeKeepingPage: T,
    download: e.download,
    showHud: Z,
    tools: oe,
    selection: H,
    clearSelection: L,
    selectRegion: j,
    viewStateKey: i,
    liveTranslation: r,
    liveTranslationAvailable: n
  }), [e, ae, m, re, v, S, b, _, T, Z, oe, H, L, j, u, f, i, r, n]);
  return q(() => ({
    ...ie,
    currentPage: P
  }), [ie, P]);
}
const Us = [
  { action: "mode-source", keys: ["1"], mode: "source" },
  { action: "mode-compare", keys: ["2"], mode: "compare" },
  { action: "mode-translated", keys: ["3"], mode: "translated" },
  { action: "zoom-in", keys: ["+", "="] },
  { action: "zoom-out", keys: ["-", "_"] },
  { action: "zoom-reset", keys: ["0"] },
  { action: "next-page", keys: ["j", "ArrowDown", "PageDown"], requiresPages: !0 },
  { action: "prev-page", keys: ["k", "ArrowUp", "PageUp"], requiresPages: !0 },
  { action: "first-page", keys: ["Home"], requiresPages: !0 },
  { action: "last-page", keys: ["End"], requiresPages: !0 }
], Bs = [
  {
    title: p("k_cfd0fb44"),
    items: [
      { actions: ["next-page"], keys: "J · ↓ · PgDn", desc: p("k_67a246a3") },
      { actions: ["prev-page"], keys: "K · ↑ · PgUp", desc: p("k_b41561d8") },
      { actions: ["first-page", "last-page"], keys: "Home / End", desc: p("k_965935cd") },
      { actions: [], keys: p("k_233266d7"), desc: p("k_ca426134") }
    ]
  },
  {
    title: p("k_12e2ed4d"),
    items: [
      { actions: ["zoom-in", "zoom-out"], keys: "+ / −", desc: p("k_5a1e4ac3") },
      { actions: ["zoom-reset"], keys: "0", desc: p("k_bde63db0") },
      { actions: [], keys: p("k_7c0e2ef8"), desc: p("k_bde63db0") }
    ]
  },
  {
    title: p("k_ed0eea8f"),
    items: [
      { actions: ["mode-source"], keys: "1", desc: p("k_be43b936") },
      { actions: ["mode-compare"], keys: "2", desc: p("k_d36792e9") },
      { actions: ["mode-translated"], keys: "3", desc: p("k_83ca9fe3") }
    ]
  }
];
function Hs(e) {
  const t = e.length === 1 ? e.toLowerCase() : e;
  for (const n of Us)
    if (n.keys.some(
      (a) => a.length === 1 ? a === t : a === e
    )) return n;
  return null;
}
function Ws(e) {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Js(e) {
  const {
    mode: t,
    sourceOnly: n,
    setMode: r,
    userZoom: a,
    onZoomChange: o,
    currentPage: s,
    numPages: l,
    goToPage: c,
    enabled: i = !0
  } = e;
  $(() => {
    if (!i)
      return;
    const d = (u) => {
      if (u.defaultPrevented || u.metaKey || u.ctrlKey || u.altKey || Ws(u.target))
        return;
      const f = u.key, m = Hs(f);
      if (m) {
        if (m.mode) {
          if (n && m.mode !== "source")
            return;
          u.preventDefault(), r(m.mode);
          return;
        }
        if (!(m.requiresPages && l <= 0))
          switch (u.preventDefault(), m.action) {
            case "zoom-in":
              o(ut(a, 1));
              return;
            case "zoom-out":
              o(ut(a, -1));
              return;
            case "zoom-reset":
              o(at());
              return;
            case "next-page":
              c(Et(s + 1, l));
              return;
            case "prev-page":
              c(Et(s - 1, l));
              return;
            case "first-page":
              c(1);
              return;
            case "last-page":
              c(l);
              return;
          }
      }
    };
    return window.addEventListener("keydown", d), () => window.removeEventListener("keydown", d);
  }, [
    i,
    t,
    n,
    r,
    a,
    o,
    s,
    l,
    c
  ]);
}
const qs = "retainpdf:soft-reader-close";
function Vs() {
  return new URL("./index.html", window.location.href).href;
}
function Ks() {
  if (typeof window > "u" || window.self === window.top) return !1;
  try {
    return window.parent.postMessage(
      { type: qs },
      window.location.origin
    ), !0;
  } catch {
    return !1;
  }
}
function Gs(e, t, n) {
  if (n <= 1 || !e) return !1;
  try {
    const r = new URL(t), a = new URL(e, r);
    return a.origin === r.origin && !/reader\.html$/i.test(a.pathname) && !/detail\.html$/i.test(a.pathname);
  } catch {
    return !1;
  }
}
function Ys() {
  if (!(typeof window > "u") && !Ks()) {
    if (Gs(
      document.referrer,
      window.location.href,
      window.history.length
    )) {
      window.history.back();
      return;
    }
    window.location.assign(Vs());
  }
}
function Zs({ onBeforeClose: e } = {}) {
  const t = () => {
    e == null || e(), Ys();
  };
  return /* @__PURE__ */ z(
    "button",
    {
      id: "reader-close-home-btn",
      type: "button",
      className: "reader-close-home-btn",
      "aria-label": p("k_20b6e2fc"),
      title: p("k_20b6e2fc"),
      onClick: t,
      children: [
        /* @__PURE__ */ h(Qe, { className: "reader-close-home-icon", size: 18, strokeWidth: 2.25, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { className: "reader-close-home-label", children: p("k_6c14bd7f") })
      ]
    }
  );
}
let Gn = !1;
function Xs() {
  if (Gn)
    return;
  const e = lt().resolvePdfjsVendorUrl("build/pdf.worker.mjs");
  e && (Vo.GlobalWorkerOptions.workerSrc = e, Gn = !0);
}
const Qs = {
  formula: p("k_3f27035a"),
  table: p("k_150074c2"),
  figure: p("k_be8da62e"),
  text: p("k_f4d3dab8"),
  region: p("k_17fc93c9")
};
function ei({
  pane: e,
  width: t,
  height: n,
  regions: r,
  onSelect: a
}) {
  const o = r.flatMap((s) => {
    if (!kr(s.region)) return [];
    const l = Nt(s, t, n);
    return l ? [{ highlight: s, rect: l }] : [];
  });
  return o.length ? /* @__PURE__ */ h("div", { className: "reader-structure-selection-layer", "aria-label": p("k_3688cbc3"), children: o.map(({ highlight: s, rect: l }) => {
    const c = s.region, i = Pr(c), d = Qs[i];
    return /* @__PURE__ */ z(
      "button",
      {
        type: "button",
        className: `reader-structure-selection-target is-${i}`,
        "data-reader-region-id": c.itemId,
        "data-reader-region-kind": i,
        style: l,
        "aria-label": p("k_05b1d745", [d]),
        title: p("k_2a0fa2fb", [d]),
        onClick: (u) => {
          u.stopPropagation();
          const f = u.currentTarget.getBoundingClientRect();
          a == null || a({
            selectionType: "region",
            region: c,
            kind: i,
            page: s.box.page,
            pane: e,
            rect: {
              left: f.left,
              top: f.top,
              width: f.width,
              height: f.height
            }
          });
        },
        children: [
          /* @__PURE__ */ h("span", { className: "reader-structure-selection-label", "aria-hidden": "true", children: d }),
          /* @__PURE__ */ h("span", { className: "sr-only", children: Ir(c, e) })
        ]
      },
      c.itemId
    );
  }) }) : null;
}
function ti(e, t, n) {
  return e.flatMap((r) => {
    if (Pr(r.region) !== "text") return [];
    const a = Nt(r, t, n);
    return a ? [{ itemId: r.itemId, highlight: r, rect: a }] : [];
  });
}
function Yn(e, t, n) {
  let r = null, a = Number.POSITIVE_INFINITY;
  for (const o of e) {
    const { rect: s } = o;
    if (t < s.left || t > s.left + s.width || n < s.top || n > s.top + s.height)
      continue;
    const l = s.width * s.height;
    l < a && (r = o, a = l);
  }
  return r;
}
function ni({ target: e }) {
  return e ? /* @__PURE__ */ h("div", { className: "reader-text-hover-layer", "aria-hidden": "true", children: /* @__PURE__ */ h(
    "div",
    {
      className: "reader-text-hover-frame",
      "data-reader-text-hover-id": e.itemId,
      style: e.rect,
      children: /* @__PURE__ */ h("span", { className: "reader-text-hover-label", children: p("k_f4d3dab8") })
    }
  ) }) : null;
}
function ri(e, t) {
  const n = e.page_idx + 1, r = {
    page: n,
    bbox: t.bbox,
    unit: "pdf_point",
    origin: "top_left",
    text: t.source_text
  }, a = {
    itemId: t.item_id,
    source: r,
    translated: r,
    markdown: t.source_text,
    regionType: t.kind,
    status: "live_translation",
    assetIds: [],
    assetUrls: []
  };
  return {
    itemId: t.item_id,
    region: a,
    box: r,
    pageSize: { page: n, width: e.width, height: e.height }
  };
}
function oi(e, t, n, r) {
  if (!e || !t) return [];
  const a = [];
  for (const o of e.blocks) {
    const s = t.itemsById.get(o.item_id);
    if (!(s != null && s.translated_text)) continue;
    const l = Nt(
      ri(e, o),
      n,
      r
    );
    l && a.push({
      itemId: o.item_id,
      translatedText: s.translated_text,
      status: s.status,
      kind: o.kind,
      sourceText: o.source_text,
      typography: o.typography,
      rect: l,
      changedAtSeq: t.changedAtSeqById.get(o.item_id) || 0,
      changedNow: t.changedAtSeqById.get(o.item_id) === t.lastEventSeq
    });
  }
  return a;
}
const ai = '"Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", serif', si = 256, nt = /* @__PURE__ */ new Map();
function ii(e) {
  return `${e || ""}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function ci(e) {
  const t = `${e || ""}`, { text: n, slots: r } = Yo(t, { bareLatex: !0 }), a = ii(n), o = Zo(a, r);
  if (!r.length)
    return { fallbackHtml: o, richHtml: Promise.resolve(o), hasMath: !1 };
  let s = nt.get(t);
  if (!s && (s = Xo(a, r), nt.set(t, s), nt.size > si)) {
    const l = nt.keys().next().value;
    l !== void 0 && nt.delete(l);
  }
  return { fallbackHtml: o, richHtml: s, hasMath: !0 };
}
function Ut(e) {
  return /title|heading|header|display_formula|equation/i.test(e);
}
function _e(e) {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : void 0;
}
function li(e, t) {
  const n = e.typography, r = _e(t) || 1, a = _e(n == null ? void 0 : n.font_size_pt), o = Math.max(1, `${e.sourceText || ""}`.split(/\n+/).length), s = e.rect.height / Math.max(1.28, o * 1.18), l = Ut(e.kind) ? 24 : /caption|footnote|table/i.test(e.kind) ? 9.5 : 11, c = Math.max(5.5 * r, Math.min(s, l * r)), i = _e(n == null ? void 0 : n.fit_min_font_size_pt), d = _e(n == null ? void 0 : n.fit_max_font_size_pt), u = Math.max(3.5, (i || 5.5) * r), f = Math.max(
    u,
    d ? d * r : a ? a * r : c
  ), m = a ? a * r : c, w = _e(n == null ? void 0 : n.leading_em), g = [
    _e(n == null ? void 0 : n.padding_top_pt) || 0,
    _e(n == null ? void 0 : n.padding_right_pt) || 0,
    _e(n == null ? void 0 : n.padding_bottom_pt) || 0,
    _e(n == null ? void 0 : n.padding_left_pt) || 0
  ].map((y) => y * r);
  return {
    fontFamily: `${(n == null ? void 0 : n.font_family) || ""}`.trim() || ai,
    fontSizePx: Math.max(u, Math.min(f, m)),
    minFontSizePx: u,
    maxFontSizePx: f,
    // Typst leading is the additional inter-line gap, unlike CSS line-height.
    lineHeight: w ? 1 + w : 1.3,
    fontWeight: (n == null ? void 0 : n.font_weight) || (Ut(e.kind) ? 600 : 400),
    textAlign: ["left", "center", "right", "justify"].includes(`${(n == null ? void 0 : n.text_align) || ""}`) ? n == null ? void 0 : n.text_align : Ut(e.kind) ? "center" : "justify",
    padding: g,
    exact: !!a
  };
}
function di(e, t, n, r) {
  const { minFontSizePx: a, maxFontSizePx: o } = r, s = /* @__PURE__ */ new Map(), l = (u) => {
    const f = s.get(u);
    if (f !== void 0) return f;
    const { width: m, height: w } = e(u), g = m <= t + 0.5 && w <= n + 0.5;
    return s.set(u, g), g;
  };
  let c = a, i = o, d = Math.min(r.requestedFontSizePx, i);
  if (l(d)) {
    if (!r.exact) {
      c = d;
      for (let u = 0; u < 6 && i > c; u += 1) {
        const f = (c + i) / 2;
        l(f) ? (d = f, c = f) : i = f;
      }
    }
  } else {
    i = d, d = c;
    for (let u = 0; u < 8 && i > c; u += 1) {
      const f = (c + i) / 2;
      l(f) ? (d = f, c = f) : i = f;
    }
  }
  return Math.max(a, d);
}
const ui = 512, rt = /* @__PURE__ */ new Map();
let en = 0;
typeof document < "u" && document.fonts && (document.fonts.ready.then(() => {
  en += 1;
}).catch(() => {
}), typeof document.fonts.addEventListener == "function" && document.fonts.addEventListener("loadingdone", () => {
  en += 1;
}));
function fi(e, t, n, r) {
  return [
    en,
    r.fontFamily,
    r.fontWeight,
    r.lineHeight,
    r.textAlign,
    r.minFontSizePx,
    r.maxFontSizePx,
    r.fontSizePx,
    r.exact ? 1 : 0,
    t,
    n,
    e
  ].join("");
}
function mi({ item: e, pageScale: t }) {
  const n = x(null), r = q(
    () => ci(e.translatedText),
    [e.translatedText]
  ), [a, o] = C(r.fallbackHtml), s = q(
    () => li(e, t),
    [e, t]
  );
  $(() => {
    let u = !0;
    return o(r.fallbackHtml), r.hasMath && r.richHtml.then((f) => {
      u && o(f);
    }), () => {
      u = !1;
    };
  }, [r]), $e(() => {
    const u = n.current;
    if (!u) return;
    const [f, m, w, g] = s.padding, y = Math.max(1, e.rect.width - g - m), v = Math.max(1, e.rect.height - f - w), P = fi(a, y, v, s);
    let S = rt.get(P);
    if (S === void 0 && (S = di(
      (b) => (u.style.fontSize = `${b}px`, { width: u.scrollWidth, height: u.scrollHeight }),
      y,
      v,
      {
        minFontSizePx: s.minFontSizePx,
        maxFontSizePx: s.maxFontSizePx,
        requestedFontSizePx: s.fontSizePx,
        exact: s.exact
      }
    ), rt.set(P, S), rt.size > ui)) {
      const b = rt.keys().next().value;
      b !== void 0 && rt.delete(b);
    }
    u.style.fontSize = `${S.toFixed(2)}px`;
  }, [a, e.rect.height, e.rect.width, s]);
  const [l, c, i, d] = s.padding;
  return /* @__PURE__ */ h(
    "div",
    {
      className: `reader-live-translation-item${e.changedNow ? " is-changed" : ""}`,
      "data-live-translation-item": e.itemId,
      "data-live-translation-kind": e.kind,
      "data-live-translation-status": e.status,
      "data-live-translation-typography": s.exact ? "typst" : "fitted",
      style: {
        ...e.rect,
        padding: `${l}px ${c}px ${i}px ${d}px`
      },
      children: /* @__PURE__ */ h(
        "div",
        {
          ref: n,
          className: "reader-live-translation-content",
          style: {
            fontFamily: s.fontFamily,
            fontSize: s.fontSizePx,
            fontWeight: s.fontWeight,
            lineHeight: s.lineHeight,
            textAlign: s.textAlign
          },
          dangerouslySetInnerHTML: { __html: a }
        }
      )
    }
  );
}
function pi({
  layoutPage: e,
  pageState: t,
  width: n,
  height: r
}) {
  const a = q(
    () => oi(e, t, n, r),
    [r, e, t, n]
  );
  return a.length ? /* @__PURE__ */ h(
    "div",
    {
      className: "reader-live-translation-overlay",
      "data-live-translation-page": e == null ? void 0 : e.page_idx,
      "data-live-translation-generation": t == null ? void 0 : t.generation,
      "aria-hidden": "true",
      children: a.map((o) => /* @__PURE__ */ h(
        mi,
        {
          item: o,
          pageScale: e != null && e.width ? n / e.width : 1
        },
        `${o.itemId}:${o.changedAtSeq}`
      ))
    }
  ) : null;
}
const hi = an(pi), Br = 1.414;
function gi({
  pageNumber: e,
  width: t,
  devicePixelRatio: n,
  pane: r,
  active: a = !1,
  syncedMinHeight: o = 0,
  onMetrics: s,
  cachedAspect: l,
  onAspectChange: c,
  sentinelRef: i,
  regionHighlight: d = null,
  regionTargets: u = [],
  onSelectRegion: f,
  liveTranslationLayout: m,
  liveTranslationPage: w,
  showLiveTranslation: g = r === "source"
}) {
  const y = x(l ?? Br), [v, P] = C(y.current);
  $(() => {
    l != null && Math.abs(l - y.current) >= 1e-3 && (y.current = l, P(l));
  }, [l]);
  const S = x(i);
  S.current = i;
  const b = x((L) => {
    var j;
    (j = S.current) == null || j.call(S, L);
  }).current, k = Math.max(120, Math.floor(t * v)), A = Math.max(k, Math.ceil(o || 0)), E = Nt(d, t, k), O = q(
    () => ti(u, t, k),
    [k, u, t]
  ), [_, T] = C(null), R = q(
    () => O.find((L) => L.itemId === _) || null,
    [_, O]
  ), I = (L) => {
    if (L.buttons !== 0) {
      T(null);
      return;
    }
    const j = L.currentTarget.getBoundingClientRect(), H = Yn(
      O,
      L.clientX - j.left,
      L.clientY - j.top
    ), Z = (H == null ? void 0 : H.itemId) || null;
    T((oe) => oe === Z ? oe : Z);
  }, M = (L) => {
    var Z, oe, ae;
    if (!f || (oe = (Z = L.target) == null ? void 0 : Z.closest) != null && oe.call(Z, ".reader-structure-selection-target") || `${((ae = window.getSelection()) == null ? void 0 : ae.toString()) || ""}`.trim()) return;
    const j = L.currentTarget.getBoundingClientRect(), H = Yn(
      O,
      L.clientX - j.left,
      L.clientY - j.top
    );
    H && f({
      selectionType: "region",
      region: H.highlight.region,
      kind: "text",
      page: H.highlight.box.page,
      pane: r === "translated" ? "translated" : "source",
      rect: {
        left: j.left + H.rect.left,
        top: j.top + H.rect.top,
        width: H.rect.width,
        height: H.rect.height
      }
    });
  }, D = (L) => {
    !Number.isFinite(L) || L <= 0 || Math.abs(y.current - L) < 1e-3 || (y.current = L, P(L), c == null || c(e, L));
  };
  return /* @__PURE__ */ z(
    "div",
    {
      ref: b,
      [Ye]: e,
      [Ze]: r,
      [hn]: k,
      className: gn,
      onPointerMoveCapture: I,
      onClick: M,
      onPointerLeave: () => T(null),
      style: {
        width: t,
        height: A,
        minHeight: A
      },
      children: [
        a ? /* @__PURE__ */ h(
          Ko,
          {
            pageNumber: e,
            width: t,
            devicePixelRatio: n,
            renderTextLayer: !0,
            renderAnnotationLayer: !1,
            className: Nr,
            loading: /* @__PURE__ */ h(
              "div",
              {
                className: _t,
                style: { width: t, height: k }
              }
            ),
            onLoadSuccess: (L) => {
              try {
                const j = L.getViewport({ scale: 1 });
                if (j.width > 0) {
                  const H = j.height / j.width;
                  D(H);
                }
              } catch {
              }
              s == null || s();
            },
            onRenderSuccess: () => {
              s == null || s();
            }
          }
        ) : /* @__PURE__ */ h(
          "div",
          {
            className: _t,
            style: { width: t, height: k },
            "aria-hidden": !0
          }
        ),
        E ? /* @__PURE__ */ h(
          "div",
          {
            className: "reader-react-pdf-region-highlight",
            "data-reader-region-id": d == null ? void 0 : d.itemId,
            style: E,
            "aria-hidden": "true"
          }
        ) : null,
        a && g ? /* @__PURE__ */ h(
          hi,
          {
            layoutPage: m,
            pageState: w,
            width: t,
            height: k
          }
        ) : null,
        /* @__PURE__ */ h(ni, { target: a ? R : null }),
        /* @__PURE__ */ h(
          ei,
          {
            pane: r === "translated" ? "translated" : "source",
            width: t,
            height: k,
            regions: u,
            onSelect: f
          }
        )
      ]
    }
  );
}
const bi = an(gi), Bt = 5, yi = "120% 0px", vi = 120;
let Zn = 1;
const Xn = /* @__PURE__ */ new WeakMap();
function wi(e) {
  if (!e) return 0;
  const t = Xn.get(e);
  if (t) return t;
  const n = Zn;
  return Zn += 1, Xn.set(e, n), n;
}
function Si() {
  const e = typeof window < "u" && window.devicePixelRatio || 1;
  return Math.max(1, Math.min(e, 2));
}
const ki = po(
  function({
    pane: t,
    url: n = "",
    preloadedFile: r = null,
    userZoom: a = 1,
    visible: o = !0,
    emptyLabel: s = p("k_87235a49"),
    scrollRoot: l = null,
    pageWidthOverride: c = null,
    rowHeights: i,
    onMetrics: d,
    onLoadSuccess: u,
    onLoadError: f,
    onNumPagesChange: m,
    activeRegion: w = null,
    regions: g = [],
    readerMetadata: y = null,
    onSelectRegion: v,
    liveTranslation: P,
    showLiveTranslation: S = t === "source",
    liveTranslationPendingLabel: b = "",
    paneAction: k
  }, A) {
    Xs();
    const { file: E, loading: O, error: _ } = Ea(n, r), T = `${n}\0${wi(E)}`, R = x(T);
    R.current = T;
    const I = q(
      () => Ra(E),
      [E, n]
    ), [M, D] = C(0), [L, j] = C(""), [H, Z] = C(null), [oe, ae] = C(480), re = x(null), ie = x(0), B = q(() => Si(), []), K = q(() => ({
      cMapUrl: lt().resolvePdfjsVendorUrl("cmaps/"),
      cMapPacked: !0,
      standardFontDataUrl: lt().resolvePdfjsVendorUrl("standard_fonts/")
    }), []);
    sn(A, () => H, [H]), $(() => {
      const F = (W) => {
        !Number.isFinite(W) || W < 80 || Math.abs(W - ie.current) < 8 || (ie.current = W, ae(W));
      }, G = c && c >= 80 ? c : (l == null ? void 0 : l.clientWidth) || 0;
      if (F(G), !l || typeof ResizeObserver > "u" || c && c >= 80) return;
      const J = new ResizeObserver((W) => {
        var te, ne;
        const le = ((ne = (te = W[0]) == null ? void 0 : te.contentRect) == null ? void 0 : ne.width) ?? l.clientWidth;
        !Number.isFinite(le) || le < 80 || (re.current && clearTimeout(re.current), re.current = setTimeout(() => F(le), 80));
      });
      return J.observe(l), () => {
        J.disconnect(), re.current && clearTimeout(re.current);
      };
    }, [c, l, o]);
    const X = q(
      () => Ga(oe, a),
      [oe, a]
    ), [Q, ue] = C(() => /* @__PURE__ */ new Map()), [ge, he] = C(() => /* @__PURE__ */ new Set()), [U, ce] = C(() => /* @__PURE__ */ new Set()), ee = x(/* @__PURE__ */ new Map()), V = x(null), se = x(/* @__PURE__ */ new Map()), Pe = N((F, G) => {
      ue((J) => {
        if (J.get(F) === G) return J;
        const W = new Map(J);
        return W.set(F, G), W;
      });
    }, []), be = N((F, G) => {
      const J = ee.current, W = J.get(F);
      if (W && V.current)
        try {
          V.current.unobserve(W);
        } catch {
        }
      if (G) {
        if (J.set(F, G), V.current)
          try {
            V.current.observe(G);
          } catch {
          }
      } else
        J.delete(F);
    }, []), Le = x(/* @__PURE__ */ new Map()), bt = N((F) => {
      const G = Le.current;
      let J = G.get(F);
      return J || (J = (W) => be(F, W), G.set(F, J)), J;
    }, [be]);
    $(() => {
      if (typeof IntersectionObserver > "u") return;
      const F = se.current, G = new IntersectionObserver(
        (J) => {
          const W = [], le = [];
          for (const te of J) {
            const ne = te.target, pe = Ct(ne);
            Number.isFinite(pe) && (te.isIntersecting ? W : le).push(pe);
          }
          if ((W.length || le.length) && he((te) => {
            let ne = null;
            for (const pe of W)
              te.has(pe) || (ne = ne || new Set(te), ne.add(pe));
            for (const pe of le)
              te.has(pe) && (ne = ne || new Set(te), ne.delete(pe));
            return ne || te;
          }), W.length) {
            for (const te of W) {
              const ne = F.get(te);
              ne && (clearTimeout(ne), F.delete(te));
            }
            ce((te) => {
              let ne = null;
              for (const pe of W)
                te.has(pe) || (ne = ne || new Set(te), ne.add(pe));
              return ne || te;
            });
          }
          for (const te of le)
            F.has(te) || F.set(te, setTimeout(() => {
              F.delete(te), ce((ne) => {
                if (!ne.has(te)) return ne;
                const pe = new Set(ne);
                return pe.delete(te), pe;
              });
            }, vi));
        },
        { root: l, rootMargin: yi, threshold: 0 }
      );
      V.current = G;
      for (const J of ee.current.values())
        try {
          G.observe(J);
        } catch {
        }
      return () => {
        G.disconnect(), V.current === G && (V.current = null);
        for (const J of F.values()) clearTimeout(J);
        F.clear();
      };
    }, [l]), $e(() => {
      D(0), j(""), he(/* @__PURE__ */ new Set()), ce(/* @__PURE__ */ new Set()), ue(/* @__PURE__ */ new Map()), ee.current.clear();
      const F = se.current;
      for (const G of F.values()) clearTimeout(G);
      F.clear(), m == null || m(0, t);
    }, [T, m, t]);
    const zt = N(
      ({ numPages: F }) => {
        R.current === T && (D(F), j(""), m == null || m(F, t), u == null || u({ numPages: F, pane: t }));
      },
      [T, u, m, t]
    ), yt = N(
      (F) => {
        if (R.current !== T) return;
        const G = (F == null ? void 0 : F.message) || p("k_57f1aee5");
        j(G), D(0), m == null || m(0, t), f == null || f(F, t);
      },
      [T, f, m, t]
    ), Ie = q(
      () => M > 0 ? Array.from({ length: M }, (F, G) => G + 1) : [],
      [M]
    );
    $(() => {
      typeof IntersectionObserver < "u" || ce(new Set(Ie));
    }, [Ie]);
    const Me = q(
      () => Fn(w, y, t),
      [w, y, t]
    ), Be = q(() => {
      const F = /* @__PURE__ */ new Map();
      for (const G of g) {
        const J = Fn(G, y, t);
        if (!J) continue;
        const W = F.get(J.box.page) || [];
        W.push(J), F.set(J.box.page, W);
      }
      return F;
    }, [t, y, g]), vt = q(() => {
      if (M === 0) return /* @__PURE__ */ new Set();
      if (!(!!l && typeof IntersectionObserver < "u" && o)) return new Set(Ie);
      if (ge.size === 0) {
        const J = Math.min(M, Bt * 2 + 1);
        return new Set(Array.from({ length: J }, (W, le) => le + 1));
      }
      const G = /* @__PURE__ */ new Set();
      for (const J of ge)
        for (let W = -Bt; W <= Bt; W++) {
          const le = J + W;
          le >= 1 && le <= M && G.add(le);
        }
      return G;
    }, [M, Ie, l, o, ge]), fo = !n || !!_ || !!L, mo = n && (_ || L) || s;
    return /* @__PURE__ */ z(
      "section",
      {
        ref: Z,
        className: `reader-panel ${Ba}${o ? "" : " is-hidden"}`,
        [Ze]: t,
        "data-reader-engine": "react-pdf",
        "data-reader-visible": o ? "true" : "false",
        "data-live-translation-status": (P == null ? void 0 : P.jobStatus) || void 0,
        "aria-hidden": o ? void 0 : !0,
        "aria-label": t === "source" ? p("k_be4c6a23") : p("k_d93c8aae"),
        children: [
          k ? /* @__PURE__ */ h("div", { className: "reader-react-pdf-pane-action", children: k }) : null,
          b ? /* @__PURE__ */ z("div", { className: "reader-live-translation-waiting", role: "status", children: [
            /* @__PURE__ */ h("span", { className: "reader-live-translation-waiting-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ h("span", { children: b })
          ] }) : null,
          fo && !O ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-empty", "data-reader-pdf-empty": t, children: mo }) : null,
          O ? /* @__PURE__ */ h("div", { className: "reader-empty reader-react-pdf-loading", "data-reader-pdf-loading": t, children: p("k_00fe0130") }) : null,
          I && !_ ? /* @__PURE__ */ h("div", { className: "reader-viewer-wrap reader-react-pdf-wrap", children: /* @__PURE__ */ h(
            Go,
            {
              file: I,
              loading: null,
              error: null,
              options: K,
              onLoadSuccess: zt,
              onLoadError: yt,
              className: "reader-react-pdf-document",
              children: Ie.map((F) => {
                if (vt.has(F))
                  return /* @__PURE__ */ h(
                    bi,
                    {
                      pane: t,
                      pageNumber: F,
                      width: X,
                      devicePixelRatio: B,
                      active: U.has(F),
                      syncedMinHeight: (i == null ? void 0 : i.get(F)) || 0,
                      onMetrics: d,
                      cachedAspect: Q.get(F),
                      onAspectChange: Pe,
                      sentinelRef: bt(F),
                      regionHighlight: (Me == null ? void 0 : Me.box.page) === F ? Me : null,
                      regionTargets: Be.get(F),
                      onSelectRegion: v,
                      liveTranslationLayout: P == null ? void 0 : P.layoutByPage.get(F - 1),
                      liveTranslationPage: P == null ? void 0 : P.pagesByPage.get(F - 1),
                      showLiveTranslation: S
                    },
                    `${t}-${F}`
                  );
                const J = Q.get(F) ?? Br, W = Math.max(120, Math.floor(X * J)), le = Math.max(W, Math.ceil((i == null ? void 0 : i.get(F)) || 0));
                return /* @__PURE__ */ h(
                  "div",
                  {
                    ref: bt(F),
                    [Ye]: F,
                    [Ze]: t,
                    [hn]: W,
                    className: gn,
                    style: {
                      width: X,
                      height: le,
                      minHeight: le
                    },
                    children: /* @__PURE__ */ h(
                      "div",
                      {
                        className: _t,
                        style: { width: X, height: W },
                        "aria-hidden": !0
                      }
                    )
                  },
                  `${t}-${F}`
                );
              })
            },
            T
          ) }) : null
        ]
      }
    );
  }
), Qn = an(ki), Hr = cn(null), Wr = cn(null);
function Pi({ value: e, hud: t, children: n }) {
  return /* @__PURE__ */ h(Hr.Provider, { value: e, children: /* @__PURE__ */ h(Wr.Provider, { value: t, children: n }) });
}
function gt() {
  return ln(Hr);
}
function Ii() {
  return ln(Wr);
}
function Ri({
  mode: e,
  compareMode: t,
  showSource: n,
  showTranslated: r,
  markdownSplit: a,
  overlayOnSource: o = !1
}) {
  const s = a && e === "compare";
  return {
    mode: s ? "source" : e,
    compareMode: t && !a,
    showSource: s ? !0 : n,
    showTranslated: s ? !1 : r
  };
}
function _i(e, t, n = e * 2) {
  return t ? Math.min(e * 2, n) : e;
}
function Ti(e) {
  return e ? e.connection === "terminal" && e.jobStatus === "failed" ? e.pagesByPage.size > 0 ? p("k_a96783f6", [e.pagesByPage.size]) : p("k_beab589b") : e.connection === "terminal" && ["cancelled", "canceled"].includes(e.jobStatus) ? e.pagesByPage.size > 0 ? p("k_3c1fdc76", [e.pagesByPage.size]) : p("k_867e0eff") : e.pagesByPage.size > 0 ? "" : e.connection === "unavailable" ? e.error || p("k_08e004dd") : e.error ? e.error : e.layoutByPage.size === 0 ? p("k_77174d66") : p("k_81e3fb61") : "";
}
function Ei(e) {
  const t = gt(), {
    markdownSplit: n = !1,
    assistantSplit: r = !1,
    liveTranslation: a,
    paneComposition: o
  } = e, s = (o == null ? void 0 : o.visibleMode) ?? e.mode ?? "compare", l = (o == null ? void 0 : o.compareMode) ?? e.compareMode ?? s === "compare", c = (o == null ? void 0 : o.showSource) ?? e.showSource ?? !0, i = (o == null ? void 0 : o.showTranslated) ?? e.showTranslated ?? (s === "compare" || s === "translated"), d = (o == null ? void 0 : o.overlayOnSource) ?? e.overlayOnSource ?? !1, u = e.bindShell ?? (t == null ? void 0 : t.bindShell), f = e.shellEl ?? (t == null ? void 0 : t.shellEl) ?? null, m = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? ht, w = e.shellWidth ?? (t == null ? void 0 : t.shellWidth) ?? 0, g = e.rowHeights ?? (t == null ? void 0 : t.rowHeights), y = e.mountSource ?? (t == null ? void 0 : t.mountSource) ?? !1, v = e.mountTranslated ?? (t == null ? void 0 : t.mountTranslated) ?? !1, P = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, S = e.sourceUrl ?? (t == null ? void 0 : t.sourceUrl) ?? "", b = e.translatedUrl ?? (t == null ? void 0 : t.translatedUrl) ?? "", k = e.sourceFile ?? (t == null ? void 0 : t.sourceFile) ?? null, A = e.translatedFile ?? (t == null ? void 0 : t.translatedFile) ?? null, E = e.onMetrics ?? (t == null ? void 0 : t.onMetrics), O = e.onNumPagesChange ?? (t == null ? void 0 : t.onNumPagesChange), _ = e.activeRegion ?? (t == null ? void 0 : t.activeRegion), T = e.regions ?? (t == null ? void 0 : t.regions) ?? [], R = e.readerMetadata ?? (t == null ? void 0 : t.readerMetadata), I = e.onSelectRegion ?? (t == null ? void 0 : t.onSelectRegion), M = Ri({
    mode: s,
    compareMode: l,
    showSource: c,
    showTranslated: i,
    markdownSplit: n,
    overlayOnSource: d
  }), D = _i(
    w,
    n || r,
    typeof document > "u" ? w * 2 : document.documentElement.clientWidth
  );
  return /* @__PURE__ */ h(
    "div",
    {
      ref: u,
      className: Ua,
      "data-reader-region-count": T.length,
      "data-reader-structured-region-count": T.filter(kr).length,
      "data-reader-metadata-ready": R ? "true" : "false",
      children: /* @__PURE__ */ z(
        "main",
        {
          className: `${ja} reader-mode-${M.mode}`,
          "data-reader-mode": n ? "markdown-split" : r ? "assistant-split" : s,
          children: [
            y ? /* @__PURE__ */ h(
              Qn,
              {
                pane: "source",
                url: S,
                preloadedFile: k,
                userZoom: m,
                visible: M.showSource,
                scrollRoot: f,
                pageWidthOverride: D,
                rowHeights: M.compareMode ? g : void 0,
                onMetrics: E,
                emptyLabel: P ? p("k_fe7fe549") : p("k_25489672"),
                onNumPagesChange: O,
                activeRegion: _,
                regions: T,
                readerMetadata: R,
                onSelectRegion: I,
                liveTranslation: d ? a : void 0,
                showLiveTranslation: d,
                liveTranslationPendingLabel: d ? Ti(a) : "",
                paneAction: d ? /* @__PURE__ */ z(At, { children: [
                  e.sourcePaneAction,
                  /* @__PURE__ */ h(
                    "span",
                    {
                      className: "reader-source-overlay-badge",
                      "data-source-overlay-badge": "true",
                      title: p("k_481ec305"),
                      children: p("k_3c0697b7")
                    }
                  )
                ] }) : e.sourcePaneAction
              }
            ) : null,
            v ? /* @__PURE__ */ h(
              Qn,
              {
                pane: "translated",
                url: b,
                preloadedFile: A,
                userZoom: m,
                visible: M.showTranslated,
                scrollRoot: f,
                pageWidthOverride: D,
                rowHeights: M.compareMode ? g : void 0,
                onMetrics: E,
                emptyLabel: p("k_23959526"),
                onNumPagesChange: O,
                activeRegion: _,
                regions: T,
                readerMetadata: R,
                onSelectRegion: I,
                liveTranslation: void 0,
                showLiveTranslation: !1
              }
            ) : null
          ]
        }
      )
    }
  );
}
const Mi = [
  { id: "source", label: p("k_be43b936"), Icon: Rr },
  { id: "compare", label: p("k_d36792e9"), Icon: _r },
  { id: "translated", label: p("k_83ca9fe3"), Icon: Tr }
];
function Ai(e) {
  return e.connection === "live" ? p("k_4d5106b4", [e.pagesByPage.size]) : e.connection === "reconnecting" ? p("k_612314c3") : e.connection === "unavailable" ? p("k_ef363ec6") : e.connection === "terminal" ? e.jobStatus === "failed" ? p("k_05b7117c") : e.jobStatus === "cancelled" || e.jobStatus === "canceled" ? p("k_80a389c5") : e.jobStatus === "succeeded" ? p("k_9f9b048b") : p("k_7584faa0") : e.error || p("k_c24c8401");
}
function Ni(e) {
  return e.id === "translated" ? e.sourceViewOnly : e.id === "compare" ? !e.documentReady || e.sourceViewOnly && !e.liveTranslationAvailable : !1;
}
function xi(e) {
  const t = gt(), {
    mode: n,
    documentReady: r,
    onModeChange: a,
    liveTranslation: o = null
  } = e, s = e.sourceViewOnly ?? (t == null ? void 0 : t.sourceViewOnly) ?? !1, l = o ? Ai(o.state) : "";
  return /* @__PURE__ */ z("header", { className: "reader-workspace-bar", children: [
    o ? /* @__PURE__ */ z(
      "button",
      {
        type: "button",
        className: `reader-live-translation-toggle is-${o.state.connection}${o.visible ? " is-active" : ""}`,
        "aria-pressed": o.visible,
        "aria-label": o.visible ? p("k_5a95b341") : p("k_148c107b"),
        title: o.state.error || l,
        onClick: o.onToggle,
        children: [
          /* @__PURE__ */ h(Do, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ h("span", { className: "reader-live-translation-toggle-label", children: l })
        ]
      }
    ) : null,
    /* @__PURE__ */ h("div", { className: "reader-workspace-tabs", role: "tablist", "aria-label": p("k_33e8f7e9"), children: Mi.map(({ id: c, label: i, Icon: d }) => {
      const u = n === c, f = Ni({
        id: c,
        documentReady: r,
        sourceViewOnly: s,
        liveTranslationAvailable: !!o
      });
      return /* @__PURE__ */ z(
        "button",
        {
          type: "button",
          className: `reader-workspace-tab${u ? " is-active" : ""}`,
          role: "tab",
          "aria-selected": u,
          "aria-label": i,
          title: f ? p("k_0fb4778a", [i]) : i,
          disabled: f,
          onClick: () => a(c),
          children: [
            /* @__PURE__ */ h(d, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { className: "reader-workspace-tab-label", children: i })
          ]
        },
        c
      );
    }) })
  ] });
}
const er = [
  { id: "markdown", label: "Markdown", Icon: Er },
  { id: "ai", label: p("k_4e0478a9"), Icon: fn }
];
function Ci(e) {
  const t = gt(), { active: n } = e, r = e.onSelect ?? (t == null ? void 0 : t.assistant.select) ?? (() => {
  }), a = e.onClose ?? (t == null ? void 0 : t.assistant.close) ?? (() => {
  });
  return n ? /* @__PURE__ */ z("header", { className: "reader-assistant-dock-header", children: [
    /* @__PURE__ */ h("div", { className: "reader-assistant-dock-tabs", role: "tablist", "aria-label": p("k_a09ce546"), children: er.map(({ id: o, label: s, Icon: l }) => {
      const c = n === o;
      return /* @__PURE__ */ z(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": c,
          className: `reader-assistant-dock-tab${c ? " is-active" : ""}`,
          onClick: () => r(o),
          children: [
            /* @__PURE__ */ h(l, { size: 15, strokeWidth: 2.15, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: s })
          ]
        },
        o
      );
    }) }),
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-assistant-dock-close",
        "aria-label": p("k_e2aadb52"),
        title: p("k_c5a60540"),
        onClick: a,
        children: /* @__PURE__ */ h(Qe, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    )
  ] }) : /* @__PURE__ */ h("nav", { className: "reader-assistant-rail", "aria-label": p("k_bf045130"), children: er.map(({ id: o, label: s, Icon: l }) => /* @__PURE__ */ z(
    "button",
    {
      type: "button",
      className: "reader-assistant-rail-button",
      "aria-label": p("k_53c78d69", [s]),
      title: s,
      onClick: () => r(o),
      children: [
        /* @__PURE__ */ h(l, { size: 18, strokeWidth: 2, "aria-hidden": !0 }),
        /* @__PURE__ */ h("span", { children: s === "AI 问答" ? "AI" : "MD" })
      ]
    },
    o
  )) });
}
function Li(e, t) {
  const n = getComputedStyle(e), r = parseFloat(n.fontSize);
  return t * r;
}
function zi(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), r = parseFloat(n.fontSize);
  return t * r;
}
function Di(e) {
  return e / 100 * window.innerHeight;
}
function Oi(e) {
  return e / 100 * window.innerWidth;
}
function Fi(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function ot({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let r;
  const [a, o] = Fi(n);
  switch (o) {
    case "%": {
      r = a / 100 * e;
      break;
    }
    case "px": {
      r = a;
      break;
    }
    case "rem": {
      r = zi(t, a);
      break;
    }
    case "em": {
      r = Li(t, a);
      break;
    }
    case "vh": {
      r = Di(a);
      break;
    }
    case "vw": {
      r = Oi(a);
      break;
    }
  }
  return r;
}
function me(e) {
  return parseFloat(e.toFixed(3));
}
function Xe({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((r, a) => (r += t === "horizontal" ? a.element.offsetWidth : a.element.offsetHeight, r), 0);
}
function tn(e) {
  const { panels: t } = e, n = Xe({ group: e });
  return n === 0 ? t.map((r) => ({
    groupResizeBehavior: r.panelConstraints.groupResizeBehavior,
    collapsedSize: 0,
    collapsible: r.panelConstraints.collapsible === !0,
    defaultSize: void 0,
    disabled: r.panelConstraints.disabled,
    minSize: 0,
    maxSize: 100,
    panelId: r.id
  })) : t.map((r) => {
    const { element: a, panelConstraints: o } = r;
    let s = 0;
    if (o.collapsedSize !== void 0) {
      const d = ot({
        groupSize: n,
        panelElement: a,
        styleProp: o.collapsedSize
      });
      s = me(d / n * 100);
    }
    let l;
    if (o.defaultSize !== void 0) {
      const d = ot({
        groupSize: n,
        panelElement: a,
        styleProp: o.defaultSize
      });
      l = me(d / n * 100);
    }
    let c = 0;
    if (o.minSize !== void 0) {
      const d = ot({
        groupSize: n,
        panelElement: a,
        styleProp: o.minSize
      });
      c = me(d / n * 100);
    }
    let i = 100;
    if (o.maxSize !== void 0) {
      const d = ot({
        groupSize: n,
        panelElement: a,
        styleProp: o.maxSize
      });
      i = me(d / n * 100);
    }
    return {
      groupResizeBehavior: o.groupResizeBehavior,
      collapsedSize: s,
      collapsible: o.collapsible === !0,
      defaultSize: l,
      disabled: o.disabled,
      minSize: c,
      maxSize: i,
      panelId: r.id
    };
  });
}
function Y(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function nn(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? $i : ji
  );
}
function $i(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function ji(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Jr(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function qr(e, t) {
  return {
    x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(
      Math.abs(e.x - t.left),
      Math.abs(e.x - t.right)
    ),
    y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(
      Math.abs(e.y - t.top),
      Math.abs(e.y - t.bottom)
    )
  };
}
function Ui({
  orientation: e,
  rects: t,
  targetRect: n
}) {
  const r = {
    x: n.x + n.width / 2,
    y: n.y + n.height / 2
  };
  let a, o = Number.MAX_VALUE;
  for (const s of t) {
    const { x: l, y: c } = qr(r, s), i = e === "horizontal" ? l : c;
    i < o && (o = i, a = s);
  }
  return Y(a, "No rect found"), a;
}
let kt;
function Bi() {
  return kt === void 0 && (typeof matchMedia == "function" ? kt = !!matchMedia("(pointer:coarse)").matches : kt = !1), kt;
}
function Vr(e) {
  const { element: t, orientation: n, panels: r, separators: a } = e, o = nn(
    n,
    Array.from(t.children).filter(Jr).map((w) => ({ element: w }))
  ).map(({ element: w }) => w), s = [];
  let l = !1, c = !1, i = -1, d = -1, u = 0, f, m = [];
  {
    let w = -1;
    for (const g of o)
      g.hasAttribute("data-panel") && (w++, g.hasAttribute("data-disabled") || (u++, i === -1 && (i = w), d = w));
  }
  if (u > 1) {
    let w = -1;
    for (const g of o)
      if (g.hasAttribute("data-panel")) {
        w++;
        const y = r.find(
          (v) => v.element === g
        );
        if (y) {
          if (f) {
            const v = f.element.getBoundingClientRect(), P = g.getBoundingClientRect();
            let S;
            if (c) {
              const b = n === "horizontal" ? new DOMRect(
                v.right,
                v.top,
                0,
                v.height
              ) : new DOMRect(
                v.left,
                v.bottom,
                v.width,
                0
              ), k = n === "horizontal" ? new DOMRect(P.left, P.top, 0, P.height) : new DOMRect(P.left, P.top, P.width, 0);
              switch (m.length) {
                case 0: {
                  S = [
                    b,
                    k
                  ];
                  break;
                }
                case 1: {
                  const A = m[0], E = Ui({
                    orientation: n,
                    rects: [v, P],
                    targetRect: A.element.getBoundingClientRect()
                  });
                  S = [
                    A,
                    E === v ? k : b
                  ];
                  break;
                }
                default: {
                  S = m;
                  break;
                }
              }
            } else
              m.length ? S = m : S = [
                n === "horizontal" ? new DOMRect(
                  v.right,
                  P.top,
                  P.left - v.right,
                  P.height
                ) : new DOMRect(
                  P.left,
                  v.bottom,
                  P.width,
                  P.top - v.bottom
                )
              ];
            for (const b of S) {
              let k = "width" in b ? b : b.element.getBoundingClientRect();
              const A = Bi() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (k.width < A) {
                const O = A - k.width;
                k = new DOMRect(
                  k.x - O / 2,
                  k.y,
                  k.width + O,
                  k.height
                );
              }
              if (k.height < A) {
                const O = A - k.height;
                k = new DOMRect(
                  k.x,
                  k.y - O / 2,
                  k.width,
                  k.height + O
                );
              }
              const E = w <= i || w > d;
              !l && !E && s.push({
                group: e,
                groupSize: Xe({ group: e }),
                panels: [f, y],
                separator: "width" in b ? void 0 : b,
                rect: k
              }), l = !1;
            }
          }
          c = !1, f = y, m = [];
        }
      } else if (g.hasAttribute("data-separator")) {
        g.ariaDisabled !== null && (l = !0);
        const y = a.find(
          (v) => v.element === g
        );
        y ? m.push(y) : (f = void 0, m = []);
      } else
        c = !0;
  }
  return s;
}
var xe;
class Kr {
  constructor() {
    zn(this, xe, {});
  }
  addListener(t, n) {
    const r = et(this, xe)[t];
    return r === void 0 ? et(this, xe)[t] = [n] : r.includes(n) || r.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const r = et(this, xe)[t];
    if (r !== void 0)
      if (r.length === 1)
        r[0].call(null, n);
      else {
        let a = !1, o = null;
        const s = Array.from(r);
        for (let l = 0; l < s.length; l++) {
          const c = s[l];
          try {
            c.call(null, n);
          } catch (i) {
            o === null && (a = !0, o = i);
          }
        }
        if (a)
          throw o;
      }
  }
  removeAllListeners() {
    Dn(this, xe, {});
  }
  removeListener(t, n) {
    const r = et(this, xe)[t];
    if (r !== void 0) {
      const a = r.indexOf(n);
      a >= 0 && r.splice(a, 1);
    }
  }
}
xe = new WeakMap();
let Ke = {
  cursorFlags: 0,
  state: "inactive"
};
const wn = new Kr();
function De() {
  return Ke;
}
function Hi(e) {
  return wn.addListener("change", e);
}
function Wi(e) {
  const t = Ke, n = { ...Ke };
  n.cursorFlags = e, Ke = n, wn.emit("change", {
    prev: t,
    next: n
  });
}
function Ge(e) {
  const t = Ke;
  Ke = e, wn.emit("change", {
    prev: t,
    next: e
  });
}
const Ji = (e) => e, Ht = () => {
}, Gr = 1, Yr = 2, Zr = 4, Xr = 8, tr = 3, nr = 12;
let Pt;
function rr() {
  return Pt === void 0 && (Pt = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (Pt = !0)), Pt;
}
function qi({
  cursorFlags: e,
  groups: t,
  state: n
}) {
  let r = 0, a = 0;
  switch (n) {
    case "active":
    case "hover":
      t.forEach((o) => {
        if (!o.mutableState.disableCursor)
          switch (o.orientation) {
            case "horizontal": {
              r++;
              break;
            }
            case "vertical": {
              a++;
              break;
            }
          }
      });
  }
  if (!(r === 0 && a === 0)) {
    switch (n) {
      case "active": {
        if (e && rr()) {
          const o = (e & Gr) !== 0, s = (e & Yr) !== 0, l = (e & Zr) !== 0, c = (e & Xr) !== 0;
          if (o)
            return l ? "se-resize" : c ? "ne-resize" : "e-resize";
          if (s)
            return l ? "sw-resize" : c ? "nw-resize" : "w-resize";
          if (l)
            return "s-resize";
          if (c)
            return "n-resize";
        }
        break;
      }
    }
    return rr() ? r > 0 && a > 0 ? "move" : r > 0 ? "ew-resize" : "ns-resize" : r > 0 && a > 0 ? "grab" : r > 0 ? "col-resize" : "row-resize";
  }
}
const or = /* @__PURE__ */ new WeakMap();
function Sn(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = or.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const r = De();
  switch (r.state) {
    case "active":
    case "hover": {
      const a = qi({
        cursorFlags: r.cursorFlags,
        groups: r.hitRegions.map((s) => s.group),
        state: r.state
      }), o = `*, *:hover {cursor: ${a} !important; }`;
      if (t === o)
        return;
      t = o, a ? n.cssRules.length === 0 ? n.insertRule(o) : n.replaceSync(o) : n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
    case "inactive": {
      t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
  }
  or.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let ke = /* @__PURE__ */ new Map();
const Qr = new Kr();
function Vi(e) {
  ke = new Map(ke), ke.delete(e);
}
function ar(e, t) {
  for (const [n] of ke)
    if (n.id === e)
      return n;
}
function Ce(e, t) {
  for (const [n, r] of ke)
    if (n.id === e)
      return r;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function je() {
  return ke;
}
function kn(e, t) {
  return Qr.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function Ee(e, t, n) {
  const r = ke.get(e);
  ke = new Map(ke), ke.set(e, t), Qr.emit("groupChange", {
    group: e,
    isUserInteraction: (n == null ? void 0 : n.isUserInteraction) === !0,
    prev: r,
    next: t
  });
}
function eo(e) {
  const t = De();
  let n = !1;
  switch (t.state) {
    case "active":
      Ge({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (Sn(e), n = !0, t.hitRegions.forEach((r) => {
        const a = Ce(r.group.id, !0);
        Ee(r.group, a, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function sr(e) {
  e.defaultPrevented || eo(e.currentTarget);
}
function Ki(e, t, n) {
  let r, a = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const o of t) {
    const s = qr(n, o.rect);
    switch (e) {
      case "horizontal": {
        s.x <= a.x && (r = o, a = s);
        break;
      }
      case "vertical": {
        s.y <= a.y && (r = o, a = s);
        break;
      }
    }
  }
  return r ? {
    distance: a,
    hitRegion: r
  } : void 0;
}
function Gi(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function Yi(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: lr(e),
    b: lr(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    r = n.a.pop(), n.b.pop();
  Y(
    r,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const a = {
    a: cr(ir(n.a)),
    b: cr(ir(n.b))
  };
  if (a.a === a.b) {
    const o = r.childNodes, s = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let l = o.length;
    for (; l--; ) {
      const c = o[l];
      if (c === s.a) return 1;
      if (c === s.b) return -1;
    }
  }
  return Math.sign(a.a - a.b);
}
const Zi = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Xi(e) {
  const t = getComputedStyle(to(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function Qi(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Xi(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Zi.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function ir(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (Y(n, "Missing node"), Qi(n)) return n;
  }
  return null;
}
function cr(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function lr(e) {
  const t = [];
  for (; e; )
    t.push(e), e = to(e);
  return t;
}
function to(e) {
  const { parentNode: t } = e;
  return Gi(t) ? t.host : t;
}
function ec(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function tc({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Jr(n) || n.contains(e) || e.contains(n))
    return !0;
  if (Yi(n, e) > 0) {
    let r = n;
    for (; r; ) {
      if (r.contains(e))
        return !0;
      if (ec(r.getBoundingClientRect(), t))
        return !1;
      r = r.parentElement;
    }
  }
  return !0;
}
function Pn(e, t) {
  const n = [];
  return t.forEach((r, a) => {
    if (a.disabled)
      return;
    const o = Vr(a), s = Ki(a.orientation, o, {
      x: e.clientX,
      y: e.clientY
    });
    s && s.distance.x <= 0 && s.distance.y <= 0 && tc({
      groupElement: a.element,
      hitRegion: s.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(s.hitRegion);
  }), n;
}
function nc(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function fe(e, t, n = 0) {
  return Math.abs(me(e) - me(t)) <= n;
}
function Se(e, t) {
  return fe(e, t) ? 0 : e > t ? 1 : -1;
}
function qe({
  overrideDisabledPanels: e,
  panelConstraints: t,
  prevSize: n,
  size: r
}) {
  const {
    collapsedSize: a = 0,
    collapsible: o,
    disabled: s,
    maxSize: l = 100,
    minSize: c = 0
  } = t;
  if (s && !e)
    return n;
  if (Se(r, c) < 0)
    if (o) {
      const i = (a + c) / 2;
      Se(r, i) < 0 ? r = a : r = c;
    } else
      r = c;
  return r = Math.min(l, r), r = me(r), r;
}
function ft({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: r,
  prevLayout: a,
  trigger: o
}) {
  if (fe(e, 0))
    return t;
  const s = o === "imperative-api", l = Object.values(t), c = Object.values(a), i = [...l], [d, u] = r;
  Y(d != null, "Invalid first pivot index"), Y(u != null, "Invalid second pivot index");
  let f = 0;
  switch (o) {
    case "keyboard": {
      {
        const g = e < 0 ? u : d, y = n[g];
        Y(
          y,
          `Panel constraints not found for index ${g}`
        );
        const {
          collapsedSize: v = 0,
          collapsible: P,
          minSize: S = 0
        } = y;
        if (P) {
          const b = l[g];
          if (Y(
            b != null,
            `Previous layout not found for panel index ${g}`
          ), fe(b, v)) {
            const k = S - b;
            Se(k, Math.abs(e)) > 0 && (e = e < 0 ? 0 - k : k);
          }
        }
      }
      {
        const g = e < 0 ? d : u, y = n[g];
        Y(
          y,
          `No panel constraints found for index ${g}`
        );
        const {
          collapsedSize: v = 0,
          collapsible: P,
          minSize: S = 0
        } = y;
        if (P) {
          const b = l[g];
          if (Y(
            b != null,
            `Previous layout not found for panel index ${g}`
          ), fe(b, S)) {
            const k = b - v;
            Se(k, Math.abs(e)) > 0 && (e = e < 0 ? 0 - k : k);
          }
        }
      }
      break;
    }
    default: {
      const g = e < 0 ? u : d, y = n[g];
      Y(
        y,
        `Panel constraints not found for index ${g}`
      );
      const v = l[g], { collapsible: P, collapsedSize: S, minSize: b } = y;
      if (P && Se(v, b) < 0)
        if (e > 0) {
          const k = b - S, A = k / 2, E = v + e;
          Se(E, b) < 0 && (e = Se(e, A) <= 0 ? 0 : k);
        } else {
          const k = b - S, A = 100 - k / 2, E = v - e;
          Se(E, b) < 0 && (e = Se(100 + e, A) > 0 ? 0 : -k);
        }
      break;
    }
  }
  {
    const g = e < 0 ? 1 : -1;
    let y = e < 0 ? u : d, v = 0;
    for (; ; ) {
      const S = l[y];
      Y(
        S != null,
        `Previous layout not found for panel index ${y}`
      );
      const b = qe({
        overrideDisabledPanels: s,
        panelConstraints: n[y],
        prevSize: S,
        size: 100
      }) - S;
      if (v += b, y += g, y < 0 || y >= n.length)
        break;
    }
    const P = Math.min(Math.abs(e), Math.abs(v));
    e = e < 0 ? 0 - P : P;
  }
  {
    let g = e < 0 ? d : u;
    for (; g >= 0 && g < n.length; ) {
      const y = Math.abs(e) - Math.abs(f), v = l[g];
      Y(
        v != null,
        `Previous layout not found for panel index ${g}`
      );
      const P = v - y, S = qe({
        overrideDisabledPanels: s,
        panelConstraints: n[g],
        prevSize: v,
        size: P
      });
      if (!fe(v, S) && (f += v - S, i[g] = S, f.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? g-- : g++;
    }
  }
  if (nc(c, i))
    return a;
  {
    const g = e < 0 ? u : d, y = l[g];
    Y(
      y != null,
      `Previous layout not found for panel index ${g}`
    );
    const v = y + f, P = qe({
      overrideDisabledPanels: s,
      panelConstraints: n[g],
      prevSize: y,
      size: v
    });
    if (i[g] = P, !fe(P, v)) {
      let S = v - P, b = e < 0 ? u : d;
      for (; b >= 0 && b < n.length; ) {
        const k = i[b];
        Y(
          k != null,
          `Previous layout not found for panel index ${b}`
        );
        const A = k + S, E = qe({
          overrideDisabledPanels: s,
          panelConstraints: n[b],
          prevSize: k,
          size: A
        });
        if (fe(k, E) || (S -= E - k, i[b] = E), fe(S, 0))
          break;
        e > 0 ? b-- : b++;
      }
    }
  }
  const m = Object.values(i).reduce(
    (g, y) => y + g,
    0
  );
  if (!fe(m, 100, 0.1))
    return a;
  const w = Object.keys(a);
  return i.reduce((g, y, v) => (g[w[v]] = y, g), {});
}
function Oe(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || Se(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function Fe({
  layout: e,
  panelConstraints: t
}) {
  const n = Object.values(e), r = [...n], a = r.reduce(
    (l, c) => l + c,
    0
  );
  if (r.length !== t.length)
    throw Error(
      `Invalid ${t.length} panel layout: ${r.map((l) => `${l}%`).join(", ")}`
    );
  if (!fe(a, 100) && r.length > 0)
    for (let l = 0; l < t.length; l++) {
      const c = r[l];
      Y(c != null, `No layout data found for index ${l}`);
      const i = 100 / a * c;
      r[l] = i;
    }
  let o = 0;
  for (let l = 0; l < t.length; l++) {
    const c = n[l];
    Y(c != null, `No layout data found for index ${l}`);
    const i = r[l];
    Y(i != null, `No layout data found for index ${l}`);
    const d = qe({
      overrideDisabledPanels: !0,
      panelConstraints: t[l],
      prevSize: c,
      size: i
    });
    i != d && (o += i - d, r[l] = d);
  }
  if (!fe(o, 0))
    for (let l = 0; l < t.length; l++) {
      const c = r[l];
      Y(c != null, `No layout data found for index ${l}`);
      const i = c + o, d = qe({
        overrideDisabledPanels: !0,
        panelConstraints: t[l],
        prevSize: c,
        size: i
      });
      if (c !== d && (o -= d - c, r[l] = d, fe(o, 0)))
        break;
    }
  const s = Object.keys(e);
  return r.reduce((l, c, i) => (l[s[i]] = c, l), {});
}
function no({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const c = je();
    for (const [
      i,
      {
        defaultLayoutDeferred: d,
        derivedPanelConstraints: u,
        layout: f,
        groupSize: m,
        separatorToPanels: w
      }
    ] of c)
      if (i.id === e)
        return {
          defaultLayoutDeferred: d,
          derivedPanelConstraints: u,
          group: i,
          groupSize: m,
          layout: f,
          separatorToPanels: w
        };
    throw Error(`Group ${e} not found`);
  }, r = () => {
    const c = n().derivedPanelConstraints.find(
      (i) => i.panelId === t
    );
    if (c !== void 0)
      return c;
    throw Error(`Panel constraints not found for Panel ${t}`);
  }, a = () => {
    const c = n().group.panels.find((i) => i.id === t);
    if (c !== void 0)
      return c;
    throw Error(`Layout not found for Panel ${t}`);
  }, o = () => {
    const c = n().layout[t];
    if (c !== void 0)
      return c;
    throw Error(`Layout not found for Panel ${t}`);
  }, s = ({
    nextSize: c,
    panels: i,
    prevLayout: d,
    derivedPanelConstraints: u
  }) => {
    const f = o(), m = i.findIndex((y) => y.id === t), w = m === 0, g = m === i.length - 1;
    if (g && c < f && (w || i.slice(0, m).every((y, v) => {
      const P = u[v];
      return (P == null ? void 0 : P.collapsible) && fe(P.collapsedSize, d[P.panelId]);
    }))) {
      const y = i.slice(0, m).reduce((v, P) => v + d[P.id], 0);
      return {
        ...d,
        [t]: me(100 - y)
      };
    }
    return ft({
      delta: g ? f - c : c - f,
      initialLayout: d,
      panelConstraints: u,
      pivotIndices: g ? [m - 1, m] : [m, m + 1],
      prevLayout: d,
      trigger: "imperative-api"
    });
  }, l = (c) => {
    const i = o();
    if (c === i)
      return;
    const {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      group: f,
      groupSize: m,
      layout: w,
      separatorToPanels: g
    } = n(), y = s({
      nextSize: c,
      panels: f.panels,
      prevLayout: w,
      derivedPanelConstraints: u
    }), v = Fe({
      layout: y,
      panelConstraints: u
    });
    Oe(w, v) || Ee(f, {
      defaultLayoutDeferred: d,
      derivedPanelConstraints: u,
      groupSize: m,
      layout: v,
      separatorToPanels: g
    });
  };
  return {
    collapse: () => {
      const { collapsible: c, collapsedSize: i } = r(), { mutableValues: d } = a(), u = o();
      c && u !== i && (d.expandToSize = u, l(i));
    },
    expand: () => {
      const { collapsible: c, collapsedSize: i, minSize: d } = r(), { mutableValues: u } = a(), f = o();
      if (c && f === i) {
        let m = u.expandToSize ?? d;
        m === 0 && (m = 1), l(m);
      }
    },
    getSize: () => {
      const { group: c } = n(), i = o(), { element: d } = a(), u = c.orientation === "horizontal" ? d.offsetWidth : d.offsetHeight;
      return {
        asPercentage: i,
        inPixels: u
      };
    },
    isCollapsed: () => {
      const { collapsible: c, collapsedSize: i } = r(), d = o();
      return c && fe(i, d);
    },
    resize: (c) => {
      const { group: i } = n(), { element: d } = a(), u = Xe({ group: i }), f = ot({
        groupSize: u,
        panelElement: d,
        styleProp: c
      }), m = me(f / u * 100);
      l(m);
    }
  };
}
function dr(e) {
  if (e.defaultPrevented)
    return;
  const t = je();
  Pn(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const r = n.panels.find(
        (a) => a.panelConstraints.defaultSize !== void 0
      );
      if (r) {
        const a = r.panelConstraints.defaultSize, o = no({
          groupId: n.group.id,
          panelId: r.id
        });
        o && a !== void 0 && (o.resize(a), e.preventDefault());
      }
    }
  });
}
function It(e) {
  const t = je();
  for (const [n] of t)
    if (n.separators.some(
      (r) => r.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function ro({
  groupId: e
}) {
  const t = () => {
    const n = je();
    for (const [r, a] of n)
      if (r.id === e)
        return { group: r, ...a };
    throw Error(`Could not find Group with id "${e}"`);
  };
  return {
    getLayout() {
      const { defaultLayoutDeferred: n, layout: r } = t();
      return n ? {} : r;
    },
    setLayout(n) {
      const {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: a,
        group: o,
        groupSize: s,
        layout: l,
        separatorToPanels: c
      } = t(), i = Fe({
        layout: n,
        panelConstraints: a
      });
      return r ? l : (Oe(l, i) || Ee(o, {
        defaultLayoutDeferred: r,
        derivedPanelConstraints: a,
        groupSize: s,
        layout: i,
        separatorToPanels: c
      }), i);
    }
  };
}
function ze(e, t) {
  const n = It(e), r = Ce(n.id, !0), a = n.separators.find(
    (d) => d.element === e
  );
  Y(a, "Matching separator not found");
  const o = r.separatorToPanels.get(a);
  Y(o, "Matching panels not found");
  const s = o.map((d) => n.panels.indexOf(d)), l = ro({ groupId: n.id }).getLayout(), c = ft({
    delta: t,
    initialLayout: l,
    panelConstraints: r.derivedPanelConstraints,
    pivotIndices: s,
    prevLayout: l,
    trigger: "keyboard"
  }), i = Fe({
    layout: c,
    panelConstraints: r.derivedPanelConstraints
  });
  Oe(l, i) || Ee(
    n,
    {
      defaultLayoutDeferred: r.defaultLayoutDeferred,
      derivedPanelConstraints: r.derivedPanelConstraints,
      groupSize: r.groupSize,
      layout: i,
      separatorToPanels: r.separatorToPanels
    },
    // Keyboard resizes (arrow keys, Home/End, Enter collapse/expand) originate
    // from a real DOM event on the separator, so they are user interactions
    // just like pointer drags. This function is only reached from
    // onDocumentKeyDown. See #716.
    { isUserInteraction: !0 }
  );
}
function ur(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = It(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && ze(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && ze(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && ze(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && ze(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), ze(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const r = It(t), a = Ce(r.id, !0), { derivedPanelConstraints: o, layout: s, separatorToPanels: l } = a, c = r.separators.find(
          (f) => f.element === t
        );
        Y(c, "Matching separator not found");
        const i = l.get(c);
        Y(i, "Matching panels not found");
        const d = i[0], u = o.find(
          (f) => f.panelId === d.id
        );
        if (Y(u, "Panel metadata not found"), u.collapsible) {
          const f = s[d.id], m = u.collapsedSize === f ? r.mutableState.expandedPanelSizes[d.id] ?? u.minSize : u.collapsedSize;
          ze(t, m - f);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const r = It(t).separators.map(
          (s) => s.element
        ), a = Array.from(r).findIndex(
          (s) => s === e.currentTarget
        );
        Y(a !== null, "Index not found");
        const o = e.shiftKey ? a > 0 ? a - 1 : r.length - 1 : a + 1 < r.length ? a + 1 : 0;
        r[o].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), ze(t, -100);
        break;
      }
    }
}
function fr(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = je(), n = Pn(e, t), r = /* @__PURE__ */ new Map();
  let a = !1;
  n.forEach((o) => {
    o.separator && (a || (a = !0, o.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const s = t.get(o.group);
    s && r.set(o.group, s.layout);
  }), Ge({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: r,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function oo({
  document: e,
  event: t,
  hitRegions: n,
  initialLayoutMap: r,
  mountedGroups: a,
  pointerDownAtPoint: o,
  prevCursorFlags: s
}) {
  let l = 0;
  n.forEach((i) => {
    const { group: d, groupSize: u } = i, { orientation: f, panels: m } = d, { disableCursor: w } = d.mutableState;
    let g = 0;
    o ? f === "horizontal" ? g = (t.clientX - o.x) / u * 100 : g = (t.clientY - o.y) / u * 100 : f === "horizontal" ? g = t.clientX < 0 ? -100 : 100 : g = t.clientY < 0 ? -100 : 100;
    const y = r.get(d), v = a.get(d);
    if (!y || !v)
      return;
    const {
      defaultLayoutDeferred: P,
      derivedPanelConstraints: S,
      groupSize: b,
      layout: k,
      separatorToPanels: A
    } = v;
    if (S && k && A) {
      const E = ft({
        delta: g,
        initialLayout: y,
        panelConstraints: S,
        pivotIndices: i.panels.map((O) => m.indexOf(O)),
        prevLayout: k,
        trigger: "mouse-or-touch"
      });
      if (Oe(E, k)) {
        if (g !== 0 && !w)
          switch (f) {
            case "horizontal": {
              l |= g < 0 ? Gr : Yr;
              break;
            }
            case "vertical": {
              l |= g < 0 ? Zr : Xr;
              break;
            }
          }
      } else
        Ee(i.group, {
          defaultLayoutDeferred: P,
          derivedPanelConstraints: S,
          groupSize: b,
          layout: E,
          separatorToPanels: A
        });
    }
  });
  let c = 0;
  t.movementX === 0 ? c |= s & tr : c |= l & tr, t.movementY === 0 ? c |= s & nr : c |= l & nr, Wi(c), Sn(e);
}
function mr(e) {
  const t = je(), n = De();
  switch (n.state) {
    case "active":
      oo({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function pr(e) {
  var r, a;
  if (e.defaultPrevented)
    return;
  const t = De(), n = je();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        Ge({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((o) => {
          const s = Ce(o.group.id, !0);
          Ee(o.group, s, {
            isUserInteraction: !0
          });
        });
        return;
      }
      for (const o of t.hitRegions)
        if (o.separator) {
          const { element: s } = o.separator;
          (r = s.hasPointerCapture) != null && r.call(s, e.pointerId) || ((a = s.setPointerCapture) == null || a.call(s, e.pointerId));
        }
      oo({
        document: e.currentTarget,
        event: e,
        hitRegions: t.hitRegions,
        initialLayoutMap: t.initialLayoutMap,
        mountedGroups: n,
        pointerDownAtPoint: t.pointerDownAtPoint,
        prevCursorFlags: t.cursorFlags
      });
      break;
    }
    default: {
      const o = Pn(e, n);
      o.length === 0 ? t.state !== "inactive" && Ge({
        cursorFlags: 0,
        state: "inactive"
      }) : Ge({
        cursorFlags: 0,
        hitRegions: o,
        state: "hover"
      }), Sn(e.currentTarget);
      break;
    }
  }
}
function hr(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (De().state) {
      case "hover":
        Ge({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function gr(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || eo(e.currentTarget) && e.preventDefault();
}
function br(e) {
  let t = 0, n = 0;
  const r = {};
  for (const o of e)
    if (o.defaultSize !== void 0) {
      t++;
      const s = me(o.defaultSize);
      n += s, r[o.panelId] = s;
    } else
      r[o.panelId] = void 0;
  const a = e.length - t;
  if (a !== 0) {
    const o = me((100 - n) / a);
    for (const s of e)
      s.defaultSize === void 0 && (r[s.panelId] = o);
  }
  return r;
}
function rc(e, t, n) {
  if (!n[0])
    return;
  const r = e.panels.find((c) => c.element === t);
  if (!r || !r.onResize)
    return;
  const a = Xe({ group: e }), o = e.orientation === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, s = r.mutableValues.prevSize, l = {
    asPercentage: me(o / a * 100),
    inPixels: o
  };
  r.mutableValues.prevSize = l, r.onResize(l, r.id, s);
}
function oc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function ac({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: r
}) {
  if (n <= 0 || t <= 0 || n === t)
    return r;
  let a = 0, o = 0, s = !1;
  const l = /* @__PURE__ */ new Map(), c = [];
  for (const u of e.panels) {
    const f = r[u.id] ?? 0;
    switch (u.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        s = !0;
        const m = f / 100 * n, w = me(
          m / t * 100
        );
        l.set(u.id, w), a += w;
        break;
      }
      case "preserve-relative-size":
      default: {
        c.push(u.id), o += f;
        break;
      }
    }
  }
  if (!s || c.length === 0)
    return r;
  const i = 100 - a, d = { ...r };
  if (l.forEach((u, f) => {
    d[f] = u;
  }), o > 0)
    for (const u of c) {
      const f = r[u] ?? 0;
      d[u] = me(
        f / o * i
      );
    }
  else {
    const u = me(
      i / c.length
    );
    for (const f of c)
      d[f] = u;
  }
  return d;
}
function sc(e, t) {
  const n = e.map((a) => a.id), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const a of n)
    if (!r.includes(a))
      return !1;
  return !0;
}
const He = /* @__PURE__ */ new Map();
function ic(e) {
  let t = !0;
  Y(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, r = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = new n((w) => {
    for (const g of w) {
      const { borderBoxSize: y, target: v } = g;
      if (v === e.element) {
        if (t) {
          const P = Xe({ group: e });
          if (P === 0)
            return;
          const S = Ce(e.id);
          if (!S)
            return;
          const b = tn(e), k = S.defaultLayoutDeferred ? br(b) : S.layout, A = ac({
            group: e,
            nextGroupSize: P,
            prevGroupSize: S.groupSize,
            prevLayout: k
          }), E = Fe({
            layout: A,
            panelConstraints: b
          });
          if (!S.defaultLayoutDeferred && Oe(S.layout, E) && oc(
            S.derivedPanelConstraints,
            b
          ) && S.groupSize === P)
            return;
          Ee(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: b,
            groupSize: P,
            layout: E,
            separatorToPanels: S.separatorToPanels
          });
        }
      } else
        rc(e, v, y);
    }
  });
  o.observe(e.element), e.panels.forEach((w) => {
    Y(
      !r.has(w.id),
      `Panel ids must be unique; id "${w.id}" was used more than once`
    ), r.add(w.id), w.onResize && o.observe(w.element);
  });
  const s = Xe({ group: e }), l = tn(e), c = e.panels.map(({ id: w }) => w).join(",");
  let i = e.mutableState.defaultLayout;
  i && (sc(e.panels, i) || (i = void 0));
  const d = e.mutableState.layouts[c] ?? i ?? br(l), u = Fe({
    layout: d,
    panelConstraints: l
  }), f = e.element.ownerDocument;
  He.set(
    f,
    (He.get(f) ?? 0) + 1
  );
  const m = /* @__PURE__ */ new Map();
  return Vr(e).forEach((w) => {
    w.separator && m.set(w.separator, w.panels);
  }), Ee(e, {
    defaultLayoutDeferred: s === 0,
    derivedPanelConstraints: l,
    groupSize: s,
    layout: u,
    separatorToPanels: m
  }), e.separators.forEach((w) => {
    Y(
      !a.has(w.id),
      `Separator ids must be unique; id "${w.id}" was used more than once`
    ), a.add(w.id), w.element.addEventListener("keydown", ur);
  }), He.get(f) === 1 && (f.addEventListener("contextmenu", sr, !0), f.addEventListener("dblclick", dr, !0), f.addEventListener("pointerdown", fr, !0), f.addEventListener("pointerleave", mr), f.addEventListener("pointermove", pr), f.addEventListener("pointerout", hr), f.addEventListener("pointerup", gr, !0)), function() {
    t = !1, He.set(
      f,
      Math.max(0, (He.get(f) ?? 0) - 1)
    ), Vi(e), e.separators.forEach((w) => {
      w.element.removeEventListener("keydown", ur);
    }), He.get(f) || (f.removeEventListener(
      "contextmenu",
      sr,
      !0
    ), f.removeEventListener(
      "dblclick",
      dr,
      !0
    ), f.removeEventListener(
      "pointerdown",
      fr,
      !0
    ), f.removeEventListener("pointerleave", mr), f.removeEventListener("pointermove", pr), f.removeEventListener("pointerout", hr), f.removeEventListener("pointerup", gr, !0)), o.disconnect();
  };
}
function cc() {
  const [e, t] = C({}), n = N(() => t({}), []);
  return [e, n];
}
function In(e) {
  const t = dn();
  return `${e ?? t}`;
}
const Ue = typeof window < "u" ? $e : $;
function st(e) {
  const t = x(e);
  return Ue(() => {
    t.current = e;
  }, [e]), N(
    (...n) => {
      var r;
      return (r = t.current) == null ? void 0 : r.call(t, ...n);
    },
    [t]
  );
}
function Rn(...e) {
  return st((t) => {
    e.forEach((n) => {
      if (n)
        switch (typeof n) {
          case "function": {
            n(t);
            break;
          }
          case "object": {
            n.current = t;
            break;
          }
        }
    });
  });
}
function _n(e) {
  const t = x({ ...e });
  return Ue(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const ao = cn(null);
function lc(e, t) {
  const n = x({
    getLayout: () => ({}),
    setLayout: Ji
  });
  sn(t, () => n.current, []), Ue(() => {
    Object.assign(
      n.current,
      ro({ groupId: e })
    );
  });
}
function so({
  children: e,
  className: t,
  defaultLayout: n,
  disableCursor: r,
  disabled: a,
  elementRef: o,
  groupRef: s,
  id: l,
  onLayoutChange: c,
  onLayoutChanged: i,
  orientation: d = "horizontal",
  resizeTargetMinimumSize: u = {
    coarse: 20,
    fine: 10
  },
  style: f,
  ...m
}) {
  const w = x({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), g = st((R) => {
    Oe(w.current.onLayoutChange, R) || (w.current.onLayoutChange = R, c == null || c(R));
  }), y = st(
    (R, I) => {
      Oe(w.current.onLayoutChanged, R) || (w.current.onLayoutChanged = R, i == null || i(R, { isUserInteraction: I }));
    }
  ), v = In(l), P = x(null), [S, b] = cc(), k = x({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: u,
    separators: []
  }), A = Rn(P, o);
  lc(v, s);
  const E = st(
    (R, I) => {
      const M = De(), D = ar(R), L = Ce(R);
      if (L) {
        let j = !1;
        switch (M.state) {
          case "active": {
            j = M.hitRegions.some(
              (H) => H.group === D
            );
            break;
          }
        }
        return {
          flexGrow: L.layout[I] ?? 1,
          pointerEvents: j ? "none" : void 0
        };
      }
      if (n != null && n[I])
        return {
          flexGrow: n == null ? void 0 : n[I]
        };
    }
  ), O = _n({
    defaultLayout: n,
    disableCursor: r
  }), _ = q(
    () => ({
      get disableCursor() {
        return !!O.disableCursor;
      },
      getPanelStyles: E,
      id: v,
      orientation: d,
      registerPanel: (R) => {
        const I = k.current;
        return I.panels = nn(d, [
          ...I.panels,
          R
        ]), b(), () => {
          I.panels = I.panels.filter(
            (M) => M !== R
          ), b();
        };
      },
      registerSeparator: (R) => {
        const I = k.current;
        return I.separators = nn(d, [
          ...I.separators,
          R
        ]), b(), () => {
          I.separators = I.separators.filter(
            (M) => M !== R
          ), b();
        };
      },
      updatePanelProps: (R, { disabled: I }) => {
        const M = k.current.panels.find(
          (j) => j.id === R
        );
        M && (M.panelConstraints.disabled = I);
        const D = ar(v), L = Ce(v);
        D && L && Ee(D, {
          ...L,
          derivedPanelConstraints: tn(D)
        });
      },
      updateSeparatorProps: (R, {
        disabled: I,
        disableDoubleClick: M
      }) => {
        const D = k.current.separators.find(
          (L) => L.id === R
        );
        D && (D.disabled = I, D.disableDoubleClick = M);
      }
    }),
    [E, v, b, d, O]
  ), T = x(null);
  return Ue(() => {
    const R = P.current;
    if (R === null)
      return;
    const I = k.current;
    let M;
    if (O.defaultLayout !== void 0 && Object.keys(O.defaultLayout).length === I.panels.length) {
      M = {};
      for (const ae of I.panels) {
        const re = O.defaultLayout[ae.id];
        re !== void 0 && (M[ae.id] = re);
      }
    }
    const D = {
      disabled: !!a,
      element: R,
      id: v,
      mutableState: {
        defaultLayout: M,
        disableCursor: !!O.disableCursor,
        expandedPanelSizes: k.current.lastExpandedPanelSizes,
        layouts: k.current.layouts
      },
      orientation: d,
      panels: I.panels,
      resizeTargetMinimumSize: I.resizeTargetMinimumSize,
      separators: I.separators
    };
    T.current = D;
    const L = ic(D), { defaultLayoutDeferred: j, derivedPanelConstraints: H, layout: Z } = Ce(D.id, !0);
    !j && H.length > 0 && (g(Z), y(Z, !1));
    const oe = kn(v, (ae) => {
      const { defaultLayoutDeferred: re, derivedPanelConstraints: ie, layout: B } = ae.next;
      if (re || ie.length === 0)
        return;
      const K = D.panels.map(({ id: Q }) => Q).join(",");
      D.mutableState.layouts[K] = B, ie.forEach((Q) => {
        if (Q.collapsible) {
          const { layout: ue } = ae.prev ?? {};
          if (ue) {
            const ge = fe(
              Q.collapsedSize,
              B[Q.panelId]
            ), he = fe(
              Q.collapsedSize,
              ue[Q.panelId]
            );
            ge && !he && (D.mutableState.expandedPanelSizes[Q.panelId] = ue[Q.panelId]);
          }
        }
      });
      const X = De().state !== "active";
      g(B), X && y(B, ae.isUserInteraction);
    });
    return () => {
      T.current = null, L(), oe();
    };
  }, [
    a,
    v,
    y,
    g,
    d,
    S,
    O
  ]), $(() => {
    const R = T.current;
    R && (R.mutableState.defaultLayout = n, R.mutableState.disableCursor = !!r);
  }), /* @__PURE__ */ h(ao.Provider, { value: _, children: /* @__PURE__ */ h(
    "div",
    {
      ...m,
      className: t,
      "data-group": !0,
      "data-testid": v,
      id: v,
      ref: A,
      style: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        ...f,
        display: "flex",
        flexDirection: d === "horizontal" ? "row" : "column",
        flexWrap: "nowrap",
        // Inform the browser that the library is handling touch events for this element
        // but still allow users to scroll content within panels in the non-resizing direction
        // NOTE This is not an inherited style
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: d === "horizontal" ? "pan-y" : "pan-x"
      },
      children: e
    }
  ) });
}
so.displayName = "Group";
function Tn() {
  const e = ln(ao);
  return Y(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function dc(e, t) {
  const { id: n } = Tn(), r = x({
    collapse: Ht,
    expand: Ht,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: Ht
  });
  sn(t, () => r.current, []), Ue(() => {
    Object.assign(
      r.current,
      no({ groupId: n, panelId: e })
    );
  });
}
function rn({
  children: e,
  className: t,
  collapsedSize: n = "0%",
  collapsible: r = !1,
  defaultSize: a,
  disabled: o,
  elementRef: s,
  groupResizeBehavior: l = "preserve-relative-size",
  id: c,
  maxSize: i = "100%",
  minSize: d = "0%",
  onResize: u,
  panelRef: f,
  style: m,
  ...w
}) {
  const g = !!c, y = In(c), v = _n({
    disabled: o
  }), P = x(null), S = Rn(P, s), {
    getPanelStyles: b,
    id: k,
    orientation: A,
    registerPanel: E,
    updatePanelProps: O
  } = Tn(), _ = u !== null, T = st(
    (D, L, j) => {
      u == null || u(D, c, j);
    }
  );
  Ue(() => {
    const D = P.current;
    if (D !== null) {
      const L = {
        element: D,
        id: y,
        idIsStable: g,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: _ ? T : void 0,
        panelConstraints: {
          groupResizeBehavior: l,
          collapsedSize: n,
          collapsible: r,
          defaultSize: a,
          disabled: v.disabled,
          maxSize: i,
          minSize: d
        }
      };
      return E(L);
    }
  }, [
    l,
    n,
    r,
    a,
    _,
    y,
    g,
    i,
    d,
    T,
    E,
    v
  ]), $(() => {
    O(y, { disabled: o });
  }, [o, y, O]), dc(y, f);
  const R = () => {
    const D = b(k, y);
    if (D)
      return JSON.stringify(D);
  }, I = ho(
    (D) => kn(k, D),
    R,
    R
  );
  let M;
  return I ? M = JSON.parse(I) : a !== void 0 ? M = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: a
  } : M = { flexGrow: 1 }, /* @__PURE__ */ h(
    "div",
    {
      ...w,
      "data-disabled": o || void 0,
      "data-panel": !0,
      "data-testid": y,
      id: y,
      ref: S,
      style: {
        ...uc,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...M
      },
      children: /* @__PURE__ */ h(
        "div",
        {
          className: t,
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            flexGrow: 1,
            overflow: "auto",
            ...m,
            // Inform the browser that the library is handling touch events for this element
            // but still allow users to scroll content within panels in the non-resizing direction
            // NOTE This is not an inherited style
            // See github.com/bvaughn/react-resizable-panels/issues/662
            touchAction: A === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
rn.displayName = "Panel";
const uc = {
  minHeight: 0,
  maxHeight: "100%",
  height: "auto",
  minWidth: 0,
  maxWidth: "100%",
  width: "auto",
  border: "none",
  borderWidth: 0,
  padding: 0,
  margin: 0
};
function fc({
  layout: e,
  panelConstraints: t,
  panelId: n,
  panelIndex: r
}) {
  let a, o;
  const s = e[n], l = t.find(
    (c) => c.panelId === n
  );
  if (l) {
    const c = l.maxSize, i = l.collapsible ? l.collapsedSize : l.minSize, d = [r, r + 1];
    o = Fe({
      layout: ft({
        delta: i - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], a = Fe({
      layout: ft({
        delta: c - s,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: d,
        prevLayout: e
      }),
      panelConstraints: t
    })[n];
  }
  return {
    valueControls: n,
    valueMax: a,
    valueMin: o,
    valueNow: s
  };
}
function io({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: r,
  elementRef: a,
  id: o,
  style: s,
  ...l
}) {
  const c = In(o), i = _n({
    disabled: n,
    disableDoubleClick: r
  }), [d, u] = C({}), [f, m] = C("inactive"), [w, g] = C(!1), y = x(null), v = Rn(y, a), {
    disableCursor: P,
    id: S,
    orientation: b,
    registerSeparator: k,
    updateSeparatorProps: A
  } = Tn(), E = b === "horizontal" ? "vertical" : "horizontal";
  Ue(() => {
    const T = y.current;
    if (T !== null) {
      const R = {
        disabled: i.disabled,
        disableDoubleClick: i.disableDoubleClick,
        element: T,
        id: c
      }, I = k(R), M = Hi(
        (L) => {
          m(
            L.next.state !== "inactive" && L.next.hitRegions.some(
              (j) => j.separator === R
            ) ? L.next.state : "inactive"
          );
        }
      ), D = kn(
        S,
        (L) => {
          const { derivedPanelConstraints: j, layout: H, separatorToPanels: Z } = L.next, oe = Z.get(R);
          if (oe) {
            const ae = oe[0], re = oe.indexOf(ae);
            u(
              fc({
                layout: H,
                panelConstraints: j,
                panelId: ae.id,
                panelIndex: re
              })
            );
          }
        }
      );
      return () => {
        M(), D(), I();
      };
    }
  }, [S, c, k, i]), $(() => {
    A(c, { disabled: n, disableDoubleClick: r });
  }, [n, r, c, A]);
  let O;
  n && !P && (O = "not-allowed");
  let _;
  if (n)
    _ = "disabled";
  else
    switch (f) {
      case "active": {
        _ = "active";
        break;
      }
      default:
        w ? _ = "focus" : _ = f;
    }
  return /* @__PURE__ */ h(
    "div",
    {
      ...l,
      "aria-controls": d.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": E,
      "aria-valuemax": d.valueMax,
      "aria-valuemin": d.valueMin,
      "aria-valuenow": d.valueNow,
      children: e,
      className: t,
      "data-separator": _,
      "data-testid": c,
      id: c,
      onBlur: () => g(!1),
      onFocus: () => g(!0),
      ref: v,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: O,
        ...s,
        flexGrow: 0,
        flexShrink: 0,
        // Inform the browser that the library is handling touch events for this element
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: "none"
      },
      tabIndex: n ? void 0 : 0
    }
  );
}
io.displayName = "Separator";
const En = 30, Mn = 65, mt = 50, mc = 100 - Mn, pc = 100 - En;
function hc(e) {
  const t = Number(e);
  return Number.isFinite(t) ? Math.min(Mn, Math.max(En, t)) : mt;
}
function An(e) {
  return 100 - e;
}
function We(e) {
  return `${e}%`;
}
const Nn = "reader-document", pt = "reader-assistant", co = "retainpdf.reader.ai-split-layout.v1", gc = {
  [Nn]: An(mt),
  [pt]: mt
};
function xn(e) {
  const t = hc(e == null ? void 0 : e[pt]);
  return {
    [Nn]: An(t),
    [pt]: t
  };
}
function bc() {
  try {
    const e = JSON.parse(localStorage.getItem(co) || "null");
    return xn(e);
  } catch {
    return gc;
  }
}
function yc(e) {
  try {
    localStorage.setItem(co, JSON.stringify(xn(e)));
  } catch {
  }
}
function Wt(e, t) {
  const n = e == null ? void 0 : e.closest(".reader-react-root");
  if (!n) return;
  const r = xn(t);
  n.style.setProperty(
    "--reader-ai-split-width",
    `${r[pt]}vw`
  );
}
function vc() {
  const e = x(null), [t] = C(bc);
  $e(() => {
    const a = e.current;
    return Wt(a, t), () => {
      var o;
      (o = a == null ? void 0 : a.closest(".reader-react-root")) == null || o.style.removeProperty("--reader-ai-split-width");
    };
  }, [t]);
  const n = N((a) => {
    Wt(e.current, a);
  }, []), r = N((a, o) => {
    Wt(e.current, a), o.isUserInteraction && yc(a);
  }, []);
  return /* @__PURE__ */ z(
    so,
    {
      id: "reader-ai-split",
      className: "reader-ai-split-resizer",
      elementRef: e,
      orientation: "horizontal",
      defaultLayout: t,
      onLayoutChange: n,
      onLayoutChanged: r,
      resizeTargetMinimumSize: { fine: 12, coarse: 28 },
      children: [
        /* @__PURE__ */ h(
          rn,
          {
            id: Nn,
            defaultSize: We(An(mt)),
            minSize: We(mc),
            maxSize: We(pc)
          }
        ),
        /* @__PURE__ */ h(
          io,
          {
            id: "reader-ai-split-separator",
            className: "reader-ai-split-separator",
            "aria-label": p("k_64c48935"),
            children: /* @__PURE__ */ h("span", { "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ h(
          rn,
          {
            id: pt,
            defaultSize: We(mt),
            minSize: We(En),
            maxSize: We(Mn)
          }
        )
      ]
    }
  );
}
const Ne = 12, wc = 4;
function Ve(e, t, n) {
  if (typeof window > "u") return { x: e, y: t };
  const r = Math.min(n, window.innerWidth - Ne * 2), a = Math.max(Ne, window.innerWidth - r - Ne), o = Math.min(window.innerHeight * 0.9, 860), s = Math.max(Ne, window.innerHeight - o - Ne);
  return {
    x: Math.min(a, Math.max(Ne, e)),
    y: Math.min(s, Math.max(Ne, t))
  };
}
function yr(e) {
  if (typeof window > "u") return { x: 24, y: 72 };
  const t = Math.min(e, window.innerWidth - Ne * 2);
  return Ve(window.innerWidth - t - 20, 72, e);
}
function Sc(e, t) {
  try {
    const n = localStorage.getItem(e);
    if (!n) return yr(t);
    const r = JSON.parse(n);
    if (typeof r.x == "number" && typeof r.y == "number")
      return Ve(r.x, r.y, t);
  } catch {
  }
  return yr(t);
}
function kc(e, t) {
  try {
    localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
}
function Pc({
  id: e,
  open: t,
  title: n,
  subtitle: r = p("k_b2f59105"),
  titleIcon: a,
  storageKey: o,
  ariaLabel: s,
  className: l = "",
  width: c = 360,
  placement: i = "floating",
  showHeader: d = !0,
  onClose: u,
  toolbar: f,
  children: m
}) {
  const w = i === "workspace", g = i === "dock-right", y = g || w, [v, P] = C(() => Sc(o, c)), [S, b] = C(!1), k = x(null);
  $(() => {
    !t || y || P((_) => Ve(_.x, _.y, c));
  }, [y, t, c]), $(() => {
    if (!t || y) return;
    const _ = () => P((T) => Ve(T.x, T.y, c));
    return window.addEventListener("resize", _), () => window.removeEventListener("resize", _);
  }, [y, t, c]), $(() => {
    if (!t) return;
    const _ = (T) => {
      var I;
      if (T.key !== "Escape") return;
      const R = T.target;
      (I = R == null ? void 0 : R.closest) != null && I.call(R, "textarea, input, select, [contenteditable='true']") || (T.preventDefault(), u());
    };
    return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
  }, [t, u]);
  const A = N((_) => {
    var T, R;
    y || _.button === 0 && ((R = (T = _.target) == null ? void 0 : T.closest) != null && R.call(T, "button") || (_.currentTarget.setPointerCapture(_.pointerId), k.current = {
      pointerId: _.pointerId,
      startX: _.clientX,
      startY: _.clientY,
      originX: v.x,
      originY: v.y,
      moved: !1
    }, b(!0)));
  }, [y, v.x, v.y]), E = N((_) => {
    const T = k.current;
    if (!T || T.pointerId !== _.pointerId) return;
    const R = _.clientX - T.startX, I = _.clientY - T.startY;
    !T.moved && Math.hypot(R, I) < wc || (T.moved = !0, P(Ve(T.originX + R, T.originY + I, c)));
  }, [c]), O = N((_) => {
    const T = k.current;
    if (!(!T || T.pointerId !== _.pointerId)) {
      k.current = null, b(!1);
      try {
        _.currentTarget.releasePointerCapture(_.pointerId);
      } catch {
      }
      T.moved && P((R) => {
        const I = Ve(R.x, R.y, c);
        return kc(o, I), I;
      });
    }
  }, [o, c]);
  return t ? /* @__PURE__ */ z(
    "aside",
    {
      id: e,
      className: `reader-notes-panel reader-notes-panel--${w ? "workspace" : g ? "docked" : "float"}${y ? "" : " reader-floating-surface"}${d ? " has-panel-header" : " is-headerless"}${f ? " has-panel-toolbar" : ""}${S ? " is-dragging" : ""} ${l}`.trim(),
      style: y ? void 0 : { left: v.x, top: v.y, width: Math.min(c, typeof window < "u" ? window.innerWidth - 24 : c) },
      "aria-label": s,
      role: "dialog",
      "aria-modal": "false",
      children: [
        d ? /* @__PURE__ */ z(
          "header",
          {
            className: "reader-notes-panel-head",
            onPointerDown: A,
            onPointerMove: E,
            onPointerUp: O,
            onPointerCancel: O,
            children: [
              y ? null : /* @__PURE__ */ h("div", { className: "reader-notes-panel-drag", "aria-hidden": "true", children: /* @__PURE__ */ h(Oo, { size: 14, strokeWidth: 2.25 }) }),
              /* @__PURE__ */ z("div", { className: "reader-notes-panel-head-text", children: [
                /* @__PURE__ */ z("strong", { children: [
                  a,
                  n
                ] }),
                r ? /* @__PURE__ */ h("span", { children: r }) : null
              ] }),
              /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-close reader-floating-close", "aria-label": p("k_e3dbe4e8", [n]), onClick: u, children: /* @__PURE__ */ h(Qe, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 }) })
            ]
          }
        ) : null,
        f ? /* @__PURE__ */ h("div", { className: "reader-notes-panel-toolbar", children: f }) : null,
        /* @__PURE__ */ h("div", { className: "reader-notes-panel-body", children: m })
      ]
    }
  ) : null;
}
function Ic({
  note: e,
  onJump: t,
  onUpdateNote: n,
  onRemove: r
}) {
  const [a, o] = C(!1), [s, l] = C(e.note);
  return $(() => {
    a || l(e.note);
  }, [e.note, a]), /* @__PURE__ */ z("article", { className: "reader-notes-item", children: [
    /* @__PURE__ */ z("div", { className: "reader-notes-item-top", children: [
      /* @__PURE__ */ h("span", { className: "reader-notes-kind", children: e.pane === "translated" ? p("k_647e0016") : p("k_4d69dbdf") }),
      /* @__PURE__ */ z("div", { className: "reader-notes-item-actions", children: [
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => t(e), children: p("k_84476c81") }),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-danger", onClick: () => r(e.id), children: p("k_3755f56f") })
      ] })
    ] }),
    /* @__PURE__ */ h("p", { className: "reader-notes-quote", children: e.quote }),
    a ? /* @__PURE__ */ z("div", { className: "reader-notes-editor", children: [
      /* @__PURE__ */ h(
        "textarea",
        {
          className: "reader-notes-textarea",
          value: s,
          placeholder: p("k_5818db9d"),
          rows: 3,
          onChange: (c) => l(c.target.value)
        }
      ),
      /* @__PURE__ */ z("div", { className: "reader-notes-editor-actions", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-primary",
            onClick: () => {
              n(e.id, s), o(!1);
            },
            children: p("k_fadf24db")
          }
        ),
        /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-link", onClick: () => o(!1), children: p("k_4d0b4688") })
      ] })
    ] }) : e.note ? /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-notes-note",
        onClick: () => o(!0),
        title: p("k_e49002b0"),
        children: e.note
      }
    ) : /* @__PURE__ */ h("button", { type: "button", className: "reader-notes-add-note", onClick: () => o(!0), children: p("k_efb37dd0") })
  ] });
}
function Rc({
  open: e,
  groups: t,
  count: n,
  onClose: r,
  onJump: a,
  onUpdateNote: o,
  onRemove: s,
  onExport: l
}) {
  const [c, i] = C(!1);
  return /* @__PURE__ */ h(
    Pc,
    {
      id: "reader-notes-panel",
      open: e,
      title: p("k_290d5385"),
      subtitle: p("k_eb6db838"),
      titleIcon: /* @__PURE__ */ h(xt, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.notes-float.pos.v1",
      ariaLabel: p("k_290d5385"),
      onClose: r,
      toolbar: /* @__PURE__ */ z(At, { children: [
        /* @__PURE__ */ z("span", { className: "reader-notes-count", children: [
          n,
          " ",
          p("k_bce2ef61")
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: c || n === 0,
            onClick: async () => {
              await l() && (i(!0), window.setTimeout(() => i(!1), 1800));
            },
            children: c ? p("k_e381a576") : p("k_2ece443b")
          }
        )
      ] }),
      children: n === 0 ? /* @__PURE__ */ h("p", { className: "reader-notes-empty", children: p("k_496a8d50") }) : t.map((d) => /* @__PURE__ */ z("section", { className: "reader-notes-group", children: [
        /* @__PURE__ */ z("h3", { className: "reader-notes-group-title", children: [
          p("k_dae828fe"),
          " ",
          d.page,
          " ",
          p("k_73422182")
        ] }),
        d.items.map((u) => /* @__PURE__ */ h(
          Ic,
          {
            note: u,
            onJump: a,
            onUpdateNote: o,
            onRemove: s
          },
          u.id
        ))
      ] }, d.page))
    }
  );
}
function _c({
  regionsFailed: e = !1,
  metadataFailed: t = !1
}) {
  const [n, r] = C(!1);
  if ($(() => {
    !e && !t && r(!1);
  }, [e, t]), n || !e && !t)
    return null;
  const a = [
    e ? p("k_6774d92e") : "",
    t ? p("k_4528bbfc") : ""
  ].filter(Boolean);
  return /* @__PURE__ */ z("div", { className: "reader-error-notice", role: "status", "data-reader-error-notice": "true", children: [
    /* @__PURE__ */ z("span", { className: "reader-error-notice-text", children: [
      a.join("、"),
      p("k_7de8a75d")
    ] }),
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-error-notice-dismiss",
        "aria-label": p("k_c620893e"),
        onClick: () => r(!0),
        children: "×"
      }
    )
  ] });
}
function Tc({
  loading: e,
  failed: t,
  text: n,
  percent: r,
  regionsError: a = !1,
  metadataError: o = !1
}) {
  return !e && !t ? /* @__PURE__ */ h(_c, { regionsFailed: a, metadataFailed: o }) : /* @__PURE__ */ z(At, { children: [
    e ? /* @__PURE__ */ h("div", { className: "reader-boot-loading", "data-reader-boot-loading": "true", children: /* @__PURE__ */ z("div", { className: "reader-boot-loading-card", children: [
      /* @__PURE__ */ h("div", { className: "reader-boot-loading-text", children: n }),
      /* @__PURE__ */ h("div", { className: "reader-boot-loading-track", children: /* @__PURE__ */ h(
        "span",
        {
          className: "reader-boot-loading-bar",
          style: { width: `${Math.max(0, Math.min(100, r))}%` }
        }
      ) })
    ] }) }) : null,
    t ? /* @__PURE__ */ h("div", { className: "reader-react-error", role: "alert", children: n }) : null
  ] });
}
async function Ec(e) {
  var a;
  const t = `${e || ""}`;
  if (!t) throw new Error("empty selection");
  try {
    if ((a = navigator.clipboard) != null && a.writeText) {
      await navigator.clipboard.writeText(t);
      return;
    }
  } catch {
  }
  const n = document.createElement("textarea");
  n.value = t, n.setAttribute("readonly", ""), n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), n.select();
  const r = document.execCommand("copy");
  if (n.remove(), !r) throw new Error("copy failed");
}
function Mc({
  selection: e,
  onDismiss: t,
  onAskAi: n,
  onAddNote: r
}) {
  const [a, o] = C(!1), s = e ? e.selectionType === "text" ? `${e.pane}:${e.page}:${e.quote}` : `${e.region.itemId}:${e.pane}` : "";
  if ($(() => o(!1), [s]), !e)
    return null;
  const l = typeof window < "u" ? window.innerWidth : 800, c = typeof window < "u" ? window.innerHeight : 600, i = e.rect.left + e.rect.width / 2, d = 170, u = Math.min(Math.max(16 + d, i), l - 16 - d), f = e.rect.top > 72, m = f ? Math.max(12, e.rect.top - 8) : Math.min(c - 12, e.rect.top + e.rect.height + 8), w = f ? "above" : "below", g = e.pane === "translated" ? p("k_647e0016") : p("k_4d69dbdf"), y = e.selectionType === "text" ? "text" : e.kind, v = e.selectionType === "text" ? e.quote : Ir(e.region, e.pane), P = y === "formula" ? p("k_3f27035a") : y === "table" ? p("k_150074c2") : y === "figure" ? p("k_be8da62e") : y === "text" ? p("k_f4d3dab8") : p("k_17fc93c9"), S = y === "formula" ? Mo(v) : v, b = y === "formula" ? Fo : y === "table" ? $o : y === "text" ? jo : Uo;
  return /* @__PURE__ */ z(
    "div",
    {
      className: `reader-sel-pop reader-sel-pop--${w} reader-sel-pop--region`,
      style: { left: u, top: m },
      role: "toolbar",
      "aria-label": p("k_2bf5a755"),
      onPointerDown: (k) => {
        k.preventDefault();
      },
      children: [
        /* @__PURE__ */ z("div", { className: "reader-sel-pop-card reader-floating-surface", children: [
          /* @__PURE__ */ z("div", { className: "reader-sel-pop-context", children: [
            /* @__PURE__ */ h(b, { size: 15, strokeWidth: 2.1, "aria-hidden": !0 }),
            /* @__PURE__ */ h("span", { children: P }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ h("span", { children: g }),
            /* @__PURE__ */ h("span", { className: "reader-sel-pop-context-divider", "aria-hidden": !0, children: "·" }),
            /* @__PURE__ */ z("span", { children: [
              e.page,
              " ",
              p("k_73422182")
            ] })
          ] }),
          /* @__PURE__ */ z("div", { className: "reader-sel-pop-actions", children: [
            S ? /* @__PURE__ */ z(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--primary",
                onClick: async () => {
                  try {
                    await Ec(S), o(!0), window.setTimeout(() => o(!1), 1400);
                  } catch (k) {
                    console.warn("[reader-selection] copy failed", k);
                  }
                },
                children: [
                  a ? /* @__PURE__ */ h(Bo, { size: 15, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ h(Ho, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: a ? p("k_e381a576") : y === "formula" ? p("k_f70cafe8") : p("k_4edd1d00") })
                ]
              }
            ) : /* @__PURE__ */ h("span", { className: "reader-sel-pop-selection-hint", children: p("k_be69fa00") }),
            r && S ? /* @__PURE__ */ z(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => r({ page: e.page, pane: e.pane, quote: S }),
                children: [
                  /* @__PURE__ */ h(xt, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: p("k_4f01f6ef") })
                ]
              }
            ) : null,
            n ? /* @__PURE__ */ z(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--secondary",
                onClick: () => n(e),
                children: [
                  /* @__PURE__ */ h(fn, { size: 15, strokeWidth: 2.2, "aria-hidden": !0 }),
                  /* @__PURE__ */ h("span", { children: p("k_22d11b3e") })
                ]
              }
            ) : null,
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                className: "reader-sel-pop-btn reader-sel-pop-btn--ghost",
                onClick: t,
                "aria-label": p("k_4a8759b2"),
                title: p("k_4d0b4688"),
                children: /* @__PURE__ */ h(Qe, { size: 15, strokeWidth: 2.5, "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ h("span", { className: "reader-sel-pop-caret", "aria-hidden": "true" })
      ]
    }
  );
}
function Ac(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable ? !0 : !!e.closest("input, textarea, select, [contenteditable='true']");
}
function Nc() {
  const [e, t] = C(!1), n = dn(), r = x(null);
  return $(() => {
    if (!e) return;
    const a = (s) => {
      const l = r.current;
      l && s.target instanceof Node && !l.contains(s.target) && t(!1);
    }, o = (s) => {
      s.key === "Escape" && (s.preventDefault(), t(!1));
    };
    return document.addEventListener("mousedown", a), window.addEventListener("keydown", o), () => {
      document.removeEventListener("mousedown", a), window.removeEventListener("keydown", o);
    };
  }, [e]), $(() => {
    const a = (o) => {
      if (o.defaultPrevented || o.metaKey || o.ctrlKey || o.altKey || Ac(o.target)) return;
      const s = o.key;
      if (s === "?" || s === "h" || s === "H" || s === "/") {
        if (s === "/" && !o.shiftKey)
          return;
        o.preventDefault(), t((l) => !l);
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, []), /* @__PURE__ */ z("div", { className: "reader-react-shortcuts", ref: r, "data-reader-shortcuts": "", children: [
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: `reader-react-hud-btn reader-react-shortcuts-btn${e ? " is-active" : ""}`,
        "aria-label": p("k_d15328af"),
        "aria-expanded": e,
        "aria-controls": n,
        title: p("k_33f10794"),
        onClick: () => t((a) => !a),
        children: /* @__PURE__ */ h(Wo, { className: "reader-react-shortcuts-icon", size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
      }
    ),
    e ? /* @__PURE__ */ z(
      "div",
      {
        id: n,
        className: "reader-react-shortcuts-panel reader-floating-surface",
        role: "dialog",
        "aria-label": p("k_e9476de3"),
        children: [
          /* @__PURE__ */ z("div", { className: "reader-react-shortcuts-head", children: [
            /* @__PURE__ */ h("strong", { children: p("k_31e33107") }),
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                className: "reader-react-shortcuts-close reader-floating-close",
                "aria-label": p("k_6c14bd7f"),
                onClick: () => t(!1),
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ h("div", { className: "reader-react-shortcuts-body", children: Bs.map((a) => /* @__PURE__ */ z("section", { className: "reader-react-shortcuts-group", children: [
            /* @__PURE__ */ h("h3", { children: a.title }),
            /* @__PURE__ */ h("ul", { children: a.items.map((o) => /* @__PURE__ */ z("li", { children: [
              /* @__PURE__ */ h("kbd", { children: o.keys }),
              /* @__PURE__ */ h("span", { children: o.desc })
            ] }, `${a.title}-${o.keys}`)) })
          ] }, a.title)) }),
          /* @__PURE__ */ h("p", { className: "reader-react-shortcuts-foot", children: p("k_19f41b9d") })
        ]
      }
    ) : null
  ] });
}
const xc = Object.freeze([
  {
    id: "favorites",
    label: p("k_046a3be9"),
    subIdle: p("k_54a42370"),
    subOpen: p("k_803658e0"),
    needsJob: !1
  },
  {
    id: "markdown",
    label: "Markdown",
    subIdle: p("k_991aec8a"),
    subOpen: p("k_803658e0"),
    needsJob: !0
  },
  {
    id: "ai",
    label: p("k_4e0478a9"),
    subIdle: p("k_7d66d5a4"),
    subOpen: p("k_803658e0"),
    needsJob: !0
  }
]), Cc = ["source", "sideBySide", "translated"], Lc = { source: "", translated: "", sideBySide: "" };
function zc(e) {
  if (e.sourceOnly || !e.jobId) {
    const t = ct(e.sourceUrl), n = ct(e.translatedUrl);
    return {
      source: t,
      translated: n,
      // sideBySide requires dedicated artifact; no fallback to source url
      sideBySide: ""
    };
  }
  return ca({
    jobId: e.jobId,
    jobPayload: e.jobPayload,
    manifestPayload: e.manifestPayload
  });
}
function Dc(e) {
  const [t, n] = C(() => /* @__PURE__ */ new Set()), r = q(
    () => e ? zc(e) : Lc,
    [e]
  ), a = q(
    () => Cc.filter((s) => !(e != null && e.sourceOnly && s !== "source")),
    [e == null ? void 0 : e.sourceOnly]
  ), o = N(async (s) => {
    if (!e) return;
    const l = ct(r[s]);
    if (!(!l || t.has(s)))
      try {
        const c = e.jobId ? ia(s, {
          jobId: e.jobId,
          jobPayload: e.jobPayload,
          manifestPayload: e.manifestPayload
        }) : `${e.sourceOnly ? "document" : "reader"}-${s}.pdf`;
        await la(
          e.fetchProtected,
          l,
          c,
          c,
          null,
          (i) => n((d) => {
            const u = new Set(d);
            return i ? u.add(s) : u.delete(s), u;
          })
        );
      } catch (c) {
        const i = c instanceof Error ? c.message : p("k_e0dab22b");
        da(i), n((d) => {
          const u = new Set(d);
          return u.delete(s), u;
        });
      }
  }, [r, t, e]);
  return { urls: r, downloadItems: a, busyActions: t, handleDownload: o };
}
function Oc(e) {
  const [t, n] = C(!1), r = N(() => n(!1), []), a = N(() => n((o) => !o), []);
  return $(() => {
    if (!t) return;
    const o = (l) => {
      const c = e.current;
      c && l.target instanceof Node && !c.contains(l.target) && n(!1);
    }, s = (l) => {
      l.key === "Escape" && (l.preventDefault(), n(!1));
    };
    return document.addEventListener("mousedown", o), window.addEventListener("keydown", s), () => {
      document.removeEventListener("mousedown", o), window.removeEventListener("keydown", s);
    };
  }, [t, e]), { open: t, setOpen: n, closeMenu: r, toggleMenu: a };
}
const lo = "retainpdf.reader.fab.pos.v1", Mt = 52, Je = 12, Fc = 6;
function it(e, t) {
  if (typeof window > "u")
    return { x: e, y: t };
  const n = Math.max(Je, window.innerWidth - Mt - Je), r = Math.max(Je, window.innerHeight - Mt - Je);
  return {
    x: Math.min(n, Math.max(Je, e)),
    y: Math.min(r, Math.max(Je, t))
  };
}
function vr() {
  return typeof window > "u" ? { x: 24, y: 120 } : it(
    window.innerWidth - Mt - 20,
    window.innerHeight - Mt - 88
  );
}
function $c() {
  try {
    const e = localStorage.getItem(lo);
    if (!e) return vr();
    const t = JSON.parse(e);
    if (typeof t.x == "number" && typeof t.y == "number")
      return it(t.x, t.y);
  } catch {
  }
  return vr();
}
function jc(e) {
  try {
    localStorage.setItem(lo, JSON.stringify(e));
  } catch {
  }
}
function Uc(e) {
  return typeof window < "u" && e.y > window.innerHeight * 0.55;
}
function Bc(e = {}) {
  const { onDragStart: t, onActivate: n } = e, [r, a] = C(() => $c()), o = x(null);
  $(() => {
    const i = () => a((d) => it(d.x, d.y));
    return window.addEventListener("resize", i), () => window.removeEventListener("resize", i);
  }, []);
  const s = N((i) => {
    i.button === 0 && (i.currentTarget.setPointerCapture(i.pointerId), o.current = {
      pointerId: i.pointerId,
      startX: i.clientX,
      startY: i.clientY,
      originX: r.x,
      originY: r.y,
      moved: !1
    });
  }, [r.x, r.y]), l = N((i) => {
    const d = o.current;
    if (!d || d.pointerId !== i.pointerId) return;
    const u = i.clientX - d.startX, f = i.clientY - d.startY;
    !d.moved && Math.hypot(u, f) < Fc || (d.moved || (d.moved = !0, t == null || t()), a(it(d.originX + u, d.originY + f)));
  }, [t]), c = N((i) => {
    const d = o.current;
    if (!(!d || d.pointerId !== i.pointerId)) {
      o.current = null;
      try {
        i.currentTarget.releasePointerCapture(i.pointerId);
      } catch {
      }
      if (d.moved) {
        a((u) => {
          const f = it(u.x, u.y);
          return jc(f), f;
        });
        return;
      }
      n == null || n();
    }
  }, [n]);
  return {
    pos: r,
    openUp: Uc(r),
    onPointerDown: s,
    onPointerMove: l,
    onPointerUp: c
  };
}
const Hc = {
  source: Rr,
  sideBySide: _r,
  translated: Tr
}, Wc = {
  source: p("k_4d69dbdf"),
  sideBySide: p("k_d36792e9"),
  translated: p("k_647e0016")
};
function Jc({ onClose: e }) {
  return /* @__PURE__ */ z("header", { className: "reader-fab-menu-head", children: [
    /* @__PURE__ */ z("div", { className: "reader-fab-menu-head-text", children: [
      /* @__PURE__ */ h("strong", { children: p("k_a72ef18d") }),
      /* @__PURE__ */ h("span", { children: p("k_c16d4427") })
    ] }),
    /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-fab-menu-close reader-floating-close",
        "aria-label": p("k_82baef56"),
        onClick: e,
        children: /* @__PURE__ */ h(Qe, { size: 14, strokeWidth: 2.5, "aria-hidden": !0 })
      }
    )
  ] });
}
function qc({
  index: e,
  icon: t,
  title: n,
  sub: r,
  active: a,
  disabled: o,
  onClick: s
}) {
  return /* @__PURE__ */ z(
    "button",
    {
      type: "button",
      role: "menuitem",
      className: `reader-fab-row${a ? " is-active" : ""}${o ? " is-disabled" : ""}`,
      "aria-pressed": a,
      disabled: o,
      onClick: s,
      style: { "--fab-i": e + 1 },
      children: [
        /* @__PURE__ */ h("span", { className: "reader-fab-row-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(t, { size: 18, strokeWidth: 2 }) }),
        /* @__PURE__ */ z("span", { className: "reader-fab-row-copy", children: [
          /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: n }),
          /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: r })
        ] })
      ]
    }
  );
}
function Vc({
  urls: e,
  items: t,
  busyActions: n,
  onDownload: r
}) {
  return /* @__PURE__ */ z("div", { className: "reader-fab-section", role: "group", "aria-label": p("k_2b9d0131"), children: [
    /* @__PURE__ */ z("div", { className: "reader-fab-section-head", children: [
      /* @__PURE__ */ h(Jo, { size: 12, strokeWidth: 2.5, "aria-hidden": !0 }),
      /* @__PURE__ */ h("span", { children: p("k_8aa3abe1") })
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-fab-download-grid", children: t.map((a, o) => {
      const s = wo[a], l = ct(e[a]), c = n.has(a), i = !!l && !c, d = i ? "" : So(a, e), u = Hc[a];
      return /* @__PURE__ */ z(
        "button",
        {
          type: "button",
          role: "menuitem",
          id: `reader-fab-download-${a}`,
          className: `reader-fab-chip${c ? " is-busy" : ""}${i ? "" : " is-disabled"}`,
          disabled: !i,
          title: i ? p("k_a7f76548", [s.label]) : d,
          onClick: () => void r(a),
          style: { "--fab-i": o },
          children: [
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(u, { size: 16, strokeWidth: 2 }) }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-label", children: Wc[a] }),
            /* @__PURE__ */ h("span", { className: "reader-fab-chip-state", children: c ? "…" : i ? "↓" : "—" })
          ]
        },
        a
      );
    }) }),
    t.every((a) => !ct(e[a])) ? /* @__PURE__ */ h("p", { className: "reader-fab-empty", children: p("k_0dd4d772") }) : null
  ] });
}
const Kc = {
  favorites: qo,
  markdown: Er,
  ai: fn,
  notes: xt
}, Gc = xc;
function Yc(e) {
  const { activeTool: t, noteCount: n, onToggleTool: r } = e, a = gt(), o = e.sourceOnly ?? (a == null ? void 0 : a.sourceOnly) ?? !1, s = e.download ?? (a == null ? void 0 : a.download), l = x(null), c = dn(), { open: i, setOpen: d, closeMenu: u, toggleMenu: f } = Oc(l), { pos: m, openUp: w, onPointerDown: g, onPointerMove: y, onPointerUp: v } = Bc({
    onDragStart: u,
    onActivate: f
  }), { urls: P, downloadItems: S, busyActions: b, handleDownload: k } = Dc(s), A = N((E) => {
    r(E), d(!1);
  }, [r, d]);
  return /* @__PURE__ */ z(
    "div",
    {
      ref: l,
      className: `reader-fab${i ? " is-open" : ""}${w ? " is-open-up" : ""}`,
      style: { left: m.x, top: m.y },
      "data-reader-fab": "",
      children: [
        i ? /* @__PURE__ */ z(
          "div",
          {
            id: c,
            className: "reader-fab-menu reader-floating-surface",
            role: "menu",
            "aria-label": p("k_b0dfdeac"),
            children: [
              /* @__PURE__ */ h(Jc, { onClose: u }),
              (() => {
                const E = t === "notes";
                return /* @__PURE__ */ z(
                  "button",
                  {
                    type: "button",
                    role: "menuitem",
                    className: `reader-fab-row${E ? " is-active" : ""}`,
                    "aria-pressed": E,
                    onClick: () => A("notes"),
                    style: { "--fab-i": 0 },
                    children: [
                      /* @__PURE__ */ h("span", { className: "reader-fab-row-icon", "aria-hidden": "true", children: /* @__PURE__ */ h(xt, { size: 18, strokeWidth: 2 }) }),
                      /* @__PURE__ */ z("span", { className: "reader-fab-row-copy", children: [
                        /* @__PURE__ */ h("span", { className: "reader-fab-row-title", children: p("k_290d5385") }),
                        /* @__PURE__ */ h("span", { className: "reader-fab-row-sub", children: E ? p("k_803658e0") : p("k_e1428aac") })
                      ] }),
                      n > 0 ? /* @__PURE__ */ h("span", { className: "reader-fab-row-badge", children: n }) : null
                    ]
                  }
                );
              })(),
              Gc.map((E, O) => {
                const _ = Kc[E.id], T = t === E.id, R = E.needsJob && o;
                let I = T ? E.subOpen : E.subIdle;
                return R && (I = p("k_6a2341b2")), /* @__PURE__ */ h(
                  qc,
                  {
                    index: O,
                    icon: _,
                    title: E.label,
                    sub: I,
                    active: T,
                    disabled: R,
                    onClick: () => A(E.id)
                  },
                  E.id
                );
              }),
              /* @__PURE__ */ h(
                Vc,
                {
                  urls: P,
                  items: S,
                  busyActions: b,
                  onDownload: k
                }
              )
            ]
          }
        ) : null,
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            className: `reader-fab-trigger${i ? " is-open" : ""}${t ? " has-active-tool" : ""}`,
            "aria-label": i ? p("k_d7752e4c") : p("k_f1184183"),
            "aria-expanded": i,
            "aria-controls": i ? c : void 0,
            "aria-haspopup": "menu",
            onPointerDown: g,
            onPointerMove: y,
            onPointerUp: v,
            onPointerCancel: v,
            children: /* @__PURE__ */ h("span", { className: "reader-fab-icon", "aria-hidden": "true", children: i ? /* @__PURE__ */ h(Qe, { size: 20, strokeWidth: 2.5 }) : /* @__PURE__ */ z("span", { className: "reader-fab-dots", children: [
              /* @__PURE__ */ h("i", {}),
              /* @__PURE__ */ h("i", {}),
              /* @__PURE__ */ h("i", {})
            ] }) })
          }
        )
      ]
    }
  );
}
function Zc(e) {
  const t = gt(), n = Ii(), { mode: r = "compare", modeControls: a } = e, o = e.userZoom ?? (t == null ? void 0 : t.userZoom) ?? ht, s = e.onZoomChange ?? (t == null ? void 0 : t.onZoomChange) ?? (() => {
  }), l = e.currentPage ?? (n == null ? void 0 : n.currentPage) ?? 1, c = e.numPages ?? (n == null ? void 0 : n.numPages) ?? 0, i = e.onGoToPage ?? (t == null ? void 0 : t.goToPage), d = Va(o), u = o > xr + 1e-3, f = o < Cr - 1e-3, m = at(), w = p("k_b6028958"), [g, y] = C(!1), [v, P] = C(`${l}`);
  $(() => {
    g || P(`${Math.min(Math.max(l, 1), Math.max(c, 1))}`);
  }, [l, c, g]);
  const S = () => {
    if (y(!1), !i || c <= 0)
      return;
    const b = Number(`${v}`.trim());
    i(Et(b, c));
  };
  return /* @__PURE__ */ z("div", { className: "reader-react-hud", "data-reader-hud": "true", children: [
    a ? /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-modes", children: a }) : null,
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group", "aria-label": p("k_7b0930e2"), children: g ? /* @__PURE__ */ z(
      "form",
      {
        className: "reader-react-hud-page-form",
        onSubmit: (b) => {
          b.preventDefault(), S();
        },
        children: [
          /* @__PURE__ */ h(
            "input",
            {
              className: "reader-react-hud-page-input",
              type: "text",
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": p("k_8e74907f"),
              value: v,
              autoFocus: !0,
              onChange: (b) => P(b.target.value.replace(/[^\d]/g, "")),
              onBlur: S,
              onKeyDown: (b) => {
                b.key === "Escape" && (b.preventDefault(), y(!1), P(`${l}`));
              }
            }
          ),
          /* @__PURE__ */ z("span", { className: "reader-react-hud-page-suffix", children: [
            "/ ",
            c || "—"
          ] })
        ]
      }
    ) : /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        className: "reader-react-hud-page reader-react-hud-page-btn",
        "aria-label": c > 0 ? p("k_ee96acf0", [l, c]) : p("k_7b0930e2"),
        title: c > 0 ? p("k_37c06fc1") : void 0,
        disabled: !i || c <= 0,
        onClick: () => {
          !i || c <= 0 || (P(`${l}`), y(!0));
        },
        children: c > 0 ? `${Math.min(l, c)} / ${c}` : "—"
      }
    ) }),
    /* @__PURE__ */ z("div", { className: "reader-react-hud-group", "aria-label": p("k_12e2ed4d"), children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": p("k_11f8516f"),
          disabled: !u,
          onClick: () => s(ut(o, -1)),
          children: "−"
        }
      ),
      /* @__PURE__ */ z(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn reader-react-hud-zoom-label",
          "aria-label": p("k_cf99c3ca", [w]),
          title: w,
          onClick: () => s(m),
          children: [
            d,
            "%"
          ]
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          className: "reader-react-hud-btn",
          "aria-label": p("k_d7f48a05"),
          disabled: !f,
          onClick: () => s(ut(o, 1)),
          children: "+"
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "reader-react-hud-group reader-react-hud-help", "aria-label": p("k_adf465eb"), children: /* @__PURE__ */ h(Nc, {}) })
  ] });
}
function uo(e) {
  const t = `${e.jobId || ""}`.trim(), n = `${e.documentId || ""}`.trim();
  return t ? `retainpdf.reader.notes.v1:job:${t}` : n ? `retainpdf.reader.notes.v1:doc:${n}` : "retainpdf.reader.notes.v1:anonymous";
}
function Xc() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Qc(e) {
  return {
    pageIdx: Number(e.page) - 1,
    quoteText: e.quote,
    note: e.note,
    createdAt: e.createdAt
  };
}
function el(e) {
  return xo(e, (t) => t.page);
}
function tl(e) {
  return Lo(e, (t) => t.page).map((t) => ({ page: t.pageIdx, items: t.items }));
}
function nl(e, t) {
  return Co({
    title: e,
    annotations: t.map(Qc)
  });
}
function rl(e) {
  if (!e)
    return [];
  try {
    const t = JSON.parse(e);
    return Array.isArray(t) ? t.map((n) => ({
      id: `${(n == null ? void 0 : n.id) || ""}`.trim(),
      page: Math.max(1, Math.floor(Number(n == null ? void 0 : n.page) || 1)),
      pane: (n == null ? void 0 : n.pane) === "translated" ? "translated" : "source",
      quote: `${(n == null ? void 0 : n.quote) || ""}`.trim(),
      note: `${(n == null ? void 0 : n.note) || ""}`.trim(),
      createdAt: `${(n == null ? void 0 : n.createdAt) || ""}`.trim() || (/* @__PURE__ */ new Date()).toISOString()
    })).filter((n) => n.id && n.quote) : [];
  } catch {
    return [];
  }
}
function wr(e) {
  if (typeof localStorage > "u")
    return [];
  try {
    return rl(localStorage.getItem(uo(e)));
  } catch {
    return [];
  }
}
function ol(e, t) {
  if (!(typeof localStorage > "u"))
    try {
      localStorage.setItem(uo(e), JSON.stringify(t));
    } catch (n) {
      console.warn("[reader-notes] persist failed", n);
    }
}
function al(e, t = {}) {
  const n = q(
    () => ({
      jobId: `${e.jobId || ""}`.trim(),
      documentId: `${e.documentId || ""}`.trim()
    }),
    [e.jobId, e.documentId]
  ), [r, a] = C(() => wr(n)), o = t.onAfterAdd;
  $(() => {
    a(wr(n));
  }, [n.jobId, n.documentId]), $(() => {
    ol(n, r);
  }, [n, r]);
  const s = N((u) => {
    const f = `${u.quote || ""}`.trim();
    if (!f)
      return null;
    const m = {
      id: Xc(),
      page: Math.max(1, Math.floor(Number(u.page) || 1)),
      pane: u.pane === "translated" ? "translated" : "source",
      quote: f,
      note: `${u.note || ""}`.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return a((w) => el([m, ...w])), o == null || o(), m;
  }, [o]), l = N((u, f) => {
    const m = `${f || ""}`.trim();
    a((w) => w.map((g) => g.id === u ? { ...g, note: m } : g));
  }, []), c = N((u) => {
    a((f) => f.filter((m) => m.id !== u));
  }, []), i = N(async (u = "") => {
    var m, w;
    const f = nl(u, r);
    try {
      return await ((w = (m = navigator.clipboard) == null ? void 0 : m.writeText) == null ? void 0 : w.call(m, f)), !0;
    } catch (g) {
      return console.error("[reader-notes] copy failed", g), !1;
    }
  }, [r]), d = q(() => tl(r), [r]);
  return {
    notes: r,
    groups: d,
    addFromQuote: s,
    updateNote: l,
    remove: c,
    exportMarkdown: i,
    count: r.length
  };
}
const on = "download-toast";
function sl({
  title: e = p("k_327d59b5"),
  status: t = p("k_90ae404e"),
  meta: n = p("k_138c396c"),
  percent: r = NaN,
  tone: a = "progress"
}) {
  const o = Number.isFinite(r) ? Math.max(4, Math.min(100, Number(r) || 0)) : 18;
  return /* @__PURE__ */ z("div", { className: "download-toast-card reader-floating-surface", "data-tone": a, "aria-live": "polite", children: [
    /* @__PURE__ */ z("div", { className: "download-toast-head", children: [
      /* @__PURE__ */ h("div", { id: "download-toast-title", className: "download-toast-title", children: e }),
      /* @__PURE__ */ h("div", { id: "download-toast-status", className: "download-toast-status", children: t })
    ] }),
    /* @__PURE__ */ h("div", { className: "download-toast-track", children: /* @__PURE__ */ h("span", { id: "download-toast-bar", className: "download-toast-bar", style: { width: `${o}%` } }) }),
    /* @__PURE__ */ h("div", { id: "download-toast-meta", className: "download-toast-meta", children: n })
  ] });
}
function il(e = {}) {
  const {
    visible: t = !1,
    title: n = p("k_327d59b5"),
    status: r = p("k_90ae404e"),
    meta: a = p("k_138c396c"),
    percent: o = NaN,
    tone: s = "progress"
  } = e;
  if (!t) {
    qt.dismiss(on);
    return;
  }
  qt.custom(
    () => /* @__PURE__ */ h(sl, { title: n, status: r, meta: a, percent: o, tone: s }),
    { id: on, duration: 1 / 0 }
  );
}
function cl() {
  const e = N((t) => {
    t && (t.setState = il, t.hide = () => qt.dismiss(on));
  }, []);
  return /* @__PURE__ */ z(At, { children: [
    /* @__PURE__ */ h(zo, { position: "bottom-right" }),
    /* @__PURE__ */ h("download-toast", { style: { display: "none" }, "aria-hidden": "true", ref: e })
  ] });
}
const ll = un(() => import("./ReaderFavoritesPanel-ph6d2Lf6.js").then((e) => ({ default: e.ReaderFavoritesPanel }))), dl = un(() => import("./ReaderMarkdownPanel-DTPGstcK.js").then((e) => ({ default: e.ReaderMarkdownPanel }))), ul = un(() => import("./ReaderAiPanel-DcFh5eCN.js").then((e) => ({ default: e.ReaderAiPanel })));
function Jt(e) {
  const t = x(!1);
  return e && (t.current = !0), t.current;
}
function fl(e) {
  return "workspace";
}
function ml(e) {
  const t = e.sourceOnly || !e.translatedUrl, n = !!(e.overlayContentAvailable && e.liveTranslationVisible && !e.assistantOpen), a = e.assistantPdfPane || (e.assistantOpen && e.mode === "compare" ? "source" : e.mode);
  return {
    kind: n ? "live-overlay" : a === "compare" ? "final-compare" : a === "translated" ? "translated-only" : "source-only",
    visibleMode: a,
    compareMode: a === "compare",
    showSource: n || a !== "translated",
    showTranslated: a === "translated" || a === "compare",
    overlayOnSource: n,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: t
  };
}
function pl(e, t) {
  return e === "compare" ? t ? !0 : null : !1;
}
function Sr(e, t) {
  var n, r, a, o;
  return e === "compare" ? null : (t == null ? void 0 : t.assistantPanel) === "markdown" || (t == null ? void 0 : t.assistantPanel) === "ai" ? t.assistantPanel : ((n = t == null ? void 0 : t.splitLayout) == null ? void 0 : n.left) === "ai" || ((r = t == null ? void 0 : t.splitLayout) == null ? void 0 : r.right) === "ai" ? "ai" : ((a = t == null ? void 0 : t.splitLayout) == null ? void 0 : a.left) === "markdown" || ((o = t == null ? void 0 : t.splitLayout) == null ? void 0 : o.right) === "markdown" ? "markdown" : null;
}
function hl() {
  const e = js(), { boot: t, panes: n, sessionFiles: r, tools: a, session: o } = e, [s, l] = C(() => Sr(e.mode, Te(e.viewStateKey))), [c, i] = C(null), [d, u] = C(null), [f, m] = C(!1), w = x(e.viewStateKey), g = x(null), y = s !== null, v = e.liveTranslationAvailable || e.liveTranslation.pagesByPage.size > 0, P = ml({
    mode: e.mode,
    sourceOnly: e.sourceOnly,
    translatedUrl: r.translatedUrl,
    overlayContentAvailable: v,
    liveTranslationVisible: f,
    assistantOpen: y,
    assistantPdfPane: c
  }), S = P.sourceViewOnly, b = P.visibleMode, [k, A] = C(!1), E = N(() => A(!0), []), O = N(() => A((U) => !U), []), _ = al(
    { jobId: o.jobId, documentId: o.documentId },
    { onAfterAdd: E }
  ), T = N((U) => {
    _.addFromQuote(U), e.clearSelection();
  }, [_.addFromQuote, e.clearSelection]), R = N((U) => {
    e.goToPage(U.page, U.pane === "translated" ? "translated" : "source");
  }, [e.goToPage]), I = N(
    () => _.exportMarkdown(o.title || ""),
    [_.exportMarkdown, o.title]
  );
  $(() => {
    u(null), m(!0), A(!1);
  }, [e.viewStateKey]), $(() => {
    e.session.jobTerminal && m(!1);
  }, [e.session.jobTerminal]), $(() => {
    if (!t.loading) {
      if (w.current !== e.viewStateKey) {
        w.current = e.viewStateKey;
        const U = Te(e.viewStateKey);
        l(Sr(e.mode, U)), i(null);
        return;
      }
      Tt(e.viewStateKey, { assistantPanel: s, splitLayout: null });
    }
  }, [s, t.loading, e.mode, e.viewStateKey]), $(() => {
    if (!(t.loading || t.failed)) {
      if (g.current !== e.viewStateKey) {
        g.current = e.viewStateKey;
        const U = Te(e.viewStateKey), ce = S ? "source" : U == null ? void 0 : U.mode;
        ce && ce !== e.mode && e.setModeKeepingPage(ce);
        return;
      }
      Tt(e.viewStateKey, { mode: e.mode });
    }
  }, [t.failed, t.loading, e.mode, e.setModeKeepingPage, e.viewStateKey, S]);
  const M = s || (e.mode === "compare" ? "compare" : "reading"), D = Jt(a.isOpen("favorites")), L = Jt(s === "markdown"), j = Jt(s === "ai");
  Js({
    mode: b,
    sourceOnly: e.sourceOnly,
    setMode: e.setModeKeepingPage,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    currentPage: e.currentPage,
    numPages: n.hudNumPages,
    goToPage: e.goToPage,
    enabled: e.showHud
  });
  const H = N(() => {
    a.close();
  }, [a]), Z = N(() => {
    l(null), i(null), u(null);
  }, []), oe = N((U) => {
    const ce = b === "translated" ? "translated" : "source";
    e.jumpToAnchor(U, ce);
  }, [e.jumpToAnchor, b]), ae = N((U) => {
    o.refreshCommittedDocument(U);
  }, [o.refreshCommittedDocument]), re = N((U) => {
    a.close(), i(null);
    const ce = pl(U, e.liveTranslationAvailable);
    ce !== null && m(ce), e.setModeKeepingPage(U);
  }, [e.liveTranslationAvailable, e.setModeKeepingPage, a]), ie = q(() => !v || !P.showSource ? null : /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      className: `reader-live-translation-toggle${f ? " is-active" : ""}`,
      onClick: () => m((U) => !U),
      "aria-pressed": f,
      title: f ? p("k_5a95b341") : p("k_a5e75bbb"),
      children: p("k_647e0016")
    }
  ), [v, P.showSource, f]), B = N((U) => {
    l(U), U !== "ai" && u(null);
  }, []), K = N((U) => {
    if (U === "notes") {
      O();
      return;
    }
    if (U === "markdown" || U === "ai") {
      s === U ? (l(null), i(null), u(null)) : (l(U), i(null), U !== "ai" && u(null));
      return;
    }
    a.toggle(U);
  }, [s, O, a]), X = k ? "notes" : s ?? a.active, Q = N((U) => {
    const ce = U.pane === "translated" && !S ? "translated" : "source";
    u(U), l("ai"), i(ce), e.clearSelection();
  }, [e.clearSelection, S]), ue = q(() => ({
    bindShell: e.shell.bindShell,
    shellEl: e.shell.shellEl,
    shellWidth: e.shell.shellWidth,
    userZoom: e.userZoom,
    onZoomChange: e.onZoomChange,
    rowHeights: e.rowHeights,
    mountSource: e.panes.mountSource,
    mountTranslated: e.panes.mountTranslated,
    onMetrics: e.panes.onMetrics,
    onNumPagesChange: e.panes.onNumPages,
    sourceUrl: e.sessionFiles.sourceUrl,
    translatedUrl: e.sessionFiles.translatedUrl,
    sourceFile: e.sessionFiles.sourceFile,
    translatedFile: e.sessionFiles.translatedFile,
    regions: o.regions,
    readerMetadata: o.readerMetadata,
    activeRegion: e.activeRegion,
    onSelectRegion: e.selectRegion,
    sourceOnly: e.sourceOnly,
    sourceViewOnly: S,
    download: e.download,
    goToPage: e.goToPage,
    assistant: { select: B, close: Z }
  }), [
    e.shell,
    e.userZoom,
    e.onZoomChange,
    e.rowHeights,
    e.panes,
    e.sessionFiles,
    o.regions,
    o.readerMetadata,
    e.activeRegion,
    e.selectRegion,
    e.sourceOnly,
    S,
    e.download,
    e.goToPage,
    B,
    Z
  ]), ge = q(() => ({
    currentPage: e.currentPage,
    numPages: n.hudNumPages
  }), [e.currentPage, n.hudNumPages]), he = [
    $a,
    `is-workspace-${M}`,
    y ? "is-assistant-open" : "",
    P.overlayOnSource ? "is-live-translation-overlay" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ h(Pi, { value: ue, hud: ge, children: /* @__PURE__ */ z("div", { className: he, "data-reader-engine": "react-pdf", "data-reader-workspace": M, children: [
    /* @__PURE__ */ h(Tc, { loading: t.loading, failed: t.failed, text: t.text, percent: t.percent, regionsError: !!o.readerErrors.regions, metadataError: !!o.readerErrors.metadata }),
    /* @__PURE__ */ h(Zs, { onBeforeClose: o.prepareClose }),
    /* @__PURE__ */ h(
      xi,
      {
        mode: b,
        documentReady: !!o.jobId,
        sourceViewOnly: S,
        onModeChange: re,
        liveTranslation: v ? {
          visible: f,
          state: e.liveTranslation,
          onToggle: () => m((U) => !U)
        } : null
      }
    ),
    /* @__PURE__ */ h(Ci, { active: s }),
    y ? /* @__PURE__ */ h(vc, {}) : null,
    e.showHud ? /* @__PURE__ */ h(Yc, { activeTool: X, noteCount: _.count, onToggleTool: K }) : null,
    /* @__PURE__ */ h(Ei, { paneComposition: P, markdownSplit: s === "markdown", assistantSplit: y, liveTranslation: e.liveTranslation, sourcePaneAction: ie }),
    e.showHud ? /* @__PURE__ */ h(
      Zc,
      {
        mode: b,
        modeControls: null
      }
    ) : null,
    /* @__PURE__ */ z(go, { fallback: null, children: [
      D ? /* @__PURE__ */ h(ll, { open: a.isOpen("favorites"), jobId: o.jobId, documentId: o.documentId, onClose: H, onJumpPage: e.goToPage }) : null,
      L ? /* @__PURE__ */ h(dl, { open: s === "markdown", jobId: o.jobId, sourceOnly: e.sourceOnly, layout: "workspace", side: "right", onClose: Z }) : null,
      j ? /* @__PURE__ */ h(ul, { open: s === "ai", jobId: o.jobId, documentId: o.documentId, sessionIdentity: o.sessionIdentity, layout: fl(e.mode), side: "right", selectionContext: d, onClearSelectionContext: () => u(null), onClose: Z, onJumpCitation: oe, onDocumentCommitted: ae }, o.documentId || o.jobId || "reader-ai-pending") : null
    ] }),
    /* @__PURE__ */ h(
      Rc,
      {
        open: k,
        groups: _.groups,
        count: _.count,
        onClose: () => A(!1),
        onJump: R,
        onUpdateNote: _.updateNote,
        onRemove: _.remove,
        onExport: I
      }
    ),
    /* @__PURE__ */ h(Mc, { selection: e.selection, onDismiss: e.clearSelection, onAskAi: Q, onAddNote: T }),
    /* @__PURE__ */ h(cl, {})
  ] }) });
}
function Ul() {
  return /* @__PURE__ */ h(hl, {});
}
export {
  pn as A,
  Ul as R,
  hl as a,
  Pc as b,
  jl as c,
  Cl as d,
  xl as e,
  $l as f,
  zl as g,
  Ll as h,
  Dl as i,
  Fl as j,
  Ol as r
};
//# sourceMappingURL=ReaderApp-CV4kzYam.js.map
