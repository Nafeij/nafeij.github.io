/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
import { ThemeContext } from "@styles";
import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  WheelEvent,
} from "react";
import { scrollHorizontal } from "@hooks";
import tw from "twin.macro";
import { MediaContext } from "@util";
import { Footer, NavBar } from "@components";
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

export const ScrollContainerRefContext =
  createContext<RefObject<HTMLDivElement> | null>(null);

export default function Layout({
  children,
  location,
}: {
  children: ReactNode;
  location: WindowLocation;
}) {
  const { isDark, themeSet } = useContext(ThemeContext);
  const { isMatch } = useContext(MediaContext);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <NavBar scrollRef={scrollRef} />
      <div
        id="content"
        css={[
          tw`relative transition-none isolate flex flex-nowrap items-center w-screen h-screen overflow-x-auto snap-mandatory snap-x md:snap-none flex-row md:flex-col md:overflow-x-hidden md:overflow-y-auto scroll-smooth motion-reduce:scroll-auto`,
          css`
            background: var(--bg-under);
            counter-reset: section;
          `,
        ]}
        ref={scrollRef}
        onWheel={handleScroll}
      >
        <ScrollContainerRefContext.Provider value={scrollRef}>
          {children}
        </ScrollContainerRefContext.Provider>
        <Footer />
        <div
          id="fakeBg"
          css={[
            tw`transition-none fixed h-full w-full top-0 left-0 pointer-events-none`,
            css`
              background: var(--bg);
              z-index: -1;
            `,
            themeSet &&
              css`
                animation: ${backgroundSpread} 1s ease-out both;
                @media (min-width: 768px) {
                  animation: ${backgroundSpreadBelow} 1s ease-out both;
                }
              `,
          ]}
          key={isDark + ""}
        />
      </div>
    </div>
  );
}
