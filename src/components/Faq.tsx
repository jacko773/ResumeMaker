const Faq = ({ q, a }: { q: string; a: string }) => {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="font-medium">{q}</div>
      <div className="text-sm text-gray-600 mt-2">{a}</div>
    </div>
  );
}

export default Faq;