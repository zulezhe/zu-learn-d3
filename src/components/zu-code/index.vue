<template>
  <div class="in-coder-panel">
    <textarea ref="codeform" v-model="code" class="codemirror"></textarea>
  </div>
</template>
<script setup>
import { watch, onMounted, onBeforeUnmount, ref } from "vue";
// 引入全局实例
import _CodeMirror from "codemirror";

// 核心样式
import "codemirror/lib/codemirror.css";
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
// 主题
import "codemirror/theme/monokai.css";
// 快捷键
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// 高亮
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// 折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
//代码补全提示
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  // 外部传入的内容，用于实现双向绑定
  value: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  // 可用事件'change', 'blur'等等；具体参考codemirror文档
  eventType: {
    type: String,
    default: "blur",
  },
  // 外部传入的语法类型
  language: {
    type: String,
    default: "text/javascript",
  },
  // 编辑器主题色
  theme: {
    type: String,
    default: "monokai",
  },
});
const emit = defineEmits(["onUpdate:value"]);
// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
// 引入主题后还需要在 options 中指定主题才会生效
const codeform = ref(null);
const code = ref(props.value);
let editor = null;
// 默认配置
let options = {
  mode: "text/javascript",
  tabSize: 1, // 缩进格式
  indentWithTabs: true,
  smartIndent: true, //智能缩进
  indentUnit: 4, // 智能缩进单元长度为4个单元格
  matchBrackets: true, //每当光标位于匹配的方括号旁边时，都会使其高亮显示
  lineWrapping: true,
  lineNumbers: true, // 显示行号
  autoRefresh: true,
  theme: props.theme, // 主题，对应主题库 JS 需要提前引入
  lint: false,
  lineWiseCopyCut: false,
  styleActiveLine: true, // 显示当前行的样式
  readOnly: props.readonly === false ? false : "nocursor", // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
  extraKeys: { Ctrl: "autocomplete" }, //自定义快捷键
  hintOptions: {},
  foldGutter: true, // 代码折叠
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
};
// 初始化
function initialize() {
  if (editor) {
    editor.toTextArea();
  }
  editor = CodeMirror.fromTextArea(codeform.value, options);
  /*editor.on("keyup", function () {
        editor.showHint();
      });*/
  // 支持双向绑定
  editor.on(props.eventType, (coder) => {
    if (emit) {
      emit("onUpdate:value", coder.getValue());
    }
  });
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
});
onBeforeUnmount(() => {
  editor.off(props.eventType);
});
</script>
