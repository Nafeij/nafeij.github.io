module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', 'react-hooks', '@emotion'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@emotion/pkg-renaming': 'error',
    '@emotion/jsx-import': 'off',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
    'react/no-unknown-property': ['error', { ignore: ['css', 'tw'] }]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components'],
          ['@fonts', './src/assets/fonts'],
          ['@hooks', './src/hooks'],
          ['@images', './src/assets/images'],
          ['@pages', './src/pages'],
          ['@styles', './src/styles'],
          ['@util', './src/util'],
          ['@config', './src/config'],
          ['@icons', './src/components/icons']
        ],
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.woff', '.woff2']
      }
    },
    tailwindcss: {
      classRegex: '^tw$'
    }
  }
}
