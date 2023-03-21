const SCROLL_UP = "up";
const SCROLL_DOWN = "down";

import { useState, useEffect } from "react";

interface UseScrollDirectionOptions {
  initialDirection?: string;
  thresholdPixels?: number;
  off?: boolean;
}

const useScrollDirection = ({
  initialDirection,
  thresholdPixels,
  off,
}: UseScrollDirectionOptions) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off
      ? window.addEventListener("scroll", onScroll)
      : setScrollDir(initialDirection);

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
};

export const scrollHorizontal = (ref : React.RefObject<HTMLDivElement>) => (
  (e: React.WheelEvent) => {
    // e.preventDefault();
    ref.current && ref.current.scrollBy({
      top: 0,
      left: e.deltaY * ref.current.clientWidth * 0.0027,
      behavior: "smooth",
    });
  }
);

export default useScrollDirection;
