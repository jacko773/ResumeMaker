import { ArrowLeft, ArrowRight, Eye, LayoutTemplate, Save } from "lucide-react";

type FooterProps = {
  saving: boolean;
  nextSection: () => void;
  prevSection: () => void;
};

const Footer = ({ saving, nextSection, prevSection }: FooterProps) => {
  return (
    <>
      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-52 right-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        onClick={nextSection}
      >
        <Save className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="fixed bottom-38 right-6 text-blue-700  size-12 justify-center border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <Eye className="h-4 w-4" />
      </button>

      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-24 right-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
      >
        <LayoutTemplate className="h-4 w-4" />
      </button>

      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-10 right-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        onClick={nextSection}
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        data-tooltip-target="tooltip"
        className="fixed bottom-10 left-6 text-blue-700 size-12 justify-center  border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        onClick={prevSection}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
    </>
  );
};

export default Footer;
