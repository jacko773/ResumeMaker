interface HeaderProps {
  isNav: boolean;
}

const Header = ({ isNav = true }: HeaderProps) => {
  return (
    <header className={`sticky top-0 z-30 backdrop-blur ${isNav ? 'bg-white/70' : ' bg-black/50' }`}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-sky-500/90 shadow-sm" />
          <span className="font-semibold">Resume/Portfolio</span>
        </div>
        {isNav &&
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">Features</a>
            <a href="#templates" className="hover:text-gray-900">Templates</a>
            <a href="#pricing" className="hover:text-gray-900">Pricing</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
          </nav>
        }
        <div className="flex items-center gap-3">
          <a href="/login" className="hidden sm:inline text-sm text-gray-600 hover:text-gray-900">Sign in</a>
        </div>
      </div>
    </header>
  )
}

export default Header;