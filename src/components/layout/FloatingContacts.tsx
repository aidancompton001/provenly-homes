"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import siteData from "@/data/site.json";
import type { SiteConfig } from "@/data/types";
import { MOTION_PAGE_EASE } from "@/lib/animations";

const site = siteData as SiteConfig;

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 16.92V19.92C22 20.48 21.56 20.94 21 20.98C20.7 21 20.39 21.01 20.08 21.01C10.61 21.01 3 13.4 3 3.92C3 3.61 3.01 3.3 3.02 3C3.06 2.44 3.52 2 4.08 2H7.08C7.56 2 7.97 2.35 8.05 2.82C8.14 3.39 8.3 3.94 8.53 4.46L7.07 5.92C8.19 8.45 10.55 10.81 13.08 11.93L14.54 10.47C15.06 10.7 15.61 10.86 16.18 10.95C16.65 11.03 17 11.44 17 11.92V14.92" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 6L12 11L4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// DM lines 300-312: full-width bottom bar, blur bg, phone + email
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
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      animate={{ y: showPastHero ? 0 : 80 }}
      transition={{ duration: 0.3, ease: MOTION_PAGE_EASE }}
    >
      {/* DM line 307: backdrop blur + dark bg + border-top */}
      <div className="backdrop-blur-md bg-charcoal/90 border-t border-cream/15">
        <div className="flex items-center justify-center gap-8 py-3 px-4">
          {/* DM line 308: Phone icon */}
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 text-copper hover:opacity-80 transition-opacity duration-150"
            aria-label={`Anrufen: ${site.phone}`}
          >
            <PhoneIcon />
            <span className="font-body text-sm text-cream/80">Anrufen</span>
          </a>

          {/* DM line 308: Email icon */}
          <a
            href={`mailto:${site.emailCanonical}`}
            className="flex items-center gap-2 text-copper hover:opacity-80 transition-opacity duration-150"
            aria-label={`E-Mail: ${site.emailCanonical}`}
          >
            <EmailIcon />
            <span className="font-body text-sm text-cream/80">E-Mail</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
