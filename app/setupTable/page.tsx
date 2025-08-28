"use client";
import Chat from "@/components/Chat";
import { DBColumns } from "@/components/client";
import { ColumnListItemSchema } from "@/components/types";
import { useState } from "react";

export default function Page() {
  const [dbColumns, setDbColumns] = useState<ColumnListItemSchema[]>([]);

  return (
    <div className="h-screen w-full flex flex-row bg-stone-900">
      <div className="w-1/2 h-full bg-stone p-5 border-r border-neutral-500 flex-shrink-0">
        <h1 className="text-2xl my-10 text-stone-200">
          Create Table
        </h1>
        <p className="my-5">
          Specify the structure of the table you would like to create.
        </p>
        <h2>Columns</h2>
        <DBColumns dbColumns={dbColumns} setDbColumns={setDbColumns} />
      </div>
      <div className="w-full">
        <Chat />
      </div>
    </div>
  );
}
