import type { JobListItemView } from "@retainpdf/contracts/job-status";
import { t } from "@retainpdf/i18n";

export type TaskCenterGroupKey = "running" | "queued" | "failed" | "completed";

export type TaskCenterGroup = {
  key: TaskCenterGroupKey;
  label: string;
  items: JobListItemView[];
};

export const TASK_CENTER_GROUP_ORDER: TaskCenterGroupKey[] = [
  "running",
  "queued",
  "failed",
  "completed",
];

const GROUP_LABELS: Record<TaskCenterGroupKey, string> = {
  running: t("k_59424970"),
  queued: t("k_4dcbbcfa"),
  failed: t("k_3e3c8068"),
  completed: t("k_e99b48a2"),
};

export function taskIdentity(job: Pick<JobListItemView, "job_id">): string {
  return `job:${`${job?.job_id || ""}`.trim()}`;
}

export function taskDocumentLabel(job: JobListItemView): string {
  return `${job.display_name || job.source_file_name || t("k_20f952be")}`.trim() || t("k_20f952be");
}

export function taskWorkflowLabel(job: Pick<JobListItemView, "workflow">): string {
  switch (`${job.workflow || ""}`.trim().toLowerCase()) {
    case "ocr": return "OCR";
    case "book": return t("k_571b0011");
    case "translate": return t("k_23141370");
    case "render": return t("k_0d2759cb");
    default: return `${job.workflow || t("k_d474f8aa")}`;
  }
}

export function taskStatusLabel(job: Pick<JobListItemView, "status">): string {
  switch (`${job.status || ""}`.trim().toLowerCase()) {
    case "queued": return t("k_4dcbbcfa");
    case "running": return t("k_59424970");
    case "failed": return t("k_3e3c8068");
    case "succeeded": return t("k_e99b48a2");
    case "cancelled":
    case "canceled": return t("k_a5ffdc95");
    default: return `${job.status || t("k_4e72a1ff")}`;
  }
}

export function taskGroupKey(job: Pick<JobListItemView, "status">): TaskCenterGroupKey {
  switch (`${job.status || ""}`.trim().toLowerCase()) {
    case "running": return "running";
    case "queued": return "queued";
    case "failed": return "failed";
    default: return "completed";
  }
}

export function groupTaskCenterJobs(items: JobListItemView[] = []): TaskCenterGroup[] {
  const grouped = new Map<TaskCenterGroupKey, JobListItemView[]>(
    TASK_CENTER_GROUP_ORDER.map((key) => [key, []]),
  );
  for (const item of items) {
    if (!`${item?.job_id || ""}`.trim()) continue;
    grouped.get(taskGroupKey(item))?.push(item);
  }
  return TASK_CENTER_GROUP_ORDER.map((key) => ({
    key,
    label: GROUP_LABELS[key],
    items: grouped.get(key) || [],
  }));
}

export function taskCenterCounts(items: JobListItemView[] = []): Record<TaskCenterGroupKey | "total", number> {
  const groups = groupTaskCenterJobs(items);
  return {
    total: groups.reduce((sum, group) => sum + group.items.length, 0),
    running: groups.find((group) => group.key === "running")?.items.length || 0,
    queued: groups.find((group) => group.key === "queued")?.items.length || 0,
    failed: groups.find((group) => group.key === "failed")?.items.length || 0,
    completed: groups.find((group) => group.key === "completed")?.items.length || 0,
  };
}

function finiteNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function clampPercent(percent: number): number {
  return Math.max(0, Math.min(100, percent));
}

export function taskProgressPercent(job: JobListItemView): number | null {
  const progress = job.stage_snapshot?.progress;
  const percent = finiteNumberOrNull(progress?.percent);
  if (percent !== null) return clampPercent(percent);
  const current = finiteNumberOrNull(progress?.current);
  const total = finiteNumberOrNull(progress?.total);
  if (current !== null && total !== null && total > 0) {
    return clampPercent((current / total) * 100);
  }
  return null;
}
