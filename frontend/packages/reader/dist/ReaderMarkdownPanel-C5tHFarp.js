import { jsxs as ee, jsx as U } from "react/jsx-runtime";
import { useRef as I, useState as $, useEffect as me } from "react";
import { Search as Ce, ChevronUp as Le, ChevronDown as _e, ListTree as Ne, FileCode2 as Re } from "lucide-react";
import { d as ge, r as de, e as we, b as Ie } from "./ReaderApp-BMiyXfDI.js";
import { e as ke, m as Oe, a as be } from "./markdown-math-DjIC5Aa5.js";
import { t as f } from "@retainpdf/i18n";
import { n as Se } from "./markdown-payload-kK3ewW_I.js";
const pe = "h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, pre";
function xe(t) {
  t.querySelectorAll(".reader-markdown-search-hit, .reader-markdown-search-hit-active").forEach((r) => {
    r.classList.remove("reader-markdown-search-hit", "reader-markdown-search-hit-active");
  });
}
function De(t, r) {
  xe(t);
  const n = r.trim().toLocaleLowerCase();
  if (!n) return [];
  const a = [...t.querySelectorAll(pe)].filter((e) => [...e.children].some((d) => d.matches(pe)) ? !1 : (e.textContent || "").toLocaleLowerCase().includes(n));
  return a.forEach((e) => e.classList.add("reader-markdown-search-hit")), a;
}
function He(t) {
  return t.normalize("NFKC").trim().toLocaleLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-+|-+$/g, "") || "section";
}
function se(t, r = /* @__PURE__ */ new Map()) {
  return [...t.querySelectorAll("h1, h2, h3, h4, h5, h6")].flatMap((n) => {
    const s = (n.textContent || "").replace(/\s+/g, " ").trim();
    if (!s) return [];
    const a = He(s), e = (r.get(a) || 0) + 1;
    r.set(a, e);
    const d = e === 1 ? `reader-md-${a}` : `reader-md-${a}-${e}`;
    return n.id = d, [{ id: d, level: Number(n.tagName.slice(1)), text: s }];
  });
}
function Te(t, r = "http://localhost/") {
  var n;
  if (/^mock:\/\//i.test(t)) return !0;
  try {
    const s = ((n = globalThis.location) == null ? void 0 : n.href) || "http://localhost/", a = new URL(r, s), e = new URL(t, a);
    if (!/\/api\/v1\/jobs\/[^/]+\/markdown\/images\//.test(e.pathname)) return !1;
    if (!/^[a-z][a-z\d+.-]*:/i.test(t)) return !0;
    const d = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(e.hostname);
    return e.origin === a.origin || d;
  } catch {
    return !1;
  }
}
function qe(t, r) {
  if (/^data:image\//i.test(t) || /^blob:/i.test(t)) return !0;
  try {
    const n = new URL(t, r);
    return n.protocol === "http:" || n.protocol === "https:";
  } catch {
    return !1;
  }
}
function ve(t, r) {
  let n = !1, s = 0, a = 0, e = 0;
  const d = [], i = [], C = /* @__PURE__ */ new Set(), w = (c, E) => {
    const l = c.ownerDocument.createElement("span");
    l.className = "reader-markdown-image-missing", l.textContent = E, l.title = c.getAttribute("data-reader-md-src") || "", c.replaceWith(l);
  };
  for (const c of t) {
    const E = c.getAttribute("data-reader-md-src") || "", l = c.ownerDocument.baseURI || "http://localhost/";
    Te(E, r.protectedBaseUrl || l) ? i.push(c) : qe(E, l) ? c.src = E : w(c, f("k_d351ae0c"));
  }
  const _ = () => {
    var c;
    return (c = r.onProgress) == null ? void 0 : c.call(r, { failed: e, loaded: a, total: i.length });
  }, k = () => {
    if (!n)
      for (; s < 4 && d.length > 0; ) {
        const c = d.shift();
        if (!(c != null && c.isConnected)) continue;
        s += 1;
        const E = c.getAttribute("data-reader-md-src") || "";
        r.fetchImage(E, r.signal ? { signal: r.signal } : void 0).then(async (l) => {
          if (!(l != null && l.ok)) throw new Error(`HTTP ${(l == null ? void 0 : l.status) || 0}`);
          const x = URL.createObjectURL(await l.blob());
          if (n || !c.isConnected) {
            try {
              URL.revokeObjectURL(x);
            } catch {
            }
            return;
          }
          r.onObjectUrl(x), c.src = x, a += 1;
        }).catch(() => {
          n || !c.isConnected || (e += 1, w(c, f("k_52a529fa")));
        }).finally(() => {
          s -= 1, n || (_(), k());
        });
      }
  }, N = (c) => {
    n || C.has(c) || (C.add(c), d.push(c), k());
  }, R = globalThis.IntersectionObserver;
  let v = null;
  return R && i.length > 0 ? (v = new R((c) => {
    c.forEach((E) => {
      if (!E.isIntersecting) return;
      const l = E.target;
      v == null || v.unobserve(l), N(l);
    });
  }, { root: r.root || null, rootMargin: "600px 0px" }), i.forEach((c) => v == null ? void 0 : v.observe(c))) : i.forEach(N), _(), () => {
    n = !0, d.length = 0, v == null || v.disconnect();
  };
}
let le = null;
function ye() {
  return le || (le = import("marked").catch((t) => {
    throw le = null, t;
  })), le;
}
function ze(t) {
  t.querySelectorAll("script, iframe, object, embed, style, link, meta, base, form, input, button, textarea, select").forEach((r) => r.remove()), t.querySelectorAll("*").forEach((r) => {
    for (const n of [...r.attributes])
      /^on/i.test(n.name) && r.removeAttribute(n.name);
  }), t.querySelectorAll("a[href]").forEach((r) => {
    const n = r;
    /^\s*javascript:/i.test(n.getAttribute("href") || "") && n.removeAttribute("href"), n.setAttribute("target", "_blank"), n.setAttribute("rel", "noopener noreferrer");
  });
}
function he(t, r, n, s = {}) {
  const a = t.ownerDocument.createElement("template");
  return a.innerHTML = r, ze(a.content), a.content.querySelectorAll("img[src]").forEach((e) => {
    var C;
    const d = e.getAttribute("src") || "", i = ((C = s.resolveAssetUrl) == null ? void 0 : C.call(s, n, d)) || d;
    e.setAttribute("data-reader-md-src", i), e.setAttribute("loading", "lazy"), e.setAttribute("decoding", "async"), e.removeAttribute("src");
  }), t.replaceChildren(a.content), t.classList.remove("hidden"), [...t.querySelectorAll("img[data-reader-md-src]")];
}
function $e(t, r) {
  let n = r;
  for (; n < t.length; ) {
    const s = t.indexOf(`
`, n), a = s === -1 ? t.length : s, e = t.slice(n, a).trim();
    if (e !== "") return e;
    if (s === -1) return null;
    n = s + 1;
  }
  return null;
}
const Be = /^\s{0,3}\[[^\]]+\]:/;
function Me(t) {
  const r = t.match(/^(?:([-*+])|(\d+)([.)]))\s+/);
  return r ? r[1] ? `ul:${r[1]}` : `ol:${r[3]}` : null;
}
function Pe(t, r, n) {
  const s = $e(t, r);
  if (!s) return !1;
  if (Be.test(s)) return !0;
  const a = n ? Me(n) : null, e = Me(s);
  return a != null && a === e;
}
function Ae(t, { minChars: r = 16384 } = {}) {
  if (!t) return null;
  let n = "", s = null, a = 0;
  const e = t.length;
  for (; a < e; ) {
    const d = t.indexOf(`
`, a), i = d === -1 ? e : d, w = t.slice(a, i).trim(), _ = w.match(/^(`{3,}|~{3,})/);
    if (_) {
      const k = _[1][0];
      n ? n === k && (n = "") : n = k;
    }
    if (!n && w === "") {
      const k = d === -1 ? e : d + 1;
      if (k >= r && !Pe(t, k, s))
        return { complete: t.slice(0, k), rest: t.slice(k) };
    } else w !== "" && (s = w);
    if (d === -1) break;
    a = d + 1;
  }
  return null;
}
function je({
  open: t,
  jobId: r,
  sourceOnly: n,
  searchQueryRef: s,
  reapplySearchRef: a
}) {
  const e = I(null), [d, i] = $(f("k_3e2e1ebf")), C = I([]), w = I(null), _ = I(/* @__PURE__ */ new Map()), k = I([]), N = I(null), R = I(!1), v = I(!1), c = I(null), [E, l] = $([]), [x, B] = $(!1), [P, Q] = $(!1), X = () => {
    for (const o of C.current)
      try {
        URL.revokeObjectURL(o);
      } catch {
      }
    C.current = [];
  }, G = () => {
    var o, L;
    (o = w.current) == null || o.call(w), w.current = null;
    for (const m of k.current) m();
    k.current = [], (L = N.current) == null || L.call(N), N.current = null, X();
  }, te = () => {
    const o = e.current;
    o && (_.current = /* @__PURE__ */ new Map(), l(se(o, _.current)));
  }, re = () => {
    const o = c.current, L = e.current;
    if (!o || !L) return;
    const m = [...L.querySelectorAll("h1, h2, h3, h4, h5, h6")].find((q) => q.id === o);
    m && (c.current = null, typeof m.scrollIntoView == "function" && m.scrollIntoView({ block: "start", behavior: "smooth" }));
  };
  return me(() => () => {
    var o;
    (o = w.current) == null || o.call(w), X();
  }, []), me(() => {
    if (!t) {
      G(), l([]), v.current = !1, B(!1);
      return;
    }
    let o = !1;
    G(), _.current = /* @__PURE__ */ new Map(), v.current = !1, B(!1), l([]), R.current = !1, c.current = null, Q(!1);
    const L = new AbortController(), m = ge;
    async function q() {
      var b, u, y, M, g, A;
      const S = r.startsWith("doc:");
      if (!r || S) {
        const p = !r && n ? f("k_3af528a7") : f("k_b0888891");
        i(p), e.current && (e.current.replaceChildren(), e.current.classList.add("hidden"));
        return;
      }
      i(f("k_8e8b89f5")), (b = e.current) == null || b.replaceChildren(), (u = e.current) == null || u.classList.add("hidden");
      try {
        if (typeof (m == null ? void 0 : m.loadMarkdownSource) == "function" && typeof (m == null ? void 0 : m.loadMarkdownRange) == "function") {
          const p = await m.loadMarkdownSource(r, L.signal);
          if (o) return;
          if (p != null && p.rawUrl) {
            await ne(p);
            return;
          }
        }
      } catch {
      }
      try {
        const p = await ge.loadMarkdownPayload(r);
        if (o) return;
        const { content: D, imagesBaseUrl: j } = Se(p);
        if (!D.trim()) {
          i(f("k_b0888891")), (y = e.current) == null || y.replaceChildren(), (M = e.current) == null || M.classList.add("hidden");
          return;
        }
        const { marked: O } = await ye();
        if (o || !e.current) return;
        const { text: z, slots: F } = ke(D, { bareLatex: !0 }), J = String(O.parse(z, { async: !1 })), Y = Oe(J, F);
        he(e.current, Y, j, {
          resolveAssetUrl: de
        }), l(se(e.current)), (g = a.current) == null || g.call(a), i(F.length > 0 ? f("k_62194f56", [F.length]) : "");
        const ae = F.length > 0 ? await be(J, F) : J;
        if (o || !e.current) return;
        const ce = he(e.current, ae, j, {
          resolveAssetUrl: de
        });
        l(se(e.current)), v.current = !0, B(!0), (A = a.current) == null || A.call(a), i("");
        const ie = e.current.closest(".reader-notes-panel-body");
        w.current = ve(ce, {
          root: ie,
          protectedBaseUrl: j || e.current.ownerDocument.baseURI,
          fetchImage: we,
          signal: L.signal,
          onObjectUrl: (K) => C.current.push(K),
          onProgress: ({ failed: K }) => {
            !o && K > 0 && i(f("k_9ade161f", [K]));
          }
        });
      } catch (p) {
        if (o) return;
        i(p instanceof Error ? p.message : f("k_77108e78"));
      }
    }
    async function ne(S) {
      var K;
      const b = e.current;
      if (!b) return;
      const u = 262144, y = 8192, M = `${S.imagesBaseUrl || ""}`, g = b.closest(".reader-notes-panel-body");
      let A = new TextDecoder(), p = 0, D = `${S.etag || ""}`, j = Number.isFinite(Number(S.totalBytes)) ? Number(S.totalBytes) : null, O = "", z = !1;
      const F = 4, J = 4e3;
      let Y = 0;
      const ae = () => {
        for (const h of k.current) h();
        k.current = [], X(), _.current = /* @__PURE__ */ new Map(), l([]);
      }, ce = async (h) => {
        const { marked: H } = await ye();
        if (o || !e.current) return;
        const { text: T, slots: W } = ke(h, { bareLatex: !0 }), Z = String(H.parse(T, { async: !1 })), ue = W.length > 0 ? await be(Z, W) : Z;
        if (o || !e.current) return;
        const oe = b.ownerDocument.createElement("section");
        oe.className = "reader-markdown-chunk";
        const Ee = he(oe, ue, M, {
          resolveAssetUrl: de
        });
        b.appendChild(oe), b.classList.remove("hidden");
        const fe = se(oe, _.current);
        fe.length && l((V) => [...V, ...fe]), re();
        const Ue = ve(Ee, {
          root: g,
          protectedBaseUrl: M || b.ownerDocument.baseURI,
          fetchImage: we,
          signal: L.signal,
          onObjectUrl: (V) => C.current.push(V),
          onProgress: ({ failed: V }) => {
            !o && V > 0 && i(f("k_9ade161f", [V]));
          }
        });
        k.current.push(Ue);
      }, ie = async () => {
        R.current || !g || o || b.scrollHeight <= g.clientHeight * 2 || (Q(!0), i(f("k_996cfb02")), await new Promise((h) => {
          let H = !1, T = null;
          const W = (ue) => {
            H || (H = !0, g.removeEventListener("scroll", Z), T && (clearTimeout(T), T = null), N.current = null, o || (Q(!1), ue && (Y = 0)), h());
          }, Z = () => {
            (b.scrollHeight <= g.clientHeight * 2 || g.scrollTop + g.clientHeight >= b.scrollHeight - 800) && W(!0);
          };
          N.current = () => W(!0), g.addEventListener("scroll", Z, { passive: !0 }), Y < F && (Y += 1, T = setTimeout(() => W(!1), J));
        }));
      };
      try {
        for (; !z && !o; ) {
          const h = await m.loadMarkdownRange(
            S.rawUrl,
            p,
            p + u - 1,
            D || void 0,
            L.signal
          );
          if (o) return;
          if (h.status === 404) {
            i(f("k_b0888891")), b.replaceChildren(), b.classList.add("hidden");
            return;
          }
          if (h.status === 200)
            b.replaceChildren(), ae(), A = new TextDecoder(), O = A.decode(h.bytes, { stream: !1 }), z = !0;
          else if (h.status === 206) {
            if (D && h.etag && h.etag !== D) {
              b.replaceChildren(), ae(), A = new TextDecoder(), O = "", p = 0, z = !1, D = h.etag;
              continue;
            }
            !D && h.etag && (D = h.etag), h.totalBytes != null && (j = h.totalBytes);
            const T = h.rangeEnd != null ? h.rangeEnd + 1 : p + h.bytes.length;
            z = j != null ? T >= j : h.bytes.length < u, O += A.decode(h.bytes, { stream: !z }), p = T;
          } else
            throw new Error(f("k_5a4bde5c", [h.status]));
          let H = Ae(O, { minChars: y });
          for (; H && !o; ) {
            if (O = H.rest, await ce(H.complete), o) return;
            await ie(), H = Ae(O, { minChars: y });
          }
          z && O.trim() && (await ce(O), O = "");
        }
        o || (te(), v.current = !0, B(!0), re(), i(""), s.current.trim() && ((K = a.current) == null || K.call(a)));
      } catch (h) {
        if (o || L.signal.aborted) return;
        i(h instanceof Error ? h.message : f("k_77108e78"));
      }
    }
    return q(), () => {
      o = !0, L.abort(), G();
    };
  }, [t, r, n]), {
    contentRef: e,
    status: d,
    setStatus: i,
    outline: E,
    setOutline: l,
    outlineComplete: x,
    setOutlineComplete: B,
    outlineCompleteRef: v,
    pendingResume: P,
    rebuildOutline: te,
    renderAllRef: R,
    pendingAnchorRef: c,
    resumeCleanupRef: N
  };
}
function Je({
  open: t,
  jobId: r,
  sourceOnly: n,
  layout: s = "floating",
  side: a = "right",
  onClose: e
}) {
  var S, b;
  const d = I([]), i = I(""), C = I(() => {
  }), [w, _] = $(!1), [k, N] = $(""), [R, v] = $(0), [c, E] = $(-1), {
    contentRef: l,
    status: x,
    setStatus: B,
    outline: P,
    outlineComplete: Q,
    setOutlineComplete: X,
    outlineCompleteRef: G,
    pendingResume: te,
    rebuildOutline: re,
    renderAllRef: o,
    pendingAnchorRef: L,
    resumeCleanupRef: m
  } = je({
    open: t,
    jobId: r,
    sourceOnly: n,
    searchQueryRef: i,
    reapplySearchRef: C
  }), q = (u, y = !0) => {
    const M = d.current;
    if (M.forEach((p) => p.classList.remove("reader-markdown-search-hit-active")), M.length === 0) {
      E(-1);
      return;
    }
    const g = (u + M.length) % M.length, A = M[g];
    A.classList.add("reader-markdown-search-hit-active"), E(g), y && typeof A.scrollIntoView == "function" && A.scrollIntoView({ block: "center", behavior: "smooth" });
  }, ne = (u, y = !1) => {
    var A;
    const M = `${u || ""}`.trim();
    if (o.current = M.length > 0, o.current && ((A = m.current) == null || A.call(m)), !l.current) return;
    const g = De(l.current, u);
    d.current = g, v(g.length), q(g.length > 0 ? 0 : -1, y);
  };
  return C.current = () => ne(i.current), /* @__PURE__ */ ee(
    Ie,
    {
      id: "reader-markdown-panel",
      open: t,
      title: "Markdown",
      subtitle: s === "docked" ? f("k_0d0bb3d6") : f("k_c21d200b"),
      titleIcon: /* @__PURE__ */ U(Re, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.markdown-float.pos.v1",
      ariaLabel: f("k_c712492f"),
      width: 420,
      placement: s === "workspace" ? "workspace" : s === "docked" ? "dock-right" : "floating",
      showHeader: s !== "workspace",
      className: s === "workspace" ? `is-pane-${a}` : void 0,
      onClose: e,
      toolbar: /* @__PURE__ */ U("span", { className: "reader-notes-count", children: x || f("k_b19bae5d") }),
      children: [
        /* @__PURE__ */ ee("div", { className: "reader-markdown-nav", "aria-label": f("k_23ca2df7"), children: [
          /* @__PURE__ */ ee("label", { className: "reader-markdown-search", children: [
            /* @__PURE__ */ U(Ce, { size: 13, "aria-hidden": !0 }),
            /* @__PURE__ */ U(
              "input",
              {
                type: "search",
                value: k,
                placeholder: f("k_24740e4e"),
                "aria-label": f("k_8095db41"),
                onChange: (u) => {
                  const y = u.target.value;
                  i.current = y, N(y), ne(y, !1);
                },
                onKeyDown: (u) => {
                  u.key !== "Enter" || R === 0 || (u.preventDefault(), q(c + (u.shiftKey ? -1 : 1)));
                }
              }
            ),
            k ? /* @__PURE__ */ U("span", { className: "reader-markdown-search-count", "aria-live": "polite", children: R > 0 ? `${c + 1}/${R}` : "0/0" }) : null,
            /* @__PURE__ */ U(
              "button",
              {
                type: "button",
                "aria-label": f("k_b9dbcb51"),
                disabled: R === 0,
                onClick: () => q(c - 1),
                children: /* @__PURE__ */ U(Le, { size: 13, "aria-hidden": !0 })
              }
            ),
            /* @__PURE__ */ U(
              "button",
              {
                type: "button",
                "aria-label": f("k_f28ae565"),
                disabled: R === 0,
                onClick: () => q(c + 1),
                children: /* @__PURE__ */ U(_e, { size: 13, "aria-hidden": !0 })
              }
            )
          ] }),
          /* @__PURE__ */ ee(
            "button",
            {
              type: "button",
              className: "reader-markdown-outline-toggle",
              "aria-expanded": w,
              disabled: P.length === 0,
              onClick: () => {
                re(), X(G.current), _((u) => !u);
              },
              children: [
                /* @__PURE__ */ U(Ne, { size: 13, "aria-hidden": !0 }),
                "目录",
                P.length > 0 ? ` ${P.length}` : ""
              ]
            }
          ),
          te ? /* @__PURE__ */ U(
            "button",
            {
              type: "button",
              className: "reader-markdown-resume",
              onClick: () => {
                var u;
                return (u = m.current) == null ? void 0 : u.call(m);
              },
              children: "继续加载"
            }
          ) : null
        ] }),
        w && P.length > 0 ? /* @__PURE__ */ ee("nav", { className: "reader-markdown-outline", "aria-label": f("k_f15eb0a3"), children: [
          Q ? null : /* @__PURE__ */ U("p", { className: "reader-markdown-outline-note", children: "仅显示已加载内容，滚动可加载更多" }),
          P.map((u) => /* @__PURE__ */ U(
            "button",
            {
              type: "button",
              style: { "--reader-md-outline-level": u.level - 1 },
              onClick: () => {
                var M, g;
                const y = [...((M = l.current) == null ? void 0 : M.querySelectorAll("h1, h2, h3, h4, h5, h6")) || []].find((A) => A.id === u.id);
                if (y && typeof y.scrollIntoView == "function") {
                  y.scrollIntoView({ block: "start", behavior: "smooth" });
                  return;
                }
                L.current = u.id, o.current = !0, (g = m.current) == null || g.call(m), B(f("k_6cddd39b"));
              },
              children: u.text
            },
            u.id
          ))
        ] }) : null,
        x && !((b = (S = l.current) == null ? void 0 : S.childNodes) != null && b.length) ? /* @__PURE__ */ U("p", { className: "reader-notes-empty", children: x }) : null,
        /* @__PURE__ */ U(
          "article",
          {
            ref: l,
            id: "reader-markdown-content",
            className: "reader-markdown-content reader-float-markdown-content"
          }
        )
      ]
    }
  );
}
export {
  Je as ReaderMarkdownPanel,
  se as buildMarkdownOutline,
  xe as clearMarkdownSearchHighlights,
  De as findMarkdownSearchTargets,
  Te as isProtectedMarkdownAssetUrl,
  ve as startMarkdownImageLoading
};
//# sourceMappingURL=ReaderMarkdownPanel-C5tHFarp.js.map
