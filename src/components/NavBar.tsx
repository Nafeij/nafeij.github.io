import { navLinks } from '@config'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ChevronUpIcon, SunIcon } from '@heroicons/react/24/outline'
import { MoonIcon } from '@heroicons/react/24/solid'
import { useDebounce, usePrefersReducedMotion, useScrollDirection } from '@hooks'
import { ThemeContext } from '@styles'
import { KEY_CODES, MediaContext } from '@util'
import { Link } from 'gatsby'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import tw from 'twin.macro'
import Button from './Button'
import TransitionSeries, { genDelays } from './TransitionSeries'

// https://github.com/bchiang7/v4

const StyledHamburgerButton = styled.button<{ menuOpen: boolean }>`
  @media (max-width: 768px) {
    position: relative;
    z-index: 10;
    width: 1.75rem;
    aspect-ratio: 1;
    box-sizing: content-box;
    padding: 0.25rem;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 80%;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: 100%;
    height: 2px;
    border-radius: 4px;
    background-color: var(--text-primary);
    transition-duration: 0.22s, var(--transition-duration);
    transition-property: transform, background-color;
    transition-delay: ${({ menuOpen }) => (menuOpen ? '0.12s' : '0s')}, 0s;
    transform: rotate(${({ menuOpen }) => (menuOpen ? '225deg' : '0deg')});
    transition-timing-function: cubic-bezier(
      ${({ menuOpen }) =>
        menuOpen ? '0.215, 0.61, 0.355, 1' : '0.55, 0.055, 0.675, 0.19'}
    ), var(--easing);
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: 100%;
      height: 2px;
      border-radius: 4px;
      background-color: var(--text-primary);
    }
    &:before {
      width: ${({ menuOpen }) => (menuOpen ? '100%' : '120%')};
      top: ${({ menuOpen }) => (menuOpen ? '0' : '-10px')};
      opacity: ${({ menuOpen }) => (menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
        menuOpen
          ? 'top 0.1s ease-out, opacity 0.1s ease-out 0.12s, width 0.34s'
          : 'top 0.1s ease-in 0.25s, opacity 0.1s ease-in, width 0.34s'}, background-color var(--transition-props);
    }
    &:after {
      width: ${({ menuOpen }) => (menuOpen ? '100%' : '80%')};
      bottom: ${({ menuOpen }) => (menuOpen ? '0' : '-10px')};
      transform: rotate(${({ menuOpen }) => (menuOpen ? '90deg' : '0')});
      transition: ${({ menuOpen }) =>
        menuOpen
          ? 'bottom 0.1s ease-out, transform 0.1s ease-out 0.12s, width 0.34s'
          : 'bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19), width 0.34s'}, background-color var(--transition-props);
    }
  }
`

const StyledSidebar = styled.aside<{ menuOpen: boolean }>`
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 100%;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75%, 400px);
    height: 100vh;
    background-color: var(--button-secondary);
    box-shadow: -10px 0px 30px -15px #00000088;
    outline: 0;
    z-index: 9;
    transform: translateY(-100%)
      translateX(${({ menuOpen }) => (menuOpen ? 0 : 100)}%);
    visibility: ${({ menuOpen }) => (menuOpen ? 'visible' : 'hidden')};
    transition-property: visibility, transform, background-color;
    transition-duration: 250ms, 250ms, var(--transition-duration);
    transition-timing-function: var(--easing);
  }

  nav {
    width: 100%;
    flex-direction: column;
    font-family: var(--font-mono);
    text-align: center;
    display: flex;
    align-items: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }

      &:before {
        content: "0" counter(item) ".";
        display: block;
        margin-bottom: 5px;
      }
    }

    a {
      width: 100%;
      padding: 3px 20px 20px;
      transition: color var(--transition-props);
    }
  }
`

const StyledLinks = styled.div`
  font-family: var(--font-mono);
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  nav {
    flex-direction: row;
    display: flex;
    gap: 1rem;

    ol {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        margin: 0 5px;
        position: relative;
        counter-increment: item 1;

        a {
          padding: 10px;
          transition: color var(--transition-props);

          &:before {
            content: "0" counter(item) ".";
            margin-right: 5px;
            text-align: right;
            color: var(--text-secondary);
            transition: color var(--transition-props);
          }
        }
      }
    }
  }

  .resume-button {
    margin-left: 15px;
  }
`

const DarkButton = ({ toggleDark }: { toggleDark: () => void }) => {
  const { isDark } = useContext(ThemeContext)
  return (
    <button
      tw="relative z-10 aspect-square h-7 border-0 bg-transparent outline-0 hover:scale-110 active:scale-90 md:h-9"
      css={{
        '& > svg': [tw`absolute inset-0 text-primary transition-[color]`]
      }}
      onClick={toggleDark}
    >
      <SunIcon style={{
        visibility: isDark ? 'visible' : 'hidden'
      }} />
      <MoonIcon style={{
        visibility: isDark ? 'hidden' : 'visible'
      }}/>
    </button>
  )
}

const Resume = () => (
  <Button as="a" href="/Resume_Jiefan.pdf" className="resume-link" target="_blank" rel="noopener noreferrer">
    Resume
  </Button>
)

const ANIM_DURATION = 600

const innerDuration =
  (ANIM_DURATION * (navLinks.length + 1)) / (navLinks.length + 3)

enum NavState {
  OPEN,
  CLOSE,
  FADE
}

export default function NavBar ({
  scrollRef,
  toggleDark
}: {
  scrollRef: React.RefObject<HTMLDivElement>
  toggleDark: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navState, setNavState] = useState(NavState.OPEN)
  const [overrideScroll, setOverrideScroll] = useState(false)
  const { isMatch } = useContext(MediaContext)
  const prefersReducedMotion = usePrefersReducedMotion()

  const scrollDirection = useDebounce(
    useScrollDirection({
      containerRef: scrollRef,
      horizontal: !isMatch('md'),
      thresholdPixels: 100,
      off: overrideScroll
    }),
    100
  )

  const handleScroll = useCallback(() => {
    setOverrideScroll(false)
    const scroll = scrollRef.current
    // console.log(scroll?.scrollTop, scroll?.scrollLeft);
    const scrolledToTop = (scroll != null) ? scroll.scrollTop < 50 && scroll.scrollLeft < 50 : false
    if (scrolledToTop) {
      setNavState(NavState.FADE)
    } else if (scrollDirection === 'backward') {
      setNavState(NavState.OPEN)
    } else if (scrollDirection === 'forward') {
      setNavState(NavState.CLOSE)
    }
  }, [scrollDirection, scrollRef])

  const toggleMenu = () => { setMenuOpen(!menuOpen) }

  /*
  const navRef = useRef<HTMLElement>(null);

  const menuFocusables = useRef<HTMLAnchorElement[]>([]);
  */

  const onResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false)
    }
  }

  /*
  const handleBackwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === menuFocusables.current[0]) {
      e.preventDefault();
      menuFocusables.current[menuFocusables.current.length - 1].focus();
    }
  };

  const handleForwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === menuFocusables.current[menuFocusables.current.length - 1]) {
      e.preventDefault();
      menuFocusables.current[0].focus();
    }
  };
  */

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setOverrideScroll(false)
        break
      }
      case KEY_CODES.TAB: {
        setOverrideScroll(true)
        break
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    const container = scrollRef.current
    if (!prefersReducedMotion) {
      handleScroll()
      container?.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (!prefersReducedMotion) {
        container?.removeEventListener('scroll', handleScroll)
      }
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [handleScroll, prefersReducedMotion, scrollRef])

  const scrollstyle = () => {
    if (navState === NavState.CLOSE) {
      return `transform: translateY(${isMatch('md') ? '-100%' : '100%'});
              box-shadow: 0 -10px 30px -10px #00000088;
              opacity: 1;
              background-color: var(--bg-secondary);
              `
    } else if (navState === NavState.OPEN || menuOpen) {
      return `box-shadow: 0 -10px 30px -10px #00000088;
              opacity: 1;
              padding-top: .5rem;
              padding-bottom: .5rem;
              background-color: var(--bg-secondary);
              @media (min-width: 768px) {
                padding-top: 1rem;
                padding-bottom: 1rem;
              }`
    }
  }

  return (
    <header
      id="navbar"
      css={[
        tw`w-full bottom-0 flex items-center overflow-visible justify-between fixed z-10 p-5 md:top-0 md:bottom-auto opacity-50 md:hover:opacity-100 lg:p-8`,
        css`
          ${genDelays(3, ANIM_DURATION)}
          transform: translateY(0);
          transition-property: all, background-color, color, fill;
          transition-duration: 250ms, var(--transition-duration);
          transition-timing-function: var(--easing);
          ${scrollstyle()}
          @media (prefers-reduced-motion: reduce) {
            opacity: 1;
            box-shadow: 0 -10px 30px -10px #0008;
            background-color: var(--bg-secondary);
          }
        `
      ]}
    >
      <Helmet>
        <body data-filter={menuOpen ? 'blur' : ''} />
      </Helmet>
      <TransitionSeries duration={ANIM_DURATION} trigger={true}>
        <StyledLinks>
          <nav /* ref={navRef} */>
            <ol css={genDelays(navLinks.length)}>
              <TransitionSeries duration={innerDuration} trigger={true}>
                {navLinks
                  .map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={`/${url}`}>{name}</Link>
                    </li>
                  ))}
              </TransitionSeries>
            </ol>
            <Resume />
          </nav>
        </StyledLinks>
        <DarkButton toggleDark={toggleDark} />
        <div tw="z-0 block md:hidden">
          <StyledHamburgerButton onClick={toggleMenu} menuOpen={menuOpen}>
            <div className="ham-box">
              <div className="ham-box-inner" />
            </div>
          </StyledHamburgerButton>
          <StyledSidebar
            menuOpen={menuOpen}
            aria-hidden={!menuOpen}
            tabIndex={menuOpen ? 1 : -1}
          >
            <nav>
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link
                      to={`/${url}`}
                      onClick={() => {
                        setMenuOpen(false)
                      }}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
              <div css={css`
                background-color: var(--text-secondary);
                transition: background-color var(--transition-props);
                margin: 1.75rem 0 2rem;
                opacity: 0.4;
                height: 1px;
                width: 39%;
              `} />
              <Resume />
            </nav>
          </StyledSidebar>
        </div>
      </TransitionSeries>
      <ChevronUpIcon
        tw='absolute -top-1/3 left-1/2 block h-10 -translate-x-1/2 -translate-y-full text-primary transition-[color] md:top-full md:h-14 md:translate-y-0 md:rotate-180'
        style={{
          pointerEvents: navState === NavState.CLOSE ? 'auto' : 'none',
          opacity: navState === NavState.CLOSE ? 0.7 : 0,
          transitionProperty: 'opacity, color',
          transitionDuration: '250ms, var(--transition-duration)',
          transitionTimingFunction: 'var(--easing)'
        }}
        onClick={() => { setOverrideScroll(true); setNavState(NavState.OPEN) }}
      />
    </header>
  )
}
