// Independent ear and theory experiments. They never read or replace the learner's C.
const THEORY_NATURALS=[{pc:0,name:'Do'},{pc:2,name:'Re'},{pc:4,name:'Mi'},{pc:5,name:'Fa'},{pc:7,name:'Sol'},{pc:9,name:'La'},{pc:11,name:'Si'}];
const THEORY_CHROMATIC=['Do','Do♯','Re','Mi♭','Mi','Fa','Fa♯','Sol','Sol♯','La','Si♭','Si'];
const THEORY_TRIADS={
 C:{name:'Do mayor',root:60,notes:[60,64,67],distances:[0,4,7],roles:['Raíz','Tercera mayor','Quinta justa'],count:'Do–Re–Mi: tres nombres. Do–Re–Mi–Fa–Sol: cinco.'},
 Am:{name:'La menor',root:57,notes:[57,60,64],distances:[0,3,7],roles:['Raíz','Tercera menor','Quinta justa'],count:'La–Si–Do: tres nombres. La–Si–Do–Re–Mi: cinco.'}
};
function theoryRelation(root,target){
 const start=THEORY_NATURALS.findIndex(n=>n.pc===root),end=THEORY_NATURALS.findIndex(n=>n.pc===target);
 if(start<0||end<0)return null;
 const count=(end-start+7)%7+1,semitones=(target-root+12)%12;
 return {root:THEORY_NATURALS[start].name,target:THEORY_NATURALS[end].name,degree:end+1,count,semitones,names:Array.from({length:count},(_,k)=>THEORY_NATURALS[(start+k)%7].name),interval:['unísono','segunda','tercera','cuarta','quinta','sexta','séptima'][count-1]};
}
function theoryIntervalQuality(count,semitones){
 const qualities={'1:0':'justo','2:1':'menor','2:2':'mayor','3:3':'menor','3:4':'mayor','4:5':'justa','4:6':'aumentada','5:6':'disminuida','5:7':'justa','6:8':'menor','6:9':'mayor','7:10':'menor','7:11':'mayor'};
 return qualities[`${count}:${semitones}`]||'';
}
function theoryToolsHTML(i){
 if(i<2||i>5)return '';
 const root=i>=4?9:0,opts=selected=>THEORY_NATURALS.map(n=>`<option value="${n.pc}"${n.pc===selected?' selected':''}>${n.name}</option>`).join('');
 const interval=`<div class="theory-interval"><h3>${i===2?'Dos maneras de medir una distancia':'¿Desde dónde estoy contando?'}</h3>
 <p>${i===2?'Probá Do→Mi y después Mi→Fa. Contar nombres y contar semitonos responde a preguntas distintas.':'La escala de referencia se mantiene en Do mayor. Cambiá la nota de partida del intervalo: mirá qué cambia y qué permanece.'}</p>
 <div class="theory-selectors"><label>Parto de <select data-theory-root>${opts(root)}</select></label><label>Llego a <select data-theory-target>${opts(4)}</select></label></div>
 <p class="muted">Medimos hacia arriba, dentro de una octava. En un acorde, estas distancias parten de su raíz.</p><div data-theory-relation aria-live="polite"></div>
 ${i>=4?'<p class="theory-anchor"><b>Mi no cambió de nombre:</b> en la escala de Do mayor sigue siendo grado 3. En C contamos desde Do y Mi es su tercera; en Am contamos desde La y Mi es su quinta. «Grado en una escala» y «nota de un acorde» tienen referencias distintas.</p>':''}</div>`;
 return `<section class="theory-tools" data-theory-tools="${i}" aria-label="Laboratorio de teoría musical">
 ${i===4?theoryHarmonyHTML():''}
 ${i===4?`<details class="theory-interval-reference"><summary>Consulta: medir otro intervalo y distinguirlo de un grado</summary>${interval}</details>`:interval}
 ${i===4?theoryTransferHTML():''}${i>=4?theoryListeningHTML(i):''}</section>`;
}
function theoryHarmonyHTML(){return `<section class="theory-harmony" data-theory-chord="C" aria-label="Construir y escuchar tríadas">
 <p class="theory-eyebrow">CONSTRUIR · MEDIR · ESCUCHAR</p><h3>Una tríada tiene tres notas.</h3>
 <p>La <b>raíz</b> nombra el acorde. La <b>tercera</b> queda a tres nombres de distancia, contando la raíz. La <b>quinta</b>, a cinco. Cambiá de acorde y seguí las tres funciones.</p>
 <div class="theory-chord-choices" role="group" aria-label="Acorde que querés estudiar"><button type="button" data-theory-chord-choice="C" aria-pressed="true"><b>C</b><span>Do mayor</span></button><button type="button" data-theory-chord-choice="Am" aria-pressed="false"><b>Am</b><span>La menor</span></button></div>
 <p class="muted theory-notation">La letra nombra la raíz: C es Do y A es La. «m» indica menor.</p>
 <div class="theory-role-trio" data-theory-chord-roles aria-live="polite"></div><p class="muted" data-theory-chord-count></p>
 <h4>Contá nombres para el intervalo; saltos para la distancia.</h4><p>Un <b>semitono</b> es la distancia entre dos teclas consecutivas, incluidas las negras. Empezá en la raíz con <b>0</b> y contá los saltos.</p>
 <div class="theory-formulas"><div data-theory-formula="C"><b>Mayor</b><strong>0 · 4 · 7</strong><small>Raíz · tercera mayor · quinta justa</small></div><div data-theory-formula="Am"><b>Menor</b><strong>0 · 3 · 7</strong><small>Raíz · tercera menor · quinta justa</small></div></div>
 <p class="theory-distance-label" data-theory-chord-distance></p><ol class="theory-chord-walk" data-theory-chord-walk></ol>
 <p class="muted">♯ sube una nota un semitono; ♭ la baja un semitono. Mi♭ queda justo debajo de Mi.</p>
 <div class="theory-actions"><button type="button" data-theory-chord-play>Escuchar Do mayor ▶</button><button type="button" data-theory-stop>Detener ■</button></div>
 <div class="theory-isolate"><h4>Para oír sólo la diferencia de tercera</h4><p>C → Cm: Do–Mi–Sol → Do–Mi♭–Sol. Conservamos raíz y quinta; bajamos Mi un semitono.</p><button type="button" data-theory-isolate>Escuchar C → Cm ▶</button><p class="muted">C y Am también cambian de raíz. Esta comparación con C y Cm permite aislar el efecto de la tercera.</p></div>
 <p data-theory-audio-status role="status">Podés escuchar el acorde completo o cada nota de las tarjetas.</p>
 <div class="theory-function-pair"><div><span>Mi sobre C</span><b>Tercera mayor</b><small>Do → Mi · 4 semitonos</small></div><div><span>Mi sobre Am</span><b>Quinta justa</b><small>La → Mi · 7 semitonos</small></div></div>
 <p><b>Mi pertenece a ambos acordes.</b> En la escala de Do mayor sigue siendo el grado 3; su función dentro del acorde depende de la raíz de ese acorde.</p><p class="muted">Usar Am no significa por sí solo que la canción haya pasado a la tonalidad de La menor. Estos ensayos no modifican tu composición; escuchás un sonido de referencia.</p>
 </section>`;}
function theoryTransferHTML(){return `<details class="theory-transfer" data-theory-build-mode="minor"><summary>Probalo sin copiar: de Re menor a Re mayor</summary>
 <h4 data-theory-build-title>Construí Re menor desde otra raíz.</h4><p data-theory-build-prompt>Raíz: Re. Buscá una tercera menor, a <b>3 semitonos</b>, y una quinta justa, a <b>7 semitonos</b>. Contá los saltos desde Re = 0. Elegí las otras dos notas; la respuesta aparece después de comprobar.</p>
 <div class="theory-note-choices" role="group" aria-label="Notas para construir un acorde desde Re">${Array.from({length:12},(_,k)=>{const pc=(2+k)%12;return `<button type="button" data-theory-build="${pc}" aria-pressed="${k===0}"${k===0?' disabled':''}>${THEORY_CHROMATIC[pc]}${k===0?' · raíz':''}</button>`;}).join('')}</div>
 <div class="theory-actions"><button type="button" data-theory-build-listen>Escuchar mis notas ▶</button><button type="button" data-theory-check>Comprobar mis notas</button><button type="button" data-theory-major hidden>Ahora convertilo en Re mayor →</button><button type="button" data-theory-reset>Empezar de nuevo</button><button type="button" data-theory-stop>Detener ■</button></div>
 <p data-theory-build-status role="status">Re ya está elegido. Faltan la tercera y la quinta.</p><p data-theory-audio-status role="status"></p><p class="muted">Aplicás el procedimiento a otra raíz. Este ensayo no reemplaza los acordes de tu canción.</p></details>`;}
function theoryListeningHTML(i){return `<details class="theory-listening"><summary>${i===5?'Escuchar antes de corregir: una nota, dos acordes':'Elegir el apoyo: la misma nota sobre C y Am'}</summary>
 <p><b>1.</b> Buscá en tu melodía una nota larga, acentuada o final. <b>2.</b> Conservá esa nota y compará dos acompañamientos. <b>3.</b> Describí dónde querés apoyo, roce o continuidad. <b>4.</b> Volvé a escuchar el compás y después la frase completa.</p><p>En este ensayo primero suena el acorde durante un segundo y después entra la nota aguda. La nota melódica y su registro, el timbre y las duraciones se mantienen entre las dos versiones.</p>
 <label>Nota sostenida del ensayo <select data-theory-listen-note><option value="76">Mi</option><option value="79">Sol</option></select></label>
 <div class="theory-actions"><button type="button" data-theory-play="solo">Nota sola ▶</button><button type="button" data-theory-play="C">Con Do mayor ▶</button><button type="button" data-theory-play="Am">Con La menor ▶</button><button type="button" data-theory-stop>Detener ■</button></div><p data-theory-audio-status role="status">Elegí una nota y escuchá las dos versiones.</p><p data-theory-note-context></p>
 <p><b>¿Qué te permite decidir este ensayo?</b> Puede que ambas versiones te sirvan. Mayor y menor no imponen una emoción ni una preferencia.</p>
 <div class="theory-actions theory-decisions"><button type="button" data-theory-decision="C" aria-pressed="false">Prefiero el apoyo de C</button><button type="button" data-theory-decision="Am" aria-pressed="false">Prefiero el apoyo de Am</button><button type="button" data-theory-decision="either" aria-pressed="false">Ambas me sirven</button><button type="button" data-theory-decision="unclear" aria-pressed="false">No distingo todavía</button></div><p data-theory-decision-status role="status"></p>
 <div data-theory-simpler hidden><p><b>Otra pista para comparar:</b> elegí Sol arriba y escuchá C y Am otra vez. Sol es la quinta de C; sobre La–Do–Mi agrega una séptima menor y el conjunto tiene sonoridad de <b>Am7</b>. Probá si ese color añadido te ayuda a distinguir las opciones.</p><button type="button" data-theory-simplify>Usar Sol y volver a escuchar</button><p>Escuchá la nota sola, después cada acorde con la nota. Si aún no distinguís el efecto, conservá un acompañamiento provisional y anotá «pendiente de escuchar». No hace falta inventar una diferencia ni cambiar la melodía para pasar.</p></div>
 <p class="theory-return"><b>Aplicalo a tu composición:</b> ubicá una nota importante y su compás. Conservá la versión actual y cambiá sólo el acorde debajo. Elegí por el recorrido que buscás; si no estás seguro, mantené el original y volvé a esta comparación otro día.</p></details>`;}
function renderTheoryRelation(el){
 const root=Number(el.querySelector('[data-theory-root]').value),r=theoryRelation(root,Number(el.querySelector('[data-theory-target]').value)),i=Number(el.dataset.theoryTools);
 el.querySelector('[data-theory-relation]').innerHTML=`<div class="theory-counts">${i>=3?`<div><h4>Grado en Do mayor</h4><p><b>${r.target} = grado ${r.degree}</b></p><p>La referencia de la escala sigue siendo Do. Contamos Do como 1.</p></div>`:''}<div><h4>Nombre del intervalo</h4><p><b>${r.interval} ${theoryIntervalQuality(r.count,r.semitones)}</b></p><p>${r.names.map((n,k)=>`${n} (${k+1})`).join(' → ')}</p><p>Contamos ambos extremos: ${r.root} es 1.</p></div><div><h4>Distancia en semitonos</h4><p><b>${r.semitones} ${r.semitones===1?'semitono':'semitonos'}</b></p><p>Contamos saltos entre teclas consecutivas: ${r.root} empieza en 0.</p></div></div><ol class="theory-semitones" aria-label="Saltos de semitono desde ${r.root} hasta ${r.target}">${Array.from({length:r.semitones+1},(_,k)=>`<li><b>${THEORY_CHROMATIC[(root+k)%12]}</b><span>${k}</span></li>`).join('')}</ol>${r.count===3?`<p>«Tercera» cuenta tres nombres; «${r.semitones===3?'menor':'mayor'}» precisa aquí si la distancia tiene 3 o 4 semitonos.</p>`:''}`;
}
function renderTheoryHarmony(el){
 const chord=el.dataset.theoryChord,c=THEORY_TRIADS[chord],roles=['root','third','fifth'];
 el.querySelectorAll('[data-theory-chord-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theoryChordChoice===chord)));
 el.querySelector('[data-theory-chord-roles]').innerHTML=c.notes.map((m,k)=>`<button type="button" class="theory-role-${roles[k]}" data-theory-chord-note="${m}" aria-label="Escuchar ${THEORY_CHROMATIC[m%12]}, ${c.roles[k]}"><small>${c.roles[k]}</small><b>${THEORY_CHROMATIC[m%12]}</b><span>${c.distances[k]} semitonos · ▶</span></button>`).join('');
 el.querySelector('[data-theory-chord-count]').textContent=c.count+' Contamos el nombre de la raíz como 1.';
 el.querySelectorAll('[data-theory-formula]').forEach(n=>n.classList.toggle('selected',n.dataset.theoryFormula===chord));
 el.querySelector('[data-theory-chord-distance]').textContent=`Desde ${THEORY_CHROMATIC[c.root%12]} = 0: la tercera está a ${c.distances[1]} semitonos y la quinta a 7.`;
 el.querySelector('[data-theory-chord-walk]').setAttribute('aria-label',`Semitonos desde ${THEORY_CHROMATIC[c.root%12]} hasta ${THEORY_CHROMATIC[c.notes[2]%12]}`);
 el.querySelector('[data-theory-chord-walk]').innerHTML=Array.from({length:8},(_,k)=>{const role=c.distances.indexOf(k);return `<li${role<0?'':` class="theory-role-${roles[role]} selected"`}><b>${THEORY_CHROMATIC[(c.root+k)%12]}</b><span>${k}</span></li>`;}).join('');
 el.querySelector('[data-theory-chord-play]').textContent=`Escuchar ${c.name} ▶`;
}
function checkTheoryTriad(selected,major=false){
 const notes=[...new Set(selected)].filter(n=>Number.isInteger(n)&&n>=0&&n<12&&n!==2),third=major?6:5;
 if(notes.length!==2)return {correct:false,message:'Elegí exactamente dos notas además de Re: una tercera y una quinta.'};
 if(notes.includes(third)&&notes.includes(9))return {correct:true,message:major?'Construiste Re–Fa♯–La: Re (0), Fa♯ (4) y La (7 semitonos). Subiste la tercera un semitono y conservaste raíz y quinta. Esa única nota convierte la tríada menor en mayor.':'Construiste Re–Fa–La: Re (0), Fa (3) y La (7 semitonos). Re–Mi–Fa cuenta tres nombres; Re–Mi–Fa–Sol–La cuenta cinco. Ahora podés transformar la misma tríada en mayor.'};
 return {correct:false,message:`Tu elección: ${notes.map(n=>`${THEORY_CHROMATIC[n]} está a ${(n-2+12)%12} semitonos de Re`).join('; ')}. Volvé a contar los saltos desde Re = 0. Buscamos ${major?'4':'3'} y 7; podés quitar una nota pulsándola otra vez.`};
}
let theoryAudioContext=null,theoryAudioGeneration=0,theoryAudioTimer=null,theoryAudioOwner=null;
const theoryAudioNodes=new Set();
function stopTheoryAudio(){
 theoryAudioGeneration++;if(theoryAudioTimer!==null)clearTimeout(theoryAudioTimer);theoryAudioTimer=null;
 theoryAudioNodes.forEach(o=>{try{o.stop()}catch{}});theoryAudioNodes.clear();
 if(theoryAudioOwner){const status=theoryAudioOwner.querySelector('[data-theory-audio-status]');if(status)status.textContent='Ensayo detenido.';theoryAudioOwner=null;}
}
function theoryTone(ctx,midi,start,duration,level){
 const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='triangle';osc.frequency.value=440*Math.pow(2,(midi-69)/12);
 gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(level,start+.03);gain.gain.setValueAtTime(level,start+duration-.07);gain.gain.linearRampToValueAtTime(0,start+duration);
 osc.connect(gain);gain.connect(ctx.destination);theoryAudioNodes.add(osc);osc.onended=()=>{theoryAudioNodes.delete(osc);osc.disconnect();gain.disconnect();};osc.start(start);osc.stop(start+duration+.02);
}
async function performTheoryAudio(el,events,duration,message,finished='Ensayo terminado. Podés escuchar otra opción.'){
 if(typeof halt==='function')halt();stopTheoryAudio();
 const generation=theoryAudioGeneration,status=el.querySelector('[data-theory-audio-status]');theoryAudioOwner=el;
 try{
  const AudioCtor=window.AudioContext||window.webkitAudioContext;if(!AudioCtor)throw Error('audio no disponible');
  theoryAudioContext=theoryAudioContext||new AudioCtor();await theoryAudioContext.resume();if(generation!==theoryAudioGeneration)return;
  const ctx=theoryAudioContext,start=ctx.currentTime+.04;
  events.forEach(e=>theoryTone(ctx,e.note,start+(e.at||0),e.duration,e.level||.035));status.textContent=message;
  theoryAudioTimer=setTimeout(()=>{if(generation!==theoryAudioGeneration)return;theoryAudioTimer=null;theoryAudioOwner=null;status.textContent=finished;},(duration+.12)*1000);
 }catch{if(generation!==theoryAudioGeneration)return;stopTheoryAudio();status.textContent='No se pudo iniciar el audio. Las notas y las distancias siguen visibles para probarlas en el instrumento.';}
}
function playTheoryExample(el,kind){
 const listening=el.matches('.theory-listening')?el:el.querySelector('.theory-listening'),note=Number(listening.querySelector('[data-theory-listen-note]').value),events=[];
 if(kind!=='solo')THEORY_TRIADS[kind].notes.forEach(m=>events.push({note:m,duration:3.2}));
 events.push({note,at:kind==='solo'?0:1,duration:2.2,level:.075});
 return performTheoryAudio(listening,events,kind==='solo'?2.2:3.2,kind==='solo'?`${THEORY_CHROMATIC[note%12]} sola, sostenida.`:`${THEORY_TRIADS[kind].name}; la misma nota ${THEORY_CHROMATIC[note%12]} entra después.`,'Ensayo terminado. Compará la otra versión sin cambiar la nota.');
}
function renderTheoryListenContext(el){
 const mi=Number(el.querySelector('[data-theory-listen-note]').value)===76;
 el.querySelector('[data-theory-note-context]').textContent=mi?'Mi está en ambos acordes: es tercera mayor de C y quinta justa de Am. En la escala de Do mayor sigue siendo grado 3. Puede sentirse apoyada en los dos; escuchá cómo cambia el conjunto.':'Sol es quinta justa de C. Sobre La–Do–Mi agrega la séptima menor: las cuatro notas La–Do–Mi–Sol forman una sonoridad de Am7. Ese color añadido puede servirte aunque Sol no esté en la tríada Am.';
}
function initTheoryTools(){
 document.querySelectorAll('[data-theory-tools]').forEach(el=>{
  if(el.dataset.theoryReady)return;el.dataset.theoryReady='1';renderTheoryRelation(el);
  el.querySelectorAll('[data-theory-root],[data-theory-target]').forEach(select=>select.addEventListener('change',()=>renderTheoryRelation(el)));
  const harmony=el.querySelector('.theory-harmony');if(harmony){
   renderTheoryHarmony(harmony);
   harmony.querySelectorAll('[data-theory-chord-choice]').forEach(b=>b.addEventListener('click',()=>{stopTheoryAudio();harmony.dataset.theoryChord=b.dataset.theoryChordChoice;renderTheoryHarmony(harmony);harmony.querySelector('[data-theory-audio-status]').textContent=`${THEORY_TRIADS[harmony.dataset.theoryChord].name} elegido. Escuchá sus notas y después el acorde.`;}));
   harmony.querySelector('[data-theory-chord-roles]').addEventListener('click',event=>{const b=event.target.closest('[data-theory-chord-note]');if(!b)return;const note=Number(b.dataset.theoryChordNote);performTheoryAudio(harmony,[{note,duration:.9,level:.065}],.9,`${THEORY_CHROMATIC[note%12]} · una nota del acorde.`);});
   harmony.querySelector('[data-theory-chord-play]').addEventListener('click',()=>{const c=THEORY_TRIADS[harmony.dataset.theoryChord];performTheoryAudio(harmony,c.notes.map(note=>({note,duration:1.6})),1.6,`${c.name}: ${c.notes.map(n=>THEORY_CHROMATIC[n%12]).join(' · ')}.`);});
   harmony.querySelector('[data-theory-isolate]').addEventListener('click',()=>{const events=[60,64,67].map(note=>({note,duration:1.45}));[60,63,67].forEach(note=>events.push({note,at:1.9,duration:1.45}));performTheoryAudio(harmony,events,3.35,'C → Cm: Do–Mi–Sol y después Do–Mi♭–Sol. Cambia sólo la tercera.','Comparación terminada. Raíz y quinta se conservaron; Mi bajó un semitono.');});
  }
  const transfer=el.querySelector('.theory-transfer');if(transfer){
   const selection=()=>[...transfer.querySelectorAll('[data-theory-build][aria-pressed="true"]')].map(b=>Number(b.dataset.theoryBuild));
   transfer.querySelectorAll('[data-theory-build]').forEach(button=>button.addEventListener('click',()=>{stopTheoryAudio();button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));transfer.querySelector('[data-theory-major]').hidden=true;transfer.querySelector('[data-theory-build-status]').textContent='Notas elegidas: '+selection().map(pc=>THEORY_CHROMATIC[pc]).join(' · ')+'. Comprobá cuando tengas raíz, tercera y quinta.';}));
   transfer.querySelector('[data-theory-check]').addEventListener('click',()=>{const major=transfer.dataset.theoryBuildMode==='major',result=checkTheoryTriad(selection(),major);transfer.querySelector('[data-theory-build-status]').textContent=result.message;transfer.querySelector('[data-theory-major]').hidden=!result.correct||major;});
   transfer.querySelector('[data-theory-major]').addEventListener('click',()=>{stopTheoryAudio();transfer.dataset.theoryBuildMode='major';transfer.querySelector('[data-theory-major]').hidden=true;transfer.querySelector('[data-theory-build-title]').textContent='Ahora transformalo en Re mayor.';transfer.querySelector('[data-theory-build-prompt]').textContent='Conservá Re y la quinta. Cambiá sólo la tercera para pasar de 3 a 4 semitonos desde la raíz. Quitá la tercera anterior antes de elegir la nueva.';transfer.querySelector('[data-theory-build-status]').textContent='¿Qué nota necesitás subir un semitono?';});
   transfer.querySelector('[data-theory-build-listen]').addEventListener('click',()=>{const notes=selection().map(pc=>62+(pc-2+12)%12);performTheoryAudio(transfer,notes.map(note=>({note,duration:1.5,level:.07/Math.sqrt(notes.length)})),1.5,'Escuchás las notas que elegiste: '+selection().map(pc=>THEORY_CHROMATIC[pc]).join(' · ')+'.');});
   transfer.querySelector('[data-theory-reset]').addEventListener('click',()=>{stopTheoryAudio();transfer.dataset.theoryBuildMode='minor';transfer.querySelectorAll('[data-theory-build]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.theoryBuild)===2)));transfer.querySelector('[data-theory-major]').hidden=true;transfer.querySelector('[data-theory-build-title]').textContent='Construí Re menor desde otra raíz.';transfer.querySelector('[data-theory-build-prompt]').textContent='Partí de Re = 0. Elegí una tercera menor a 3 semitonos y una quinta justa a 7 semitonos.';transfer.querySelector('[data-theory-build-status]').textContent='Re ya está elegido. Volvé a buscar la tercera y la quinta.';});
  }
  const listening=el.querySelector('.theory-listening');if(listening){
   renderTheoryListenContext(listening);
   const resetDecision=()=>{listening.querySelectorAll('[data-theory-decision]').forEach(b=>b.setAttribute('aria-pressed','false'));listening.querySelector('[data-theory-decision-status]').textContent='Cambiaste la nota: escuchá otra vez antes de elegir.';};
   listening.querySelector('[data-theory-listen-note]').addEventListener('change',()=>{stopTheoryAudio();renderTheoryListenContext(listening);resetDecision();});
   listening.querySelectorAll('[data-theory-play]').forEach(b=>b.addEventListener('click',()=>playTheoryExample(listening,b.dataset.theoryPlay)));
   listening.querySelectorAll('[data-theory-decision]').forEach(b=>b.addEventListener('click',()=>{
    const choice=b.dataset.theoryDecision;listening.querySelectorAll('[data-theory-decision]').forEach(other=>other.setAttribute('aria-pressed',String(other===b)));listening.querySelector('[data-theory-simpler]').hidden=choice!=='unclear';
    listening.querySelector('[data-theory-decision-status]').textContent=choice==='unclear'?'Podés simplificar el ensayo o dejar una elección provisional.':choice==='either'?'También es una conclusión válida. Elegí por cómo prepara lo que sigue en tu frase.':`Tomalo como una hipótesis: probá ${choice} debajo de tu nota importante y comprobá el compás completo. Un ensayo aislado no decide toda la canción.`;
   }));
   listening.querySelector('[data-theory-simplify]').addEventListener('click',()=>{stopTheoryAudio();listening.querySelector('[data-theory-listen-note]').value='79';renderTheoryListenContext(listening);resetDecision();listening.querySelector('[data-theory-audio-status]').textContent='Sol elegida. Escuchá la nota sola y después cada acompañamiento.';});
  }
  el.querySelectorAll('[data-theory-stop]').forEach(b=>b.addEventListener('click',stopTheoryAudio));
 });
}
