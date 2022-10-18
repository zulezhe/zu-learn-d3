<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{ width: leftOffsetPercent }">
      <slot name="left"></slot>
    </div>

    <div
      class="pane-trigger-con"
      @mousedown="handleMousedown"
      :style="{ left: triggerLeft, width: `${triggerWidth}px` }"
    >
      <!-- 中间分割按钮 -->
      <div class="pane-trigger-con__button">
        <div v-for="i in 10" :key="i"></div>
      </div>
    </div>

    <div class="pane pane-right" :style="{ left: leftOffsetPercent }">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ZuSplitPane",
  props: {
    //分割值
    val: {
      type: Number,
      default: 0.5,
    }, //按钮宽度
    triggerWidth: {
      type: Number,
      default: 8,
    }, //最大分割值/最小分割值
    min: {
      type: Number,
      default: 0.1,
    },
    max: {
      type: Number,
      default: 0.9,
    },
  },
  data() {
    return {
      // leftOffset: 0.3,
      canMove: false,
      initOffset: 0,
    };
  },
  computed: {
    //计算左边面板的宽度
    leftOffsetPercent() {
      console.log(this.val);
      return `${this.val * 100}%`;
    }, //右边面板的marginleft
    triggerLeft() {
      return `calc(${this.val * 100}% - ${this.triggerWidth / 2}px)`;
    },
  },
  methods: {
    //鼠标点击 鼠标移动事件 计算偏差
    handleMousedown(event) {
      document.addEventListener("mousemove", this.handleMousemove);
      document.addEventListener("mouseup", this.handleMouseup);
      this.initOffset =
        event.pageX - event.srcElement.getBoundingClientRect().left;
      this.canMove = true;
    }, //鼠标移动事件 计算移动距离
    handleMousemove(event) {
      if (!this.canMove) return;
      const outerRect = this.$refs.outer.getBoundingClientRect();
      let offsetPercent =
        (event.pageX -
          this.initOffset +
          this.triggerWidth / 2 -
          outerRect.left) /
        outerRect.width;
      if (offsetPercent < this.min) offsetPercent = this.min;
      if (offsetPercent > this.max) offsetPercent = this.max; // this.$emit('input', offsetPercent)
      this.$emit("move", offsetPercent);
    },
    handleMouseup() {
      this.canMove = false;
    },
  },
};
</script>
<style lang="scss">
.split-pane-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .pane {
    position: absolute;
    top: 0;
    height: 100%;
    &-left {
      background: transparent;
      padding: 10px;
      box-sizing: border-box;
    }
    &-right {
      box-sizing: border-box;
      right: 0;
      bottom: 0;
      background: transparent;
      padding: 10px;
    }
    &-trigger-con {
      height: 100%;
      background: rgb(240, 240, 240);
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
      .pane-trigger-con__button {
        border: 1px solid lightgrey;
        width: calc(100% - 2px);
        height: 20px;
        margin: 0 auto;
        position: relative;
        top: 50%; /*偏移*/
        transform: translateY(-50%);
        border-radius: 2px;
        div {
          margin: 1px 0;
          width: 100%;
          height: 1px;
          background-color: lightgrey;
        }
      }
    }
  }
}
</style>
