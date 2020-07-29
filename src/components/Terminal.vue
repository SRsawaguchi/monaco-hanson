<template>
  <v-container class="chiraura-terminal">
    <v-card class="tool-bar">
      <v-btn rounded>
        <v-icon left>mdi-play</v-icon>
        RUN
      </v-btn>
      <v-btn rounded @click="dialog = true">
        <v-badge color="primary" icon="mdi-paperclip" :value="stdin">
          <v-icon left>mdi-file-outline</v-icon>
          STDIN
        </v-badge>
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
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Stdin Value</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-card class="ma-0 pa-0" flat tile>
              <v-card-text>
                This value will be inputted your program from stdin. You can
                read this by function like <v-chip>scanf()</v-chip>.
              </v-card-text>
            </v-card>
            <v-textarea
              v-model="stdin"
              name="input-7-1"
              label="STDIN"
              value=""
              hint="This value will be inputted your program from stdin."
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Terminal",
  data() {
    return {
      dialog: false,
      stdin: "",
    };
  },
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
