module.exports = {
  plugins: ['import', 'unused-imports'],
  extends: [
    'next/core-web-vitals',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'prettier',
  ],
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: ['<root>/tsconfig.json'],
      },
    },
  },
  rules: {
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
    'import/named': 'error',
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
  overrides: [
    {
      files: ['*.js'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2022,
      },
    },
  ],
};
