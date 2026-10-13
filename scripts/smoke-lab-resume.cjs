/* Regression checks in an isolated headless context; voice is stubbed for logic. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=path.resolve(__dirname,'..'),version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim(),url=process.env.PAROLA_URL||'https://matteoawi.github.io/parola/';
async function ready(page){await page.waitForFunction(()=>!!window.Parola);await page.evaluate(()=>{Parola.player.speak=async()=>false;});}
async function word(page,text){const id=await page.evaluate(text=>Parola.state.game.board.find(t=>!t.gone&&t.text===text&&document.querySelector(`.tile[data-id="${t.id}"]`)?.dataset.free==='true')?.id,text);assert.ok(id!=null,text);await page.locator(`.tile[data-id="${id}"]`).click();}
(async()=>{const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(url);await ready(page);await page.locator('[data-action=welcomeSkip]').click();await page.evaluate(()=>{Parola.setRoute('en','it','it');Parola.intro('habits','compose');});
 await page.locator('[data-action=tableFormat][data-format=grand]').click();await page.locator('[data-action=start]').click();
 while(await page.evaluate(()=>Parola.state.view==='prepare'))await page.locator('[data-action=introNext]').click();
 for(const text of ['Io','leggo','un','libro'])await word(page,text);await page.locator('[data-action=checkSentence]').click();
 const score=await page.evaluate(()=>Parola.state.game.score);assert.equal(await page.evaluate(()=>Parola.state.game.phase),'roundDone');
 assert.equal(await page.locator('[data-action=undo]:enabled').count(),0);
 await page.reload();await ready(page);await page.locator('[data-action=resume]:visible').click();
 assert.equal(await page.evaluate(()=>Parola.state.game.phase),'roundDone');assert.equal(await page.evaluate(()=>Parola.state.game.score),score);
 assert.equal(await page.evaluate(()=>Parola.state.game.history.length),0);assert.equal(await page.locator('[data-action=undo]:enabled').count(),0);
 await page.locator('[data-action=nextRound]').click();await page.locator('[data-action=labAction][data-kind=pair]').click();
 const ids=await page.evaluate(()=>{const g=Parola.state.game,free=g.board.filter(t=>!t.gone&&document.querySelector(`.tile[data-id="${t.id}"]`)?.dataset.free==='true');for(const a of free)for(const b of free)if(a.id!==b.id&&a.text.toLowerCase()===b.text.toLowerCase())return[a.id,b.id];});assert.ok(ids);
 for(const id of ids)await page.locator(`.tile[data-id="${id}"]`).click();
 assert.equal(await page.evaluate(()=>Parola.state.game.feedback.key),'pairOk');
 assert.equal(await page.locator('#announcer').textContent(),JSON.parse(fs.readFileSync(path.join(root,'data/ui.json'),'utf8')).it.pairOk);assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(root,`docs/smoke-lab-resume-${version}.json`),JSON.stringify({version,url,passed:true,checks:['finished round retains score and phase after reload; undo disabled and history empty','pair live announcement matches visible pair success'],audio:'stubbed for isolated logic',errors},null,2)+'\n');console.log('PASS: 2 lab resume / announcement regressions');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
