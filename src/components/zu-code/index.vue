<template>
  <textarea
    style="width: 100%; height: 100%"
    id="codRef"
    v-model="code"
    class="codemirror"
  ></textarea>
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
  // 外部传入的内容，用于实现双向绑定
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Object,
    default: () => {
      return {
        mode: "text/javascript",
        tabSize: 1, // 缩进格式
        indentWithTabs: true,
        smartIndent: true, //智能缩进
        indentUnit: 4, // 智能缩进单元长度为4个单元格
        matchBrackets: true, //每当光标位于匹配的方括号旁边时，都会使其高亮显示
        lineWrapping: true,
        lineNumbers: true, // 显示行号
        autoRefresh: true,
        theme: "monokai", // 主题，对应主题库 JS 需要提前引入
        lint: false,
        lineWiseCopyCut: false,
        styleActiveLine: true, // 显示当前行的样式
        readOnly: false, // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
        extraKeys: { Ctrl: "autocomplete" }, //自定义快捷键
        hintOptions: {},
        eventType: "blur",
        foldGutter: true, // 代码折叠
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        hintOptions: {
          // 自定义提示选项
          completeSingle: false, // 当匹配只有一项的时候是否自动补全
          tables: {
            users: ["name", "score", "birthDate"],
            countries: ["name", "population", "size"],
            score: ["zooao"],
          },
        },
      };
    },
  },
});
const emit = defineEmits(["onUpdate:value"]);
// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
const code = ref(props.value);
let editor = null;
// 初始化
function initialize() {
  if (editor) {
    editor.toTextArea();
  }
  editor = CodeMirror.fromTextArea(
    document.getElementById("codRef"),
    props.options
  );
  // editor.on("keypress", () => {
  //   editor.showHint();
  // });
  // editor.on("keyup", function () {
  //   editor.showHint();
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
const setValue = (val) => {
  editor.setValue(val);
};

/**
 * 设置模式
 */
const setMode = (mode) => {
  console.info(mode);
  editor.setOption("mode", mode);
};

/**
 * 对外提供取值
 */
const getValue = () => {
  return editor.getValue();
};

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
  //取消触发器
  editor.off(props.options.eventType);
});
defineExpose({
  setValue,
  getValue,
  setMode,
});
</script>
<style lang="scss">
.CodeMirror {
  width: 100%;
  max-height: 100% !important;
  min-height: 100% !important;
}
</style>
