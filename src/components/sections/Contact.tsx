/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
import { Section } from "@components";
import { Fragment, useContext, useEffect } from "react";
import React from "react";
import styled from "@emotion/styled";
import { ScrollContainerRefContext } from "../Layout";
import { MediaContext } from "@util";
import { links } from "@config";
import Icon from "@icons";
import tw from "twin.macro";
import { usePrefersReducedMotion } from "@hooks";

const flip = keyframes`
  0% {
    transform: translateX(0) rotateY(0deg);
  }
  100% {
    transform: translateX(-100%) rotateY(-180deg);
  }
`;

const swipe = keyframes`
  0% {
    left: 100svw;
  }
  100% {
    left: 0;
  }
`;

const swipef = keyframes`
  0% {
    left: -5%;
  }
  50% {
    left: 150%;
  }
`;

const swipeb = keyframes`
  50% {
    left: -5%;
  }
  100% {
    left: 150%;
  }
`;

const interpolate = (i: number, j: number, k: number, a = 0, b = 1) => {
  return a + (b - a) * Math.max(0, Math.min(1, (i - j) / (k - j)));
};

const Card = styled.div`
  padding: 0 10%;
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  perspective: 100vmax;

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
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0 10%;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 -0.75rem 1rem 0 rgba(#000, 0.2),
        0 0.75rem 1rem 0 rgba(#000, 0.2), 0.75rem 0px 1rem 0 rgba(#000, 0.2),
        -0.75rem 0px 1rem 0 rgba(#000, 0.2);
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
        animation: 1s ease-in-out paused both;
      }
    }
    .front {
      background: linear-gradient(
        45deg,
        var(--text-primary),
        var(--text-secondary)
      );
      border-radius: 1rem 0 1rem 0;
      .shine {
        animation-name: ${swipef};
      }
    }
    .back {
      ${tw`text-sm md:text-base lg:text-lg`}
      svg {
        ${tw`h-4 md:h-5 lg:h-6`}
      }
      background: linear-gradient(
        -45deg,
        var(--text-primary),
        var(--text-secondary)
      );
      border-radius: 0 1rem 0 1rem;
      transform: rotateY(180deg);
      .shine {
        animation-name: ${swipeb};
      }
    }
  }

  @media (min-width: 768px) {
    padding: 0;
    max-width: 500px;

    .card {
      aspect-ratio: 7/4;
    }
  }

  @media (min-width: 1024px) {
    max-width: 800px;
  }

  @media (prefers-reduced-motion) {
    .card {
      margin-top: 1rem;
      animation: none !important;
    }

    .front,
    .back {
      transform: none !important;
      position: relative !important;
      .shine {
        opacity: 0.2 !important;
        animation: none !important;
      }
    }

    .front {
      margin-bottom: 1rem;
    }

    @media (min-width: 768px) {
      .card {
        margin-top: 2rem;
      }
      .front {
        margin-bottom: 2rem;
      }
    }
  }
`;

const getDOMVars = ({
  container,
  parent,
  isMatch,
}: {
  container: HTMLDivElement;
  parent: HTMLDivElement;
  isMatch: (media: string) => boolean;
}) =>
  isMatch("md")
    ? {
        start: parent.offsetTop - parent.clientHeight / 4,
        end: parent.offsetTop + parent.clientHeight / 2,
        scroll: container.scrollTop,
      }
    : {
        start: parent.offsetLeft - parent.clientWidth / 4,
        end: parent.offsetLeft + parent.clientWidth / 2,
        scroll: container.scrollLeft,
      };

export default function Contact() {
  // const [flip, forceFlip] = React.useState(true);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);
  const { isMatch } = useContext(MediaContext);
  const prefersReducedMotion = usePrefersReducedMotion();
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  const calcProgress = (ev: Event) => {
    const parent = parentRef.current;
    if (!parent) return;
    const container = ev.target as HTMLDivElement;

    const { start, end, scroll } = getDOMVars({
      container,
      parent,
      isMatch,
    });

    const newProgress = Math.round(interpolate(scroll, start, end, 0, 1000));
    setProgress(newProgress);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    ScrollContainerRef?.current?.addEventListener("scroll", calcProgress);
    return () => {
      ScrollContainerRef?.current?.removeEventListener("scroll", calcProgress);
    };
  }, []);

  return (
    <Fragment>
      <Section ref={parentRef} css={[css`min-height: 100svh; min-width: 100svw;`, tw`select-none items-center`]}>
        <Card>
          <h1 style={{ opacity: interpolate(progress, 0, 250) }}>
            Let's get in touch.
          </h1>
          <div
            className="card"
            style={{
              animationDelay: `${-interpolate(
                progress,
                500,
                1000
              )}s, ${-interpolate(progress, 0, 500)}s`,
            }}
          >
            <div className="front">
              <h1>Wang Jiefan</h1>
              <p>Undergraduate | Software Engineer</p>
              <div
                className="shine"
                style={{
                  animationDelay: `${-interpolate(progress, 500, 1000)}s`,
                }}
              />
            </div>
            <div className="back">
              {links.map(({ name, url, desc }) => (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  tw="flex-initial flex flex-row justify-between gap-10"
                >
                  <Icon name={name} />
                  <p>{desc ?? name}</p>
                </a>
              ))}
              <div
                className="shine"
                style={{
                  animationDelay: `${-interpolate(progress, 500, 1000)}s`,
                }}
              />
            </div>
          </div>
        </Card>
      </Section>
      <div css={[css`min-height: 100svh; min-width: 100svw;`, tw`snap-center`]}/>
    </Fragment>
  );
}
