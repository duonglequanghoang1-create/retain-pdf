// 包入口——消息表与 t() 一起从这里导出，调用方只需要一个 specifier。
//
// 消息表是静态 import：构建期就能发现缺 key 或结构不匹配，而不是等到用户
// 切语言之后才在控制台报错。代价是两条语言都进 bundle；对一个桌面 Web 应用
// 来说这点体积换取可预测性是划算的。
export { initI18n, setLocale, getLocale, availableLocales, onLocaleChange, t, } from "./i18n.js";
import zh from "./messages/zh.json" with { type: "json" };
import vi from "./messages/vi.json" with { type: "json" };
/** 应用启动时交给 initI18n 的完整消息表。 */
export const messages = { zh, vi };
