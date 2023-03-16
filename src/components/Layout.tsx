/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { ThemeContext } from "@styles";
import React, { Fragment, useEffect } from "react";
import tw from "twin.macro";

const bgLight = css`
  background: fixed radial-gradient(ellipse at center, var(--bg-light1) 0%, var(--bg-light2) 100%);
`;

const bgDark = css`
  background: fixed var(--bg-dark1) radial-gradient(ellipse at center, var(--bg-dark2) 8%, transparent 8%);
  background-size: 8vmin 8vmin;
`;

const styles ={
  main : ({isDark} : {isDark : boolean}) => [
    tw`transition-none isolate`,
    css`counter-reset: section;`,
    isDark ? bgDark : bgLight,
  ],
  mask : ({isDark} : {isDark : boolean}) => [
    tw`fixed h-full w-full top-0 left-0`,
    css`
      clip-path: circle(0% at 100% 0%);
      animation: BackgroundSpread 700ms backwards;
      z-index: -1;
    `,
    isDark ? bgDark : bgLight ,
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = React.useContext(ThemeContext);
  const reducedMotion = usePrefersReducedMotion();

  function isDark() {
    return theme === "dark";
  }

  const [delayDark, setDelayDark] = React.useState(isDark());

  useEffect(() => {
    (reducedMotion && setDelayDark(isDark())) ||
      setTimeout(() => {
        setDelayDark(isDark());
      }, 600);
  }, [theme]);

  return (
    <Fragment>
      <div
        css={styles.main({isDark : delayDark})}
      >
        {children}
        <div
          css={styles.mask({isDark : isDark()})}
          key={theme}
        />
      </div>
    </Fragment>
  );
}
