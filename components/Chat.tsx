"use client";

import { useActionState, useOptimistic, useState } from "react";
import { callAgent, generateSchema } from "./actions";
import { MessageParam } from "@anthropic-ai/sdk/resources";

export type Role = "user" | "assistant";

export default function Chat() {
  const [error, setError] = useState(false);

  const [state, formAction, pending] = useActionState(async (prev: MessageParam[], formData: FormData) => {
    const message = formData.get("message") as string; // NOTE: If this is ever empty, something has gone wrong.
    addOptimistic(message);
    const conversation = [...prev, { role: "user", content: message }] as MessageParam[];
    try {
      const response = await generateSchema(conversation);
      if (response === null) {
        setError(true);
        return prev;
      }
      conversation.push({ content: response.content, role: "assistant" });
      return conversation;
    }
    catch (err) {
      console.error(err);
      setError(true);
    }
    return prev;
  }, [] as MessageParam[]);

  const [conversation, addOptimistic] = useOptimistic(
    state,
    (curr: MessageParam[], msg: string) => {
      return [...curr, { role: "user", content: msg }] as MessageParam[];
    },
  );
  console.log(conversation);

  return (
    <div className="w-full h-full">
      <div>
        {conversation.flatMap((message) => {
          if (typeof message.content === "string") {
            return message;
          }
          return message.content.map(submessage => ({ role: "assistant", content: submessage.text })); // NOTE: this is a workaround
        }).map((message, i) => message.role === "user"
          ? <UserMessage text={message.content as string} key={i} />
          : <BotMessage text={message.content as string} key={i} />)}

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
