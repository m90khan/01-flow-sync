'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Bot, GitBranch, Globe, Lock, Repeat2, BarChart3 } from 'lucide-react';

const FEATURES = [
  {
    icon: Bot,
    title: 'AI-Powered Routing',
    description:
      'Intelligent agents that decide, branch, and act based on real-time context - no rigid rule trees.',
    tag: 'New',
    color: '#FF6B00',
  },
  {
    icon: GitBranch,
    title: 'Visual Flow Builder',
    description:
      'Drag-and-drop canvas with 200+ pre-built nodes. Build complex logic in minutes, not weeks.',
    tag: null,
    color: '#4488FF',
  },
  {
    icon: Globe,
    title: '500+ Integrations',
    description:
      'Every SaaS tool your team uses, connected out of the box. Plus a headless API for custom builds.',
    tag: null,
    color: '#00FF88',
  },
  {
    icon: Repeat2,
    title: 'Real-Time Triggers',
    description:
      'Webhooks, schedules, polling, and event streams - react to anything, instantly.',
    tag: null,
    color: '#FF6B00',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II, GDPR, SSO/SAML, role-based access, and audit logs. Security that scales.',
    tag: 'SOC 2',
    color: '#4488FF',
  },
  {
    icon: BarChart3,
    title: 'Observability Suite',
    description:
      'Full execution history, error replays, latency graphs, and real-time monitoring dashboards.',
    tag: null,
    color: '#00FF88',
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id='features' className='section-pad' ref={ref}>
      <div className='container-lg'>
        {/* Section header */}
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
              Capabilities
            </span>
          </div>
          <h2
            className='text-4xl md:text-6xl font-bold text-white max-w-2xl'
            style={{ letterSpacing: '-0.04em' }}
          >
            Built for teams that
            <br />
            <span style={{ color: 'var(--fs-accent)' }}>refuse to slow down.</span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='card-fs p-6 group hover:border-opacity-100 transition-all duration-300'
                style={
                  {
                    '--hover-color': feature.color,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${feature.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fs-border)';
                }}
              >
                {/* Icon */}
                <div
                  className='w-10 h-10 rounded-lg flex items-center justify-center mb-4'
                  style={{
                    background: `${feature.color}18`,
                    border: `1px solid ${feature.color}33`,
                  }}
                >
                  <Icon size={18} style={{ color: feature.color }} />
                </div>

                {/* Title + tag */}
                <div className='flex items-center gap-2 mb-2'>
                  <h3 className='text-base font-bold text-white'>{feature.title}</h3>
                  {feature.tag && (
                    <span
                      className='text-[10px] font-mono-fs px-2 py-0.5 rounded-full'
                      style={{
                        background: `${feature.color}22`,
                        color: feature.color,
                      }}
                    >
                      {feature.tag}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p
                  className='text-sm leading-relaxed'
                  style={{ color: 'var(--fs-text-dim)' }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
