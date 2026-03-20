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
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();

  const SECTIONS = [
    { id: 'personal',      label: t('profile.personal_data'),        icon: User,       color: 'text-[var(--primary)]',      bg: 'bg-[var(--primary)]/10' },
    { id: 'payment',       label: t('profile.payments'),         icon: CreditCard, color: 'text-[var(--primary)]',      bg: 'bg-[var(--primary)]/10' },
    { id: 'notifications', label: t('profile.notifications'), icon: Bell,       color: 'text-amber-400',      bg: 'bg-amber-950/20' },
    { id: 'security',      label: t('profile.privacy'),   icon: Shield,     color: 'text-red-400',      bg: 'bg-red-950/20' },
    { id: 'appearance',    label: t('profile.appearance'),               icon: Moon,       color: 'text-[var(--primary)]',      bg: 'bg-[var(--primary)]/10' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] pb-28">
      <HeroHeader />
      <div className="max-w-5xl mx-auto">

        {/* ─── HEADER ─── */}
        <header className="sticky top-0 z-10 bg-[var(--bg-surface)]/95 backdrop-blur-sm border-b border-[var(--border)] px-5 py-4 flex items-center gap-3">
          {activeSection ? (
            <>
              <button
                onClick={() => setActiveSection(null)}
                className="p-2 -ml-2 hover:bg-[var(--bg-elevated)] rounded-xl transition text-[var(--text-secondary)]"
              >
                <ArrowLeft size={22} />
              </button>
              <h1 className="text-lg font-black text-[var(--text-primary)]">
                {SECTIONS.find(s => s.id === activeSection)?.label}
              </h1>
            </>
          ) : (
            <h1 className="text-xl font-black tracking-tighter italic text-[var(--text-primary)]">{t('profile.myaccount')}<span className="text-[#F59E0B]">Killer</span></h1>
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
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-none md:rounded-3xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-4 p-5 border-b border-[var(--border)]">
              <button 
                onClick={() => setShowAvatarSelector(true)}
                className="relative group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--primary)]/20 to-[var(--primary)]/5 flex items-center justify-center overflow-hidden border-2 border-[var(--border)] group-hover:border-[var(--primary)]/30 transition-all">
                  {currentAvatar ? (
                    <img src={currentAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={28} className="text-[var(--primary)]" />
                  )}
                  {/* Overlay camera icon on hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={18} className="text-white" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 bg-[var(--primary)] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-[var(--bg-surface)]">{t('profile.pro_badge')}</span>
              </button>
              <div>
                <p className="font-black text-lg leading-tight text-[var(--text-primary)]">{t('profile.user_killer')} <span className="text-[#F59E0B]">Killer</span></p>
                <p className="text-sm text-[var(--text-secondary)] font-medium">{t('profile.user_email')}</p>
              </div>
            </div>

              {/* Section Links */}
              <nav className="divide-y divide-[var(--border)]">
                {SECTIONS.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-4 px-5 py-5 transition active:bg-[var(--bg-elevated)]
                      ${activeSection === section.id
                        ? 'bg-[var(--primary)]/10 border-r-4 border-[var(--primary)]'
                        : 'bg-transparent hover:bg-[var(--bg-elevated)]'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center ${section.color} border border-black/5`}>
                      <section.icon size={20} />
                    </div>
                    <span className="flex-1 text-left font-black text-sm text-[var(--text-primary)] tracking-tight">{section.label}</span>
                    <ChevronRight size={16} className={activeSection === section.id ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'} />
                  </button>
                ))}

                {/* Manual de Usuario */}
                <button
                  onClick={() => setShowManual(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-[var(--primary)] hover:bg-[var(--primary)]/10 transition active:bg-[var(--primary)]/10"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <span className="font-bold text-sm">{t('profile.manual')}</span>
                </button>

                {/* Logout */}
                <button
                  onClick={() => navigate('/login')}
                  className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-950/20 transition active:bg-red-950/20"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-950/20 flex items-center justify-center">
                    <LogOut size={18} />
                  </div>
                  <span className="font-bold text-sm">{t('profile.logout')}</span>
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
                <div className="hidden md:flex h-full items-center justify-center text-[var(--text-secondary)] flex-col gap-3">
                  <Shield size={56} className="opacity-10 text-[var(--primary)]" />
                  <p className="text-sm font-medium">{t('profile.select_section')}</p>
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
