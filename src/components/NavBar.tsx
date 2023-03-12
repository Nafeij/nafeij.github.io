/** @jsx jsx */
import { jsx } from "@emotion/react";

import { useContext } from "react";
import { useTheme } from "styled-components";
import logo from "../assets/images/profilepic.jpg";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";

import styled from "styled-components";
import { ToggleContext } from "./Layout";


export default function NavBar() {
  const theme = useTheme();
  const toggleDark = useContext(ToggleContext);
  return (
    <header
      id="navbar"
      tw="w-full h-32 top-0 flex items-center justify-center fixed z-10 px-6 md:px-10 lg:px-12"
    >
      <div tw="flex items-center justify-between w-full h-10 md:h-14">
        <img tw=" h-full aspect-square" css="clip-path: circle(49%);" src={logo} />
        <button
          tw="h-full aspect-square border-0 outline-0 rounded-lg flex justify-center items-center hover:scale-110 active:scale-90"
          css={`background: var(${theme.button}) !important;`}
          onClick={() => toggleDark()}
        >
          {theme.isDark ? (
            <MoonIcon tw="h-1/2 aspect-square text-[var(--dark)]" />
          ) : (
            <SunIcon tw="h-1/2 aspect-square text-[var(--light-warm)]" />
          )}
        </button>
      </div>
    </header>
  );
}
