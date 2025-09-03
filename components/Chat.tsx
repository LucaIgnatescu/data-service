"use client";

import { useActionState, useOptimistic, useState } from "react";
import { MessageParam, TextBlockParam } from "@anthropic-ai/sdk/resources";
import { generateSchemaAction } from "./actions";
import { ColumnListSchema, SchemaGenSuccessResponse } from "./types";
import { Effect } from "effect";

export type Role = "user" | "assistant";

export type Message = {
  role: "user" | "assistant";
  content: Array<TextBlockParam>;
};

export const useConversation = (setSchema: (schema: ColumnListSchema) => void) => {
  const [error, setError] = useState(false);
  const stateFn = async (prev: Message[], formData: FormData): Promise<Message[]> => {
    const message = formData.get("message") as string;
    const userMessage = { role: "user", content: [{ type: "text", text: message }] } as Message;
    addOptimistic(userMessage);

    const conversation = [...prev, userMessage];
    return await Effect.runPromise(
      Effect.gen(function*() {
        const data = yield* Effect.tryPromise(() =>
          generateSchemaAction(conversation as Message[]),
        );

        if (!data.success) {
          yield* Effect.sync(() => setError(true));
          yield* Effect.fail(new Error("operation Failed"));
        }

        return (data as SchemaGenSuccessResponse).schema as ColumnListSchema;
      }).pipe(
        Effect.match({
          onFailure: () => {
            setError(true);
            return conversation;
          },
          onSuccess: (schema: ColumnListSchema) => {
            setSchema(schema);
            return [
              ...conversation,
              {
                role: "assistant",
                content: [{ type: "text", text: JSON.stringify(schema) }],
              },
            ] as Message[];
          },
        }),
      ),
    );
  };

  const [conversation, formAction, isPending] = useActionState(stateFn, [] as Message[]);
  const [optimisticState, addOptimistic] = useOptimistic(conversation,
    (prev: Message[], message: Message) => [...prev, message],
  );

  return { error, optimisticState, formAction, isPending };
};

export default function Chat(
  { error, conversation, formAction, isPending }: { error: boolean; conversation: Message[]; formAction: (payload: FormData) => void; isPending: boolean },
) {
  return (
    <div className="w-full h-full">
      <div>
        {(conversation as MessageParam[]).flatMap((message) => {
          if (typeof message.content === "string") {
            return message;
          }
          return message.content.map(submessage => ({ role: "assistant", content: submessage.text })); // NOTE: this is a workaround
        }).map((message, i) => message.role === "user"
          ? <UserMessage text={message.content as string} key={i} />
          : <BotMessage text={message.content as string} key={i} />)}

      </div>
      {isPending && <p>Spinner</p>}
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
        <button type="submit" disabled={isPending} className="rounded-full h-full aspect-square bg-white disabled:bg-black" />

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
