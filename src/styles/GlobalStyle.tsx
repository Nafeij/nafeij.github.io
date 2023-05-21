import { css, Global, keyframes } from '@emotion/react'
import { Fonts, TransitionStyle } from '@styles'
import { shuffle } from '@util'
import { GlobalStyles as BaseStyles } from 'twin.macro'

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

const bounceX = keyframes`
  0% {
    cx: 0%;
  }
  100% {
    cx: 100%;
  }
`
const bounceY = keyframes`
  0% {
    cy: 0%;
  }
  100% {
    cy: 100%;
  }
`

const fadeInOut = keyframes`
  0%,
  100% {
    opacity: 0;
  }
  10%,
  90% {
    opacity: 1;
  }
`

const DIRECTIONS = ['alternate', 'alternate-reverse']

const genAnimStyles = (num = 5, max = 10) => {
  const coff = Math.random() * max / num
  const delays = Array.from({ length: num }, (_, i) => i * max / num + coff)
  shuffle(delays)
  console.log(coff, delays)
  let styles = ''
  for (let i = 0; i < num; i++) {
    styles += `
      &:nth-of-type(${i + 1}) {
        animation-delay: -${delays[i]}s, -${delays[num - i - 1]}s;
        animation-direction: alternate, ${DIRECTIONS[i % 2]};
      }
    `
  }
  return styles
}

const CustomStyles = css`
  ${Fonts}

  :root {
    --link-color: #2563eb;

    --light: #fff;
    --dark: #000;

    --bg-light: fixed
      radial-gradient(
        closest-side ellipse at center,
        var(--bg-light1),
        var(--bg-light2)
      ), var(--bg-light2);
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

      --button-primary: var(--button-light1);
      --button-secondary: var(--button-light2);
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

      --button-primary: var(--button-dark1);
      --button-secondary: var(--button-dark2);
      --accent: var(--accent-dark);

      --blob1: var(--blob-light1);
      --blob2: var(--blob-light2);
    }

    --bg-light1: #e8e8e8;
    --bg-light2: #eeddcc;

    --text-light1: #080808;
    --text-light2: #484848;

    --button-light1: #484848;
    --button-light2: #f3d6b9;

    --accent-light: #181818;

    --blob-light1: #0036dd;
    --blob-light2: #db5e04;

    --bg-dark1: #0f0f0f;
    --bg-dark2: #181818;

    --text-dark1: #f1f5f9;
    --text-dark2: #aaaaaa;

    --button-dark1: #e1e5e9;
    --button-dark2: #2e2e2e;

    --accent-dark: #e0e0e0;

    --blob1-dark: #00cc99;
    --blob2-dark: #6600ff;

    &[data-variant="1"] {
      --bg-light1: #e4e4e4;
      --bg-light2: #d1d1d1;

      --text-light1: #136091;
      --text-light2: #327da5;

      --button-light1: #407897;
      --button-light2: #d1d1d1;

      --accent-light: #ff533f;

      --bg-dark1: #101528;
      --bg-dark2: #22273d;

      --text-dark1: #f6f6f6;
      --text-dark2: #dddddd;

      --button-dark1: #ff602c;
      --button-dark2: #000000;

      --accent-dark: #ff533f;
    }

    &[data-variant="2"] {
      --bg-light1: #d3d8de;
      --bg-light2: #ffffff;

      --text-light1: #000000;
      --text-light2: #444444;

      --button-light1: #000000;
      --button-light2: #f5f5f5;

      --accent-light: #da9619;

      --bg-dark1: #323232;
      --bg-dark2: #424242;

      --text-dark1: #b8ffc9;
      --text-dark2: #7db38a;

      --button-dark1: #54b46c;
      --button-dark2: #38473c;

      --accent-dark: #92f2aa;
    }

    &[data-variant="3"] {
      --bg-light1: #efefef;
      --bg-light2: #ffffff;

      --text-light1: #474747;
      --text-light2: #636363;

      --button-light1: #ff3a3f;
      --button-light2: #fafafa;

      --accent-light: #28aecc;

      --bg-dark1: #1f2041;
      --bg-dark2: #2d2e4e;

      --text-dark1: #ffffff;
      --text-dark2: #cecece;

      --button-dark1: #ffc857;
      --button-dark2: #4b3f72;

      --accent-dark: #ffc857;
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

    circle {
      animation: ${bounceX} 12s linear infinite 0.3s, ${bounceY} 12s linear infinite 0.3s;

      ${genAnimStyles(8, 24)}
    }
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

      circle {
        display: none !important;
      }
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
    <>
      <BaseStyles />
      <Global styles={CustomStyles} />
    </>
  )
}
