/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useContext } from "react";
import { ThemeContext } from "@styles";
import logo from "@images/profilepic.jpg";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import tw from "twin.macro";
import TransitionSeries from "./TransitionSeries";

export default function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header
      id="navbar"
      tw="w-full top-0 flex items-center justify-between fixed z-10 p-6 lg:p-10"
    >
      <TransitionSeries duration={600}>
          <img
            css={[
              tw`h-12 aspect-square`,
              css`
                clip-path: circle(49%);
              `,
            ]}
            src={logo}
          />
          <button
            tw="h-12 aspect-square border-0 outline-0 rounded-lg flex justify-center items-center bg-[var(--text-primary)] hover:scale-110 active:scale-90"
            onClick={toggle}
          >
            {theme === "dark" ? (
              <MoonIcon tw="h-1/2 aspect-square text-[var(--bg-primary)]" />
            ) : (
              <SunIcon tw="h-1/2 aspect-square text-[var(--bg-primary)]" />
            )}
          </button>
        </TransitionSeries>
    </header>
  );
}
