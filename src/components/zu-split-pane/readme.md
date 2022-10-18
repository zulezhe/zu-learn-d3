# 分割面板组件

## 使用方法

```html
<script setup>
  import ZuSplitPane from "@/components/zu-split-pane/index.vue";
  let offset = ref(0.4);
  function move(val) {
    offset.value = val;
  }
</script>

<template>
  <zu-split-pane v-model:val="offset" @move="move">
    <template #left>
      <h1>左侧内容</h1>
    </template>
    <template #right>
      <h1>右侧内容</h1>
    </template>
  </zu-split-pane>
</template>
```
