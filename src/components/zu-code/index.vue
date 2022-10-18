<!--
 * @Author: zulezhe
 * @Date: 2022-10-18 15:02:48
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-18 15:22:23
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <codemirror
    v-model="code"
    placeholder="Code gose here..."
    :style="style"
    :mode="mode"
    :spellcheck="spellcheck"
    :autofocus="autofocus"
    :indent-with-tab="indentWithTab"
    :tabSize="tabSize"
    :extensions="extensions"
    @ready="log('ready', $event)"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="useEditedCode"
  />
</template>

<script>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import { reactive, ref, toRefs } from "vue";

export default {
  components: {
    Codemirror,
  },
  setup() {
    // 数据
    const code = ref(``);
    let selectValue = "cpp";
    let dateTime = "黑夜";
    const options = reactive({
      style: { height: "400px" },
      mode: "text/x-c++src",
      spellcheck: true,
      autofocus: true,
      indentWithTab: true,
      tabSize: 2,
      extensions: [javascript(), oneDark], //传递给CodeMirror EditorState。创建({扩展})
    });

    // 方法
    // 失去焦点时,使用已编辑的代码
    function useEditedCode() {
      console.log("@@@blur@@@code:", code.value);
      console.log("@@@blur@@@cpp:", javascript);
    }
    // 返回
    return {
      code,
      selectValue,
      dateTime,
      ...toRefs(options),
      log: console.log,
      useEditedCode,
    };
  },
};
</script>
