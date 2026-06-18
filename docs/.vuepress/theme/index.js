// 自定义主题入口
// 注意：esbuild 预编译 config 时会跟踪 dynamic import 做 chunk 分析
// 用 /* @vite-ignore */ 标记不行；用 import.meta.url 拼接字符串 import
// 让 esbuild 不知道目标路径
import { defaultTheme } from '@vuepress/theme-default'

const theme = {
  name: 'sketch-blog',
  extends: defaultTheme,
}

// 关键：用变量构造 import 路径，esbuild 无法静态分析
const layoutPath = './Layout.vue'
theme.Layout = () => import(/* @vite-ignore */ layoutPath).then(m => m.default)

export default theme
