<template>
  <v-card class="exec-result">
    <v-card
      v-for="(cmd, index) in commands"
      :key="index"
      class="command"
      tile
      flat
    >
      <v-icon left>mdi-chevron-right</v-icon>
      <span>{{ cmd }}</span>
    </v-card>

    <v-card v-if="output" class="output" tile flat>
      <pre>{{ output }}</pre>
    </v-card>
    <v-card v-else class="empty-output" outlined flat>
      <v-chip label outlined class="empty-chip">
        <v-icon left>mdi-information-outline</v-icon>
        No output
      </v-chip>
    </v-card>

    <v-card class="exec-info" tile flat>
      <v-chip dark small>
        <v-icon left>mdi-clock-outline</v-icon>
        Time Elapsed: {{ elapsedTimeMs }} MS
      </v-chip>

      <v-chip dark small :color="returnValueColor">
        <v-icon left>mdi-function</v-icon>
        Return Value: {{ returnValue }}
      </v-chip>
    </v-card>

    <v-btn
      class="btn-copy"
      small
      rounded
      @click="onClickCopyButton"
      :disabled="output === ''"
    >
      <v-icon left>mdi-clipboard-outline</v-icon>
      Copy
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "ExecResult",
  props: {
    commands: Array,
    output: String,
    elapsedTimeMs: Number,
    returnValue: Number,
  },
  methods: {
    onClickCopyButton() {
      if (this.output === "") {
        return;
      }

      navigator.clipboard.writeText(this.output).then(
        () => {
          this.$emit("copySuccess", this.output);
        },
        () => {
          this.$emit("copyFailed", this.output);
        }
      );
    },
  },
  computed: {
    returnValueColor() {
      return this.returnValue !== 0 ? "error" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.exec-result {
  margin: 0.68em 0;
  padding: 0.68em;
  .command {
    > span {
      font-family: monospace, monospace;
    }
  }
  .output {
    pre {
      margin-left: 8px;
      line-height: 1.14;
    }
  }
  .empty-output {
    width: 68%;
    margin: 0.68em auto;
    text-align: center;
    .empty-chip {
      border: 0;
    }
  }
  .exec-info {
    padding: 0;
    font-size: 0.68em;
    > * {
      margin: 0.68em 0;
      margin-right: 0.68em;
      margin-bottom: 0;
    }
  }
  .btn-copy {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.68em;
  }
}
</style>
