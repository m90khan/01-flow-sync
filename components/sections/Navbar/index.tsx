'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className='fixed top-0 left-0 right-0 z-50'
      style={{
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #2a2a2a' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className='container-lg'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <a href='#' className='flex items-center gap-2 group'>
            <div
              className='w-7 h-7 rounded-md flex items-center justify-center'
              style={{ background: 'var(--fs-accent)' }}
            >
              <Zap size={14} fill='currentColor' style={{ color: '#080808' }} />
            </div>
            <span className='text-white font-bold text-lg tracking-tight'>FlowSync</span>
          </a>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-8'>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='text-sm font-medium transition-colors duration-150'
                style={{ color: 'var(--fs-text-dim)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fs-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fs-text-dim)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className='hidden md:flex items-center gap-3'>
            <a
              href='#'
              className='text-sm font-medium transition-colors duration-150'
              style={{ color: 'var(--fs-text-dim)' }}
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

          {/* Mobile hamburger */}
          <button
            className='md:hidden p-2 rounded-md'
            style={{ color: 'var(--fs-text-dim)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className='md:hidden py-4 border-t'
            style={{ borderColor: 'var(--fs-border)' }}
          >
            <div className='flex flex-col gap-4'>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className='text-sm'
                  style={{ color: 'var(--fs-text-dim)' }}
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
      </div>
    </motion.nav>
  );
}
