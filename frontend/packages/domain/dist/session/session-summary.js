import { t } from "@retainpdf/i18n";
export function toSessionSummary(record, options = {}) {
    const source = record || {};
    const id = `${source.conversation_id || ""}`.trim();
    const summary = {
        id,
        title: `${source.title || ""}`.trim() || t("k_8200c3d5"),
        updatedAt: `${source.updated_at || source.created_at || ""}`,
        messageCount: Number(source.message_count) || 0,
    };
    if (options.documentId) {
        summary.documentId = `${source.document_id || ""}`.trim() || undefined;
    }
    if (options.active !== undefined) {
        summary.active = id === options.active;
    }
    return summary;
}
