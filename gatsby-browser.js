import { ThemeProvider } from '@styles'
import { MediaProvider } from '@util'
import React from 'react'

export const wrapRootElement = ({ element }) => (
  <MediaProvider>
    <ThemeProvider>{element}</ThemeProvider>
  </MediaProvider>
)
