const SCROLL_FORWARD = "forward";
const SCROLL_BACKWARD = "backward";

import { useState, useEffect } from "react";

interface UseScrollDirectionOptions {
  containerRef: React.RefObject<HTMLElement> | null;
  initialDirection?: string;
  horizontal?: boolean;
  thresholdPixels?: number;
  off?: boolean;
}

const useScrollDirection = ({
  containerRef,
  initialDirection = SCROLL_BACKWARD,
  horizontal = false,
  thresholdPixels = 0,
  off,
}: UseScrollDirectionOptions) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) {
      setScrollDir(initialDirection);
      return;
    };
    const threshold = thresholdPixels || 0;
    let lastScroll = horizontal ? container.scrollLeft : container.scrollTop;
    let ticking = false;

    const updateScrollDir = () => {
      const scroll = horizontal ? container.scrollLeft : container.scrollTop;
      if (Math.abs(scroll - lastScroll) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir((scrollDir) => {
        const direction =
          scroll > lastScroll ? SCROLL_FORWARD : SCROLL_BACKWARD;

        // If the last direction equal the new direction there's no need to change the state.
        if (scrollDir === direction) {
          ticking = false;
          return scrollDir;
        }

        return direction;
      });
      lastScroll = scroll > 0 ? scroll : 0;
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
      ? container.addEventListener("scroll", onScroll)
      : setScrollDir(initialDirection);

    return () => container.removeEventListener("scroll", onScroll);
  }, [containerRef, initialDirection, thresholdPixels, off]);

  return scrollDir;
};

export const scrollHorizontal = (
  ref: React.RefObject<HTMLElement>,
  e: React.WheelEvent
) => {
  // e.preventDefault();
  ref.current?.scrollBy({
    top: 0,
    left: e.deltaY * ref.current.clientWidth * 0.0027,
    behavior: "smooth",
  });
};

export default useScrollDirection;
