/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import FlyList from "../FlyList";
import FancyTitle from "../FancyTitle";
import Section from "../sections/Section";

export default function Title() {
  return (
    <Section>
      <FlyList
        lines={[
          <p
            tw="text-primary"
            css={css`font-size: clamp(1.4rem, 3vw, 3rem);
            font-family: ui-monospace, "Roboto Mono", monospace;`}
          >
            Build something
          </p>,
          <FancyTitle />,
        ]}
      />
    </Section>
  );
}
