import { t as o } from "@retainpdf/i18n";
const h = Object.freeze({
  sentence: { label: o("k_8cfcfc34") },
  data: { label: o("k_54b8a90b") },
  figure: { label: o("k_a66b71e2") }
});
function p(e, c) {
  return Array.isArray(e) ? [...e].sort((s, u) => {
    const t = c(s) - c(u);
    if (t !== 0)
      return t;
    const f = `${(s == null ? void 0 : s.createdAt) || ""}`, r = `${(u == null ? void 0 : u.createdAt) || ""}`;
    return f < r ? -1 : f > r ? 1 : 0;
  }) : [];
}
function n(e, c) {
  const s = [];
  for (const u of p(e, c)) {
    const t = c(u), f = s[s.length - 1];
    f && f.pageIdx === t ? f.items.push(u) : s.push({ pageIdx: t, items: [u] });
  }
  return s;
}
const g = (e) => Number((e == null ? void 0 : e.pageIdx) ?? 0);
function i(e) {
  return p(e, g);
}
function l(e) {
  return n(e, g);
}
function d(e) {
  return `${e || ""}`.split(`
`).map((c) => `> ${c}`);
}
function k({
  title: e = "",
  annotations: c = []
} = {}) {
  const s = e ? o("k_b0ea3e83", [e]) : o("k_570e6941"), u = l(c);
  if (u.length === 0)
    return o("k_304fd801", [s]);
  const t = [s, ""];
  for (const f of u) {
    t.push(o("k_cfc3c647", [f.pageIdx + 1]), "");
    for (const r of f.items)
      t.push(...d(r == null ? void 0 : r.quoteText)), r != null && r.translatedQuoteText && t.push(...d(`—— ${r.translatedQuoteText}`)), r != null && r.note && t.push("", o("k_9981949b", [r.note])), t.push("");
  }
  return t.join(`
`);
}
function x(e) {
  return {
    pageIdx: e == null ? void 0 : e.pageIdx,
    blockId: e == null ? void 0 : e.blockId
  };
}
export {
  h as A,
  x as a,
  k as b,
  n as c,
  p as d,
  l as g,
  i as s
};
//# sourceMappingURL=view-model-BUJHLlQm.js.map
