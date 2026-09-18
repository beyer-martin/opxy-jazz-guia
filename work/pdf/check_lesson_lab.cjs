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
assert.equal(run('courseMinutes()'),960);
assert(run('DEEP_CURRICULUM.every(x=>x.activities.length===6&&x.theory&&x.workedExample&&x.misconception&&x.application&&x.mastery&&x.sources.length)'));
assert.equal(run('DEEP_CURRICULUM.reduce((n,x)=>n+x.activities.length,0)'),96);
assert(get('lessons').innerHTML.includes('Marco para decidir')&&get('lessons').innerHTML.includes('Dominio y fuentes'));
assert.equal((get('lessons').innerHTML.match(/data-session-minutes="60"/g)||[]).length,16);
assert.equal(run('lessonPlans.length*60'),960,'duración derivada de las 16 sesiones');
for(const token of ['class="lab"','class="finish"','class="focus-card"','class="support-tabs"','class="bar-recipe"','data-simulator-slot="1"','data-simulator-slot="2"','data-stage-prev','data-stage-next'])assert.equal((get('lessons').innerHTML.match(new RegExp(token,'g'))||[]).length,16,token);
assert.equal((get('lessons').innerHTML.match(/data-project-check/g)||[]).length,6);
assert((get('lessons').innerHTML.match(/CANCIÓN-0/g)||[]).length>=6,'hitos de canción visibles');
assert(get('lessons').innerHTML.includes('roles antes que cantidad de pistas'));
assert(get('lessons').innerHTML.includes('tres referencias conocidas'));
assert(run('barRecipeHTML(0)').includes('<td>1</td><td>16</td>'));
assert(run('barRecipeHTML(1)').includes('<td>2</td><td>32</td>'));
assert.equal(run('scenePlan(lessonPlans[9]).length'),3);
assert.equal(run('scenePlan(lessonPlans[11]).length'),4);
assert.equal(run('SONG_SESSIONS.length'),8);
assert.equal(run('COURSE_ACTIVE_MINUTES'),960,'16 sesiones sin sumar dos veces revisión');
assert.equal(run('SONG_SESSIONS.reduce((sum,s)=>sum+s[3],0)'),960,'bloques agrupados suman 16 horas activas');
assert(!get('lessons').innerHTML.includes('walk-buttons'));
assert(!/Cantá|cantando|cantado/.test(get('lessons').innerHTML));
run(`lessonPlans.forEach(p=>{if(p.form.length!==p.bars)throw Error('form');[p.events,p.variation(cloneEvents(p.events))].forEach(events=>events.forEach(e=>{if(!Number.isInteger(e.at)||e.at<0||e.at>=p.bars*16||e.len<1||e.at+e.len>p.bars*16||!e.notes.length||e.notes.some(n=>!Number.isInteger(n)))throw Error('invalid event '+JSON.stringify(e));}));});`);
assert.equal(run('eventsAt(lessonPlans[0].events,4,0,0)[0].notes[0]'),60);
assert.equal(run('eventsAt(lessonPlans[0].events,4,0,1).length'),0);
assert.equal(run('soundingAt(lessonPlans[0].events,4,1)[0].notes[0]'),60);
assert.equal(run('eventsAt(lessonPlans[5].events,4,1,0)[0].notes.join()'),'57,60,64');
assert.equal(run('keyForMidi(48).id'),'n4');assert.equal(run('keyForMidi(48).oct'),-1);
assert.equal(run('keyForMidi(70).id'),'u7');
assert.equal(run('JSON.stringify(stageNavigation(0,-1))'),'{"stage":0,"previousDisabled":true,"nextDisabled":false}');
assert.equal(run('JSON.stringify(stageNavigation(1,1))'),'{"stage":2,"previousDisabled":false,"nextDisabled":true}');
assert.equal(run('JSON.stringify(stageNavigation(2,1))'),'{"stage":2,"previousDisabled":false,"nextDisabled":true}');
for(const i of [0,1,2,7,10,11])assert(run(`conceptVisualHTML(${i})`).includes(i===7?'cv-voice':i>=10?'form-track':'concept-visual'));
assert(run('conceptVisualHTML(2)').includes('7 st'));
assert(run('conceptVisualHTML(7)').includes('cv-axis-label'));
assert(run('conceptVisualHTML(10)').includes('--bars:8'));
assert(run('conceptVisualHTML(11)').includes('--bars:16'));
assert.equal(run('eventDurationSeconds(0,4,60,.5)'),1,'cuatro pasos son un pulso a 60 BPM');
assert.equal(run('eventDurationSeconds(0,1,160,.5)'),.09375,'un paso a 160 BPM conserva su duración real');
assert.equal(run('eventDurationSeconds(0,16,60,.5)'),4,'acorde de un compás no se corta en milisegundos');
assert.equal(run('eventDurationSeconds(0,64,60,.5)'),16,'referencia: cuatro compases duran 16 segundos a 60 BPM');
const a14=run('cloneEvents(lessonPlans[13].events)'),b14=run('lessonPlans[13].variation(cloneEvents(lessonPlans[13].events))');assert.equal(b14.length,a14.length,'B14 repite A sin vaciar su segunda mitad');assert(b14.every(e=>e.at<128));
const a15=run('cloneEvents(lessonPlans[14].events)'),b15=run('lessonPlans[14].variation(cloneEvents(lessonPlans[14].events))');assert(!a15.some(e=>e.t===1&&e.at===60)&&b15.some(e=>e.t===1&&e.at===60),'B15 restaura golpe 13');assert(a15.some(e=>e.t===6&&e.at===62)&&!b15.some(e=>e.t===6&&e.at===62),'B15 quita anticipación 15');assert.deepEqual(a15.filter(e=>!(e.t===6&&e.at===62)),b15.filter(e=>!(e.t===1&&e.at===60)),'B15 conserva el resto');
const b16=run('lessonPlans[15].variation(cloneEvents(lessonPlans[15].events))');assert(!b16.some((e,i,a)=>e.t===4&&a.some((x,j)=>j!==i&&x.t===4&&x.at===e.at)),'B16 no duplica armonía en un mismo ataque');assert(b16.filter(e=>e.t===4).every(e=>e.notes.length<=3),'B16 cambia densidad, no volumen');
assert(run('conceptVisualHTML(1)').includes('primer compás del ejemplo A'));
function click(i,field,value){const el=doc.querySelector(`[data-lab="${i}"]`),b=new El();b.owner=el;b.dataset[field]=String(value??'');b.attrs['data-'+field]='';for(const f of docEvents.click)f({target:b});}
click(0,'track',5);assert.equal(run('labs[0].track'),5);assert(!run('simulatorSVG(0)').includes('led-on'));
click(0,'track',4);click(0,'step',4);assert.equal(run('selectedEvents(0)[0].notes[0]'),60);
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
run('labs[11].track=3;labs[11].events=[{t:3,at:128,len:4,notes:[50]}]');assert(run('integrateIdea(11,{targetTrack:3,fromBar:8,count:1,toBar:0},true)'),'fuente en compás 9 se transfiere');assert(run('songState.events.some(e=>e.t===3&&e.at===0&&e.notes[0]===50)'));
const beforeInvalid=run('JSON.stringify(songState.events)');run('labs[0].events=[{t:4,at:0,len:99,notes:[60]}]');assert(!run('integrateIdea(0,{targetTrack:5,fromBar:0,count:1,toBar:0},true)'),'lote inválido se rechaza entero');assert.equal(run('JSON.stringify(songState.events)'),beforeInvalid);assert.equal(run('validSongEvents([{__proto__:{x:1},t:1,at:0,len:99,notes:[60]}])'),null,'rechaza prototipo/duración inválidos');
const originalSet=box.localStorage.setItem;box.localStorage.setItem=()=>{throw Error('quota')};const beforeQuota=run('JSON.stringify(songState.events)');assert(!run('saveSongCheckpoint("base")'),'quota no anuncia guardado');assert.equal(run('JSON.stringify(songState.events)'),beforeQuota);box.localStorage.setItem=originalSet;
async function audioTests(){scheduledStops.length=0;gainEvents.length=0;run('audioContext=new window.AudioContext();playTone(60,4,4,10)');assert.equal(scheduledStops.length,4,'piano usa cuatro parciales por nota');assert(scheduledStops.every(t=>t>14),'envolvente no libera un acorde de cuatro pulsos antes de terminar');const heldAtEnd=gainEvents.filter(x=>x.kind==='set'&&x.at===14);assert.equal(heldAtEnd.length,4,'cada parcial queda sostenida hasta el fin de la duración');assert(heldAtEnd.reduce((sum,x)=>sum+x.value,0)>.01,'el cuerpo combinado de armonía sigue siendo audible, no cae a un susurro');const partialDecays=gainEvents.filter(x=>x.kind==='exp'&&x.at<14);assert(partialDecays.every(x=>x.at<=14),'la caída de cada parcial termina antes del note-off');assert(new Set(partialDecays.map(x=>x.at)).size>1,'los armónicos no decaen todos como un oscilador único');gainEvents.length=0;run('playTone(60,.03,4,20)');assert(gainEvents.filter(x=>x.kind==='exp'&&x.at<20.03).every(x=>x.at<=20.03),'nota corta: no hay automatización de decay después de su gate');run('audioRun=0;labs[0].playing=true;finishPlayback(0,"fin")');assert(run('audioNodes.size')>0,'final natural conserva voces en su cola');assert(voices>0,'mock no da por terminada una voz sólo por programar stop');advanceAudio(21);assert.equal(voices,0,'la cola termina al tiempo programado');run('halt();labs.forEach(s=>{s.variant="a";s.edit=false})');advanceAudio(time+100);for(let i=0;i<16;i++){await run(`startPlayer(${i})`);assert.equal(run('audioRun'),i);assert.equal(timers.size,1);let ticks=0;while(timers.size){const [id,t]=timers.entries().next().value;timers.delete(id);time+=t.dt/1000;t.f();advanceAudio(time);assert(++ticks<=300);}assert.equal(run('audioRun'),null);advanceAudio(time+10);assert.equal(voices,0);assert(doc.querySelector(`[data-lab="${i}"]`).querySelector('.audio-status').textContent.includes('Ejemplo terminado'));}
 await run('startPlayer(0)');await run('startPlayer(1)');assert.equal(timers.size,1);assert.equal(run('audioRun'),1);run('halt()');advanceAudio(time+100);assert.equal(timers.size,0);assert.equal(voices,0);
 const p1=run('startPlayer(0)'),p2=run('startPlayer(1)');await Promise.all([p1,p2]);assert.equal(run('audioRun'),1);assert.equal(timers.size,1);run('halt()');
 console.log('PASS: 16 talleres, A/B fijos, C independiente y snapshots de canción; 8 pistas, 16 pasos y 24 teclas por simulador; audio finito/exclusivo. DOM/WebAudio simulado; no es QA visual de navegador.');}
audioTests().catch(e=>{console.error(e);process.exitCode=1});
