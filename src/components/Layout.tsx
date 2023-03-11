import React, { createContext, useCallback } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, theme } from "../styles/theme";

const Main = styled.div`
  ${({ background }: { background: string }) => background};
`;

interface ToggleMaskProps {
  background: string;
  key: string;
}

const ToggleMask = styled.div.attrs((props: ToggleMaskProps) => ({
  key: props.key,
}))<ToggleMaskProps>`
  ${({ background }: { background: string }) => background}
  clip-path: circle(0% at 100% 0%);
  animation: BackgroundSpread 500ms backwards;
`;

export const ToggleContext = createContext(function () {});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(true);
  const [delayDark, setDelayDark] = React.useState(true);

  const toggleDark = useCallback(() => {
    setDark(!dark);
    setTimeout(() => {
      setDelayDark(!delayDark);
    }, 400);
  }, [dark, delayDark]);

  return (
    <ThemeProvider theme={dark ? darkTheme : theme}>
      <Main
        className="transition-none isolate"
        background={delayDark ? darkTheme.background : theme.background}
      >
        <ToggleContext.Provider value={toggleDark}>
          {children}
        </ToggleContext.Provider>
        <ToggleMask
          className="fixed h-full w-full top-0 left-0 z-[-1]"
          background={dark ? darkTheme.background : theme.background}
          key={dark + ""}
        />
      </Main>
    </ThemeProvider>
  );
}
