"use client";

import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

interface Props {
  users: User[];
  selectedUser?: User;
  onSelect: (user: User) => void;
}

export default function UserList({ users, selectedUser, onSelect }: Props) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="w-80 h-full bg-[#111b21] border-r border-[#222d34] flex flex-col">

      {/* 🔒 FIXED HEADER */}
      <div className="shrink-0 p-4 font-semibold text-lg border-b border-[#222d34]">
        Chats
      </div>

      {/* 🔄 SCROLLABLE USERS */}
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelect(user)}
            className={`px-4 py-3 cursor-pointer flex items-center justify-between
              ${
                selectedUser?.id === user.id
                  ? "bg-[#202c33]"
                  : "hover:bg-[#1f2c33]"
              }`}
          >
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            <span
              className={`h-3 w-3 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-500"
              }`}
            />
          </div>
        ))}
      </div>

      {/* 🔒 FIXED LOGOUT */}
      <div className="shrink-0 p-4 border-t border-[#222d34]">
        <button
          onClick={logout}
          className="text-red-400 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
