/*
 * @Author: zulezhe
 * @Date: 2022-10-18 14:05:41
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-21 23:32:42
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import { routerPackag } from "@/utils/auto-import.js"
const modules = import.meta.glob("../views/**/**.vue")
const modules2 = import.meta.glob("../views/*/*")
console.log(modules, modules2);
const routes = [
  {
    path: '/',
    component: () => import("@/layout/index.vue"),
    children: []
  }
]
let children = routes[0].children
// 循环进入路由
for (let i in modules) {
  let item = modules[i];
  const routePath1 = item.name.replace(/(.*\/)*([^.]+).*/ig, "$1");
  const routePath = item.name.replace(/(.*\/)*([^.]+).*/ig, "$2");
  console.log(routePath1, routePath);
  children.push({
    path: '/' + routePath,
    name: routePath,
    title: routePath,
    component: () => import( /* @vite-ignore */ item.name), //.vue不能省略
  })
}
console.log(routes);

// router实例
const router = createRouter({
  history: createWebHistory(),
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