"use client";
import Header from "./component/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "./component/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body className="flex flex-col min-h-screen font-poppins bg-[#f1f5ff]">
        <SessionProvider>
          <Header />
          <main className="flex flex-1 flex-col items-center justify-center">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
