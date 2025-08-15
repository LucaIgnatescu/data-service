"use server";

import Anthropic from "@anthropic-ai/sdk";
import { TextMessage } from "./Chat";

const anthropic = new Anthropic();

export async function callAgent(conversation: TextMessage[]) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    messages: conversation,
  });
  console.log(response);
  return response.content;
}
