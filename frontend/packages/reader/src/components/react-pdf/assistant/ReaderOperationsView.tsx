// PDF Agent presentation: explicit operation requests with candidate
// preview and confirmation. Selection quotes are never attached here;
// operations are always document-scoped.

import { ThreadPrimitive } from "@assistant-ui/react";
import { ArrowDown, FileText, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { AiCitationLike } from "../../../external.js";
import {
  AssistantComposer,
  LockedComposer,
  ThreadMessageList,
} from "./reader-assistant-primitives.js";
import { t } from "@retainpdf/i18n";

const OPERATION_SUGGESTIONS = [
  { prompt: t("k_704807bb"), label: t("k_2670123f"), icon: FileText },
  { prompt: t("k_980317b7"), label: t("k_661cc5df"), icon: FileText },
] as const;

export type ReaderOperationsViewProps = {
  jobId: string;
  empty: boolean;
  citationsByMessageId: Record<string, AiCitationLike[]>;
  progressByMessageId: Record<string, string>;
  incompleteByMessageId: Record<string, string>;
  streamingAssistantId: string;
  isRunning: boolean;
  missingLlmKey: boolean;
  branchBusy: boolean;
  agentRequestBlocked?: boolean;
  agentOperationPanel?: ReactNode;
  onModeChange?: (mode: "reading" | "operations") => void;
  onJumpCitation?: (citation: AiCitationLike) => void;
  onBranchFromAnswer?: (assistantMessageId: string) => void | Promise<boolean | void>;
};

export function ReaderOperationsView({
  jobId,
  empty,
  citationsByMessageId,
  progressByMessageId,
  incompleteByMessageId,
  streamingAssistantId,
  isRunning,
  missingLlmKey,
  branchBusy,
  agentRequestBlocked = false,
  agentOperationPanel,
  onModeChange,
  onJumpCitation,
  onBranchFromAnswer,
}: ReaderOperationsViewProps) {
  const blocked = branchBusy || agentRequestBlocked;
  return (
    <>
      {empty ? (
        <div className="aui-empty">
          <div className="aui-empty-mascot" aria-hidden>
            <span className="aui-empty-mascot-face">
              <Sparkles size={21} strokeWidth={1.9} />
            </span>
          </div>
          <h2 className="aui-empty-title">想怎样处理 PDF？</h2>
          <p className="aui-empty-sub">创建候选版本后由你预览和确认</p>
          <div className="aui-suggestions" role="group" aria-label={t("k_402274e3")}>
            {OPERATION_SUGGESTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <ThreadPrimitive.Suggestion
                  key={item.prompt}
                  prompt={item.prompt}
                  send
                  type="button"
                  className="aui-suggestion"
                  disabled={blocked || missingLlmKey}
                >
                  <Icon size={14} strokeWidth={2} aria-hidden className="aui-suggestion-icon" />
                  <span className="aui-suggestion-label">{item.label}</span>
                </ThreadPrimitive.Suggestion>
              );
            })}
          </div>
        </div>
      ) : null}
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
      {agentOperationPanel}
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
            branchBusy={blocked}
            mode="operations"
            onModeChange={onModeChange}
            selectionContext={null}
            onClearSelectionContext={undefined}
          />
        )}
      </ThreadPrimitive.ViewportFooter>
    </>
  );
}
