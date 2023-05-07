/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import tw from "twin.macro";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import styled from "@emotion/styled";

const StyledSection = styled.section`
  ${tw`flex justify-center items-start flex-col snap-center tracking-wide px-6 md:px-24`}
  min-width: 101%; /* need to be >100 to stop some funky nonsense with scroll snapping to 2nd section*/
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
  margin-right: 2px;

  &::after {
    display: none;
    content: "";
    margin: 0 auto;
    background-color: var(--text-secondary);
    position: absolute;
    opacity: 0.5;
    width: 60svw;
    bottom: -2px;
    height: 2px;
    align-self: center;
  }

  @media (min-width: 768px) {
    min-width: unset;
    width: 100%;
    max-width: 1280px;
    min-height: 100%;
    margin-right: 0;
    margin-bottom: 2px;
    &::after {
      display: block;
    }
  }

  &:last-of-type::after {
    display: none;
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
