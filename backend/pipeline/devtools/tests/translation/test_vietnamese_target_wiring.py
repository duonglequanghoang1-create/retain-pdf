"""Registry được nối vào pipeline: `target_lang` không còn là chuỗi tự do.

Test này kiểm **hành vi quan sát được** chứ không kiểm registry (việc đó
`test_target_languages.py` lo). Nếu chỉ kiểm registry thì có thể quên nối vào
pipeline — và code cũ vẫn nhận `"Vietnames"` như thể không có gì xảy ra, đúng
thứ registry sinh ra để chặn.
"""

from __future__ import annotations

import sys
from pathlib import Path

import pytest


REPO_SCRIPTS_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(REPO_SCRIPTS_ROOT))

from retainpdf_pipeline.translate.llm.providers.deepseek import translation_client
from retainpdf_pipeline.translate.core.context import build_item_context
from retainpdf_pipeline.translate.llm.shared.target_languages import (
    UnknownTargetLanguageError,
)
from retainpdf_pipeline.translate.services.context.session_context import (
    build_translation_context,
)


def _item() -> dict:
    return {
        "item_id": "p001-b001",
        "protected_source_text": "A hash table implements a dictionary.",
        "translation_unit_protected_source_text": "A hash table implements a dictionary.",
        "block_type": "text",
        "metadata": {"structure_role": "body"},
    }


def test_session_context_accepts_vietnamese_and_derives_the_name() -> None:
    """Chỉ cần truyền `target_lang="vi"`; tên hiển thị do registry suy ra.

    Đây là điểm giá trị chính của registry: trước đây phải truyền **cả hai**
    (`target_lang` + `target_language_name`) và có thể truyền lệch nhau. Giờ
    truyền lệch là không thể biểu diễn.
    """
    context = build_translation_context(target_lang="vi")
    assert context.target_lang == "vi"
    assert context.target_language_name == "Tiếng Việt"


def test_session_context_rejects_a_typo_at_the_boundary() -> None:
    """Gõ sai phải ném lỗi **ở biên xây context**, không phải lúc gọi LLM.

    Nếu đợi tới lúc gọi LLM thì lỗi nổi ra giữa lô chạy, sau khi đã tiêu hết
    tiền cho một kết quả sai.
    """
    with pytest.raises(UnknownTargetLanguageError):
        build_translation_context(target_lang="Vietnames")


def test_prompt_carries_the_vietnamese_name(tmp_path) -> None:
    """Prompt gửi đi phải chứa đúng `"Tiếng Việt"`, không phải `"vi"` hay `"越南语"`.

    Đây là kiểm chứng đầu-cuối của việc nối: registry → context → prompt. Nếu
    chuỗi nối đứt ở giữa, test này vẫn xanh (registry đúng, context đúng) nhưng
    người dùng nhận bản dịch sai — nên phải kiểm ở đầu ra cuối.
    """
    from unittest import mock

    from retainpdf_pipeline.translate.llm.shared.prompt_protocols import (
        plain_text_single_user_prompt,
    )

    context = build_translation_context(target_lang="vi")
    item = build_item_context(_item())
    prompt = plain_text_single_user_prompt(
        item,
        mode=context.mode,
        target_language_name=context.target_language_name,
    )

    assert "Tiếng Việt" in prompt
    assert "越南语" not in prompt, "tên tiếng Trung cho tiếng Việt sẽ sai đích"
    assert "简体中文" not in prompt, "mặc định cũ không được lọt vào prompt khi đã chọn vi"


def test_default_is_unchanged_for_existing_callers() -> None:
    """Không truyền gì thì vẫn tiếng Trung — không đổi hành vi lịch sử."""
    context = build_translation_context()
    assert context.target_lang == "zh-CN"
    assert context.target_language_name == "简体中文"
