"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await api.post("/api/auth/register", { name, email, password });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
      <div className="w-80 bg-[#111b21] p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-lg font-semibold text-center">Register</h1>

        <input
          className="w-full bg-[#202c33] px-4 py-2 rounded-full text-sm outline-none placeholder-gray-400"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full bg-[#202c33] px-4 py-2 rounded-full text-sm outline-none placeholder-gray-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-[#202c33] px-4 py-2 rounded-full text-sm outline-none placeholder-gray-400"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-[#005c4b] py-2 rounded-full text-sm font-medium"
        >
          Register
        </button>

        <p
          onClick={() => router.push("/")}
          className="text-center text-xs text-gray-400 cursor-pointer hover:text-gray-200"
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
