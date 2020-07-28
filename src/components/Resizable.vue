<template>
  <v-card
    :class="{
      resizable: true,
      layoutRow: isRowLayout,
      layoutColumn: !isRowLayout,
    }"
    flat
    tile
    ref="resizable"
    v-resize="onResize"
  >
    <v-card class="firstBlock" flat tile ref="firstBlock">
      <slot name="firstBlock"></slot>
    </v-card>
    <v-card
      class="resizer"
      flat
      tile
      ref="resizer"
      color="gray"
      draggable="true"
      @dragstart="onDragStart"
      @drag="onDrag"
      @dragend="onDragEnd"
    >
      <div class="divider"></div>
    </v-card>
    <v-card class="secondBlock" flat tile ref="secondBlock">
      <slot name="secondBlock"></slot>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "Resizable",
  props: {
    direction: {
      type: String,
      default: "row", // or column
    },
    throttleThreshold: {
      // it execute resizing process each `throttleThrethold`.
      type: Number,
      default: 10,
    },
    minSize: {
      // minimum width(or height) of each block
      type: Number,
      default: 100, // px
    },
  },
  data() {
    return {
      isResizing: false,
      counter: 0, // for throttling
      classes: {
        layoutRow: this.isRowLayout,
        layoutColumn: !this.isRowLayout,
      },
    };
  },
  mounted() {
    this.resize();
  },
  methods: {
    throttle() {
      this.counter += 1;
      return this.counter % this.throttleThreshold === 0;
    },
    onResize(e) {
      if (e && e.isTrusted) {
        this.resize();
      }
    },
    onDragStart() {
      console.log("start");
      this.isResizing = true;
    },
    resize(offset = null) {
      if (this.isRowLayout) {
        console.log("resizeX");
        this.resizeX(offset);
      } else {
        this.resizeY(offset);
      }
    },
    resizeX(offsetX = null) {
      const globalOffset = this.globalOffset;
      const minWidth = this.minSize;
      const resizable = this.resizableDom;
      const firstBlock = this.firstBlockDom;
      const resizer = this.resizerDom;
      const secondBlock = this.secondBlockDom;
      if (offsetX === null) {
        offsetX = globalOffset.left + resizer.offsetLeft;
      }

      const adjust = globalOffset.left;
      const firstWidth = offsetX - adjust;
      const secondWidth =
        resizable.offsetWidth - firstWidth - resizer.offsetWidth;

      if (firstWidth >= minWidth && secondWidth >= minWidth) {
        firstBlock.style.width = `${firstWidth}px`;
        resizer.style.left = `${firstWidth}px`;
        secondBlock.style.width = `${secondWidth}px`;
        secondBlock.style.left = `${firstWidth + resizer.offsetWidth}px`;
      }
    },
    resizeY(offsetY = null) {
      const globalOffset = this.globalOffset;
      const minHeight = this.minSize;
      const resizable = this.resizableDom;
      const firstBlock = this.firstBlockDom;
      const resizer = this.resizerDom;
      const secondBlock = this.secondBlockDom;
      if (offsetY === null) {
        offsetY = globalOffset.top + resizer.offsetTop;
        console.log(offsetY);
      } 

      const adjust = globalOffset.top;
      const firstHeight = offsetY - adjust;
      const secondHeight =
        resizable.offsetHeight - firstHeight - resizer.offsetHeight;

      if (firstHeight >= minHeight && secondHeight >= minHeight) {
        firstBlock.style.height = `${firstHeight}px`;
        resizer.style.top = `${firstHeight}px`;
        secondBlock.style.height = `${secondHeight}px`;
        secondBlock.style.top = `${firstHeight + resizer.offsetHeight}px`;
      }
    },
    onDrag({ pageX, pageY }) {
      if (!this.throttle()) {
        return;
      }
      const offset = this.isRowLayout ? pageX : pageY;
      this.resize(offset);
    },
    onDragEnd() {
      this.isResizing = false;
      console.log("end");
    },
    onLayoutChanged() {
      this.resizableDom.style = "";
      this.firstBlockDom.style = "";
      this.resizerDom.style = "";
      this.secondBlockDom.style = "";
      this.resize();
    },
  },
  computed: {
    isRowLayout() {
      return this.direction === "row";
    },
    globalOffset() {
      let element = this.$refs.resizable.$el;
      let top = 0,
        left = 0;
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left,
      };
    },
    resizableDom() {
      return this.$refs.resizable.$el;
    },
    firstBlockDom() {
      return this.$refs.firstBlock.$el;
    },
    resizerDom() {
      return this.$refs.resizer.$el;
    },
    secondBlockDom() {
      return this.$refs.secondBlock.$el;
    },
  },
  watch: {
    direction() {
      this.onLayoutChanged();
    },
  },
};
</script>

<style lang="scss">
.resizable {
  $resizerSize: 12px;

  position: relative;
  height: 100%;
  width: 100%;
  .firstBlock {
    border: 1px solid red;
    position: absolute;
  }
  .resizer {
    position: absolute;
    padding: 0;
    margin: 0;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .resizer:hover {
    border: 2px solid blue;
  }
  .secondBlock {
    position: absolute;
    border: 1px solid blue;
    border-bottom: 2px solid blue;
  }

  &.layoutRow {
    .firstBlock {
      left: 0;
      top: 0;
      width: calc(50% + -#{$resizerSize / 2});
      height: 100%;
    }
    .resizer {
      left: calc(50% + -#{$resizerSize / 2});
      top: 0;
      width: $resizerSize;
      height: 100%;
      cursor: col-resize;
      .divider {
        width: 2px;
        height: calc(1.68em * 2);
        background-color: #2d2d2d;
      }
    }
    .secondBlock {
      left: calc(50% + #{$resizerSize / 2});
      top: 0;
      width: calc(50%);
      height: 100%;
    }
  }

  &.layoutColumn {
    .firstBlock {
      left: 0;
      top: 0;
      width: 100%;
      height: calc(50% + -#{$resizerSize / 2});
    }
    .resizer {
      left: 0;
      top: calc(50% + -#{$resizerSize / 2});
      width: 100%;
      height: $resizerSize;
      cursor: row-resize;
      .divider {
        height: 2px;
        width: calc(1.68em * 2);
        background-color: #2d2d2d;
      }
    }
    .secondBlock {
      left: 0;
      top: calc(50% + #{$resizerSize / 2});
      width: 100%;
      height: calc(50%);
    }
  }
}
</style>
