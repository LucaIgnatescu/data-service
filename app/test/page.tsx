import { SelectionRow } from "@/components/client";

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="h-1/3 w-full flex flex-row justify-center">
        <div className="w-1/3 h-full">
          <SelectionRow />
        </div>
      </div>
    </div>
  );
}
