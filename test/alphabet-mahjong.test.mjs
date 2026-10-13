import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {alphabetTable,shuffleAlphabet} from '../src/alphabet-mahjong.mjs';
import {free,pairHint} from '../src/engine.mjs';
import {sanitizeLiteracySessions} from '../src/literacy.mjs';
const alphabet=JSON.parse(fs.readFileSync(new URL('../data/alphabet.json',import.meta.url)));
test('all literacy lessons have real, solvable Mahjong geometry in all three skills',()=>{
 for(const [lang,course] of Object.entries(alphabet))for(const lesson of course.lessons)for(const skill of ['recognize','listen','write']){
  const s={lesson:lesson.id,skill,queue:lesson.cards.slice(0,6).map(c=>c.id),index:0};let board=alphabetTable(s,lesson,lang);
  assert.equal(board.length,s.queue.length*2);if(board.length>=8)assert.ok(board.some(t=>!free(t,board)));
  while(s.mahjong.completed.length<s.queue.length){const pair=pairHint(board);assert.equal(pair.length,2);assert.equal(board.find(t=>t.id===pair[0]).itemId,board.find(t=>t.id===pair[1]).itemId);s.mahjong.completed.push(board.find(t=>t.id===pair[0]).itemId);board=alphabetTable(s,lesson,lang);}
 }
});
test('resume preserves out-of-order pairs and layout; shuffle has a valid remaining solution',()=>{
 const lesson=alphabet.ru.lessons[0],s={lesson:lesson.id,skill:'write',queue:lesson.cards.slice(0,6).map(c=>c.id),index:0};const board=alphabetTable(s,lesson,'ru'),pair=pairHint(board),id=board.find(t=>t.id===pair[0]).itemId;s.mahjong.completed.push(id);s.index=1;s.mahjong.unlocked.push(id);
 const loaded=sanitizeLiteracySessions({ru:s}).ru;assert.deepEqual(loaded.mahjong.layout,s.mahjong.layout);assert.deepEqual(loaded.mahjong.completed,[id]);shuffleAlphabet(loaded,lesson,'ru');assert.equal(alphabetTable(loaded,lesson,'ru').filter(t=>t.gone).length,2);assert.equal(pairHint(alphabetTable(loaded,lesson,'ru')).length,2);
 loaded.mahjong.layout[0]={itemId:'fake',type:'target'};assert.equal(sanitizeLiteracySessions({ru:loaded}).ru.mahjong.layout,null);
});
test('legacy completed answers migrate without rewarding or replaying completed items',()=>{
 const lesson=alphabet.it.lessons[0],s={lesson:lesson.id,skill:'recognize',queue:lesson.cards.slice(0,6).map(c=>c.id),index:2,feedback:true};const board=alphabetTable(s,lesson,'it');assert.equal(s.mahjong.completed.length,3);assert.equal(board.filter(t=>t.gone).length,6);
});
