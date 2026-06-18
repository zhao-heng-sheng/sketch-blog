import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  bundler: webpackBundler({
    // 让 webpack 处理 sass
    postcss: {},
  }),

  lang: 'zh-CN',
  title: '墨与码',
  description: '一个写代码的人，偶尔也写点别的。',

  permalink: '/:regular',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;500;700&display=swap',
    }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  // 动态加载主题（绕过 esbuild 解析 .vue）
  theme: (await import('./theme/index.js')).default,

  markdown: {
    lineNumbers: false,
    config: { html: true, breaks: true },
  },
})
