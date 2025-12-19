"use client";

import { useEffect, useState } from "react";
import { api, setAuthToken } from "@/lib/api";
import { connectSocket } from "@/lib/socket";
import { ChatMessage, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import UserList from "@/components/UserList";
import ChatWindow from "@/components/ChatWindow";
import TopBar from "@/components/TopBar";

export default function ChatPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");

    if (!token || !currentUser) {
      router.push("/");
      return;
    }

    setAuthToken(token);
    const socket = connectSocket(token);

    socket.on("message:receive", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    // 🔹 fetch users (simple approach)
    api.get("/api/auth/users").then((res) => {
      const me = JSON.parse(currentUser);
      setUsers(res.data.filter((u: User) => u.id !== me.id));
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  const selectUser = async (user: User) => {
    setSelectedUser(user);

    const res = await api.get(`/api/chat/${user.id}`);
    const currentUser = JSON.parse(localStorage.getItem("user")!);

    setMessages(
      res.data.map((m: ChatMessage) => ({
        ...m,
        self: m.sender === currentUser.id,
      }))
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1">
        <UserList
          users={users}
          selectedUser={selectedUser ?? undefined}
          onSelect={selectUser}
        />

        {selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={messages}
            onSend={(msg) => setMessages((prev) => [...prev, msg])}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
}
