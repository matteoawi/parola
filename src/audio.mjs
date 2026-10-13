import {norm} from './engine.mjs';
const VOICE_LOCALES={it:'it-it',en:'en-gb',ru:'ru-ru',ar:'ar-sa'};
// Names are hints, not a quality guarantee; the user can override the ranking.
export function rankedVoices(voices,lang){return voices.filter(v=>v.lang?.toLowerCase().split(/[-_]/)[0]===lang).map(v=>{
 const name=(v.name||'')+' '+(v.voiceURI||''),score=(/natural|neural|premium|enhanced/i.test(name)?100:0)+(/google/i.test(name)?45:0)+(/microsoft/i.test(name)?15:0)+(v.lang.toLowerCase().replace('_','-')===VOICE_LOCALES[lang]?8:0)+(v.default?2:0)-(/espeak|mbrola|compact/i.test(name)?80:0);
 return {voice:v,score};
}).sort((a,b)=>b.score-a.score||(a.voice.name||'').localeCompare(b.voice.name||'')).map(v=>v.voice);}
/** A missing target voice never becomes a voice in the wrong language. */
export class AudioPlayer {
 constructor(manifest,embedded={},onError=()=>{},{choices=()=>({}),pronunciations={},onVoices=()=>{},onActivity=()=>{}}={}){this.manifest=manifest;this.embedded=embedded;this.onError=onError;this.choices=choices;this.pronunciations=pronunciations;this.onVoices=onVoices;this.onActivity=onActivity;this.speaking=false;this.lastPlayback=null;this.serial=0;this.active=null;this.voices=[];this.cancelPending=null;this.prepared=new Map();this.context=null;this.syncVoices();globalThis.speechSynthesis?.addEventListener?.('voiceschanged',()=>{this.syncVoices();this.onVoices();});}
 audioContext(){if(!this.context){const Context=globalThis.AudioContext||globalThis.webkitAudioContext;if(Context)this.context=new Context({latencyHint:'interactive'});}return this.context;}
 async prepare(entry,response){if(this.prepared.has(entry.path))return;const bytes=await response.arrayBuffer(),url=URL.createObjectURL(new Blob([bytes],{type:'audio/mpeg'}));let buffer=null;try{const context=this.audioContext();if(context)buffer=await context.decodeAudioData(bytes);}catch{/* The downloaded blob remains playable without Web Audio. */}this.prepared.set(entry.path,{lang:entry.lang,url,buffer});}
 retainLanguages(languages){for(const [path,entry]of this.prepared)if(!languages.includes(entry.lang)){URL.revokeObjectURL(entry.url);this.prepared.delete(path);}}
 syncVoices(){try{this.voices=globalThis.speechSynthesis?.getVoices?.()||[];}catch{this.voices=[];}}
 voiceOptions(lang){this.syncVoices();return rankedVoices(this.voices,lang);}
 voice(lang){const voices=this.voiceOptions(lang),choice=this.choices()[lang];return voices.find(v=>(v.voiceURI||v.name)===choice)||voices[0];}
 pronunciation(lang,text,context=''){const key=`${lang}|${norm(text,lang)}`;return this.pronunciations[key+'|'+context]||this.pronunciations[key]||text;}
 entry(lang,text,context=''){const key=`${lang}|${norm(text,lang)}`;return this.manifest.entries[key+'|'+context]||this.manifest.entries[key];}
 available(lang){return this.manifest.languages.includes(lang)||Boolean(this.voice(lang));}
 activity(active){this.speaking=active;this.onActivity(active,this.lastPlayback);}
 stop(){this.serial++;if(this.cancelPending)this.cancelPending(false);this.cancelPending=null;if(this.active){this.active.pause();this.active=null;}try{globalThis.speechSynthesis?.cancel();}catch{}this.activity(false);}
 async speak(lang,text,{rate=1,preference='auto',context=''}={}){
  rate=Math.min(1,Math.max(.5,Number(rate)||1));this.stop();const serial=this.serial;this.activity(true);
  try{
   // Some browsers populate voices only after the first getVoices call.
   if(preference==='auto'&&!this.voices.length&&globalThis.speechSynthesis)await new Promise(resolve=>{const synth=globalThis.speechSynthesis,done=()=>{clearTimeout(timer);synth.removeEventListener?.('voiceschanged',done);resolve();},timer=setTimeout(done,200);synth.addEventListener?.('voiceschanged',done,{once:true});});
   if(serial!==this.serial)return false;
   const ent=this.entry(lang,text,context),device=this.voice(lang),order=preference==='auto'?[['device',device],['file',ent]]:[['file',ent],['device',device]];
   for(const [kind,v] of order){if(!v)continue;this.lastPlayback={lang,kind,voice:kind==='device'?v.name:v.voice||'eSpeak',rate};this.onActivity(true,this.lastPlayback);try{const success=await(kind==='file'?this.playFile(v,rate,serial):this.playVoice(v,lang,this.pronunciation(lang,text,context),rate,serial));if(success)return true;if(serial!==this.serial)return false;}catch{if(serial!==this.serial)return false;}}
   if(serial===this.serial)this.onError(!ent&&!device?'audioTextUnavailable':'audioUnavailable');return false;
  }finally{if(serial===this.serial)this.activity(false);}
 }
 async playFile(entry,rate,serial){const ready=this.prepared.get(entry.path);if(rate===1&&ready?.buffer&&this.context){const ok=await this.playBuffer(ready.buffer,serial);if(ok||serial!==this.serial)return ok;}return new Promise(resolve=>{
  let settled=false;const source=ready?.url||this.embedded[entry.path]||entry.path;const el=new Audio(source);this.active=el;const applyRate=()=>{el.defaultPlaybackRate=rate;el.playbackRate=rate;el.preservesPitch=true;if('webkitPreservesPitch' in el)el.webkitPreservesPitch=true;if('mozPreservesPitch' in el)el.mozPreservesPitch=true;};applyRate();el.onloadedmetadata=applyRate;el.oncanplay=applyRate;el.onplaying=applyRate;el.onratechange=()=>{if(Math.abs(el.playbackRate-rate)>.001)applyRate();};
  const done=ok=>{if(settled)return;settled=true;clearTimeout(timeout);el.onended=null;el.onerror=null;el.onloadedmetadata=null;el.oncanplay=null;el.onplaying=null;el.onratechange=null;if(this.active===el)this.active=null;this.cancelPending=null;if(!ok)el.pause();resolve(ok&&serial===this.serial);};
  const timeout=setTimeout(()=>done(false),45000);this.cancelPending=()=>done(false);el.onended=()=>done(true);el.onerror=()=>done(false);el.play().catch(()=>done(false));
 });}
 async playBuffer(buffer,serial){try{await this.context.resume();if(serial!==this.serial)return false;return await new Promise(resolve=>{const source=this.context.createBufferSource();source.buffer=buffer;source.playbackRate.value=1;source.connect(this.context.destination);const handle={pause:()=>{try{source.stop();}catch{}}};this.active=handle;let settled=false;const done=ok=>{if(settled)return;settled=true;source.onended=null;if(!ok)handle.pause();source.disconnect();if(this.active===handle)this.active=null;this.cancelPending=null;resolve(ok&&serial===this.serial);};source.onended=()=>done(true);this.cancelPending=()=>done(false);try{source.start();}catch{done(false);}});}catch{return false;}}
 playVoice(voice,lang,text,rate,serial){return new Promise(resolve=>{
  if(!globalThis.speechSynthesis||!globalThis.SpeechSynthesisUtterance){resolve(false);return;}let settled=false,timer;const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=rate;u.pitch=1;u.volume=.9;
  const done=ok=>{if(settled)return;settled=true;clearTimeout(timer);u.onstart=u.onend=u.onerror=null;this.cancelPending=null;if(!ok&&serial===this.serial)try{speechSynthesis.cancel();}catch{}resolve(ok&&serial===this.serial);};timer=setTimeout(()=>done(false),1800);this.cancelPending=()=>done(false);u.onstart=()=>{clearTimeout(timer);timer=setTimeout(()=>done(false),45000);};u.onend=()=>done(true);u.onerror=()=>done(false);try{speechSynthesis.resume?.();speechSynthesis.speak(u);}catch{done(false);}
 });}
}
