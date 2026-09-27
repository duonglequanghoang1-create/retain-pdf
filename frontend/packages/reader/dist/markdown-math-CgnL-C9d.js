import { t as m } from "./i18n-Bsr2eycf.js";
const _ = "RP_MATH_", E = "";
let p = null, $ = null;
function K(e) {
  $ = e, p = null;
}
function V() {
  $ = null, p = null;
}
function y(e) {
  return `${e}`.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function N(e) {
  return `${_}${e}${E}`;
}
const P = /[0-9A-Za-z\\{}_^()\[\]|+\-=,.:;'~*/<>!\u00b0\u00b1\u00d7\u00f7\u2212\u2202\u03b1-\u03c9\u0391-\u03a9]+/g, L = /\\[A-Za-z]+|[_^]\{/;
function j(e, t) {
  const n = new RegExp(`${_}\\d+${E}`, "g"), a = (i) => i.replace(
    P,
    (c) => L.test(c) ? t(c, !1) : c
  );
  let r = "", l = 0, o;
  for (; (o = n.exec(e)) !== null; )
    r += a(e.slice(l, o.index)) + o[0], l = o.index + o[0].length;
  return r += a(e.slice(l)), r;
}
const F = /<([futnvc]\d+-[0-9a-z]{3})\/>/g;
function S(e) {
  let t = 0;
  return { text: `${e ?? ""}`.replace(F, (a, r) => (t += 1, m("k_53c91548", [r]))), count: t };
}
function z(e, t = {}) {
  const n = [], a = S(`${e ?? ""}`);
  a.count && (s.protectedTokens += a.count, s.protectedTokens <= 5 && console.warn(
    m("k_77d0475c", [a.count])
  ));
  let r = a.text;
  const l = (o, i) => {
    const c = `${o ?? ""}`.trim();
    if (!c)
      return i ? `$$${o}$$` : `$${o}$`;
    const g = N(n.length);
    return n.push({ token: g, tex: c, display: i }), g;
  };
  return r = r.replace(/\$\$([\s\S]+?)\$\$/g, (o, i) => l(i, !0)), r = r.replace(new RegExp("(?<![\\\\$])\\$(?!\\$)((?:\\\\.|[^$\\n])+?)\\$(?!\\$)", "g"), (o, i) => `${i}`.trim() ? l(i, !1) : o), t.bareLatex && (r = j(r, l)), { text: r, slots: n };
}
const I = 20, O = /data-mml-node="mtext"[^>]*fill="red"/;
function d(e, t) {
  var l;
  const n = e, a = n == null ? void 0 : n[t];
  if (a !== void 0)
    return a;
  const r = (l = n == null ? void 0 : n.default) == null ? void 0 : l[t];
  if (r !== void 0)
    return r;
  throw new Error(m("k_4194e969", [t]));
}
async function D() {
  const [e, t, n, a, r, l] = await Promise.all([
    import("mathjax-full/js/mathjax.js"),
    import("mathjax-full/js/input/tex.js"),
    import("mathjax-full/js/output/svg.js"),
    import("mathjax-full/js/adaptors/liteAdaptor.js"),
    import("mathjax-full/js/handlers/html.js"),
    import("mathjax-full/js/input/tex/AllPackages.js")
  ]), o = d(e, "mathjax"), i = d(t, "TeX"), c = d(n, "SVG"), g = d(a, "liteAdaptor"), T = d(r, "RegisterHTMLHandler"), v = d(l, "AllPackages"), w = g();
  T(w);
  const R = o.document("", {
    InputJax: new i({
      // 方案 C：宽容渲染。`unicode` 包让 Unicode 数学符号（⟨⟩、希腊字母、
      // 运算符等）尽量直接渲染，减少严格 TeX 的报错面。
      //
      // 摘掉 `html` 包。它提供 `\href`/`\class`/`\cssId`，链接原样进 SVG，而译文
      // 是模型对 OCR 文本的输出、源头是用户上传的 PDF——不是可信输入。实测
      // `$\href{javascript:alert(1)}{x}$` 渲染出 `<a href="javascript:alert(1)">`，
      // 而实时翻译叠层是 dangerouslySetInnerHTML 直接注入，中间没有任何消毒层。
      //
      // 试过在字符串层用正则摘掉危险协议，不成立：`jav&#x61;script:` 在字符串里
      // 看着无害，浏览器解析属性时会把实体解码回 `javascript:`。能被绕过的清洗器
      // 比没有更糟，它只提供虚假的安全感。所以从根上不产生这类属性。
      //
      // 代价：文档里真有 `\href` 时不再渲染成链接，退化成失败回退显示原文。渲染
      // PDF 的 mitex 本来也不支持 `\href`，两边因此一致。
      packages: v.filter((f) => f !== "html").concat("unicode")
    }),
    OutputJax: new c({ fontCache: "none" })
  });
  return {
    convert(f, b) {
      const H = R.convert(f, { display: b }), u = w.outerHTML(H);
      if (!/<svg[\s>]/i.test(u))
        throw new Error("mathjax produced no svg");
      if (/data-mjx-error|merror/i.test(u))
        throw new Error("mathjax error node");
      if (O.test(u))
        throw new Error("mathjax undefined command");
      return u;
    }
  };
}
const s = {
  engineLoad: 0,
  convert: 0,
  lastReason: "",
  /** 最近若干条失败的公式原文，用来判断是哪一类写法出了问题。 */
  samples: [],
  /** 译文里漏还原的后端保护 token 数量。不是渲染失败，是上游漏了一步。 */
  protectedTokens: 0
};
try {
  globalThis.__retainMathFailures = s;
} catch {
}
function x(e, t, n = "") {
  const a = `${(t == null ? void 0 : t.message) || t}`;
  if (s.lastReason = a, e === "engine-load") {
    s.engineLoad += 1, console.warn(m("k_abdfccea"), a);
    return;
  }
  s.convert += 1, s.samples.length < I && s.samples.push(n), s.convert <= 5 && console.warn(m("k_c645e5f8", [s.convert]), n, a);
}
function U() {
  return p || (p = ($ ?? D)().catch((t) => {
    throw p = null, t;
  })), p;
}
function h(e, t) {
  const n = m("k_e53f20ff", [y(e)]);
  return t ? `<div class="reader-md-math reader-md-math-display reader-md-math-failed">${n}</div>` : `<span class="reader-md-math reader-md-math-inline reader-md-math-failed">${n}</span>`;
}
function Z(e, t) {
  const n = t ? "reader-md-math reader-md-math-display" : "reader-md-math reader-md-math-inline", a = t ? "div" : "span";
  return `<${a} class="${n}">${e}</${a}>`;
}
const B = [
  [/[⟨〈]/g, "\\langle "],
  [/[⟩〉]/g, "\\rangle "],
  [/∣/g, "\\mid "],
  [/‖/g, "\\| "],
  [/[≤⩽]/g, "\\le "],
  [/[≥⩾]/g, "\\ge "],
  [/≠/g, "\\ne "],
  [/≈/g, "\\approx "],
  [/≡/g, "\\equiv "],
  [/×/g, "\\times "],
  [/÷/g, "\\div "],
  [/[·⋅]/g, "\\cdot "],
  [/±/g, "\\pm "],
  [/∓/g, "\\mp "],
  [/[−–]/g, "-"],
  [/∞/g, "\\infty "],
  [/∑/g, "\\sum "],
  [/∏/g, "\\prod "],
  [/∫/g, "\\int "],
  [/√/g, "\\surd "],
  [/∂/g, "\\partial "],
  [/∇/g, "\\nabla "],
  [/→/g, "\\to "],
  [/←/g, "\\leftarrow "],
  [/⇒/g, "\\Rightarrow "],
  [/⇔/g, "\\Leftrightarrow "],
  [/∈/g, "\\in "],
  [/∉/g, "\\notin "],
  [/∀/g, "\\forall "],
  [/∃/g, "\\exists "],
  [/∅/g, "\\emptyset "],
  [/∝/g, "\\propto "],
  [/≃/g, "\\simeq "],
  [/≅/g, "\\cong "],
  [/⊥/g, "\\perp "],
  [/∥/g, "\\parallel "],
  [/[′ʹ]/g, "'"],
  [/[″ʺ]/g, "''"],
  [/Δ/g, "\\Delta "],
  [/Ω/g, "\\Omega "],
  [/μ/g, "\\mu "],
  [/λ/g, "\\lambda "],
  [/σ/g, "\\sigma "],
  [/π/g, "\\pi "],
  [/θ/g, "\\theta "],
  [/φ/g, "\\varphi "],
  [/α/g, "\\alpha "],
  [/β/g, "\\beta "],
  [/γ/g, "\\gamma "],
  [/ω/g, "\\omega "]
];
function C(e) {
  let t = `${e ?? ""}`;
  for (const [n, a] of B)
    t = t.replace(n, a);
  return G(t) ? J(t) : t;
}
function G(e) {
  const t = "(?:\\{[^{}]*\\}|\\\\[A-Za-z]+|[A-Za-z0-9*])", n = new RegExp(`[_^]${t}\\s*(?=[_^])`), a = new RegExp(`[_^]${t}\\s*'`);
  return n.test(e) || a.test(e) || /\^\s*\^/.test(e) || /__/.test(e);
}
function k(e, t) {
  let n = 0, a = t;
  for (; a < e.length; a += 1)
    if (e[a] === "{") n += 1;
    else if (e[a] === "}" && (n -= 1, n === 0)) {
      a += 1;
      break;
    }
  return { arg: e.slice(t, a), next: a };
}
function M(e, t) {
  let n = t;
  for (; n < e.length && e[n] === " "; ) n += 1;
  if (e[n] === "{") return k(e, n);
  if (e[n] === "\\") {
    let a = n + 1;
    for (; a < e.length && /[A-Za-z]/.test(e[a]); ) a += 1;
    let r = a > n + 1 ? a : a + 1;
    for (; ; ) {
      let l = r;
      for (; l < e.length && e[l] === " "; ) l += 1;
      if (e[l] !== "{") break;
      r = k(e, l).next;
    }
    return { arg: e.slice(n, r), next: r };
  }
  return { arg: e[n] ?? "", next: n + 1 };
}
function J(e) {
  const t = e.replace(/\^\s*\^/g, "^").replace(/''/g, "^{\\prime\\prime}").replace(/'/g, "^{\\prime}");
  let n = "", a = 0;
  for (; a < t.length; ) {
    const r = t[a];
    if (r !== "_" && r !== "^") {
      n += r, a += 1;
      continue;
    }
    const l = M(t, a + 1);
    let o = l.arg, i = l.next;
    for (; i < t.length; ) {
      let c = i;
      for (; c < t.length && t[c] === " "; ) c += 1;
      if (t[c] !== r) break;
      const g = M(t, c + 1);
      o = `${o}${t.slice(i, c)}${r}${g.arg}`, i = g.next;
    }
    n += `${r}{${o}}`, a = i;
  }
  return n;
}
async function X(e, t) {
  if (!t.length)
    return e;
  let n = null;
  try {
    n = await U();
  } catch (l) {
    n = null, x("engine-load", l);
  }
  const a = /* @__PURE__ */ new Map();
  let r = 0;
  for (const l of t) {
    let o;
    if (n)
      try {
        o = Z(n.convert(C(l.tex), l.display), l.display);
      } catch (i) {
        o = h(l.tex, l.display), x("convert", i, l.tex);
      }
    else
      o = h(l.tex, l.display);
    a.set(l.token, o), r += 1, r % 24 === 0 && await new Promise((i) => setTimeout(i, 0));
  }
  return A(`${e ?? ""}`, t, a);
}
function A(e, t, n) {
  if (!t.length) return e;
  const a = new RegExp(
    t.map((r) => r.token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g"
  );
  return e.replace(a, (r) => n.get(r) || r);
}
function W(e, t) {
  const n = new Map(
    t.map((a) => [a.token, h(a.tex, a.display)])
  );
  return A(`${e ?? ""}`, t, n);
}
async function Q(e, t) {
  const { text: n, slots: a } = z(e), r = t(n);
  return X(r, a);
}
export {
  X as a,
  s as b,
  V as c,
  S as d,
  z as e,
  W as m,
  C as n,
  Q as p,
  h as r,
  K as s,
  Z as w
};
//# sourceMappingURL=markdown-math-CgnL-C9d.js.map
