"use client";

import Image from "next/image";
import { DragEventHandler, useRef, useState } from "react";

export default function FileDrop({ className }: { className?: string }) {
  const [isHovering, setIsHovering] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isHovering === false) {
      setIsHovering(true);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={className}>
      {
        file === null

          ? (
            <div
              className="w-full h-full border-2 border-dashed border-neutral-400 flex items-center justify-center"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragEnd={e => e.preventDefault()}
            >
              <p className="m-10 text-neutral-200">

                {
                  file === null
                    ? isHovering
                      ? "Drop..."
                      : <FileButton setFile={setFile} />
                    : "File"
                }
              </p>
            </div>
          )
          : (
            <div>
              <FileCard
                file={file}
                removeFile={() => {
                  setFile(null);
                  setIsHovering(false);
                }}
              />
            </div>
          )

      }
    </div>
  );
}

function FileButton({ setFile }: { setFile: (file: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);

  const onClick = () => {
    ref.current?.click();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setFile(files[0]);
  };

  return (
    <button onClick={onClick} className="p-2 rounded border-2 border-dotted border-stone-400 hover:cursor-pointer hover:text-stone-400 hover:border-stone-600">
      Upload File
      <input type="file" className="hidden" ref={ref} onChange={onChange} />
    </button>
  );
}

const trimString = (text: string) => {
  const MAXLEN = 15;

  if (text.length <= MAXLEN) {
    return text;
  }

  return text.substring(0, MAXLEN) + "...";
};
function FileCard({ file, removeFile }: { file: File; removeFile: () => void }) {
  const name = trimString(file.name);

  return (
    <div className="relative flex min-w-10 w-fit justify-center text-white gap-5 min-h-10 border rounded border-dashed border-stone-600 p-2 items-start py-5">
      <button
        onClick={removeFile}
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:cursor-pointer"
      >
        <Image src="/cross.svg" width={12} height={12} alt="Remove" className="invert" />
      </button>
      <Image src="/fileIcon.svg" width={20} height={20} alt="File Icon" className="invert" />
      <div>{name}</div>
    </div>
  );
}
