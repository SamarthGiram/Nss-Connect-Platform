import { useEffect, useRef, useState } from 'react';

/**
 * High-performance hook using IntersectionObserver to trigger entry transitions.
 * Bypasses heavy animations libraries (like framer-motion) to keep page speed premium.
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce !== false) {
          observer.unobserve(entry.target);
        }
      } else if (options.triggerOnce === false) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold || 0.08,
      rootMargin: options.rootMargin || '0px 0px -60px 0px',
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, isVisible];
};
