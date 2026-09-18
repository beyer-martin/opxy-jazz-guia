const fs=require('fs'),vm=require('vm'),assert=require('assert');
const output=fs.existsSync('opxy-jazz-guia-estilo-original.html')?'opxy-jazz-guia-estilo-original.html':'outputs/opxy-jazz-guia-estilo-original.html';
const html=fs.readFileSync(output,'utf8');
const data=html.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/)[1];
const code=html.match(/<script>\n([\s\S]*?)<\/script>/)[1];
new vm.Script(code);
class El{
 constructor(){this.events={};this.dataset={};this.attrs={};this.children=new Map();this.value='70';this.checked=false;this.textContent='';this.innerHTML='';this.hidden=false;this.classList={toggle(){},remove(){},add(){}};}
 addEventListener(n,f){(this.events[n]??=[]).push(f)}
 setAttribute(n,v){this.attrs[n]=String(v)}
 getAttribute(n){return this.attrs[n]}
 hasAttribute(n){return n in this.attrs}
 querySelector(q){if(!this.children.has(q))this.children.set(q,new El());return this.children.get(q)}
 querySelectorAll(){return []}
 appendChild(child){child.parentNode=this;this.lastChild=child;return child}
 focus(){this.focused=true}
 closest(q){if(q==='[data-lab]')return this.owner;return this}
 getBoundingClientRect(){return {bottom:500,right:900,left:10,top:300}}
}
const els=new Map(),labs=new Map(),docEvents={};
function get(id){if(!els.has(id))els.set(id,new El());return els.get(id)}get('data').textContent=data;
const doc={getElementById:get,querySelector(q){if(!labs.has(q)){const e=new El();e.dataset.lab=q.match(/\d+/)?.[0];labs.set(q,e);}return labs.get(q)},querySelectorAll:()=>[],addEventListener(n,f){(docEvents[n]??=[]).push(f)}};
let time=0,nextTimer=0;const timers=new Map();let voices=0;const scheduledStops=[],gainEvents=[],oscillators=[];
function advanceAudio(to){time=Math.max(time,to);for(const o of oscillators){if(!o.ended&&o.stopAt!==null&&o.stopAt<=time){o.ended=true;voices--;o.onended?.();}}}
class AC{get currentTime(){return time}constructor(){this.destination={}}resume(){return Promise.resolve()}createOscillator(){const o={frequency:{},stopAt:null,ended:false,onended:null,connect(){},disconnect(){},start(){voices++},stop(at){o.stopAt=at??time;scheduledStops.push(o.stopAt)}};oscillators.push(o);return o}createGain(){const record=(kind,value,at)=>gainEvents.push({kind,value,at});return {connect(){},disconnect(){},gain:{setValueAtTime(value,at){record('set',value,at)},linearRampToValueAtTime(value,at){record('linear',value,at)},exponentialRampToValueAtTime(value,at){record('exp',value,at)}}}}}
const store=new Map();
const box={document:doc,window:{addEventListener(){},AudioContext:AC,confirm(){return true}},localStorage:{getItem(k){return store.get(k)??null},setItem(k,v){store.set(k,String(v))}},setTimeout(f,dt){const id=++nextTimer;timers.set(id,{f,dt});return id},clearTimeout(id){timers.delete(id)},console};
vm.createContext(box);vm.runInContext(code,box);const run=s=>vm.runInContext(s,box);
assert.equal(run('lessonPlans.length'),16);
assert.equal(run('DEEP_CURRICULUM.length'),16);
assert.equal(run('courseMinutes()'),480);
assert(run('DEEP_CURRICULUM.every(x=>x.activities.length===6&&x.theory&&x.workedExample&&x.misconception&&x.application&&x.mastery&&x.sources.length)'));
assert.equal(run('DEEP_CURRICULUM.reduce((n,x)=>n+x.activities.length,0)'),96);
assert(get('lessons').innerHTML.includes('Marco para decidir')&&get('lessons').innerHTML.includes('Dominio y fuentes'));
assert.equal((get('lessons').innerHTML.match(/data-session-minutes="30"/g)||[]).length,16);
assert.equal(run('lessonPlans.length*30'),480,'duración derivada de las 16 sesiones');
for(const token of ['class="lab"','class="finish"','class="focus-card"','class="support-tabs"','class="bar-recipe"','data-simulator-slot="1"','data-simulator-slot="2"','data-stage-prev','data-stage-next'])assert.equal((get('lessons').innerHTML.match(new RegExp(token,'g'))||[]).length,16,token);
assert.equal((get('lessons').innerHTML.match(/data-project-check/g)||[]).length,6);
assert.equal((get('lessons').innerHTML.match(/class="cycle-brief"/g)||[]).length,16,'cada capítulo muestra la pieza a la que contribuye');
assert(get('lessons').innerHTML.includes('Roles, cuando los necesitás'));
assert(get('lessons').innerHTML.includes('Cómo saber si estás mejorando'));
assert(run('barRecipeHTML(0)').includes('<td>1</td><td>16</td>'));
assert(run('barRecipeHTML(1)').includes('<td>2</td><td>32</td>'));
assert.equal(run('scenePlan(lessonPlans[9]).length'),1);
assert.equal(run('scenePlan(lessonPlans[11]).length'),2);
assert.equal(run('SONG_CYCLES.length'),5);
assert.equal(run('COURSE_ACTIVE_MINUTES'),480,'16 sesiones sin sumar dos veces revisión');
assert.equal(run('SONG_CYCLES.reduce((sum,c)=>sum+(c.to-c.from+1)*30,0)'),480,'cinco ciclos suman ocho horas de núcleo');
assert(!get('lessons').innerHTML.includes('walk-buttons'));
assert(!/Cantá|cantando|cantado/.test(get('lessons').innerHTML));
run(`lessonPlans.forEach(p=>{if(p.form.length!==p.bars)throw Error('form');[p.events,p.variation(cloneEvents(p.events))].forEach(events=>events.forEach(e=>{if(!Number.isInteger(e.at)||e.at<0||e.at>=p.bars*16||e.len<1||e.at+e.len>p.bars*16||!e.notes.length||e.notes.some(n=>!Number.isInteger(n)))throw Error('invalid event '+JSON.stringify(e));}));});`);
assert.equal(run('eventsAt(lessonPlans[0].events,5,0,0)[0].notes[0]'),60);
assert.equal(run('eventsAt(lessonPlans[0].events,5,0,1).length'),0);
assert.equal(run('soundingAt(lessonPlans[0].events,5,1)[0].notes[0]'),60);
assert(run('lessonPlans[5].events.some(e=>e.t===4&&e.notes.length===3)'), 'la armonización contiene tríadas');
assert.equal(run('keyForMidi(48).id'),'n4');assert.equal(run('keyForMidi(48).oct'),-1);
assert.equal(run('keyForMidi(70).id'),'u7');
assert.equal(run('JSON.stringify(stageNavigation(0,-1))'),'{"stage":0,"previousDisabled":true,"nextDisabled":false}');
assert.equal(run('JSON.stringify(stageNavigation(1,1))'),'{"stage":2,"previousDisabled":false,"nextDisabled":true}');
assert.equal(run('JSON.stringify(stageNavigation(2,1))'),'{"stage":2,"previousDisabled":false,"nextDisabled":true}');
for(const i of [0,1,2,7,10,11])assert(run(`conceptVisualHTML(${i})`).includes(i===7?'cv-voice':i>=10?'form-track':'concept-visual'));
assert(run('conceptVisualHTML(2)').includes('7 st'));
assert(run('conceptVisualHTML(7)').includes('cv-axis-label'));
assert(run('conceptVisualHTML(10)').includes('--bars:8'));
assert(run('conceptVisualHTML(11)').includes('--bars:8'));
assert.equal(run('eventDurationSeconds(0,4,60,.5)'),1,'cuatro pasos son un pulso a 60 BPM');
assert.equal(run('eventDurationSeconds(0,1,160,.5)'),.09375,'un paso a 160 BPM conserva su duración real');
assert.equal(run('eventDurationSeconds(0,16,60,.5)'),4,'acorde de un compás no se corta en milisegundos');
assert.equal(run('eventDurationSeconds(0,64,60,.5)'),16,'referencia: cuatro compases duran 16 segundos a 60 BPM');
for(const i of [13,14,15]){const original=run(`JSON.stringify(lessonPlans[${i}].events)`);const changed=run(`lessonPlans[${i}].variation(cloneEvents(lessonPlans[${i}].events))`);assert(changed.length>0);assert(changed.every(e=>e.at<128&&e.len<=16-e.at%16),'comparaciones no cruzan barras ni cambian longitud');assert.equal(run(`JSON.stringify(lessonPlans[${i}].events)`),original,'A permanece inmutable');assert(changed.some(e=>e.at>=64),'la comparación conserva la segunda sección');}
assert(run('conceptVisualHTML(1)').includes('primer compás del ejemplo A'));
function click(i,field,value){const el=doc.querySelector(`[data-lab="${i}"]`),b=new El();b.owner=el;b.dataset[field]=String(value??'');b.attrs['data-'+field.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())]='';for(const f of docEvents.click)f({target:b});}
function change(i,field,value){const b=new El();b.owner=doc.querySelector(`[data-lab="${i}"]`);b.attrs['data-'+field]='';b.value=String(value);for(const f of docEvents.change)f({target:b});}
click(0,'track',4);assert.equal(run('labs[0].track'),4);assert(!run('simulatorSVG(0)').includes('led-on'));
click(0,'track',5);click(0,'step',4);assert.equal(run('selectedEvents(0)[0].notes[0]'),60);
const before=run('JSON.stringify(labs[0].events)');click(0,'key','n8');assert.equal(run('JSON.stringify(labs[0].events)'),before);
run("labs[0].variant='c';labs[0].edit=true");click(0,'key','n8');assert.equal(run('selectedEvents(0)[0].notes.join()'),'67');click(0,'key','n8');assert.equal(run('selectedEvents(0).length'),0);
click(0,'variant','b');assert.notEqual(run('JSON.stringify(labEvents(0))'),run('JSON.stringify(lessonPlans[0].events)'));assert.equal(run('labs[0].events.length'),0);
click(0,'variant','c');click(0,'step',15);click(0,'next');assert.equal(run('labs[0].step'),15);
run("labs[0].events=[{t:4,at:0,len:4,notes:[60]}];labs[0].variant='c';labs[0].edit=true");
const cBefore=run('JSON.stringify(labs[0].events)');run("labs[0].variant='a';labs[0].edit=false");run("labs[0].variant='c';labs[0].edit=true");assert.equal(run('JSON.stringify(labs[0].events)'),cBefore,'C sobrevive al cambio de etapa/variante');
const fixtureLab=doc.querySelector('[data-lab="0"]'),slot1=new El(),slot2=new El(),prev=new El(),next=new El(),status=new El(),stages=[0,1,2].map(n=>{const e=new El();e.dataset.stage=String(n);return e}),panels=[0,1,2].map(n=>{const e=new El();e.dataset.stagePanel=String(n);return e});
slot1.appendChild(fixtureLab);const fixture={id:'e1',querySelector(q){if(q==='[data-lab]')return fixtureLab;if(q==='[data-stage-prev]')return prev;if(q==='[data-stage-next]')return next;if(q==='[data-stage-status]')return status;if(q==='[data-simulator-slot="1"]')return slot1;if(q==='[data-simulator-slot="2"]')return slot2;if(q.includes(' h3'))return new El();return new El()},querySelectorAll(q){return q==='[data-stage]'?stages:q==='[data-stage-panel]'?panels:[]}};
run('labs[0].events=[{t:4,at:0,len:4,notes:[60]}];labs[0].variant="a";labs[0].edit=false');box.fixture=fixture;run('activateStage(fixture,1)');assert.strictEqual(fixtureLab.parentNode,slot1);assert.equal(prev.disabled,false);assert.equal(next.disabled,false);run('activateStage(fixture,2)');assert.strictEqual(fixtureLab.parentNode,slot2);assert.equal(run('labs[0].variant'),'c');assert.equal(run('labs[0].edit'),true);assert.equal(run('JSON.stringify(labs[0].events)'),'[{"t":4,"at":0,"len":4,"notes":[60]}]');assert.equal(next.disabled,true);run('activateStage(fixture,0)');assert.strictEqual(fixtureLab.parentNode,slot1);assert.equal(prev.disabled,true);
click(1,'step',15);click(1,'next');assert.equal(run('labs[1].bar'),1);assert.equal(run('labs[1].step'),0);
for(let i=0;i<16;i++){const svg=run(`simulatorSVG(${i})`);assert.equal((svg.match(/data-track=/g)||[]).length,8);assert.equal((svg.match(/data-step=/g)||[]).length,16);assert.equal((svg.match(/data-key=/g)||[]).length,24);}
run('songState.events=[];songState.snapshots={};labs[15].events=[{t:5,at:0,len:4,notes:[77]},{t:4,at:0,len:8,notes:[60,64,67]},{t:3,at:0,len:8,notes:[48]},{t:1,at:0,len:2,notes:[53]}]');const initial=run('saveSongCheckpoint("motivo").events.length');run('labs[15].events.push({t:1,at:16,len:2,notes:[55]})');const afterBase=run('saveSongCheckpoint("base").events.length');assert(afterBase>initial);run('labs[15].events=[]');assert(run('restoreSongCheckpoint("base")'));assert.equal(run('labs[15].events.length'),afterBase);assert.equal(run('labs[15].events[0].notes[0]'),77);assert.equal(run('labs[0].events.length'),1,'snapshots no borran C de otros talleres');
// Secuencia de proyecto: transferencias reales, persistencia, cancelaciones y lote inválido.
run('songState.events=[];songState.snapshots={};labs[0].track=4;labs[0].events=[{t:4,at:0,len:4,notes:[77]}];');const sourceC0=run('JSON.stringify(labs[0].events)');assert(run('integrateIdea(0,{targetTrack:5,fromBar:0,count:1,toBar:0},true)'),'C0 → melodía');
run('labs[4].track=4;labs[4].events=[{t:4,at:0,len:8,notes:[60,64,67]}]');assert(run('integrateIdea(4,{targetTrack:4,fromBar:0,count:1,toBar:0},true)'),'C4 → armonía');const motivo=run('JSON.stringify(songState.events)');assert(run('saveSongCheckpoint("motivo")'),'snapshot motivo');
run('labs[12].track=1;labs[12].events=[{t:1,at:0,len:2,notes:[36]}]');assert(run('integrateIdea(12,{targetTrack:1,fromBar:0,count:1,toBar:0},true)'),'C12 → batería');assert.equal(run('new Set(songState.events.map(e=>e.t)).size'),3,'abrir canción usa current y conserva tres pistas');
const persisted=run('localStorage.getItem(COURSE_KEY+"song-project")');assert.equal(JSON.parse(persisted).version,2);run('songState.events=[];labs[15].events=[];loadSongProject()');assert.equal(run('new Set(songState.events.map(e=>e.t)).size'),3,'recarga conserva las tres pistas');
run('labs[13].track=3;labs[13].events=[{t:3,at:0,len:8,notes:[48]}]');assert(run('integrateIdea(13,{targetTrack:3,fromBar:0,count:1,toBar:0},true)'),'C13 → bajo');assert.equal(run('new Set(songState.events.map(e=>e.t)).size'),4,'bajo conserva las pistas anteriores');
const beforeCancel=run('JSON.stringify(songState.events)');assert(!run('integrateIdea(13,{targetTrack:3,fromBar:0,count:1,toBar:0},false)'),'cancelar overwrite no muta');assert.equal(run('JSON.stringify(songState.events)'),beforeCancel);
box.window.confirm=()=>false;assert(!run('restoreSongCheckpoint("motivo")'),'cancelar restore no muta');assert.equal(run('JSON.stringify(songState.events)'),beforeCancel);box.window.confirm=()=>true;assert(run('restoreSongCheckpoint("motivo").restored'));assert.equal(run('JSON.stringify(songState.events)'),motivo,'restore aceptado vuelve exactamente a motivo');
run('labs[15].events.push({t:6,at:16,len:2,notes:[72]});saveIdea(15);labs[13].track=3;labs[13].events=[{t:3,at:0,len:8,notes:[48]}]');assert(run('integrateIdea(13,{targetTrack:3,fromBar:0,count:1,toBar:0},true)'));assert(run('songState.events.some(e=>e.t===6&&e.notes[0]===72)'),'editar C15 sobrevive al merge');assert.equal(run('JSON.stringify(labs[0].events)'),sourceC0,'C0 no se muta');
run('labs[11].track=3;labs[11].events=[{t:3,at:112,len:4,notes:[50]}]');assert(run('integrateIdea(11,{targetTrack:3,fromBar:7,count:1,toBar:0},true)'),'fuente en compás 8 se transfiere');assert(run('songState.events.some(e=>e.t===3&&e.at===0&&e.notes[0]===50)'));
const beforeInvalid=run('JSON.stringify(songState.events)');run('labs[0].events=[{t:4,at:0,len:99,notes:[60]}]');assert(!run('integrateIdea(0,{targetTrack:5,fromBar:0,count:1,toBar:0},true)'),'lote inválido se rechaza entero');assert.equal(run('JSON.stringify(songState.events)'),beforeInvalid);assert.equal(run('validSongEvents([{__proto__:{x:1},t:1,at:0,len:99,notes:[60]}])'),null,'rechaza prototipo/duración inválidos');
const originalSet=box.localStorage.setItem;box.localStorage.setItem=()=>{throw Error('quota')};const beforeQuota=run('JSON.stringify(songState.events)');assert(!run('saveSongCheckpoint("base")'),'quota no anuncia guardado');assert.equal(run('JSON.stringify(songState.events)'),beforeQuota);box.localStorage.setItem=originalSet;
// La continuidad preserva la fuente, todas sus pistas y los límites entre piezas.
run('labs[0].events=[{t:5,at:0,len:2,notes:[60]},{t:3,at:8,len:4,notes:[48]}];labs[1].events=[]');
const sourceBefore=run('JSON.stringify(labs[0].events)');
assert(run('continueIdea(1).ok'));assert.equal(run('labs[1].events.length'),2);
run('labs[1].events[0].notes[0]=62');assert.equal(run('JSON.stringify(labs[0].events)'),sourceBefore,'la copia no comparte arrays con la fuente');
const targetBefore=run('JSON.stringify(labs[1].events)');assert(!run('continueIdea(1).ok'));assert.equal(run('JSON.stringify(labs[1].events)'),targetBefore,'destino ocupado no cambia sin aceptar');
for(const i of [0,3,6,9,12])assert(!run(`continueIdea(${i},true).ok`),'una pieza nueva no importa automáticamente otra');
run('labs[1].bar=0;labs[1].variant="c";labs[1].edit=true');assert(run('copyIdeaBar(1,1).ok'));assert.equal(run('labs[1].events.filter(e=>e.at>=16).length'),2,'copiar compás lleva todas sus pistas');assert(!run('copyIdeaBar(1,1).ok'),'destino ocupado requiere aceptar');assert(!run('copyIdeaBar(1,2,true).ok'),'no copia fuera de la longitud');
run('labs[1].events=[]');box.localStorage.setItem=()=>{throw Error('quota')};assert(!run('continueIdea(1).ok'));assert.equal(run('labs[1].events.length'),0,'fallo de guardado revierte continuación');box.localStorage.setItem=originalSet;
// Tempo y swing son parte de la composición; también sobreviven a la continuación.
run('labs[9].events=[{t:5,at:0,len:2,notes:[60]}];labs[9].tempo=93;labs[9].swing=true;labs[10].events=[]');assert(run('continueIdea(10).ok'));assert.equal(run('labs[10].tempo'),93);assert.equal(run('labs[10].swing'),true);assert.equal(run('loadTiming(10).tempo'),93);assert.equal(run('loadTiming(10).swing'),true);
run('labs[0].variant="c";labs[0].edit=true;labs[0].track=5;labs[0].bar=0;labs[0].step=0');const beforeFailedKey=run('JSON.stringify(labs[0].events)');box.localStorage.setItem=()=>{throw Error('quota')};run('editKey(0,"n8")');assert.equal(run('JSON.stringify(labs[0].events)'),beforeFailedKey,'una nota no guardada se revierte');assert(doc.querySelector('[data-lab="0"]').querySelector('.save-idea-status').textContent.includes('no pudo guardar'));box.localStorage.setItem=originalSet;
run('labs[10].events=[];labs[10].track=5;labs[10].bar=0;labs[10].step=0;labs[10].variant="c";labs[10].edit=true;labs[10].octave=1;editKey(10,"n8")');assert.equal(run('labs[10].events[0].notes[0]'),79,'puede ingresar Sol5 para desarrollar el registro');run('editKey(10,"n8")');assert.equal(run('labs[10].events.length'),0,'puede quitar la misma nota en octava alta');
// Un C antiguo de 16 compases no se recorta por el nuevo currículo de ocho.
run('localStorage.setItem(COURSE_KEY+"idea-11",JSON.stringify([{t:5,at:240,len:8,notes:[60]}]))');assert.equal(run('loadIdea(11)[0].at'),240);assert.equal(run('lessonPlans[11].bars'),16);assert.equal(run('lessonPlans[11].form.length'),16);run('lessonPlans[11].bars=8;lessonPlans[11].form=lessonPlans[11].form.slice(0,8)');
assert(run('DEEP_CURRICULUM.every(d=>d.activities.reduce((n,a)=>n+a.minutes,0)===30&&typeof d.optionalPractice==="string"&&d.optionalPractice.length>0)'));
// Un solo experimento musical no debe modificar otras decisiones ni su referencia.
function ownCompositionTests(){
 const state=run('JSON.stringify(labs[8])'),storage=new Map(store),model=run('JSON.stringify(lessonPlans[8].events)');
 try{
  run('Object.assign(labs[8],{events:[],reference:null,variant:"a",edit:false,track:5,bar:0,step:0,octave:0,inputLength:1,tempo:90,swing:false})');
  click(8,'variant','c');assert.equal(run('labs[8].edit'),true,'elegir mi composición habilita la edición inmediatamente');
  click(8,'key','n4');assert.equal(run('labs[8].events[0].len'),1,'la primera nota dura un paso');
  change(8,'length',3);assert.equal(run('labs[8].events[0].len'),3);
  click(8,'step',4);click(8,'key','n4');assert.equal(run('selectedEvents(8)[0].len'),3,'otra nota conserva la duración elegida');
  click(8,'step',15);click(8,'key','n4');assert.equal(run('selectedEvents(8)[0].len'),1,'en el último paso la nota cabe dentro del compás');
  assert.equal(run('labs[8].inputLength'),3,'el límite del compás no reemplaza la duración elegida');
  click(8,'bar',1);click(8,'key','n4');assert.equal(run('selectedEvents(8)[0].len'),3,'al volver a disponer de espacio se recupera la duración elegida');
  assert.equal(run('loadTiming(8).inputLength'),3,'la elección de duración sobrevive al guardado');
  const beforeLengthFailure=run('JSON.stringify(captureIdea(8))');box.localStorage.setItem=()=>{throw Error('quota')};change(8,'length',2);assert.equal(run('JSON.stringify(captureIdea(8))'),beforeLengthFailure,'fallar al guardar duración recupera tanto las notas como la preferencia');box.localStorage.setItem=originalSet;

  run('Object.assign(labs[8],{track:5,bar:0,step:0,inputLength:1,events:[{t:5,at:0,len:6,notes:[60]}]})');
  click(8,'key','n4');click(8,'key','n6');
  assert.equal(run('JSON.stringify(selectedEvents(8))'),'[{"t":5,"at":0,"len":6,"notes":[64]}]','reemplazar la única altura conserva la duración heredada aunque la entrada tuviera otra duración');
  assert.equal(run('loadIdea(8)[0].len'),6,'la altura nueva se guarda con su duración original');
  run('labs[8].inputLength=1');click(8,'clear');click(8,'key','n4');
  assert.equal(run('selectedEvents(8)[0].len'),6,'vaciar y reponer el ataque conserva también su duración');

  run('Object.assign(labs[8],{track:4,bar:0,step:4,events:[{t:4,at:4,len:3,notes:[60,64,67]},{t:3,at:3,len:2,notes:[48]},{t:4,at:12,len:4,notes:[62,65,69]}],tempo:91,swing:true})');
  click(8,'keepVersion');const reference=run('JSON.stringify(labs[8].reference)');
  assert.equal(JSON.parse(store.get('opxy-composition-v1-reference-8')).version,1);
  click(8,'moveAttack',-1);
  assert.equal(run('labs[8].step'),3,'la selección sigue al ataque movido');
  assert.equal(run('JSON.stringify(selectedEvents(8))'),'[{"t":4,"at":3,"len":3,"notes":[60,64,67]}]','mover un acorde conserva todas sus notas y duración');
  assert.equal(run('JSON.stringify(labs[8].events.filter(e=>e.t===3))'),'[{"t":3,"at":3,"len":2,"notes":[48]}]','la pista de bajo no cambia aunque use el mismo paso de destino');
  assert.equal(run('labs[8].events.find(e=>e.at===12).len'),4,'los demás ataques no cambian');
  assert.equal(run('JSON.stringify(labs[8].reference)'),reference,'mover la composición no muta la referencia conservada');
  assert.equal(run('JSON.stringify(loadIdea(8))'),run('JSON.stringify(labs[8].events)'),'el ataque movido se guarda');
  run('labs[8].events[0].notes[0]=61');assert.equal(run('labs[8].reference.events[0].notes[0]'),60,'la referencia no comparte arrays de notas con la composición');
  assert.equal(run('JSON.stringify(loadOwnVersion(8))'),reference,'recargar recupera notas, tempo y fraseo de la referencia');
  run('loadOwnVersion(8).events[0].notes[0]=72');assert.equal(run('loadOwnVersion(8).events[0].notes[0]'),60,'la referencia recargada tampoco comparte arrays con otro lector');

  for(const [events,step,delta,label] of [
   [[{t:4,at:4,len:1,notes:[60]},{t:4,at:5,len:1,notes:[64]}],4,1,'destino ocupado'],
   [[{t:4,at:0,len:1,notes:[60]}],0,-1,'inicio del compás'],
   [[{t:4,at:15,len:1,notes:[60]}],15,1,'fin del compás'],
   [[{t:4,at:12,len:4,notes:[60]}],12,1,'duración que cruzaría el compás']
  ]){
   run(`labs[8].events=${JSON.stringify(events)};labs[8].step=${step}`);const before=run('JSON.stringify(labs[8].events)');
   assert(!run(`moveAttack(8,${delta}).ok`),label+' rechaza el movimiento');assert.equal(run('JSON.stringify(labs[8].events)'),before,label+' no altera las notas');assert.equal(run('labs[8].step'),step,label+' no altera la selección');
  }
  run('labs[8].events=[{t:4,at:4,len:1,notes:[72]}];labs[8].step=4');const beforeMoveFailure=run('JSON.stringify(labs[8].events)');
  box.localStorage.setItem=()=>{throw Error('quota')};assert(!run('moveAttack(8,1).ok'));assert.equal(run('JSON.stringify(labs[8].events)'),beforeMoveFailure,'fallo de guardado revierte el movimiento');assert.equal(run('labs[8].step'),4);box.localStorage.setItem=originalSet;

  run('labs[8].tempo=118;labs[8].swing=false');click(8,'variant','r');
  assert.equal(run('labs[8].edit'),false,'la referencia propia se inspecciona sin editar');
  assert.equal(run('JSON.stringify(labEvents(8))'),JSON.stringify(JSON.parse(reference).events));
  assert.equal(doc.querySelector('[data-lab="8"]').querySelector('[data-bpm]').value,91,'la vista de referencia usa su propio tempo');
  assert.equal(doc.querySelector('[data-lab="8"]').querySelector('[data-swing]').checked,true);
  click(8,'key','n4');assert.equal(run('JSON.stringify(labs[8].events)'),beforeMoveFailure,'tocar una tecla en la referencia no altera la composición');
  assert(!run('keepOwnVersion(8).ok'),'la vista de referencia no puede reemplazarse a sí misma');
  click(8,'variant','c');assert.equal(run('labs[8].edit'),true);assert.equal(run('JSON.stringify(labEvents(8))'),beforeMoveFailure);
  assert.equal(doc.querySelector('[data-lab="8"]').querySelector('[data-bpm]').value,118,'volver a C recupera su tempo actual');
  const beforeKeepFailure=store.get('opxy-composition-v1-reference-8');box.localStorage.setItem=()=>{throw Error('quota')};
  assert(!run('keepOwnVersion(8).ok'));assert.equal(run('JSON.stringify(labs[8].reference)'),reference,'quota al conservar deja disponible la referencia anterior');assert.equal(store.get('opxy-composition-v1-reference-8'),beforeKeepFailure);
  const beforeRestoreFailure=run('JSON.stringify(captureIdea(8))');assert(!run('restoreOwnVersion(8).ok'));assert.equal(run('JSON.stringify(captureIdea(8))'),beforeRestoreFailure,'quota al recuperar conserva toda la composición actual');assert.equal(run('JSON.stringify(labs[8].reference)'),reference);
  box.localStorage.setItem=originalSet;assert(run('restoreOwnVersion(8).ok'));assert.equal(run('JSON.stringify(labs[8].events)'),JSON.stringify(JSON.parse(reference).events));assert.equal(run('labs[8].tempo'),91);assert.equal(run('labs[8].swing'),true);assert.equal(run('labs[8].variant'),'c');assert.equal(run('labs[8].edit'),true);
  run('labs[8].events[0].notes[0]=74');assert.equal(run('JSON.stringify(labs[8].reference)'),reference,'recuperar crea otra copia editable y conserva la referencia');
  assert.equal(run('JSON.stringify(lessonPlans[8].events)'),model,'ninguna operación propia cambia el modelo A');
 }finally{box.localStorage.setItem=originalSet;run(`labs[8]=${state}`);store.clear();for(const [key,value] of storage)store.set(key,value);}
}
ownCompositionTests();
async function ownVersionPlaybackTests(){
 const state=run('JSON.stringify(labs[8])'),tones=[];
 box.originalTestPlayTone=run('playTone');box.recordTestPlayTone=(...args)=>tones.push(args);
 try{
  run('playTone=recordTestPlayTone;Object.assign(labs[8],{events:[{t:5,at:0,len:1,notes:[72]}],tempo:120,swing:false,reference:{events:[{t:5,at:0,len:1,notes:[60]}],tempo:60,swing:true}})');
  click(8,'variant','c');await run('startPlayer(8)');
  assert.equal(tones.length,1);assert.equal(tones[0][0],72,'la reproducción actual toma las notas de C');assert.equal(tones[0][1],.125,'C reproduce su duración a 120 BPM y sin swing');
  assert(doc.querySelector('[data-lab="8"]').querySelector('.audio-status').textContent.startsWith('Mi composición'));
  click(8,'variant','r');tones.length=0;await run('startPlayer(8)');
  assert.equal(tones.length,1);assert.equal(tones[0][0],60,'la reproducción guardada toma las notas conservadas');assert(Math.abs(tones[0][1]-1/3)<1e-9,'la referencia reproduce su tempo de 60 BPM y su propio swing');
  assert(doc.querySelector('[data-lab="8"]').querySelector('.audio-status').textContent.startsWith('Mi versión guardada'));
  assert.equal(run('labs[8].events[0].notes[0]'),72,'escuchar la referencia conserva los cambios de C');assert.equal(run('labs[8].tempo'),120);assert.equal(run('labs[8].swing'),false);
 }finally{run('halt();playTone=originalTestPlayTone');run(`labs[8]=${state}`);delete box.originalTestPlayTone;delete box.recordTestPlayTone;}
}
async function modelPreviewTempoTests(){
 const state=run('JSON.stringify(labs[0])'),storage=new Map(store),lab=doc.querySelector('[data-lab="0"]'),modelTempo=run('lessonPlans[0].tempo'),stepSeconds=60/modelTempo/4;
 try{
  run('halt()');advanceAudio(time+100);
  run('Object.assign(labs[0],{events:[{t:5,at:0,len:1,notes:[72]}],tempo:120,swing:false,variant:"c",edit:true});saveIdea(0)');
  const savedC=store.get('opxy-composition-v1-idea-0'),ownEvents=run('JSON.stringify(labs[0].events)');
  assert.notEqual(modelTempo,120,'la prueba compara tempos distintos');
  lab.querySelector('[data-loop]').checked=false;
  for(const variant of ['a','b']){
   click(0,'variant','c');assert.equal(lab.querySelector('[data-bpm]').value,120);
   const button=new El();button.dataset.preview='0';button.dataset.v=variant;button.attrs['data-preview']='';button.attrs['data-v']='';
   // A representa el botón junto a la teoría; B el botón dentro del editor.
   if(variant==='b')button.owner=lab;
   for(const handler of docEvents.click)handler({target:button});
   await new Promise(resolve=>setImmediate(resolve));
   assert.equal(run('audioRun'),0,`preview ${variant.toUpperCase()} inicia el reproductor`);
   assert(voices>0,`preview ${variant.toUpperCase()} genera voces de audio`);
   assert.equal(timers.size,1,'queda un único reloj de reproducción');
   const [id,timer]=timers.entries().next().value;
   assert(Math.abs(timer.dt-(.04+stepSeconds)*1000)<1e-6,`preview ${variant.toUpperCase()} programa el primer paso a ${modelTempo} BPM, no a 120`);
   timers.delete(id);time+=timer.dt/1000;timer.f();advanceAudio(time);
   assert.equal(timers.size,1);
   assert(Math.abs(timers.values().next().value.dt-stepSeconds*1000)<1e-6,'los siguientes pasos conservan el tempo del modelo');
   assert.equal(run('labs[0].tempo'),120,'escuchar el modelo no cambia el tempo propio');
   assert.equal(run('JSON.stringify(labs[0].events)'),ownEvents,'escuchar el modelo no cambia las notas propias');
   assert.equal(store.get('opxy-composition-v1-idea-0'),savedC,'el preview no reescribe el proyecto guardado');
   run('halt()');advanceAudio(time+100);
   assert.equal(voices,0);assert.equal(timers.size,0);
  }
  click(0,'variant','c');assert.equal(lab.querySelector('[data-bpm]').value,120,'volver a C recupera su tempo de edición');
 }finally{run('halt()');advanceAudio(time+100);run(`labs[0]=${state};renderLab(0)`);store.clear();for(const [key,value] of storage)store.set(key,value);}
}
async function audioTests(){scheduledStops.length=0;gainEvents.length=0;run('audioContext=new window.AudioContext();playTone(60,4,4,10)');assert.equal(scheduledStops.length,4,'piano usa cuatro parciales por nota');assert(scheduledStops.every(t=>t>14),'envolvente no libera un acorde de cuatro pulsos antes de terminar');const heldAtEnd=gainEvents.filter(x=>x.kind==='set'&&x.at===14);assert.equal(heldAtEnd.length,4,'cada parcial queda sostenida hasta el fin de la duración');assert(heldAtEnd.reduce((sum,x)=>sum+x.value,0)>.01,'el cuerpo combinado de armonía sigue siendo audible, no cae a un susurro');const partialDecays=gainEvents.filter(x=>x.kind==='exp'&&x.at<14);assert(partialDecays.every(x=>x.at<=14),'la caída de cada parcial termina antes del note-off');assert(new Set(partialDecays.map(x=>x.at)).size>1,'los armónicos no decaen todos como un oscilador único');gainEvents.length=0;run('playTone(60,.03,4,20)');assert(gainEvents.filter(x=>x.kind==='exp'&&x.at<20.03).every(x=>x.at<=20.03),'nota corta: no hay automatización de decay después de su gate');run('audioRun=0;labs[0].playing=true;finishPlayback(0,"fin")');assert(run('audioNodes.size')>0,'final natural conserva voces en su cola');assert(voices>0,'mock no da por terminada una voz sólo por programar stop');advanceAudio(21);assert.equal(voices,0,'la cola termina al tiempo programado');run('halt();labs.forEach(s=>{s.variant="a";s.edit=false})');advanceAudio(time+100);for(let i=0;i<16;i++){await run(`startPlayer(${i})`);assert.equal(run('audioRun'),i);assert.equal(timers.size,1);let ticks=0;while(timers.size){const [id,t]=timers.entries().next().value;timers.delete(id);time+=t.dt/1000;t.f();advanceAudio(time);assert(++ticks<=300);}assert.equal(run('audioRun'),null);advanceAudio(time+10);assert.equal(voices,0);assert(doc.querySelector(`[data-lab="${i}"]`).querySelector('.audio-status').textContent.includes('Ejemplo terminado'));}
 await run('startPlayer(0)');await run('startPlayer(1)');assert.equal(timers.size,1);assert.equal(run('audioRun'),1);run('halt()');advanceAudio(time+100);assert.equal(timers.size,0);assert.equal(voices,0);
 const p1=run('startPlayer(0)'),p2=run('startPlayer(1)');await Promise.all([p1,p2]);assert.equal(run('audioRun'),1);assert.equal(timers.size,1);run('halt()');
 await ownVersionPlaybackTests();
 await modelPreviewTempoTests();
 console.log('PASS: 16 talleres; C editable, duración persistente, movimiento sin pérdidas y versiones propias con rollback; A/B fijos y snapshots de canción; 8 pistas, 16 pasos y 24 teclas; audio finito/exclusivo y reproducción C/referencia con su tempo y swing. DOM/WebAudio simulado; no es QA visual de navegador.');}
audioTests().catch(e=>{console.error(e);process.exitCode=1});
