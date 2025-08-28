import { useState } from "react";
const Chip = ({ label, value, onChange, placeholder, editable }: { label: string; value?: string; onChange?: (v:string)=>void; placeholder?: string; editable?: boolean }) =>{
  const [open, setOpen] = useState(!!value);
  return (
    <div>
      <button type="button" onClick={()=>setOpen(true)} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50">
        {label} {editable && <span className="text-gray-400">+</span>}
      </button>
      {open && editable && (
        <div className="mt-2">
          <input className="w-[320px] max-w-full rounded-lg border px-3 py-2 text-sm" placeholder={placeholder} value={value || ""} onChange={(e)=>onChange?.(e.target.value)} />
        </div>
      )}
    </div>
  );
}

export default Chip;
