const TemplateCard = ({ name }: { name: string }) => {
  return (
    <div className="group rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-50 to-white border flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-11/12">
          <div className="col-span-2 space-y-2">
            <div className="h-3.5 w-11/12 rounded bg-gray-200"/>
            <div className="h-3.5 w-9/12 rounded bg-gray-200"/>
            <div className="h-3.5 w-10/12 rounded bg-gray-200"/>
            <div className="h-3.5 w-6/12 rounded bg-gray-200"/>
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-full rounded bg-gray-200"/>
            <div className="h-3.5 w-10/12 rounded bg-gray-200"/>
            <div className="h-3.5 w-8/12 rounded bg-gray-200"/>
            <div className="h-3.5 w-7/12 rounded bg-gray-200"/>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-medium">{name}</div>
        <button className="text-sm text-sky-600 hover:text-sky-700">Preview →</button>
      </div>
    </div>
  );
}

export default TemplateCard;