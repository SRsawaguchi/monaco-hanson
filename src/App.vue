<template>
  <v-app>
    <v-app-bar color="" dense app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-row class="d-flex fill-height" no-gutters>

        <v-col  class="fill-height flex-grow-0">
          <v-list class="fill-height" width="54px">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="drawer = !drawer"
            >
              <v-list-item-action v-on="on">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content></v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="8" class="fill-height" style="background-color: #555"></v-col>
        <v-col  class="fill-height" style="background-color: #888"></v-col>
      </v-row>

      <!-- Drawer (Settings) -->
      <v-navigation-drawer v-model="drawer" absolute temporary>
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
                <v-switch v-model="darkmode"></v-switch>
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
    </v-main>

    <v-footer app>
      this is footer
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      darkmode: true,
      drawer: false,
      items: [{ title: "editor settings", icon: "mdi-cog" }],
      selectedIndent: "spaces",
      indents: ["spaces", "tabs"],
      selectedFontSize: 12,
      fontSizes: [12, 14, 18],
      keybindings: ["normal", "vim", "emacs"],
      selectedKeybinding: "normal",
    };
  },
  methods: {
    onClick() {
      this.drawer = !this.drawer;
    },
  },
  watch: {
    darkmode() {
      console.log(this.darkmode);
      if (this.darkmode) {
        console.log("Darkmode!");
      }
    },
  },
};
</script>
