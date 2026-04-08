import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, List, PlusCircle, User } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', icon: Home, label: t('nav.home') },
    { id: 'subscriptions', path: '/subscriptions', icon: List, label: t('nav.subscriptions') },
    { id: 'add', path: '/add', icon: PlusCircle, label: t('nav.add'), isCenter: true },
    { id: 'profile', path: '/profile', icon: User, label: t('nav.profile') }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg)]/90 backdrop-blur-lg border-t border-[var(--border)] pb-safe z-50">
      <div className="flex justify-around items-center h-20 px-6 max-w-lg mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative -top-5 w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/20 hover:scale-105 transition-transform"
              >
                <item.icon size={28} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-all duration-300 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'}`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[var(--primary)]/10' : ''}`}>
                <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
              </div>
              <span className={`text-[10px] uppercase tracking-[0.1em] font-black transition-all`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
