import { useEffect, useRef, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import type { AgentOperationView } from "../../domain/operations/types.js";
import { t } from "@retainpdf/i18n";

export function AgentCandidatePreview({
  operation,
  loadCandidate,
}: {
  operation: AgentOperationView;
  loadCandidate: (operation: AgentOperationView) => Promise<Blob>;
}) {
  const [expanded, setExpanded] = useState(false);
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
    <div className="home-ask-operation-candidate">
      <div className="home-ask-operation-candidate-head">
        <span><FileText size={14} aria-hidden />{t("k_dc40dd3d")}</span>
        <div>
          <button type="button" disabled={!objectUrl} onClick={() => setExpanded((value) => !value)}>
            {!objectUrl ? t("k_300ee3de") : expanded ? t("k_f629e49d") : t("k_de61aa8e")}
          </button>
          <button
            type="button"
            disabled={!objectUrl}
            onClick={() => window.open(objectUrl, "_blank", "noopener,noreferrer")}
          >
            {t("k_9b850cb9")}<ExternalLink size={12} aria-hidden />
          </button>
        </div>
      </div>
      {error ? <p className="home-ask-operation-error" role="alert">{error}</p> : null}
      {expanded ? (
        <iframe className="home-ask-operation-candidate-frame" src={objectUrl} title={t("k_37dd8b94")} />
      ) : null}
    </div>
  );
}
