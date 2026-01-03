import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/contexts/QuizContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Einbürgerungstest Vorbereitung - Deutschland",
  description: "Bereiten Sie sich auf den deutschen Einbürgerungstest vor. Üben Sie mit allen 460 offiziellen Fragen.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QuizProvider>{children}</QuizProvider>
        </ThemeProvider>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then((reg) => {
                      console.log('Service Worker registered', reg);
                    })
                    .catch((err) => {
                      console.log('Service Worker registration failed', err);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
