/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ReactNode } from "react";
import usePrefersReducedMotion from "../hooks/reducedMotion";

export default function FlyList({ lines }: { lines: ReactNode[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <div tw="flex flex-col ">
      {lines.map((word, index) => (
        <div
          key={index}
          tw="inline-block"
          css={[
            tw`inline-block`,
            prefersReducedMotion &&
              css`
                animationdelay: ${index * 300}ms;
                ${tw`animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards`}
              `,
          ]}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
