import { t } from "@retainpdf/i18n";

export type AgentRuntimeCredentialConfig = {
  active_runtime?: string;
  configured_runtime?: "python" | "openai" | "fx";
  llm_api_key_configured?: boolean;
  fx_gateway_api_key_configured?: boolean;
  restart_state?: "active" | "pending";
  restart_required?: boolean;
  active_revision?: number;
  configured_revision?: number;
};

export type AgentRuntimeCredentialGate = {
  blocked: boolean;
  message: string;
  mode: AgentRuntimeMode;
};

export type AgentRuntimeMode = "python" | "openai" | "fx";

export function activeAgentRuntimeMode(runtime = ""): AgentRuntimeMode {
  const normalized = runtime.toLowerCase();
  if (normalized.includes("openai")) return "openai";
  return normalized.includes("fx") ? "fx" : "python";
}

export function agentRuntimeModeLabel(mode: AgentRuntimeMode): string {
  if (mode === "openai") return t("k_026c480b");
  return mode === "fx" ? "FX Gateway Agent" : t("k_6764e631");
}

export function resolveAgentRuntimeCredentialGate({
  config,
  loading,
  error,
  legacyModelKeyConfigured,
}: {
  config: AgentRuntimeCredentialConfig | null;
  loading: boolean;
  error?: string;
  legacyModelKeyConfigured: boolean;
}): AgentRuntimeCredentialGate {
  if (!config) {
    if (loading) {
      return {
        blocked: true,
        message: t("k_1b229bf8"),
        mode: "python",
      };
    }
    return {
      blocked: true,
      message: error || t("k_d0274009"),
      mode: "python",
    };
  }

  const mode = activeAgentRuntimeMode(config.active_runtime);
  const revisionMismatch = (
    typeof config.active_revision === "number"
    && typeof config.configured_revision === "number"
    && config.active_revision !== config.configured_revision
  );
  if (
    config.restart_required
    || config.restart_state === "pending"
    || revisionMismatch
    || (config.configured_runtime && config.configured_runtime !== mode)
  ) {
    const target = agentRuntimeModeLabel(config.configured_runtime || "python");
    return {
      blocked: true,
      message: t("k_8148e592", [target]),
      mode,
    };
  }

  if (mode === "fx") {
    return {
      blocked: !config.fx_gateway_api_key_configured,
      message: config.fx_gateway_api_key_configured
        ? ""
        : t("k_2643dec5"),
      mode,
    };
  }

  // Browser delivery keeps the model key in browser-local credential state
  // and sends it as a per-request override. Both Python retrieval and the
  // OpenAI-compatible runtime support that request contract, so the homepage
  // gate must accept it in either model-backed mode. FX remains separate and
  // continues to require its dedicated Gateway credential above.
  const modelKeyConfigured = Boolean(
    config.llm_api_key_configured || legacyModelKeyConfigured,
  );
  return {
    blocked: !modelKeyConfigured,
    message: modelKeyConfigured
      ? ""
        : t("k_397d9c72"),
    mode,
  };
}
