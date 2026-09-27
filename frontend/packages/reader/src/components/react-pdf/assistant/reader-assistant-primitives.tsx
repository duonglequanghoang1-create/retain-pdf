// Small shared presentation primitives for the Reader assistant thread.
// Reading and operations views compose these; neither view owns runtime or
// backend state.

import { t } from "@retainpdf/i18n";
import {
  ActionBarPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  type MessageState,
} from "@assistant-ui/react";
import {
  ArrowUp,
  BookOpen,
  Copy,
  GitBranch,
  Image,
  Loader2,
  RefreshCw,
  Sigma,
  Sparkles,
  Square,
  Table2,
  Type,
  X,
} from "lucide-react";
import { MISSING_MODEL_API_KEY_MESSAGE } from "../../../external.js";
import { armReaderAiClickShield, lockReaderAiNavigation } from "../../../external.js";
import type { AiCitationLike } from "../../../external.js";
import { AiMarkdownAnswer } from "../../ai/AiMarkdownAnswer.js";
import type { ReaderAssistantMode } from "../../../shared/ai/ask-answerer.js";
import {
  readerRegionContent,
  type ReaderSelection,
} from "../../../shared/data/reader-regions.js";

export function assistantMessageText(message: Pick<MessageState, "content">): string {
  return message.content
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

export function ThinkingRow({ label }: { label: string }) {
  return (
    <div className="aui-thinking" role="status" aria-live="polite">
      <Loader2 className="aui-spin" size={14} strokeWidth={2.4} aria-hidden />
      <span>{label || t("k_29653ff3")}</span>
    </div>
  );
}

export function UserMessageRow({ message }: { message: MessageState }) {
  return (
    <MessagePrimitive.Root className="aui-msg aui-msg-user" data-role="user">
      <div className="aui-msg-bubble">
        <div className="aui-md-plain">{assistantMessageText(message)}</div>
      </div>
    </MessagePrimitive.Root>
  );
}

export type AssistantMessageRowProps = {
  jobId: string;
  message: MessageState;
  citations: AiCitationLike[];
  progress: string;
  /** 这条回答为什么不完整（"rounds_exhausted" 等）；空 = 正常答完。 */
  incompleteReason: string;
  streaming: boolean;
  branchBusy: boolean;
  onJumpCitation?: (citation: AiCitationLike) => void;
  onBranchFromAnswer?: (assistantMessageId: string) => void | Promise<boolean | void>;
};

export function AssistantMessageRow({
  jobId,
  message,
  citations,
  progress,
  incompleteReason,
  streaming,
  branchBusy,
  onJumpCitation,
  onBranchFromAnswer,
}: AssistantMessageRowProps) {
  const content = assistantMessageText(message);
  return (
    <MessagePrimitive.Root className="aui-msg aui-msg-assistant" data-role="assistant">
      <div className="aui-msg-stack">
        {streaming && progress ? <ThinkingRow label={progress} /> : null}
        {streaming && !progress && !content ? <ThinkingRow label={t("k_29653ff3")} /> : null}
        {/* 轮次预算用尽、模型被强制收尾。它写出来的话语气照常,不标出来就看不出。
            阅读模式的预算(3)比主页(6)更紧,这一侧其实更容易撞上。
            只认识的原因才渲染——将来契约多一种值时,宁可不显示也别瞎解释一句。 */}
        {!streaming && incompleteReason === "rounds_exhausted" ? (
          <div className="aui-msg-truncated" role="status">
            {t("k_3be85c90")}
          </div>
        ) : null}
        {content ? (
          <div className="aui-msg-bubble">
            <AiMarkdownAnswer
              content={content}
              streaming={streaming}
              citations={citations}
              jobId={jobId}
              className="aui-md"
              streamingClassName="aui-md-streaming"
              pendingClassName="aui-md-pending"
              finalClassName="aui-md-final"
              onJumpCitation={onJumpCitation}
            />
          </div>
        ) : null}
        <ActionBarPrimitive.Root
          className="aui-msg-actions"
          data-reader-ai-actions=""
          hideWhenRunning
          autohide="not-last"
        >
          <ActionBarPrimitive.Copy className="aui-action-btn" aria-label={t("k_b2dcbbf3")} title={t("k_b2dcbbf3")}>
            <Copy size={14} strokeWidth={2.1} aria-hidden />
          </ActionBarPrimitive.Copy>
          {onBranchFromAnswer ? (
            <button
              type="button"
              className="aui-action-btn aui-action-btn-branch"
              aria-label={t("k_ccce11aa")}
              title={t("k_ccce11aa")}
              disabled={branchBusy}
              onClick={async () => {
                armReaderAiClickShield(1200, { overlayDelayMs: 0 });
                lockReaderAiNavigation(1200);
                await onBranchFromAnswer(message.id);
              }}
            >
              <GitBranch size={14} strokeWidth={2.2} aria-hidden />
            </button>
          ) : null}
          <ActionBarPrimitive.Reload className="aui-action-btn" aria-label={t("k_2e190570")} title={t("k_2e190570")}>
            <RefreshCw size={14} strokeWidth={2.2} aria-hidden />
          </ActionBarPrimitive.Reload>
        </ActionBarPrimitive.Root>
      </div>
    </MessagePrimitive.Root>
  );
}

export function ThreadMessageList({
  jobId,
  citationsByMessageId,
  progressByMessageId,
  incompleteByMessageId,
  streamingAssistantId,
  isRunning,
  branchBusy,
  onJumpCitation,
  onBranchFromAnswer,
}: {
  jobId: string;
  citationsByMessageId: Record<string, AiCitationLike[]>;
  progressByMessageId: Record<string, string>;
  incompleteByMessageId: Record<string, string>;
  streamingAssistantId: string;
  isRunning: boolean;
  branchBusy: boolean;
  onJumpCitation?: (citation: AiCitationLike) => void;
  onBranchFromAnswer?: (assistantMessageId: string) => void | Promise<boolean | void>;
}) {
  return (
    <div className="aui-message-group" data-slot="aui_message-group">
      <ThreadPrimitive.Messages>
        {({ message }) => {
          if (message.role === "user") return <UserMessageRow message={message} />;
          if (message.role !== "assistant") return null;
          const streaming = message.status?.type === "running"
            || (isRunning && streamingAssistantId === message.id);
          return (
            <AssistantMessageRow
              jobId={jobId}
              message={message}
              citations={citationsByMessageId[message.id] || []}
              progress={progressByMessageId[message.id] || ""}
              incompleteReason={incompleteByMessageId[message.id] || ""}
              streaming={streaming}
              branchBusy={branchBusy}
              onJumpCitation={onJumpCitation}
              onBranchFromAnswer={onBranchFromAnswer}
            />
          );
        }}
      </ThreadPrimitive.Messages>
    </div>
  );
}

export function ModeSwitch({
  mode,
  disabled,
  onChange,
}: {
  mode: ReaderAssistantMode;
  disabled: boolean;
  onChange?: (mode: ReaderAssistantMode) => void;
}) {
  return (
    <div className="aui-assistant-mode" role="group" aria-label={t("k_39633dce")}>
      <button
        type="button"
        className={mode !== "operations" ? "is-active" : ""}
        aria-pressed={mode !== "operations"}
        disabled={disabled}
        onClick={() => onChange?.("reading")}
      >
        <BookOpen size={12} strokeWidth={2.2} aria-hidden />
        <span>{t("k_8e7621d7")}</span>
      </button>
      <button
        type="button"
        className={mode === "operations" ? "is-active" : ""}
        aria-pressed={mode === "operations"}
        disabled={disabled}
        onClick={() => onChange?.("operations")}
      >
        <Sparkles size={12} strokeWidth={2.2} aria-hidden />
        <span>PDF Agent</span>
      </button>
    </div>
  );
}

export function SelectionBanner({
  selectionContext,
  onClear,
}: {
  selectionContext?: ReaderSelection | null;
  onClear?: () => void;
}) {
  if (!selectionContext) return null;
  const kind = selectionContext.selectionType === "text" ? "text" : selectionContext.kind;
  const text = selectionContext.selectionType === "text"
    ? selectionContext.quote
    : readerRegionContent(selectionContext.region, selectionContext.pane);
  const label = kind === "formula" ? t("k_3f27035a")
    : kind === "table" ? t("k_150074c2")
      : kind === "figure" ? t("k_be8da62e")
        : t("k_f4d3dab8");
  const SelectionIcon = kind === "formula" ? Sigma
    : kind === "table" ? Table2
      : kind === "figure" ? Image : Type;
  return (
    <div className="aui-selection-context" data-reader-ai-selection-context="">
      <SelectionIcon size={14} strokeWidth={2.1} aria-hidden />
      <span className="aui-selection-context-meta">
        {selectionContext.pane === "translated" ? t("k_647e0016") : t("k_4d69dbdf")} · {selectionContext.page} {t("k_aa0f1ce1")} {label}
      </span>
      <span className="aui-selection-context-text">{text || t("k_3ec18a8b")}</span>
      <button
        type="button"
        className="aui-selection-context-remove"
        aria-label={t("k_5a1c32a3")}
        title={t("k_674f24d9")}
        onClick={onClear}
      >
        <X size={13} strokeWidth={2.4} aria-hidden />
      </button>
    </div>
  );
}

export function AssistantComposer({
  isRunning,
  branchBusy,
  mode,
  onModeChange,
  selectionContext,
  onClearSelectionContext,
}: {
  isRunning: boolean;
  branchBusy: boolean;
  mode: ReaderAssistantMode;
  onModeChange?: (mode: ReaderAssistantMode) => void;
  selectionContext?: ReaderSelection | null;
  onClearSelectionContext?: () => void;
}) {
  return (
    <ComposerPrimitive.Root className="aui-composer" data-reader-ai-composer="">
      <div className="aui-composer-shell">
        {mode !== "operations" ? (
          <SelectionBanner selectionContext={selectionContext} onClear={onClearSelectionContext} />
        ) : null}
        <ComposerPrimitive.Input
          className="aui-input"
          rows={1}
          placeholder={mode === "operations" ? t("k_1b634612") : t("k_139abb6f")}
          aria-label={mode === "operations" ? t("k_add94cc5") : t("k_5cc2cdd4")}
          autoFocus
          enterKeyHint="send"
          disabled={branchBusy}
          submitMode="enter"
        />
        <div className="aui-composer-toolbar">
          <ModeSwitch mode={mode} disabled={isRunning || branchBusy} onChange={onModeChange} />
          <div className="aui-composer-actions">
            {isRunning ? (
              <ComposerPrimitive.Cancel className="aui-send aui-send-stop" aria-label={t("k_76349aa6")}>
                <Square size={12} strokeWidth={2.6} aria-hidden />
              </ComposerPrimitive.Cancel>
            ) : (
              <ComposerPrimitive.Send className="aui-send" aria-label={t("k_1214d633")}>
                <ArrowUp size={16} strokeWidth={2.5} aria-hidden />
              </ComposerPrimitive.Send>
            )}
          </div>
        </div>
      </div>
      <p className="aui-hint">{t("k_60444962")}</p>
    </ComposerPrimitive.Root>
  );
}

export function LockedComposer() {
  return (
    <div className="aui-composer aui-composer-locked" role="alert">
      <p className="aui-llm-lock-msg">{MISSING_MODEL_API_KEY_MESSAGE}</p>
      <p className="aui-hint">{t("k_0c36d150")}</p>
    </div>
  );
}
