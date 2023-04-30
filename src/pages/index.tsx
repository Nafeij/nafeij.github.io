import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

import { Layout, NavBar, Title, About, Projects } from "@components";
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
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
