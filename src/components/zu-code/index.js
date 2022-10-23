/**
 * 对外提供赋值
 */
export const setValue = (val) => {
  editor.setValue(val);
};
// 格式化
export const format = () => {
  console.log(editor, "data======");
  var totalLines = editor.lineCount();
  editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
};
/**
 * 设置模式
 */
export const setMode = (mode) => {
  console.info(mode);
  editor.setOption("mode", mode);
};
export const setTheme = (theme) => {
  console.log("切换主题", theme);
  if (theme == "亮") {
    editor.setOption("theme", "elegant");
  } else if (theme == "暗") {
    editor.setOption("theme", "erlang-dark");
  }
};
/**
 * 对外提供取值
 */
export const getValue = () => {
  return editor.getValue();
};