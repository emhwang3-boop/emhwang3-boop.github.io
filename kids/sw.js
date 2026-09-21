const C="kids-shell-v1";
const A=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A).catch(()=>{})).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.map(k=>k!==C?caches.delete(k):null))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{var cc=res.clone();caches.open(C).then(c=>c.put(r,cc));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match("./"))));});
