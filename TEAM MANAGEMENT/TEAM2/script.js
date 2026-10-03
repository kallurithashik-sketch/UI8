const ROLES=["Admin","Member","Viewer"],SEATS=10,COLORS=["#ffd23f","#ff7aa2","#3ddc97","#8fd3ff","#c7a6ff"];
let people=[
{n:"Maya Okafor",e:"maya@crew.app",r:"Owner",s:"Active"},
{n:"Daniel Reyes",e:"daniel@crew.app",r:"Admin",s:"Active"},
{n:"Priya Natarajan",e:"priya@crew.app",r:"Member",s:"Active"},
{n:"Tom Lindqvist",e:"tom@crew.app",r:"Member",s:"Active"},
{n:"Aiko Tanaka",e:"aiko@crew.app",r:"Viewer",s:"Active"},
{n:"Lena Fischer",e:"lena@partner.io",r:"Viewer",s:"Pending"}];
const $=id=>document.getElementById(id);let role="All",hue=0;
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const toast=m=>{const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("on"),2200)};
people.forEach(p=>p.c=COLORS[hue++%COLORS.length]);
$("rl").innerHTML=ROLES.map(r=>`<option ${r=="Member"?"selected":""}>${r}</option>`).join("");
function chips(){$("chips").innerHTML=["All","Owner",...ROLES].map(r=>`<button class="chip" aria-pressed="${r==role}" data-r="${r}">${r}</button>`).join("")}
function render(){
 const act=people.filter(p=>p.s=="Active").length,pen=people.length-act;
 $("sM").textContent=act;$("sP").textContent=pen;$("sL").textContent=Math.max(0,SEATS-people.length);
 const q=$("q").value.toLowerCase();
 const list=people.filter(p=>(role=="All"||p.r==role)&&(p.n+p.e).toLowerCase().includes(q));
 $("grid").innerHTML=list.length?list.map(p=>{const i=people.indexOf(p);return `<article class="card ${p.s=="Pending"?"pending":""}">
 <div class="top"><span class="av" style="background:${p.c}">${esc(p.n.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase())}</span><div><strong>${esc(p.n)}</strong><small>${esc(p.e)}</small></div></div>
 <div class="meta">${p.r=="Owner"?'<span class="owner">Owner</span>':`<select data-i="${i}" aria-label="Role for ${esc(p.n)}">${ROLES.map(r=>`<option ${r==p.r?"selected":""}>${r}</option>`).join("")}</select>`}<span class="badge ${p.s=="Pending"?"w":""}">${p.s=="Pending"?"Waiting":"Active"}</span></div>
 ${p.r=="Owner"?"":`<button class="rm" data-rm="${i}">${p.s=="Pending"?"Cancel invite":"Remove from crew"}</button>`}</article>`}).join(""):`<div class="empty">No one matches. Try another search or invite them.</div>`;
}
$("chips").onclick=e=>{if(e.target.dataset.r){role=e.target.dataset.r;chips();render()}};
$("q").oninput=render;
$("open").onclick=()=>{$("hint").textContent=people.length>=SEATS?"All seats are in use. Add seats to invite more people.":`${SEATS-people.length} seats left. Pending invites hold a seat.`;$("dlg").showModal();$("em").focus()};
$("cancel").onclick=()=>$("dlg").close();
$("form").onsubmit=e=>{
 if(e.submitter&&e.submitter.value!="ok")return;
 const em=$("em").value.trim();
 if(people.length>=SEATS){e.preventDefault();return toast("No seats left. Add seats to invite more people.")}
 if(people.some(p=>p.e==em)){e.preventDefault();return toast("That email is already in your crew.")}
 people.push({n:em.split("@")[0],e:em,r:$("rl").value,s:"Pending",c:COLORS[hue++%COLORS.length]});
 $("em").value="";render();toast("Invite sent to "+em)};
$("grid").onchange=e=>{if(e.target.dataset.i){const p=people[e.target.dataset.i];p.r=e.target.value;toast(p.n+" is now "+p.r)}};
$("grid").onclick=e=>{const i=e.target.dataset.rm;if(i==null)return;const p=people.splice(i,1)[0];render();toast(p.s=="Pending"?"Invite canceled":p.n+" removed")};
chips();render();