/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { sr } from "@util";
import { Section, TransitionSeries, genDelays } from "@components";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { isMatch } from "@util";
import { useContext, useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import { IconExternal, IconGitHub } from "@icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { usePrefersReducedMotion } from "@hooks";
import { srConfig } from "@config";
import { ScrollContainerRefContext } from "../Layout";

const Scroller = styled.div`
  overflow-y: ${isMatch("md") ? "hidden" : "scroll"};
  overflow-x: ${isMatch("md") ? "scroll" : "hidden"};
  -ms-overflow-style: none;
  scrollbar-width: none;
  box-sizing: border-box;
  height: 100%;
  padding-top: 6rem;
  padding-bottom: 2rem;

  @media (min-width: 768px) {
    padding-top: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-auto-flow: dense;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover > .card::after {
    opacity: 0.5;
  }

  .card {
    background: var(--bg-primary);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover {
      &::before {
        opacity: 0.15;
      }
      .card-content .img {
        opacity: 0.3;
      }
    }

    &::after,
    &::before {
      border-radius: inherit;
      content: "";
      height: 100%;
      left: 0px;
      opacity: 0;
      position: absolute;
      top: 0px;
      transition: opacity 500ms;
      width: 100%;
      pointer-events: none;
    }

    &::before {
      background: radial-gradient(
        800px circle at var(--mouse-x) var(--mouse-y),
        var(--text-primary),
        transparent 40%
      );
      z-index: 3;
    }

    &::after {
      background: radial-gradient(
        600px circle at var(--mouse-x) var(--mouse-y),
        var(--text-primary),
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
      margin: 0.1rem;
      padding: 1.5rem;
      z-index: 2;
      overflow: hidden;
      ${tw`text-base md:text-lg lg:text-xl`}

      h1 {
        ${tw`text-2xl md:text-3xl lg:text-4xl`}
      }

      h2 {
        ${tw`text-xl md:text-2xl lg:text-3xl`}
      }

      svg {
        flex: 0 0 auto;
        ${tw`inline-block align-top aspect-square w-6 md:w-7 lg:w-8`}
      }

      .img {
        ${tw`absolute inset-0 -z-10 overflow-hidden`}
        border-radius: inherit;
        opacity: 0.1;
      }
    }
  }

  @media (min-width: 768px) {
    .big {
      grid-column-end: span 2;
    }
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, auto));
    .big {
      grid-column-end: span 1;
      grid-row-end: span 2;
    }
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
                external
                big
                cover {
                  childImageSharp {
                    gatsbyImageData(
                      width: 700
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                      layout: FULL_WIDTH
                    )
                  }
                }
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
  const cardRefs = useRef<Array<HTMLDivElement>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ScrollContainerRef = useContext(ScrollContainerRefContext);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion) {
      scrollerRef.current &&
        sr?.reveal(scrollerRef.current, {
          ...srConfig(),
          container: ScrollContainerRef?.current,
          afterReveal: () => setIsRevealed(true),
        });
    }
  }, [posts]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cardRefs.current.map((card) => {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const projInner = (node: any, i: number) => {
    const { frontmatter, html } = node;
    const { github, external, title, tech, big, cover } = frontmatter;
    const image = getImage(cover);
    return (
      <div
        key={i}
        ref={(el) => {
          el && (cardRefs.current[i] = el);
        }}
        className={big ? "card big" : "card"}
      >
        <div className="card-content">
          {image && <GatsbyImage image={image} alt={title} className="img" />}
          <span tw="flex justify-between items-start mb-1">
            <h2 tw="inline-block pt-2">{title}</h2>
            <span tw="flex gap-2">
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconExternal />
                </a>
              )}
              {github && (
                <a
                  href={github}
                  aria-label="GitHub Link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconGitHub />
                </a>
              )}
            </span>
          </span>
          <p dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    );
  };

  return (
    <Section>
      <Scroller ref={scrollerRef}>
        <h2 tw="mb-5">Here are some of my projects.</h2>
        <Grid onMouseMove={handleMouseMove} css={genDelays(2,1200)}>
          <TransitionSeries trigger={isRevealed}>
            {posts.map(({ node }: { node: any }, i: number) =>
              projInner(node, i)
            )}
          </TransitionSeries>
        </Grid>
      </Scroller>
    </Section>
  );
}
