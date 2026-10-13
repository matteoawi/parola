import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {literacyMatches,literacyChoices,literacyQueue,literacyKey,sanitizeLiteracySessions} from '../src/literacy.mjs';
import {newProgress,validateProgress,mergeProgress,updateMemory,supportText,makePairs,routeKey} from '../src/engine.mjs';
const A=JSON.parse(fs.readFileSync(new URL('../data/alphabet.json',import.meta.url)));
const C=JSON.parse(fs.readFileSync(new URL('../data/course.json',import.meta.url)));
test('all four scripts have their full core alphabet and distinct, localized learning objectives',()=>{
 const sizes={it:21,en:26,ru:33,ar:28},ids=new Set();
 for(const [lang,catalog] of Object.entries(A)){
  assert.equal(catalog.letters.length,sizes[lang]);assert.equal(catalog.direction,lang==='ar'?'rtl':'ltr');
  assert.ok(catalog.lessons.some(l=>l.id==='first_words'));
  for(const lesson of catalog.lessons){for(const ui of ['it','en','ar','ru']){assert.ok(lesson.title[ui]);assert.ok(lesson.note[ui]);}
   for(const card of lesson.cards){assert.ok(!ids.has(card.id));ids.add(card.id);assert.ok(literacyMatches(card,card.model));const choices=literacyChoices(card,lesson,()=>.5);assert.ok(choices.length>=2);assert.equal(choices.filter(x=>literacyMatches(card,x)).length,1);}
  }
 }
 assert.equal(ids.size,294);
 const arabic=A.ar.letters.filter(l=>!l.joinsLeft);
 assert.equal(arabic.map(l=>l.symbol).join(''),'ادذرزو');
 for(const l of arabic){assert.equal(l.forms[1],null);assert.equal(l.forms[2],null);assert.ok(l.forms[3]);}
});
test('literacy preserves Arabic vowel marks, hamza, Russian yo and Italian accents',()=>{
 for(const [correct,wrong] of [['بَ','بِ'],['بْ','ب'],['أ','ا'],['ة','ه'],['ى','ي'],['ё','е'],['а','a'],['è','e'],['sì','si']])assert.equal(literacyMatches({model:correct},wrong),false);
 assert.equal(literacyMatches({model:'بَّ'},'بَّ'),true,'combining-mark canonical order');
 assert.equal(literacyMatches({model:'è'},'e\u0300'),true,'decomposed Unicode');
 assert.equal(literacyMatches({model:'ب'},'ـبـ'),true,'joining shape normalized to base character');
 assert.equal(literacyMatches({model:'ё'},'Ё'),true,'case variants');
 assert.equal(literacyMatches({model:'Ciao!',kind:'phrases'},'ciao'),true,'final phrase punctuation is optional');
 const lesson=A.ar.lessons[0];assert.deepEqual(literacyChoices(lesson.cards[0],lesson),literacyChoices(lesson.cards[0],lesson),'choices do not move while retrying');
});
test('six-item queues prioritize unlearned skills, never count assisted recall as mastery',()=>{
 const lesson=A.ru.lessons.find(l=>l.id==='letters_1'),memory={};
 const first=lesson.cards[0],key=literacyKey('ru','write',first.id);
 memory[key]=updateMemory(null,true,true);assert.ok(literacyQueue(lesson,memory,'ru','write').includes(first.id));
 memory[key]=updateMemory(null,true,false);assert.ok(!literacyQueue(lesson,memory,'ru','write').includes(first.id));
 assert.ok(literacyQueue(lesson,memory,'ru','recognize').includes(first.id),'skills remain separate');
 assert.equal(literacyQueue(lesson,memory,'ru','listen',()=>false).length,0,'no phantom listening');
 assert.ok(literacyQueue(lesson,{},'ru','write').length<=6);
});
test('monolingual routes have semantic clues for every phrase and preserve language-specific saves',()=>{
 for(const lang of ['it','en','ar','ru']){
  assert.equal(routeKey({target:lang,support:lang}),`${lang}>${lang}`);
  for(const item of [...C.items,...C.vocab]){const clue=supportText(item,lang,lang);assert.ok(clue);assert.notEqual(clue,item.text[lang]);}
  const board=makePairs(C.items.slice(0,3),lang,lang);
  assert.ok(board.every(t=>t.lang===lang));
  assert.ok(board.some(t=>t.type==='support'&&t.text===C.items[0].clue[lang]));
  const p=newProgress();p.settings={...p.settings,target:lang,support:lang,ui:lang};
  p.alphabetSessions[lang]={lesson:A[lang].lessons[0].id,skill:'write',queue:[A[lang].lessons[0].cards[0].id],index:0,answer:'draft',heard:true};
  p.memory[literacyKey(lang,'write',A[lang].lessons[0].cards[0].id)]=updateMemory(null,true,false);
  const clean=validateProgress(p);assert.equal(clean.alphabetSessions[lang].answer,'draft');assert.equal(clean.alphabetSessions[lang].heard,false,'audio must be heard again after reload');
  assert.ok(mergeProgress(newProgress(),p).memory[literacyKey(lang,'write',A[lang].lessons[0].cards[0].id)]);
 }
 assert.throws(()=>supportText({text:{it:'same'},clue:{it:'same'}},'it','it'));
});
test('malformed literacy sessions cannot break resume or create arbitrary exercise ids',()=>{
 assert.deepEqual(sanitizeLiteracySessions({it:{lesson:'bad',skill:'write',queue:['x'],index:2}}),{});
 assert.deepEqual(sanitizeLiteracySessions({it:{lesson:'bad',skill:'write',queue:['<script>'],index:0}}),{});
 assert.deepEqual(sanitizeLiteracySessions({it:{lesson:'bad',skill:'write',queue:['x','x'],index:0}}),{});
});
