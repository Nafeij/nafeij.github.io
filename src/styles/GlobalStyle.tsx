import React from "react";
import { Global, css } from "@emotion/react";
import { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = css`

  :root {
    --bg-light1: #e8e8e8;
    --bg-light2: #eeddcc;
    --bg-dark1: #0f0f0f;
    --bg-dark2: #181818;

  }

  .light {
    --bg-primary: var(--bg-light1);
    --bg-secondary: var(--bg-light2);
    --text-primary: #0f0f0f;
    --text-secondary: #181818;
    --color-primary: #e11d48;

    --blob1: #0036dd;
    --blob2: #db5e04;
  }

  .dark {
    --bg-primary: var(--bg-dark1);
    --bg-secondary: var(--bg-dark2);
    --text-primary: #ffffff;
    --text-secondary: #f1f5f9;
    --color-primary: #2563eb;

    --blob1: #00cc99;
    --blob2: #6600ff;
  }

  *,
  html,
  body {
    transition: 0.25s ease-in-out;
  }

  /* Scrollbar Styles */
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: transparent var(--bg-primary);
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: 3px solid var(--bg-primary);
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
    animation: draw-stroke 12s linear forwards 0.3s;
  }

  @keyframes draw-stroke {
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
  }

  svg#Amazing {
    opacity: 0;
    animation: fade-in-out 12s linear forwards 0.3s;
  }

  @keyframes fade-in-out {
    0%,
    100% {
      opacity: 0;
    }
    20%,
    80% {
      opacity: 1;
    }
  }

  @keyframes glitch {
    0% {
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    14% {
      text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    15% {
      text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    49% {
      text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    50% {
      text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    99% {
      text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    100% {
      text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
        -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
        -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
  }

  @keyframes glitch-clip {
    0%,
    100% {
      clip-path: inset(50%);
    }
    1%,
    99% {
      clip-path: path(
        "M167 -37.5L38.5 166H736L742 -50H910.5V166H-22V-37.5H167Z"
      );
    }
    2%,
    98% {
      clip-path: path(
        "M102.5 -25.5L234 175H357.5L481.5 -36.5H672.5L565 175H102.5L1 -20L102.5 -25.5Z"
      );
    }
    3%,
    97% {
      clip-path: none;
    }
  }

  @keyframes BackgroundSpread {
    100% {
      clip-path: circle(283% at 100% 0%);
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
    }

    h1#Exciting {
      clip-path: none !important;
      animation: fade-in-out 12s linear forwards !important;
    }
  }
`;

export default function GlobalStyle() {
  return (
    <>
      <BaseStyles />
      <Global styles={CustomStyles} />
    </>
  );
}
