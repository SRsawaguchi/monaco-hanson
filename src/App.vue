<template>
  <v-app>
    <v-app-bar color="" dense elevation="0" app>
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
        <v-col class="fill-height flex-grow-0">
          <SideNav @onClickItem="onClickNavigationItem" :items="items" />
        </v-col>

        <v-col cols="8" class="fill-height">
          <ProgramEditor />
        </v-col>
        <v-col class="fill-height" style="background-color: #888"></v-col>
      </v-row>

      <DrawerSettings :open="drawer" @toggle="toggleDrawer" />
    </v-main>

    <v-footer app>
      this is footer
    </v-footer>
  </v-app>
</template>

<script>
import SideNav from "./components/SideNav";
import DrawerSettings from "./components/DrawerSettings";
import ProgramEditor from "./components/ProgramEditor";

export default {
  name: "App",

  components: {
    SideNav,
    DrawerSettings,
    ProgramEditor,
  },

  data() {
    return {
      drawer: false,
      items: [{ title: "editor settings", icon: "mdi-cog" }],
    };
  },
  methods: {
    toggleDrawer(val) {
      this.drawer = val;
    },
    onClickNavigationItem(idx) {
      if (idx === 0) {
        this.toggleDrawer(true);
      }
    },
  },
};
</script>
