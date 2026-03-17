import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DATA = [
  { month: 'Sep',  ahorro: 0    },
  { month: 'Oct',  ahorro: 9.99  },
  { month: 'Nov',  ahorro: 9.99  },
  { month: 'Dic',  ahorro: 24.98 },
  { month: 'Ene',  ahorro: 24.98 },
  { month: 'Feb',  ahorro: 39.97 },
  { month: 'Mar',  ahorro: 54.96 },
];

const TOTAL_SAVED = DATA[DATA.length - 1].ahorro;
const SUBS_CANCELLED = 3;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 shadow-xl">
      <p className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-base font-bold text-[#10B981]">{payload[0].value.toFixed(2)} € ahorrados</p>
    </div>
  );
};

export default function SavingsAreaChart() {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-black text-lg text-[#0F172A]">Ahorro Acumulado</h3>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">Gracias a tus Auto-Bajas desde Sep 2025</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-[#10B981]">+{TOTAL_SAVED.toFixed(2)}€</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <TrendingDown size={12} className="text-[#10B981]" />
            <span className="text-xs text-[#10B981] font-black">{SUBS_CANCELLED} bajas realizadas</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#475569"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b' }}
              tickFormatter={v => `€${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="ahorro"
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#savingsGradient)"
              dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
              activeDot={{ r: 6, fill: '#10B981', strokeWidth: 3, stroke: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer: mini milestones */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { id: '1', label: 'Oct 2025', event: 'Adobe CC', amount: '-9.99€' },
          { id: '2', label: 'Dic 2025', event: 'Duolingo', amount: '-14.99€' },
          { id: '3', label: 'Feb 2026', event: 'Disney+',  amount: '-14.99€' },
        ].map(m => (
          <button 
            key={m.label} 
            onClick={() => navigate(`/subscriptions/${m.id}`)}
            className="bg-[#F8FAFC] rounded-2xl px-3 py-2.5 border border-[#E2E8F0] text-left hover:border-[#4F46E5]/40 transition-colors hover:bg-[#EEF2FF] group"
          >
            <p className="text-[10px] text-[#94A3B8] font-black uppercase tracking-widest group-hover:text-[#4F46E5]">{m.label}</p>
            <p className="text-xs text-[#0F172A] font-black leading-snug mt-0.5">{m.event}</p>
            <p className="text-xs font-black text-[#10B981]">{m.amount}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
