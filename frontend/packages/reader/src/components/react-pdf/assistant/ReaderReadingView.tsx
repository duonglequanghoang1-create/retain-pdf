// Reading Q&A presentation: summaries, explanations, and cited answers.
// This view never mutates the PDF; selection context stays visible here and
// PDF Agent operation UI is never rendered in this component.

import { ThreadPrimitive } from "@assistant-ui/react";
import { ArrowDown, BookOpen, FlaskConical, ListTree, Sigma, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { AiCitationLike } from "../../../external.js";
import type { ReaderSelection } from "../../../shared/data/reader-regions.js";
import {
  AssistantComposer,
  LockedComposer,
  ThreadMessageList,
} from "./reader-assistant-primitives.js";
import { AnswerSelectionToolbar } from "./AnswerSelectionToolbar.js";
import { t } from "@retainpdf/i18n";

const READING_SUGGESTIONS = [
  { prompt: t("k_0ed2b98b"), label: t("k_b4242ae0"), icon: BookOpen },
  { prompt: t("k_7c4b9acb"), label: t("k_c663ef97"), icon: ListTree },
  { prompt: t("k_fc1d35fd"), label: t("k_5471130d"), icon: FlaskConical },
  { prompt: t("k_a9440fe8"), label: t("k_55f0c6fc"), icon: Sigma },
] as const;

export type ReaderReadingViewProps = {
  jobId: string;
  empty: boolean;
  citationsByMessageId: Record<string, AiCitationLike[]>;
  progressByMessageId: Record<string, string>;
  incompleteByMessageId: Record<string, string>;
  streamingAssistantId: string;
  isRunning: boolean;
  missingLlmKey: boolean;
  branchBusy: boolean;
  composerDisabled?: boolean;
  onModeChange?: (mode: "reading" | "operations") => void;
  onJumpCitation?: (citation: AiCitationLike) => void;
  onBranchFromAnswer?: (assistantMessageId: string) => void | Promise<boolean | void>;
  selectionContext?: ReaderSelection | null;
  onClearSelectionContext?: () => void;
  footerExtra?: ReactNode;
};

export function ReaderReadingView({
  jobId,
  empty,
  citationsByMessageId,
  progressByMessageId,
  incompleteByMessageId,
  streamingAssistantId,
  isRunning,
  missingLlmKey,
  branchBusy,
  composerDisabled = false,
  onModeChange,
  onJumpCitation,
  onBranchFromAnswer,
  selectionContext = null,
  onClearSelectionContext,
  footerExtra = null,
}: ReaderReadingViewProps) {
  return (
    <>
      {empty ? (
        <div className="aui-empty">
          <div className="aui-empty-mascot" aria-hidden>
            <span className="aui-empty-mascot-face">
              <Sparkles size={21} strokeWidth={1.9} />
            </span>
          </div>
          <h2 className="aui-empty-title">{t("k_fa7ccc3f")}</h2>
          <p className="aui-empty-sub">{t("k_2dff1715")}</p>
          <div className="aui-suggestions" role="group" aria-label={t("k_402274e3")}>
            {READING_SUGGESTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <ThreadPrimitive.Suggestion
                  key={item.prompt}
                  prompt={item.prompt}
                  send
                  type="button"
                  className="aui-suggestion"
                  disabled={branchBusy || composerDisabled || missingLlmKey}
                >
                  <Icon size={14} strokeWidth={2} aria-hidden className="aui-suggestion-icon" />
                  <span className="aui-suggestion-label">{item.label}</span>
                </ThreadPrimitive.Suggestion>
              );
            })}
          </div>
        </div>
      ) : null}
      <AnswerSelectionToolbar />
      <ThreadMessageList
        jobId={jobId}
        citationsByMessageId={citationsByMessageId}
        progressByMessageId={progressByMessageId}
        incompleteByMessageId={incompleteByMessageId}
        streamingAssistantId={streamingAssistantId}
        isRunning={isRunning}
        branchBusy={branchBusy}
        onJumpCitation={onJumpCitation}
        onBranchFromAnswer={onBranchFromAnswer}
      />
      {footerExtra}
      <ThreadPrimitive.ViewportFooter className="aui-thread-viewport-footer">
        {!empty && !branchBusy ? (
          <ThreadPrimitive.ScrollToBottom
            className="aui-scroll-bottom-btn aui-scroll-bottom"
            aria-label={t("k_f2936d26")}
          >
            <ArrowDown size={16} strokeWidth={2.25} aria-hidden />
          </ThreadPrimitive.ScrollToBottom>
        ) : null}
        {missingLlmKey ? <LockedComposer /> : (
          <AssistantComposer
            isRunning={isRunning}
            branchBusy={branchBusy || composerDisabled}
            mode="reading"
            onModeChange={onModeChange}
            selectionContext={selectionContext}
            onClearSelectionContext={onClearSelectionContext}
          />
        )}
      </ThreadPrimitive.ViewportFooter>
    </>
  );
}
