"use client";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`bg-white text-black font-bold rounded-xl ${className}`}
    >
      <div className="flex flex-col md:py-6 py-3 items-center md:flex-row md:justify-between md:items-center ">
        <div className="flex sm:flex-row gap-2 sm:gap-4 text-lg items-center text-gray-500 font-normal">
          <a href="#" className="hover:underline ">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
        </div>

        <div className="">
          <p className="text-lg text-gray-500 font-normal md:text-left">
             2025&copy; <span className=" text-black"> &nbsp;NotePlus.</span> 
          </p>
        </div>
      </div>
    </footer>
  );
}
