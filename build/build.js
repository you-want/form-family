/**
 * 实现组件全局（全量）打包
 * @description 因为通过 node 打包，所以采用 CommonJS 规范，也就是 require
 */
// const createRequire = require('module')
const path = require('path')
const dts = require('vite-plugin-dts')

// const requireds = createRequire(import.meta.url);
// const __dirname = path.resolve();

// vite 打包需要的配置
const { defineConfig, build } = require('vite');

// vite 插件
const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const AutoImport = require("unplugin-auto-import/vite")
const Components = require('unplugin-vue-components/vite')
const { AntDesignVueResolver } = require('unplugin-vue-components/resolvers')

// 添加打包入口文件夹 packages（需要手动创建）
const entryDir = path.resolve(process.cwd(), 'packages');
// 添加出口文件夹 lib（不需要手动创建，会自动生成）
const outDir = path.resolve(process.cwd(), 'lib');

// vite 配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue"], // 自动导入vue和vue-router相关函数
      // dts: "lib/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    }),
    dts({
      outputDir: 'lib',
      include: ['packages/'],
      staticImport: true,
      // skipDiagnostics: false,
      // logDiagnostics: true,
      insertTypesEntry: true,
      rollupTypes: false
    })]
});

// rollup 配置（vite 基于 rollup 打包）
const rollupOptions = {
  // 这两个库不需要打包
  external: ['vue'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
};

/**
 * 全量打包构建的方法
 */
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        // 入口
        entry: path.resolve(entryDir, 'index.ts'),
        // 组件库名字
        name: 'you-want-vue3',
        fileName: 'you-want-vue3',
        // 输出格式
        formats: ['es', 'umd']
      },
      outDir
    }
  })
};

/**
 * 打包成库
 */
const buildLib = async () => {
  await buildAll();
};

buildLib();