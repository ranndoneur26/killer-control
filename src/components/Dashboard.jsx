import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import CategoryDonutChart from './charts/CategoryDonutChart';
import SavingsAreaChart from './charts/SavingsAreaChart';
import { useSubscriptionAnalysis } from '../hooks/useSubscriptionAnalysis';
import { MOCK_SUBSCRIPTIONS } from '../data/mockSubscriptions';
import { AlertTriangle, Timer, TrendingUp, Info, ChevronRight, Pencil } from 'lucide-react';
import HeroHeader from './HeroHeader';
import { useLanguage } from '../contexts/LanguageContext';

const mockChartData = [
  { name: 'Ene', gasto: 120 },
  { name: 'Feb', gasto: 132 },
  { name: 'Mar', gasto: 105 },
  { name: 'Abr', gasto: 140 },
  { name: 'May', gasto: 110 },
  { name: 'Jun', gasto: 98 },
];

const ICON_MAP = {
  'Netflix': MonitorPlay,
  'Spotify': Headphones,
  'Xbox Game Pass Ultimate': Gamepad2,
  'Xbox Game Pass': Gamepad2,
};

const COLOR_MAP = {
  'Netflix': 'text-[#EF4444]',
  'Spotify': 'text-[#10B981]',
  'Xbox Game Pass Ultimate': 'text-[#10B981]',
  'Xbox Game Pass': 'text-[#10B981]',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { alerted, potentialSavings } = useSubscriptionAnalysis(MOCK_SUBSCRIPTIONS);
  const { t } = useLanguage();

  const totalMonthlySpend = MOCK_SUBSCRIPTIONS.reduce((acc, sub) => acc + sub.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)]">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto pb-24 pt-20">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 relative">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]"><span className="text-[#F59E0B]">Killer</span> Control</h1>
            <p className="text-xs text-[var(--text-secondary)] font-black uppercase tracking-widest">{t('dashboard.tagline')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="group relative">
              <button
                onClick={() => navigate('/add')}
                className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Pencil size={18} strokeWidth={3} />
              </button>
              <span className="absolute right-0 top-full mt-2 w-max bg-[var(--text-primary)] text-[var(--bg)] text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 border border-[var(--border)]">
                {t('dashboard.add_tooltip')}
              </span>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] shadow-sm flex items-center justify-center hover:border-[var(--primary)] transition-colors hover:scale-105 active:scale-95"
            >
              <span className="font-bold text-[var(--primary)]">N</span>
            </button>
          </div>
        </header>

        {/* Main KPI */}
        <button
          onClick={() => navigate('/profile')}
          className="w-full text-left bg-[var(--bg-surface)] border border-[var(--border)] rounded-[2.5rem] p-8 mb-6 relative overflow-hidden group hover:border-[var(--primary)]/50 transition-all shadow-sm"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CreditCard size={100} className="text-[var(--text-primary)]" />
          </div>
          <h2 className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest mb-1">{t('dashboard.total_label')}</h2>
          <div className="text-4xl font-black mb-4 text-[var(--text-primary)]">{totalMonthlySpend.toFixed(2).replace('.', ',')} &euro;</div>

          <div className="flex items-center gap-2 text-[#10B981] font-bold text-sm">
            <TrendingDown size={16} />
            <span>-12.5% vs April</span>
          </div>
        </button>
        {/* Alertas de Inteligencia */}
        {alerted.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-lg flex items-center gap-2 text-[var(--primary)]">
                {t('dashboard.alerts_title')}
                <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-0.5 rounded-full">{alerted.length}</span>
              </h3>
            </div>
            <div className="space-y-3">
              {alerted.map(({ sub, analysis }) => {
                const alert = analysis.alert;
                const Icon = alert.type === 'price_increase' ? TrendingUp : alert.type === 'promo_ending' ? Timer : Info;
                const severityColor = alert.severity === 'high' ? 'border-[#EF4444]/30 bg-[#EF4444]/10' : alert.severity === 'medium' ? 'border-[#F59E0B]/30 bg-[#F59E0B]/10' : 'border-[var(--primary)]/30 bg-[var(--primary)]/10';
                const iconColor = alert.severity === 'high' ? 'text-[#EF4444]' : alert.severity === 'medium' ? 'text-[#F59E0B]' : 'text-[var(--primary)]';
                const textColor = alert.severity === 'high' ? 'text-red-200' : alert.severity === 'medium' ? 'text-orange-200' : 'text-indigo-200';

                const alertTypeLabel = alert.type === 'price_increase' ? t('dashboard.price_increase') :
                  alert.type === 'promo_ending' ? t('dashboard.promo_end') :
                    alert.type.replace('_', ' ');

                return (
                  <div key={sub.id} className={`border rounded-[2rem] p-5 flex gap-4 shadow-sm bg-[var(--bg-surface)] ${severityColor}`}>
                    <div className={`mt-1 ${iconColor}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-[var(--text-primary)]">{sub.name}</span>
                        <span className={`text-[10px] font-black uppercase tracking-tight ${iconColor}`}>
                          {alertTypeLabel}
                        </span>
                      </div>
                      <p className={`text-xs ${textColor} font-medium leading-[1.3] opacity-80`}>{alert.message}</p>
                      {analysis.alternatives.length > 0 && (
                        <button
                          onClick={() => navigate(`/guide/${sub.id}`)}
                          className="mt-3 flex items-center gap-1 text-[11px] font-black text-[var(--primary)] hover:underline uppercase tracking-tight"
                        >
                          {t('dashboard.see_alternative')} {analysis.alternatives[0].savings}€ <ChevronRight size={12} />
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
          <div className="bg-[var(--bg-elevated)] border border-[var(--primary)]/20 rounded-[2rem] p-5 mb-8 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">{t('dashboard.savings_opportunity')}</p>
              <p className="text-xl font-black text-[var(--text-primary)]">-{potentialSavings.toFixed(2)}€/mes</p>
              <p className="text-[10px] text-[var(--text-secondary)] font-medium truncate">{t('dashboard.offers_detected', { count: alerted.length })}</p>
            </div>
            <button
              onClick={() => navigate('/subscriptions')}
              className="bg-[var(--primary)] text-white text-xs font-black px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 shadow-lg shadow-[var(--primary)]/20 transition-all"
            >
              {t('dashboard.optimize')}
            </button>
          </div>
        )}

        {/* Proximos Cargos */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-lg text-[var(--primary)]">{t('dashboard.upcoming_charges')}</h3>
            <button onClick={() => navigate('/subscriptions')} className="text-xs text-[var(--primary)] font-black uppercase tracking-wider">{t('dashboard.see_all')}</button>
          </div>

          <div className="space-y-4">
            {MOCK_SUBSCRIPTIONS.slice(0, 3).map(sub => {
              const Icon = ICON_MAP[sub.name] || MonitorPlay;
              const color = COLOR_MAP[sub.name] || 'text-[#64748B]';
              return (
                <div key={sub.id} className="bg-[var(--bg-surface)] border border-[var(--border)] p-5 rounded-[2rem] flex items-center gap-4 shadow-sm group hover:border-[var(--primary)]/20 transition-all">
                  <div className={`w-12 h-12 rounded-2xl bg-[var(--bg)] flex items-center justify-center transition-colors ${color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[var(--text-primary)]">{sub.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] flex items-center gap-1 mt-1 font-medium">
                      <Calendar size={12} /> {sub.renewalDate ? new Date(sub.renewalDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : t('subscriptions.tomorrow')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-[var(--text-primary)]">{sub.amount} &euro;</div>
                    <button
                      onClick={() => navigate(`/guide/${sub.id}`)}
                      className="text-[10px] text-[var(--primary)] mt-1 font-black hover:underline cursor-pointer uppercase tracking-tight"
                    >
                      {t('dashboard.auto_cancel')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Existing line chart */}
        <div className="mb-8">
          <h3 className="font-black text-lg mb-4 text-[var(--primary)]">{t('dashboard.spending_curve')}</h3>
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-6 rounded-[2.5rem] h-64 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="gasto" stroke="var(--primary)" strokeWidth={4} dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
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
