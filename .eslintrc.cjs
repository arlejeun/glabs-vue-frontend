/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    // '@antfu/eslint-config-vue',
    'plugin:vue/vue3-essentials',
    'plugin:@typescript-eslint/recommended',

    // "plugin:vue/vue3-essential",
    // "eslint:recommended",
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },

  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
