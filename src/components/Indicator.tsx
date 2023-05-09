import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { usePrefersReducedMotion } from "@hooks";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

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

const StyledIndicator = styled.div<{ bottom: boolean; show: boolean }>`
  ${({ bottom }) => bottom && "height: 5rem;"}
  pointer-events: none;
  width: 5rem;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 27%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  display: flex;
  flex-direction: ${({ bottom }) => (bottom ? "column" : "row")};
  align-items: center;
  gap: 10%;
  transition: opacity ${({ show }) => (show ? 5 : 1)}s ease-in-out;

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

const getInitialScroll = (id: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem(`scroll-${id}`);
    if (typeof storedPrefs === "string") {
      return +storedPrefs;
    }
  }
  return 0;
};

const setScroll = (id: string, value: number) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(`scroll-${id}`, `${value}`);
  }
};

export default function Indicator({
  scrollX,
  bottom = true,
}: {
  scrollRef?: React.RefObject<HTMLDivElement>;
  bottom?: boolean;
}) {
  const [show, setShow] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const scrollNumber = useRef(0);
  const [parent, setParent] = useState<Element | null>(null);

  const checkScroll = () => {
    if (!scrollRef?.current || scrollNumber.current > 3) return;
    const { scrollLeft } = scrollRef.current;
    if (show && scrollLeft > 100) {
      setShow(false);
      setScroll(scrollRef.current.id, scrollNumber.current + 1);
    }
  };

  useEffect(() => {
    console.log(scrollRef?.current);
    if (!scrollRef?.current) return;
    scrollNumber.current = getInitialScroll(scrollRef.current.id);
    scrollRef?.current?.addEventListener("scroll", checkScroll);
    const timeOut = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
      scrollRef?.current?.removeEventListener("scroll", checkScroll);
    };
  }, [scrollRef]);

  useEffect(() => {
    setParent(ReactDOM.findDOMNode(this));

  return (
    <StyledIndicator bottom={bottom} show={show}>
      <div className="dots" />
    </StyledIndicator>
  );
}
