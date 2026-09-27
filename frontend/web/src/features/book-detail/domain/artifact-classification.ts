// 产物分组、标签与预览能力判定：把后端 manifest item 映射成人话。
// 仅依赖 types/values，不涉及 URL 解析与 section 组装。

import type { DocumentJobSummary } from "@/features/library/domain.js";
import type { ArtifactCenterGroupId, ArtifactManifestItem } from "./artifact-center-types.js";
import { artifactKey, text, workflowOf } from "./artifact-values.js";
import { t } from "@retainpdf/i18n";

export const GROUP_META: Record<ArtifactCenterGroupId, { label: string; description: string }> = {
  source: { label: t("k_97d9441a"), description: t("k_a9ac4aab") },
  ocr: { label: t("k_4b5b3373"), description: t("k_0aa924d9") },
  translation: { label: t("k_0050b54c"), description: t("k_15f3351a") },
  diagnostics: { label: t("k_ef067b4a"), description: t("k_36f56fc8") },
  agent: { label: t("k_042ae5d5"), description: t("k_da28b1ca") },
};

export function isDiagnosticArtifact(item: ArtifactManifestItem): boolean {
  const key = `${artifactKey(item)} ${text(item.artifact_group)}`;
  return /(diagnostic|report|summary|failure|error|log|trace)/.test(key);
}

export function groupFor(job: DocumentJobSummary, item: ArtifactManifestItem): ArtifactCenterGroupId {
  if (isDiagnosticArtifact(item)) return "diagnostics";
  const workflow = workflowOf(job);
  return workflow === "ocr" ? "ocr" : "translation";
}

export function labelFor(item: ArtifactManifestItem): string {
  const key = `${artifactKey(item)} ${text(item.file_name || item.filename).toLowerCase()}`;
  if (/layout.docx|\.docx$/.test(key)) return t("k_548e8795");
  if (/side.by.side|comparison|bilingual/.test(key)) return t("k_cfe9fa15");
  if (/translated.pdf|output.pdf|result.pdf|^pdf$/.test(key)) return t("k_d93c8aae");
  if (/normalized.document|document\.v1/.test(key)) return t("k_9c135b47");
  if (/normalization.report/.test(key)) return t("k_20b7db03");
  if (/markdown.*bundle|bundle.*markdown/.test(key)) return t("k_af104434");
  if (/bundle|archive|zip/.test(key)) return t("k_32244800");
  if (/translation.manifest/.test(key)) return t("k_ffe5c690");
  if (/layout\.json/.test(key)) return t("k_b7fa8b71");
  if (/events\.json/.test(key)) return t("k_babe0c0d");
  if (/paddle_result|paddle_raw/.test(key)) return t("k_f66088ed");
  if (/request.journal/.test(key)) return t("k_108a2a83");
  if (/markdown/.test(key)) return "Markdown";
  if (/diagnostic/.test(key)) return t("k_284aa394");
  if (/report/.test(key)) return t("k_43b647c8");
  if (/summary/.test(key)) return t("k_e5da99e4");
  return text(item.file_name || item.filename) || text(item.artifact_key) || t("k_683c9d7f");
}

export function kindFor(item: ArtifactManifestItem): string {
  const explicit = text(item.artifact_kind).toUpperCase();
  if (explicit && explicit !== "FILE") return explicit;
  const name = text(item.file_name || item.filename || item.artifact_key);
  const extension = name.match(/\.([a-z0-9]+)$/i)?.[1];
  if (extension) return extension.toUpperCase();
  const contentType = text(item.content_type);
  if (contentType.includes("pdf")) return "PDF";
  if (contentType.includes("json")) return "JSON";
  if (contentType.includes("markdown")) return "MD";
  return explicit || "FILE";
}

export function previewable(item: ArtifactManifestItem): boolean {
  const key = artifactKey(item);
  return /(pdf|markdown|normalized.document)/.test(key);
}
