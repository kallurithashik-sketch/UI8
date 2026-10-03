(function(){
var $=function(s){return document.querySelector(s)};
var days=['Mon','Tue','Wed','Thu','Fri'];
var col={MI:'var(--r)',DE:'var(--c)',AR:'var(--g)',YO:'var(--b1)'};
var people=[['MI','Mira'],['DE','Dev'],['AR','Arjun'],['YO','You']];
var tasks=[
 ['MI',0,'Pricing page copy','done'],['MI',2,'Help center article','todo'],
 ['DE',1,'Fix invite emails','doing'],['DE',3,'API docs','todo'],
 ['AR',0,'Interview synthesis','done'],['AR',2,'Demo script','doing'],
 ['YO',1,'Onboarding flow','doing'],['YO',2,'Review pull requests','todo'],['YO',4,'Launch announcement','todo']
];
$('#date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});

function toast(t){var e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(function(){e.classList.remove('on')},2000)}
function stats(){var d=tasks.filter(function(t){return t[3]==='done'}).length;$('#sDone').textContent=d;$('#sOpen').textContent=tasks.length-d}

function grid(){
 var g=$('#grid');g.innerHTML='';
 g.appendChild(document.createElement('div'));
 days.forEach(function(d){var h=document.createElement('div');h.className='h';h.textContent=d;g.appendChild(h)});
 people.forEach(function(p){
  var w=document.createElement('div');w.className='who';
  w.innerHTML='<span class="face" style="background:'+col[p[0]]+'">'+p[0]+'</span><span>'+p[1]+'</span>';g.appendChild(w);
  for(var i=0;i<5;i++){
   var c=document.createElement('div');c.className='cell';c.dataset.p=p[0];c.dataset.d=i;
   tasks.forEach(function(t){if(t[0]===p[0]&&t[1]===i)c.appendChild(pill(t))});
   g.appendChild(c)}
 });
 stats();
}
function pill(t){
 var b=document.createElement('button');b.className='pill';b.style.background=col[t[0]];b.dataset.s=t[3];b.textContent=t[2];
 b.setAttribute('aria-label',t[2]+', '+t[3]);
 var sx,sy,moved=false,down=false;
 b.addEventListener('pointerdown',function(e){down=true;moved=false;sx=e.clientX;sy=e.clientY;b.setPointerCapture(e.pointerId)});
 b.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx,dy=e.clientY-sy;
  if(!moved&&Math.abs(dx)+Math.abs(dy)<6)return;moved=true;b.classList.add('drag');b.style.transform='translate('+dx+'px,'+dy+'px)';
  document.querySelectorAll('.cell').forEach(function(c){c.classList.remove('over')});
  var el=cellAt(e.clientX,e.clientY);if(el&&el.dataset.p===t[0])el.classList.add('over')});
 b.addEventListener('pointerup',function(e){if(!down)return;down=false;
  if(moved){var el=cellAt(e.clientX,e.clientY);
   if(el&&el.dataset.p===t[0]){var nd=+el.dataset.d;if(nd!==t[1]){t[1]=nd;toast('Moved "'+t[2]+'" to '+days[nd])}}
   grid()}
  else{var o=['todo','doing','done'];t[3]=o[(o.indexOf(t[3])+1)%3];toast('"'+t[2]+'" is '+(t[3]==='todo'?'back to to do':t[3]==='doing'?'in progress':'done'));grid()}});
 return b;
}
function cellAt(x,y){var els=document.elementsFromPoint(x,y);for(var i=0;i<els.length;i++){if(els[i].classList&&els[i].classList.contains('cell'))return els[i]}return null}

// switch between Week, Chat and Files
document.querySelectorAll('[data-p]').forEach(function(b){b.onclick=function(){
 document.querySelectorAll('[data-p]').forEach(function(x){x.setAttribute('aria-selected',x===b)});
 document.querySelectorAll('.pane').forEach(function(p){p.classList.toggle('on',p.id===b.dataset.p)})}});
$('#theme').onclick=function(){var r=document.documentElement;var dark=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=dark?'light':'dark'};

// huddle
var inH=false;
$('#join').onclick=function(){inH=!inH;$('#hud').classList.toggle('live',inH);
 $('#join').textContent=inH?'Leave huddle':'Join huddle';$('#join').classList.toggle('off',inH);
 $('#hs').textContent=inH?'You and 3 others are talking.':'3 people are here. Join to talk.';
 toast(inH?'You joined the huddle':'You left the huddle')};

// chat
var msgs=[['MI','Mira','Pricing copy is approved. Ready for dev.'],['DE','Dev','Nice. I will ship it after the invite fix.'],['AR','Arjun','Demo script draft is in Files.']];
function addMsg(k,n,t,me){var m=document.createElement('div');m.className='msg'+(me?' me':'');
 m.innerHTML='<span class="face" style="background:'+col[k]+'">'+k+'</span><div class="bub"><b></b><div></div></div>';
 m.querySelector('b').textContent=n;m.querySelector('.bub div').textContent=t;$('#msgs').appendChild(m)}
$('#msgs').style.cssText='display:flex;flex-direction:column;gap:12px';
msgs.forEach(function(m){addMsg(m[0],m[1],m[2],false)});
$('#sf').onsubmit=function(e){e.preventDefault();var v=$('#mi').value.trim();if(!v)return;addMsg('YO','You',v,true);$('#mi').value=''};

grid();
})();