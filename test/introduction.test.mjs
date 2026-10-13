import test from 'node:test';
import assert from 'node:assert/strict';
import {materialSignature,wasIntroduced,missingIntroductions,recordIntroduction} from '../src/introduction.mjs';
import {newProgress,validateProgress,mergeProgress} from '../src/engine.mjs';
import {springValue} from '../src/motion.mjs';
const material={id:'greetings_0',target:'it',support:'en',text:'Ciao!',meaning:'Hello!',words:['Ciao']};
test('seen, played and old imported progress cannot stand in for an introduction',()=>{
 const progress=newProgress();progress.seen=['en>it|greetings_0'];progress.missions['en>it|pair|greetings']={score:100,stars:3};assert.equal(wasIntroduced(progress,material),false);
 recordIntroduction(progress,material);assert.deepEqual(missingIntroductions(progress,[material]),[]);assert.equal(wasIntroduced(validateProgress(progress),material),true);assert.equal(wasIntroduced(mergeProgress(newProgress(),progress),material),true);
});
test('different route, clue, word sequence and content changes require a fresh presentation',()=>{
 const progress=newProgress();recordIntroduction(progress,material);for(const change of [{support:'it',meaning:'Un saluto informale.'},{target:'ru',text:'Привет!'},{meaning:'Hi!'},{words:['Ciao','Anna']}])assert.equal(wasIntroduced(progress,{...material,...change}),false);
 const broken=newProgress();broken.introduced={'en>it|greetings_0':'not JSON','wrong':'[]'};assert.deepEqual(validateProgress(broken).introduced,{});assert.ok(materialSignature(material).includes('Ciao'));
});
test('spring starts at its current presentation and settles while carrying its velocity',()=>{
 assert.equal(springValue(100,0,0),100);assert.ok(Math.abs(springValue(100,0,.32))<.1);assert.ok(springValue(100,200,.02)>springValue(100,0,.02));
});
