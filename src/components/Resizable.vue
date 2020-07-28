<template>
  <v-card class="resizable" flat tile ref="resizable" v-resize="onResize">
    <v-card class="leftBlock" flat tile ref="leftBlock"></v-card>
    <v-card
      class="resizer"
      flat
      tile
      ref="resizer"
      color="gray"
      @dragstart="onDragStart"
      @drag="onDrag"
      @dragend="onDragEnd"
    >
      <div class="divider"></div>
    </v-card>
    <v-card class="rightBlock" flat tile ref="rightBlock"></v-card>
  </v-card>
</template>

<script>
export default {
  name: "Resizable",
  data() {
    return {
      isResizing: false,
      counter: 0, // for throttling
    };
  },
  mounted() {
    this.resize();
  },
  methods: {
    throttle() {
      this.counter += 1;
      return this.counter % 10 === 0;
    },
    onResize() {
      console.log("onResize");
      this.resize();
    },
    onDragStart() {
      console.log("start");
      this.isResizing = true;
    },
    resize(offsetX = null) {
      const minWidth = 100;
      const resizable = this.$refs.resizable.$el;
      const leftBlock = this.$refs.leftBlock.$el;
      const resizer = this.$refs.resizer.$el;
      const rightBlock = this.$refs.rightBlock.$el;
      if (offsetX === null) {
        offsetX = resizable.offsetParent.offsetLeft + resizer.offsetLeft;
      }

      const adjust = resizable.offsetParent.offsetLeft + resizer.offsetWidth;
      const leftWidth = offsetX - adjust;
      const rightWidth =
        resizable.offsetWidth - leftWidth - resizer.offsetWidth;

      if (leftWidth >= minWidth && rightWidth >= minWidth) {
        leftBlock.style.width = `${leftWidth}px`;
        resizer.style.left = `${leftWidth}px`;
        rightBlock.style.width = `${rightWidth}px`;
        rightBlock.style.left = `${leftWidth + resizer.offsetWidth}px`;
      }
    },
    onDrag({ pageX }) {
      if (!this.throttle()) {
        return;
      }
      this.resize(pageX);
    },
    onDragEnd() {
      this.isResizing = false;
      console.log("end");
    },
  },
};
</script>

<style lang="scss">
.resizable {
  position: relative;
  height: 100%;
  width: 100%;
  .leftBlock {
    border: 1px solid red;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(50% + -6px);
    height: 100%;
  }
  .resizer {
    position: absolute;
    top: 0;
    left: calc(50% + -5px);
    width: 12px;
    height: 100%;
    border: 1px solid black;
    cursor: col-resize;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .divider {
      width: 2px;
      height: calc(1.68em * 2);
      background-color: #2d2d2d;
    }
  }
  .rightBlock {
    position: absolute;
    left: calc(50% + 6px);
    top: 0;
    width: calc(50%);
    height: 100%;
    border: 1px solid blue;
  }
}
</style>
