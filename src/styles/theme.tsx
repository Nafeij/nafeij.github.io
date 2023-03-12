export const theme = {
  isDark: false,
  text: "black",
  button: "--dark",
  background: `background: fixed radial-gradient(
      ellipse at center,
      var(--light) 0%,
      var(--light-warm) 100%
    );`,
  blobColor1: "#0036dd",
  blobColor2: "#dB5E04",
};

export const darkTheme = {
  isDark: true,
  text: "white",
  button: "--light",
  background: `background: fixed var(--dark) radial-gradient(
      ellipse at center,
      var(--pip) 8%,
      transparent 8%
    );
    background-size: 8vmin 8vmin;`,
  blobColor1: "#00CC99",
  blobColor2: "#6600FF",
};
