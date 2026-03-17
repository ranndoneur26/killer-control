import React from 'react';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTIONS = [
  {
    n: '1', title: 'Responsable del tratamiento',
    body: `El responsable del tratamiento de los datos personales recabados a través de Killer Control es [NOMBRE COMPLETO O RAZÓN SOCIAL], con domicilio en [DIRECCIÓN COMPLETA], NIF/CIF [NIF/CIF], y correo electrónico [EMAIL DE PRIVACIDAD O CONTACTO].`,
  },
  {
    n: '2', title: 'Finalidad del tratamiento',
    body: `Los datos personales del usuario podrán ser tratados para las siguientes finalidades:\n• Crear y gestionar su cuenta de usuario.\n• Permitir el acceso a la plataforma y sus funcionalidades.\n• Registrar y organizar sus suscripciones y gastos recurrentes.\n• Enviar alertas, recordatorios y notificaciones relacionadas con renovaciones, pagos o vencimientos.\n• Gestionar contrataciones, pagos, facturación y planes premium.\n• Prestar soporte técnico y atención al usuario.\n• Mejorar la seguridad, rendimiento y experiencia de uso.\n• Cumplir obligaciones legales.\n• Enviar comunicaciones informativas o comerciales, cuando exista consentimiento o base legal suficiente.`,
  },
  {
    n: '3', title: 'Datos que recopilamos',
    body: `Podemos recopilar las siguientes categorías de datos:\n• Datos identificativos: nombre, apellidos, alias o nombre de usuario.\n• Datos de contacto: correo electrónico y, en su caso, teléfono.\n• Datos de acceso: contraseña cifrada, identificadores de sesión o datos de autenticación mediante terceros.\n• Datos de uso: actividad en la plataforma, preferencias, eventos, logs técnicos, IP, navegador, dispositivo y OS.\n• Datos de suscripciones: nombre del servicio, categoría, importe, periodicidad, fechas de alta y renovación, método de pago asociado, alertas configuradas y notas del usuario.\n• Datos de facturación: dirección fiscal, historial de pagos y estado de la suscripción premium.\n• Comunicaciones: consultas, incidencias o solicitudes remitidas por el usuario.`,
  },
  {
    n: '4', title: 'Origen de los datos',
    body: `Los datos pueden proceder de:\n• La información facilitada directamente por el usuario.\n• El uso de la plataforma.\n• Proveedores de autenticación como Google u otros.\n• Proveedores de pago como Stripe u otros.\n• Integraciones activadas expresamente por el usuario.`,
  },
  {
    n: '5', title: 'Base jurídica del tratamiento',
    body: `Tratamos los datos personales con base en:\n• La ejecución del contrato o de medidas precontractuales, cuando el usuario se registra o utiliza el servicio.\n• El consentimiento del usuario, cuando sea necesario.\n• El cumplimiento de obligaciones legales.\n• El interés legítimo de [NOMBRE LEGAL / TITULAR], por ejemplo, para mejorar la seguridad, prevenir abusos u optimizar el servicio, siempre que dicho interés no prevalezca sobre los derechos del usuario.`,
  },
  {
    n: '6', title: 'Conservación de los datos',
    body: `Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos.\n\nPosteriormente, podrán mantenerse bloqueados durante los plazos legales exigibles para atender posibles responsabilidades.\n\nCuando el usuario solicite la supresión de su cuenta, sus datos serán eliminados o anonimizados salvo aquellos que deban conservarse por obligación legal.`,
  },
  {
    n: '7', title: 'Destinatarios y encargados del tratamiento',
    body: `Los datos podrán ser accesibles por proveedores que prestan servicios necesarios para el funcionamiento de la plataforma, tales como:\n• Alojamiento e infraestructura cloud.\n• Autenticación.\n• Analítica.\n• Correo electrónico y notificaciones.\n• Atención al cliente.\n• Pagos y facturación.\n• Almacenamiento y bases de datos.\n\nEntre dichos proveedores pueden encontrarse Firebase, Google Cloud, Stripe, Resend, PostHog u otros. Estos terceros actuarán como encargados del tratamiento o responsables independientes, según corresponda.`,
  },
  {
    n: '8', title: 'Transferencias internacionales',
    body: `En caso de utilizar proveedores ubicados fuera del Espacio Económico Europeo, los datos podrán ser objeto de transferencias internacionales.\n\n[NOMBRE LEGAL / TITULAR] adoptará las garantías adecuadas exigidas por la normativa aplicable, como cláusulas contractuales tipo o mecanismos equivalentes.`,
  },
  {
    n: '9', title: 'Derechos del usuario',
    body: `El usuario puede ejercer sus derechos de:\n• Acceso\n• Rectificación\n• Supresión ("derecho al olvido")\n• Oposición\n• Limitación del tratamiento\n• Portabilidad\n• Retirada del consentimiento en cualquier momento\n\nPara ejercerlos, escribe a [EMAIL DE PRIVACIDAD] indicando tu nombre completo, el derecho que deseas ejercer y los datos identificativos de tu cuenta.\n\nAsimismo, puedes presentar una reclamación ante la autoridad de control competente en tu país.`,
  },
  {
    n: '10', title: 'Seguridad de la información',
    body: `[NOMBRE LEGAL / TITULAR] aplica medidas técnicas y organizativas razonables para proteger los datos personales contra pérdida, acceso no autorizado, alteración o divulgación indebida.\n\nNo obstante, el usuario reconoce que ninguna medida de seguridad en internet es absolutamente infalible.`,
  },
  {
    n: '11', title: 'Menores de edad',
    body: `La plataforma no está dirigida a menores de 18 años, salvo que se indique expresamente lo contrario.\n\nSi [NOMBRE LEGAL / TITULAR] detecta que ha recopilado datos de un menor sin base legítima suficiente, podrá proceder a su eliminación.`,
  },
  {
    n: '12', title: 'Cookies y tecnologías similares',
    body: `La plataforma puede utilizar cookies o tecnologías similares para fines técnicos, analíticos, de personalización o medición.\n\nEl usuario puede obtener más información en la Política de Cookies de la plataforma.`,
  },
  {
    n: '13', title: 'Comunicaciones comerciales',
    body: `Solo se enviarán comunicaciones comerciales cuando:\n• El usuario haya dado su consentimiento.\n• Exista una relación previa y la normativa aplicable lo permita.\n• Se ofrezca en todo momento un mecanismo sencillo para darse de baja.\n\nEl usuario podrá retirar su consentimiento escribiendo a [EMAIL DE CONTACTO] o usando el enlace incluido en cada comunicación.`,
  },
  {
    n: '14', title: 'Decisiones automatizadas y perfiles',
    body: `La plataforma puede utilizar lógica automatizada para ofrecer recomendaciones de ahorro, alertas de renovación o priorización de información basada en el historial de suscripciones del usuario.\n\nEn tales casos, los datos utilizados son los introducidos por el usuario en la plataforma, con la finalidad de optimizar su gestión de gastos recurrentes, sin que ello genere efectos jurídicos negativos sobre el usuario.`,
  },
  {
    n: '15', title: 'Cambios en esta política',
    body: `[NOMBRE LEGAL / TITULAR] podrá actualizar esta Política de Privacidad para adaptarla a cambios normativos, técnicos o funcionales.\n\nCuando los cambios sean relevantes, se comunicarán por medios razonables: aviso en la web, dentro de la app o por correo electrónico.`,
  },
  {
    n: '16', title: 'Contacto',
    body: `Para cualquier consulta sobre privacidad o protección de datos:\n\n• Responsable: [NOMBRE LEGAL / TITULAR]\n• Email de privacidad: [EMAIL DE PRIVACIDAD]\n• Dirección: [DIRECCIÓN COMPLETA]`,
  },
];

export default function PrivacyModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="bg-[#07101E] border border-[#1e293b] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl flex flex-col max-h-[92vh]"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#1e293b] shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Lock size={20} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">Política de Privacidad</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · Última actualización: [FECHA]</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar">
              {/* Intro badge */}
              <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/15 rounded-2xl px-4 py-3">
                <ShieldCheck size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Tu privacidad es importante para nosotros. Este documento explica qué datos recopilamos, cómo los usamos y qué derechos tienes sobre ellos.
                </p>
              </div>

              {SECTIONS.map(s => (
                <div key={s.n} className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full shrink-0">
                      Art. {s.n}
                    </span>
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line border-l-2 border-[#1e293b] pl-4">
                    {s.body.split('Killer').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-[#F59E0B] font-bold">Killer</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="px-6 py-4 border-t border-[#1e293b] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold rounded-2xl py-3.5 hover:bg-blue-500/20 transition text-sm"
              >
                Entendido, cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
