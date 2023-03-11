import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import FlyList from "../components/FlyList";
import "../styles/global.css";
import FancyTitle from "../components/FancyTitle";
import logo from "../assets/images/profilepic.jpg";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";

const theme = {
  isDark: false,
  text: "black",
  button: "--dark",
};

const darkTheme = {
  isDark: true,
  text: "white",
  button: "--light",
};

const Main = styled.div`
  color: ${({ theme }) => theme.text};
  background-image: radial-gradient(
    ellipse at center,
    var(--light) 0%,
    var(--light-warm) 100%
  );
  ${({ theme }) =>
    theme.isDark &&
    css`
      background-image: radial-gradient(var(--pip) 8%, transparent 8%);
      background-color: var(--dark);
      background-size: 8vmin 8vmin;
    `}
`;

const TempLogo = styled.img`
  clip-path: circle(49%);
`;

const Button = styled.button`
  background: var(${({ theme }) => theme.button})!important;
`;


const IndexPage: FC<PageProps> = () => {
  const [dark, setDark] = React.useState(true);

  return (
    <ThemeProvider theme={dark ? darkTheme : theme}>
      <Main>
        <header
          id="navbar"
          className="w-full h-32 top-0 flex items-center justify-center fixed z-10 px-6 md:px-10 lg:px-12"
        >
          <div className="flex items-center justify-between w-full h-10 md:h-14">
            <TempLogo className=" h-full aspect-square" src={logo} />
            <Button className="h-full aspect-square border-0 outline-0 rounded-lg cursor-pointer flex justify-center items-center">
              {dark ? (
                <MoonIcon className="h-1/2 aspect-square text-[var(--dark)]" />
              ) : (
                <SunIcon className="h-1/2 aspect-square text-[var(--light-warm)]" />
              )}
            </Button>
          </div>
        </header>
        <div id="content" className="mx-auto max-w-screen-xl px-6 md:px-16">
          <section className="flex justify-center items-start flex-col min-h-screen">
            <FlyList
              lines={[
                <code className="text-[clamp(1.4rem,3vw,3rem)]">Build something</code>,
                <FancyTitle height="clamp(5rem,15vw,14rem)"/>,
              ]}
            />
          </section>
        </div>
      </Main>
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
