import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";

import { Layout, NavBar, Title, About } from "@components";

const IndexPage: FC<PageProps> = () => {
  return (
    <Layout>
      <NavBar />
      <Title />
      <About />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
