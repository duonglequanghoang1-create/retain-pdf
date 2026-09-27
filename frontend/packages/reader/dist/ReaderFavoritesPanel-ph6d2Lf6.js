import { jsx as a, jsxs as n, Fragment as _ } from "react/jsx-runtime";
import { t as e } from "@retainpdf/i18n";
import { useState as p, useCallback as y, useEffect as N } from "react";
import { Bookmark as g } from "lucide-react";
import { c as x, f as F, A as S, b as A } from "./ReaderApp-CV4kzYam.js";
import { n as E } from "./page-state-CmBNULWh.js";
function P(s) {
  const t = `${s || ""}`.trim();
  return t === "figure" ? e("k_a66b71e2") : t === "data" ? e("k_54b8a90b") : t === "sentence" ? e("k_046a3be9") : t || e("k_046a3be9");
}
function B({
  open: s,
  jobId: t,
  documentId: o,
  onClose: h,
  onJumpPage: b
}) {
  const [i, l] = p([]), [c, k] = p(!1), [u, d] = p(""), f = y(async () => {
    if (!t && !o) {
      l([]), d(e("k_ee5b9d4d"));
      return;
    }
    k(!0), d("");
    try {
      let r = [];
      if (t)
        r = await x({ jobId: t }).loadServerFavorites();
      else if (o) {
        const { favorites: m = [] } = await F(S, { documentId: o });
        r = (Array.isArray(m) ? m : []).map((v) => E(v)).filter(Boolean);
      }
      l(r);
    } catch (r) {
      d(r instanceof Error ? r.message : e("k_16750732")), l([]);
    } finally {
      k(!1);
    }
  }, [t, o]);
  return N(() => {
    s && f();
  }, [s, f]), /* @__PURE__ */ a(
    A,
    {
      id: "reader-favorites-panel",
      open: s,
      title: e("k_046a3be9"),
      subtitle: e("k_fa4049c0"),
      titleIcon: /* @__PURE__ */ a(g, { size: 14, strokeWidth: 2.25, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.favorites-float.pos.v1",
      ariaLabel: e("k_046a3be9"),
      onClose: h,
      toolbar: /* @__PURE__ */ n(_, { children: [
        /* @__PURE__ */ a("span", { className: "reader-notes-count", children: c ? e("k_300ee3de") : e("k_24a27aec", [i.length]) }),
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "reader-notes-export",
            disabled: c,
            onClick: () => void f(),
            children: e("k_38108eaa")
          }
        )
      ] }),
      children: u ? /* @__PURE__ */ a("p", { className: "reader-notes-empty", role: "alert", children: u }) : c ? /* @__PURE__ */ a("p", { className: "reader-notes-empty", children: e("k_12fa2bd5") }) : i.length === 0 ? /* @__PURE__ */ a("p", { className: "reader-notes-empty", children: e("k_bbd2f403") }) : i.map((r) => /* @__PURE__ */ n("article", { className: "reader-notes-item", children: [
        /* @__PURE__ */ n("div", { className: "reader-notes-item-top", children: [
          /* @__PURE__ */ a("span", { className: "reader-notes-kind", children: P(r.kind) }),
          /* @__PURE__ */ a("div", { className: "reader-notes-item-actions", children: /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "reader-notes-link",
              onClick: () => b(Math.max(1, (r.pageIdx || 0) + 1)),
              children: [
                e("k_dae828fe"),
                " ",
                (r.pageIdx || 0) + 1,
                " ",
                e("k_73422182")
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ a("p", { className: "reader-notes-quote", children: r.quoteText }),
        r.note ? /* @__PURE__ */ a("p", { className: "reader-notes-note", style: { cursor: "default" }, children: r.note }) : null
      ] }, r.favoriteId))
    }
  );
}
export {
  B as ReaderFavoritesPanel
};
//# sourceMappingURL=ReaderFavoritesPanel-ph6d2Lf6.js.map
