# shellwing-website

The website of [shellwing](https://github.com/hivepaas/shellwing), at
[shellwing.app](https://shellwing.app): a landing page built with
[Astro](https://astro.build), in `landing/`.

```sh
yarn install
yarn dev            # http://localhost:3200
yarn build          # landing/dist
yarn lint
```

- **Themes.** The theme picker's colors come from shellwing's own theme files:
  `cd landing && node scripts/themes.mjs <path to shellwing>` writes
  `src/data/themes.json`.
- **Images.** `cd landing && node og/render.mjs` renders `og/og-image.svg` to
  `public/og-image.png`, and the logo to the favicons.
- **Release.** A tag `vX.Y.Z` builds the image (nginx serving the static site on
  3200) and pushes it to `ghcr.io/hivepaas/shellwing-website`.
