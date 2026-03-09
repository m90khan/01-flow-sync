import { Zap } from 'lucide-react';

const LINKS = {
  Product: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Legal'],
  Developers: ['Docs', 'API Reference', 'SDK', 'Status', 'Community'],
  Support: ['Help Center', 'Contact', 'Security', 'Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer className='border-t border-fs bg-fs-1'>
      <div className='container-lg py-16'>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-8 mb-16'>
          {/* Brand col */}
          <div className='col-span-2 md:col-span-1'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-7 h-7 rounded-md flex items-center justify-center bg-fs-accent'>
                <Zap size={14} fill='currentColor' className='text-fs-bg' />
              </div>
              <span className='text-white font-bold'>FlowSync</span>
            </div>
            <p className='text-xs leading-relaxed text-fs-text-dimmer'>
              Workflow automation for high-performance teams.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <div className='text-xs font-mono-fs uppercase tracking-widest mb-4 text-fs-text-dimmer'>
                {group}
              </div>
              <ul className='space-y-2.5'>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-sm text-fs-text-dim hover:text-fs-text transition-colors duration-150'
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='pt-8 border-t border-fs flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-xs font-mono-fs text-fs-text-dimmer'>
            © 2025 FlowSync, Inc. All rights reserved.
          </p>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-fs-green' />
            <span className='text-xs font-mono-fs text-fs-text-dimmer'>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
