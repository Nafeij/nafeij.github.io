/** @jsx jsx */
import { jsx } from "@emotion/react";

import React, { createContext, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import usePrefersReducedMotion from "../hooks/reducedMotion";
import GlobalStyle from "../styles/GlobalStyle";
import { darkTheme, theme } from "../styles/theme";

export const ToggleContext = createContext(function () {});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(true);
  const [delayDark, setDelayDark] = React.useState(true);
  const reducedMotion = usePrefersReducedMotion();

  const toggleDark = useCallback(() => {
    setDark(!dark);
    (reducedMotion && setDelayDark(!delayDark)) ||
      setTimeout(() => {
        setDelayDark(!delayDark);
      }, 600);
  }, [dark, delayDark]);

  return (
    <ThemeProvider theme={dark ? darkTheme : theme}>
      <GlobalStyle />
      <div
        tw="transition-none isolate [counter-reset: section]"
        css={`${delayDark ? darkTheme.background : theme.background}`}
      >
        <ToggleContext.Provider value={toggleDark}>
          {children}
        </ToggleContext.Provider>
        <div
          tw="fixed h-full w-full top-0 left-0"
          css={`
            clip-path: circle(0% at 100% 0%);
            animation: BackgroundSpread 700ms backwards;
            z-index: -1;
            ${dark ? darkTheme.background : theme.background}
          `}
          key={dark + ""}
        />
      </div>
    </ThemeProvider>
  );
}
