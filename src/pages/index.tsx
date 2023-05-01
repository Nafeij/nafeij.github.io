import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

import { Layout, NavBar, Title, About, Projects, Contact } from "@components";
import { GlobalStyle } from "@styles";

const IndexPage: FC<PageProps> = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Layout>
        <Title />
        <About />
        <Projects />
        <Contact />
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
