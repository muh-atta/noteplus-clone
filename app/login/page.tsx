"use client";
import { signIn } from "next-auth/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen lg:mr-72">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-4 md:p-4 border border-gray-100">
        <div className="flex items-center justify-center space-x-3 px-1 text-center">
          <div className="bg-gray-800 p-2.5 rounded-xl flex items-center justify-center">
            <PencilSquareIcon className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-normal  text-gray-800">NotePlus</span>
        </div>

        <div className="text-center mt-6 mb-4">
          <h2 className="text-3xl text-gray-800 mb-2">Sign In</h2>
          <p className="text-lg text-gray-500 font-light">
            Login to stay connected.
          </p>
        </div>

        <form>
          <div className="mb-5">
            <input
              type="name"
              placeholder="name"
              className="w-full border bg-[#f1f5ff] border-gray-300 rounded-lg py-2 px-4 text-gray-800 placeholder-gray-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full border bg-[#f1f5ff] border-gray-300 rounded-lg py-2 px-4 text-gray-800 placeholder-gray-500"
            />
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <div className="flex items-center">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer appearance-none w-4 h-4 rounded-full border border-gray-300 bg-[#f1f5ff] checked:bg-gray-900 checked:border-gray-900 cursor-pointer"
                />
                <svg
                  className="absolute  w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 8l3 3 5-5" />
                </svg>
                <span className="ml-2 text-base text-gray-600 select-none">
                  Remember Me
                </span>
              </label>
            </div>

            <a href="#" className="font-light text-lg text-gray-900">
              Forgot Password?
            </a>
          </div>
        </form>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-gray-900 text-white rounded-xl py-2 px-4 shadow-md transition-all duration-200 mx-auto block"
        >
          Sign In
        </button>
        <p className="text-center mt-4 text-md text-gray-500">
          Create an Account
          <a href="#" className="text-lg font-normal text-gray-900 ml-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
