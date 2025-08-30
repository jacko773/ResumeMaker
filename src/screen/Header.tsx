interface HeaderProps {
  isNav: boolean;
}

const Header = ({ isNav = true }: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur ${
        isNav ? "bg-white/70" : " bg-[#0a66c2]"
      }`}
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8">
            <img
              src="/logo.png"
              alt="craft Folio"
              className="h-full w-full h-8 w-8 "
            />
          </div>
          <div className="inline-flex flex-col items-start">
            <h1 className="text-4xl sm:text-2xl font-extrabold tracking-tight leading-none">
              <span className="text-slate-900 dark:text-white">Resu</span>
              <span className="ml-2 text-emerald-400">Mint</span>
            </h1>

            {/* <p className="mt-0 text-slate-500 dark:text-slate-400 text-base sm:text-xs text-white">
              Build resumes{" "}
              <span aria-hidden="true" className="mx-1">
                ·
              </span>{" "}
              Publish portfolios
            </p> */}
          </div>
        </div>
        {isNav && (
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">
              Features
            </a>
            <a href="#templates" className="hover:text-gray-900">
              Templates
            </a>
            <a href="#pricing" className="hover:text-gray-900">
              Pricing
            </a>
            <a href="#faq" className="hover:text-gray-900">
              FAQ
            </a>
          </nav>
        )}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className={`hidden sm:inline text-sm text-gray-600 hover:text-gray-900 ${
              isNav ? "" : "text-white"
            }`}
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
