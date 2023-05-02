/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useContext, useState } from "react";
import { ThemeContext } from "@styles";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import tw from "twin.macro";
import TransitionSeries, { genDelays } from "./TransitionSeries";
import styled from "@emotion/styled";

const StyledHamburgerButton = styled.button<{ menuOpen: boolean }>`
  display: none;

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
      left: auto;
      right: 0;
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

export default function NavBar() {
  const { isDark, setDark } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDark = () => setDark(!isDark);

  return (
    <header
      id="navbar"
      css={[
        tw`w-full top-0 flex items-center justify-between fixed z-10 p-6 lg:p-10`,
        css`
          ${genDelays(2)}
        `,
      ]}
    >
      <TransitionSeries duration={600} trigger={true}>
        <div
          css={{
            width: "50px",
            aspectRatio: "1/1",
            borderRadius: "10%",
            background: "blue",
          }}
        />
        <StyledHamburgerButton
          onClick={toggleMenu}
          menuOpen={menuOpen}
          // ref={buttonRef} TODO
          aria-label="Menu"
        >
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>

        <button
          tw="h-12 aspect-square border-0 outline-0 flex justify-center items-center bg-transparent hover:scale-110 active:scale-90"
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
