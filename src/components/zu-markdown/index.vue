<!--
 * @Author: zulezhe
 * @Date: 2022-10-18 15:33:46
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-20 01:23:04
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <v-md-preview
    class="zu-mardown"
    :text="md"
    @copy-code-success="handleCopyCodeSuccess"
  ></v-md-preview>
</template>
<script setup>
import { message } from "ant-design-vue";
import axios from "axios";
import { defineComponent, ref } from "vue";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
//代码行号
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// highlightjs 核心代码
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/a11y-dark.css"; // 导入代码高亮样式
// 复制代码块
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
// 提示组件
import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";
// 数学公式
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
// 按需引入语言包
import json from "highlight.js/lib/languages/json";
import html from "highlight.js/lib/languages/vbscript-html";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("json", json);
hljs.registerLanguage("html", html);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("xml", xml);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
  codeHighlightExtensionMap: {
    vue: "html",
  },
  config: {
    toc: {
      includeLevel: [3, 4],
    },
  },
});
VMdPreview.use(createLineNumbertPlugin());
VMdPreview.use(createCopyCodePlugin());
VMdPreview.use(createTipPlugin());
VMdPreview.use(createKatexPlugin());
let md = ref("");
axios.get("./doc/test.md").then((res) => {
  // console.log("请求成功===>", res);
  md.value = res.data.toString();
});
defineComponent({ VMdPreview: VMdPreview });
defineProps({
  text: {
    type: String,
    default: " #  测试 markdown ```js function sum(a, b) {return a + b;}```",
  },
});
function handleCopyCodeSuccess() {
  message.success("复制成功");
}
</script>
<style lang="scss" scoped>
.zu-mardown {
  height: 100%;
  overflow-y: scroll;
  :deep(.github-markdown-body) {
    height: 100%;
  }
}
.v-md-pre-wrapper {
  max-height: 200px;
  overflow-y: scroll;
}
</style>
