import { Footer, Indicator, NavBar } from '@components'
import { css } from '@emotion/react'
import { type WindowLocation } from '@gatsbyjs/reach-router'
import { ThemeContext } from '@styles'
import { MediaContext } from '@util'
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
  const { isMatch } = useContext(MediaContext)
  const [animating, setAnimating] = useState(false)
  const [animated, setAnimated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const toggleDark = () => {
    if (animating) return
    setAnimating(true)
    if (!animated) setAnimated(true)
    setDark(!isDark)
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
            ${tw`font-bold text-3xl text-primary md:text-4xl lg:text-5xl`}
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
        tw="relative isolate flex snap-x snap-mandatory flex-row flex-nowrap items-center overflow-x-auto overflow-y-hidden scroll-smooth transition-none motion-reduce:scroll-auto md:snap-none md:flex-col md:overflow-auto"
        css={css`
          @media (min-width: 768px) {
            overflow-x: overlay;
          }
        `}
        ref={scrollRef}
      >
        <ScrollContainerRefContext.Provider value={scrollRef}>
          {!isMatch('md') ? <Indicator bottom={false} scrollRef={scrollRef} /> : null}
          {children}
        </ScrollContainerRefContext.Provider>
        <Footer />
        <div
          id="fakeBg"
          tw="pointer-events-none fixed left-0 top-0 size-full transition-none"
          css={!animated && css`animation: none!important;`}
          onAnimationEnd={() => { setAnimating(false) }}
          key={isDark ? 'dark' : 'light'}
        />
      </div>
    </div>
  )
}
