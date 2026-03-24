import React from 'react';
import { motion } from 'framer-motion';

const DATA = [
    { day: 'Lun', value: 45, label: '12€' },
    { day: 'Mar', value: 30, label: '8€' },
    { day: 'Mié', value: 65, label: '18€' },
    { day: 'Jue', value: 40, label: '11€' },
    { day: 'Vie', value: 85, label: '24€' },
    { day: 'Sáb', value: 55, label: '15€' },
    { day: 'Dom', value: 75, label: '21€' },
];

export default function MockupChart() {
    return (
        <div className="w-full h-full flex flex-col justify-end gap-2 p-2 pt-6">
            <div className="flex items-end justify-between h-full w-full gap-2 px-1">
                {DATA.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                        {/* Tooltip on hover */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] font-black py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                            {item.label}
                        </div>

                        {/* Bar with animation */}
                        <div className="w-full bg-[#F1F5F9] rounded-full h-full relative overflow-hidden">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${item.value}%` }}
                                transition={{
                                    duration: 1,
                                    delay: i * 0.1,
                                    type: 'spring',
                                    bounce: 0.3
                                }}
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4F46E5] to-[#818CF8] rounded-full shadow-lg shadow-indigo-500/20"
                            />
                        </div>

                        {/* Label */}
                        <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider">
                            {item.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
