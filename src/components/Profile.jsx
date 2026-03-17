import React, { useState } from 'react';
import { 
  User, CreditCard, Bell, Shield, Moon, LogOut, 
  ChevronRight, ArrowLeft, BookOpen, Camera 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import HeroHeader from './HeroHeader';
import PaymentSettings from './settings/PaymentSettings';
import NotificationSettings from './settings/NotificationSettings';
import SecuritySettings from './settings/SecuritySettings';
import AppearanceSettings from './settings/AppearanceSettings';
import UserManualModal from './UserManualModal';
import AvatarSelectorModal from './AvatarSelectorModal';
import PersonalDataSettings from './settings/PersonalDataSettings';

const SECTIONS = [
  { id: 'personal',      label: 'Datos Personales',        icon: User,       color: 'text-[#4F46E5]',      bg: 'bg-[#EEF2FF]' },
  { id: 'payment',       label: 'Métodos de Pago',         icon: CreditCard, color: 'text-[#4F46E5]',      bg: 'bg-[#EEF2FF]' },
  { id: 'notifications', label: 'Notificaciones y Alertas', icon: Bell,       color: 'text-[#F59E0B]',      bg: 'bg-[#FFFBEB]' },
  { id: 'security',      label: 'Privacidad y Seguridad',   icon: Shield,     color: 'text-[#EF4444]',      bg: 'bg-[#FEF2F2]' },
  { id: 'appearance',    label: 'Apariencia',               icon: Moon,       color: 'text-[#4F46E5]',      bg: 'bg-[#EEF2FF]' },
];

const CONTENT_MAP = {
  personal:      <PersonalDataSettings />,
  payment:       <PaymentSettings />,
  notifications: <NotificationSettings />,
  security:      <SecuritySettings />,
  appearance:    <AppearanceSettings />,
};

export default function Profile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState('/avatars/ghostface.png');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-28">
      <HeroHeader />
      <div className="max-w-5xl mx-auto">

        {/* ─── HEADER ─── */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] px-5 py-4 flex items-center gap-3">
          {activeSection ? (
            <>
              <button
                onClick={() => setActiveSection(null)}
                className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-xl transition text-[#64748B]"
              >
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-lg font-black text-[#0F172A]">
                {SECTIONS.find(s => s.id === activeSection)?.label}
              </h1>
            </>
          ) : (
            <h1 className="text-xl font-black tracking-tighter italic text-[#0F172A]">micuenta<span className="text-[#F59E0B]">Killer</span></h1>
          )}
        </header>

        {/* ─── MAIN ─── */}
        {/* Mobile: menu OR content. Desktop: sidebar + content side by side */}
        <div className="md:flex md:gap-6 md:p-6">

          {/* ─── SIDEBAR / MENU LIST ─── */}
          {/* On mobile: visible ONLY when no section is active */}
          {/* On md+: always visible as sidebar */}
          <aside className={`
            w-full md:w-72 md:shrink-0 md:block
            ${activeSection ? 'hidden md:block' : 'block'}
          `}>

            {/* User Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-none md:rounded-3xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-4 p-5 border-b border-[#E2E8F0]">
              <button 
                onClick={() => setShowAvatarSelector(true)}
                className="relative group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4F46E5]/20 to-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-50 group-hover:border-[#4F46E5]/30 transition-all">
                  {currentAvatar ? (
                    <img src={currentAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={28} className="text-[#4F46E5]" />
                  )}
                  {/* Overlay camera icon on hover */}
                  <div className="absolute inset-0 bg-[#0F172A]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={18} className="text-white" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 bg-[#4F46E5] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">PRO</span>
              </button>
              <div>
                <p className="font-black text-lg leading-tight text-[#0F172A]">Usuario <span className="text-[#F59E0B]">Killer</span></p>
                <p className="text-sm text-[#64748B] font-medium">usuario@killercontrol.app</p>
              </div>
            </div>

              {/* Section Links */}
              <nav className="divide-y divide-[#E2E8F0]">
                {SECTIONS.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-4 px-5 py-5 transition active:bg-[#F8FAFC]
                      ${activeSection === section.id
                        ? 'bg-[#EEF2FF] border-r-4 border-[#4F46E5]'
                        : 'bg-transparent hover:bg-[#F8FAFC]'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center ${section.color} border border-black/5`}>
                      <section.icon size={20} />
                    </div>
                    <span className="flex-1 text-left font-black text-sm text-[#0F172A] tracking-tight">{section.label}</span>
                    <ChevronRight size={16} className={activeSection === section.id ? 'text-[#4F46E5]' : 'text-[#CBD5E1]'} />
                  </button>
                ))}

                {/* Manual de Usuario */}
                <button
                  onClick={() => setShowManual(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-[#4F46E5] hover:bg-[#EEF2FF] transition active:bg-[#EEF2FF]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <span className="font-bold text-sm">Manual de Usuario</span>
                </button>

                {/* Logout */}
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center gap-4 px-5 py-4 text-[#EF4444] hover:bg-[#FEF2F2] transition active:bg-[#FEE2E2]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
                    <LogOut size={18} />
                  </div>
                  <span className="font-bold text-sm">Cerrar Sesión</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* ─── CONTENT PANEL ─── */}
          {/* On mobile: visible ONLY when a section is active */}
          {/* On md+: always alongside sidebar */}
          <main className={`
            flex-1 min-w-0 px-5 py-5 md:px-0 md:py-0
            ${activeSection ? 'block' : 'hidden md:block'}
          `}>
            {activeSection
              ? CONTENT_MAP[activeSection]
              : (
                <div className="hidden md:flex h-full items-center justify-center text-[#64748B] flex-col gap-3">
                  <Shield size={56} className="opacity-10 text-[#4F46E5]" />
                  <p className="text-sm font-medium">Selecciona una sección para comenzar</p>
                </div>
              )
            }
          </main>

        </div>
      </div>

      <Navigation />
      
      <UserManualModal open={showManual} onClose={() => setShowManual(false)} />

      <AvatarSelectorModal 
        open={showAvatarSelector} 
        currentAvatar={currentAvatar}
        onSelect={setCurrentAvatar}
        onClose={() => setShowAvatarSelector(false)} 
      />
    </div>
  );
}
