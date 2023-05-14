import { Footer, Indicator, NavBar } from '@components'
import { css, keyframes } from '@emotion/react'
import { type WindowLocation } from '@reach/router'
import { ThemeContext } from '@styles'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from 'react'
import tw from 'twin.macro'

const backgroundSpread = keyframes`
from {
  clip-path: circle(0% at 0% 100%);
}
to {
  clip-path: circle(150% at 0% 100%);
}
`

const backgroundSpreadBelow = keyframes`
from {
  clip-path: circle(0% at 100% 0%);
}
to {
  clip-path: circle(150% at 100% 0%);
}
`

export const ScrollContainerRefContext =
  createContext<RefObject<HTMLDivElement> | null>(null)

export default function Layout ({
  children,
  location
}: {
  children: ReactNode
  location: WindowLocation
}) {
  const { isDark, setDark } = useContext(ThemeContext)
  const [animate, setAnimate] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const toggleDark = () => {
    if (animate) return
    setAnimate(true)
    setDark(!isDark)
    setTimeout(() => { setAnimate(false) }, 1000)
  }

  useEffect(() => {
    if (location.hash.length > 0) return
    const el = document.getElementById('home')
    if (el != null) {
      el.scrollIntoView()
      el.focus()
    }
  }, [location])

  return (
    <div
      css={[
        tw`text-secondary text-base md:text-lg lg:text-xl`,
        css`
          font-family: "source_sans_pro";
          h1 {
            ${tw`font-bold text-3xl text-quinary md:text-4xl lg:text-5xl`}
          }

          h2 {
            ${tw`font-bold text-2xl text-primary md:text-3xl lg:text-4xl`}
          }

          a {
            color: var(--accent);
            :hover {
              color: var(--link-color);
            }
          }
        `
      ]}
    >
      <NavBar scrollRef={scrollRef} toggleDark={toggleDark} />
      <div
        id="content"
        css={[
          tw`relative transition-none isolate flex flex-nowrap items-center  overflow-x-auto snap-mandatory snap-x md:snap-none flex-row md:flex-col md:overflow-x-hidden md:overflow-y-auto scroll-smooth motion-reduce:scroll-auto`,
          css`
            background: var(--bg-under);
            counter-reset: section;
            width: 100svw;
            height: 100svh;
          `
        ]}
        ref={scrollRef}
      >
        <ScrollContainerRefContext.Provider value={scrollRef}>
          <Indicator bottom={false} scrollRef={scrollRef} />
          {children}
        </ScrollContainerRefContext.Provider>
        <Footer />
        <div
          id="fakeBg"
          css={[
            tw`transition-none fixed h-full w-full top-0 left-0 pointer-events-none`,
            css`
              background: var(--bg);
              z-index: -1;
            `,
            animate &&
              css`
                animation: ${backgroundSpread} 1s ease-out both;
                @media (min-width: 768px) {
                  animation: ${backgroundSpreadBelow} 1s ease-out both;
                }
              `
          ]}
          key={isDark ? 'dark' : 'light'}
        />
      </div>
    </div>
  )
}
