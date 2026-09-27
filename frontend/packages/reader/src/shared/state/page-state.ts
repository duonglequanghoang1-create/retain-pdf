import { t } from "@retainpdf/i18n";

// 共享真值（原 frontend/web/src/js/reader/page-state.ts），纯常量 + 纯函数，无外部依赖
export const READER_PROGRESS_COPY = Object.freeze({
  boot: t("k_4268c4a0"),
  metadata: t("k_9f2b6df7"),
  both: t("k_2a3a255d"),
  sourceOnly: t("k_16baf569"),
  translatedOnly: t("k_49013855"),
  ready: t("k_ed712d1e"),
  failed: t("k_239dbe09"),
});

export function createReaderPageState() {
  return {
    reader: {
      totalPages: 0,
      currentPage: 0,
      primaryViewerKey: "",
    },
    progress: {
      metadataReady: false,
      sourceDone: false,
      translatedDone: false,
    },
    bootProgressBar: {
      value: 0,
      target: 0,
      rafId: 0,
    },
  };
}

export function resetReaderProgressState(state: any) {
  if (!state?.progress) {
    return;
  }
  state.progress.metadataReady = false;
  state.progress.sourceDone = false;
  state.progress.translatedDone = false;
}

export function computeReaderProgressSnapshot(
  progressState: any,
  copy: any = READER_PROGRESS_COPY,
) {
  if (!progressState?.metadataReady) {
    return { percent: 8, text: copy.boot, stage: "boot" };
  }
  const completedPdfs = Number(progressState.sourceDone) + Number(progressState.translatedDone);
  const percent = 24 + completedPdfs * 30;
  if (completedPdfs === 0) {
    return { percent, text: copy.both, stage: "pdfs" };
  }
  if (completedPdfs === 1) {
    return {
      percent,
      text: progressState.sourceDone ? copy.sourceOnly : copy.translatedOnly,
      stage: "pdfs",
    };
  }
  return { percent: 92, text: copy.ready, stage: "readying" };
}
