import { FancyTitle, Section, TransitionSeries, genDelays } from '@components'
import { css } from '@emotion/react'

export default function Title () {
  return (
    <Section tw="pointer-events-none select-none" id="home" css={genDelays(2, 600)}>
      <TransitionSeries timeout={600} trigger={true}>
        <p
          tw="mb-5 font-mono text-primary"
          css={css`
            font-size: clamp(1.4rem, 3vw, 3rem);
          `}
        >
          <span tw='transition-[color]'>Create something</span>
        </p>
        <FancyTitle />
      </TransitionSeries>
    </Section>
  )
}
