'use client';

import { motion } from 'framer-motion'; // ← correct import (was motion/react)

const LOGOS = [
  'Stripe',
  'Linear',
  'Notion',
  'Figma',
  'Vercel',
  'Shopify',
  'Atlassian',
  'Datadog',
  'Twilio',
  'Airtable',
];

export default function LogoBar() {
  // Duplicate twice → total 3× logos in the track
  const triplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      className='py-12 border-y overflow-hidden'
      style={{ borderColor: 'var(--fs-border)', background: 'var(--fs-bg-1)' }}
    >
      <div className='flex items-center gap-6 mb-3'>
        <div className='h-px flex-1' style={{ background: 'var(--fs-border)' }} />
        <span
          className='font-mono-fs text-xs uppercase tracking-widest shrink-0'
          style={{ color: 'var(--fs-text-dimmer)' }}
        >
          Integrates with your entire stack
        </span>
        <div className='h-px flex-1' style={{ background: 'var(--fs-border)' }} />
      </div>

      {/* Scrolling track */}
      <div className='relative flex overflow-hidden'>
        {/* Fade masks – optional but nice */}
        <div
          className='absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none'
          style={{ background: 'linear-gradient(90deg, var(--fs-bg-1), transparent)' }}
        />
        <div
          className='absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none'
          style={{ background: 'linear-gradient(-90deg, var(--fs-bg-1), transparent)' }}
        />

        <motion.div
          className='flex gap-16 items-center whitespace-nowrap'
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            duration: 35, // adjust speed (longer = slower)
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {triplicatedLogos.map((logo, i) => (
            <span
              key={i}
              className='text-base font-bold tracking-tight select-none'
              style={{ color: 'var(--fs-text-dimmer)' }}
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
