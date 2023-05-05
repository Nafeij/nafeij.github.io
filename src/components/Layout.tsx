/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { ThemeContext } from "@styles";
import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { scrollHorizontal } from "@hooks";
import tw from "twin.macro";
import { MediaContext } from "@util";
import { NavBar } from "@components";
import { WindowLocation } from "@reach/router";

const backgroundSpread = keyframes`
from {
  clip-path: circle(0% at 0% 100%);
}
to {
  clip-path: circle(283% at 0% 100%);
}
`;

const backgroundSpreadBelow = keyframes`
from {
  clip-path: circle(0% at 100% 0%);
}
to {
  clip-path: circle(283% at 100% 0%);
}
`;

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

export default function Layout({
  children,
  location,
}: {
  children: ReactNode;
  location: WindowLocation;
}) {
  const { isDark } = useContext(ThemeContext);
  const { isMatch } = useContext(MediaContext);
  const reducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [delayDark, setDelayDark] = useState(isDark);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (isMatch("md")) return;
      scrollHorizontal(scrollRef, e);
    },
    [scrollRef]
  );

  useEffect(() => {
    if (location.hash) return;
    const el = document.getElementById("home");
    if (el) {
      el.scrollIntoView();
      el.focus();
    }
  }, [location]);

  let timeout_func: NodeJS.Timeout;

  useEffect(() => {
    if (reducedMotion) {
      setDelayDark(isDark);
    } else {
      if (timeout_func) clearTimeout(timeout_func);
      timeout_func = setTimeout(() => {
        setDelayDark(isDark);
      }, 600);
    }
  }, [isDark]);

  return (
    <div
      css={[
        tw`text-secondary text-lg md:text-xl lg:text-2xl`,
        css`
          font-family: "source_sans_pro";
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
      ]}
    >
      <NavBar scrollRef={scrollRef}/>
      <div
        id="content"
        css={[
          tw`relative transition-none isolate flex flex-nowrap items-center w-screen h-screen overflow-x-auto snap-mandatory snap-x md:snap-none flex-row md:flex-col md:overflow-x-hidden md:overflow-y-auto scroll-smooth motion-reduce:scroll-auto`,
          css`
            counter-reset: section;
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
          id="fakeBg"
          css={[
            tw`fixed h-full w-full top-0 left-0 pointer-events-none`,
            css`
              animation: ${backgroundSpread} 700ms both;
              z-index: -1;
              @media (min-width: 768px) {
                animation: ${backgroundSpreadBelow} 700ms both;
              }
            `,
            isDark ? bgDark : bgLight,
          ]}
          key={isDark + ""}
        />
      </div>
    </div>
  );
}
