"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen lg:mr-72">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-4 md:p-4 border border-gray-100">
        <div className="flex items-center justify-center space-x-3 px-1 text-center mt-8">
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

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        {/* <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border bg-gray-100 border-gray-300 rounded-lg py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border bg-gray-100 border-gray-300 rounded-lg py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <div className="flex justify-end text-sm">
            <Link href="#" className="text-gray-900 hover:underline font-light">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded-xl py-2 px-4 shadow-md transition duration-200 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form> */}

        {/* Divider */}
        {/* <div className="my-6 flex items-center text-gray-400">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}

        {/* Optional Google Sign-In */}
        <button
      onClick={handleSignIn}
      className="w-64 mx-auto block bg-gray-800 text-white rounded-xl mb-10 py-2 px-4 shadow-md transition duration-200 hover:bg-gray-600 flex justify-center items-center text-lg font-medium"
      disabled={loading}
    >
      {loading ? (
        <>
          <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
          Signing In...
        </>
      ) : (
        "Sign In with Google"
      )}
    </button>
      </div>
    </div>
  );
}
