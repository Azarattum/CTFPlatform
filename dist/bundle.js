!function(t){var e={};function n(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(a,r,function(e){return t[e]}.bind(null,r));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=30)}([function(t,e,n){"use strict";n.d(e,"b",(function(){return Utils})),n.d(e,"a",(function(){return a}));class Utils{static log(t,e=a.INFO){const n=`[${(new Date).toTimeString().split(" ")[0]}]: `;switch(e){case a.INFO:console.log(n+"%ci "+t,"font-weight:bold;");break;case a.OK:console.log(n+"%c✔ "+t,"color:green;font-weight:bold;");break;case a.ERROR:console.error(n+"%c✘ "+t,"color:red;font-weight:bold;");break;case a.WARNING:console.log(n+"%c! "+t,"color:goldenrod;font-weight:bold;");break;case a.DIVIDER:{const e="=".repeat(30-t.length/2);console.log(e+t+e+(t.length%2?"=":""));break}default:throw new TypeError("Unknown log type!")}}}var a;!function(t){t[t.INFO=0]="INFO",t[t.OK=1]="OK",t[t.WARNING=2]="WARNING",t[t.ERROR=3]="ERROR",t[t.DIVIDER=4]="DIVIDER"}(a||(a={}))},function(t,e,n){"use strict";function a(){class Service{static addEventListener(t,e){t in this.callbacks||(this.callbacks[t]=[]),this.callbacks[t].push(e)}static call(t,...e){this.callbacks[t]&&this.callbacks[t].map(t=>t.call(t,...e))}static expose(t,e=null){if(window[this.name]||(window[this.name]={}),e)window[this.name][t]=e;else{if("function"!=typeof this[t])throw new Error("The function to expose not found!");window[this.name][t]=(...e)=>{this[t].call(this,...e)}}}}return Service.callbacks={},Service}n.d(e,"a",(function(){return a}))},function(t,e,n){"use strict";n.d(e,"b",(function(){return Api})),n.d(e,"a",(function(){return a}));var a,r=n(19);class Api{constructor(t,e=80,n=!0){this.ip=t,this.port=e,this.UUID=null,this.cachingUUID=n}async call(t,e,n=null){this.cachingUUID&&this.UUID&&(e.UUID=this.UUID);let s=`http://${this.ip}:${this.port}/${a[t]}?${n?"param="+n+"&":""}${e?"data="+JSON.stringify(e):""}`;s=encodeURI(s);const i=new r.a([s]);let o=(await i.load())[0];return o?("string"==typeof o&&(o=JSON.parse(o)),o.Data.UUID&&(this.UUID=o.Data.UUID),{success:"success"===o.Answer.toLowerCase(),data:o.Data}):{success:!1,data:{}}}freeUUID(){this.UUID=null}forceUUID(t){this.cachingUUID=!0,this.UUID=t}}!function(t){t[t.auth=0]="auth",t[t.event=1]="event",t[t.task=2]="task",t[t.scoreboard=3]="scoreboard"}(a||(a={}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return Tasks}));var a=n(1),r=n(2),s=n(6),i=n(12);class Tasks extends(Object(a.a)()){static initialize(t){this.api=t}static async getTasks(){if(this.cache)return this.cache;if(!this.api)return[];if(!this.event){const t=await this.api.call(r.a.event,{Name:"",Page:0});if(!t.success)throw new Error("Unable to load event!");this.event=new i.a(+t.data[0].id_event,t.data[0].date_end)}const t=await this.api.call(r.a.task,{id_event:this.event.id});if(!t.success)throw new Error("Unable to load tasks!");const e=[];for(const n of t.data)e.push(new s.b(n.id_task,n.task_name,n.task_category,n.task_point,n.close,n.task_description,n.task_link));return this.cache=e,e}static async getUsername(){if(!this.api)return"";const t=await this.api.call(r.a.auth,{},"get_user_name");return t.success?t.data.name:""}static async submitFlag(t,e){if(!this.api)return!1;if(!this.event){const t=await this.api.call(r.a.event,{Name:"",Page:0});if(!t.success)throw new Error("Unable to load event!");this.event=new i.a(+t.data[0].id_event,t.data[0].date_end)}return(await this.api.call(r.a.task,{Task_id:t,Task_flag:e,id_event:this.event.id},"check")).success}}Tasks.api=null,Tasks.event=null,Tasks.cache=null},function(t,e,n){"use strict";n.d(e,"a",(function(){return Tabs}));var a=n(1);class Tabs extends(Object(a.a)()){static initialize(t){this.tabs=t,this.expose("change")}static change(t){const e=this.tabs.find(e=>e.name.toLowerCase()==t.toLowerCase());if(!e)throw new Error(`Tab ${t} does not exist!`);this.tabs.forEach(t=>t.toggle(!1)),e.toggle(!0),this.call("tabchanged",e.name)}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return View}));class View{constructor(t,e=null){this.name=t,this.windowLoaded="complete"===document.readyState,this.template=e,this.windowLoaded||window.addEventListener("load",()=>{this.windowLoaded=!0,this.template&&this.render(this.template)})}render(t=null,e={}){this.windowLoaded?(t||(t=this.template),e||(e={}),t&&(this.container.innerHTML=t(e),this.template=null)):this.template=t}toggle(t=null){null==t&&(t="none"==this.container.style.display),this.container.style.display=t?"block":"none"}get container(){const t=document.querySelector(`[view=${this.name.toLowerCase()}]`);if(!t)throw new Error(`Container ${this.name} not found!`);return t}}},function(t,e,n){"use strict";n.d(e,"b",(function(){return Task})),n.d(e,"a",(function(){return a}));class Task{constructor(t,e,n,r=0,s=!1,i="",o=""){this.id=t,this.name=e,this.points=r,this.solved=s,this.description=i;try{this.link=new URL(o)}catch(t){this.link=null}this.category="string"==typeof n?a[n]:n}}var a;!function(t){t[t.admin=0]="admin",t[t.crypto=1]="crypto",t[t.exploit=2]="exploit",t[t.forensic=3]="forensic",t[t.joy=4]="joy",t[t.ppc=5]="ppc",t[t.pwn=6]="pwn",t[t.reverse=7]="reverse",t[t.stegano=8]="stegano",t[t.web=9]="web"}(a||(a={}))},function(t,e,n){"use strict";n.d(e,"a",(function(){return Tasks}));var a=n(3),r=n(6),s=n(1);class Tasks extends(Object(s.a)()){static initialize(){this.containers={};for(const t of Object.keys(r.a).filter(t=>!Number.isInteger(+t))){const e=document.getElementById(t+"-tasks-list");if(!e)throw new Error("Container for "+t+" tasks not found!");this.containers[t]=e}this.expose("showCategory"),this.expose("submitFlag"),this.expose("logout"),this.showCategory(r.a[0])}static renderTasks(t){if(this.containers){for(const t of Object.values(this.containers))t.innerHTML="";for(const e of t){const t=this.containers[r.a[e.category]],n=document.createElement("div");n.classList.add("task"),n.id="task-"+e.id,e.solved&&n.classList.add("solved");const a=document.createElement("div");a.classList.add("name"),a.textContent=e.name;const s=document.createElement("div");s.classList.add("points"),s.textContent=e.points.toString();const i=document.createElement("a");i.classList.add("link"),e.link&&(i.target="_blank",i.textContent="CLICK ME",i.href=e.link.href);const o=document.createElement("div");o.classList.add("description"),o.innerHTML=e.description;const c=document.createElement("input");c.addEventListener("animationend",()=>{c.classList.remove("apply-shake")}),c.type="text",c.placeholder="ELON{\\S+}",c.pattern="ELON\\{\\S+\\}";const l=document.createElement("button");l.innerHTML="&#10004;&#65039;",l.onclick=()=>{this.submitFlag(e.id,c.value)},n.appendChild(a),e.link&&n.appendChild(i),n.appendChild(o),n.appendChild(c),n.appendChild(l),n.appendChild(s),t.appendChild(n)}}}static showCategory(t){if(this.containers){for(const t of Object.values(this.containers))t.style.display="none";this.containers[t].style.display="block",this.call("categorychanged",t)}}static async submitFlag(t,e){const n=await a.a.submitFlag(t,e),r=document.getElementById("task-"+t);if(r)if(n)r.classList.add("solved");else{const t=r.querySelector("input");t.value="",t&&t.classList.add("apply-shake")}}static logout(){this.call("logouted")}}Tasks.containers=null},function(t,e,n){"use strict";n.d(e,"a",(function(){return Hash}));var a=n(1);class Hash extends(Object(a.a)()){static initialize(t){const e={};for(const n in t){const a=this.get(n);if(a){e[n]=a;continue}const r=t[n];this.set(n,r.toString()),e[n]=r.toString()}this.call("loaded",e)}static get(t){this.validateString(t);const e=window.location.hash.slice(1).split(",");for(const n of e){if(n.split(":")[0].toLocaleLowerCase()==t.toLocaleLowerCase())return n.split(":")[1]}return null}static freeze(t=!0){this.frozen=t}static set(t,e){if(this.frozen)return;e=e.toString();const n=window.location.hash;this.validateString(t),this.validateString(e),this.exists(t)||(n.trim().endsWith(",")||""==n||"#"==n||(window.location.hash+=","),window.location.hash+=t+":"+e);const a=new RegExp(t+":([^,]*|$)");window.location.hash=window.location.hash.replace(a,t+":"+e)}static exists(t){return-1!=window.location.hash.toLowerCase().indexOf(t.toLowerCase()+":")}static validateString(t){if(-1!=t.toString().indexOf(",")||-1!=t.toString().indexOf(":"))throw new Error("Illegal characters in property!")}}Hash.frozen=!1},function(t,e,n){"use strict";n.d(e,"a",(function(){return Login}));var a=n(1);class Login extends(Object(a.a)()){static initialize(){const t=document.getElementById("login-field"),e=document.getElementById("password-field"),n=document.getElementById("login-button");if(!t||!e||!n)throw new Error("Containers for login not found!");this.loginField=t,this.passwordField=e,this.loginButton=n,this.loginButton.originalContent=this.loginButton.textContent,n.addEventListener("click",()=>{this.loginField&&this.passwordField&&this.loginButton&&this.call("logined",this.loginField.value,this.passwordField.value)})}static setStatus(t){this.loginButton&&(this.loginButton.textContent=t,clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.loginButton&&(this.loginButton.textContent=this.loginButton.originalContent)},2e3))}}Login.loginField=null,Login.passwordField=null,Login.loginButton=null},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",a=t[3];if(!a)return n;if(e&&"function"==typeof btoa){var r=(i=a,o=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(c," */")),s=a.sources.map((function(t){return"/*# sourceURL=".concat(a.sourceRoot).concat(t," */")}));return[n].concat(s).concat([r]).join("\n")}var i,o,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},r=0;r<this.length;r++){var s=this[r][0];null!=s&&(a[s]=!0)}for(var i=0;i<t.length;i++){var o=t[i];null!=o[0]&&a[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="(".concat(o[2],") and (").concat(n,")")),e.push(o))}},e}},function(t,e,n){"use strict";var a,r={},s=function(){return void 0===a&&(a=Boolean(window&&document&&document.all&&!window.atob)),a},i=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}();function o(t,e){for(var n=[],a={},r=0;r<t.length;r++){var s=t[r],i=e.base?s[0]+e.base:s[0],o={css:s[1],media:s[2],sourceMap:s[3]};a[i]?a[i].parts.push(o):n.push(a[i]={id:i,parts:[o]})}return n}function c(t,e){for(var n=0;n<t.length;n++){var a=t[n],s=r[a.id],i=0;if(s){for(s.refs++;i<s.parts.length;i++)s.parts[i](a.parts[i]);for(;i<a.parts.length;i++)s.parts.push(m(a.parts[i],e))}else{for(var o=[];i<a.parts.length;i++)o.push(m(a.parts[i],e));r[a.id]={id:a.id,refs:1,parts:o}}}}function l(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var a=n.nc;a&&(t.attributes.nonce=a)}if(Object.keys(t.attributes).forEach((function(n){e.setAttribute(n,t.attributes[n])})),"function"==typeof t.insert)t.insert(e);else{var r=i(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var d,u=(d=[],function(t,e){return d[t]=e,d.filter(Boolean).join("\n")});function p(t,e,n,a){var r=n?"":a.css;if(t.styleSheet)t.styleSheet.cssText=u(e,r);else{var s=document.createTextNode(r),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(s,i[e]):t.appendChild(s)}}function h(t,e,n){var a=n.css,r=n.media,s=n.sourceMap;if(r&&t.setAttribute("media",r),s&&btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=a;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(a))}}var g=null,f=0;function m(t,e){var n,a,r;if(e.singleton){var s=f++;n=g||(g=l(e)),a=p.bind(null,n,s,!1),r=p.bind(null,n,s,!0)}else n=l(e),a=h.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return a(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;a(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s());var n=o(t,e);return c(n,e),function(t){for(var a=[],s=0;s<n.length;s++){var i=n[s],l=r[i.id];l&&(l.refs--,a.push(l))}t&&c(o(t,e),e);for(var d=0;d<a.length;d++){var u=a[d];if(0===u.refs){for(var p=0;p<u.parts.length;p++)u.parts[p]();delete r[u.id]}}}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Event}));class Event{constructor(t,e){this.id=t,this.end=new Date(e)}}},function(t,e,n){"use strict";var a=Object.prototype.hasOwnProperty;function r(t,e){return Array.isArray(t)?function(t,e){for(var n,a="",s="",i=Array.isArray(e),o=0;o<t.length;o++)(n=r(t[o]))&&(i&&e[o]&&(n=c(n)),a=a+s+n,s=" ");return a}(t,e):t&&"object"==typeof t?function(t){var e="",n="";for(var r in t)r&&t[r]&&a.call(t,r)&&(e=e+n+r,n=" ");return e}(t):t||""}function s(t){if(!t)return"";if("object"==typeof t){var e="";for(var n in t)a.call(t,n)&&(e=e+n+":"+t[n]+";");return e}return t+""}function i(t,e,n,a){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(a?t:t+'="'+t+'"');var r=typeof e;return"object"!==r&&"function"!==r||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=c(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}e.merge=function t(e,n){if(1===arguments.length){for(var a=e[0],r=1;r<e.length;r++)a=t(a,e[r]);return a}for(var i in n)if("class"===i){var o=e[i]||[];e[i]=(Array.isArray(o)?o:[o]).concat(n[i]||[])}else if("style"===i){o=(o=s(e[i]))&&";"!==o[o.length-1]?o+";":o;var c=s(n[i]);c=c&&";"!==c[c.length-1]?c+";":c,e[i]=o+c}else e[i]=n[i];return e},e.classes=r,e.style=s,e.attr=i,e.attrs=function(t,e){var n="";for(var o in t)if(a.call(t,o)){var c=t[o];if("class"===o){c=r(c),n=i(o,c,!1,e)+n;continue}"style"===o&&(c=s(c)),n+=i(o,c,!1,e)}return n};var o=/["&<>]/;function c(t){var e=""+t,n=o.exec(e);if(!n)return t;var a,r,s,i="";for(a=n.index,r=0;a<e.length;a++){switch(e.charCodeAt(a)){case 34:s="&quot;";break;case 38:s="&amp;";break;case 60:s="&lt;";break;case 62:s="&gt;";break;default:continue}r!==a&&(i+=e.substring(r,a)),r=a+1,i+=s}return r!==a?i+e.substring(r,a):i}e.escape=c,e.rethrow=function t(e,a,r,s){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&a||s))throw e.message+=" on line "+r,e;try{s=s||n(35).readFileSync(a,"utf8")}catch(n){t(e,null,r)}var i=3,o=s.split("\n"),c=Math.max(r-i,0),l=Math.min(o.length,r+i);i=o.slice(c,l).map((function(t,e){var n=e+c+1;return(n==r?"  > ":"    ")+n+"| "+t})).join("\n");throw e.path=a,e.message=(a||"Pug")+":"+r+"\n"+i+"\n\n"+e.message,e}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Scoreboard}));class Scoreboard{static initialize(){const t=document.getElementById("scoreboard");if(!t)throw new Error("Container for scoreboard render not found!");this.container=t}static renderScoreboard(t){if(!this.container)return;const e=this.container.childNodes.length;for(let t=1;t<e;t++){const t=this.container.childNodes[1];this.container.removeChild(t)}for(let e=0;e<t.users.length;e++){const n=t.users[e],a=document.createElement("tr"),r=document.createElement("td");r.innerText=(e+1).toString();const s=document.createElement("td");s.innerText=n.name;const i=document.createElement("td");i.innerText=n.points.toString(),a.appendChild(r),a.appendChild(s),a.appendChild(i),this.container.appendChild(a)}}}Scoreboard.container=null},function(t,e,n){"use strict";n.d(e,"a",(function(){return Scoreboard}));var a=n(1),r=n(16),s=n(12),i=n(2),o=n(21);class Scoreboard extends(Object(a.a)()){static initialize(t){this.api=t}static async getScoreboard(){if(!this.api)return new r.a;if(!this.event){const t=await this.api.call(i.a.event,{Name:"",Page:0});if(!t.success)throw new Error("Unable to load event!");this.event=new s.a(+t.data[0].id_event,t.data[0].date_end)}const t=await this.api.call(i.a.scoreboard,{id_event:this.event.id});if(!t.success)return new r.a;const e=new r.a;for(const n of t.data){const t=new o.a(+n.id_user,n.name,n.time,n.point);e.addUser(t)}return e}}Scoreboard.api=null,Scoreboard.event=null},function(t,e,n){"use strict";n.d(e,"a",(function(){return Scoreboard}));class Scoreboard{constructor(t=[]){this.users=t}addUser(t){this.users.push(t)}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return App}));var a=n(18),r=n(6),s=n(2),i=n(9),o=n(7),c=n(14),l=n(20),d=n(3),u=n(15),p=n(4),h=n(22),g=n(24),f=n(26),m=n(28),b=n(8);class App{constructor(){this.manger=null}async initialize(){const t=new s.b("90.189.168.29",13451),e=[i.a,o.a,c.a,p.a,d.a,u.a,l.a,b.a],n=[new h.a,new g.a,new m.a,new f.a];this.manger=new a.a(e,n);const r=await this.generateComponetArguments(t),v=await this.generateViewArguments();await this.manger.initialize(r,v),p.a.change("Login")}async generateComponetArguments(t){if(!this.manger)throw new Error("Initialize manager first!");return{Events:[t],Tasks:[t],Scoreboard:[t],Tabs:[[this.manger.getView("Login"),this.manger.getView("Tasks"),this.manger.getView("Scoreboard")]]}}async generateViewArguments(){if(!this.manger)throw new Error("Initialize manager first!");return{Tasks:{categories:Object.keys(r.a).filter(t=>!Number.isInteger(+t)).map(t=>t.replace(/.{1}/,t.charAt(0).toUpperCase()))}}}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Manager}));var a=n(0);class Manager{constructor(t,e=[]){this.logging=!0,this.components=t,this.views=e}async initialize(t=[],e=[]){let n=0;this.logging&&a.b.log("Initializtion started..."),this.logging&&a.b.log("Views",a.a.DIVIDER);for(const t in this.views){const r=this.views[t];try{const n=Array.isArray(e)?e[t]:e[r.name];n?await r.render(null,n):await r.render(),this.logging&&a.b.log(`${r.name} rendered!`,a.a.OK)}catch(t){this.logging&&a.b.log(`${r.name} render exception:\n\t`+`${t.stack.replace(/\n/g,"\n\t")}`,a.a.ERROR),n++}}this.logging&&a.b.log("Components",a.a.DIVIDER);for(const e in this.components){const r=this.components[e];try{const n=Array.isArray(t)?t[e]:t[r.name];n?await r.initialize(...n):await r.initialize(),this.logging&&a.b.log(`${r.name} initialized!`,a.a.OK)}catch(t){this.logging&&a.b.log(`${r.name} initialization exception:\n\t`+`${t.stack.replace(/\n/g,"\n\t")}`,a.a.ERROR),n++}}this.logging&&(a.b.log("",a.a.DIVIDER),n?a.b.log(`Initialization completed with ${n} exceptions!`,a.a.WARNING):a.b.log("Successfyly initialized!",a.a.OK))}getComponent(t){return this.components.find(e=>e.name.toLowerCase()==t.toLowerCase())||null}getView(t){return this.views.find(e=>e.name.toLowerCase()==t.toLowerCase())||null}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Loader}));class Loader{constructor(t){this.urls=t}async load(){const t=[];for(const e of this.urls){const n=await this.request("GET",e);t.push(n)}return[...t]}async request(t,e){return new Promise((function(n,a){const r=new XMLHttpRequest;e.replace(new RegExp("/$"),"").endsWith(".json")&&(r.overrideMimeType("application/json"),r.responseType="json"),r.open(t,e),r.onload=function(){this.status>=200&&this.status<300?n(r.response):a({status:this.status,statusText:r.statusText})},r.onerror=function(){a({status:this.status,statusText:r.statusText})},r.send()}))}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Events}));var a=n(1),r=n(2),s=n(9),i=n(4),o=n(7),c=n(8);class Events extends(Object(a.a)()){static async initialize(t){this.api=t,this.registerLogin(),this.registerTasks(),this.registerTabs(),this.registerHash(),this.call("registered")}static registerLogin(){s.a.addEventListener("logined",async(t,e)=>{const n=await this.api.call(r.a.auth,{Login:t,Password:e});n.success?(document.cookie="session="+n.data.UUID,s.a.setStatus("Loading..."),i.a.change("Tasks")):s.a.setStatus("Try Again")})}static registerTasks(){o.a.addEventListener("logouted",()=>{document.cookie="session=",i.a.change("login")}),o.a.addEventListener("categorychanged",t=>{c.a.set("category",t)})}static registerTabs(){i.a.addEventListener("tabchanged",t=>{const e=document.cookie.split(";").find(t=>"session"==t.split("=")[0]);"login"==t.toLowerCase()?e&&e.split("=")[1]&&(this.api.forceUUID(e.split("=")[1]),i.a.change("Tasks")):"tasks"==t.toLowerCase()&&(e&&e.split("=")[1]||i.a.change("Login"))})}static registerHash(){c.a.addEventListener("loaded",t=>{c.a.exists("category")&&o.a.showCategory(c.a.get("category")||"")})}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return User}));class User{constructor(t,e,n=null,a=0){this.id=t,this.name=e,this.points=a,this.lastFlag=n?new Date(n):null}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Login}));n(33);var a=n(23),r=n.n(a),s=n(5);class Login extends s.a{constructor(){super("Login"),this.template=r.a}}},function(t,e,n){n(13);t.exports=function(t){var e="";return e+='<div class="login-wrapper"><div class="title">Elon CTF</div><div class="form gradient-border"><input id="login-field" type="text" name="login" placeholder="Login"><input id="password-field" type="password" name="passw" placeholder="Password"><button id="login-button" type="submit" value="Sign in">Login</button></div></div>'}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Tasks}));n(36);var a=n(25),r=n.n(a),s=n(5),i=n(7),o=n(3);class Tasks extends s.a{constructor(){super("Tasks"),this.template=r.a}toggle(t){if(super.toggle(t),t){o.a.getTasks().then(t=>{i.a.renderTasks(t)}),o.a.getUsername().then(t=>{const e=document.getElementById("username");e&&(e.textContent=t)})}}}},function(t,e,n){var a=n(13);t.exports=function(t){var e,n="",r=t||{};return function(t){n+='<div class="top-panel"><img class="logo" src="assets/logo.png"><div id="username"></div><img class="scoreboard" src="assets/scoreboard.svg" title="Scoreboard" onclick="Tabs.change(\'Scoreboard\')"><img class="exit" src="assets/exit.svg" title="Log out" onclick="Tasks.logout()"></div><div class="tasks-wrapper"><div class="categories gradient-border">',function(){var r=t;if("number"==typeof r.length)for(var s=0,i=r.length;s<i;s++){var o=r[s];n=n+'<div class="category"'+a.attr("onclick",'Tasks.showCategory("'+o.toLowerCase()+'")',!0,!0)+">"+a.escape(null==(e=o)?"":e)+'<div class="icon"'+a.attr("style",a.style("background-image: url(assets/"+o.toLowerCase()+".svg)"),!0,!0)+"></div></div>"}else{i=0;for(var s in r){i++;o=r[s];n=n+'<div class="category"'+a.attr("onclick",'Tasks.showCategory("'+o.toLowerCase()+'")',!0,!0)+">"+a.escape(null==(e=o)?"":e)+'<div class="icon"'+a.attr("style",a.style("background-image: url(assets/"+o.toLowerCase()+".svg)"),!0,!0)+"></div></div>"}}}.call(this),n+='</div><div class="tasks">',function(){var e=t;if("number"==typeof e.length)for(var r=0,s=e.length;r<s;r++){var i=e[r];n=n+'<div class="task-list"'+a.attr("id",i.toLowerCase()+"-tasks-list",!0,!0)+"></div>"}else{s=0;for(var r in e){s++;i=e[r];n=n+'<div class="task-list"'+a.attr("id",i.toLowerCase()+"-tasks-list",!0,!0)+"></div>"}}}.call(this),n+="</div></div>"}.call(this,"categories"in r?r.categories:"undefined"!=typeof categories?categories:void 0),n}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Background}));n(38);var a=n(27),r=n.n(a),s=n(5);class Background extends s.a{constructor(){super("Background"),this.template=r.a}}},function(t,e,n){n(13);t.exports=function(t){var e="";return e+='<div class="hologram"></div>'}},function(t,e,n){"use strict";n.d(e,"a",(function(){return Scoreboard}));n(40);var a=n(29),r=n.n(a),s=n(5),i=n(15),o=n(14),c=n(3);class Scoreboard extends s.a{constructor(){super("Scoreboard"),this.template=r.a}toggle(t){if(super.toggle(t),t){i.a.getScoreboard().then(t=>{o.a.renderScoreboard(t),c.a.getUsername().then(t=>{if(!t)return;const e=document.getElementsByTagName("td");for(const n of e)if(n.textContent==t){const t=n.parentElement;t&&t.classList.add("gradient-border");break}})})}}}},function(t,e,n){n(13);t.exports=function(t){var e="";return e+='<div class="top-panel"><img class="logo" src="assets/logo.png"><img class="exit" src="assets/back.svg" title="Back" onclick="Tabs.change(\'Login\')"></div><div class="scoreboard-wrapper"><table><tbody id="scoreboard"><tr><td><img class="icon" src="assets/place.svg" title="Place"></td><td><img class="icon" src="assets/user.svg" title="User"></td><td><img class="icon" src="assets/points.svg" title="Points"></td></tr></tbody></table></div>'}},function(t,e,n){"use strict";n.r(e);n(31);const a=new(n(17).a);window.addEventListener("load",async()=>{await a.initialize()})},function(t,e,n){var a=n(32);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};n(11)(a,r);a.locals&&(t.exports=a.locals)},function(t,e,n){(t.exports=n(10)(!1)).push([t.i,"body{margin:0;overflow-x:hidden;overflow-y:auto;background-color:#05050f}.page{--color-background: hsl(240, 50%, 4%);--color-text: hsl(190, 100%, 84%);--color-ui: hsl(240, 50%, 4.5%);--color-ui-active: hsl(240, 50%, 3%);--color-theme-1: hsla(250, 80%, 15%, 0.5);--color-theme-2: hsla(260, 100%, 50%, 0.2);--color-theme-3: hsla(270, 80%, 5%, 0.5);--color-theme-4: hsla(190, 100%, 50%, 0.2);--color-theme-5: hsla(200, 80%, 10%, 0.5);--color-theme-6: hsla(220, 80%, 15%, 0.5);--color-theme-7: hsla(230, 100%, 50%, 0.2);--color-theme-8: hsla(240, 80%, 20%, 0.5);height:100%;min-height:100vh;min-width:100vw;background-color:var(--color-background);color:var(--color-text);font-size:16px;font-family:Arial, Helvetica, sans-serif}::-webkit-scrollbar{width:8px;background-color:#05050f}::-webkit-scrollbar-thumb{background:rgba(173,241,255,0.2);border-radius:10px;transition:0.2s}::-webkit-scrollbar-thumb:hover{background:rgba(173,241,255,0.4)}::-webkit-scrollbar-thumb:active{background:rgba(173,241,255,0.8)}.tab-content{display:none;width:100vw}.gradient-border{position:relative;background-color:var(--color-background);border-radius:var(--border-width)}.gradient-border:after{content:'';position:absolute;top:calc(-1 * var(--border-width));left:calc(-1 * var(--border-width));height:calc(100% + var(--border-width) * 2);width:calc(100% + var(--border-width) * 2);background:linear-gradient(60deg, var(--color-theme-1), var(--color-theme-2), var(--color-theme-3), var(--color-theme-4), var(--color-theme-5), var(--color-theme-6), var(--color-theme-7), var(--color-theme-8));border-radius:calc(2 * var(--border-width));z-index:-1;animation:animatedgradient 3s ease alternate infinite;background-size:300% 300%}input{outline:none;border:none;padding:16px;margin:8px;border-radius:2px;background-color:var(--color-ui);color:var(--color-text)}button{outline:none;border:none;padding:16px;margin:8px;border-radius:2px;background-color:var(--color-ui);color:var(--color-text);font-weight:bold;font-size:1.5em;box-shadow:0 6px 16px rgba(0,0,0,0.4);transition:0.3s;cursor:pointer}button:hover{box-shadow:0 3px 8px rgba(0,0,0,0.8);transform:translateY(5%) scale(0.99)}button:active{background-color:var(--color-ui-active)}@keyframes animatedgradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}\n",""])},function(t,e,n){var a=n(34);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};n(11)(a,r);a.locals&&(t.exports=a.locals)},function(t,e,n){(e=t.exports=n(10)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Montserrat&display=swap);",""]),e.push([t.i,".login-wrapper{display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;min-height:100vh;z-index:1;transform:translate(0, 0)}.login-wrapper .title{font-size:5em;font-family:Montserrat;opacity:0.9;text-shadow:0px 6px 16px black}.login-wrapper .form{--border-width: 4px;padding:16px;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;box-shadow:0px 6px 16px rgba(0,0,0,0.4)}.login-wrapper .form button{width:100%}\n",""])},function(t,e){},function(t,e,n){var a=n(37);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};n(11)(a,r);a.locals&&(t.exports=a.locals)},function(t,e,n){(t.exports=n(10)(!1)).push([t.i,".tasks-wrapper{display:flex;transform:translate(0, 0)}.tasks-wrapper .categories{position:sticky;float:left;top:0px;--border-width: 4px;display:flex;justify-content:space-evenly;flex-direction:column;align-items:center;width:max-content;height:100vh;box-shadow:4px 0px 4px rgba(0,0,0,0.4)}.tasks-wrapper .categories .category{width:150px;padding:16px;background-color:var(--color-ui);transform:translate(0, 0);box-shadow:0px 4px 4px rgba(0,0,0,0.2);border-top-right-radius:4px;border-bottom-right-radius:4px;transition:0.3s;cursor:pointer}.tasks-wrapper .categories .category:hover{box-shadow:0 3px 8px rgba(0,0,0,0.8);transform:translateY(5%) scale(0.99)}.tasks-wrapper .categories .category:active{background-color:var(--color-ui-active)}.tasks-wrapper .categories .category .icon{position:absolute;right:8px;top:50%;height:32px;width:32px;background-size:contain;transform:translateY(-50%);filter:invert(1)}.tasks-wrapper .tasks{display:flex;flex-direction:column;align-items:center;width:100%;min-width:500px;margin:32px}.tasks-wrapper .tasks .task-list{display:none}.tasks-wrapper .tasks .task-list .task{margin:32px;padding:16px;width:calc(100% - 96px);max-width:600px;border-radius:8px;background-color:rgba(0,0,0,0.1);box-shadow:0px 0px 6px rgba(0,0,0,0.8)}.tasks-wrapper .tasks .task-list .task .name{margin-right:auto;font-size:2em;font-weight:bold;text-shadow:0px 4px 8px rgba(0,0,0,0.8)}.tasks-wrapper .tasks .task-list .task .points{font-size:2em;font-weight:bold;padding:16px;text-align:end}.tasks-wrapper .tasks .task-list .task .link{font-size:0.8em;filter:saturate(0) invert(1)}.tasks-wrapper .tasks .task-list .task .description{margin:8px}.tasks-wrapper .tasks .task-list .task input{float:left;height:16px;width:200px;box-shadow:0px 0px 6px rgba(0,0,0,0.8)}.tasks-wrapper .tasks .task-list .task button{float:left;font-size:1.5em;padding:10px}.tasks-wrapper .tasks .task-list .task.solved{--border-width: 0px;position:relative}.tasks-wrapper .tasks .task-list .task.solved:after{content:'';position:absolute;top:calc(-1 * var(--border-width));left:calc(-1 * var(--border-width));height:calc(100% + var(--border-width) * 2);width:calc(100% + var(--border-width) * 2);background:linear-gradient(60deg, var(--color-theme-1), var(--color-theme-2), var(--color-theme-3), var(--color-theme-4), var(--color-theme-5), var(--color-theme-6), var(--color-theme-7), var(--color-theme-8));border-radius:8px;z-index:-1;animation:animatedgradient 3s ease alternate infinite;background-size:300% 300%}.tasks-wrapper .tasks .task-list .task.solved input,.tasks-wrapper .tasks .task-list .task.solved button{display:none}.tasks-wrapper .tasks .task-list .task.solved .name{text-shadow:none}.tasks-wrapper .tasks .task-list .task.solved:before{content:\"[SOLVED]\";font-weight:bold}.top-panel{position:fixed;top:0px;right:0px;width:max-content;height:64px;border-bottom-left-radius:16px;z-index:100;background-color:var(--color-ui-active);box-shadow:0px 8px 8px rgba(0,0,0,0.8)}.top-panel .logo{float:left;width:64px;height:64px;margin-left:16px;border-bottom-left-radius:16px}.top-panel .exit{padding:16px;width:32px;height:32px;cursor:pointer}.top-panel .scoreboard{padding:16px;width:32px;height:32px;cursor:pointer}.top-panel #username{float:left;margin-left:16px;margin-right:16px;line-height:64px;font-size:1.5em;font-weight:bold}@keyframes shake{10%,90%{transform:translate3d(-1px, 0, 0)}20%,80%{transform:translate3d(2px, 0, 0)}30%,50%,70%{transform:translate3d(-4px, 0, 0)}40%,60%{transform:translate3d(4px, 0, 0)}}.apply-shake{animation:shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both}\n",""])},function(t,e,n){var a=n(39);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};n(11)(a,r);a.locals&&(t.exports=a.locals)},function(t,e,n){(t.exports=n(10)(!1)).push([t.i,".hologram{position:fixed;left:50%;top:40%;transform:translateX(-50%);perspective:300px;width:1.5em;height:1.5em;z-index:0;border-radius:50%;background-image:radial-gradient(to top, #70e7ff, rgba(0,179,214,0.3));background-repeat:no-repeat;box-shadow:0 0.7em 0.25em -0.6em rgba(0,0,0,0.5),0 0.6em 1em -0.4em #000,0 0 1.5em 0 #70e7ff,0 0 6em 1em rgba(112,231,255,0.5),0 0 3em 0.5em rgba(112,231,255,0.5);transform-style:preserve-3d;pointer-events:none}.hologram:after,.hologram:before{content:'';position:absolute;pointer-events:none;border-radius:.4em}.hologram:before{width:100em;height:100em;left:50%;top:0;z-index:0;transform:translate(-50%, -50%) translateZ(-10em) rotateX(50deg) scale(0.75);background-image:radial-gradient(rgba(6,6,17,0), #060611 35%),radial-gradient(rgba(112,231,255,0.2), transparent),linear-gradient(rgba(112,231,255,0.1) 2px, transparent 2px),linear-gradient(90deg, transparent calc(100% - 2px), rgba(112,231,255,0.1) calc(100% - 2px)),linear-gradient(90deg, #060611 calc(100% - 2px), transparent calc(100% - 2px)),linear-gradient(#70e7ff 2px, transparent 2px);background-size:100% 100%,100% 100%,6em 6em,6em 6em,6em 6em,6em 6em;background-position:top center}.hologram:after{bottom:0;left:50%;width:100%;height:100vh;z-index:º;transform-origin:50% 100%;transform:translate(-50%, 0) rotateX(-86.8deg);background-image:radial-gradient(to top, transparent 30%, rgba(112,231,255,0.1) 60%, transparent 70%);opacity:.75;animation:lightVibration .07s linear infinite}@keyframes animatelight{0%{background-size:100% 100%, 100% 100%, 6em 6em, 6em 6em, 6em 6em, 6em 6em}50%{background-size:150% 100%, 150% 100%, 6em 6em, 6em 6em, 6em 6em, 6em 6em}100%{background-size:100% 100%, 100% 100%, 6em 6em, 6em 6em, 6em 6em, 6em 6em}}\n",""])},function(t,e,n){var a=n(41);"string"==typeof a&&(a=[[t.i,a,""]]);var r={insert:"head",singleton:!1};n(11)(a,r);a.locals&&(t.exports=a.locals)},function(t,e,n){(t.exports=n(10)(!1)).push([t.i,".scoreboard-wrapper{display:flex;justify-content:center}.scoreboard-wrapper table{position:absolute;top:64px;width:80vw;min-height:calc(100vh - 64px);text-align:center}.scoreboard-wrapper #scoreboard{font-size:2em;z-index:2;overflow:hidden}.scoreboard-wrapper #scoreboard tr{--border-width: 3px;transform:translate(0, 0);background-color:rgba(0,0,0,0.3);max-height:64px;overflow:hidden}.scoreboard-wrapper #scoreboard tr:after{opacity:0.4 !important}.scoreboard-wrapper #scoreboard .icon{width:48px;height:48px}\n",""])}]);