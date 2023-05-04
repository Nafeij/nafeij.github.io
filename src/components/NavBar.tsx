/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { ThemeContext } from "@styles";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import tw from "twin.macro";
import TransitionSeries, {
  genDelayIntervals,
  genDelays,
} from "./TransitionSeries";
import styled from "@emotion/styled";
import { navLinks } from "@config";
import { Link } from "gatsby";

const StyledHamburgerButton = styled.button<{ menuOpen: boolean }>`
  @media (max-width: 768px) {
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
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
    width: 30px;
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: 30px;
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
      left: 0;
      right: auto;
      width: 30px;
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
          ? "top 0.1s ease-out, opacity 0.1s ease-out 0.12s"
          : "top 0.1s ease-in 0.25s, opacity 0.1s ease-in"};
    }
    &:after {
      width: ${({ menuOpen }) => (menuOpen ? `100%` : `80%`)};
      bottom: ${({ menuOpen }) => (menuOpen ? `0` : `-10px`)};
      transform: rotate(${({ menuOpen }) => (menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) =>
        menuOpen
          ? "bottom 0.1s ease-out"
          : "bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)"};
    }
  }
`;

const StyledSidebar = styled.aside<{ menuOpen: boolean }>`
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    background-color: var(--bg-secondary);
    box-shadow: -10px 0px 30px -15px #00;
    outline: 0;
    z-index: 9;
    transform: translateX(${({ menuOpen }) => (menuOpen ? 0 : 100)}vw);
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
  @media (max-width: 768px) {
    display: none;
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
        }
      }
    }
  }

  .resume-button {
    margin-left: 15px;
  }
`;

const Resume = () => (
  <a href="/Resume_Jiefan.pdf" className="resume-link">
    Resume
  </a>
);

const ANIM_DURATION = 600;

const innerDuration =
  (ANIM_DURATION * (navLinks.length + 1)) / (navLinks.length + 3);

export default function NavBar() {
  const { isDark, setDark } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDark = () => setDark(!isDark);

  return (
    <header
      id="navbar"
      css={[
        tw`w-full top-0 flex items-center justify-between fixed z-10 p-6 md:justify-end lg:p-10`,
        css`
          ${genDelays(3, ANIM_DURATION)}
        `,
      ]}
    >
      <Helmet>
        <body className={menuOpen ? "blur" : ""} />
      </Helmet>
      <TransitionSeries duration={ANIM_DURATION} trigger={true}>
        <div tw="z-0 block md:hidden">
          <StyledHamburgerButton
            onClick={toggleMenu}
            menuOpen={menuOpen}
            // ref={buttonRef} TODO
          >
            <div className="ham-box">
              <div className="ham-box-inner" />
            </div>
          </StyledHamburgerButton>
          <StyledSidebar menuOpen={menuOpen}>
            <nav>
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link
                      to={url}
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
        <StyledLinks>
          <ol
            css={css`
              ${genDelays(navLinks.length + 1)}
            `}
          >
            <TransitionSeries duration={innerDuration} trigger={true}>
              {navLinks
                .map(({ url, name }, i) => (
                  <li key={i}>
                    <Link to={url}>{name}</Link>
                  </li>
                ))
                .concat([
                  <li>
                    <Resume />
                  </li>,
                ])}
            </TransitionSeries>
          </ol>
        </StyledLinks>
        <button
          tw="h-12 z-10 aspect-square border-0 outline-0 flex justify-center items-center bg-transparent hover:scale-110 active:scale-90"
          css={{
            "& > svg": [tw`h-full aspect-square text-[var(--text-primary)]`],
          }}
          onClick={toggleDark}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </button>
      </TransitionSeries>
    </header>
  );
}
