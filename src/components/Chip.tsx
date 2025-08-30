import { useState } from "react";
import Field from "./Field";
const Chip = ({
  label,
  value,
  onChange,
  placeholder,
  editable,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  editable: boolean;
}) => {
  const [open, setOpen] = useState(!!value);
  return (
    <div>
      {!open && !value && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          {label} {editable && <span className="text-gray-400">+</span>}
        </button>
      )}
      {open && editable && (
        <>
          {/* <input
            className="w-[320px] max-w-full rounded-lg border px-3 py-2 text-sm"
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
          /> */}
          <Field
            label={label}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
          />
        </>
      )}
    </div>
  );
};

export default Chip;
