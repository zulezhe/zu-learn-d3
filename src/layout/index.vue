<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">ZUD3</div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                subnav 1
              </span>
            </template>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined />
                subnav 2
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
                subnav 3
              </span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
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
                  <zu-code />
                </a-tab-pane>
                <a-tab-pane key="2" tab="指南" force-render>
                  <ZuMarkdown></ZuMarkdown>
                </a-tab-pane>
              </a-tabs>
            </template>
            <template #right>
              <router-view></router-view>
            </template>
          </zu-split-pane>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import ZuSplitPane from "@/components/zu-split-pane/index.vue";
import ZuCode from "@/components/zu-code/index.vue";
import ZuMarkdown from "@/components/zu-markdown/index.vue";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
    ZuSplitPane,
    ZuCode,
    ZuMarkdown,
  },
  setup() {
    let offset = ref(0.5);
    let text = ref(`# 成功`);
    function move(val) {
      offset.value = val;
    }
    return {
      selectedKeys1: ref(["2"]),
      selectedKeys2: ref(["1"]),
      collapsed: ref(false),
      openKeys: ref(["sub1"]),
      offset,
      move,
      text,
    };
  },
});
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
