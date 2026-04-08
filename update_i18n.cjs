const fs = require('fs');

const esPath = 'src/messages/es.json';
const enPath = 'src/messages/en.json';

const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

es.danger_zone = {
  delete_title: "Eliminar cuenta permanentemente",
  delete_desc: "Una vez que elimines tu cuenta, no hay vuelta atrás. Todas tus suscripciones, historial y configuraciones se borrarán para siempre.",
  delete_btn: "Eliminar cuenta",
  delete_heading: "ELIMINAR CUENTA",
  export_heading: "EXPORTAR DATOS",
  export_title: "Descarga tu información",
  export_desc: "Obtén una copia de tus suscripciones y perfil.",
  export_btn: "Exportar CSV / PDF"
};

en.danger_zone = {
  delete_title: "Permanently delete account",
  delete_desc: "Once you delete your account, there is no going back. All your subscriptions, history and settings will be permanently deleted.",
  delete_btn: "Delete account",
  delete_heading: "DELETE ACCOUNT",
  export_heading: "EXPORT DATA",
  export_title: "Download your data",
  export_desc: "Get a copy of your subscriptions and profile.",
  export_btn: "Export CSV / PDF"
};

fs.writeFileSync(esPath, JSON.stringify(es, null, 2) + "\n");
fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n");

console.log("JSON updated!");
