import React, { useState } from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const HeroHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { href: isHomePage ? "#features" : "/#features", label: "Características" },
    { href: isHomePage ? "#pricing" : "/#pricing", label: "Precios" },
    { href: isHomePage ? "#faq" : "/#faq", label: "Preguntas frecuentes" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center shadow-sm">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#F59E0B]">Killer</span> Control
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-sm font-semibold text-[#64748B] hover:text-[#4F46E5] transition-colors"
              >
                {link.label}
              </a>
            ))}
            {isHomePage ? (
              <Link to="/login" className="text-sm font-bold bg-[#4F46E5] text-white px-6 py-2.5 rounded-full hover:bg-[#4338CA] transition-all shadow-sm">
                Entrar
              </Link>
            ) : (
              <Link to="/" className="text-sm font-bold bg-[#64748B] text-white px-6 py-2.5 rounded-full hover:bg-[#475569] transition-all shadow-sm">
                Salir
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-[#64748B]">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] py-4 px-4 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={handleLinkClick}
              className="block text-base font-semibold text-[#64748B]"
            >
              {link.label}
            </a>
          ))}
          {isHomePage ? (
            <Link to="/login" onClick={handleLinkClick} className="block text-center bg-[#4F46E5] text-white px-5 py-3 rounded-xl font-bold">
              Entrar
            </Link>
          ) : (
            <Link to="/" onClick={handleLinkClick} className="block text-center bg-[#64748B] text-white px-5 py-3 rounded-xl font-bold">
              Salir
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default HeroHeader;
