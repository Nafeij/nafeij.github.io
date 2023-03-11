import React from "react";
import { useTheme } from "styled-components";
import logo from "../assets/images/profilepic.jpg";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";

import styled from "styled-components";
import { ToggleContext } from "./Layout";

const TempLogo = styled.img`
  clip-path: circle(49%);
`;

const Button = styled.button`
  background: var(${({ theme: { button } }) => button}) !important;
`;

export default function NavBar() {
  const theme = useTheme();
  const toggleDark = React.useContext(ToggleContext);
  return (
    <header
      id="navbar"
      className="w-full h-32 top-0 flex items-center justify-center fixed z-10 px-6 md:px-10 lg:px-12"
    >
      <div className="flex items-center justify-between w-full h-10 md:h-14">
        <TempLogo className=" h-full aspect-square" src={logo} />
        <Button
          className="h-full aspect-square border-0 outline-0 rounded-lg flex justify-center items-center hover:scale-110 active:scale-90"
          onClick={() => toggleDark()}
        >
          {theme.isDark ? (
            <MoonIcon className="h-1/2 aspect-square text-[var(--dark)]" />
          ) : (
            <SunIcon className="h-1/2 aspect-square text-[var(--light-warm)]" />
          )}
        </Button>
      </div>
    </header>
  );
}
