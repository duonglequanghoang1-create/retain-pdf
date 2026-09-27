import type {
  AgentConfirmationMode,
  AgentOperationAction,
  AgentOperationStatus,
} from "../../domain/operations/types.js";
import { t } from "@retainpdf/i18n";

export type AgentOperationActionItem = {
  action: AgentOperationAction;
  label: string;
  tone?: "primary" | "danger";
  needsRiskConfirmation?: boolean;
};

export function actionsForStatus(
  status: AgentOperationStatus,
  confirmationMode: AgentConfirmationMode = "explicit",
): AgentOperationActionItem[] {
  switch (status) {
    case "draft":
    case "awaiting_confirmation":
      return [
        { action: "cancel", label: t("k_03e210a6") },
        {
          action: "run",
          label: confirmationMode === "green_light" ? t("k_9a42843d") : t("k_ae1109f3"),
          tone: "primary",
        },
      ];
    case "queued":
    case "running":
    case "validating":
      return [{ action: "cancel", label: t("k_b5b37c24"), tone: "danger" }];
    case "result_ready":
      return [
        { action: "cancel", label: t("k_12a73a13") },
        {
          action: "commit",
          label: confirmationMode === "green_light" ? t("k_d4c9d863") : t("k_9bfb5d92"),
          tone: "primary",
        },
      ];
    case "failed":
      return [{ action: "retry", label: t("k_e2d53a6d"), tone: "primary" }];
    case "ambiguous":
      return [{ action: "retry", label: t("k_cb916333"), tone: "danger", needsRiskConfirmation: true }];
    default:
      return [];
  }
}

export function AgentOperationActions({
  status,
  confirmationMode = "explicit",
  pending,
  onAction,
}: {
  status: AgentOperationStatus;
  confirmationMode?: AgentConfirmationMode;
  pending?: AgentOperationAction;
  onAction: (item: AgentOperationActionItem) => void;
}) {
  const actions = actionsForStatus(status, confirmationMode);
  if (!actions.length) return null;
  return (
    <div className="home-ask-operation-actions">
      {actions.map((item) => (
        <button
          key={item.action}
          type="button"
          className={item.tone ? `is-${item.tone}` : ""}
          disabled={Boolean(pending)}
          onClick={() => onAction(item)}
        >
          {pending === item.action ? t("k_1cac8ac7") : item.label}
        </button>
      ))}
    </div>
  );
}
