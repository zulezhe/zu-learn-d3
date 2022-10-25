## D3.js 选择

[![](https://img-blog.csdnimg.cn/e674f62411b94b95bf39afa33c8924da.webp?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBATXJUYW5nX1VuaXR5,size_10,color_FFFFFF,t_70,g_se,x_16)

0.1752022.04.17 13:18:18字数 1,199阅读 89

#### 选择（Selections）

D3 可以选择一些 HTML 或 SVG 元素并更改它们的样式和/或属性：`d3.select`和`d3.selectAll`。

这两个函数都将字符串作为其唯一参数。该字符串指定要选择的元素，并采用 CSS 选择器字符串的形式（例如`div.item`，`#my-chart`或`g:first-child`）。

-   **做出选择后，您可以使用以下函数修改其中的元素：**

| Name | 行为 | 例子 |
| --- | --- | --- |
| `.style` | 更新样式 | `d3.selectAll('circle').style('fill', 'red')` |
| `.attr` | 更新属性 | `d3.selectAll('rect').attr('width', 10)` |
| `.classed` | 添加/删除类属性 | `d3.select('.item').classed('selected', true)` |
| `.property` | 更新元素的属性 | `d3.selectAll('.checkbox').property('checked', false)` |
| `.text` | 更新文本内容 | `d3.select('div.title').text('My new book')` |
| `.html` | 更改html内容 | `d3.select('.legend').html('<div class="block"></div><div>0 - 10</div>')` |

\[//\]:`.classed` 是一个 boolean.

除了将常量值传递给`.style`, `.attr`, `.classed`, `.property`,之外`.text`，`.html`您还可以传入一个函数。例如：

```
d3.selectAll('circle')
  .attr('cx', function(d, i) {
    return i * 100;
  });
```

该函数接受两个参数，通常命名为`d`和`i`。第一个参数`d`是**连接数据**（或“数据”）。`i`是选择中元素的**索引**。

-   **可以使用该方法将事件处理程序添加到选定元素`.on`。**

此方法有两个参数：第一个是指定事件类型的字符串;第二个是触发事件时调用的函数（“回调函数”）。此回调函数有两个参数，通常命名为`e`和`d`。`e`是 DOM 事件对象并且`d`是连接数据。

最常见的事件包括（有关详细信息，请参阅[MDN 事件参考）：](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FEvents%23Standard_events)

| 活动名称 | 描述 |
| --- | --- |
| `click` | 元素已被点击 |
| `mouseenter` | 鼠标指针已移动到元素上 |
| `mouseover` | 鼠标指针已移动到元素或其子元素上 |
| `mouseleave` | 鼠标指针已移离元素 |
| `mouseout` | 鼠标指针已移离元素或其子元素 |
| `mousemove` | 鼠标指针移到元素上 |

在事件回调函数中，`this`变量绑定到触发事件的 DOM 元素。这使我们能够执行以下操作：

```
d3.selectAll('circle')
  .on('click', function(e, d) {
    d3.select(this)
      .style('fill', 'orange');
  });
```

\[//\]:这`this`是一个 DOM 元素，而不是 D3 选择，因此如果您想使用 D3 修改它，您必须首先使用`d3.select(this)`.

-   **插入和删除元素**

`.append`可以使用 D3和`.insert`方法将元素添加到选择的元素中。可以使用 删除元素`.remove`。

`.append`将一个元素附加到选择中的每个元素。如果元素已经有子元素，则新元素将成为**最后一个子元素**。第一个参数指定元素的类型。

```
d3.selectAll('g.item')
  .append('text')
  .text('A');
```

`.insert`类似于`.append`但它允许我们指定第二个参数，**该参数指定（作为 CSS 选择器）在哪个元素之前插入新元素**。

```
d3.selectAll('g.item')
  .insert('text', 'circle')
  .text('A');
```

`.remove`从页面中**删除选择中的所有元素**。例如，给定一些圆圈，您可以使用以下方法删除它们：

```
d3.selectAll('circle')
  .remove();
```

-   **链接**

大多数选择方法的返回值是选择本身。这意味着诸如 和 之类的选择方法`.style`可以`.attr`链接`.on`起来。例如：

```
d3.selectAll('circle')
  .style('fill', '#333')
  .attr('r', 20)
  .on('click', function(d, i) {
    d3.select(this)
      .style('fill', 'orange');
  });
```

-   **每个**

该`.each`方法允许您为**选择的每个元素**调用一个函数。

回调函数有两个参数，通常命名为`d`和`i`。第一个参数`d`是**连接数据**。`i`是选择中元素的**索引**。`this`关键字是指选择中的当前 HTML 或 SVG 元素。

这是一个示例，`.each`用于为每个选择的元素调用函数。该函数计算索引是奇数还是偶数，并相应地修改圆：

```
d3.selectAll('circle')
  .each(function(d, i) {
    var odd = i % 2 === 1;

    d3.select(this)
      .style('fill', odd ? 'orange' : '#ddd')
      .attr('r', odd ? 40 : 20);
  });
```

-   **调用**

该`.call`方法允许调用一个函数，**选择本身**作为第一个参数传递给该函数。

`.call`在您想要对选择进行操作的可重用函数时很有用。

例如，`colorAll`获取一个选区并将选区元素的填充设置为橙色：

```
function colorAll(selection) {
  selection
    .style('fill', 'orange');
}

d3.selectAll('circle')
  .call(colorAll);
```

-   **筛选和排序选择**

您可以使用 D3 的`.filter`方法过滤选择。第一个参数是一个函数，它返回`true`是否应该包含元素。过滤的选择由该`filter`方法返回，因此您可以继续链接选择方法。

在此示例中，您过滤偶数元素并将它们着色为橙色：

```
d3.selectAll('circle')
  .filter(function(d, i) {
    return i % 2 === 0;
  })
  .style('fill', 'orange');
```

通过调用`.sort`和传入比较器函数对选择中的元素进行排序。比较器函数有两个参数，通常是`a`和`b`，它们代表被比较的两个元素的数据。如果比较器函数返回负数，`a`将放在前面`b`，如果是正数，`a`将放在后面`b`。

```
 d3.selectAll('.person')
    .sort(function(a, b) {
      return b.score - a.score;
    });
```

禁止转载，如需转载请通过简信或评论联系作者。

更多精彩内容，就在简书APP

"小礼物走一走，来简书关注我"

还没有人赞赏，支持一下

[![  ](https://cdn2.jianshu.io/assets/default_avatar/4-3397163ecdb3855a0a4139c34a695885.jpg)](https://www.jianshu.com/u/2664c40a7eeb)

总资产42共写了9.7W字获得215个赞共17个粉丝

### 被以下专题收入，发现更多相似内容

### 推荐阅读[更多精彩内容](https://www.jianshu.com/)

-   数据可视化是指使用图表、图形等可视化对象以更清晰、更有效的方式进行数据通信的技术。 在web上，有许多库可用来可视...
    
    [![](https://upload.jianshu.io/users/upload_avatars/13822206/ac84be14-1ef4-4edc-ba91-c78493611824.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)天行无迹](https://www.jianshu.com/u/d578bdfcd3f7)阅读 12,633评论 1赞 5
    
    [![](https://upload-images.jianshu.io/upload_images/13822206-b41cbfd5d6a47e78.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/b12291a5dcb7)
-   一、前言 随着现在自定义可视化的需求日益增长，Highcharts、echarts等高度封装的可视化框架已经无法满...
    
    [![](https://upload-images.jianshu.io/upload_images/16299591-b22a65a2e03706e5.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/77e10349d394)

-   \[译\]D3.js 之 d3-selection 原理 译者注 原文: 来自 D3.js 作者 Mike Bosto...
    
-   \[译\] D3.js 嵌套选择集 (Nested Selection) 译者注: 原文: Mike Bostock ...
    
-   近期在做线路图实时刷新的功能，用到的技术主要有d3、svg、websocket。整体思路就是解析线路图json，使...
    
    [![](https://upload-images.jianshu.io/upload_images/9425632-22d37ff68b00324c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/ca5a62be1773)
-   注意：所有资料均是从d3手册翻译而来 刚开始学习d3发现最大的问题是手册都英文的，有中文翻译，但是是针对API的，...
    
    [![](https://cdn2.jianshu.io/assets/default_avatar/3-9a2bcc21a5d89e21dafc73b39dc5f582.jpg)老者偏方](https://www.jianshu.com/u/743398fedeae)阅读 3,341评论 0赞 3
    
    [![](https://upload-images.jianshu.io/upload_images/9600343-aa56d067254dcdf2.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/5500e3f59e03)
-   看完该API后，至少会画出一个简单的图形 D3.js 入门 1. d3-selection: 【 选择作图区域...
    
    [![](https://upload-images.jianshu.io/upload_images/2064404-1eb8988dd69108b7.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/45e25993297c)
-   D3.js 为什么学习D3 D3.js和threejs的应用场景完全不一样。threejs主要应用与基于webGL...
    
    [![](https://upload.jianshu.io/users/upload_avatars/1334027/1878f6893c18?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)强某某](https://www.jianshu.com/u/043c95a348f1)阅读 12,119评论 0赞 15
    
    [![](https://upload-images.jianshu.io/upload_images/1334027-b9c15d4705995f86.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/48cfe84e655e)
-   选择 D3：如果希望开发脑海中任意想象到的图表。选择 Highcharts、Echarts 等：如果希望开发几种固...
    
    [![](https://upload-images.jianshu.io/upload_images/6813214-fda448876ee85feb.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/f4a6505b3b70)
-   一.D3.js 概述 1.D3 是什么D3 的全称是（Data-Driven Documents），翻译过来就是一...
    
-   D3.js 是基于数据操作文档的 JavaScript 库，通过 HTML、SVG 和 CSS 赋予数据以生命。D...
    
-   D3.js库-2-选择元素和绑定数据 选择元素和绑定数据可以说是后续进行D3库操作的基础，所以需要掌握其基本操作 ...
    
    [![](https://upload.jianshu.io/users/upload_avatars/5142014/2641f3dc-b3e8-453b-b5b1-3d8aaba15d09.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)皮皮大](https://www.jianshu.com/u/635acc144545)阅读 208评论 0赞 2
    
    [![](https://upload-images.jianshu.io/upload_images/5142014-9f36360b7c69bbf8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/83afe172866b)
-   技术分享——用D3.js框架V5版本入门基础 一、前言  在最近公司项目中，因为需求原因需要使用D3.js实...
    
    [![](https://upload-images.jianshu.io/upload_images/2927836-dec5d96893270f76.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/ef2df4f9ebbc)
-   学习文献：http://pkuwwt.github.io/d3-tutorial-cn/adding-elemen...
    
    [![](https://upload.jianshu.io/users/upload_avatars/1945114/fe8bc57428cd.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)一个冬季](https://www.jianshu.com/u/5e75aa3cb6de)阅读 2,057评论 0赞 3
    
-   本系列 D3.js 数据可视化文章是古柳按照自己想写的逻辑来写的，可能和网上的教程都不太一样，至于会写多少篇、写成...
    
    [![](https://upload-images.jianshu.io/upload_images/7145358-14667d4966501480.png?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/132528830119)
-   今天青石的票圈出镜率最高的，莫过于张艺谋的新片终于定档了。 一张满溢着水墨风的海报一次次的出现在票圈里，也就是老谋...
    
    [![](https://cdn2.jianshu.io/assets/default_avatar/2-9636b13945b9ccf345bc98d0d81074eb.jpg)青石电影](https://www.jianshu.com/u/aa52975c0a31)阅读 8,587评论 1赞 3
    
    [![](https://upload-images.jianshu.io/upload_images/680837-5490380964d6549d?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/aed76156f092)
-   字符串 1.什么是字符串 使用单引号或者双引号括起来的字符集就是字符串。 引号中单独的符号、数字、字母等叫字符。 ...
    
-   《闭上眼睛才能看清楚自己》这本书是香海禅寺主持贤宗法师的人生体悟，修行心得及讲学录，此书从六个章节讲述了禅修是什么...
    
    [![](https://upload.jianshu.io/users/upload_avatars/12400153/7ae71049-9f82-4d1f-afe8-2f1aca8f0e31.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)宜均](https://www.jianshu.com/u/7412fb0d06c8)阅读 7,606评论 1赞 25
    
-   偶然间从公众号里看见了小白训练营的课。就点进去看了看。刚开始的时候我觉得就是骗人的。后来一想，学费那么少。干嘛...
    
-   01 为响应青岛第29届“世界休闲体育大会”，周末被朋友拖着去参加“迷你马拉松”。 我是第一次参加这样的活动，一开...
    
    [![](https://upload.jianshu.io/users/upload_avatars/4440865/0382c229-8b9e-4a15-90cc-ea16badc48e2.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)若水17](https://www.jianshu.com/u/bafd7a9338ad)阅读 3,867评论 1赞 14
    
    [![](https://upload-images.jianshu.io/upload_images/4440865-4ddec49d9f01bb4c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp)](https://www.jianshu.com/p/764c963ddfe3)