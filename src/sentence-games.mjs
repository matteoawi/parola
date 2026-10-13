/** Bounded grammar: authored clauses, compatible beverage slots and coordination.
 * Never infer grammatical agreement by swapping arbitrary words between languages. */
import {norm,tokens,shuffled,makeSequence,canSpell,freeTiles} from './engine.mjs';
export const LAB_IDS=['read','water','english','she_reads','he_drinks','she_speaks','no_coffee','new_book','big_house','new_door','book_table','tea_table','coffee_table','possession_0','possession_1','possession_2','reasons_0','reasons_1','reasons_2','lab_link'];
export const LAB_LINK={it:'e',en:'and',ru:'и',ar:'و'};
export const SENTENCE_GOAL=5;
export function wordTableSize(format){return {focus:24,classic:24,explorer:32,grand:32,marathon:52}[format]||32;}
export function labCatalog(items,lang){
 const byId=new Map(items.map(i=>[i.id,i])),catalog=[];
 for(const id of LAB_IDS.filter(id=>!['lab_link','no_coffee'].includes(id))){const item=byId.get(id);if(item)catalog.push({text:tokens(item.text[lang]).join(' '),sources:[id],family:id});}
 const forms={it:[['Io bevo','water'],['Lui beve','he_drinks']],en:[['I drink','water'],['He drinks','he_drinks']],ru:[['Я пью','water'],['Он пьёт','he_drinks']],ar:[['أنا أشرب','water'],['هو يشرب','he_drinks']]};
 const objects={it:[['acqua','water'],['tè','he_drinks'],['caffè','no_coffee']],en:[['water','water'],['tea','he_drinks'],['coffee','no_coffee']],ru:[['воду','water'],['чай','he_drinks'],['кофе','no_coffee']],ar:[['الماء','water'],['الشاي','he_drinks'],['القهوة','no_coffee']]};
 for(const [subject,source]of forms[lang])for(const [object,origin]of objects[lang])catalog.push({text:subject+' '+object,sources:[source,origin],family:`drink:${subject}:${object}`});
 return [...new Map(catalog.map(c=>[norm(c.text,lang),c])).values()];
}
export function validateLabSentence(words,items,lang){
 if(!words.length||words.length>48)return {ok:false};
 const catalog=labCatalog(items,lang),parts=[],chunk=[];
 for(const word of words){if(norm(word,lang)===LAB_LINK[lang]){if(!chunk.length)return {ok:false};parts.push(chunk.splice(0));}else chunk.push(word);}
 if(!chunk.length)return {ok:false};parts.push(chunk);
 // Coordination is deliberately finite: up to four distinct clauses, no filler loops.
 if(parts.length>4)return {ok:false};
 const clauses=parts.map(p=>catalog.find(c=>norm(c.text,lang)===norm(p.join(' '),lang)));
 if(clauses.some(c=>!c)||new Set(clauses.map(c=>norm(c.text,lang))).size!==clauses.length)return {ok:false};
 const sources=[...new Set(clauses.flatMap(c=>c.sources))];
 return {ok:true,text:words.join(' '),sources,words:words.length,clauses:clauses.length,points:Math.min(1500,30+words.length*8+Math.max(0,words.length-5)**2+20*(clauses.length-1))};
}
export function labPayloads(items,lang){return items.flatMap(item=>tokens(item.text[lang]).map((text,tokenIndex)=>({text,itemId:item.id,lang,tokenIndex,type:'word'})));}
export function labModel(board,items,lang,used=[],prefix=[]){
 const catalog=labCatalog(items,lang),options=[...catalog];
 for(const a of catalog)for(const b of catalog)if(a!==b)options.push({text:a.text+' '+LAB_LINK[lang]+' '+b.text,sources:[...a.sources,...b.sources,'lab_link']});
 return options.find(c=>!used.includes(norm(c.text,lang))&&prefix.every((w,i)=>norm(w,lang)===norm(tokens(c.text)[i]||'',lang))&&canSpell(tokens(c.text).slice(prefix.length),board,lang));
}
export function makeLabBoard(items,lang,format,random=Math.random,round=0,used=[]){
 const payloads=labPayloads(items,lang),catalog=labCatalog(items,lang),a=catalog[round%catalog.length],b=catalog[(round+1)%catalog.length];
 const required=tokens(a.text+' '+LAB_LINK[lang]+' '+b.text),ordered=required.map(word=>({...payloads.find(p=>norm(p.text,lang)===norm(word,lang))}));
 // First two removable tiles form a real simple pair; the model stays available.
 const pair=payloads.find(p=>norm(p.text,lang)===norm(tokens(a.text)[0],lang)&&!used.includes('pair:'+norm(p.text,lang)))||payloads.find(p=>!used.includes('pair:'+norm(p.text,lang)));
 const out=[{...pair},{...pair},...ordered];
 while(out.length<wordTableSize(format))out.push({...shuffled(payloads,random)[0]});
 return makeSequence(out.slice(0,wordTableSize(format)).map((p,i)=>({...p,tokenIndex:i})),random);
}
export function clozeIndex(item,lang,seed,round){const ts=tokens(item.text[lang]),choices=ts.map((w,i)=>({w,i})).filter(x=>x.w.length>2);return (choices.length?choices:ts.map((w,i)=>({w,i})))[((seed>>>0)+round)%(choices.length||ts.length)].i;}
export function makeClozeBoard(items,current,lang,index,format,random=Math.random){
 const payloads=labPayloads(items,lang),answer=tokens(current.text[lang])[index],first=payloads.find(p=>p.itemId===current.id&&p.text===answer),out=[{...first}];
 const distractors=shuffled(payloads.filter(p=>norm(p.text,lang)!==norm(answer,lang)),random);
 while(out.length<wordTableSize(format))out.push({...distractors[(out.length-1)%distractors.length]||first});
 return makeSequence(out.map((p,i)=>({...p,tokenIndex:i})),random);
}
export function labPairHint(board,lang,used=[]){const avail=freeTiles(board);for(const a of avail)for(const b of avail)if(a.id!==b.id&&norm(a.text,lang)===norm(b.text,lang)&&!used.includes('pair:'+norm(a.text,lang)))return [a.id,b.id];return [];}
