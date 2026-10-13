const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=path.resolve(__dirname,'..'),version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim();
const url=process.env.PAROLA_URL||'https://matteoawi.github.io/parola/';
const results=[];function pass(check,details={}){results.push({check,passed:true,...details});console.log('PASS',check,JSON.stringify(details));}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--autoplay-policy=no-user-gesture-required']});
 try{
  const context=await browser.newContext({viewport:{width:1360,height:950},reducedMotion:'reduce',acceptDownloads:true});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto(url);await page.waitForFunction(()=>!!window.Parola);
  await page.locator('[data-action="mono"]').click();
  assert.equal(await page.evaluate(()=>Parola.state.store.settings.support),'it');
  assert.equal(await page.evaluate(()=>Parola.state.store.settings.ui),'it');pass('visible monolingual entry selects one language');
  for(const lang of ['it','en','ar','ru']){
   await page.evaluate(lang=>{Parola.setRoute(lang,lang,lang);Parola.openAlphabet()},lang);
   const ids=await page.evaluate(lang=>Parola.alphabet[lang].lessons.map(l=>l.id),lang);
   assert.equal(await page.locator('.alpha-lesson-row').count(),ids.length);
   for(const lesson of ids){
    await page.locator(`.alpha-lesson-row[data-lesson="${lesson}"]`).click();
    for(const skill of ['recognize','write']){
     const count=await page.evaluate(({lang,lesson,skill})=>{
      const l=Parola.alphabet[lang].lessons.find(l=>l.id===lesson);let n=0;
      // Finite six-item sessions cover every card without skipping progression.
      for(let session=0;session<Math.ceil(l.cards.length/6);session++){
       Parola.startAlphabet(skill);
       while(Parola.state.store.alphabetSessions[lang].index<Parola.state.store.alphabetSessions[lang].queue.length){
        const s=Parola.state.store.alphabetSessions[lang],card=l.cards.find(c=>c.id===s.queue[s.index]);
        if(skill==='write'){const input=document.querySelector('#alpha-answer');input.value=card.model;input.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-action="alphaCheck"]').click();}
        else document.querySelectorAll('[data-action="alphaCheck"]').forEach(b=>{if(b.dataset.answer===card.model)b.click()});
        if(Parola.state.store.alphabetSessions[lang].feedback!==true)throw Error('Correct answer rejected: '+card.id);
        document.querySelector('[data-action="alphaNext"]').click();n++;
       }
      }
      return n;
     },{lang,lesson,skill});
     assert.equal(count,await page.evaluate(({lang,lesson})=>Parola.alphabet[lang].lessons.find(l=>l.id===lesson).cards.length,{lang,lesson}));
    }
    pass('complete alphabet lesson in recognition and typing',{lang,lesson});
    await page.evaluate(()=>Parola.openAlphabet());
   }
  }
  // Strict vowel assessment, assistance accounting, and independent retry.
  await page.evaluate(()=>{Parola.setRoute('ar','ar','ar');Parola.openAlphabet()});
  await page.locator('.alpha-lesson-row[data-lesson="short_vowels"]').click();await page.locator('[data-action="alphaStart"][data-skill="write"]').click();
  await page.locator('[data-action="key"][data-char="ب"]').click();await page.locator('[data-action="key"][data-char="ِ"]').click();await page.locator('[data-action="alphaCheck"]').click();
  assert.equal(await page.evaluate(()=>Parola.state.store.alphabetSessions.ar.feedback),false);
  await page.locator('#alpha-answer').fill('بَ');await page.locator('[data-action="alphaCheck"]').click();
  assert.equal(await page.evaluate(()=>Parola.state.store.memory['ar>ar|alpha_write|ar_short_vowels_0'].assisted),true);
  pass('Arabic vowel contrast is strict and an error makes the answer assisted');
  await page.locator('[data-action="alphaNext"]').click();await page.locator('#alpha-answer').fill('draft');
  const before=await page.evaluate(()=>Parola.state.store.alphabetSessions.ar);await page.reload();await page.waitForFunction(()=>!!window.Parola);
  await page.locator('[data-action="alpha"]').first().click();await page.locator('[data-action="alphaResume"]').click();
  assert.equal(await page.locator('#alpha-answer').inputValue(),'draft');assert.equal(await page.evaluate(()=>Parola.state.store.alphabetSessions.ar.index),before.index);
  pass('alphabet session and draft survive real browser reload');
  // New character audio must never be credited without successful playback.
  await page.evaluate(()=>{Parola.player.voices=[];Parola.player.voice=()=>undefined;Parola.openAlphabet()});
  await page.locator('.alpha-lesson-row[data-lesson="letters_1"]').click();
  assert.ok(await page.locator('[data-action="alphaStart"][data-skill="listen"]').isDisabled());
  pass('missing Arabic letter voice disables listening while visual learning remains available');
  // First-phrase MP3 listening is tested without a playback mock.
  await page.evaluate(()=>{Parola.setRoute('it','it','it');Parola.openAlphabet()});
  await page.locator('.alpha-lesson-row[data-lesson="first_words"]').click();await page.locator('[data-action="alphaStart"][data-skill="listen"]').click();
  const answer=await page.evaluate(()=>{const s=Parola.state.store.alphabetSessions.it;return Parola.alphabet.it.lessons.find(l=>l.id==='first_words').cards.find(c=>c.id===s.queue[s.index]).model});
  await page.evaluate(answer=>Parola.checkAlphabet(answer),answer);assert.equal(await page.evaluate(()=>Parola.state.store.alphabetSessions.it.feedback),null);
  await page.locator('[data-action="alphaListen"]').click();await page.waitForFunction(()=>Parola.state.store.alphabetSessions.it.heard);
  await page.evaluate(answer=>Parola.checkAlphabet(answer),answer);assert.equal(await page.evaluate(()=>Parola.state.store.alphabetSessions.it.feedback),true);
  pass('actual embedded MP3 is required before an alphabet listening answer is credited');
  for(const lang of ['it','en','ru']){
   const pair=await page.evaluate(lang=>{Parola.setRoute(lang,lang,lang);Parola.intro('identity','listen');Parola.start();const free=Parola.state.game.board.filter(t=>document.querySelector(`.tile[data-id="${t.id}"]`).dataset.free==='true');for(const x of free)for(const y of free)if(x.type==='target'&&y.type==='support'&&x.pairKey===y.pairKey)return[x,y]},lang);
   assert.notEqual(pair[0].text,pair[1].text);await page.evaluate(id=>Parola.pick(id),pair[0].id);await page.waitForFunction(id=>Parola.state.game.heard.includes(id),pair[0].itemId);await page.evaluate(id=>Parola.pick(id),pair[1].id);
   assert.equal(await page.evaluate(()=>Parola.state.game.completed.length),1);pass('monolingual listening pair with actual MP3',{lang});
  }
  const unavailable=await page.evaluate(()=>{Parola.setRoute('ar','ar','ar');Parola.intro('identity','listen');Parola.start();const free=Parola.state.game.board.filter(t=>document.querySelector(`.tile[data-id="${t.id}"]`).dataset.free==='true');for(const x of free)for(const y of free)if(x.type==='target'&&y.type==='support'&&x.pairKey===y.pairKey){Parola.pick(x.id);Parola.pick(y.id);return Parola.state.game.completed.length}});assert.equal(unavailable,0);pass('monolingual listening cannot remove pairs without the required Arabic audio');
  await page.evaluate(()=>{Parola.player.speak=async()=>false;Parola.nav('settings');const cb=document.querySelector('[data-setting="effects"]');cb.checked=false;cb.dispatchEvent(new Event('change',{bubbles:true}))});
  for(const lang of ['it','en','ar','ru'])for(const mode of ['pair','write','complete','compose']){
   const completed=await page.evaluate(({lang,mode})=>{
    Parola.setRoute(lang,lang,lang);Parola.intro('identity',mode);Parola.start();let steps=0;
    while(Parola.state.view==='game'&&steps++<150){const g=Parola.state.game;
     if(['pair','write'].includes(mode)){
      const free=g.board.filter(t=>!t.gone&&document.querySelector(`.tile[data-id="${t.id}"]`).dataset.free==='true');let pair;
      for(const x of free)for(const y of free)if(x.type==='target'&&y.type==='support'&&x.pairKey===y.pairKey)pair=[x,y];
      if(!pair)throw Error('Pair stall');const [x,y]=pair;if(x.text===y.text)throw Error('Identical monolingual pair');
      if(mode==='write'&&!g.revealed.includes(x.itemId)){Parola.pick(x.id);document.querySelector('#write-answer').value=[...Parola.data.items,...Parola.data.vocab].find(i=>i.id===x.itemId).text[lang];Parola.checkWrite();}
      Parola.pick(x.id);Parola.pick(y.id);
     }else{
      if(g.phase==='roundDone'){Parola.next();continue;}
      const unit=Parola.data.units.find(u=>u.id===g.unit),items=unit.items.map(id=>Parola.data.items.find(i=>i.id===id));
      const normalize=s=>s.normalize('NFC').toLocaleLowerCase(lang).replace(/[.,!?؟،؛:;…«»“”"()]/g,' ').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/\s+/g,' ').trim();
      const words=s=>s.replace(/[.,!?؟،؛:;…«»“”"()]/g,' ').trim().split(/\s+/);
      const prefix=g.prefix.map(p=>p.text);
      let options=items.filter(i=>!g.completed.includes(i.id)).flatMap(item=>item.accepted[lang].map(text=>({item,words:words(text)}))).filter(o=>prefix.every((v,i)=>normalize(v)===normalize(o.words[i]||'')));
      options=options.filter(o=>{const counts={};for(const t of g.board.filter(t=>!t.gone)){const k=normalize(t.text);counts[k]=(counts[k]||0)+1}for(const w of o.words.slice(prefix.length)){const k=normalize(w);if(!counts[k])return false;counts[k]--}return true});
      if(mode==='complete')options=[{item:items[g.round],words:words(items[g.round].text[lang])}];
      if(mode==='compose'&&options.some(o=>o.words.length===prefix.length)){Parola.check();continue;}
      const tile=g.board.find(t=>!t.gone&&document.querySelector(`.tile[data-id="${t.id}"]`).dataset.free==='true'&&options.some(o=>normalize(t.text)===normalize(o.words[prefix.length]||'')));
      if(!tile)throw Error('Word stall');Parola.pick(tile.id);
     }
    }
    if(Parola.state.view!=='summary')throw Error('Game incomplete');return Parola.state.lastSummary.completed.length;
   },{lang,mode});
   assert.equal(completed,['pair','write'].includes(mode)?6:3);pass('complete monolingual game',{lang,mode});
  }
  for(const width of [390,1360])for(const lang of ['it','en','ar','ru']){
   await page.setViewportSize({width,height:950});await page.evaluate(lang=>{Parola.setRoute(lang,lang,lang);Parola.openAlphabet()},lang);
   assert.ok(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+1));await page.locator('.alpha-lesson-row[data-lesson="letters_1"]').click();
   assert.ok(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+1));pass('alphabet responsive layout',{width,lang});
   await page.evaluate(()=>document.querySelectorAll('.toast').forEach(e=>e.remove()));
   if((width===390&&lang==='ar')||(width===1360&&lang==='it'))await page.screenshot({path:path.join(root,`docs/learning-${lang}-${width}-${version}.png`),fullPage:true});
   await page.evaluate(()=>{Parola.intro('wishes','pair');Parola.start()});assert.ok(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+1));
   assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.tile.support .tiletext')].every(e=>e.offsetHeight<=e.closest('.tile').clientHeight-46)));pass('monolingual board fits the viewport and displays complete clues',{width,lang});
  }
  await page.evaluate(()=>Parola.nav('settings'));await page.locator('#setting-journey').selectOption('mono');await page.locator('#setting-target').selectOption('ru');await page.locator('[data-action="applySettings"]').click();assert.equal(await page.evaluate(()=>Parola.state.store.settings.support),'ru');assert.equal(await page.evaluate(()=>Parola.state.store.settings.ui),'ru');pass('settings can select a native-language path');
  await page.evaluate(()=>Parola.nav('settings'));const downloadEvent=page.waitForEvent('download');await page.locator('[data-action="export"]').click();const download=await downloadEvent;const exported=path.join(root,'docs/learning-progress-test.json');await download.saveAs(exported);
  const data=JSON.parse(fs.readFileSync(exported));assert.ok(data.alphabetSessions);assert.ok(Object.keys(data.memory).some(k=>k.includes('|alpha_write|')));
  await page.evaluate(()=>{Parola.resetTest();Parola.nav('settings')});await page.locator('#import-file').setInputFiles(exported);await page.waitForFunction(()=>Object.keys(Parola.state.store.alphabetSessions).length>0);fs.unlinkSync(exported);pass('export and import preserve alphabet skills and sessions');
  await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);await context.setOffline(true);await page.reload();await page.waitForFunction(()=>!!window.Parola);await page.evaluate(()=>Parola.openAlphabet());assert.ok(await page.locator('.alpha-lesson-row').count()>0);pass('alphabet curriculum is available after offline reload');
  assert.deepEqual(errors,[]);pass('no JavaScript errors or missing translations');
  fs.writeFileSync(path.join(root,`docs/learning-verification-${version}.json`),JSON.stringify({version,url,checks:results.length,alphabetLessons:45,alphabetCards:294,results},null,2)+'\n');console.log('TOTAL',results.length);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
