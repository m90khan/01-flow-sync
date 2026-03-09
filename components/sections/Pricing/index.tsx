'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Zap } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'Perfect for solo builders and small experiments.',
    highlight: false,
    cta: 'Start free',
    features: [
      '1,000 executions/month',
      '5 active flows',
      '50+ integrations',
      'Community support',
      '7-day history',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For teams shipping fast and automating everything.',
    highlight: true,
    cta: 'Start 14-day trial',
    features: [
      '100K executions/month',
      'Unlimited flows',
      '500+ integrations',
      'AI routing engine',
      'Priority support',
      '90-day history',
      'Custom webhooks',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'White-glove onboarding, SLAs, and unlimited scale.',
    highlight: false,
    cta: 'Talk to sales',
    features: [
      'Unlimited executions',
      'Private cloud deploy',
      'SSO / SAML',
      'SOC 2 audit logs',
      'Dedicated CSM',
      'Custom SLA',
      'On-prem option',
    ],
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id='pricing' className='section-pad' ref={ref}>
      <div className='container-lg'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border font-mono-fs text-xs text-fs-text-dim border-fs bg-fs-2'>
            Simple pricing
          </div>
          <h2
            className='text-4xl md:text-5xl font-bold text-white mb-4'
            style={{ letterSpacing: '-0.04em' }}
          >
            Start free. Scale infinitely.
          </h2>
          <p className='text-base max-w-lg mx-auto text-fs-text-dim'>
            No hidden fees, no surprises. Every plan includes a 14-day free trial of Pro
            features.
          </p>
        </motion.div>

        {/* Plans */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className='relative rounded-xl p-6 border flex flex-col'
              style={{
                background: plan.highlight ? 'var(--fs-bg-2)' : 'var(--fs-bg-1)',
                borderColor: plan.highlight
                  ? 'oklch(0.7 0.19 44 / 40%)'
                  : 'var(--fs-border)',
              }}
            >
              {plan.highlight && (
                <div
                  className='absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-mono-fs font-bold px-3 py-1 rounded-full'
                  style={{ background: 'var(--fs-accent)', color: 'var(--fs-bg)' }}
                >
                  <Zap size={10} fill='currentColor' />
                  Most popular
                </div>
              )}

              {/* Plan info */}
              <div className='mb-6'>
                <div className='text-xs font-mono-fs uppercase tracking-widest mb-2 text-fs-text-dim'>
                  {plan.name}
                </div>
                <div className='flex items-end gap-1 mb-2'>
                  <span
                    className='text-4xl font-bold text-white'
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {plan.price}
                  </span>
                  <span className='text-sm mb-1 text-fs-text-dim'>{plan.period}</span>
                </div>
                <p className='text-xs leading-relaxed text-fs-text-dim'>
                  {plan.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href='#'
                className={`mb-6 text-center justify-center ${plan.highlight ? 'btn-primary' : 'btn-ghost'}`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <div className='space-y-2.5 mt-auto'>
                {plan.features.map((feature) => (
                  <div key={feature} className='flex items-center gap-2.5'>
                    <Check size={13} className='text-fs-green shrink-0' />
                    <span className='text-sm text-fs-text-dim'>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
