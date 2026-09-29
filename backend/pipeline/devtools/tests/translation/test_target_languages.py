"""Test cho registry ngôn ngữ đích (Vietnamese target support).

Bối cảnh: trước đây `target_lang` / `target_language_name` là hai chuỗi tự do
rải rác ở ~15 chỗ, mặc định `"zh-CN"` / `"简体中文"`. Không có chỗ nào kiểm tra
giá trị, nên gõ sai (`"Vietnames"`, `"vi_VN"`, `"Tieng Viet"`) sẽ lọt vào prompt
và model dịch sang ngôn ngữ bất kỳ mà không ai báo.

Registry này là một nguồn sự thật duy nhất: id chuẩn hoá, tên hiển thị tự nhiên
để nhúng vào prompt (prompt viết bằng tiếng Trung, nên "Tiếng Việt" phải là tên
tiếng Việt — nếu dùng "Vietnamese" thì câu "翻译成…的Vietnamese" đọc rất lạ).
"""

from __future__ import annotations

import sys
from pathlib import Path

import pytest


REPO_SCRIPTS_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(REPO_SCRIPTS_ROOT))

from retainpdf_pipeline.translate.llm.shared.target_languages import (
    DEFAULT_TARGET_LANG,
    list_target_languages,
    normalize_target_lang,
    resolve_target_language_name,
    UnknownTargetLanguageError,
)


def test_default_is_still_simplified_chinese() -> None:
    """Mặc định KHÔNG đổi.

    Đổi mặc định sang tiếng Việt sẽ đổi hành vi của mọi lần chạy hiện có mà
    không ai yêu cầu. Tiếng Trung là mặc định lịch sử của dự án và phải giữ.
    """
    assert DEFAULT_TARGET_LANG == "zh-CN"
    assert resolve_target_language_name("zh-CN") == "简体中文"


def test_vietnamese_is_available() -> None:
    assert resolve_target_language_name("vi") == "Tiếng Việt"
    assert resolve_target_language_name("vi-VN") == "Tiếng Việt"
    assert resolve_target_language_name("VI") == "Tiếng Việt"
    assert resolve_target_language_name("  vi-vn  ") == "Tiếng Việt"


def test_english_is_available() -> None:
    assert resolve_target_language_name("en") == "English"
    assert resolve_target_language_name("en-US") == "English"


@pytest.mark.parametrize(
    "value",
    ["Vietnames", "vietnam", "zz", "zh_CN_TW", ""],
)
def test_unknown_language_raises_instead_of_silently_passing_through(value: str) -> None:
    """Gõ sai phải **ném lỗi ngay**, không rơi về mặc định.

    Đây là lý do registry tồn tại. Hành vi cũ là chuỗi tự do: `"Vietnames"` chảy
    thẳng vào prompt, model dịch ra một thứ tiếng Anh nào đó, và báo cáo vẫn ghi
    "thành công". Rơi về mặc định cũng sai theo cách khác: người dùng chọn
    tiếng Việt, nhận về tiếng Trung, không có lỗi nào báo.
    """
    with pytest.raises(UnknownTargetLanguageError):
        normalize_target_lang(value)


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        # Mã ISO 639-2 và BCP-47 — người dùng kỹ thuật hay dùng.
        ("vie", "vi"),
        ("VI-VN", "vi"),
        ("vi_vn", "vi"),
        # Không dấu / có khoảng trắng: cách gõ tay rất hay gặp, và nếu từ chối
        # thì chức năng trông như hỏng.
        ("tieng viet", "vi"),
        ("Tiếng Việt", "vi"),
        ("Tieng_Viet", "vi"),
        # Dấu gạch nối ở cuối là rác, KHÔNG phải viết tắt hợp lệ.
        ("ja-", "ja"),
        ("en-", "en"),
    ],
)
def test_friendly_spellings_are_accepted(value: str, expected: str) -> None:
    """Rác nhẹ vẫn nhận, nhưng rác nặng thì hỏi.

    Ranh giới: viết lệch *vẫn còn nhận ra được* ngôn ngữ đó thì nhận (đừng bắt
    người dùng tra cứu chuẩn BCP-47); không nhận ra được thì hỏi (đừng đoán mò).
    """
    assert normalize_target_lang(value) == expected


def test_error_message_lists_the_valid_options() -> None:
    """Lỗi phải chỉ ra được lựa chọn hợp lệ, không chỉ nói "sai"."""
    with pytest.raises(UnknownTargetLanguageError) as excinfo:
        normalize_target_lang("Vietnames")
    message = str(excinfo.value)
    assert "vi" in message
    assert "zh-CN" in message


def test_listing_is_stable_and_covers_every_alias() -> None:
    """Danh sách dùng cho dropdown phải ổn định và bao phủ hết alias.

    Ổn định: sắp xếp theo id, không phụ thuộc thứ tự khai báo trong dict —
    dropdown đổi thứ tự giữa hai lần build là lỗi UI khó chịu.
    """
    listed = list_target_languages()
    ids = [entry["id"] for entry in listed]
    assert ids == sorted(ids), "danh sách phải sắp theo id"
    assert ids.count("vi") == 1, "mỗi id chỉ xuất hiện một lần"
    assert "zh-CN" in ids and "en" in ids and "vi" in ids
    for entry in listed:
        assert entry["id"] and entry["name"], f"thiếu trường: {entry!r}"


def test_names_are_self_describing_for_prompt_interpolation() -> None:
    """Tên nhúng vào prompt phải là **tên ngôn ngữ tự nhiên của chính nó**.

    Prompt là tiếng Trung: `翻译成适合排版的{target_language_name}` cho ra
    "…的Vietnamese" nếu dùng tên tiếng Anh, đọc lệch. Đây là lý do registry giữ
    cả `id` lẫn `name` thay vì suy ra tên từ id.
    """
    assert resolve_target_language_name("zh-CN") == "简体中文"
    assert resolve_target_language_name("en") == "English"
    assert resolve_target_language_name("vi") == "Tiếng Việt"
