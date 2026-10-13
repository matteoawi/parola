/** Download only selected languages; keep the persistent pack and warmed player separate. */
export function languageEntries(manifest,lang){return [...new Map(Object.values(manifest.entries).filter(entry=>entry.lang===lang).map(entry=>[entry.path,entry])).values()];}
export class AudioPacks {
 constructor(manifest,player,{embedded={},cacheName,notify=()=>{},fetcher=url=>fetch(url),openCache=async name=>globalThis.caches?caches.open(name):null,saveData=()=>navigator.connection?.saveData}={}){Object.assign(this,{manifest,player,embedded,cacheName,notify,fetcher,openCache,saveData});this.states={};this.selected=[];this.generation=0;this.running=null;}
 select(languages,{force=false}={}){
  const selected=[...new Set(languages)].filter(lang=>['it','en','ar','ru'].includes(lang));
  if(selected.join('|')===this.selected.join('|')&&this.running)return this.running;
  if(selected.join('|')===this.selected.join('|')&&!force&&selected.every(lang=>['ready','missing','partial','paused'].includes(this.states[lang]?.status)))return Promise.resolve(this.states);
  this.selected=selected;const generation=++this.generation;this.player.retainLanguages(selected);
  const tasks=[];
  for(const lang of selected){const entries=languageEntries(this.manifest,lang);this.states[lang]={status:entries.length?'loading':'missing',loaded:0,total:entries.length,bytes:entries.reduce((n,e)=>n+(e.bytes||0),0),failed:0};if(!force&&this.saveData()&&entries.some(e=>!this.embedded[e.path]))this.states[lang].status='paused';else tasks.push(...entries);}
  this.notify(this.states);this.running=this.load(tasks,generation).then(()=>{if(generation!==this.generation)return this.states;for(const lang of selected){const state=this.states[lang];if(state.status==='loading')state.status=state.failed?'partial':'ready';}this.running=null;this.notify(this.states);return this.states;});return this.running;
 }
 async load(entries,generation){
  let cache=null;try{cache=await this.openCache(this.cacheName);}catch{/* Memory preload still works when storage is blocked. */}
  let index=0;
  const worker=async()=>{while(index<entries.length&&generation===this.generation){const entry=entries[index++];try{
   if(!this.player.prepared.has(entry.path)){
    const source=this.embedded[entry.path]||new URL(entry.path,location.href).href;let response=this.embedded[entry.path]?null:await cache?.match(source);
    if(!response){response=await this.fetcher(source);if(!response.ok)throw Error('Audio download failed');if(cache&&!this.embedded[entry.path]){try{await cache.put(source,response.clone());}catch{/* Cache quota must not prevent audio in memory. */}}}
    if(generation!==this.generation)return;await this.player.prepare(entry,response);if(generation!==this.generation){this.player.retainLanguages(this.selected);return;}
   }
   this.states[entry.lang].loaded++;
  }catch{if(generation===this.generation)this.states[entry.lang].failed++;}if(generation===this.generation)this.notify(this.states);}};
  await Promise.all(Array.from({length:4},worker));
 }
}
