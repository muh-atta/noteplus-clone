"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import Loader from "./Loader";
const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];
const PROTECTED_ROUTE_AFTER_LOGIN = "/tasks";
interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isPublicRoute) return;

    if (status === "loading") {
      return;
    }

    if (status === "authenticated") {
      router.replace(PROTECTED_ROUTE_AFTER_LOGIN);
    }
  }, [status, router, isPublicRoute]);

  if (status === "loading" && isPublicRoute) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <Loader/>
      </div>
    );
  }

  return children;
}
