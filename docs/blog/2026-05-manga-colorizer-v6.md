---
title: manga-colorizer Chrome 扩展 v6.1 填坑录
date: 2026-05-28
tags: [Chrome, AI, 踩坑记录]
---

# manga-colorizer Chrome 扩展 v6.1 填坑录

> 一个完全自包含的 AI 黑白漫画上色 Chrome 扩展，从 v4 到 v6.1 踩了无数坑。

## 项目初衷

朋友在看漫画的时候吐槽："黑白的看着累，AI 上色服务都要收费。"
我寻思一个浏览器扩展能搞定的事，干嘛花那冤枉钱？

**核心需求：完全自包含。** 不依赖外部 API、不需要 NAS 中转、不用注册账号。

## 版本血泪史

### v4.0（被否决）

百度智能云 colourize API + Python 中转。
NAS 上部署 `baidu_colorize_proxy.py`，扩展调用本地。
**我自己都嫌麻烦。**

### v5.0（自包含第一版）

集成 `onnxruntime-web` + siggraph17 ONNX 模型。
模型动态从 jsDelivr CDN 下载，缓存到 IndexedDB。

第一次跑：失败。CSP 拦截外部脚本。
修复：background.js 用 `fetch()` 绕过 CSP → base64 传回 content.js。

### v5.1（半成功）

ORT 加载成功，模型下载成功，**推理时：**
```
Error: ORT WASM 下载失败: HTTP 404
```

debug 一晚上发现是 ORT 1.19.2 的 wasm 文件名 hardcode 错误。
降级到 1.18.0，**终于跑通了**，但要下载 21MB ORT + 15MB 模型 = **首次启动要下 36MB**。

### v6.0（打包 ORT 到扩展内）

不再动态下载，全部塞进扩展包。扩展体积从 5.4MB 涨到 21MB。

### v6.1（修世界冲突）

`ORT 脚本加载完成但 window.ort 不存在` 报了一周。

排查三天发现是 Chrome Extension 的 **MAIN world vs ISOLATED world** 问题：

| 需求 | 所在 World |
|---|---|
| `window.ort` | MAIN |
| `chrome.runtime.sendMessage` | ISOLATED |

**鱼和熊掌不可兼得。**

最终架构：用 `data:text/javascript;base64,...` 动态注入脚本到 MAIN world，
跑推理；通过 `CustomEvent` 跨世界通信。

## 模型选型踩坑

调研过的所有上色模型：

- ❌ HuggingFace `onnx-community/siggraph17_colorization`（NAS 访问不到）
- ❌ HuggingFace `Xenova/colorization`
- ❌ HuggingFace `akhaliq/colorization`
- ❌ jsDelivr GitHub `BlueY0/SIGGRAPH17-colorization-onnx`（404）
- ❌ PyTorch Hub（NAS 装不上 torch）
- ✅ **ModelScope `damo/cv_ddcolor_image-colorization`**（达摩院，质量最好）

DDColor 模型本体 912MB，浏览器根本扛不住。
最终用 siggraph17（130MB ONNX 版），**质量比 DDColor 差一档，但能用**。

## 上色算法核心

RGB → Lab → 抽 L 通道 → ONNX 推理 → 拼回 ab 通道 → Lab → RGB

```js
// 简化版
const lChannel = rgb2lab(img)[0];  // 灰度
const inputTensor = new ort.Tensor('float32', lChannel, [1, 1, 256, 256]);
const { ab } = await session.run({ input: inputTensor });
const result = lab2rgb(lChannel, ab.map(v => v * 128));
```

## 当前状态

- ✅ 完整自包含，无外部依赖
- ✅ 首次启动下 36MB，之后秒出图
- ✅ 5.4MB 扩展包 → 21MB（ORT 内嵌）
- ⚠️ 上色质量只能说"能看"
- ⚠️ 大尺寸图片（>1024px）会卡

## 还没解决

1. 跑更大模型（DDColor）的方案 → 等 WebGPU 普及
2. 自动检测漫画线条区域，避免给文字上色
3. 用户自定义 prompt 控制色彩风格

---

*开源在 [zhao-heng-sheng/manga-colorizer](https://github.com/zhao-heng-sheng/manga-colorizer)，欢迎试用 + 提 issue。*