const React = require("react");
import { ThemeProvider } from "./src/styles/ThemeContext";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)