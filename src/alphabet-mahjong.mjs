import {geometry,makePairs,rng} from './engine.mjs';
/** The same covered/top/side geometry as phrase Mahjong, with canonical literacy content. */
export function alphabetEntries(session,lesson,lang){const helper=lang==='en'?'it':'en';return session.queue.map(id=>{const card=lesson.cards.find(c=>c.id===id);return {id,text:{[lang]:card.model,[helper]:card.cue}};});}
export function alphabetTable(session,lesson,lang){
 if(!session.mahjong){const completed=session.queue.slice(0,session.index);if(session.feedback===true&&session.queue[session.index])completed.push(session.queue[session.index]);session.mahjong={seed:(Math.random()*4294967296)>>>0,completed,selected:null,focus:null,unlocked:[],heard:[],assisted:[],mistakes:{},hints:[],layout:null};}
 session.index=session.mahjong.completed.length;
 const m=session.mahjong,helper=lang==='en'?'it':'en';
 if(!m.layout)m.layout=makePairs(alphabetEntries(session,lesson,lang),lang,helper,rng(m.seed)).map(t=>({itemId:t.itemId,type:t.type}));
 const cards=new Map(lesson.cards.map(c=>[c.id,c]));
 return geometry(m.layout.length).map((position,i)=>{const tile=m.layout[i],card=cards.get(tile.itemId),sameLetter=session.skill==='recognize'&&card.kind==='letters';return {...position,...tile,pairKey:tile.itemId,lang,text:sameLetter?card.upper||card.model:tile.type==='target'?card.model:card.cue,gone:m.completed.includes(tile.itemId)};});
}
export function shuffleAlphabet(session,lesson,lang){const board=alphabetTable(session,lesson,lang),helper=lang==='en'?'it':'en',m=session.mahjong;m.seed=(Math.random()*4294967296)>>>0;const entries=alphabetEntries(session,lesson,lang).filter(e=>!m.completed.includes(e.id));m.layout=makePairs(entries,lang,helper,rng(m.seed),board).map(t=>({itemId:t.itemId,type:t.type}));m.selected=null;m.hints=[];}
