'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionTemplate,
} from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const FLOW_STEPS = [
  { label: 'Trigger: New Stripe charge', baseTime: '12ms' },
  { label: 'Filter: Amount > $500', baseTime: '2ms' },
  { label: 'AI: Classify risk level', baseTime: '340ms' },
  { label: 'Branch: High risk → Slack alert', baseTime: '120ms' },
  { label: 'Branch: Normal → Airtable log', baseTime: '20ms' },
] as const;

const STATUS_COLORS = {
  done: '#00FF88',
  running: '#FF6B00',
  pending: '#666',
} as const;

const STEP_CONTENT = [
  {
    message: "Your workflow just got triggered - let's see it in action.",
    paragraph: 'Initializing workflow.',
    bullets: ['Sub-second logs', 'Error replay'],
  },
  {
    message: 'Filtering high-value transaction.',
    paragraph: 'Applying filter rules to transactions over $500.',
    bullets: ['Filter validation', 'Logging high-value transactions'],
  },
  {
    message: 'AI is classifying risk in real-time.',
    paragraph: 'Machine learning models are assessing risk scores.',
    bullets: ['AI risk classification', 'Probability scoring'],
  },
  {
    message: 'High-risk detected → sending Slack alert.',
    paragraph: 'Alerting the team about suspicious activity…',
    bullets: ['Slack notification', 'Audit logging'],
  },
  {
    message: 'All steps completed - workflow executed successfully.',
    paragraph: 'Workflow finished successfully.',
    bullets: ['Complete logs', 'Final status check'],
  },
];

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawStepIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FLOW_STEPS.length - 0.001],
  );

  const activeStepIndex = useSpring(rawStepIndex, {
    stiffness: 90,
    damping: 30,
  });

  const [currentStep, setCurrentStep] = useState(0);

  useMotionValueEvent(activeStepIndex, 'change', (v) => {
    const idx = Math.min(Math.floor(v), FLOW_STEPS.length - 1);
    setCurrentStep(idx);
  });

  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '-6%']), {
    stiffness: 120,
    damping: 25,
  });

  return (
    <div ref={containerRef} className='relative w-full'>
      <motion.div
        className='min-h-screen w-full flex items-center'
        style={{ position: 'sticky', top: 0 }}
      >
        <div className='w-full px-8'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
            {/* LEFT CONTENT */}

            <div>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-px w-8 bg-orange-500' />
                <span className='text-xs uppercase tracking-widest text-orange-500 font-mono'>
                  Live Execution
                </span>
              </div>

              <motion.h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {STEP_CONTENT[currentStep].message}
                  </motion.span>
                </AnimatePresence>
              </motion.h2>

              <AnimatePresence mode='wait'>
                <motion.p
                  key={`para-${currentStep}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className='text-gray-400 mb-8'
                >
                  {STEP_CONTENT[currentStep].paragraph}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={`bullets-${currentStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='space-y-3'
                >
                  {STEP_CONTENT[currentStep].bullets.map((item) => (
                    <div key={item} className='flex items-center gap-3'>
                      <div className='w-1 h-1 bg-orange-500 rounded-full' />
                      <span className='text-sm text-gray-400'>{item}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT CARD */}

            <motion.div style={{ y: cardY }}>
              <Card activeStepIndex={activeStepIndex} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div style={{ height: `${FLOW_STEPS.length * 100}vh` }} />
    </div>
  );
}

function Card({ activeStepIndex }: { activeStepIndex: any }) {
  const progress = useTransform(activeStepIndex, [0, FLOW_STEPS.length], ['0%', '100%']);

  return (
    <motion.div
      className='rounded-2xl overflow-hidden border border-gray-800'
      style={{ background: '#111' }}
    >
      {/* window bar */}

      <div className='flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#1A1A1A]'>
        <div className='w-3 h-3 rounded-full bg-[#ff5f57]' />
        <div className='w-3 h-3 rounded-full bg-[#febc2e]' />
        <div className='w-3 h-3 rounded-full bg-[#28c840]' />

        <div className='flex-1 text-center text-xs text-gray-500 font-mono'>
          app.flowsync.io/flows/stripe-risk-check
        </div>
      </div>

      {/* progress bar */}

      <div className='h-[2px] bg-[#222]'>
        <motion.div className='h-full bg-orange-500' style={{ width: progress }} />
      </div>

      <div className='p-5'>
        <div className='flex items-center justify-between mb-5'>
          <div>
            <div className='text-sm font-bold text-white'>Stripe Risk Check</div>
            <div className='text-xs text-gray-500 font-mono'>Simulating live run…</div>
          </div>

          <StepStatusIndicator activeStepIndex={activeStepIndex} />
        </div>

        <div className='space-y-2'>
          {FLOW_STEPS.map((step, i) => (
            <StepItem
              key={step.label}
              step={step}
              index={i}
              activeIndex={activeStepIndex}
            />
          ))}
        </div>

        <div className='mt-4 pt-4 border-t border-gray-800 flex justify-between'>
          <span className='text-xs font-mono text-gray-500'>
            Execution ID: exec_8f2Ka9
          </span>

          <button className='text-xs text-orange-500 flex items-center gap-1'>
            View full log
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StepStatusIndicator({ activeStepIndex }: { activeStepIndex: any }) {
  const bg = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? 'rgba(255,107,0,0.15)' : 'rgba(0,255,136,0.15)',
  );

  const color = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? '#FF6B00' : '#00FF88',
  );

  const text = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? 'Running' : 'Completed',
  );
  const scale = useTransform(activeStepIndex, (v: number) =>
    v >= FLOW_STEPS.length - 1 ? 1.2 : 1,
  );
  const textStr = useMotionTemplate`${text}`;
  return (
    <motion.div
      className='text-xs font-mono px-2.5 py-1 rounded-full'
      style={{ background: bg, color, scale }}
      transition={{ duration: 0.5 }}
    >
      <motion.span>{textStr}</motion.span>
    </motion.div>
  );
}

function StepItem({
  step,
  index,
  activeIndex,
}: {
  step: (typeof FLOW_STEPS)[number];
  index: number;
  activeIndex: any;
}) {
  const status = useTransform(activeIndex, (v: number) => {
    const current = Math.floor(v);
    const progress = v - current;
    const last = FLOW_STEPS.length - 1;

    if (current > index) return 'done';
    if (current === index && index !== last) return 'running';

    // last step becomes done when reached
    if (index === last && v >= last) return 'done';

    return 'pending';
  });

  const color = useTransform(status, (s) => STATUS_COLORS[s]);

  const displayText = useTransform(status, (s) => {
    if (s === 'done') return step.baseTime;
    if (s === 'running') return '…';
    return '-';
  });

  const glow = useTransform(status, (s) =>
    s === 'running' ? '0 0 10px rgba(255,107,0,0.4)' : 'none',
  );
  const textStr = useMotionTemplate`${displayText}`;

  return (
    <motion.div
      className='flex items-center gap-3 px-3 py-2.5 rounded-lg'
      style={{ boxShadow: glow }}
    >
      <motion.div style={{ color }}>
        <StatusIcon status={status} />
      </motion.div>

      <span className='text-xs flex-1 text-gray-400'>{step.label}</span>

      <motion.span className='text-xs font-mono text-gray-500'>{textStr}</motion.span>
    </motion.div>
  );
}

function StatusIcon({ status }: { status: any }) {
  const done = useTransform(status, (s) => (s === 'done' ? 1 : 0));
  const running = useTransform(status, (s) => (s === 'running' ? 1 : 0));
  const pending = useTransform(status, (s) => (s === 'pending' ? 1 : 0));

  return (
    <div className='relative w-[14px] h-[14px]'>
      <motion.div style={{ opacity: done, position: 'absolute' }}>
        <CheckCircle2 size={14} />
      </motion.div>

      <motion.div style={{ opacity: running, position: 'absolute' }}>
        <Clock size={14} />
      </motion.div>

      <motion.div style={{ opacity: pending }}>
        <AlertCircle size={14} />
      </motion.div>
    </div>
  );
}
