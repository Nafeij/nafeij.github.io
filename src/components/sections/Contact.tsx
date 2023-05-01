/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
import { Section } from "@components";
import { useContext, useEffect } from "react";
import React from "react";
import styled from "@emotion/styled";
import { ScrollContainerRefContext } from "../Layout";
import { MediaContext } from "@util";

const flip = keyframes`
  0% {
    transform: translateX(0) rotateY(0deg);
  }
  100% {
    transform: translateX(-100%) rotateY(-180deg);
  }
`;

const Card = styled.div<{ progress: number }>`
  width: 100%;
  aspect-ratio: 7/4;
  perspective: 150rem;

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-origin: 100% 50%;
    transform-style: preserve-3d;
    animation: ${flip} 1s cubic-bezier(0.49, 0.23, 0.58, 0.49) paused forwards;
    animation-delay: ${(props) => -props.progress}s;

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
      //transform-origin: left center;
      backface-visibility: hidden;
      overflow: hidden;
    }
    .front {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        var(--text-secondary),
        var(--bg-secondary)
      );
      transform: rotateY(0);
    }
    .back {
      background: linear-gradient(
        -45deg,
        var(--text-secondary),
        var(--bg-secondary)
      );
      transform: rotateY(180deg);
    }
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
        distance: (parent.offsetHeight - card.offsetTop) / 2,
        start: parent.offsetTop,
        scroll: container.scrollTop,
      }
    : {
        distance: (parent.offsetWidth - card.offsetLeft) / 2,
        start: parent.offsetLeft,
        scroll: container.scrollLeft,
      };

export default function Contact() {
  // const [flip, forceFlip] = React.useState(true);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);
  const { isMatch } = useContext(MediaContext);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

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

      const progress = Math.max(
        0,
        Math.min(1, (scroll - start + distance) / distance)
      );
      setProgress(progress);
    });
  }, []);

  return (
    <Section tw="select-none" ref={parentRef}>
      <Card progress={progress} ref={cardRef}>
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
