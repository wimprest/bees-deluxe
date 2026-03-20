"use client";

import {
  type ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { useNavigationDirection } from "@/context/NavigationContext";

interface PageTransitionProps {
  children: ReactNode;
}

function getBaseRoute(pathname: string): string {
  // "/discs/hallucinate" → "/discs", "/shows" → "/shows", "/" → "/"
  const segments = pathname.split("/").filter(Boolean);
  return segments.length > 0 ? `/${segments[0]}` : "/";
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { direction } = useNavigationDirection();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [exitChildren, setExitChildren] = useState<ReactNode | null>(null);
  const dirRef = useRef(direction);
  const prevBaseRouteRef = useRef(getBaseRoute(pathname));
  const containerRef = useRef<HTMLDivElement>(null);

  const runTransition = useCallback(() => {
    if (!containerRef.current) return;

    // Force a reflow so the browser paints the initial positions
    containerRef.current.offsetHeight;

    // Start the slide
    setIsTransitioning(true);

    const onEnd = () => {
      setIsTransitioning(false);
      setExitChildren(null);
    };

    // Clean up after transition
    const timer = setTimeout(onEnd, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentBase = getBaseRoute(pathname);
    if (currentBase !== prevBaseRouteRef.current) {
      // Different top-level route — run slide transition
      dirRef.current = direction;
      prevBaseRouteRef.current = currentBase;

      setExitChildren(displayChildren);
      setDisplayChildren(children);

      requestAnimationFrame(() => {
        runTransition();
      });
    } else {
      // Same route (e.g. /discs/hallucinate → /discs/smash-hits) — just swap content
      prevBaseRouteRef.current = currentBase;
      setDisplayChildren(children);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, children]);

  const d = dirRef.current;

  // No exit content — just render normally
  if (!exitChildren) {
    return <div>{displayChildren}</div>;
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Exiting page */}
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: isTransitioning ? `translateX(${d * -100}%)` : "translateX(0)",
        }}
      >
        {exitChildren}
      </div>

      {/* Entering page */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: isTransitioning ? "translateX(0)" : `translateX(${d * 100}%)`,
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}
