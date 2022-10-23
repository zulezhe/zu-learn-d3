/*
 * @Author: zulezhe
 * @Date: 2022-10-23 13:58:30
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 14:05:25
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
/**

1. 第一个入参cmInstance指的是codeMirror实例，第二个是配置中的的hintOptions值。
2. 从cmInstance中getCursor指的是获取光标实例，光标实例里有行数、列数。
3. 可以从cmInstance的getLine方法里传入一个行数，从而获取行中的字符串。
4. token对象是cmInstance对光标所在字符串进行提取处理，从对应语言的类库中判断光标所在字符串的类型，方便hint提示。token中包含start、end、string、type等属性，start和end指的是光标所在字符串在这一行的起始位置和结束位置，string是提取的字符串，type表示该字符串是什么类型（keyword/operator/string等等不定）
5. 下面方法中返回的结果体意思是：下拉列表中展示hello和world两行提示，from和to表示当用户选择了提示内容后，这些提示内容要替换编辑区域的哪个字符串。方法中的代码含义是替换token全部字符串。

*/
export function handleShowHint(cmInstance, hintOptions) {
  let cursor = cmInstance.getCursor();
  let cursorLine = cmInstance.getLine(cursor.line);
  let end = cursor.ch;
  let start = end;

  let token = cmInstance.getTokenAt(cursor);
  console.log(cmInstance, cursor, cursorLine, end, token);
  // console.log(hintOptions.tables)
  // return hintOptions.tables;
  return {
    list: ["hello", "world"],
    from: { ch: token.start, line: cursor.line },
    to: { ch: token.end, line: cursor.line },
  };
}