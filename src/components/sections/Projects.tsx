/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { MediaContext, sr } from "@util";
import { Section, TransitionSeries, genDelays } from "@components";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { useContext, useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import { IconExternal, IconGitHub } from "@icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { usePrefersReducedMotion } from "@hooks";
import { srConfig } from "@config";
import { ScrollContainerRefContext } from "../Layout";
import { ThemeContext } from "@styles";

const Scroller = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-top: 6rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  @media (min-width: 768px) {
    overflow-y: hidden;
    padding-bottom: 4rem;
  }

  @media (min-width: 1024px) {
    padding-top: 2rem;
  }
`;

const InnerScroller = styled.div`
  flex: 1 0 auto;
  @media (min-width: 768px) {
    overflow-y: hidden;
    overflow-x: scroll;
    flex-shrink: 1;
  }
`;

const Grid = styled.div<{
  isDark: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-flow: row dense;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover > .card::after {
    opacity: ${({ isDark }) => (isDark ? ".5" : ".25")};
  }

  .card {
    background: var(--bg-primary);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover {
      &::before {
        opacity: ${({ isDark }) => (isDark ? ".15" : ".07")};
      }
      .card-content .img {
        opacity: 0.3;
        filter: blur(0.2rem);
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
        filter: blur(0.5rem);
      }
    }
  }

  @media (min-width: 768px) {
    grid-auto-flow: column dense;
    grid-template-columns: unset;
    grid-auto-columns: minmax(300px, 1fr);
    grid-template-rows: repeat(3, minmax(auto, 25svh));

    .card.big {
      grid-column-end: span 2;
      ${tw`text-lg md:text-xl lg:text-2xl`}

      h1 {
        ${tw`text-3xl md:text-4xl lg:text-5xl`}
      }

      h2 {
        ${tw`text-2xl md:text-3xl lg:text-4xl`}
      }

      svg {
        ${tw`w-7 md:w-8 lg:w-9`}
      }
    }
  }
`;

export default function Projects() {
  const { theme } = useContext(ThemeContext);
  const { projects } = useStaticQuery(
    graphql`
      {
        projects: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content/Projects/" } }
          sort: [
            { frontmatter: { big: DESC } }
            { frontmatter: { cover: { name: ASC } } }
          ]
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
          beforeReveal: () => setIsRevealed(true),
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
          {tech.length && (
            <ul
              className="project-tech-list"
              tw="flex flex-wrap list-none mt-auto pt-5 align-bottom opacity-75 font-mono text-sm md:text-base lg:text-lg"
            >
              {tech.map((t: string, i: number) => (
                <li tw="whitespace-nowrap mr-5" key={i}>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <Section>
      <Scroller ref={scrollerRef}>
        <h2 tw="mb-5 md:mb-10">Here are some of my projects.</h2>
        <InnerScroller>
          <Grid
            onMouseMove={handleMouseMove}
            css={genDelays(posts.length, 1000, 700)}
            isDark={theme === "dark"}
          >
            <TransitionSeries trigger={isRevealed} duration={1700}>
              {posts.map(({ node }: { node: any }, i: number) =>
                projInner(node, i)
              )}
            </TransitionSeries>
          </Grid>
        </InnerScroller>
      </Scroller>
    </Section>
  );
}
