import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  globalIgnores(['.slicemachine/**']),
  ...next,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'unused-imports': unusedImports },
    settings: {
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'parent',
            },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/no-unresolved': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',

      'react/display-name': 'off',

      'jsx-a11y/alt-text': 'off',

      'unused-imports/no-unused-imports': 'error',
      /**
       * TODO enable that rule when https://github.com/sweepline/eslint-plugin-unused-imports/issues/60
       * is resolved. While it's not resolved, it's advised to set it to `error` and manually check that
       * reported offences are not false positives.
       */
      'unused-imports/no-unused-vars': [
        'off',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  prettier,
]);
