// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TasksClient from "../tasks/page"; // client component
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log("Session in dashboard:", session);
  if (!session) redirect("/login");

  return <TasksClient />;
}
