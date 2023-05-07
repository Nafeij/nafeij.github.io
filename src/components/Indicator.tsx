import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const dot = keyframes`
0% {
    transform: scale(.75);
    opacity: .25;
}
25% {
    transform: scale(1);
    opacity: 1;
}
100% {
    transform: scale(.75);
    opacity: .25;
}
`;

const arrow = keyframes`
0% {
    transform: scale(.75) rotate(45deg);
    opacity: .25;
}
25% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
}
100% {
    transform: scale(.75) rotate(45deg);
    opacity: .25;
}
`;

const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

const StyledIndicator = styled.div<{ bottom: boolean }>`
  ${({ bottom }) => bottom && "height: 5rem;"}
  width: 5rem;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 27%;
  opacity: 0.5;
  display: flex;
  flex-direction: ${({ bottom }) => (bottom ? "column" : "row")};
  align-items: center;
  gap: 10%;
  animation: ${fadeIn} 5s ease-in-out both;

  &::before,
  &::after {
    flex: 1;
    content: "";
    display: block;
  }
  &::before {
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid var(--text-primary);
    animation: ${dot} 3s infinite ease-in-out;
  }
  &::after {
    aspect-ratio: 1/1;
    flex: 0.6;
    border: solid var(--text-primary);
    border-width: ${({ bottom }) => (bottom ? "0 1px 1px 0" : "1px 1px 0 0 ")};
    transform: rotate(45deg);
    animation: ${arrow} 3s infinite ease-in-out;
    animation-delay: 0.75s;
    opacity: 0.25;
    margin: -10%;
  }
  .dots {
    display: flex;
    flex: 1.4;
    align-items: center;
    gap: 25%;
    flex-direction: ${({ bottom }) => (bottom ? "column" : "row")};
    &::before,
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      border: 1px solid var(--text-primary);
      animation: ${dot} 3s infinite ease-in-out;
      aspect-ratio: 1/1;
    }
    &::before {
      flex: 1;
      animation-delay: 0.25s;
    }
    &::after {
      flex: 0.75;
      animation-delay: 0.5s;
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Indicator({ bottom = true }: { bottom?: boolean }) {
  console.log(bottom);
  return (
    <StyledIndicator bottom={bottom}>
      <div className="dots" />
    </StyledIndicator>
  );
}
