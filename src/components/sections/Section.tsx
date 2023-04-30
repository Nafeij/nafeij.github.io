/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section(
  ({ background }: { background? : string }) => [
    tw`flex justify-center items-start flex-col`,
    css`
      max-width: 100svw;
      min-width: 100%;
      @media (min-width: 768px) {
        max-width: unset;
        min-width: unset;
        max-height: 100svh;
        min-height: 100%;
      }
    `,
    background &&
      css`
        background: ${background};
      `,
  ]
);

interface SectionProps extends React.ComponentPropsWithoutRef<"div"> {
  background? : string;
  children? : ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>( (props : SectionProps, ref : ForwardedRef<HTMLDivElement>) => {
  return (
    <StyledSection {...props}>
      <div
        tw="mx-auto max-h-full max-w-screen-xl text-primary tracking-wide text-justify px-6 snap-center md:px-28"
        css={{
          fontFamily: "source_sans_pro"
        }}
        ref={ref}
      >
        {props.children}
      </div>
    </StyledSection>
  );
})

export default Section;
