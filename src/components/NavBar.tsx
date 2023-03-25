/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "@styles";
import logo from "@images/profilepic.jpg";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import tw from "twin.macro";
import TransitionSeries, { genDelays } from "./TransitionSeries";

export default function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

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
      <TransitionSeries duration={600}>
        <div
        css={{
          width: "50px",
          aspectRatio: "1/1",
          borderRadius: "10%",
          background: "blue",
        }}
        />
        <button
          tw="h-12 aspect-square border-0 outline-0 flex justify-center items-center bg-transparent hover:scale-110 active:scale-90"
          css={{
            "& > svg": [
              tw`h-full aspect-square text-[var(--text-primary)]`,
            ]
          }}
          onClick={toggle}
        >
          {theme === "dark" ? ( <MoonIcon /> ) : ( <SunIcon /> )}
        </button>
      </TransitionSeries>
    </header>
  );
}
