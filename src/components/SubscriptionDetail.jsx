import React, { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, Calendar, CreditCard, ShieldAlert, Sparkles, TrendingUp, Check, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import SubscriptionForm from './SubscriptionForm';
import HeroHeader from './HeroHeader';

// Mock data until DB is connected
const mockHistoryData = [
  { month: 'Ene', price: 12.99 },
  { month: 'Feb', price: 12.99 },
  { month: 'Mar', price: 15.99 }, // Price hike detected
  { month: 'Abr', price: 15.99 },
  { month: 'May', price: 15.99 },
];

export default function SubscriptionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  // Setup dynamic mock data - one customised entry per category
  const MOCK_DATA = {
    // STREAMING - Netflix
    '1': {
      name: 'Netflix', price: 15.99, cycle: 'Mensual', webUrl: 'https://netflix.com',
      startDate: '2021-03-10', annualPrice: 191.88, category: 'streaming',
      card: 'Visa •••• 4242', color: 'bg-red-600', hikeDetected: true,
      planType: 'Premium', familySlots: 4, altPlanCost: 119.88,
      noticeDays: '3 Días antes', currency: 'EUR (€)', nextChargeDate: '2026-05-14'
    },
    // MUSIC - Spotify
    '2': {
      name: 'Spotify', price: 10.99, cycle: 'Mensual', webUrl: 'https://spotify.com',
      startDate: '2020-07-15', annualPrice: 131.88, category: 'music',
      card: 'Mastercard •••• 8810', color: 'bg-green-600', hikeDetected: false,
      planType: 'Individual Premium', familySlots: 1, altPlanCost: 99.99,
      noticeDays: '3 Días antes', currency: 'EUR (€)', nextChargeDate: '2026-05-12'
    },
    // GAMING - Xbox Game Pass
    '3': {
      name: 'Xbox Game Pass', price: 14.99, cycle: 'Mensual', webUrl: 'https://xbox.com',
      startDate: '2023-01-01', annualPrice: 179.88, category: 'gaming',
      card: 'Visa •••• 4242', color: 'bg-green-500', hikeDetected: false,
      planType: 'Ultimate', familySlots: 1, altPlanCost: 129.99,
      noticeDays: '1 Día antes', currency: 'EUR (€)', nextChargeDate: '2026-05-15'
    },
    // HEALTH - Seguro Dental
    '4': {
      name: 'Seguro Dental Sanitas', price: 18.50, cycle: '28 Días', webUrl: 'https://sanitas.es',
      startDate: '2025-12-01', annualPrice: 240.50, category: 'health',
      card: 'Cuenta Bankia ES12', color: 'bg-blue-400', hikeDetected: false,
      permanenceEnd: '2026-12-01',
      noticeDays: '7 Días antes', currency: 'EUR (€)', nextChargeDate: '2026-05-25'
    },
    // TELECOM - Movistar
    '5': {
      name: 'Movistar Fusion+', price: 65.00, cycle: 'Mensual', webUrl: 'https://movistar.es',
      startDate: '2024-03-01', annualPrice: 780.00, category: 'telecom',
      card: 'Dom. bancaria BBVA', color: 'bg-blue-600', hikeDetected: true,
      permanenceEnd: '2026-03-01', packServices: 'Fibra 1Gb + 2 Líneas Móviles + TV',
      noticeDays: '7 Días antes', currency: 'EUR (€)', nextChargeDate: '2026-06-01'
    },
    // PRESS - New York Times
    '6': {
      name: 'The New York Times', price: 1.00, cycle: 'Mensual', webUrl: 'https://nytimes.com',
      startDate: '2026-01-01', annualPrice: 12.00, category: 'press',
      card: 'PayPal', color: 'bg-gray-700', hikeDetected: false,
      isPromo: true, postPromoPrice: 15.99, promoEnd: '2026-07-01',
      noticeDays: '3 Días antes', currency: 'USD ($)', nextChargeDate: '2026-06-01'
    },
    // OTHER - Gestor de Contraseñas
    '7': {
      name: 'Gestor de Contraseñas', price: 2.99, cycle: 'Mensual', webUrl: 'https://bitwarden.com',
      startDate: '2025-06-01', annualPrice: 35.88, category: 'other',
      card: 'Visa •••• 4242', color: 'bg-gray-600', hikeDetected: false,
      noticeDays: '3 Días antes', currency: 'EUR (€)', nextChargeDate: '2026-06-10'
    },
  };

  const initialMock = MOCK_DATA[id] || MOCK_DATA['1'];
  const [subData, setSubData] = useState(initialMock);

  // Update mock if URL id changes (useful during testing)
  React.useEffect(() => {
    if (MOCK_DATA[id]) {
        setSubData(MOCK_DATA[id]);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save to DB...
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto pb-24 pt-20 flex-1">
        
        {/* Header Actions */}
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => isEditing ? setIsEditing(false) : navigate(-1)} className="p-2 -ml-2 hover:bg-white rounded-xl transition text-[#64748B]">
            {isEditing ? <X size={24} /> : <ArrowLeft size={24} />}
          </button>
          
          <div className="flex gap-2">
            {isEditing ? (
              <button onClick={handleSave} className="px-4 py-2 bg-[#4F46E5] text-white font-black rounded-xl flex items-center gap-2 hover:bg-[#4338CA] transition shadow-lg shadow-indigo-100">
                 <Check size={18} /> Guardar
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="p-2 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] rounded-xl transition text-[#64748B] shadow-sm">
                <Edit3 size={20} />
              </button>
            )}
          </div>
        </header>

        {isEditing ? (
          // --- EDIT MODE (Unified Form) ---
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-10">
            <SubscriptionForm 
              initialData={subData} 
              onSave={(formData) => {
                setSubData({ ...subData, ...formData });
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
              title={<>Editar Registro <span className="text-[#F59E0B]">Killer</span></>}
            />
          </motion.div>
        ) : (
          // --- READ ONLY MODE ---
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Hero Info */}
            <div className="flex flex-col items-center mb-10 text-center">
              <div className={`w-24 h-24 rounded-3xl ${subData.color} flex items-center justify-center text-white text-3xl font-black shadow-xl mb-4 border-4 border-white`}>
                {subData.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-black mb-1 text-[#0F172A]">{subData.name}</h1>
              <div className="text-[#64748B] font-black bg-[#EEF2FF] px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border border-[#4F46E5]/10">
                {subData.category}
              </div>
            </div>

            {/* Price Big KPI */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 mb-8 flex justify-between items-end relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-[#4F46E5]">
                <CreditCard size={80} />
              </div>
              <div className="relative z-10">
                <p className="text-xs text-[#64748B] font-black uppercase tracking-widest mb-2">Gasto actual</p>
                <div className="text-5xl font-black text-[#0F172A] tracking-tight">{subData.price}€<span className="text-lg text-[#64748B] font-medium ml-1">/{subData.cycle.toLowerCase() === 'anual' ? 'año' : 'mes'}</span></div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[10px] text-[#64748B] font-black uppercase tracking-tighter mb-1">Gasto Anual Proyectado</p>
                <p className="font-black text-[#10B981] text-lg">{subData.annualPrice}€</p>
              </div>
            </div>

            {/* Intelligent Insights (Dark Pattern detection) */}
            {subData.hikeDetected && (
              <div className="bg-[#FFFBEB] border border-[#F59E0B]/20 rounded-2xl p-4 mb-8 flex gap-4 items-start shadow-sm">
                <ShieldAlert size={24} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-[#F59E0B] text-sm mb-1 uppercase tracking-tight">Subida de precio detectada</h4>
                  <p className="text-sm text-[#92400E] mb-3 font-medium">Han aumentado la cuota un 23% desde Marzo. ¿Todavía le sacas partido?</p>
                  <button 
                    onClick={() => navigate(`/alternatives/${id}`)}
                    className="bg-[#F59E0B] text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-[#D97706] transition shadow-md shadow-amber-100"
                  >
                    Ver alternativas más baratas
                  </button>
                </div>
              </div>
            )}

            {/* Vibe Chart */}
            <div className="mb-8">
              <h3 className="font-black text-xs uppercase tracking-widest text-[#64748B] mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#4F46E5]" /> Historial de Costes
              </h3>
              <div className="h-40 w-full ml-[-1rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockHistoryData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#4F46E5', fontWeight: 'bold' }}
                    />
                    <Area type="stepAfter" dataKey="price" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-4 mb-10">
              {subData.webUrl && (
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3 text-[#64748B]">
                    <span className="font-black text-xs uppercase tracking-widest">Web</span>
                  </div>
                  <a 
                    href={subData.webUrl.startsWith('http') ? subData.webUrl : `https://${subData.webUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-black text-[#4F46E5] text-sm hover:underline block truncate max-w-[200px] text-right"
                  >
                    {subData.webUrl.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              )}
              {subData.startDate && (
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3 text-[#64748B]">
                    <Calendar size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">Suscrito desde</span>
                  </div>
                  <span className="font-black text-[#0F172A] text-sm block">{new Date(subData.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3 text-[#64748B]">
                  <Calendar size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">Próximo Cargo</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-[#0F172A] text-sm block">{new Date(subData.nextChargeDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                  <span className="text-[10px] font-black uppercase text-[#4F46E5]">{subData.noticeDays}</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3 text-[#64748B]">
                  <CreditCard size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">Método de pago</span>
                </div>
                <span className="font-black text-[#0F172A] text-sm">{subData.card}</span>
              </div>
                            {/* Dynamic Read-only Fields */}
              {(subData.category === 'streaming' || subData.category === 'music' || subData.category === 'gaming') && (
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3 text-[#64748B]">
                    <Sparkles size={18} className="text-[#4F46E5]" />
                    <span className="font-black text-xs uppercase tracking-widest">Plan Actual</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#0F172A] text-sm block">{subData.planType || 'Estándar'}</span>
                    <span className="text-[10px] font-black text-[#64748B] uppercase tracking-tighter">{subData.familySlots || 1} Perfiles / Slots</span>
                  </div>
                </div>
              )}

              {subData.category === 'health' && subData.permanenceEnd && (
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3 text-[#EF4444]">
                    <ShieldAlert size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">Fin Permanencia</span>
                  </div>
                  <span className="font-black text-[#0F172A] text-sm">{new Date(subData.permanenceEnd).toLocaleDateString()}</span>
                </div>
              )}

              {subData.category === 'press' && subData.isPromo && (
                <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3 text-[#F59E0B]">
                    <Sparkles size={18} />
                    <span className="font-black text-xs uppercase tracking-widest">Promo Activa</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-[#0F172A] text-sm block">Hasta {new Date(subData.promoEnd).toLocaleDateString()}</span>
                    <span className="text-[10px] font-black text-[#EF4444] uppercase tracking-tighter">Luego {subData.postPromoPrice}€</span>
                  </div>
                </div>
              )}

              {subData.category === 'telecom' && (
                <>
                  <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3 text-[#64748B]">
                      <ShieldAlert size={18} />
                      <span className="font-black text-xs uppercase tracking-widest">Permanencia</span>
                    </div>
                    <span className="font-black text-[#0F172A] text-sm">{subData.permanenceEnd ? new Date(subData.permanenceEnd).toLocaleDateString() : 'Sin permanencia'}</span>
                  </div>
                  {subData.packServices && (
                    <div className="flex items-center justify-between py-4 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-3 text-[#64748B] w-1/3">
                         <Sparkles size={18} className="text-[#4F46E5]" />
                         <span className="font-black text-xs uppercase tracking-widest">Pack</span>
                      </div>
                      <span className="text-sm font-black text-right text-[#64748B] truncate w-2/3">{subData.packServices}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Killer Action */}
            <button 
              onClick={() => navigate(`/guide/${id}`)}
              className="w-full bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] font-black uppercase tracking-widest rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-[#EF4444] hover:text-white transition shadow-sm"
            >
              <Trash2 size={20} /> Iniciar Proceso de Baja
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
