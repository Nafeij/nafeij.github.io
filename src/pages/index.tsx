import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";
import styled from "styled-components";
import FlyList from "../components/FlyList";
import "../styles/global.css";

import FancyTitle from "../components/FancyTitle";

import NavBar from "../components/NavBar";
import Layout from "../components/Layout";
import Title from "../components/sections/Title";

const Content = ({ children }: { children: React.ReactNode }) => (
  <div id="content" className="mx-auto max-w-screen-xl px-6 md:px-16">
    {children}
  </div>
);

const IndexPage: FC<PageProps> = () => {
  return (
    <Layout>
      <NavBar />
      <Content>
        <Title />
      </Content>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
