/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { ThemeContext } from "@styles";
import React, {
  createContext,
  Fragment,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { scrollHorizontal } from "@hooks";
import tw from "twin.macro";
import { MediaContext } from "@util";

const backgroundSpread = keyframes`
100% {
  clip-path: circle(283% at 100% 0%);
}
`;

const bgLight = css`
  background: fixed radial-gradient( ellipse at center, var(--bg-light1) 0%, var(--bg-light2) 100% );
`;

const bgDark = css`
  background: fixed var(--bg-dark1) radial-gradient(ellipse at center, var(--bg-dark2) 8%, transparent 8%);
  background-size: 8vmin 8vmin;
`;

export const ScrollContainerRefContext =
  createContext<RefObject<HTMLDivElement> | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);
  const { isMatch } = useContext(MediaContext);
  const reducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [delayDark, setDelayDark] = React.useState(isDark());

  function isDark() {
    return theme === "dark";
  }

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (isMatch("md")) return;
      scrollHorizontal(scrollRef, e);
    },
    [scrollRef]
  );

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
          tw`relative transition-none isolate flex flex-nowrap items-center w-screen h-screen overflow-x-auto snap-mandatory snap-x md:snap-none flex-row md:flex-col md:overflow-x-hidden md:overflow-y-auto text-secondary text-lg md:text-xl lg:text-2xl`,
          css`
            counter-reset: section;

            h1 {
              ${tw`font-bold text-3xl text-primary md:text-4xl lg:text-5xl`}
            }

            h2 {
              ${tw`font-bold text-2xl md:text-3xl lg:text-4xl`}
            }

            a {
              color: var(--text-primary);
              :hover {
                color: var(--link-color);
              }
            }
          `,
          delayDark ? bgDark : bgLight,
        ]}
        ref={scrollRef}
        onWheel={handleScroll}
      >
        <ScrollContainerRefContext.Provider value={scrollRef}>
          {children}
        </ScrollContainerRefContext.Provider>
        <div
          css={[
            tw`fixed h-full w-full top-0 left-0`,
            css`
              clip-path: circle(0% at 100% 0%);
              animation: ${backgroundSpread} 700ms backwards;
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
