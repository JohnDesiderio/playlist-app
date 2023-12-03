# Anonymous Playlist Mixer
- The website for the anonymous playlist has been removed and will reappear on the website [https://johndesiderio.github.io/website/#/playlist-mixer](https://johndesiderio.github.io/website/#/playlist-mixer) with cooler public changes coming soon! 😉😉😉
- If you would like me to demo this repository, please reach out to me at johnfrancisdesiderio2@gmail.com!
- If you want to clone the repository, make sure you setup your own [Spotify Api Project](https://developer.spotify.com/dashboard) and use your own client_id because using mine won't work!
- Change the client_id on line 20 in ~/src/components/components-manager/components-manager.tsx
- The repository is currently linked to my Firebase account... that would funny if you used it for your own project, but you can make your own for free and change the Firebase SDK setup in the ~/src/composables/useDb.ts
- ```npm run dev``` will start the application!!!

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
