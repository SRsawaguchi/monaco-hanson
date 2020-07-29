<template>
  <v-container class="chiraura-terminal">
    <v-card class="tool-bar">
      <v-btn rounded>
        <v-icon left>mdi-play</v-icon>
        RUN
      </v-btn>
      <v-btn rounded>
        <v-icon left>mdi-file-outline</v-icon>
        STDIN
      </v-btn>
      <v-btn rounded>
        <v-icon left>mdi-clipboard-outline</v-icon>
        Copy
      </v-btn>
    </v-card>
    <v-card class="console">
      <v-card class="command" tile flat>
        <v-icon left>mdi-chevron-right</v-icon>
        <span>gcc -Wall -o main main.c</span>
      </v-card>
      <v-card class="output" tile flat>
        <pre>
hello world!
hello world!</pre
        >
      </v-card>
      <v-card class="exec-info" tile flat>
        <v-chip dark>
          <v-icon left>mdi-clock-outline</v-icon>
          Time Elapsed: 1100ms
        </v-chip>
        <v-chip dark>
          <v-icon left>mdi-function</v-icon>
          Return Value: 0
        </v-chip>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Terminal",
};
</script>

<style lang="scss" scoped>
.chiraura-terminal {
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  border: 1px solid green;
  background-color: #2d2d2d;
  color: #fafafa;

  .tool-bar {
    padding: 0.68em;
    > * {
      margin: 0 0.68em;
    }
  }
  .console {
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
    .exec-info {
      padding: 0;
      font-size: 0.68em;
      > * {
        margin: 0.68em 0;
        margin-right: 0.68em;
        margin-bottom: 0;
      }
    }
  }
}
</style>
