"use client";

import { MessageParam } from "@anthropic-ai/sdk/resources";
import { useState } from "react";
import { z } from "zod";
import { ChatBox } from "./Chatbox";

const textMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export type Role = "user" | "assistant";

export type TextMessageSchema = z.infer<typeof textMessageSchema>;

export default function Chat() {
  const [messages, setMessages] = useState<TextMessageSchema[]>([
    {
      role: "user",
      content: "hello",
    },
  ]);

  const addMessage = (message: string, role: Role) => {
    setMessages(messages => [...messages, { role, content: message }]);
  };

  return (
    <div className="w-full h-full">
      <div>
        {messages.map((message, i) => message.role === "user"
          ? <UserMessage text={message.content} key={i} />
          : <BotMessage text={message.content} key={i} />)}

      </div>
      <ChatBox addMessage={addMessage} />
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end w-full my-5">
      <div className="bg-black px-8 py-4 rounded-3xl mx-3">
        {text}
      </div>

    </div>
  );
}

function BotMessage({ text }: { text: string }) {
  return (
    <div className="w-full px-10 my-5">
      {text}
    </div>
  );
}
