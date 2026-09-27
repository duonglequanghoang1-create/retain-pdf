// 切语言的 React 接线：把模块级的语言状态接进渲染树。
//
// 为什么需要它：t() 读的是模块级变量，React 不知道它变了，切换语言不会触发
// 重渲染。这里用一个极小的订阅 + useSyncExternalStore 把外部状态接进来，
// 不引入 i18n 框架，也不改现有 Provider 树。

import { useSyncExternalStore } from "react";
import { getLocale, onLocaleChange, setLocale, t } from "@retainpdf/i18n";
import type { Locale } from "@retainpdf/i18n";

/** 当前语言；语言变化时让调用方重渲染。 */
export function useLocale(): Locale {
  return useSyncExternalStore(
    onLocaleChange,
    getLocale,
    getLocale,
  );
}

export function useTranslate() {
  // 订阅语言，保证切换后重新取文案。
  useLocale();
  return t;
}

export { setLocale, t };
export type { Locale };
