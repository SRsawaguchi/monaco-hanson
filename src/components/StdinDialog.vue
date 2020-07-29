<template>
  <v-dialog v-model="dialog" persistent max-width="600px" @keydown.esc="onClose">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Stdin Value</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-card class="ma-0 pa-0" flat tile>
            <v-card-text>
              This value will be inputted your program from stdin. You can read
              this by function like <v-chip>scanf()</v-chip>.
            </v-card-text>
          </v-card>
          <v-textarea
            v-model="stdin"
            label="STDIN"
            value=""
            hint="This value will be inputted your program from stdin."
            outlined
            rows="10"
          ></v-textarea>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "StdinDialog",
  props: {
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      innerStdin: "",
    };
  },
  methods: {
    onUpdate() {
      this.$emit("update", this.stdin);
    },
    onClose() {
      this.$emit("close", this.stdin);
    },
  },
  computed: {
    stdin: {
      get() {
        return this.innerStdin;
      },
      set(value) {
        this.innerStdin = value;
      },
    },
  },
  watch: {
    stdin() {
      this.onUpdate();
    },
  },
};
</script>

<style lang="scss" scoped></style>
