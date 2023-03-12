import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";
import "../styles/global.css";

import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import Title from "../components/sections/Title";
import About from "../components/sections/About";

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
