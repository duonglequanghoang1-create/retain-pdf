// 阅读器键位的唯一真源：实现（use-reader-keyboard）按 READER_KEY_BINDINGS 分发，
// 说明浮层（ReaderShortcutsHelp）按 READER_SHORTCUT_HELP 渲染。
// j/↓/PageDown 下页 · k/↑/PageUp 上页 · Home/End 首末页
// +/- 缩放 · 0 重置模式默认缩放 · 1/2/3 源文件/对照/翻译文件

import type { ReaderMode } from "./use-reader-session.js";
import { t } from "@retainpdf/i18n";

export type ReaderKeyAction =
  | "next-page"
  | "prev-page"
  | "first-page"
  | "last-page"
  | "zoom-in"
  | "zoom-out"
  | "zoom-reset"
  | "mode-source"
  | "mode-compare"
  | "mode-translated";

export type ReaderKeyBinding = {
  action: ReaderKeyAction;
  /** 匹配 event.key；单字符（字母/符号）不区分大小写，多字符（方向键等）精确匹配 */
  keys: readonly string[];
  /** mode-* 动作对应的模式；sourceOnly 时仅 source 可用 */
  mode?: ReaderMode;
  /** 需要已加载页数（numPages > 0）才触发，否则不拦截默认行为 */
  requiresPages?: boolean;
};

export const READER_KEY_BINDINGS: readonly ReaderKeyBinding[] = [
  { action: "mode-source", keys: ["1"], mode: "source" },
  { action: "mode-compare", keys: ["2"], mode: "compare" },
  { action: "mode-translated", keys: ["3"], mode: "translated" },
  { action: "zoom-in", keys: ["+", "="] },
  { action: "zoom-out", keys: ["-", "_"] },
  { action: "zoom-reset", keys: ["0"] },
  { action: "next-page", keys: ["j", "ArrowDown", "PageDown"], requiresPages: true },
  { action: "prev-page", keys: ["k", "ArrowUp", "PageUp"], requiresPages: true },
  { action: "first-page", keys: ["Home"], requiresPages: true },
  { action: "last-page", keys: ["End"], requiresPages: true },
];

export type ReaderShortcutHelpItem = {
  /** 该条目覆盖的实现动作；供防漂移测试核对，纯鼠标提示为空 */
  actions: readonly ReaderKeyAction[];
  keys: string;
  desc: string;
};

export type ReaderShortcutHelpGroup = {
  title: string;
  items: readonly ReaderShortcutHelpItem[];
};

export const READER_SHORTCUT_HELP: readonly ReaderShortcutHelpGroup[] = [
  {
    title: t("k_cfd0fb44"),
    items: [
      { actions: ["next-page"], keys: "J · ↓ · PgDn", desc: t("k_67a246a3") },
      { actions: ["prev-page"], keys: "K · ↑ · PgUp", desc: t("k_b41561d8") },
      { actions: ["first-page", "last-page"], keys: "Home / End", desc: t("k_965935cd") },
      { actions: [], keys: t("k_233266d7"), desc: t("k_ca426134") },
    ],
  },
  {
    title: t("k_12e2ed4d"),
    items: [
      { actions: ["zoom-in", "zoom-out"], keys: "+ / −", desc: t("k_5a1e4ac3") },
      { actions: ["zoom-reset"], keys: "0", desc: t("k_bde63db0") },
      { actions: [], keys: t("k_7c0e2ef8"), desc: t("k_bde63db0") },
    ],
  },
  {
    title: t("k_ed0eea8f"),
    items: [
      { actions: ["mode-source"], keys: "1", desc: t("k_be43b936") },
      { actions: ["mode-compare"], keys: "2", desc: t("k_d36792e9") },
      { actions: ["mode-translated"], keys: "3", desc: t("k_83ca9fe3") },
    ],
  },
];

/** 按 event.key 命中第一个绑定；单字符键不区分大小写。 */
export function matchReaderKeyBinding(key: string): ReaderKeyBinding | null {
  const normalized = key.length === 1 ? key.toLowerCase() : key;
  for (const binding of READER_KEY_BINDINGS) {
    const matched = binding.keys.some((candidate) =>
      candidate.length === 1 ? candidate === normalized : candidate === key,
    );
    if (matched) return binding;
  }
  return null;
}
