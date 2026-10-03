const ROLES={Owner:"Full access, including billing and deleting the workspace.",Admin:"Manage members, projects and settings. No billing access.",Member:"Create and edit projects they belong to.",Viewer:"Read-only access to shared projects."};
let people=[
{n:"Maya Okafor",e:"maya@northwind.co",r:"Owner",s:"Active",a:"Just now"},
{n:"Daniel Reyes",e:"daniel@northwind.co",r:"Admin",s:"Active",a:"12 min ago"},
{n:"Priya Natarajan",e:"priya@northwind.co",r:"Member",s:"Active",a:"Today"},
{n:"Tom Lindqvist",e:"tom@northwind.co",r:"Member",s:"Active",a:"Yesterday"},
{n:"Aiko Tanaka",e:"aiko@northwind.co",r:"Viewer",s:"Active",a:"3 days ago"},
{n:"Sam Whitaker",e:"sam@northwind.co",r:"Member",s:"Active",a:"Last week"},
{n:"Lena Fischer",e:"lena@partner.io",r:"Viewer",s:"Pending",a:"Invited 2 days ago"}];
const $=id=>document.getElementById(id),SEATS=12;let tab="m";
const rs=Object.keys(ROLES);
$("rl").innerHTML=rs.filter(r=>r!="Owner").map(r=>`<option ${r=="Member"?"selected":""}>${r}</option>`).join("");
$("f").innerHTML+=rs.map(r=>`<option>${r}</option>`).join("");
$("roles").innerHTML=rs.map(r=>`<div><h2>${r}</h2><p>${ROLES[r]}</p></div>`).join("");
const toast=m=>{const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("on"),2200)};
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function render(){
 const act=people.filter(p=>p.s=="Active").length,pen=people.filter(p=>p.s=="Pending").length;
 $("used").textContent=act+pen;
 $("bar").innerHTML=Array.from({length:SEATS},(_,i)=>`<i class="${i<act?"u":i<act+pen?"p":""}"></i>`).join("");
 const q=$("q").value.toLowerCase(),f=$("f").value;
 const rows=people.filter(p=>(tab=="p"?p.s=="Pending":true)&&(!f||p.r==f)&&(p.n+p.e).toLowerCase().includes(q));
 $("rows").innerHTML=rows.length?rows.map(p=>{const i=people.indexOf(p);return `<tr><td><div class="who"><span class="av">${esc(p.n.split(" ").map(w=>w[0]).join("").slice(0,2))}</span><div>${esc(p.n)}<small>${esc(p.e)}</small></div></div></td>
 <td>${p.r=="Owner"?"Owner":`<select data-i="${i}" aria-label="Role for ${esc(p.n)}">${rs.filter(r=>r!="Owner").map(r=>`<option ${r==p.r?"selected":""}>${r}</option>`).join("")}</select>`}</td>
 <td><span class="tag ${p.s=="Pending"?"pend":""}">${p.s}</span></td><td>${p.a}</td>
 <td style="text-align:right">${p.r=="Owner"?"":`<button class="rm" data-rm="${i}">${p.s=="Pending"?"Cancel invite":"Remove"}</button>`}</td></tr>`}).join(""):`<tr><td colspan="5" class="empty">${tab=="p"?"No pending invites. Invite a teammate to get started.":"No members match your search."}</td></tr>`;
}
$("inv").onclick=()=>{$("form").classList.toggle("open");$("em").focus()};
$("form").onsubmit=e=>{e.preventDefault();
 if(people.length>=SEATS)return toast("All seats are in use. Add seats to invite more people.");
 const em=$("em").value.trim();if(people.some(p=>p.e==em))return toast("That email is already on the team.");
 people.push({n:em.split("@")[0],e:em,r:$("rl").value,s:"Pending",a:"Invited just now"});
 $("em").value="";render();toast("Invite sent to "+em)};
$("rows").onchange=e=>{if(e.target.dataset.i){const p=people[e.target.dataset.i];p.r=e.target.value;toast(p.n+" is now "+p.r)}};
$("rows").onclick=e=>{const i=e.target.dataset.rm;if(i==null)return;const p=people.splice(i,1)[0];render();toast(p.s=="Pending"?"Invite canceled":p.n+" removed")};
$("q").oninput=$("f").onchange=render;
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{tab=b.dataset.t;
 document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-selected",x==b));
 $("list").hidden=tab=="r";$("roles").hidden=tab!="r";render()});
render();