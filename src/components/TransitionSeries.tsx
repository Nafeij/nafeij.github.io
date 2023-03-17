/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { ReactNode, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function TransitionSeries({
  children,
  classNames,
  timeout,
  duration,
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
}) {
  const [show, setShow] = useState(false);
  const d = duration ?? 500;
  const delay = d / children.length;
  let timeout_func : NodeJS.Timeout;
  useEffect(() => {
    if (timeout) {
      timeout_func = setTimeout(() => {
        setShow(true);
      }, timeout);
    } else {
      setShow(true);
    }
    return () => {
      if (timeout_func) clearTimeout(timeout_func);
    }
  }, []);
  return (
    <TransitionGroup component={null}>
      {show &&
        children.map((child, i) => (
          <CSSTransition
            key={i}
            classNames={classNames ?? "fadedown"}
            timeout={d}
          >
            <div key={i} tw="h-full" css={{ transitionDelay: `${delay * i}ms` }}>
              {child}
            </div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
}
