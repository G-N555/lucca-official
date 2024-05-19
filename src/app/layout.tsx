'use client';

import Image from 'next/image';
import { Roboto } from 'next/font/google';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import './globals.css';
import { Metadata } from 'next';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});

export const metaData: Metadata = {
  title: 'Lucca Official',
  description: 'Lucca Official Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isShowContents, setIsShowContents] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShowContents(true);
    }, 3000);
  }, []);
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen flex justify-center relative">
          <Image
            src={'/lucca-image.png'}
            alt="Lucca"
            className="fixed h-auto w-auto opacity-20 top-40 md:top-20 lg:top-0"
            sizes="100vw"
            width={1400}
            height={800}
            style={{ width: '100%', height: 'auto' }}
          />
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className={cn('flex flex-col items-center max-w-lg w-full z-10', font.variable)}>
              {/* <Navigation /> */}
              {isShowContents && (
                <div className="w-full bg-slate-200 dark:bg-gray-800 lime:bg-indigo-400 deepblue:bg-blue-950 flex-1 p-4 fade-in-animation">
                  {children}
                </div>
              )}
            </div>
            <object
              className="fixed opacity-40 z-0 w-screen h-80h"
              type="image/svg+xml"
              data="/lucca.svg"
            />
            <div className="fixed top-4 right-3 md:right-5 z-10">
              <ThemeSwitcher />
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
