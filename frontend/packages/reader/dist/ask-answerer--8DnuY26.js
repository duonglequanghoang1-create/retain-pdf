import { r as X } from "./config-CMSbavVs.js";
import { t as i } from "./i18n-Bsr2eycf.js";
const k = "retainpdf.reader.ai.conversation.v1:";
function p(e = {}) {
  const n = `${e.jobId || ""}`.trim(), r = `${e.documentId || ""}`.trim();
  return r ? `${k}doc:${r}` : n ? `${k}job:${n}` : `${k}anonymous`;
}
function E(e) {
  const n = `${e.jobId || ""}`.trim();
  return n ? `${k}job:${n}` : "";
}
function w() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function T(e = {}) {
  const n = w();
  if (!n)
    return "";
  try {
    const r = p(e), a = `${n.getItem(r) || ""}`.trim();
    if (a) return a;
    const o = `${e.documentId || ""}`.trim() ? E(e) : "", u = o ? `${n.getItem(o) || ""}`.trim() : "";
    return u && n.setItem(r, u), u;
  } catch {
    return "";
  }
}
function G(e, n) {
  const r = `${n || ""}`.trim(), a = w();
  if (!(!a || !r))
    try {
      a.setItem(p(e), r);
    } catch {
    }
}
function _(e = {}) {
  const n = w();
  if (n)
    try {
      n.removeItem(p(e));
      const r = `${e.documentId || ""}`.trim() ? E(e) : "";
      r && n.removeItem(r);
    } catch {
    }
}
const J = "/api/v1";
function O() {
  throw new Error("ask not injected (provide ask impl via createReaderAskAnswerer)");
}
function j() {
  return Promise.resolve(null);
}
const z = 240;
function H(e = "", n = z) {
  const r = `${e}`.replace(/\s+/g, " ").trim();
  return r.length <= n ? r : `${r.slice(0, n).trim()}…`;
}
function V({ question: e = "", scope: n = "document", context: r = null, resolveQuote: a = null } = {}) {
  const o = `${e}`.trim();
  if (!o)
    return "";
  if (n === "selection") {
    const u = typeof a == "function" && r ? a(r) : null, s = H((u == null ? void 0 : u.quoteText) || (r == null ? void 0 : r.quoteText) || "");
    if (s) {
      const m = (r == null ? void 0 : r.pane) === "translated" ? i("k_647e0016") : i("k_4d69dbdf"), c = (r == null ? void 0 : r.kind) === "formula" ? i("k_3f27035a") : (r == null ? void 0 : r.kind) === "table" ? i("k_150074c2") : (r == null ? void 0 : r.kind) === "figure" ? i("k_be8da62e") : (r == null ? void 0 : r.kind) === "text" ? i("k_f4d3dab8") : i("k_70a1195f");
      return i("k_d3a766be", [m, c, s, o]);
    }
    if (r != null && r.page)
      return i("k_7e4c804c", [Number(r.page), o]);
  }
  return n === "page" && (r != null && r.page) ? i("k_5cc8656c", [Number(r.page), o]) : o;
}
function Z({
  jobId: e = "",
  documentId: n = "",
  apiPrefix: r = J,
  ask: a = O,
  documentByJobId: o = j,
  resolveQuote: u = null,
  // 前端凭据设置里的模型 API Key(与翻译流程同源),按请求随问答一起传给后端
  llmConfig: s = X
} = {}) {
  const m = `${n || ""}`.trim();
  let c = null, d = T({
    jobId: e,
    documentId: m
  });
  function v() {
    return c || (c = (async () => {
      if (m) return m;
      try {
        const t = await o(r, e);
        return `${(t == null ? void 0 : t.document_id) || ""}`.trim();
      } catch {
        return "";
      }
    })()), c;
  }
  function A(t, l = "") {
    const f = `${t || ""}`.trim();
    f && (d = f, G({ jobId: e, documentId: l }, f));
  }
  async function S({
    question: t = "",
    scope: l = "document",
    context: f = null,
    onToolEvent: C = null,
    onProgressEvent: K = null,
    onAgentOperationEvent: R = null,
    onAgentConfirmationRequiredEvent: D = null,
    onAgentSessionEvent: P = null,
    onAnswerDelta: B = null,
    onCompress: L = null,
    parentId: M = "",
    regenerate: U = !1,
    userMessageId: q = "",
    assistantMessageId: F = "",
    assistantMode: N = "reading",
    /** 取消信号：中止 SSE；aborted 后不回写会话粘性（防旧流污染新会话） */
    signal: $ = null
  } = {}) {
    const h = V({ context: f, question: t, resolveQuote: u, scope: l });
    if (!h)
      throw new Error(i("k_c0af56b0"));
    const g = typeof s == "function" ? s() : s || {}, Q = `${g.apiKey || ""}`.trim(), I = await v();
    if (!I && `${e || ""}`.trim())
      throw new Error(i("k_d9d2e953"));
    d || (d = T({ jobId: e, documentId: I }));
    const y = await a({
      question: h,
      documentId: I,
      // document_id is the durable knowledge/operation identity. A job is an
      // immutable pipeline attempt and may be a retry/render child without
      // its own document.v1 or Markdown. Once the document is known, letting
      // the backend resolve its authoritative readable artifacts prevents the
      // Reader from pinning AI to a transient job directory.
      jobId: I ? "" : `${e || ""}`.trim(),
      conversationId: d,
      parentId: `${M || ""}`.trim(),
      regenerate: !!U,
      userMessageId: `${q || ""}`.trim(),
      assistantMessageId: `${F || ""}`.trim(),
      assistantMode: N,
      onToolEvent: C,
      onProgressEvent: K,
      onAgentOperationEvent: R,
      onAgentConfirmationRequiredEvent: D,
      onAgentSessionEvent: P,
      onAnswerDelta: B,
      onCompress: L,
      llmApiKey: Q,
      llmBaseUrl: `${g.baseUrl || ""}`.trim(),
      llmModel: `${g.model || ""}`.trim(),
      signal: $
    }), b = `${(y == null ? void 0 : y.conversationId) || ""}`.trim();
    return b && !($ != null && $.aborted) && A(b, I), {
      ...y,
      conversationId: b || d,
      scope: l
    };
  }
  return {
    answer: S,
    getConversationId: () => d,
    setConversationId: (t, l = "") => {
      A(t, l);
    },
    clearConversationId: (t = "") => {
      d = "", _({ jobId: e, documentId: t }), t && _({ documentId: t }), _({ jobId: e });
    },
    getDocumentId: () => v(),
    ensureLoaded: async () => !!await v()
  };
}
export {
  p as a,
  V as b,
  _ as c,
  Z as d,
  T as l,
  G as s
};
//# sourceMappingURL=ask-answerer--8DnuY26.js.map
