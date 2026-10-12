import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Birthday Wonderland ✦ A Little World Just for You',
  description: 'A romantic interactive birthday surprise, made with love.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
