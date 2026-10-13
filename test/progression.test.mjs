import test from 'node:test';
import assert from 'node:assert/strict';
import {challengePlan,practiceStreak,dailyComplete,progressionBonus,mergeDaily,playerLevel} from '../src/progression.mjs';
import {newProgress,validateProgress,mergeProgress} from '../src/engine.mjs';
test('daily rewards and imported activities do not duplicate XP',()=>{
 const p=newProgress();p.daily['2026-10-13']={games:['game_a'],answers:['a','b','c','d','e'],alphabet:['a','b','c','d','e','f'],reviews:[],formats:['explorer'],bestCombo:9,challenges:{'en>it':{unit:'identity',mode:'pair',completed:true,score:500}}};
 const clean=validateProgress(p);assert.equal(dailyComplete(clean.daily['2026-10-13']),true);assert.equal(progressionBonus(clean.daily),45);
 assert.equal(progressionBonus(mergeDaily(clean.daily,clean.daily)),45);assert.equal(progressionBonus(mergeProgress(clean,clean).daily),45);
 assert.equal(mergeProgress(clean,clean).daily['2026-10-13'].alphabet.length,6);
});
test('daily challenge is stable and limited to supplied learning units; streak follows calendar days',()=>{
 const units=[{id:'greetings'},{id:'identity'},{id:'objects'}];const a=challengePlan('2026-10-13','en>it',units);
 assert.deepEqual(a,challengePlan('2026-10-13','en>it',units));assert.ok(units.some(u=>u.id===a.unit));assert.ok(['pair','write','complete','compose'].includes(a.mode));
 assert.equal(practiceStreak(['2026-10-11','2026-10-12'],'2026-10-13'),2);assert.equal(practiceStreak(['2026-10-10','2026-10-13'],'2026-10-13'),1);
 assert.equal(playerLevel(0).level,1);assert.equal(playerLevel(60).level,2);
});
test('old saves receive safe defaults; new table formats persist through export validation',()=>{
 const p=newProgress();delete p.daily;delete p.awards;delete p.settings.tableFormat;assert.equal(validateProgress(p).settings.tableFormat,'classic');
 p.settings.tableFormat='explorer';assert.equal(validateProgress(p).settings.tableFormat,'explorer');p.settings.tableFormat='wrong';assert.equal(validateProgress(p).settings.tableFormat,'classic');
});
