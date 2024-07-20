"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center mr-8 ml-8">
          <div className="bg-indigo-600 rounded-full p-6 mb-4">
            {/* Simple logo */}
            <svg
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c1.657 0 3 1.343 3 3v1c0 1.657-1.343 3-3 3s-3-1.343-3-3v-1c0-1.657 1.343-3 3-3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14v6m0 0c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM12 14a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Dr Jiang Xintongs Milk Tracker
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Track your breastfeeding and milk supplement with ease
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/login")}
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
            <button
              onClick={() => router.push("/login")}
              className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
