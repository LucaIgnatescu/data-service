"use client";

import { useEffect } from "react";

export default function GlobalEventManager({ children, className }: { children?: React.ReactNode; className?: string }) {
  useEffect(() => {
    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("dragenter", preventDefault);
    document.addEventListener("dragover", preventDefault);
    document.addEventListener("drop", preventDefault);

    return () => {
      document.removeEventListener("dragenter", preventDefault);
      document.removeEventListener("dragover", preventDefault);
      document.removeEventListener("drop", preventDefault);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}
