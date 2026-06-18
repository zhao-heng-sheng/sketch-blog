// ============================================================
// Sketch Blog · 侧边栏配置
// 从 docs/notes/ 目录自动生成
// ============================================================

import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebar: SidebarConfig = {
  '/notes/': [
    {
      text: 'CSS',
      prefix: '/notes/CSS/',
      collapsed: false,
      children: [
        'img图片底部空白问题'
      ],
    },
    {
      text: 'JavaScript',
      prefix: '/notes/JavaScript/',
      collapsed: false,
      children: [
        'callBind',
        '依赖注入',
        '问题',
        {
          text: '日常笔记',
          collapsed: true,
          children: [
          'Airbnb JavaScript风格指南摘录',
          'class语法糖',
          'promise'
          ],
        }
      ],
    },
    {
      text: 'vue',
      prefix: '/notes/vue/',
      collapsed: false,
      children: [
        'hooks',
        {
          text: 'nuxt',
          collapsed: true,
          children: [
          '渲染方式'
          ],
        },
        {
          text: 'vue3',
          collapsed: true,
          children: [
          '组件中的ref'
          ],
        },
        {
          text: '日常笔记',
          collapsed: true,
          children: [
          'Vue-ECharts'
          ],
        }
      ],
    },
    {
      text: '后端',
      prefix: '/notes/后端/',
      collapsed: false,
      children: [
        'docker',
        'node中ESM模式下全局变量中没有__dirname',
        'nuxt'
      ],
    },
    {
      text: '工具',
      prefix: '/notes/工具/',
      collapsed: false,
      children: [
        'GitHub上的那些LGTM和WIP代表什么',
        'Microsoft To Do在科学上网状态下无法同步的解决方案',
        'langchain.js调用其他模型',
        'npm、yarn、pnpm',
        'typora + 七牛云 + PicGo 搭建md编写环境',
        'windows11恢复右键所有选项',
        'windows随机保留端口问题',
        '在浏览器控制台安装npm包去调试',
        '如何用海外服务器搭建梯子',
        '定时提交git',
        '白嫖office365',
        '软件'
      ],
    },
    {
      text: '脚本',
      prefix: '/notes/脚本/',
      collapsed: false,
      children: [
        'room游戏',
        '费率表转json'
      ],
    },
    {
      text: '千千结',
      prefix: '/notes/千千结/',
      collapsed: true,
      children: [
        '做',
        '写',
        '学'
      ],
    },
    {
      text: '书影音游',
      prefix: '/notes/书影音游/',
      collapsed: true,
      children: [
        {
          text: '书籍',
          collapsed: true,
          children: [
          '一地鸡毛',
          '刘亮程散文',
          '如何阅读一本书',
          '小马过河',
          '局外人',
          '阅读步骤',
          {
            text: '前端调试通关秘籍笔记',
            collapsed: true,
            children: [
            '11 用 VSCode Snippets 快速创建调试配置',
            '12 如何调试 Node.js 代码',
            '13 跑 npm scripts，有更香的方式',
            '2.初识调试',
            '3.如何调试网页的js',
            '4. VSCode Chrome Debugger 配置详解',
            '5. sourcemap 的原理和作用',
            '6. Webpack 的 sourcemap 配置',
            '7 实战案例：调试 Vue 项目',
            '8 VSCode Chrome Debugger 断点映射的原理'
            ],
          },
          {
            text: '深入浅出vite',
            collapsed: true,
            children: [
            '1 开篇 ：让 Vite 助力你的前端工程化之路'
            ],
          }
          ],
        },
        {
          text: '游戏',
          collapsed: true,
          children: [
          '塞尔达王国之泪'
          ],
        },
        {
          text: '视频',
          collapsed: true,
          children: [
          '奇巧出租车',
          '孤独摇滚',
          '宇宙探索编辑部',
          '流浪地球2',
          '漫长的季节',
          '番剧记录',
          '魔法少女小圆'
          ],
        }
      ],
    },
    {
      text: '复习',
      prefix: '/notes/复习/',
      collapsed: true,
      children: [
        {
          text: '2023',
          collapsed: true,
          children: [
          '2023年12月21日',
          '2023年12月25日',
          '2023年12月26日',
          '2023年12月27日',
          '2023年12月28日',
          '2023年12月29日'
          ],
        },
        {
          text: '2024',
          collapsed: true,
          children: [
          {
            text: '三月',
            collapsed: true,
            children: [
            '2024年3月11日',
            '2024年3月13日',
            '2024年3月14日',
            '2024年3月15日',
            '2024年3月18日',
            '2024年3月19日',
            '2024年3月1日',
            '2024年3月21日',
            '2024年3月26日',
            '2024年3月27日',
            '2024年3月29日',
            '2024年3月4日',
            '2024年3月5日',
            '2024年3月8日'
            ],
          },
          {
            text: '九月',
            collapsed: true,
            children: [
            '2024年9月4日',
            '2024年9月5日',
            '2024年9月9日',
            '计划书迁移'
            ],
          },
          {
            text: '二月',
            collapsed: true,
            children: [
            '2024年2月21日',
            '2024年2月22日',
            '2024年2月23日',
            '2024年2月26日',
            '2024年2月27日',
            '2024年2月28日',
            '2024年2月2日'
            ],
          },
          {
            text: '五月',
            collapsed: true,
            children: [
            '2024年5月15日',
            '2024年5月7日'
            ],
          },
          {
            text: '四月',
            collapsed: true,
            children: [
            '2024年4月1日',
            '2024年4月7日',
            '2024年4月8日'
            ],
          }
          ],
        }
      ],
    },
    {
      text: '生活杂谈',
      prefix: '/notes/生活杂谈/',
      collapsed: true,
      children: [
        '1',
        'xx',
        '我们为什么要睡觉',
        '政治'
      ],
    },
  ],
}
