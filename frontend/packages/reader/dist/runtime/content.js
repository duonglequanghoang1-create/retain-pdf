import { t as u } from "../i18n-Bsr2eycf.js";
import { e as A, m as b, a as I, b as _, n as w, p as T, r as y, c as z, d as B, s as N, w as P } from "../markdown-math-CgnL-C9d.js";
import { n as H } from "../block-key-BTxcG28S.js";
const g = Object.freeze({
  sentence: { label: u("k_8cfcfc34") },
  data: { label: u("k_54b8a90b") },
  figure: { label: u("k_a66b71e2") }
});
function d(e, o) {
  return Array.isArray(e) ? [...e].sort((t, a) => {
    const s = o(t) - o(a);
    if (s !== 0)
      return s;
    const c = `${(t == null ? void 0 : t.createdAt) || ""}`, r = `${(a == null ? void 0 : a.createdAt) || ""}`;
    return c < r ? -1 : c > r ? 1 : 0;
  }) : [];
}
function f(e, o) {
  const t = [];
  for (const a of d(e, o)) {
    const s = o(a), c = t[t.length - 1];
    c && c.pageIdx === s ? c.items.push(a) : t.push({ pageIdx: s, items: [a] });
  }
  return t;
}
const l = (e) => Number((e == null ? void 0 : e.pageIdx) ?? 0);
function i(e) {
  return d(e, l);
}
function p(e) {
  return f(e, l);
}
function n(e) {
  return `${e || ""}`.split(`
`).map((o) => `> ${o}`);
}
function k({
  title: e = "",
  annotations: o = []
} = {}) {
  const t = e ? u("k_b0ea3e83", [e]) : u("k_570e6941"), a = p(o);
  if (a.length === 0)
    return u("k_304fd801", [t]);
  const s = [t, ""];
  for (const c of a) {
    s.push(u("k_cfc3c647", [c.pageIdx + 1]), "");
    for (const r of c.items)
      s.push(...n(r == null ? void 0 : r.quoteText)), r != null && r.translatedQuoteText && s.push(...n(`—— ${r.translatedQuoteText}`)), r != null && r.note && s.push("", u("k_9981949b", [r.note])), s.push("");
  }
  return s.join(`
`);
}
function m(e) {
  return {
    pageIdx: e == null ? void 0 : e.pageIdx,
    blockId: e == null ? void 0 : e.blockId
  };
}
export {
  g as ANNOTATION_KIND_META,
  m as annotationAnchor,
  k as buildAnnotationsMarkdown,
  A as extractMarkdownMath,
  p as groupAnnotationsByPage,
  f as groupByPageAndCreatedAt,
  b as materializeMarkdownMathFallbackHtml,
  I as materializeMarkdownMathHtml,
  _ as mathFailureStats,
  H as normalizeBlockKey,
  w as normalizeMathTex,
  T as parseMarkdownWithMath,
  y as renderMathFallbackHtml,
  z as resetMarkdownMathEngineLoader,
  B as revealProtectedTokens,
  N as setMarkdownMathEngineLoader,
  i as sortAnnotations,
  d as sortByPageAndCreatedAt,
  P as wrapMathSvgHtml
};
//# sourceMappingURL=content.js.map
