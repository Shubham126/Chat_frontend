"use client";

import { ChatMessage, User } from "@/lib/types";
import { useState } from "react";
import { getSocket } from "@/lib/socket";

interface Props {
  user: User;
  messages: ChatMessage[];
  onSend: (msg: ChatMessage) => void;
}

export default function ChatWindow({ user, messages, onSend }: Props) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    const socket = getSocket();
    socket?.emit("message:send", {
      to: user.id,
      content: text,
    });

    onSend({ content: text, self: true });
    setText("");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b141a]">
      {/* Header */}
      <div className="h-14 px-4 flex items-center border-b border-[#222d34] bg-[#111b21]">
        <h2 className="font-semibold text-sm">{user.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.self ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 text-sm leading-relaxed
                ${
                  m.self
                    ? "bg-[#005c4b] text-white rounded-2xl rounded-br-md"
                    : "bg-[#202c33] text-gray-100 rounded-2xl rounded-bl-md"
                }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="h-16 px-4 flex items-center gap-3 bg-[#111b21] border-t border-[#222d34]">
        <input
          className="flex-1 bg-[#202c33] text-sm px-4 py-2 rounded-full outline-none placeholder-gray-400"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="bg-[#005c4b] px-4 py-2 rounded-full text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
