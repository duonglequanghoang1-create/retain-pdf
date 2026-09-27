import { t } from "@retainpdf/i18n";

// 工具事件标签真值：web home-ask 与 reader assistant 共用的纯映射。
export const TOOL_EVENT_LABELS: Record<string, string> = {
  search_markdown: t("k_3089aa61"),
  read_markdown_chunk: t("k_009fda19"),
  list_documents: t("k_f1ccf739"),
  read_blocks: t("k_6fad1fb3"),
  search_favorites: t("k_86515534"),
  search_fulltext: t("k_d56bf19c"),
  calculate_expression: t("k_80a343d7"),
  calculate_statistics: t("k_99f8f3e4"),
  analyze_table: t("k_5f2df8fb"),
  generate_chart: t("k_356e1521"),
};

export function describeToolEvent(
  event: { tool?: string; event?: string; type?: string; title?: string } | string | null | undefined,
): string {
  // 不看 `type`。SSE 事件的 `type` 是信封名（`agent_tool`），不是工具名——退到它会
  // 在界面上显示「执行 agent_tool」，把事件类型当成工具报给用户。
  const key = typeof event === "string"
    ? event
    : `${event?.tool || event?.event || ""}`;
  if (TOOL_EVENT_LABELS[key]) return TOOL_EVENT_LABELS[key];
  if (key) return t("k_baad05d5", [key]);
  // 后端的 title 是英文的，只在没有工具名时兜底，好过显示「处理中」。
  const title = typeof event === "string" ? "" : `${event?.title || ""}`.trim();
  return title || t("k_fcb979ef");
}
