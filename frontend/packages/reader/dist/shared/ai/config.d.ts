type CredentialsPort = {
    getCredentials?: () => {
        modelApiKey?: string;
    } | null;
};
export declare function setReaderAiConfigAdapters(adapters?: {
    credentialsPort?: CredentialsPort | null;
    loadBrowserStoredConfig?: () => any;
    loadDeveloperStoredConfig?: () => any;
    defaultModelBaseUrl?: () => string;
    defaultModelName?: () => string;
}): void;
export declare function resetReaderAiConfigAdapters(): void;
/** 取第一个 trim 后非空的字符串；空白 / 空串不算有效凭据。 */
/**
 * 读取「设置 → API 设置」里的模型 API Key。
 * 优先级：内存 credentials 状态 → 持久化配置（桌面 snapshot / localStorage）。
 * 不读 runtime-config 密钥。
 */
export declare function readSettingsModelApiKey(browserConfig?: any): string;
export declare function resolveReaderAiConfig({ browserConfig, developerConfig, }?: {
    browserConfig?: any;
    developerConfig?: any;
}): {
    apiKey: string;
    baseUrl: string;
    model: string;
    provider: string;
};
/** 是否已在设置中配置下游模型 API Key（对话前置门禁）。 */
export declare function hasModelApiKey(browserConfig?: any): boolean;
/** 凭据保存后派发，供 AI 输入门禁立刻刷新。 */
export declare const CREDENTIALS_CHANGED_EVENT = "retainpdf:credentials-changed";
export declare function notifyCredentialsChanged(): void;
export declare const MISSING_MODEL_API_KEY_MESSAGE: string;
export {};
//# sourceMappingURL=config.d.ts.map