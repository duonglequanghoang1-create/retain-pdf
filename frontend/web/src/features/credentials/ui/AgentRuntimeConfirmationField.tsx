import type { AgentRuntimeConfigView } from "@/platform/api/index.js";
import { Check, ShieldCheck, Zap } from "lucide-react";
import { t } from "@retainpdf/i18n";

export interface AgentRuntimeConfirmationFieldProps {
  confirmationMode: AgentRuntimeConfigView["agent_confirmation_mode"];
  onConfirmationModeChange: (
    mode: AgentRuntimeConfigView["agent_confirmation_mode"],
  ) => void;
  busy: boolean;
}

export function AgentRuntimeConfirmationField({
  confirmationMode,
  onConfirmationModeChange,
  busy,
}: AgentRuntimeConfirmationFieldProps) {
  return (
    <fieldset className="credential-agent-confirmation">
      <legend>
        {t("k_2f371962")}
        <span>{t("k_c3d367e4")}</span>
      </legend>
      <div className="credential-agent-confirmation-options" role="radiogroup" aria-label={t("k_fe616668")}>
        <button
          type="button"
          role="radio"
          aria-checked={confirmationMode === "explicit"}
          className={confirmationMode === "explicit" ? "is-selected" : ""}
          onClick={() => onConfirmationModeChange("explicit")}
          disabled={busy}
        >
          <ShieldCheck aria-hidden="true" />
          <span>{t("k_9deb52e2")}</span>
          {confirmationMode === "explicit" ? <Check className="credential-agent-confirmation-check" aria-hidden="true" /> : null}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={confirmationMode === "green_light"}
          className={confirmationMode === "green_light" ? "is-selected" : ""}
          onClick={() => onConfirmationModeChange("green_light")}
          disabled={busy}
        >
          <Zap aria-hidden="true" />
          <span>{t("k_0c8e07f4")}</span>
          {confirmationMode === "green_light" ? <Check className="credential-agent-confirmation-check" aria-hidden="true" /> : null}
        </button>
      </div>
      {confirmationMode === "green_light" ? (
        <p>
          {t("k_1add3c5d")}
        </p>
      ) : null}
    </fieldset>
  );
}
