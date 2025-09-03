"use client";

import { Label } from "radix-ui";
import { useFormStatus } from "react-dom";
import AutoExpandingTextarea from "./AutoExpandingTextarea";

function SubmitButton({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();

  return (
    <div className="p-10 py-5 flex justify-end gap-4 grow-0">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-stone-600 text-stone-200 rounded hover:border-stone-400 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded transition-colors"
      >
        {pending ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
}

interface ProjectFormProps {
  onCancel: () => void;
  action?: (formData: FormData) => void | Promise<void>;
}

export default function ProjectForm({ onCancel, action }: ProjectFormProps) {
  return (
    <>
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
            This description will be used by the AI model, so being specific helps.
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

      <SubmitButton onCancel={onCancel} />
    </>
  );
}
