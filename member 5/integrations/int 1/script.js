const D=[["Slack","Communication","#4a154b","S","Real-time alerts and updates right in your channels, so nothing slips by."],
["GitHub","Developer","#24292f","⌥","Link commits and PRs to projects."],
["Stripe","Payments","#635bff","$","Accept payments and manage subscriptions."],
["Microsoft Teams","Communication","#5059c9","T","Share activity across teams."],
["Gmail","Communication","#d93025","G","Send and track emails from workflows."],
["Jira","Developer","#0052cc","J","Sync issues and sprints."],
["Zapier","Automation","#ff4a00","Z","Automate with 5,000+ apps."],
["PayPal","Payments","#003087","P","Global checkout and payouts."],
["Notion","Productivity","#333","N","Sync docs and databases."],
["Google Drive","Productivity","#1a9e5c","D","Attach and preview Drive files."],
["HubSpot","Automation","#ff7a59","H","Keep CRM contacts in sync."],
["Analytics","Analytics","#e8710a","A","Track usage and conversions."]];
const cats=["All",...new Set(D.map(d=>d[1]))];let cat="All",on=new Set(["Slack","GitHub","Stripe"]),ld=new Set();
const $=i=>document.getElementById(i);
$("ring").innerHTML=D.slice(0,6).map((d,i)=>`<div class="node" style="--a:${i*60}deg"><div style="background:${d[2]}">${d[3]}</div></div>`).join("");
function toast(m){const t=$("t");t.textContent=m;t.classList.add("s");clearTimeout(t.k);t.k=setTimeout(()=>t.classList.remove("s"),2200)}
function render(){const q=$("q").value.toLowerCase();
$("tabs").innerHTML=cats.map(c=>`<button class="tab ${c==cat?"on":""}" data-c="${c}">${c}</button>`).join("");
const r=D.filter(d=>(cat=="All"||d[1]==cat)&&d[0].toLowerCase().includes(q));
$("g").innerHTML=r.length?r.map((d,i)=>{const c=on.has(d[0]),l=ld.has(d[0]);return `<div class="card ${d[0]=="Slack"&&cat=="All"&&!q?"feat":""}" style="--c:${d[2]};animation-delay:${i*40}ms"><div class="h"><div class="ic" style="background:${d[2]}">${d[3]}</div><div><b>${d[0]}</b><span class="mu">${d[1]}</span></div></div><p>${d[4]}</p><div class="f"><span class="st ${c?"on":""}">${l?"Connecting…":c?"● Live":"Off"}</span><button class="sw ${c?"on":""} ${l?"ld":""}" data-n="${d[0]}" aria-label="Toggle ${d[0]}"></button></div></div>`}).join(""):'<div class="empty">No apps found 🛸</div>';
$("s2").textContent=on.size}
$("q").oninput=render;
document.addEventListener("click",e=>{const t=e.target;if(t.dataset.c){cat=t.dataset.c;render()}
if(t.dataset.n&&!ld.has(t.dataset.n)){const n=t.dataset.n;if(on.has(n)){on.delete(n);toast(n+" disconnected");render()}else{ld.add(n);render();setTimeout(()=>{ld.delete(n);on.add(n);toast("🎉 "+n+" connected!");render()},900)}}});
document.addEventListener("mousemove",e=>{const c=e.target.closest&&e.target.closest(".card");if(c){const r=c.getBoundingClientRect();c.style.setProperty("--x",e.clientX-r.left+"px");c.style.setProperty("--y",e.clientY-r.top+"px")}});
render();