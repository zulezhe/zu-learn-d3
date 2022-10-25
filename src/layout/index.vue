<!--
 * @Author: zulezhe
 * @Date: 2022-10-18 14:05:22
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-25 13:01:41
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">ZUD3</div>
    </a-layout-header>
    <a-layout>
      <Sider @active="active"></Sider>
      <a-layout style="padding: 20px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '10px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <zu-split-pane v-model:val="offset" @move="move">
            <template #left>
              <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="代码">
                  <div class="loading-box" v-if="loading">
                    <zu-loading />
                  </div>
                  <ZuToolbar
                    @run="run"
                    @reset="reset"
                    @format="format"
                    @changeTheme="changeTheme"
                  />
                  <zu-code :value="html" ref="zuCodeRef" />
                </a-tab-pane>
                <a-tab-pane key="2" tab="指南" force-render>
                  <ZuMarkdown :md="md" />
                </a-tab-pane>
              </a-tabs>
            </template>
            <template #right>
              <iframe
                :srcdoc="previewCode"
                frameborder="0"
                style="width: 100%; height: 100%"
              ></iframe>
            </template>
          </zu-split-pane>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import Sider from "./sider.vue";
import ZuSplitPane from "@/components/zu-split-pane/index.vue";
import ZuCode from "@/components/zu-code/index.vue";
import ZuMarkdown from "@/components/zu-markdown/index.vue";
import ZuLoading from "@/components/zu-loading/index.vue";
import ZuToolbar from "@/components/zu-toolbar/index.vue";
import { ref, shallowRef, onMounted } from "vue";
import axios from "axios";
let offset = ref(0.5);
let html = ref(null);
let md = ref('');
let previewCode = ref(null);
let zuCodeRef = ref(null);
let activePath = ref("./doc/基础/选择器");
const loading = shallowRef(false);
onMounted(() => {
  getHtml();
});
function move(val) {
  offset.value = val;
}
/**
 * 菜单激活
 * @param {*} item
 */
function active(item) {
  activePath.value = item.key;
  console.log("获取的内容", activePath.value);
  getHtml();
  getMd()
}
function run() {
  let val = zuCodeRef.value.getValue();
  console.log("编辑器内容===>", val);
  previewCode.value = val;
}
function reset() {
  html.value = "";
  previewCode.value = "";
  getHtml();
}
function format() {
  zuCodeRef.value.format();
}
function changeTheme(type) {
  zuCodeRef.value.setTheme(type);
}
function getHtml() {
  axios.get(activePath.value + "/index.html").then((res) => {
    html.value = res.data;
    previewCode.value = res.data;
  });
}
function getMd() {
  axios.get(activePath.value + "/index.md").then((res) => {
    md.value = res.data.toString();
  });
}
</script>
<style scoped lang="scss">
.ant-layout {
  width: 100%;
  height: 100%;
  .ant-layout-content {
    height: 100%;
  }
}
.ant-layout-header {
  .logo {
    color: #fff;
    font-size: 26px;
    font-weight: 800;
  }
}

.site-layout-background {
  background: #fff;
}
:deep(.ant-tabs) {
  height: 100%;
  .ant-tabs-content-holder {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
      .ant-tabs-tabpane {
        height: 100%;
      }
    }
  }
}
</style>
