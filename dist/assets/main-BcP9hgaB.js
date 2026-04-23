import"./admin-panel-BGljHpv0.js";function D(){const e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches,s=e||(t?"dark":"light");document.documentElement.setAttribute("data-theme",s)}D();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".sidebar"),t=document.querySelector(".sidebar-overlay"),s=document.querySelectorAll(".nav-btn")[0],n=document.getElementById("close-sidebar"),l=document.getElementById("contacts-btn"),f=document.querySelector(".contacts-menu"),m=document.getElementById("contacts-close-btn"),v=document.getElementById("sidebar-search");function p(o){return String(o??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function y(){const o=document.querySelector(".contacts-content");if(!o)return;const a=`
            <div class="contact-item">
                <label class="contact-label">Сайт</label>
                <a href="https://etiquettebook.com" target="_blank" class="contact-value">etiquettebook.com</a>
            </div>
            <div class="contact-item">
                <label class="contact-label">Email</label>
                <a href="mailto:etiquettebook2026@gmail.com" class="contact-value">etiquettebook2026@gmail.com</a>
            </div>
        `;try{const i=await fetch("/api/contacts");if(!i.ok)throw new Error("api error");const r=await i.json();let c=[];try{c=JSON.parse(r.content||"[]")}catch{c=[]}if(!c.length){o.innerHTML=a;return}o.innerHTML=c.map(x=>`
                <div class="contact-item">
                    <label class="contact-label">${p(x.title)}</label>
                    <a href="${p(x.href)}" class="contact-value" ${x.external?'target="_blank"':""}>
                        ${p(x.subtitle||x.href)}
                    </a>
                </div>
            `).join("")}catch{try{const i=await fetch("/data/contacts.json?t="+Date.now());if(!i.ok)throw new Error("file error");const r=await i.json();if(!r.length)throw new Error("empty");o.innerHTML=r.map(c=>`
                    <div class="contact-item">
                        <label class="contact-label">${p(c.title)}</label>
                        <a href="${p(c.href)}" class="contact-value" ${c.external?'target="_blank"':""}>
                            ${p(c.subtitle||c.href)}
                        </a>
                    </div>
                `).join("")}catch{o.innerHTML=a}}}async function E(){try{const o=await fetch("/api/config");if(o.ok){const i=(await o.json()).config||{};localStorage.setItem("siteConfig",JSON.stringify(i)),applyConfig(i);return}}catch{}try{const o=await fetch("/data/site-config.json?t="+Date.now());if(o.ok){const a=await o.json();applyConfig(a);return}}catch{}applyConfig({siteTitle:"Деловой этикет в Казахстане",siteDescription:"Введение в профессиональную культуру"})}async function h(){try{const o=await fetch("/data/nav.json?t="+Date.now());if(!o.ok)return;const a=await o.json(),i=document.querySelector(".sidebar-content");if(!i)return;i.innerHTML=a.map(r=>`
                <div class="menu-section" data-section="${r.id}">
                    <div class="menu-section-title">
                        <div class="menu-section-title-content">
                            <span class="menu-section-title-text">${r.title}</span>
                            <div class="menu-section-controls">
                                <span class="menu-section-counter">${r.pages.length}</span>
                                <div class="menu-section-arrow">
                                    <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="menu-items">
                        ${r.pages.map(c=>`
                            <a href="${c.href}" class="menu-item" style="text-decoration:none;color:inherit;display:block">${c.title}</a>
                        `).join("")}
                    </div>
                </div>
            `).join(""),i.querySelectorAll(".menu-section-title").forEach(r=>{r.addEventListener("click",()=>{r.closest(".menu-section")?.classList.toggle("open")})})}catch(o){console.log("nav.json не найден:",o)}}y(),E(),h();function d(){e?.classList.add("open"),t?.classList.add("open"),document.body.style.overflow="hidden"}function g(){e?.classList.remove("open"),t?.classList.remove("open"),f?.classList.remove("open"),document.body.style.overflow=""}s?.addEventListener("click",d),n?.addEventListener("click",g),t?.addEventListener("click",g),l?.addEventListener("click",()=>f?.classList.add("open")),m?.addEventListener("click",()=>f?.classList.remove("open")),document.addEventListener("keydown",o=>{o.key==="Escape"&&g()}),v?.addEventListener("input",function(){const o=this.value.trim().toLowerCase();document.querySelectorAll(".menu-item").forEach(a=>{a.style.display=a.textContent.toLowerCase().includes(o)?"block":"none"}),document.querySelectorAll(".menu-section").forEach(a=>{const i=Array.from(a.querySelectorAll(".menu-item")).some(r=>r.style.display==="block");a.style.display=i?"block":"none",o&&i&&a.classList.add("open")})}),document.querySelectorAll(".menu-section-title").forEach(o=>{o.addEventListener("click",()=>o.closest(".menu-section")?.classList.toggle("open"))}),window.addEventListener("load",()=>{const o=location.hash.slice(1);if(o){e?.classList.add("open"),t?.classList.add("open");const a=document.querySelector(`.menu-section[data-section="${o}"]`);a&&(a.classList.add("open"),a.scrollIntoView({behavior:"smooth",block:"center"}))}})});let L=[];async function z(){try{const s=(await(await fetch("/data/nav.json")).json()).flatMap(n=>n.pages.map(l=>({title:l.title,href:l.href,section:n.title,slug:l.href.replace(/^.*\/([^/]+)\.html$/,"$1"),text:""})));await Promise.allSettled(s.map(async n=>{try{const l=await fetch(`/docs/${n.slug}.md`);if(!l.ok)return;const f=await l.text();n.text=f.replace(/^---[\s\S]*?---\n/m,"").replace(/#{1,6}\s+/g," ").replace(/[*_`~>]/g,"").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/\s+/g," ").trim()}catch{}})),L=s}catch{L=[]}}const j="search_history",S=5;function M(){try{return JSON.parse(localStorage.getItem(j))||[]}catch{return[]}}function F(e){let t=M().filter(s=>s.href!==e.href);t.unshift(e),t.length>S&&(t=t.slice(0,S)),localStorage.setItem(j,JSON.stringify(t))}function k(e){return e.toLowerCase().replace(/ё/g,"е")}function N(e){const t=k(e.trim());if(!t)return[];const s=t.split(/\s+/).filter(n=>n.length>1);return s.length?L.map(n=>{const l=k(n.title),f=k(n.section||""),m=k(n.text||""),v=s.filter(d=>l.includes(d)).length,p=s.filter(d=>f.includes(d)).length,y=s.filter(d=>m.includes(d)).length;if(!v&&!p&&!y)return null;const E=v*10+p*5+y;let h="";if(y&&!v){const d=s.find(c=>m.includes(c)),g=m.indexOf(d),o=Math.max(0,g-30),a=Math.min(m.length,g+d.length+70),i=(n.text||"").slice(o,a),r=new RegExp(d.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");h=(o>0?"…":"")+i.replace(r,"<mark>$&</mark>")+(a<(n.text||"").length?"…":""),h=h.charAt(0).toUpperCase()+h.slice(1)}return{...n,score:E,snippet:h}}).filter(Boolean).sort((n,l)=>l.score-n.score).slice(0,8):[]}function O(){const e=document.createElement("div");return e.id="search-modal",e.innerHTML=`
    <div class="search-backdrop"></div>
    <div class="search-dialog" role="dialog" aria-modal="true" aria-label="Поиск">
      <div class="search-input-wrap">
        <svg class="srch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input id="search-input" type="text" placeholder="Поиск по страницам и содержимому..." autocomplete="off" spellcheck="false"/>
        <kbd class="srch-esc">Esc</kbd>
      </div>
      <div id="search-results" class="srch-results"></div>
      <div class="srch-footer">
        <span><kbd>↑↓</kbd> навигация</span>
        <span><kbd>↵</kbd> открыть</span>
        <span><kbd>Esc</kbd> закрыть</span>
      </div>
    </div>
  `,document.body.appendChild(e),e.querySelector(".search-backdrop").addEventListener("click",B),e.querySelector("#search-results").addEventListener("click",t=>{const s=t.target.closest(".srch-item");s&&(t.preventDefault(),F({title:s.dataset.title,href:s.dataset.href,section:s.dataset.section}),B(),window.location.href=s.dataset.href)}),e}function _(e,t){if(!t||!e)return e;const s=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return e.replace(s,"<mark>$1</mark>")}function I(e,t,s){return e.length?`<div class="srch-label">${s}</div>`+e.map((n,l)=>`
      <a href="${n.href}" class="srch-item" data-idx="${l}" data-href="${n.href}" data-title="${n.title}" data-section="${n.section||""}">
        <span class="srch-item-body">
          <span class="srch-item-title">${_(n.title,t)}</span>
          ${n.section?`<span class="srch-item-section">${n.section}</span>`:""}
          ${n.snippet?`<span class="srch-snippet">${n.snippet}</span>`:""}
        </span>
        <svg class="srch-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </a>`).join(""):""}function q(e){const t=document.getElementById("search-results");if(!t)return;let s="";if(e.trim()){const n=N(e);s=n.length?I(n,e,`Результаты (${n.length})`):`<p class="srch-empty">Ничего не найдено по запросу «${e}»</p>`}else{const n=M();s=n.length?I(n,"","Недавно открытые"):'<p class="srch-empty">Начните вводить запрос — ищем по заголовкам и тексту страниц</p>'}t.innerHTML=s,u=-1}let u=-1;function $(){return Array.from(document.querySelectorAll("#search-results .srch-item"))}function C(e){const t=$();t.forEach(s=>s.classList.remove("active")),e>=0&&e<t.length?(t[e].classList.add("active"),t[e].scrollIntoView({block:"nearest"}),u=e):u=-1}let b=null,w=!1;function H(){b||(b=O()),b.classList.add("open"),w=!0,document.body.style.overflow="hidden";const e=document.getElementById("search-input");e&&(e.value="",e.focus()),q("")}function B(){b&&(b.classList.remove("open"),w=!1,document.body.style.overflow="")}document.addEventListener("keydown",e=>{if(e.key==="k"&&(e.metaKey||e.ctrlKey)||e.key==="/"&&!w&&document.activeElement.tagName!=="INPUT"){e.preventDefault(),H();return}if(w){if(e.key==="Escape"){B();return}if(e.key==="ArrowDown"&&(e.preventDefault(),C(Math.min(u+1,$().length-1))),e.key==="ArrowUp"&&(e.preventDefault(),C(Math.max(u-1,0))),e.key==="Enter"){e.preventDefault();const t=$(),s=u>=0?t[u]:t[0];s&&s.click()}}});document.addEventListener("input",e=>{e.target.id==="search-input"&&q(e.target.value)});function A(){const e=document.getElementById("search-btn");e&&e.addEventListener("click",t=>{t.stopPropagation(),H()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",A):A();z();const T=document.createElement("style");T.textContent=`
#search-modal {
  display: none; position: fixed; inset: 0; z-index: 9999;
  align-items: flex-start; justify-content: center;
  padding-top: 80px; padding-left: 1rem; padding-right: 1rem;
}
#search-modal.open { display: flex; }

.search-backdrop {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
}

.search-dialog {
  position: relative; width: 100%; max-width: 600px;
  background: #fff; border-radius: 12px; border: 1px solid #E5E5E5;
  overflow: hidden; max-height: calc(100vh - 120px);
  display: flex; flex-direction: column;
}

.search-input-wrap {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 16px; border-bottom: 1px solid #E5E5E5; flex-shrink: 0;
}
.srch-icon { width: 18px; height: 18px; color: #6B6B6B; flex-shrink: 0; }

#search-input {
  flex: 1; border: none; outline: none;
  font-size: 15px; font-family: 'Inter', sans-serif;
  color: #1A1A1A; background: transparent; line-height: 1.5;
}
#search-input::placeholder { color: #6B6B6B; }

.srch-esc {
  font-size: 11px; color: #6B6B6B; background: #F5F5F4;
  border: 1px solid #E5E5E5; border-radius: 4px; padding: 2px 6px;
  font-family: 'Inter', sans-serif;
}

.srch-results { overflow-y: auto; padding: 8px 8px 4px; flex: 1; }

.srch-label {
  font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #6B6B6B; padding: 4px 8px 6px;
}

.srch-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; border-radius: 8px;
  text-decoration: none; cursor: pointer;
  transition: background 0.15s;
}
.srch-item:hover, .srch-item.active { background: #FFF5F2; }

.srch-item-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }

.srch-item-title {
  font-size: 14px; font-weight: 500;
  font-family: 'Inter', sans-serif; color: #1A1A1A;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.srch-item-title mark {
  background: rgba(193,80,46,0.15); color: #C1502E;
  border-radius: 2px; padding: 0 1px;
}

.srch-item-section {
  font-size: 11px; font-family: 'Inter', sans-serif;
  color: #C1502E; font-weight: 500;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.srch-snippet {
  font-size: 12px; font-family: 'Inter', sans-serif; color: #6B6B6B;
  font-style: italic; line-height: 1.4;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.srch-snippet mark {
  background: rgba(193,80,46,0.15); color: #C1502E;
  border-radius: 2px; padding: 0 1px; font-style: normal;
}

.srch-chevron { width: 14px; height: 14px; color: #C0C0C0; flex-shrink: 0; }

.srch-empty {
  font-family: 'Inter', sans-serif; font-size: 14px;
  color: #6B6B6B; text-align: center; padding: 2rem 1rem;
}

.srch-footer {
  display: flex; align-items: center; gap: 16px;
  padding: 8px 16px; border-top: 1px solid #E5E5E5; flex-shrink: 0;
}
.srch-footer span {
  font-size: 12px; font-family: 'Inter', sans-serif; color: #6B6B6B;
  display: flex; align-items: center; gap: 4px;
}
.srch-footer kbd {
  background: #F5F5F4; border: 1px solid #E5E5E5; border-radius: 4px;
  padding: 1px 5px; font-size: 11px; font-family: 'Inter', sans-serif;
}

@media (max-width: 600px) {
  #search-modal { padding-top: 20px; }
  .srch-footer { display: none; }
}
`;document.head.appendChild(T);
