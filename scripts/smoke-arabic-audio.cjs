/* Actual MP3 playback and cache, without voice or audio mocks. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=path.resolve(__dirname,'..'),version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim(),url=process.env.PAROLA_URL||'https://matteoawi.github.io/parola/';
(async()=>{const browser=await chromium.launch({headless:true,args:['--autoplay-policy=no-user-gesture-required']});try{
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(url);await page.waitForFunction(()=>!!window.Parola);await page.locator('[data-action=welcomeSkip]').click();
 await page.evaluate(()=>Parola.setRoute('ar','ar','it'));await page.evaluate(()=>Parola.audioPacks.running);
 const pack=await page.evaluate(()=>Parola.audioPacks.states.ar);assert.equal(pack.status,'ready');assert.equal(pack.loaded,247);
 const samples=await page.evaluate(()=>{const p=Parola.data,letter=Parola.alphabet.ar.lessons[0].cards[1];return[p.items.find(i=>i.id==='greetings_0'),p.items.find(i=>i.id==='read'),p.vocab.find(i=>i.id==='pic_door')].map(i=>({text:i.text.ar,context:i.id})).concat([{text:letter.speech,context:letter.context},{text:Parola.alphabet.ar.lessons.find(l=>l.id==='short_vowels').cards[0].speech,context:Parola.alphabet.ar.lessons.find(l=>l.id==='short_vowels').cards[0].context}]);});
 const playback=[];
 for(const sample of samples){const result=await page.evaluate(async sample=>{const p=Parola.player,start=performance.now(),ok=await p.speak('ar',sample.text,{context:sample.context,preference:'offline',rate:1});return{ok,voice:p.lastPlayback.voice,kind:p.lastPlayback.kind,elapsed:(performance.now()-start)/1000};},sample);assert.equal(result.ok,true);assert.equal(result.kind,'file');assert.match(result.voice,/Microsoft Hoda/);playback.push({...sample,...result});}
 const durations=await page.evaluate(async sample=>{const p=Parola.player,out=[];for(const rate of [1,.8]){const start=performance.now(),ok=await p.speak('ar',sample.text,{context:sample.context,preference:'offline',rate});out.push({rate,ok,elapsed:(performance.now()-start)/1000});}return out;},samples[1]);assert.ok(durations.every(d=>d.ok));assert.ok(durations[1].elapsed>durations[0].elapsed*1.15);
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.waitForFunction(()=>!!window.Parola);await page.evaluate(()=>Parola.audioPacks.running);
 assert.equal(await page.evaluate(()=>Parola.audioPacks.states.ar.status),'ready');assert.equal(await page.evaluate(async sample=>Parola.player.speak('ar',sample.text,{context:sample.context,preference:'offline',rate:.8}),samples[0]),true);assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(root,`docs/smoke-arabic-audio-${version}.json`),JSON.stringify({version,url,passed:true,mocks:false,pack,playback,durations,offline:true,errors},null,2)+'\n');console.log('PASS: Arabic preload, 5 actual samples, real 0.8 rate and offline playback');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
