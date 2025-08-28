const Select = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v:string)=>void; options: string[] }) => {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <select className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200" value={value} onChange={(e)=>onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

export default Select;