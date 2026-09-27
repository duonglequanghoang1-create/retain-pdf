import type {
  AgentRuntimeConfigView,
  AgentRuntimeMode,
} from "@/platform/api/index.js";
import { SecretInput } from "./SecretInput.js";
import { t } from "@retainpdf/i18n";

export interface AgentRuntimeFieldsProps {
  mode: AgentRuntimeMode;
  onModeChange: (mode: AgentRuntimeMode) => void;
  config: AgentRuntimeConfigView | null;
  busy: boolean;
  baseUrl: string;
  onBaseUrlChange: (value: string) => void;
  model: string;
  onModelChange: (value: string) => void;
  modelKey: string;
  onModelKeyChange: (value: string) => void;
  fxGatewayBaseUrl: string;
  onFxGatewayBaseUrlChange: (value: string) => void;
  fxModel: string;
  onFxModelChange: (value: string) => void;
  gatewayKey: string;
  onGatewayKeyChange: (value: string) => void;
}

export function AgentRuntimeFields({
  mode,
  onModeChange,
  config,
  busy,
  baseUrl,
  onBaseUrlChange,
  model,
  onModelChange,
  modelKey,
  onModelKeyChange,
  fxGatewayBaseUrl,
  onFxGatewayBaseUrlChange,
  fxModel,
  onFxModelChange,
  gatewayKey,
  onGatewayKeyChange,
}: AgentRuntimeFieldsProps) {
  return (
    <div className="credential-agent-grid">
      <label className="credential-agent-mode-field">
        <span className="developer-label">运行模式</span>
        <select
          aria-label={t("k_c8206b63")}
          value={mode}
          onChange={(event) => onModeChange(event.target.value as AgentRuntimeMode)}
          disabled={busy}
        >
          <option value="python">Markdown 检索问答</option>
          <option value="openai">OpenAI 兼容 Agent</option>
          <option value="fx">FX Gateway Agent</option>
        </select>
      </label>

      {mode !== "fx" ? (
        <>
          <label className="credential-agent-url-field">
            <span className="developer-label">模型 API URL</span>
            <input
              aria-label={t("k_907fd02b")}
              type="url"
              value={baseUrl}
              onChange={(event) => onBaseUrlChange(event.target.value)}
              disabled={busy}
            />
          </label>
          <label className="credential-agent-model-field">
            <span className="developer-label">模型</span>
            <input
              aria-label={t("k_1b5fc091")}
              value={model}
              onChange={(event) => onModelChange(event.target.value)}
              disabled={busy}
            />
          </label>
          <label className="credential-agent-key-field">
            <span className="developer-label">模型 API Key</span>
            <SecretInput
              aria-label={t("k_8f79e857")}
              secretLabel={t("k_8f79e857")}
              autoComplete="off"
              value={modelKey}
              placeholder={t("k_8f79e857")}
              onChange={(event) => onModelKeyChange(event.target.value)}
              disabled={busy}
            />
          </label>
        </>
      ) : (
        <>
          <label className="credential-agent-url-field">
            <span className="developer-label">FX Gateway URL（可选）</span>
            <input
              aria-label="FX Gateway URL"
              type="url"
              value={fxGatewayBaseUrl}
              placeholder={t("k_2d809969")}
              onChange={(event) => onFxGatewayBaseUrlChange(event.target.value)}
              disabled={busy}
            />
          </label>
          <p className="credential-agent-fx-url-note">
            仅支持本机 HTTP + 端口；远程地址请使用 OpenAI 模式。留空使用官方 Gateway。
          </p>
          <label className="credential-agent-model-field">
            <span className="developer-label">FX 模型（可选）</span>
            <input
              aria-label={t("k_75d6609d")}
              value={fxModel}
              placeholder={t("k_cd80ba06")}
              onChange={(event) => onFxModelChange(event.target.value)}
              disabled={busy}
            />
          </label>
          <label className="credential-agent-key-field">
            <span className="developer-label">Gateway Key</span>
            <SecretInput
              aria-label="FX Gateway Key"
              secretLabel="FX Gateway Key"
              autoComplete="off"
              value={gatewayKey}
              placeholder="Gateway Key"
              onChange={(event) => onGatewayKeyChange(event.target.value)}
              disabled={busy}
            />
          </label>
        </>
      )}
    </div>
  );
}
