<script setup>
import DefaultTheme from 'vuepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <header class="sketch-nav">
        <div class="nav-inner">
          <a href="/" class="logo">
            <span class="logo-mark">✦</span>
            <span class="logo-text">墨与码</span>
          </a>
          <nav class="nav-links">
            <a href="/" class="nav-link">首页</a>
            <a href="/blog/" class="nav-link">随笔</a>
            <a href="/tags/" class="nav-link">标签</a>
            <a href="/about/" class="nav-link">关于</a>
          </nav>
        </div>
      </header>
    </template>

    <template #layout-bottom>
      <footer class="sketch-footer">
        <div class="footer-inner">
          <p>© {{ new Date().getFullYear() }} 赵恒盛 · 用 VuePress 搭的小角落</p>
          <p class="footer-links">
            <a href="https://github.com/zhao-heng-sheng/sketch-blog">GitHub</a>
            <span class="dot">·</span>
            <a href="/blog/atom.xml">RSS</a>
          </p>
        </div>
      </footer>
    </template>
  </Layout>
</template>

<style>
:root {
  --ink: #1e1e1e;
  --ink-soft: #495057;
  --ink-mute: #868e96;
  --ink-faint: #adb5bd;
  --line: #e9ecef;
  --line-soft: #f1f3f5;
  --paper: #ffffff;
  --accent: #2b8a3e;
  --max-w: 1200px;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}

body {
  background-image: linear-gradient(
    to bottom, transparent 0, transparent 31px,
    var(--line-soft) 31px, var(--line-soft) 32px
  );
  background-size: 100% 32px;
}

* { box-sizing: border-box; }

a { color: var(--ink); text-decoration: none; transition: color 0.2s ease; }
a:hover { color: var(--accent); }

h1, h2, h3, h4 {
  font-family: 'Ma Shan Zheng', 'Noto Sans SC', cursive, sans-serif;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--ink);
}

/* === 顶部自定义导航 === */
.sketch-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid var(--ink);
}

.nav-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 28px;
  color: var(--ink);
}
.logo:hover { color: var(--accent); }
.logo-mark { font-size: 30px; color: var(--accent); }

.nav-links { display: flex; gap: 4px; }

.nav-link {
  position: relative;
  padding: 8px 16px;
  font-size: 16px;
  color: var(--ink);
  border-radius: 4px;
  transition: all 0.2s;
}
.nav-link:hover { background: var(--line-soft); }
.nav-link.router-link-active {
  font-weight: 600;
}
.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--ink);
  border-radius: 1px;
  transform: rotate(-0.4deg);
}

/* === 默认主题顶栏隐藏 === */
.VPNavBar, .VPHero .nav, .VPNav { display: none !important; }

/* === 页脚 === */
.sketch-footer {
  border-top: 2px dashed var(--line);
  padding: 32px 0;
  margin-top: 64px;
}
.footer-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ink-mute);
  font-size: 14px;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-inner p { margin: 0; }
.footer-links a { color: var(--ink-mute); }
.footer-links a:hover { color: var(--accent); }
.footer-links .dot { margin: 0 8px; color: var(--ink-faint); }

/* === 响应式 === */
@media (max-width: 720px) {
  .nav-inner { padding: 12px 16px; }
  .logo { font-size: 22px; }
  .logo-mark { font-size: 24px; }
  .nav-link { padding: 6px 10px; font-size: 15px; }
  .footer-inner { padding: 0 16px; flex-direction: column; text-align: center; }
}
</style>
