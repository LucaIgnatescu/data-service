import { useState } from "react";
import { Role } from "./Chat";

export function ChatBox({ addMessage }: { addMessage: (message: string, type: Role) => void }) {
  const [userMessage, setUserMessage] = useState("");

  return (

    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMessage(userMessage, "user");
        setUserMessage("");
      }}
      className="rounded-full focus:outline-none border-neutral-500 border-2 flex flex-row justify-between h-10"
    >
      <input
        className="w-full h-full focus:outline-none p-3"
        value={userMessage}
        onChange={e => setUserMessage(e.target.value)}
        placeholder="Ask the bot"
      />
      <button type="submit" disabled={userMessage === ""} className="rounded-full h-full aspect-square bg-white disabled:bg-black" />

    </form>
  );
}
