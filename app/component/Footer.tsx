"use client";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white font-bold py-6 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center space-y-2 px-4">
        <h2 className="text-lg font-semibold tracking-wide">Todo App</h2>
        <p className="text-sm opacity-90">
          &copy; 2025 Todo App — All Rights Reserved.
        </p>

        <div className="flex items-center gap-4 text-sm opacity-90">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span className="opacity-70">•</span>
          <a href="#" className="hover:underline">Terms</a>
          <span className="opacity-70">•</span>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
