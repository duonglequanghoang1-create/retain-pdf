import { isMockMode } from "@/platform/config/runtime.js";
import { getMockJobList } from "@/platform/mock/index.js";
import { countMockFavoritesByJob } from "@/platform/mock/documents.js";
import {
  fetchLibraryBookList as _fetchLibraryBookList,
  deleteLibraryBook as _deleteLibraryBook,
} from "@retainpdf/api/library-books";
import { stripOcrSuffix } from "@retainpdf/api/utils/strip-ocr";
import { t } from "@retainpdf/i18n";

export const fetchLibraryBookList = async (apiPrefix: string, opts: any = {}): Promise<any> => {
  if (isMockMode()) { const jobIds = Array.isArray(opts?.jobIds) ? opts.jobIds : []; return getMockJobList({ jobIds }); }
  return (_fetchLibraryBookList as any)(apiPrefix, opts);
};

export const deleteLibraryBook = async (apiPrefix: string, jobId: string, opts: any = {}): Promise<any> => {
  const normalizedJobId = stripOcrSuffix(`${jobId || ""}`);
  if (!normalizedJobId) throw new Error(t("k_58d63f3a"));
  if (isMockMode()) {
    const referenced = countMockFavoritesByJob(normalizedJobId);
    if (referenced > 0 && !opts?.force) {
      const conflict = new Error(t("k_50eec8a6", [referenced])) as Error & { status?: number };
      (conflict as any).status = 409;
      throw conflict;
    }
    return { job_id: normalizedJobId };
  }
  return (_deleteLibraryBook as any)(apiPrefix, jobId, opts);
};
