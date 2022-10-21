/*
 * @Author: zulezhe
 * @Date: 2022-10-18 14:05:41
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-21 22:23:07
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import { createRouter, createWebHashHistory } from "vue-router"
import { routerPackag } from "@/utils/auto-import.js"
const modules = import.meta.glob("../views/**/**.vue")
const modules2 = import.meta.glob("../views/*/*")
console.log(modules, modules2);
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
        path: '/select',
        name: "select",
        component: () => import("@/views/01-test.vue"),
        meta: {
          title: 'Home'
        },
      },
      {
        path: '/ring-menu',
        name: "ring-menu",
        component: () => import("@/views/03-ring-menu.vue"),
        meta: {
          title: 'ring-menu'
        },
      }
    ]
  }
]
// 循环进入路由
for (let i in modules) {
  let item = modules[i];
  const routePath1 = item.name.replace(/(.*\/)*([^.]+).*/ig, "$1");
  const routePath = item.name.replace(/(.*\/)*([^.]+).*/ig, "$2");
  console.log(routePath1, routePath);

  routes.push({
    path: '/' + routePath,
    name: routePath,
    title: routePath,
    component: () => import( /* @vite-ignore */ item.name), //.vue不能省略
  })
}
console.log(routes);

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