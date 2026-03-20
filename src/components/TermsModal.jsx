import React from 'react';
import { X, Shield, ScrollText } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const SECTIONS = [
  {
    n: '1', title: 'Identificación del titular',
    body: `Los presentes Términos y Condiciones regulan el acceso, navegación y uso del sitio web, aplicación y servicios asociados a Killer Control, titularidad de Marc Xicola Tugas, con domicilio en C/ Pau Claris 15, baixos. 08100 Mollet del Vallès, NIF/CIF 52172995w, y correo electrónico de contacto Killercontrolsupport@gmail.com.`,
  },
  {
    n: '2', title: 'Objeto del servicio',
    body: `Killer Control es una plataforma digital orientada a ayudar a los usuarios a centralizar, visualizar, analizar y gestionar sus suscripciones, gastos recurrentes, avisos de renovación y procesos informativos de cancelación.\n\nLa plataforma puede ofrecer funcionalidades como: registro manual de suscripciones, paneles de control y estadísticas, alertas y recordatorios, recomendaciones de optimización de gasto, guías informativas para cancelar servicios, y acceso a funcionalidades premium de pago, en su caso.\n\nEl uso de la plataforma no supone asesoramiento financiero, legal ni fiscal profesional, salvo que se indique expresamente lo contrario.`,
  },
  {
    n: '3', title: 'Aceptación de las condiciones',
    body: `El acceso o uso de la plataforma atribuye la condición de usuario e implica la aceptación plena de estos Términos y Condiciones, así como de la Política de Privacidad.\n\nSi el usuario no está de acuerdo con estos textos, deberá abstenerse de utilizar la plataforma.`,
  },
  {
    n: '4', title: 'Requisitos de uso',
    body: `Para utilizar determinados servicios, el usuario deberá:\n• Ser mayor de 18 años, o contar con autorización válida de sus representantes legales.\n• Proporcionar información veraz, actual y completa.\n• Custodiar de forma diligente sus credenciales de acceso.\n• No utilizar la plataforma con fines ilícitos, fraudulentos o contrarios a la buena fe.\n\nEl usuario es responsable de todas las actividades realizadas desde su cuenta, salvo prueba de uso no autorizado por terceros.`,
  },
  {
    n: '5', title: 'Registro de cuenta',
    body: `Algunas funcionalidades pueden requerir la creación de una cuenta mediante correo electrónico y contraseña, inicio de sesión con terceros o cualquier otro sistema habilitado por la plataforma.\n\nEl usuario se compromete a: no suplantar a terceros, no crear cuentas falsas, mantener actualizados sus datos, y notificar de inmediato cualquier acceso no autorizado a Killercontrolsupport@gmail.com.`,
  },
  {
    n: '6', title: 'Descripción y límites del servicio',
    body: `La plataforma tiene carácter informativo, organizativo y de apoyo a la gestión personal de suscripciones.\n\nSalvo que se indique expresamente:\n• Killer Control no actúa como entidad bancaria.\n• Killer Control no ejecuta cancelaciones en nombre del usuario frente a terceros.\n• Killer Control no garantiza que todos los proveedores externos mantengan invariables sus condiciones, precios, interfaces o procesos de baja.\n• Killer Control no sustituye la revisión directa de los contratos suscritos por el usuario con terceros.\n\nLas guías, alertas, cálculos y recomendaciones se ofrecen como ayuda orientativa.`,
  },
  {
    n: '7', title: 'Planes, precios y pagos',
    body: `El acceso a determinadas funcionalidades puede estar sujeto al pago de una suscripción o tarifa.\n\nEn tal caso:\n• El precio aplicable será el publicado en el momento de la contratación.\n• La periodicidad del cobro será mensual o anual según el plan seleccionado.\n• Los pagos se procesarán a través de Stripe o el proveedor que se indique en cada momento.\n• El usuario autoriza el cobro recurrente cuando contrate un plan de suscripción.\n\nSalvo indicación contraria, los importes se expresan en euros e incluyen los impuestos aplicables según se informe en el proceso de compra.`,
  },
  {
    n: '8', title: 'Renovación, cancelación y reembolsos',
    body: `Las suscripciones de pago se renovarán automáticamente al final de cada periodo, salvo cancelación previa por parte del usuario dentro del plazo indicado en la plataforma.\n\nEl usuario podrá cancelar su plan desde la sección "Mi Cuenta" de la aplicación.\n\nLa cancelación impedirá futuros cobros, pero no supondrá necesariamente el reembolso automático de cantidades ya abonadas, salvo que lo exija la legislación aplicable, exista un error de cobro verificable, o se indique expresamente una política comercial distinta.`,
  },
  {
    n: '9', title: 'Obligaciones del usuario',
    body: `El usuario se compromete a no:\n• Introducir datos falsos o de terceros sin autorización.\n• Interferir con el funcionamiento técnico de la plataforma.\n• Intentar acceder a áreas restringidas.\n• Copiar, revender o explotar comercialmente el servicio sin autorización escrita.\n• Utilizar la plataforma para fines ilícitos o que vulneren derechos de terceros.`,
  },
  {
    n: '10', title: 'Propiedad intelectual e industrial',
    body: `Todos los contenidos, diseños, textos, logotipos, bases de datos, interfaces, código fuente, nombres comerciales y demás elementos de Killer Control son titularidad de Marc Xicola o se utilizan con autorización suficiente.\n\nQueda prohibida la reproducción, distribución, transformación, comunicación pública o explotación total o parcial sin autorización previa y por escrito.`,
  },
  {
    n: '11', title: 'Servicios y enlaces de terceros',
    body: `La plataforma puede mostrar, integrar o enlazar servicios de terceros, incluidos proveedores de pago, autenticación, analítica o enlaces a webs externas.\n\nKiller Control no controla ni asume responsabilidad por la disponibilidad de dichos servicios, sus políticas de privacidad, sus condiciones contractuales, ni los cambios en sus precios, interfaces o procedimientos.`,
  },
  {
    n: '12', title: 'Exclusión de garantías',
    body: `La plataforma se ofrece "tal cual" y según disponibilidad.\n\nMarc Xicola no garantiza que: el servicio esté libre de errores o interrupciones, el acceso sea ininterrumpido o completamente seguro, las recomendaciones de ahorro sean exactas en todos los casos, ni que los datos proporcionados por terceros sean completos, permanentes o actualizados.`,
  },
  {
    n: '13', title: 'Limitación de responsabilidad',
    body: `En la máxima medida permitida por la ley, Marc Xicola no será responsable por daños indirectos, lucro cesante, pérdida de datos, pérdida de oportunidades o perjuicios derivados del uso o imposibilidad de uso de la plataforma, errores introducidos por el usuario, decisiones económicas adoptadas por el usuario, o actuaciones de terceros proveedores.\n\nNada de lo anterior limitará la responsabilidad cuando legalmente no pueda excluirse.`,
  },
  {
    n: '14', title: 'Suspensión o cancelación de cuentas',
    body: `Killer Control podrá suspender o cancelar cuentas, de forma temporal o definitiva, si detecta: incumplimiento de estos Términos, uso fraudulento o abusivo, riesgo para la seguridad del sistema, o requerimiento legal o administrativo.`,
  },
  {
    n: '15', title: 'Protección de datos',
    body: `El tratamiento de datos personales se rige por la Política de Privacidad de la plataforma, que forma parte integrante de estos Términos y Condiciones.`,
  },
  {
    n: '16', title: 'Modificaciones',
    body: `Marc Xicola podrá modificar estos Términos y Condiciones en cualquier momento por motivos legales, técnicos, operativos o comerciales.\n\nCuando los cambios sean relevantes, se informará al usuario por medios razonables: aviso en la web, dentro de la app o por correo electrónico.`,
  },
  {
    n: '17', title: 'Legislación aplicable y jurisdicción',
    body: `Estos Términos y Condiciones se regirán por la legislación de España.\n\nPara cualquier controversia, las partes se someten a los juzgados y tribunales de Mollet del Vallès, salvo que la normativa de consumo aplicable establezca otro fuero imperativo.`,
  },
  {
    n: '18', title: 'Contacto',
    body: `Para cualquier consulta sobre estos Términos y Condiciones:\n\n• Titular: Marc Xicola\n• Email: Killercontrolsupport@gmail.com\n• Dirección: C/ Pau Claris 15, baixos. 08100 Mollet del Vallès`,
  },
];

export default function TermsModal({ open, onClose }) {
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
            className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl flex flex-col max-h-[92vh]"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--border)] shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ScrollText size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg leading-tight">Términos y Condiciones</h2>
                <p className="text-xs text-gray-500 mt-0.5"><span className="text-[#F59E0B]">Killer</span> Control · Última actualización: Marzo 2026</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition shrink-0"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6 no-scrollbar">
              {/* Intro badge */}
              <div className="flex items-start gap-3 bg-[var(--primary)]/5 border border-[var(--primary)]/15 rounded-2xl px-4 py-3">
                <Shield size={16} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Lee detenidamente estos términos antes de usar <span className="text-[#F59E0B]">Killer</span> Control. Al acceder o usar la plataforma, aceptas estas condiciones en su totalidad.
                </p>
              </div>

              {/* Sections */}
              {SECTIONS.map(s => (
                <div key={s.n} className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-full shrink-0">
                      Art. {s.n}
                    </span>
                    <h3 className="font-bold text-white text-sm">{s.title}</h3>
                  </div>
                  <div className="pl-0 text-sm text-gray-400 leading-relaxed whitespace-pre-line border-l-2 border-[var(--border)] pl-4">
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
            <div className="px-6 py-4 border-t border-[var(--border)] shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-[var(--primary)] text-[var(--bg)] font-bold rounded-2xl py-3.5 hover:opacity-90 transition text-sm"
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
