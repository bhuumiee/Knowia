import { Menu, Search, Bell, Sparkles } from 'lucide-react';

export default function Topbar({ onMenuClick, title, onNavigate }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold font-display text-navy-900">{title}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center bg-gray-50 rounded-xl px-3 py-2 w-48 lg:w-64 border border-gray-100 focus-within:border-violet-300 transition-colors">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search lessons..."
              className="ml-2 bg-transparent text-sm text-navy-900 placeholder-gray-400 outline-none flex-1"
            />
          </div>

          <button
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-white" />
          </button>

          <button
            onClick={() => onNavigate?.('tutor')}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-navy-600 to-violet-600 text-white text-sm font-semibold shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-200 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
