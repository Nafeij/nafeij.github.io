import { type Interpolation, type Theme } from '@emotion/react'
import { type AnchorHTMLAttributes, type ClassAttributes } from 'react'

const A = ({ children, ...props }: ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement> & {
  css?: Interpolation<Theme>
}) => (
    <a
        target="_blank"
        rel="noreferrer"
        {...props}
    >
        {children}
    </a>
)

export default A
