/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Section, FancyTitle, TransitionSeries, genDelays } from "@components";
import { useEffect } from "react";
import React from "react";

export default function Title() {
  return (
    <Section tw="select-none pointer-events-none" css={genDelays(2,600)}>
      <TransitionSeries timeout={600} trigger={true}>
        <p
          tw="text-primary mb-5 font-mono"
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
