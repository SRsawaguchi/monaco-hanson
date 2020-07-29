<template>
  <v-container class="chiraura-terminal">
    <v-card class="tool-bar">
      <v-btn rounded color="green">
        <v-icon left>mdi-play</v-icon>
        RUN
      </v-btn>
      <v-btn rounded @click="dialog = true">
        <v-badge color="primary" icon="mdi-paperclip" :value="stdin">
          <v-icon left>mdi-file-outline</v-icon>
          STDIN
        </v-badge>
      </v-btn>
    </v-card>
    <v-card class="console">
      <v-card class="command" tile flat>
        <v-icon left>mdi-chevron-right</v-icon>
        <span>gcc -Wall -o main main.c</span>
      </v-card>
      <v-card class="output" tile flat>
        <pre>{{ stdout }}</pre>
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

      <v-btn
        small
        rounded
        @click="onClickCopyButton"
        style="position: absolute; right: 0; top: 0; margin: .68em;"
      >
        <v-icon left>mdi-clipboard-outline</v-icon>
        Copy
      </v-btn>
    </v-card>

    <v-snackbar
      v-model="copySuccess"
      right
      success
      timeout="3000"
      color="success"
    >
      Copied!!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="copySuccess = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="copyFailed" right success timeout="3000" color="error">
      Copy failed...
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="copyFailed = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <StdinDialog
      :dialog="dialog"
      @close="closeDialog"
      @update="onStdinUpdate"
    ></StdinDialog>
  </v-container>
</template>

<script>
import StdinDialog from "./StdinDialog";
export default {
  name: "Terminal",
  components: { StdinDialog },
  data() {
    return {
      dialog: false,
      stdin: "",
      stdout: "Hello world!!\nHello world!!!!",
      copySuccess: false,
      copyFailed: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    onStdinUpdate(value) {
      this.stdin = value;
    },
    onClickCopyButton() {
      if (this.stdout === "") {
        return;
      }

      navigator.clipboard.writeText(this.stdout).then(
        () => {
          this.copySuccess = true;
        },
        () => {
          this.copyFailed = true;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.chiraura-terminal {
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: none;
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
