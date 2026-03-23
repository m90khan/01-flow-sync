'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'How does the free plan work?',
    a: 'The free Starter plan gives you 1,000 executions per month and 5 active flows - no credit card required. Upgrade when you need more.',
  },
  {
    q: 'Can I migrate from Zapier or Make?',
    a: 'Yes. FlowSync offers a one-click import tool for Zapier and Make automations. Our team also offers white-glove migration on Pro and Enterprise plans.',
  },
  {
    q: "What's your uptime SLA?",
    a: 'We guarantee 99.9% uptime on Pro and 99.99% on Enterprise, backed by a financial SLA. We publish our status page at status.flowsync.io.',
  },
  {
    q: 'Do you support on-premises deployment?',
    a: 'Enterprise customers can deploy FlowSync on their own infrastructure via Docker or Kubernetes. Contact our sales team for details.',
  },
  {
    q: 'What integrations do you support?',
    a: 'We offer 500+ native connectors plus a REST API, webhook triggers, and a custom connector SDK so you can build your own.',
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border-b border-fs last:border-b-0'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer'
      >
        <span
          className={`text-base font-medium transition-colors duration-150 ${open ? 'text-white' : 'text-fs-text-dim'}`}
        >
          {faq.q}
        </span>
        <div
          className='w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150'
          style={{
            background: open ? 'var(--fs-accent)' : 'var(--fs-bg-3)',
            color: open ? 'var(--fs-bg)' : 'var(--fs-text-dim)',
          }}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='overflow-hidden'
          >
            <p className='pb-5 text-sm leading-relaxed text-fs-text-dim'>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className='section-pad'>
      <div className='container-lg'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className='flex items-center gap-3 mb-4'>
              <div className='h-px w-8 bg-fs-accent' />
              <span className='font-mono-fs text-xs uppercase tracking-widest text-fs-accent'>
                FAQ
              </span>
            </div>
            <h2
              className='text-4xl font-bold text-white mb-4'
              style={{ letterSpacing: '-0.04em' }}
            >
              Answers to the
              <br />
              obvious questions.
            </h2>
            <p className='text-sm leading-relaxed text-fs-text-dim'>
              Still have questions? Reach our team at{' '}
              <a
                href='mailto:support@flowsync.io'
                className='text-fs-accent hover:underline'
              >
                support@flowsync.io
              </a>
            </p>
          </motion.div>

          {/* Right - accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
