import test from 'node:test';
import assert from 'node:assert/strict';
import {fitTable,boundedZoom} from '../src/board-viewport.mjs';
import {SoundEffects,SOUND_CUES} from '../src/sound-effects.mjs';
test('fit preserves proportions within both axes; zoom has stable limits',()=>{
 for(const [w,h,vw,vh] of [[785,955,366,570],[680,580,336,420],[540,420,1000,700]]){
  const scale=fitTable(w,h,vw,vh);assert.ok(w*scale<=vw-20+.001);assert.ok(h*scale<=vh-20+.001);assert.ok(scale<=1);
  assert.equal(boundedZoom(10,scale),2.2);assert.equal(boundedZoom(.01,scale),Math.min(.35,scale));
 }
});
test('all nine game sounds use one context, bounded volume, and respect mute',()=>{
 let made=0,notes=0,enabled=true;const volumes=[];
 globalThis.document={hidden:false};
 globalThis.AudioContext=class{constructor(){made++;this.state='running';this.currentTime=0;this.destination={};}createOscillator(){notes++;return{frequency:{setValueAtTime(){}},connect(){},start(){},stop(){},disconnect(){}};}createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(v){volumes.push(v);},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}suspend(){this.state='suspended';return Promise.resolve();}resume(){this.state='running';return Promise.resolve();}};
 const effects=new SoundEffects(()=>enabled);
 for(const cue of Object.keys(SOUND_CUES)){effects.last=-100;effects.play(cue);}
 assert.equal(made,1);assert.equal(notes,Object.values(SOUND_CUES).reduce((n,cue)=>n+cue.length,0));assert.ok(volumes.every(v=>v>0&&v<=.028));
 enabled=false;effects.last=-100;effects.play('win');assert.equal(effects.played,9);
 enabled=true;document.hidden=true;effects.play('win');assert.equal(effects.played,9);
 document.hidden=false;effects.suspend();effects.play('win');assert.equal(effects.context.state,'running');assert.equal(made,1);
 delete globalThis.AudioContext;delete globalThis.document;
});
