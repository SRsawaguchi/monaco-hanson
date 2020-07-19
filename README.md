# monaco-hanson

Example of Monaco Editor + Vue.js + Vuetify

## Install Vuetify

```
vue add vuetify
```

- I choose Recommended.

## Install Monaco Editor

```
npm install monaco-editor@0.20.0
npm install monaco-editor-webpack-plugin
```

link

- https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-esm.md
- https://github.com/Microsoft/monaco-editor-webpack-plugin

## Install Monaco Plugin (Emacs, Vim)

### Vim

https://github.com/brijeshb42/monaco-vim

```
npm install monaco-vim
```

### Emacs

https://github.com/brijeshb42/monaco-emacs

```
npm install monaco-emacs
```

## Using env
1. Create `.env` file in this project root directory.
1. Write environment variables in the `.env`. Variable name needs `VUE_APP_` prefix.
1. Use variable in `src` program. (`process.env.VARIABLE_NAME`)

Note
- `.env.local` contained in `.gitignore`. It will be loaded running locally(`npm run serve`) only.
- After editing `.env`, it needs restart server.


## Using custom color theme in Vuetify
1. Edit `src/plugins/vuetify.js`.
1. `this.$vuetify.dark = <bool>` can switch dark or light.

https://vuetifyjs.com/ja/customization/theme/
