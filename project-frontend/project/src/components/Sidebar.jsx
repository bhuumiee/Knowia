import {
  LayoutDashboard,
  Upload,
  MessageSquareText,
  ListChecks,
  TrendingUp,
  FolderOpen,
  GraduationCap,
  Settings,
  LogOut,
  Flame,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'upload', label: 'Upload Materials', icon: Upload },
  { id: 'tutor', label: 'AI Tutor', icon: MessageSquareText },
  { id: 'quiz', label: 'Adaptive Quiz', icon: ListChecks },
  { id: 'progress', label: 'Learning Progress', icon: TrendingUp },
  { id: 'materials', label: 'Course Materials', icon: FolderOpen },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const { studentProfile, overallStats } = useApp();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-600 to-violet-600 flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-navy-900 tracking-tight">Knowvia</h1>
              <p className="text-[11px] text-gray-400 font-medium -mt-0.5">Personalized Tutoring</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-thin">
          <p className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-navy-500 to-violet-500 text-white shadow-md shadow-violet-200'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-navy-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="px-3 mt-6 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Account</p>
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-navy-700 transition-all">
                <Settings className="w-5 h-5 text-gray-400" />
                <span>Settings</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-navy-700 transition-all">
                <LogOut className="w-5 h-5 text-gray-400" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Streak card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-navy-50 to-violet-50 rounded-2xl p-4 border border-violet-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display text-navy-900">{studentProfile.streak} days</p>
                <p className="text-xs text-gray-400 font-medium">Learning streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* User profile */}
        <div className="px-4 pb-4 pt-1 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
              {studentProfile.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy-900 truncate">{studentProfile.name}</p>
              <p className="text-xs text-gray-400 truncate">{studentProfile.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
