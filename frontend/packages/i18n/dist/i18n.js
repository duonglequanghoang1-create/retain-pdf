// 极简 i18n 运行时——把硬编码中文收敛成 key,交给 catalog 查表。
//
// 为什么放在 platform:platform 是最底层,app/features/ui 都能向下 import 而不
// 违反 layer-boundaries 四层方向门禁(ui 只能引 ui/platform)。反过来放 ui 或
// features 就会让 platform 侧的渲染代码引不到,或者逼出 features→ui 的新依赖。
//
// 三个设计决定,都是为了让「换语言」这件事不产生半吊子状态:
//
// 1. 消息表是静态 import,不打进动态 require——构建期就要能发现缺 key。
// 2. t(key, args) 的 args 按位置替换 {{0}}/{{1}}。占位符原样来自源码里的
//    ${expr},重构代码时表达式会跟着变,不需要动消息表。
// 3. 缺 key 时回落到简体中文原文并打一次警告,而不是抛错或显示空串:
//    漏翻一条最多丑一句,崩掉整页则是把整个 UI 变成不可用。
const STORAGE_KEY = "retainpdf.locale";
const DEFAULT_LOCALE = "zh";
let activeLocale = DEFAULT_LOCALE;
let catalogs = { zh: {}, vi: {} };
let warned = new Set();
const listeners = new Set();
/** 订阅语言变化，供 UI 切到另一种语言时重渲染。 */
export function onLocaleChange(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}
/** 读取浏览器偏好/上次选择;无值时用默认语言。 */
function detectLocale() {
    try {
        const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
        if (stored === "zh" || stored === "vi")
            return stored;
    }
    catch {
        // localStorage 在隐私模式/无头环境不可用,忽略即可。
    }
    return DEFAULT_LOCALE;
}
export function initI18n(catalog, locale) {
    catalogs = catalog;
    activeLocale = locale ?? detectLocale();
    return activeLocale;
}
export function setLocale(locale) {
    if (locale === activeLocale)
        return;
    activeLocale = locale;
    try {
        globalThis.localStorage?.setItem(STORAGE_KEY, locale);
    }
    catch {
        // 持久化失败不影响本次会话内的切换。
    }
    for (const listener of listeners)
        listener();
}
export function getLocale() {
    return activeLocale;
}
export function availableLocales() {
    return Object.keys(catalogs);
}
/**
 * 查表并按位置填参。
 *
 * @param key  catalog 里的 key
 * @param args 与源码里 ${} 出现顺序一一对应的值
 */
export function t(key, args) {
    const table = catalogs[activeLocale];
    // 同名 key 在同一语言里只能有一条;取回退值是为了容忍表里残留的中文原文。
    const raw = table?.[key] ?? catalogs[DEFAULT_LOCALE]?.[key];
    if (typeof raw !== "string") {
        if (!warned.has(key)) {
            warned.add(key);
            console.warn(`[i18n] missing message for key: ${key}`);
        }
        return key;
    }
    if (!args || args.length === 0)
        return raw;
    // 只做 {{N}} 的位置替换;其余大括号属于译文自身内容,不动。
    return raw.replace(/\{\{(\d+)\}\}/g, (whole, index) => {
        const i = Number(index);
        return i < args.length ? String(args[i]) : whole;
    });
}
