import type { HeadFC, PageProps } from "gatsby"
import React, { FC } from "react"
import FlexCards from "../components/FlexCards"
import "../styles/index.sass"

const IndexPage: FC<PageProps> = () => (
  <div className="flex w-screen h-100vh justify-center items-center">
    <FlexCards/>
  </div>
);

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>