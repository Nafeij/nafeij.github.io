/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section(
  ({ background }: { background?: string }) => [
    tw`flex justify-center items-start flex-col snap-center text-lg md:text-xl lg:text-2xl`,
    css`
      max-width: 100svw;
      min-width: 100%;
      max-height: 100svh;
      min-height: 100%;
      box-sizing: border-box;
      position: relative;

      margin-right: 2px;

      &::after {
        content: "";
        position: absolute;
        margin: 0 auto;
        background-color: var(--text-secondary);
        opacity: 0.5;
        width: 2px;
        height: 60%;
        right: -2px;
        bottom: 20%;
      }

      &:last-of-type::after {
        display: none;
      }

      @media (min-width: 768px) {
        margin-bottom: 2px;
        margin-right: 0;

        &::after {
          width: 60%;
          right: 20%;
          height: 2px;
          bottom: -2px;
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
      <StyledSection {...props}>
        <div
          tw="mx-auto max-h-full max-w-screen-xl text-secondary tracking-wide px-6 md:px-24"
          css={css`
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
          `}
          ref={ref}
        >
          {props.children}
        </div>
      </StyledSection>
    );
  }
);

export default Section;
