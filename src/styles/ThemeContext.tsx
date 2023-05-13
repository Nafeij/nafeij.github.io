import { type ReactNode, createContext, useEffect, useState } from 'react'

const setVariant = () => {}

const getInitialTheme = () => {
  if (window?.localStorage !== undefined) {
    setVariant()
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs === 'dark'
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return true
    }
  }
  return true
}

const ThemeContext = createContext({
  isDark: true,
  setDark: (dark: boolean) => {}
})

const ThemeProvider = ({
  initialThemeIsDark,
  children
}: {
  initialThemeIsDark?: boolean
  children: ReactNode
}) => {
  const [isDark, setDark] = useState(getInitialTheme)

  const rawSetTheme = (isDark: boolean) => {
    const root = window.document.documentElement
    const theme = isDark ? 'dark' : 'light'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)

    localStorage.setItem('color-theme', theme)
  }

  if (initialThemeIsDark ?? false) {
    rawSetTheme(initialThemeIsDark ?? false)
  }

  useEffect(() => {
    rawSetTheme(isDark)
  }, [isDark])

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
