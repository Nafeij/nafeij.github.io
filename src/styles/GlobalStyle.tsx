/** @jsx jsx */
import { Fragment } from "react";
import { jsx, css, Global, keyframes } from "@emotion/react";
import { GlobalStyles as BaseStyles } from "twin.macro";

import { Fonts, TransitionStyle } from "@styles";

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
`;

const fadeInOut = keyframes`
  0%,
  100% {
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
`;

const CustomStyles = css`
  ${Fonts}

  :root {
    --bg-light1: #e8e8e8;
    --bg-light2: #eeddcc;
    --bg-dark1: #0f0f0f;
    --bg-dark2: #181818;

    --link-color: #2563eb;

    --font-mono: "SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace;

    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .light {
    --bg-primary: var(--bg-light1);
    --bg-secondary: var(--bg-light2);
    --text-primary: #080808;
    --text-secondary: #484848;
    --color-primary: #e11d48;

    --blob1: #0036dd;
    --blob2: #db5e04;
  }

  .dark {
    --bg-primary: var(--bg-dark1);
    --bg-secondary: var(--bg-dark2);
    --text-primary: #f1f5f9;
    --text-secondary: #c0c0c0;
    --color-primary: #2563eb;

    --blob1: #00cc99;
    --blob2: #6600ff;
  }

  *:not(body):not(html) {
    transition: var(--transition);
  }

  /* Scrollbar Styles */
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--text-primary) transparent;
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: 3px solid var(--text-primary);
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
    }

    h1#Exciting {
      clip-path: none !important;
      animation: fade-in-out 12s linear forwards !important;
    }
  }

  ${TransitionStyle}
`;

export default function GlobalStyle() {
  return (
    <Fragment>
      <BaseStyles />
      <Global styles={CustomStyles} />
    </Fragment>
  );
}
