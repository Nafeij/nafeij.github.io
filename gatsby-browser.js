import { ThemeProvider } from '@styles'
import { MediaProvider } from '@util'

export const wrapRootElement = ({ element }) => (
  <MediaProvider>
    <ThemeProvider>{element}</ThemeProvider>
  </MediaProvider>
)
