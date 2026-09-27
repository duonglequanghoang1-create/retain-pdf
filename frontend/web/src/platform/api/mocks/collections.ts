import {
  addMockCollectionDocuments,
  createMockCollection,
  deleteMockCollection,
  getMockCollectionList,
  patchMockCollection,
  removeMockCollectionDocument,
} from "@/platform/mock/documents.js";
import { t } from "@retainpdf/i18n";

export async function listCollections(apiPrefix) {
  void apiPrefix;
  return getMockCollectionList();
}

export async function createCollection(apiPrefix, { name, parentId = "" }: any = {}) {
  void apiPrefix;
  return createMockCollection({ name, parent_id: parentId || null });
}

// body 支持 { name?, sort_order? }
export async function patchCollection(apiPrefix, collectionId, payload = {}) {
  const normalized = `${collectionId || ""}`.trim();
  if (!normalized) {
    throw new Error(t("k_de75b8f3"));
  }
  void apiPrefix;
  return patchMockCollection(normalized, payload);
}

export async function deleteCollection(apiPrefix, collectionId) {
  const normalized = `${collectionId || ""}`.trim();
  if (!normalized) {
    throw new Error(t("k_de75b8f3"));
  }
  void apiPrefix;
  return deleteMockCollection(normalized);
}

export async function addDocumentsToCollection(apiPrefix, collectionId, documentIds = []) {
  const normalized = `${collectionId || ""}`.trim();
  if (!normalized) {
    throw new Error(t("k_de75b8f3"));
  }
  void apiPrefix;
  return addMockCollectionDocuments(normalized, documentIds);
}

export async function removeDocumentFromCollection(apiPrefix, collectionId, documentId) {
  const normalizedCollectionId = `${collectionId || ""}`.trim();
  const normalizedDocumentId = `${documentId || ""}`.trim();
  if (!normalizedCollectionId || !normalizedDocumentId) {
    throw new Error(t("k_7ee1562b"));
  }
  void apiPrefix;
  return removeMockCollectionDocument(normalizedCollectionId, normalizedDocumentId);
}
