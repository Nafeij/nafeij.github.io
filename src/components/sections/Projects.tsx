/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Section } from "@components";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { isMatch } from "@util";

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

  .span-big {
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
  return (
    <Section tw="text-lg md:text-xl lg:text-2xl">
      <Scroller>
        <h1 tw="pt-28">Here are some of my projects,</h1>
        <Grid>
          {posts.map(({ node }: { node: any }) => (
            <div className={node.frontmatter.big ? "span-big" : ""}>
              <h1>{node.frontmatter.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: node.html }} />
            </div>
          ))}
        </Grid>
      </Scroller>
    </Section>
  );
}
