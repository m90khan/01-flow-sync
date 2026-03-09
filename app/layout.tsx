import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

/*
  next/font/google — self-hosts fonts at build time.
  `variable` mode emits a CSS custom property on <html>.
  globals.css @theme inline maps these to --font-sans / --font-mono
  which Tailwind v4 then uses for font-sans and font-mono utilities.
*/
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FlowSync — Automate Every Workflow',
  description:
    'The all-in-one workflow automation platform for high-performance teams. Connect, automate, and scale without limits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      /*
        Apply both font CSS variable classes to <html>.
        This makes --font-space-grotesk and --font-ibm-plex-mono
        available as CSS custom properties throughout the document,
        which globals.css @theme then picks up.
      */
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className='antialiased'>{children}</body>
    </html>
  );
}
