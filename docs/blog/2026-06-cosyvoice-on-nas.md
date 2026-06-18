---
title: 在 N5105 NAS 上跑 CosyVoice 2 复盘
date: 2026-06-10
tags: [TTS, NAS, MLOps]
---

# 在 N5105 NAS 上跑 CosyVoice 2 复盘

> 标题党一下，其实重点是 **"如何在没有 GPU 的破烂机器上把 CosyVoice 2 跑起来"**。

## 硬件背景

机器是 UGREEN DX4600，Celeron N5105，4 核 4 线程，**没独立显卡**。
内存 16GB，系统盘是 4 块 HDD 组 RAID。

## 为什么想跑

之前看到一个 GitHub 项目叫 [FunAudioLLM/CosyVoice](https://github.com/FunAudioLLM/CosyVoice)，
500M 参数，TTS 效果直逼商用 API。本地跑通以后，给自己的有声书做定制音色会很爽。

## 第一次尝试（失败）

按官方 README 来：

```bash
git clone https://github.com/FunAudioLLM/CosyVoice.git
cd CosyVoice
pip install -r requirements.txt
```

`torch` 装完直接吃 2GB，COSYVOICE 模型本体 2.5GB，**CPU 推理速度：**
- 短句（10 字）：45 秒
- 长句（30 字）：2 分 10 秒

**完全不可用。**

## 第二次尝试（量化）

试了三种量化方案：

| 方案 | 模型大小 | 推理速度（30 字） | 音质损失 |
|---|---|---|---|
| FP32 原版 | 2.5 GB | 130 s | 0 |
| FP16 | 1.3 GB | 95 s | < 5% |
| **INT8（GPTQ）** | 0.7 GB | **62 s** | ~10% |

最后用了 **INT8 量化 + ONNX Runtime** 这套。速度从 130s 降到 62s，差不多能听了。

## 部署架构

```
[ Gradio UI ]  ←NAS LAN
     │
     ↓
[ FastAPI server ]   ←NAS localhost:8000
     │
     ↓
[ CosyVoice INT8 ONNX ]
     │
     ↓
[ wav 文件 + RAG 向量库 (Chroma) ]
```

Gradio 跑 7860，FastAPI 跑 8000，反向代理走 nginx。
RAG 部分用了 Chroma 存文本特征，本地 LLM 用 Ollama 拉了个 Qwen2.5-1.5B。

## 性能调优记录

1. **`torch.set_num_threads(4)`** —— N5105 是 4 核，拉满
2. **流式输出**：用 `tts.stream()` 而不是 `tts.synthesize()`，首字延迟从 62s 降到 8s
3. **预热**：第一次推理要加载 ONNX 会话，慢；提前 `app.startup()` 跑个空推理预热
4. **缓存**：常用问句 hash 后存 `/tmp/tts-cache/`，命中直接返回

## 最终效果

- 中文短句：8-15 秒出结果
- 音色克隆：3 秒参考音频即可，质量堪用
- 资源占用：内存 4.2GB，CPU 持续 80-95%

**够用就好。** 真正要工业化还得是 GPU 服务器。

## 还差什么

- [ ] 流式推理 chunk size 调到最优
- [ ] 加音色库管理界面
- [ ] 接思源笔记自动同步音频

---

*折腾的过程比结果好玩。*