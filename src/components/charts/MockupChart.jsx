import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
    { day: 'Lun', value: 35, label: '8,50€' },
    { day: 'Mar', value: 25, label: '6,20€' },
    { day: 'Mié', value: 55, label: '14,30€' },
    { day: 'Jue', value: 30, label: '7,40€' },
    { day: 'Vie', value: 75, label: '19,90€' },
    { day: 'Sáb', value: 45, label: '11,20€' },
    { day: 'Dom', value: 65, label: '16,80€' },
];

export default function MockupChart() {
    const [activeIdx, setActiveIdx] = useState(null);

    return (
        <div className="w-full h-full flex flex-col justify-between p-2 pt-8">
            <div className="flex items-end justify-between h-[120px] w-full gap-2 px-1">
                {DATA.map((item, i) => (
                    <div
                        key={i}
                        className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                        onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                    >
                        {/* Price Label (Visible on click/active) */}
                        <AnimatePresence>
                            {activeIdx === i && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[11px] font-black py-1.5 px-2.5 rounded-xl shadow-lg z-20 whitespace-nowrap border border-[#4F46E5]/30"
                                >
                                    {item.label}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0F172A] rotate-45 border-r border-b border-[#4F46E5]/30" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Bar Container */}
                        <div className="w-full bg-[#F1F5F9] rounded-2xl h-full relative overflow-hidden group-hover:bg-[#E2E8F0] transition-colors">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.value}%` }}
                                transition={{
                                    duration: 1.2,
                                    delay: i * 0.1,
                                    type: 'spring',
                                    bounce: 0.2
                                }}
                                className={`absolute bottom-0 left-0 right-0 rounded-2xl transition-all duration-300
                  ${activeIdx === i
                                        ? 'bg-gradient-to-t from-[#4F46E5] to-[#818CF8] shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                                        : 'bg-gradient-to-t from-[#94A3B8] to-[#CBD5E1] opacity-60'
                                    } group-hover:opacity-100`}
                            >
                                {/* Visual texture/glow line */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white/20 rounded-full" />
                            </motion.div>
                        </div>

                        {/* Label */}
                        <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${activeIdx === i ? 'text-[#4F46E5]' : 'text-[#94A3B8]'}`}>
                            {item.day}
                        </span>
                    </div>
                ))}
            </div>

            {/* Description text at bottom */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-center">
                <p className="text-[10px] text-[#64748B] font-medium leading-relaxed italic">
                    * Pulsa en las barras para ver el desglose de ahorro acumulado.
                </p>
            </div>
        </div>
    );
}
