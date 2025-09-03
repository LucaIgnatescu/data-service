"use client";

import { useRef, useEffect, forwardRef } from "react";

interface AutoExpandingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoExpandingTextarea = forwardRef<HTMLTextAreaElement, AutoExpandingTextareaProps>(
  ({ value, onChange, className, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const combinedRef = ref || textareaRef;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      onChange?.(e);
    };

    useEffect(() => {
      const textarea = typeof combinedRef === "function" ? null : combinedRef?.current;
      if (textarea && value !== undefined) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }, [value, combinedRef]);

    return (
      <textarea
        ref={combinedRef}
        {...(value !== undefined ? { value } : {})}
        onChange={handleChange}
        rows={3}
        className={`resize-none overflow-hidden ${className || ""}`}
        {...props}
      />
    );
  },
);

AutoExpandingTextarea.displayName = "AutoExpandingTextarea";

export default AutoExpandingTextarea;

