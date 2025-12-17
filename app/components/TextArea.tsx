"use client";
import { ChangeEvent, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

export default function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 4,
  ...props
}: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-lg leading-8 text-zinc-600 dark:text-zinc-800"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        {...props}
      />
    </div>
  );
}
