import { ClipboardCheck, Copy, FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/ui/components/button.js";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogShell,
  DialogTitle,
} from "@/ui/components/dialog.js";
import {
  copyText,
} from "@/platform/utils/clipboard.js";
import { STATUS_DETAIL_DIALOG_IDS } from "../domain/status-detail-dom-ids.js";
import { t } from "@retainpdf/i18n";

type FailureLogDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  logText: string;
};

export function FailureLogDialog({
  open,
  onOpenChange,
  jobId,
  logText,
}: FailureLogDialogProps) {
  const ids = STATUS_DETAIL_DIALOG_IDS.failure;
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (open) setCopyState("idle");
  }, [open, logText]);

  async function handleCopy() {
    try {
      await copyText(logText || t("k_aa261a2a"));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id={ids.logDialog}
        className="status-detail-log-dialog"
        level="nested"
        showCloseButton={false}
        size="standard"
      >
        <DialogShell className="status-detail-log-shell">
          <DialogHeader>
            <div className="status-detail-log-heading">
              <span className="status-detail-log-icon" aria-hidden="true">
                <FileWarning />
              </span>
              <div>
                <DialogTitle>错误日志</DialogTitle>
                <DialogDescription>{jobId && jobId !== "-" ? t("k_2d29c0fa", [jobId]) : t("k_e94d4252")}</DialogDescription>
              </div>
            </div>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody className="status-detail-log-body">
            <pre id={ids.logContent} className="status-detail-log-content" tabIndex={0}>
              {logText || t("k_aa261a2a")}
            </pre>
          </DialogBody>
          <DialogFooter className="status-detail-log-footer">
            <span id={ids.copyLogStatus} className="status-panel-note" role="status">
              {copyState === "copied" ? t("k_c1416059") : copyState === "failed" ? t("k_114fa461") : t("k_cae0853a")}
            </span>
            <Button id={ids.copyLogButton} type="button" onClick={handleCopy}>
              {copyState === "copied" ? <ClipboardCheck /> : <Copy />}
              {copyState === "copied" ? t("k_e381a576") : t("k_c4a79c3a")}
            </Button>
          </DialogFooter>
        </DialogShell>
      </DialogContent>
    </Dialog>
  );
}
