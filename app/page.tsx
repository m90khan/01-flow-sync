import CTA from '@/components/sections/CTA';
import Dashboard from '@/components/sections/Dashboard';
import FAQ from '@/components/sections/FAQ';
import Features from '@/components/sections/Features';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import LogoBar from '@/components/sections/LogoBar';
import Navbar from '@/components/sections/Navbar';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';

export default function FlowSyncPage() {
  return (
    <main className='bg-fs-0 noise-wrap'>
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <Dashboard />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
