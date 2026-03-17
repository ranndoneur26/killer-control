import React, { useState } from 'react';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import SubscriptionForm from './SubscriptionForm';
import { useToast } from '../hooks/useToast';
import HeroHeader from './HeroHeader';

const POPULAR_SERVICES = [
  { id: 'netflix', name: 'Netflix', color: 'bg-[#E50914]', category: 'streaming' },
  { id: 'spotify', name: 'Spotify', color: 'bg-[#1DB954]', category: 'music' },
  { id: 'prime', name: 'Amazon Prime', color: 'bg-[#00A8E1]', category: 'streaming' },
  { id: 'hbo', name: 'HBO Max', color: 'bg-[#510091]', category: 'streaming' },
  { id: 'gym', name: 'Gimnasio', color: 'bg-gray-700', category: 'health' },
  { id: 'icloud', name: 'Apple iCloud', color: 'bg-[#0070c9]', category: 'other' },
];

export default function AddSubscription() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [initialData, setInitialData] = useState(null);

  const handleSelectService = (service) => {
    setInitialData({
      name: service.name === 'Personalizado' ? '' : service.name,
      category: service.category || 'streaming'
    });
    setStep(2);
  };

  const handleSave = (formData) => {
    addToast('success', `¡Suscripción a ${formData.name} guardada correctamente!`);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#07101E] text-white flex flex-col pb-28">
      <HeroHeader />
      <div className="p-6 max-w-lg mx-auto pt-20 flex-1">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => {
            if (step === 2) setStep(1);
            else navigate(-1);
          }} className="p-2 -ml-2 hover:bg-[#111A2C] rounded-xl transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {step === 1 ? 'Añadir Suscripción' : 'Datos de Registro'}
          </h1>
        </header>

        {step === 1 && (
          <div className="animate-in fade-in">
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Busca un servicio o app..." 
                className="w-full bg-[#111A2C] border border-[#1e293b] text-white rounded-[2rem] py-4 px-6 pr-12 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder-gray-500 font-bold"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <h3 className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-4 ml-2">Populares</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {POPULAR_SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className="bg-[#111A2C] border border-[#1e293b] p-5 rounded-[2rem] flex items-center gap-4 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/5 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${service.color} flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {service.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm truncate">{service.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 py-6">
              <div className="flex-1 border-t border-[#1e293b]"></div>
              <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">O</span>
              <div className="flex-1 border-t border-[#1e293b]"></div>
            </div>

            <button 
              onClick={() => handleSelectService({ name: 'Personalizado', color: 'bg-primary', category: 'other' })}
              className="w-full mt-4 bg-[#111A2C] border-2 border-[#1e293b] text-white font-black uppercase tracking-[0.2em] rounded-[2rem] py-5 flex items-center justify-center gap-3 hover:border-primary/50 transition-all shadow-xl"
            >
              <Plus size={20} className="text-primary" />
              Nuevo <span className="text-[#F59E0B]">Killer</span> Personalizado
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4">
            <SubscriptionForm 
              initialData={initialData} 
              onSave={handleSave}
              onCancel={() => setStep(1)}
              title={<>Registro <span className="text-[#F59E0B]">Killer</span></>}
            />
          </div>
        )}

      </div>
      <Navigation />
    </div>
  );
}
