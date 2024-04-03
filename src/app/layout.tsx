import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import './globals.css';
import Header from './_components/header';
import Footer from './_components/footer';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'Z-Energy',
    description: 'Mission 05 - Next.js',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <div className="flex flex-col h-screen w-full bg roboto ">
        <Header />
        <div className="flex-grow">
        {children}
        </div>
        <Footer />
        </div>
        </body>
    </html>
  );
}
