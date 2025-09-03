"use client";

import { DragEventHandler, useState } from "react";

export default function FileDrop({ className }: { className?: string }) {
  const [isHovering, setIsHovering] = useState(false);
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

    const file = e.dataTransfer.files[0];
    console.log(file.name);
  };

  return (
    <div className={className}>
      <div
        className="w-full h-full border-2 border-dashed border-neutral-400 flex items-center justify-center"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={e => e.preventDefault()}
      >
        <p className="m-10 text-neutral-200">
          {isHovering ? "Drop..." : "not hovering"}
        </p>
      </div>
    </div>
  );
}
