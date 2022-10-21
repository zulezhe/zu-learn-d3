<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">ZUD3</div>
    </a-layout-header>
    <a-layout>
      <Sider></Sider>
      <a-layout style="padding: 0 24px 24px">
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
                  <ZuToolbar />
                  <zu-code />
                </a-tab-pane>
                <a-tab-pane key="2" tab="指南" force-render>
                  <ZuMarkdown />
                </a-tab-pane>
              </a-tabs>
            </template>
            <template #right>
              <router-view />
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
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import { ref, shallowRef } from "vue";
let offset = ref(0.5);
const loading = shallowRef(false);
function move(val) {
  offset.value = val;
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
