/**
 * 实现组件全局（全量）打包
 * @description 因为通过 node 打包，所以采用 CommonJS 规范，也就是 require
 */
 
 import { createRequire } from 'module';
 import path from "path"
  
 const requireds = createRequire(import.meta.url);
 const __dirname = path.resolve();
  
 // vite 打包需要的配置
 const { defineConfig, build } = requireds('vite');
  
 // vite 插件
 const vue = requireds('@vitejs/plugin-vue');
 const vueJsx = requireds('@vitejs/plugin-vue-jsx');
  
 // 添加打包入口文件夹 packages（需要手动创建）
 const entryDir = path.resolve(__dirname, 'packages');
 // 添加出口文件夹 lib（不需要手动创建，会自动生成）
 const outDir = path.resolve(__dirname, 'lib');
  
 // vite 配置
 const baseConfig = defineConfig({
   configFile: false,
   publicDir: false,
   plugins: [vue(), vueJsx()]
 });
  
 // rollup 配置（vite 基于 rollup 打包）
 const rollupOptions = {
   // 这两个库不需要打包
   external: ['vue', 'vue-router'],
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