import { Section, TransitionSeries, genDelays, ScrollContainerRefContext, A } from '@components'
import { srConfig } from '@config'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { usePrefersReducedMotion, setMousePos } from '@hooks'
import Icon from '@icons'
import { ThemeContext } from '@styles'
import { MediaContext, sr } from '@util'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import tw from 'twin.macro'

const Scroller = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 2rem;
  padding-bottom: 6rem;

  @media (min-width: 768px) {
    overflow: visible;
    padding: 7rem 0;
  }
`

const Grid = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;

  .card-outer {
    /* Workaround for Chrome mobil optimization */
    @-moz-document url-prefix() {
      .card, .card-content {
        transition: background-color var(--transition-props);
      }
      .card-content * {
        h1, h2, p, a, svg, li {
          transition: color var(--transition-props);
        }
      }
    }
    .card {
      background-color: var(--bg-secondary);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 100%;

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
        background-color: var(--button-secondary);
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
  }

  @media (min-width: 768px) {
    overflow: visible;
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    max-height: 800px;
    gap: 1%;
    align-items: stretch;
    justify-content: start;
    align-content: start;

    .card-outer {
      flex: 1;
      max-width: 49%;
      min-height: 32%;
      .card, .card-content {
        transition: background-color var(--transition-props);
      }
      .card-content {
        h1, h2, li, svg, p p, p a {
          transition: color var(--transition-props);
        }
      }
    }

    /* .card.big {
      grid-column-end: span 2;
    } */
  }

  @media (min-width: 1024px) {
    .card-outer {
      max-width: 32%;
      min-height: 49%;
    }
  }
`

export default function Projects () {
  const { isDark } = useContext(ThemeContext)
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
  )
  const posts = projects.edges
  // if (posts === null) return null
  const cardRefs = useRef<HTMLDivElement[]>([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const ScrollContainerRef = useContext(ScrollContainerRefContext)
  const { isMatch } = useContext(MediaContext)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const horiScrollerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(horiScrollerRef)
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion)

  useEffect(() => {
    if (!prefersReducedMotion && scrollerRef.current != null) {
      sr?.reveal(scrollerRef.current, {
        ...srConfig(),
        container: ScrollContainerRef?.current,
        afterReveal: () => { setIsRevealed(true) }
      })
    }
  }, [ScrollContainerRef, posts, prefersReducedMotion, isMatch])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cardRefs.current.forEach((card) => {
      setMousePos(e, card)
    })
  }

  const projInner = (node: any, i: number) => {
    const { frontmatter, html } = node
    const { github, external, title, tech, big, cover, date } = frontmatter as {
      github: string
      date: string
      external: string
      title: string
      tech: string[]
      big: boolean
      cover: any
    }
    const image = getImage(cover)
    return (
      <div key={i} className='card-outer'>
        <div
          ref={(el) => {
            (el != null) && (cardRefs.current[i] = el)
          }}
          className={big ? 'card big' : 'card'}
        >
          <div className="card-content">
            {(image != null) && <GatsbyImage image={image} alt={title} className="img" />}
            <span tw="flex flex-row justify-between">
              <h2 tw="inline-block">{title}</h2>
              <span tw="flex h-5 justify-end gap-4 md:h-6 lg:h-8">
                {external?.length > 0 && (
                  <A
                    tw="h-full"
                    href={external}
                    aria-label="External Link"
                  >
                    <Icon name="External" />
                  </A>
                )}
                {github?.length > 0 && (
                  <A
                    tw="h-full"
                    href={github}
                    aria-label="GitHub Link">
                    <Icon name="GitHub" />
                  </A>
                )}
              </span>
            </span>
            <code tw="inline-block text-sm opacity-75 md:text-base lg:text-lg">
              &gt; {date}
            </code>
            <p dangerouslySetInnerHTML={{ __html: html }} />
            {(tech.length > 0) && (
              <ul
                className="project-tech-list"
                tw="mt-auto flex list-none flex-wrap pt-5 align-bottom font-mono text-sm opacity-75 md:text-base lg:text-lg"
              >
                {tech.map((t: string, i: number) => (
                  <li tw="mr-5 whitespace-nowrap" key={i}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Section id="projects" tw="min-h-full px-0 md:px-24">
      <Scroller ref={scrollerRef} tw="flex w-full flex-1 flex-col px-4 md:box-border md:h-full md:w-full md:justify-center md:overflow-visible md:px-0">
        <h1 tw="mb-3 transition-[color] md:mb-7 lg:mb-10">Here&apos;s some of my work.</h1>
        <Grid
          onMouseMoveCapture={handleMouseMove}
          css={css`
            ${genDelays(posts.length, 1000)}
            overflow: visible;
            &:hover .card::after {
              opacity: ${isDark ? '.5' : '.25'};
            }
            & .card:hover::before {
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
  )
}
