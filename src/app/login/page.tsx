"use client";
import { useState } from "react";
import { login, signup } from "./actions";
import { Button, Input, Spacer } from "@nextui-org/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    await login(formData);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    await signup(formData);
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <div className="flex flex-col w-full max-w-md p-6  rounded-lg ">
        <h3 className="mb-6 text-center">Welcome Back</h3>
        <form className="flex flex-col w-full gap-4" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <Input
            fullWidth
            size="lg"
            name="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Spacer y={1} />
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            fullWidth
            size="lg"
            name="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={1.5} />
          <Button type="submit" color="primary" size="lg" className="mb-2">
            Sign In
          </Button>
        </form>
        <form className="flex flex-col w-full gap-4" onSubmit={handleSignup}>
          <Button type="submit" color="primary" size="lg">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
