// 摘录悬浮窗：当前文档的服务端收藏列表（对齐 legacy 云端区）

import { t } from "@retainpdf/i18n";
import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import {
  API_PREFIX,
  createReaderServerFavoritesPort,
  fetchFavorites,
  normalizeServerFavorite,
  type ServerFavorite,
} from "../../external.js";
import { ReaderFloatShell } from "./ReaderFloatShell.js";

export type ReaderFavoritesPanelProps = {
  open: boolean;
  jobId: string;
  documentId: string;
  onClose: () => void;
  /** 1-based page jump */
  onJumpPage: (page: number) => void;
};

function kindLabel(kind: string) {
  const k = `${kind || ""}`.trim();
  if (k === "figure") return t("k_a66b71e2");
  if (k === "data") return t("k_54b8a90b");
  if (k === "sentence") return t("k_046a3be9");
  return k || t("k_046a3be9");
}

export function ReaderFavoritesPanel({
  open,
  jobId,
  documentId,
  onClose,
  onJumpPage,
}: ReaderFavoritesPanelProps) {
  const [items, setItems] = useState<ServerFavorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (!jobId && !documentId) {
      setItems([]);
      setError(t("k_ee5b9d4d"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      let list: ServerFavorite[] = [];
      if (jobId) {
        const port = createReaderServerFavoritesPort({ jobId });
        list = await port.loadServerFavorites();
      } else if (documentId) {
        const { favorites = [] } = await fetchFavorites(API_PREFIX, { documentId });
        list = (Array.isArray(favorites) ? favorites : [])
          .map((raw) => normalizeServerFavorite(raw))
          .filter(Boolean) as ServerFavorite[];
      }
      setItems(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("k_16750732"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [jobId, documentId]);

  useEffect(() => {
    if (!open) return;
    void reload();
  }, [open, reload]);

  return (
    <ReaderFloatShell
      id="reader-favorites-panel"
      open={open}
      title={t("k_046a3be9")}
      subtitle={t("k_fa4049c0")}
      titleIcon={<Bookmark size={14} strokeWidth={2.25} aria-hidden />}
      storageKey="retainpdf.reader.favorites-float.pos.v1"
      ariaLabel={t("k_046a3be9")}
      onClose={onClose}
      toolbar={(
        <>
          <span className="reader-notes-count">
            {loading ? t("k_300ee3de") : t("k_24a27aec", [items.length])}
          </span>
          <button
            type="button"
            className="reader-notes-export"
            disabled={loading}
            onClick={() => void reload()}
          >
            {t("k_38108eaa")}
          </button>
        </>
      )}
    >
      {error ? (
        <p className="reader-notes-empty" role="alert">{error}</p>
      ) : loading ? (
        <p className="reader-notes-empty">{t("k_12fa2bd5")}</p>
      ) : items.length === 0 ? (
        <p className="reader-notes-empty">
          {t("k_bbd2f403")}
        </p>
      ) : (
        items.map((item) => (
          <article key={item.favoriteId} className="reader-notes-item">
            <div className="reader-notes-item-top">
              <span className="reader-notes-kind">{kindLabel(item.kind)}</span>
              <div className="reader-notes-item-actions">
                <button
                  type="button"
                  className="reader-notes-link"
                  onClick={() => onJumpPage(Math.max(1, (item.pageIdx || 0) + 1))}
                >
                  {t("k_dae828fe")} {(item.pageIdx || 0) + 1} {t("k_73422182")}
                </button>
              </div>
            </div>
            <p className="reader-notes-quote">{item.quoteText}</p>
            {item.note ? <p className="reader-notes-note" style={{ cursor: "default" }}>{item.note}</p> : null}
          </article>
        ))
      )}
    </ReaderFloatShell>
  );
}
