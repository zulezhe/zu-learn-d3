<!--
 * @Author: zulezhe
 * @Date: 2022-10-21 18:03:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-25 12:40:33
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      mode="inline"
      @click="handelClick"
      :selectedKeys="[$route.path]"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            基础
          </span>
        </template>
        <a-menu-item key="/基础/选择器">选择器</a-menu-item>
        <a-menu-item key="/基础/扇形图表">扇形图表</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <laptop-outlined />
            进阶
          </span>
        </template>
        <a-menu-item key="5">力向图</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
          <span>
            <notification-outlined />
            实战
          </span>
        </template>
        <a-menu-item key="/03-ring-menu">环形菜单</a-menu-item>
        <a-menu-item key="9">3D地球</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, onMounted } from "vue";
let selectedKeys2 = ref(["1"]);
let openKeys = ref(["sub1"]);
let menuList = ref([]);
onMounted(() => {});
function handelClick(item) {
  console.log(item);
}
</script>

<style lang="less" scoped></style>
