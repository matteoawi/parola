import test from 'node:test';
import assert from 'node:assert/strict';
import {AudioPacks,languageEntries} from '../src/audio-pack.mjs';
const manifest={entries:{a:{lang:'it',path:'audio/a.mp3',bytes:20},alias:{lang:'it',path:'audio/a.mp3',bytes:20},b:{lang:'en',path:'audio/b.mp3',bytes:30}}};
function player(){return {prepared:new Map(),retainLanguages(languages){for(const [path,entry]of this.prepared)if(!languages.includes(entry.lang))this.prepared.delete(path);},async prepare(entry){this.prepared.set(entry.path,entry);}};}
test('language pack avoids duplicate downloads and reports readiness only after preparation',async()=>{
 globalThis.location={href:'https://example.com/parola/'};const p=player(),requests=[];const packs=new AudioPacks(manifest,p,{saveData:()=>false,openCache:async()=>null,fetcher:async url=>{requests.push(url);return new Response('audio');}});
 assert.equal(languageEntries(manifest,'it').length,1);await packs.select(['it','it']);assert.equal(requests.length,1);assert.equal(packs.states.it.status,'ready');assert.equal(packs.states.it.loaded,1);
 await packs.select(['it']);assert.equal(requests.length,1);await packs.select(['en']);assert.equal(p.prepared.has('audio/a.mp3'),false);assert.equal(p.prepared.has('audio/b.mp3'),true);assert.equal(requests.length,2);
});
test('data saver requires an explicit download and failed packs remain retryable',async()=>{
 const p=player();let fail=true;const packs=new AudioPacks(manifest,p,{saveData:()=>true,openCache:async()=>null,fetcher:async()=>{if(fail)throw Error('Offline');return new Response('audio');}});
 await packs.select(['it','ar']);assert.equal(packs.states.it.status,'paused');assert.equal(packs.states.ar.status,'missing');assert.equal(p.prepared.size,0);
 await packs.select(['it','ar'],{force:true});assert.equal(packs.states.it.status,'partial');assert.equal(packs.states.it.failed,1);fail=false;await packs.select(['it','ar'],{force:true});assert.equal(packs.states.it.status,'ready');assert.equal(packs.states.it.failed,0);
});
