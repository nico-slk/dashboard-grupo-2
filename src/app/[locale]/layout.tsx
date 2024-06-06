import NavBar from '@/components/NavBar';
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import "../globals.css";
import Providers from './Providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <NavBar />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
