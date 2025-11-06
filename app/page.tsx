"use client";

import { useSession } from "next-auth/react";
import GoogleLoginButton from "./login/page";
import TasksClient from "./tasks/page";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-center justify-center">Loading...</p>;

  return (
    <main className="w-full mx-auto bg-blue-400">
      {session ? (
        <TasksClient />
      ) : (
        <>
          <GoogleLoginButton />
        </>
      )}
    </main>
  );
}
