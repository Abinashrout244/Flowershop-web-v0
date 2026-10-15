import { useState } from "react";
import { inputClass } from "./authConfig";

export function PasswordField({ value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        required
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} pr-16`}
      />

      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-500 hover:text-stone-900"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
