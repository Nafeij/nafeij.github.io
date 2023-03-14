import { css } from "@emotion/react";

import SourceSansProBoldWoff from "@fonts/source_sans_probold/sourcesanspro-bold-webfont.woff";
import SourceSansProBoldWoff2 from "@fonts/source_sans_probold/sourcesanspro-bold-webfont.woff2";

const Fonts = css`
  @font-face {
    font-family: "source_sans_probold";
    src:  url(${SourceSansProBoldWoff2}) format("woff2"),
          url(${SourceSansProBoldWoff}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

export default Fonts;
