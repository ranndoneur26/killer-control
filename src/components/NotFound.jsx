import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

export default function NotFound() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 text-white font-sans overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-md w-full text-center relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-12">
                    <Logo className="h-12" />
                </div>

                {/* 404 Visual */}
                <div className="relative mb-8">
                    <div className="text-[150px] font-black text-white/5 leading-none select-none">404</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-indigo-400"
                        >
                            <Ghost size={80} strokeWidth={1.5} />
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-3xl font-black mb-4 tracking-tight">
                    {t('error.not_found_title') || 'Página no encontrada'}
                </h1>
                <p className="text-slate-400 text-lg mb-10 font-medium leading-relaxed">
                    {t('error.not_found_desc') || 'Parece que este rincón de Killer Control no existe o ha sido eliminado.'}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        {t('common.go_home') || 'Volver al Inicio'}
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition border border-white/10 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        {t('common.back') || 'Ir Atrás'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Simple motion mock since framer-motion might not stay active if imported incorrectly here
import { motion } from 'framer-motion';
