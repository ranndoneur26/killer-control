const fs = require('fs');
const en = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('src/messages/es.json', 'utf8'));

function flattenObj(obj, parent = '', res = {}) {
    for (let key in obj) {
        let propName = parent ? parent + '.' + key : key;
        if (typeof obj[key] == 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

const flatEn = flattenObj(en);
const flatEs = flattenObj(es);

let missing = [];
let englishInEs = [];
let badKiller = [];
let badPremium = [];

for (let key in flatEn) {
    if (!flatEs.hasOwnProperty(key)) {
        missing.push(key);
    } else {
        if (flatEs[key] === flatEn[key] && /[a-zA-Z]/.test(flatEs[key]) && !flatEs[key].includes('Killer') && !flatEs[key].includes('Premium')) {
            englishInEs.push(key + ': ' + flatEs[key]);
        }
        if (typeof flatEs[key] === 'string' && flatEs[key].toLowerCase().includes('asesino')) {
            badKiller.push(key + ' = ' + flatEs[key]);
        }
        if (typeof flatEs[key] === 'string' && flatEs[key].toLowerCase().includes('primera calidad')) {
            badPremium.push(key + ' = ' + flatEs[key]);
        }
    }
}
console.log("MISSING IN ES:", missing.length > 0 ? missing : "None");
console.log("\nASESINO matches:", badKiller.length > 0 ? badKiller : "None");
console.log("\nPRIMERA CALIDAD matches:", badPremium.length > 0 ? badPremium : "None");
console.log("\nUNTANSLATED (Same as EN):", englishInEs.length > 0 ? englishInEs.slice(0, 50) : "None");
