/*
 * @Author: zulezhe
 * @Date: 2022-10-18 13:52:59
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 16:37:00
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import { createApp } from 'vue'
import '@/style/common.scss'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
app.use(Antd).mount('#app');
