import { CheckCircle2 } from "lucide-react";

const Stepper = ({ steps, current }: { steps: string[]; current: number }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-1">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${i === current ? 'bg-sky-50 border-sky-200 text-sky-800' : 'bg-white text-gray-600'}`}>
            {i < current ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600"/>
            ) : (
              <span className={`h-2 w-2 rounded-full ${i===current?'bg-sky-600':'bg-gray-300'}`}></span>
            )}
            <span className="whitespace-nowrap">{s}</span>
          </div>
          {i !== steps.length - 1 && <div className="h-px w-6 bg-gray-200" />}
        </div>
      ))}
    </div>
  );
}

export default Stepper;