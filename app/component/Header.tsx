"use client";
import { useSession, signOut } from "next-auth/react";
import { CheckSquare, LogOut } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">

        <h1 className="text-lg sm:text-2xl font-bold tracking-wide flex items-center gap-2">
          <CheckSquare className="w-6 h-6" />
          Todo App
        </h1>

        {session && (
          <button
            onClick={() => signOut()}
            className="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
