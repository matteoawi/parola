/* Cache is scoped to this repository, never to other GitHub Pages apps. */
const PREFIX='parola-v6:'+new URL(self.registration.scope).pathname+':';
const CACHE=PREFIX+'6.9.0';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./changelog.html','./credits.html','./assets/fonts/Nunito-variable.ttf','./assets/fonts/OFL.txt'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url),scope=new URL(self.registration.scope);
 if(request.method!=='GET'||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 if(request.headers.has('range')){
  if(!url.pathname.includes('/audio/'))return;
  event.respondWith((async()=>{
   const cache=await caches.open(CACHE),cached=await cache.match(url.href);
   if(!cached)return fetch(request);
   const bytes=await cached.arrayBuffer(),range=/^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range'));
   if(!range)return new Response(null,{status:416});
   const start=range[1]?Number(range[1]):Math.max(0,bytes.byteLength-Number(range[2])),end=range[1]&&range[2]?Math.min(Number(range[2]),bytes.byteLength-1):bytes.byteLength-1;
   if(start>end||start>=bytes.byteLength)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
   return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('Content-Type')||'audio/mpeg','Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Content-Length':String(end-start+1)}});
  })());return;
 }
 if(request.mode==='navigate'){
  event.respondWith((async()=>{
   try{const response=await fetch(request);if(response.ok){const cache=await caches.open(CACHE),gameDocument=url.pathname===scope.pathname||url.pathname===new URL('./index.html',scope).pathname;await cache.put(gameDocument?'./index.html':request,response.clone());return response;}throw Error('Offline response');}
   catch{return await caches.match(request)||await caches.match(new URL('./index.html',self.registration.scope).href)||Response.error();}
  })());
 }else{
  event.respondWith((async()=>{
   const cached=await caches.match(request);if(cached)return cached;
   const response=await fetch(request);
   if(response.ok&&(url.pathname.includes('/audio/')||SHELL.some(path=>new URL(path,self.registration.scope).pathname===url.pathname))){const cache=await caches.open(CACHE);await cache.put(request,response.clone());}
   return response;
  })());
 }
});
