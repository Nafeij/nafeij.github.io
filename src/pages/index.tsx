import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import FlyList from "../components/FlyList";
import "../styles/global.css";
import blobBack from "../assets/images/svg/blobBack.svg";

const theme = {
  isDark: false,
  text: "black",
};

const darkTheme = {
  isDark: true,
  text: "white",
};

const Main = styled.div`
  color : ${({ theme }) => theme.text};
  background-image: radial-gradient(
    ellipse at center,
    var(--light) 0%,
    var(--light-warm) 100%
      ${({ theme }) =>
        theme.dark &&
        css`
          background-image: radial-gradient(var(--pip) 8%, transparent 8%);
          background-color: rgb(10, 10, 10);
          background-size: 8vmin 8vmin;
        `}
  );
`;

const FancyTitle = styled.p`
    font-family: "source_sans_probold";
    margin-top: -1rem;
    background-clip: text;
    background-size: cover;
    color: transparent;
    background-image: url(${blobBack});
`

const IndexPage: FC<PageProps> = () => {
  const [dark, setDark] = React.useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <header
          id="navbar"
          className="w-full top-0 flex items-center justify-center fixed z-10 px-6 md:px-10 lg:px-12"
        ></header>
        <div id="content" className="mx-auto max-w-screen-xl px-14">
          <section className="flex justify-center items-start flex-col min-h-screen">
            <FlyList
              lines={[
                <code className="text-3xl">Hello. I'm</code>,
                <FancyTitle
                  className="text-[clamp(2.7rem,8vw,6rem)] font-bold"
                >
                  Wang Jiefan
                </FancyTitle>,
                <FancyTitle
                  className="text-[clamp(1.5rem,6vw,4rem)]"
                >
                  I make responsive websites and apps.
                </FancyTitle>,
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
