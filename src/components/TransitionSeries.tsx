import { type ReactNode, useState, useEffect, useRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const DEFAULT_DURATION = 500

export const genDelays = (n: number, duration = DEFAULT_DURATION, delay = 0) => {
  const interval = duration / n
  const styles: Record<string, any> = {}
  for (let i = 0; i < n; i++) {
    styles[`& > *:nth-of-type(${i + 1})`] = {
      transitionDelay: `${i * interval + delay}ms`
    }
  }
  return styles
}

export const genDelayIntervals = (intvs: number[], duration = DEFAULT_DURATION, delay = 0) => {
  const interval = duration / intvs.reduce((a, b) => a + b, 0)
  const styles: Record<string, any> = {}
  for (let i = 0; i < intvs.length; i++) {
    styles[`& > *:nth-of-type(${i + 1})`] = {
      transitionDelay: `${intvs[i] * interval + delay}ms`
    }
  }
  return styles
}

export default function TransitionSeries ({
  children,
  classNames,
  timeout = 0,
  duration,
  trigger = false
}: {
  children: ReactElement[]
  classNames?:
  | string
  | {
    appear?: string
    appearActive?: string
    appearDone?: string
    enter?: string
    enterActive?: string
    enterDone?: string
    exit?: string
    exitActive?: string
    exitDone?: string
  }
  timeout?: number
  duration?: number
  trigger?: boolean
}) {
  const [show, setShow] = useState(false)
  const d = duration ?? DEFAULT_DURATION
  const timeoutFunc = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (trigger && timeout > 0) {
      timeoutFunc.current = setTimeout(() => {
        setShow(true)
      }, timeout)
    } else if (trigger) {
      setShow(true)
    }
    return () => {
      if (timeoutFunc.current !== null) clearTimeout(timeoutFunc.current)
    }
  }, [trigger, timeout])
  return (
    <TransitionGroup component={null}>
      {show && children.map((child, i) => (
          <CSSTransition
            key={i}
            classNames={classNames ?? 'fadedown'}
            timeout={d}
          >
            {child}
          </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
