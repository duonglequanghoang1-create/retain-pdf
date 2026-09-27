import { jsx as i, jsxs as E, Fragment as ve } from "react/jsx-runtime";
import { useState as U, useRef as L, useEffect as H, useMemo as J, useCallback as G, useId as pt } from "react";
import { Square as mt, ArrowUp as ht, Copy as gt, GitBranch as bt, RefreshCw as yt, Sigma as Ge, Table2 as kt, Image as _t, Type as wt, X as Ie, BookOpen as Ve, Sparkles as be, Loader2 as Re, FileText as Ae, ArrowDown as Ye, Quote as vt, ListTree as It, FlaskConical as Rt, ShieldCheck as Ct, Bot as Nt, ChevronUp as Mt, ChevronDown as Qe, TriangleAlert as Je, ExternalLink as St, Check as Xe, Circle as At, Plus as Tt, Pencil as xt, Trash2 as $t } from "lucide-react";
import { g as me, h as he, i as ze, j as Et, d as Pt, b as Ot } from "./ReaderApp-BMiyXfDI.js";
import { ThreadPrimitive as ae, ComposerPrimitive as ke, MessagePrimitive as Ze, ActionBarPrimitive as Me, useAui as Dt, SelectionToolbarPrimitive as zt, useExternalStoreRuntime as qt, AssistantRuntimeProvider as Bt } from "@assistant-ui/react";
import { t as o } from "@retainpdf/i18n";
import { A as Ft } from "./AiMarkdownAnswer-7J-eZRXt.js";
import { r as et } from "./reader-regions-DsePY7B_.js";
import { M as Lt, C as qe, h as jt } from "./config-BabEEVGF.js";
import { b as fe, n as ce, q as Kt } from "./answer-enhance-7SmH7rTG.js";
import { b as Wt, m as Ut, s as Ht, l as tt, c as ge, d as xe, a as Gt } from "./answer-quote-CV2EinZL.js";
import { Chat as Vt, useChat as Yt } from "@ai-sdk/react";
import { describeToolEvent as Qt } from "@retainpdf/domain/ai";
import { toSessionSummary as Jt } from "@retainpdf/domain/session";
import { l as Xt } from "./ask-answerer-I2yuqneN.js";
import { getConversation as Be, messagesToBranchItems as we, nextForkConversationTitle as Zt } from "@retainpdf/api/conversations";
import { c as Se } from "./ai-chat-ZSCffLDD.js";
import { agentOperationShouldReplace as en, agentOperationEventSeq as tn, agentOperationShouldPoll as nn, agentOperationErrorStatus as rn, agentOperationErrorMessage as sn, resolveAgentOperationActionKey as an, clearAgentOperationActionKey as on } from "@retainpdf/api/agent-operation-model";
function nt(t) {
  return t.content.filter((e) => e.type === "text").map((e) => e.text).join(`
`).trim();
}
function Fe({ label: t }) {
  return /* @__PURE__ */ E("div", { className: "aui-thinking", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ i(Re, { className: "aui-spin", size: 14, strokeWidth: 2.4, "aria-hidden": !0 }),
    /* @__PURE__ */ i("span", { children: t || o("k_29653ff3") })
  ] });
}
function cn({ message: t }) {
  return /* @__PURE__ */ i(Ze.Root, { className: "aui-msg aui-msg-user", "data-role": "user", children: /* @__PURE__ */ i("div", { className: "aui-msg-bubble", children: /* @__PURE__ */ i("div", { className: "aui-md-plain", children: nt(t) }) }) });
}
function dn({
  jobId: t,
  message: e,
  citations: n,
  progress: s,
  incompleteReason: a,
  streaming: r,
  branchBusy: c,
  onJumpCitation: u,
  onBranchFromAnswer: p
}) {
  const d = nt(e);
  return /* @__PURE__ */ i(Ze.Root, { className: "aui-msg aui-msg-assistant", "data-role": "assistant", children: /* @__PURE__ */ E("div", { className: "aui-msg-stack", children: [
    r && s ? /* @__PURE__ */ i(Fe, { label: s }) : null,
    r && !s && !d ? /* @__PURE__ */ i(Fe, { label: o("k_29653ff3") }) : null,
    !r && a === "rounds_exhausted" ? /* @__PURE__ */ i("div", { className: "aui-msg-truncated", role: "status", children: "检索与计算的步数已用尽，这个回答是提前收尾的——追问一句可以让它接着做。" }) : null,
    d ? /* @__PURE__ */ i("div", { className: "aui-msg-bubble", children: /* @__PURE__ */ i(
      Ft,
      {
        content: d,
        streaming: r,
        citations: n,
        jobId: t,
        className: "aui-md",
        streamingClassName: "aui-md-streaming",
        pendingClassName: "aui-md-pending",
        finalClassName: "aui-md-final",
        onJumpCitation: u
      }
    ) }) : null,
    /* @__PURE__ */ E(
      Me.Root,
      {
        className: "aui-msg-actions",
        "data-reader-ai-actions": "",
        hideWhenRunning: !0,
        autohide: "not-last",
        children: [
          /* @__PURE__ */ i(Me.Copy, { className: "aui-action-btn", "aria-label": o("k_b2dcbbf3"), title: o("k_b2dcbbf3"), children: /* @__PURE__ */ i(gt, { size: 14, strokeWidth: 2.1, "aria-hidden": !0 }) }),
          p ? /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "aui-action-btn aui-action-btn-branch",
              "aria-label": o("k_ccce11aa"),
              title: o("k_ccce11aa"),
              disabled: c,
              onClick: async () => {
                fe(1200, { overlayDelayMs: 0 }), ce(1200), await p(e.id);
              },
              children: /* @__PURE__ */ i(bt, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 })
            }
          ) : null,
          /* @__PURE__ */ i(Me.Reload, { className: "aui-action-btn", "aria-label": o("k_2e190570"), title: o("k_2e190570"), children: /* @__PURE__ */ i(yt, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }) })
        ]
      }
    )
  ] }) });
}
function rt({
  jobId: t,
  citationsByMessageId: e,
  progressByMessageId: n,
  incompleteByMessageId: s,
  streamingAssistantId: a,
  isRunning: r,
  branchBusy: c,
  onJumpCitation: u,
  onBranchFromAnswer: p
}) {
  return /* @__PURE__ */ i("div", { className: "aui-message-group", "data-slot": "aui_message-group", children: /* @__PURE__ */ i(ae.Messages, { children: ({ message: d }) => {
    var k;
    if (d.role === "user") return /* @__PURE__ */ i(cn, { message: d });
    if (d.role !== "assistant") return null;
    const w = ((k = d.status) == null ? void 0 : k.type) === "running" || r && a === d.id;
    return /* @__PURE__ */ i(
      dn,
      {
        jobId: t,
        message: d,
        citations: e[d.id] || [],
        progress: n[d.id] || "",
        incompleteReason: s[d.id] || "",
        streaming: w,
        branchBusy: c,
        onJumpCitation: u,
        onBranchFromAnswer: p
      }
    );
  } }) });
}
function ln({
  mode: t,
  disabled: e,
  onChange: n
}) {
  return /* @__PURE__ */ E("div", { className: "aui-assistant-mode", role: "group", "aria-label": o("k_39633dce"), children: [
    /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        className: t !== "operations" ? "is-active" : "",
        "aria-pressed": t !== "operations",
        disabled: e,
        onClick: () => n == null ? void 0 : n("reading"),
        children: [
          /* @__PURE__ */ i(Ve, { size: 12, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ i("span", { children: "阅读问答" })
        ]
      }
    ),
    /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        className: t === "operations" ? "is-active" : "",
        "aria-pressed": t === "operations",
        disabled: e,
        onClick: () => n == null ? void 0 : n("operations"),
        children: [
          /* @__PURE__ */ i(be, { size: 12, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ i("span", { children: "PDF Agent" })
        ]
      }
    )
  ] });
}
function un({
  selectionContext: t,
  onClear: e
}) {
  if (!t) return null;
  const n = t.selectionType === "text" ? "text" : t.kind, s = t.selectionType === "text" ? t.quote : et(t.region, t.pane), a = n === "formula" ? o("k_3f27035a") : n === "table" ? o("k_150074c2") : n === "figure" ? o("k_be8da62e") : o("k_f4d3dab8");
  return /* @__PURE__ */ E("div", { className: "aui-selection-context", "data-reader-ai-selection-context": "", children: [
    /* @__PURE__ */ i(n === "formula" ? Ge : n === "table" ? kt : n === "figure" ? _t : wt, { size: 14, strokeWidth: 2.1, "aria-hidden": !0 }),
    /* @__PURE__ */ E("span", { className: "aui-selection-context-meta", children: [
      t.pane === "translated" ? o("k_647e0016") : o("k_4d69dbdf"),
      " · ",
      t.page,
      " 页 · ",
      a
    ] }),
    /* @__PURE__ */ i("span", { className: "aui-selection-context-text", children: s || o("k_3ec18a8b") }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        className: "aui-selection-context-remove",
        "aria-label": o("k_5a1c32a3"),
        title: o("k_674f24d9"),
        onClick: e,
        children: /* @__PURE__ */ i(Ie, { size: 13, strokeWidth: 2.4, "aria-hidden": !0 })
      }
    )
  ] });
}
function st({
  isRunning: t,
  branchBusy: e,
  mode: n,
  onModeChange: s,
  selectionContext: a,
  onClearSelectionContext: r
}) {
  return /* @__PURE__ */ E(ke.Root, { className: "aui-composer", "data-reader-ai-composer": "", children: [
    /* @__PURE__ */ E("div", { className: "aui-composer-shell", children: [
      n !== "operations" ? /* @__PURE__ */ i(un, { selectionContext: a, onClear: r }) : null,
      /* @__PURE__ */ i(
        ke.Input,
        {
          className: "aui-input",
          rows: 1,
          placeholder: n === "operations" ? o("k_1b634612") : o("k_139abb6f"),
          "aria-label": n === "operations" ? o("k_add94cc5") : o("k_5cc2cdd4"),
          autoFocus: !0,
          enterKeyHint: "send",
          disabled: e,
          submitMode: "enter"
        }
      ),
      /* @__PURE__ */ E("div", { className: "aui-composer-toolbar", children: [
        /* @__PURE__ */ i(ln, { mode: n, disabled: t || e, onChange: s }),
        /* @__PURE__ */ i("div", { className: "aui-composer-actions", children: t ? /* @__PURE__ */ i(ke.Cancel, { className: "aui-send aui-send-stop", "aria-label": o("k_76349aa6"), children: /* @__PURE__ */ i(mt, { size: 12, strokeWidth: 2.6, "aria-hidden": !0 }) }) : /* @__PURE__ */ i(ke.Send, { className: "aui-send", "aria-label": o("k_1214d633"), children: /* @__PURE__ */ i(ht, { size: 16, strokeWidth: 2.5, "aria-hidden": !0 }) }) })
      ] })
    ] }),
    /* @__PURE__ */ i("p", { className: "aui-hint", children: "AI 可能会出错，请核对原文与引用" })
  ] });
}
function at() {
  return /* @__PURE__ */ E("div", { className: "aui-composer aui-composer-locked", role: "alert", children: [
    /* @__PURE__ */ i("p", { className: "aui-llm-lock-msg", children: Lt }),
    /* @__PURE__ */ i("p", { className: "aui-hint", children: "请到首页「设置 → API 设置」填写模型 Key 后即可提问" })
  ] });
}
const fn = [
  { prompt: o("k_704807bb"), label: o("k_2670123f"), icon: Ae },
  { prompt: o("k_980317b7"), label: o("k_661cc5df"), icon: Ae }
];
function pn({
  jobId: t,
  empty: e,
  citationsByMessageId: n,
  progressByMessageId: s,
  incompleteByMessageId: a,
  streamingAssistantId: r,
  isRunning: c,
  missingLlmKey: u,
  branchBusy: p,
  agentRequestBlocked: d = !1,
  agentOperationPanel: w,
  onModeChange: k,
  onJumpCitation: R,
  onBranchFromAnswer: m
}) {
  const f = p || d;
  return /* @__PURE__ */ E(ve, { children: [
    e ? /* @__PURE__ */ E("div", { className: "aui-empty", children: [
      /* @__PURE__ */ i("div", { className: "aui-empty-mascot", "aria-hidden": !0, children: /* @__PURE__ */ i("span", { className: "aui-empty-mascot-face", children: /* @__PURE__ */ i(be, { size: 21, strokeWidth: 1.9 }) }) }),
      /* @__PURE__ */ i("h2", { className: "aui-empty-title", children: "想怎样处理 PDF？" }),
      /* @__PURE__ */ i("p", { className: "aui-empty-sub", children: "创建候选版本后由你预览和确认" }),
      /* @__PURE__ */ i("div", { className: "aui-suggestions", role: "group", "aria-label": o("k_402274e3"), children: fn.map((P) => {
        const O = P.icon;
        return /* @__PURE__ */ E(
          ae.Suggestion,
          {
            prompt: P.prompt,
            send: !0,
            type: "button",
            className: "aui-suggestion",
            disabled: f || u,
            children: [
              /* @__PURE__ */ i(O, { size: 14, strokeWidth: 2, "aria-hidden": !0, className: "aui-suggestion-icon" }),
              /* @__PURE__ */ i("span", { className: "aui-suggestion-label", children: P.label })
            ]
          },
          P.prompt
        );
      }) })
    ] }) : null,
    /* @__PURE__ */ i(
      rt,
      {
        jobId: t,
        citationsByMessageId: n,
        progressByMessageId: s,
        incompleteByMessageId: a,
        streamingAssistantId: r,
        isRunning: c,
        branchBusy: p,
        onJumpCitation: R,
        onBranchFromAnswer: m
      }
    ),
    w,
    /* @__PURE__ */ E(ae.ViewportFooter, { className: "aui-thread-viewport-footer", children: [
      !e && !p ? /* @__PURE__ */ i(
        ae.ScrollToBottom,
        {
          className: "aui-scroll-bottom-btn aui-scroll-bottom",
          "aria-label": o("k_f2936d26"),
          children: /* @__PURE__ */ i(Ye, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
        }
      ) : null,
      u ? /* @__PURE__ */ i(at, {}) : /* @__PURE__ */ i(
        st,
        {
          isRunning: c,
          branchBusy: f,
          mode: "operations",
          onModeChange: k,
          selectionContext: null,
          onClearSelectionContext: void 0
        }
      )
    ] })
  ] });
}
function mn() {
  const t = Dt(), e = (n) => {
    var c, u, p;
    n.preventDefault();
    const s = `${((c = globalThis.getSelection) == null ? void 0 : c.call(globalThis)) || ""}`.trim();
    if (!s) return;
    const a = Wt(s);
    if (!a) return;
    const r = t.thread.composer();
    r.setText(Ut(r.getState().text || "", a));
    try {
      (p = (u = globalThis.getSelection) == null ? void 0 : u.call(globalThis)) == null || p.removeAllRanges();
    } catch {
    }
  };
  return /* @__PURE__ */ i(zt.Root, { className: "reader-ai-selection-toolbar", children: /* @__PURE__ */ E(
    "button",
    {
      type: "button",
      className: "reader-ai-selection-quote",
      onPointerDown: e,
      title: o("k_4f44e95c"),
      children: [
        /* @__PURE__ */ i(vt, { size: 12, strokeWidth: 2.4, "aria-hidden": !0 }),
        /* @__PURE__ */ i("span", { children: "引用" })
      ]
    }
  ) });
}
const hn = [
  { prompt: o("k_0ed2b98b"), label: o("k_b4242ae0"), icon: Ve },
  { prompt: o("k_7c4b9acb"), label: o("k_c663ef97"), icon: It },
  { prompt: o("k_fc1d35fd"), label: o("k_5471130d"), icon: Rt },
  { prompt: o("k_a9440fe8"), label: o("k_55f0c6fc"), icon: Ge }
];
function gn({
  jobId: t,
  empty: e,
  citationsByMessageId: n,
  progressByMessageId: s,
  incompleteByMessageId: a,
  streamingAssistantId: r,
  isRunning: c,
  missingLlmKey: u,
  branchBusy: p,
  composerDisabled: d = !1,
  onModeChange: w,
  onJumpCitation: k,
  onBranchFromAnswer: R,
  selectionContext: m = null,
  onClearSelectionContext: f,
  footerExtra: P = null
}) {
  return /* @__PURE__ */ E(ve, { children: [
    e ? /* @__PURE__ */ E("div", { className: "aui-empty", children: [
      /* @__PURE__ */ i("div", { className: "aui-empty-mascot", "aria-hidden": !0, children: /* @__PURE__ */ i("span", { className: "aui-empty-mascot-face", children: /* @__PURE__ */ i(be, { size: 21, strokeWidth: 1.9 }) }) }),
      /* @__PURE__ */ i("h2", { className: "aui-empty-title", children: "一起读懂这篇文档" }),
      /* @__PURE__ */ i("p", { className: "aui-empty-sub", children: "总结、解释、检索与计算，不修改 PDF" }),
      /* @__PURE__ */ i("div", { className: "aui-suggestions", role: "group", "aria-label": o("k_402274e3"), children: hn.map((O) => {
        const M = O.icon;
        return /* @__PURE__ */ E(
          ae.Suggestion,
          {
            prompt: O.prompt,
            send: !0,
            type: "button",
            className: "aui-suggestion",
            disabled: p || d || u,
            children: [
              /* @__PURE__ */ i(M, { size: 14, strokeWidth: 2, "aria-hidden": !0, className: "aui-suggestion-icon" }),
              /* @__PURE__ */ i("span", { className: "aui-suggestion-label", children: O.label })
            ]
          },
          O.prompt
        );
      }) })
    ] }) : null,
    /* @__PURE__ */ i(mn, {}),
    /* @__PURE__ */ i(
      rt,
      {
        jobId: t,
        citationsByMessageId: n,
        progressByMessageId: s,
        incompleteByMessageId: a,
        streamingAssistantId: r,
        isRunning: c,
        branchBusy: p,
        onJumpCitation: k,
        onBranchFromAnswer: R
      }
    ),
    P,
    /* @__PURE__ */ E(ae.ViewportFooter, { className: "aui-thread-viewport-footer", children: [
      !e && !p ? /* @__PURE__ */ i(
        ae.ScrollToBottom,
        {
          className: "aui-scroll-bottom-btn aui-scroll-bottom",
          "aria-label": o("k_f2936d26"),
          children: /* @__PURE__ */ i(Ye, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
        }
      ) : null,
      u ? /* @__PURE__ */ i(at, {}) : /* @__PURE__ */ i(
        st,
        {
          isRunning: c,
          branchBusy: p || d,
          mode: "reading",
          onModeChange: w,
          selectionContext: m,
          onClearSelectionContext: f
        }
      )
    ] })
  ] });
}
function bn({
  jobId: t,
  messages: e,
  citationsByMessageId: n,
  progressByMessageId: s,
  incompleteByMessageId: a,
  streamingAssistantId: r,
  isRunning: c,
  missingLlmKey: u,
  branchBusy: p,
  agentRequestBlocked: d = !1,
  agentOperationPanel: w,
  assistantMode: k = "reading",
  onAssistantModeChange: R,
  onJumpCitation: m,
  onBranchFromAnswer: f,
  selectionContext: P = null,
  onClearSelectionContext: O
}) {
  const M = e.length === 0, z = k === "operations";
  return /* @__PURE__ */ i(
    ae.Root,
    {
      className: `aui-thread aui-thread-root${u ? " is-llm-locked" : ""}`,
      "data-chat-ui": "assistant-ui-official-thread",
      children: /* @__PURE__ */ i(
        ae.Viewport,
        {
          className: "aui-viewport",
          "data-slot": "aui_thread-viewport",
          "data-reader-ai-viewport": "true",
          turnAnchor: "top",
          autoScroll: !0,
          children: /* @__PURE__ */ i("div", { className: `aui-thread-inner${M ? " is-empty" : ""}`, children: z ? /* @__PURE__ */ i(
            pn,
            {
              jobId: t,
              empty: M,
              citationsByMessageId: n,
              progressByMessageId: s,
              incompleteByMessageId: a,
              streamingAssistantId: r,
              isRunning: c,
              missingLlmKey: u,
              branchBusy: p,
              agentRequestBlocked: d,
              agentOperationPanel: w,
              onModeChange: R,
              onJumpCitation: m,
              onBranchFromAnswer: f
            }
          ) : /* @__PURE__ */ i(
            gn,
            {
              jobId: t,
              empty: M,
              citationsByMessageId: n,
              progressByMessageId: s,
              incompleteByMessageId: a,
              streamingAssistantId: r,
              isRunning: c,
              missingLlmKey: u,
              branchBusy: p,
              composerDisabled: d,
              onModeChange: R,
              onJumpCitation: m,
              onBranchFromAnswer: f,
              selectionContext: P,
              onClearSelectionContext: O
            }
          ) })
        }
      )
    }
  );
}
const it = "retainpdf.reader-agent-operation.dismissed.v1", yn = /* @__PURE__ */ new Set(["failed", "cancelled"]);
function Le(t) {
  return [
    `${t.operation_id || ""}`.trim(),
    Number(t.current_attempt) || 0,
    `${t.status || ""}`
  ].join(":");
}
function kn() {
  var t;
  try {
    const e = JSON.parse(((t = globalThis.localStorage) == null ? void 0 : t.getItem(it)) || "[]");
    return new Set(Array.isArray(e) ? e.filter((n) => typeof n == "string") : []);
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function _n(t) {
  var e;
  try {
    (e = globalThis.localStorage) == null || e.setItem(
      it,
      JSON.stringify(Array.from(t).slice(-100))
    );
  } catch {
  }
}
function ot(t, e) {
  switch (t) {
    case "draft":
    case "awaiting_confirmation":
      return e === "green_light" ? o("k_abd26d76") : o("k_25a45621");
    case "queued":
      return o("k_d0de7734");
    case "running":
      return o("k_0a7f07c3");
    case "validating":
      return o("k_545a65a6");
    case "result_ready":
      return e === "green_light" ? o("k_1e174064") : o("k_1e53ba5e");
    case "committed":
      return e === "green_light" ? o("k_39aa2266") : o("k_c99c6952");
    case "failed":
      return o("k_9746cfc7");
    case "cancelled":
      return o("k_a5ffdc95");
    case "ambiguous":
      return o("k_590a8964");
    default:
      return `${t}`;
  }
}
function wn(t) {
  switch (t) {
    case "draft":
    case "awaiting_confirmation":
      return [
        { action: "cancel", label: o("k_03e210a6") },
        { action: "run", label: o("k_ae1109f3"), primary: !0 }
      ];
    case "queued":
    case "running":
    case "validating":
      return [{ action: "cancel", label: o("k_84442f48"), danger: !0 }];
    case "result_ready":
      return [
        { action: "cancel", label: o("k_12a73a13") },
        { action: "commit", label: o("k_9bfb5d92"), primary: !0 }
      ];
    case "failed":
      return [{ action: "retry", label: o("k_e2d53a6d"), primary: !0 }];
    case "ambiguous":
      return [{ action: "retry", label: o("k_cb916333"), danger: !0, risk: !0 }];
    default:
      return [];
  }
}
function vn(t) {
  return t === "failed" || t === "ambiguous" ? Je : t === "cancelled" ? Ie : t === "committed" || t === "result_ready" ? Xe : ["queued", "running", "validating"].includes(t) ? Re : At;
}
function In({ events: t, mode: e }) {
  return /* @__PURE__ */ i("ol", { className: "reader-agent-operation-timeline", "aria-label": o("k_e53a2f17"), children: t.map((n) => {
    const s = vn(n.status), a = ["queued", "running", "validating"].includes(n.status);
    return /* @__PURE__ */ E("li", { children: [
      /* @__PURE__ */ i(s, { className: a ? "is-spinning" : "", size: 12, "aria-hidden": !0 }),
      /* @__PURE__ */ i("span", { children: n.summary || n.event || ot(n.status, e) }),
      /* @__PURE__ */ i("time", { children: n.ts ? new Date(n.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
    ] }, `${n.attempt}:${n.seq}`);
  }) });
}
function Rn({
  operation: t,
  loadCandidate: e
}) {
  const [n, s] = U(!1), [a, r] = U(""), [c, u] = U(""), p = L("");
  return H(() => {
    let d = !1;
    return u(""), e(t).then((w) => {
      if (d) return;
      const k = URL.createObjectURL(w);
      p.current && URL.revokeObjectURL(p.current), p.current = k, r(k);
    }).catch(() => {
      d || u(o("k_729d4268"));
    }), () => {
      d = !0;
    };
  }, [e, t.operation_id, t.current_attempt]), H(() => () => {
    p.current && URL.revokeObjectURL(p.current);
  }, []), /* @__PURE__ */ E(ve, { children: [
    /* @__PURE__ */ E("div", { className: "reader-agent-operation-candidate", children: [
      /* @__PURE__ */ E("div", { children: [
        /* @__PURE__ */ i(Ae, { size: 13, "aria-hidden": !0 }),
        /* @__PURE__ */ i("span", { children: "候选 PDF" })
      ] }),
      /* @__PURE__ */ i("button", { type: "button", disabled: !a, onClick: () => s((d) => !d), children: a ? n ? o("k_5d581564") : o("k_de61aa8e") : o("k_300ee3de") }),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          disabled: !a,
          "aria-label": o("k_20c74def"),
          onClick: () => window.open(a, "_blank", "noopener,noreferrer"),
          children: /* @__PURE__ */ i(St, { size: 12, "aria-hidden": !0 })
        }
      )
    ] }),
    n ? /* @__PURE__ */ i("iframe", { className: "reader-agent-operation-preview", src: a, title: o("k_2c845c17") }) : null,
    c ? /* @__PURE__ */ i("p", { className: "reader-agent-operation-error", role: "alert", children: c }) : null
  ] });
}
function Cn({
  entry: t,
  mode: e,
  loadCandidate: n,
  onAction: s,
  onDismiss: a
}) {
  var O;
  const { operation: r, pendingAction: c, error: u } = t, [p, d] = U(!1), [w, k] = U(!1), R = r.events || [], m = wn(r.status), f = !!((r.status === "result_ready" || r.status === "committed") && r.candidate_available), P = yn.has(r.status);
  return /* @__PURE__ */ E("article", { className: `reader-agent-operation-card is-${r.status}`, "data-operation-id": r.operation_id, children: [
    /* @__PURE__ */ E("header", { children: [
      /* @__PURE__ */ i("span", { className: "reader-agent-operation-icon", "aria-hidden": !0, children: /* @__PURE__ */ i(Nt, { size: 15 }) }),
      /* @__PURE__ */ E("div", { className: "reader-agent-operation-title", children: [
        /* @__PURE__ */ i("span", { children: "PDF 操作" }),
        /* @__PURE__ */ i("strong", { children: r.intent_summary || o("k_848fbe6a") })
      ] }),
      /* @__PURE__ */ E("div", { className: "reader-agent-operation-head-actions", children: [
        /* @__PURE__ */ i("span", { className: "reader-agent-operation-status", children: ot(r.status, e) }),
        P ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: "reader-agent-operation-dismiss",
            "aria-label": r.status === "failed" ? o("k_d1ea7ca0") : o("k_c1a90a2e"),
            title: o("k_bb0e7e01"),
            onClick: () => a(r),
            children: /* @__PURE__ */ i(Ie, { size: 13, "aria-hidden": !0 })
          }
        ) : null
      ] })
    ] }),
    (O = r.affected_pages) != null && O.length ? /* @__PURE__ */ E("p", { className: "reader-agent-operation-scope", children: [
      "影响页码：",
      r.affected_pages.join("、")
    ] }) : null,
    R.length ? /* @__PURE__ */ E("div", { className: "reader-agent-operation-details", children: [
      /* @__PURE__ */ E("button", { type: "button", onClick: () => d((M) => !M), children: [
        p ? /* @__PURE__ */ i(Mt, { size: 12, "aria-hidden": !0 }) : /* @__PURE__ */ i(Qe, { size: 12, "aria-hidden": !0 }),
        p ? o("k_c4cb1897") : o("k_ad75ebcb", [R.length])
      ] }),
      p ? /* @__PURE__ */ i(In, { events: R, mode: e }) : null
    ] }) : null,
    f ? /* @__PURE__ */ i(Rn, { operation: r, loadCandidate: n }) : null,
    u ? /* @__PURE__ */ i("p", { className: "reader-agent-operation-error", role: "alert", children: u }) : null,
    w ? /* @__PURE__ */ E("div", { className: "reader-agent-operation-risk", role: "alertdialog", "aria-label": o("k_875120ef"), children: [
      /* @__PURE__ */ i(Je, { size: 14, "aria-hidden": !0 }),
      /* @__PURE__ */ i("p", { children: "上一次执行结果不确定，重试可能重复操作。确认接受风险后再继续。" }),
      /* @__PURE__ */ E("div", { children: [
        /* @__PURE__ */ i("button", { type: "button", onClick: () => k(!1), disabled: !!c, children: "返回" }),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: "is-danger",
            disabled: !!c,
            onClick: async () => {
              await s("retry", r, { acceptDuplicateRisk: !0 }), k(!1);
            },
            children: c === "retry" ? o("k_1cac8ac7") : o("k_5ded2022")
          }
        )
      ] })
    ] }) : m.length ? /* @__PURE__ */ i("div", { className: "reader-agent-operation-actions", children: m.map((M) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        className: M.primary ? "is-primary" : M.danger ? "is-danger" : "",
        disabled: !!c,
        onClick: () => {
          M.risk ? k(!0) : s(M.action, r);
        },
        children: c === M.action ? o("k_1cac8ac7") : M.label
      },
      M.action
    )) }) : null
  ] });
}
function Nn({
  entries: t,
  confirmationMode: e,
  runtimeRestarting: n,
  loadCandidate: s,
  onAction: a
}) {
  const [r, c] = U(kn), u = t.filter((d) => !r.has(Le(d.operation)));
  function p(d) {
    const w = Le(d);
    c((k) => {
      const R = new Set(k);
      return R.add(w), _n(R), R;
    });
  }
  return /* @__PURE__ */ E("section", { className: `reader-agent-operations${u.length ? " has-operations" : ""}`, "aria-label": o("k_3476c2fd"), children: [
    /* @__PURE__ */ E("div", { className: `reader-agent-mode${e === "green_light" ? " is-green" : ""}`, children: [
      /* @__PURE__ */ i(Ct, { size: 13, "aria-hidden": !0 }),
      /* @__PURE__ */ i("span", { children: e === "green_light" ? o("k_af4d8105") : o("k_012643ef") })
    ] }),
    n ? /* @__PURE__ */ E("div", { className: "reader-agent-restarting", role: "status", children: [
      /* @__PURE__ */ i(Re, { className: "is-spinning", size: 13, "aria-hidden": !0 }),
      "正在重启 Agent，新请求暂不可用"
    ] }) : null,
    u.map((d) => /* @__PURE__ */ i(
      Cn,
      {
        entry: d,
        mode: e,
        loadCandidate: s,
        onAction: a,
        onDismiss: p
      },
      d.operation.operation_id
    ))
  ] });
}
const Mn = (t) => t, Sn = Object.freeze([]), An = Object.freeze({}), je = Object.freeze({}), Tn = Object.freeze({
  entries: [],
  confirmationMode: "explicit",
  runtimeRestarting: !1,
  runtimeCredentialConfigured: !1,
  perform: async () => {
  },
  loadCandidate: async () => new Blob()
});
function xn(t) {
  return t.content.filter((e) => e.type === "text").map((e) => e.text).join(`
`).trim();
}
function $n(t, e, n) {
  var s, a, r, c;
  return ((s = t.status) == null ? void 0 : s.type) === "running" || n && e === t.id ? { type: "running" } : ((a = t.status) == null ? void 0 : a.type) === "incomplete" || ((r = t.status) == null ? void 0 : r.type) === "error" ? {
    type: "incomplete",
    reason: ((c = t.status) == null ? void 0 : c.reason) === "cancelled" ? "cancelled" : "error"
  } : { type: "complete", reason: "stop" };
}
function En({
  jobId: t = "",
  messages: e = Sn,
  citationsByMessageId: n = An,
  progressByMessageId: s = je,
  contentByMessageId: a = je,
  streamingAssistantId: r = "",
  isRunning: c = !1,
  onSubmit: u,
  onRetry: p,
  onCancel: d,
  onJumpCitation: w,
  onBranchFromAnswer: k,
  branchBusy: R = !1,
  agentOperations: m = Tn,
  assistantMode: f = "reading",
  onAssistantModeChange: P,
  selectionContext: O = null,
  onClearSelectionContext: M
}) {
  const [, z] = U(0);
  H(() => {
    const g = () => z((S) => S + 1);
    return window.addEventListener("focus", g), window.addEventListener("storage", g), document.addEventListener(qe, g), () => {
      window.removeEventListener("focus", g), window.removeEventListener("storage", g), document.removeEventListener(qe, g);
    };
  }, []);
  const $ = !jt() && !m.runtimeCredentialConfigured, v = J(() => e.map((g) => ({
    id: g.id,
    role: g.role,
    content: a[g.id] || g.content || "",
    ...g.role === "assistant" ? { status: $n(g, r, c) } : {}
  })), [a, c, e, r]), D = J(() => {
    var S, h;
    const g = {};
    for (const C of e) {
      if (C.role !== "assistant") continue;
      const T = `${((S = C.status) == null ? void 0 : S.reason) || ""}`.trim();
      ((h = C.status) == null ? void 0 : h.type) === "incomplete" && T && T !== "cancelled" && (g[C.id] = T);
    }
    return g;
  }, [e]), y = G(async (g) => {
    const S = g ? Math.max(0, e.findIndex((C) => C.id === g) + 1) : 0, h = e.slice(S).find((C) => C.role === "assistant");
    h && await p(h.id);
  }, [e, p]), b = G(async (g) => {
    const S = xn(g);
    !S || c || R || m.runtimeRestarting || $ || await u(S);
  }, [m.runtimeRestarting, R, c, $, u]), I = G(async () => {
    await d();
  }, [d]), A = J(() => ({
    messages: v,
    isRunning: c,
    isDisabled: R || m.runtimeRestarting || $,
    convertMessage: Mn,
    onNew: b,
    onReload: y,
    onCancel: I
  }), [
    m.runtimeRestarting,
    R,
    I,
    b,
    c,
    $,
    y,
    v
  ]), _ = qt(A);
  return /* @__PURE__ */ i(Bt, { runtime: _, children: /* @__PURE__ */ i(
    bn,
    {
      jobId: t,
      messages: e,
      citationsByMessageId: n,
      progressByMessageId: s,
      incompleteByMessageId: D,
      streamingAssistantId: r,
      isRunning: c,
      missingLlmKey: $,
      branchBusy: R,
      agentRequestBlocked: m.runtimeRestarting,
      assistantMode: f,
      onAssistantModeChange: P,
      selectionContext: O,
      onClearSelectionContext: M,
      agentOperationPanel: m.entries.length > 0 || m.runtimeRestarting ? /* @__PURE__ */ i(
        Nn,
        {
          entries: m.entries,
          confirmationMode: m.confirmationMode,
          runtimeRestarting: m.runtimeRestarting,
          loadCandidate: m.loadCandidate,
          onAction: m.perform
        }
      ) : null,
      onJumpCitation: w,
      onBranchFromAnswer: k
    }
  ) });
}
function _e(t = 900, e = 0) {
  fe(t, { overlayDelayMs: e }), ce(t);
}
function Pn({
  sessions: t,
  activeId: e,
  busy: n = !1,
  disabled: s = !1,
  errorText: a = "",
  onSwitch: r,
  onNew: c,
  onDelete: u,
  onRename: p
}) {
  const d = t.length > 0, w = n || s, [k, R] = U(!1), [m, f] = U(""), [P, O] = U(""), M = L(null), z = pt();
  function $(h) {
    const C = `${h || ""}`.match(/^fork-(\d+)-(.*)$/i);
    if (!C) return h;
    const T = C[2].trim();
    return T ? o("k_07ad5074", [T, C[1]]) : o("k_bfe8bdfc", [C[1]]);
  }
  const v = L(!1), D = L(null), y = t.find((h) => h.id === e) || null, b = y ? y.messageCount ? $(y.title) : o("k_c2a84778", [$(y.title)]) : d ? o("k_0a98e3c4") : o("k_1b7abf96");
  H(() => {
    if (!k) {
      f("");
      return;
    }
    const h = (x) => {
      if (v.current) return;
      const l = M.current;
      l && (x.target instanceof Node && l.contains(x.target) || (R(!1), f("")));
    }, C = (x) => {
      x.key === "Escape" && (R(!1), f(""));
    }, T = window.setTimeout(() => {
      document.addEventListener("pointerdown", h, !0);
    }, 0);
    return document.addEventListener("keydown", C), () => {
      window.clearTimeout(T), document.removeEventListener("pointerdown", h, !0), document.removeEventListener("keydown", C);
    };
  }, [k]), H(() => {
    if (!m) return;
    const h = D.current;
    h && (h.focus(), h.select());
  }, [m]);
  const I = (h) => {
    const C = `${h || ""}`.trim();
    !C || w || v.current || m || (v.current = !0, _e(1e3, 0), requestAnimationFrame(() => {
      R(!1), window.setTimeout(() => {
        (async () => {
          try {
            await r(C);
          } finally {
            _e(400, 0), v.current = !1;
          }
        })();
      }, 40);
    }));
  }, A = (h) => {
    w || (f(h.id), O(h.title || ""));
  }, _ = () => {
    const h = m, C = P;
    f(""), h && p(h, C);
  }, g = () => {
    f(""), O("");
  }, S = (h) => {
    var x;
    if (w || v.current) return;
    const C = h.title || o("k_8200c3d5");
    (x = globalThis.confirm) != null && x.call(globalThis, o("k_87930265", [C])) && (v.current = !0, _e(800, 0), (async () => {
      try {
        await u(h.id);
      } finally {
        v.current = !1;
      }
    })());
  };
  return /* @__PURE__ */ E(
    "div",
    {
      className: "aui-session-bar",
      "data-reader-ai-sessions": "",
      ref: M,
      onPointerDown: (h) => {
        h.stopPropagation();
      },
      onClick: (h) => {
        h.stopPropagation();
      },
      children: [
        /* @__PURE__ */ E("div", { className: "aui-session-row", children: [
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              className: `aui-session-trigger${k ? " is-open" : ""}`,
              "aria-label": o("k_554275b5"),
              "aria-haspopup": "listbox",
              "aria-expanded": k,
              "aria-controls": z,
              disabled: w || !d,
              title: b,
              onClick: () => {
                w || !d || R((h) => !h);
              },
              children: [
                /* @__PURE__ */ i("span", { className: "aui-session-trigger-label", children: b }),
                /* @__PURE__ */ i(Qe, { size: 14, strokeWidth: 2.4, "aria-hidden": !0 })
              ]
            }
          ),
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              className: "aui-session-btn",
              disabled: w,
              title: o("k_fa347cae"),
              "aria-label": o("k_1b7abf96"),
              onClick: () => {
                w || v.current || (v.current = !0, _e(800), R(!1), f(""), window.setTimeout(() => {
                  (async () => {
                    try {
                      await c();
                    } finally {
                      v.current = !1;
                    }
                  })();
                }, 40));
              },
              children: [
                n ? /* @__PURE__ */ i(Re, { className: "aui-spin", size: 14, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ i(Tt, { size: 14, strokeWidth: 2.4, "aria-hidden": !0 }),
                /* @__PURE__ */ i("span", { children: "新对话" })
              ]
            }
          )
        ] }),
        k && d ? /* @__PURE__ */ i(
          "ul",
          {
            id: z,
            className: "aui-session-list",
            role: "listbox",
            "aria-label": o("k_6acb3640"),
            children: t.map((h) => {
              const C = h.messageCount ? $(h.title) : o("k_c2a84778", [$(h.title)]), T = h.id === e, x = m === h.id;
              return /* @__PURE__ */ i("li", { className: "aui-session-row-item", role: "presentation", children: x ? /* @__PURE__ */ E("div", { className: "aui-session-edit", children: [
                /* @__PURE__ */ i(
                  "input",
                  {
                    ref: D,
                    className: "aui-session-edit-input",
                    value: P,
                    maxLength: 80,
                    "aria-label": o("k_b259c016"),
                    disabled: w,
                    onChange: (l) => O(l.target.value),
                    onKeyDown: (l) => {
                      l.key === "Enter" ? (l.preventDefault(), _()) : l.key === "Escape" && (l.preventDefault(), g());
                    },
                    onClick: (l) => l.stopPropagation()
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn",
                    "aria-label": o("k_fe0e9e6e"),
                    title: o("k_fadf24db"),
                    disabled: w || !P.trim(),
                    onClick: (l) => {
                      l.stopPropagation(), _();
                    },
                    children: /* @__PURE__ */ i(Xe, { size: 13, strokeWidth: 2.5, "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn",
                    "aria-label": o("k_89fdd63b"),
                    title: o("k_4d0b4688"),
                    disabled: w,
                    onClick: (l) => {
                      l.stopPropagation(), g();
                    },
                    children: /* @__PURE__ */ i(Ie, { size: 13, strokeWidth: 2.5, "aria-hidden": !0 })
                  }
                )
              ] }) : /* @__PURE__ */ E(ve, { children: [
                /* @__PURE__ */ E(
                  "button",
                  {
                    type: "button",
                    role: "option",
                    "aria-selected": T,
                    className: `aui-session-item${T ? " is-active" : ""}`,
                    disabled: w,
                    title: C,
                    onPointerDown: (l) => {
                      l.stopPropagation(), !T && !w && ce(1e3);
                    },
                    onClick: (l) => {
                      if (l.preventDefault(), l.stopPropagation(), T) {
                        R(!1);
                        return;
                      }
                      I(h.id);
                    },
                    children: [
                      /* @__PURE__ */ i("span", { className: "aui-session-item-title", children: C }),
                      T ? /* @__PURE__ */ i("span", { className: "aui-session-item-badge", children: "当前" }) : null
                    ]
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn",
                    "aria-label": o("k_304cb6f9", [C]),
                    title: o("k_1cd80fd7"),
                    disabled: w,
                    onClick: (l) => {
                      l.preventDefault(), l.stopPropagation(), A(h);
                    },
                    children: /* @__PURE__ */ i(xt, { size: 13, strokeWidth: 2.4, "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ i(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn is-danger",
                    "aria-label": o("k_65154fc0", [C]),
                    title: o("k_3755f56f"),
                    disabled: w,
                    onClick: (l) => {
                      l.preventDefault(), l.stopPropagation(), S(h);
                    },
                    children: /* @__PURE__ */ i($t, { size: 13, strokeWidth: 2.4, "aria-hidden": !0 })
                  }
                )
              ] }) }, h.id);
            })
          }
        ) : null,
        a ? /* @__PURE__ */ i("div", { className: "aui-session-error", role: "alert", children: a }) : null
      ]
    }
  );
}
function ct(t) {
  return ((t == null ? void 0 : t.parts) || []).filter((e) => e.type === "text").map((e) => e.text).join("").trim();
}
function On(t, e) {
  const n = `${e.question || ""}`.trim();
  if (n) return n;
  for (let s = t.length - 1; s >= 0; s -= 1) {
    const a = t[s];
    if (a.role !== "user") continue;
    const r = ct(a);
    if (r) return r;
  }
  return "";
}
function Dn(t) {
  const e = Number(t == null ? void 0 : t.status) || 0, n = `${(t == null ? void 0 : t.message) || ""}`;
  return e === 502 || /\b502\b/.test(n);
}
class zn {
  constructor(e) {
    this.options = e;
  }
  async sendMessages({
    abortSignal: e,
    body: n,
    messages: s,
    trigger: a
  }) {
    var O, M, z, $;
    const r = n || {}, c = On(s, r);
    if (!c) throw new Error(o("k_c0af56b0"));
    const u = r.assistantMode || ((M = (O = this.options).getAssistantMode) == null ? void 0 : M.call(O)) || "reading", p = r.scope || "document", d = r.context ? { ...r.context } : null, w = `${r.assistantMessageId || ""}`.trim() || `a-${Date.now().toString(36)}`, k = `${w}-text`, R = this.options.getRemoteAnswerer(), m = (($ = (z = this.options).getLocalAnswerer) == null ? void 0 : $.call(z)) || null;
    if (!R && !m)
      throw new Error(o("k_f59bd7f4"));
    let f = !1;
    const P = /* @__PURE__ */ new Set();
    return new ReadableStream({
      cancel: () => {
        f = !0;
      },
      start: (v) => {
        let D = "", y = {
          citations: [],
          progress: a === "regenerate-message" ? o("k_f7adee6c") : o("k_b24a7869"),
          status: "running"
        };
        const b = (A) => {
          if (!f)
            try {
              v.enqueue(A);
            } catch {
              f = !0;
            }
        }, I = (A) => {
          y = { ...y, ...A }, b({ type: "message-metadata", messageMetadata: y });
        };
        b({ type: "start", messageId: w, messageMetadata: y }), b({ type: "start-step" }), b({ type: "text-start", id: k }), (async () => {
          var A, _, g, S, h, C;
          try {
            if (await ((A = R == null ? void 0 : R.ensureLoaded) == null ? void 0 : A.call(R, this.options.jobId)), e != null && e.aborted) throw new Error("aborted");
            let T = R || m, x = !1, l;
            try {
              l = await T.answer({
                question: c,
                assistantMode: u,
                scope: p,
                context: d,
                parentId: `${r.parentId || ""}`.trim(),
                regenerate: r.regenerate ?? a === "regenerate-message",
                userMessageId: `${r.userMessageId || ""}`.trim(),
                assistantMessageId: w,
                onAgentSessionEvent: (N) => {
                  var Z, ne, se;
                  const B = (Z = N == null ? void 0 : N.capabilities) == null ? void 0 : Z.document_operation_confirmation_mode;
                  (B === "explicit" || B === "green_light") && ((se = (ne = this.options).onConfirmationMode) == null || se.call(ne, B));
                },
                onAgentOperationEvent: (N) => {
                  var Z, ne;
                  const B = `${(N == null ? void 0 : N.operation_id) || ""}`.trim();
                  B && ((ne = (Z = this.options).onAgentOperationSignal) == null || ne.call(Z, {
                    operationId: B,
                    conversationId: `${(N == null ? void 0 : N.conversation_id) || ""}`.trim() || void 0
                  }));
                },
                onAgentConfirmationRequiredEvent: (N) => {
                  var ie, ee;
                  const B = `${(N == null ? void 0 : N.operation_id) || ""}`.trim();
                  if (!B) return;
                  const Z = `${(N == null ? void 0 : N.action) || ""}`, ne = `${(N == null ? void 0 : N.current_attempt) ?? ""}`, se = `${B}:${ne}:${Z}`;
                  P.has(se) || (P.add(se), (ee = (ie = this.options).onAgentOperationSignal) == null || ee.call(ie, { operationId: B }));
                },
                onToolEvent: (N) => {
                  if (D || e != null && e.aborted) return;
                  const B = Qt(N);
                  B && I({ progress: B });
                },
                onProgressEvent: (N) => {
                  if (D || e != null && e.aborted) return;
                  const B = `${(N == null ? void 0 : N.message) || ""}`.trim();
                  B && I({ progress: B });
                },
                onAnswerDelta: (N, B) => {
                  !B || e != null && e.aborted || (D += B, y.progress && I({ progress: "" }), b({ type: "text-delta", id: k, delta: B }));
                },
                onCompress: (N) => {
                  if (D || e != null && e.aborted) return;
                  const B = Number(N == null ? void 0 : N.dropped_turns) || 0;
                  B && I({ progress: o("k_a92a7217", [B]) });
                },
                signal: e
              });
            } catch (N) {
              if (e != null && e.aborted || u === "operations" || !R || !m || !Dn(N)) throw N;
              if (x = !0, I({ progress: o("k_d3f86976") }), await ((_ = m.ensureLoaded) == null ? void 0 : _.call(m, this.options.jobId)), e != null && e.aborted) throw new Error("aborted");
              T = m, l = await T.answer({
                question: c,
                assistantMode: u,
                scope: p,
                context: d,
                signal: e
              });
            }
            if (e != null && e.aborted) {
              I({ progress: "", status: "cancelled", statusText: o("k_a5ffdc95") }), b({ type: "abort", reason: "cancelled" });
              return;
            }
            const F = l == null ? void 0 : l.confirmationMode;
            (F === "explicit" || F === "green_light") && ((S = (g = this.options).onConfirmationMode) == null || S.call(g, F));
            const V = `${(l == null ? void 0 : l.conversationId) || ""}`.trim() || void 0, q = /* @__PURE__ */ new Set();
            for (const N of (l == null ? void 0 : l.operationRefs) || []) {
              const B = typeof N == "string" ? N : `${(N == null ? void 0 : N.operation_id) || ""}`;
              B.trim() && q.add(B.trim());
            }
            for (const N of (l == null ? void 0 : l.confirmationRequests) || []) {
              const B = `${(N == null ? void 0 : N.operation_id) || ""}`.trim();
              B && q.add(B);
            }
            for (const N of q)
              (C = (h = this.options).onAgentOperationSignal) == null || C.call(h, {
                operationId: N,
                conversationId: V,
                confirmationMode: F || void 0
              });
            const j = Kt(l == null ? void 0 : l.citations);
            let Y = Ht(
              `${(l == null ? void 0 : l.answer) || D || ""}`.trim() || o("k_e1a73897"),
              j
            );
            if (x && (Y += o("k_dc882b3a")), (l == null ? void 0 : l.persisted) === !1 && (Y += o("k_affaf14a")), !D)
              b({ type: "text-delta", id: k, delta: Y });
            else if (Y.startsWith(D)) {
              const N = Y.slice(D.length);
              N && b({ type: "text-delta", id: k, delta: N });
            }
            b({ type: "text-end", id: k }), I({
              citations: j,
              persisted: (l == null ? void 0 : l.persisted) !== !1,
              progress: "",
              status: "complete",
              incompleteReason: `${(l == null ? void 0 : l.incompleteReason) || ""}`.trim()
            }), b({ type: "finish-step" }), b({ type: "finish", finishReason: "stop", messageMetadata: y });
          } catch (T) {
            if (e != null && e.aborted)
              I({ progress: "", status: "cancelled", statusText: o("k_a5ffdc95") }), b({ type: "abort", reason: "cancelled" });
            else {
              const x = T instanceof Error && T.message ? T.message : o("k_dbb9ca66");
              I({ progress: "", status: "error", statusText: x }), b({ type: "error", errorText: x });
            }
          } finally {
            if (!f) {
              f = !0;
              try {
                v.close();
              } catch {
              }
            }
          }
        })();
      }
    });
  }
  async reconnectToStream() {
    return null;
  }
}
function qn(t) {
  return ct(t);
}
function dt(t) {
  return t.map((e) => {
    var n, s;
    return {
      id: e.id,
      role: e.role,
      metadata: e.role === "assistant" ? {
        citations: e.citations || [],
        progress: e.progress || "",
        status: ((n = e.status) == null ? void 0 : n.type) === "running" ? "running" : ((s = e.status) == null ? void 0 : s.type) === "incomplete" ? e.status.reason === "cancelled" ? "cancelled" : "error" : "complete"
      } : void 0,
      parts: [{ type: "text", text: e.content || "" }]
    };
  });
}
function Bn(t) {
  const e = t.metadata || {}, n = e.status === "running", s = e.status === "cancelled" || e.status === "error", a = qn(t), r = a.trim() || (s ? `${e.statusText || ""}`.trim() : "");
  return {
    id: t.id,
    role: t.role,
    content: t.role === "assistant" ? r : a,
    ...t.role === "assistant" ? {
      citations: e.citations || [],
      progress: e.progress || "",
      // 「答完了但没做完」和「中断/出错」是两回事:正文是完整的一段话,只是背后的
      // 工作被轮次预算截断了。所以它走 incomplete + 具体原因,而不是 error。
      status: n ? { type: "running" } : s ? {
        type: "incomplete",
        reason: e.status === "cancelled" ? "cancelled" : "error"
      } : `${e.incompleteReason || ""}`.trim() ? {
        type: "incomplete",
        reason: `${e.incompleteReason}`.trim()
      } : { type: "complete", reason: "stop" }
    } : {}
  };
}
function Fn(t) {
  const e = L(t.remoteAnswerer), n = L(t.localAnswerer), s = L(t.onAgentOperationSignal), a = L(t.onConfirmationMode), r = L(t.onStopped);
  r.current = t.onStopped;
  const c = L(t.assistantMode);
  e.current = t.remoteAnswerer, n.current = t.localAnswerer, s.current = t.onAgentOperationSignal, a.current = t.onConfirmationMode, c.current = t.assistantMode;
  const u = J(() => new Vt({
    id: `reader-${t.jobId || "idle"}`,
    transport: new zn({
      jobId: t.jobId,
      getRemoteAnswerer: () => e.current,
      getLocalAnswerer: () => n.current,
      getAssistantMode: () => c.current,
      onAgentOperationSignal: (p) => {
        var d;
        return (d = s.current) == null ? void 0 : d.call(s, p);
      },
      onConfirmationMode: (p) => {
        var d;
        return (d = a.current) == null ? void 0 : d.call(a, p);
      }
    })
  }), [t.jobId]);
  return H(() => {
    t.enabled || u.stop().finally(() => {
      var p;
      return (p = r.current) == null ? void 0 : p.call(r);
    });
  }, [u, t.enabled]), H(() => () => {
    u.stop().finally(() => {
      var p;
      return (p = r.current) == null ? void 0 : p.call(r);
    });
  }, [u]), Yt({ chat: u, experimental_throttle: 16 });
}
function Ln(t) {
  for (let e = t.length - 1; e >= 0; e -= 1)
    if (t[e].role === "assistant") return t[e];
}
function $e(t, e) {
  return {
    version: 1,
    headId: e,
    items: t.map((n) => {
      var s;
      return {
        parentId: n.parentId,
        message: {
          id: n.message.id,
          role: n.message.role,
          content: n.message.content,
          ...n.message.progress ? { progress: n.message.progress } : {},
          ...(s = n.message.citations) != null && s.length ? { citations: n.message.citations } : {},
          ...n.message.status ? {
            status: {
              type: n.message.status.type,
              ...n.message.status.reason ? { reason: `${n.message.status.reason}` } : {}
            }
          } : {}
        }
      };
    })
  };
}
function lt(t) {
  return {
    items: t.items.map((e) => ({
      parentId: e.parentId,
      message: {
        ...e.message,
        citations: e.message.citations || [],
        status: e.message.status
      }
    })),
    headId: t.headId
  };
}
function de(t, e) {
  if (!t.length) return [];
  const n = new Map(t.map((u) => [u.message.id, u])), s = e && n.get(e) || t.at(-1);
  if (!s) return [];
  const a = [];
  let r = s;
  const c = /* @__PURE__ */ new Set();
  for (; r && !c.has(r.message.id); )
    c.add(r.message.id), a.push(r.message), r = r.parentId ? n.get(r.parentId) : void 0;
  return a.reverse();
}
function jn(t, e) {
  var n;
  return e ? ((n = t.find((s) => s.message.id === e)) == null ? void 0 : n.message) ?? null : null;
}
function Kn(t, e) {
  const n = new Map(t.map((c) => [c.message.id, c]));
  let s = n.get(e);
  if (!s) return [];
  const a = [], r = /* @__PURE__ */ new Set();
  for (; s && !r.has(s.message.id); )
    r.add(s.message.id), a.push(s), s = s.parentId ? n.get(s.parentId) : void 0;
  return a.reverse();
}
function Wn(t, e, n) {
  var w, k, R, m;
  const s = `${e || ""}`.trim();
  if (!s || !t.length) return [];
  let a = s;
  t.some((f) => f.message.id === a) || (n && t.some((f) => f.message.id === n) ? a = n : a = ((w = [...t].reverse().find((f) => f.message.role === "assistant")) == null ? void 0 : w.message.id) || "");
  let r = Kn(t, a);
  if (r.length >= 2 && ((k = r.at(-1)) == null ? void 0 : k.message.role) === "assistant") return r;
  r.length === 1 && ((R = r[0]) == null ? void 0 : R.message.role) === "user" && (r = []);
  const c = de(t, n || a);
  let u = c.findIndex((f) => f.id === a);
  if (u < 0 && (u = c.length - 1), u < 0) return r;
  const p = new Map(t.map((f) => [f.message.id, f])), d = c.slice(0, u + 1).map((f) => p.get(f.id)).filter((f) => !!f);
  for (; d.length && ((m = d.at(-1)) == null ? void 0 : m.message.role) !== "assistant"; ) d.pop();
  return d.length ? d : r;
}
function Te(t) {
  return t.map((e) => ({
    parentId: e.parentId,
    message: {
      ...e.message,
      citations: e.message.citations || [],
      status: e.message.status
    }
  }));
}
const Un = {
  stopStream: () => Promise.resolve(),
  clearMessages: () => {
  },
  showMessages: () => {
  }
};
function Hn(t) {
  var n;
  const e = {};
  for (const s of t) {
    const a = s.message;
    a.role === "assistant" && ((n = a.citations) != null && n.length) && (e[a.id] = a.citations);
  }
  return e;
}
function Gn(t) {
  const e = {};
  for (const n of t) {
    const s = n.message;
    s.role === "assistant" && s.progress && (e[s.id] = s.progress);
  }
  return e;
}
function Vn(t) {
  const e = {};
  for (const n of t) {
    const s = n.message;
    s.content && (e[s.id] = s.content);
  }
  return e;
}
function Yn(t, e, n) {
  var a;
  const s = e || ((a = n == null ? void 0 : n.getConversationId) == null ? void 0 : a.call(n)) || "";
  return (t || []).map((r) => ({
    ...Jt(r, { active: s }),
    active: r.conversation_id === s
  }));
}
function Qn(t) {
  const { setItems: e, setHeadId: n } = t;
  return {
    readItems: () => t.itemsRef.current,
    readHeadId: () => t.headIdRef.current,
    appendExchange: ({ parentId: s, userId: a, assistantId: r, question: c, progress: u }) => {
      e((p) => [
        ...p,
        { parentId: s, message: { id: a, role: "user", content: c } },
        {
          parentId: a,
          message: {
            id: r,
            role: "assistant",
            content: "",
            progress: u,
            status: { type: "running" },
            citations: []
          }
        }
      ]), n(r);
    },
    appendRetryTurn: ({ assistantId: s, branchParent: a }) => {
      e((r) => [
        ...r,
        {
          parentId: a,
          message: {
            id: s,
            role: "assistant",
            content: "",
            progress: o("k_f7adee6c"),
            status: { type: "running" },
            citations: []
          }
        }
      ]), n(s);
    },
    markRunningCancelled: () => {
      e(
        (s) => s.map(
          (a) => {
            var r;
            return ((r = a.message.status) == null ? void 0 : r.type) === "running" ? {
              ...a,
              message: {
                ...a.message,
                status: { type: "incomplete", reason: "cancelled" },
                progress: "",
                content: a.message.content.trim() || o("k_a5ffdc95")
              }
            } : a;
          }
        )
      );
    },
    markRunningAsError: (s) => {
      const a = `${s || ""}`.trim() || o("k_dbb9ca66");
      e((r) => r.map((c) => {
        var u;
        return ((u = c.message.status) == null ? void 0 : u.type) === "running" ? {
          ...c,
          message: {
            ...c.message,
            content: c.message.content.trim() || a,
            progress: "",
            citations: [],
            status: { type: "incomplete", reason: "error" }
          }
        } : c;
      }));
    },
    mergeChatMirror: (s) => {
      s.size && e((a) => a.map((r) => {
        const c = s.get(r.message.id);
        return c ? { ...r, message: { ...r.message, ...c } } : r;
      }));
    }
  };
}
function Jn(t) {
  const {
    jobId: e,
    documentId: n,
    enabled: s,
    refreshSessions: a,
    applyConversationTree: r,
    remoteRef: c,
    streamRef: u,
    itemsRef: p,
    documentIdRef: d,
    lastJobRef: w,
    persistReadyRef: k,
    switchTokenRef: R,
    sessionListGenerationRef: m,
    activeConversationIdRef: f,
    setItems: P,
    setHeadId: O,
    setSessions: M,
    setActiveConversationId: z,
    setSessionBusy: $
  } = t;
  H(() => {
    const v = c.current;
    if (!e) {
      m.current += 1, R.current += 1, P([]), O(null), M([]), z(""), u.current.clearMessages(), f.current = "", w.current = "", d.current = "", k.current = !1;
      return;
    }
    const D = w.current !== e;
    if (D && (m.current += 1, R.current += 1, w.current = e, k.current = !1, P([]), O(null), u.current.clearMessages(), M([]), z(""), f.current = "", d.current = "", $(!1)), !s || !v) {
      m.current += 1;
      return;
    }
    let y = !1;
    return (async () => {
      var S, h, C, T;
      let b = `${n || d.current || ""}`.trim();
      if (!b) {
        try {
          b = `${await ((S = v.getDocumentId) == null ? void 0 : S.call(v)) || ""}`.trim();
        } catch {
          b = "";
        }
        if (y) return;
      }
      b && (d.current = b);
      let I = null;
      if (!y && b && (I = await a(b)), !(D || !p.current.length) || y) {
        y || (k.current = !0);
        return;
      }
      const _ = Xt({ jobId: e, documentId: b }) || `${((h = v.getConversationId) == null ? void 0 : h.call(v)) || ""}`.trim();
      if (_) {
        z(_), f.current = _, (C = v.setConversationId) == null || C.call(v, _, b);
        try {
          const x = await Be(_);
          if (y) return;
          const l = we(x.messages || []);
          if (l.length) {
            r(l, x.head_id), requestAnimationFrame(() => {
              y || (k.current = !0);
            });
            return;
          }
        } catch {
        }
      }
      if (!y && b)
        try {
          const x = I ?? await a(b);
          if (y || !x) return;
          const l = x[0];
          if (l != null && l.conversation_id) {
            const F = l.conversation_id;
            z(F), f.current = F, (T = v.setConversationId) == null || T.call(v, F, b);
            try {
              const V = await Be(F);
              if (y) return;
              r(
                we(V.messages || []),
                V.head_id
              ), requestAnimationFrame(() => {
                y || (k.current = !0);
              });
              return;
            } catch {
            }
          }
        } catch {
        }
      if (y) return;
      const g = tt({ jobId: e, documentId: b }, _);
      if (g != null && g.items.length) {
        const x = lt(g);
        P(x.items), O(x.headId), u.current.showMessages(de(x.items, x.headId));
      } else
        P([]), O(null), u.current.clearMessages();
      requestAnimationFrame(() => {
        y || (k.current = !0);
      });
    })(), () => {
      y = !0, m.current += 1;
    };
  }, [e, n, s, a, r]);
}
function Xn(t) {
  const {
    jobId: e,
    documentId: n,
    items: s,
    headId: a,
    activeConversationId: r,
    documentIdRef: c,
    persistReadyRef: u
  } = t;
  H(() => {
    if (!e || !u.current) return;
    const p = r, d = { jobId: e, documentId: n || c.current }, w = window.setTimeout(() => {
      if (!s.length) {
        ge(d, p);
        return;
      }
      xe(d, $e(s, a), p);
    }, 280);
    return () => window.clearTimeout(w);
  }, [e, n, s, a, r]);
}
function Zn(t) {
  const {
    jobId: e,
    documentId: n,
    sessionBusy: s,
    sessions: a,
    streamRef: r,
    remoteRef: c,
    itemsRef: u,
    headIdRef: p,
    activeConversationIdRef: d,
    documentIdRef: w,
    switchTokenRef: k,
    persistReadyRef: R,
    setSessionBusy: m,
    setSessionError: f,
    setActiveConversationId: P,
    setItems: O,
    setHeadId: M,
    setSessions: z,
    refreshSessions: $,
    applyConversationTree: v
  } = t, D = G(() => {
    var g, S;
    const _ = `${((S = (g = c.current) == null ? void 0 : g.getConversationId) == null ? void 0 : S.call(g)) || ""}`.trim();
    _ && P(_);
  }, []), y = G(async () => {
    var g, S;
    if (s) return;
    await r.current.stopStream(), fe(900), ce(900), m(!0), f("");
    const _ = ++k.current;
    try {
      if (await new Promise((T) => {
        window.setTimeout(T, 40);
      }), _ !== k.current) return;
      const h = c.current, C = w.current || `${await ((g = h == null ? void 0 : h.getDocumentId) == null ? void 0 : g.call(h)) || ""}`.trim();
      if (_ !== k.current) return;
      w.current = C, (S = h == null ? void 0 : h.clearConversationId) == null || S.call(h, C), P(""), d.current = "", O([]), M(null), r.current.clearMessages(), ge({ jobId: e, documentId: C }), C && await $(C, _);
    } catch (h) {
      console.warn("[reader-ai] new session failed", h), f(o("k_54817755"));
    } finally {
      _ === k.current && m(!1);
    }
  }, [e, $, s]), b = G(async (_) => {
    var T, x, l, F, V;
    const g = `${_ || ""}`.trim();
    if (!g)
      return f(o("k_91a359b9")), !1;
    if (s)
      return f(o("k_ee7e0de3")), !1;
    await r.current.stopStream();
    const S = Wn(u.current, g, p.current);
    if (!S.length)
      return f(o("k_0642d685")), !1;
    if (S[S.length - 1].message.role !== "assistant")
      return f(o("k_7022e061")), !1;
    m(!0), f("");
    const C = ++k.current;
    try {
      if (await new Promise((K) => {
        window.setTimeout(K, 40);
      }), C !== k.current) return !1;
      const q = c.current;
      let j = w.current || `${await ((T = q == null ? void 0 : q.getDocumentId) == null ? void 0 : T.call(q)) || ""}`.trim();
      if (C !== k.current) return !1;
      if (w.current = j, !j)
        try {
          if (j = `${await ((x = q == null ? void 0 : q.getDocumentId) == null ? void 0 : x.call(q)) || ""}`.trim(), C !== k.current) return !1;
          w.current = j;
        } catch {
          j = "";
        }
      if (!j)
        return f(o("k_3cb7084f")), !1;
      const Y = S.map((K, oe) => ({
        id: K.message.id,
        role: K.message.role,
        content: K.message.content,
        citations: K.message.citations,
        parentId: oe === 0 ? null : S[oe - 1].message.id
      })), N = d.current || ((l = q == null ? void 0 : q.getConversationId) == null ? void 0 : l.call(q)) || "", B = (a || []).find((K) => K.conversation_id === N), Z = Y.find((K) => K.role === "user"), ne = `${(B == null ? void 0 : B.title) || ""}`.trim() || `${(Z == null ? void 0 : Z.content) || ""}`.replace(/\s+/g, " ").trim() || o("k_8200c3d5"), se = (a || []).map((K) => K.title || ""), ie = Zt(ne, se), ee = await me().forkFromPath({
        documentId: j,
        title: ie,
        path: Y
      });
      if (C !== k.current) return !1;
      const W = Te(ee.items), X = ((F = W[W.length - 1]) == null ? void 0 : F.message.id) || null, Q = ee.conversation.conversation_id;
      if (!Q || !W.length)
        throw new Error("fork returned empty conversation");
      return fe(600), ce(600), O(W), M(X), r.current.showMessages(de(W, X)), P(Q), d.current = Q, (V = q == null ? void 0 : q.setConversationId) == null || V.call(q, Q, j), z((K) => {
        const oe = {
          conversation_id: Q,
          title: ie,
          document_id: j,
          created_at: ee.conversation.created_at || (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: ee.conversation.updated_at || (/* @__PURE__ */ new Date()).toISOString(),
          message_count: W.length,
          head_id: X || ""
        }, le = K.filter((pe) => pe.conversation_id !== Q);
        return [oe, ...le];
      }), xe(
        { jobId: e, documentId: j },
        $e(W, X),
        Q
      ), await $(j, C), !0;
    } catch (q) {
      return console.warn("[reader-ai] branch from answer failed", q), C === k.current && f(o("k_1690169d")), !1;
    } finally {
      C === k.current && m(!1);
    }
  }, [e, $, s, a]), I = G(async (_) => {
    var h, C, T, x;
    const g = `${_ || ""}`.trim();
    if (!g || s) return;
    await r.current.stopStream(), m(!0), f("");
    const S = ++k.current;
    try {
      const l = c.current, F = w.current || `${await ((h = l == null ? void 0 : l.getDocumentId) == null ? void 0 : h.call(l)) || ""}`.trim();
      if (S !== k.current) return;
      w.current = F;
      try {
        await me().delete(g);
      } catch (j) {
        if ((Number(j == null ? void 0 : j.status) || 0) !== 404) throw j;
      }
      ge({ jobId: e, documentId: F }, g);
      const q = (d.current || ((C = l == null ? void 0 : l.getConversationId) == null ? void 0 : C.call(l)) || "") === g;
      if (z((j) => j.filter((Y) => Y.conversation_id !== g)), q) {
        (T = l == null ? void 0 : l.clearConversationId) == null || T.call(l, F), P(""), d.current = "", O([]), M(null), r.current.clearMessages(), ge({ jobId: e, documentId: F });
        const j = F ? await $(F, S) : [];
        if (S !== k.current || !j) return;
        const Y = j[0];
        if (Y != null && Y.conversation_id) {
          const N = Y.conversation_id;
          P(N), d.current = N;
          try {
            const B = await me().get(N);
            if (S !== k.current) return;
            v(
              we(B.messages || []),
              B.head_id
            ), (x = l == null ? void 0 : l.setConversationId) == null || x.call(l, N, F);
          } catch {
            O([]), M(null);
          }
        }
      } else F && await $(F, S);
    } catch (l) {
      console.warn("[reader-ai] delete session failed", l), f(o("k_f60f2148"));
    } finally {
      S === k.current && m(!1);
    }
  }, [v, e, $, s]), A = G(async (_, g) => {
    const S = `${_ || ""}`.trim(), h = `${g || ""}`.replace(/\s+/g, " ").trim();
    if (!S || !h || s) return;
    m(!0), f("");
    const C = ++k.current;
    try {
      const T = h.slice(0, 80);
      if (await me().patch(S, { title: T }), C !== k.current) return;
      z(
        (l) => l.map(
          (F) => F.conversation_id === S ? { ...F, title: T } : F
        )
      );
      const x = w.current;
      x && await $(x, C);
    } catch (T) {
      console.warn("[reader-ai] rename session failed", T), f(o("k_e48280fa"));
    } finally {
      C === k.current && m(!1);
    }
  }, [$, s]);
  return {
    adoptRemoteConversationId: D,
    newSession: y,
    branchFromAnswer: b,
    removeSession: I,
    renameSession: A
  };
}
function er(t) {
  var ie;
  const {
    jobId: e,
    documentId: n = "",
    enabled: s,
    remoteAnswerer: a = null,
    stream: r = Un
  } = t, [c, u] = U([]), [p, d] = U(null), [w, k] = U([]), [R, m] = U(""), [f, P] = U(!1), [O, M] = U(""), z = L(c), $ = L(p), v = L(R), D = L(!1), y = L(""), b = L(""), I = L(0), A = L(0), _ = L(r);
  _.current = r;
  const g = L(a);
  g.current = a, z.current = c, $.current = p, v.current = R;
  const S = G(async (ee = "", W) => {
    const X = `${ee || b.current || ""}`.trim(), Q = ++A.current;
    if (!X)
      return Q === A.current && (W === void 0 || W === I.current) && k([]), [];
    try {
      const K = me();
      if (!K) return null;
      const le = (await K.list({ document_id: X, limit: 50 })).conversations || [];
      return Q === A.current && X === `${b.current || ""}`.trim() && (W === void 0 || W === I.current) ? (k(le), le) : null;
    } catch {
      return null;
    }
  }, []), h = G((ee, W) => {
    var K;
    const X = Te(ee), Q = `${W || ""}`.trim() || ((K = X[X.length - 1]) == null ? void 0 : K.message.id) || null;
    u(X), d(Q), _.current.showMessages(de(X, Q));
  }, []), C = G(() => `${n || b.current || e}`.trim(), [n, e]);
  Jn({
    jobId: e,
    documentId: n,
    enabled: s,
    refreshSessions: S,
    applyConversationTree: h,
    remoteRef: g,
    streamRef: _,
    itemsRef: z,
    documentIdRef: b,
    lastJobRef: y,
    persistReadyRef: D,
    switchTokenRef: I,
    sessionListGenerationRef: A,
    activeConversationIdRef: v,
    setItems: u,
    setHeadId: d,
    setSessions: k,
    setActiveConversationId: m,
    setSessionBusy: P
  }), Xn({
    jobId: e,
    documentId: n,
    items: c,
    headId: p,
    activeConversationId: R,
    documentIdRef: b,
    persistReadyRef: D
  });
  const T = J(
    () => de(c, p),
    [c, p]
  ), x = J(
    () => Hn(c),
    [c]
  ), l = J(
    () => Gn(c),
    [c]
  ), F = J(
    () => Vn(c),
    [c]
  ), V = J(() => Qn({ setItems: u, setHeadId: d, itemsRef: z, headIdRef: $ }), []), {
    adoptRemoteConversationId: q,
    newSession: j,
    branchFromAnswer: Y,
    removeSession: N,
    renameSession: B
  } = Zn({
    jobId: e,
    documentId: n,
    sessionBusy: f,
    sessions: w,
    streamRef: _,
    remoteRef: g,
    itemsRef: z,
    headIdRef: $,
    activeConversationIdRef: v,
    documentIdRef: b,
    switchTokenRef: I,
    persistReadyRef: D,
    setSessionBusy: P,
    setSessionError: M,
    setActiveConversationId: m,
    setItems: u,
    setHeadId: d,
    setSessions: k,
    refreshSessions: S,
    applyConversationTree: h
  }), Z = G(async (ee) => {
    var K, oe, le, pe, Ee, Pe, Oe, De;
    const W = `${ee || ""}`.trim(), X = v.current || ((oe = (K = g.current) == null ? void 0 : K.getConversationId) == null ? void 0 : oe.call(K)) || "";
    if (!W || W === X || f) return;
    await _.current.stopStream(), fe(1200), ce(1200), P(!0), M("");
    const Q = ++I.current;
    D.current = !1, m(W), v.current = W, u([]), d(null), _.current.clearMessages();
    try {
      if (await new Promise((ye) => {
        window.setTimeout(ye, 80);
      }), Q !== I.current) return;
      try {
        (Ee = (pe = (le = globalThis.document) == null ? void 0 : le.activeElement) == null ? void 0 : pe.blur) == null || Ee.call(pe);
      } catch {
      }
      const te = g.current, re = b.current || `${await ((Pe = te == null ? void 0 : te.getDocumentId) == null ? void 0 : Pe.call(te)) || ""}`.trim();
      if (Q !== I.current) return;
      b.current = re;
      const ue = me();
      if (!ue) throw new Error("Reader conversations unavailable");
      const Ce = await ue.get(W);
      if (Q !== I.current) return;
      fe(800), ce(800);
      const Ne = we(Ce.messages || []);
      if (h(Ne, Ce.head_id), (Oe = te == null ? void 0 : te.setConversationId) == null || Oe.call(te, W, re), D.current = !0, Ne.length) {
        const ye = Te(Ne);
        xe(
          { jobId: e, documentId: re },
          $e(
            ye,
            `${Ce.head_id || ""}`.trim() || ((De = ye.at(-1)) == null ? void 0 : De.message.id) || null
          ),
          W
        );
      } else
        ge({ jobId: e, documentId: re }, W);
      re && await S(re, Q), fe(350), ce(350);
    } catch (te) {
      if (console.warn("[reader-ai] switch session failed", te), Q === I.current) {
        M(o("k_cc738df5"));
        const re = tt(
          { jobId: e, documentId: n || b.current },
          W
        );
        if (re != null && re.items.length) {
          const ue = lt(re);
          u(ue.items), d(ue.headId), _.current.showMessages(de(ue.items, ue.headId));
        } else
          u([]), d(null);
        D.current = !0;
      }
    } finally {
      Q === I.current && P(!1);
    }
  }, [
    h,
    e,
    n,
    S,
    f
  ]), ne = J(
    () => Yn(w, R, a),
    [w, R, a]
  ), se = J(() => ({
    refreshSessions: S,
    adoptRemoteConversationId: q,
    newSession: j,
    switchSession: Z,
    removeSession: N,
    renameSession: B,
    branchFromAnswer: Y
  }), [
    S,
    q,
    j,
    Z,
    N,
    B,
    Y
  ]);
  return {
    items: c,
    headId: p,
    messages: T,
    citationsByMessageId: x,
    progressByMessageId: l,
    contentByMessageId: F,
    sessions: ne,
    activeConversationId: R || ((ie = a == null ? void 0 : a.getConversationId) == null ? void 0 : ie.call(a)) || "",
    sessionBusy: f,
    sessionError: O,
    resolveRequestScopeKey: C,
    tree: V,
    sessionCommands: se
  };
}
const tr = "retainpdf.reader.ai.request.v1:", nr = Object.freeze({
  assistantMode: "reading",
  scope: "document",
  context: null
});
function ut(t, e) {
  return `${tr}${`${t || ""}`.trim()}:${`${e || ""}`.trim()}`;
}
function rr(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return null;
  const e = t, n = e.assistantMode === "operations" ? "operations" : e.assistantMode === "reading" ? "reading" : null, s = e.scope === "selection" || e.scope === "page" || e.scope === "document" ? e.scope : null;
  if (!n || !s) return null;
  const a = e.context && typeof e.context == "object" && !Array.isArray(e.context) ? { ...e.context } : null;
  return { assistantMode: n, scope: s, context: a };
}
function Ke(t, e, n) {
  var r;
  const s = `${t || ""}`.trim(), a = `${e || ""}`.trim();
  if (!(!s || !a))
    try {
      (r = globalThis.localStorage) == null || r.setItem(
        ut(s, a),
        JSON.stringify(n)
      );
    } catch {
    }
}
function We(t, e) {
  var a;
  const n = `${t || ""}`.trim(), s = `${e || ""}`.trim();
  if (!n || !s) return null;
  try {
    const r = (a = globalThis.localStorage) == null ? void 0 : a.getItem(ut(n, s));
    return r ? rr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function sr(t) {
  const e = `${t.scopeKey || ""}`.trim(), n = `${t.jobId || ""}`.trim(), s = `${t.assistantMessageId || ""}`.trim();
  return We(e, s) || (e !== n ? We(n, s) : null) || nr;
}
function ar(t) {
  const { assistantMode: e, selectionContext: n } = t;
  return e === "operations" ? { assistantMode: e, scope: "document", context: null } : n ? { assistantMode: e, scope: "selection", context: { ...n } } : { assistantMode: e, scope: "document", context: null };
}
function ir(t) {
  var D;
  const { jobId: e, assistantMode: n, selectionContext: s = null, tree: a, chat: r, getScopeKey: c } = t, u = L(a);
  u.current = a;
  const p = L(r);
  p.current = r;
  const d = L(n);
  d.current = n;
  const w = L(s);
  w.current = s;
  const k = L(c);
  k.current = c;
  const R = r.status, m = R === "submitted" || R === "streaming", f = L(m);
  f.current = m;
  const P = m ? `${((D = Ln(r.messages)) == null ? void 0 : D.id) || ""}` : "", O = r.messages, M = r.error;
  H(() => {
    if (!O.length) return;
    const y = new Map(O.map((I) => [I.id, I])), b = /* @__PURE__ */ new Map();
    for (const [I, A] of y)
      b.set(I, Bn(A));
    u.current.mergeChatMirror(b);
  }, [O]), H(() => {
    !M || R !== "error" || u.current.markRunningAsError(M.message);
  }, [M, R]);
  const z = G(async (y) => {
    if (f.current) return;
    const b = `${y || ""}`.trim();
    if (!b) return;
    const I = u.current, A = p.current, _ = d.current, g = w.current, S = k.current(), h = I.readHeadId(), C = Se("u"), T = Se("a"), x = ar({
      assistantMode: _,
      selectionContext: (g == null ? void 0 : g.selectionType) === "text" ? {
        page: g.page,
        page_idx: Math.max(0, g.page - 1),
        pane: g.pane,
        kind: "text",
        block_id: "",
        quoteText: g.quote
      } : g ? {
        page: g.page,
        page_idx: Math.max(0, g.page - 1),
        pane: g.pane,
        kind: g.kind,
        block_id: g.selectionType === "region" ? g.region.itemId : "",
        quoteText: et(g.region, g.pane)
      } : null
    });
    Ke(S, T, x), I.appendExchange({
      parentId: h,
      userId: C,
      assistantId: T,
      question: b,
      progress: x.assistantMode === "operations" ? o("k_1f3fe5d6") : o("k_5a60e8d7")
    }), await A.sendUserMessage(
      { id: C, role: "user", parts: [{ type: "text", text: b }] },
      {
        body: {
          assistantMessageId: T,
          assistantMode: x.assistantMode,
          parentId: h,
          question: b,
          regenerate: !1,
          userMessageId: C,
          scope: x.scope,
          context: x.context
        }
      }
    );
  }, []), $ = G(async (y) => {
    if (f.current) return;
    const b = u.current, I = p.current, A = b.readItems(), _ = A.find(
      (V) => V.message.id === y && V.message.role === "assistant"
    ), g = (_ == null ? void 0 : _.parentId) ?? null, S = g ? jn(A, g) : null;
    let h = "", C = g;
    if ((S == null ? void 0 : S.role) === "user")
      h = S.content.trim();
    else {
      const V = de(A, g ?? b.readHeadId());
      for (let q = V.length - 1; q >= 0; q -= 1)
        if (V[q].role === "user") {
          h = V[q].content.trim(), C = V[q].id;
          break;
        }
    }
    if (!h) return;
    const T = Se("a"), x = C || g, l = k.current(), F = sr({
      scopeKey: l,
      jobId: e,
      assistantMessageId: y
    });
    Ke(l, T, F), b.appendRetryTurn({ assistantId: T, branchParent: x }), I.replaceVisible(dt(de(A, y))), await I.regenerateFrom({
      messageId: y,
      body: {
        assistantMessageId: T,
        assistantMode: F.assistantMode,
        parentId: x,
        question: h,
        regenerate: !0,
        userMessageId: C || "",
        scope: F.scope,
        context: F.context
      }
    });
  }, [e]), v = G(async () => {
    await p.current.stopStream(), u.current.markRunningCancelled();
  }, []);
  return {
    isRunning: m,
    streamingAssistantId: P,
    submitQuestion: z,
    retryAnswer: $,
    cancelAnswer: v
  };
}
const or = "retainpdf.reader-agent-operation.action-key.v1:", cr = "reader-";
function Ue(t, e) {
  return nn(t, e);
}
function dr(t) {
  return tn(t);
}
function lr(t, e) {
  return en(t, e);
}
function ur(t) {
  return rn(t);
}
function fr(t) {
  return sn(t);
}
function pr({
  conversationId: t,
  enabled: e,
  discovering: n,
  signal: s,
  confirmationModeHint: a,
  onDocumentCommitted: r
}) {
  const [c, u] = U({}), [p, d] = U("explicit"), [w, k] = U(!1), [R, m] = U(!1), f = L(/* @__PURE__ */ new Set()), P = L(/* @__PURE__ */ new Set()), O = L(/* @__PURE__ */ new Set()), M = G((y, b = !1) => {
    y != null && y.operation_id && u((I) => {
      const A = I[y.operation_id];
      return lr(A == null ? void 0 : A.operation, y) ? {
        ...I,
        [y.operation_id]: {
          ...A,
          operation: y,
          pendingAction: void 0,
          error: void 0
        }
      } : !b || !(A != null && A.pendingAction) ? I : {
        ...I,
        [y.operation_id]: { ...A, pendingAction: void 0 }
      };
    });
  }, []), z = G(async (y, b = !1) => {
    const I = `${y || ""}`.trim(), A = `refresh:${I}`;
    if (!(!I || f.current.has(A))) {
      f.current.add(A);
      try {
        const _ = he();
        if (!_) return;
        M(await _.get(I), b);
      } catch {
      } finally {
        f.current.delete(A);
      }
    }
  }, [M]), $ = G(async () => {
    const y = `${t || ""}`.trim(), b = `recover:${y}`;
    if (!(!e || !y || f.current.has(b))) {
      f.current.add(b);
      try {
        const I = he();
        if (!I) return;
        const A = await I.list(y, {});
        if (!O.current.has(y)) {
          for (const _ of A.operations || [])
            _.status === "committed" && P.current.add(_.operation_id);
          O.current.add(y);
        }
        for (const _ of A.operations || []) M(_);
      } catch {
      } finally {
        f.current.delete(b);
      }
    }
  }, [t, e, M]);
  H(() => {
    if (!e) return;
    let y = !1;
    const b = async () => {
      try {
        const A = he();
        if (!A) return;
        const _ = await A.fetchRuntimeConfig();
        if (y) return;
        d(_.agent_confirmation_mode || "explicit"), m(!!_.llm_api_key_configured), k(
          _.restart_required || _.restart_state === "pending" || _.active_revision !== _.configured_revision
        );
      } catch {
        y || (k(!1), m(!1));
      }
    };
    b();
    const I = window.setInterval(b, 3e3);
    return () => {
      y = !0, window.clearInterval(I);
    };
  }, [e]), H(() => {
    a && d(a);
  }, [a]), H(() => {
    s != null && s.confirmationMode && d(s.confirmationMode), s != null && s.operationId && z(s.operationId);
  }, [z, s]), H(() => {
    $();
  }, [$]), H(() => {
    n || $();
  }, [n, $]);
  const v = J(
    () => Object.values(c).filter((y) => !!t && y.operation.conversation_id === t).sort((y, b) => `${y.operation.created_at || ""}`.localeCompare(`${b.operation.created_at || ""}`)),
    [t, c]
  );
  H(() => {
    var y;
    for (const b of v) {
      const I = b.operation;
      I.status !== "committed" || P.current.has(I.operation_id) || (P.current.add(I.operation_id), r == null || r({
        documentId: I.document_id,
        revision: ((y = I.candidate) == null ? void 0 : y.version_id) || `${I.updated_at || ""}` || `${I.operation_id}:${dr(I)}`
      }));
    }
  }, [v, r]);
  const D = v.some((y) => Ue(y.operation.status, p));
  return H(() => {
    if (!e || !t || !n && !D) return;
    const y = window.setInterval(() => {
      $();
      for (const b of v)
        Ue(b.operation.status, p) && z(b.operation.operation_id);
    }, 1400);
    return () => window.clearInterval(y);
  }, [p, t, n, e, v, D, $, z]), H(() => {
    if (!e) return;
    const y = () => void $(), b = () => {
      document.visibilityState === "visible" && y();
    };
    return window.addEventListener("online", y), document.addEventListener("visibilitychange", b), () => {
      window.removeEventListener("online", y), document.removeEventListener("visibilitychange", b);
    };
  }, [e, $]), {
    entries: v,
    confirmationMode: p,
    runtimeRestarting: w,
    runtimeCredentialConfigured: R,
    setEntriesById: u,
    inFlightRef: f,
    upsert: M,
    refresh: z
  };
}
function mr() {
  try {
    return globalThis.sessionStorage;
  } catch {
    return;
  }
}
function ft() {
  return {
    storagePrefix: or,
    keyPrefix: cr,
    storage: mr()
  };
}
function hr(t, e, n) {
  return an(t, e, n, ft());
}
function He(t, e, n) {
  on(t, e, n, ft());
}
function gr({
  refresh: t,
  upsert: e,
  setEntriesById: n,
  inFlightRef: s
}) {
  const a = L(/* @__PURE__ */ new Map());
  return { perform: G(async (c, u, p = {}) => {
    const d = `${u.operation_id || ""}`.trim(), w = `action:${d}`;
    if (!d || s.current.has(w)) return;
    if (c === "retry" && u.status === "ambiguous" && p.acceptDuplicateRisk !== !0) {
      n((m) => ({
        ...m,
        [d]: {
          ...m[d],
          error: o("k_c5c0c047")
        }
      }));
      return;
    }
    const k = hr(d, c, a.current);
    s.current.add(w), n((m) => ({
      ...m,
      [d]: { ...m[d], pendingAction: c, error: void 0 }
    }));
    const R = {
      idempotency_key: k,
      expected_status: u.status,
      expected_attempt: u.current_attempt,
      expected_program_sha256: u.program_sha256 || ""
    };
    try {
      const m = he();
      if (!m) throw new Error("Reader AI operations unavailable");
      let f;
      c === "run" ? f = await m.run(d, R) : c === "cancel" ? f = await m.cancel(d, { ...R, reason: "user_rejected" }) : c === "commit" ? f = await m.commit(d, R) : f = await m.retry(d, p.acceptDuplicateRisk ? { ...R, accept_duplicate_risk: !0 } : R), He(d, c, a.current), e(f, !0);
    } catch (m) {
      ur(m) === 409 ? (He(d, c, a.current), await t(d, !0)) : n((f) => ({
        ...f,
        [d]: {
          ...f[d],
          pendingAction: void 0,
          error: fr(m)
        }
      }));
    } finally {
      s.current.delete(w);
    }
  }, [t, e]) };
}
function br({
  conversationId: t,
  enabled: e,
  discovering: n,
  signal: s,
  confirmationModeHint: a,
  onDocumentCommitted: r
}) {
  const c = pr({
    conversationId: t,
    enabled: e,
    discovering: n,
    signal: s,
    confirmationModeHint: a,
    onDocumentCommitted: r
  }), { perform: u } = gr({
    refresh: c.refresh,
    upsert: c.upsert,
    setEntriesById: c.setEntriesById,
    inFlightRef: c.inFlightRef
  }), p = G((d) => {
    var w;
    return ((w = he()) == null ? void 0 : w.fetchCandidate(d.operation_id)) ?? Promise.reject(new Error("Reader AI operations unavailable"));
  }, []);
  return {
    entries: c.entries,
    confirmationMode: c.confirmationMode,
    runtimeRestarting: c.runtimeRestarting,
    runtimeCredentialConfigured: c.runtimeCredentialConfigured,
    perform: u,
    loadCandidate: p
  };
}
function yr(t) {
  var A;
  const {
    jobId: e,
    documentId: n = "",
    sessionIdentity: s = "",
    enabled: a,
    selectionContext: r = null,
    onDocumentCommitted: c
  } = t, u = `${e}\0${n}\0${s}`, [p, d] = U("reading"), [w, k] = U(null), [R, m] = U();
  H(() => {
    d("reading"), k(null), m(void 0);
  }, [u]);
  const f = J(() => {
    var _;
    return !a || !e ? null : ((_ = ze()) == null ? void 0 : _.createRemoteAnswerer({ jobId: e, documentId: n })) ?? Et({ jobId: e, documentId: n });
  }, [n, a, e]), P = J(() => {
    var _;
    return !a || !e ? null : ((_ = ze()) == null ? void 0 : _.createLocalAnswerer({ jobId: e })) ?? Gt({
      loadMarkdownPayload: Pt.loadMarkdownPayload
    });
  }, [a, e]), O = L(null), M = Fn({
    jobId: e,
    enabled: a,
    remoteAnswerer: f,
    localAnswerer: P,
    assistantMode: p,
    onAgentOperationSignal: (_) => {
      k({ ..._, nonce: Date.now() + Math.random() });
    },
    onConfirmationMode: m,
    onStopped: () => {
      var _;
      return (_ = O.current) == null ? void 0 : _.markRunningCancelled();
    }
  }), z = J(() => ({
    messages: M.messages,
    status: M.status,
    error: M.error,
    sendUserMessage: (_, g) => M.sendMessage(
      _,
      g
    ),
    regenerateFrom: (_) => M.regenerate(
      _
    ),
    stopStream: () => M.stop(),
    replaceVisible: (_) => M.setMessages([..._])
  }), [M]), $ = J(() => ({
    stopStream: () => z.stopStream(),
    clearMessages: () => z.replaceVisible([]),
    showMessages: (_) => z.replaceVisible(dt(_))
  }), [z]), v = er({
    jobId: e,
    documentId: n,
    enabled: a,
    remoteAnswerer: f,
    stream: $
  });
  O.current = v.tree;
  const D = ir({
    jobId: e,
    assistantMode: p,
    selectionContext: r,
    tree: v.tree,
    chat: z,
    getScopeKey: () => v.resolveRequestScopeKey()
  }), y = v.activeConversationId || (w == null ? void 0 : w.conversationId) || `${((A = f == null ? void 0 : f.getConversationId) == null ? void 0 : A.call(f)) || ""}`.trim(), b = br({
    conversationId: y,
    enabled: a,
    discovering: D.isRunning,
    signal: w,
    confirmationModeHint: R,
    onDocumentCommitted: c
  }), I = L(!1);
  return H(() => {
    I.current = !1;
  }, [e]), H(() => {
    I.current = !1;
  }, [u]), H(() => {
    I.current && !D.isRunning && (v.sessionCommands.refreshSessions(), v.sessionCommands.adoptRemoteConversationId()), I.current = D.isRunning;
  }, [v, D.isRunning]), {
    citationsByMessageId: v.citationsByMessageId,
    progressByMessageId: v.progressByMessageId,
    contentByMessageId: v.contentByMessageId,
    streamingAssistantId: D.streamingAssistantId,
    isRunning: D.isRunning,
    messages: v.messages,
    sessions: v.sessions,
    activeConversationId: v.activeConversationId,
    sessionBusy: v.sessionBusy,
    sessionError: v.sessionError,
    submitQuestion: D.submitQuestion,
    retryAnswer: D.retryAnswer,
    cancelAnswer: D.cancelAnswer,
    newSession: v.sessionCommands.newSession,
    switchSession: v.sessionCommands.switchSession,
    removeSession: v.sessionCommands.removeSession,
    renameSession: v.sessionCommands.renameSession,
    branchFromAnswer: v.sessionCommands.branchFromAnswer,
    agentOperations: b,
    assistantMode: p,
    setAssistantMode: d
  };
}
function zr({
  open: t,
  jobId: e,
  documentId: n = "",
  sessionIdentity: s = "",
  onClose: a,
  onJumpCitation: r,
  onDocumentCommitted: c,
  layout: u = "floating",
  side: p = "right",
  selectionContext: d = null,
  onClearSelectionContext: w
}) {
  const k = t && !!e, {
    citationsByMessageId: R,
    progressByMessageId: m,
    contentByMessageId: f,
    streamingAssistantId: P,
    isRunning: O,
    sessions: M,
    activeConversationId: z,
    sessionBusy: $,
    sessionError: v,
    messages: D,
    submitQuestion: y,
    retryAnswer: b,
    cancelAnswer: I,
    newSession: A,
    switchSession: _,
    removeSession: g,
    renameSession: S,
    branchFromAnswer: h,
    agentOperations: C,
    assistantMode: T,
    setAssistantMode: x
  } = yr({
    jobId: e,
    documentId: n,
    sessionIdentity: s,
    enabled: k,
    selectionContext: d,
    onDocumentCommitted: c
  }), [l, F] = U(""), V = G(async (j) => {
    F(""), await h(j) && (F(
      o("k_ecebbb97")
    ), window.setTimeout(() => F(""), 6e3));
  }, [h]), q = G((j) => {
    r(j);
  }, [r]);
  return /* @__PURE__ */ i(
    Ot,
    {
      id: "reader-ai-panel",
      open: t,
      title: "RetainPDF AI",
      titleIcon: /* @__PURE__ */ i(be, { size: 14, strokeWidth: 2.1, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.ai-float.pos.v2",
      ariaLabel: o("k_8e7621d7"),
      width: 420,
      placement: u === "workspace" ? "workspace" : u === "docked" ? "dock-right" : "floating",
      showHeader: u !== "workspace",
      className: `reader-float-ai is-${u}${u === "workspace" ? ` is-pane-${p}` : ""}${$ ? " is-session-busy" : ""}`,
      onClose: a,
      children: e ? /* @__PURE__ */ E("div", { className: "reader-float-ai-body", children: [
        /* @__PURE__ */ i(
          Pn,
          {
            sessions: M,
            activeId: z,
            busy: $,
            errorText: v,
            onSwitch: _,
            onNew: A,
            onDelete: g,
            onRename: S
          }
        ),
        l ? /* @__PURE__ */ i("div", { className: "aui-session-banner", role: "status", children: l }) : null,
        /* @__PURE__ */ i("div", { className: "reader-float-ai-thread-wrap", "aria-busy": $ || void 0, children: /* @__PURE__ */ i(
          En,
          {
            jobId: e,
            messages: D,
            citationsByMessageId: R,
            progressByMessageId: m,
            contentByMessageId: f,
            streamingAssistantId: P,
            isRunning: O,
            onSubmit: y,
            onRetry: b,
            onCancel: I,
            onJumpCitation: q,
            onBranchFromAnswer: V,
            branchBusy: $,
            agentOperations: C,
            assistantMode: T,
            onAssistantModeChange: x,
            selectionContext: d,
            onClearSelectionContext: w
          }
        ) })
      ] }) : /* @__PURE__ */ E("div", { className: "reader-float-ai-empty", children: [
        /* @__PURE__ */ i(be, { size: 22, strokeWidth: 1.75, "aria-hidden": !0 }),
        /* @__PURE__ */ i("p", { children: "当前文档还没有可用于 AI 的解析产物" }),
        /* @__PURE__ */ i("span", { children: "请先完成 OCR 文档解析" })
      ] })
    }
  );
}
export {
  zr as ReaderAiPanel
};
//# sourceMappingURL=ReaderAiPanel-Btes66uJ.js.map
