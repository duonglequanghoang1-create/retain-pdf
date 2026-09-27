import { t } from "@retainpdf/i18n";
import { useEffect, useState } from "react";
import {
  fetchAgentRuntimeConfig,
  updateAgentRuntimeConfig,
  type AgentRuntimeConfigView,
  type AgentRuntimeMode,
} from "@/platform/api/index.js";
import { Bot, FlaskConical, Save } from "lucide-react";
import { DialogFooter } from "@/ui/components/dialog.js";
import { FormStatusLine } from "@/ui/components/form-status-line.js";
import {
  activeMode,
  announceRuntimeConfigChanged,
  delay,
  modeLabel,
  modeShortLabel,
  runtimeRestartPending,
} from "./agent-runtime-helpers.js";
import { AgentRuntimeConfirmationField } from "./AgentRuntimeConfirmationField.jsx";
import { AgentRuntimeFields } from "./AgentRuntimeFields.jsx";

export function AgentRuntimeSettingsCard() {
  const [config, setConfig] = useState<AgentRuntimeConfigView | null>(null);
  const [mode, setMode] = useState<AgentRuntimeMode>("python");
  const [confirmationMode, setConfirmationMode] = useState<
    AgentRuntimeConfigView["agent_confirmation_mode"]
  >("explicit");
  const [baseUrl, setBaseUrl] = useState("https://api.deepseek.com/v1");
  const [model, setModel] = useState("deepseek-flash");
  const [fxGatewayBaseUrl, setFxGatewayBaseUrl] = useState("");
  const [fxModel, setFxModel] = useState("");
  const [modelKey, setModelKey] = useState("");
  const [gatewayKey, setGatewayKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"" | "valid" | "error">("");

  async function load({ syncForm = true } = {}) {
    const next = await fetchAgentRuntimeConfig();
    setConfig(next);
    if (syncForm) {
      setMode(next.configured_runtime || activeMode(next.active_runtime) || "python");
      setConfirmationMode(next.agent_confirmation_mode || "explicit");
      setBaseUrl(next.llm_base_url || "https://api.deepseek.com/v1");
      setModel(next.llm_model || "deepseek-flash");
      setFxGatewayBaseUrl(next.fx_gateway_base_url || "");
      setFxModel(next.fx_model || "");
      setModelKey(next.llm_api_key || "");
      setGatewayKey(next.fx_gateway_api_key || "");
    }
    return next;
  }

  useEffect(() => {
    let active = true;
    fetchAgentRuntimeConfig()
      .then((next) => {
        if (!active) return;
        setConfig(next);
        setMode(next.configured_runtime || activeMode(next.active_runtime) || "python");
        setConfirmationMode(next.agent_confirmation_mode || "explicit");
        setBaseUrl(next.llm_base_url || "https://api.deepseek.com/v1");
        setModel(next.llm_model || "deepseek-flash");
        setFxGatewayBaseUrl(next.fx_gateway_base_url || "");
        setFxModel(next.fx_model || "");
        setModelKey(next.llm_api_key || "");
        setGatewayKey(next.fx_gateway_api_key || "");
        if (runtimeRestartPending(next)) {
          setRestarting(true);
          setMessage(t("k_e18cf40e"));
          void waitForRuntime(next.configured_runtime);
        }
      })
      .catch((error) => {
        if (!active) return;
        setMessage(error?.message || t("k_1c98ea80"));
        setTone("error");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function waitForRuntime(expected: AgentRuntimeMode) {
    try {
      for (let attempt = 0; attempt < 12; attempt += 1) {
        await delay(500);
        try {
          const next = await load({ syncForm: false });
          if (
            activeMode(next.active_runtime) === expected
            && !runtimeRestartPending(next)
          ) {
            setMessage(t("k_5d6b5ed7", [modeLabel(expected)]));
            setTone("valid");
            announceRuntimeConfigChanged();
            return;
          }
        } catch {
          // Expected while the supervised AI child is restarting.
        }
      }
      setMessage(t("k_d670113a"));
      setTone("");
      announceRuntimeConfigChanged();
    } finally {
      setRestarting(false);
    }
  }

  async function save() {
    if (mode !== "fx" && !modelKey.trim() && !config?.llm_api_key_configured) {
      setMessage(t("k_8c098121", [modeLabel(mode)]));
      setTone("error");
      return;
    }
    if (
      mode === "fx"
      && !gatewayKey.trim()
      && !config?.fx_gateway_api_key_configured
    ) {
      setMessage(t("k_d961069b"));
      setTone("error");
      return;
    }
    setSaving(true);
    setMessage(t("k_0151b21c"));
    setTone("");
    try {
      const next = await updateAgentRuntimeConfig({
        expected_revision: config?.configured_revision,
        agent_runtime: mode,
        agent_confirmation_mode: confirmationMode,
        llm_base_url: baseUrl.trim(),
        llm_model: model.trim(),
        fx_gateway_base_url: fxGatewayBaseUrl.trim(),
        fx_model: fxModel.trim(),
        ...(modelKey.trim() ? { llm_api_key: modelKey.trim() } : {}),
        ...(gatewayKey.trim()
          ? { fx_gateway_api_key: gatewayKey.trim() }
          : {}),
      });
      setConfig(next);
      setModelKey(next.llm_api_key ?? modelKey.trim());
      setGatewayKey(next.fx_gateway_api_key ?? gatewayKey.trim());
      announceRuntimeConfigChanged();
      if (runtimeRestartPending(next)) {
        setRestarting(true);
        setMessage(t("k_e40bb867"));
        void waitForRuntime(mode);
      } else {
        setMessage(t("k_09ab9512"));
        setTone("valid");
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message || t("k_40525a73");
      if (errorMessage.includes("(409)")) {
        try {
          await load({ syncForm: false });
        } catch {
          // Keep the user's draft even when refreshing the revision fails.
        }
        setMessage(t("k_23e25512"));
      } else {
        setMessage(errorMessage);
      }
      setTone("error");
    } finally {
      setSaving(false);
    }
  }

  const currentMode = activeMode(config?.active_runtime || "");
  const busy = loading || saving || restarting;
  const statusState = { message, tone };

  return (
    <section className="credential-card credential-agent-card">
      <div className="credential-card-head credential-card-head-rich credential-agent-head">
        <span className="credential-card-icon" aria-hidden="true"><Bot /></span>
        <div className="credential-card-copy">
          <h3 className="credential-agent-title">
            AI Agent
            <span className="credential-agent-beta" title={t("k_76141d19")}>
              <FlaskConical aria-hidden="true" />
              Beta
            </span>
          </h3>
        </div>
        <span
          className="credential-agent-runtime-badge"
          title={currentMode ? t("k_621d7fa1", [modeLabel(currentMode)]) : t("k_9b31c38f")}
          aria-live="polite"
        >
          <span className="credential-agent-runtime-dot" aria-hidden="true" />
          {loading ? t("k_b21b631c") : restarting ? t("k_72421ad9") : modeShortLabel(currentMode)}
        </span>
      </div>

      <AgentRuntimeFields
        mode={mode}
        onModeChange={setMode}
        config={config}
        busy={busy}
        baseUrl={baseUrl}
        onBaseUrlChange={setBaseUrl}
        model={model}
        onModelChange={setModel}
        modelKey={modelKey}
        onModelKeyChange={setModelKey}
        fxGatewayBaseUrl={fxGatewayBaseUrl}
        onFxGatewayBaseUrlChange={setFxGatewayBaseUrl}
        fxModel={fxModel}
        onFxModelChange={setFxModel}
        gatewayKey={gatewayKey}
        onGatewayKeyChange={setGatewayKey}
      />

      <AgentRuntimeConfirmationField
        confirmationMode={confirmationMode}
        onConfirmationModeChange={setConfirmationMode}
        busy={busy}
      />

      <DialogFooter className="credential-agent-actions">
        <FormStatusLine status={message ? statusState : null} className="credential-agent-runtime-message" />
        <button
          type="button"
          className="app-button secondary credential-agent-save-button"
          onClick={() => void save()}
          disabled={busy}
        >
          <Save aria-hidden="true" />
          {saving ? t("k_9ca32f98") : restarting ? t("k_ce2d2904") : t("k_bb79ec7c")}
        </button>
      </DialogFooter>
    </section>
  );
}
