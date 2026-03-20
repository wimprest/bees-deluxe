"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

const NAV_INDEX: Record<string, number> = {
  "/": 0,
  "/shows": 1,
  "/musicians": 2,
  "/press": 3,
  "/discs": 4,
  "/photos": 5,
  "/videos": 6,
  "/epk": 7,
  "/contact": 8,
};

function getNavIndex(pathname: string): number {
  if (pathname in NAV_INDEX) return NAV_INDEX[pathname];
  const prefix = "/" + pathname.split("/")[1];
  return NAV_INDEX[prefix] ?? 0;
}

interface NavigationContextValue {
  direction: number; // -1 = left, 1 = right
}

const NavigationContext = createContext<NavigationContextValue>({
  direction: 1,
});

export function useNavigationDirection() {
  return useContext(NavigationContext);
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const directionRef = useRef(1);

  // Compute direction synchronously, but compare against the PREVIOUS pathname
  // not the previous index — this prevents double-render issues
  if (pathname !== prevPathRef.current) {
    const prevIndex = getNavIndex(prevPathRef.current);
    const currentIndex = getNavIndex(pathname);
    directionRef.current = currentIndex >= prevIndex ? 1 : -1;
  }

  // Update the prev path ref AFTER the render commits, not during render
  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ direction: directionRef.current }}>
      {children}
    </NavigationContext.Provider>
  );
}
