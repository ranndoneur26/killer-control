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
let asesino = [];
let premium = [];

for (let key in flatEn) {
    if (!flatEs.hasOwnProperty(key)) {
        missing.push(key);
    } else {
        if (flatEs[key] === flatEn[key] && /[a-zA-Z]/.test(flatEs[key]) && !flatEs[key].includes('Killer') && !flatEs[key].includes('Premium')) {
            englishInEs.push(key + ': ' + flatEs[key]);
        }
        if (typeof flatEs[key] === 'string' && flatEs[key].toLowerCase().includes('asesino')) {
            asesino.push(key + ': ' + flatEs[key]);
        }
        if (typeof flatEs[key] === 'string' && flatEs[key].toLowerCase().includes('primera calidad')) {
            premium.push(key + ': ' + flatEs[key]);
        }
    }
}
console.log("MISSING IN ES:", missing.length > 0 ? missing : "None");
console.log("\nUNTANSLATED (Same as EN):", englishInEs.length > 0 ? englishInEs.slice(0, 20) : "None");
console.log("\nASESINO:", asesino.length > 0 ? asesino : "None");
console.log("\nPRIMERA CALIDAD:", premium.length > 0 ? premium : "None");
