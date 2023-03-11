import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
     text: string;
     isDark: boolean;
     button: string;
  }
}