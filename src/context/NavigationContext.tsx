"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
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
  // Exact match first, then check prefix for nested routes like /discs/[slug]
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
  const prevIndexRef = useRef(getNavIndex(pathname));
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const currentIndex = getNavIndex(pathname);
    const prev = prevIndexRef.current;
    if (currentIndex !== prev) {
      setDirection(currentIndex > prev ? 1 : -1);
      prevIndexRef.current = currentIndex;
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ direction }}>
      {children}
    </NavigationContext.Provider>
  );
}
