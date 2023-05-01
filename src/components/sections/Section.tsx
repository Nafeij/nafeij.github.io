/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section(
  ({ background }: { background?: string }) => [
    tw`flex justify-center items-start flex-col snap-center text-secondary tracking-wide px-6 md:px-24 text-lg md:text-xl lg:text-2xl`,
    css`
      min-width: 101svw; /* need to be >100 to stop some funky nonsense with scroll snapping to 2nd section*/
      max-height: 100svh;
      box-sizing: border-box;
      position: relative;
      margin-right: 2px;
      font-family: "source_sans_pro";

      h1 {
        ${tw`font-bold text-3xl text-primary md:text-5xl lg:text-6xl`}
      }

      h2 {
        ${tw`font-bold text-2xl md:text-3xl lg:text-4xl`}
      }

      a {
        color: var(--text-primary);
        :hover {
          color: var(--link-color);
        }
      }

      &::after {
        content: "";
        margin: 0 auto;
        background-color: var(--text-secondary);
        position: absolute;
        opacity: 0.5;
        right: -2px;
        width: 2px;
        height: 60svw;
        align-self: center;
      }

      &:last-of-type::after {
        display: none;
      }

      @media (min-width: 768px) {
        min-width: unset;
        max-width: 1280px;
        min-height: 100svh;
        margin-right: 0;
        margin-bottom: 2px;
        &::after {
          right: unset;
          bottom: -2px;
          width: 60svw;
          height: 2px;
        }
      }
    `,
    background &&
      css`
        background: ${background};
      `,
  ]
);

interface SectionProps extends React.ComponentPropsWithoutRef<"div"> {
  background?: string;
  children?: ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (props: SectionProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <StyledSection {...props} ref={ref}>
        {props.children}
      </StyledSection>
    );
  }
);

export default Section;
