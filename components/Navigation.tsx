"use client";

import * as React from "react";
import Link from "next/link";
import { scrollToElement } from "@/lib/scroll-utils";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="#hero"
              className="font-bold text-xl"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement('hero');
              }}
            >
              Cofount
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#hero">Home</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#cardstack">Cards</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Extract the ID from the href (remove the #)
    const id = href.replace('#', '');
    scrollToElement(id);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    scrollToElement(id);
  };

  // Prevent body scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black backdrop-blur-sm flex flex-col h-[100vh] w-screen overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-white/70 transition-colors"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="flex flex-col px-6 py-8 mt-12">
            <div className="flex flex-col space-y-8 text-4xl text-white">
              <Link
                href="#hero"
                className="text-white hover:text-white/70 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('hero');
                }}
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-white hover:text-white/70 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('features');
                }}
              >
                Features
              </Link>
              <Link
                href="#parallax-grid"
                className="text-white hover:text-white/70 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('parallax-grid');
                }}
              >
                Works
              </Link>
              <Link
                href="#cardstack"
                className="text-white hover:text-white/70 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('cardstack');
                }}
              >
                Cards
              </Link>
              <Link
                href="#faq"
                className="text-white hover:text-white/70 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('faq');
                }}
              >
                FAQ
              </Link>
            </div>
          </div>


          <div className="p-6 mt-auto border-t border-white/10">
            <div className="flex items-center mb-4">
              <a
                href="#"
                className="mr-4 bg-white rounded-full p-3 flex items-center justify-center"
                aria-label="Telegram"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2L15 22 11 13 2 9 22 2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white rounded-full p-3 flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
            <p className="text-white/80 mb-4">contact@example.com</p>

          </div>
        </div>
      )}
    </div>
  );
} 