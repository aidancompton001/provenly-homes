"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import siteData from "@/data/site.json";
import type { SiteConfig } from "@/data/types";

const site = siteData as SiteConfig;

function PhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22 16.92V19.92C22 20.48 21.56 20.94 21 20.98C20.7 21 20.39 21.01 20.08 21.01C10.61 21.01 3 13.4 3 3.92C3 3.61 3.01 3.3 3.02 3C3.06 2.44 3.52 2 4.08 2H7.08C7.56 2 7.97 2.35 8.05 2.82C8.14 3.39 8.3 3.94 8.53 4.46L7.07 5.92C8.19 8.45 10.55 10.81 13.08 11.93L14.54 10.47C15.06 10.7 15.61 10.86 16.18 10.95C16.65 11.03 17 11.44 17 11.92V14.92"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FloatingContacts() {
  const [showPastHero, setShowPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowPastHero(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 lg:hidden"
      animate={{ y: showPastHero ? 0 : 80, opacity: showPastHero ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <a
        href={`tel:${site.phone}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-copper text-white shadow-[0_4px_16px_rgba(184,115,51,0.4)] hover:bg-copper-light transition-colors duration-200"
        aria-label={`Anrufen: ${site.phone}`}
      >
        <PhoneIcon />
      </a>
    </motion.div>
  );
}
