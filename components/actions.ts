"use server";

import { TextMessage } from "./Chat";

export async function callAgent(conversation: TextMessage[]) {
  console.log("running on server");
  await new Promise(res => setTimeout(res, 2000));

  return Promise.resolve("agent response");
}
