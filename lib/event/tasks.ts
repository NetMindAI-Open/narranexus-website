export interface EventTask {
  /** 1-based task number, matches event_task_submissions.task_number */
  number: number;
  title: string;
  /** One-line summary shown on the collapsed card. */
  summary: string;
  /** Fuller guidance shown when the card is expanded. */
  detail: string;
  /** Optional short tag rendered next to the title. */
  badge?: string;
  /** How many columns to lay the images out in (default 2). */
  imageColumns?: number;
  /** Optional submission deadline (ISO 8601 with timezone offset). */
  deadline?: string;
  /** Optional illustrative screenshots shown when the card is expanded. */
  images?: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  }[];
  /** Reward tiers, only used by the open-challenge task. */
  rewards?: { place: string; amount: string }[];
}

export const EVENT_TASKS: EventTask[] = [
  {
    number: 1,
    title: "安装 Office Agent",
    summary: "在 Marketplace 里找到 Office Agent，点击安装。",
    detail:
      "打开 Marketplace，找到 Office Agent 并点击安装。注意：目前 Agent Team 与 Artifacts 还不适配，请先使用单个 Agent。",
  },
  {
    number: 2,
    title: "体验 Agent 间通信和 Agent 的社交属性",
    summary: "新建两个 Agent，让一个去问另一个它收集到的信息。",
    detail:
      "先新建一个 Agent，直接告诉它名字并给它一个任务——例如复制粘贴「你叫小明，帮我查现在 A 股的热点信息」。接着再新建一个 Agent，然后让它去问刚刚那个 Agent，例如复制粘贴「问问小明他今天收集的 A 股信息」，看看它会不会把小明收集到的内容带回来汇报给你。",
    images: [
      {
        src: "/images/event/agent-create.png",
        alt: "点击「+」，选择 Create Agent 新建 Agent",
        caption: "① 点「+」→ Create Agent 新建",
        width: 602,
        height: 622,
      },
      {
        src: "/images/event/agent-astock-collect.png",
        alt: "告诉第一个 Agent 叫小明，让它去查 A 股热点信息",
        caption: "② 让第一个 Agent（小明）去查 A 股热点",
        width: 1924,
        height: 1622,
      },
      {
        src: "/images/event/agent-astock-ask.png",
        alt: "第二个 Agent 去问小明今天收集的 A 股信息并汇报",
        caption: "③ 新建第二个 Agent，让它去问小明",
        width: 1916,
        height: 1586,
      },
    ],
  },
  {
    number: 3,
    title: "接入 IM",
    summary: "把 Agent 接入微信或其他即时通讯工具。",
    detail:
      "将你的 Agent 接入微信，或其他你常用的 IM（如飞书、Telegram 等），让它能在你日常使用的聊天工具里直接为你服务。在右侧智能体菜单中点开「频道」，就能看到可绑定的 IM 频道，选择一个完成绑定即可。",
    images: [
      {
        src: "/images/event/im-channel-entry.png",
        alt: "在右侧智能体菜单中找到「频道」入口",
        caption: "① 右侧菜单点开「频道」",
        width: 338,
        height: 674,
      },
      {
        src: "/images/event/im-channels.png",
        alt: "IM 频道面板，可绑定 Lark、Slack、Telegram、WeChat 等",
        caption: "② 选择一个 IM 频道绑定",
        width: 544,
        height: 998,
      },
    ],
  },
  {
    number: 4,
    title: "设置一个定时任务",
    summary: "让 Agent 按计划自动执行一个定时任务。",
    detail:
      "打开刚刚那个小明 Agent，给它设置一个定时任务，让它按计划自动运行——比如直接说「设置一个定时任务，每天早上 9 点发一份 A 股简报」（在已接入的微信里跟它说同样的话也可以）。设置好后，在右侧「任务」面板里就能看到这个定时任务和它的下次运行时间。",
    imageColumns: 3,
    images: [
      {
        src: "/images/event/wechat-schedule.png",
        alt: "在微信里让 Agent 设置每天早上 9 点发 A 股简报的定时任务",
        caption: "① 在微信里让它设置定时任务",
        width: 923,
        height: 1150,
      },
      {
        src: "/images/event/task-entry.png",
        alt: "在右侧智能体菜单中找到「任务」入口",
        caption: "② 右侧菜单打开「任务」",
        width: 592,
        height: 1420,
      },
      {
        src: "/images/event/task-panel.jpg",
        alt: "任务面板中显示已创建的每日 A 股简报定时任务",
        caption: "③ 在「任务」里看到定时任务",
        width: 1256,
        height: 1724,
      },
    ],
  },
  {
    number: 5,
    title: "用 Office Agent 出一份成果",
    summary: "打开 Office Agent，写一个 Word 文档或做一个 PPT。",
    detail:
      "打开刚刚安装的 Office Agent，写一个 Word 文档或者做一个 PPT，内容自定即可。玩法很灵活——如果前面的任务还没做完，这一步可以先跳过。",
    badge: "可跳过",
  },
  {
    number: 6,
    title: "开放挑战",
    summary: "结合你的日常需求，做出一个真正能用的作品。",
    detail:
      "结合你自己的日常需求去解决一个真实问题——比如开发一个小软件，或设计一个整合金融周报的 Agent。我们会把优秀的作品分享到群里，并为最出色的三个方案发放奖励。尽情发挥！",
    badge: "开放赛",
    deadline: "2026-08-04T00:00:00+08:00",
    rewards: [
      { place: "第一名", amount: "$100" },
      { place: "第二名", amount: "$60" },
      { place: "第三名", amount: "$40" },
    ],
  },
];
