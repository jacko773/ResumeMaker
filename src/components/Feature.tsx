const Feature = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) =>{
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{desc}</div>
    </div>
  );
}

export default Feature;