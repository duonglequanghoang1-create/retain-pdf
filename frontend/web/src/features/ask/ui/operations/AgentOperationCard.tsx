import { useState } from "react";
import { Bot, ChevronDown, ChevronUp } from "lucide-react";
import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import { operationStatusLabel } from "../../domain/operations/operation-controller.js";
import { AgentCandidatePreview } from "./AgentCandidatePreview.js";
import { AgentOperationActions, type AgentOperationActionItem } from "./AgentOperationActions.js";
import { AgentOperationTimeline } from "./AgentOperationTimeline.js";
import type {
  AgentConfirmationMode,
  AgentOperationAction,
  AgentOperationEntry,
  AgentOperationPerformOptions,
  AgentOperationView,
} from "../../domain/operations/types.js";
import { t } from "@retainpdf/i18n";

function compactPages(pages: number[] = []): string {
  const visible = pages.slice(0, 12).join("、");
  return pages.length > 12 ? t("k_efe02e4e", [visible, pages.length]) : visible;
}

function describePlan(operation: AgentOperationView): string[] {
  return (operation.plan_steps || []).map((step) => {
    const pages = compactPages(step.pages || []);
    if (step.op === "select_pages") return t("k_d02a4bff", [pages]);
    if (step.op === "rotate_pages") return t("k_5981f972", [pages, step.degrees || 0]);
    return t("k_d3c56b5c", [pages]);
  });
}

export function AgentOperationCard({
  entry,
  loadCandidate,
  confirmationMode = "explicit",
  onAction,
}: {
  entry: AgentOperationEntry;
  loadCandidate: (operation: AgentOperationView) => Promise<Blob>;
  confirmationMode?: AgentConfirmationMode;
  onAction: (
    action: AgentOperationAction,
    operation: AgentOperationView,
    options?: AgentOperationPerformOptions,
  ) => void | Promise<void>;
}) {
  const { remote: operation, pendingAction, error } = entry;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [riskAction, setRiskAction] = useState<AgentOperationActionItem | null>(null);
  const events = operation.events || [];
  const plan = describePlan(operation);
  const canPreview = operation.status === "result_ready" || operation.status === "committed";
  const candidateVisible = canPreview && Boolean(
    operation.candidate_available || operation.candidate || operation.candidate_version,
  );

  function requestAction(item: AgentOperationActionItem) {
    if (item.needsRiskConfirmation) {
      setRiskAction(item);
      return;
    }
    void onAction(item.action, operation);
  }

  return (
    <article className={`home-ask-operation-card is-${operation.status}`} data-operation-id={operation.operation_id}>
      <header className="home-ask-operation-head">
        <span className="home-ask-operation-icon" aria-hidden><Bot size={16} /></span>
        <div>
          <span className="home-ask-operation-kicker">Agent 操作</span>
          <h3>{operation.intent_summary || t("k_8d364eb8")}</h3>
        </div>
        <span className="home-ask-operation-status">
          {operationStatusLabel(operation.status, confirmationMode)}
        </span>
      </header>

      {operation.plan_summary ? <p className="home-ask-operation-plan">{operation.plan_summary}</p> : null}
      {plan.length ? (
        <ol className="home-ask-operation-plan-steps" aria-label={t("k_47fb2127")}>
          {plan.map((label, index) => <li key={`${index}:${label}`}>{label}</li>)}
        </ol>
      ) : null}
      {operation.affected_pages?.length ? (
        <p className="home-ask-operation-scope">影响页码：{operation.affected_pages.join("、")}</p>
      ) : null}

      {events.length ? (
        <div className="home-ask-operation-details">
          <button type="button" onClick={() => setDetailsOpen((value) => !value)}>
            {detailsOpen ? <ChevronUp size={13} aria-hidden /> : <ChevronDown size={13} aria-hidden />}
            {detailsOpen ? t("k_b07e9500") : t("k_9431174a", [events.length])}
          </button>
          {detailsOpen ? <AgentOperationTimeline events={events} /> : null}
        </div>
      ) : null}

      {candidateVisible ? (
        <AgentCandidatePreview operation={operation} loadCandidate={loadCandidate} />
      ) : null}
      {error ? <p className="home-ask-operation-error" role="alert">{error}</p> : null}
      <AgentOperationActions
        status={operation.status}
        confirmationMode={confirmationMode}
        pending={pendingAction}
        onAction={requestAction}
      />

      <ConfirmDialog
        id={`agent-operation-risk-${operation.operation_id}`}
        open={Boolean(riskAction)}
        onOpenChange={(open) => { if (!open) setRiskAction(null); }}
        title={t("k_875120ef")}
        description={t("k_727e0ac1")}
        confirmLabel={t("k_5ded2022")}
        tone="danger"
        pending={pendingAction === "retry"}
        onConfirm={async () => {
          if (!riskAction) return;
          await onAction(riskAction.action, operation, { acceptDuplicateRisk: true });
          setRiskAction(null);
        }}
      />
    </article>
  );
}
