var C={folder:["#f5a524","DIR"],pdf:["#e5484d","PDF"],img:["#2fa75e","IMG"],doc:["#3b82f6","DOC"],sheet:["#0f9d84","XLS"],zip:["#8b5cf6","ZIP"]};
var P={Priya:"#e5484d",Marcus:"#3b82f6",Lena:"#8b5cf6",You:"#6d5dfc"};
var F=[
{id:1,n:"Brand guidelines",t:"folder",p:0,s:"12 items",b:"Priya",d:"Today",k:0},
{id:2,n:"Product roadmap",t:"folder",p:0,s:"8 items",b:"You",d:"Yesterday",k:0},
{id:3,n:"Contracts",t:"folder",p:0,s:"21 items",b:"Marcus",d:"Sep 26",k:0},
{id:4,n:"Q3 board report.pdf",t:"pdf",p:0,s:"4.2 MB",b:"Marcus",d:"Today",st:1,k:4.2},
{id:5,n:"Hero banner.png",t:"img",p:0,s:"1.8 MB",b:"Lena",d:"Yesterday",k:1.8},
{id:6,n:"Customer interviews.docx",t:"doc",p:0,s:"640 KB",b:"You",d:"Sep 28",k:.6},
{id:7,n:"Revenue forecast.xlsx",t:"sheet",p:0,s:"2.1 MB",b:"Marcus",d:"Sep 27",st:1,k:2.1},
{id:8,n:"Launch assets.zip",t:"zip",p:0,s:"48 MB",b:"Lena",d:"Sep 24",k:48},
{id:9,n:"Logo pack.zip",t:"zip",p:1,s:"12 MB",b:"Priya",d:"Today",k:12},
{id:10,n:"Brand colors.pdf",t:"pdf",p:1,s:"1.2 MB",b:"Priya",d:"Sep 30",k:1.2},
{id:11,n:"2026 plan.xlsx",t:"sheet",p:2,s:"900 KB",b:"You",d:"Yesterday",k:.9},
{id:12,n:"NDA - Northwind.pdf",t:"pdf",p:3,s:"980 KB",b:"Marcus",d:"Sep 20",k:1}];
var S={nav:"All files",path:0,type:"All",q:"",view:"list",sel:null,chk:{},sort:"n",asc:1,id:13};
var $=function(i){return document.getElementById(i)};
var I={fl:"M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z",
 all:"M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8zM14 3v5h5",
 clk:"M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
 star:"M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
 us:"M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8zM21 20v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
 tr:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
 dl:"M12 4v12M7 11l5 5 5-5M4 20h16",lk:"M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1",
 gr:"M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",ls:"M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"};
function ic(k){return '<svg viewBox="0 0 24 24"><path d="'+I[k]+'"/></svg>'}
function toast(m){var e=$("upl");e.innerHTML='<div class="up" role="status"><b>'+m+'</b></div>';clearTimeout(toast.h);toast.h=setTimeout(function(){e.innerHTML=""},2000)}
var NAV=[["All files","all"],["Recent","clk"],["Starred","star"],["Shared with me","us"],["Trash","tr"]];
function match(f){
 if(f.tr!=(S.nav=="Trash"))return false;
 if(S.nav=="Starred"&&!f.st)return false;
 if(S.nav=="Shared with me"&&f.b=="You")return false;
 if(S.nav=="Recent"&&["Today","Yesterday"].indexOf(f.d)<0)return false;
 if(S.nav=="All files"&&!S.q&&f.p!=S.path)return false;
 if(S.type!="All"&&C[f.t][1]!=S.type)return false;
 return f.n.toLowerCase().indexOf(S.q.toLowerCase())>-1}
function render(){
 var keep=S.nav,counts={};NAV.forEach(function(n){S.nav=n[0];counts[n[0]]=F.filter(function(f){var q=S.q,t=S.type,p=S.path;S.q="";S.type="All";S.path=0;var r=match(f);S.q=q;S.type=t;S.path=p;return r}).length});S.nav=keep;
 $("nav").innerHTML=NAV.map(function(n){return '<button class="'+(n[0]==S.nav&&!S.path?"on":"")+'" data-n="'+n[0]+'">'+ic(n[1])+n[0]+'<b>'+counts[n[0]]+'</b></button>'}).join("");
 $("fn").innerHTML=F.filter(function(f){return f.t=="folder"&&!f.tr}).map(function(f){return '<button class="'+(S.path==f.id?"on":"")+'" data-f="'+f.id+'"><span class="dot" style="background:#f5a524"></span>'+f.n+'</button>'}).join("");
 var cur=F.filter(function(f){return f.id==S.path})[0],v=F.filter(match);
 v.sort(function(a,b){var x=S.sort=="k"?a.k:a.n.toLowerCase(),y=S.sort=="k"?b.k:b.n.toLowerCase();return (x>y?1:x<y?-1:0)*S.asc});
 var folders=S.nav=="All files"&&!S.path&&!S.q&&S.type=="All"?F.filter(function(f){return f.t=="folder"&&!f.tr}):[];
 var rows=v.filter(function(f){return folders.indexOf(f)<0});
 var h='<div class="cr"><button data-n="All files">All files</button>'+(cur?' / '+cur.n:S.nav!="All files"?' / '+S.nav:"")+'</div><div class="hd"><h1>'+(cur?cur.n:S.nav)+'</h1><span class="sp"></span><button class="btn" data-vw="1">'+ic(S.view=="list"?"gr":"ls")+(S.view=="list"?"Grid":"List")+'</button><button class="btn p" id="up2">'+ic("dl").replace("M12 4v12M7 11l5 5 5-5","M12 16V4M7 9l5-5 5 5")+'Upload</button></div>';
 h+='<div class="fl">'+["All","DIR","PDF","IMG","DOC","XLS","ZIP"].map(function(c){return '<button class="ch '+(c==S.type?"on":"")+'" data-c="'+c+'">'+(c=="All"?"All types":c=="DIR"?"Folders":c)+'</button>'}).join("")+'</div>';
 if(folders.length)h+='<div class="fo">'+folders.map(function(f){return '<button class="fc" data-f="'+f.id+'"><span class="fi" style="background:#f5a524">'+ic("fl")+'</span><span><div class="t">'+f.n+'</div><small>'+f.s+' · '+f.d+'</small></span></button>'}).join("")+'</div>';
 var T='';
 if(!rows.length)T='<div class="em"><b>No files here</b><br>Upload a file or clear your filters.</div>';
 else if(S.view=="list")T='<div class="r h"><span></span><button data-so="n">Name '+(S.sort=="n"?(S.asc>0?"↑":"↓"):"")+'</button><span>Owner</span><span>Modified</span><button data-so="k">Size '+(S.sort=="k"?(S.asc>0?"↑":"↓"):"")+'</button><span></span></div>'+rows.map(function(f){return '<div class="r '+(S.sel==f.id?"s":"")+'" data-id="'+f.id+'" tabindex="0"><input type="checkbox" data-k="'+f.id+'" '+(S.chk[f.id]?"checked":"")+' aria-label="Select '+f.n+'"><div class="nm"><span class="ty" style="background:'+C[f.t][0]+'">'+C[f.t][1]+'</span><span>'+f.n+'</span></div><div class="m"><span class="av" style="background:'+P[f.b]+'">'+f.b[0]+'</span>'+f.b+'</div><div class="m">'+f.d+'</div><div class="m">'+f.s+'</div><button class="stb '+(f.st?"on":"")+'" data-st="'+f.id+'" aria-label="Star">'+ic("star")+'</button></div>'}).join("");
 else T='<div class="gd">'+rows.map(function(f){return '<div class="gc '+(S.sel==f.id?"s":"")+'" data-id="'+f.id+'" tabindex="0"><div class="ty" style="background:'+C[f.t][0]+'">'+C[f.t][1]+'</div><div class="nm"><span>'+f.n+'</span></div><div class="m">'+f.s+' · '+f.d+'</div></div>'}).join("")+'</div>';
 var s=F.filter(function(f){return f.id==S.sel})[0],pn="";
 if(s)pn='<div class="pn"><div class="pv" style="background:linear-gradient(135deg,'+C[s.t][0]+',#101828aa)"><b style="font-size:28px">'+C[s.t][1]+'</b></div><h3>'+s.n+'</h3><div class="m">'+s.s+'</div><dl><dt>Owner</dt><dd>'+s.b+'</dd><dt>Modified</dt><dd>'+s.d+'</dd><dt>Access</dt><dd>'+(s.b=="You"?"Only you":"Everyone on the team")+'</dd></dl><div class="ac"><button class="btn p" data-a="Download started">'+ic("dl")+'Download</button><button class="btn" data-a="Link copied">'+ic("lk")+'Copy link</button><button class="btn" data-del="'+s.id+'">'+ic("tr")+(s.tr?"Restore":"Delete")+'</button></div></div>';
 h+='<div class="wr '+(s?"d":"")+'"><div class="tbl">'+T+'</div>'+pn+'</div>';
 $("ct").innerHTML=h;
 var n=Object.keys(S.chk).filter(function(k){return S.chk[k]}).length;
 $("bk").innerHTML=n?'<div class="bk"><b>'+n+' selected</b><button data-bd="1">Delete</button><button data-bc="1">Clear</button></div>':"";
}
function del(id){var f=F.filter(function(x){return x.id==id})[0];f.tr=!f.tr;if(S.sel==id)S.sel=null}
document.addEventListener("click",function(e){
 var t=e.target,b;
 if(t.matches&&t.matches("input[type=checkbox]")){S.chk[t.dataset.k]=t.checked;render();return}
 if(b=t.closest("[data-n]")){S.nav=b.dataset.n;S.path=0;S.sel=null;S.chk={}}
 else if(b=t.closest("[data-f]")){S.nav="All files";S.path=+b.dataset.f;S.sel=null;S.q=""}
 else if(b=t.closest("[data-c]"))S.type=b.dataset.c;
 else if(t.closest("[data-vw]"))S.view=S.view=="list"?"grid":"list";
 else if(b=t.closest("[data-so]")){if(S.sort==b.dataset.so)S.asc*=-1;else{S.sort=b.dataset.so;S.asc=1}}
 else if(b=t.closest("[data-st]")){var f=F.filter(function(x){return x.id==b.dataset.st})[0];f.st=!f.st;toast(f.st?"Starred":"Removed star")}
 else if(b=t.closest("[data-del]")){var tr=F.filter(function(x){return x.id==b.dataset.del})[0].tr;del(b.dataset.del);toast(tr?"Restored":"Moved to trash")}
 else if(t.closest("[data-bd]")){Object.keys(S.chk).forEach(function(k){if(S.chk[k])del(k)});S.chk={};toast("Moved to trash")}
 else if(t.closest("[data-bc]"))S.chk={};
 else if(b=t.closest("[data-a]"))toast(b.dataset.a);
 else if(b=t.closest("[data-id]"))S.sel=+b.dataset.id;
 else if(t.closest("#up,#up2")){var id=S.id++;F.unshift({id:id,n:"New upload "+(id-12)+".pdf",t:"pdf",p:S.path,s:"1.1 MB",b:"You",d:"Today",k:1.1});S.nav="All files";toast("Uploaded New upload "+(id-12)+".pdf")}
 else if(t.closest("#theme")){var r=document.documentElement,dk=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=dk?"light":"dark"}
 else return;
 render()});
document.addEventListener("keydown",function(e){
 if(e.key=="/"&&document.activeElement.id!="q"){e.preventDefault();$("q").focus()}
 if(e.key=="Enter"){var b=e.target.closest&&e.target.closest("[data-id]");if(b){S.sel=+b.dataset.id;render()}}});
$("q").addEventListener("input",function(e){S.q=e.target.value;render()});
render();