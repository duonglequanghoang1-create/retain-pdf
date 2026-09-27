import { t } from "@retainpdf/i18n";

// Word 排版稿导出的清晰度设置（纯逻辑，不碰 React）。
//
// DPI 决定每页背景位图的分辨率——也就直接决定文件大小。后端把它夹在 [72, 300]
// 并且按 DPI 分开缓存产物，所以这里给的必须是后端认的值。

const STORAGE_KEY = "retainpdf.book-detail.word-export.dpi.v1";

/** 和后端 `DEFAULT_BACKGROUND_DPI` 保持一致；两边不一样会白建一份缓存。 */
export const DEFAULT_WORD_EXPORT_DPI = 180;

export const WORD_EXPORT_DPI_OPTIONS = [
  { value: 120, label: t("k_8beedd9b"), hint: t("k_8fc79132") },
  { value: 180, label: t("k_18a72ea0"), hint: t("k_f5944ee9") },
  { value: 300, label: t("k_2cd489b0"), hint: t("k_850afdb2") },
] as const;

export function clampWordExportDpi(value: unknown): number {
  const parsed = Math.round(Number(value));
  if (!Number.isFinite(parsed)) return DEFAULT_WORD_EXPORT_DPI;
  return Math.min(300, Math.max(72, parsed));
}

export function readWordExportDpi(storage?: Pick<Storage, "getItem">): number {
  try {
    const store = storage ?? globalThis.localStorage;
    const raw = store?.getItem(STORAGE_KEY);
    return raw ? clampWordExportDpi(raw) : DEFAULT_WORD_EXPORT_DPI;
  } catch {
    // 隐私模式 / 禁用站点数据时读写都会抛。设置丢了不算错，用默认值继续。
    return DEFAULT_WORD_EXPORT_DPI;
  }
}

export function writeWordExportDpi(
  value: number,
  storage?: Pick<Storage, "setItem">,
): void {
  try {
    const store = storage ?? globalThis.localStorage;
    store?.setItem(STORAGE_KEY, `${clampWordExportDpi(value)}`);
  } catch {
    // 同上：存不下就算了，这一次导出仍然用得上传进来的值。
  }
}

/**
 * 把清晰度挂到下载地址上。
 *
 * 用 URL 解析而不是字符串拼接：产物地址可能已经带了查询参数（相对地址在这里也要能
 * 用），直接拼 `?dpi=` 会拼出第二个问号。
 */
export function withWordExportDpi(url: string, dpi: number): string {
  const clean = `${url || ""}`.trim();
  if (!clean) return "";
  const base = globalThis.location?.href || "http://localhost/";
  try {
    const parsed = new URL(clean, base);
    parsed.searchParams.set("dpi", `${clampWordExportDpi(dpi)}`);
    // 相对地址进来就还给相对地址，免得把当前域名焊死进链接里。
    return /^[a-z][a-z0-9+.-]*:|^\/\//i.test(clean)
      ? parsed.toString()
      : `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return clean;
  }
}
