import { useState, useEffect } from 'react';

/**
 * Hook to track scroll position and direction
 * @param {number} threshold - Threshold in pixels to trigger scrolled state
 */
export function useScroll(threshold = 0) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
