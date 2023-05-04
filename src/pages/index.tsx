import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

import { Layout, Title, About, Projects, Contact } from "@components";
import { GlobalStyle } from "@styles";

const IndexPage: FC<PageProps> = ({ location }) => {
  return (
    <>
      <GlobalStyle />
      <Layout location={location}>
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
