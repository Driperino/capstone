import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Plant Tracking App",
  description: "Track your plants",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <main className="mx-auto max-w-5xl text-2xl flex gap-2">
            <NavMenu />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
