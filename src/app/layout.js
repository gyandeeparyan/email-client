import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from './redux-provider';

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

export const metadata = {
  title: "Mail",
  description: "Mail",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <ReduxProvider>
     <head><link rel="icon" href="/icons-256.png" sizes="any" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </ReduxProvider>
    </html>
  );
}
