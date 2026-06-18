# 墨与码 · sketch-blog

一个手绘风的个人博客 —— 简洁素描风，纯 VuePress 2。

> 站点预览：https://zhao-heng-sheng.github.io/sketch-blog/

## ✦ 项目结构

```
sketch-blog/
├── docs/                              # VuePress 源码
│   ├── .vuepress/
│   │   ├── config.ts                  # 站点配置
│   │   └── theme/
│   │       ├── index.js               # 主题入口
│   │       └── Layout.vue             # 自定义布局（导航 + 页脚 + 全局样式）
│   ├── README.md                      # 首页
│   ├── blog/
│   │   ├── README.md                  # 随笔列表（带标签筛选 + 分页）
│   │   └── 2026/                      # 按日期归档
│   │       ├── 06/14/sketch-blog-start.md
│   │       ├── 06/02/nas-cosyvoice-pitfalls.md
│   │       └── 05/28/chrome-extension-ai-api.md
│   ├── about/README.md                # 关于页
│   └── public/                        # 静态资源
│       └── favicon.svg
├── design/                            # Excalidraw 设计稿
│   ├── 01-homepage-hero.excalidraw
│   ├── 02-blog-list.excalidraw
│   ├── *.png                          # PNG 渲染版（手机看图用）
│   └── render_excalidraw.py           # 渲染脚本
├── package.json
└── .gitignore
```

## ✦ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev
# → http://localhost:8080

# 构建静态站
npm run docs:build
# → docs/.vuepress/dist/

# 本地预览构建结果
npm run docs:preview
```

## ✦ 风格规范

| 维度 | 规格 |
|---|---|
| 主色 | `#1e1e1e`（墨黑）|
| 辅色 | `#adb5bd` / `#868e96` / `#495057` |
| 背景 | 纯白 + `#f1f3f5` 笔记本 ruling 横线（每 32px 一条）|
| 中文字体 | 思源黑体（正文）+ 马善政体（标题手写）|
| 英文字体 | Caveat（英文手写）|
| 装饰 | 不规则圆角（`4px 12px 4px 12px / 12px 4px 12px 4px`）|
| 动画 | hover 时微抖动 + 偏移，0.2° rotate |

## ✦ 部署

自动部署到 GitHub Pages（计划中）：

```bash
npm run docs:build
# → 把 docs/.vuepress/dist/ 推到 gh-pages 分支
```

## ✦ License

MIT
