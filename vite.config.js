/*
 * @Author: zulezhe
 * @Date: 2022-10-18 13:52:59
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 17:57:44
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base:"./",
    server: {
      host: '0.0.0.0',
      port:"3003",
      cors: true, // 默认启用并允许任何源
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      strictPort: false, //端口被占用自动尝试下一个端口
      //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
      proxy: {
        '/api': {
          target: 'http://192.168.99.223:3000',   //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 强制预构建插件包
    optimizeDeps: {
      include: ['axios'],
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/], // <--
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})

