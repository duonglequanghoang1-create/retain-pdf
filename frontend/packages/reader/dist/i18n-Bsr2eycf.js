let a = "zh", c = { zh: {}, vi: {} }, L = /* @__PURE__ */ new Set();
function f(t, n) {
  var i;
  const e = c[a], r = (e == null ? void 0 : e[t]) ?? ((i = c.zh) == null ? void 0 : i[t]);
  return typeof r != "string" ? (L.has(t) || (L.add(t), console.warn(`[i18n] missing message for key: ${t}`)), t) : !n || n.length === 0 ? r : r.replace(/\{\{(\d+)\}\}/g, (s, l) => {
    const o = Number(l);
    return o < n.length ? String(n[o]) : s;
  });
}
export {
  f as t
};
//# sourceMappingURL=i18n-Bsr2eycf.js.map
