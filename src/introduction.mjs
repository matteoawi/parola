/** Presentation evidence is separate from having seen, played or mastered an item. */
export function materialSignature(material){return JSON.stringify([material.target,material.support,material.text,material.meaning,material.words||[],material.alternatives||[]]);}
export function presentationKey(material){return material.support+'>'+material.target+'|'+material.id;}
export function wasIntroduced(progress,material){return progress.introduced?.[presentationKey(material)]===materialSignature(material);}
export function missingIntroductions(progress,materials){return materials.filter(material=>!wasIntroduced(progress,material));}
export function recordIntroduction(progress,material){progress.introduced??={};progress.introduced[presentationKey(material)]=materialSignature(material);}
export function sanitizeIntroductions(input){const out={};if(!input||typeof input!=='object'||Array.isArray(input))return out;for(const [key,value]of Object.entries(input).slice(0,5000))if(/^(it|en|ar|ru)>(it|en|ar|ru)\|[a-z_0-9]{1,100}$/.test(key)&&typeof value==='string'&&value.length<=2000){try{const parsed=JSON.parse(value);if(Array.isArray(parsed)&&parsed.length===6)out[key]=value;}catch{}}return out;}
