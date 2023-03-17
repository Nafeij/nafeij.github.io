/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section(
  ({ minWidth, background }: { minWidth?: string; background?: string }) => [
    tw`flex justify-center items-start flex-col`,
    css`
      min-width: ${minWidth ?? "100vw"};
    `,
    background &&
      css`
        background: ${background};
      `,
  ]
);

export default function Section({
  children,
  background,
  minWidth,
}: {
  children: ReactNode;
  background?: string;
  minWidth?: string;
}) {
  return (
    <StyledSection background={background} minWidth={minWidth}>
      <div tw="mx-auto max-w-screen-xl px-6 md:px-16">{children}</div>
    </StyledSection>
  );
}
