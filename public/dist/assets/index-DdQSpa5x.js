(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function o(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=o(r);fetch(r.href,c)}})();function N(){const e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches,o=e||(t?"dark":"light");document.documentElement.setAttribute("data-theme",o)}N();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".sidebar"),t=document.querySelector(".sidebar-overlay"),o=document.querySelectorAll(".nav-btn")[0],n=document.getElementById("close-sidebar"),r=document.getElementById("contacts-btn"),c=document.querySelector(".contacts-menu"),f=document.getElementById("contacts-close-btn"),y=document.getElementById("sidebar-search");function u(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}async function v(){const s=document.querySelector(".contacts-content");if(!s)return;const i=`
            <div class="contact-item">
                <label class="contact-label">Сайт</label>
                <a href="https://etiquettebook.com" target="_blank" class="contact-value">etiquettebook.com</a>
            </div>
            <div class="contact-item">
                <label class="contact-label">Email</label>
                <a href="mailto:etiquettebook2026@gmail.com" class="contact-value">etiquettebook2026@gmail.com</a>
            </div>
        `;try{const a=await fetch("/api/contacts");if(!a.ok)throw new Error("api error");const l=await a.json();let d=[];try{d=JSON.parse(l.content||"[]")}catch{d=[]}if(!d.length){s.innerHTML=i;return}s.innerHTML=d.map(x=>`
                <div class="contact-item">
                    <label class="contact-label">${u(x.title)}</label>
                    <a href="${u(x.href)}" class="contact-value" ${x.external?'target="_blank"':""}>
                        ${u(x.subtitle||x.href)}
                    </a>
                </div>
            `).join("")}catch{try{const a=await fetch("/data/contacts.json?t="+Date.now());if(!a.ok)throw new Error("file error");const l=await a.json();if(!l.length)throw new Error("empty");s.innerHTML=l.map(d=>`
                    <div class="contact-item">
                        <label class="contact-label">${u(d.title)}</label>
                        <a href="${u(d.href)}" class="contact-value" ${d.external?'target="_blank"':""}>
                            ${u(d.subtitle||d.href)}
                        </a>
                    </div>
                `).join("")}catch{s.innerHTML=i}}}async function L(){try{const s=localStorage.getItem("adm_jwt"),i=s?{Authorization:`Bearer ${s}`}:{},a=await fetch("/api/config",{headers:i});if(!a.ok)throw new Error(`HTTP ${a.status}`);const d=(await a.json()).config||{};localStorage.setItem("siteConfig",JSON.stringify(d)),h(d)}catch{const s=localStorage.getItem("siteConfig");if(s)try{h(JSON.parse(s))}catch{}}}function h(s){const i=document.querySelector(".hero h1");i&&s.siteTitle&&(i.textContent=s.siteTitle,document.title=s.siteTitle);const a=document.querySelector(".subtitle");a&&s.siteDescription&&(a.textContent=s.siteDescription)}async function p(){try{const s=await fetch("/data/nav.json?t="+Date.now());if(!s.ok)return;const i=await s.json(),a=document.querySelector(".sidebar-content");if(!a)return;a.innerHTML=i.map(l=>`
                <div class="menu-section" data-section="${l.id}">
                    <div class="menu-section-title">
                        <div class="menu-section-title-content">
                            <span class="menu-section-title-text">${l.title}</span>
                            <div class="menu-section-controls">
                                <span class="menu-section-counter">${l.pages.length}</span>
                                <div class="menu-section-arrow">
                                    <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="menu-items">
                        ${l.pages.map(d=>`
                            <a href="${d.href}" class="menu-item" style="text-decoration:none;color:inherit;display:block">${d.title}</a>
                        `).join("")}
                    </div>
                </div>
            `).join(""),a.querySelectorAll(".menu-section-title").forEach(l=>{l.addEventListener("click",()=>{l.closest(".menu-section")?.classList.toggle("open")})})}catch(s){console.log("nav.json не найден:",s)}}v(),L(),p();function k(){e?.classList.add("open"),t?.classList.add("open"),document.body.style.overflow="hidden"}function g(){e?.classList.remove("open"),t?.classList.remove("open"),c?.classList.remove("open"),document.body.style.overflow=""}o?.addEventListener("click",k),n?.addEventListener("click",g),t?.addEventListener("click",g),r?.addEventListener("click",()=>c?.classList.add("open")),f?.addEventListener("click",()=>c?.classList.remove("open")),document.addEventListener("keydown",s=>{s.key==="Escape"&&g()}),y?.addEventListener("input",function(){const s=this.value.trim().toLowerCase();document.querySelectorAll(".menu-item").forEach(i=>{i.style.display=i.textContent.toLowerCase().includes(s)?"block":"none"}),document.querySelectorAll(".menu-section").forEach(i=>{const a=Array.from(i.querySelectorAll(".menu-item")).some(l=>l.style.display==="block");i.style.display=a?"block":"none",s&&a&&i.classList.add("open")})}),document.querySelectorAll(".menu-section-title").forEach(s=>{s.addEventListener("click",()=>s.closest(".menu-section")?.classList.toggle("open"))}),window.addEventListener("load",()=>{const s=location.hash.slice(1);if(s){e?.classList.add("open"),t?.classList.add("open");const i=document.querySelector(`.menu-section[data-section="${s}"]`);i&&(i.classList.add("open"),i.scrollIntoView({behavior:"smooth",block:"center"}))}})});let S=[];async function D(){try{const o=(await(await fetch("/data/nav.json")).json()).flatMap(n=>n.pages.map(r=>({title:r.title,href:r.href,section:n.title,slug:r.href.replace(/^.*\/([^/]+)\.html$/,"$1"),text:""})));await Promise.allSettled(o.map(async n=>{try{const r=await fetch(`/docs/${n.slug}.md`);if(!r.ok)return;const c=await r.text();n.text=c.replace(/^---[\s\S]*?---\n/m,"").replace(/#{1,6}\s+/g," ").replace(/[*_`~>]/g,"").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/\s+/g," ").trim()}catch{}})),S=o}catch{S=[]}}const T="search_history",I=5;function M(){try{return JSON.parse(localStorage.getItem(T))||[]}catch{return[]}}function z(e){let t=M().filter(o=>o.href!==e.href);t.unshift(e),t.length>I&&(t=t.slice(0,I)),localStorage.setItem(T,JSON.stringify(t))}function w(e){return e.toLowerCase().replace(/ё/g,"е")}function F(e){const t=w(e.trim());if(!t)return[];const o=t.split(/\s+/).filter(n=>n.length>1);return o.length?S.map(n=>{const r=w(n.title),c=w(n.section||""),f=w(n.text||""),y=o.filter(p=>r.includes(p)).length,u=o.filter(p=>c.includes(p)).length,v=o.filter(p=>f.includes(p)).length;if(!y&&!u&&!v)return null;const L=y*10+u*5+v;let h="";if(v&&!y){const p=o.find(l=>f.includes(l)),k=f.indexOf(p),g=Math.max(0,k-30),s=Math.min(f.length,k+p.length+70),i=(n.text||"").slice(g,s),a=new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");h=(g>0?"…":"")+i.replace(a,"<mark>$&</mark>")+(s<(n.text||"").length?"…":""),h=h.charAt(0).toUpperCase()+h.slice(1)}return{...n,score:L,snippet:h}}).filter(Boolean).sort((n,r)=>r.score-n.score).slice(0,8):[]}function P(){const e=document.createElement("div");return e.id="search-modal",e.innerHTML=`
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
  `,document.body.appendChild(e),e.querySelector(".search-backdrop").addEventListener("click",B),e.querySelector("#search-results").addEventListener("click",t=>{const o=t.target.closest(".srch-item");o&&(t.preventDefault(),z({title:o.dataset.title,href:o.dataset.href,section:o.dataset.section}),B(),window.location.href=o.dataset.href)}),e}function _(e,t){if(!t||!e)return e;const o=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return e.replace(o,"<mark>$1</mark>")}function C(e,t,o){return e.length?`<div class="srch-label">${o}</div>`+e.map((n,r)=>`
      <a href="${n.href}" class="srch-item" data-idx="${r}" data-href="${n.href}" data-title="${n.title}" data-section="${n.section||""}">
        <span class="srch-item-body">
          <span class="srch-item-title">${_(n.title,t)}</span>
          ${n.section?`<span class="srch-item-section">${n.section}</span>`:""}
          ${n.snippet?`<span class="srch-snippet">${n.snippet}</span>`:""}
        </span>
        <svg class="srch-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </a>`).join(""):""}function j(e){const t=document.getElementById("search-results");if(!t)return;let o="";if(e.trim()){const n=F(e);o=n.length?C(n,e,`Результаты (${n.length})`):`<p class="srch-empty">Ничего не найдено по запросу «${e}»</p>`}else{const n=M();o=n.length?C(n,"","Недавно открытые"):'<p class="srch-empty">Начните вводить запрос — ищем по заголовкам и тексту страниц</p>'}t.innerHTML=o,m=-1}let m=-1;function $(){return Array.from(document.querySelectorAll("#search-results .srch-item"))}function A(e){const t=$();t.forEach(o=>o.classList.remove("active")),e>=0&&e<t.length?(t[e].classList.add("active"),t[e].scrollIntoView({block:"nearest"}),m=e):m=-1}let b=null,E=!1;function O(){b||(b=P()),b.classList.add("open"),E=!0,document.body.style.overflow="hidden";const e=document.getElementById("search-input");e&&(e.value="",e.focus()),j("")}function B(){b&&(b.classList.remove("open"),E=!1,document.body.style.overflow="")}document.addEventListener("keydown",e=>{if(e.key==="k"&&(e.metaKey||e.ctrlKey)||e.key==="/"&&!E&&document.activeElement.tagName!=="INPUT"){e.preventDefault(),O();return}if(E){if(e.key==="Escape"){B();return}if(e.key==="ArrowDown"&&(e.preventDefault(),A(Math.min(m+1,$().length-1))),e.key==="ArrowUp"&&(e.preventDefault(),A(Math.max(m-1,0))),e.key==="Enter"){e.preventDefault();const t=$(),o=m>=0?t[m]:t[0];o&&o.click()}}});document.addEventListener("input",e=>{e.target.id==="search-input"&&j(e.target.value)});function q(){const e=document.getElementById("search-btn");e&&e.addEventListener("click",t=>{t.stopPropagation(),O()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q):q();D();const H=document.createElement("style");H.textContent=`
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
`;document.head.appendChild(H);
