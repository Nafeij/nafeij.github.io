/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ForwardedRef, forwardRef, ReactNode, RefObject } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section`
  ${tw`flex justify-center items-start flex-col snap-center tracking-wide px-6 md:px-24`}
  min-width: 101svw; /* need to be >100 to stop some funky nonsense with scroll snapping to 2nd section*/
  max-height: 100svh;
  box-sizing: border-box;
  position: relative;
  margin-right: 2px;
  font-family: "source_sans_pro";

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
    width: 100%;
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
`;
interface SectionProps extends React.ComponentPropsWithoutRef<"div"> {
  background?: string;
  children?: ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (props: SectionProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <StyledSection {...props} ref={ref} style={{background : props.background}}>
        {props.children}
      </StyledSection>
    );
  }
);

export default Section;
