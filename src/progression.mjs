/** Local progression: deterministic challenges and rewards backed by unique activities. */
export const TABLE_FORMATS={focus:3,classic:6,explorer:9};
export const BADGES=['first','mono','traveller','alphabet','writer','combo','explorer','habit'];
export function seedFor(text){return Array.from(text).reduce((n,c)=>Math.imul(n^c.charCodeAt(0),16777619),2166136261)>>>0;}
export function challengePlan(day,route,units){const seed=seedFor(day+'|'+route);return {day,unit:units[seed%units.length].id,mode:['pair','write','complete','compose'][(seed>>>8)%4],seed};}
export function practiceStreak(days,today){const known=new Set(days);let day=today,n=0;if(!known.has(day))day=previousDay(day);while(known.has(day)){n++;day=previousDay(day);}return n;}
function previousDay(day){return new Date(Date.parse(day+'T12:00:00Z')-86400000).toISOString().slice(0,10);}
export function dailyGoals(record={}){return [{id:'table',current:record.games?.length||0,total:1},{id:'answers',current:record.answers?.length||0,total:5},{id:'practice',current:Math.max(record.alphabet?.length||0,(record.reviews?.length||0)*2),total:6}];}
export function dailyComplete(record){return dailyGoals(record).every(g=>g.current>=g.total);}
export function progressionBonus(daily={}){return Object.values(daily).reduce((sum,d)=>sum+(dailyComplete(d)?30:0)+Object.values(d.challenges||{}).filter(c=>c.completed).length*15,0);}
export function playerLevel(xp){const level=1+Math.floor(Math.sqrt(Math.max(0,xp)/60)),start=60*(level-1)**2,end=60*level**2;return {level,current:Math.max(0,xp-start),needed:end-start,remaining:end-xp};}
export function sanitizeDaily(daily){const out={};for(const [day,d]of Object.entries(daily||{}).filter(([day])=>/^\d{4}-\d{2}-\d{2}$/.test(day)&&Number.isFinite(Date.parse(day+'T12:00:00Z'))).sort().slice(-730)){
 if(!d||typeof d!=='object')continue;const clean={};
 for(const key of ['games','answers','alphabet','reviews','formats'])clean[key]=[...new Set((Array.isArray(d[key])?d[key]:[]).filter(v=>typeof v==='string'&&v.length<=160&&/^[a-zA-Z0-9_>|:.-]+$/.test(v)))].slice(0,300);
 clean.bestCombo=Math.min(12,Math.max(0,Number.isFinite(d.bestCombo)?Math.floor(d.bestCombo):0));clean.challenges={};
 for(const [route,c]of Object.entries(d.challenges||{}).slice(0,16))if(/^(it|en|ar|ru)>(it|en|ar|ru)$/.test(route)&&c&&typeof c.unit==='string'&&/^[a-z_0-9]+$/.test(c.unit)&&['pair','write','complete','compose'].includes(c.mode))clean.challenges[route]={unit:c.unit,mode:c.mode,completed:Boolean(c.completed),score:Math.min(10000,Math.max(0,Number.isFinite(c.score)?c.score:0))};
 out[day]=clean;
 }return out;}
export function mergeDaily(a,b){const out=sanitizeDaily(a);for(const [day,entry]of Object.entries(sanitizeDaily(b))){if(!out[day]){out[day]=entry;continue;}const d=out[day];for(const key of ['games','answers','alphabet','reviews','formats'])d[key]=[...new Set([...d[key],...entry[key]])];d.bestCombo=Math.max(d.bestCombo,entry.bestCombo);for(const [route,c]of Object.entries(entry.challenges)){const old=d.challenges[route];if(!old||c.score>old.score||c.completed&&!old.completed)d.challenges[route]=c;}}return sanitizeDaily(out);}
export function earnedBadges(progress){const missions=Object.entries(progress.missions||{}),daily=Object.values(progress.daily||{}),earned=new Set(progress.awards||[]);
 if(missions.length)earned.add('first');
 if(missions.some(([key])=>{const [a,b]=key.split('|')[0].split('>');return a===b&&!key.includes('|alpha_')}))earned.add('mono');
 if(new Set(missions.map(([key])=>key.split('|')[0].split('>')[1])).size>=2)earned.add('traveller');
 if(Object.entries(progress.memory||{}).filter(([key,m])=>(key.includes('|alpha_recognize|')||key.includes('|alpha_write|'))&&m.independent>0).length>=10)earned.add('alphabet');
 if(missions.filter(([key])=>key.includes('|write|')).length>=5)earned.add('writer');
 if(daily.some(d=>d.bestCombo>=8))earned.add('combo');
 if(daily.some(d=>d.formats.includes('explorer')))earned.add('explorer');
 if(progress.days.length>=7)earned.add('habit');
 return BADGES.filter(id=>earned.has(id));
}
