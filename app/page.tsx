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

    if (session?.user) {
      localStorage.setItem("userSession", JSON.stringify(session));
      if (session.user.id) {
        localStorage.setItem("userId", session.user.id);
      }
      router.push("/tasks");
    } else {
      router.push("/login");
    }
  }, [session, status, router]);

  return <Loader />;
}
