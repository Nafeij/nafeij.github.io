const SCROLL_UP = "up";
const SCROLL_DOWN = "down";
const SCROLL_LEFT = "left";
const SCROLL_RIGHT = "right";

import { useState, useEffect } from "react";

interface UseScrollDirectionOptions {
  containerRef: React.RefObject<HTMLElement>;
  initialDirectionX?: string;
  initialDirectionY?: string;
  thresholdPixels?: number;
  off?: boolean;
}

const useScrollDirection = ({
  containerRef,
  initialDirectionX,
  initialDirectionY,
  thresholdPixels,
  off,
}: UseScrollDirectionOptions) => {

  const container = containerRef.current;
  if (!container) return;

  const [scrollDir, setScrollDir] = useState([initialDirectionX, initialDirectionY]);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = container.scrollTop;
    let lastScrollX = container.scrollLeft;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = container.scrollTop;
      const scrollX = container.scrollLeft;
      if (
        Math.abs(scrollY - lastScrollY) < threshold &&
        Math.abs(scrollX - lastScrollX) < threshold
      ) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollDir => {
        const directionY = scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP;
        const directionX = scrollX > lastScrollX ? SCROLL_RIGHT : SCROLL_LEFT;

        // If the last direction equal the new direction there's no need to change the state.
        if (
          scrollDir.includes(directionX) &&
          scrollDir.includes(directionY)
        ) {
          ticking = false;
          return scrollDir;
        }

        return [directionX, directionY];
      });
      lastScrollY = scrollY > 0 ? scrollY : 0;
      lastScrollX = scrollX > 0 ? scrollX : 0;
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
      : setScrollDir([initialDirectionX, initialDirectionY]);

    return () => container.removeEventListener("scroll", onScroll);
  }, [containerRef, initialDirectionX, initialDirectionY, thresholdPixels, off]);

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
