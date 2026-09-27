import { jsxs as x, jsx as i, Fragment as O } from "react/jsx-runtime";
import { useId as H, useState as T, useCallback as E, useRef as L, useEffect as P, useLayoutEffect as te, createContext as ne, useContext as X, useMemo as F } from "react";
import { w as G, e as re, j as K, y as j, x as V, v as ae, a as oe, h as se, l as ie, g as le, u as ce } from "./answer-enhance-HajrqUpu.js";
import de, { setCustomComponents as ue, PreCodeNode as fe, MathInlineNode as he } from "markstream-react";
import { t as b } from "./i18n-Bsr2eycf.js";
import { createPortal as me } from "react-dom";
const pe = "retainpdf-chart", ge = 6, be = 40, we = /* @__PURE__ */ new Set(["bar", "line", "pie"]);
function ye(e) {
  if (typeof e == "number") return Number.isFinite(e) ? e : null;
  if (typeof e == "string" && e.trim()) {
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
function S(e, t = "") {
  return `${e ?? ""}`.trim() || t;
}
function $e(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const a = n, r = ye(a.value ?? a.y);
    if (r !== null && (t.push({ label: S(a.label ?? a.x, `${t.length + 1}`), value: r }), t.length >= be))
      break;
  }
  return t;
}
function xe(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const a = n, r = $e(a.points ?? a.data);
    if (r.length && (t.push({ name: S(a.name, b("k_8425e94a", [t.length + 1])), points: r }), t.length >= ge))
      break;
  }
  return t;
}
function ke(e) {
  const t = `${e || ""}`.trim();
  if (!t) return null;
  let n;
  try {
    n = JSON.parse(t);
  } catch {
    return null;
  }
  if (!n || typeof n != "object" || Array.isArray(n)) return null;
  const a = n, r = `${a.kind ?? a.type ?? ""}`.trim().toLowerCase();
  if (!we.has(r)) return null;
  const s = xe(a.series);
  if (!s.length) return null;
  const l = r === "pie" ? s.slice(0, 1) : s;
  return {
    kind: r,
    title: S(a.title),
    xLabel: S(a.xLabel ?? a.x_label),
    yLabel: S(a.yLabel ?? a.y_label),
    series: l
  };
}
function Me(e) {
  const t = e.series.flatMap((l) => l.points.map((o) => o.value)), n = Math.min(...t), a = Math.max(...t), r = Math.min(0, n), s = Math.max(0, a);
  return r === s ? { min: r, max: s + 1 } : { min: r, max: s };
}
function D(e) {
  let t = [];
  for (const n of e.series)
    n.points.length > t.length && (t = n.points);
  return t.map((n) => n.label);
}
const Z = 640, W = 300, y = { top: 16, right: 16, bottom: 44, left: 52 }, A = Z - y.left - y.right, v = W - y.top - y.bottom, Y = [
  "var(--chart-1, #4c6ef5)",
  "var(--chart-2, #f08c00)",
  "var(--chart-3, #2f9e44)",
  "var(--chart-4, #e03131)",
  "var(--chart-5, #ae3ec9)",
  "var(--chart-6, #0c8599)"
], I = (e) => Y[e % Y.length];
function Ne(e, t) {
  return Array.from({ length: 5 }, (a, r) => e + (t - e) * r / 4);
}
function ve(e) {
  const t = Math.abs(e);
  return t >= 1e4 ? `${(e / 1e3).toFixed(0)}k` : Number.isInteger(e) ? `${e}` : e.toFixed(t < 1 ? 2 : 1);
}
function _e(e) {
  return e <= 8 ? 1 : Math.ceil(e / 8);
}
function Ae({
  spec: e,
  min: t,
  max: n,
  labels: a
}) {
  const r = (o) => y.top + v - (o - t) / (n - t) * v, s = _e(a.length), l = A / Math.max(1, a.length);
  return /* @__PURE__ */ x("g", { className: "reader-answer-chart-axes", children: [
    Ne(t, n).map((o) => /* @__PURE__ */ x("g", { children: [
      /* @__PURE__ */ i(
        "line",
        {
          className: "reader-answer-chart-grid",
          x1: y.left,
          x2: y.left + A,
          y1: r(o),
          y2: r(o)
        }
      ),
      /* @__PURE__ */ i("text", { className: "reader-answer-chart-tick", x: y.left - 8, y: r(o), textAnchor: "end", dominantBaseline: "middle", children: ve(o) })
    ] }, o)),
    a.map((o, u) => u % s === 0 ? /* @__PURE__ */ i(
      "text",
      {
        className: "reader-answer-chart-tick",
        x: y.left + l * (u + 0.5),
        y: y.top + v + 18,
        textAnchor: "middle",
        children: o.length > 10 ? `${o.slice(0, 9)}…` : o
      },
      `${o}-${u}`
    ) : null),
    e.yLabel ? /* @__PURE__ */ i("text", { className: "reader-answer-chart-axis-label", x: y.left, y: y.top - 4, textAnchor: "start", children: e.yLabel }) : null,
    e.xLabel ? /* @__PURE__ */ i(
      "text",
      {
        className: "reader-answer-chart-axis-label",
        x: y.left + A,
        y: W - 6,
        textAnchor: "end",
        children: e.xLabel
      }
    ) : null
  ] });
}
function Le({ spec: e, min: t, max: n }) {
  const a = D(e), r = A / Math.max(1, a.length), s = r * 0.7, l = s / e.series.length, o = (d) => y.top + v - (d - t) / (n - t) * v, u = o(0);
  return /* @__PURE__ */ i(O, { children: e.series.map((d, c) => /* @__PURE__ */ i("g", { fill: I(c), children: d.points.map((f, g) => {
    const m = o(f.value), p = y.left + r * g + (r - s) / 2 + l * c;
    return /* @__PURE__ */ i(
      "rect",
      {
        x: p,
        y: Math.min(m, u),
        width: Math.max(1, l - 1),
        height: Math.max(1, Math.abs(u - m)),
        rx: 2,
        children: /* @__PURE__ */ i("title", { children: `${d.name} · ${f.label}: ${f.value}` })
      },
      `${f.label}-${g}`
    );
  }) }, d.name)) });
}
function Ce({ spec: e, min: t, max: n }) {
  const a = D(e), r = A / Math.max(1, a.length), s = (o) => y.top + v - (o - t) / (n - t) * v, l = (o) => y.left + r * (o + 0.5);
  return /* @__PURE__ */ i(O, { children: e.series.map((o, u) => {
    const d = o.points.map((c, f) => `${f === 0 ? "M" : "L"} ${l(f)} ${s(c.value)}`).join(" ");
    return /* @__PURE__ */ x("g", { stroke: I(u), fill: I(u), children: [
      /* @__PURE__ */ i("path", { className: "reader-answer-chart-line", d, fill: "none" }),
      o.points.map((c, f) => /* @__PURE__ */ i(
        "circle",
        {
          cx: l(f),
          cy: s(c.value),
          r: 3,
          stroke: "none",
          children: /* @__PURE__ */ i("title", { children: `${o.name} · ${c.label}: ${c.value}` })
        },
        `${c.label}-${f}`
      ))
    ] }, o.name);
  }) });
}
function Ee({ spec: e }) {
  var u;
  const t = ((u = e.series[0]) == null ? void 0 : u.points) ?? [], n = t.map((d) => Math.max(0, d.value)), a = n.reduce((d, c) => d + c, 0);
  if (a <= 0) return null;
  const r = y.left + A / 2, s = y.top + v / 2, l = Math.min(A, v) / 2 - 8;
  let o = -Math.PI / 2;
  return /* @__PURE__ */ i(O, { children: t.map((d, c) => {
    const f = n[c] / a, g = o + f * Math.PI * 2, m = r + l * Math.cos(o), p = s + l * Math.sin(o), $ = r + l * Math.cos(g), M = s + l * Math.sin(g), N = f > 0.5 ? 1 : 0, h = f >= 1 ? `M ${r} ${s - l} A ${l} ${l} 0 1 1 ${r - 0.01} ${s - l} Z` : `M ${r} ${s} L ${m} ${p} A ${l} ${l} 0 ${N} 1 ${$} ${M} Z`;
    return o = g, /* @__PURE__ */ i("path", { d: h, fill: I(c), children: /* @__PURE__ */ i("title", { children: `${d.label}: ${d.value}（${(f * 100).toFixed(1)}%）` }) }, `${d.label}-${c}`);
  }) });
}
function Pe({ spec: e }) {
  var n;
  const t = e.kind === "pie" ? (((n = e.series[0]) == null ? void 0 : n.points) ?? []).map((a) => a.label) : e.series.map((a) => a.name);
  return t.length < 2 ? null : /* @__PURE__ */ i("ul", { className: "reader-answer-chart-legend", children: t.map((a, r) => /* @__PURE__ */ x("li", { children: [
    /* @__PURE__ */ i("span", { className: "reader-answer-chart-swatch", style: { background: I(r) }, "aria-hidden": !0 }),
    a
  ] }, `${a}-${r}`)) });
}
function Re({ spec: e }) {
  const t = H(), { min: n, max: a } = Me(e), r = D(e), s = e.title || `${e.series.length} 个系列的${e.kind === "pie" ? b("k_380a2fed") : b("k_ef765015")}图`;
  return /* @__PURE__ */ x("figure", { className: "reader-answer-chart", children: [
    /* @__PURE__ */ x(
      "svg",
      {
        className: `reader-answer-chart-svg is-${e.kind}`,
        viewBox: `0 0 ${Z} ${W}`,
        role: "img",
        "aria-labelledby": t,
        preserveAspectRatio: "xMidYMid meet",
        children: [
          /* @__PURE__ */ i("title", { id: t, children: s }),
          e.kind !== "pie" ? /* @__PURE__ */ i(Ae, { spec: e, min: n, max: a, labels: r }) : null,
          e.kind === "bar" ? /* @__PURE__ */ i(Le, { spec: e, min: n, max: a }) : null,
          e.kind === "line" ? /* @__PURE__ */ i(Ce, { spec: e, min: n, max: a }) : null,
          e.kind === "pie" ? /* @__PURE__ */ i(Ee, { spec: e }) : null
        ]
      }
    ),
    /* @__PURE__ */ i(Pe, { spec: e }),
    e.title ? /* @__PURE__ */ i("figcaption", { className: "reader-answer-chart-caption", children: e.title }) : null
  ] });
}
const Se = 1600;
function Ie(e) {
  const t = `${e || ""}`.trim().toLowerCase();
  return !t || t === "text" || t === "plain" ? "" : {
    js: "JavaScript",
    jsx: "JSX",
    ts: "TypeScript",
    tsx: "TSX",
    py: "Python",
    python: "Python",
    rs: "Rust",
    rust: "Rust",
    sh: "Shell",
    bash: "Shell",
    zsh: "Shell",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    sql: "SQL",
    html: "HTML",
    css: "CSS",
    md: "Markdown",
    markdown: "Markdown"
  }[t] || t;
}
function Te({
  language: e,
  code: t,
  children: n
}) {
  const [a, r] = T(!1), s = Ie(e), l = E(() => {
    var u;
    const o = `${t || ""}`;
    o.trim() && ((u = navigator.clipboard) == null || u.writeText(o).then(
      () => {
        var d;
        r(!0), (d = globalThis.setTimeout) == null || d.call(globalThis, () => r(!1), Se);
      },
      () => {
      }
    ));
  }, [t]);
  return /* @__PURE__ */ x("div", { className: "reader-answer-code", children: [
    /* @__PURE__ */ x("div", { className: "reader-answer-code-bar", children: [
      /* @__PURE__ */ i("span", { className: "reader-answer-code-lang", children: s }),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          className: "reader-answer-code-copy",
          onClick: l,
          title: b("k_3b1fde4d"),
          children: a ? b("k_e381a576") : b("k_4edd1d00")
        }
      )
    ] }),
    n
  ] });
}
const je = 8, Oe = 8;
function He(e, t, n, { gap: a = je, margin: r = Oe } = {}) {
  const s = n.height - e.bottom, l = e.top, o = t.height + a + r, u = s >= o || s >= l ? "bottom" : "top", d = u === "bottom" ? e.bottom + a : e.top - a - t.height, c = Math.max(r, n.height - t.height - r), f = Math.min(Math.max(d, r), c), g = e.left + e.width / 2 - t.width / 2, m = Math.max(r, n.width - t.width - r);
  return { left: Math.min(Math.max(g, r), m), top: f, placement: u };
}
const De = 240, q = 180;
function Q(e, t) {
  const n = `${e || ""}`.replace(/\s+/g, " ").trim();
  return n.length <= t ? n : `${n.slice(0, t - 1)}…`;
}
function J(e, t) {
  return G(e) === null ? [] : `${e.job_id || t || ""}`.trim() ? ["translated", "source"] : [];
}
function We(e, t) {
  return J(e, t).length > 0 || Q(`${e.snippet || ""}`, q).length > 0;
}
function Be({
  citation: e,
  jobId: t,
  anchor: n,
  cardId: a,
  onPointerEnter: r,
  onPointerLeave: s
}) {
  const l = L(null), o = L(null), u = J(e, t), d = G(e), c = d === null ? null : d + 1, f = Q(`${e.snippet || ""}`, q), [g, m] = T(
    u.length ? "loading" : "none"
  ), [p, $] = T(null);
  P(() => {
    const h = o.current;
    if (!h || !u.length) return;
    const w = `${e.job_id || t || ""}`.trim(), k = new AbortController();
    return (async () => {
      for (const C of u) {
        const _ = re(
          w,
          d ?? 0,
          C,
          {}
        );
        if (!_) break;
        if (h.setAttribute("data-ai-src", _), h.classList.remove("is-missing"), await K(h, { signal: k.signal }), k.signal.aborted) return;
        if (!h.classList.contains("is-missing")) {
          m("ready");
          return;
        }
      }
      k.signal.aborted || m("failed");
    })(), () => {
      k.abort(), j(h);
    };
  }, [e, t, d, u.length]), te(() => {
    const h = l.current;
    if (!h || !n) return;
    const w = () => {
      const k = n.getBoundingClientRect(), C = h.getBoundingClientRect(), _ = He(
        { top: k.top, left: k.left, bottom: k.bottom, width: k.width },
        {
          width: C.width || h.offsetWidth,
          height: C.height || h.offsetHeight
        },
        { width: window.innerWidth || 0, height: window.innerHeight || 0 }
      );
      $((R) => R && R.left === _.left && R.top === _.top && R.placement === _.placement ? R : _);
    };
    return w(), window.addEventListener("scroll", w, !0), window.addEventListener("resize", w), () => {
      window.removeEventListener("scroll", w, !0), window.removeEventListener("resize", w);
    };
  }, [n, g, f]);
  const M = /* @__PURE__ */ x(
    "div",
    {
      ref: l,
      id: a,
      role: "tooltip",
      className: `reader-ai-citation-card${p ? " is-placed" : ""}`,
      "data-placement": (p == null ? void 0 : p.placement) || "bottom",
      style: { left: `${(p == null ? void 0 : p.left) ?? 0}px`, top: `${(p == null ? void 0 : p.top) ?? 0}px` },
      onMouseEnter: r,
      onMouseLeave: s,
      children: [
        u.length ? /* @__PURE__ */ x("div", { className: "reader-ai-citation-card-figure", "data-state": g, children: [
          /* @__PURE__ */ i(
            "img",
            {
              ref: o,
              alt: c ? b("k_0112fdff", [c]) : b("k_8e24d720"),
              className: "reader-ai-citation-card-thumb",
              decoding: "async",
              width: De
            }
          ),
          g === "failed" ? /* @__PURE__ */ i("span", { className: "reader-ai-citation-card-thumb-fallback", children: "预览暂不可用" }) : null
        ] }) : null,
        /* @__PURE__ */ x("div", { className: "reader-ai-citation-card-text", children: [
          /* @__PURE__ */ i("div", { className: "reader-ai-citation-card-head", children: c ? b("k_62866db3", [c]) : b("k_c63f79e6") }),
          f ? /* @__PURE__ */ i("p", { className: "reader-ai-citation-card-snippet", children: f }) : null
        ] })
      ]
    }
  ), N = typeof document > "u" ? null : document.body;
  return N ? me(M, N) : M;
}
const Fe = 140, z = 180;
function Ye({ citation: e, label: t, jobId: n, onJump: a }) {
  const [r, s] = T(!1), l = L(null), o = L(null), u = `reader-ai-citation-card-${H().replace(/[^a-zA-Z0-9_-]/g, "")}`, d = V(e), c = We(e, n), f = E(() => {
    o.current !== null && (clearTimeout(o.current), o.current = null);
  }, []), g = E(($, M) => {
    f(), o.current = setTimeout(() => {
      o.current = null, s($);
    }, M);
  }, [f]);
  P(() => () => f(), [f]), P(() => {
    c || s(!1);
  }, [c]);
  const m = E(() => {
    f(), s(!0);
  }, [f]), p = E(() => {
    f(), s(!1);
  }, [f]);
  return /* @__PURE__ */ x(O, { children: [
    /* @__PURE__ */ x(
      "button",
      {
        ref: l,
        type: "button",
        className: "reader-ai-citation-ref",
        "data-page": d ?? void 0,
        "aria-describedby": r ? u : void 0,
        "aria-expanded": c ? r : void 0,
        title: d ? b("k_73826adf", [d]) : b("k_81b00d3e"),
        onClick: ($) => {
          $.preventDefault(), $.stopPropagation(), p(), a == null || a(e);
        },
        onMouseEnter: c ? () => g(!0, Fe) : void 0,
        onMouseLeave: c ? () => g(!1, z) : void 0,
        onFocus: c ? m : void 0,
        onBlur: c ? p : void 0,
        onKeyDown: ($) => {
          $.key === "Escape" && r && ($.stopPropagation(), p());
        },
        children: [
          "[",
          t,
          "]"
        ]
      }
    ),
    r && c ? /* @__PURE__ */ i(
      Be,
      {
        citation: e,
        jobId: n,
        anchor: l.current,
        cardId: u,
        onPointerEnter: m,
        onPointerLeave: () => g(!1, z)
      }
    ) : null
  ] });
}
const ee = "retainpdf-ai-answer", U = 320, ze = 2, B = ne({
  final: !1,
  jobId: "",
  citations: []
});
function Ue(e) {
  const t = Number(e.naturalWidth) || 0, n = e.closest(".reader-ai-image-jump"), a = n || e, r = t > 0 && t < U;
  if (e.classList.toggle("is-low-resolution", r), n == null || n.classList.toggle("is-low-resolution", r), r) {
    const s = Math.min(
      U,
      Math.max(t, t * ze)
    );
    a.style.setProperty("--reader-ai-image-width", `${s}px`);
  } else
    a.style.removeProperty("--reader-ai-image-width");
}
function Xe({ node: e }) {
  const { final: t, jobId: n, citations: a, onJumpCitation: r } = X(B), s = L(null), l = L(null), o = `${e.alt || ""}`.trim(), u = ae(e.src, n, {}, oe(a)), d = se(e.src, a, n), c = V(d), f = E((m) => {
    var M;
    const p = s.current;
    if (p === m || ((M = l.current) == null || M.abort(), l.current = null, p && j(p), s.current = m, !m || !u)) return;
    const $ = new AbortController();
    l.current = $, (async () => {
      for (const N of [0, 250, 750, 1500]) {
        if (N && await new Promise((w) => globalThis.setTimeout(w, N)), $.signal.aborted) return;
        const h = s.current;
        if (!h || h !== m || h.classList.contains("is-hydrated") && h.src.startsWith("blob:")) return;
        await K(h, { signal: $.signal });
      }
    })();
  }, [u]);
  if (P(() => () => {
    var m;
    (m = l.current) == null || m.abort(), l.current = null, j(s.current), s.current = null;
  }, []), !u)
    return t ? /* @__PURE__ */ i("span", { className: "aui-image-blocked", children: o ? b("k_27855be5", [o]) : b("k_7c94c106") }) : /* @__PURE__ */ i("span", { className: "aui-image-pending", "aria-label": o || b("k_65a4beea"), children: o ? b("k_e9a0dae1", [o]) : b("k_3855c47e") });
  const g = /* @__PURE__ */ i(
    "img",
    {
      ref: f,
      alt: o,
      "data-ai-src": u,
      decoding: "async",
      loading: "lazy",
      onLoad: (m) => Ue(m.currentTarget),
      title: e.title || void 0
    }
  );
  return !d || !r ? g : /* @__PURE__ */ x(
    "button",
    {
      type: "button",
      className: "reader-ai-image-jump",
      "data-page": c ?? void 0,
      title: c ? b("k_6ad2cef9", [c]) : b("k_53a8c58f"),
      onClick: (m) => {
        m.preventDefault(), m.stopPropagation(), r({ ...d, image_url: u });
      },
      children: [
        g,
        /* @__PURE__ */ i("span", { className: "reader-ai-image-jump-label", "aria-hidden": "true", children: c ? b("k_2ee80ac5", [c]) : b("k_81b00d3e") })
      ]
    }
  );
}
function Ge({ node: e }) {
  const { citations: t, jobId: n, onJumpCitation: a } = X(B), r = `${e.href || ""}`.match(/^#retainpdf-citation-(\d+)$/), s = r ? t.find((o) => `${o.ref}` === r[1]) : null;
  if (s)
    return /* @__PURE__ */ i(
      Ye,
      {
        citation: s,
        label: `${(r == null ? void 0 : r[1]) ?? ""}`,
        jobId: n,
        onJump: a
      }
    );
  const l = `${e.text || e.href || ""}`.trim();
  return /* @__PURE__ */ i(
    "span",
    {
      className: "aui-md-extlink",
      "data-href": `${e.href || ""}`.trim() || void 0,
      title: l || void 0,
      children: l
    }
  );
}
function Ke(e) {
  const t = e.node;
  if (`${(t == null ? void 0 : t.language) || ""}`.trim().toLowerCase() === pe) {
    const n = ke(`${(t == null ? void 0 : t.code) || ""}`);
    if (n) return /* @__PURE__ */ i(Re, { spec: n });
  }
  return /* @__PURE__ */ i(Te, { language: `${(t == null ? void 0 : t.language) || ""}`, code: `${(t == null ? void 0 : t.code) || ""}`, children: /* @__PURE__ */ i(fe, { node: e.node }) });
}
function Ve({ node: e }) {
  return /* @__PURE__ */ i(
    he,
    {
      node: e.markup === "$$" ? { ...e, markup: "$" } : e
    }
  );
}
ue(ee, {
  image: Xe,
  link: Ge,
  math_inline: Ve,
  code_block: Ke
});
function Ze({
  content: e,
  final: t,
  indexKey: n,
  jobId: a,
  citations: r = [],
  onJumpCitation: s,
  onClickCapture: l
}) {
  return /* @__PURE__ */ i(B.Provider, { value: { final: t, jobId: a, citations: r, onJumpCitation: s }, children: /* @__PURE__ */ i(
    "div",
    {
      className: "retain-markstream-shell",
      "data-markdown-renderer": "markstream-react",
      onClickCapture: l,
      children: /* @__PURE__ */ i(
        de,
        {
          batchRendering: !t,
          content: e,
          customId: ee,
          fade: !1,
          final: t,
          htmlPolicy: "escape",
          indexKey: n,
          maxLiveNodes: 0,
          renderCodeBlocksAsPre: !0,
          showTooltips: !1,
          smoothStreaming: !1,
          typewriter: !1
        }
      )
    }
  ) });
}
function rt({
  content: e,
  streaming: t = !1,
  citations: n = [],
  jobId: a = "",
  className: r = "",
  streamingClassName: s = "",
  pendingClassName: l = "",
  finalClassName: o = "",
  citationFooterMax: u = 5,
  onJumpCitation: d
}) {
  var N;
  const c = L(null), f = H(), g = t ? `${e || ""}` : `${e || ""}`.trim(), m = `${a || ((N = n.find((h) => h.job_id)) == null ? void 0 : N.job_id) || ""}`.trim(), p = F(() => {
    const h = /* @__PURE__ */ new Map();
    for (const w of n)
      ie(w) && h.set(`${w.ref}`, w);
    return h;
  }, [n]), $ = F(
    () => le(g, p),
    [g, p]
  );
  return P(() => {
    var k;
    const h = c.current;
    if (!h || !g) return;
    const w = h.parentElement;
    if (w instanceof HTMLElement) {
      if (t) {
        (k = w.querySelector(".reader-ai-citations")) == null || k.remove();
        return;
      }
      ce(w, n, {
        onJump: (C) => d == null ? void 0 : d(C),
        answerText: g,
        max: u
      });
    }
  }, [t, m, p, n, d, g, u]), P(() => () => j(c.current), []), g.trim() ? /* @__PURE__ */ i("div", { ref: c, className: `${r} ${t ? s : o || l}`.trim(), children: /* @__PURE__ */ i(
    Ze,
    {
      content: $,
      final: !t,
      indexKey: f,
      jobId: m,
      citations: n,
      onJumpCitation: d,
      onClickCapture: (h) => {
        const w = h.target;
        w instanceof Element && w.closest("a[href]") && (h.preventDefault(), h.stopPropagation());
      }
    }
  ) }) : null;
}
export {
  rt as A
};
//# sourceMappingURL=AiMarkdownAnswer-6GJQhTGT.js.map
