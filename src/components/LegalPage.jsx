import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';


export default function LegalPage({ type = 'notice' }) {
    const { t } = useLanguage();
    const navigate = useNavigate();


    // Map types to i18n keys
    const typeMap = {
        notice: 'legal.notice',
        terms: 'legal.terms',
        cookies: 'legal.cookies',
        privacy: 'legal.privacy'
    };


    const legalKey = typeMap[type] || 'legal.notice';
    const legalData = t(legalKey, { returnObjects: true });


    return (
        <div className="min-h-screen bg-[var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-bold text-sm"
                    >
                        <ArrowLeft size={18} /> {t('common.back') || 'Volver'}
                    </button>
                    <Logo className="h-10" />
                </div>


                <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] p-8 md:p-12 shadow-xl overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-2xl flex items-center justify-center">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
                                {legalData.title}
                            </h1>
                            <p className="text-[var(--text-secondary)] font-medium">
                                {legalData.subtitle}
                            </p>
                        </div>
                    </div>


                    <div className="prose prose-invert max-w-none break-words">
                        <p className="text-lg text-[var(--text-primary)] mb-8 leading-relaxed font-medium">
                            {legalData.intro}
                        </p>


                        <div className="space-y-10">
                            {legalData.sections?.map((section, idx) => (
                                <section key={idx} className="space-y-3">
                                    <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                                        <span className="w-6 h-6 bg-[var(--bg)] border border-[var(--border)] rounded-lg flex items-center justify-center text-xs text-[var(--text-muted)]">
                                            {idx + 1}
                                        </span>
                                        {section.title}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                                        {section.body}
                                    </p>
                                </section>
                            ))}
                        </div>
                    </div>


                    <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-[var(--text-muted)] text-sm">
                        <p>© {new Date().getFullYear()} Killer Control. {t('legal.rights') || 'Todos los derechos reservados.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
