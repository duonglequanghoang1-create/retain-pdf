import { t } from "@retainpdf/i18n";

export async function fetchGlossaries(apiPrefix) {
  void apiPrefix;
  return {
    items: [
      {
        glossary_id: "mock-glossary-quantum",
        name: t("k_f9d2676f"),
        entry_count: 2,
        created_at: "",
        updated_at: "",
      },
    ],
  };
}

export async function fetchGlossary(glossaryId, apiPrefix) {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) {
    throw new Error(t("k_048670d4"));
  }
  void apiPrefix;
  return {
    glossary_id: normalizedGlossaryId,
    name: normalizedGlossaryId === "mock-glossary-quantum" ? t("k_f9d2676f") : t("k_33d46ee9"),
    entry_count: 2,
    entries: [
      {
        source: "Hartree-Fock",
        target: "",
        level: "preserve",
        match_mode: "case_insensitive",
        context: "",
        note: t("k_25fe3395"),
      },
      {
        source: "density functional theory",
        target: t("k_0a5136a3"),
        level: "canonical",
        match_mode: "case_insensitive",
        context: "",
        note: t("k_e8748a93"),
      },
    ],
  };
}

export async function createGlossary(apiPrefix, payload) {
  void apiPrefix;
  return {
    glossary_id: `mock-glossary-${Date.now()}`,
    entry_count: Array.isArray(payload?.entries) ? payload.entries.length : 0,
    ...payload,
  };
}

export async function updateGlossary(apiPrefix, glossaryId, payload) {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) {
    throw new Error(t("k_3facc259"));
  }
  void apiPrefix;
  return {
    glossary_id: normalizedGlossaryId,
    entry_count: Array.isArray(payload?.entries) ? payload.entries.length : 0,
    ...payload,
  };
}

export async function deleteGlossary(apiPrefix, glossaryId) {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) {
    throw new Error(t("k_00f5150c"));
  }
  void apiPrefix;
  return { glossary_id: normalizedGlossaryId, deleted: true };
}

export async function exportGlossaryCsv(apiPrefix, glossaryId) {
  const normalizedGlossaryId = `${glossaryId || ""}`.trim();
  if (!normalizedGlossaryId) {
    throw new Error(t("k_7bbecdd1"));
  }
  void apiPrefix;
  return new Response(t("k_39826277"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${normalizedGlossaryId}.csv"`,
    },
  });
}

export async function parseGlossaryCsv(apiPrefix, csvText) {
  void apiPrefix;
  void csvText;
  return {
    entry_count: 1,
    entries: [
      {
        source: "Hartree-Fock",
        target: "",
        level: "preserve",
        match_mode: "case_insensitive",
        context: "",
        note: "mock",
      },
    ],
  };
}
