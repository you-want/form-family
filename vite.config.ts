import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Inspect from 'vite-plugin-inspect'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vueSetupExtend(),
    Inspect(), // only applies in dev mode
    AutoImport ({
      imports: ["vue"], // 自动导入vue和vue-router相关函数
      dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      '~': resolve('packages'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: '@import "@/styles/variables.less";',
        additionalData: '@import "@/styles/variables.less";'
      }
    }
  },
  server: {
    port: 5009,
    host: '0.0.0.0',
    open: true,
  }
})
