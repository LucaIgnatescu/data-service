"use server";

import Anthropic from "@anthropic-ai/sdk";
import { MessageParam } from "@anthropic-ai/sdk/resources";
import { z } from "zod";
import { ColumnListItemSchema } from "./types";

const anthropic = new Anthropic();

export async function callAgent(conversation: MessageParam[], system: string = "") {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system,
    messages: conversation,
  });
  if (response === null) {
    return null;
  }
  console.log(response);
  return { content: response.content };
}

export async function generateSchema(conversation: MessageParam[]) {
  console.log(z.toJSONSchema(ColumnListItemSchema));
  const prompt = [...conversation, {
    role: "user", content: `
      Based on the conversation above, generate a postgres schema that most closely matches the above description.
      
      Your output must be a JSON array of column definitions following this exact specification:
      ${JSON.stringify(z.toJSONSchema(ColumnListItemSchema), null, 2)}
      
      VALID SQL TYPES: INT, TEXT, REAL, BOOLEAN, DATE, TIMESTAMP, VARCHAR, DECIMAL, SERIAL, BIGINT, SMALLINT, JSON, JSONB, UUID
      
      Example input: "Create a table for storing user information with id, username, age, bio, and balance"
      Example output:
      [
        { "name": "id", "type": "INT", "defaultValue": "", "index": 0 },
        { "name": "username", "type": "TEXT", "defaultValue": "", "index": 1 },
        { "name": "age", "type": "INT", "defaultValue": "", "index": 2 },
        { "name": "bio", "type": "TEXT", "defaultValue": "No bio provided", "index": 3 },
        { "name": "balance", "type": "REAL", "defaultValue": "0.0", "index": 4 }
      ]
      
      STRICT OUTPUT RULES:
      1. Output ONLY a JSON array starting with [ and ending with ]
      2. NO markdown formatting (no \`\`\`json blocks)
      3. NO explanatory text before or after the JSON
      4. Each column must have: name (string), type (string), defaultValue (string), index (number)
      5. Index values must be sequential starting from 0
      6. Default values must be strings (even for numbers, e.g., "0.0" not 0.0)
      7. If no default value, use empty string ""
      
      ERROR HANDLING:
      If the conversation above is unrelated to database schemas, output exactly:
      [{ "name": "error", "type": "TEXT", "defaultValue": "Invalid request: The purpose of this conversation is to create database schemas", "index": 0 }]
      
      Your response must start with [ and be valid JSON parseable by JSON.parse() without any preprocessing.
      ` }] as MessageParam[];

  return callAgent(prompt);
}
