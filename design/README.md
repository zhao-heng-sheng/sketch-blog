# sketch-blog — 手绘风博客设计稿

> 一个用 VuePress 搭建的简洁素描风个人博客。

## 📂 项目结构

```
sketch-blog/
├── design/                              # 视觉设计稿（Excalidraw 手绘）
│   ├── 01-homepage-hero.excalidraw      # 首页 Hero
│   ├── 02-blog-list.excalidraw          # 博客列表页
│   ├── README.md                        # 本文件
│   └── preview.txt                      # ASCII 缩略图
└── (后续) docs/                          # VuePress 源码
```

## 🎨 视觉风格规范

| 维度 | 规格 |
|------|------|
| 主色 | `#1e1e1e`（深灰近黑） |
| 辅色 | `#adb5bd`（中灰）、`#868e96`（次要文字） |
| 背景 | `#ffffff` 纯白 + 浅灰 `#e9ecef` 横线（笔记本 ruling） |
| 中文字体 | `ZCOOL KuaiLe` / `Ma Shan Zheng` |
| 英文字体 | `Caveat` / `Patrick Hand` |
| 圆角 | 8-12px（按钮、卡片） |
| 装饰 | 手绘下划线、箭头、checkbox、涂鸦星 ✦ |
| 动画 | hover 时 stroke-dasharray 缓慢"画上去"，禁止抖动 |

## 🖼️ 视觉稿预览

### 01. 首页 Hero (`01-homepage-hero.excalidraw`)


┌──────────────────────────────────────────────────────────────────┐
│ ⊙ ink&code          home  blog  tags  about                     │
│ ──────────────────────────────────────────────────────────────── │
│ ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴ │
│ ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴ │
│                                                                  │
│  hello, I'm                                  ┌──────────────┐    │
│                                              │ ──────────── │    │
│  ┌─────────────────┐                         │ ─ ─ ─ ─ ─ ─ │    │
│  │    赵  恒  盛    │                         │ ──────────── │    │
│  └─────────────────┘                         │ ── ── ── ── │    │
│  ═══════════════════════════                  │ ──────────── │    │
│  一个写代码的人，偶尔也写点别的。             └──────┬───────┘    │
│                                                  ╲╱            │
│  [ read my notes → ]  [ about me ]                  ╭────╮       │
│                                                     │ ◡  │      │
│                                                     ╰────╯       │
│  recent posts                                                     │
│  ────                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                         │
│  │ 用 VuePress│  │ NAS 跑   │  │ Chrome  │                         │
│  │ 搭手绘博客│  │ CosyVoice│  │ 调 AI API│                         │
│  │ Jun 14 6m │  │ Jun 02 12│  │ May 28 8m│                         │
│  │ #vue #des │  │ #ml #tts │  │ #chr #ai │                         │
│  └──────────┘  └──────────┘  └──────────┘                         │
│  ──────────────────────────────────────────────────────────────  │
│  © 2026 赵恒盛 · built with vuepress + too much coffee           │
└──────────────────────────────────────────────────────────────────┘
  01 · homepage hero  ·  viewport 1440×900


### 02. 博客列表 (`02-blog-list.excalidraw`)


┌──────────────────────────────────────────────────────────────────┐
│ ⊙ ink&code          home  blog  tags  about                     │
│ ──────────────────────────────────────────────────────────────── │
│ ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴ │
│                                                                  │
│  writing log                            ○ ← ideas                │
│  ─────────                              ~ in progress ~          │
│  学到的、踩过的、值得记下来的。                                   │
│                                                                  │
│  filter by tag         Jun 14  用 VuePress 搭一个手绘风博客      │
│  ────                            今天开始搭博客了。选 vuepress…  │
│  ☑ #vuepress                    #vuepress  #design      · 6 min │
│  ☑ #mlops                       ─────────────────────────────── │
│  ☐ #chrome-ext   Jun 02  在 N5105 NAS 上跑 CosyVoice 的那些坑   │
│  ☐ #tts                       没有 GPU，8G 内存，纯 CPU 推理…    │
│  ☐ #design                     #mlops  #tts            · 12 min│
│  ☐ #ai                         ─────────────────────────────── │
│  ☐ #life          May 28  Chrome 扩展调用 Replicate / HF API 实战│
│                       Replicate 2024+ 接口变了…                  │
│  ─────────           #chrome  #ai               · 8 min         │
│  archive              ───────────────────────────────            │
│  2026 · 12 posts     May 20  南怀瑾 TTS 项目总结                  │
│  2025 · 47 posts     #tts  #rag                  · 15 min         │
│  2024 · 31 posts                                                   │
│                       ───────────────────────────────            │
│                       [ ← prev ]   1  2  3  ...  12   [ next → ] │
│  ──────────────────────────────────────────────────────────────  │
└──────────────────────────────────────────────────────────────────┘
  02 · blog list  ·  viewport 1440×900  ·  两栏布局: 侧栏筛选 + 列表


## 📖 如何查看视觉稿

1. 把 `.excalidraw` 文件拖到 [excalidraw.com](https://excalidraw.com)
2. 或用 VS Code 装 [Excalidraw 插件](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) 直接打开
3. Excalidraw 是开源的，本地版：[github.com/excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)

## ✏️ 反馈 & 修改

- 颜色/字号/间距不喜欢 → 直接告诉我，10 分钟改完重画
- 想加页面（关于页 / 文章详情 / 标签云 / 404）→ 说一声，加 1-2 张稿
- 确认风格后，开始搭 VuePress 项目骨架（npm + theme + 1 篇示例文章）
