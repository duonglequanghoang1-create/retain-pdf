// @retainpdf/reader/boot — explicit MPA startup API (react-pdf only).
import { createRoot, type Root } from "react-dom/client";
import { ReaderApp } from "./ReaderApp.js";
import {
  clearReaderAiNavigationLock,
  installReaderWindowOpenGuard,
} from "./external.js";
import { bootTheme } from "./shared/theme/theme.js";
import { initI18n } from "@retainpdf/i18n";

export type ReaderBootOptions = {
  body?: HTMLElement;
  root?: HTMLElement;
  purgeLegacyMarkup?: boolean;
};

export function syncReaderBodyClasses(body: HTMLElement = document.body): void {
  body.classList.add("reader-body", "reader-mode-compare");
  if (globalThis.window && window.self !== window.top) {
    body.classList.add("reader-embedded");
  }
}

/**
 * Removes any sibling markup that predates the Reader mount. Retained
 * intentionally as a defensive cleanup: a stale cached MPA shell (old HTML)
 * can still contain legacy markup, and this is the only guarantee that the
 * React root owns <body>. `bootReader` calls it unless the host explicitly
 * opts out via `purgeLegacyMarkup: false`.
 */
export function purgeLegacyMarkup(
  body: HTMLElement = document.body,
  preservedRoot?: HTMLElement,
): void {
  Array.from(body.children).forEach((element) => {
    if (
      element.tagName !== "SCRIPT"
      && element.id !== "reader-root"
      && element !== preservedRoot
    ) {
      element.remove();
    }
  });
}

export function resolveReaderRoot(body: HTMLElement = document.body): HTMLElement {
  let host = document.getElementById("reader-root");
  if (!host) {
    host = document.createElement("div");
    host.id = "reader-root";
    body.appendChild(host);
  }
  return host;
}

export function bootReader(options: ReaderBootOptions = {}): Root {
  const body = options.body ?? document.body;
  const host = options.root ?? resolveReaderRoot(body);

  // reader 页是独立入口，不经过 web 的 shell-boot，所以语言初始化要在这里做，
  // 否则 t() 一直停在默认中文，用户在主页选的越南语到这一页就不生效。
  // 幂等：detail/home 已经初始化过的话这次调用只是重新读一次存储。
  initI18n();
  bootTheme();
  clearReaderAiNavigationLock();
  installReaderWindowOpenGuard();
  syncReaderBodyClasses(body);
  if (options.purgeLegacyMarkup !== false) {
    purgeLegacyMarkup(body, host);
  }

  const root = createRoot(host);
  root.render(<ReaderApp />);
  return root;
}
