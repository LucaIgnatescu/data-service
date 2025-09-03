"use client";

import { useState, useActionState, useEffect } from "react";
import { Label } from "radix-ui";
import Image from "next/image";
import AutoExpandingTextarea from "../components/AutoExpandingTextarea";
import { createProject } from "./actions";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createProject, { success: false });

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.success]);

  return (
    <>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-20 grow-0 bg-black min-h-screen">
          Sidebar
        </div>
        <div className="grow flex flex-row justify-center items-center min-h-screen bg-stone-900">
          <div
            className="py-8 px-8  rounded-2xl flex flex-row gap-4  items-center border border-stone-700 hover:border-stone-300 hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-700">
              <Image src="/plusIcon.svg" alt="+" width={16} height={16} className="invert" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-neutral-100 text-lg inline-block">Create a new project</p>
              <p>Launch a new chat interface</p>
            </div>
          </div>
        </div>
      </div>
      {open
        && (
          <div className="flex min-h-screen z-10 inset-0 fixed min-w-screen transition-all">
            <div
              className="min-h-screen w-3/5 bg-black grow-0 opacity-30 animate-fade-in"
              onClick={() => setOpen(false)}
            >
            </div>

            <form
              action={formAction}
              className="bg-stone-900 animate-slide-in grow border-x border-stone-800 [&>*]:border-b [&>*]:border-stone-600 flex flex-col justify-between"
            >
              <div className="p-10 py-5 grow-0">
                <p>Create a new project.</p>
              </div>

              <div className="py-4 text-stone-400 p-10 overflow-auto grow-1">
                <div className="w-full my-5">
                  <Label.Root className="min-w-30 text-stone-200 text-lg my-1 block" htmlFor="name">
                    Name
                  </Label.Root>
                  <p className="my-1">Enter the name of your project.</p>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="border rounded-sm border-stone-600 grow focus:outline-none focus:border-stone-400 p-1 bg-neutral-900 text-stone-200 focus:shadow shadow-stone-500 w-full"
                  />
                </div>
                <div className="w-full my-5">
                  <Label.Root className="min-w-30 text-stone-200 text-lg my-1 block" htmlFor="description">
                    Description
                  </Label.Root>
                  <p className="my-1">
                    Outline the main goal of your project.
                    This description will be used by the AI model, so being descriptive helps.
                  </p>
                  <AutoExpandingTextarea
                    id="description"
                    name="description"
                    className="border rounded-sm border-stone-600 grow focus:outline-none focus:border-stone-400 p-1 bg-neutral-900 text-stone-200 focus:shadow shadow-stone-500 w-full"
                  />
                </div>
                <div className="w-full my-5">
                  <Label.Root className="min-w-30 text-stone-200 text-lg my-1 block" htmlFor="rules">
                    Rules
                  </Label.Root>
                  <p className="my-1">
                    Define any constraints or guidelines for your data and analysis.
                  </p>
                  <AutoExpandingTextarea
                    id="rules"
                    name="rules"
                    className="border rounded-sm border-stone-600 grow focus:outline-none focus:border-stone-400 p-1 bg-neutral-900 text-stone-200 focus:shadow shadow-stone-500 w-full"
                  />
                </div>
              </div>

              <div className="p-10 py-5 flex justify-end gap-4 grow-0">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-stone-600 text-stone-200 rounded hover:border-stone-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded transition-colors"
                >
                  {isPending ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        )}
    </>
  );
}
