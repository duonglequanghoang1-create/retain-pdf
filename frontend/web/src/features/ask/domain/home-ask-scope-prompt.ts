// 提问范围（@ 文档 / 合集）→ 模型 prompt，以及合集展开为文档列表
//
// 纯逻辑：不发 UI 状态、不依赖 React；合集展开失败时降级为仅靠 prompt 里的合集名提示。

import { resolveCollectionDocuments } from "./document-picker.js";
import type { HomeAskDocScope, HomeAskScope } from "./types.js";
import { t } from "@retainpdf/i18n";

function labelScope(s: HomeAskScope): string {
  if (s.kind === "collection") {
    const n = s.document_count != null ? t("k_252a75f7", [s.document_count]) : "";
    return t("k_01a919ad", [s.title, n]);
  }
  return t("k_375f4140", [s.title]);
}

export function buildScopedQuestion(
  question: string,
  scopes: HomeAskScope[],
  resolvedDocs: HomeAskDocScope[] = [],
): string {
  const q = `${question || ""}`.trim();
  if (!q) return "";
  if (!scopes.length) return q;

  const hasCollection = scopes.some((s) => s.kind === "collection");
  if (!hasCollection && scopes.length === 1 && scopes[0].kind === "document") {
    return t("k_6c75b51c", [scopes[0].title, q]);
  }

  const scopeLines = scopes.map((s, i) => `${i + 1}. ${labelScope(s)}`).join("\n");
  if (resolvedDocs.length > 0) {
    const docLines = resolvedDocs
      .slice(0, 40)
      .map((d, i) => `  ${i + 1}. ${d.title} (document_id=${d.id})`)
      .join("\n");
    const more = resolvedDocs.length > 40 ? t("k_d1e6219d", [resolvedDocs.length]) : "";
    return (
      t("k_b5933228")
      + t("k_c1111e4d", [scopeLines])
      + t("k_e8ce1245", [docLines, more])
      + t("k_064ec7c3", [q])
    );
  }
  return t("k_0559f1e5", [scopeLines, q]);
}

/** 展开 scopes → 文档列表；单文档硬 scope 时返回 primary */
export async function resolveScopesForAsk(scopes: HomeAskScope[]): Promise<{
  primaryDoc: HomeAskDocScope | null;
  resolvedDocs: HomeAskDocScope[];
}> {
  if (!scopes.length) {
    return { primaryDoc: null, resolvedDocs: [] };
  }

  const docs: HomeAskDocScope[] = [];
  const seen = new Set<string>();

  for (const s of scopes) {
    if (s.kind === "document") {
      if (!seen.has(s.id)) {
        seen.add(s.id);
        docs.push(s);
      }
      continue;
    }
    try {
      const list = await resolveCollectionDocuments(s.id, 100);
      for (const d of list) {
        if (!seen.has(d.id)) {
          seen.add(d.id);
          docs.push(d);
        }
      }
    } catch {
      // 合集展开失败时仍靠 prompt 里的合集名提示模型
    }
  }

  // 仅一个文档（无论直接 @ 还是合集里只有一篇）→ 硬限定
  const primaryDoc = docs.length === 1 ? docs[0] : null;
  return { primaryDoc, resolvedDocs: docs };
}
