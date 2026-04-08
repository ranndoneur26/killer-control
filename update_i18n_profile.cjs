const fs = require('fs');

const esPath = 'src/messages/es.json';
const enPath = 'src/messages/en.json';

const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Delete the old separate 'danger_zone' key from previous step to avoid duplication
delete es.danger_zone;
delete en.danger_zone;

es.profile = {
  "personal": {
    "title": "Perfil personal",
    "subtitle": "Actualiza tus datos personales y tu avatar.",
    "avatarUrl": "URL del avatar",
    "displayName": "Nombre para mostrar",
    "namePlaceholder": "Tu nombre Killer",
    "email": "Dirección de correo electrónico",
    "emailNote": "Para cambiar tu correo, ponte en contacto con el servicio de asistencia para la verificación de seguridad.",
    "password": "Contraseña",
    "resetPassword": "Enviar correo electrónico para restablecer la contraseña",
    "save": "Guardar cambios"
  },
  "payment": {
    "title": "Plan de suscripción",
    "subtitle": "Gestiona tu facturación y los detalles de tu plan.",
    "freePlan": "PLAN GRATUITO",
    "upgradeTitle": "Actualiza a Premium",
    "upgradeDesc": "Obtén suscripciones ilimitadas, alertas inteligentes y análisis avanzados. Sin compromisos, cancela cuando quieras.",
    "startTrial": "Comienza tu prueba gratuita",
    "zeroFrictionLabel": "Política de cero fricciones:",
    "zeroFrictionDesc": "Cancelar tu suscripción no elimina tus datos. Tu cuenta simplemente volverá al plan gratuito al final de tu período de facturación. Puedes reactivarla cuando quieras para recuperar el acceso completo."
  },
  "notifications": {
    "title": "Preferencias",
    "subtitle": "Personaliza tu experiencia con Killer Control.",
    "currency": "Moneda base",
    "currencyDesc": "Tu panel de control mostrará los totales en esta moneda.",
    "sectionTitle": "NOTIFICACIONES Y ALERTAS",
    "monthlySummary": "Resumen mensual",
    "monthlySummaryDesc": "Recibe un informe mensual de tus gastos.",
    "smartAlerts": "Alertas de precios inteligentes",
    "smartAlertsDesc": "Recibe notificaciones cuando aumenten los precios de las suscripciones.",
    "premiumOnly": "SOLO PREMIUM"
  },
  "danger": {
    "title": "Zona de peligro",
    "subtitle": "Acciones irreversibles. Procede con precaución.",
    "exportSection": "EXPORTAR DATOS",
    "exportTitle": "Descarga tu información",
    "exportDesc": "Obtén una copia de tus suscripciones y perfil.",
    "exportBtn": "Exportar CSV / PDF",
    "deleteSection": "ELIMINAR CUENTA",
    "deleteTitle": "Eliminar cuenta permanentemente",
    "deleteDesc": "Una vez que elimines tu cuenta, no hay vuelta atrás. Todas tus suscripciones, historial y configuraciones se borrarán para siempre.",
    "deleteBtn": "Eliminar cuenta"
  }
};

en.profile = {
  "personal": {
    "title": "Personal Profile",
    "subtitle": "Update your personal details and avatar.",
    "avatarUrl": "Avatar URL",
    "displayName": "Display Name",
    "namePlaceholder": "Your Killer Name",
    "email": "Email Address",
    "emailNote": "To change your email, please contact support for security verification.",
    "password": "Password",
    "resetPassword": "Send password reset email",
    "save": "Save Changes"
  },
  "payment": {
    "title": "Subscription Plan",
    "subtitle": "Manage your billing and plan details.",
    "freePlan": "FREE PLAN",
    "upgradeTitle": "Upgrade to Premium",
    "upgradeDesc": "Get unlimited subscriptions, smart alerts, and advanced insights. No commitments, cancel anytime.",
    "startTrial": "Start Free Trial",
    "zeroFrictionLabel": "Zero Friction Policy:",
    "zeroFrictionDesc": "Canceling your subscription does not delete your data. Your account will simply revert to the Free plan at the end of your billing period. You can reactivate anytime to regain full access."
  },
  "notifications": {
    "title": "Preferences",
    "subtitle": "Customize your Killer Control experience.",
    "currency": "Base Currency",
    "currencyDesc": "Your dashboard will display totals in this currency.",
    "sectionTitle": "NOTIFICATIONS & ALERTS",
    "monthlySummary": "Monthly Summary",
    "monthlySummaryDesc": "Receive a monthly report of your spending.",
    "smartAlerts": "Smart Price Alerts",
    "smartAlertsDesc": "Get notified when subscriptions increase price.",
    "premiumOnly": "PREMIUM ONLY"
  },
  "danger": {
    "title": "Danger Zone",
    "subtitle": "Irreversible actions. Proceed with caution.",
    "exportSection": "EXPORT DATA",
    "exportTitle": "Download your data",
    "exportDesc": "Get a copy of your subscriptions and profile.",
    "exportBtn": "Export CSV / PDF",
    "deleteSection": "DELETE ACCOUNT",
    "deleteTitle": "Permanently delete account",
    "deleteDesc": "Once you delete your account, there is no going back. All your subscriptions, history and settings will be permanently erased.",
    "deleteBtn": "Delete account"
  }
};

fs.writeFileSync(esPath, JSON.stringify(es, null, 2) + "\n");
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n");
console.log("JSON updated successfully.");
