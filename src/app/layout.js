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
  title: "moonshot-email-client-",
  description: "The app features an email list page. This page shows the list of emails sent to a user.Clicking on any email item in the list should split the screen into a master-slave (left-right) screen type where the master (left) shows the email list (with the selected email item) while the slave (right) shows the body of the email. The body of the email is not known ahead of time and should be loaded only when the email item is clicked"

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <ReduxProvider>
     <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </ReduxProvider>
    </html>
  );
}
