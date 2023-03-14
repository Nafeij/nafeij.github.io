import { ThemeProvider } from '@styles'
const React = require('react')

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
