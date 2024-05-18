'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import luccaImage from '@/assets/lucca-image.png';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isShowContents, setIsShowContents] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setIsShowContents(true);
    }, 1000);
  }, []);
  return (
    <html lang="en">
      <body>
        <div className="w-screen h-screen flex justify-center relative">
          <Image
            src={'/lucca-image.png'}
            alt="Lucca"
            fill
            className="absolute w-screen h-screen opacity-20"
          />
          <ThemeProvider attribute="class" defaultTheme="system">
            <div
              className={cn('flex flex-col items-center max-w-lg w-full pt-8 z-10', font.variable)}
            >
              {/* <Navigation /> */}
              {isShowContents && (
                <div className="w-full bg-slate-200 dark:bg-gray-800 lime:bg-indigo-400 deepblue:bg-blue-950 flex-1 p-4 fade-in-animation">
                  {children}
                </div>
              )}
            </div>
            <object
              className="absolute opacity-40 z-0 w-screen h-80h"
              type="image/svg+xml"
              data="/lucca.svg"
            />
            <div className="absolute top-4 right-10">
              <ThemeSwitcher />
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
