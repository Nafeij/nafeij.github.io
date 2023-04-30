/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Section } from "@components";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { isMatch } from "@util";
import { useEffect, useRef, useState } from "react";

const Scroller = styled.div`
  overflow-y: ${isMatch("md") ? "hidden" : "scroll"};
  overflow-x: ${isMatch("md") ? "scroll" : "hidden"};
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
  height: 100%;
  padding-top: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(180px, auto);
  grid-auto-flow: dense;
  gap: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover > .card::after {
    opacity: 1;
  }

  .card {
    background: var(--bg-primary);
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover::before {
      opacity: 1;
    }

    &::after, &::before {
      border-radius: inherit;
      content: "";
      height: 100%;
      left: 0px;
      opacity: 0;
      position: absolute;
      top: 0px;
      transition: opacity 500ms;
      width: 100%;
    }

    &::before {
      background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.06),
        transparent 40%
      );
      z-index: 3;
    }

    &::after {
      background: radial-gradient(
        600px circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.4),
        transparent 40%
      );
      z-index: 1;
    }

    .card-content {
      background-color: var(--bg-secondary);
      border-radius: inherit;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      inset: 1px;
      padding: 10px;
      position: absolute;
      z-index: 2;
    }
  }

  .big {
    grid-column-end: span 2;
  }
`;

export default function Projects() {
  const { projects } = useStaticQuery(
    graphql`
      {
        projects: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content/Projects/" } }
          sort: [{ frontmatter: { big: DESC } }]
        ) {
          edges {
            node {
              frontmatter {
                date
                title
                tech
                github
                big
              }
              html
            }
          }
        }
      }
    `
  );
  const posts = projects.edges;
  if (!posts) return null;
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, posts.length);
  }, [posts]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cardRefs.current.map((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <Section tw="text-lg md:text-xl lg:text-2xl">
      <Scroller>
        <h1 tw="pt-28">Here are some of my projects,</h1>
        <Grid onMouseMove={handleMouseMove}>
          {posts.map(({ node }: { node: any }, i: number) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={node.frontmatter.big ? "card big" : "card"}
            >
              <div className="card-content">
                <h1>{node.frontmatter.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: node.html }} />
              </div>
            </div>
          ))}
        </Grid>
      </Scroller>
    </Section>
  );
}
