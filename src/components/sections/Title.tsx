/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Section, FancyTitle, TransitionSeries } from "@components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useEffect } from "react";
import React from "react";

export default function Title() {
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <Section>
      <TransitionSeries duration={600} timeout={600}>
        <p
          tw="text-primary"
          css={css`
            font-size: clamp(1.4rem, 3vw, 3rem);
            font-family: ui-monospace, "Roboto Mono", monospace;
          `}
        >
          Build something
        </p>
        <FancyTitle />
      </TransitionSeries>
    </Section>
  );
}
