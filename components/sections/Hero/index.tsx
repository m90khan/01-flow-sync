'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, Play, TrendingUp, Users, Zap } from 'lucide-react';

const METRICS = [
  { icon: TrendingUp, label: 'Faster execution', value: '10×', color: '#FF6B00' },
  { icon: Users, label: 'Teams using FlowSync', value: '50K+', color: '#00FF88' },
  { icon: Zap, label: 'Automations built', value: '2.4M', color: '#4488FF' },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className='relative min-h-screen flex items-center justify-center grid-bg'
      style={{ paddingTop: '100px', paddingBottom: '80px' }}
    >
      {/* Radial glow */}
      <div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[700px] h-[500px] rounded-full pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Decorative horizontal lines */}
      <div
        className='absolute inset-x-0 top-1/3 h-px'
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--fs-border), transparent)',
        }}
      />
      <div
        className='absolute inset-x-0 bottom-1/3 h-px'
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--fs-border), transparent)',
        }}
      />

      <div className='container-lg relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border font-mono-fs text-xs'
            style={{
              background: 'var(--fs-accent-dim)',
              borderColor: 'rgba(255,107,0,0.3)',
              color: 'var(--fs-accent)',
            }}
          >
            <span className='w-1.5 h-1.5 rounded-full bg-current animate-pulse' />
            New - Introducing FlowSync AI Agents
            <ArrowRight size={12} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className='text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6'
            style={{ letterSpacing: '-0.04em', lineHeight: '0.95' }}
          >
            Automate Every
            <br />
            <span style={{ color: 'var(--fs-accent)' }} className='glow-text'>
              Workflow.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed'
            style={{ color: 'var(--fs-text-dim)' }}
          >
            FlowSync connects your entire stack. 500+ integrations, AI-powered routing,
            and no-code builders so your team moves at machine speed.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-16'
          >
            <a href='#' className='btn-primary text-base'>
              Start free - no credit card
              <ArrowRight size={16} />
            </a>
            <a href='#' className='btn-ghost text-base flex items-center gap-2'>
              <Play size={14} />
              Watch 2-min demo
            </a>
          </motion.div>

          {/* Social proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className='font-mono-fs text-xs mb-12'
            style={{ color: 'var(--fs-text-dimmer)' }}
          >
            Trusted by engineering & ops teams at Stripe, Linear, Notion, Figma, and
            49,983 others
          </motion.p>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='grid grid-cols-3 gap-4 max-w-xl mx-auto'
          >
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className='card-fs p-4 text-center'
              >
                <metric.icon
                  size={18}
                  className='mx-auto mb-2'
                  style={{ color: metric.color }}
                />
                <div
                  className='text-2xl font-bold mb-0.5'
                  style={{ color: metric.color, letterSpacing: '-0.04em' }}
                >
                  {metric.value}
                </div>
                <div className='text-xs' style={{ color: 'var(--fs-text-dimmer)' }}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
