import { QR, Section } from '@components'
import { links } from '@config'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { usePrefersReducedMotion } from '@hooks'
import Icon from '@icons'
import { MediaContext } from '@util'
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'
import { ScrollContainerRefContext } from '../Layout'

const flip = keyframes`
  0% {
    transform: translateX(0) rotateY(0deg);
  }
  100% {
    transform: translateX(-100%) rotateY(-180deg);
  }
`

const swipe = keyframes`
  0% {
    left: 100%;
  }
  100% {
    left: 0;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const swipef = keyframes`
  0% {
    left: -25%;
  }
  50% {
    left: 110%;
  }
`

const swipeb = keyframes`
  50% {
    left: -25%;
  }
  100% {
    left: 110%;
  }
`

const interpolate = (i: number, j: number, k: number, a = 0, b = 1) => {
  return a + (b - a) * Math.max(0, Math.min(1, (i - j) / (k - j)))
}

const Card = styled.div`
  padding: 0 10%;
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  perspective: 100vmax;

  > * {
    transition: none !important;
  }

  a {
    pointer-events: all;
  }

  .card {
    margin-top: 3rem;
    width: 100%;
    aspect-ratio: 4/3;
    position: relative;
    transform-origin: 100% 50%;
    transform-style: preserve-3d;
    font-family: "Trebuchet MS", sans-serif;
    will-change: transform;
    animation-name: ${flip}, ${swipe};
    animation-duration: 1s;
    animation-timing-function: ease-in-out, ease-out;
    animation-fill-mode: forwards;
    animation-play-state: paused;

    p,
    h1,
    svg {
      color: var(--bg-primary);
      opacity: 0.9;
    }

    .front,
    .back {
      padding: 0 10%;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      gap: 0.5rem;
      box-shadow: 0 -0.75rem 1rem 0 rgba(0,0,0,0.05),
        0 0.75rem 1rem 0 rgba(0,0,0,0.05), 0.75rem 0px 1rem 0 rgba(0,0,0,0.05),
        -0.75rem 0px 1rem 0 rgba(0,0,0,0.05);
      background-color:  var(--accent);
      backface-visibility: hidden;
      overflow: hidden;

      .shine {
        content: "";
        display: block;
        width: 15%;
        height: 100%;
        border-left: 1rem solid #fff;
        padding-left: 5%;
        background-clip: content-box;
        background-color: #fff;
        position: absolute;
        transform: skew(-15deg);
        opacity: 0.5;
        left: 0;
        animation: 1s ease-in-out both paused;
      }
    }
    .front {
      border-radius: 1rem 0 1rem 0;
      animation: 1s ${fadeIn} ease-out both paused;
      justify-content: center;
      .shine {
        animation-name: ${swipef};
      }
    }
    .back {
      ${tw`flex-row items-center justify-between gap-2 md:gap-4 lg:gap-12 text-base md:text-lg lg:text-xl`}
      border-radius: 0 1rem 0 1rem;
      transform: rotateY(180deg);
      .shine {
        animation-name: ${swipeb};
      }
      > svg {
        display: none;
      }
    }
  }

  @media (min-width: 768px) {
    padding: 0;
    max-width: 500px;
    .card {
      aspect-ratio: 7/4;
      .back > svg {
        display: block;
      }
    }
  }

  @media (min-width: 1024px) {
    max-width: 800px;
  }

  @media (prefers-reduced-motion) {
    position: relative;
    top: 0;
    left: 0;
    transform: none;

    > h1 {
      opacity: 1 !important;
    }

    .card {
      margin-top: 1rem;
      animation: none !important;
    }

    .front,
    .back {
      transform: none !important;
      position: relative !important;
      flex: 0;
      .shine {
        opacity: 0.2 !important;
        animation: none !important;
      }
    }

    .front {
      margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100svh;

      .card {
        margin-top: 2rem;
        max-width: 500px;
        aspect-ratio: unset;

        .front,
        .back {
          aspect-ratio: 7/4;
          height: auto;
        }
        .front {
          margin-bottom: 2rem;
        }
      }
    }

    @media (min-width: 1024px) {
      .card {
        max-width: 600px;
      }
    }
  }
`

const getDOMVars = ({
  container,
  parent,
  isMatch
}: {
  container: HTMLDivElement
  parent: HTMLDivElement
  isMatch: (media: string) => boolean
}) =>
  isMatch('md')
    ? {
        start: parent.offsetTop - parent.clientHeight / 4,
        end: parent.offsetTop + parent.clientHeight,
        scroll: container.scrollTop
      }
    : {
        start: parent.offsetLeft - parent.clientWidth / 4,
        end: parent.offsetLeft + parent.clientWidth,
        scroll: container.scrollLeft
      }

export default function Contact () {
  // const [flip, forceFlip] = React.useState(true);
  const ScrollContainerRef = useContext(ScrollContainerRefContext)
  const { isMatch } = useContext(MediaContext)
  const prefersReducedMotion = usePrefersReducedMotion()
  const parentRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const calcProgress = useCallback(() => {
    const container = ScrollContainerRef?.current
    if (container == null) return
    const parent = parentRef.current
    if (parent == null) return

    const { start, end, scroll } = getDOMVars({
      container,
      parent,
      isMatch
    })

    const newProgress = Math.round(interpolate(scroll, start, end, 0, 1000))
    setProgress(newProgress)
  }, [ScrollContainerRef, isMatch])

  useEffect(() => {
    if (prefersReducedMotion) return
    calcProgress()
    const container = ScrollContainerRef?.current
    container?.addEventListener('scroll', calcProgress)
    return () => {
      container?.removeEventListener('scroll', calcProgress)
    }
  }, [ScrollContainerRef, calcProgress, prefersReducedMotion])

  return (
    <Fragment>
      <Section
        tw="min-h-full min-w-full after:hidden motion-reduce:hidden"
        ref={parentRef}
      />
      <Section
        id="contact"
        tw="min-h-full min-w-full motion-reduce:md:items-center"
      >
        <Card id="card">
          <h1 style={{ opacity: interpolate(progress, 0, 200) }}>
            Let&apos;s get in touch.
          </h1>
          <div
            className="card"
            style={{
              animationDelay: `
            ${-interpolate(progress, 500, 1000)}s, ${-interpolate(
                progress,
                0,
                350
              )}s`
            }}
          >
            <div
              className="front"
              style={{
                animationDelay: `${-interpolate(progress, 0, 200)}s`
              }}
            >
              <h1>Wang Jiefan</h1>
              <p>CS Undergraduate</p>
              <div
                className="shine"
                style={{
                  animationDelay: `${-interpolate(progress, 450, 1000)}s`
                }}
              />
            </div>
            <div className="back">
              <QR />
              <div
                tw="relative flex flex-1 flex-col gap-2 md:ml-12 lg:gap-6 motion-reduce:lg:gap-4 motion-reduce:lg:text-lg"
                css={css`
                  svg {
                    ${tw`h-5 md:h-6 lg:h-8`}
                  }
                  @media (min-width: 768px) {
                    &::before {
                      content: "";
                      width: 2px;
                      height: 80%;
                      background-color: var(--bg-primary);
                      position: absolute;
                      top: 50%;
                      translate: 0 -50%;
                      opacity: 0.6;
                      ${tw`md:-left-9 lg:-left-14`}
                    }
                  }
                `}
              >
                {links.map(({ name, url, desc }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    tw="flex flex-initial flex-row items-center justify-between gap-2 md:gap-4 lg:gap-6"
                  >
                    <Icon name={name} />
                    <p>{desc ?? name}</p>
                  </a>
                ))}
              </div>
              <div
                className="shine"
                style={{
                  animationDelay: `${-interpolate(progress, 450, 1000)}s`
                }}
              />
            </div>
          </div>
        </Card>
      </Section>
    </Fragment>
  )
}
