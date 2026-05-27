# NarraNexus Portal MVP — 埋点实现方案

> 仅设计，不落码。基于本仓库现状（Next.js 16.2 App Router · `@next/third-parties` GA4 · Consent Mode v2 已就位）把规范里的事件落到具体文件 / 行号。

**Goal:** 把 portal_page_view、cta_click、copy_git_clone_command 三类事件挂到现有 CTA / 代码块上，输出口径与团队定义一致；并搭好 anonymous_id / session_id / source 的公共字段管道，可被后续 cloud_register_new_user 复用。

**Architecture:**

1. 新增一个客户端追踪库 `lib/analytics/track.ts`，对 `sendGAEvent` 做薄包装：自动注入公共字段（anonymous_id / session_id / source）、读取 consent 状态、consent=denied 时静默丢弃。
2. 新增 `components/analytics/page-view-tracker.tsx`，监听 App Router 路由变化（`usePathname` + `useSearchParams`），每次路由变化补发一条 `portal_page_view`（GA4 自带 page_view 不带我们的公共字段，所以补一条业务版）。
3. 在 6 个文件里把 CTA 包一层 `onClick={() => track('cta_click', { cta_name, cta_location })}`；给现有的 git clone 代码块加 `<CopyButton>`，触发 `copy_git_clone_command`。
4. invite 表单 submit 成功后触发 `cta_click: request_invite`；invite 页面挂载时触发 `cta_click: get_invite_code`（按规范这是"用户到达邀请页"的语义化事件）。

**Tech Stack:** Next.js 16.2 App Router · `@next/third-parties/google` 的 `sendGAEvent` · 现有 `nn-consent` localStorage key · React 19 client components.

---

## 0. 事件契约（与现有规范对齐 + 补全 schema）

所有事件统一通过 `sendGAEvent` 推入 `window.dataLayer`，公共字段在 `track()` 里自动合并。**user_id** 在 portal 始终不下发（portal 无登录态）；cloud 端再补。

### 0.1 公共字段（每条事件都带）

| 字段 | 来源 | 说明 |
|---|---|---|
| `anonymous_id` | `localStorage['nn-anonymous-id']`，UUID v4，consent=granted 时生成 | 同一浏览器跨会话稳定 |
| `session_id` | `sessionStorage['nn-session-id']`，UUID v4 | 关闭 tab 即失效；不实现 30min idle 重置，MVP 够用 |
| `source` | 常量 `"portal"` | 标识事件来自官网，便于和 cloud 数据合并 |
| `consent` | `localStorage['nn-consent']` 的值 | 留存调试用，不强制 |

### 0.2 事件清单

| event | 触发位置 | 额外字段 |
|---|---|---|
| `portal_page_view` | 首次 mount + 每次路由变化 | `page_path`、`page_title`、`referrer` |
| `cta_click` | 5 类 CTA 点击 | `cta_name`、`cta_location` |
| `copy_git_clone_command` | 复制 git clone 按钮 | `repo_url`、`utm_location` |

**cta_name × cta_location 映射表**（落到具体 DOM）：

| cta_name | cta_location | 触发 DOM |
|---|---|---|
| `try_online` | `hero` | `app/page.tsx:217-224`（"Try Online" 按钮 → agent.narra.nexus） |
| `try_online` | `docs_section` | `app/page.tsx:535-542`（Quick Start 区 Cloud 卡片"Open NarraNexus Web"） |
| `try_online` | `footer` | `components/footer.tsx:43`（Organization → Try Online） |
| `download_macos` | `hero` | 暂无 hero 下载按钮 → 不挂 |
| `download_macos` | `docs_section` | `app/page.tsx:557-564`（Quick Start 区 Desktop 卡片"Download latest release"） |
| `download_macos` | `docs_section` | `app/docs/getting-started/quick-start/page.tsx:172-180`（releases 链接） |
| `get_started` | `hero` | `app/page.tsx:225-230`（"Get Started" 按钮 → /docs/getting-started/quick-start） |
| `get_started` | `navbar` | `components/header.tsx:91-96` + `:154-159`（桌面 + 移动） |
| `get_invite_code` | `navbar` | `components/header.tsx` `navItems` 里 "Request Access" 项 → 在每个 Link 上挂 onClick |
| `get_invite_code` | `login_page` | invite 页 mount 即发（mount = 用户到达） |
| `request_invite` | `login_page` | invite 表单 POST 成功后（拿到 issued / waitlisted / already_registered） |

> **未覆盖项**：`cloud_register_new_user`（按你的说明先不做）、`docs_section` 内的下载链 `app/docs/getting-started/quick-start/page.tsx:172`（已列入但属补全）、`Templates [slug]` 的 InstallButton（marketplace 不在 MVP 三条链路里 → 暂不挂，留位置）。

---

## File Structure

| 路径 | 状态 | 责任 |
|---|---|---|
| `lib/analytics/track.ts` | **新建** | `track(event, props)` 主入口 + id 管理 + consent gate |
| `lib/analytics/types.ts` | **新建** | `CtaName`、`CtaLocation`、`TrackEvent` 类型 |
| `components/analytics/page-view-tracker.tsx` | **新建** | App Router 路由变化监听 → 补发 `portal_page_view` |
| `components/analytics/copy-button.tsx` | **新建** | 包一个 `<button>` 拷贝传入文本并发 `copy_git_clone_command` |
| `app/layout.tsx` | **改** | 在 `<body>` 内挂 `<PageViewTracker />`（gated by `analyticsEnabled`） |
| `app/page.tsx` | **改** | Hero/Quick Start 5 个 CTA 各加 `onClick`；Quick Start "From Source" 代码块替换为 `<CopyButton>` |
| `components/header.tsx` | **改** | "Get Started"×2 + "Request Access" Link 加 onClick |
| `components/footer.tsx` | **改** | "Try Online" Link 加 onClick；为此 footer 改成 client component 或抽出一个 `<TrackedLink>` |
| `app/invite/page.tsx` | **改** | mount 时发 `get_invite_code`；submit 成功后发 `request_invite` |
| `app/docs/getting-started/quick-start/page.tsx` | **改** | git clone `<pre>` 替换为 `<CopyButton>`；下载 releases 链加 `download_macos` |

---

## Task 1: 公共字段 + consent gate（`lib/analytics/track.ts`）

**Files:**
- Create: `lib/analytics/types.ts`
- Create: `lib/analytics/track.ts`

`lib/analytics/types.ts`:

```ts
export type CtaName =
  | "try_online"
  | "download_macos"
  | "get_started"
  | "get_invite_code"
  | "request_invite";

export type CtaLocation =
  | "hero"
  | "navbar"
  | "footer"
  | "login_page"
  | "docs_section";

export type TrackPayload =
  | { event: "portal_page_view"; page_path: string; page_title: string; referrer: string }
  | { event: "cta_click"; cta_name: CtaName; cta_location: CtaLocation }
  | { event: "copy_git_clone_command"; repo_url: string; utm_location: string };
```

`lib/analytics/track.ts`（核心逻辑示意，**消费现有 `nn-consent` key**，与 `components/analytics/consent-banner.tsx:5` 保持一致）:

```ts
"use client";
import { sendGAEvent } from "@next/third-parties/google";
import type { TrackPayload } from "./types";

const CONSENT_KEY = "nn-consent";       // 与 consent-banner.tsx 一致
const ANON_KEY = "nn-anonymous-id";
const SESSION_KEY = "nn-session-id";
const SOURCE = "portal";

function hasConsent(): boolean {
  try { return localStorage.getItem(CONSENT_KEY) === "granted"; } catch { return false; }
}

function uuid(): string {
  // crypto.randomUUID 在所有目标浏览器都可用（Next 16 要求 Node 20+，浏览器对应较新）
  return crypto.randomUUID();
}

function getOrCreate(storage: Storage, key: string): string {
  let v = storage.getItem(key);
  if (!v) { v = uuid(); storage.setItem(key, v); }
  return v;
}

export function track(payload: TrackPayload): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;            // consent=denied / 未决定 → 丢弃

  const anonymous_id = getOrCreate(localStorage, ANON_KEY);
  const session_id = getOrCreate(sessionStorage, SESSION_KEY);

  sendGAEvent("event", payload.event, {
    ...payload,
    anonymous_id,
    session_id,
    source: SOURCE,
  });
}
```

**设计决策：**
- 不持久化 anonymous_id 直到 consent=granted。这意味着 consent=denied 时所有事件被丢弃 —— 符合 GDPR、和当前 `ConsentDefault` 的 `analytics_storage: denied` 一致。
- `sendGAEvent("event", name, params)` 等价于 `gtag('event', name, params)` —— GA4 会以 `name` 建事件，所有 params 作为 custom params。**团队需在 GA4 后台把 `anonymous_id` / `session_id` / `source` / `cta_name` / `cta_location` / `repo_url` / `utm_location` 注册为 Custom Dimensions** 才能在报告里看到。
- 不实现"30 min idle 重置 session"，MVP 用 `sessionStorage` 自然失效（关 tab 即重置）。

---

## Task 2: 路由变化埋 `portal_page_view`

**Files:**
- Create: `components/analytics/page-view-tracker.tsx`
- Modify: `app/layout.tsx:117`（在 `<ConsentBanner />` 旁挂上）

```tsx
"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

export function PageViewTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => {
    const qs = search?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    track({
      event: "portal_page_view",
      page_path,
      page_title: document.title,
      referrer: document.referrer,
    });
  }, [pathname, search]);
  return null;
}
```

> **注意 Next 16 行为**：`useSearchParams()` 在 Server Component 树里需要被 `<Suspense>` 包裹。挂在 `<body>` 里时建议外面套一个 `<Suspense fallback={null}>`。先看 `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md` 再写（项目 AGENTS.md 强调过这点）。

`app/layout.tsx` 改动（在第 117 行附近）：

```tsx
{analyticsEnabled && (
  <Suspense fallback={null}>
    <PageViewTracker />
  </Suspense>
)}
{analyticsEnabled && <ConsentBanner />}
```

**和 GA4 自带 page_view 的关系**：GA4 通过 `gtag('config', gaId)` 会自动发 `page_view`。我们这条 `portal_page_view` 是**额外的、带业务字段的**版本，不替换 GA4 的默认事件。看板上可以两条并存，团队后续根据需要保留其一。

---

## Task 3: Hero 区三个 CTA（`app/page.tsx`）

**Files:**
- Modify: `app/page.tsx:217-238`（Try Online / Get Started / GitHub）
- Modify: `app/page.tsx:535-564`（Quick Start 区 Cloud + Desktop 卡）
- Modify: `app/page.tsx:578-584`（git clone 代码块 → CopyButton）

文件已经是 `"use client"`，直接挂 onClick 即可。改动示意：

```tsx
// app/page.tsx:217-224
<a
  href="https://agent.narra.nexus"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => track({ event: "cta_click", cta_name: "try_online", cta_location: "hero" })}
  className="..."
>
  Try Online
</a>

// app/page.tsx:225-230
<Link
  href="/docs/getting-started/quick-start"
  onClick={() => track({ event: "cta_click", cta_name: "get_started", cta_location: "hero" })}
  className="..."
>
  Get Started
</Link>

// app/page.tsx:535-542（Quick Start Cloud 卡）
<a
  href="https://agent.narra.nexus"
  onClick={() => track({ event: "cta_click", cta_name: "try_online", cta_location: "docs_section" })}
  ...
>Open NarraNexus Web</a>

// app/page.tsx:557-564（Quick Start Desktop 卡）
<a
  href="https://github.com/NetMindAI-Open/NarraNexus/releases/latest"
  onClick={() => track({ event: "cta_click", cta_name: "download_macos", cta_location: "docs_section" })}
  ...
>Download latest release →</a>
```

git clone 代码块（`app/page.tsx:578-584`）替换为：

```tsx
<CopyButton
  text="git clone https://github.com/NetMindAI-Open/NarraNexus.git && bash run.sh"
  utm_location="home_quick_start"
/>
```

**GitHub 按钮（hero 第三个，`app/page.tsx:231-238`）**：规范 5 个 cta_name 里没有专门的 GitHub，先**不挂**。如果团队后期想统计可扩 `cta_name: "open_github"`。

---

## Task 4: Navbar — Header（`components/header.tsx`）

**Files:**
- Modify: `components/header.tsx:14`（navItems 数组）
- Modify: `components/header.tsx:72-86`（桌面 nav 渲染）
- Modify: `components/header.tsx:91-96`（桌面 "Get Started"）
- Modify: `components/header.tsx:154-159`（移动 "Get Started"）

`Request Access` 项埋点：在 `navItems` 里给那一项加一个可选字段 `track?: { cta_name, cta_location }`，渲染时按字段挂 onClick。示意：

```tsx
const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs/getting-started/quick-start" },
  { label: "Blog", href: "/blog" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Request Access", href: "/invite",
    track: { cta_name: "get_invite_code", cta_location: "navbar" } as const },
  { label: "GitHub", href: "https://...", external: true },
];

// 渲染时：
<Link
  onClick={item.track ? () => track({ event: "cta_click", ...item.track }) : undefined}
  ...
>{item.label}</Link>
```

桌面 + 移动两个 "Get Started" 按钮：

```tsx
<Link
  href="/docs/getting-started/quick-start"
  onClick={() => track({ event: "cta_click", cta_name: "get_started", cta_location: "navbar" })}
  className="..."
>Get Started</Link>
```

---

## Task 5: Footer "Try Online"（`components/footer.tsx`）

**Files:**
- Modify: `components/footer.tsx`

当前 `Footer` 是 **server component**。两种选择：

- **A（推荐）**：整个 footer 改成 `"use client"`，最简单。footer 体量小、无 SEO 关键内容。
- B：抽出一个 `<TrackedLink>` client 子组件，只把 "Try Online" 那条用它渲染，其它链接仍为 server 渲染。

A 方案改动：文件顶部加 `"use client"`，import `track`，把 `footerSections[3].links[1]`（Try Online）渲染时单独加 onClick：

```tsx
<Link
  href={link.href}
  onClick={
    link.label === "Try Online"
      ? () => track({ event: "cta_click", cta_name: "try_online", cta_location: "footer" })
      : undefined
  }
  ...
>
```

> 同时可以考虑给 footer 里的 GitHub 也挂，规范里没列 → 暂不挂。

---

## Task 6: Invite 页（`app/invite/page.tsx`）

**Files:**
- Modify: `app/invite/page.tsx`

两个埋点：

1. **mount 时**发 `cta_click: get_invite_code, cta_location: login_page`
   语义：用户到达了请求邀请页。在 component body 顶部加 `useEffect` 一次性触发。
2. **submit 成功后**发 `cta_click: request_invite, cta_location: login_page`
   位置：`app/invite/page.tsx:38-48`，在 `if (!data.success) return;` 之后、`setOutcome(...)` 之前调用 `track(...)`。

```tsx
useEffect(() => {
  track({ event: "cta_click", cta_name: "get_invite_code", cta_location: "login_page" });
}, []);

// 在 submit 成功分支里：
track({ event: "cta_click", cta_name: "request_invite", cta_location: "login_page" });
```

**注意**：`get_invite_code` 在 navbar 和 login_page 都会发，按 `cta_location` 区分。如果团队认为 mount-fire 太重，可降级为"用户点了 Request invite 按钮但还没提交"那种 onClick，再讨论。

---

## Task 7: CopyButton 组件 + `copy_git_clone_command`

**Files:**
- Create: `components/analytics/copy-button.tsx`
- Modify: `app/page.tsx:578-584`
- Modify: `app/docs/getting-started/quick-start/page.tsx:33-39`（local 模式 git clone）
- Modify: `app/docs/contributing/development-setup/page.tsx:50` 附近（contributing 区 git clone，**酌情**）

```tsx
"use client";
import { useState } from "react";
import { track } from "@/lib/analytics/track";

interface Props {
  text: string;
  utm_location: string;       // "home_quick_start" | "docs_quick_start_local" | ...
  repoUrl?: string;           // 默认 NarraNexus repo
}

export function CopyButton({ text, utm_location, repoUrl = "https://github.com/NetMindAI-Open/NarraNexus" }: Props) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); } catch {}
    track({ event: "copy_git_clone_command", repo_url: repoUrl, utm_location });
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="border border-rule bg-paper-2/30 p-3 flex items-start gap-3">
      <code className="font-mono text-xs text-ink break-all leading-relaxed flex-1">{text}</code>
      <button
        type="button"
        onClick={onClick}
        className="font-mono text-[10px] uppercase tracking-wider text-muted hover:text-ink shrink-0"
      >{copied ? "Copied" : "Copy"}</button>
    </div>
  );
}
```

`utm_location` 取值约定：
- `home_quick_start` — 首页 Quick Start 区
- `docs_quick_start_local` — docs/getting-started/quick-start 的 Local 模式
- `docs_contributing_dev_setup` — docs/contributing/development-setup（如果挂）

---

## Task 8: docs/quick-start 下载链 `download_macos`

**Files:**
- Modify: `app/docs/getting-started/quick-start/page.tsx:172-180`

文件已经是 `"use client"`，直接：

```tsx
<a
  href="https://github.com/NetMindAI-Open/NarraNexus/releases"
  onClick={() => track({ event: "cta_click", cta_name: "download_macos", cta_location: "docs_section" })}
  ...
>releases page</a>
```

---

## Task 9: 联调 + GA4 后台配置

**Files:** 无代码改动，是上线动作。

1. **本地验证（dev 模式不会真的发 GA）**：
   `analyticsEnabled = process.env.NODE_ENV === "production" && Boolean(gaId)` —— dev 模式不挂 GA。`track()` 函数同样会 no-op（因为 sendGAEvent 在没初始化时只 console.warn）。验证 dev 体验：手动把 `analyticsEnabled` 临时设为 `true`，在 DevTools Network 面板看 `collect?v=2` 请求和 payload。
2. **GA4 Realtime 验证**：production build 后用 GA4 → Reports → Realtime → Event count by Event name，确认能看到 `portal_page_view` / `cta_click` / `copy_git_clone_command`。
3. **GA4 Custom Dimensions 注册**（关键，否则报告里看不到我们的字段）：Admin → Custom definitions → Custom dimensions，把以下 event-scoped 维度都注册一次：`anonymous_id`、`session_id`、`source`、`cta_name`、`cta_location`、`repo_url`、`utm_location`、`page_path`、`page_title`。
4. **funnel 校验**：在 GA4 → Explore → Funnel exploration，按以下步骤建漏斗确认 4.1 链路通：
   - Step1: event = `portal_page_view`
   - Step2: event = `cta_click` AND `cta_name` = `try_online`
   - 后续两步（`get_invite_code`、`request_invite`）属同一漏斗，可串到这条上看 portal 内部链路。

---

## 三条链路覆盖确认

**4.1 Cloud 注册（portal 侧能覆盖到第 4 步）**:

```
portal_page_view              ← Task 2 自动
↓
cta_click: try_online         ← Task 3（hero / docs_section / footer 任一）
↓
cloud_login_page_view         ← 由 agent.narra.nexus 负责，不在本仓库
↓
cta_click: get_invite_code    ← Task 4 (navbar) / Task 6 (login_page mount)
↓
cta_click: request_invite     ← Task 6 表单成功
↓
cloud_register_new_user       ← 你说先跳过
```

---

## 自检（Self-Review）

- **Spec 覆盖**：5 个 cta_name × 5 个 cta_location 的合法组合全部映射到具体 DOM；`copy_git_clone_command` 覆盖首页 + docs；`portal_page_view` 覆盖首次进入 + SPA 路由切换。✅
- **Placeholder 扫描**：每个 Task 给了完整代码片段、文件路径、行号。无 "TODO / 类似" 字样。✅
- **类型一致性**：`TrackPayload` 用 discriminated union，`event` 字段决定其他字段类型 → 调用 `track({ event: "cta_click", cta_name: "..." })` 时 TS 会卡掉漏字段。✅
- **Consent**：`track()` 内显式读 `nn-consent` localStorage，denied / 未决定 → 全部丢弃，与 `ConsentDefault.tsx` 的默认拒绝姿态一致。✅
- **Footer 是 server component**：Task 5 已经显式标出来要么整体改 client、要么抽 `<TrackedLink>`，不会卡住执行。✅
- **风险点**：`useSearchParams()` 在 Next 16 需要 Suspense 包裹（Task 2 已注明）；`crypto.randomUUID()` 在 HTTP（非 HTTPS）环境下不可用 —— portal 生产是 HTTPS，没问题；本地 dev 也是 localhost（视为安全上下文），可用。

---

## 执行建议

把 Task 1 + Task 2 作为第一个 PR（基建：track + page view），其余按 hero → navbar → footer → invite → quick-start → docs 顺序各一个 commit 进同一个 PR。Task 9 是上线后动作，单独安排。
