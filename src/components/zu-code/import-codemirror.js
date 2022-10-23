/*
 * @Author: zulezhe
 * @Date: 2022-10-23 14:00:01
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 16:42:17
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
// 引入全局实例
import _CodeMirror from "codemirror";

// 核心样式
import "codemirror/lib/codemirror.css";
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
// 主题
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/keymap/sublime.js";
// 快捷键
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/comment/comment.js";
// 自动括号匹配
import "codemirror/addon/edit/matchbrackets.js";
// 自动闭合标签
import "codemirror/addon/edit/closetag.js";
// 搜索
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/jump-to-line";
import "codemirror/addon/search/matchesonscrollbar";
import "codemirror/addon/search/match-highlighter";
// 高亮
import "codemirror/addon/search/match-highlighter.js";
// 高亮行功能
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/selection-pointer";
// 折叠
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
//代码补全提示
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
// 全屏
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen.js";
// 自动关闭
import "codemirror/addon/edit/closebrackets.js"; // 在键入时自动关闭括号和引号
// 格式化
// html中使用emmetio插件
// import emmet from "@emmetio/codemirror-plugin";
// emmet(_CodeMirror);

export default _CodeMirror  