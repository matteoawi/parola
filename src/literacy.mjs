/** Strict literacy assessment: accents, dots, vowel marks and script identity matter. */
export const ALPHA_SKILLS=['recognize','write','listen'];
export function literacyNorm(value,caseSensitive=false){
 const text=String(value).normalize('NFKC').replace(/[\u0640\u200C\u200D\u200E\u200F]/g,'').trim().normalize('NFC');
 return caseSensitive?text:text.toLowerCase();
}
export function literacyMatches(card,value){const normalize=text=>literacyNorm(text,card.caseSensitive).replace(card.kind==='phrases'?/[.!?؟]+$/g:/$^/g,'');return (card.answers||[card.model]).some(answer=>normalize(answer)===normalize(value));}
export function literacyKey(lang,skill,id){return `${lang}>${lang}|alpha_${skill}|${id}`;}
export function literacyMastered(memory,lang,skill,card){const m=memory[literacyKey(lang,skill,card.id)];return Boolean(m?.correct&&!m.assisted&&m.independent>0);}
export function literacyQueue(lesson,memory,lang,skill,available=()=>true,limit=6){
 const cards=lesson.cards.filter(card=>skill!=='listen'||available(card));
 const pending=cards.filter(card=>!literacyMastered(memory,lang,skill,card));
 const review=[...cards].sort((a,b)=>(memory[literacyKey(lang,skill,a.id)]?.due||0)-(memory[literacyKey(lang,skill,b.id)]?.due||0));
 return (pending.length?pending:review).slice(0,limit).map(card=>card.id);
}
export function literacyChoices(card,lesson,random=null){
 if(!random){let seed=Array.from(card.id).reduce((n,c)=>Math.imul(n^c.charCodeAt(0),16777619),2166136261)>>>0;random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
 const options=[card.model];
 for(const other of lesson.cards){if(options.length>=4)break;if(!options.some(x=>literacyNorm(x,true)===literacyNorm(other.model,true))&&!literacyMatches(card,other.model))options.push(other.model);}
 for(const value of card.distractors||[]){if(options.length>=4)break;if(!options.includes(value)&&!literacyMatches(card,value))options.push(value);}
 for(let i=options.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[options[i],options[j]]=[options[j],options[i]];}
 return options;
}
export function sanitizeLiteracySessions(sessions){
 const out={};
 for(const lang of ['it','en','ar','ru']){
  const s=sessions?.[lang];if(!s||!ALPHA_SKILLS.includes(s.skill)||typeof s.lesson!=='string'||!/^[a-z_0-9]{1,80}$/.test(s.lesson)||!Array.isArray(s.queue)||!s.queue.length||s.queue.length>6||new Set(s.queue).size!==s.queue.length||s.queue.some(id=>typeof id!=='string'||!/^[a-z_0-9]{1,80}$/.test(id))||!Number.isInteger(s.index)||s.index<0||s.index>s.queue.length)continue;
  out[lang]={lesson:s.lesson,skill:s.skill,queue:[...new Set(s.queue)],index:s.index,answer:String(s.answer||'').slice(0,100),errors:Math.max(0,Math.min(1000,Number(s.errors)||0)),assisted:Boolean(s.assisted),heard:false,feedback:s.feedback===true?true:s.feedback===false?false:null};
 }
 return out;
}
