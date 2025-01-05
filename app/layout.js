import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar";

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
  title: "Campaign Factory",
  description: "Web3 apps that can create, manage and contribute a Campaign!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full px-20 py-10`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
