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
        <Resizable direction="column">
          <template v-slot:firstBlock>
            <ProgramEditor></ProgramEditor>
          </template>
          <template v-slot:secondBlock>
            <v-card>
              <v-card>
                <v-card-title>This is a card.</v-card-title>
              </v-card>
            </v-card>
          </template>
        </Resizable>
      </v-card>
      <DrawerSettings :open="drawer" @toggle="toggleDrawer" />
    </v-main>
  </v-app>
</template>

<script>
import SideNav from "./components/SideNav";
import DrawerSettings from "./components/DrawerSettings";
import Resizable from "./components/Resizable";
import ProgramEditor from "./components/ProgramEditor";

export default {
  name: "App",

  components: {
    SideNav,
    DrawerSettings,
    ProgramEditor,
    Resizable,
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
    startResizing({
      // target: resizer,
      pageX: initialPageX,
      // pageY: initialPageY,
    }) {
      // // const resize = (initialSize, offset = 0) => {
      // //   const width = offset + initialSize;
      // //   return width;
      // };

      console.log("down");
      this.isResizing = true;
      const { addEventListener, removeEventListener } = window;

      const onMouseMove = ({ pageX }) => {
        // const size = resize(initialPageX, pageX);
        const width = this.$refs.chirauraEditor.$el.clientWidth;
        const offset = pageX - initialPageX;
        const elm = document.getElementById("chiraura-editor");
        // this.$refs.chirauraEditor.$el.style.width = width + offset;
        elm.style.width = `${width + offset}px`;
        // console.log(this.$refs.chirauraEditor.$el.clientWidth);
        console.log(`initialPageX: ${initialPageX}, offset: ${offset}`);

        const bar = document.querySelector(".chiraura-size-handler");
        bar.style.left = `${pageX - 54}`;
        console.log(bar.style.left);
      };

      const onMouseUp = () => {
        this.isResizing = false;
        removeEventListener("mousemove", onMouseMove);
        removeEventListener("mouseup", onMouseUp);
        console.log("up");
      };
      addEventListener("mousemove", onMouseMove);
      addEventListener("mouseup", onMouseUp);
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  padding: 0;
  margin: 0;
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
