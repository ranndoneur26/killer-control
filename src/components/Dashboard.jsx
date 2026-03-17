import React from 'react';
import { Calendar, CreditCard, Gamepad2, Headphones, MonitorPlay, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import CategoryDonutChart from './charts/CategoryDonutChart';
import SavingsAreaChart from './charts/SavingsAreaChart';
import { useSubscriptionAnalysis } from '../hooks/useSubscriptionAnalysis';
import { MOCK_SUBSCRIPTIONS } from '../data/mockSubscriptions';
import { AlertTriangle, Timer, TrendingUp, Info, ChevronRight, Pencil } from 'lucide-react';
import HeroHeader from './HeroHeader';

const mockChartData = [
  { name: 'Ene', gasto: 120 },
  { name: 'Feb', gasto: 132 },
  { name: 'Mar', gasto: 105 },
  { name: 'Abr', gasto: 140 },
  { name: 'May', gasto: 110 },
  { name: 'Jun', gasto: 98 },
];

// Note: Icons are mapped by name if they are not in the object
const ICON_MAP = {
  'Netflix': MonitorPlay,
  'Spotify': Headphones,
  'Xbox Game Pass Ultimate': Gamepad2,
};

const COLOR_MAP = {
  'Netflix': 'text-[#EF4444]',
  'Spotify': 'text-[#10B981]',
  'Xbox Game Pass Ultimate': 'text-[#10B981]',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { alerted, potentialSavings } = useSubscriptionAnalysis(MOCK_SUBSCRIPTIONS);

  const totalMonthlySpend = MOCK_SUBSCRIPTIONS.reduce((acc, sub) => acc + sub.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto pb-24 pt-20">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 relative">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F172A]"><span className="text-[#F59E0B]">Killer</span> Control</h1>
          <p className="text-xs text-[#64748B] font-black uppercase tracking-widest">Tus suscripciones a raya</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="group relative">
            <button 
              onClick={() => navigate('/add')}
              className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-indigo-100 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <Pencil size={18} strokeWidth={3} />
            </button>
            <span className="absolute right-0 top-full mt-2 w-max bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 border border-[#E2E8F0]">
              añadir datos o nueva suscripcion
            </span>
          </div>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center hover:border-[#4F46E5] transition-colors hover:scale-105 active:scale-95"
          >
            <span className="font-bold text-[#4F46E5]">N</span>
          </button>
        </div>
      </header>

      {/* Main KPI */}
      <button 
        onClick={() => navigate('/profile', { state: { section: 'payment' } })}
        className="w-full text-left bg-white border border-[#E2E8F0] rounded-[2.5rem] p-8 mb-6 relative overflow-hidden group hover:border-[#4F46E5]/50 transition-all shadow-sm"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <CreditCard size={100} className="text-[#0F172A]" />
        </div>
        <h2 className="text-[#64748B] text-[10px] font-black uppercase tracking-widest mb-1">Gasto Total (Mes)</h2>
        <div className="text-4xl font-black mb-4 text-[#0F172A]">{totalMonthlySpend.toFixed(2).replace('.', ',')} &euro;</div>
        
        <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm">
          <TrendingDown size={16} />
          <span>-12.5% bajada respecto abril</span>
        </div>
      </button>
      {/* Alertas de Inteligencia */}
      {alerted.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-lg flex items-center gap-2 text-[#4F46E5]">
              Alertas de Inteligencia
              <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.5 rounded-full">{alerted.length}</span>
            </h3>
          </div>
          <div className="space-y-3">
            {alerted.map(({ sub, analysis }) => {
              const alert = analysis.alert;
              const Icon = alert.type === 'price_increase' ? TrendingUp : alert.type === 'promo_ending' ? Timer : Info;
              const severityColor = alert.severity === 'high' ? 'border-[#EF4444]/30 bg-[#EF4444]/5' : alert.severity === 'medium' ? 'border-[#F59E0B]/30 bg-[#F59E0B]/5' : 'border-[#4F46E5]/30 bg-[#4F46E5]/5';
              const iconColor = alert.severity === 'high' ? 'text-[#EF4444]' : alert.severity === 'medium' ? 'text-[#F59E0B]' : 'text-[#4F46E5]';
              const textColor = alert.severity === 'high' ? 'text-[#991B1B]' : alert.severity === 'medium' ? 'text-[#92400E]' : 'text-[#3730A3]';

              return (
                <div key={sub.id} className={`border rounded-[2rem] p-5 flex gap-4 shadow-sm bg-white ${severityColor}`}>
                  <div className={`mt-1 ${iconColor}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-[#0F172A]">{sub.name}</span>
                      <span className={`text-[10px] font-black uppercase tracking-tight ${iconColor}`}>
                        {alert.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className={`text-xs ${textColor} font-medium leading-[1.3] opacity-80`}>{alert.message}</p>
                    {analysis.alternatives.length > 0 && (
                      <button 
                        onClick={() => navigate(`/guide/${sub.id}`)}
                        className="mt-3 flex items-center gap-1 text-[11px] font-black text-[#4F46E5] hover:underline uppercase tracking-tight"
                      >
                        Ver alternativa ahorra {analysis.alternatives[0].savings}€ <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Oportunidad de Ahorro Total */}
      {potentialSavings > 0 && (
        <div className="bg-[#EEF2FF] border border-[#4F46E5]/20 rounded-[2rem] p-5 mb-8 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest">Oportunidad de ahorro</p>
            <p className="text-xl font-black text-[#0F172A]">-{potentialSavings.toFixed(2)}€/mes</p>
            <p className="text-[10px] text-[#64748B] font-medium truncate">Detectadas mejores ofertas en {alerted.length} servicios</p>
          </div>
          <button 
            onClick={() => navigate('/subscriptions')}
            className="bg-[#4F46E5] text-white text-xs font-black px-5 py-2.5 rounded-xl hover:bg-[#4338CA] active:scale-95 shadow-lg shadow-indigo-100 transition-all"
          >
            Optimizar
          </button>
        </div>
      )}

      {/* Proximos Cargos */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-lg text-[#4F46E5]">Próximos Cargos</h3>
          <button onClick={() => navigate('/subscriptions')} className="text-xs text-[#4F46E5] font-black uppercase tracking-wider">Ver Todos</button>
        </div>
        
        <div className="space-y-4">
          {MOCK_SUBSCRIPTIONS.slice(0, 3).map(sub => {
            const Icon = ICON_MAP[sub.name] || MonitorPlay;
            const color = COLOR_MAP[sub.name] || 'text-[#64748B]';
            return (
              <div key={sub.id} className="bg-white border border-[#E2E8F0] p-5 rounded-[2rem] flex items-center gap-4 shadow-sm group hover:border-[#4F46E5]/20 transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center transition-colors ${color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#0F172A]">{sub.name}</div>
                  <div className="text-xs text-[#64748B] flex items-center gap-1 mt-1 font-medium">
                    <Calendar size={12} /> {sub.renewalDate ? new Date(sub.renewalDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : 'Mañana'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#0F172A]">{sub.amount} &euro;</div>
                  <button
                    onClick={() => navigate(`/guide/${sub.id}`)}
                    className="text-[10px] text-[#4F46E5] mt-1 font-black hover:underline cursor-pointer uppercase tracking-tight"
                  >
                    Auto-Baja
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Existing line chart */}
      <div className="mb-8">
        <h3 className="font-black text-lg mb-4 text-[#4F46E5]">Curva de Gasto</h3>
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-[2.5rem] h-64 shadow-sm">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#4F46E5', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="gasto" stroke="#4F46E5" strokeWidth={4} dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut: Gasto por Categoría */}
      <div className="mb-6">
        <CategoryDonutChart />
      </div>

      {/* Area: Ahorro Acumulado */}
      <div className="mb-6">
        <SavingsAreaChart />
      </div>

      <Navigation />
      </div>
    </div>
  );
}
