import { useEffect, useRef, useState } from 'react';

export function useInView(options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin]);

  return { ref, isInView };
}