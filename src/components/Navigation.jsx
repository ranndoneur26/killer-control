import React from 'react';
import { Home, List, PlusCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', path: '/dashboard', icon: Home, label: 'Inicio' },
    { id: 'subscriptions', path: '/subscriptions', icon: List, label: 'Suscripciones' },
    { id: 'add', path: '/add', icon: PlusCircle, label: 'Añadir', isCenter: true },
    { id: 'profile', path: '/profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-[#E2E8F0] pb-safe z-50">
      <div className="flex justify-around items-center h-20 px-6 max-w-lg mx-auto relative">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative -top-5 w-14 h-14 bg-[#4F46E5] rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-100 hover:scale-105 transition-transform"
              >
                <item.icon size={28} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-all duration-300 ${isActive ? 'text-[#4F46E5]' : 'text-[#64748B] hover:text-[#4F46E5]'}`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[#EEF2FF]' : ''}`}>
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
