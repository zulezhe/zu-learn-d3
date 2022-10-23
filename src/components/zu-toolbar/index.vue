<!--
 * @Author: zulezhe
 * @Date: 2022-10-19 00:34:03
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 12:10:31
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div class="toolbar">
    <div class="item">
      <a-switch
        v-model:checked="checked1"
        checked-children="亮"
        un-checked-children="暗"
        @change="change"
      />
    </div>
    <div class="item">
      <a-button
        type="primary"
        :loading="formatLoading"
        size="small"
        @click="formatCode"
        >格式化</a-button
      >
    </div>
    <div class="item">
      <a-button
        type="primary"
        :loading="resetLoading"
        size="small"
        @click="reset"
        >复位</a-button
      >
    </div>
    <div class="item">
      <a-button type="primary" :loading="runLoading" size="small" @click="run"
        >运行</a-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
defineProps({
  resetLoading: {
    type: Boolean,
    default: false,
  },
  resetLoading: {
    type: Boolean,
    default: false,
  },
  formatLoading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["formatCode", "reset", "run"]);
const checked1 = ref(null);
function formatCode() {
  emit("format");
}
function reset() {
  emit("reset");
}
function run() {
  emit("run");
}
function change(val) {
  emit("changeTheme", val ? "亮" : "暗");
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  padding: 5px 1em;

  .item {
    display: inline-flex;
    align-items: center;
    margin-left: 10px;

    label {
      display: inline-block;
      margin-right: 0.2em;
    }
  }

  input,
  button,
  select {
    margin: 0;
  }

  select {
    max-width: 3em;
    max-width: 8em;
  }
}
</style>
