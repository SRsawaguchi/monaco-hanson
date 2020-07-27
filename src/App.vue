<template>
  <v-app id="chiraura" style="position: relative;">
    <v-app-bar id="chiraura-app-bar" color="" dense elevation="0" app>
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

    <v-main id="chiraura-main">
      <SideNav
        id="chiraura-app-nav"
        @onClickItem="onClickNavigationItem"
        :items="items"
      />
      <v-card id="chiraura-ide" tile>
        <v-card id="chiraura-editor" tile>
          <ProgramEditor></ProgramEditor>
        </v-card>
        <v-card class="chiraura-size-handler" tile>
          <div class="chiraura-divider"></div>
        </v-card>
        <v-card id="chiraura-terminal" tile></v-card>
      </v-card>
      <DrawerSettings :open="drawer" @toggle="toggleDrawer" />
    </v-main>
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

<style>
#chiraura {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#chiraura-main {
  position: relative;
  margin: 0;
  padding: 0;
}

#chiraura-app-bar {
}

#chiraura-app-nav {
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100vh - 48px);
}

#chiraura-ide {
  position: absolute;
  top: 0;
  left: 54px;
  width: calc(100vw - 54px);
  height: calc(100vh - 48px);
  background-color: #ccc;
  padding: 0;
  margin: 0;
}

#chiraura-editor {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% + -5px);
  height: 100%;
  border: 1px solid blue;
}

.chiraura-size-handler {
  position: absolute;
  left: calc(50% + -5px);
  top: 0;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
}

.chiraura-size-handler .chiraura-divider {
  width: 1px;
  height: 48px;
  background-color: #000;
}

#chiraura-terminal {
  position: absolute;
  left: calc(50% + 5px);
  top: 0;
  width: calc(50% + 0px);
  height: 100%;
  border: 1px solid violet;
}
</style>
