"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white shadow-md">
      <div className="flex flex-col md:py-6 py-3 items-center md:flex-row md:justify-between md:items-center px-18">
        <div className="flex gap-2 sm:gap-4 text-sm flex-row sm:text-lg items-center text-gray-500 font-medium">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
        </div>


        <p className="text-lg text-gray-500 font-normal md:text-left">
          2025&copy; <span className="text-black">NotePlus.</span>
        </p>
      </div>
    </footer>
  );
}
