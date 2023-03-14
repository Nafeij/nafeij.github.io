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
    'plugin:import/typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
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
          ['@util', './src/util']
        ],
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.woff', '.woff2']
      }
    }
  }
}
