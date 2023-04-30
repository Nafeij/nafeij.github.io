/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { ThemeContext } from "@styles";
import React, { createContext, Fragment, RefObject, useEffect } from "react";
import { scrollHorizontal } from "@hooks";
import tw from "twin.macro";
import { isMatch } from "@util";

const bgLight = css`
  background: fixed
    radial-gradient(
      ellipse at center,
      var(--bg-light1) 0%,
      var(--bg-light2) 100%
    );
`;

const bgDark = css`
  background: fixed var(--bg-dark1)
    radial-gradient(ellipse at center, var(--bg-dark2) 8%, transparent 8%);
  background-size: 8vmin 8vmin;
`;

export const ScrollContainerRefContext =
  createContext<RefObject<HTMLDivElement> | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = React.useContext(ThemeContext);
  const reducedMotion = usePrefersReducedMotion();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  function isDark() {
    return theme === "dark";
  }

  function findScrollDirection(e: React.WheelEvent<HTMLDivElement>) {
    if (!isMatch("md")) {
      scrollHorizontal(scrollRef)(e);
    }
  }

  const [delayDark, setDelayDark] = React.useState(isDark());
  let timeout_func: NodeJS.Timeout;
  useEffect(() => {
    if (reducedMotion) {
      setDelayDark(isDark());
    } else {
      if (timeout_func) clearTimeout(timeout_func);
      timeout_func = setTimeout(() => {
        setDelayDark(isDark());
      }, 600);
    }
  }, [theme]);

  return (
    <Fragment>
      <div
        css={[
          tw`transition-none isolate flex flex-row flex-nowrap w-screen h-screen md:flex-col`,
          css`
            counter-reset: section;
            overflow-y: ${isMatch("md") ? "scroll" : "hidden"};
            overflow-x: ${isMatch("md") ? "hidden" : "scroll"};
            scroll-snap-type: ${isMatch("md") ? "none" : "x mandatory"};
          `,
          delayDark ? bgDark : bgLight,
        ]}
        ref={scrollRef}
        onWheel={findScrollDirection}
      >
        <ScrollContainerRefContext.Provider value={scrollRef}>
          {children}
        </ScrollContainerRefContext.Provider>
        <div
          css={[
            tw`fixed h-full w-full top-0 left-0`,
            css`
              clip-path: circle(0% at 100% 0%);
              animation: BackgroundSpread 700ms backwards;
              z-index: -1;
            `,
            isDark() ? bgDark : bgLight,
          ]}
          key={theme}
        />
      </div>
    </Fragment>
  );
}
