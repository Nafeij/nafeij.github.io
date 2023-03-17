import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

import { Layout, NavBar, Title, About } from "@components";
import { GlobalStyle } from "@styles";

const IndexPage: FC<PageProps> = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar />
      <Layout>
        <Title />
        <About />
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
