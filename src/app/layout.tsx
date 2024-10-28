import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";

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
  title: {
    template: "%s | Flow Shop",
    absolute: "Flow Shop",
  },
  description: "App description here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "toastFont",
              duration: 6000,
              style: {
                border: "2px solid #295f4e",
                borderRadius: "50px",
                textAlign: "center",
                whiteSpace: "nowrap",
              },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
