/*
 * @Author: zulezhe
 * @Date: 2022-10-18 14:05:41
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-18 23:10:14
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: "learn-d3",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: 'Home'
    },
    children: [
      {
        path: '/base',
        name: "learn-d3",
        component: () => import("@/views/base.vue"),
        meta: {
          title: 'base'
        },
      }
    ]
  }
]


// router实例
const router = createRouter({
  history: createWebHashHistory(), //hash模式（若使用history模式改为createWebHashHistory()）
  routes,
});


// 全局前置守卫
router.beforeEach((to, from, next) => {
  next();
});

// 全局解析守卫
router.beforeResolve(async to => { });

// 全局后置钩子
router.afterEach((to, from, failure) => {
  // if (!failure) sendToAnalytics(to.fullPath)
});



export default router