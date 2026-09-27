import { useState } from "react";
import { Languages, LoaderCircle, RefreshCw } from "lucide-react";
import { ConfirmDialog } from "@/ui/components/confirm-dialog.js";
import type {
  JobRetryStage,
  JobStageRetryActionView,
} from "@/platform/api/index.js";
import { btn } from "../ui.jsx";
import { t } from "@retainpdf/i18n";

function labelOf(action: JobStageRetryActionView) {
  if (action.stage === "translation") return t("k_7cb45a33");
  if (action.stage === "render") return t("k_f7a515b5");
  return action.label;
}

function StageIcon({ stage }: { stage: JobRetryStage }) {
  return stage === "translation"
    ? <Languages className="size-4" aria-hidden="true" />
    : <RefreshCw className="size-4" aria-hidden="true" />;
}

const LOADING_ACTIONS: JobStageRetryActionView[] = [
  {
    stage: "translation",
    label: t("k_7cb45a33"),
    can_retry: false,
    disabled_reason: t("k_143c5311"),
  },
  {
    stage: "render",
    label: t("k_f7a515b5"),
    can_retry: false,
    disabled_reason: t("k_143c5311"),
  },
];

export function TranslationStageActions({
  actions = [],
  loading = false,
  pendingStage = "",
  error = "",
  onRetry,
}: {
  actions?: JobStageRetryActionView[];
  loading?: boolean;
  pendingStage?: JobRetryStage | "";
  error?: string;
  onRetry: (
    stage: JobRetryStage,
    options?: { acceptDuplicateRisk?: boolean },
  ) => Promise<unknown>;
}) {
  const [confirmAction, setConfirmAction] = useState<JobStageRetryActionView | null>(null);
  // 父级 hook 已把错误写入 error prop；本地兜底覆盖 onRetry 直接抛错
  // 但父级未落 error 的场景（如 mock/装配差异），保证错误仍落到 UI。
  const [localError, setLocalError] = useState("");
  const checking = loading && !actions.length;
  const visibleActions = checking ? LOADING_ACTIONS : actions;
  const shownError = error || localError;
  if (!visibleActions.length && !shownError) return null;

  function describeRetryError(cause: unknown): string {
    const message = `${(cause as Error)?.message || cause || ""}`.trim();
    return message || t("k_3dbd49c6");
  }

  async function runRetry(
    stage: JobRetryStage,
    options?: { acceptDuplicateRisk?: boolean },
  ) {
    setLocalError("");
    try {
      await onRetry(stage, options);
    } catch (cause) {
      // 错误落到 UI 文案，按钮保持可操作（disabled 仅由 checking/pending/can_retry 决定）。
      setLocalError(describeRetryError(cause));
    }
  }

  // 一键断点恢复：按钮先调 POST /resume（服务端按 resume-plan 自动续跑，
  // render 原地同任务、其余新建）；仅二次确认接受重复风险后，才用
  // retry-stage(显式 stage)兜底。id/disabled/ConfirmDialog 语义保持不变。
  async function confirmRisk() {
    if (!confirmAction) return;
    try {
      await onRetry(confirmAction.stage, { acceptDuplicateRisk: true });
      setLocalError("");
      setConfirmAction(null);
    } catch (cause) {
      // 失败给文案且不吞错：确认框保持打开，允许用户取消或重试。
      setLocalError(describeRetryError(cause));
    }
  }

  return (
    <div
      className="book-detail-stage-actions space-y-2"
      data-translation-stage-actions="true"
      aria-busy={checking || undefined}
    >
      <div className="flex flex-wrap items-center justify-end gap-2">
        {visibleActions.map((action) => {
          const pending = pendingStage === action.stage;
          const disabled = checking || Boolean(pendingStage) || !action.can_retry;
          const reason = `${action.disabled_reason || action.reason || ""}`.trim();
          return (
            <button
              key={action.stage}
              id={`book-detail-retry-${action.stage}-btn`}
              type="button"
              className={btn("outline")}
              disabled={disabled}
              title={!action.can_retry && reason ? reason : undefined}
              onClick={() => {
                if (action.danger) setConfirmAction(action);
                else void runRetry(action.stage);
              }}
            >
              {checking
                ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                : <StageIcon stage={action.stage} />}
              <span className="ml-1.5">{pending ? t("k_17e519c5") : labelOf(action)}</span>
            </button>
          );
        })}
      </div>
      {shownError ? <p className="rounded-md border border-foreground/20 bg-muted/40 px-3 py-2 text-xs text-foreground" role="alert">{shownError}</p> : null}
      <ConfirmDialog
        id="book-detail-translation-risk-confirm"
        open={Boolean(confirmAction)}
        onOpenChange={(next) => {
          if (!next) setConfirmAction(null);
        }}
        title={t("k_e4262ea4")}
        description={t("k_8d68e7a0")}
        confirmLabel={t("k_8fd5d453")}
        tone="default"
        pending={pendingStage === "translation"}
        onConfirm={confirmRisk}
      />
    </div>
  );
}
