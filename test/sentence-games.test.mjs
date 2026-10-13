import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {LAB_IDS,LAB_LINK,wordTableSize,labCatalog,validateLabSentence,makeLabBoard,clozeIndex,makeClozeBoard,labPairHint,labModel,continueLabBoard} from '../src/sentence-games.mjs';
import {missionXP,tableAchievementFormat} from '../src/progression.mjs';
import {tokens,norm,rng,freeTiles,canSpell,sequenceHint,repairSequence} from '../src/engine.mjs';
const course=JSON.parse(fs.readFileSync(new URL('../data/course.json',import.meta.url))),items=[...course.items,...course.vocab],lab=LAB_IDS.map(id=>items.find(i=>i.id===id));
test('four language grammars accept supported combinations and reward length, reject agreement errors and repeated clauses',()=>{
 for(const lang of course.languages){const catalog=labCatalog(lab,lang),a=catalog[0].text,b=catalog[1].text,c=catalog[2].text;const short=validateLabSentence(tokens(a),lab,lang),long=validateLabSentence(tokens([a,b,c].join(' '+LAB_LINK[lang]+' ')),lab,lang);assert.ok(short.ok&&long.ok);assert.ok(long.points>short.points);assert.equal(long.clauses,3);assert.equal(validateLabSentence(tokens(a+' '+LAB_LINK[lang]+' '+a),lab,lang).ok,false);assert.equal(validateLabSentence(tokens(LAB_LINK[lang]+' '+a),lab,lang).ok,false);assert.equal(validateLabSentence(tokens(a+' '+LAB_LINK[lang]),lab,lang).ok,false);assert.equal(validateLabSentence(tokens(Array(5).fill(a).join(' '+LAB_LINK[lang]+' ')),lab,lang).ok,false);}
 for(const [lang,text]of [['it','Io beve acqua'],['en','He drink water'],['ru','Я пьёт чай'],['ar','هو أشرب الماء'],['it','Io leggo acqua']])assert.equal(validateLabSentence(tokens(text),lab,lang).ok,false,text);
});
test('every lab board provides an accessible pair and a long sentence, using only introduced source words',()=>{
 for(const lang of course.languages)for(const format of ['focus','classic','explorer','grand','marathon'])for(let round=0;round<5;round++){
  const board=makeLabBoard(lab,lang,format,rng(122+round),round);assert.equal(board.length,wordTableSize(format));assert.equal(labPairHint(board,lang).length,2);
  for(const tile of board)assert.ok(tokens(items.find(i=>i.id===tile.itemId).text[lang]).includes(tile.text),'unknown played word');
  const catalog=labCatalog(lab,lang),sentence=catalog[round].text+' '+LAB_LINK[lang]+' '+catalog[round+1].text;assert.ok(canSpell(tokens(sentence),board,lang));
  // Taking the optional pair cannot be allowed to break later rounds: each new round refills.
  let work=board;for(const word of tokens(sentence)){if(!sequenceHint(work,word,lang).length)work=repairSequence(work,[word],lang,rng(5));const id=sequenceHint(work,word,lang)[0];assert.ok(id!=null);work.find(t=>t.id===id).gone=true;}
 }
});
test('cloze contains one known answer reachable by Mahjong rules, distractors, all languages and formats',()=>{
 const examples=course.items.filter(i=>i.unitId==='habits');
 for(const lang of course.languages)for(const format of ['focus','grand','marathon'])for(const [round,item]of examples.entries()){
  const index=clozeIndex(item,lang,4321,round),answer=tokens(item.text[lang])[index],board=makeClozeBoard(examples,item,lang,index,format,rng(4321));assert.equal(board.length,wordTableSize(format));assert.ok(freeTiles(board).some(t=>norm(t.text,lang)===norm(answer,lang)));assert.ok(board.some(t=>norm(t.text,lang)!==norm(answer,lang)));assert.ok(index>=0&&index<tokens(item.text[lang]).length);
 }
});
test('picture vocabulary is distinct, has all translations, mono clues, assets and no ambiguous coffee/tea drawing',()=>{
 const pictures=course.vocab.filter(i=>i.picture);assert.equal(pictures.length,8);assert.equal(new Set(pictures.map(i=>i.picture)).size,8);for(const item of pictures){assert.ok(fs.existsSync(new URL('../'+item.picture.slice(2),import.meta.url)));for(const lang of course.languages){assert.ok(item.text[lang]&&item.clue[lang]);assert.notEqual(norm(item.text[lang],lang),norm(item.clue[lang],lang));}}
});
test('lab can continue valid models without paid help and all bank words belong to a recognised structure',()=>{
 for(const lang of course.languages)for(let seed=0;seed<25;seed++){
  let board=makeLabBoard(lab,lang,'grand',rng(seed)),catalog=labCatalog(lab,lang),prefix=[];
  const allowed=new Set([...catalog.flatMap(c=>tokens(c.text).map(w=>norm(w,lang))),LAB_LINK[lang]]);assert.ok(board.every(t=>allowed.has(norm(t.text,lang))));
  for(let i=0;i<30;i++){const model=labModel(board,lab,lang,[],prefix,true);if(!model)break;const continued=continueLabBoard(board,prefix,lab,lang,[],rng(seed+i));board=continued.board;const id=sequenceHint(board,model.remaining[0],lang)[0];assert.ok(id!=null,'forced shuffle on a supported continuation');const tile=board.find(t=>t.id===id);tile.gone=true;prefix.push(tile.text);if(validateLabSentence(prefix,lab,lang).clauses>=2)break;}
  assert.ok(validateLabSentence(prefix,lab,lang).ok);assert.ok(validateLabSentence(prefix,lab,lang).clauses>=2);
 }
});
test('hints and models follow three and four coordinated clauses, including an already used short sentence',()=>{
 for(const lang of course.languages)for(const count of [3,4]){
  const catalog=labCatalog(lab,lang),words=tokens(catalog.slice(0,count).map(c=>c.text).join(' '+LAB_LINK[lang]+' ')),prefix=words.slice(0,-1),board=words.slice(-1).map((text,id)=>({text,id,gone:false})),model=labModel(board,lab,lang,[],prefix,true);
  assert.ok(model);assert.equal(norm(model.text,lang),norm(words.join(' '),lang));assert.deepEqual(model.remaining,words.slice(-1));
 }
});
test('XP matches total progression across rounding boundaries; picture and word formats award real board size',()=>{
 assert.equal(missionXP(9,0,1),1);assert.equal(missionXP(15,15,21),1);assert.equal(missionXP(15,15,14),0);assert.equal(missionXP(23,0,5),0);
 assert.equal(tableAchievementFormat({mode:'picture',tableFormat:'explorer',board:Array(16)}),'classic');assert.equal(tableAchievementFormat({mode:'compose',sentenceVersion:2,tableFormat:'marathon',board:Array(52)}),'marathon');assert.equal(tableAchievementFormat({mode:'complete',sentenceVersion:2,tableFormat:'classic',board:Array(24)}),'explorer');assert.equal(tableAchievementFormat({mode:'complete',tableFormat:'grand',board:Array(15)}),'classic');
});
