import type { HeadFC, PageProps } from "gatsby";
import React, { FC } from "react";
import FlyList from "../components/FlyList";
import "../styles/global.css";

const IndexPage: FC<PageProps> = () => (
  <div id="main" className="min-h-screen fex flex-col">
    <div id="content" className="mx-auto max-w-screen-xl px-14">
      <section className="flex justify-center items-start flex-col min-h-screen">
        <FlyList
          lines={[
            <code className="text-4xl">Hello. I'm</code>,
            <h1 id="title" className="text-[clamp(2.7rem,8vw,10rem)] font-bold -mt-3 bg-clip-text bg-cover text-transparent">Wang Jiefan</h1>,
            <p>I make responsive websites and apps.</p>,
          ]}/>
      </section>
    </div>
  </div>
);

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
