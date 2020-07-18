<template>
  <div class="program-editor">
    <select name="language-picker" v-model="language">
      <option v-for="lang in languages" v-bind:key="lang.id" v-bind:value="lang.id">{{ lang.id }}</option>
    </select>
    <select name="theme-picker" v-model="selectedTheme">
      <option
        v-for="theme in themes"
        v-bind:key="theme.value"
        v-bind:value="theme.value"
      >{{ theme.label }}</option>
    </select>
    <select name="font-picker" v-model="selectedFontSize">
      <option
        v-for="font in fontSizes"
        v-bind:key="font.value"
        v-bind:value="font.value"
      >{{ font.label }}</option>
    </select>
    <button v-on:click="changeMode">Change Mode</button>
    <button v-on:click="format">format</button>
    <div class="monaco-editor" ref="monaco"></div>
    <div class="monaco-editor-status-bar" ref="monacoEditorStatusBar"></div>
  </div>
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
      language: "go",
      selectedTheme: "vs",
      selectedFontSize: "12"
    };
  },
  mounted: function() {
    const dom = this.$refs.monaco;
    this.editor = monaco.editor.create(dom, {
      value: "",
      language: "go",
      fontSize: "16",
      minimap: {
        enabled: false
      },
      wordWrap: "off",
      insertSpaces: false,
      tabSize: 4,
    });
    this.toVimMode();
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
      this.emacs.onDidMarkChange(ev => {
        statusNode.textContent = ev ? "Mark Set!" : "Mark Unset";
      });
      this.emacs.onDidChangeKey(str => {
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
        console.log('format');
        this.editor.trigger('ProgramEditor', 'editor.action.formatDocument');
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
        fontSize: fontSize
      });
    }
  },
  computed: {
    statusBar() {
      return this.$refs.monacoEditorStatusBar;
    },
    languages() {
      return monaco.languages.getLanguages();
    },
    themes() {
      return [
        {
          label: "VS",
          value: "vs"
        },
        {
          label: "VS Dark",
          value: "vs-dark"
        },
        {
          label: "High Contrast (Dark)",
          value: "hc-black"
        }
      ];
    },
    fontSizes() {
      return [
        {
          label: "small",
          value: "12"
        },
        {
          label: "medim",
          value: "16"
        },
        {
          label: "large",
          value: "20"
        }
      ];
    }
  },
  watch: {
    language() {
      this.changeLanguage(this.language);
    },
    selectedTheme() {
      this.changeTheme(this.selectedTheme);
    },
    selectedFontSize() {
      console.log("changed");
      this.changeFontSize(this.selectedFontSize);
    }
  }
};
</script>

<style>
.monaco-editor {
  width: 50%;
  height: 500px;
}
</style>