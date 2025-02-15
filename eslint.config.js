import { dirname } from "path"
import { fileURLToPath } from "url"

import globals from "globals"
import eslint from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import tseslint from "typescript-eslint"

import love from "eslint-config-love"
import nodePlugin from "eslint-plugin-n"
import pluginPromise from "eslint-plugin-promise"

import jsxA11y from "eslint-plugin-jsx-a11y"
import tailwind from "eslint-plugin-tailwindcss"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
})

export default tseslint.config(
  { files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"] },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },

      globals: globals.node,
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  { ...love, files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"] },

  {
    ...nodePlugin.configs["flat/recommended-script"],
    rules: {
      "n/no-missing-import": [
        "error",
        {
          ignoreTypeImport: true,
          tryExtensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      ],
    },
  },
  {
    plugins: { "jsx-a11y": jsxA11y },
    rules: jsxA11y.configs.recommended.rules,
  },
  pluginPromise.configs["flat/recommended"],

  ...compat.extends("next/core-web-vitals", "next"),

  {
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
      "eslint-comments/require-description": "off",
    },
  },

  ...tailwind.configs["flat/recommended"],
  eslintPluginPrettierRecommended
)
