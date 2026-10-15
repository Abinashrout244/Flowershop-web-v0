import { inputClass } from "./authConfig";
export function Field({ label, ...inputProps }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-800">
        {label}
      </label>
      <input required className={inputClass} {...inputProps} />
    </div>
  );
}
