'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'Changelog', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className='fixed top-0 left-0 right-0 z-50 transition-all duration-300'
      style={{
        background: scrolled ? 'oklch(0.11 0 0 / 92%)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--fs-border)' : '1px solid transparent',
      }}
    >
      <div className='container-lg'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <a href='#' className='flex items-center gap-2 group'>
            <div className='w-7 h-7 rounded-md flex items-center justify-center bg-fs-accent'>
              <Zap size={14} fill='currentColor' className='text-fs-bg' />
            </div>
            <span className='text-white font-bold text-lg tracking-tight'>FlowSync</span>
          </a>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-8'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='text-sm font-medium text-fs-text-dim hover:text-fs-text transition-colors duration-150'
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:flex items-center gap-3'>
            <a
              href='#'
              className='text-sm font-medium text-fs-text-dim hover:text-fs-text transition-colors duration-150'
            >
              Sign in
            </a>
            <a
              href='#'
              className='btn-primary'
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              Start free →
            </a>
          </div>

          {/* Hamburger */}
          <button
            className='md:hidden p-2 rounded-md text-fs-text-dim hover:text-fs-text transition-colors'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Toggle menu'
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className='md:hidden overflow-hidden border-t border-fs'
            >
              <div className='flex flex-col gap-4 py-4'>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className='text-sm text-fs-text-dim hover:text-fs-text transition-colors'
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a href='#' className='btn-primary w-full justify-center'>
                  Start free →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
