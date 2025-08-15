"use server";

import Anthropic from "@anthropic-ai/sdk";
import { MessageParam } from "@anthropic-ai/sdk/resources";

const anthropic = new Anthropic();

export async function callAgent(conversation: MessageParam[]) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: "Provide a summary of the conversation. Keep it brief. ",
    messages: conversation,
  });
  if (response === null) {
    return null;
  }
  console.log(response);
  return { content: response.content };
}
