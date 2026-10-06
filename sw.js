const CACHE='carryon-shell-v2';
const IMGS=['trip-suitcase','trip-cabin','worn-jacket',...['activewear', 'footwear', 'hats-and-accessories', 'health-and-meds', 'jackets-and-coats', 'knitwear', 'nightwear', 'smart-and-evening', 'swimwear-and-beachwear', 'toiletries', 'tops', 'trousers-and-shorts', 'underwear-and-socks'].map(x=>'m-'+x),...['activewear', 'dresses-and-skirts', 'footwear', 'hats-and-accessories', 'health-and-meds', 'jackets-and-coats', 'knitwear', 'nightwear', 'smart-and-evening', 'swimwear-and-beachwear', 'toiletries', 'tops', 'underwear-and-socks'].map(x=>'f-'+x)];
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.PNG',...IMGS.map(c=>'icons/'+c+'.webp')];
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.PNG',...CATS.map(c=>'icons/'+c+'.webp'),...TRIPIMG.map(c=>'icons/'+c+'.webp')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const page=r.mode==='navigate';
  e.respondWith(page
    ?fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html'))
    :caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res})));
});
