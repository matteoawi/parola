/* Deliberately small release check: new game paths and two visual surfaces. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=path.resolve(__dirname,'..'),url=process.env.PAROLA_URL||'https://matteoawi.github.io/parola/';
(async()=>{const browser=await chromium.launch({headless:true});try{
 const context=await browser.newContext({viewport:{width:1360,height:950}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(url);await page.waitForFunction(()=>!!window.Parola);assert.equal(await page.locator('meta[name="application-version"]').getAttribute('content'),'6.2.0');
 assert.equal(await page.locator('.daily-goal').count(),3);assert.equal(await page.locator('.unitcard').count(),24);
 await page.screenshot({path:path.join(root,'docs/hub-desktop-6.2.0.png'),fullPage:true});
 await page.evaluate(()=>{Parola.player.speak=async()=>false;Parola.intro('greetings','pair')});
 for(const [format,count]of [['focus',6],['classic',12],['explorer',18]]){await page.locator(`[data-action="tableFormat"][data-format="${format}"]`).click();await page.locator('[data-action="start"]').click();assert.equal(await page.locator('.tile').count(),count);await page.evaluate(()=>Parola.intro('greetings','pair'));}
 await page.evaluate(()=>Parola.nav('home'));await page.locator('[data-action="dailyChallenge"]').click();await page.locator('[data-action="start"]').click();
 const before=await page.evaluate(()=>Parola.state.game);await page.reload();await page.waitForFunction(()=>!!window.Parola);await page.evaluate(()=>Parola.player.speak=async()=>false);await page.locator('[data-action="resume"]').click();assert.equal(await page.evaluate(()=>Parola.state.game.id),before.id);assert.equal(await page.evaluate(()=>Parola.state.game.challengeDay),before.challengeDay);
 const summary=await page.evaluate(()=>{
  const words=s=>s.replace(/[.,!?؟،؛:;…«»“”"()]/g,' ').trim().split(/\s+/),normalize=s=>s.normalize('NFC').toLocaleLowerCase('it').replace(/[.,!?؟،؛:;…«»“”"()]/g,' ').replace(/\s+/g,' ').trim();let steps=0;
  while(Parola.state.view==='game'&&steps++<200){const g=Parola.state.game;if(g.phase==='roundDone'){Parola.next();continue;}const free=g.board.filter(t=>!t.gone&&document.querySelector(`.tile[data-id="${t.id}"]`).dataset.free==='true');
   if(['pair','write'].includes(g.mode)){let pair;for(const x of free)for(const y of free)if(x.type==='target'&&y.type==='support'&&x.pairKey===y.pairKey)pair=[x,y];if(!pair)throw Error('No free pair');const [x,y]=pair;if(g.mode==='write'&&!g.revealed.includes(x.itemId)){Parola.pick(x.id);document.querySelector('#write-answer').value=[...Parola.data.items,...Parola.data.vocab].find(i=>i.id===x.itemId).text.it;Parola.checkWrite()}Parola.pick(x.id);Parola.pick(y.id);
   }else{const items=Parola.data.items.filter(i=>i.unitId===g.unit),prefix=g.prefix.map(p=>p.text);let options=items.filter(i=>!g.completed.includes(i.id)).flatMap(item=>item.accepted.it.map(text=>({item,words:words(text)}))).filter(o=>prefix.every((v,i)=>normalize(v)===normalize(o.words[i]||'')));
    options=options.filter(o=>{const counts={};for(const t of g.board.filter(t=>!t.gone)){const k=normalize(t.text);counts[k]=(counts[k]||0)+1}for(const w of o.words.slice(prefix.length)){const k=normalize(w);if(!counts[k])return false;counts[k]--}return true});if(g.mode==='complete')options=[{item:items[g.round],words:words(items[g.round].text.it)}];if(g.mode==='compose'&&options.some(o=>o.words.length===prefix.length)){Parola.check();continue;}const tile=free.find(t=>options.some(o=>normalize(t.text)===normalize(o.words[prefix.length]||'')));if(!tile)throw Error('No free word');Parola.pick(tile.id);
   }
  }if(Parola.state.view!=='summary')throw Error('Challenge incomplete');return Parola.state.lastSummary;
 });assert.ok(summary.bonus>=15);assert.ok(await page.evaluate(()=>Object.values(Parola.state.store.daily).some(d=>Object.values(d.challenges).some(c=>c.completed))));
 await page.locator('[data-action="achievements"]').click();assert.equal(await page.locator('.achievement-list li').count(),8);
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>Parola.nav('home'));assert.ok(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+1));await page.screenshot({path:path.join(root,'docs/hub-mobile-6.2.0.png'),fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>Parola.setRoute('ar','ar','ar'));assert.ok(await page.evaluate(()=>document.body.scrollWidth<=innerWidth+1));
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(root,'docs/smoke-6.2.0.json'),JSON.stringify({version:'6.2.0',url,checks:['boot and daily hub','three table sizes','challenge reload and completion','reward and eight achievements','mobile and Arabic RTL','no JavaScript errors'],passed:true},null,2)+'\n');console.log('PASS: targeted game/UI smoke, 6 groups');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
