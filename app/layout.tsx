"use client";
import { useState } from "react";
import Header from "./component/Header";
import { Jost } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "./component/Footer";
import Sidebar from "./component/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { UIProvider } from "./context/ContextPage";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const HORIZONTAL_PADDING = "px-8";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const showLayout = pathname !== "/login";
  return (
    <html className={jost.variable} lang="en">
      <body className="font-jost bg-[#f1f5ff]">
        <SessionProvider>
          <UIProvider>
            <div className={showLayout ? "p-4 md:p-8" : ""}>
              <div
                className={`
                fixed inset-y-0 left-[-7] transform lg:pt-8 lg:pr-8 lg:pl-8  
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 ease-in-out 
                w-64 z-50     
                lg:translate-x-0
              `}
              >
                {showLayout && (
                  <Sidebar onClose={() => setIsSidebarOpen(false)} />
                )}
              </div>

              {isSidebarOpen && (
                <div
                  className="inset-0 z-40 md:hidden lg:hidden fixed"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}

              <div className="flex-1 flex flex-col lg:ml-72">
                <div className="sticky border-b border-gray-200 z-30">
                  <button
                    className="p-2 text-gray-700 lg:hidden absolute left-0 top-3 z-50"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </button>

                  {showLayout && (
                    <Header className={`w-full ${HORIZONTAL_PADDING} `} />
                  )}
                </div>
                <main className={showLayout ? "w-full py-6" : ""}>
                  {children}{" "}
                </main>
                {showLayout && <Footer className="w-full px-4" />}
              </div>
            </div>
          </UIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
