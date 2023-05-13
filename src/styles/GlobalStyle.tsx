import { Fragment } from 'react'
import { css, Global, keyframes } from '@emotion/react'
import { GlobalStyles as BaseStyles } from 'twin.macro'

import { Fonts, TransitionStyle } from '@styles'

const drawStroke = keyframes`
  0%,
  100% {
    fill-opacity: 0;
    stroke-dashoffset: 800;
    stroke-opacity: 1;
  }
  25%,
  75% {
    fill-opacity: 0;
    stroke-opacity: 1;
  }
  33%,
  66% {
    fill-opacity: 1;
    stroke-dashoffset: 0;
    stroke-opacity: 0;
  }
`

const fadeInOut = keyframes`
  0%,
  100% {
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
`

const CustomStyles = css`
  ${Fonts}

  :root {
    --link-color: #2563eb;

    --light: #fff;
    --dark: #000;

    --bg-light: fixed
      radial-gradient(
        ellipse at center,
        var(--bg-light1) 0%,
        var(--bg-light2) 100%
      );
    --bg-dark: fixed 0% 0% / 8vmin 8vmin var(--bg-dark1)
      radial-gradient(ellipse at center, var(--bg-dark2) 8%, transparent 8%);

    --font-mono: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;

    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.light {
      --bg: var(--bg-light);
      --bg-under: var(--bg-dark);
      --bg-primary: var(--bg-light1);
      --bg-secondary: var(--bg-light2);

      --text-primary: var(--text-light1);
      --text-secondary: var(--text-light2);

      --button: var(--button-light);
      --accent: var(--accent-light);

      --blob1: var(--blob-light1);
      --blob2: var(--blob-light2);
    }

    &.dark {
      --bg: var(--bg-dark);
      --bg-under: var(--bg-light);
      --bg-primary: var(--bg-dark1);
      --bg-secondary: var(--bg-dark2);

      --text-primary: var(--text-dark1);
      --text-secondary: var(--text-dark2);

      --button: var(--button-dark);
      --accent: var(--accent-dark);

      --blob1: var(--blob-light1);
      --blob2: var(--blob-light2);
    }

    --bg-light1: #e8e8e8;
    --bg-light2: #eeddcc;
    --bg-dark1: #0f0f0f;
    --bg-dark2: #181818;

    --text-light1: #080808;
    --text-light2: #484848;
    --text-dark1: #f1f5f9;
    --text-dark2: #c0c0c0;

    --button-light: #484848;
    --button-dark: #e1e5e9;

    --accent-light: #181818;
    --accent-dark: #e0e0e0;

    --blob-light1: #0036dd;
    --blob-light2: #db5e04;
    --blob1-dark: #00cc99;
    --blob2-dark: #6600ff;

    &[data-variant="1"] {
      --bg-light1: #ffffff;
      --bg-light2: #f1f5f9;
      --bg-dark1: #101528;
      --bg-dark2: #111111;

      --button-light: #407897;
      --button-dark: #ff533f;

      --accent-light: #407897;
      --accent-dark: #ab987a;

      --text-light1: #286f99;
      --text-light2: #407897;
      --text-dark1: #f6f6f6;
      --text-dark2: #dddddd;
    }
  }

  body[data-filter="blur"] {
    #content {
      overflow: hidden;
      & > *:not(#fakeBg):not(#contact),
      #contact #card {
        filter: blur(5px) brightness(0.7);
        pointer-events: none;
        user-select: none;
      }
    }
  }

  *:not(body):not(html) {
    transition: var(--transition);
  }

  /* Scrollbar Styles */
  html,
  body {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--text-secondary) transparent;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--text-secondary);
    border-radius: 10px;
  }

  svg#Inspiring path {
    fill-opacity: 0;
    stroke-width: 6px;
    paint-order: stroke;
    stroke-dasharray: 800;
    stroke-dashoffset: 800;
    stroke-linecap: round;
    stroke-linejoin: round;
    animation: ${drawStroke} 12s linear forwards 0.3s;
  }

  svg#Amazing {
    opacity: 0;
    animation: ${fadeInOut} 12s linear forwards 0.3s;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      animation: none !important;
      transition: none !important;
      background-attachment: initial !important;
    }

    svg#Inspiring path {
      fill-opacity: 1 !important;
      stroke-dashoffset: 0 !important;
      stroke-opacity: 0 !important;
      animation: fade-in-out 12s linear forwards !important;
    }

    svg#Amazing {
      animation: fade-in-out 12s linear forwards !important;
      opacity: 1 !important;
    }

    h1#Exciting {
      clip-path: none !important;
      animation: fade-in-out 12s linear forwards !important;
    }
  }

  ${TransitionStyle}
`

export default function GlobalStyle (): JSX.Element {
  return (
    <Fragment>
      <BaseStyles />
      <Global styles={CustomStyles} />
    </Fragment>
  )
}
