/* Older suites focus on existing mechanics. Acknowledge the new presentation UI
   in automation; the 6.5 smoke independently verifies that its gate is required. */
module.exports=async context=>context.addInitScript(()=>{
 addEventListener('load',()=>{
  if(!globalThis.Parola)return;
  const acknowledge=()=>{for(let count=0;count<40&&Parola.state.view==='prepare';count++)Parola.advancePreparation();};
  for(const key of ['start','startAlphabet']){const original=Parola[key];Parola[key]=(...args)=>{const result=original(...args);acknowledge();return result;};}
  setInterval(acknowledge,40);
 },{once:true});
});
