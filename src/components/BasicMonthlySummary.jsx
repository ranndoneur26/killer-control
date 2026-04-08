import React from 'react';
import { TrendingUp, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function BasicMonthlySummary({ totalSpend }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#1a2035] border border-gray-200 dark:border-gray-700 p-6 rounded-[2.5rem] h-64 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a2035] dark:to-[#111827] opacity-50" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--primary)]">
          <TrendingUp size={32} />
        </div>
        
        <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-1">
          {t('dashboard.basic_summary_title') || 'Resumen Mensual'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
          {t('dashboard.current_spend') || 'Gasto actual:'} <span className="text-gray-900 dark:text-gray-100 font-bold">{totalSpend.toFixed(2)}€</span>
        </p>
        
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">
            {t('dashboard.unlock_charts_desc') || 'Desbloquea gráficas avanzadas y análisis histórico con Premium.'}
          </p>
        </div>
      </div>

      {/* Blur/Lock Effect hinting at the chart behind */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white dark:from-[#1a2035] to-transparent pointer-events-none" />
    </div>
  );
}
