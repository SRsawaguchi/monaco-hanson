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

    <ExecResult
      v-for="(result, index) in execResults"
      :key="index"
      :commands="result.commands"
      :output="result.output"
      :elapsedTimeMs="result.elapsedTimeMs"
      :returnValue="result.returnValue"
      @copySuccess="copySuccess = true"
      @copyFailed="copyFailed = true"
    ></ExecResult>

    <StdinDialog
      :dialog="dialog"
      @close="closeDialog"
      @update="onStdinUpdate"
    ></StdinDialog>

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
  </v-container>
</template>

<script>
import StdinDialog from "./StdinDialog";
import ExecResult from "./ExecResult";

export default {
  name: "Terminal",
  components: { StdinDialog, ExecResult },
  data() {
    return {
      dialog: false,
      stdin: "",
      stdout: "Hello world!!\nHello world!!!!",
      copySuccess: false,
      copyFailed: false,
      execResults: [
        {
          commands: ["go run main.go"],
          output: "",
          elapsedTimeMs: 0,
          returnValue: 0,
        },
        {
          commands: ["go run main.go"],
          output: "error",
          elapsedTimeMs: 10,
          returnValue: 1,
        },
        {
          commands: ["gcc -Wall -o main main.c", "./main"],
          output: "Hello!!\nHello, World!!",
          elapsedTimeMs: 4,
          returnValue: 0,
        },
      ],
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
}
</style>
