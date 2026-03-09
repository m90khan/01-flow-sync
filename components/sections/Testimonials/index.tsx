'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const TESTIMONIALS = [
  {
    quote:
      'FlowSync replaced 3 internal tools and saved my team 40 hours a week. The AI routing alone is worth the price.',
    name: 'Sarah Chen',
    title: 'Head of Ops, Linear',
    avatar: 'SC',
    color: 'var(--fs-accent)',
  },
  {
    quote:
      'We migrated from Zapier to FlowSync in a weekend. Performance went from seconds to milliseconds per execution.',
    name: 'Marcus Williams',
    title: 'Staff Engineer, Stripe',
    avatar: 'MW',
    color: 'var(--fs-blue)',
  },
  {
    quote:
      "The observability dashboard alone sold us. Finally, I can see exactly what's happening in every workflow step.",
    name: 'Priya Patel',
    title: 'Platform Lead, Figma',
    avatar: 'PP',
    color: 'var(--fs-green)',
  },
  {
    quote:
      'SOC 2 compliance, SAML SSO, and audit logs out of the box. The only automation tool our security team approved.',
    name: "James O'Brien",
    title: 'CISO, Datadog',
    avatar: 'JO',
    color: 'var(--fs-accent)',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className='section-pad border-t border-fs bg-fs-1'>
      <div className='container-lg'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='mb-16'
        >
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-px w-8 bg-fs-accent' />
            <span className='font-mono-fs text-xs uppercase tracking-widest text-fs-accent'>
              Social Proof
            </span>
          </div>
          <h2
            className='text-4xl md:text-5xl font-bold text-white'
            style={{ letterSpacing: '-0.04em' }}
          >
            Teams that refused to
            <br />
            <span className='text-fs-accent'>compromise on speed.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className='card-fs p-6'
            >
              {/* Decorative quote mark */}
              <div
                className='text-5xl font-bold leading-none mb-4 select-none'
                style={{ color: `color-mix(in oklch, ${t.color} 30%, transparent)` }}
              >
                &ldquo;
              </div>

              <p className='text-sm leading-relaxed mb-6 text-fs-text-dim'>{t.quote}</p>

              <div className='flex items-center gap-3'>
                <div
                  className='w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold'
                  style={{
                    background: `color-mix(in oklch, ${t.color} 15%, transparent)`,
                    color: t.color,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className='text-sm font-bold text-white'>{t.name}</div>
                  <div className='text-xs text-fs-text-dimmer'>{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
