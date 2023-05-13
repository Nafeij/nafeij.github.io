import { css } from "@emotion/react";
import { sr } from "@util";
import { Section, TransitionSeries, genDelays } from "@components";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { useContext, useEffect, useRef, useState } from "react";
import tw from "twin.macro";
import Icon from "@icons";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { usePrefersReducedMotion } from "@hooks";
import { srConfig } from "@config";
import { ScrollContainerRefContext } from "../Layout";
import { ThemeContext } from "@styles";
import { useDraggable } from "react-use-draggable-scroll";

const Scroller = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 2rem;
  padding-bottom: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;

  @media (min-width: 768px) {
    overflow: visible;
    padding: 7rem 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
`;

const Grid = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .card {
    background: var(--bg-primary);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover {
      .card-content .img {
        opacity: 0.2;
        filter: blur(0.4rem);
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
        var(--light),
        transparent 40%
      );
      z-index: 3;
    }

    &::after {
      background: radial-gradient(
        600px circle at var(--mouse-x) var(--mouse-y),
        var(--light),
        transparent 40%
      );
      z-index: 1;
    }

    .card-content {
      height: 100%;
      background-color: var(--bg-secondary);
      border-radius: inherit;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: 0.1rem;
      padding: 1.5rem;
      z-index: 2;
      overflow: hidden;
      ${tw`text-sm md:text-base lg:text-lg`}

      h1 {
        ${tw`text-xl md:text-2xl lg:text-3xl`}
      }

      h2 {
        ${tw`text-lg md:text-xl lg:text-2xl`}
      }

      svg {
        flex: 0 0 auto;
        ${tw`inline-block align-top aspect-square h-full`}
      }

      .img {
        ${tw`absolute inset-0 -z-10 overflow-hidden`}
        border-radius: inherit;
        opacity: 0.1;
        filter: blur(0.8rem);
      }
    }
  }

  @media (min-width: 768px) {
    overflow-x: scroll;
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    max-height: 800px;
    gap: 1%;
    align-items: stretch;
    justify-content: start;
    align-content: start;

    .card {
      flex: 1;
      max-width: 49%;
      min-height: 32%;
    }

    /* .card.big {
      grid-column-end: span 2;
    } */
  }

  @media (min-width: 1024px) {
    .card {
      max-width: 32%;
      min-height: 49%;
    }
  }
`;

export default function Projects() {
  const { isDark } = useContext(ThemeContext);
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
  const horiScrollerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(horiScrollerRef);
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion);

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
          <span tw="flex justify-end gap-4 h-5 md:h-6 lg:h-8">
            {external && (
              <a
                tw="h-full"
                href={external}
                aria-label="External Link"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="External" />
              </a>
            )}
            {github && (
              <a
                tw="h-full"
                href={github}
                aria-label="GitHub Link"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="GitHub" />
              </a>
            )}
          </span>
          <h2 tw="inline-block">{title}</h2>
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
    <Section id="projects" tw="px-0 md:px-24">
      <Scroller ref={scrollerRef} tw="px-4 md:px-0">
        <h1 tw="mb-3 md:mb-7 lg:mb-10">Here is some of my work.</h1>
        <Grid
          onMouseMoveCapture={handleMouseMove}
          css={css`
            ${genDelays(posts.length, 1000, 700)}
            &:hover > .card::after {
              opacity: ${isDark ? ".5" : ".25"};
            }
            & > .card:hover::before {
              opacity: 0.05;
            }
          `}
          {...events}
          ref={horiScrollerRef}
        >
          <TransitionSeries trigger={isRevealed} duration={1700}>
            {posts.map(({ node }: { node: any }, i: number) =>
              projInner(node, i)
            )}
          </TransitionSeries>
        </Grid>
      </Scroller>
    </Section>
  );
}
