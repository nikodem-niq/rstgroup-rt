const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ["turbo", "next/core-web-vitals"],
  plugins: ["@typescript-eslint", "tailwindcss"],
  parser: "@typescript-eslint/parser",
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-console": 1,
    "turbo/no-undeclared-env-vars": "off",
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
