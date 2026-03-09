'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className='section-pad border-t border-fs relative overflow-hidden'
    >
      {/* Background glow */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.7 0.19 44 / 10%) 0%, transparent 70%)',
        }}
      />

      <div className='container-lg relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='max-w-2xl mx-auto text-center'
        >
          <div className='font-mono-fs text-xs uppercase tracking-widest mb-6 text-fs-accent'>
            Get started today
          </div>

          <h2
            className='text-5xl md:text-6xl font-bold text-white mb-6'
            style={{ letterSpacing: '-0.04em' }}
          >
            Stop duct-taping.
            <br />
            <span className='text-fs-accent'>Start flowing.</span>
          </h2>

          <p className='text-base mb-10 text-fs-text-dim'>
            Join 50,000+ teams automating everything from Slack alerts to AI-powered
            customer journeys — in under 10 minutes.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <a href='#' className='btn-primary text-base w-full sm:w-auto justify-center'>
              Start free — no credit card
              <ArrowRight size={16} />
            </a>
            <a href='#' className='btn-ghost text-base w-full sm:w-auto justify-center'>
              Schedule a demo
            </a>
          </div>

          <p className='mt-6 text-xs font-mono-fs text-fs-text-dimmer'>
            Free forever on Starter. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
