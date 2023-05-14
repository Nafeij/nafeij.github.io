import styled from '@emotion/styled'
import { setMousePos } from '@hooks'
import { type ElementType, type ButtonHTMLAttributes, type ReactNode, type AnchorHTMLAttributes, useRef } from 'react'

const StyledButton = styled.button`
  position: relative;
  color: var(--button-primary) !important;
  background-color: transparent;
  border: 1px solid var(--button-primary);
  border-radius: 0.2rem;
  padding: 0.75rem 1.25rem;
  font-family: var(--font-mono);
  line-height: 1;
  text-decoration: none;
  --mouse-x: 0px;
  --mouse-y: 0px;

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    background-color: var(--button-primary);
    clip-path: circle(0% at var(--mouse-x) var(--mouse-y));
    transition: clip-path 0.3s ease-in-out;
    border-radius: inherit;
    z-index: -1;
  }

  &:hover {
    color: var(--bg-primary) !important;
    &::after {
        clip-path: circle(144% at var(--mouse-x) var(--mouse-y));
    }
}
`

export default function Button ({ children, ...props }: { children: ReactNode, as?: ElementType<any> | undefined } & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef(null)
  return (
    <StyledButton {...props} ref={ref} onMouseEnter={e => {
      if (ref.current !== null) {
        setMousePos(e, ref.current)
      }
    }}>
      {children}
    </StyledButton>
  )
}
