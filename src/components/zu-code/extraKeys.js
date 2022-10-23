import { mergeDeep } from "@/utils/index.js"
export function setExtraKeys(editor, source) {
  let extraKeys = {
    //自定义快捷键
    // Tab: "emmetExpandAbbreviation",
    // Esc: "emmetResetAbbreviation",
    // Enter: "emmetInsertLineBreak",
    F11: function (editor) {
      editor.setOption("fullScreen", !editor.getOption("fullScreen"));
    },
    Esc: function (editor) {
      if (editor.getOption("fullScreen")) {
        editor.setOption("fullScreen", false);
      }
    },
    "Ctrl-/": "toggleComment",
    "Ctrl-Enter": "autocomplete",
  };
  editor.setOption("extraKeys", mergeDeep(extraKeys, source))
}