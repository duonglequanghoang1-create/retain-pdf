import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  Circle,
  ExternalLink,
  FileText,
  Loader2,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import type {
  ReaderAgentOperationEvent,
  ReaderAgentOperationStatus,
  ReaderAgentOperation,
  ReaderAgentRuntimeConfig,
} from "../../../contracts/ai-operations.js";
import type {
  ReaderAgentOperationEntry,
  ReaderAgentOperationPerformOptions,
} from "./use-reader-agent-operations.js";
import { t } from "@retainpdf/i18n";

type OperationAction = "run" | "cancel" | "commit" | "retry";
const DISMISSED_OPERATIONS_STORAGE_KEY = "retainpdf.reader-agent-operation.dismissed.v1";
const DISMISSIBLE_STATUSES = new Set<ReaderAgentOperationStatus>(["failed", "cancelled"]);

export function readerAgentOperationDismissalKey(operation: ReaderAgentOperation): string {
  return [
    `${operation.operation_id || ""}`.trim(),
    Number(operation.current_attempt) || 0,
    `${operation.status || ""}`,
  ].join(":");
}

function readDismissedOperationKeys(): Set<string> {
  try {
    const value = JSON.parse(globalThis.localStorage?.getItem(DISMISSED_OPERATIONS_STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function writeDismissedOperationKeys(keys: Set<string>) {
  try {
    globalThis.localStorage?.setItem(
      DISMISSED_OPERATIONS_STORAGE_KEY,
      JSON.stringify(Array.from(keys).slice(-100)),
    );
  } catch {
    // Persistence is a convenience; hiding still works for the current mount.
  }
}

function statusLabel(status: ReaderAgentOperationStatus, mode: ReaderAgentRuntimeConfig["agent_confirmation_mode"]): string {
  switch (status) {
    case "draft":
    case "awaiting_confirmation": return mode === "green_light" ? t("k_abd26d76") : t("k_25a45621");
    case "queued": return t("k_d0de7734");
    case "running": return t("k_0a7f07c3");
    case "validating": return t("k_545a65a6");
    case "result_ready": return mode === "green_light" ? t("k_1e174064") : t("k_1e53ba5e");
    case "committed": return mode === "green_light" ? t("k_39aa2266") : t("k_c99c6952");
    case "failed": return t("k_9746cfc7");
    case "cancelled": return t("k_a5ffdc95");
    case "ambiguous": return t("k_590a8964");
    default: return `${status}`;
  }
}

function actionItems(status: ReaderAgentOperationStatus) {
  switch (status) {
    case "draft":
    case "awaiting_confirmation":
      return [
        { action: "cancel" as const, label: t("k_03e210a6") },
        { action: "run" as const, label: t("k_ae1109f3"), primary: true },
      ];
    case "queued":
    case "running":
    case "validating":
      return [{ action: "cancel" as const, label: t("k_84442f48"), danger: true }];
    case "result_ready":
      return [
        { action: "cancel" as const, label: t("k_12a73a13") },
        { action: "commit" as const, label: t("k_9bfb5d92"), primary: true },
      ];
    case "failed":
      return [{ action: "retry" as const, label: t("k_e2d53a6d"), primary: true }];
    case "ambiguous":
      return [{ action: "retry" as const, label: t("k_cb916333"), danger: true, risk: true }];
    default:
      return [];
  }
}

function eventIcon(status: ReaderAgentOperationStatus) {
  if (status === "failed" || status === "ambiguous") return TriangleAlert;
  if (status === "cancelled") return X;
  if (status === "committed" || status === "result_ready") return Check;
  if (["queued", "running", "validating"].includes(status)) return Loader2;
  return Circle;
}

function OperationTimeline({ events, mode }: {
  events: ReaderAgentOperationEvent[];
  mode: ReaderAgentRuntimeConfig["agent_confirmation_mode"];
}) {
  return (
    <ol className="reader-agent-operation-timeline" aria-label={t("k_e53a2f17")}>
      {events.map((event) => {
        const Icon = eventIcon(event.status);
        const spinning = ["queued", "running", "validating"].includes(event.status);
        return (
          <li key={`${event.attempt}:${event.seq}`}>
            <Icon className={spinning ? "is-spinning" : ""} size={12} aria-hidden />
            <span>{event.summary || event.event || statusLabel(event.status, mode)}</span>
            <time>{event.ts ? new Date(event.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</time>
          </li>
        );
      })}
    </ol>
  );
}

function CandidatePreview({
  operation,
  loadCandidate,
}: {
  operation: ReaderAgentOperation;
  loadCandidate: (operation: ReaderAgentOperation) => Promise<Blob>;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [objectUrl, setObjectUrl] = useState("");
  const [error, setError] = useState("");
  const objectUrlRef = useRef("");

  useEffect(() => {
    let cancelled = false;
    setError("");
    void loadCandidate(operation)
      .then((blob) => {
        if (cancelled) return;
        const nextUrl = URL.createObjectURL(blob);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = nextUrl;
        setObjectUrl(nextUrl);
      })
      .catch(() => {
        if (!cancelled) setError(t("k_729d4268"));
      });
    return () => {
      cancelled = true;
    };
  }, [loadCandidate, operation.operation_id, operation.current_attempt]);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  return (
    <>
      <div className="reader-agent-operation-candidate">
        <div>
          <FileText size={13} aria-hidden />
          <span>候选 PDF</span>
        </div>
        <button type="button" disabled={!objectUrl} onClick={() => setPreviewOpen((value) => !value)}>
          {!objectUrl ? t("k_300ee3de") : previewOpen ? t("k_5d581564") : t("k_de61aa8e")}
        </button>
        <button
          type="button"
          disabled={!objectUrl}
          aria-label={t("k_20c74def")}
          onClick={() => window.open(objectUrl, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink size={12} aria-hidden />
        </button>
      </div>
      {previewOpen ? (
        <iframe className="reader-agent-operation-preview" src={objectUrl} title={t("k_2c845c17")} />
      ) : null}
      {error ? <p className="reader-agent-operation-error" role="alert">{error}</p> : null}
    </>
  );
}

function OperationCard({
  entry,
  mode,
  loadCandidate,
  onAction,
  onDismiss,
}: {
  entry: ReaderAgentOperationEntry;
  mode: ReaderAgentRuntimeConfig["agent_confirmation_mode"];
  loadCandidate: (operation: ReaderAgentOperation) => Promise<Blob>;
  onAction: (
    action: OperationAction,
    operation: ReaderAgentOperation,
    options?: ReaderAgentOperationPerformOptions,
  ) => void | Promise<void>;
  onDismiss: (operation: ReaderAgentOperation) => void;
}) {
  const { operation, pendingAction, error } = entry;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [riskOpen, setRiskOpen] = useState(false);
  const events = operation.events || [];
  const actions = actionItems(operation.status);
  const candidateVisible = Boolean(
    (operation.status === "result_ready" || operation.status === "committed")
    && operation.candidate_available,
  );
  const dismissible = DISMISSIBLE_STATUSES.has(operation.status);

  return (
    <article className={`reader-agent-operation-card is-${operation.status}`} data-operation-id={operation.operation_id}>
      <header>
        <span className="reader-agent-operation-icon" aria-hidden><Bot size={15} /></span>
        <div className="reader-agent-operation-title">
          <span>PDF 操作</span>
          <strong>{operation.intent_summary || t("k_848fbe6a")}</strong>
        </div>
        <div className="reader-agent-operation-head-actions">
          <span className="reader-agent-operation-status">{statusLabel(operation.status, mode)}</span>
          {dismissible ? (
            <button
              type="button"
              className="reader-agent-operation-dismiss"
              aria-label={operation.status === "failed" ? t("k_d1ea7ca0") : t("k_c1a90a2e")}
              title={t("k_bb0e7e01")}
              onClick={() => onDismiss(operation)}
            >
              <X size={13} aria-hidden />
            </button>
          ) : null}
        </div>
      </header>

      {operation.affected_pages?.length ? (
        <p className="reader-agent-operation-scope">影响页码：{operation.affected_pages.join("、")}</p>
      ) : null}

      {events.length ? (
        <div className="reader-agent-operation-details">
          <button type="button" onClick={() => setDetailsOpen((value) => !value)}>
            {detailsOpen ? <ChevronUp size={12} aria-hidden /> : <ChevronDown size={12} aria-hidden />}
            {detailsOpen ? t("k_c4cb1897") : t("k_ad75ebcb", [events.length])}
          </button>
          {detailsOpen ? <OperationTimeline events={events} mode={mode} /> : null}
        </div>
      ) : null}

      {candidateVisible ? <CandidatePreview operation={operation} loadCandidate={loadCandidate} /> : null}

      {error ? <p className="reader-agent-operation-error" role="alert">{error}</p> : null}

      {riskOpen ? (
        <div className="reader-agent-operation-risk" role="alertdialog" aria-label={t("k_875120ef")}>
          <TriangleAlert size={14} aria-hidden />
          <p>上一次执行结果不确定，重试可能重复操作。确认接受风险后再继续。</p>
          <div>
            <button type="button" onClick={() => setRiskOpen(false)} disabled={Boolean(pendingAction)}>返回</button>
            <button
              type="button"
              className="is-danger"
              disabled={Boolean(pendingAction)}
              onClick={async () => {
                await onAction("retry", operation, { acceptDuplicateRisk: true });
                setRiskOpen(false);
              }}
            >
              {pendingAction === "retry" ? t("k_1cac8ac7") : t("k_5ded2022")}
            </button>
          </div>
        </div>
      ) : actions.length ? (
        <div className="reader-agent-operation-actions">
          {actions.map((item) => (
            <button
              key={item.action}
              type="button"
              className={item.primary ? "is-primary" : item.danger ? "is-danger" : ""}
              disabled={Boolean(pendingAction)}
              onClick={() => {
                if (item.risk) setRiskOpen(true);
                else void onAction(item.action, operation);
              }}
            >
              {pendingAction === item.action ? t("k_1cac8ac7") : item.label}
            </button>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ReaderAgentOperationPanel({
  entries,
  confirmationMode,
  runtimeRestarting,
  loadCandidate,
  onAction,
}: {
  entries: ReaderAgentOperationEntry[];
  confirmationMode: ReaderAgentRuntimeConfig["agent_confirmation_mode"];
  runtimeRestarting: boolean;
  loadCandidate: (operation: ReaderAgentOperation) => Promise<Blob>;
  onAction: (
    action: OperationAction,
    operation: ReaderAgentOperation,
    options?: ReaderAgentOperationPerformOptions,
  ) => void | Promise<void>;
}) {
  const [dismissedKeys, setDismissedKeys] = useState(readDismissedOperationKeys);
  const visibleEntries = entries.filter((entry) => (
    !dismissedKeys.has(readerAgentOperationDismissalKey(entry.operation))
  ));

  function dismissOperation(operation: ReaderAgentOperation) {
    const key = readerAgentOperationDismissalKey(operation);
    setDismissedKeys((current) => {
      const next = new Set(current);
      next.add(key);
      writeDismissedOperationKeys(next);
      return next;
    });
  }

  return (
    <section className={`reader-agent-operations${visibleEntries.length ? " has-operations" : ""}`} aria-label={t("k_3476c2fd")}>
      <div className={`reader-agent-mode${confirmationMode === "green_light" ? " is-green" : ""}`}>
        <ShieldCheck size={13} aria-hidden />
        <span>{confirmationMode === "green_light" ? t("k_af4d8105") : t("k_012643ef")}</span>
      </div>
      {runtimeRestarting ? (
        <div className="reader-agent-restarting" role="status">
          <Loader2 className="is-spinning" size={13} aria-hidden />
          正在重启 Agent，新请求暂不可用
        </div>
      ) : null}
      {visibleEntries.map((entry) => (
        <OperationCard
          key={entry.operation.operation_id}
          entry={entry}
          mode={confirmationMode}
          loadCandidate={loadCandidate}
          onAction={onAction}
          onDismiss={dismissOperation}
        />
      ))}
    </section>
  );
}
