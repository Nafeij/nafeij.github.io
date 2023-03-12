/** @jsx jsx */
import { jsx } from '@emotion/react';
import Section from "./Section";

export default function About() {
  return (
    <Section minHeight="none">
      <p tw="text-red-500">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
        adipisci, laborum eum voluptatum illo fugiat, temporibus, laboriosam ut
        maiores explicabo rem tempore at nesciunt beatae magni nulla error
        consequuntur? Perferendis!
      </p>
    </Section>
  );
}