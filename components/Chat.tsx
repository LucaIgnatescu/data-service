"use client";

import { useActionState, useOptimistic, useState } from "react";
import { MessageParam, TextBlock, TextBlockParam } from "@anthropic-ai/sdk/resources";
import { generateSchemaAction } from "./actions";
import { ColumnListSchema, SchemaGenReponse, SchemaGenSuccessResponse } from "./types";
import { Effect, pipe, Schema } from "effect";

export type Role = "user" | "assistant";

export const useConversation1 = () => {
  const [error, setError] = useState(false);
  const [state, formAction, pending] = useActionState(async (prev: MessageParam[], formData: FormData) => {
    const message = formData.get("message") as string; // NOTE: If this is ever empty, something has gone wrong.
    addOptimistic(message);
    const conversation = [...prev, { role: "user", content: message }] as MessageParam[];
    try {
      const response = await generateSchemaAction(conversation);
      if (response.success === false) {
        setError(true);
        return prev;
      }

      const schema = (response as SchemaGenSuccessResponse).schema;
      conversation.push({ content: JSON.stringify(Schema.encode(ColumnListSchema)(schema)), role: "assistant" });
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
  return { conversation, error, formAction, pending };
};

export type Message = {
  role: "user" | "assistant";
  content: Array<TextBlockParam>;
};

// manage conversation -> return conversation and data
// what goes in?
// how to map user data
// how to get response
// how to map response
// relevant state

export const useConversation = () => {
  const [error, setError] = useState(false);
  const [schema, setSchema] = useState<ColumnListSchema>([]);
  const stateFn = async (prev: Message[], formData: FormData): Promise<Message[]> => {
    const message = formData.get("message") as string;
    addOptimistic({ role: "user", content: [{ type: "text", text: message }] } as Message);

    return await Effect.runPromise(
      Effect.gen(function*() {
        const data = yield* Effect.tryPromise(() =>
          generateSchemaAction(conversation as Message[]),
        );

        if (!data.success) {
          yield* Effect.sync(() => setError(true));
          return yield* Effect.fail(new Error("operation Failed"));
        }

        return (data as SchemaGenSuccessResponse).schema as ColumnListSchema;
      }).pipe(
        Effect.match({
          onFailure: () => {
            setError(true);
            return prev;
          },
          onSuccess: (schema: ColumnListSchema) => {
            setSchema(schema);
            return [
              ...prev,
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

  return { error, optimisticState, formAction, isPending, schema };
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
