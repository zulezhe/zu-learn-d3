<!--
 * @Author: zulezhe
 * @Date: 2022-10-19 00:10:53
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 16:42:22
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <textarea
    style="width: 100%; height: 100%"
    id="codRef"
    v-model="code"
    class="codemirror"
  ></textarea>
</template>
<script setup>
import CodeMirror from "./import-codemirror.js";
import { handleShowHint, handleShowHint2 } from "./show-hunt.js";
import { watch, onMounted, onBeforeUnmount, ref } from "vue";
import { setExtraKeys } from "./extraKeys.js";
import hBeautify from "js-beautify";
console.log("hBeautify===>", hBeautify.html);
const props = defineProps({
  // 外部传入的内容，用于实现双向绑定
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {
      return {
        mode: "htmlmixed", // 模式
        tabSize: 1, // 缩进格式
        indentWithTabs: true,
        smartIndent: true, //智能缩进
        indentUnit: 4, // 智能缩进单元长度为4个单元格
        matchBrackets: true, //每当光标位于匹配的方括号旁边时，都会使其高亮显示
        autoCloseTags: true, //自动关闭标签
        autoCloseBrackets: true, //自动补全括号和引号
        lineWrapping: true,
        lineNumbers: true, // 显示行号
        theme: "erlang-dark", // 主题，对应主题库 JS 需要提前引入
        lint: true, //检查格式
        lineWiseCopyCut: false,
        styleActiveLine: true, // 显示当前行的样式
        readOnly: false, // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
        continueComments: "Enter", // 注释代码 快捷键 Ctrl-Q
        eventType: "blur",
        foldGutter: true, // 可将对象折叠，与下面的gutters一起使用
        gutters: [
          "CodeMirror-lint-markers",
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
        ],
        highlightSelectionMatches: {
          minChars: 2,
          style: "matchhighlight",
          showToken: true,
        },
        hintOptions: {
          //提示配置项
          completeSingle: false,
          hint: handleShowHint2, //自定义提示
        },
      };
    },
  },
});
const emit = defineEmits(["onUpdate:value"]);
const code = ref(props.value);
let editor = null;
/**
 * 初始化
 */
function initialize() {
  if (editor) {
    editor.toTextArea();
  }
  editor = CodeMirror.fromTextArea(
    document.getElementById("codRef"),
    props.options
  );
  /**
   * 忽略自动提示的token
   */
  const ignore = [
    "",
    "#",
    "!",
    "-",
    "=",
    "@",
    "$",
    "%",
    "&",
    "+",
    ";",
    "(",
    ")",
    "*",
  ];
  const ignoreToken = (text) => {
    if (text && text[0]) {
      for (const pre in ignore) {
        if (ignore[pre] === text[0]) {
          return true;
        }
      }
    } else {
      return true;
    }
    return false;
  };

  // editor.on("change", function (editor, change) {
  //   //任意键触发autocomplete
  //   if (change.origin == "+input") {
  //     var text = change.text;
  //     if (!ignoreToken(text))
  //       //不提示
  //       setTimeout(function () {
  //         editor.execCommand("autocomplete");
  //       }, 20);
  //   }
  // });
  // 支持双向绑定
  editor.on(props.options.eventType, (coder) => {
    if (emit) {
      emit("onUpdate:value", coder.getValue());
    }
  });
}
/**
 * 对外提供赋值
 */
function setValue(val) {
  editor.setValue(val);
}
// 格式化
function format() {
  let formatedHTML = hBeautify.html(getValue(), {
    indent_size: "4",
    indent_char: " ",
    max_preserve_newlines: "2",
    preserve_newlines: true,
    keep_array_indentation: false,
    break_chained_methods: true,
    indent_scripts: "keep",
    brace_style: "collapse",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: "0",
    indent_inner_html: false,
    comma_first: false,
    e4x: false,
    indent_empty_lines: false,
  });
  setValue(formatedHTML);
}
/** 
 * 设置模式
 */
function setMode(mode) {
  console.info(mode);
  editor.setOption("mode", mode);
}
function setTheme(theme) {
  if (theme == "亮") {
    editor.setOption("theme", "elegant");
  } else if (theme == "暗") {
    editor.setOption("theme", "erlang-dark");
  }
}
/**
 * 对外提供取值
 */
function getValue() {
  return editor.getValue();
}
watch(
  () => props.value,
  (newProps) => {
    code.value = editor ? editor.setValue(newProps) : "";
    editor.refresh();
  }
);
onMounted(() => {
  initialize();
  setExtraKeys(editor, {
    "Shift-Ctrl-F": format,
  });
});
onBeforeUnmount(() => {
  //取消触发器
  editor.off(props.options.eventType);
});
defineExpose({
  setValue,
  getValue,
  setMode,
  setTheme,
  format,
});
</script>
<style lang="scss">
.CodeMirror {
  width: 100%;
  max-height: 100% !important;
  min-height: 100% !important;
}
// 设置智能提示弹窗的样式
.CodeMirror-hints {
  color: rgb(98 189 255);
  background-color: red;
}
.CodeMirror-hint {
  color: rgb(98 189 255);
  background-color: green;
}
.CodeMirror-hint-active {
  color: rgb(98 189 255);
  background-color: blue;
  color: yellow;
}
// 自定义提示面板
</style>
