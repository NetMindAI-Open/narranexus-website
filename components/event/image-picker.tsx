"use client";

import { useEffect, useMemo, useRef } from "react";

interface ImagePickerProps {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  max?: number;
}

export function ImagePicker({
  files,
  onChange,
  disabled = false,
  max = 6,
}: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );

  // Revoke the object URLs when the set of previews changes or on unmount.
  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length) {
      onChange([...files, ...picked].slice(0, max));
    }
    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  }

  function removeAt(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {previews.map((src, i) => (
          <div
            key={src}
            className="relative w-20 h-20 border border-rule overflow-hidden bg-paper-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`已选图片 ${i + 1}`}
              className="w-full h-full object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="移除图片"
                className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-ink text-paper text-xs leading-none"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {!disabled && files.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 border border-dashed border-rule flex flex-col items-center justify-center gap-1 text-muted hover:border-ink hover:text-ink transition-colors"
          >
            <span className="text-xl leading-none">＋</span>
            <span className="font-mono text-[10px] uppercase tracking-wider">
              图片
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={handleSelect}
        disabled={disabled}
      />
    </div>
  );
}
