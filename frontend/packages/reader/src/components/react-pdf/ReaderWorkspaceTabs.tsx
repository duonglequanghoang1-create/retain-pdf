import type { ReactElement } from "react";
import { Columns2, FileText, Languages, Radio } from "lucide-react";
import type { LiveTranslationState } from "../../shared/data/live-translation-state.js";
import { useReaderContext } from "./reader-context.js";
import { t } from "@retainpdf/i18n";

export type ReaderWorkspaceView = "reading" | "compare" | "markdown" | "ai";
export type ReaderWorkspaceMode = "source" | "compare" | "translated";

const WORKSPACES = [
  { id: "source", label: t("k_be43b936"), Icon: FileText },
  { id: "compare", label: t("k_d36792e9"), Icon: Columns2 },
  { id: "translated", label: t("k_83ca9fe3"), Icon: Languages },
] as const;

export type ReaderWorkspaceTabsProps = {
  mode: ReaderWorkspaceMode;
  documentReady: boolean;
  /**
   * 「无可并排的最终译文」(sourceOnly || !translatedUrl)。
   * 与 FAB 的 sourceOnly（无 job）语义不同：禁对照/译文页签看这个。
   */
  sourceViewOnly?: boolean;
  onModeChange: (mode: ReaderWorkspaceMode) => void;
  liveTranslation?: {
    visible: boolean;
    state: LiveTranslationState;
    onToggle: () => void;
  } | null;
};

export function liveTranslationStatusCopy(state: LiveTranslationState): string {
  if (state.connection === "live") return t("k_4d5106b4", [state.pagesByPage.size]);
  if (state.connection === "reconnecting") return t("k_612314c3");
  if (state.connection === "unavailable") return t("k_ef363ec6");
  if (state.connection === "terminal") {
    if (state.jobStatus === "failed") return t("k_05b7117c");
    if (state.jobStatus === "cancelled" || state.jobStatus === "canceled") return t("k_80a389c5");
    if (state.jobStatus === "succeeded") return t("k_9f9b048b");
    return t("k_7584faa0");
  }
  return state.error || t("k_c24c8401");
}

export function isReaderWorkspaceDisabled(input: {
  id: ReaderWorkspaceMode;
  documentReady: boolean;
  /** 「无可并排的最终译文」；有 live 译文时对照仍可开 */
  sourceViewOnly: boolean;
  liveTranslationAvailable: boolean;
}): boolean {
  if (input.id === "translated") return input.sourceViewOnly;
  if (input.id === "compare") {
    return !input.documentReady || (input.sourceViewOnly && !input.liveTranslationAvailable);
  }
  return false;
}

export function ReaderWorkspaceTabs(props: ReaderWorkspaceTabsProps): ReactElement {
  const ctx = useReaderContext();
  const {
    mode,
    documentReady,
    onModeChange,
    liveTranslation = null,
  } = props;
  const sourceViewOnly = props.sourceViewOnly ?? ctx?.sourceViewOnly ?? false;
  const liveCopy = liveTranslation ? liveTranslationStatusCopy(liveTranslation.state) : "";
  return (
    <header className="reader-workspace-bar">
      {liveTranslation ? (
        <button
          type="button"
          className={`reader-live-translation-toggle is-${liveTranslation.state.connection}${liveTranslation.visible ? " is-active" : ""}`}
          aria-pressed={liveTranslation.visible}
          aria-label={liveTranslation.visible ? t("k_5a95b341") : t("k_148c107b")}
          title={liveTranslation.state.error || liveCopy}
          onClick={liveTranslation.onToggle}
        >
          <Radio size={14} strokeWidth={2.2} aria-hidden />
          <span className="reader-live-translation-toggle-label">{liveCopy}</span>
        </button>
      ) : null}
      <div className="reader-workspace-tabs" role="tablist" aria-label={t("k_33e8f7e9")}>
        {WORKSPACES.map(({ id, label, Icon }) => {
          const active = mode === id;
          const disabled = isReaderWorkspaceDisabled({
            id,
            documentReady,
            sourceViewOnly,
            liveTranslationAvailable: Boolean(liveTranslation),
          });
          return (
            <button
              key={id}
              type="button"
              className={`reader-workspace-tab${active ? " is-active" : ""}`}
              role="tab"
              aria-selected={active}
              aria-label={label}
              title={disabled ? t("k_0fb4778a", [label]) : label}
              disabled={disabled}
              onClick={() => onModeChange(id)}
            >
              <Icon size={15} strokeWidth={2.2} aria-hidden />
              <span className="reader-workspace-tab-label">{label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
