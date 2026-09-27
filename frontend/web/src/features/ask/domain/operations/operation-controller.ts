import { t } from "@retainpdf/i18n";
import {
  agentOperationErrorMessage,
  agentOperationErrorStatus,
  clearAgentOperationActionKey,
  resolveAgentOperationActionKey,
  type AgentOperationActionKeyStorage,
} from "@retainpdf/api/agent-operation-model";
import type {
  AgentOperationAction,
  AgentOperationPerformOptions,
  AgentOperationReducerAction,
  AgentOperationStatus,
  AgentOperationView,
} from "./types.js";
import { AGENT_OPERATION_ACTION_KEY_PREFIX as ACTION_KEY_PREFIX } from "@/platform/config/storage-keys.js";

export type AgentOperationApi = {
  list: (options: { conversationId: string }) => Promise<unknown>;
  get: (operationId: string) => Promise<unknown>;
  run: (operationId: string, input: Record<string, unknown>) => Promise<unknown>;
  cancel: (operationId: string, input: Record<string, unknown>) => Promise<unknown>;
  commit: (operationId: string, input: Record<string, unknown>) => Promise<unknown>;
  retry: (operationId: string, input: Record<string, unknown>) => Promise<unknown>;
};

type Dispatch = (action: AgentOperationReducerAction) => void;

const ACTION_KEY_ID_PREFIX = "ui-";

function browserActionKeyStorage(): AgentOperationActionKeyStorage | undefined {
  try {
    return globalThis.sessionStorage;
  } catch {
    return undefined;
  }
}

function asOperation(value: unknown): AgentOperationView {
  const source = value && typeof value === "object" && "data" in value
    ? (value as { data?: unknown }).data
    : value;
  return source as AgentOperationView;
}

function asOperations(value: unknown): AgentOperationView[] {
  const source = value && typeof value === "object" && "data" in value
    ? (value as { data?: unknown }).data
    : value;
  if (Array.isArray(source)) return source as AgentOperationView[];
  if (source && typeof source === "object" && Array.isArray((source as { operations?: unknown[] }).operations)) {
    return (source as { operations: AgentOperationView[] }).operations;
  }
  return [];
}

export function createAgentOperationController(
  api: AgentOperationApi,
  dispatch: Dispatch,
  keyStorage = browserActionKeyStorage(),
) {
  const actionKeys = new Map<string, string>();
  const inFlight = new Set<string>();
  const idempotencyOptions = {
    storagePrefix: ACTION_KEY_PREFIX,
    keyPrefix: ACTION_KEY_ID_PREFIX,
    storage: keyStorage,
  };

  async function recover(conversationId: string) {
    const id = `${conversationId || ""}`.trim();
    if (!id || inFlight.has(`recover:${id}`)) return;
    inFlight.add(`recover:${id}`);
    dispatch({ type: "recovery-start", conversationId: id });
    try {
      const response = await api.list({ conversationId: id });
      dispatch({ type: "hydrate", conversationId: id, operations: asOperations(response) });
    } catch {
      dispatch({ type: "recovery-error", conversationId: id });
    } finally {
      inFlight.delete(`recover:${id}`);
    }
  }

  async function refresh(operationId: string) {
    const id = `${operationId || ""}`.trim();
    if (!id || inFlight.has(`refresh:${id}`)) return;
    inFlight.add(`refresh:${id}`);
    try {
      const operation = asOperation(await api.get(id));
      if (operation?.operation_id) dispatch({ type: "upsert", operation });
    } finally {
      inFlight.delete(`refresh:${id}`);
    }
  }

  async function perform(
    action: AgentOperationAction,
    operation: AgentOperationView,
    options: AgentOperationPerformOptions = {},
  ) {
    const operationId = `${operation.operation_id || ""}`.trim();
    if (!operationId || inFlight.has(`action:${operationId}`)) return;
    if (action === "retry" && operation.status === "ambiguous" && options.acceptDuplicateRisk !== true) {
      dispatch({
        type: "action-error",
        operationId,
        message: t("k_c5c0c047"),
      });
      return;
    }
    const idempotencyKey = resolveAgentOperationActionKey(
      operationId,
      action,
      actionKeys,
      idempotencyOptions,
    );
    inFlight.add(`action:${operationId}`);
    dispatch({ type: "action-start", operationId, action });
    const common = {
      idempotency_key: idempotencyKey,
      expected_attempt: operation.current_attempt,
      expected_status: operation.status,
      expected_program_sha256: operation.program_sha256 || "",
    };
    try {
      let response: unknown;
      if (action === "run") {
        response = await api.run(operationId, common);
      } else if (action === "cancel") {
        response = await api.cancel(operationId, { ...common, reason: "user_rejected" });
      } else if (action === "commit") {
        response = await api.commit(operationId, common);
      } else {
        response = await api.retry(operationId, options.acceptDuplicateRisk === true
          ? { ...common, accept_duplicate_risk: true }
          : common);
      }
      const next = asOperation(response);
      if (!next?.operation_id) throw new Error(t("k_9425ee5e"));
      clearAgentOperationActionKey(operationId, action, actionKeys, idempotencyOptions);
      dispatch({ type: "action-finish", operation: next });
    } catch (error) {
      if (agentOperationErrorStatus(error) === 409) {
        // A CAS conflict is a definitive rejection, not an unknown submit
        // result. Discard the key and refresh the server-owned snapshot rather
        // than replaying the mutation with stale expectations.
        clearAgentOperationActionKey(operationId, action, actionKeys, idempotencyOptions);
        try {
          const current = asOperation(await api.get(operationId));
          if (!current?.operation_id) throw new Error(t("k_9425ee5e"));
          dispatch({ type: "action-finish", operation: current });
        } catch {
          dispatch({
            type: "action-error",
            operationId,
            message: t("k_420e23b0"),
          });
        }
      } else {
        dispatch({ type: "action-error", operationId, message: agentOperationErrorMessage(error) });
      }
    } finally {
      inFlight.delete(`action:${operationId}`);
    }
  }

  function dispose() {
    actionKeys.clear();
    inFlight.clear();
  }

  return { recover, refresh, perform, dispose };
}

export function operationStatusLabel(
  status: AgentOperationStatus,
  confirmationMode: "explicit" | "green_light" = "explicit",
): string {
  switch (status) {
    case "draft":
    case "awaiting_confirmation": return confirmationMode === "green_light" ? t("k_abd26d76") : t("k_25a45621");
    case "queued": return t("k_d0de7734");
    case "running": return t("k_0a7f07c3");
    case "validating": return t("k_6f0f9ee0");
    case "result_ready": return confirmationMode === "green_light" ? t("k_1e174064") : t("k_d13e8f20");
    case "committed": return confirmationMode === "green_light" ? t("k_39aa2266") : t("k_c99c6952");
    case "failed": return t("k_9746cfc7");
    case "cancelled": return t("k_a5ffdc95");
    case "ambiguous": return t("k_7395a4ef");
    default: return status;
  }
}
