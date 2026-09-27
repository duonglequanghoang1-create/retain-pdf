// 极简 i18n 运行时——把硬编码中文收敛成 key,交给 catalog 查表。
//
// 为什么放在工作区包而不是 web/src/platform:frontend/packages/* 里的 38 个文件
// 不在 @/ 别名覆盖范围内(runner 侧 alias 指向 web/src),放平台层它们引不到;
// 反过来若放 features/ui,又会撞上 layer-boundaries 的四层方向门禁。做成包
// 与既有 domain/ui 同级,两边都引得到,也不新增层间依赖。
//
// 四个设计决定,都是为了让「换语言」这件事不产生半吊子状态:
//
// 1. 消息表静态 import,不打进动态 require——构建期就要能发现缺 key。
// 2. 消息表随本模块一起静态引入,不要求调用方先 initI18n()。测试会直接 import
//    业务模块(不经过应用入口),若 t() 依赖别处先初始化,那些路径上 t() 全部
//    返回 key 名,界面和断言一起坏。自加载让「忘记初始化」这种错误不可能发生。
// 3. t(key, args) 的 args 按位置替换 {{0}}/{{1}}。占位符原样来自源码里的
//    ${expr},重构代码时表达式会跟着变,不需要动消息表。
// 4. 缺 key 时回落到简体中文原文并打一次警告,而不是抛错或显示空串:
//    漏翻一条最多丑一句,崩掉整页则是把整个 UI 变成不可用。
import zh from "./messages/zh.json" with { type: "json" };
import vi from "./messages/vi.json" with { type: "json" };
const STORAGE_KEY = "retainpdf.locale";
const DEFAULT_LOCALE = "zh";
/** 随模块载入的默认表;t() 在没显式 init 之前就用它。 */
const BUILT_IN = { zh, vi };
let activeLocale = DEFAULT_LOCALE;
let catalogs = BUILT_IN;
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
    catalogs = catalog ?? BUILT_IN;
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
    const table = catalogs[activeLocale] ?? BUILT_IN[activeLocale];
    // 同名 key 在同一语言里只能有一条;取回退值是为了容忍表里残留的中文原文。
    const raw = table?.[key] ?? BUILT_IN[DEFAULT_LOCALE]?.[key];
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
