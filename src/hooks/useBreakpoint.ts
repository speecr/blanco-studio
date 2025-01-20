import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsAbove(window.innerWidth >= breakpoints[breakpoint]);
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return isAbove;
}