import { CheckCircle2 } from "lucide-react";

const PriceCard = ({ name, price, perks, cta, highlight }: { name: string; price: string; perks: string[]; cta: string; highlight?: boolean }) =>{
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${highlight ? 'bg-white ring-2 ring-sky-500/30' : 'bg-white'}`}>
      <div className="flex items-baseline justify-between">
        <div className="font-semibold">{name}</div>
        {highlight && <span className="text-xs rounded-full bg-sky-50 text-sky-700 px-2 py-0.5">Popular</span>}
      </div>
      <div className="mt-2 text-3xl font-extrabold">{price}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {perks.map((p, i) => (
          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-sky-600 mt-0.5"/> <span>{p}</span></li>
        ))}
      </ul>
      <a href="/login" className={`mt-5 inline-flex items-center justify-center w-full rounded-xl px-4 py-2 text-sm font-medium ${highlight ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-gray-900 text-white hover:bg-black'}`}>
        {cta}
      </a>
    </div>
  );
}

export default PriceCard;