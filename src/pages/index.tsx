import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";
import FlexCards from "../components/FlexCards";
import "../styles/index.sass";

const IndexPage: FC<PageProps> = () => (
  <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <FlexCards/>
  </div>
);

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
