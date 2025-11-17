"use client";
import { useEffect, useState } from "react";
import Header from "./component/Header";
import { Jost } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "./component/Footer";
import Sidebar from "./component/Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { UIProvider } from "./context/ContextPage";
import AuthWrapper from "./component/AuthWrapper";
import { TaskProvider } from "./context/TaskContext";
import ToastProvider from "./toastProvider";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700"],
});

const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const showLayout = !PUBLIC_ROUTES.includes(pathname);

  const mainContentOffsetClass = isCollapsed ? "lg:ml-20" : "lg:ml-74";
  return (
    <html className={jost.variable} lang="en">
      <body className="font-jost bg-[#f1f5ff]">
        <SessionProvider>
          <UIProvider>
            <TaskProvider userId="455543f6-0546-4e53-b66a-67671fe20f9f">
              <AuthWrapper>
                <ToastProvider />
                <div className="flex min-h-screen">
                  {showLayout && (
                    <div
                      className={`
                    fixed inset-y-0 left-0 z-50 bg-white
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0
                  `}
                    >
                      <Sidebar
                        onClose={() => setIsSidebarOpen(false)}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                      />
                    </div>
                  )}
                  <div
                    className={`min-h-screen w-full flex flex-col transition-all duration-300 ease-in-out ${mainContentOffsetClass}`}
                  >
                    {showLayout && <Header />}

                    <main className="flex-1">{children}</main>

                    {showLayout && <Footer />}
                  </div>
                </div>
              </AuthWrapper>
            </TaskProvider>
          </UIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
