'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
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
  pending: '#888',
} as const;

const STEP_CONTENT = [
  {
    message: "Your workflow just got triggered - let's see it in action.",
    paragraph: 'Initializing workflow…',
    bullets: ['Sub-second logs', 'Error replay'],
  },
  {
    message: 'Filtering high-value transactions…',
    paragraph: 'Applying filter rules to transactions over $500…',
    bullets: ['Filter validation', 'Logging high-value transactions'],
  },
  {
    message: 'AI is classifying risk in real-time…',
    paragraph: 'Machine learning models are assessing risk scores…',
    bullets: ['AI risk classification', 'Probability scoring'],
  },
  {
    message: 'High-risk detected → sending Slack alert…',
    paragraph: 'Alerting the team about suspicious activity…',
    bullets: ['Slack notification', 'Audit logging'],
  },
  {
    message: 'All steps completed - workflow executed successfully.',
    paragraph: 'Workflow finished successfully.',
    bullets: ['Complete logs', 'Final status check'],
  },
];
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
};
export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth step index
  const rawStepIndex = useTransform(scrollYProgress, (v) => v * FLOW_STEPS.length);
  const activeStepIndex = useSpring(rawStepIndex, { stiffness: 120, damping: 20 });

  const stepProgress = useSpring(
    useTransform(scrollYProgress, (v) => {
      const idx = Math.floor(v * FLOW_STEPS.length);
      return v * FLOW_STEPS.length - idx;
    }),
    { stiffness: 120, damping: 20 },
  );

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
      {/* Sticky section */}
      <motion.div
        className='min-h-screen w-full flex items-center'
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        <div className='section-pad border-0 w-full' style={{ borderColor: '#333' }}>
          <div className='container-lg'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
              {/* LEFT CONTENT */}
              <div className='self-start'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='h-px w-8 bg-orange-500' />
                  <span className='font-mono-fs text-xs uppercase tracking-widest text-orange-500'>
                    Live Execution
                  </span>
                </div>

                <motion.h2
                  className='text-4xl md:text-5xl font-bold text-white mb-6'
                  style={{ letterSpacing: '-0.04em' }}
                >
                  <AnimatePresence mode='wait'>
                    <motion.span
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className='block'
                    >
                      {STEP_CONTENT[currentStep]?.message}
                    </motion.span>
                  </AnimatePresence>
                </motion.h2>

                <AnimatePresence mode='wait'>
                  <motion.p
                    key={`para-${currentStep}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    className='text-base leading-relaxed mb-8 text-gray-400'
                  >
                    {STEP_CONTENT[currentStep]?.paragraph}
                  </motion.p>
                </AnimatePresence>

                <AnimatePresence mode='wait'>
                  <motion.div
                    key={`bullets-${currentStep}`}
                    variants={listVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className='space-y-3'
                  >
                    {STEP_CONTENT[currentStep]?.bullets.map((item) => (
                      <motion.div
                        key={item}
                        variants={itemVariants}
                        className='flex items-center gap-3'
                      >
                        <div className='w-1 h-1 rounded-full bg-orange-500' />
                        <span className='text-sm text-gray-400'>{item}</span>
                      </motion.div>
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
        </div>
      </motion.div>

      <div style={{ height: '400vh' }} />
    </div>
  );
}

function Card({ activeStepIndex }: { activeStepIndex: any }) {
  return (
    <motion.div
      className='rounded-2xl overflow-hidden border'
      style={{ background: '#111', borderColor: '#333', perspective: '1000px' }}
    >
      {/* Window chrome */}
      <div className='flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#1A1A1A]'>
        <div className='w-3 h-3 rounded-full bg-[#ff5f57]' />
        <div className='w-3 h-3 rounded-full bg-[#febc2e]' />
        <div className='w-3 h-3 rounded-full bg-[#28c840]' />
        <div className='flex-1 mx-4 h-5 rounded-md text-center text-xs flex items-center justify-center font-mono-fs bg-[#222] text-gray-500'>
          app.flowsync.io/flows/stripe-risk-check
        </div>
      </div>

      <div className='p-5'>
        <div className='flex items-center justify-between mb-5'>
          <div>
            <div className='text-sm font-bold text-white mb-0.5'>Stripe Risk Check</div>
            <div className='text-xs font-mono-fs text-gray-500'>Simulating live run…</div>
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

        <div className='mt-4 pt-4 border-t border-gray-800 flex items-center justify-between'>
          <span className='text-xs font-mono-fs text-gray-500'>
            Execution ID: exec_8f2Ka9
          </span>
          <button className='text-xs flex items-center gap-1 text-orange-500'>
            View full log <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// STATUS INDICATOR
function StepStatusIndicator({ activeStepIndex }: { activeStepIndex: any }) {
  const bg = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? 'rgba(255,107,0,0.15)' : 'rgba(0,255,136,0.15)',
  );
  const color = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? '#FF6B00' : '#00FF88',
  );
  const dotOpacity = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? 1 : 0,
  );
  const text = useTransform(activeStepIndex, (i: number) =>
    i < FLOW_STEPS.length - 1 ? 'Running' : 'Completed',
  );

  return (
    <motion.div
      className='text-xs font-mono-fs px-2.5 py-1 rounded-full flex items-center gap-1.5'
      style={{ background: bg, color }}
    >
      <motion.span
        className='w-1.5 h-1.5 rounded-full bg-current animate-pulse'
        style={{ opacity: dotOpacity }}
      />
      <motion.span>{text.get?.() ?? 'Running'}</motion.span>
    </motion.div>
  );
}

// STEP ITEM
function StepItem({
  step,
  index,
  activeIndex,
}: {
  step: (typeof FLOW_STEPS)[number];
  index: number;
  activeIndex: any;
}) {
  const status = useTransform(activeIndex, (v) => {
    const lastIndex = FLOW_STEPS.length - 1;

    // when animation finished
    if (v >= FLOW_STEPS.length) return 'done';

    if (index < Math.floor(v)) return 'done';
    if (index === Math.floor(v)) return 'running';

    return 'pending';
  });

  const iconColor = useTransform(
    status,
    (s) => STATUS_COLORS[s as keyof typeof STATUS_COLORS],
  );
  const lastIndex = FLOW_STEPS.length - 1;

  const displayText = useTransform(status, (s) => {
    if (s === 'done') return step.baseTime;
    if (s === 'running') return '…';
    return '-';
  });

  return (
    <motion.div className='flex items-center gap-3 px-3 py-2.5 rounded-lg'>
      <motion.div style={{ color: iconColor }}>
        {status.get() === 'done' || lastIndex === activeIndex ? (
          <CheckCircle2 size={14} />
        ) : status.get() === 'running' ? (
          <Clock size={14} />
        ) : (
          <AlertCircle size={14} />
        )}
      </motion.div>

      <span className='text-xs flex-1 text-gray-400'>{step.label}</span>

      <motion.span className='text-xs font-mono-fs text-gray-500'>
        {displayText.get()}
      </motion.span>
    </motion.div>
  );
}
