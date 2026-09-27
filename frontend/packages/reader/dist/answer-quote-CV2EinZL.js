import { n as T } from "./markdown-payload-kK3ewW_I.js";
import { t as m } from "@retainpdf/i18n";
import { l as I } from "./ask-answerer-I2yuqneN.js";
function B(t = null) {
  return T(t).content.trim();
}
function y(t = "") {
  return `${t}`.replace(/```[\s\S]*?```/g, " ").replace(/!\[[^\]]*]\([^)]+\)/g, " ").replace(/\[[^\]]+]\([^)]+\)/g, " ").replace(/[#>*_`~|[\]()]/g, " ").replace(/\s+/g, " ").trim();
}
function O(t = "") {
  const r = y(t).toLowerCase(), e = r.match(/[a-z0-9][a-z0-9-]{1,}/g) || [], n = r.match(/[\u4e00-\u9fff]{2,}/g) || [];
  return [.../* @__PURE__ */ new Set([...e, ...n])].slice(0, 40);
}
function v(t = "") {
  const r = [];
  let e = m("k_13ade251"), n = [];
  for (const o of `${t}`.split(/\r?\n/)) {
    const i = o.match(/^(#{1,4})\s+(.+?)\s*$/);
    i && n.join(`
`).trim() && (r.push({
      title: e,
      text: n.join(`
`).trim()
    }), n = []), i && (e = i[2].trim()), n.push(o);
  }
  return n.join(`
`).trim() && r.push({
    title: e,
    text: n.join(`
`).trim()
  }), r;
}
function L(t, r) {
  const e = y(`${t.title}
${t.text}`).toLowerCase();
  return r.reduce((n, o) => n + (e.includes(o) ? 1 : 0), 0);
}
function F(t = "", r = 420) {
  const e = y(t);
  return e.length <= r ? e : `${e.slice(0, r).trim()}...`;
}
function D(t, r) {
  return r.length ? [
    m("k_6ec6da9b"),
    ...r.map((n, o) => `${o + 1}. ${n.title}：${F(n.text)}`),
    "",
    m("k_064ec7c3", [t])
  ].join(`
`) : m("k_5edf2f76");
}
function U({
  loadMarkdownPayload: t,
  maxSections: r = 3
} = {}) {
  let e = null, n = "";
  async function o(c) {
    return n || (e = await (t == null ? void 0 : t(c)), n = B(e), n);
  }
  async function i({ jobId: c = "", question: s = "", scope: u = "document", context: d = null } = {}) {
    const f = await o(c);
    if (!f)
      throw new Error(m("k_17e34910"));
    const R = O(`${s} ${d != null && d.page ? m("k_62866db3", [d.page]) : ""}`), _ = v(f).map((a) => ({
      ...a,
      score: L(a, R)
    })).sort((a, h) => h.score - a.score).filter((a, h) => a.score > 0 || h < r).slice(0, r);
    return {
      answer: D(s, _),
      citations: _.map((a) => a.title),
      scope: u
    };
  }
  return {
    answer: i,
    ensureLoaded: o
  };
}
const M = /\[\s*(p\d+[-_]b\d+)\s*\]/gi, x = new RegExp("(?<![\\w/])(p\\d+[-_]b\\d+)(?![\\w/])", "gi");
function $(t) {
  return `${t || ""}`.trim().toLowerCase().replace(/_/g, "-");
}
const N = /```[\s\S]*?(?:```|$)|`[^`\n]+`/g, j = "CODE_", k = "";
function q(t, r = []) {
  let e = `${t || ""}`;
  if (!e) return "";
  const n = [];
  e = e.replace(N, (i) => {
    const c = `${j}${n.length}${k}`;
    return n.push(i), c;
  });
  const o = /* @__PURE__ */ new Map();
  for (const i of r) {
    const c = $(`${i.block_id || ""}`);
    if (!c) continue;
    const s = `${i.ref ?? ""}`.trim();
    s && o.set(c, s);
  }
  return e = e.replace(M, (i, c) => {
    const s = o.get($(c));
    return s ? `[${s}]` : "";
  }), e = e.replace(x, (i, c) => {
    const s = o.get($(c));
    return s ? `[${s}]` : "";
  }), e = e.replace(/\bblock_id\s*[=:：]\s*\S+/gi, ""), e = e.replace(/\bpage_idx\s*[=:：]\s*\d+/gi, ""), e = e.replace(/[ \t]{2,}/g, " "), e = e.replace(/ *\n/g, `
`), e = e.trim(), n.length && (e = e.replace(
    new RegExp(`${j}(\\d+)${k}`, "g"),
    (i, c) => n[Number(c)] ?? ""
  )), e;
}
const E = "retainpdf.reader.ai.thread-branch.v1:";
function p(t) {
  return typeof t == "string" ? { jobId: `${t || ""}`.trim(), documentId: "" } : {
    jobId: `${(t == null ? void 0 : t.jobId) || ""}`.trim(),
    documentId: `${(t == null ? void 0 : t.documentId) || ""}`.trim()
  };
}
function l(t, r = "") {
  const { jobId: e, documentId: n } = p(t), o = n ? "doc" : "job", i = n || e || "anonymous", c = `${r || ""}`.trim();
  return c ? `${E}${o}:${i}:conv:${c}` : `${E}${o}:${i}`;
}
function S() {
  try {
    return typeof globalThis.localStorage > "u" ? null : globalThis.localStorage;
  } catch {
    return null;
  }
}
function g(t) {
  return !!t && typeof t == "object" && !Array.isArray(t);
}
function X(t) {
  if (!g(t) || typeof t.type != "string") return;
  const r = typeof t.reason == "string" ? t.reason : void 0;
  return r ? { type: t.type, reason: r } : { type: t.type };
}
function w(t) {
  if (!g(t)) return null;
  const r = `${t.id || ""}`.trim(), e = t.role === "user" || t.role === "assistant" ? t.role : null;
  if (!r || !e) return null;
  const n = Array.isArray(t.citations) ? t.citations : void 0, o = typeof t.progress == "string" ? t.progress : void 0;
  let i = X(t.status);
  return (i == null ? void 0 : i.type) === "running" && (i = { type: "incomplete", reason: "cancelled" }), {
    id: r,
    role: e,
    content: typeof t.content == "string" ? t.content : "",
    ...o ? { progress: o } : {},
    ...n != null && n.length ? { citations: n } : {},
    ...i ? { status: i } : {}
  };
}
function J(t) {
  var i;
  if (!g(t) || t.version !== 1 || !Array.isArray(t.items))
    return null;
  const r = [];
  for (const c of t.items) {
    if (!g(c)) continue;
    const s = w(c.message);
    if (!s) continue;
    const u = c.parentId === null || c.parentId === void 0 ? null : `${c.parentId}`.trim() || null;
    r.push({ parentId: u, message: s });
  }
  if (!r.length) return null;
  const e = t.headId, n = e == null ? ((i = r[r.length - 1]) == null ? void 0 : i.message.id) ?? null : `${e}`.trim() || null, o = `${t.conversationId || ""}`.trim();
  return { version: 1, headId: n, items: r, ...o ? { conversationId: o } : {} };
}
function b(t, r) {
  if (!t) return null;
  try {
    const e = J(JSON.parse(t));
    if (!e) return null;
    const n = `${e.conversationId || ""}`.trim();
    return n && r && n !== r ? null : e;
  } catch {
    return null;
  }
}
function C(t, r, e, n) {
  const o = {
    version: 1,
    headId: n.headId,
    items: n.items,
    ...e ? { conversationId: e } : {}
  };
  t.setItem(l(r, e), JSON.stringify(o));
}
function z(t, r, e, n, o) {
  try {
    const i = l(r, e);
    C(t, r, e, n), o && o !== i && t.removeItem(o);
  } catch {
  }
}
function H(t, r = "") {
  const e = S();
  if (!e) return null;
  try {
    const n = p(t), o = e.getItem(l(n, r)), i = b(o, r);
    if (i) return i;
    if (n.documentId && n.jobId) {
      const s = { jobId: n.jobId }, u = b(
        e.getItem(l(s, r)),
        r
      );
      if (u)
        return z(
          e,
          n,
          r,
          u,
          l(s, r)
        ), u;
    }
    if (!r) return null;
    const c = n.documentId ? [n, ...n.jobId ? [{ jobId: n.jobId }] : []] : [n];
    for (const s of c) {
      const u = b(
        e.getItem(l(s)),
        r
      );
      if (!u) continue;
      const d = `${u.conversationId || ""}`.trim(), f = n.documentId ? I({ documentId: n.documentId }) || I({ jobId: n.jobId }) : I({ jobId: n.jobId });
      if (d ? d === r : f === r)
        return n.documentId && z(
          e,
          n,
          r,
          u,
          l(s)
        ), u;
    }
    return null;
  } catch {
    return null;
  }
}
function P(t, r, e = "") {
  const n = S();
  if (!n) return;
  const o = p(t);
  if (!(!o.documentId && !o.jobId || !r.items.length))
    try {
      C(n, o, e, r);
    } catch {
    }
}
function V(t, r = "") {
  const e = S();
  if (e)
    try {
      const n = p(t);
      e.removeItem(l(n, r)), n.documentId && n.jobId && e.removeItem(l({ jobId: n.jobId }, r)), r || (e.removeItem(l(n)), n.documentId && n.jobId && e.removeItem(l({ jobId: n.jobId })));
    } catch {
    }
}
function W(t) {
  const r = new Map(t.items.map((c) => [c.message.id, c])), e = t.headId && r.get(t.headId) || t.items[t.items.length - 1];
  if (!e) return [];
  const n = [];
  let o = e;
  const i = /* @__PURE__ */ new Set();
  for (; o && !i.has(o.message.id); )
    i.add(o.message.id), n.push(o.message), o = o.parentId ? r.get(o.parentId) : void 0;
  return n.reverse();
}
const A = 600;
function Y(t) {
  const r = `${t || ""}`.replace(/\r\n?/g, `
`).trim();
  return r ? `${(r.length > A ? m("k_d62dc130", [r.slice(0, A).trimEnd()]) : r).split(`
`).map((o) => o.trim() ? `> ${o}` : ">").join(`
`)}

` : "";
}
function Z(t, r) {
  const e = `${r || ""}`;
  if (!e) return `${t || ""}`;
  const n = `${t || ""}`.trimStart();
  return n ? `${e}${n}` : e;
}
export {
  A as M,
  U as a,
  Y as b,
  V as c,
  P as d,
  H as l,
  Z as m,
  q as s,
  l as t,
  W as v
};
//# sourceMappingURL=answer-quote-CV2EinZL.js.map
