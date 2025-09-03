"use server";

import Anthropic from "@anthropic-ai/sdk";
import { ContentBlock, MessageParam } from "@anthropic-ai/sdk/resources";
import { ColumnListItemSchema, ColumnListSchema, SchemaGenReponse, SchemaGenResponse } from "./types";
import { Effect, Option, Either, pipe, JSONSchema, Exit, Schema, Match } from "effect";
const anthropic = new Anthropic();

function callAgent(conversation: MessageParam[], system: string = "") {
  return Effect.tryPromise({
    try: async () => {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system,
        messages: conversation,
      });
      console.log("Raw Response:", response);
      if (response === null) {
        throw new Error("Error retrieving response");
      }
      return response.content;
    },
    catch: (err) => {
      console.error(err);
      return new Error("Error retrieving respnose");
    },
  });
}

const assemblePrompt = (schema: string) => `
      Based on the conversation above, generate a postgres schema that most closely matches the above description.
      
      Your output must be a JSON array of column definitions following this exact specification:
      ${schema}
      
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
      [{ "name": "error", "type": "TEXT", "defaultValue": "Invalid request", "index": 0 }]
      
      Your response must start with [ and be valid JSON parseable by JSON.parse() without any preprocessing.

      Prioritize the latest messages.
`;

function generateSchema(conversation: MessageParam[]): Effect.Effect<ColumnListSchema, Error> {
  const prompt = [...conversation, {
    role: "user",
    content: assemblePrompt(JSON.stringify(JSONSchema.make(ColumnListItemSchema), null, 2)),
  }] as MessageParam[];

  return pipe(
    prompt,
    callAgent,
    Effect.flatMap(validateAndParse),
    Effect.flatMap((data: string) => Effect.try(() => JSON.parse(data) as object)),
    Effect.andThen(Schema.decodeUnknown(ColumnListSchema)),
  );
}

function validateAndParse(response: ContentBlock[]): Option.Option<string> {
  if (response.length !== 1) {
    return Option.none();
  }

  const textBlocks = response.filter(block => block.type === "text").map(block => block.text);

  if (textBlocks.length !== response.length) {
    return Option.none();
  }

  return Option.some(textBlocks.join(""));
}

export async function generateSchemaAction(conversation: MessageParam[]): Promise<SchemaGenReponse> {
  console.log(conversation);
  const result = await Effect.runPromiseExit(generateSchema(conversation));
  return Exit.match(result, {
    onFailure: (err) => {
      console.error(err);
      return {
        success: false,
      } as SchemaGenReponse;
    },

    onSuccess: (data: ColumnListSchema) => ({
      success: true,
      schema: data,

    }),

  }) as SchemaGenReponse;
}
