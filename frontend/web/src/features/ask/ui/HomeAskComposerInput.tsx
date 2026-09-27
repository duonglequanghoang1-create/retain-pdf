// HomeAskComposer 输入区：textarea（缺凭据也不锁死，只在发送时刻引导补 Key）

import type {
  KeyboardEvent as ReactKeyboardEvent,
  RefObject,
} from "react";
import { t as tr } from "@retainpdf/i18n";

export type HomeAskComposerInputProps = {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  text: string;
  inputDisabled: boolean;
  scopeCount: number;
  variant: "hero" | "dock";
  onTextChange: (value: string, caret: number) => void;
  onSyncCaret: (value: string, caret: number) => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void;
};

export function HomeAskComposerInput({
  textareaRef,
  text,
  inputDisabled,
  scopeCount,
  variant,
  onTextChange,
  onSyncCaret,
  onKeyDown,
}: HomeAskComposerInputProps) {
  return (
    <textarea
      ref={textareaRef}
      className="home-ask-input"
      rows={2}
      value={text}
      disabled={inputDisabled}
      placeholder={
        scopeCount
          ? tr("k_1daf01c2")
          : variant === "hero"
            ? tr("k_d6610ec5")
            : tr("k_dea30205")
      }
      onChange={(e) => {
        const value = e.target.value;
        onTextChange(value, e.target.selectionStart ?? value.length);
      }}
      onClick={(e) => {
        const t = e.currentTarget;
        onSyncCaret(t.value, t.selectionStart ?? t.value.length);
      }}
      onKeyUp={(e) => {
        const t = e.currentTarget;
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
          onSyncCaret(t.value, t.selectionStart ?? t.value.length);
        }
      }}
      onKeyDown={onKeyDown}
    />
  );
}
