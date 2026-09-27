// Factory for the typed tree port handed to the reading request hook. The
// shell passes its own React setters; the returned port never exposes them.

import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { ReaderAskTreeItem } from "./reader-ask-tree.js";
import type { ReaderConversationTreePort } from "./reader-conversation-ports.js";
import { t } from "@retainpdf/i18n";

export function createReaderConversationTreePort(input: {
  setItems: Dispatch<SetStateAction<ReaderAskTreeItem[]>>;
  setHeadId: Dispatch<SetStateAction<string | null>>;
  itemsRef: MutableRefObject<ReaderAskTreeItem[]>;
  headIdRef: MutableRefObject<string | null>;
}): ReaderConversationTreePort {
  const { setItems, setHeadId } = input;
  return {
    readItems: () => input.itemsRef.current,
    readHeadId: () => input.headIdRef.current,
    appendExchange: ({ parentId, userId, assistantId, question, progress }) => {
      setItems((prev) => [
        ...prev,
        { parentId, message: { id: userId, role: "user", content: question } },
        {
          parentId: userId,
          message: {
            id: assistantId,
            role: "assistant",
            content: "",
            progress,
            status: { type: "running" },
            citations: [],
          },
        },
      ]);
      setHeadId(assistantId);
    },
    appendRetryTurn: ({ assistantId, branchParent }) => {
      setItems((prev) => [
        ...prev,
        {
          parentId: branchParent,
          message: {
            id: assistantId,
            role: "assistant",
            content: "",
            progress: t("k_f7adee6c"),
            status: { type: "running" },
            citations: [],
          },
        },
      ]);
      setHeadId(assistantId);
    },
    markRunningCancelled: () => {
      setItems((prev) =>
        prev.map((item) =>
          item.message.status?.type === "running"
            ? {
              ...item,
              message: {
                ...item.message,
                status: { type: "incomplete", reason: "cancelled" as const },
                progress: "",
                content: item.message.content.trim() || t("k_a5ffdc95"),
              },
            }
            : item,
        ),
      );
    },
    markRunningAsError: (message) => {
      const fallback = `${message || ""}`.trim() || t("k_dbb9ca66");
      setItems((prev) => prev.map((item) => (
        item.message.status?.type === "running"
          ? {
            ...item,
            message: {
              ...item.message,
              content: item.message.content.trim() || fallback,
              progress: "",
              citations: [],
              status: { type: "incomplete" as const, reason: "error" as const },
            },
          }
          : item
      )));
    },
    mergeChatMirror: (patches) => {
      if (!patches.size) return;
      setItems((previous) => previous.map((item) => {
        const next = patches.get(item.message.id);
        if (!next) return item;
        return { ...item, message: { ...item.message, ...next } };
      }));
    },
  };
}
