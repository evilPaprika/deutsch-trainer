# Deutsche Trainer

Links:

- [vercel deployment](https://deutsch-trainer.vercel.app/)

Introducing our new language learning app designed to help users master German numbers through interactive exercises. The app focuses on enhancing listening, speaking, and writing skills by offering three engaging practice modes that cater to different aspects of language acquisition.

The first mode, **"Hören und Ergänzen"** (Listen and Complete), plays a German number aloud, and users are prompted to type in the number they heard. The second mode, **"Sehen und Schreiben"** (See and Write), displays a number on the screen, encouraging users to write it out fully in German words. The third mode, **"Hören und Sprechen"** (Listen and Speak), combines listening and speaking by playing a number and allowing users to record their own pronunciation for comparison. The app also features adjustable settings for speech speed and number range, making it customizable to individual learning needs.

Created from template for [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/).

## Features

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
