<template>
  <v-container class="chiraura-terminal">
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
import ExecResult from "./ExecResult";

export default {
  name: "Terminal",
  components: { ExecResult },
  data() {
    return {
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
        {
          commands: ["gcc -Wall -o main main.c", "./main"],
          output: "Hello!!\nHello, World!!",
          elapsedTimeMs: 4,
          returnValue: 0,
        },
        {
          commands: ["gcc -Wall -o main main.c", "./main"],
          output: "Hello!!\nHello, World!!",
          elapsedTimeMs: 4,
          returnValue: 0,
        },
        {
          commands: ["gcc -Wall -o main main.c", "./main"],
          output: "Hello!!\nHello, World!!",
          elapsedTimeMs: 4,
          returnValue: 0,
        },
        {
          commands: ["gcc -Wall -o main main.c", "./main"],
          output:
            "Hello!!\nHello, World!!Hello!!\nHello, World!!Hello!!\nHello, World!!Hello!!\nHello, World!!Hello!!\nHello, World!!",
          elapsedTimeMs: 4,
          returnValue: 0,
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.chiraura-terminal {
  padding-top: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  background-color: #2d2d2d;
  color: #fafafa;
  overflow-y: scroll;
}
</style>
