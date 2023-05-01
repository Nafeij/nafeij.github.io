import React, { createContext, useCallback } from "react";

const sizes: { [key: string]: string } = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const MediaContext = createContext<{
  isMatch: (media: string) => boolean;
  findClosest: (queries: string[]) => String;
}>({
  isMatch: () => false,
  findClosest: () =>"sm",
});

const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const isMatch = useCallback(
    (media: string) => {
      const query = `(min-width: ${sizes[media]})`;
      return window.matchMedia(query).matches;
    },
    [window.innerHeight, window.innerWidth]
  );

  const findClosest = useCallback(
    (queries: string[]) => {
      for (const query of queries) {
        if (isMatch(query)) return query;
      }
      return "sm";
    },
    []
  );

  return (
    <MediaContext.Provider value={{ isMatch, findClosest }}>
      {children}
    </MediaContext.Provider>
  );
};

export { MediaContext, MediaProvider };
