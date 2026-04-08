import React, { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrentUser } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const HeroHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, locale } = useLanguage();
  const { isAuthenticated } = useCurrentUser();
  const isHomePage = pathname === '/';
  const authPaths = ['/login', '/signup', '/register', '/reset-password', '/check-email', '/verify-email'];
  const isAuthPage = authPaths.includes(pathname);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navLinks = [
    { href: isHomePage ? "#features" : "/#features", label: t('nav.features') },
    { href: isHomePage ? "#pricing" : "/#pricing", label: t('nav.pricing') },
    { href: isHomePage ? "#faq" : "/#faq", label: t('nav.faq') },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <RouterLink to="/" className="flex items-center gap-2">
            <Logo className="h-10" />
          </RouterLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Language Toggle */}
            <LanguageToggle />

            {!isAuthPage && (
              isAuthenticated ? (
                <RouterLink to="/dashboard" className="text-sm font-bold bg-amber-500 text-white px-6 py-2.5 rounded-full hover:bg-amber-400 transition-all shadow-sm">
                  {t('nav.dashboard')}
                </RouterLink>
              ) : (
                <RouterLink to="/login" className="text-sm font-bold bg-amber-500 text-white px-6 py-2.5 rounded-full hover:bg-amber-400 transition-all shadow-sm">
                  {t('nav.login')}
                </RouterLink>
              )
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-sm font-bold text-[var(--text-secondary)] hover:text-red-500 transition-colors"
              >
                {t('profile.logout')}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[var(--text-secondary)]">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border)] py-4 px-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="block text-base font-semibold text-[var(--text-secondary)]"
            >
              {link.label}
            </a>
          ))}
          {!isAuthPage && (
            isAuthenticated ? (
              <RouterLink to="/dashboard" onClick={handleLinkClick} className="block text-center bg-amber-500 hover:bg-amber-400 text-white px-5 py-3 rounded-xl font-bold">
                {t('nav.dashboard')}
              </RouterLink>
            ) : (
              <RouterLink to="/login" onClick={handleLinkClick} className="block text-center bg-amber-500 hover:bg-amber-400 text-white px-5 py-3 rounded-xl font-bold">
                {t('nav.login')}
              </RouterLink>
            )
          )}
          {isAuthenticated && (
            <button
              onClick={() => { handleLogout(); handleLinkClick(); }}
              className="w-full text-center py-3 text-red-500 font-bold border border-red-500/20 rounded-xl"
            >
              {t('profile.logout')}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default HeroHeader;
