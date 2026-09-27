import { jsx as o, jsxs as E, Fragment as ve } from "react/jsx-runtime";
import { useState as U, useRef as j, useEffect as H, useMemo as J, useCallback as G, useId as pt } from "react";
import { Square as mt, ArrowUp as ht, Copy as gt, GitBranch as kt, RefreshCw as _t, Sigma as Ge, Table2 as bt, Image as yt, Type as wt, X as Ie, BookOpen as Ve, Sparkles as ke, Loader2 as Re, FileText as Ae, ArrowDown as Ye, Quote as vt, ListTree as It, FlaskConical as Rt, ShieldCheck as Ct, Bot as Nt, ChevronUp as Mt, ChevronDown as Qe, TriangleAlert as Je, ExternalLink as St, Check as Xe, Circle as At, Plus as Tt, Pencil as xt, Trash2 as $t } from "lucide-react";
import { g as me, h as he, i as ze, j as Et, d as Pt, b as Ot } from "./ReaderApp-CV4kzYam.js";
import { ThreadPrimitive as ae, ComposerPrimitive as be, MessagePrimitive as Ze, ActionBarPrimitive as Me, useAui as Dt, SelectionToolbarPrimitive as zt, useExternalStoreRuntime as qt, AssistantRuntimeProvider as Bt } from "@assistant-ui/react";
import { t as s } from "@retainpdf/i18n";
import { A as Lt } from "./AiMarkdownAnswer-H48K5cBm.js";
import { r as et } from "./reader-regions-DsePY7B_.js";
import { M as jt, C as qe, h as Ft } from "./config-BabEEVGF.js";
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
function Le({ label: t }) {
  return /* @__PURE__ */ E("div", { className: "aui-thinking", role: "status", "aria-live": "polite", children: [
    /* @__PURE__ */ o(Re, { className: "aui-spin", size: 14, strokeWidth: 2.4, "aria-hidden": !0 }),
    /* @__PURE__ */ o("span", { children: t || s("k_29653ff3") })
  ] });
}
function cn({ message: t }) {
  return /* @__PURE__ */ o(Ze.Root, { className: "aui-msg aui-msg-user", "data-role": "user", children: /* @__PURE__ */ o("div", { className: "aui-msg-bubble", children: /* @__PURE__ */ o("div", { className: "aui-md-plain", children: nt(t) }) }) });
}
function dn({
  jobId: t,
  message: e,
  citations: n,
  progress: a,
  incompleteReason: i,
  streaming: r,
  branchBusy: c,
  onJumpCitation: u,
  onBranchFromAnswer: p
}) {
  const d = nt(e);
  return /* @__PURE__ */ o(Ze.Root, { className: "aui-msg aui-msg-assistant", "data-role": "assistant", children: /* @__PURE__ */ E("div", { className: "aui-msg-stack", children: [
    r && a ? /* @__PURE__ */ o(Le, { label: a }) : null,
    r && !a && !d ? /* @__PURE__ */ o(Le, { label: s("k_29653ff3") }) : null,
    !r && i === "rounds_exhausted" ? /* @__PURE__ */ o("div", { className: "aui-msg-truncated", role: "status", children: s("k_3be85c90") }) : null,
    d ? /* @__PURE__ */ o("div", { className: "aui-msg-bubble", children: /* @__PURE__ */ o(
      Lt,
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
          /* @__PURE__ */ o(Me.Copy, { className: "aui-action-btn", "aria-label": s("k_b2dcbbf3"), title: s("k_b2dcbbf3"), children: /* @__PURE__ */ o(gt, { size: 14, strokeWidth: 2.1, "aria-hidden": !0 }) }),
          p ? /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              className: "aui-action-btn aui-action-btn-branch",
              "aria-label": s("k_ccce11aa"),
              title: s("k_ccce11aa"),
              disabled: c,
              onClick: async () => {
                fe(1200, { overlayDelayMs: 0 }), ce(1200), await p(e.id);
              },
              children: /* @__PURE__ */ o(kt, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 })
            }
          ) : null,
          /* @__PURE__ */ o(Me.Reload, { className: "aui-action-btn", "aria-label": s("k_2e190570"), title: s("k_2e190570"), children: /* @__PURE__ */ o(_t, { size: 14, strokeWidth: 2.2, "aria-hidden": !0 }) })
        ]
      }
    )
  ] }) });
}
function rt({
  jobId: t,
  citationsByMessageId: e,
  progressByMessageId: n,
  incompleteByMessageId: a,
  streamingAssistantId: i,
  isRunning: r,
  branchBusy: c,
  onJumpCitation: u,
  onBranchFromAnswer: p
}) {
  return /* @__PURE__ */ o("div", { className: "aui-message-group", "data-slot": "aui_message-group", children: /* @__PURE__ */ o(ae.Messages, { children: ({ message: d }) => {
    var b;
    if (d.role === "user") return /* @__PURE__ */ o(cn, { message: d });
    if (d.role !== "assistant") return null;
    const w = ((b = d.status) == null ? void 0 : b.type) === "running" || r && i === d.id;
    return /* @__PURE__ */ o(
      dn,
      {
        jobId: t,
        message: d,
        citations: e[d.id] || [],
        progress: n[d.id] || "",
        incompleteReason: a[d.id] || "",
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
  return /* @__PURE__ */ E("div", { className: "aui-assistant-mode", role: "group", "aria-label": s("k_39633dce"), children: [
    /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        className: t !== "operations" ? "is-active" : "",
        "aria-pressed": t !== "operations",
        disabled: e,
        onClick: () => n == null ? void 0 : n("reading"),
        children: [
          /* @__PURE__ */ o(Ve, { size: 12, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ o("span", { children: s("k_8e7621d7") })
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
          /* @__PURE__ */ o(ke, { size: 12, strokeWidth: 2.2, "aria-hidden": !0 }),
          /* @__PURE__ */ o("span", { children: "PDF Agent" })
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
  const n = t.selectionType === "text" ? "text" : t.kind, a = t.selectionType === "text" ? t.quote : et(t.region, t.pane), i = n === "formula" ? s("k_3f27035a") : n === "table" ? s("k_150074c2") : n === "figure" ? s("k_be8da62e") : s("k_f4d3dab8");
  return /* @__PURE__ */ E("div", { className: "aui-selection-context", "data-reader-ai-selection-context": "", children: [
    /* @__PURE__ */ o(n === "formula" ? Ge : n === "table" ? bt : n === "figure" ? yt : wt, { size: 14, strokeWidth: 2.1, "aria-hidden": !0 }),
    /* @__PURE__ */ E("span", { className: "aui-selection-context-meta", children: [
      t.pane === "translated" ? s("k_647e0016") : s("k_4d69dbdf"),
      " · ",
      t.page,
      " ",
      s("k_aa0f1ce1"),
      " ",
      i
    ] }),
    /* @__PURE__ */ o("span", { className: "aui-selection-context-text", children: a || s("k_3ec18a8b") }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: "aui-selection-context-remove",
        "aria-label": s("k_5a1c32a3"),
        title: s("k_674f24d9"),
        onClick: e,
        children: /* @__PURE__ */ o(Ie, { size: 13, strokeWidth: 2.4, "aria-hidden": !0 })
      }
    )
  ] });
}
function st({
  isRunning: t,
  branchBusy: e,
  mode: n,
  onModeChange: a,
  selectionContext: i,
  onClearSelectionContext: r
}) {
  return /* @__PURE__ */ E(be.Root, { className: "aui-composer", "data-reader-ai-composer": "", children: [
    /* @__PURE__ */ E("div", { className: "aui-composer-shell", children: [
      n !== "operations" ? /* @__PURE__ */ o(un, { selectionContext: i, onClear: r }) : null,
      /* @__PURE__ */ o(
        be.Input,
        {
          className: "aui-input",
          rows: 1,
          placeholder: n === "operations" ? s("k_1b634612") : s("k_139abb6f"),
          "aria-label": n === "operations" ? s("k_add94cc5") : s("k_5cc2cdd4"),
          autoFocus: !0,
          enterKeyHint: "send",
          disabled: e,
          submitMode: "enter"
        }
      ),
      /* @__PURE__ */ E("div", { className: "aui-composer-toolbar", children: [
        /* @__PURE__ */ o(ln, { mode: n, disabled: t || e, onChange: a }),
        /* @__PURE__ */ o("div", { className: "aui-composer-actions", children: t ? /* @__PURE__ */ o(be.Cancel, { className: "aui-send aui-send-stop", "aria-label": s("k_76349aa6"), children: /* @__PURE__ */ o(mt, { size: 12, strokeWidth: 2.6, "aria-hidden": !0 }) }) : /* @__PURE__ */ o(be.Send, { className: "aui-send", "aria-label": s("k_1214d633"), children: /* @__PURE__ */ o(ht, { size: 16, strokeWidth: 2.5, "aria-hidden": !0 }) }) })
      ] })
    ] }),
    /* @__PURE__ */ o("p", { className: "aui-hint", children: s("k_60444962") })
  ] });
}
function at() {
  return /* @__PURE__ */ E("div", { className: "aui-composer aui-composer-locked", role: "alert", children: [
    /* @__PURE__ */ o("p", { className: "aui-llm-lock-msg", children: jt }),
    /* @__PURE__ */ o("p", { className: "aui-hint", children: s("k_0c36d150") })
  ] });
}
const fn = [
  { prompt: s("k_704807bb"), label: s("k_2670123f"), icon: Ae },
  { prompt: s("k_980317b7"), label: s("k_661cc5df"), icon: Ae }
];
function pn({
  jobId: t,
  empty: e,
  citationsByMessageId: n,
  progressByMessageId: a,
  incompleteByMessageId: i,
  streamingAssistantId: r,
  isRunning: c,
  missingLlmKey: u,
  branchBusy: p,
  agentRequestBlocked: d = !1,
  agentOperationPanel: w,
  onModeChange: b,
  onJumpCitation: R,
  onBranchFromAnswer: m
}) {
  const f = p || d;
  return /* @__PURE__ */ E(ve, { children: [
    e ? /* @__PURE__ */ E("div", { className: "aui-empty", children: [
      /* @__PURE__ */ o("div", { className: "aui-empty-mascot", "aria-hidden": !0, children: /* @__PURE__ */ o("span", { className: "aui-empty-mascot-face", children: /* @__PURE__ */ o(ke, { size: 21, strokeWidth: 1.9 }) }) }),
      /* @__PURE__ */ o("h2", { className: "aui-empty-title", children: s("k_3e757987") }),
      /* @__PURE__ */ o("p", { className: "aui-empty-sub", children: s("k_966f0b28") }),
      /* @__PURE__ */ o("div", { className: "aui-suggestions", role: "group", "aria-label": s("k_402274e3"), children: fn.map((P) => {
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
              /* @__PURE__ */ o(O, { size: 14, strokeWidth: 2, "aria-hidden": !0, className: "aui-suggestion-icon" }),
              /* @__PURE__ */ o("span", { className: "aui-suggestion-label", children: P.label })
            ]
          },
          P.prompt
        );
      }) })
    ] }) : null,
    /* @__PURE__ */ o(
      rt,
      {
        jobId: t,
        citationsByMessageId: n,
        progressByMessageId: a,
        incompleteByMessageId: i,
        streamingAssistantId: r,
        isRunning: c,
        branchBusy: p,
        onJumpCitation: R,
        onBranchFromAnswer: m
      }
    ),
    w,
    /* @__PURE__ */ E(ae.ViewportFooter, { className: "aui-thread-viewport-footer", children: [
      !e && !p ? /* @__PURE__ */ o(
        ae.ScrollToBottom,
        {
          className: "aui-scroll-bottom-btn aui-scroll-bottom",
          "aria-label": s("k_f2936d26"),
          children: /* @__PURE__ */ o(Ye, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
        }
      ) : null,
      u ? /* @__PURE__ */ o(at, {}) : /* @__PURE__ */ o(
        st,
        {
          isRunning: c,
          branchBusy: f,
          mode: "operations",
          onModeChange: b,
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
    const a = `${((c = globalThis.getSelection) == null ? void 0 : c.call(globalThis)) || ""}`.trim();
    if (!a) return;
    const i = Wt(a);
    if (!i) return;
    const r = t.thread.composer();
    r.setText(Ut(r.getState().text || "", i));
    try {
      (p = (u = globalThis.getSelection) == null ? void 0 : u.call(globalThis)) == null || p.removeAllRanges();
    } catch {
    }
  };
  return /* @__PURE__ */ o(zt.Root, { className: "reader-ai-selection-toolbar", children: /* @__PURE__ */ E(
    "button",
    {
      type: "button",
      className: "reader-ai-selection-quote",
      onPointerDown: e,
      title: s("k_4f44e95c"),
      children: [
        /* @__PURE__ */ o(vt, { size: 12, strokeWidth: 2.4, "aria-hidden": !0 }),
        /* @__PURE__ */ o("span", { children: s("k_23c0e102") })
      ]
    }
  ) });
}
const hn = [
  { prompt: s("k_0ed2b98b"), label: s("k_b4242ae0"), icon: Ve },
  { prompt: s("k_7c4b9acb"), label: s("k_c663ef97"), icon: It },
  { prompt: s("k_fc1d35fd"), label: s("k_5471130d"), icon: Rt },
  { prompt: s("k_a9440fe8"), label: s("k_55f0c6fc"), icon: Ge }
];
function gn({
  jobId: t,
  empty: e,
  citationsByMessageId: n,
  progressByMessageId: a,
  incompleteByMessageId: i,
  streamingAssistantId: r,
  isRunning: c,
  missingLlmKey: u,
  branchBusy: p,
  composerDisabled: d = !1,
  onModeChange: w,
  onJumpCitation: b,
  onBranchFromAnswer: R,
  selectionContext: m = null,
  onClearSelectionContext: f,
  footerExtra: P = null
}) {
  return /* @__PURE__ */ E(ve, { children: [
    e ? /* @__PURE__ */ E("div", { className: "aui-empty", children: [
      /* @__PURE__ */ o("div", { className: "aui-empty-mascot", "aria-hidden": !0, children: /* @__PURE__ */ o("span", { className: "aui-empty-mascot-face", children: /* @__PURE__ */ o(ke, { size: 21, strokeWidth: 1.9 }) }) }),
      /* @__PURE__ */ o("h2", { className: "aui-empty-title", children: s("k_fa7ccc3f") }),
      /* @__PURE__ */ o("p", { className: "aui-empty-sub", children: s("k_2dff1715") }),
      /* @__PURE__ */ o("div", { className: "aui-suggestions", role: "group", "aria-label": s("k_402274e3"), children: hn.map((O) => {
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
              /* @__PURE__ */ o(M, { size: 14, strokeWidth: 2, "aria-hidden": !0, className: "aui-suggestion-icon" }),
              /* @__PURE__ */ o("span", { className: "aui-suggestion-label", children: O.label })
            ]
          },
          O.prompt
        );
      }) })
    ] }) : null,
    /* @__PURE__ */ o(mn, {}),
    /* @__PURE__ */ o(
      rt,
      {
        jobId: t,
        citationsByMessageId: n,
        progressByMessageId: a,
        incompleteByMessageId: i,
        streamingAssistantId: r,
        isRunning: c,
        branchBusy: p,
        onJumpCitation: b,
        onBranchFromAnswer: R
      }
    ),
    P,
    /* @__PURE__ */ E(ae.ViewportFooter, { className: "aui-thread-viewport-footer", children: [
      !e && !p ? /* @__PURE__ */ o(
        ae.ScrollToBottom,
        {
          className: "aui-scroll-bottom-btn aui-scroll-bottom",
          "aria-label": s("k_f2936d26"),
          children: /* @__PURE__ */ o(Ye, { size: 16, strokeWidth: 2.25, "aria-hidden": !0 })
        }
      ) : null,
      u ? /* @__PURE__ */ o(at, {}) : /* @__PURE__ */ o(
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
function kn({
  jobId: t,
  messages: e,
  citationsByMessageId: n,
  progressByMessageId: a,
  incompleteByMessageId: i,
  streamingAssistantId: r,
  isRunning: c,
  missingLlmKey: u,
  branchBusy: p,
  agentRequestBlocked: d = !1,
  agentOperationPanel: w,
  assistantMode: b = "reading",
  onAssistantModeChange: R,
  onJumpCitation: m,
  onBranchFromAnswer: f,
  selectionContext: P = null,
  onClearSelectionContext: O
}) {
  const M = e.length === 0, z = b === "operations";
  return /* @__PURE__ */ o(
    ae.Root,
    {
      className: `aui-thread aui-thread-root${u ? " is-llm-locked" : ""}`,
      "data-chat-ui": "assistant-ui-official-thread",
      children: /* @__PURE__ */ o(
        ae.Viewport,
        {
          className: "aui-viewport",
          "data-slot": "aui_thread-viewport",
          "data-reader-ai-viewport": "true",
          turnAnchor: "top",
          autoScroll: !0,
          children: /* @__PURE__ */ o("div", { className: `aui-thread-inner${M ? " is-empty" : ""}`, children: z ? /* @__PURE__ */ o(
            pn,
            {
              jobId: t,
              empty: M,
              citationsByMessageId: n,
              progressByMessageId: a,
              incompleteByMessageId: i,
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
          ) : /* @__PURE__ */ o(
            gn,
            {
              jobId: t,
              empty: M,
              citationsByMessageId: n,
              progressByMessageId: a,
              incompleteByMessageId: i,
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
const it = "retainpdf.reader-agent-operation.dismissed.v1", _n = /* @__PURE__ */ new Set(["failed", "cancelled"]);
function je(t) {
  return [
    `${t.operation_id || ""}`.trim(),
    Number(t.current_attempt) || 0,
    `${t.status || ""}`
  ].join(":");
}
function bn() {
  var t;
  try {
    const e = JSON.parse(((t = globalThis.localStorage) == null ? void 0 : t.getItem(it)) || "[]");
    return new Set(Array.isArray(e) ? e.filter((n) => typeof n == "string") : []);
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function yn(t) {
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
      return e === "green_light" ? s("k_abd26d76") : s("k_25a45621");
    case "queued":
      return s("k_d0de7734");
    case "running":
      return s("k_0a7f07c3");
    case "validating":
      return s("k_545a65a6");
    case "result_ready":
      return e === "green_light" ? s("k_1e174064") : s("k_1e53ba5e");
    case "committed":
      return e === "green_light" ? s("k_39aa2266") : s("k_c99c6952");
    case "failed":
      return s("k_9746cfc7");
    case "cancelled":
      return s("k_a5ffdc95");
    case "ambiguous":
      return s("k_590a8964");
    default:
      return `${t}`;
  }
}
function wn(t) {
  switch (t) {
    case "draft":
    case "awaiting_confirmation":
      return [
        { action: "cancel", label: s("k_03e210a6") },
        { action: "run", label: s("k_ae1109f3"), primary: !0 }
      ];
    case "queued":
    case "running":
    case "validating":
      return [{ action: "cancel", label: s("k_84442f48"), danger: !0 }];
    case "result_ready":
      return [
        { action: "cancel", label: s("k_12a73a13") },
        { action: "commit", label: s("k_9bfb5d92"), primary: !0 }
      ];
    case "failed":
      return [{ action: "retry", label: s("k_e2d53a6d"), primary: !0 }];
    case "ambiguous":
      return [{ action: "retry", label: s("k_cb916333"), danger: !0, risk: !0 }];
    default:
      return [];
  }
}
function vn(t) {
  return t === "failed" || t === "ambiguous" ? Je : t === "cancelled" ? Ie : t === "committed" || t === "result_ready" ? Xe : ["queued", "running", "validating"].includes(t) ? Re : At;
}
function In({ events: t, mode: e }) {
  return /* @__PURE__ */ o("ol", { className: "reader-agent-operation-timeline", "aria-label": s("k_e53a2f17"), children: t.map((n) => {
    const a = vn(n.status), i = ["queued", "running", "validating"].includes(n.status);
    return /* @__PURE__ */ E("li", { children: [
      /* @__PURE__ */ o(a, { className: i ? "is-spinning" : "", size: 12, "aria-hidden": !0 }),
      /* @__PURE__ */ o("span", { children: n.summary || n.event || ot(n.status, e) }),
      /* @__PURE__ */ o("time", { children: n.ts ? new Date(n.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "" })
    ] }, `${n.attempt}:${n.seq}`);
  }) });
}
function Rn({
  operation: t,
  loadCandidate: e
}) {
  const [n, a] = U(!1), [i, r] = U(""), [c, u] = U(""), p = j("");
  return H(() => {
    let d = !1;
    return u(""), e(t).then((w) => {
      if (d) return;
      const b = URL.createObjectURL(w);
      p.current && URL.revokeObjectURL(p.current), p.current = b, r(b);
    }).catch(() => {
      d || u(s("k_729d4268"));
    }), () => {
      d = !0;
    };
  }, [e, t.operation_id, t.current_attempt]), H(() => () => {
    p.current && URL.revokeObjectURL(p.current);
  }, []), /* @__PURE__ */ E(ve, { children: [
    /* @__PURE__ */ E("div", { className: "reader-agent-operation-candidate", children: [
      /* @__PURE__ */ E("div", { children: [
        /* @__PURE__ */ o(Ae, { size: 13, "aria-hidden": !0 }),
        /* @__PURE__ */ o("span", { children: s("k_dc40dd3d") })
      ] }),
      /* @__PURE__ */ o("button", { type: "button", disabled: !i, onClick: () => a((d) => !d), children: i ? n ? s("k_5d581564") : s("k_de61aa8e") : s("k_300ee3de") }),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: !i,
          "aria-label": s("k_20c74def"),
          onClick: () => window.open(i, "_blank", "noopener,noreferrer"),
          children: /* @__PURE__ */ o(St, { size: 12, "aria-hidden": !0 })
        }
      )
    ] }),
    n ? /* @__PURE__ */ o("iframe", { className: "reader-agent-operation-preview", src: i, title: s("k_2c845c17") }) : null,
    c ? /* @__PURE__ */ o("p", { className: "reader-agent-operation-error", role: "alert", children: c }) : null
  ] });
}
function Cn({
  entry: t,
  mode: e,
  loadCandidate: n,
  onAction: a,
  onDismiss: i
}) {
  var O;
  const { operation: r, pendingAction: c, error: u } = t, [p, d] = U(!1), [w, b] = U(!1), R = r.events || [], m = wn(r.status), f = !!((r.status === "result_ready" || r.status === "committed") && r.candidate_available), P = _n.has(r.status);
  return /* @__PURE__ */ E("article", { className: `reader-agent-operation-card is-${r.status}`, "data-operation-id": r.operation_id, children: [
    /* @__PURE__ */ E("header", { children: [
      /* @__PURE__ */ o("span", { className: "reader-agent-operation-icon", "aria-hidden": !0, children: /* @__PURE__ */ o(Nt, { size: 15 }) }),
      /* @__PURE__ */ E("div", { className: "reader-agent-operation-title", children: [
        /* @__PURE__ */ o("span", { children: s("k_8d364eb8") }),
        /* @__PURE__ */ o("strong", { children: r.intent_summary || s("k_848fbe6a") })
      ] }),
      /* @__PURE__ */ E("div", { className: "reader-agent-operation-head-actions", children: [
        /* @__PURE__ */ o("span", { className: "reader-agent-operation-status", children: ot(r.status, e) }),
        P ? /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "reader-agent-operation-dismiss",
            "aria-label": r.status === "failed" ? s("k_d1ea7ca0") : s("k_c1a90a2e"),
            title: s("k_bb0e7e01"),
            onClick: () => i(r),
            children: /* @__PURE__ */ o(Ie, { size: 13, "aria-hidden": !0 })
          }
        ) : null
      ] })
    ] }),
    (O = r.affected_pages) != null && O.length ? /* @__PURE__ */ E("p", { className: "reader-agent-operation-scope", children: [
      s("k_3c526601"),
      r.affected_pages.join("、")
    ] }) : null,
    R.length ? /* @__PURE__ */ E("div", { className: "reader-agent-operation-details", children: [
      /* @__PURE__ */ E("button", { type: "button", onClick: () => d((M) => !M), children: [
        p ? /* @__PURE__ */ o(Mt, { size: 12, "aria-hidden": !0 }) : /* @__PURE__ */ o(Qe, { size: 12, "aria-hidden": !0 }),
        p ? s("k_c4cb1897") : s("k_ad75ebcb", [R.length])
      ] }),
      p ? /* @__PURE__ */ o(In, { events: R, mode: e }) : null
    ] }) : null,
    f ? /* @__PURE__ */ o(Rn, { operation: r, loadCandidate: n }) : null,
    u ? /* @__PURE__ */ o("p", { className: "reader-agent-operation-error", role: "alert", children: u }) : null,
    w ? /* @__PURE__ */ E("div", { className: "reader-agent-operation-risk", role: "alertdialog", "aria-label": s("k_875120ef"), children: [
      /* @__PURE__ */ o(Je, { size: 14, "aria-hidden": !0 }),
      /* @__PURE__ */ o("p", { children: s("k_1daec36c") }),
      /* @__PURE__ */ E("div", { children: [
        /* @__PURE__ */ o("button", { type: "button", onClick: () => b(!1), disabled: !!c, children: s("k_11d02415") }),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: "is-danger",
            disabled: !!c,
            onClick: async () => {
              await a("retry", r, { acceptDuplicateRisk: !0 }), b(!1);
            },
            children: c === "retry" ? s("k_1cac8ac7") : s("k_5ded2022")
          }
        )
      ] })
    ] }) : m.length ? /* @__PURE__ */ o("div", { className: "reader-agent-operation-actions", children: m.map((M) => /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        className: M.primary ? "is-primary" : M.danger ? "is-danger" : "",
        disabled: !!c,
        onClick: () => {
          M.risk ? b(!0) : a(M.action, r);
        },
        children: c === M.action ? s("k_1cac8ac7") : M.label
      },
      M.action
    )) }) : null
  ] });
}
function Nn({
  entries: t,
  confirmationMode: e,
  runtimeRestarting: n,
  loadCandidate: a,
  onAction: i
}) {
  const [r, c] = U(bn), u = t.filter((d) => !r.has(je(d.operation)));
  function p(d) {
    const w = je(d);
    c((b) => {
      const R = new Set(b);
      return R.add(w), yn(R), R;
    });
  }
  return /* @__PURE__ */ E("section", { className: `reader-agent-operations${u.length ? " has-operations" : ""}`, "aria-label": s("k_3476c2fd"), children: [
    /* @__PURE__ */ E("div", { className: `reader-agent-mode${e === "green_light" ? " is-green" : ""}`, children: [
      /* @__PURE__ */ o(Ct, { size: 13, "aria-hidden": !0 }),
      /* @__PURE__ */ o("span", { children: e === "green_light" ? s("k_af4d8105") : s("k_012643ef") })
    ] }),
    n ? /* @__PURE__ */ E("div", { className: "reader-agent-restarting", role: "status", children: [
      /* @__PURE__ */ o(Re, { className: "is-spinning", size: 13, "aria-hidden": !0 }),
      s("k_38fae07b")
    ] }) : null,
    u.map((d) => /* @__PURE__ */ o(
      Cn,
      {
        entry: d,
        mode: e,
        loadCandidate: a,
        onAction: i,
        onDismiss: p
      },
      d.operation.operation_id
    ))
  ] });
}
const Mn = (t) => t, Sn = Object.freeze([]), An = Object.freeze({}), Fe = Object.freeze({}), Tn = Object.freeze({
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
  var a, i, r, c;
  return ((a = t.status) == null ? void 0 : a.type) === "running" || n && e === t.id ? { type: "running" } : ((i = t.status) == null ? void 0 : i.type) === "incomplete" || ((r = t.status) == null ? void 0 : r.type) === "error" ? {
    type: "incomplete",
    reason: ((c = t.status) == null ? void 0 : c.reason) === "cancelled" ? "cancelled" : "error"
  } : { type: "complete", reason: "stop" };
}
function En({
  jobId: t = "",
  messages: e = Sn,
  citationsByMessageId: n = An,
  progressByMessageId: a = Fe,
  contentByMessageId: i = Fe,
  streamingAssistantId: r = "",
  isRunning: c = !1,
  onSubmit: u,
  onRetry: p,
  onCancel: d,
  onJumpCitation: w,
  onBranchFromAnswer: b,
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
  const $ = !Ft() && !m.runtimeCredentialConfigured, v = J(() => e.map((g) => ({
    id: g.id,
    role: g.role,
    content: i[g.id] || g.content || "",
    ...g.role === "assistant" ? { status: $n(g, r, c) } : {}
  })), [i, c, e, r]), D = J(() => {
    var S, h;
    const g = {};
    for (const C of e) {
      if (C.role !== "assistant") continue;
      const T = `${((S = C.status) == null ? void 0 : S.reason) || ""}`.trim();
      ((h = C.status) == null ? void 0 : h.type) === "incomplete" && T && T !== "cancelled" && (g[C.id] = T);
    }
    return g;
  }, [e]), _ = G(async (g) => {
    const S = g ? Math.max(0, e.findIndex((C) => C.id === g) + 1) : 0, h = e.slice(S).find((C) => C.role === "assistant");
    h && await p(h.id);
  }, [e, p]), k = G(async (g) => {
    const S = xn(g);
    !S || c || R || m.runtimeRestarting || $ || await u(S);
  }, [m.runtimeRestarting, R, c, $, u]), I = G(async () => {
    await d();
  }, [d]), A = J(() => ({
    messages: v,
    isRunning: c,
    isDisabled: R || m.runtimeRestarting || $,
    convertMessage: Mn,
    onNew: k,
    onReload: _,
    onCancel: I
  }), [
    m.runtimeRestarting,
    R,
    I,
    k,
    c,
    $,
    _,
    v
  ]), y = qt(A);
  return /* @__PURE__ */ o(Bt, { runtime: y, children: /* @__PURE__ */ o(
    kn,
    {
      jobId: t,
      messages: e,
      citationsByMessageId: n,
      progressByMessageId: a,
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
      agentOperationPanel: m.entries.length > 0 || m.runtimeRestarting ? /* @__PURE__ */ o(
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
      onBranchFromAnswer: b
    }
  ) });
}
function ye(t = 900, e = 0) {
  fe(t, { overlayDelayMs: e }), ce(t);
}
function Pn({
  sessions: t,
  activeId: e,
  busy: n = !1,
  disabled: a = !1,
  errorText: i = "",
  onSwitch: r,
  onNew: c,
  onDelete: u,
  onRename: p
}) {
  const d = t.length > 0, w = n || a, [b, R] = U(!1), [m, f] = U(""), [P, O] = U(""), M = j(null), z = pt();
  function $(h) {
    const C = `${h || ""}`.match(/^fork-(\d+)-(.*)$/i);
    if (!C) return h;
    const T = C[2].trim();
    return T ? s("k_07ad5074", [T, C[1]]) : s("k_bfe8bdfc", [C[1]]);
  }
  const v = j(!1), D = j(null), _ = t.find((h) => h.id === e) || null, k = _ ? _.messageCount ? $(_.title) : s("k_c2a84778", [$(_.title)]) : d ? s("k_0a98e3c4") : s("k_1b7abf96");
  H(() => {
    if (!b) {
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
  }, [b]), H(() => {
    if (!m) return;
    const h = D.current;
    h && (h.focus(), h.select());
  }, [m]);
  const I = (h) => {
    const C = `${h || ""}`.trim();
    !C || w || v.current || m || (v.current = !0, ye(1e3, 0), requestAnimationFrame(() => {
      R(!1), window.setTimeout(() => {
        (async () => {
          try {
            await r(C);
          } finally {
            ye(400, 0), v.current = !1;
          }
        })();
      }, 40);
    }));
  }, A = (h) => {
    w || (f(h.id), O(h.title || ""));
  }, y = () => {
    const h = m, C = P;
    f(""), h && p(h, C);
  }, g = () => {
    f(""), O("");
  }, S = (h) => {
    var x;
    if (w || v.current) return;
    const C = h.title || s("k_8200c3d5");
    (x = globalThis.confirm) != null && x.call(globalThis, s("k_87930265", [C])) && (v.current = !0, ye(800, 0), (async () => {
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
              className: `aui-session-trigger${b ? " is-open" : ""}`,
              "aria-label": s("k_554275b5"),
              "aria-haspopup": "listbox",
              "aria-expanded": b,
              "aria-controls": z,
              disabled: w || !d,
              title: k,
              onClick: () => {
                w || !d || R((h) => !h);
              },
              children: [
                /* @__PURE__ */ o("span", { className: "aui-session-trigger-label", children: k }),
                /* @__PURE__ */ o(Qe, { size: 14, strokeWidth: 2.4, "aria-hidden": !0 })
              ]
            }
          ),
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              className: "aui-session-btn",
              disabled: w,
              title: s("k_fa347cae"),
              "aria-label": s("k_1b7abf96"),
              onClick: () => {
                w || v.current || (v.current = !0, ye(800), R(!1), f(""), window.setTimeout(() => {
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
                n ? /* @__PURE__ */ o(Re, { className: "aui-spin", size: 14, strokeWidth: 2.4, "aria-hidden": !0 }) : /* @__PURE__ */ o(Tt, { size: 14, strokeWidth: 2.4, "aria-hidden": !0 }),
                /* @__PURE__ */ o("span", { children: s("k_1b7abf96") })
              ]
            }
          )
        ] }),
        b && d ? /* @__PURE__ */ o(
          "ul",
          {
            id: z,
            className: "aui-session-list",
            role: "listbox",
            "aria-label": s("k_6acb3640"),
            children: t.map((h) => {
              const C = h.messageCount ? $(h.title) : s("k_c2a84778", [$(h.title)]), T = h.id === e, x = m === h.id;
              return /* @__PURE__ */ o("li", { className: "aui-session-row-item", role: "presentation", children: x ? /* @__PURE__ */ E("div", { className: "aui-session-edit", children: [
                /* @__PURE__ */ o(
                  "input",
                  {
                    ref: D,
                    className: "aui-session-edit-input",
                    value: P,
                    maxLength: 80,
                    "aria-label": s("k_b259c016"),
                    disabled: w,
                    onChange: (l) => O(l.target.value),
                    onKeyDown: (l) => {
                      l.key === "Enter" ? (l.preventDefault(), y()) : l.key === "Escape" && (l.preventDefault(), g());
                    },
                    onClick: (l) => l.stopPropagation()
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn",
                    "aria-label": s("k_fe0e9e6e"),
                    title: s("k_fadf24db"),
                    disabled: w || !P.trim(),
                    onClick: (l) => {
                      l.stopPropagation(), y();
                    },
                    children: /* @__PURE__ */ o(Xe, { size: 13, strokeWidth: 2.5, "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn",
                    "aria-label": s("k_89fdd63b"),
                    title: s("k_4d0b4688"),
                    disabled: w,
                    onClick: (l) => {
                      l.stopPropagation(), g();
                    },
                    children: /* @__PURE__ */ o(Ie, { size: 13, strokeWidth: 2.5, "aria-hidden": !0 })
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
                      /* @__PURE__ */ o("span", { className: "aui-session-item-title", children: C }),
                      T ? /* @__PURE__ */ o("span", { className: "aui-session-item-badge", children: s("k_25e74dce") }) : null
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn",
                    "aria-label": s("k_304cb6f9", [C]),
                    title: s("k_1cd80fd7"),
                    disabled: w,
                    onClick: (l) => {
                      l.preventDefault(), l.stopPropagation(), A(h);
                    },
                    children: /* @__PURE__ */ o(xt, { size: 13, strokeWidth: 2.4, "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    className: "aui-session-icon-btn is-danger",
                    "aria-label": s("k_65154fc0", [C]),
                    title: s("k_3755f56f"),
                    disabled: w,
                    onClick: (l) => {
                      l.preventDefault(), l.stopPropagation(), S(h);
                    },
                    children: /* @__PURE__ */ o($t, { size: 13, strokeWidth: 2.4, "aria-hidden": !0 })
                  }
                )
              ] }) }, h.id);
            })
          }
        ) : null,
        i ? /* @__PURE__ */ o("div", { className: "aui-session-error", role: "alert", children: i }) : null
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
  for (let a = t.length - 1; a >= 0; a -= 1) {
    const i = t[a];
    if (i.role !== "user") continue;
    const r = ct(i);
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
    messages: a,
    trigger: i
  }) {
    var O, M, z, $;
    const r = n || {}, c = On(a, r);
    if (!c) throw new Error(s("k_c0af56b0"));
    const u = r.assistantMode || ((M = (O = this.options).getAssistantMode) == null ? void 0 : M.call(O)) || "reading", p = r.scope || "document", d = r.context ? { ...r.context } : null, w = `${r.assistantMessageId || ""}`.trim() || `a-${Date.now().toString(36)}`, b = `${w}-text`, R = this.options.getRemoteAnswerer(), m = (($ = (z = this.options).getLocalAnswerer) == null ? void 0 : $.call(z)) || null;
    if (!R && !m)
      throw new Error(s("k_f59bd7f4"));
    let f = !1;
    const P = /* @__PURE__ */ new Set();
    return new ReadableStream({
      cancel: () => {
        f = !0;
      },
      start: (v) => {
        let D = "", _ = {
          citations: [],
          progress: i === "regenerate-message" ? s("k_f7adee6c") : s("k_b24a7869"),
          status: "running"
        };
        const k = (A) => {
          if (!f)
            try {
              v.enqueue(A);
            } catch {
              f = !0;
            }
        }, I = (A) => {
          _ = { ..._, ...A }, k({ type: "message-metadata", messageMetadata: _ });
        };
        k({ type: "start", messageId: w, messageMetadata: _ }), k({ type: "start-step" }), k({ type: "text-start", id: b }), (async () => {
          var A, y, g, S, h, C;
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
                regenerate: r.regenerate ?? i === "regenerate-message",
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
                  !B || e != null && e.aborted || (D += B, _.progress && I({ progress: "" }), k({ type: "text-delta", id: b, delta: B }));
                },
                onCompress: (N) => {
                  if (D || e != null && e.aborted) return;
                  const B = Number(N == null ? void 0 : N.dropped_turns) || 0;
                  B && I({ progress: s("k_a92a7217", [B]) });
                },
                signal: e
              });
            } catch (N) {
              if (e != null && e.aborted || u === "operations" || !R || !m || !Dn(N)) throw N;
              if (x = !0, I({ progress: s("k_d3f86976") }), await ((y = m.ensureLoaded) == null ? void 0 : y.call(m, this.options.jobId)), e != null && e.aborted) throw new Error("aborted");
              T = m, l = await T.answer({
                question: c,
                assistantMode: u,
                scope: p,
                context: d,
                signal: e
              });
            }
            if (e != null && e.aborted) {
              I({ progress: "", status: "cancelled", statusText: s("k_a5ffdc95") }), k({ type: "abort", reason: "cancelled" });
              return;
            }
            const L = l == null ? void 0 : l.confirmationMode;
            (L === "explicit" || L === "green_light") && ((S = (g = this.options).onConfirmationMode) == null || S.call(g, L));
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
                confirmationMode: L || void 0
              });
            const F = Kt(l == null ? void 0 : l.citations);
            let Y = Ht(
              `${(l == null ? void 0 : l.answer) || D || ""}`.trim() || s("k_e1a73897"),
              F
            );
            if (x && (Y += s("k_dc882b3a")), (l == null ? void 0 : l.persisted) === !1 && (Y += s("k_affaf14a")), !D)
              k({ type: "text-delta", id: b, delta: Y });
            else if (Y.startsWith(D)) {
              const N = Y.slice(D.length);
              N && k({ type: "text-delta", id: b, delta: N });
            }
            k({ type: "text-end", id: b }), I({
              citations: F,
              persisted: (l == null ? void 0 : l.persisted) !== !1,
              progress: "",
              status: "complete",
              incompleteReason: `${(l == null ? void 0 : l.incompleteReason) || ""}`.trim()
            }), k({ type: "finish-step" }), k({ type: "finish", finishReason: "stop", messageMetadata: _ });
          } catch (T) {
            if (e != null && e.aborted)
              I({ progress: "", status: "cancelled", statusText: s("k_a5ffdc95") }), k({ type: "abort", reason: "cancelled" });
            else {
              const x = T instanceof Error && T.message ? T.message : s("k_dbb9ca66");
              I({ progress: "", status: "error", statusText: x }), k({ type: "error", errorText: x });
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
    var n, a;
    return {
      id: e.id,
      role: e.role,
      metadata: e.role === "assistant" ? {
        citations: e.citations || [],
        progress: e.progress || "",
        status: ((n = e.status) == null ? void 0 : n.type) === "running" ? "running" : ((a = e.status) == null ? void 0 : a.type) === "incomplete" ? e.status.reason === "cancelled" ? "cancelled" : "error" : "complete"
      } : void 0,
      parts: [{ type: "text", text: e.content || "" }]
    };
  });
}
function Bn(t) {
  const e = t.metadata || {}, n = e.status === "running", a = e.status === "cancelled" || e.status === "error", i = qn(t), r = i.trim() || (a ? `${e.statusText || ""}`.trim() : "");
  return {
    id: t.id,
    role: t.role,
    content: t.role === "assistant" ? r : i,
    ...t.role === "assistant" ? {
      citations: e.citations || [],
      progress: e.progress || "",
      // 「答完了但没做完」和「中断/出错」是两回事:正文是完整的一段话,只是背后的
      // 工作被轮次预算截断了。所以它走 incomplete + 具体原因,而不是 error。
      status: n ? { type: "running" } : a ? {
        type: "incomplete",
        reason: e.status === "cancelled" ? "cancelled" : "error"
      } : `${e.incompleteReason || ""}`.trim() ? {
        type: "incomplete",
        reason: `${e.incompleteReason}`.trim()
      } : { type: "complete", reason: "stop" }
    } : {}
  };
}
function Ln(t) {
  const e = j(t.remoteAnswerer), n = j(t.localAnswerer), a = j(t.onAgentOperationSignal), i = j(t.onConfirmationMode), r = j(t.onStopped);
  r.current = t.onStopped;
  const c = j(t.assistantMode);
  e.current = t.remoteAnswerer, n.current = t.localAnswerer, a.current = t.onAgentOperationSignal, i.current = t.onConfirmationMode, c.current = t.assistantMode;
  const u = J(() => new Vt({
    id: `reader-${t.jobId || "idle"}`,
    transport: new zn({
      jobId: t.jobId,
      getRemoteAnswerer: () => e.current,
      getLocalAnswerer: () => n.current,
      getAssistantMode: () => c.current,
      onAgentOperationSignal: (p) => {
        var d;
        return (d = a.current) == null ? void 0 : d.call(a, p);
      },
      onConfirmationMode: (p) => {
        var d;
        return (d = i.current) == null ? void 0 : d.call(i, p);
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
function jn(t) {
  for (let e = t.length - 1; e >= 0; e -= 1)
    if (t[e].role === "assistant") return t[e];
}
function $e(t, e) {
  return {
    version: 1,
    headId: e,
    items: t.map((n) => {
      var a;
      return {
        parentId: n.parentId,
        message: {
          id: n.message.id,
          role: n.message.role,
          content: n.message.content,
          ...n.message.progress ? { progress: n.message.progress } : {},
          ...(a = n.message.citations) != null && a.length ? { citations: n.message.citations } : {},
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
  const n = new Map(t.map((u) => [u.message.id, u])), a = e && n.get(e) || t.at(-1);
  if (!a) return [];
  const i = [];
  let r = a;
  const c = /* @__PURE__ */ new Set();
  for (; r && !c.has(r.message.id); )
    c.add(r.message.id), i.push(r.message), r = r.parentId ? n.get(r.parentId) : void 0;
  return i.reverse();
}
function Fn(t, e) {
  var n;
  return e ? ((n = t.find((a) => a.message.id === e)) == null ? void 0 : n.message) ?? null : null;
}
function Kn(t, e) {
  const n = new Map(t.map((c) => [c.message.id, c]));
  let a = n.get(e);
  if (!a) return [];
  const i = [], r = /* @__PURE__ */ new Set();
  for (; a && !r.has(a.message.id); )
    r.add(a.message.id), i.push(a), a = a.parentId ? n.get(a.parentId) : void 0;
  return i.reverse();
}
function Wn(t, e, n) {
  var w, b, R, m;
  const a = `${e || ""}`.trim();
  if (!a || !t.length) return [];
  let i = a;
  t.some((f) => f.message.id === i) || (n && t.some((f) => f.message.id === n) ? i = n : i = ((w = [...t].reverse().find((f) => f.message.role === "assistant")) == null ? void 0 : w.message.id) || "");
  let r = Kn(t, i);
  if (r.length >= 2 && ((b = r.at(-1)) == null ? void 0 : b.message.role) === "assistant") return r;
  r.length === 1 && ((R = r[0]) == null ? void 0 : R.message.role) === "user" && (r = []);
  const c = de(t, n || i);
  let u = c.findIndex((f) => f.id === i);
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
  for (const a of t) {
    const i = a.message;
    i.role === "assistant" && ((n = i.citations) != null && n.length) && (e[i.id] = i.citations);
  }
  return e;
}
function Gn(t) {
  const e = {};
  for (const n of t) {
    const a = n.message;
    a.role === "assistant" && a.progress && (e[a.id] = a.progress);
  }
  return e;
}
function Vn(t) {
  const e = {};
  for (const n of t) {
    const a = n.message;
    a.content && (e[a.id] = a.content);
  }
  return e;
}
function Yn(t, e, n) {
  var i;
  const a = e || ((i = n == null ? void 0 : n.getConversationId) == null ? void 0 : i.call(n)) || "";
  return (t || []).map((r) => ({
    ...Jt(r, { active: a }),
    active: r.conversation_id === a
  }));
}
function Qn(t) {
  const { setItems: e, setHeadId: n } = t;
  return {
    readItems: () => t.itemsRef.current,
    readHeadId: () => t.headIdRef.current,
    appendExchange: ({ parentId: a, userId: i, assistantId: r, question: c, progress: u }) => {
      e((p) => [
        ...p,
        { parentId: a, message: { id: i, role: "user", content: c } },
        {
          parentId: i,
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
    appendRetryTurn: ({ assistantId: a, branchParent: i }) => {
      e((r) => [
        ...r,
        {
          parentId: i,
          message: {
            id: a,
            role: "assistant",
            content: "",
            progress: s("k_f7adee6c"),
            status: { type: "running" },
            citations: []
          }
        }
      ]), n(a);
    },
    markRunningCancelled: () => {
      e(
        (a) => a.map(
          (i) => {
            var r;
            return ((r = i.message.status) == null ? void 0 : r.type) === "running" ? {
              ...i,
              message: {
                ...i.message,
                status: { type: "incomplete", reason: "cancelled" },
                progress: "",
                content: i.message.content.trim() || s("k_a5ffdc95")
              }
            } : i;
          }
        )
      );
    },
    markRunningAsError: (a) => {
      const i = `${a || ""}`.trim() || s("k_dbb9ca66");
      e((r) => r.map((c) => {
        var u;
        return ((u = c.message.status) == null ? void 0 : u.type) === "running" ? {
          ...c,
          message: {
            ...c.message,
            content: c.message.content.trim() || i,
            progress: "",
            citations: [],
            status: { type: "incomplete", reason: "error" }
          }
        } : c;
      }));
    },
    mergeChatMirror: (a) => {
      a.size && e((i) => i.map((r) => {
        const c = a.get(r.message.id);
        return c ? { ...r, message: { ...r.message, ...c } } : r;
      }));
    }
  };
}
function Jn(t) {
  const {
    jobId: e,
    documentId: n,
    enabled: a,
    refreshSessions: i,
    applyConversationTree: r,
    remoteRef: c,
    streamRef: u,
    itemsRef: p,
    documentIdRef: d,
    lastJobRef: w,
    persistReadyRef: b,
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
      m.current += 1, R.current += 1, P([]), O(null), M([]), z(""), u.current.clearMessages(), f.current = "", w.current = "", d.current = "", b.current = !1;
      return;
    }
    const D = w.current !== e;
    if (D && (m.current += 1, R.current += 1, w.current = e, b.current = !1, P([]), O(null), u.current.clearMessages(), M([]), z(""), f.current = "", d.current = "", $(!1)), !a || !v) {
      m.current += 1;
      return;
    }
    let _ = !1;
    return (async () => {
      var S, h, C, T;
      let k = `${n || d.current || ""}`.trim();
      if (!k) {
        try {
          k = `${await ((S = v.getDocumentId) == null ? void 0 : S.call(v)) || ""}`.trim();
        } catch {
          k = "";
        }
        if (_) return;
      }
      k && (d.current = k);
      let I = null;
      if (!_ && k && (I = await i(k)), !(D || !p.current.length) || _) {
        _ || (b.current = !0);
        return;
      }
      const y = Xt({ jobId: e, documentId: k }) || `${((h = v.getConversationId) == null ? void 0 : h.call(v)) || ""}`.trim();
      if (y) {
        z(y), f.current = y, (C = v.setConversationId) == null || C.call(v, y, k);
        try {
          const x = await Be(y);
          if (_) return;
          const l = we(x.messages || []);
          if (l.length) {
            r(l, x.head_id), requestAnimationFrame(() => {
              _ || (b.current = !0);
            });
            return;
          }
        } catch {
        }
      }
      if (!_ && k)
        try {
          const x = I ?? await i(k);
          if (_ || !x) return;
          const l = x[0];
          if (l != null && l.conversation_id) {
            const L = l.conversation_id;
            z(L), f.current = L, (T = v.setConversationId) == null || T.call(v, L, k);
            try {
              const V = await Be(L);
              if (_) return;
              r(
                we(V.messages || []),
                V.head_id
              ), requestAnimationFrame(() => {
                _ || (b.current = !0);
              });
              return;
            } catch {
            }
          }
        } catch {
        }
      if (_) return;
      const g = tt({ jobId: e, documentId: k }, y);
      if (g != null && g.items.length) {
        const x = lt(g);
        P(x.items), O(x.headId), u.current.showMessages(de(x.items, x.headId));
      } else
        P([]), O(null), u.current.clearMessages();
      requestAnimationFrame(() => {
        _ || (b.current = !0);
      });
    })(), () => {
      _ = !0, m.current += 1;
    };
  }, [e, n, a, i, r]);
}
function Xn(t) {
  const {
    jobId: e,
    documentId: n,
    items: a,
    headId: i,
    activeConversationId: r,
    documentIdRef: c,
    persistReadyRef: u
  } = t;
  H(() => {
    if (!e || !u.current) return;
    const p = r, d = { jobId: e, documentId: n || c.current }, w = window.setTimeout(() => {
      if (!a.length) {
        ge(d, p);
        return;
      }
      xe(d, $e(a, i), p);
    }, 280);
    return () => window.clearTimeout(w);
  }, [e, n, a, i, r]);
}
function Zn(t) {
  const {
    jobId: e,
    documentId: n,
    sessionBusy: a,
    sessions: i,
    streamRef: r,
    remoteRef: c,
    itemsRef: u,
    headIdRef: p,
    activeConversationIdRef: d,
    documentIdRef: w,
    switchTokenRef: b,
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
    const y = `${((S = (g = c.current) == null ? void 0 : g.getConversationId) == null ? void 0 : S.call(g)) || ""}`.trim();
    y && P(y);
  }, []), _ = G(async () => {
    var g, S;
    if (a) return;
    await r.current.stopStream(), fe(900), ce(900), m(!0), f("");
    const y = ++b.current;
    try {
      if (await new Promise((T) => {
        window.setTimeout(T, 40);
      }), y !== b.current) return;
      const h = c.current, C = w.current || `${await ((g = h == null ? void 0 : h.getDocumentId) == null ? void 0 : g.call(h)) || ""}`.trim();
      if (y !== b.current) return;
      w.current = C, (S = h == null ? void 0 : h.clearConversationId) == null || S.call(h, C), P(""), d.current = "", O([]), M(null), r.current.clearMessages(), ge({ jobId: e, documentId: C }), C && await $(C, y);
    } catch (h) {
      console.warn("[reader-ai] new session failed", h), f(s("k_54817755"));
    } finally {
      y === b.current && m(!1);
    }
  }, [e, $, a]), k = G(async (y) => {
    var T, x, l, L, V;
    const g = `${y || ""}`.trim();
    if (!g)
      return f(s("k_91a359b9")), !1;
    if (a)
      return f(s("k_ee7e0de3")), !1;
    await r.current.stopStream();
    const S = Wn(u.current, g, p.current);
    if (!S.length)
      return f(s("k_0642d685")), !1;
    if (S[S.length - 1].message.role !== "assistant")
      return f(s("k_7022e061")), !1;
    m(!0), f("");
    const C = ++b.current;
    try {
      if (await new Promise((K) => {
        window.setTimeout(K, 40);
      }), C !== b.current) return !1;
      const q = c.current;
      let F = w.current || `${await ((T = q == null ? void 0 : q.getDocumentId) == null ? void 0 : T.call(q)) || ""}`.trim();
      if (C !== b.current) return !1;
      if (w.current = F, !F)
        try {
          if (F = `${await ((x = q == null ? void 0 : q.getDocumentId) == null ? void 0 : x.call(q)) || ""}`.trim(), C !== b.current) return !1;
          w.current = F;
        } catch {
          F = "";
        }
      if (!F)
        return f(s("k_3cb7084f")), !1;
      const Y = S.map((K, oe) => ({
        id: K.message.id,
        role: K.message.role,
        content: K.message.content,
        citations: K.message.citations,
        parentId: oe === 0 ? null : S[oe - 1].message.id
      })), N = d.current || ((l = q == null ? void 0 : q.getConversationId) == null ? void 0 : l.call(q)) || "", B = (i || []).find((K) => K.conversation_id === N), Z = Y.find((K) => K.role === "user"), ne = `${(B == null ? void 0 : B.title) || ""}`.trim() || `${(Z == null ? void 0 : Z.content) || ""}`.replace(/\s+/g, " ").trim() || s("k_8200c3d5"), se = (i || []).map((K) => K.title || ""), ie = Zt(ne, se), ee = await me().forkFromPath({
        documentId: F,
        title: ie,
        path: Y
      });
      if (C !== b.current) return !1;
      const W = Te(ee.items), X = ((L = W[W.length - 1]) == null ? void 0 : L.message.id) || null, Q = ee.conversation.conversation_id;
      if (!Q || !W.length)
        throw new Error("fork returned empty conversation");
      return fe(600), ce(600), O(W), M(X), r.current.showMessages(de(W, X)), P(Q), d.current = Q, (V = q == null ? void 0 : q.setConversationId) == null || V.call(q, Q, F), z((K) => {
        const oe = {
          conversation_id: Q,
          title: ie,
          document_id: F,
          created_at: ee.conversation.created_at || (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: ee.conversation.updated_at || (/* @__PURE__ */ new Date()).toISOString(),
          message_count: W.length,
          head_id: X || ""
        }, le = K.filter((pe) => pe.conversation_id !== Q);
        return [oe, ...le];
      }), xe(
        { jobId: e, documentId: F },
        $e(W, X),
        Q
      ), await $(F, C), !0;
    } catch (q) {
      return console.warn("[reader-ai] branch from answer failed", q), C === b.current && f(s("k_1690169d")), !1;
    } finally {
      C === b.current && m(!1);
    }
  }, [e, $, a, i]), I = G(async (y) => {
    var h, C, T, x;
    const g = `${y || ""}`.trim();
    if (!g || a) return;
    await r.current.stopStream(), m(!0), f("");
    const S = ++b.current;
    try {
      const l = c.current, L = w.current || `${await ((h = l == null ? void 0 : l.getDocumentId) == null ? void 0 : h.call(l)) || ""}`.trim();
      if (S !== b.current) return;
      w.current = L;
      try {
        await me().delete(g);
      } catch (F) {
        if ((Number(F == null ? void 0 : F.status) || 0) !== 404) throw F;
      }
      ge({ jobId: e, documentId: L }, g);
      const q = (d.current || ((C = l == null ? void 0 : l.getConversationId) == null ? void 0 : C.call(l)) || "") === g;
      if (z((F) => F.filter((Y) => Y.conversation_id !== g)), q) {
        (T = l == null ? void 0 : l.clearConversationId) == null || T.call(l, L), P(""), d.current = "", O([]), M(null), r.current.clearMessages(), ge({ jobId: e, documentId: L });
        const F = L ? await $(L, S) : [];
        if (S !== b.current || !F) return;
        const Y = F[0];
        if (Y != null && Y.conversation_id) {
          const N = Y.conversation_id;
          P(N), d.current = N;
          try {
            const B = await me().get(N);
            if (S !== b.current) return;
            v(
              we(B.messages || []),
              B.head_id
            ), (x = l == null ? void 0 : l.setConversationId) == null || x.call(l, N, L);
          } catch {
            O([]), M(null);
          }
        }
      } else L && await $(L, S);
    } catch (l) {
      console.warn("[reader-ai] delete session failed", l), f(s("k_f60f2148"));
    } finally {
      S === b.current && m(!1);
    }
  }, [v, e, $, a]), A = G(async (y, g) => {
    const S = `${y || ""}`.trim(), h = `${g || ""}`.replace(/\s+/g, " ").trim();
    if (!S || !h || a) return;
    m(!0), f("");
    const C = ++b.current;
    try {
      const T = h.slice(0, 80);
      if (await me().patch(S, { title: T }), C !== b.current) return;
      z(
        (l) => l.map(
          (L) => L.conversation_id === S ? { ...L, title: T } : L
        )
      );
      const x = w.current;
      x && await $(x, C);
    } catch (T) {
      console.warn("[reader-ai] rename session failed", T), f(s("k_e48280fa"));
    } finally {
      C === b.current && m(!1);
    }
  }, [$, a]);
  return {
    adoptRemoteConversationId: D,
    newSession: _,
    branchFromAnswer: k,
    removeSession: I,
    renameSession: A
  };
}
function er(t) {
  var ie;
  const {
    jobId: e,
    documentId: n = "",
    enabled: a,
    remoteAnswerer: i = null,
    stream: r = Un
  } = t, [c, u] = U([]), [p, d] = U(null), [w, b] = U([]), [R, m] = U(""), [f, P] = U(!1), [O, M] = U(""), z = j(c), $ = j(p), v = j(R), D = j(!1), _ = j(""), k = j(""), I = j(0), A = j(0), y = j(r);
  y.current = r;
  const g = j(i);
  g.current = i, z.current = c, $.current = p, v.current = R;
  const S = G(async (ee = "", W) => {
    const X = `${ee || k.current || ""}`.trim(), Q = ++A.current;
    if (!X)
      return Q === A.current && (W === void 0 || W === I.current) && b([]), [];
    try {
      const K = me();
      if (!K) return null;
      const le = (await K.list({ document_id: X, limit: 50 })).conversations || [];
      return Q === A.current && X === `${k.current || ""}`.trim() && (W === void 0 || W === I.current) ? (b(le), le) : null;
    } catch {
      return null;
    }
  }, []), h = G((ee, W) => {
    var K;
    const X = Te(ee), Q = `${W || ""}`.trim() || ((K = X[X.length - 1]) == null ? void 0 : K.message.id) || null;
    u(X), d(Q), y.current.showMessages(de(X, Q));
  }, []), C = G(() => `${n || k.current || e}`.trim(), [n, e]);
  Jn({
    jobId: e,
    documentId: n,
    enabled: a,
    refreshSessions: S,
    applyConversationTree: h,
    remoteRef: g,
    streamRef: y,
    itemsRef: z,
    documentIdRef: k,
    lastJobRef: _,
    persistReadyRef: D,
    switchTokenRef: I,
    sessionListGenerationRef: A,
    activeConversationIdRef: v,
    setItems: u,
    setHeadId: d,
    setSessions: b,
    setActiveConversationId: m,
    setSessionBusy: P
  }), Xn({
    jobId: e,
    documentId: n,
    items: c,
    headId: p,
    activeConversationId: R,
    documentIdRef: k,
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
  ), L = J(
    () => Vn(c),
    [c]
  ), V = J(() => Qn({ setItems: u, setHeadId: d, itemsRef: z, headIdRef: $ }), []), {
    adoptRemoteConversationId: q,
    newSession: F,
    branchFromAnswer: Y,
    removeSession: N,
    renameSession: B
  } = Zn({
    jobId: e,
    documentId: n,
    sessionBusy: f,
    sessions: w,
    streamRef: y,
    remoteRef: g,
    itemsRef: z,
    headIdRef: $,
    activeConversationIdRef: v,
    documentIdRef: k,
    switchTokenRef: I,
    persistReadyRef: D,
    setSessionBusy: P,
    setSessionError: M,
    setActiveConversationId: m,
    setItems: u,
    setHeadId: d,
    setSessions: b,
    refreshSessions: S,
    applyConversationTree: h
  }), Z = G(async (ee) => {
    var K, oe, le, pe, Ee, Pe, Oe, De;
    const W = `${ee || ""}`.trim(), X = v.current || ((oe = (K = g.current) == null ? void 0 : K.getConversationId) == null ? void 0 : oe.call(K)) || "";
    if (!W || W === X || f) return;
    await y.current.stopStream(), fe(1200), ce(1200), P(!0), M("");
    const Q = ++I.current;
    D.current = !1, m(W), v.current = W, u([]), d(null), y.current.clearMessages();
    try {
      if (await new Promise((_e) => {
        window.setTimeout(_e, 80);
      }), Q !== I.current) return;
      try {
        (Ee = (pe = (le = globalThis.document) == null ? void 0 : le.activeElement) == null ? void 0 : pe.blur) == null || Ee.call(pe);
      } catch {
      }
      const te = g.current, re = k.current || `${await ((Pe = te == null ? void 0 : te.getDocumentId) == null ? void 0 : Pe.call(te)) || ""}`.trim();
      if (Q !== I.current) return;
      k.current = re;
      const ue = me();
      if (!ue) throw new Error("Reader conversations unavailable");
      const Ce = await ue.get(W);
      if (Q !== I.current) return;
      fe(800), ce(800);
      const Ne = we(Ce.messages || []);
      if (h(Ne, Ce.head_id), (Oe = te == null ? void 0 : te.setConversationId) == null || Oe.call(te, W, re), D.current = !0, Ne.length) {
        const _e = Te(Ne);
        xe(
          { jobId: e, documentId: re },
          $e(
            _e,
            `${Ce.head_id || ""}`.trim() || ((De = _e.at(-1)) == null ? void 0 : De.message.id) || null
          ),
          W
        );
      } else
        ge({ jobId: e, documentId: re }, W);
      re && await S(re, Q), fe(350), ce(350);
    } catch (te) {
      if (console.warn("[reader-ai] switch session failed", te), Q === I.current) {
        M(s("k_cc738df5"));
        const re = tt(
          { jobId: e, documentId: n || k.current },
          W
        );
        if (re != null && re.items.length) {
          const ue = lt(re);
          u(ue.items), d(ue.headId), y.current.showMessages(de(ue.items, ue.headId));
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
    () => Yn(w, R, i),
    [w, R, i]
  ), se = J(() => ({
    refreshSessions: S,
    adoptRemoteConversationId: q,
    newSession: F,
    switchSession: Z,
    removeSession: N,
    renameSession: B,
    branchFromAnswer: Y
  }), [
    S,
    q,
    F,
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
    contentByMessageId: L,
    sessions: ne,
    activeConversationId: R || ((ie = i == null ? void 0 : i.getConversationId) == null ? void 0 : ie.call(i)) || "",
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
  const e = t, n = e.assistantMode === "operations" ? "operations" : e.assistantMode === "reading" ? "reading" : null, a = e.scope === "selection" || e.scope === "page" || e.scope === "document" ? e.scope : null;
  if (!n || !a) return null;
  const i = e.context && typeof e.context == "object" && !Array.isArray(e.context) ? { ...e.context } : null;
  return { assistantMode: n, scope: a, context: i };
}
function Ke(t, e, n) {
  var r;
  const a = `${t || ""}`.trim(), i = `${e || ""}`.trim();
  if (!(!a || !i))
    try {
      (r = globalThis.localStorage) == null || r.setItem(
        ut(a, i),
        JSON.stringify(n)
      );
    } catch {
    }
}
function We(t, e) {
  var i;
  const n = `${t || ""}`.trim(), a = `${e || ""}`.trim();
  if (!n || !a) return null;
  try {
    const r = (i = globalThis.localStorage) == null ? void 0 : i.getItem(ut(n, a));
    return r ? rr(JSON.parse(r)) : null;
  } catch {
    return null;
  }
}
function sr(t) {
  const e = `${t.scopeKey || ""}`.trim(), n = `${t.jobId || ""}`.trim(), a = `${t.assistantMessageId || ""}`.trim();
  return We(e, a) || (e !== n ? We(n, a) : null) || nr;
}
function ar(t) {
  const { assistantMode: e, selectionContext: n } = t;
  return e === "operations" ? { assistantMode: e, scope: "document", context: null } : n ? { assistantMode: e, scope: "selection", context: { ...n } } : { assistantMode: e, scope: "document", context: null };
}
function ir(t) {
  var D;
  const { jobId: e, assistantMode: n, selectionContext: a = null, tree: i, chat: r, getScopeKey: c } = t, u = j(i);
  u.current = i;
  const p = j(r);
  p.current = r;
  const d = j(n);
  d.current = n;
  const w = j(a);
  w.current = a;
  const b = j(c);
  b.current = c;
  const R = r.status, m = R === "submitted" || R === "streaming", f = j(m);
  f.current = m;
  const P = m ? `${((D = jn(r.messages)) == null ? void 0 : D.id) || ""}` : "", O = r.messages, M = r.error;
  H(() => {
    if (!O.length) return;
    const _ = new Map(O.map((I) => [I.id, I])), k = /* @__PURE__ */ new Map();
    for (const [I, A] of _)
      k.set(I, Bn(A));
    u.current.mergeChatMirror(k);
  }, [O]), H(() => {
    !M || R !== "error" || u.current.markRunningAsError(M.message);
  }, [M, R]);
  const z = G(async (_) => {
    if (f.current) return;
    const k = `${_ || ""}`.trim();
    if (!k) return;
    const I = u.current, A = p.current, y = d.current, g = w.current, S = b.current(), h = I.readHeadId(), C = Se("u"), T = Se("a"), x = ar({
      assistantMode: y,
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
      question: k,
      progress: x.assistantMode === "operations" ? s("k_1f3fe5d6") : s("k_5a60e8d7")
    }), await A.sendUserMessage(
      { id: C, role: "user", parts: [{ type: "text", text: k }] },
      {
        body: {
          assistantMessageId: T,
          assistantMode: x.assistantMode,
          parentId: h,
          question: k,
          regenerate: !1,
          userMessageId: C,
          scope: x.scope,
          context: x.context
        }
      }
    );
  }, []), $ = G(async (_) => {
    if (f.current) return;
    const k = u.current, I = p.current, A = k.readItems(), y = A.find(
      (V) => V.message.id === _ && V.message.role === "assistant"
    ), g = (y == null ? void 0 : y.parentId) ?? null, S = g ? Fn(A, g) : null;
    let h = "", C = g;
    if ((S == null ? void 0 : S.role) === "user")
      h = S.content.trim();
    else {
      const V = de(A, g ?? k.readHeadId());
      for (let q = V.length - 1; q >= 0; q -= 1)
        if (V[q].role === "user") {
          h = V[q].content.trim(), C = V[q].id;
          break;
        }
    }
    if (!h) return;
    const T = Se("a"), x = C || g, l = b.current(), L = sr({
      scopeKey: l,
      jobId: e,
      assistantMessageId: _
    });
    Ke(l, T, L), k.appendRetryTurn({ assistantId: T, branchParent: x }), I.replaceVisible(dt(de(A, _))), await I.regenerateFrom({
      messageId: _,
      body: {
        assistantMessageId: T,
        assistantMode: L.assistantMode,
        parentId: x,
        question: h,
        regenerate: !0,
        userMessageId: C || "",
        scope: L.scope,
        context: L.context
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
  signal: a,
  confirmationModeHint: i,
  onDocumentCommitted: r
}) {
  const [c, u] = U({}), [p, d] = U("explicit"), [w, b] = U(!1), [R, m] = U(!1), f = j(/* @__PURE__ */ new Set()), P = j(/* @__PURE__ */ new Set()), O = j(/* @__PURE__ */ new Set()), M = G((_, k = !1) => {
    _ != null && _.operation_id && u((I) => {
      const A = I[_.operation_id];
      return lr(A == null ? void 0 : A.operation, _) ? {
        ...I,
        [_.operation_id]: {
          ...A,
          operation: _,
          pendingAction: void 0,
          error: void 0
        }
      } : !k || !(A != null && A.pendingAction) ? I : {
        ...I,
        [_.operation_id]: { ...A, pendingAction: void 0 }
      };
    });
  }, []), z = G(async (_, k = !1) => {
    const I = `${_ || ""}`.trim(), A = `refresh:${I}`;
    if (!(!I || f.current.has(A))) {
      f.current.add(A);
      try {
        const y = he();
        if (!y) return;
        M(await y.get(I), k);
      } catch {
      } finally {
        f.current.delete(A);
      }
    }
  }, [M]), $ = G(async () => {
    const _ = `${t || ""}`.trim(), k = `recover:${_}`;
    if (!(!e || !_ || f.current.has(k))) {
      f.current.add(k);
      try {
        const I = he();
        if (!I) return;
        const A = await I.list(_, {});
        if (!O.current.has(_)) {
          for (const y of A.operations || [])
            y.status === "committed" && P.current.add(y.operation_id);
          O.current.add(_);
        }
        for (const y of A.operations || []) M(y);
      } catch {
      } finally {
        f.current.delete(k);
      }
    }
  }, [t, e, M]);
  H(() => {
    if (!e) return;
    let _ = !1;
    const k = async () => {
      try {
        const A = he();
        if (!A) return;
        const y = await A.fetchRuntimeConfig();
        if (_) return;
        d(y.agent_confirmation_mode || "explicit"), m(!!y.llm_api_key_configured), b(
          y.restart_required || y.restart_state === "pending" || y.active_revision !== y.configured_revision
        );
      } catch {
        _ || (b(!1), m(!1));
      }
    };
    k();
    const I = window.setInterval(k, 3e3);
    return () => {
      _ = !0, window.clearInterval(I);
    };
  }, [e]), H(() => {
    i && d(i);
  }, [i]), H(() => {
    a != null && a.confirmationMode && d(a.confirmationMode), a != null && a.operationId && z(a.operationId);
  }, [z, a]), H(() => {
    $();
  }, [$]), H(() => {
    n || $();
  }, [n, $]);
  const v = J(
    () => Object.values(c).filter((_) => !!t && _.operation.conversation_id === t).sort((_, k) => `${_.operation.created_at || ""}`.localeCompare(`${k.operation.created_at || ""}`)),
    [t, c]
  );
  H(() => {
    var _;
    for (const k of v) {
      const I = k.operation;
      I.status !== "committed" || P.current.has(I.operation_id) || (P.current.add(I.operation_id), r == null || r({
        documentId: I.document_id,
        revision: ((_ = I.candidate) == null ? void 0 : _.version_id) || `${I.updated_at || ""}` || `${I.operation_id}:${dr(I)}`
      }));
    }
  }, [v, r]);
  const D = v.some((_) => Ue(_.operation.status, p));
  return H(() => {
    if (!e || !t || !n && !D) return;
    const _ = window.setInterval(() => {
      $();
      for (const k of v)
        Ue(k.operation.status, p) && z(k.operation.operation_id);
    }, 1400);
    return () => window.clearInterval(_);
  }, [p, t, n, e, v, D, $, z]), H(() => {
    if (!e) return;
    const _ = () => void $(), k = () => {
      document.visibilityState === "visible" && _();
    };
    return window.addEventListener("online", _), document.addEventListener("visibilitychange", k), () => {
      window.removeEventListener("online", _), document.removeEventListener("visibilitychange", k);
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
  inFlightRef: a
}) {
  const i = j(/* @__PURE__ */ new Map());
  return { perform: G(async (c, u, p = {}) => {
    const d = `${u.operation_id || ""}`.trim(), w = `action:${d}`;
    if (!d || a.current.has(w)) return;
    if (c === "retry" && u.status === "ambiguous" && p.acceptDuplicateRisk !== !0) {
      n((m) => ({
        ...m,
        [d]: {
          ...m[d],
          error: s("k_c5c0c047")
        }
      }));
      return;
    }
    const b = hr(d, c, i.current);
    a.current.add(w), n((m) => ({
      ...m,
      [d]: { ...m[d], pendingAction: c, error: void 0 }
    }));
    const R = {
      idempotency_key: b,
      expected_status: u.status,
      expected_attempt: u.current_attempt,
      expected_program_sha256: u.program_sha256 || ""
    };
    try {
      const m = he();
      if (!m) throw new Error("Reader AI operations unavailable");
      let f;
      c === "run" ? f = await m.run(d, R) : c === "cancel" ? f = await m.cancel(d, { ...R, reason: "user_rejected" }) : c === "commit" ? f = await m.commit(d, R) : f = await m.retry(d, p.acceptDuplicateRisk ? { ...R, accept_duplicate_risk: !0 } : R), He(d, c, i.current), e(f, !0);
    } catch (m) {
      ur(m) === 409 ? (He(d, c, i.current), await t(d, !0)) : n((f) => ({
        ...f,
        [d]: {
          ...f[d],
          pendingAction: void 0,
          error: fr(m)
        }
      }));
    } finally {
      a.current.delete(w);
    }
  }, [t, e]) };
}
function kr({
  conversationId: t,
  enabled: e,
  discovering: n,
  signal: a,
  confirmationModeHint: i,
  onDocumentCommitted: r
}) {
  const c = pr({
    conversationId: t,
    enabled: e,
    discovering: n,
    signal: a,
    confirmationModeHint: i,
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
function _r(t) {
  var A;
  const {
    jobId: e,
    documentId: n = "",
    sessionIdentity: a = "",
    enabled: i,
    selectionContext: r = null,
    onDocumentCommitted: c
  } = t, u = `${e}\0${n}\0${a}`, [p, d] = U("reading"), [w, b] = U(null), [R, m] = U();
  H(() => {
    d("reading"), b(null), m(void 0);
  }, [u]);
  const f = J(() => {
    var y;
    return !i || !e ? null : ((y = ze()) == null ? void 0 : y.createRemoteAnswerer({ jobId: e, documentId: n })) ?? Et({ jobId: e, documentId: n });
  }, [n, i, e]), P = J(() => {
    var y;
    return !i || !e ? null : ((y = ze()) == null ? void 0 : y.createLocalAnswerer({ jobId: e })) ?? Gt({
      loadMarkdownPayload: Pt.loadMarkdownPayload
    });
  }, [i, e]), O = j(null), M = Ln({
    jobId: e,
    enabled: i,
    remoteAnswerer: f,
    localAnswerer: P,
    assistantMode: p,
    onAgentOperationSignal: (y) => {
      b({ ...y, nonce: Date.now() + Math.random() });
    },
    onConfirmationMode: m,
    onStopped: () => {
      var y;
      return (y = O.current) == null ? void 0 : y.markRunningCancelled();
    }
  }), z = J(() => ({
    messages: M.messages,
    status: M.status,
    error: M.error,
    sendUserMessage: (y, g) => M.sendMessage(
      y,
      g
    ),
    regenerateFrom: (y) => M.regenerate(
      y
    ),
    stopStream: () => M.stop(),
    replaceVisible: (y) => M.setMessages([...y])
  }), [M]), $ = J(() => ({
    stopStream: () => z.stopStream(),
    clearMessages: () => z.replaceVisible([]),
    showMessages: (y) => z.replaceVisible(dt(y))
  }), [z]), v = er({
    jobId: e,
    documentId: n,
    enabled: i,
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
  }), _ = v.activeConversationId || (w == null ? void 0 : w.conversationId) || `${((A = f == null ? void 0 : f.getConversationId) == null ? void 0 : A.call(f)) || ""}`.trim(), k = kr({
    conversationId: _,
    enabled: i,
    discovering: D.isRunning,
    signal: w,
    confirmationModeHint: R,
    onDocumentCommitted: c
  }), I = j(!1);
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
    agentOperations: k,
    assistantMode: p,
    setAssistantMode: d
  };
}
function zr({
  open: t,
  jobId: e,
  documentId: n = "",
  sessionIdentity: a = "",
  onClose: i,
  onJumpCitation: r,
  onDocumentCommitted: c,
  layout: u = "floating",
  side: p = "right",
  selectionContext: d = null,
  onClearSelectionContext: w
}) {
  const b = t && !!e, {
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
    submitQuestion: _,
    retryAnswer: k,
    cancelAnswer: I,
    newSession: A,
    switchSession: y,
    removeSession: g,
    renameSession: S,
    branchFromAnswer: h,
    agentOperations: C,
    assistantMode: T,
    setAssistantMode: x
  } = _r({
    jobId: e,
    documentId: n,
    sessionIdentity: a,
    enabled: b,
    selectionContext: d,
    onDocumentCommitted: c
  }), [l, L] = U(""), V = G(async (F) => {
    L(""), await h(F) && (L(
      s("k_ecebbb97")
    ), window.setTimeout(() => L(""), 6e3));
  }, [h]), q = G((F) => {
    r(F);
  }, [r]);
  return /* @__PURE__ */ o(
    Ot,
    {
      id: "reader-ai-panel",
      open: t,
      title: "RetainPDF AI",
      titleIcon: /* @__PURE__ */ o(ke, { size: 14, strokeWidth: 2.1, "aria-hidden": !0 }),
      storageKey: "retainpdf.reader.ai-float.pos.v2",
      ariaLabel: s("k_8e7621d7"),
      width: 420,
      placement: u === "workspace" ? "workspace" : u === "docked" ? "dock-right" : "floating",
      showHeader: u !== "workspace",
      className: `reader-float-ai is-${u}${u === "workspace" ? ` is-pane-${p}` : ""}${$ ? " is-session-busy" : ""}`,
      onClose: i,
      children: e ? /* @__PURE__ */ E("div", { className: "reader-float-ai-body", children: [
        /* @__PURE__ */ o(
          Pn,
          {
            sessions: M,
            activeId: z,
            busy: $,
            errorText: v,
            onSwitch: y,
            onNew: A,
            onDelete: g,
            onRename: S
          }
        ),
        l ? /* @__PURE__ */ o("div", { className: "aui-session-banner", role: "status", children: l }) : null,
        /* @__PURE__ */ o("div", { className: "reader-float-ai-thread-wrap", "aria-busy": $ || void 0, children: /* @__PURE__ */ o(
          En,
          {
            jobId: e,
            messages: D,
            citationsByMessageId: R,
            progressByMessageId: m,
            contentByMessageId: f,
            streamingAssistantId: P,
            isRunning: O,
            onSubmit: _,
            onRetry: k,
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
        /* @__PURE__ */ o(ke, { size: 22, strokeWidth: 1.75, "aria-hidden": !0 }),
        /* @__PURE__ */ o("p", { children: s("k_05f5a0fc") }),
        /* @__PURE__ */ o("span", { children: s("k_074e206d") })
      ] })
    }
  );
}
export {
  zr as ReaderAiPanel
};
//# sourceMappingURL=ReaderAiPanel-DcFh5eCN.js.map
