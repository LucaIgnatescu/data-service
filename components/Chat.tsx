"use client";

import { useActionState, useOptimistic, useState } from "react";
import { z } from "zod";
import { callAgent } from "./actions";

const textMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export type Role = "user" | "assistant";

export type TextMessage = z.infer<typeof textMessageSchema>;

export default function Chat() {
  const [error, setError] = useState(false);

  const [state, formAction, pending] = useActionState(async (prev: TextMessage[], formData: FormData) => {
    const message = formData.get("message") as string; // NOTE: If this is ever empty, something has gone wrong.
    addOptimistic(message);
    const conversation = [...prev, { role: "user", content: message }] as TextMessage[];
    try {
      const response = await callAgent(conversation);

      conversation.push({ role: "assistant", content: response });
      return conversation;
    }
    catch (err) {
      console.error(err);
      setError(true);
    }
    return prev;
  }, [] as TextMessage[]);

  const [conversation, addOptimistic] = useOptimistic(
    state,
    (curr: TextMessage[], msg: string) => {
      return [...curr, { role: "user", content: msg }] as TextMessage[];
    },
  );

  return (
    <div className="w-full h-full">
      <div>
        {conversation.map((message, i) => message.role === "user"
          ? <UserMessage text={message.content} key={i} />
          : <BotMessage text={message.content} key={i} />)}

      </div>
      {pending && <p>Spinner</p>}
      {error && <p className="text-red-500">Error</p>}
      <form
        action={formAction}
        className="rounded-full focus:outline-none border-neutral-500 border-2 flex flex-row justify-between h-10"
      >
        <input
          className="w-full h-full focus:outline-none p-3"
          placeholder="Ask the bot"
          name="message"
          required
        />
        <button type="submit" disabled={pending} className="rounded-full h-full aspect-square bg-white disabled:bg-black" />

      </form>
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
