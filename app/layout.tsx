/* eslint-disable import/order */
import localFont from 'next/font/local';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

// eslint-disable-next-line import/no-unassigned-import
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/lib/store/providers';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Expert GG Admin',
};

const fog = localFont({
  src: [
    {
      path: '../public/fonts/FoglihtenNo06_076.otf',
    },
  ],
  variable: '--font-fog',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={cn('min-h-screen', fog.variable, montserrat.className)}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
