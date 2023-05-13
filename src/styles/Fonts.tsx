import { css } from '@emotion/react'

import SourceSansProBoldWoff from '@fonts/source_sans_pro/sourcesanspro-bold-webfont.woff'
import SourceSansProBoldWoff2 from '@fonts/source_sans_pro/sourcesanspro-bold-webfont.woff2'

import SourceSansProRegularWoff from '@fonts/source_sans_pro/sourcesanspro-regular-webfont.woff'
import SourceSansProRegularWoff2 from '@fonts/source_sans_pro/sourcesanspro-regular-webfont.woff2'

import SourceSansProLightWoff from '@fonts/source_sans_pro/sourcesanspro-light-webfont.woff'
import SourceSansProLightWoff2 from '@fonts/source_sans_pro/sourcesanspro-light-webfont.woff2'

import SourceSansProItalicWoff from '@fonts/source_sans_pro/sourcesanspro-italic-webfont.woff'
import SourceSansProItalicWoff2 from '@fonts/source_sans_pro/sourcesanspro-italic-webfont.woff2'

const sourceSansProRegularWeights = {
  light: [SourceSansProLightWoff, SourceSansProLightWoff2],
  normal: [SourceSansProRegularWoff, SourceSansProRegularWoff2],
  bold: [SourceSansProBoldWoff, SourceSansProBoldWoff2]
}

const sourceSansProItalicWeights = {
  normal: [SourceSansProItalicWoff, SourceSansProItalicWoff2]
}

const sourceSansPro = {
  name: 'source_sans_pro',
  normal: sourceSansProRegularWeights,
  italic: sourceSansProItalicWeights
}

type Style = 'normal' | 'italic' | undefined

interface FontFamily {
  name: string
  normal: Record<string, string[]>
  italic: Record<string, string[]>
}

function createFontFaces ({
  family,
  style = 'normal'
}: {
  family: FontFamily
  style?: Style
}) {
  let styles = ''

  for (const [weight, formats] of Object.entries(family[style])) {
    const woff = formats[0]
    const woff2 = formats[1]

    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2'),
            url(${woff}) format('woff');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `
  }

  return styles
}

const sourceSansProRegular = createFontFaces({ family: sourceSansPro })

const sourceSansProItalic = createFontFaces({
  family: sourceSansPro,
  style: 'italic'
})

const Fonts = css`
  ${sourceSansProRegular}
  ${sourceSansProItalic}
`

export default Fonts
