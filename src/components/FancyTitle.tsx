import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { random } from '@util'
import { forwardRef, Ref, useState } from 'react'

const Inspiring = ({ animCallback }: { animCallback: () => void }) => (
  <svg height="100%" id="Inspiring" tw="fill-[var(--text-primary)] stroke-[var(--text-primary)] transition-[fill,stroke]" viewBox="0 0 1040 260">
    <path onAnimationEnd={animCallback} d="M10 10h77.47v5.22H66.01v155.87h21.46v5.22H10v-5.22h21.34V15.22H10V10Zm150.53 166.3H102.2v-4.75h15.2V75.64h-15.2v-4.75h44.07v16.58h.58c4.02-6.26 8.66-11.1 13.91-14.5a38.59 38.59 0 0 1 21-5.91c10.59 0 18.9 3.55 24.93 10.67 5.64 6.88 8.47 17.24 8.47 31.08v62.74h15.19v4.75H172v-4.75h14.27v-62.74c0-7.42-.23-12.95-.7-16.59-.38-3.63-1.2-6.57-2.43-8.8-2.48-4.57-6.19-6.85-11.14-6.85-6.57 0-12.21 3.1-16.93 9.28-3.79 4.71-6.22 9.47-7.3 14.26-1.01 4.72-1.51 10.55-1.51 17.51v53.93h14.26v4.75Zm320.2-105.41h44.07v100.66h15.31v4.75h-59.38v-4.75h15.2V75.64h-15.2v-4.75Zm17.28-27.84A16.68 16.68 0 0 1 493.03 31c0-4.64 1.66-8.66 4.98-12.06a16.5 16.5 0 0 1 12.06-5.1c4.64 0 8.66 1.7 12.06 5.1 3.4 3.4 5.1 7.42 5.1 12.06 0 4.64-1.7 8.66-5.1 12.06a16.68 16.68 0 0 1-12.06 4.99c-4.63 0-8.65-1.66-12.06-4.99ZM613.64 176.3h-59.38v-4.75h15.2V75.64h-15.2v-4.75h40.36v22.26h.46a33.85 33.85 0 0 1 8.24-17.51c5.02-5.72 11.05-8.58 18.09-8.58 5.95 0 10.78 1.97 14.5 5.91 4.1 4.1 6.14 9.98 6.14 17.63 0 5.41-1.35 9.74-4.06 12.99a13.74 13.74 0 0 1-11.13 5.22c-4.33 0-7.81-1.16-10.44-3.48a13.38 13.38 0 0 1-4.52-10.44c0-4.02 1.43-7.7 4.29-11.02.38-.54.93-1.2 1.62-1.97.78-.77 1.32-1.35 1.63-1.74.38-.46.73-1 1.04-1.62.3-.62.46-1.2.46-1.74 0-.77-.46-1.55-1.39-2.32a5.11 5.11 0 0 0-3.6-1.27c-2 0-4.05.85-6.14 2.55a25.55 25.55 0 0 0-5.45 6.72c-4.02 7.04-6.03 17.01-6.03 29.92v59.15h15.3v4.75Zm38.5-105.41h44.07v100.66h15.3v4.75h-59.37v-4.75h15.2V75.64h-15.2v-4.75Zm17.28-27.84A16.68 16.68 0 0 1 664.43 31a16.7 16.7 0 0 1 4.99-12.06c3.4-3.4 7.42-5.1 12.06-5.1 4.64 0 8.66 1.7 12.06 5.1 3.4 3.4 5.1 7.42 5.1 12.06 0 4.64-1.7 8.66-5.1 12.06a16.68 16.68 0 0 1-12.06 4.99c-4.64 0-8.66-1.66-12.06-4.99ZM784 176.3h-58.33v-4.75h15.19V75.64h-15.2v-4.75h44.08v16.58h.58c4.02-6.26 8.66-11.1 13.91-14.5a38.59 38.59 0 0 1 21-5.91c10.59 0 18.9 3.55 24.93 10.67 5.64 6.88 8.46 17.24 8.46 31.08v62.74h15.2v4.75h-58.34v-4.75h14.27v-62.74c0-7.42-.24-12.95-.7-16.59-.38-3.63-1.2-6.57-2.43-8.8-2.48-4.57-6.19-6.85-11.14-6.85-6.57 0-12.21 3.1-16.93 9.28-3.79 4.71-6.22 9.47-7.3 14.26-1.01 4.72-1.51 10.55-1.51 17.51v53.93H784v4.75Zm116.55-35.83V140a39.74 39.74 0 0 1-14.5-11.24c-5.02-6.27-7.53-13.84-7.53-22.73 0-12.45 4.33-22.2 12.99-29.23 7.88-6.5 18.2-9.74 30.96-9.74 8.12 0 15.7 1.82 22.73 5.45a40.48 40.48 0 0 1 7.42-10.67 25.47 25.47 0 0 1 19.26-8.35c4.95 0 8.89 1.28 11.83 3.83 3.32 2.78 4.98 6.72 4.98 11.83 0 3.17-.8 5.8-2.43 7.88-2.17 2.7-5.22 4.06-9.16 4.06-3.48 0-6.27-1.04-8.36-3.13-1.93-1.93-2.9-4.45-2.9-7.54 0-1.16.43-3.01 1.28-5.56.62-2.1.93-3.17.93-3.25 0-1.32-.89-1.97-2.67-1.97-2.94 0-6.03 1.85-9.28 5.56a56.7 56.7 0 0 0-6.37 9.98 29.34 29.34 0 0 1 9.16 7.88 27.2 27.2 0 0 1 5.1 9.63c1 3.25 1.62 5.84 1.86 7.77.3 1.93.46 3.71.46 5.33 0 13.22-4.64 23.43-13.92 30.62-7.65 6.03-18.13 9.05-31.42 9.05-1.4 0-3.48-.04-6.27-.12-2.78-.08-4.87-.12-6.26-.12-7.2 0-12.18.7-14.96 2.1-3.02 1.46-4.52 3.66-4.52 6.6 0 3.71 2.59 6.03 7.77 6.96 6.18.93 15.77 1.47 28.76 1.62 7.34.08 12.83.24 16.47.47 3.63.15 8 .73 13.1 1.74 5.18 1 9.59 2.51 13.22 4.52 10.44 5.88 15.66 14.5 15.66 25.86 0 11.83-5.69 20.76-17.05 26.8-9.97 5.4-24.9 8.11-44.77 8.11-13.6 0-24.58-1.5-32.93-4.52-12.84-4.64-19.25-11.83-19.25-21.57 0-5.57 2.63-10.32 7.88-14.27 5.34-3.94 11.56-6.18 18.67-6.72v-.47c-5.56-1.24-10.24-3.36-14.03-6.38-4.87-4.02-7.3-9-7.3-14.96 0-7.03 3.24-12.4 9.74-16.12 4.17-2.47 9.4-3.98 15.65-4.52Zm21.92.23c6.42 0 10.98-3.1 13.69-9.28 1.77-4.33 2.67-12.71 2.67-25.16s-.9-20.84-2.67-25.17c-2.7-6.18-7.27-9.28-13.69-9.28-6.5 0-11.1 3.1-13.8 9.28-1.78 4.33-2.67 12.72-2.67 25.17 0 12.44.9 20.83 2.67 25.16 2.7 6.19 7.3 9.28 13.8 9.28Zm-41.17 63.67c0 6.1 3.71 11.25 11.13 15.42 6.89 3.64 17.05 5.46 30.5 5.46 13.23 0 23.9-1.44 32.02-4.3 5.87-2.08 10.08-4.67 12.64-7.77 2.62-3.09 3.94-6.18 3.94-9.27 0-4.72-2.51-8.55-7.54-11.48-7.03-4.1-20.33-6.15-39.9-6.15-19.25 0-31.77 2.28-37.57 6.84-3.48 2.78-5.22 6.53-5.22 11.25ZM348.18 230h59.37v-4.75h-15.19v-60.78h.47a29.2 29.2 0 0 0 12.29 11.84 35.82 35.82 0 0 0 16.24 3.82c12.44 0 22.8-5.64 31.07-16.93 7.5-10.05 11.25-23.35 11.25-39.9 0-18.47-4.67-33.05-14.03-43.72-7.42-8.35-16.39-12.52-26.9-12.52a33 33 0 0 0-17.28 4.87 35.2 35.2 0 0 0-12.64 13.22h-.47V50.13c0-18.56-11.94-33.4-29-33.4-6.1 0-21.47.51-27.47 15.34 1.47-.3 3-.47 4.57-.5 5.73-10.3 17.42-11.13 22.9-11.13 7.43 0 22.04 7.42 22.04 29.69 0 17.81-24.81 22.26-37.22 22.26v3.25h15.19v149.6h-15.2V230Zm66.8-57.52c-2.94 0-5.92-.93-8.93-2.79-3.02-1.85-5.69-4.79-8-8.81-4.72-7.96-7.08-20.33-7.08-37.11 0-15.16 2.2-26.95 6.61-35.37 2.4-4.64 5.18-8.08 8.35-10.32 3.25-2.32 6.5-3.48 9.74-3.48 7.12 0 11.64 6.18 13.57 18.55 1.4 9.05 2.09 19.4 2.09 31.08 0 14.54-.77 25.56-2.32 33.05-1.16 5.73-3.06 9.7-5.68 11.95-2.63 2.17-5.42 3.25-8.35 3.25ZM315.36 99.3h5.68V62.86c0-13.43 5.54-23 13.45-26.3a30.3 30.3 0 0 1 1.4-4.5c-12.63 2.6-21 15.06-21 30.8 0 7.22-4.8 9.29-7.19 9.42-.85 0-1.78-.08-2.78-.23a71.12 71.12 0 0 1-5.8-1.74c-1.4-.47-2.63-.85-3.71-1.16a46.3 46.3 0 0 0-13.8-2.1c-11.52 0-20.53 3.56-27.02 10.68-5.42 6.03-8.12 13.22-8.12 21.57 0 4.87.77 9.28 2.32 13.22a27.58 27.58 0 0 0 6.5 9.74 51.02 51.02 0 0 0 7.88 6.03 53.59 53.59 0 0 0 8.23 3.83c6.19 2.24 12.72 3.9 19.6 4.99 6.88 1.08 11.99 2.43 15.31 4.05 7.58 3.64 11.37 9.09 11.37 16.36 0 4.94-2.13 9.24-6.38 12.87-4.26 3.33-9.78 4.99-16.59 4.99-7.8 0-15.03-2.05-21.68-6.15a43.43 43.43 0 0 1-13.34-12.64 43.76 43.76 0 0 1-6.84-17.05h-5.69v40.6h5.69c.07-1.63.8-2.9 2.2-3.83a8.78 8.78 0 0 1 4.99-1.4c1.31 0 4.79.78 10.43 2.32a85.74 85.74 0 0 0 21.11 2.9c10.83 0 19.95-2.7 27.37-8.12 8.66-6.34 12.99-15.27 12.99-26.79 0-4.87-.74-9.31-2.2-13.33-1.47-4.02-3.25-7.27-5.34-9.74a33.31 33.31 0 0 0-7.54-6.73 42.06 42.06 0 0 0-7.88-4.4 64.17 64.17 0 0 0-7.43-2.44 144.18 144.18 0 0 0-17.97-3.71c-6.34-.93-10.94-2.05-13.8-3.37-6.03-2.7-9.05-7-9.05-12.87 0-2.17.31-3.98.93-5.45.62-1.86 1.9-3.75 3.83-5.68 4.02-3.8 9.4-5.69 16.12-5.69 7.42 0 13.91 2.05 19.48 6.15 6.8 4.87 11.56 11.98 14.27 21.34Z" />
    <path d="M340.46 31.57c-1.58.03-3.1.2-4.57.5a30.3 30.3 0 0 0-1.4 4.48 16.3 16.3 0 0 1 4.28-1.14 23.1 23.1 0 0 1 1.69-3.84Z" />
    <path d="M355.71 46.42c0 14.84-18.55 14.84-18.55 0 0-4.36.6-7.99 1.61-11a16.3 16.3 0 0 0-4.28 1.13 43.4 43.4 0 0 0-1.04 9.87c0 18.55 25.98 18.55 25.98 0 0-7.43-3.72-14.85-18.56-14.85h-.41a23.1 23.1 0 0 0-1.69 3.84c.7-.08 1.4-.13 2.1-.13 7.11 0 14.84 3.24 14.84 11.14ZM1000 159.16c0 4.64 1.66 8.66 4.99 12.06a16.67 16.67 0 0 0 12.06 5c4.64 0 8.66-1.67 12.06-5a16.5 16.5 0 0 0 5.1-12.06c0-4.63-1.7-8.66-5.1-12.06-3.4-3.4-7.42-5.1-12.06-5.1-4.64 0-8.66 1.7-12.06 5.1a16.66 16.66 0 0 0-4.99 12.06Z" />
  </svg>
)

const Amazing = ({
  animCallback
}: {
  animCallback: () => void
}) => (
  <svg
    id="Amazing"
    viewBox="0 0 935 230"
    height="100%"
    onAnimationEnd={animCallback}
  >
    <clipPath id="textClip" className="filled-heading">
      <text
        css={{
          fontFamily: 'source_sans_pro',
          fontSize: '230px',
          fontWeight: 'bold'
        }}
        y=".75em"
      >
        Amazing.
      </text>
    </clipPath>
    <g clipPath="url(#textClip)">
      <circle cx="0" cy="0" tw="fill-blob2" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob1" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob2" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob1" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob1" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob2" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob2" r="20%" />
      <circle cx="0" cy="0" tw="fill-blob1" r="20%" />
    </g>
  </svg>
)

const glitch = keyframes`
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
`

const glitchClip = keyframes`
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
`

const H1Styled = styled.h1`
  position: relative;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: clamp(4rem,14vw,11rem) !important;
  height: 100%;
  box-sizing: border-box;
  line-height: 1.1 !important;
  animation: ${glitchClip} 10s steps(100, end);
  clip-path: inset(50%);
  transition: color var(--transition-props);
`

const SpanStyled = styled.span`
  position: absolute;
  left: 0;
  height: inherit;

  &:first-of-type {
    animation: ${glitch} 2s 6;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-0.025em, -0.0125em);
    opacity: 0.8;
  }

  &:last-of-type {
    animation: ${glitch} 1s 12;
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(0.0125em, 0.025em);
    opacity: 0.8;
  }
`

const Exciting = ({
  animCallback
}: {
  animCallback: () => void
}) => (
  <H1Styled
    id="Exciting"
    onAnimationEnd={animCallback}
  >
    <SpanStyled aria-hidden="true">Exciting.</SpanStyled>
    Exciting.
    <SpanStyled aria-hidden="true">Exciting.</SpanStyled>
  </H1Styled>
)

const FancyTitle = forwardRef((_, ref : Ref<HTMLDivElement>) => {
  const [iter, setIter] = useState(random(0, 2))
  return (
    <div
      css={{
        height: 'clamp(5rem,18vw,14rem)',
        aspectRatio: '970/239'
      }}
      ref={ref}
    >
      {iter === 0 && (
        <Inspiring
          animCallback={() => {
            setIter(1)
          }}
        />
      )}
      {iter === 1 && (
        <Amazing
          animCallback={() => {
            setIter(2)
          }}
        />
      )}
      {iter === 2 && (
        <Exciting
          animCallback={() => {
            setIter(0)
          }}
        />
      )}
    </div>
  )
})

export default FancyTitle
