"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/Button";

const COOKIE_KEY = "ph-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Delay appearance so it doesn't compete with hero
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal/90 backdrop-blur-md border-t border-cream/15"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center gap-4">
            <p className="font-body text-sm text-cream/90 flex-1 text-center sm:text-left">
              Diese Website verwendet Cookies, um Ihnen die bestmögliche Nutzung
              unserer Website zu ermöglichen.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="ghost" size="sm" onClick={handleDecline}>
                Ablehnen
              </Button>
              <Button variant="primary-dark" size="sm" onClick={handleAccept}>
                Akzeptieren
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
