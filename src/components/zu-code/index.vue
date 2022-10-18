<!--
 * @Author: zulezhe
 * @Date: 2022-10-18 15:02:48
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-18 23:13:53
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <codemirror
    class="zu-code"
    v-model="code"
    placeholder="Code gose here..."
    :style="options.style"
    :mode="options.mode"
    :spellcheck="options.spellcheck"
    :autofocus="options.autofocus"
    :indent-with-tab="options.indentWithTab"
    :tabSize="options.tabSize"
    :extensions="options.extensions"
    @ready="log('ready', $event)"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="useEditedCode"
  />
</template>

<script setup>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { reactive, ref, toRefs } from "vue";
import axios from "axios";
// 数据
const code = ref(null);
const options = reactive({
  style: { height: "100%" },
  mode: "text/x-c++src",
  spellcheck: true,
  autofocus: true,
  indentWithTab: true,
  tabSize: 2,
  extensions: [javascript(), oneDark], //传递给CodeMirror EditorState。创建({扩展})
});

// 失去焦点时,使用已编辑的代码
function useEditedCode() {
  // console.log("失去焦点", code.value);
}
function log(state, val) {
  // console.log(state, val);
}
axios.get("./doc/content.code").then((res) => {
  console.log("请求成功===>", res);
  code.value = res.data.toString();
});
</script>

<style lang="scss" scoped>
.zu-code {
  width: 100%;
  height: 100%;
}
</style>
