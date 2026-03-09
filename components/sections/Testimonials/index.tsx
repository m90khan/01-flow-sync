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
    color: '#FF6B00',
  },
  {
    quote:
      'We migrated from Zapier to FlowSync in a weekend. Performance went from seconds to milliseconds per execution.',
    name: 'Marcus Williams',
    title: 'Staff Engineer, Stripe',
    avatar: 'MW',
    color: '#4488FF',
  },
  {
    quote:
      "The observability dashboard alone sold us. Finally, I can see exactly what's happening in every workflow step.",
    name: 'Priya Patel',
    title: 'Platform Lead, Figma',
    avatar: 'PP',
    color: '#00FF88',
  },
  {
    quote:
      'SOC 2 compliance, SAML SSO, and audit logs out of the box. FlowSync is the only automation tool our security team approved.',
    name: "James O'Brien",
    title: 'CISO, Datadog',
    avatar: 'JO',
    color: '#FF6B00',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className='section-pad border-0'
      style={{ borderColor: 'var(--fs-border)', background: 'var(--fs-bg-1)' }}
    >
      <div className='container-lg'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='mb-16'
        >
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-px w-8' style={{ background: 'var(--fs-accent)' }} />
            <span
              className='font-mono-fs text-xs uppercase tracking-widest'
              style={{ color: 'var(--fs-accent)' }}
            >
              Social Proof
            </span>
          </div>
          <h2
            className='text-4xl md:text-5xl font-bold text-white'
            style={{ letterSpacing: '-0.04em' }}
          >
            Teams that refused to
            <br />
            <span style={{ color: 'var(--fs-accent)' }}>compromise on speed.</span>
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className='card-fs p-6'
            >
              {/* Quote marks */}
              <div
                className='text-5xl font-bold leading-none mb-4 select-none'
                style={{ color: `${t.color}44` }}
              >
                "
              </div>

              <p
                className='text-sm leading-relaxed mb-6'
                style={{ color: 'var(--fs-text-dim)' }}
              >
                {t.quote}
              </p>

              <div className='flex items-center gap-3'>
                <div
                  className='w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold'
                  style={{ background: `${t.color}22`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className='text-sm font-bold text-white'>{t.name}</div>
                  <div className='text-xs' style={{ color: 'var(--fs-text-dimmer)' }}>
                    {t.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
