const D=[["Slack","Comms","#00f0ff","S","Real-time alerts streamed to your channels."],
["GitHub","Dev","#c084fc","⌥","Link commits and PRs to missions."],
["Stripe","Payments","#7c8cff","$","Accept payments and manage subscriptions."],
["Teams","Comms","#38bdf8","T","Broadcast activity across squads."],
["Gmail","Comms","#ff4d6d","G","Send and track email from workflows."],
["Jira","Dev","#4d8dff","J","Sync issues and sprints."],
["Zapier","Automation","#ff8a3d","Z","Automate with 5,000+ apps."],
["PayPal","Payments","#3b82f6","P","Global checkout and payouts."],
["Notion","Productivity","#e5e7eb","N","Sync docs and databases."],
["Drive","Productivity","#39ff88","D","Attach and preview cloud files."],
["HubSpot","Automation","#ff7a59","H","Keep CRM contacts in sync."],
["Analytics","Analytics","#ffd23f","A","Track usage and conversions."]];
const cats=["All",...new Set(D.map(d=>d[1]))];let cat="All",on=new Set(["Slack","GitHub","Stripe"]),ld=new Set();
const $=i=>document.getElementById(i);
const ts=()=>new Date().toLocaleTimeString([], {hour12:false});
function log(m){const l=$("lg");l.insertAdjacentHTML("afterbegin",`<div>[${ts()}] ${m}</div>`);while(l.children.length>12)l.lastChild.remove()}
$("radar").innerHTML=[[30,22],[68,35],[45,70],[75,66],[22,58]].map(p=>`<i style="left:${p[0]}%;top:${p[1]}%"></i>`).join("");
setInterval(()=>{$("clk").textContent=ts()},1000);
function render(){const q=$("q").value.toLowerCase();
$("tabs").innerHTML=cats.map(c=>`<button class="tab ${c==cat?"on":""}" data-c="${c}">${c}</button>`).join("");
const r=D.filter(d=>(cat=="All"||d[1]==cat)&&d[0].toLowerCase().includes(q));
$("g").innerHTML=r.length?r.map((d,i)=>{const c=on.has(d[0]),l=ld.has(d[0]);return `<div class="card ${c?"on":""}" style="--c:${d[2]};animation-delay:${i*40}ms"><div class="h"><div class="ic">${d[3]}</div><div><b>${d[0].toUpperCase()}</b><small>${d[1]}</small></div></div><p>${d[4]}</p><div class="f"><div class="sig"><s></s><s></s><s></s><s></s></div><span class="st">${l?"LINKING…":c?"ONLINE":"OFFLINE"}</span><button class="btn" data-n="${d[0]}">${c?"Unlink":"Link"}</button></div></div>`}).join(""):'<div class="empty">// NO SIGNAL FOUND</div>';
$("n").textContent=on.size}
$("q").oninput=render;
document.addEventListener("click",e=>{const t=e.target;if(t.dataset.c){cat=t.dataset.c;render()}
const n=t.dataset.n;if(n&&!ld.has(n)){if(on.has(n)){on.delete(n);log(`${n} <em>link terminated</em>`);render()}else{ld.add(n);log(`handshake → ${n}…`);render();setTimeout(()=>{ld.delete(n);on.add(n);log(`${n} <em>ONLINE</em> · sync OK`);render()},1000)}}});
log("UI 8 core <em>initialized</em>");log("scanning integrations…");render();