import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
     text: string;
     isDark: boolean;
     button: string;
     background: string;
     blobColor1: string;
     blobColor2: string;
  }
}