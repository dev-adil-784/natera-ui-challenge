import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  pluginReactConfig,
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
  },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/react-in-jsx-scope': 'off',
    },
  },
]
