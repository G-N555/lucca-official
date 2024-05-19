import Image from 'next/image';
import { ThemeProvider } from '@/provider/ThemeProvider';
import { Metadata } from 'next';
import { ContentsWrapper } from '@/components/ContentsWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lucca Official',
  description: 'Lucca Official Website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            <ContentsWrapper>{children}</ContentsWrapper>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
