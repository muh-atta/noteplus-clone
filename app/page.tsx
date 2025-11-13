"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "./component/Loader";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      localStorage.setItem("userId", session.user?.id || "");
      router.push("/tasks");
    } else {
      router.push("/login");
    }
  }, [session, status, router]);

  return <Loader />;
}
