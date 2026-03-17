import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GUIDES = {
  '1': {
    name: 'Netflix',
    color: 'bg-[#E50914]',
    webUrl: 'https://www.netflix.com/account',
    estimatedTime: '2 min',
    steps: [
      {
        id: 1,
        text: 'Abre un navegador web y ve a Netflix.com. Inicia sesión con tu cuenta.',
        darkPatternAlert: 'Netflix desactiva el botón de baja en su app móvil y en SmartTV a propósito. Solo funciona desde el navegador web.'
      },
      {
        id: 2,
        text: 'Haz clic en tu perfil (esquina superior derecha) y selecciona "Cuenta".'
      },
      {
        id: 3,
        text: 'En la sección "Membresía y Facturación", pulsa el botón gris "Cancelar membresía".',
        darkPatternAlert: 'En esta pantalla aparecerán ofertas de descuento o pausa de cuenta. Ignóralas y continúa.'
      },
      {
        id: 4,
        text: 'Netflix te mostrará una pantalla de retención emocional con tus series favoritas. Haz clic en "Completar cancelación".',
        darkPatternAlert: 'Esta pantalla está diseñada para hacerte sentir que pierdes algo. No te dejes llevar.'
      },
      {
        id: 5,
        text: 'Recibirás un email de confirmación. Seguirás teniendo acceso hasta el final del período ya pagado.'
      }
    ]
  },
  '2': {
    name: 'Spotify',
    color: 'bg-[#1DB954]',
    webUrl: 'https://www.spotify.com/account/subscription/change/',
    estimatedTime: '3 min',
    steps: [
      {
        id: 1,
        text: 'Ve a spotify.com desde un navegador web. Inicia sesión y accede a "Cuenta" > "Tu plan".',
        darkPatternAlert: 'La app móvil de Spotify no permite cancelar directamente. Solo desde la web.'
      },
      {
        id: 2,
        text: 'Desplázate hacia abajo y haz clic en "Cambiar o cancelar".'
      },
      {
        id: 3,
        text: 'Selecciona "Cancelar Premium".',
        darkPatternAlert: 'Spotify ofrecerá pausar la suscripción por 1-3 meses gratis en lugar de cancelar. Es una trampa para que olvides cancelar.',
      },
      {
        id: 4,
        text: 'Elige el motivo de cancelación (obligatorio) y confirma con "Cancelar Premium".'
      },
      {
        id: 5,
        text: 'Confirma una segunda vez en la ventana emergente. Tu cuenta pasará al plan gratuito con anuncios al final del período.'
      }
    ]
  },
  '3': {
    name: 'Xbox Game Pass',
    color: 'bg-[#107C10]',
    webUrl: 'https://account.microsoft.com/services',
    estimatedTime: '4 min',
    steps: [
      {
        id: 1,
        text: 'Ve a account.microsoft.com/services e inicia sesión con tu cuenta de Microsoft.'
      },
      {
        id: 2,
        text: 'Localiza "Xbox Game Pass Ultimate" (o tu plan) y haz clic en "Cancelar".',
        darkPatternAlert: 'Microsoft oculta el botón de cancelación tras varias páginas de servicios. Sé persistente.'
      },
      {
        id: 3,
        text: 'Selecciona el motivo de cancelación e ignora los descuentos o extensiones gratuitas que te ofrezcan.',
        darkPatternAlert: 'Microsoft frecuentemente ofrece 1-3 meses de extensión gratuita para que te olvides de cancelar después.'
      },
      {
        id: 4,
        text: 'Confirma la cancelación. Tendrás acceso hasta la fecha de renovación ya pagada.'
      },
      {
        id: 5,
        text: 'Recibirás un email de confirmación de Microsoft. Guárdalo como comprobante.'
      }
    ]
  },
  '4': {
    name: 'Seguro Dental Sanitas',
    color: 'bg-[#005EB8]',
    webUrl: 'https://www.sanitas.es/particulares/atencion-al-cliente/',
    estimatedTime: '10-15 min',
    steps: [
      {
        id: 1,
        text: 'Comprueba PRIMERO la fecha de fin de permanencia de tu contrato. Si te quedan meses, podrías tener penalización económica por baja anticipada.',
        darkPatternAlert: 'Sanitas y otros seguros de salud incluyen permanencias de 12 meses. Cancelar antes puede costar hasta 2-3 cuotas adicionales.'
      },
      {
        id: 2,
        text: 'Con la permanencia vencida: llama al 91 175 00 00 (atención comercial de Sanitas). Pide explícitamente la "baja del seguro".'
      },
      {
        id: 3,
        text: 'El agente intentará ofrecerte descuentos, cambios de plan o pausas. Mantén tu decisión y repite: "Quiero dar de baja la póliza número [X]".',
        darkPatternAlert: 'Los agentes tienen comisión por retención. Es habitual recibir 3-5 intentos de retención en una sola llamada.'
      },
      {
        id: 4,
        text: 'Exige un número de referencia y confirmación de la baja por escrito (email o carta). Sin esto, la baja podría no tramitarse.'
      },
      {
        id: 5,
        text: 'Si te niegan la baja telefónica, envía un burofax o carta certificada a Sanitas Seguros, C/ Ribera del Loira 52, Madrid, indicando: número de póliza, tus datos y la fecha de efecto de la baja.'
      }
    ]
  },
  '5': {
    name: 'Movistar Fusión+',
    color: 'bg-[#009FDB]',
    webUrl: 'https://www.movistar.es/particulares/atencion-al-cliente/',
    estimatedTime: '15-20 min',
    steps: [
      {
        id: 1,
        text: 'Revisa tu contrato para verificar la fecha de fin de permanencia. La permanencia en Movistar suele ser de 18-24 meses en packs.',
        darkPatternAlert: 'Movistar cobra penalizaciones de hasta 150-300€ por baja anticipada. Verifica en "Mi Movistar" > "Mi contrato".'
      },
      {
        id: 2,
        text: 'Llama al 1004 (Atención al cliente de Movistar, gratuito). Solicita hablar con el departamento de "Bajas y Cancelaciones".',
        darkPatternAlert: 'El primer agente intentará transferirte a retención. Pide directamente el departamento de bajas para agilizar.'
      },
      {
        id: 3,
        text: 'Indica el servicio que quieres cancelar (Fibra, Móvil, TV). Si es el pack completo, especifica "baja de todos los servicios".',
        darkPatternAlert: 'Ofrecerán descuentos de hasta el 50% durante 3-6 meses o servicios gratuitos. Es válido aceptarlo si quieres, pero si quieres irte, no cedes.'
      },
      {
        id: 4,
        text: 'Si hay permanencia activa, negocia la penalización. Menciona que hay mejores ofertas en la competencia; es habitual que reduzcan o eliminen la penalización.'
      },
      {
        id: 5,
        text: 'Solicita el número de referencia de la solicitud de baja y confirma la fecha efectiva. Anótalo. La baja tarda 24-48 horas laborales.'
      }
    ]
  },
  '6': {
    name: 'The New York Times',
    color: 'bg-gray-700',
    webUrl: 'https://www.nytimes.com/account/manage-subscription',
    estimatedTime: '5 min',
    steps: [
      {
        id: 1,
        text: 'Entra en nytimes.com con tu cuenta y ve a "Account" > "Manage subscription".',
        darkPatternAlert: 'El enlace de cancelación no es visible directamente. Tienes que navegar a "Manage subscription" y buscar el botón "Cancel Subscription".'
      },
      {
        id: 2,
        text: 'Haz clic en "Cancel Subscription". Aparecerá un formulario con el motivo de cancelación.',
        darkPatternAlert: '¡ATENCIÓN PROMO! Si estás en tarifa promocional (1€/mes), cancela ANTES de la fecha de fin de promo. Un día después te cobrarán el precio completo (hasta 17€/mes).'
      },
      {
        id: 3,
        text: 'Indica el motivo (puede ser en inglés). NYT ofrecerá pausar la suscripción 8 semanas. Selecciona "No thanks, cancel" para continuar.',
        darkPatternAlert: 'La pausa de 8 semanas es inocua, pero reiniciará automáticamente al precio completo cuando finalice.'
      },
      {
        id: 4,
        text: 'Confirma la cancelación. Recibirás acceso hasta el final del período pagado.'
      },
      {
        id: 5,
        text: 'Comprueba tu email. Recibirás la confirmación de cancelación desde do-not-reply@nytimes.com. Guárdalo.'
      }
    ]
  },
  '7': {
    name: 'Gestor de Contraseñas',
    color: 'bg-gray-600',
    webUrl: 'https://vault.bitwarden.com/#/settings/subscription',
    estimatedTime: '3 min',
    steps: [
      {
        id: 1,
        text: 'ANTES DE CANCELAR: exporta todas tus contraseñas. En Bitwarden: ve a "Tools" > "Export Vault". Guarda el archivo en lugar seguro.',
        darkPatternAlert: 'Si cancelas sin exportar, perderás el acceso a tus contraseñas premium. El plan gratuito conserva contraseñas básicas pero pierde funciones premium.'
      },
      {
        id: 2,
        text: 'Ve a vault.bitwarden.com e inicia sesión. Accede a "Settings" > "Subscription".'
      },
      {
        id: 3,
        text: 'Pulsa "Cancel Premium". Bitwarden te confirmará que pasas al plan gratuito.'
      },
      {
        id: 4,
        text: 'Confirma la cancelación. Tu cuenta premium continuará activa hasta el final del período facturado.'
      },
      {
        id: 5,
        text: 'Recibirás un email de confirmación. El plan gratuito de Bitwarden es generoso y sigue siendo seguro y funcional.'
      }
    ]
  }
};

export default function CancellationGuide() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const guide = GUIDES[id] || GUIDES['1'];

  const handleNext = () => {
    if (currentStep < guide.steps.length) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handleFinish = () => {
    navigate('/subscriptions');
  };

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-lg mx-auto bg-[#F8FAFC] text-[#0F172A] pb-10">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-[#E2E8F0] rounded-xl transition text-[#0F172A]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black tracking-tight">Guía de Baja Definitiva</h1>
      </header>

      {/* Provider Info */}
      <div className={`${guide.color} text-white p-6 rounded-3xl mb-8 flex items-center justify-between shadow-lg`}>
        <div>
          <h2 className="text-2xl font-bold mb-1">{guide.name}</h2>
          <p className="opacity-90 text-sm font-medium">Tiempo est. {guide.estimatedTime}</p>
        </div>
        <a
          href={guide.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-semibold backdrop-blur-sm transition flex gap-2 items-center shrink-0"
        >
          Abrir Web <ExternalLink size={16} />
        </a>
      </div>

      {/* Steps */}
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-end">
          <h3 className="font-black text-lg text-[#0F172A]">Paso a paso</h3>
          <span className="text-xs text-[#64748B] font-bold uppercase tracking-wider">{currentStep}/{guide.steps.length} Completado</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full mb-6">
          <motion.div
            className="h-1.5 bg-[#4F46E5] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
            animate={{ width: `${(currentStep / guide.steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {guide.steps.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const isFuture = index > currentStep;

              if (isFuture && index > currentStep + 1) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-3xl border transition-all duration-300 ${
                    isActive ? 'bg-white border-[#4F46E5] shadow-lg shadow-indigo-100/50' :
                    isPast ? 'bg-white border-[#E2E8F0] opacity-60' :
                    'bg-[#F1F5F9] border-[#E2E8F0] opacity-50 blur-[1px]'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      isPast ? 'bg-[#4F46E5] text-white' : isActive ? 'bg-[#EEF2FF] border-2 border-[#4F46E5] text-[#4F46E5]' : 'bg-[#E2E8F0] text-[#94A3B8]'
                    }`}>
                      {isPast ? <CheckCircle2 size={16} /> : <span className="text-xs font-black">{index + 1}</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium leading-relaxed ${isActive ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
                        {step.text}
                      </p>

                      {step.darkPatternAlert && (isActive || isPast) && (
                        <div className="mt-3 bg-[#FEF2F2] border border-[#EF4444]/20 text-[#EF4444] p-3 rounded-2xl flex gap-2 items-start text-sm group">
                          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                          <p className="leading-snug"><strong className="font-black uppercase tracking-tight text-[10px] block mb-0.5 opacity-80">Cuidado con la manipulación</strong> {step.darkPatternAlert}</p>
                        </div>
                      )}

                      {isActive && currentStep < guide.steps.length && (
                        <button
                          onClick={handleNext}
                          className="mt-4 px-6 py-3 bg-[#4F46E5] text-white font-black rounded-2xl flex items-center gap-2 hover:bg-[#4338CA] transition shadow-lg shadow-indigo-100 uppercase tracking-tight text-sm"
                        >
                          Hecho, siguiente <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {currentStep === guide.steps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center bg-white border border-[#E2E8F0] p-8 rounded-3xl shadow-sm"
          >
            <div className="w-16 h-16 bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] mb-2 tracking-tight">¡Baja Completada!</h3>
            <p className="text-sm text-[#64748B] font-medium mb-6">Un gasto menos. Más dinero para lo que importa.</p>
            <button
              onClick={handleFinish}
              className="w-full bg-[#0F172A] border border-[#0F172A] font-black uppercase tracking-widest text-[11px] rounded-2xl py-4 text-white hover:bg-black transition shadow-lg"
            >
              Volver a mis suscripciones
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
