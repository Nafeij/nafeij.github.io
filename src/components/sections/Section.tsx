/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section(
  ({ minAxis, background }: { minAxis : string; background? : string }) => [
    tw`flex justify-center items-start flex-col`,
    css`
      min-width: ${minAxis};
      @media (min-width: 768px) {
        min-width: unset;
        min-height: ${minAxis};
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
  minAxis? : string;
  children? : ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>( (props : SectionProps, ref : ForwardedRef<HTMLDivElement>) => {
  const dProps = { minAxis: "100%", ...props };
  return (
    <StyledSection {...dProps}>
      <div
        tw="mx-auto max-w-screen-xl text-primary tracking-wide text-justify px-12 md:px-28"
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
