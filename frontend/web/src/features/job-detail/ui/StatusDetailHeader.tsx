import { t } from "@retainpdf/i18n";
import { DialogCloseButton, DialogHeader, DialogTitle } from "@/ui/components/dialog.js";
import type { StatusDetailHeadline } from "../domain/status-detail-store.js";
import { STATUS_DETAIL_DIALOG_IDS } from "../domain/status-detail-dom-ids.js";

type StatusDetailHeaderProps = {
  headline: StatusDetailHeadline;
};

export function StatusDetailHeader({ headline }: StatusDetailHeaderProps) {
  const ids = STATUS_DETAIL_DIALOG_IDS;

  return (
    <DialogHeader className="desktop-head status-detail-header">
      <div className="status-detail-headline">
        <span
          id={ids.headline.icon}
          className={`status-detail-head-icon is-${headline.tone}`}
          aria-hidden="true"
          // The icon markup is produced by the local status-detail presenter.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: headline.iconMarkup || "" }}
        />
        <div className="status-detail-head-copy">
          <div className="status-detail-head-title-row">
            <DialogTitle asChild>
              <h2>{t("k_b19fb2fe")}</h2>
            </DialogTitle>
            <span className={`status-detail-state-badge is-${headline.tone}`}>
              {headline.statusLabel}
            </span>
            <p className="status-detail-job-meta">
              <span>{t("k_3172b317")}</span>
              <span id={ids.headline.jobId} className="status-detail-job-id mono">
                {headline.jobId}
              </span>
            </p>
          </div>
          <p id={ids.headline.note} className="sr-only">{headline.note}</p>
        </div>
      </div>
      <DialogCloseButton id={ids.headline.closeButton} />
    </DialogHeader>
  );
}
