import { t } from "@retainpdf/i18n";

// 阅读器工具定义（自包含版，从 frontend/web/src/pages/reader/tools/registry.ts 复制）

export type ReaderToolId = "favorites" | "markdown" | "ai";

export type ReaderToolDef = {
  id: ReaderToolId;
  label: string;
  /** 副文案（关 / 开） */
  subIdle: string;
  subOpen: string;
  /** 源文档只读时是否禁用 */
  needsJob: boolean;
};

/** 与 legacy ReaderTopbarActions.TOOL_BUTTONS 同一套能力 */
export const READER_TOOLS: readonly ReaderToolDef[] = Object.freeze([
  {
    id: "favorites",
    label: t("k_046a3be9"),
    subIdle: t("k_54a42370"),
    subOpen: t("k_803658e0"),
    needsJob: false,
  },
  {
    id: "markdown",
    label: "Markdown",
    subIdle: t("k_991aec8a"),
    subOpen: t("k_803658e0"),
    needsJob: true,
  },
  {
    id: "ai",
    label: t("k_4e0478a9"),
    subIdle: t("k_7d66d5a4"),
    subOpen: t("k_803658e0"),
    needsJob: true,
  },
]);
