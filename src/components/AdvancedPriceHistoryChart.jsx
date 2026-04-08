import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockChartData = [
  { name: 'Ene', gasto: 120 },
  { name: 'Feb', gasto: 132 },
  { name: 'Mar', gasto: 105 },
  { name: 'Abr', gasto: 140 },
  { name: 'May', gasto: 110 },
  { name: 'Jun', gasto: 98 },
];

export default function AdvancedPriceHistoryChart() {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 rounded-[2.5rem] h-64 shadow-sm relative group overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        {/* Could add a background icon here */}
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockChartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="var(--text-secondary)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            dy={10} 
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            stroke="var(--text-secondary)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `€${value}`} 
            width={35}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border)', 
              borderRadius: '12px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              padding: '12px'
            }}
            itemStyle={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '13px' }}
            labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
          />
          <Line 
            type="monotone" 
            dataKey="gasto" 
            stroke="var(--primary)" 
            strokeWidth={4} 
            dot={{ fill: 'var(--bg-surface)', stroke: 'var(--primary)', strokeWidth: 2, r: 4 }} 
            activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--primary)' }} 
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
