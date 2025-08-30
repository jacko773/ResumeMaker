import { ArrowRight, Eye, LayoutTemplate, Save } from "lucide-react";

type FooterProps = {
  prevSection: () => void;
  prevSectionName: string;
  saving: boolean;
  nextSection: () => void;
  nextSectionName: string;
};

const Footer = ({
  prevSection,
  prevSectionName,
  saving,
  nextSection,
  nextSectionName,
}: FooterProps) => {
  return (
    <>
      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-52 right-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-38 right-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <Save className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="fixed bottom-24 right-6 text-blue-700  size-12 justify-center border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <Eye className="h-4 w-4" />
      </button>

      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-10 right-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <LayoutTemplate className="h-4 w-4" />
      </button>
    </>
    // <div className="border-t bg-white sticky bottom-0">
    //     <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
    //         <div className="flex items-center">
    //             {prevSectionName && <button onClick={prevSection} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
    //                 <ArrowLeft className="h-4 w-4" /> Back: {prevSectionName}
    //             </button>}
    //         </div>

    //         <div className="flex items-center gap-3">
    //             <button onClick={() => window.open('#preview', '_self')} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
    //                 <Eye className="h-4 w-4" /> Preview
    //             </button>
    //             <button disabled={saving} onClick={nextSection} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 disabled:opacity-70">
    //                 Next: {nextSectionName} <ArrowRight className="h-4 w-4" />
    //             </button>
    //         </div>
    //     </div>
    // </div>
  );
};

export default Footer;
