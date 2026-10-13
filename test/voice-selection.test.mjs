import test from 'node:test';
import assert from 'node:assert/strict';
import {AudioPlayer,rankedVoices} from '../src/audio.mjs';
import {newProgress,validateProgress} from '../src/engine.mjs';
const voices=[{name:'Compact Russian',voiceURI:'compact-ru',lang:'ru-RU'},{name:'Google русский',voiceURI:'google-ru',lang:'ru-RU'},{name:'Alice',voiceURI:'com.apple.voice.enhanced.it-IT.Alice',lang:'it-IT'},{name:'Alice',voiceURI:'com.apple.voice.compact.it-IT.Alice',lang:'it-IT'},{name:'Natural English',voiceURI:'en-natural',lang:'en-US'}];
function synth(){const events=new EventTarget(),spoken=[];globalThis.speechSynthesis={getVoices:()=>voices,addEventListener:events.addEventListener.bind(events),removeEventListener:events.removeEventListener.bind(events),cancel(){},resume(){},speak(u){spoken.push(u);queueMicrotask(()=>{u.onstart?.();u.onend?.();});}};globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};return {events,spoken};}
function cleanup(){delete globalThis.speechSynthesis;delete globalThis.SpeechSynthesisUtterance;}
test('rank matching languages and enhanced metadata; honor a manual voice',()=>{
 synth();try{assert.equal(rankedVoices(voices,'ru')[0].voiceURI,'google-ru');assert.equal(rankedVoices(voices,'it')[0].voiceURI,'com.apple.voice.enhanced.it-IT.Alice');assert.equal(rankedVoices(voices,'ar').length,0);const p=new AudioPlayer({entries:{},languages:[]},{},()=>{},{choices:()=>({ru:'compact-ru',it:'missing'})});assert.equal(p.voice('ru').voiceURI,'compact-ru');assert.equal(p.voice('it').voiceURI,'com.apple.voice.enhanced.it-IT.Alice');}finally{cleanup();}
});
test('device first, explicit rate and neutral pitch; speech activity spans playback',async()=>{
 const {spoken}=synth(),activity=[];try{const p=new AudioPlayer({entries:{'ru|привет':{path:'old.mp3',lang:'ru'}},languages:['ru']},{},()=>{},{onActivity:a=>activity.push(a)});p.playFile=()=>{throw Error('Should prefer device');};assert.equal(await p.speak('ru','Привет',{rate:.8}),true);assert.equal(spoken[0].voice.voiceURI,'google-ru');assert.equal(spoken[0].rate,.8);assert.equal(spoken[0].pitch,1);assert.equal(p.speaking,false);assert.ok(activity.includes(true));assert.equal(activity.at(-1),false);}finally{cleanup();}
});
test('failed device speech cancels before file fallback, never substituting language',async()=>{
 synth();try{speechSynthesis.speak=u=>queueMicrotask(()=>u.onerror?.());let played=0,errors=0;const p=new AudioPlayer({entries:{'ru|привет':{path:'old.mp3',lang:'ru',voice:'eSpeak ru'}},languages:['ru']},{},()=>errors++);p.playFile=async()=>{played++;return true;};assert.equal(await p.speak('ru','Привет'),true);assert.equal(played,1);assert.equal(p.lastPlayback.kind,'file');assert.equal(await p.speak('ar','مرحبا'),false);assert.equal(errors,1);assert.equal(played,1);}finally{cleanup();}
});
test('interrupting a voice cannot clear the newer speech or leave its queue alive',async()=>{
 const {spoken}=synth();speechSynthesis.speak=u=>spoken.push(u);try{const p=new AudioPlayer({entries:{},languages:[]});const first=p.speak('ru','Привет'),second=p.speak('ru','Пока');assert.equal(await first,false);assert.equal(p.speaking,true);assert.equal(spoken[0].onend,null);spoken[1].onstart();spoken[1].onend();assert.equal(await second,true);assert.equal(p.speaking,false);}finally{cleanup();}
});
test('late browser voices can be used on the first playback',async()=>{
 const {events,spoken}=synth();speechSynthesis.getVoices=()=>[];try{const p=new AudioPlayer({entries:{},languages:[]});setTimeout(()=>{speechSynthesis.getVoices=()=>voices;events.dispatchEvent(new Event('voiceschanged'));},10);assert.equal(await p.speak('ru','Привет'),true);assert.equal(spoken[0].voice.voiceURI,'google-ru');}finally{cleanup();}
});
test('old defaults migrate once; explicit new choices survive validation and exports',()=>{
 const old=newProgress();old.settings.voice='offline';delete old.settings.voicePreferencesVersion;assert.equal(validateProgress(old).settings.voice,'auto');const p=newProgress();p.settings.voice='offline';p.settings.deviceVoices={ru:'google-ru',it:'x'.repeat(301),xx:'bad'};const clean=validateProgress(p);assert.equal(clean.settings.voice,'offline');assert.deepEqual(clean.settings.deviceVoices,{ru:'google-ru'});
});

test('device pronunciation keeps contextual read and Russian stress overrides',async()=>{
 const {spoken}=synth();try{const p=new AudioPlayer({entries:{},languages:[]},{},()=>{},{pronunciations:{'en|read|past_0':'red','ru|дома большие':'Дома́ большие.'}});assert.equal(p.pronunciation('en','read','present_0'),'read');assert.equal(await p.speak('en','read',{context:'past_0'}),true);assert.equal(spoken.at(-1).text,'red');assert.equal(await p.speak('ru','Дома большие.'),true);assert.equal(spoken.at(-1).text,'Дома́ большие.');}finally{cleanup();}
});
