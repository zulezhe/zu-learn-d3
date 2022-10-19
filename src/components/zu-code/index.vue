<!--
 * @Author: zulezhe
 * @Date: 2022-10-18 15:02:48
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-19 23:53:04
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <!-- <codemirror
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
  /> -->
  <codemirror
    class="zu-code"
    v-model="code"
    placeholder="Code gose here..."
    :options="cmOptions"
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
  tabSize: 4, // 制表符的宽度
  autofocus: true,
  spellcheck: true,
  indentWithTab: true,
  mode: "text/x-c++src",
  theme: "oneDark", // 主题黑色
  lineNumbers: true, // 是否显示行号
  lineWrapping: true, // 是否应滚动或换行以显示长行
  extraKeys: { Ctrl: "autocomplete" },
  lineWiseCopyCut: true, // 在没有选择的情况下进行复制或剪切将复制或剪切有光标的整行。
  showCursorWhenSelecting: true, // 选择处于活动状态时是否应绘制光标
  maxHighlightLength: Infinity, // 显示长行的时候 这个值是不限制，如果要做限制的话，值是number类型
  matchBrackets: true, // 光标匹配括号
  line: true,
  readOnly: true, // 只读
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
  overflow-y: scroll !important;
  font-size: 13px; // 下面两行是控制行间距的
  display: block !important;
}
</style>
