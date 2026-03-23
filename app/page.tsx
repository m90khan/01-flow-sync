import CTA from '@/components/sections/CTA';
import Dashboard from '@/components/sections/Dashboard';
import FAQ from '@/components/sections/FAQ';
import Features from '@/components/sections/Features';
import Hero from '@/components/sections/Hero';
import LogoBar from '@/components/sections/LogoBar';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';

export default function FlowSyncPage() {
  return (
    <main className='bg-fs-0 noise-wrap'>
      <Hero />
      <LogoBar />
      <Features />
      <Dashboard />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
