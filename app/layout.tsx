import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import LastReadBuble from "@/components/quran/LastReadBuble";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al Qur'an Online",
  description:
    "Baca Al-Qur'an online lengkap dengan terjemahan Bahasa Indonesia.",

  keywords: [
    "Al Quran",
    "Quran Online",
    "Terjemahan Indonesia",
    "Juz",
    "Surah",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <LastReadBuble />
        </ThemeProvider>
      </body>
    </html>
  );
}
