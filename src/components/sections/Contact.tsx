/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
import { Section } from "@components";
import { useContext, useEffect } from "react";
import React from "react";
import styled from "@emotion/styled";
import { ScrollContainerRefContext } from "../Layout";
import { MediaContext } from "@util";
import { links } from "@config";
import Icon from "@icons";
import tw from "twin.macro";

const flip = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-180deg);
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

const Card = styled.div<{ progress: string }>`
  width: 100%;
  max-width: 640px;
  aspect-ratio: 4/3;
  perspective: 100vmax;

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    font-family: 'Trebuchet MS', sans-serif;
    animation: ${flip} 1s ease-in-out paused forwards;
    animation-delay: ${(props) => props.progress}s;

    p, h1, svg {
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
      gap: .5rem;
      box-shadow: 0 -0.75rem 1rem 0 rgba(#000, 0.2),
        0 0.75rem 1rem 0 rgba(#000, 0.2), 0.75rem 0px 1rem 0 rgba(#000, 0.2),
        -0.75rem 0px 1rem 0 rgba(#000, 0.2);
      backface-visibility: hidden;
      overflow: hidden;

      &::after {
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
        animation-delay: ${(props) => props.progress}s;
      }
    }
    .front {
      background: linear-gradient(
        45deg,
        var(--text-primary),
        var(--text-secondary)
      );
      border-radius: 1rem 0 1rem 0;
      &::after {
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
      &::after {
        animation-name: ${swipeb};
      }
    }
  }

  @media (min-width: 768px) {
    aspect-ratio: 7/4;
  }
`;

const getDOMVars = ({
  container,
  parent,
  card,
  isMatch,
}: {
  container: HTMLDivElement;
  parent: HTMLDivElement;
  card: HTMLDivElement;
  isMatch: (media: string) => boolean;
}) =>
  isMatch("md")
    ? {
        distance: parent.offsetHeight - card.offsetTop - card.offsetHeight,
        start: parent.offsetTop,
        scroll: container.scrollTop,
      }
    : {
        distance: parent.offsetWidth - card.offsetLeft,
        start: parent.offsetLeft,
        scroll: container.scrollLeft,
      };

export default function Contact() {
  // const [flip, forceFlip] = React.useState(true);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);
  const { isMatch } = useContext(MediaContext);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState("0");

  useEffect(() => {
    ScrollContainerRef?.current?.addEventListener("scroll", (ev) => {
      const parent = parentRef.current;
      if (!parent) return;
      const card = cardRef.current;
      if (!card) return;
      const container = ev.target as HTMLDivElement;

      const { distance, start, scroll } = getDOMVars({
        container,
        parent,
        card,
        isMatch,
      });

      const newProgress = (-Math.max(
        0,
        Math.min(1, (scroll - start + distance) / distance)
      )).toFixed(2);
      if (newProgress !== progress) {
        setProgress(newProgress);
      }
    });
  }, []);

  return (
    <Section tw="select-none items-center gap-20" ref={parentRef}>
      <h1>Let's get in touch</h1>
      <Card progress={progress} ref={cardRef}>
        <div className="card">
          <div className="front">
            <h1>Wang Jiefan</h1>
            <p>Undergraduate | Software Engineer</p>
          </div>
          <div className="back">
            {
              links.map(({ name, url, desc }) => (
                <a href={url} target="_blank" rel="noreferrer" tw="flex-initial flex flex-row justify-between gap-10">
                  <Icon name={name} />
                  <p>{desc ?? name}</p>
                </a>
              ))
            }
          </div>
        </div>
      </Card>
    </Section>
  );
}
