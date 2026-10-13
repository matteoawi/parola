import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {norm,tokens} from '../src/engine.mjs';
const read=name=>JSON.parse(fs.readFileSync(new URL('../'+name,import.meta.url),'utf8'));
const manifest=read('audio/manifest.json'),course=read('data/course.json'),alphabet=read('data/alphabet.json');
test('Arabic pack covers all authored phrases, alternatives, vocabulary and component words',()=>{
 assert.ok(manifest.languages.includes('ar'));assert.ok(!manifest.missingLanguages.includes('ar'));
 for(const item of [...course.items,...course.vocab])for(const text of [item.text.ar,...(item.accepted?.ar||[])])for(const part of [text,...tokens(text)]){
  const key='ar|'+norm(part,'ar');assert.ok(manifest.entries[key],`${item.id}: ${key}`);
 }
});
test('all Arabic alphabet sounds retain their distinct context and real included file',()=>{
 let cards=0;
 for(const lesson of alphabet.ar.lessons)for(const card of lesson.cards){
  const key='ar|'+norm(card.speech,'ar')+'|'+(card.context||'alpha_'+card.id),entry=manifest.entries[key];
  assert.ok(entry,key);assert.equal(entry.lang,'ar');assert.match(entry.voice,/Microsoft Hoda/);
  const file=new URL('../'+entry.path,import.meta.url);assert.ok(fs.statSync(file).size>=500);assert.equal(fs.statSync(file).size,entry.bytes);cards++;
 }
 assert.equal(cards,134);
});
