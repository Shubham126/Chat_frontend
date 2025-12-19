"use client";

import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="h-14 bg-[#111b21] border-b border-[#222d34] flex items-center justify-between px-6">
      <h1 className="font-semibold text-sm">Messenger</h1>
      <button onClick={logout} className="text-red-400 text-xs">
        Logout
      </button>
    </div>
  );
}
