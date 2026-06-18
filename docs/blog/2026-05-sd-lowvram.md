---
title: 把 SD 装进 4GB 显存小主机的尝试
date: 2026-05-10
tags: [Stable Diffusion, NAS, MLOps]
---

# 把 SD 装进 4GB 显存小主机的尝试

> 标题骗你的，其实是 **"4GB 显存跑 SDXL 的可行性报告"**。

## 硬件

零刻 SER5 Pro，AMD Ryzen 5 5600H，**集显**。
加了一张矿卡 RX 580 4GB（170 块包邮，2026 年矿难尾声捡的）。

## 能不能跑

**能跑，但要看跑什么：**

| 模型 | 4GB 显存能不能跑 | 速度（512×512） | 备注 |
|---|---|---|---|
| SD 1.5 | ✅ 无压力 | 8 s/it | 原版 |
| SDXL Base | ⚠️ 极限 | 35 s/it | 必须 `--lowvram` |
| SDXL Refiner | ❌ OOM | — | 放弃 |
| Flux.1 Dev | ❌ 至少 12GB | — | 想都别想 |
| Flux.1 FP8 | ⚠️ 8GB 起步 | — | 4GB 没戏 |

## 优化方案

### 1. `--lowvram` 模式

```bash
python main.py --lowvram
```

ComfyUI 自动把模型分片，激活值常驻 CPU 内存。
代价：速度 -20%，但能省 30% 显存。

### 2. FP8 量化模型

把 SDXL 从 6.5GB 量化到 3.8GB，4GB 显存刚好能塞。
代价：细节纹理略糊。

### 3. Tiled VAE

出图时分块解码，避免一次性占满显存。
对大图（>1024）特别有用。

## 实际体验

跑了 200 张图，平均 35s/张。
**能玩，但不是生产力工具。**

最大的痛点是：**出图等待时啥也干不了**，
CPU 模式下 ComfyUI 会把整个进程锁死，连 web UI 都卡。

## 最终结论

> **4GB 显存跑 SDXL 是可行的，但只适合尝鲜。**

要正经出图，至少 8GB（SDXL）或 12GB（Flux）。
要批量出图，建议直接上云（[AutoDL](https://www.autodl.com/)、[揽睿星舟](https://www.lanrui-ai.com/)，按小时租 4090）。

---

*矿卡别买，别问为什么。*