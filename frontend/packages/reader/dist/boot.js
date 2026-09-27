import { jsx as s } from "react/jsx-runtime";
import { createRoot as p } from "react-dom/client";
import { R as m } from "./ReaderApp-DztBjLD_.js";
import { t } from "./i18n-Bsr2eycf.js";
import { i as l, c as u } from "./answer-enhance-HajrqUpu.js";
const i = "retainpdf.theme", d = "classic";
t("k_5f83e7f6"), t("k_c7b92cb5");
const a = [
  {
    id: "classic",
    label: t("k_c0ca4b88"),
    description: t("k_e4dc7895"),
    group: "light",
    order: 10,
    preview: {
      bg: "#f5f5f7",
      paper: "#ffffff",
      accent: "#1d1d1f",
      ink: "#1d1d1f",
      danger: "#ff3b30"
    }
  },
  {
    id: "jiangnan",
    label: t("k_f9e9f1e1"),
    description: t("k_4669df82"),
    group: "accent",
    order: 20,
    decorPack: "jiangnan",
    preview: {
      bg: "#f1f0ed",
      paper: "#fbfaf8",
      accent: "#2a5f57",
      ink: "#1b1b1d",
      danger: "#c23b32"
    }
  },
  {
    id: "mojia",
    label: t("k_1cdcb142"),
    description: t("k_27332e10"),
    group: "accent",
    order: 25,
    decorPack: "mojia",
    series: "baijia",
    preview: {
      bg: "#f2efe8",
      paper: "#faf8f1",
      accent: "#4c6658",
      ink: "#26221b",
      danger: "#b23b32"
    }
  },
  {
    id: "seacliff",
    label: t("k_d6f2f07e"),
    description: t("k_7b37dcc7"),
    group: "accent",
    order: 30,
    preview: {
      bg: "#eef1f4",
      paper: "#f8f9fb",
      accent: "#2d5f6e",
      ink: "#1a1d21",
      danger: "#c23b32"
    }
  },
  {
    id: "night",
    label: t("k_6f9b112e"),
    description: t("k_815ccfe6"),
    group: "dark",
    order: 40,
    preview: {
      bg: "#141618",
      paper: "#1e2226",
      accent: "#5aa88e",
      ink: "#e8e6e3",
      danger: "#e07068"
    }
  }
];
t("k_80ec9e2b"), t("k_30b2c979"), t("k_63a59798");
function c() {
  return [...a].sort((e, r) => e.order - r.order || e.id.localeCompare(r.id));
}
function b(e) {
  return a.find((r) => r.id === e);
}
function f(e) {
  return typeof e == "string" && a.some((r) => r.id === e);
}
c().map((e) => e.id);
Object.fromEntries(
  c().map((e) => [e.id, { id: e.id, label: e.label, description: e.description }])
);
const g = "retainpdf:theme-change";
function k() {
  if (typeof localStorage > "u") return d;
  try {
    const e = `${localStorage.getItem(i) || ""}`.trim();
    if (f(e)) return e;
  } catch {
  }
  return d;
}
function h(e) {
  const r = f(e) ? e : d;
  try {
    localStorage.setItem(i, r);
  } catch {
  }
  if (typeof document < "u") {
    document.documentElement.dataset.theme = r;
    const o = b(r);
    document.documentElement.dataset.themeGroup = (o == null ? void 0 : o.group) || "light", document.documentElement.classList.toggle("theme-dark", (o == null ? void 0 : o.group) === "dark");
  }
  if (typeof window < "u")
    try {
      window.dispatchEvent(
        new CustomEvent(g, { detail: { theme: r } })
      );
    } catch {
    }
  return r;
}
function E() {
  return h(k());
}
function _(e = document.body) {
  e.classList.add("reader-body", "reader-mode-compare"), globalThis.window && window.self !== window.top && e.classList.add("reader-embedded");
}
function y(e = document.body, r) {
  Array.from(e.children).forEach((o) => {
    o.tagName !== "SCRIPT" && o.id !== "reader-root" && o !== r && o.remove();
  });
}
function w(e = document.body) {
  let r = document.getElementById("reader-root");
  return r || (r = document.createElement("div"), r.id = "reader-root", e.appendChild(r)), r;
}
function L(e = {}) {
  const r = e.body ?? document.body, o = e.root ?? w(r);
  E(), u(), l(), _(r), e.purgeLegacyMarkup !== !1 && y(r, o);
  const n = p(o);
  return n.render(/* @__PURE__ */ s(m, {})), n;
}
export {
  L as bootReader,
  y as purgeLegacyMarkup,
  w as resolveReaderRoot,
  _ as syncReaderBodyClasses
};
//# sourceMappingURL=boot.js.map
