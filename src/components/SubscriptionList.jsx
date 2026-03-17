import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import HeroHeader from './HeroHeader';
import { 
  Search, Filter, ChevronDown, Plus, Pencil,
  Tv, Music, Gamepad2, HeartPulse, Smartphone, Newspaper, MoreHorizontal 
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'streaming', label: 'Streaming', icon: Tv },
  { id: 'music', label: 'Música', icon: Music },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'health', label: 'Salud', icon: HeartPulse },
  { id: 'telecom', label: 'Telecom', icon: Smartphone },
  { id: 'press', label: 'Prensa', icon: Newspaper },
  { id: 'other', label: 'Otras', icon: MoreHorizontal },
];

const MOCK_SUBSCRIPTIONS = [
  { id: 1, name: 'Netflix', price: 15.99, cycle: 'Mensual', category: 'streaming', nextBilling: 'Mañana', color: 'text-[#EF4444]' },
  { id: 2, name: 'Spotify', price: 10.99, cycle: 'Mensual', category: 'music', nextBilling: '12 May', color: 'text-[#10B981]' },
  { id: 3, name: 'Xbox Game Pass', price: 14.99, cycle: 'Mensual', category: 'gaming', nextBilling: '15 May', color: 'text-[#10B981]' },
  { id: 4, name: 'Seguro Dental Sanitas', price: 18.50, cycle: '28 Días', category: 'health', nextBilling: '25 May', color: 'text-[#4F46E5]' },
  { id: 5, name: 'Movistar Fusion+', price: 65.00, cycle: 'Mensual', category: 'telecom', nextBilling: '01 Jun', color: 'text-[#4F46E5]' },
  { id: 6, name: 'The New York Times', price: 1.00, cycle: 'Mensual (Promo)', category: 'press', nextBilling: '01 Jun', color: 'text-[#64748B]' },
  { id: 7, name: 'Gestor de Contraseñas', price: 2.99, cycle: 'Mensual', category: 'other', nextBilling: '10 Jun', color: 'text-[#64748B]' },
];

const getCategoryIcon = (categoryId) => {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.icon : Tv;
};

export default function SubscriptionList() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = location.state?.initialTab || 'all';

  const [activeTab, setActiveTab] = useState(initialCategory);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'price' | 'date' | 'name'
  
  const activeCategory = CATEGORIES.find(c => c.id === activeTab);

  const filteredSubs = MOCK_SUBSCRIPTIONS
    .filter(sub => (activeTab === 'all' || sub.category === activeTab))
    .filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // default order
    });

  const totalMonthly = filteredSubs.reduce((acc, s) => acc + s.price, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-28">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black mb-1">Tus suscripciones <span className="text-[#F59E0B]">Killer</span></h1>
            <p className="text-[#64748B] text-sm font-medium">Gestiona tus gastos recurrentes</p>
          </div>
          <div className="group relative">
            <button 
              onClick={() => navigate('/add')}
              className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-indigo-100 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <Pencil size={18} strokeWidth={3} />
            </button>
            <span className="absolute right-0 top-full mt-2 w-max bg-[#0F172A] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
              añadir datos o nueva suscripcion
            </span>
          </div>
        </header>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Buscar suscripción..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl py-3 pl-11 pr-4 outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 shadow-sm transition font-bold text-[#0F172A] placeholder:text-[#94A3B8] placeholder:font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
          </div>
          <button 
            onClick={() => setSortBy(prev => prev === 'price' ? 'name' : 'price')}
            className={`w-12 h-12 bg-white border rounded-xl flex items-center justify-center transition shadow-sm ${sortBy !== 'date' ? 'text-[#4F46E5] border-[#4F46E5]' : 'text-[#64748B] border-[#E2E8F0] hover:border-[#4F46E5] hover:text-[#4F46E5]'}`}
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Total Indicator */}
        <div className="flex items-end justify-between mb-8 px-2">
            <div className="space-y-1">
                <p className="text-[10px] text-[#94A3B8] font-black uppercase tracking-[0.2em]">Total proyectado</p>
                <p className="text-2xl font-black text-[#0F172A]">{totalMonthly.toFixed(2)}€<span className="text-[#64748B] text-xs ml-1 font-bold">/mes</span></p>
            </div>
            {searchTerm && (
                <button 
                    onClick={() => setSearchTerm('')}
                    className="text-xs text-[#4F46E5] font-black uppercase tracking-widest hover:underline"
                >
                    Limpiar
                </button>
            )}
        </div>

        {/* Modern Category Selector (Accordion) */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full bg-white border border-[#E2E8F0] rounded-[2rem] p-5 flex items-center justify-between group hover:border-[#4F46E5]/30 transition-all shadow-xl shadow-indigo-100/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] shadow-sm group-hover:scale-110 transition-transform">
                {activeCategory?.icon ? <activeCategory.icon size={26} /> : <Filter size={26} />}
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-[0.25em] font-black text-[#94A3B8] mb-0.5">Filtrar Colección</p>
                <p className="font-black text-xl text-[#0F172A] tracking-tight">
                  {activeCategory?.label || 'Todas'}
                </p>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center transition-all duration-300 ${isCategoryOpen ? 'rotate-180 bg-[#4F46E5] text-white border-transparent shadow-lg shadow-indigo-100' : 'text-[#64748B]'}`}>
              <ChevronDown size={22} />
            </div>
          </button>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-[calc(100%+12px)] left-0 right-0 z-20 bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-6 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveTab(category.id);
                        setIsCategoryOpen(false);
                      }}
                      className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                        activeTab === category.id 
                          ? 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-100' 
                          : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#4F46E5]/50 hover:bg-[#EEF2FF]/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        activeTab === category.id ? 'bg-white/20' : 'bg-white border border-[#E2E8F0]'
                      }`}>
                        {category.icon ? <category.icon size={20} /> : <Filter size={20} />}
                      </div>
                      <span className="text-sm font-black tracking-tight">{category.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          {filteredSubs.length > 0 ? filteredSubs.map((sub, index) => {
            const Icon = getCategoryIcon(sub.category);
            
            return (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/subscriptions/${sub.id}`)}
                className="bg-white flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#4F46E5] shadow-sm transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center ${sub.color}`}>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-[#0F172A] truncate">{sub.name}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mt-1 flex items-center gap-2">
                    <span>{sub.cycle}</span>
                    <span className="w-1 h-1 bg-[#E2E8F0] rounded-full"></span>
                    <span className={sub.nextBilling === 'Mañana' ? 'text-[#EF4444]' : ''}>
                      {sub.nextBilling}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-[#0F172A] text-sm">{sub.price} €</div>
                </div>
              </motion.div>
            )
          }) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-white border border-[#E2E8F0] rounded-3xl flex items-center justify-center mx-auto mb-4 opacity-50 shadow-sm">
                <Search size={32} className="text-[#94A3B8]" />
              </div>
              <h3 className="text-lg font-black text-[#64748B]">Sin resultados</h3>
              <p className="text-sm text-[#94A3B8] mt-1 font-medium">Prueba con otra búsqueda o categoría.</p>
            </div>
          )}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
}
