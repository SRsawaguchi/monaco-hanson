<template>
  <v-container class="program-editor pa-0">
    <div
      class="monaco-editor"
      ref="monaco"
    ></div>
    <div class="monaco-editor-status-bar " ref="monacoEditorStatusBar"></div>
  </v-container>
</template>

<script>
import * as monaco from "monaco-editor";
import { initVimMode } from "monaco-vim";
import { EmacsExtension } from "monaco-emacs";

export default {
  name: "ProgramEditor",
  data: function() {
    return {
      mode: "normal",
      editor: null,
      vim: null,
      emacs: null,
      selectedLanguage: "go",
      selectedTheme: "vs-dark",
      selectedFontSize: "12",
      supportedLanguages: [
        { id: "c", displayText: "C" },
        { id: "go", displayText: "Go" },
        { id: "php", displayText: "PHP" },
      ],
    };
  },
  mounted: function() {
    const dom = this.$refs.monaco;
    this.editor = monaco.editor.create(dom, {
      value: "",
      language: "go",
      fontSize: "16",
      minimap: {
        enabled: false,
      },
      wordWrap: "off",
      insertSpaces: false,
      tabSize: 4,
    });
    this.toVimMode();
    // this.changeTheme(this.selectedTheme)
    console.log(process.env.VUE_APP_NOT_SECRET_CODE);
    console.log(process.env.VUE_APP_API);
  },
  methods: {
    clearMode() {
      if (this.vim !== null) this.vim.dispose();
      if (this.emacs !== null) this.emacs.dispose();
      this.vim = null;
      this.emacs = null;
    },
    toEmacsMode() {
      this.clearMode();
      this.emacs = new EmacsExtension(this.editor);
      const statusNode = this.statusBar;
      this.emacs.onDidMarkChange((ev) => {
        statusNode.textContent = ev ? "Mark Set!" : "Mark Unset";
      });
      this.emacs.onDidChangeKey((str) => {
        statusNode.textContent = str;
      });
      this.emacs.start();
      console.log("emacs mode");
    },
    toVimMode() {
      this.clearMode();
      this.vim = initVimMode(this.editor, this.statusBar);
      console.log("vim mode");
    },
    format() {
      console.log("format");
      this.editor.trigger("ProgramEditor", "editor.action.formatDocument");
    },
    changeMode() {
      if (this.vim != null) {
        this.toEmacsMode();
      } else if (this.emacs != null) {
        this.clearMode();
      } else {
        // in normal mode
        this.toVimMode();
      }
      this.editor.focus();
    },
    changeLanguage(langId) {
      monaco.editor.setModelLanguage(this.editor.getModel(), langId);
      console.log("changeLanguage:" + langId);
      this.editor.focus();
    },
    changeTheme(themeId) {
      console.log(themeId);
      monaco.editor.setTheme(themeId);
    },
    changeFontSize(fontSize) {
      this.editor.updateOptions({
        fontSize: fontSize,
      });
    },
    switchDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    statusBar() {
      return this.$refs.monacoEditorStatusBar;
    },
    // languages() {
    //   return monaco.languages.getLanguages();
    // },
    themes() {
      return [
        {
          label: "VS",
          value: "vs",
        },
        {
          label: "VS Dark",
          value: "vs-dark",
        },
        {
          label: "High Contrast (Dark)",
          value: "hc-black",
        },
      ];
    },
    fontSizes() {
      return [
        {
          label: "small",
          value: "12",
        },
        {
          label: "medim",
          value: "16",
        },
        {
          label: "large",
          value: "20",
        },
      ];
    },
  },
  watch: {
    selectedLanguage() {
      this.changeLanguage(this.selectedLanguage.id);
    },
    selectedTheme() {
      this.changeTheme(this.selectedTheme);
    },
    selectedFontSize() {
      console.log("changed");
      this.changeFontSize(this.selectedFontSize);
    },
  },
};
</script>

<style lang="scss">
.program-editor {
  $statusBarHeight: 1.2em;
  position: relative;
  height: 100%;
  width: 100%;
  .monaco-editor {
    position:absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: calc(100% - #{$statusBarHeight});
  }
  .monaco-editor-status-bar {
    position: absolute;
    bottom: 0;
    left : 0;
    height: #{$statusBarHeight};
    width: 100%;
    padding: 0;
    padding-left: .68em;
    margin: 0;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: start;
  }
}
</style>
