import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'OpenAgent',
  description: 'Contact workflow frontend scaffold',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Header />
          <div className="site-main">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}