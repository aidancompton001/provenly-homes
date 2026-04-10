"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import siteData from "@/data/site.json";
import type { SiteConfig } from "@/data/types";
import { getImageUrl, getHref } from "@/lib/getImageUrl";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const site = siteData as SiteConfig;

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { rotate: 45, y: 6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.3 }}
      />
      <motion.line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={open ? { rotate: -45, y: -6, x: 0 } : { rotate: 0, y: 0, x: 0 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-charcoal/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <Container className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label={site.company}>
            <img
              src={getImageUrl("/images/logo-full.svg")}
              alt={site.company}
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Hauptnavigation">
            {site.navigation.map((item) => (
              <a
                key={item.href}
                href={getHref(item.href)}
                className={[
                  "font-body text-base font-medium transition-colors duration-200",
                  scrolled
                    ? "text-cream hover:text-copper"
                    : "text-cream/90 hover:text-copper",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="primary-dark"
              size="sm"
              href="/kontakt"
            >
              Erstgespräch vereinbaren
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={[
              "lg:hidden p-2.5 -mr-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-200",
              scrolled ? "text-cream" : "text-cream/90",
            ].join(" ")}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </Container>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-charcoal lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              <motion.nav
                className="flex flex-col items-center gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                {site.navigation.map((item) => (
                  <motion.a
                    key={item.href}
                    href={getHref(item.href)}
                    onClick={closeMenu}
                    className="font-heading text-2xl text-cream hover:text-copper transition-colors duration-200"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Button variant="primary-dark" size="lg" href="/kontakt" onClick={closeMenu}>
                  Erstgespräch vereinbaren
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
