import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Sector,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const DATA = [
  { name: 'Entretenimiento', value: 45, color: '#4F46E5', sub: 'Netflix, Spotify, Disney+', category: 'streaming' },
  { name: 'Productividad',   value: 30, color: '#6366f1', sub: 'Adobe, Notion, Figma',    category: 'other'     },
  { name: 'Utilidades',      value: 25, color: '#10B981', sub: 'iCloud, Dropbox',          category: 'telecom'   },
];

const TOTAL_SPEND = 41.97;

/* Active sector renders bigger with inner text */
const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => (
  <Sector
    cx={cx} cy={cy}
    innerRadius={innerRadius - 4}
    outerRadius={outerRadius + 8}
    startAngle={startAngle}
    endAngle={endAngle}
    fill={fill}
    cornerRadius={4}
  />
);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 shadow-xl">
      <p className="font-bold text-[#0F172A] text-sm">{d.name}</p>
      <p className="text-xs text-[#64748B] mt-0.5">{d.sub}</p>
      <p className="text-sm font-bold mt-1.5" style={{ color: d.color }}>{d.value}%</p>
    </div>
  );
};

export default function CategoryDonutChart() {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(null);

  const handleCategoryClick = (category) => {
    navigate('/subscriptions', { state: { initialTab: category } });
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-black text-lg text-[#0F172A]">Gasto por Categoría</h3>
        <p className="text-xs text-[#64748B] mt-0.5 font-medium">Distribución del gasto mensual actual</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Donut */}
        <div className="relative w-48 h-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                activeIndex={activeIdx}
                activeShape={renderActiveShape}
                onMouseEnter={(_, idx) => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                strokeWidth={0}
              >
                {DATA.map((entry, i) => (
                  <Cell 
                    key={entry.name} 
                    fill={entry.color} 
                    opacity={activeIdx === null || activeIdx === i ? 1 : 0.4} 
                    onClick={() => handleCategoryClick(entry.category)}
                    className="cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">Total</p>
            <p className="text-xl font-black text-[#0F172A] leading-tight">{TOTAL_SPEND}€</p>
            <p className="text-[10px] text-[#64748B] font-medium">/mes</p>
          </div>
        </div>

        {/* Legend */}
        <ul className="flex-1 space-y-3 w-full">
          {DATA.map((d, i) => (
            <li
              key={d.name}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition ${
                activeIdx === i ? 'bg-[#EEF2FF] border-[#4F46E5]/20' : 'hover:bg-[#F8FAFC] border-transparent'
              } border`}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => handleCategoryClick(d.category)}
            >
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black leading-none text-[#0F172A]">{d.name}</p>
                <p className="text-[11px] text-[#64748B] mt-0.5 truncate font-medium">{d.sub}</p>
              </div>
              <span className="text-sm font-black shrink-0" style={{ color: d.color }}>{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
