"""Registry ngôn ngữ đích — nguồn sự thật duy nhất cho `target_lang`.

Vì sao module này tồn tại
-----------------------
Trước đây ngôn ngữ đích là **hai chuỗi tự do** rải khắp nơi: `target_lang`
(mã BCP-47-ish) và `target_language_name` (tên hiển thị, nhúng thẳng vào
prompt). Mặc định `"zh-CN"` / `"简体中文"` lặp ở ~15 chỗ. Không có chỗ nào
kiểm tra giá trị, nên:

- Gõ sai (`"Vietnames"`, `"tieng viet"`, `"vi_VN"`) lọt thẳng vào prompt.
  Model dịch ra một thứ tiếng Anh nào đó, và báo cáo vẫn ghi "thành công".
- Hai trường có thể **lệch nhau**: `target_lang="vi"` nhưng
  `target_language_name="简体中文"` — tức pipeline nói với model rằng đích là
  tiếng Việt, bằng cách gọi tên tiếng Trung. Không ai bắt được.

Registry gộp hai trường thành một bản ghi, nên chúng không thể lệch.

Vì sao giữ cả `id` lẫn `name`, không suy ra tên từ id
----------------------------------------------------
Prompt viết bằng tiếng Trung: `翻译成适合排版的{target_language_name}`. Nếu tên
là `"Vietnamese"` thì câu thành "…的Vietnamese" — đọc lệch, và model dễ trả lời
tiếng Anh. Nếu tên là `"Tiếng Việt"` thì câu đọc tự nhiên và chỉ định đích rõ.
Suy ra tên từ id (`vi` → "Tiếng Việt") cần bảng tra riêng ở chỗ khác, tức thêm
một nguồn sự thật nữa để phải đồng bộ.

Vì sao hỏi lỗi chứ không rơi về mặc định
--------------------------------------
Rơi về mặc định là im lặng làm sai: người dùng chọn tiếng Việt, nhận về tiếng
Trung, không có lỗi nào báo. Hỏi lỗi ngay tại biên cho biết giá trị sai là do
gõ, do cấu hình cũ, hay do tích hợp mới — ba việc cần xử lý khác nhau.
"""

from __future__ import annotations

from typing import Any


class UnknownTargetLanguageError(ValueError):
    """Giá trị ngôn ngữ đích không thuộc registry.

    Lớp con của `ValueError` để code đang bắt `ValueError` (rất nhiều trong
    dự án) không vỡ vì một ngoại lệ mới.
    """


#: Mục tiêu dịch được hỗ trợ. `id` là khoá chuẩn hoá; `name` là tên tự nhiên
#: nhúng vào prompt; `aliases` là các cách viết được chấp nhận.
#:
#: Thứ tự KHÔNG quan trọng — `list_target_languages()` sắp theo id để dropdown
#: ổn định giữa các lần build.
_TARGET_LANGUAGES: tuple[dict[str, Any], ...] = (
    {
        "id": "zh-CN",
        "name": "简体中文",
        "aliases": ("zh", "zh-cn", "zh_cn", "zh-hans", "chs", "chinese-simplified", "简体中文"),
    },
    {
        "id": "zh-TW",
        "name": "繁體中文",
        "aliases": ("zh-tw", "zh_tw", "zh-hant", "cht", "chinese-traditional", "繁體中文"),
    },
    {
        "id": "en",
        "name": "English",
        "aliases": ("en-us", "en_us", "en-gb", "eng", "english"),
    },
    {
        "id": "vi",
        "name": "Tiếng Việt",
        # `vie` là mã ISO 639-2; `vi-vn` là BCP-47 đầy đủ; các biến thể không
        # dấu/ có dấu cách đều là cách người dùng gõ tay.
        "aliases": ("vie", "vi-vn", "vi_vn", "vietnamese", "tiengviet", "tiếng việt"),
    },
    {
        "id": "ja",
        "name": "日本語",
        "aliases": ("jpn", "ja-jp", "ja_jp", "japanese"),
    },
    {
        "id": "ko",
        "name": "한국어",
        "aliases": ("kor", "ko-kr", "ko_kr", "korean"),
    },
    {
        "id": "fr",
        "name": "Français",
        "aliases": ("fra", "fre", "fr-fr", "fr_fr", "french"),
    },
    {
        "id": "de",
        "name": "Deutsch",
        "aliases": ("deu", "ger", "de-de", "de_de", "german"),
    },
    {
        "id": "es",
        "name": "Español",
        "aliases": ("spa", "es-es", "es_es", "spanish"),
    },
    {
        "id": "ru",
        "name": "Русский",
        "aliases": ("rus", "ru-ru", "ru_ru", "russian"),
    },
)

#: Mục tiêu dùng khi không chỉ định. **Không đổi**: tiếng Trung là mặc định lịch
#: sử của dự án, đổi nó sẽ đổi hành vi mọi lần chạy hiện có mà không ai yêu cầu.
DEFAULT_TARGET_LANG = "zh-CN"


def _alias_key(value: object) -> str:
    """Chuẩn hoá đầu vào thành khoá tra cứu: hạ chữ thường, bỏ khoảng trắng,
    gạch nối và gạch dưới.

    Bỏ khoảng trắng là cố ý: `"Tiếng Việt"` (có dấu, có khoảng trắng) là cách
    viết rất hay gặp, và không bỏ thì nó thành giá trị lạ → hỏi lỗi → người dùng
    tưởng chức năng hỏng. `str.casefold()` mạnh hơn `lower()`: xử lý được chữ
    không phải ASCII theo quy tắc Unicode.
    """
    text = str(value or "").strip().casefold()
    return "".join(ch for ch in text if ch not in " -_")


def _build_lookup() -> dict[str, dict[str, Any]]:
    lookup: dict[str, dict[str, Any]] = {}
    for entry in _TARGET_LANGUAGES:
        keys = (entry["id"], *entry.get("aliases", ()))
        for key in keys:
            normalized = _alias_key(key)
            if normalized:
                lookup[normalized] = entry
    return lookup


_LOOKUP: dict[str, dict[str, Any]] = _build_lookup()


def _supported_ids() -> list[str]:
    return sorted(entry["id"] for entry in _TARGET_LANGUAGES)


def normalize_target_lang(value: object) -> str:
    """Chuẩn hoá ngôn ngữ đích về `id` chính thức, hoặc ném lỗi nếu lạ.

    Nhận mọi alias trong registry, không phân biệt hoa/thường, không phân biệt
    `-` với `_`, không phân biệt có khoảng trắng hay không.

    Ném `UnknownTargetLanguageError` cho giá trị không nhận biết — **không**
    rơi về mặc định, xem giải thích ở docstring module.
    """
    normalized = _alias_key(value)
    entry = _LOOKUP.get(normalized)
    if entry is not None:
        return str(entry["id"])
    raise UnknownTargetLanguageError(
        f"Unsupported target language {value!r}. "
        f"Supported: {', '.join(_supported_ids())}."
    )


def resolve_target_language_name(value: object) -> str:
    """Tên tự nhiên của ngôn ngữ đích, dùng để nhúng vào prompt.

    Giữ nguyên chữ viết của chính ngôn ngữ đó (`简体中文`, `Tiếng Việt`,
    `English`) vì prompt nói tiếng Trung — xem docstring module.
    """
    entry = _LOOKUP.get(_alias_key(value))
    if entry is None:
        # Nội bộ: mọi call site đã đi qua `normalize_target_lang`, nên tới đây
        # là do bug nội bộ, không phải do người dùng nhập sai. Báo rõ để phân
        # biệt khi truy vết.
        raise UnknownTargetLanguageError(
            f"Unresolvable target language {value!r} (internal call site bug; "
            f"normalize_target_lang() should have run first)"
        )
    return str(entry["name"])


def list_target_languages() -> list[dict[str, str]]:
    """Danh sách ngôn ngữ đích cho UI, sắp theo `id` để ổn định."""
    return [
        {"id": str(entry["id"]), "name": str(entry["name"])}
        for entry in sorted(_TARGET_LANGUAGES, key=lambda e: str(e["id"]))
    ]


def default_target_language_name() -> str:
    """Tên ngôn ngữ đích mặc định — tương đương `DEFAULT_TARGET_LANG`."""
    return resolve_target_language_name(DEFAULT_TARGET_LANG)


__all__ = [
    "DEFAULT_TARGET_LANG",
    "UnknownTargetLanguageError",
    "default_target_language_name",
    "list_target_languages",
    "normalize_target_lang",
    "resolve_target_language_name",
]
