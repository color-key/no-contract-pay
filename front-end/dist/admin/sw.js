try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class r{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,r=i&&i.handler;if(!r&&this.s&&(r=this.s),r){try{a=r.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function h(e,s,a){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)r=new i(e,s,a);else if("function"==typeof e)r=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return o().registerRoute(r),r}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),l=e=>e||f(u.precache),d=e=>e||f(u.runtime);function w(e){e.then(()=>{})}const p=new Set;class y{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.h=e,this.u=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.h,this.u);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,u=[],f=h.openCursor(s,n);f.onsuccess=()=>{const e=f.result;e?(u.push(a?e:e.value),i&&u.length>=i?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async m(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),r=a[e].apply(a,n);r.onsuccess=()=>i(r.result)})}close(){this.o&&(this.o.close(),this.o=null)}}y.prototype.OPEN_TIMEOUT=2e3;const m={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(m))for(const s of t)s in IDBObjectStore.prototype&&(y.prototype[s]=async function(t,...n){return await this.m(s,t,e,...n)});try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const g=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class q{constructor(e){this.g=e,this.o=new y("workbox-expiration",1,{onupgradeneeded:e=>this.q(e)})}q(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.g)}async setTimestamp(e,t){const s={url:e=g(e),timestamp:t,cacheName:this.g,id:this.v(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.v(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let r=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.g&&(e&&n.timestamp<e||t&&r>=t?a.push(s.value):r++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}v(e){return this.g+"|"+g(e)}}class b{constructor(e,t={}){this.R=!1,this._=!1,this.O=t.maxEntries,this.D=t.maxAgeSeconds,this.g=e,this.U=new q(e)}async expireEntries(){if(this.R)return void(this._=!0);this.R=!0;const e=this.D?Date.now()-1e3*this.D:0,t=await this.U.expireEntries(e,this.O),s=await self.caches.open(this.g);for(const e of t)await s.delete(e);this.R=!1,this._&&(this._=!1,w(this.expireEntries()))}async updateTimestamp(e){await this.U.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.D){return await this.U.getTimestamp(e)<Date.now()-1e3*this.D}return!1}async delete(){this._=!1,await this.U.expireEntries(1/0)}}class v{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.j(n),a=this.N(s);w(a.expireEntries());const r=a.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.N(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.k=e,this.D=e.maxAgeSeconds,this.L=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}N(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.L.get(e);return s||(s=new b(e,this.k),this.L.set(e,s)),s}j(e){if(!this.D)return!0;const t=this.T(e);return null===t||t>=Date.now()-1e3*this.D}T(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.L)await self.caches.delete(e),await t.delete();this.L=new Map}}const x=(e,t)=>e.filter(e=>t in e),R=async({request:e,mode:t,plugins:s=[]})=>{const n=x(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},O=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),r=await R({plugins:i,request:t,mode:"read"});let c=await a.match(r,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;c=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},D=async({cacheName:e,request:s,response:n,event:i,plugins:r=[],matchOptions:c})=>{const o=await R({plugins:r,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:r,response:n,request:o});if(!h)return;const u=await self.caches.open(e),f=x(r,"cacheDidUpdate"),l=f.length>0?await O({cacheName:e,matchOptions:c,request:o}):null;try{await u.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of f)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:l,newResponse:h,request:o})},U=O,j=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=x(i,"fetchDidFail"),r=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const E={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class N{constructor(e={}){if(this.g=d(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.H=t?e.plugins:[E,...e.plugins]}else this.H=[E];this.W=e.networkTimeoutSeconds||0,this.P=e.fetchOptions,this.M=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const i=[];let a;if(this.W){const{id:t,promise:r}=this.S({request:s,event:e,logs:n});a=t,i.push(r)}const r=this.K({timeoutId:a,request:s,event:e,logs:n});i.push(r);let c=await Promise.race(i);if(c||(c=await r),!c)throw new t("no-response",{url:s.url});return c}S({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this.Y({request:e,event:s}))},1e3*this.W)}),id:n}}async K({timeoutId:e,request:t,logs:s,event:n}){let i,a;try{a=await j({request:t,event:n,fetchOptions:this.P,plugins:this.H})}catch(e){i=e}if(e&&clearTimeout(e),i||!a)a=await this.Y({request:t,event:n});else{const e=a.clone(),s=D({cacheName:this.g,request:t,response:e,event:n,plugins:this.H});if(n)try{n.waitUntil(s)}catch(e){}}return a}Y({event:e,request:t}){return U({cacheName:this.g,request:t,event:e,matchOptions:this.M,plugins:this.H})}}try{self["workbox:background-sync:5.1.3"]&&_()}catch(e){}class k{constructor(e){this.Z=e,this.o=new y("workbox-background-sync",3,{onupgradeneeded:this.C})}async pushEntry(e){delete e.id,e.queueName=this.Z,await this.o.add("requests",e)}async unshiftEntry(e){const[t]=await this.o.getAllMatching("requests",{count:1});t?e.id=t.id-1:delete e.id,e.queueName=this.Z,await this.o.add("requests",e)}async popEntry(){return this.A({direction:"prev"})}async shiftEntry(){return this.A({direction:"next"})}async getAll(){return await this.o.getAllMatching("requests",{index:"queueName",query:IDBKeyRange.only(this.Z)})}async deleteEntry(e){await this.o.delete("requests",e)}async A({direction:e}){const[t]=await this.o.getAllMatching("requests",{direction:e,index:"queueName",query:IDBKeyRange.only(this.Z),count:1});if(t)return await this.deleteEntry(t.id),t}C(e){const t=e.target.result;e.oldVersion>0&&e.oldVersion<3&&t.objectStoreNames.contains("requests")&&t.deleteObjectStore("requests"),t.createObjectStore("requests",{autoIncrement:!0,keyPath:"id"}).createIndex("queueName","queueName",{unique:!1})}}const L=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class T{constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this.I=e}static async fromRequest(e){const t={url:e.url,headers:{}};"GET"!==e.method&&(t.body=await e.clone().arrayBuffer());for(const[s,n]of e.headers.entries())t.headers[s]=n;for(const s of L)void 0!==e[s]&&(t[s]=e[s]);return new T(t)}toObject(){const e=Object.assign({},this.I);return e.headers=Object.assign({},this.I.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this.I.url,this.I)}clone(){return new T(this.toObject())}}const H=new Set,W=e=>{const t={request:new T(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class P{constructor(e,{onSync:s,maxRetentionTime:n}={}){if(this.F=!1,this.B=!1,H.has(e))throw new t("duplicate-queue-name",{name:e});H.add(e),this.h=e,this.G=s||this.replayRequests,this.$=n||10080,this.J=new k(this.h),this.V()}get name(){return this.h}async pushRequest(e){await this.X(e,"push")}async unshiftRequest(e){await this.X(e,"unshift")}async popRequest(){return this.ee("pop")}async shiftRequest(){return this.ee("shift")}async getAll(){const e=await this.J.getAll(),t=Date.now(),s=[];for(const n of e){const e=60*this.$*1e3;t-n.timestamp>e?await this.J.deleteEntry(n.id):s.push(W(n))}return s}async X({request:e,metadata:t,timestamp:s=Date.now()},n){const i={requestData:(await T.fromRequest(e.clone())).toObject(),timestamp:s};t&&(i.metadata=t),await this.J[n+"Entry"](i),this.F?this.B=!0:await this.registerSync()}async ee(e){const t=Date.now(),s=await this.J[e+"Entry"]();if(s){const n=60*this.$*1e3;return t-s.timestamp>n?this.ee(e):W(s)}}async replayRequests(){let e;for(;e=await this.shiftRequest();)try{await fetch(e.request.clone())}catch(s){throw await this.unshiftRequest(e),new t("queue-replay-failed",{name:this.h})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register("workbox-background-sync:"+this.h)}catch(e){}}V(){"sync"in self.registration?self.addEventListener("sync",e=>{if(e.tag==="workbox-background-sync:"+this.h){const t=async()=>{let t;this.F=!0;try{await this.G({queue:this})}catch(e){throw t=e,t}finally{!this.B||t&&!e.lastChance||await this.registerSync(),this.F=!1,this.B=!1}};e.waitUntil(t())}}):this.G({queue:this})}static get te(){return H}}class M{constructor(e,t){this.fetchDidFail=async({request:e})=>{await this.se.pushRequest({request:e})},this.se=new P(e,t)}}try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}class S{constructor(e={}){this.ne=e.statuses,this.ie=e.headers}isResponseCacheable(e){let t=!0;return this.ne&&(t=this.ne.includes(e.status)),this.ie&&t&&(t=Object.keys(this.ie).some(t=>e.headers.get(t)===this.ie[t])),t}}class K{constructor(e){this.cacheWillUpdate=async({response:e})=>this.ae.isResponseCacheable(e)?e:null,this.ae=new S(e)}}function Y(e){return new Promise(t=>setTimeout(t,e))}try{self["workbox:broadcast-update:5.1.3"]&&_()}catch(e){}const Z=["content-length","etag","last-modified"],C=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);function A(e){return{cacheName:e.cacheName,updatedURL:e.request.url}}class I{constructor({headersToCheck:e,generatePayload:t}={}){this.re=e||Z,this.ce=t||A}async notifyIfUpdated(e){var t,s,n;if(e.oldResponse&&(t=e.oldResponse,s=e.newResponse,(n=this.re).some(e=>t.headers.has(e)&&s.headers.has(e))&&!n.every(e=>{const n=t.headers.has(e)===s.headers.has(e),i=t.headers.get(e)===s.headers.get(e);return n&&i}))){const t={type:"CACHE_UPDATED",meta:"workbox-broadcast-update",payload:this.ce(e)};if("navigate"===e.request.mode){let t;e.event instanceof FetchEvent&&(t=e.event.resultingClientId),await async function(e){if(!e)return;let t=await self.clients.matchAll({type:"window"});const s=new Set(t.map(e=>e.id));let n;const i=performance.now();for(;performance.now()-i<2e3&&(t=await self.clients.matchAll({type:"window"}),n=t.find(t=>e?t.id===e:!s.has(t.id)),!n);)await Y(100);return n}(t)&&!C||await Y(3500)}const s=await self.clients.matchAll({type:"window"});for(const e of s)e.postMessage(t)}}}class F{constructor(e){this.cacheDidUpdate=async e=>{w(this.oe.notifyIfUpdated(e))},this.oe=new I(e)}}let B;async function G(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===B){const e=new Response("");if("body"in e)try{new Response(e.body),B=!0}catch(e){B=!1}B=!1}return B}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}function Q(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class ${constructor(e){this.g=l(e),this.he=new Map,this.ue=new Map,this.fe=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=Q(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.he.has(i)&&this.he.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.he.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.fe.has(e)&&this.fe.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.fe.set(e,n.integrity)}if(this.he.set(i,e),this.ue.set(i,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.g),a=await i.keys(),r=new Set(a.map(e=>e.url));for(const[e,t]of this.he)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const i=this.fe.get(s),a=this.ue.get(n);return this.le({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.g),t=await e.keys(),s=new Set(this.he.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async le({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:r}){const c=new Request(s,{integrity:r,cache:n,credentials:"same-origin"});let o,h=await j({event:i,plugins:a,request:c});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:c,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await G(h)),await D({event:i,plugins:a,response:h,request:e===s?c:new Request(e),cacheName:this.g,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.he}getCachedURLs(){return[...this.he.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.he.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.g)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.g,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let J;const V=()=>(J||(J=new $),J);const z=(e,t)=>{const s=V().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let X=!1;function ee(e){X||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=l();self.addEventListener("fetch",a=>{const r=z(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return;let c=self.caches.open(i).then(e=>e.match(r)).then(e=>e||fetch(r));a.respondWith(c)})})(e),X=!0)}const te=[],se={get:()=>te,add(e){te.push(...e)}},ne=e=>{const t=V(),s=se.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},ie=e=>{const t=V();e.waitUntil(t.activate())};var ae;self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),ae={},function(e){V().addToCacheList(e),e.length>0&&(self.addEventListener("install",ne),self.addEventListener("activate",ie))}([{url:"_next/static/chunks/0ef681c39344295862b2ee1ba3b21a13ed2c38bd.dcc0654a3936eda2b6f7.js",revision:"12387e70bdc1a45d9fc5087e671d7510"},{url:"_next/static/chunks/1164dbd84affe5c075e713a039fb33c5972fa3d6.d5b8d4490d873778e142.js",revision:"4e055ede4a4d372b405b0edbb3af4dcf"},{url:"_next/static/chunks/2694fd2ece694c16cf2e4cf6fe0d52ef3b51c681.20f4e20a3427c3246c0d.js",revision:"54658c4fdba119fe71ce949c79480157"},{url:"_next/static/chunks/4a126a3c7525d6c666f3db666e041f350787fd62.2f7e2be75f61466cc64a.js",revision:"a3419c81d2d0f451722418f3d8e6a505"},{url:"_next/static/chunks/4d96fd60274df420a7fb9966240e48af824e7568.1893f3bf367c8bfa7103.js",revision:"a82793a638b06d707954b0ae2e00c3a5"},{url:"_next/static/chunks/63805f20e86cca3fdad8f8306cda9a60597383ba.7430afd69c165a94c170.js",revision:"56be2f38866553fd7ad9881df1bb3255"},{url:"_next/static/chunks/75fc9c18.33c854bd26ab6fd26f01.js",revision:"ac3a509e35739aaaa2a95d7ace367401"},{url:"_next/static/chunks/bf4ea1adcc24d2cf6b018d9656e74263979c1b05.7a6d330a74c10c5c76ca.js",revision:"5527685805bb9007717837e8a8d3f766"},{url:"_next/static/chunks/c3b5aa4009dad866d7ffa4190111446c4fa978c6.6aa0299b04cf6549b617.js",revision:"0df823698165d7216bf3f56e7e8c92b9"},{url:"_next/static/chunks/c9472717107b765c379b31999f848a8e4ccf2da1.d980e87527c201a78647.js",revision:"06670c8009b0b6a3c4b886fb749769e8"},{url:"_next/static/chunks/c9ec74c48d18ab13cce2a886068de15d03dc8a48.ebbf76703823a1791c19.js",revision:"603f889a54eab55ef9266bc4bd9f2844"},{url:"_next/static/chunks/dc7cdc53990bbe837077d8ed0c4d33f6be59357d.b4c0b8495dce90133857.js",revision:"8165e64e4afe3276967eae6d7d76ae69"},{url:"_next/static/chunks/efc90081e8e0b79ef3260668c80fc27675fa83e4.989c349e753a9b5319f4.js",revision:"a433c998c31150815feb754bf6210883"},{url:"_next/static/chunks/f0a4603a35c94621b1a3cfd0448ef998f5d9ff84.401ab2d10cc3d9fb3606.js",revision:"67661514bf2363e03c8bb413dd4cfbe6"},{url:"_next/static/chunks/framework.4dd1003cc9c949c7fcd3.js",revision:"8dbfd54516c12914d3e0cd417cd67882"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/_buildManifest.js",revision:"03e952b8375defe83533a790635124b4"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/_app.js",revision:"c47044947bb574a1567b785ab5880f71"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/_error.js",revision:"2d8b628c6f5619d283c4455785615f13"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin.js",revision:"d1da62532c1597a13071ef8b347d4c8b"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/account.js",revision:"1a8b2fd9ce29f53646ede3601fe33daa"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/account/qrcodeManage.js",revision:"2fa3385e8c9242194b88c957259a278c"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/images.js",revision:"117c1ede792f7802120441ad079daa9d"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/login.js",revision:"14a9d717aa026b2ebaebccf4f984b916"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/manager.js",revision:"c18136d914803c25ea152ebba98bc81d"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/manager/detail.js",revision:"bb3703631cd735ad3d1aa955f3d497d9"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/merchants.js",revision:"87aed23edce0620723660aa5f0c52071"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/order.js",revision:"7b82cfc0f635dd1e1da0012478d03084"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/payapi.js",revision:"27417749dd0d07217f00dc5ad1f6a692"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/register.js",revision:"774ca277bda81d0ef58ab67c54f4d532"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/searchapi.js",revision:"26cb93f180dac0c831ea7dcc203deb98"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/statistics.js",revision:"6df832466a4e8d610e780bd96c0c8610"},{url:"_next/static/q1rrnDDrnOYHU1OiqZW-4/pages/admin/way.js",revision:"998c0f40e6e3d819bf7cf90b1e8a893d"},{url:"_next/static/runtime/main-b348421c277d46b53882.js",revision:"2e56040f8fa3655bcc2e1a882ead8611"},{url:"_next/static/runtime/polyfills-6d6f52812362f087d75f.js",revision:"9bdf6a23a3e2492ba9e5c4703606e871"},{url:"_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"}]),ee(ae),h(/^https?.*/,new N({cacheName:"offlineCache",plugins:[new v({maxEntries:200,purgeOnQuotaError:!0})]}),"GET"),h(/\.(?:js|css)$/,new class{constructor(e={}){if(this.g=d(e.cacheName),this.H=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.H=t?e.plugins:[E,...e.plugins]}else this.H=[E];this.P=e.fetchOptions,this.M=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const n=this.de({request:s,event:e});let i,a=await U({cacheName:this.g,request:s,event:e,matchOptions:this.M,plugins:this.H});if(a){if(e)try{e.waitUntil(n)}catch(i){}}else try{a=await n}catch(e){i=e}if(!a)throw new t("no-response",{url:s.url,error:i});return a}async de({request:e,event:t}){const s=await j({request:e,event:t,fetchOptions:this.P,plugins:this.H}),n=D({cacheName:this.g,request:e,response:s.clone(),event:t,plugins:this.H});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"fay-resource-cache",fetchOptions:{mode:"no-cors"},matchOptions:{ignoreSearch:!0},plugins:[new v({maxEntries:500,maxAgeSeconds:604800,purgeOnQuotaError:!0}),new M("fay-resource-queue",{maxRetentionTime:3600}),new K({statuses:[0,200],headers:{"x-test":"true"}}),new F({channelName:"fay-resource-update"})]}),"GET"),h(/api/,new N({cacheName:"fay-api-cache",networkTimeoutSeconds:10,fetchOptions:{mode:"no-cors"},matchOptions:{ignoreSearch:!0},plugins:[new v({maxEntries:5,maxAgeSeconds:60,purgeOnQuotaError:!0}),new M("fay-api-queue",{maxRetentionTime:3600}),new K({statuses:[0,200],headers:{"x-test":"true"}}),new F({channelName:"fay-api-update"})]}),"GET"),h(/.png$/,new class{constructor(e={}){this.g=d(e.cacheName),this.H=e.plugins||[],this.P=e.fetchOptions,this.M=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,i=await U({cacheName:this.g,request:s,event:e,matchOptions:this.M,plugins:this.H});if(!i)try{i=await this.de(s,e)}catch(e){n=e}if(!i)throw new t("no-response",{url:s.url,error:n});return i}async de(e,t){const s=await j({request:e,event:t,fetchOptions:this.P,plugins:this.H}),n=s.clone(),i=D({cacheName:this.g,request:e,response:n,event:t,plugins:this.H});if(t)try{t.waitUntil(i)}catch(e){}return s}},"GET"),h(/.html$/,new N({plugins:[new K({statuses:[0,200]})]}),"GET");
