// ─── app/layout.js ─────────────────────────────────────────────────────────

import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../lib/AppContext';
import { Toaster } from 'sonner';
import userData from '../lib/data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://portifyai.vercel.app';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${userData.name} — ${userData.role}`,
    template: `%s | ${userData.name}`,
  },
  description: `${userData.bio.slice(0, 155).trim()}…`,
  keywords: [
    userData.role,
    'developer',
    'portfolio',
    'full-stack',
    'web development',
    ...userData.skills.slice(0, 6).map((s) => s.name),
  ],
  authors: [{ name: userData.name, url: BASE_URL }],
  creator: userData.name,
  publisher: userData.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: `${userData.name} Portfolio`,
    title: `${userData.name} — ${userData.role}`,
    description: `${userData.bio.slice(0, 155).trim()}…`,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${userData.name} — ${userData.role} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@alexrivera',
    creator: '@alexrivera',
    title: `${userData.name} — ${userData.role}`,
    description: `${userData.bio.slice(0, 155).trim()}…`,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6c63ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <AppProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme="dark"
            toastOptions={{
              style: {
                background: 'var(--portfolio-card)',
                border: '1px solid var(--portfolio-border)',
                color: 'var(--portfolio-text)',
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  );
}
