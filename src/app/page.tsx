"use client";

import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Spacer } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="flex flex-col items-center justify-center p-8 ">
        <CardHeader className="flex justify-center">
          <div className="bg-indigo-600 rounded-full p-6 mb-4">
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
        </CardHeader>
        <CardBody className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dr Jiang Xintongs Milk Tracker
          </h1>
          <div className="text-lg text-gray-600 mb-6">
            Track your breastfeeding and milk supplement with ease
          </div>
          <Spacer y={1} />
          <div className="flex space-x-4">
            <Button
              onClick={() => router.push("/signup")}
              color="primary"
              className="shadow-md mr-2"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => router.push("/login")}
              color="success"
              className="shadow-md"
            >
              Login
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
