/*
 * @Author: zulezhe
 * @Date: 2022-10-18 13:52:59
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-18 14:15:59
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})

