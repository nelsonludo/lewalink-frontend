import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// tailwind.config.js
export const content = ["./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: "#BB29FF",
    },
  },
};
export const plugins = [];
