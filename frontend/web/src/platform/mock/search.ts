// ===== 全文检索 =====

import { MOCK_JOB_ID } from "./constants.js";
import { MOCK_DOCUMENT_ID } from "./document-seed.js";
import { trimId } from "./mock-utils.js";
import type { MockSearchHit } from "./documents.types.js";
import { t } from "@retainpdf/i18n";

export function getMockSearchHits(
  q = "",
  { limit = 20 }: { limit?: number } = {},
): { hits: MockSearchHit[] } {
  const query = trimId(q);
  if (!query) {
    return { hits: [] };
  }
  const hits: MockSearchHit[] = [
    {
      document_id: MOCK_DOCUMENT_ID,
      job_id: MOCK_JOB_ID,
      page_idx: 0,
      block_id: "b-intro-3",
      source_snippet: `…the halogen–lithium exchange in [${query}] series was investigated…`,
      translated_snippet: t("k_0b74aa0b", [query]),
    },
    {
      document_id: "doc-1b8c52d9a304",
      job_id: "20260520-att-001",
      page_idx: 3,
      block_id: "b-sec3-2",
      source_snippet: `…scaled dot-product attention relates to [${query}] in the encoder…`,
      translated_snippet: t("k_1ebfa596", [query]),
    },
  ];
  return { hits: hits.slice(0, limit) };
}
