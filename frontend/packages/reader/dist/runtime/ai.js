import { a as re, b as ae, d as ne, e as se, c as ie, f as oe, g as ce, h as de, j as ue, k as le, i as fe, l as me, m as Ae, n as pe, o as ge, p as he, q as ye, t as ve, u as $e, r as Ie, v as Se, w as we, x as Ce, y as Ee, s as be, z as ke } from "../answer-enhance-HajrqUpu.js";
import { M as Me, b as Ne, c as Re, a as Te, l as xe, m as He, s as Fe, d as Le, t as Pe, v as De } from "../answer-quote-C6V12zVh.js";
import { b as ze, c as Ue, a as Xe, d as Be, l as Ge, s as Ke } from "../ask-answerer--8DnuY26.js";
import { t as T } from "../i18n-Bsr2eycf.js";
import { C as je, M as Qe, h as We, n as Je, a as Ve, b as Ye, r as Ze, s as et } from "../config-CMSbavVs.js";
import { Marked as x } from "marked";
import { p as H } from "../markdown-math-CgnL-C9d.js";
const w = "CITE_", C = "";
function v(t) {
  return `${t}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function F(t) {
  const a = [];
  return { text: `${t ?? ""}`.replace(/\[(\d+)\]/g, (n, o) => {
    const d = `${w}${a.length}${C}`;
    return a.push(o), d;
  }), refs: a };
}
function L(t, a) {
  return a.length ? `${t ?? ""}`.replace(
    new RegExp(`${w}(\\d+)${C}`, "g"),
    (r, n) => {
      const o = a[Number(n)];
      return o != null ? `[${o}]` : "";
    }
  ) : t;
}
function J(t) {
  return v(t || "").replace(/`([^`\n]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />");
}
function P(t) {
  if (typeof t == "string") return t;
  const a = t;
  return `${(a == null ? void 0 : a.raw) ?? (a == null ? void 0 : a.text) ?? ""}`;
}
const $ = new x();
$.setOptions({ gfm: !0, breaks: !0 });
$.use({
  renderer: {
    html: (t) => v(P(t))
  }
});
const D = /^\s*(?:javascript|vbscript|data:text\/html)/i;
function O(t) {
  const a = globalThis.document;
  if (!a)
    return v(t);
  const r = a.createElement("template");
  r.innerHTML = t;
  const n = r.content;
  return n.querySelectorAll("script, iframe, object, embed, base, link, meta, form").forEach((o) => o.remove()), n.querySelectorAll("*").forEach((o) => {
    for (const d of [...o.attributes]) {
      const i = d.name.toLowerCase();
      if (i.startsWith("on") || i === "srcdoc") {
        o.removeAttribute(d.name);
        continue;
      }
      if ((i === "href" || i === "src" || i === "xlink:href") && D.test(d.value)) {
        o.removeAttribute(d.name);
        continue;
      }
      i === "target" && o.removeAttribute(d.name);
    }
  }), r.innerHTML;
}
const f = /* @__PURE__ */ new Map(), z = 48;
function V(t) {
  const a = `${t || ""}`.trim();
  return a ? f.get(a) ?? null : null;
}
function U(t, a) {
  const r = `${t || ""}`.trim();
  if (r)
    for (f.has(r) && f.delete(r), f.set(r, a); f.size > z; ) {
      const n = f.keys().next().value;
      if (n == null) break;
      f.delete(n);
    }
}
async function Y(t) {
  const a = `${t || ""}`;
  if (!a.trim()) return "";
  const r = f.get(a);
  if (r != null) return r;
  const { text: n, refs: o } = F(a), d = await H(n, (l) => {
    const p = String($.parse(l, { async: !1 }));
    return O(p);
  }), i = L(d, o);
  return U(a, i), i;
}
const X = 20, I = 18;
function B(t = {}) {
  const r = (Array.isArray(t == null ? void 0 : t.messages) ? t.messages : []).find(
    (o) => (o == null ? void 0 : o.role) === "user" && `${(o == null ? void 0 : o.text) || ""}`.trim()
  ), n = `${(r == null ? void 0 : r.text) || (t == null ? void 0 : t.title) || ""}`.replace(/\s+/g, " ").trim();
  return n ? n.length > I ? `${n.slice(0, I).trim()}…` : n : T("k_1b7abf96");
}
function S({
  sessions: t = [],
  activeId: a = ""
} = {}) {
  return (Array.isArray(t) ? t : []).map((r) => ({
    id: `${(r == null ? void 0 : r.id) || ""}`,
    title: B(r),
    updatedAt: Number(r == null ? void 0 : r.updatedAt) || 0,
    messageCount: Array.isArray(r == null ? void 0 : r.messages) ? r.messages.length : 0,
    active: `${(r == null ? void 0 : r.id) || ""}` == `${a}`
  })).filter((r) => r.id).sort((r, n) => n.updatedAt - r.updatedAt);
}
function G({ sessions: t = [], activeId: a = "" } = {}, r = X) {
  const n = Array.isArray(t) ? [...t] : [];
  if (n.length <= r)
    return n;
  const d = n.sort(
    (i, l) => (Number(l == null ? void 0 : l.updatedAt) || 0) - (Number(i == null ? void 0 : i.updatedAt) || 0)
  ).slice(0, r);
  if (a && !d.some((i) => `${i == null ? void 0 : i.id}` == `${a}`)) {
    const i = n.find((l) => `${l == null ? void 0 : l.id}` == `${a}`);
    i && (d[d.length - 1] = i);
  }
  return d;
}
const K = "retainpdf-ai-chat-v1:";
function q(t) {
  return `${K}${`${t || ""}`.trim()}`;
}
function m() {
  try {
    return Date.now();
  } catch {
    return 0;
  }
}
function h(t, a) {
  return { id: t, title: "", createdAt: a, updatedAt: a, messages: [], history: [] };
}
function Z({
  jobId: t = "",
  storage: a = globalThis.localStorage || null
} = {}) {
  const r = q(t), n = !!(`${t || ""}`.trim() && a);
  let o = 0;
  function d() {
    return o += 1, `s-${m().toString(36)}-${o}`;
  }
  function i() {
    var u;
    const s = { activeId: "", sessions: [] };
    if (!n)
      return s;
    let e = null;
    try {
      const c = a.getItem(r);
      e = c ? JSON.parse(c) : null;
    } catch {
      return s;
    }
    if (!e || typeof e != "object")
      return s;
    if (Array.isArray(e.sessions)) {
      const c = e.sessions.filter((g) => g && `${g.id || ""}`.trim());
      return { activeId: c.some((g) => `${g.id}` == `${e.activeId}`) ? `${e.activeId}` : `${((u = c[0]) == null ? void 0 : u.id) || ""}`, sessions: c };
    }
    if (Array.isArray(e.messages) || Array.isArray(e.history)) {
      const c = m(), A = {
        ...h(d(), c),
        messages: Array.isArray(e.messages) ? e.messages : [],
        history: Array.isArray(e.history) ? e.history : []
      };
      return { activeId: A.id, sessions: [A] };
    }
    return s;
  }
  function l(s) {
    var e;
    if (n)
      try {
        const u = G(s), c = u.some((A) => `${A.id}` == `${s.activeId}`) ? s.activeId : `${((e = u[0]) == null ? void 0 : e.id) || ""}`;
        a.setItem(r, JSON.stringify({ v: 2, activeId: c, sessions: u }));
      } catch {
      }
  }
  function p(s) {
    let e = s.sessions.find((u) => `${u.id}` == `${s.activeId}`);
    return e || (e = h(d(), m()), s.sessions.push(e), s.activeId = e.id), e;
  }
  function y() {
    if (!n)
      return { messages: [], history: [] };
    const s = i(), e = s.sessions.find((u) => `${u.id}` == `${s.activeId}`);
    return {
      messages: Array.isArray(e == null ? void 0 : e.messages) ? e.messages : [],
      history: Array.isArray(e == null ? void 0 : e.history) ? e.history : []
    };
  }
  function E({ messages: s = [], history: e = [] } = {}) {
    if (!n)
      return;
    const u = i(), c = p(u);
    c.messages = s.slice(-40), c.history = e.slice(-40), c.updatedAt = m(), l(u);
  }
  function b() {
    if (!n)
      return;
    const s = i(), e = p(s);
    e.messages = [], e.history = [], e.title = "", e.updatedAt = m(), l(s);
  }
  function k() {
    return n ? S(i()) : [];
  }
  function _() {
    return n ? `${i().activeId || ""}` : "";
  }
  function M() {
    if (!n)
      return "";
    const s = i(), e = h(d(), m());
    return s.sessions.push(e), s.activeId = e.id, l(s), e.id;
  }
  function N(s) {
    if (!n)
      return { messages: [], history: [] };
    const e = i();
    return e.sessions.some((u) => `${u.id}` == `${s}`) && (e.activeId = `${s}`, l(e)), y();
  }
  function R(s) {
    if (!n)
      return { messages: [], history: [] };
    const e = i(), u = `${s || e.activeId}`;
    if (e.sessions = e.sessions.filter((c) => `${c.id}` !== u), `${e.activeId}` === u) {
      const c = S(e)[0];
      e.activeId = c ? c.id : "";
    }
    if (!e.sessions.length) {
      const c = h(d(), m());
      e.sessions.push(c), e.activeId = c.id;
    }
    return l(e), y();
  }
  return {
    load: y,
    save: E,
    clear: b,
    enabled: n,
    listSessions: k,
    activeSessionId: _,
    newSession: M,
    switchSession: N,
    deleteSession: R
  };
}
export {
  je as CREDENTIALS_CHANGED_EVENT,
  Me as MAX_QUOTE_CHARS,
  X as MAX_SESSIONS,
  Qe as MISSING_MODEL_API_KEY_MESSAGE,
  re as answerDocumentIds,
  ae as armReaderAiClickShield,
  ne as buildMarkdownImageApiUrl,
  se as buildPagePreviewUrl,
  Ne as buildQuoteBlock,
  ze as buildScopedQuestion,
  ie as clearReaderAiNavigationLock,
  Ue as clearStoredConversationId,
  Re as clearThreadBranchSnapshot,
  oe as clipSnippet,
  Xe as conversationStorageKey,
  Z as createReaderAiHistoryStore,
  Be as createReaderAskAnswerer,
  Te as createReaderMarkdownAnswerer,
  ce as decorateCitationMarkdown,
  B as deriveSessionTitle,
  de as findCitationForAnswerImage,
  We as hasModelApiKey,
  ue as hydrateProtectedImages,
  le as injectCitationMarkers,
  fe as installReaderWindowOpenGuard,
  me as isAgenticCitation,
  Ae as isReaderAiNavigationLocked,
  Ge as loadStoredConversationId,
  xe as loadThreadBranchSnapshot,
  pe as lockReaderAiNavigation,
  He as mergeQuoteIntoDraft,
  ge as mountAnswerHtml,
  he as neutralizeMarkdownAnchors,
  ye as normalizeAiCitations,
  Je as notifyCredentialsChanged,
  V as peekFinalAnswerHtmlCache,
  ve as pickCitationsForAnswer,
  F as protectNumericCitations,
  Ve as readSettingsModelApiKey,
  $e as renderCitationFooter,
  Y as renderFinalAnswerHtml,
  J as renderStreamingPreviewHtml,
  Ie as resetAnswerEnhanceAdapters,
  Ye as resetReaderAiConfigAdapters,
  Se as resolveAnswerImageUrl,
  we as resolveCitationPageIdx,
  Ce as resolveCitationPageNumber,
  Ze as resolveReaderAiConfig,
  L as restoreNumericCitations,
  Ee as revokeHydratedImageUrls,
  Fe as sanitizeAssistantAnswer,
  Ke as saveStoredConversationId,
  Le as saveThreadBranchSnapshot,
  be as setAnswerEnhanceAdapters,
  et as setReaderAiConfigAdapters,
  ke as shouldIgnoreReaderAiNavEvent,
  S as summarizeSessions,
  Pe as threadBranchStorageKey,
  G as trimSessions,
  De as visiblePathFromSnapshot
};
//# sourceMappingURL=ai.js.map
