const C='schach-v1',CHESS='https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js';
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(C);
 await c.addAll(['index.html','manifest.webmanifest','icon-192.png','icon-512.png']);
 try{await c.add(new Request(CHESS,{mode:'cors'}))}catch(x){}
 self.skipWaiting()})())});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||r.headers.has('range')||!(u.origin===location.origin||u.host==='cdnjs.cloudflare.com'))return;
 const page=r.mode==='navigate'||/(\/|index\.html)$/.test(u.pathname);
 const net=()=>fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res});
 e.respondWith(page?net().catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html')))
  :caches.match(r,{ignoreSearch:true}).then(h=>h||net()))});
