export type Locale = "zh" | "vi";
export type MessageCatalog = Record<Locale, Record<string, string>>;
/** 订阅语言变化，供 UI 切到另一种语言时重渲染。 */
export declare function onLocaleChange(listener: () => void): () => void;
export declare function initI18n(catalog: MessageCatalog, locale?: Locale): Locale;
export declare function setLocale(locale: Locale): void;
export declare function getLocale(): Locale;
export declare function availableLocales(): readonly Locale[];
export type TranslateArgs = ReadonlyArray<string | number> | null | undefined;
/**
 * 查表并按位置填参。
 *
 * @param key  catalog 里的 key
 * @param args 与源码里 ${} 出现顺序一一对应的值
 */
export declare function t(key: string, args?: TranslateArgs): string;
