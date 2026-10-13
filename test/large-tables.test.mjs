import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {geometry,free,makePairs,pairHint,rng,newProgress,validateProgress} from '../src/engine.mjs';
import {TABLE_FORMATS} from '../src/progression.mjs';
import {parseChallenge} from '../src/adventure.mjs';
import {literacyPool,literacyQueue,sanitizeLiteracySessions} from '../src/literacy.mjs';
import {alphabetTable,shuffleAlphabet} from '../src/alphabet-mahjong.mjs';
const course=JSON.parse(fs.readFileSync(new URL('../data/course.json',import.meta.url))),alphabet=JSON.parse(fs.readFileSync(new URL('../data/alphabet.json',import.meta.url)));
test('32 and 52 tile tables have six columns, three supported layers and solvable pairs',()=>{
 for(const n of [32,52])for(const seed of [1,17,2026]){const positions=geometry(n);assert.equal(positions.length,n);assert.equal(Math.max(...positions.map(t=>t.x)),5);assert.equal(Math.max(...positions.map(t=>t.z)),2);assert.equal(new Set(positions.map(t=>`${t.x}:${t.y}:${t.z}`)).size,n);for(const t of positions.filter(t=>t.z))assert.ok(positions.some(b=>b.z===t.z-1&&b.x===t.x&&b.y===t.y));assert.ok(positions.some(t=>!free(t,positions)));const board=makePairs(course.items.slice(0,n/2),'ru','it',rng(seed));while(board.some(t=>!t.gone)){const hint=pairHint(board);assert.equal(hint.length,2);for(const id of hint)board.find(t=>t.id===id).gone=true;}}
});
test('all alphabets can form 26 unique material pairs and preserve their saved layout',()=>{
 for(const [lang,c] of Object.entries(alphabet)){const lesson=literacyPool(c,c.lessons[0]),queue=literacyQueue(lesson,{},lang,'recognize',()=>true,26);assert.equal(queue.length,26);assert.equal(new Set(queue).size,26);const s={lesson:lesson.id,skill:'recognize',tableFormat:'marathon',queue,index:0};const board=alphabetTable(s,lesson,lang);assert.equal(board.length,52);const pair=pairHint(board);s.mahjong.completed.push(board.find(t=>t.id===pair[0]).itemId);const loaded=sanitizeLiteracySessions({[lang]:s})[lang];assert.equal(loaded.queue.length,26);assert.deepEqual(loaded.mahjong.layout,s.mahjong.layout);shuffleAlphabet(loaded,lesson,lang);assert.equal(alphabetTable(loaded,lesson,lang).filter(t=>t.gone).length,2);}
});
test('new formats, legacy links and one-time default migration remain coherent',()=>{
 assert.equal(TABLE_FORMATS.marathon*2,52);const ids=course.units.map(u=>u.id);for(const format of Object.keys(TABLE_FORMATS))assert.equal(parseChallenge(`unit=greetings&mode=pair&route=it%3Eru&seed=17&format=${format}&score=88`,ids).tableFormat,format);
 const p=newProgress();assert.equal(p.settings.tableFormat,'grand');p.settings.tableFormat='classic';assert.equal(validateProgress(p).settings.tableFormat,'classic');delete p.settings.tablePreferencesVersion;assert.equal(validateProgress(p).settings.tableFormat,'grand');p.settings.tableFormat='focus';assert.equal(validateProgress(p).settings.tableFormat,'focus');
});
