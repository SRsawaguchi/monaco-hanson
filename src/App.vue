<template>
  <v-app id="chiraura" style="position: relative;" v-hotkey="keymap">
    <v-app-bar
      id="chiraura-app-bar"
      color=""
      dense
      elevation="0"
      app
      height="60px"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn color="green" style="margin-right: .68em;">
        <v-icon left>mdi-play</v-icon>
        RUN
      </v-btn>
      <v-btn @click="dialog = true">
        <v-badge color="primary" icon="mdi-paperclip" :value="stdin">
          <v-icon left>mdi-file-outline</v-icon>
          STDIN
        </v-badge>
      </v-btn>

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
        <Resizable direction="row" @manuallyResizeFinished="onResizeIde">
          <template v-slot:firstBlock>
            <ProgramEditor :width="editorWidth" @execute="run"></ProgramEditor>
          </template>
          <template v-slot:secondBlock>
            <Terminal></Terminal>
          </template>
        </Resizable>
      </v-card>

      <DrawerSettings :open="drawer" @toggle="toggleDrawer" />

      <StdinDialog
        :dialog="dialog"
        @close="closeDialog"
        @update="onStdinUpdate"
      ></StdinDialog>
    </v-main>
  </v-app>
</template>

<script>
import SideNav from "./components/SideNav";
import DrawerSettings from "./components/DrawerSettings";
import Resizable from "./components/Resizable";
import ProgramEditor from "./components/ProgramEditor";
import Terminal from "./components/Terminal";
import StdinDialog from "./components/StdinDialog";

export default {
  name: "App",

  components: {
    SideNav,
    DrawerSettings,
    ProgramEditor,
    Resizable,
    Terminal,
    StdinDialog,
  },

  data() {
    return {
      drawer: false,
      items: [{ title: "editor settings", icon: "mdi-cog" }],
      editorStyles: {
        width: "",
      },
      handleStyles: {
        width: "",
        left: "",
      },
      terminalStyles: {
        width: "",
        left: "",
      },
      isResizing: false,
      editorWidth: 0,

      dialog: false,
      stdin: "",
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
    onResizeIde(newSizes) {
      this.editorWidth = newSizes.first.width;
    },

    // Edit Stdin
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    onStdinUpdate(value) {
      this.stdin = value;
    },
    run() {
      console.log('run')
    }
  },
  computed: {
    keymap() {
      return {
        "ctrl+enter": this.run,
        "meta+enter": this.run,
      };
    },
  },
};
</script>

<style lang="scss">
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
</style>
