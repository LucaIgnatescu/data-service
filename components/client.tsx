import { CheckIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Select } from "radix-ui";
import { ChangeEventHandler, useState } from "react";
import { SQLColumnType, DBColumnInfo } from "@/lib/db/init";

function SelectionItem({ value, text }: { value: string; text: string }) {
  return (
    <Select.Item value={value} className="rounded p-1 flex flex-row w-full min-w-30  justify-between data-[state=checked]:bg-neutral-600 focus:outline-none hover:bg-neutral-700">
      <Select.ItemText>{text}</Select.ItemText>
      <Select.ItemIndicator className="self-center ml-10"><CheckIcon /></Select.ItemIndicator>
    </Select.Item>
  );
}

export function ColumnType({ onValueChange, className }: { onValueChange: (arg0: string) => void; className: string }) {
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
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger
        className={className}
      >
        <Select.Value placeholder="Column Type" />
        <Select.Icon className="align-middle self-center inline-block ml-2"><ChevronUpIcon /></Select.Icon>

      </Select.Trigger>

      <Select.Portal>
        <Select.Content position="popper" side="bottom" className="border-neutral-800 border p-1 rounded bg-neutral-900">
          <Select.Viewport>
            {typeOptions.map(typeOpt => <SelectionItem key={typeOpt.value} {...typeOpt} />)}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

type DBColumnInputProps = {
  onValueChange: (arg0: string) => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
};

export function DBColumnInput({
  onValueChange,
  onDefaultValueChange,
  onColumnNameChange,
  columnName,
  defaultValue,
}: {
  onValueChange: (arg0: string) => void;
  onDefaultValueChange: ChangeEventHandler<HTMLInputElement>;
  onColumnNameChange: ChangeEventHandler<HTMLInputElement>;
  columnName: string;
  defaultValue: string;
}) {
  return (
    <div className="flex justify-between w-full h-10">
      <input
        placeholder="column name"
        value={columnName}
        onChange={onColumnNameChange}
        className="border rounded p-1 min-w-5 border-neutral-400 h-full focus:outline-none"
      />
      <ColumnType onValueChange={onValueChange} className="border rounded border-neutral-400 flex flex-row justify-between items-center text-neutral-100 p-1 data-[placeholder]:text-neutral-500 focus:outline-none focus:shadow-none min-w-20 self-center h-full text-center" />
      <input
        placeholder="default value"
        value={defaultValue}
        onChange={onDefaultValueChange}
        className="border rounded p-1 min-w-5 border-neutral-400 h-full focus:outline-none"
      />

    </div>
  );
}

export function DBColumns() {
  type ColumnListItem = Omit<DBColumnInfo, "type"> & {
    type: SQLColumnType | null;
    index: number;
  };

  const [counter, setCounter] = useState(0);

  const [dbColumns, setDbColumns] = useState<ColumnListItem[]>([]);

  const addColumn = () => {
    const newColumn = {
      name: "",
      type: null,
      index: counter,
      defaultValue: "",
    };
    setCounter(counter + 1);
    setDbColumns([...dbColumns, newColumn]);
  };

  const updateDBColumnFactory = (index: number) => {
    const onValueChange = (value: string) => {
      const newCol = { ...dbColumns[index], type: value as SQLColumnType };
      setDbColumns([...dbColumns.slice(0, index), newCol, ...dbColumns.slice(index + 1)]);
    };

    const onDefaultValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const newCol = { ...dbColumns[index], defaultValue: e.target.value };
      setDbColumns([...dbColumns.slice(0, index), newCol, ...dbColumns.slice(index + 1)]);
    };

    const onColumnNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const newCol = { ...dbColumns[index], name: e.target.value };
      setDbColumns([...dbColumns.slice(0, index), newCol, ...dbColumns.slice(index + 1)]);
    };

    return { onValueChange, onDefaultValueChange, onColumnNameChange };
  };

  return (
    <div className="space-y-2">
      {dbColumns.map((col, index) => {
        const handlers = updateDBColumnFactory(index);
        return (
          <DBColumnInput
            key={col.index}
            onValueChange={handlers.onValueChange}
            onDefaultValueChange={handlers.onDefaultValueChange}
            onColumnNameChange={handlers.onColumnNameChange}
            columnName={col.name}
            defaultValue={col.defaultValue}
          />
        );
      })}
      <button
        onClick={addColumn}
        className="border rounded p-2 text-white hover:bg-neutral-600"
      >
        Add Column
      </button>
    </div>
  );
}
