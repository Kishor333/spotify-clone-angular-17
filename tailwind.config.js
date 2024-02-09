const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");
// import { spacingValues } from "./apps/whs/src/assets/config/unit-conversion";
import { spacingValues } from "./src/assets/config/unit-conversion";

const breakpoints = require("./src/assets/config/breakpoints");
const customColor = require("./src/assets/config/variables");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.{html,ts}",
    join(__dirname, "./src/**/!(*.stories|*.spec).{ts,html}"),
    join(__dirname, "./libraries/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      ...breakpoints,

    },
    spacing: spacingValues,
    extend: {
      colors: {
        ...customColor,
      },
    },
  },
  plugins: [require("./src/assets/config/typography")],
}

