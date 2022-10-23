
export default function useProps() {
  return defineProps({
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
}