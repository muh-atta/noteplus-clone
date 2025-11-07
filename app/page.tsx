"use client";
import { useSession } from "next-auth/react";
import GoogleLoginButton from "./login/page";
import TasksClient from "./tasks/page";
import Loader from "./component/Loader";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;

  return session ? <TasksClient /> : <GoogleLoginButton />;
}
