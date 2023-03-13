/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ReactNode } from "react";
import usePrefersReducedMotion from "../hooks/reducedMotion";
import styled from "@emotion/styled";

const FlyItem = styled.div(
  ({
    index,
    prefersReducedMotion,
  }: {
    index: number;
    prefersReducedMotion: boolean;
  }) => [
    tw`inline-block`,
    !prefersReducedMotion && [
      css`
        animation-delay: ${index * 300}ms;
      `,
      tw`animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards`,
    ],
  ]
);

export default function FlyList({ lines }: { lines: ReactNode[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <div tw="flex flex-col ">
      {lines.map((word, index) => (
        <FlyItem
          key={index}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        >
          {word}
        </FlyItem>
      ))}
    </div>
  );
}
