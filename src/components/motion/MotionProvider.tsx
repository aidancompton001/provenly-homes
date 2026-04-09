"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface MotionContextValue {
  reducedMotion: boolean;
  lenisRef: React.RefObject<Lenis | null>;
}

const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  lenisRef: { current: null },
});

export function useMotion() {
  return useContext(MotionContext);
}

// Subscribe to prefers-reduced-motion via useSyncExternalStore
function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface MotionProviderProps {
  children: ReactNode;
}

export default function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Initialize / destroy Lenis based on reduced motion
  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;

    let animationId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      animationId = requestAnimationFrame(raf);
    }
    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <MotionContext.Provider value={{ reducedMotion, lenisRef }}>
      {children}
    </MotionContext.Provider>
  );
}
