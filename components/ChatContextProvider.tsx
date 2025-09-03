"use context";

import { createContext } from "react";
import { useConversation } from "./Chat";

const ChatContext = createContext(null);

export default function ChatContextProvider() {
  const { } = useConversation();
}
