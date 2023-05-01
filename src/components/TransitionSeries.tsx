/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { ReactNode, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const DEFAULT_DURATION = 500;

export const genDelays = (n: number, duration = DEFAULT_DURATION, delay = 0) => {
  const interval = duration / n;
  let styles : {[key : string] : any} = {};
  for (let i = 0; i < n; i++) {
    styles[`& > *:nth-child(${i + 1})`] = {
      transitionDelay: `${i * interval + delay}ms`,
    };
  }
  return styles;
}

export default function TransitionSeries({
  children,
  classNames,
  timeout,
  duration,
  trigger
}: {
  children: ReactNode[];
  classNames?:
    | string
    | {
        appear?: string;
        appearActive?: string;
        appearDone?: string;
        enter?: string;
        enterActive?: string;
        enterDone?: string;
        exit?: string;
        exitActive?: string;
        exitDone?: string;
      };
  timeout?: number;
  duration?: number;
  trigger?: boolean;
}) {
  const [show, setShow] = useState(false);
  const d = duration ?? DEFAULT_DURATION;
  let timeout_func : NodeJS.Timeout;
  useEffect(() => {
    if (trigger && timeout) {
      timeout_func = setTimeout(() => {
        setShow(true);
      }, timeout);
    } else if (trigger) {
      setShow(true);
    }
    return () => {
      if (timeout_func) clearTimeout(timeout_func);
    }
  }, [trigger, timeout]);
  return (
    <TransitionGroup component={null}>
      {show && children.map((child, i) => (
          <CSSTransition
            key={i}
            classNames={classNames ?? "fadedown"}
            timeout={d}
          >
            {child}
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
}
