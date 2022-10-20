/*
 * @Author: zulezhe
 * @Date: 2022-10-20 23:07:58
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-20 23:08:21
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
//引入所有views下.vue文件 

const modules = import.meta.glob("../views/**/**.vue")

export const routerPackag = function (routers) {
  if (routers) {
    routers.filter((itemRouter) => {
      if (itemRouter.component != "Layout") {
        router.addRoute("home", {
          path: `${itemRouter.path}`,
          name: itemRouter.name,
          meta: {
            title: itemRouter.name,
          },
          component:
            //本地能使用，上生产直接裂开~~ 
            //()=>import(/* @vite-ignore */ `/@views/${itemRouter.component}`),
            //使用modules
            modules[/* @vite-ignore */ `../views/${itemRouter.component}`],
        })
      }
      if (itemRouter.children && itemRouter.children.length) {
        routerPackag(itemRouter.children)
      }
      return true
    })
  }
}
