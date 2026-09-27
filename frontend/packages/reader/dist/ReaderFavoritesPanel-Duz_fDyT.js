import { jsx as r, jsxs as n, Fragment as y } from "react/jsx-runtime";
import { t as a } from "@retainpdf/i18n";
import { useState as p, useCallback as N, useEffect as _ } from "react";
import { Bookmark as g } from "lucide-react";
import { c as x, f as F, A as S, b as A } from "./ReaderApp-BMiyXfDI.js";
import { n as E } from "./page-state-CmBNULWh.js";
function P(s) {
  const t = `${s || ""}`.trim();
  return t === "figure" ? a("k_a66b71e2") : t === "data" ? a("k_54b8a90b") : t === "sentence" ? a("k_046a3be9") : t || a("k_046a3be9");
}
function B({
  open: s,
  jobId: t,
  documentId: o,
  onClose: k,
  onJumpPage: v
}) {
  const [i, l] = p([]), [c, u] = p(!1), [h, d] = p(""), f = N(async () => {
    if (!t && !o) {
      l([]), d(a("k_ee5b9d4d"));
      return;
    }
    u(!0), d("");
    try {
      let e = [];
      if (t)
        e = await x({ jobId: t }).loadServerFavorites();
      else if (o) {
        const { favorites: m = [] } = await F(S, { documentId: o });
        e = (Array.isArray(m) ? m : []).map((b) => E(b)).filter(Boolean);
      }
      l(e);
    } catch (e) {
      d(e instanceof Error ? e.message : a("k_16750732")), l([]);
    } finally {
      u(!1);
    }
  }, [t, o]);
  return _(() => {
    s && f();
  }, [s, f]), /* @__PURE__ */ r(
    A,
    {
      id: "reader-favorites-panel",
      open: s,
      title: a("k_046a3be9"),
      subtitle: a("k_fa4049c0"),
      titleIcon: /* @__PURE__ */ r(g, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.favorites-float.pos.v1",
      ariaLabel: a("k_046a3be9"),
      onClose: k,
      toolbar: /* @__PURE__ */ n(y, { children: [
        /* @__PURE__ */ r("span", { className: "reader-notes-count", children: c ? a("k_300ee3de") : a("k_24a27aec", [i.length]) }),
        /* @__PURE__ */ r(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: c,
            onClick: () => void f(),
            children: "刷新"
          }
        )
      ] }),
      children: h ? /* @__PURE__ */ r("p", { className: "reader-notes-empty", role: "alert", children: h }) : c ? /* @__PURE__ */ r("p", { className: "reader-notes-empty", children: "正在加载摘录…" }) : i.length === 0 ? /* @__PURE__ */ r("p", { className: "reader-notes-empty", children: "暂无摘录。可从主页收藏内容后在这里定位阅读。" }) : i.map((e) => /* @__PURE__ */ n("article", { className: "reader-notes-item", children: [
        /* @__PURE__ */ n("div", { className: "reader-notes-item-top", children: [
          /* @__PURE__ */ r("span", { className: "reader-notes-kind", children: P(e.kind) }),
          /* @__PURE__ */ r("div", { className: "reader-notes-item-actions", children: /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "reader-notes-link",
              onClick: () => v(Math.max(1, (e.pageIdx || 0) + 1)),
              children: [
                "第 ",
                (e.pageIdx || 0) + 1,
                " 页"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ r("p", { className: "reader-notes-quote", children: e.quoteText }),
        e.note ? /* @__PURE__ */ r("p", { className: "reader-notes-note", style: { cursor: "default" }, children: e.note }) : null
      ] }, e.favoriteId))
    }
  );
}
export {
  B as ReaderFavoritesPanel
};
//# sourceMappingURL=ReaderFavoritesPanel-Duz_fDyT.js.map
