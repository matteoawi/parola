import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceTour,mergeTours,collectionItems,challengeURL,parseChallenge} from '../src/adventure.mjs';
import {newProgress,validateProgress,mergeProgress} from '../src/engine.mjs';

test('tour checkpoints advance once and survive save validation and merge',()=>{
 const tour={id:'tour_a',units:['greetings','identity','objects'],stage:0,score:0},game={tourId:'tour_a',tourStage:0,score:120};
 const advanced=advanceTour(tour,game);assert.equal(advanced.stage,1);assert.equal(advanced.score,120);assert.deepEqual(advanceTour(advanced,game),advanced);
 const p=newProgress();p.tours['en>it']=advanced;assert.deepEqual(validateProgress(p).tours['en>it'],advanced);
 assert.deepEqual(mergeTours({'en>it':advanced},{'en>it':tour})['en>it'],advanced);
 assert.deepEqual(mergeProgress(p,p).tours['en>it'],advanced);
});
test('challenge links preserve the table settings and reject invalid invitations',()=>{
 const expected={unit:'greetings',mode:'write',route:'it>it',seed:4294967295,tableFormat:'explorer',score:444};
 const url=new URL(challengeURL('https://matteoawi.github.io/parola/?old=1',expected));assert.deepEqual(parseChallenge(url.search,['greetings']),expected);assert.equal(url.searchParams.has('old'),false);
 for(const [key,value]of [['unit','missing'],['mode','script'],['route','xx>it'],['seed','-1'],['seed','4294967296'],['format','huge'],['score','Infinity']]){const bad=new URL(url);bad.searchParams.set(key,value);assert.equal(parseChallenge(bad.search,['greetings']),null);}
});
test('passport stamps require independent recall and old players bypass onboarding',()=>{
 const memory={'en>it|pair|a':{independent:1},'en>it|write|b':{independent:0},'it>it|pair|c':{independent:2}};
 assert.deepEqual(collectionItems(memory,'en>it',[{id:'a'},{id:'b'},{id:'c'}]),[{id:'a'}]);
 const old=newProgress();delete old.onboarded;assert.equal(validateProgress(old).onboarded,false);old.seen=['en>it|a'];assert.equal(validateProgress(old).onboarded,true);
});
