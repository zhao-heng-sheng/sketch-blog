---
title: VuePress 2 手绘风搭建笔记
date: 2026-06-17
tags: [VuePress, 工程]
---

# VuePress 2 手绘风搭建笔记

> 折腾了两天，总算把这个博客跑起来了。记一笔。

## 缘起

一直想开个博客，但 Jekyll/Hugo 的默认主题都太"程序员审美"了。
某天看到一位画师用 Excalidraw 画的博客设计稿，突然就上头了——
"我也要这种，像翻笔记本一样的感觉。"

## 技术选型

| 方案 | 优点 | 缺点 | 选不选 |
|---|---|---|---|
| Hexo | 生态成熟 | 主题丑 | ❌ |
| Hugo | 构建飞快 | Go 模板恶心 | ❌ |
| Astro | 现代 | 主题少 | ❌ |
| **VuePress 2** | 主题漂亮，可深度定制 | 配置复杂 | ✅ |

最后选了 VuePress 2。理由很简单：defaultTheme 底子够干净，CSS 变量全开放，方便我往手绘风硬掰。

## 关键踩坑

### 1. ESBuild 不会解析 `.vue` 文件

VuePress 2 RC 用 esbuild 预编译 theme entry，所以**自定义 `Layout.vue` 不会被 esbuild 处理**。

试过的弯路：

1. 加 `@vuepress/bundler-vite` → 没用，webpack 路径下 esbuild 还是先跑
2. 改 `viteBundler()` → 项目还在跑 webpack bundler
3. 用 `await import('./theme/index.js')` → esbuild 还是能静态分析

最终方案：**只继承 defaultTheme，扩展用 defaultTheme 提供的插槽 API**（`navbar`、`sidebar`、`page`），
不写自定义 `Layout.vue`。反正手绘风主要靠 CSS，不需要重写 layout 结构。

### 2. SCSS 变量不生效

第一次写 `styles/config.scss` 时，**把变量名写错了**——VuePress 2 的变量前缀是 `$` 不是 `$vp-`。
后来查文档发现，defaultTheme 的可覆盖变量在
[这里](https://github.com/vuepress/theme-default/blob/main/src/client/styles/variables.scss)。

### 3. 中文字体本地化

Google Fonts 在国内访问不稳，所以所有字体都下到 `docs/public/fonts/` 本地化：

```scss
@font-face {
  font-family: 'Ma Shan Zheng';
  src: url('/fonts/MaShanZheng-Regular.ttf') format('truetype');
  font-display: swap;
}
```

字体文件随仓库 commit 进去，构建出来直接走 `/fonts/xxx.ttf`。

## 手绘风怎么做

核心就三招：

1. **抖动边框**：给卡片加 `transform: rotate(-0.5deg)`，肉眼几乎察觉不到，但叠加起来就有"手摆"的感觉
2. **纸张背景**：body 上叠两层 linear-gradient——左边 48px 处一条 1px 红色竖线（模仿笔记本的边距线），加上横向 32px 重复的浅灰细线
3. **手写体标题**：`font-family: 'Ma Shan Zheng'` 一上，整个气质就变了

```scss
body {
  background-image:
    linear-gradient(to right, transparent 0, transparent 48px,
      rgba(193, 74, 58, 0.18) 48px, rgba(193, 74, 58, 0.18) 49px,
      transparent 49px),
    repeating-linear-gradient(to bottom, transparent 0, transparent 31px,
      rgba(30, 30, 30, 0.05) 31px, rgba(30, 30, 30, 0.05) 32px);
}
```

## 还差什么

- [ ] RSS 订阅（`@vuepress/plugin-feed`）
- [ ] 评论系统（暂时不打算加）
- [ ] 深色模式的手绘感调优
- [ ] 移动端菜单折叠

慢慢来。

---

*写于一个失眠的周二夜里。*