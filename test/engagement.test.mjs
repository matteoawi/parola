import test from 'node:test';
import assert from 'node:assert/strict';
import {badgeProgress,earnedBadges,practiceWeek,recordAlphabetTable,dailyComplete,progressionBonus} from '../src/progression.mjs';
import {newProgress,validateProgress,mergeProgress} from '../src/engine.mjs';
test('milestones expose honest progress, include big tables and preserve earned awards',()=>{
 const p=newProgress();p.days=['2026-10-11','2026-10-12','2026-10-12'];assert.deepEqual(badgeProgress(p,'habit'),{id:'habit',current:2,total:7,earned:false});assert.equal(badgeProgress(p,'first').earned,false);
 p.daily['2026-10-13']={games:['g'],answers:[],alphabet:[],reviews:[],formats:['marathon'],bestCombo:4,challenges:{}};assert.equal(badgeProgress(p,'explorer').earned,true);assert.equal(badgeProgress(p,'combo').current,4);p.awards=['writer'];assert.equal(badgeProgress(p,'writer').current,5);assert.ok(earnedBadges(p).includes('writer'));
});
test('practice calendar reflects seven real local dates across a year boundary',()=>{
 const week=practiceWeek(['2025-12-31','2026-01-01'],'2026-01-02');assert.equal(week[0].day,'2025-12-27');assert.equal(week[6].day,'2026-01-02');assert.equal(week.filter(d=>d.practised).length,2);assert.equal(week.filter(d=>d.today).length,1);
});
test('alphabet completion joins daily rewards once and survives merge/import',()=>{
 const p=newProgress(),d={games:[],answers:['a','b','c','d','e','f'],alphabet:['a','b','c','d','e','f'],reviews:[],formats:[],bestCombo:0,challenges:{}};const session={skill:'recognize',tableFormat:'grand',queue:['a','b','c','d','e','f'],mahjong:{seed:7,completed:['a','b']}};
 assert.equal(recordAlphabetTable(d,'ru',session),false);assert.equal(recordAlphabetTable(d,'ru',{queue:[],mahjong:{completed:[]}}),false);session.mahjong.completed=[...session.queue];assert.equal(recordAlphabetTable(d,'ru',session),true);recordAlphabetTable(d,'ru',session);assert.equal(d.games.length,1);assert.equal(dailyComplete(d),true);p.daily['2026-10-13']=d;const clean=validateProgress(p);assert.equal(progressionBonus(clean.daily),30);assert.equal(progressionBonus(mergeProgress(clean,clean).daily),30);assert.equal(badgeProgress(clean,'explorer').earned,true);
});
