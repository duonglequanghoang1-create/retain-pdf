import { t as s } from "@retainpdf/i18n";
function f(...e) {
  for (const t of e) {
    const n = `${t ?? ""}`.trim();
    if (n)
      return n;
  }
  return "";
}
let l = null, o = () => null, a = () => null, d = () => "", r = () => "";
function E(e = {}) {
  "credentialsPort" in e && (l = e.credentialsPort ?? null), e.loadBrowserStoredConfig && (o = e.loadBrowserStoredConfig), e.loadDeveloperStoredConfig && (a = e.loadDeveloperStoredConfig), e.defaultModelBaseUrl && (d = e.defaultModelBaseUrl), e.defaultModelName && (r = e.defaultModelName);
}
function M() {
  l = null, o = () => null, a = () => null, d = () => "", r = () => "";
}
function i(e = o()) {
  var t, n;
  try {
    const u = `${((n = (t = l == null ? void 0 : l.getCredentials) == null ? void 0 : t.call(l)) == null ? void 0 : n.modelApiKey) ?? ""}`.trim();
    if (u)
      return u;
  } catch {
  }
  return `${(e == null ? void 0 : e.modelApiKey) ?? ""}`.trim();
}
function S({
  browserConfig: e = o(),
  developerConfig: t = a()
} = {}) {
  return {
    apiKey: i(e),
    baseUrl: f(t == null ? void 0 : t.baseUrl, d()),
    model: f(t == null ? void 0 : t.model, r()),
    provider: "deepseek"
  };
}
function y(e) {
  return e !== void 0 ? !!i(e) : !!i();
}
const c = "retainpdf:credentials-changed";
function h() {
  var e;
  try {
    (e = globalThis.document) == null || e.dispatchEvent(new CustomEvent(c));
  } catch {
  }
}
const B = s("k_15ba2065");
export {
  c as C,
  B as M,
  i as a,
  M as b,
  y as h,
  h as n,
  S as r,
  E as s
};
//# sourceMappingURL=config-BabEEVGF.js.map
