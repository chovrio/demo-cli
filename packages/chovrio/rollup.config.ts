import path from 'path'
import { defineConfig } from 'rollup'
import ts from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const cliConfig = defineConfig({
  // 入口文件
  input: './src/core/index.ts',
  // 输出目录
  output: {
    file: path.resolve(__dirname, './dist/cli.js')
  },
  // 用到的插件
  plugins: [
    ts({ tsconfig: path.resolve(__dirname, './tsconfig.json') }),
    terser({
      toplevel: true
    }),
    json()
  ]
})
export default defineConfig([cliConfig])
