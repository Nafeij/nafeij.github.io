import { css } from "@emotion/react";
import { Helmet } from "react-helmet";
import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "@styles";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import tw from "twin.macro";
import TransitionSeries, { genDelays } from "./TransitionSeries";
import styled from "@emotion/styled";
import { navLinks } from "@config";
import { Link } from "gatsby";
import { usePrefersReducedMotion, useScrollDirection } from "@hooks";
import { KEY_CODES, MediaContext } from "@util";

// https://github.com/bchiang7/v4

const StyledHamburgerButton = styled.button<{ menuOpen: boolean }>`
  @media (max-width: 768px) {
    position: relative;
    z-index: 10;
    width: 1.75rem;
    aspect-ratio: 1;
    box-sizing: content-box;
    padding: 0.25rem;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 80%;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: 100%;
    height: 2px;
    border-radius: 4px;
    background-color: var(--text-primary);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${({ menuOpen }) => (menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${({ menuOpen }) => (menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${({ menuOpen }) =>
        menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
    );
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: 100%;
      height: 2px;
      border-radius: 4px;
      background-color: var(--text-primary);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${({ menuOpen }) => (menuOpen ? `100%` : `120%`)};
      top: ${({ menuOpen }) => (menuOpen ? `0` : `-10px`)};
      opacity: ${({ menuOpen }) => (menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
        menuOpen
          ? "top 0.1s ease-out, opacity 0.1s ease-out 0.12s, width 0.34s"
          : "top 0.1s ease-in 0.25s, opacity 0.1s ease-in, width 0.34s"};
    }
    &:after {
      width: ${({ menuOpen }) => (menuOpen ? `100%` : `80%`)};
      bottom: ${({ menuOpen }) => (menuOpen ? `0` : `-10px`)};
      transform: rotate(${({ menuOpen }) => (menuOpen ? `90deg` : `0`)});
      transition: ${({ menuOpen }) =>
        menuOpen
          ? "bottom 0.1s ease-out, transform 0.1s ease-out 0.12s, width 0.34s"
          : "bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19), width 0.34s"};
    }
  }
`;

const StyledSidebar = styled.aside<{ menuOpen: boolean }>`
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 100%;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75%, 400px);
    height: 100vh;
    background-color: var(--bg-secondary);
    box-shadow: -10px 0px 30px -15px #00000088;
    outline: 0;
    z-index: 9;
    transform: translateY(-100%)
      translateX(${({ menuOpen }) => (menuOpen ? 0 : 100)}%);
    visibility: ${({ menuOpen }) => (menuOpen ? "visible" : "hidden")};
    transition: var(--transition);
  }

  nav {
    width: 100%;
    flex-direction: column;
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }

      &:before {
        content: "0" counter(item) ".";
        display: block;
        margin-bottom: 5px;
      }
    }

    a {
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link::before {
    content: "";
    display: block;
    height: 2px;
    background-color: var(--text-secondary);
    margin: 1.75rem 6rem;
    opacity: 0.4;
  }
`;

const StyledLinks = styled.div`
  font-family: var(--font-mono);
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  ol {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;

      a {
        padding: 10px;

        &:before {
          content: "0" counter(item) ".";
          margin-right: 5px;
          text-align: right;
          color: var(--text-secondary);
        }
      }
    }
  }

  .resume-button {
    margin-left: 15px;
  }
`;

const DarkButton = ({ toggleDark }: { toggleDark: () => void }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <button
      tw="h-8 z-10 aspect-square border-0 outline-0 flex justify-center items-center bg-transparent hover:scale-110 active:scale-90 md:h-10"
      css={{
        "& > svg": [tw`h-full aspect-square text-[var(--text-primary)]`],
      }}
      onClick={toggleDark}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

const Resume = () => (
  <a href="/Resume_Jiefan.pdf" className="resume-link">
    Resume
  </a>
);

const ANIM_DURATION = 600;

const innerDuration =
  (ANIM_DURATION * (navLinks.length + 1)) / (navLinks.length + 3);

export default function NavBar({
  scrollRef,
  toggleDark,
}: {
  scrollRef: React.RefObject<HTMLDivElement>;
  toggleDark: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [overrideScroll, setOverrideScroll] = useState(false);
  const { isMatch } = useContext(MediaContext);
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollDirection = useScrollDirection({
    containerRef: scrollRef,
    horizontal: !isMatch("md"),
    thresholdPixels: 50,
    off: overrideScroll,
  });

  const handleScroll = () => {
    setOverrideScroll(false);
    const scroll = scrollRef.current;
    // console.log(scroll?.scrollTop, scroll?.scrollLeft);
    setScrolledToTop(
      scroll ? scroll.scrollTop < 50 && scroll.scrollLeft < 50 : false
    );
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /*
  const navRef = useRef<HTMLElement>(null);

  const menuFocusables = useRef<HTMLAnchorElement[]>([]);
  */

  const onResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  /*
  const handleBackwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === menuFocusables.current[0]) {
      e.preventDefault();
      menuFocusables.current[menuFocusables.current.length - 1].focus();
    }
  };

  const handleForwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === menuFocusables.current[menuFocusables.current.length - 1]) {
      e.preventDefault();
      menuFocusables.current[0].focus();
    }
  };
  */

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setOverrideScroll(false);
        break;
      }

      case KEY_CODES.TAB: {
        setOverrideScroll(true);
      }

      default: {
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    if (!prefersReducedMotion) {
      scrollRef.current?.addEventListener("scroll", handleScroll);
    }

    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header
      id="navbar"
      css={[
        tw`w-full bottom-0 flex items-center overflow-visible justify-between fixed z-10 p-5 md:top-0 md:bottom-auto opacity-50 md:hover:opacity-100 lg:p-8`,
        css`
          ${genDelays(3, ANIM_DURATION)}
          ${menuOpen && `opacity: 1;`}
          @media (prefers-reduced-motion: no-preference) {
            transform: translateY(0);
            ${!scrolledToTop &&
            ((scrollDirection === "forward" &&
              `transform: translateY(${isMatch("md") ? `-100%` : `100%`});
                box-shadow: 0 -10px 30px -10px #00000088;`) ||
              (scrollDirection === "backward" &&
                `box-shadow: 0 -10px 30px -10px #00000088;
                opacity: 1;
                background-color: var(--bg-secondary);
                padding-top: .5rem;
                padding-bottom: .5rem;
                @media (min-width: 768px) {
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                }
                `))}
          }
          @media (prefers-reduced-motion: reduce) {
            opacity: 1;
            box-shadow: 0 -10px 30px -10px #0008;
            background-color: var(--bg-secondary);
          }
        `,
      ]}
    >
      <Helmet>
        <body data-filter={menuOpen ? "blur" : ""} />
      </Helmet>
      <TransitionSeries duration={ANIM_DURATION} trigger={true}>
        <StyledLinks>
          <nav /* ref={navRef} */>
            <ol css={genDelays(navLinks.length + 1)}>
              <TransitionSeries duration={innerDuration} trigger={true}>
                {navLinks
                  .map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={`/${url}`}>{name}</Link>
                    </li>
                  ))
                  .concat([
                    <li key={-1}>
                      <Resume />
                    </li>,
                  ])}
              </TransitionSeries>
            </ol>
          </nav>
        </StyledLinks>
        <DarkButton toggleDark={toggleDark} />
        <div tw="z-0 block md:hidden">
          <StyledHamburgerButton onClick={toggleMenu} menuOpen={menuOpen}>
            <div className="ham-box">
              <div className="ham-box-inner" />
            </div>
          </StyledHamburgerButton>
          <StyledSidebar
            menuOpen={menuOpen}
            aria-hidden={!menuOpen}
            tabIndex={menuOpen ? 1 : -1}
          >
            <nav>
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link
                      to={`/${url}`}
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
              <Resume />
            </nav>
          </StyledSidebar>
        </div>
      </TransitionSeries>
    </header>
  );
}
