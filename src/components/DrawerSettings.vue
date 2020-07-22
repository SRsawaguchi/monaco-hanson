<template>
  <!-- Drawer (Settings) -->
  <v-navigation-drawer absolute temporary v-model="drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Settings
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />
    <v-list flat>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Dark mode</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-container>
      <v-select
        label="Indent types"
        :items="indents"
        v-model="selectedIndent"
        flat
      ></v-select>
      <v-select
        label="Font size"
        :items="fontSizes"
        v-model="selectedFontSize"
        flat
      ></v-select>
      <v-select
        label="keybindings"
        :items="keybindings"
        v-model="selectedKeybinding"
        flat
      ></v-select>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DarwerSettings",
  props: ["open"],
  data() {
    return {
      selectedIndent: "spaces",
      indents: ["spaces", "tabs"],
      selectedFontSize: 12,
      fontSizes: [12, 14, 18],
      keybindings: ["normal", "vim", "emacs"],
      selectedKeybinding: "normal",
    };
  },
  methods: {},
  computed: {
    drawer: {
      set(value) {
        this.$emit("toggle", value)
      },
      get() {
        return this.open
      },
    },
  },
};
</script>

<style></style>
