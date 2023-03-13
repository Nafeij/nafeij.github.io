/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section(
  ({ minHeight, background }: { minHeight?: string; background?: string }) => [
    tw`flex justify-center items-start flex-col`,
    css`
      min-height: ${minHeight ?? "100vh"};
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
  minHeight,
}: {
  children: ReactNode;
  background?: string;
  minHeight?: string;
}) {
  return (
    <StyledSection background={background} minHeight={minHeight}>
      <div tw="mx-auto max-w-screen-xl px-6 md:px-16 ">{children}</div>
    </StyledSection>
  );
}
