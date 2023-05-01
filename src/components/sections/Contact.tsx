/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Section } from "@components";
import { useContext, useEffect } from "react";
import React from "react";
import styled from "@emotion/styled";
import { ScrollContainerRefContext } from "../Layout";

const Card = styled.div<{ progress: number }>`
  perspective: 150rem;

  .card {
    position: relative;
    height: 15rem;
    aspect-ratio: 7/4;
    transform-origin: 100% 50%;
    transform-style: preserve-3d;
    animation: flip 1s cubic-bezier(0.49, 0.23, 0.58, 0.49) forwards;
    animation-play-state: paused;
    animation-delay: ${props => (-props.progress).toFixed(2)}s;

    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      border-radius: 5px;
      box-shadow: 0 1.5rem 4rem rgba(black, 0.4);
      //transform-origin: left center;
      backface-visibility: hidden;
      overflow: hidden;
    }
    .front {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        var(--text-primary),
        var(--bg-primary)
      );
      transform: translateZ(10px) rotateY(0);
      &:after {
        color: darken(var(--bg-primary), 6%);
      }
    }
    .back {
      background: linear-gradient(
        -45deg,
        var(--text-primary),
        var(--bg-primary)
      );
      transform: rotateY(180deg);
      &:after {
        color: darken(var(--bg-primary), 15%);
      }
    }
  }

  @keyframes flip {
    to {
      transform: translateX(-100%) rotateY(-180deg);
    }
  }
`;

export default function Contact() {
  // const [flip, forceFlip] = React.useState(true);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const container = ScrollContainerRef?.current;
    if (!container) return;
    ScrollContainerRef?.current?.addEventListener("scroll", () => {
      const parent = parentRef.current;
      if (!parent) return;
      const height = parent.offsetHeight;
      const scroll = container.scrollTop;
      const start = parent.offsetTop;
      const progress = Math.max(
        0,
        Math.min(1, (scroll - start + height) / height)
      );
      console.log(progress);
      setProgress(progress);
    });
  }, []);

  return (
    <Section tw="select-none" ref={parentRef}>
      <Card progress={progress}>
        <div className="card">
          <div className="front">
            <h1>Front</h1>
          </div>
          <div className="back">
            <h1>Back</h1>
          </div>
        </div>
      </Card>
    </Section>
  );
}
