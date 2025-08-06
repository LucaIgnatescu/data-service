"use client";

import { CheckIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Select } from "radix-ui";
import { useState } from "react";




function SelectionItem({ value, text }: { value: string; text: string }) {
  return (
    <Select.Item value={value} className="rounded p-1 flex flex-row w-full min-w-10  justify-between data-[state=checked]:bg-neutral-600 focus:outline-none focus:bg-neutral-800">
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className="self-center ml-10"><CheckIcon /></Select.ItemIndicator>
    </Select.Item>
  );
}

type SQLColumnType = "INT" | "TEXT" | "REAL" | "BLOB";

export function ColumnType() {
  const typeOptions = [
    {
      text: "integer",
      value: "INT",
    },
    {
      text: "text",
      value: "TEXT",
    },
    {
      text: "real",
      value: "REAL",
    },
    {
      text: "blob",
      value: "BLOB",
    },
  ];

  return (
    <Select.Root onValueChange={console.log}>
      <Select.Trigger
        className="border rounded border-neutral-400 flex flex-row justify-between align-middle text-stone-100 p-1 data-[placeholder]:text-neutral-500 focus:outline-none focus:shadow-none min-w-20 self-center"
      >
        <Select.Value placeholder="Column Type" />
        <Select.Icon className="align-middle self-center inline-block ml-2"><ChevronUpIcon /></Select.Icon>

      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" side="top" className="border-stone-800 border p-1 rounded ">
          <Select.Viewport>
            {typeOptions.map(typeOpt => <SelectionItem key={typeOpt.value} {...typeOpt} />)}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export function SelectionRow() {
  const [defaultVal, setDefaultVal] = useState<string>("");
  return (
    <div className="flex justify-between">
      <ColumnType />
      <input
        placeholder="default value"
        value={defaultVal}
        onChange={e => setDefaultVal(e.target.value)}
        className="border rounded p-1 min-w-5 border-stone-400"
      />

    </div>
  );
}

export function DBColumns() {
  type DBColumnInfo = {
    name: string;
    type: SQLColumnType;

  }
}
