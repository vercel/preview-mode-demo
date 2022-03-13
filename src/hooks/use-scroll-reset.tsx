import { useEffect } from 'react';

export function useScrollReset() {
  useEffect(() => {
    setTimeout(
      () => window.requestAnimationFrame(() => window.scrollTo(0, 0)),
      16.667 * 5 // wait at least 5 frames
    );
  }, []);
}
