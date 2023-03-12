/** @jsx jsx */
import { jsx } from "@emotion/react";
import FlyList from "../FlyList";
import { useTheme } from "styled-components";
import FancyTitle from "../FancyTitle";
import Section from "../sections/Section";

export default function Title() {
  const theme = useTheme();
  return (
    <Section>
      <FlyList
        lines={[
          <p
            css={`
              font-size: clamp(1.4rem, 3vw, 3rem);
              font-family: ui-monospace, "Roboto Mono", monospace;
              color: ${theme.text};
            `}
          >
            Build something
          </p>,
          <FancyTitle />,
        ]}
      />
    </Section>
  );
}
