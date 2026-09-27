// AppUpdateBanner 的纯视图态 + 与 features/app-update/controller.js(kept
// 控制器)对接的 store 驱动 viewPort(蓝图 §5,镜像
// credentials-view-store.js/glossaries-store.js 的写法)。
//
// 旧世界 update-view-port.js/view.js 全部是 DOM 直写(死,不 import);这里用
// 同名方法签名(bindButton/setChecking/setReady/setAvailable/setLatest/
// setError)重新实现,只是"写"的目的地从 DOM 换成 store。逐字段行为抄自
// src/js/features/app-update/view.js:88-166(setUpdateChecking/setUpdateReady/
// setUpdateAvailable/setUpdateLatest/setUpdateError),controller.js
// (checkForUpdates 编排 + 24h 缓存)一行不改地复用。

import { APP_UPDATE_STATES } from "./app-update-states.js";
import { APP_VERSION } from "./current-version.js";
import { createStore } from "@/platform/store/store.js";
import type { Store } from "@/platform/store/store.js";
import { t } from "@retainpdf/i18n";

/** 事件处理函数表（viewPort.bindEvents 写入 handlersRef） */
export type HandlersBag = {
  [key: string]: ((...args: unknown[]) => unknown) | undefined | null;
};

export type AppUpdatePanel = {
  title: string;
  body: string;
  latestVersion: string;
  currentVersion: string;
  htmlUrl: string;
};

export type AppUpdateViewState = {
  buttonState: string;
  hasUpdate: boolean;
  buttonTitle: string;
  statusText: string;
  panel: AppUpdatePanel;
};

export type AppUpdateViewActions = {
  apply(
    _currentState: AppUpdateViewState,
    nextState: AppUpdateViewState,
  ): AppUpdateViewState;
};

export type AppUpdateViewStore = Store<AppUpdateViewState, AppUpdateViewActions>;

/** 消费方(横幅)只需要订阅与取快照，不需要写入能力。 */
export type AppUpdateReadOnlyStore = Pick<AppUpdateViewStore, "getSnapshot" | "subscribe">;

/** setAvailable / setLatest 的发布信息载荷 */
export type AppUpdateReleaseInfo = {
  latestVersion?: string;
  currentVersion?: string;
  title?: string;
  body?: string;
  htmlUrl?: string;
};

function panelOf({
  title = t("k_a6df3858"),
  body = "",
  latestVersion = "",
  currentVersion = APP_VERSION,
  htmlUrl = "",
}: Partial<AppUpdatePanel> = {}): AppUpdatePanel {
  return { title, body, latestVersion, currentVersion, htmlUrl };
}

export function createAppUpdateViewFeature() {
  const store = createStore<AppUpdateViewState, AppUpdateViewActions>({
    name: "appUpdateView",
    initialState: {
      buttonState: APP_UPDATE_STATES.idle,
      hasUpdate: false,
      buttonTitle: t("k_a6df3858"),
      statusText: "",
      panel: panelOf({
        title: t("k_a6df3858"),
        body: t("k_32cfb9ca"),
      }),
    },
    actions: {
      apply(_currentState, nextState) {
        return nextState;
      },
    },
  });

  const handlersRef: { current: HandlersBag | null } = { current: null };

  const viewPort = {
    bindButton: (handlers: HandlersBag) => {
      handlersRef.current = handlers;
    },
    // 抄自 view.js:88-100(setUpdateChecking)
    setChecking: () => store.actions.apply({
      buttonState: APP_UPDATE_STATES.checking,
      hasUpdate: store.getSnapshot().hasUpdate,
      buttonTitle: t("k_ec437645"),
      statusText: t("k_41375d3b"),
      panel: panelOf({
        title: t("k_ec437645"),
        body: t("k_0740a4e7"),
      }),
    }),
    // 抄自 view.js:102-115(setUpdateReady)
    setReady: () => store.actions.apply({
      buttonState: APP_UPDATE_STATES.idle,
      hasUpdate: false,
      buttonTitle: t("k_a6df3858"),
      statusText: "",
      panel: panelOf({
        title: t("k_a6df3858"),
        body: t("k_32cfb9ca"),
      }),
    }),
    // 抄自 view.js:117-133(setUpdateAvailable)
    setAvailable: (info: AppUpdateReleaseInfo = {}) => store.actions.apply({
      buttonState: APP_UPDATE_STATES.available,
      hasUpdate: true,
      buttonTitle: t("k_3f9c2e45", [info.latestVersion]),
      statusText: t("k_01047404"),
      panel: panelOf({
        title: info.title || `RetainPDF ${info.latestVersion}`,
        body: info.body,
        latestVersion: info.latestVersion,
        currentVersion: info.currentVersion,
        htmlUrl: info.htmlUrl,
      }),
    }),
    // 抄自 view.js:135-151(setUpdateLatest)
    setLatest: (info?: AppUpdateReleaseInfo | null) => store.actions.apply({
      buttonState: APP_UPDATE_STATES.latest,
      hasUpdate: false,
      buttonTitle: t("k_e0f88c29"),
      statusText: t("k_e0f88c29"),
      panel: panelOf({
        title: t("k_e0f88c29"),
        body: t("k_66fe304c"),
        latestVersion: info?.latestVersion || APP_VERSION,
        currentVersion: info?.currentVersion || APP_VERSION,
        htmlUrl: info?.htmlUrl || "",
      }),
    }),
    // 抄自 view.js:153-166(setUpdateError)
    setError: (error?: { message?: string } | null) => store.actions.apply({
      buttonState: APP_UPDATE_STATES.error,
      hasUpdate: false,
      buttonTitle: t("k_c76c74e8"),
      statusText: t("k_9fe494e7"),
      panel: panelOf({
        title: t("k_c76c74e8"),
        body: error?.message || t("k_a894ec0b"),
      }),
    }),
  };

  return {
    store,
    viewPort,
    handlersRef,
  };
}
