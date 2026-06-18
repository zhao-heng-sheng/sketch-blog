import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { sidebar } from './sidebar'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  // GitHub Pages 部署在 /sketch-blog/ 子路径
  base: '/sketch-blog/',

  bundler: webpackBundler({
    postcss: {},
  }),

  lang: 'zh-CN',
  title: '墨与码',
  description: '一个写代码的人，偶尔也写点别的。',

  // 顶部导航（navbar / sidebar 传给 defaultTheme 才能生效）
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '随笔', link: '/blog/' },
      { text: '笔记', link: '/notes/' },
      { text: '标签', link: '/tags/' },
      { text: '关于', link: '/about/' },
    ],
    sidebar,
  }),

  // 侧边栏：只在 /notes/ 下显示
  sidebar,

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

  markdown: {
    lineNumbers: false,
    config: { html: true, breaks: true },
  },
})