import { CheckCircle2} from "lucide-react";

const Field = ({ label, value, onChange, placeholder, ok, className }: { label: string; value: string; onChange: (v:string)=>void; placeholder?: string; ok?: boolean; className?: string }) => {
  return (
    <label className={`block ${className||''}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600"/> : null}
      </div>
      <input
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Field;