'use client';

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-(--color-cream)/90 backdrop-blur-md pt-4 pb-2 border-b border-(--color-ink)/10">
      <div className="mx-auto max-w-4xl px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-base sm:text-lg font-bold tracking-tight leading-snug max-w-[min(100%,14rem)] sm:max-w-none">
          Aparajita Gupta, Product Enthusiast and Builder
        </Link>
        <div className="flex gap-6 text-sm font-medium items-center">
          <Link href="/" className="hover:text-(--color-accent) transition">Home</Link>
          <Link href="/work" className="hover:text-(--color-accent) transition">Work</Link>
          <Link href="/about" className="hover:text-(--color-accent) transition">About</Link>
          
          {/* Contact Dropdown */}
          <div 
            className="relative"
            onMouseLeave={() => setIsOpen(false)}
          >
            <button 
              onClick={() => setIsOpen(!isOpen)}
              onMouseEnter={() => setIsOpen(true)}
              className="flex items-center gap-1 hover:text-(--color-accent) transition focus:outline-none cursor-pointer"
            >
              Contact <ChevronDown size={14} />
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-(--color-cream) border border-(--color-ink)/10 p-3 shadow-lg flex flex-col gap-2">
                <a 
                  href="mailto:aparajita2407@gmail.com" 
                  className="flex items-center gap-2 text-xs sm:text-sm hover:text-(--color-accent) transition text-(--color-ink)/80 p-1"
                >
                  <Mail size={16} /> aparajita2407@gmail.com
                </a>
                <a 
                  href="tel:+918840976918" 
                  className="flex items-center gap-2 text-xs sm:text-sm hover:text-(--color-accent) transition text-(--color-ink)/80 p-1"
                >
                  <Phone size={16} /> +91-8840976918
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
