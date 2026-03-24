import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { TrendingDown, Zap } from 'lucide-react';

export default function MockupChart() {
    const { t } = useLanguage();

    return (
        <div className="w-full h-full flex flex-col justify-between p-2 pt-4 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-[#0F172A] w-full" />
                ))}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Chart Area */}
                <div className="flex-1 relative mb-4">
                    <svg viewBox="0 0 400 150" className="w-full h-full preserve-3d">
                        {/* The "Before" area (High cost) */}
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M 20,40 L 150,40 L 220,110 L 380,110"
                            fill="none"
                            stroke="#EF4444"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="drop-shadow-lg"
                        />

                        {/* The Area fill */}
                        <motion.path
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ delay: 1, duration: 1 }}
                            d="M 20,40 L 150,40 L 220,110 L 380,110 L 380,150 L 20,150 Z"
                            fill="url(#descendingGradient)"
                        />

                        <defs>
                            <linearGradient id="descendingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#EF4444" />
                                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* "Killer" Point */}
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            cx="220" cy="110" r="6"
                            fill="#10B981"
                            className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                        />
                    </svg>

                    {/* Labels */}
                    <div className="absolute top-0 left-2 flex flex-col pt-1">
                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-tighter">Antes</span>
                        <span className="text-sm font-black text-[#EF4444]">62,00€/año</span>
                    </div>

                    <div className="absolute bottom-0 right-4 flex flex-col items-end pb-1">
                        <div className="bg-[#10B981] text-white text-[9px] font-black px-2 py-0.5 rounded-full mb-1 flex items-center gap-1 animate-bounce">
                            <Zap size={8} /> KILLER ACTION
                        </div>
                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-tighter">Después</span>
                        <span className="text-sm font-black text-[#10B981]">0,00€/año</span>
                    </div>
                </div>

                {/* Legend / Context */}
                <div className="mt-auto flex items-center justify-center gap-3 border-t border-[#F1F5F9] pt-3">
                    <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-sm">
                        <TrendingDown size={14} className="text-[#10B981]" />
                        <span className="text-[10px] font-black text-[#0F172A] whitespace-nowrap">{t('features.hero_chart_desc')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
