import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'

// vladshap @ https://codepen.io/vladshap/pen/ezQOEY

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
`

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
`

const StyledIndicator = styled.div<{ bottom: boolean, show: boolean }>`
  ${({ bottom }) => bottom && 'height: 5rem;'}
  pointer-events: none;
  width: 5rem;
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 27%;
  opacity: ${({ show }) => (show ? 0.5 : 0)};
  display: flex;
  flex-direction: ${({ bottom }) => (bottom ? 'column' : 'row')};
  align-items: center;
  gap: 10%;
  transition: opacity ${({ show }) => (show ? 5 : 1)}s var(--easing);

  &::before,
  &::after {
    flex: 1;
    content: "";
    display: block;
  }
  &::before {
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 2px solid var(--text-primary);
    animation: ${dot} 3s infinite ease-in-out;
  }
  &::after {
    aspect-ratio: 1/1;
    flex: 0.6;
    border: solid var(--text-primary);
    border-width: ${({ bottom }) => (bottom ? '0 2px 2px 0' : '2px 2px 0 0 ')};
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
    flex-direction: ${({ bottom }) => (bottom ? 'column' : 'row')};
    &::before,
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      border: 2px solid var(--text-primary);
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
`

const getInitialScrolled = (id: string) => {
  if (window?.localStorage !== undefined) {
    const storedPrefs = window.localStorage.getItem(`scroll-${id}`)
    if (typeof storedPrefs === 'string') {
      return storedPrefs === 'true'
    }
  }
  return false
}

const storeScrolled = (id: string, value: boolean) => {
  if (window?.localStorage !== undefined) {
    window.localStorage.setItem(`scroll-${id}`, `${value ? 'true' : 'false'}`)
  }
}

export default function Indicator ({
  scrollRef,
  bottom = true
}: {
  scrollRef: React.RefObject<HTMLDivElement>
  bottom?: boolean
}) {
  const [show, setShow] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const checkScroll = useCallback(() => {
    if (scrollRef.current == null) return
    if (scrollRef.current.scrollLeft > 200) {
      setScrolled(prevScrolled => {
        if ((scrollRef.current != null) && !prevScrolled) {
          storeScrolled(scrollRef.current.id, true)
        }
        return true
      })
    }
  }, [scrollRef])

  useEffect(() => {
    if ((scrollRef?.current) == null || getInitialScrolled(scrollRef.current.id)) return
    const scroll = scrollRef.current
    scroll?.addEventListener('scroll', checkScroll)
    const timeOut = setTimeout(() => {
      setShow(true)
    }, 5000)
    return () => {
      clearTimeout(timeOut)
      scroll?.removeEventListener('scroll', checkScroll)
    }
  }, [checkScroll, scrollRef])

  return (
    <StyledIndicator bottom={bottom} show={show && !scrolled}>
      <div className="dots" />
    </StyledIndicator>
  )
}
