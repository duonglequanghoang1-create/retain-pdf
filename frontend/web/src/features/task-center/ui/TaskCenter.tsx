import { t } from "@retainpdf/i18n";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JobListItemView } from "@retainpdf/contracts/job-status";
import {
  Activity,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  RefreshCw,
  RotateCcw,
  Square,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { useTaskCenterAutoRefresh } from "./use-task-center-discovery.js";
import { formatZhDateTime } from "@/platform/utils/datetime.js";
import {
  groupTaskCenterJobs,
  taskCenterCounts,
  taskDocumentLabel,
  taskIdentity,
  taskProgressPercent,
  taskStatusLabel,
  taskWorkflowLabel,
  type TaskCenterGroupKey,
} from "../domain/model.js";
import {
  cancelTaskCenterJob,
  loadTaskCenterJobs,
  loadTaskCenterLiveJobs,
  mergeTaskCenterJobs,
  retryTaskCenterJob,
  TASK_CENTER_MAX_ITEMS,
} from "../domain/task-center-api.js";

const ACTIVE_STATUSES = new Set(["queued", "running"]);

const GROUP_ICONS = {
  running: Activity,
  queued: Clock3,
  failed: TriangleAlert,
  completed: CheckCircle2,
} satisfies Record<TaskCenterGroupKey, typeof Activity>;

function shortJobId(jobId: string): string {
  const value = `${jobId || ""}`.trim();
  return value.length > 18 ? `${value.slice(0, 9)}…${value.slice(-6)}` : value;
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  return formatZhDateTime(date);
}

function TaskRow({ job, busyAction, onOpen, onCancel, onRetry }: {
  job: JobListItemView;
  busyAction: string;
  onOpen: (job: JobListItemView) => void;
  onCancel: (job: JobListItemView) => void;
  onRetry: (job: JobListItemView) => void;
}) {
  const status = `${job.status || ""}`.trim().toLowerCase();
  const isActive = ACTIVE_STATUSES.has(status);
  const progress = taskProgressPercent(job);
  const busy = Boolean(busyAction);

  return (
    <article
      className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
      data-task-id={taskIdentity(job)}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
          <FileText className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{t("k_10691272")}</span>
            <h3 className="min-w-0 truncate text-sm font-semibold text-foreground" title={taskDocumentLabel(job)}>
              {taskDocumentLabel(job)}
            </h3>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{t("k_3172b317")} <code title={job.job_id}>{shortJobId(job.job_id)}</code></span>
            <span>{taskWorkflowLabel(job)}</span>
            {job.updated_at ? <span>{formatUpdatedAt(job.updated_at)}</span> : null}
          </div>
          {isActive && progress !== null ? (
            <div className="mt-2 flex items-center gap-2" aria-label={t("k_6e6796b4", [Math.round(progress)])}>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-foreground transition-[width]" style={{ width: `${progress}%` }} />
              </div>
              <span className="w-9 text-right text-[11px] text-muted-foreground">{Math.round(progress)}%</span>
            </div>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground">
          {taskStatusLabel(job)}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 border-t border-border/60 pt-3">
        <button
          type="button"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted disabled:opacity-50"
          onClick={() => onOpen(job)}
        >
          {t("k_0d428278")}
        </button>
        {isActive ? (
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted disabled:opacity-50"
            disabled={busy}
            onClick={() => onCancel(job)}
          >
            {busyAction === "cancel" ? <LoaderCircle className="size-3.5 animate-spin" /> : <Square className="size-3.5" />}
            {busyAction === "cancel" ? t("k_733d8ca1") : t("k_d258a63c")}
          </button>
        ) : null}
        {status === "failed" ? (
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background hover:opacity-90 disabled:opacity-50"
            disabled={busy}
            onClick={() => onRetry(job)}
          >
            {busyAction === "retry" ? <LoaderCircle className="size-3.5 animate-spin" /> : <RotateCcw className="size-3.5" />}
            {t("k_e2d53a6d")}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export type TaskCenterOpenBookDetailInput = {
  job_id?: string;
  display_name?: string;
  source_file_name?: string;
  workflow?: string;
  [key: string]: unknown;
};

export type TaskCenterProps = {
  /** 点任务卡片打开书籍详情：由页面接到自己的图书馆动作上。 */
  onOpenBookDetail: (input: TaskCenterOpenBookDetailInput) => void;
};

export function TaskCenter({ onOpenBookDetail }: TaskCenterProps) {
  const [items, setItems] = useState<JobListItemView[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [reachedLimit, setReachedLimit] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [busyByJob, setBusyByJob] = useState<Record<string, string>>({});
  const mountedRef = useRef(true);
  const requestInFlightRef = useRef(false);
  const liveInFlightRef = useRef(false);

  const itemsRef = useRef<JobListItemView[]>([]);
  const nextOffsetRef = useRef(0);
  const generationRef = useRef(0);

  const refreshLive = useCallback(async () => {
    if (liveInFlightRef.current) return;
    const generation = generationRef.current;
    liveInFlightRef.current = true;
    try {
      const live = await loadTaskCenterLiveJobs(itemsRef.current);
      if (!mountedRef.current || generation !== generationRef.current) return;
      // Only update cards still present; a late response must not resurrect
      // another page or a task removed by a refresh.
      const ids = new Set(itemsRef.current.map((item) => item.job_id));
      const merged = mergeTaskCenterJobs(itemsRef.current, live.filter((item) => ids.has(item.job_id)));
      itemsRef.current = merged;
      setItems(merged);
    } catch {
      // Keep the persisted summaries visible; the next active poll retries.
    } finally {
      liveInFlightRef.current = false;
    }
  }, []);

  const load = useCallback(async ({ append = false }: { append?: boolean } = {}) => {
    if (requestInFlightRef.current) return;
    requestInFlightRef.current = true;
    setRefreshing(true);
    generationRef.current += 1;
    try {
      const result = await loadTaskCenterJobs(undefined, { offset: append ? nextOffsetRef.current : 0 });
      if (!mountedRef.current) return;
      const next = append ? mergeTaskCenterJobs(itemsRef.current, result.items) : result.items;
      itemsRef.current = next;
      nextOffsetRef.current = result.nextOffset;
      setItems(next);
      setHasMore(result.hasMore);
      setReachedLimit(Boolean(result?.reachedLimit));
      setError("");
      void refreshLive();
    } catch (cause) {
      if (!mountedRef.current) return;
      setError(cause instanceof Error ? cause.message : t("k_91296afb"));
    } finally {
      requestInFlightRef.current = false;
      if (mountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [refreshLive]);


  useEffect(() => {
    mountedRef.current = true;
    void load();
    return () => { mountedRef.current = false; generationRef.current += 1; };
  }, [load]);

  const hasActiveTasks = items.some((job) => ACTIVE_STATUSES.has(`${job.status || ""}`.toLowerCase()));
  useTaskCenterAutoRefresh({
    itemsRef, nextOffsetRef, generationRef, mountedRef, setItems, hasActiveTasks, refreshLive,
    listInFlightRef: requestInFlightRef });

  const groups = useMemo(() => groupTaskCenterJobs(items), [items]);
  const counts = useMemo(() => taskCenterCounts(items), [items]);

  function setBusy(jobId: string, action = "") {
    setBusyByJob((current) => ({ ...current, [jobId]: action }));
  }

  function handleOpen(job: JobListItemView) {
    // Book detail consumes the library projection, while /jobs returns a task
    // projection. Only bridge fields present in both contracts; notably do not
    // manufacture a document_id for a job list row.
    onOpenBookDetail({
      job_id: job.job_id,
      display_name: job.display_name,
      source_file_name: job.source_file_name || undefined,
      workflow: job.workflow,
      status: job.status,
      page_count: job.page_count,
      cover_url: job.cover_url || undefined,
      thumbnail_url: job.thumbnail_url || undefined,
      created_at: job.created_at,
      updated_at: job.updated_at,
      prefer_translate_tab: true,
    });
  }

  async function handleCancel(job: JobListItemView) {
    setBusy(job.job_id, "cancel");
    try {
      await cancelTaskCenterJob(job);
      toast.success(t("k_5d40c492"));
      await load();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : t("k_66483997"));
    } finally {
      if (mountedRef.current) setBusy(job.job_id);
    }
  }

  async function handleRetry(job: JobListItemView) {
    setBusy(job.job_id, "retry");
    try {
      await retryTaskCenterJob(job.job_id);
      toast.success(t("k_79a8df7f"));
      await load();
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : t("k_1c472c48"));
    } finally {
      if (mountedRef.current) setBusy(job.job_id);
    }
  }

  return (
    <section id="task-center-view" className="mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-28 pt-5" aria-label={t("k_f692ff9e")}>
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{t("k_f692ff9e")}</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{t("k_0872740f")}</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {reachedLimit
              ? t("k_33b7a098", [TASK_CENTER_MAX_ITEMS])
              : `当前加载 ${items.length} 条${hasMore ? t("k_5e7a9cef") : ""}；每次处理按独立任务展示。`}
          </p>
        </div>
        <button
          id="task-center-refresh-btn"
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm hover:bg-muted disabled:opacity-50"
          disabled={refreshing}
          onClick={() => void load()}
        >
          <RefreshCw className={`size-4${refreshing ? " animate-spin" : ""}`} />
          {t("k_38108eaa")}
        </button>
      </header>

      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label={t("k_e9bb61bd")}>
        {([
          [t("k_778fc8f9"), counts.total],
          [t("k_59424970"), counts.running],
          [t("k_4dcbbcfa"), counts.queued],
          [t("k_3e3c8068"), counts.failed],
          [t("k_e99b48a2"), counts.completed],
        ] as const).map(([label, count]) => (
          <div key={label} className="rounded-xl border border-border/70 bg-background/70 px-3 py-2.5">
            <div className="text-lg font-semibold text-foreground">{count}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle className="size-4 animate-spin" /> {t("k_e9b1e33e")}
        </div>
      ) : error && items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <TriangleAlert className="size-7 text-muted-foreground" />
          <p className="text-sm text-foreground">{error}</p>
          <button type="button" className="rounded-lg border border-border px-3 py-2 text-sm" onClick={() => void load()}>{t("k_5982c44c")}</button>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <Clock3 className="size-7 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">{t("k_2cb9dc70")}</p>
          <p className="text-xs text-muted-foreground">{t("k_e6ec7b28")}</p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {error ? <div className="mb-3 rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground">{t("k_1df7c2d8")}{error}</div> : null}
          <div className="grid items-start gap-4 lg:grid-cols-2">
            {groups.map((group) => {
              const Icon = GROUP_ICONS[group.key];
              return (
                <section key={group.key} className="rounded-3xl border border-border/70 bg-muted/35 p-3" aria-labelledby={`task-group-${group.key}`}>
                  <header className="flex items-center justify-between px-1 pb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                      <h2 id={`task-group-${group.key}`} className="text-sm font-semibold text-foreground">{group.label}</h2>
                    </div>
                    <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">{group.items.length}</span>
                  </header>
                  {group.items.length ? (
                    <div className="space-y-2">
                      {group.items.map((job) => (
                        <TaskRow
                          key={taskIdentity(job)}
                          job={job}
                          busyAction={busyByJob[job.job_id] || ""}
                          onOpen={handleOpen}
                          onCancel={(target) => void handleCancel(target)}
                          onRetry={(target) => void handleRetry(target)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">{t("k_5dbd0154")}{group.label}{t("k_3172b317")}</div>
                  )}
                </section>
              );
            })}
          </div>
          {hasMore ? (
            <div className="flex justify-center py-4">
              <button type="button" className="rounded-xl border border-border px-4 py-2 text-sm disabled:opacity-50"
                disabled={refreshing} onClick={() => void load({ append: true })}>
                {refreshing ? t("k_300ee3de") : t("k_1db39d44")}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
