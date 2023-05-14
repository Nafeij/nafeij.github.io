import { type ReactNode, createContext, useEffect, useState } from 'react'

const setVariant = () => {
  const root = window.document.documentElement
  let variant = window.localStorage.getItem('theme-variant')
  if (variant === null || variant === '3') {
    variant = '0'
  }
  root.dataset.variant = variant
  localStorage.setItem('theme-variant', `${(+variant) + 1}`)
}

const getInitialTheme = () => {
  if (window?.localStorage !== undefined) {
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

  useEffect(() => {
    setVariant()
  }, [])

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
