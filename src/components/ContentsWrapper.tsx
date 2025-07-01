'use client';

import { useEffect, useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { cn } from '@/lib/utils';
import { Roboto } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

const font = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
});

export const ContentsWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isShowContents, setIsShowContents] = useState(false);

  const [theme, setTheme] = useState('light');
  const [gaId, setGaId] = useState('G-98E40959T2');

  useEffect(() => {
    if (theme !== 'light') {
      setGaId('G-53ZX27CSWH');
    }
  }, [theme]);

  useEffect(() => {
    setTimeout(() => {
      setIsShowContents(true);
    }, 3000);
  }, []);
  return (
    <>
      <GoogleAnalytics gaId={gaId} />
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
        <ThemeSwitcher setTheme={setTheme} />
      </div>
    </>
  );
};
