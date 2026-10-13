/** Quiet procedural game sounds. One reusable context; no files or network. */
export const SOUND_CUES={
 select:[[540,0,.055]],match:[[660,0,.12],[880,.07,.17]],
 combo:[[660,0,.10],[880,.055,.12],[1100,.11,.19]],
 error:[[190,0,.10],[160,.08,.12]],hint:[[740,0,.10],[990,.09,.16]],
 shuffle:[[390,0,.055],[490,.045,.055],[590,.09,.07]],
 unlock:[[520,0,.09],[780,.07,.11],[1040,.14,.16]],
 undo:[[590,0,.07],[440,.06,.10]],win:[[523,0,.18],[659,.10,.18],[784,.20,.18],[1047,.32,.32]]
};
export class SoundEffects{
 constructor(enabled){this.enabled=enabled;this.last=0;this.context=null;this.played=0;this.speechActive=false;this.output=null;}
 setSpeechActive(active){this.speechActive=active;if(this.output){const gain=this.output.gain;if(gain.setTargetAtTime)gain.setTargetAtTime(active?0:1,this.context.currentTime,.015);else gain.setValueAtTime(active?0:1,this.context.currentTime);}}
 play(cue='match'){
  if(!this.enabled()||document.hidden||this.speechActive)return;
  const now=performance.now();if(cue!=='win'&&now-this.last<35)return;this.last=now;
  try{
   const Context=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Context)return;
   const context=this.context?.state==='closed'?null:this.context;this.context=context||new Context();if(!context)this.output=null;
   const audio=this.context;if(!this.output){this.output=audio.createGain();this.output.gain.value=1;this.output.connect(audio.destination);}if(audio.state==='suspended')audio.resume().catch(()=>{});
   this.played++;for(const [frequency,delay,duration] of SOUND_CUES[cue]||SOUND_CUES.match){
    const oscillator=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime+delay;
    oscillator.type=cue==='error'?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,at);
    gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(cue==='select'?.018:.028,at+.008);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
    oscillator.connect(gain);gain.connect(this.output);oscillator.start(at);oscillator.stop(at+duration+.02);
    oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
   }
  }catch{}
 }
 suspend(){if(this.context?.state==='running')this.context.suspend().catch(()=>{});}
}
