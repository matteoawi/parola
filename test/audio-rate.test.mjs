import test from 'node:test';
import assert from 'node:assert/strict';
import {AudioPlayer} from '../src/audio.mjs';
test('slow playback recovers its requested rate after metadata and player resets',async()=>{
 let audio;globalThis.Audio=class {constructor(){audio=this;this.playbackRate=1;this.webkitPreservesPitch=false;}pause(){}play(){this.playbackRate=3;this.onloadedmetadata();assert.equal(this.playbackRate,.8);this.playbackRate=2;this.onplaying();assert.equal(this.playbackRate,.8);assert.equal(this.defaultPlaybackRate,.8);assert.equal(this.webkitPreservesPitch,true);setTimeout(()=>this.onended(),0);return Promise.resolve();}};
 const player=new AudioPlayer({entries:{},languages:[]});assert.equal(await player.playFile({path:'audio/example.mp3'},.8,0),true);assert.equal(audio.onplaying,null);delete globalThis.Audio;
});
