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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  // Initialize / destroy Lenis + wire GSAP ScrollTrigger
  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenisInstance;

    // Wire Lenis scroll events to ScrollTrigger so GSAP animations
    // respond correctly to Lenis smooth scroll position
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Let GSAP ticker drive Lenis raf instead of requestAnimationFrame
    // This keeps both systems in perfect sync on the same frame loop
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Remove the Lenis raf callback from GSAP ticker
      gsap.ticker.remove(lenisInstance.raf as unknown as gsap.TickerCallback);
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
