<!--
 * @Author: zulezhe
 * @Date: 2022-10-21 18:03:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-21 18:43:07
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
        <a-menu-item key="/ring-menu">环形菜单</a-menu-item>
        <a-menu-item key="2">option2</a-menu-item>
        <a-menu-item key="3">option3</a-menu-item>
        <a-menu-item key="4">option4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <laptop-outlined />
            进阶
          </span>
        </template>
        <a-menu-item key="5">option5</a-menu-item>
        <a-menu-item key="6">option6</a-menu-item>
        <a-menu-item key="7">option7</a-menu-item>
        <a-menu-item key="8">option8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
          <span>
            <notification-outlined />
            实战
          </span>
        </template>
        <a-menu-item key="9">option9</a-menu-item>
        <a-menu-item key="10">option10</a-menu-item>
        <a-menu-item key="11">option11</a-menu-item>
        <a-menu-item key="12">option12</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
let selectedKeys2 = ref(["1"]);
let openKeys = ref(["sub1"]);
function handelClick(item) {
  //判断点击路径与点击菜单路径是否不同
  //有效避免重复替换相同路径
  if (item.key !== this.$route.path) {
    this.$router.push(item.key);
    console.log(this.$route.path);
    console.log(item);
  }
}
</script>

<style lang="less" scoped></style>
