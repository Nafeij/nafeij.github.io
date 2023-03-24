/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Section, FancyTitle, TransitionSeries, genDelays } from "@components";
import { useEffect } from "react";
import React from "react";

export default function Title() {
  return (
    <Section css={genDelays(2,1200)}>
      <TransitionSeries duration={600} timeout={600}>
        <p
          tw="text-primary mb-1 font-mono"
          css={css`
            font-size: clamp(1.4rem, 3vw, 3rem);
          `}
        >
          Create something
        </p>
        <FancyTitle />
      </TransitionSeries>
    </Section>
  );
}
