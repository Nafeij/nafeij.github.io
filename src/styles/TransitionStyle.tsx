import { css } from '@emotion/react'

// https://reactcommunity.org/react-transition-group/css-transition

const TransitionStyles = css`
  :root{
    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  /* Fade up */
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(5vh);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0vh);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  /* Fade down */
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-5vh);
    transition: opacity 300ms var(--easing), transform 0ms var(--easing);
  }
  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0vh);
    transition: opacity 300ms var(--easing), transform 300ms var(--easing);
  }
  /* Fade */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms var(--easing);
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active, .fade-exit-done {
    opacity: 0;
    transition: opacity 300ms var(--easing);
  }

  .fadedown-enter-done, .fadeup-enter-done, .fade-enter-done, .fade-exit-done {
    transition-delay: 0s !important;
  }
`

export default TransitionStyles
