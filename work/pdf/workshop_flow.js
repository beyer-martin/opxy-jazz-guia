/* One task, one working surface. The original controls stay in the same lab,
   so saved compositions and existing event handlers remain authoritative. */
var focusPulseState;
function stopFocusPulseGuide(){
 if(!focusPulseState)return;
 focusPulseState.generation++;
 focusPulseState.timers.forEach(clearTimeout);focusPulseState.timers.clear();
 focusPulseState.nodes.forEach(n=>{try{n.stop();}catch{}});focusPulseState.nodes.clear();
 if(focusPulseState.owner){focusPulseState.owner.textContent='Pulsos detenidos.';focusPulseState.owner=null;}
}
async function playFocusPulses(i){
 halt();
 if(!focusPulseState)focusPulseState={generation:0,timers:new Set(),nodes:new Set(),owner:null};
 const state=focusPulseState,generation=state.generation,lab=labElement(i),status=lab.querySelector('[data-focus-pulse-status]');state.owner=status;
 try{
  audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();await audioContext.resume();
  if(generation!==state.generation)return;
  const ctx=audioContext,beat=60/labs[i].tempo,start=ctx.currentTime+.05;
  for(let k=0;k<4;k++){
   const o=ctx.createOscillator(),g=ctx.createGain(),at=start+k*beat;o.type='sine';o.frequency.value=k===0?880:660;
   g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(.09,at+.005);g.gain.linearRampToValueAtTime(0,at+.09);
   o.connect(g);g.connect(ctx.destination);state.nodes.add(o);o.onended=()=>{state.nodes.delete(o);o.disconnect();g.disconnect();};o.start(at);o.stop(at+.1);
   const timer=setTimeout(()=>{state.timers.delete(timer);if(generation===state.generation)status.textContent=`Pulso ${k+1} de 4 · paso ${1+k*4}.`;},(at-ctx.currentTime)*1000);state.timers.add(timer);
  }
  const end=setTimeout(()=>{state.timers.delete(end);if(generation===state.generation){status.textContent='Una vuelta: cuatro pulsos. Podés escucharla otra vez.';state.owner=null;}},(4*beat+.05)*1000);state.timers.add(end);
 }catch{if(generation===state.generation){stopFocusPulseGuide();status.textContent='No se pudo iniciar el audio. Marcá cuatro pulsos regulares: 1, 2, 3, 4.';}}
}
function renderFocusLab(i){
 const lab=labElement(i),line=lab.querySelector('.focus-selection');if(!line)return;
 const s=labs[i],events=selectedEvents(i),notes=events.flatMap(e=>e.notes),name=s.variant==='r'?'Tu versión guardada':s.variant==='c'?'Tu composición':`Modelo ${s.variant.toUpperCase()} del curso`;
 line.textContent=s.blind?'Escuchá sin mirar las notas.':`${name} · pista ${s.track} · compás ${s.bar+1} · paso ${s.step+1}${notes.length?' · '+notes.map(pitchLabel).join(' + ')+' · '+events.map(e=>e.len).join('/')+' pasos':' · sin ataque nuevo'}`;
 lab.querySelector('.integrated-material').textContent=s.variant==='c'?'Tu composición · edición habilitada':name+' · sólo escucha';
 lab.querySelectorAll('.focus-keyboard [data-key]').forEach(b=>{const key=b.dataset.key,m=(key[0]==='u'?upperMidi:naturalMidi)[Number(key.slice(1))]+(s.octave||0)*12-(s.track===3?12:0);b.textContent=pitchLabel(m);b.setAttribute('aria-label',`Nota ${pitchLabel(m)}`);b.setAttribute('aria-pressed',String(notes.includes(m)));b.disabled=s.variant!=='c'||!s.edit;});
 lab.querySelector('[data-focus-return]').hidden=s.variant==='c';
 lab.querySelector('.focus-keyboard').hidden=s.blind;
 lab.querySelectorAll('.seq-strip [data-step]').forEach(b=>b.classList.toggle('pulse-start',Number(b.dataset.step)%4===0));
 lab.querySelector('[data-clear]').disabled=s.variant!=='c'||!s.edit||!events.length;
 const label=lab.querySelector('.integrated-edit-hint');label.textContent=s.blind?'Mostrá las notas para seguir editando.':s.variant==='c'?'Elegí un paso; pulsá una tecla para agregar o quitar una nota. Las notas de un acorde van juntas en el mismo paso.':'Este ejemplo no se modifica. Volvé a tu composición para escribir tus notas.';
}
function initWorkshopFlow(){
 const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
 const details=title=>{const el=make('details','integrated-resource');el.append(make('summary','',title));return el;};
 document.querySelectorAll('.lesson').forEach(lesson=>{
  if(lesson.dataset.workshopReady)return;
  const i=Number(lesson.id.slice(1))-1,p=lessonPlans[i],cycle=cycleForLesson(i),plan=lesson.querySelector('.session-timing'),lab=lesson.querySelector('[data-lab]'),panel=lesson.querySelector('[data-stage-panel="2"]'),slot=lesson.querySelector('[data-simulator-slot="2"]');
  if(!lab||!panel||!slot)return;
  const profiles=ACTIVITY_FOCUS[i],activities=DEEP_CURRICULUM[i].activities;
  lesson.classList.add('workshop-flow','integrated-workshop');
  const context=make('div','integrated-song-context'),contextLine=make('p','',`Pieza ${cycle.id} de 5 · ${cycle.result}`),chapterPath=make('nav','integrated-chapter-path');chapterPath.setAttribute('aria-label','Capítulos de esta canción');
  for(let n=cycle.from;n<=cycle.to;n++){const a=make('a','',`${String(n+1).padStart(2,'0')} · ${lessonPlans[n].title}`);a.href=`#e${n+1}`;if(n===i)a.setAttribute('aria-current','page');chapterPath.append(a);}context.append(contextLine,chapterPath);lesson.querySelector('.lesson-goal').after(context);
  const workspace=make('div','workshop-workspace');workspace.dataset.workshop=i;
  const journey=make('nav','integrated-journey'),journeyList=make('ol');journey.setAttribute('aria-label',`Los seis pasos del capítulo ${i+1}`);journey.append(journeyList);
  const stepButtons=profiles.map((profile,n)=>{const li=make('li'),b=make('button');b.type='button';b.dataset.workshopGo=n;b.append(make('span','integrated-step-number',`${String(n+1).padStart(2,'0')} · ${activities[n].minutes} min`),make('strong','',profile.title),make('small','integrated-step-state',''));li.append(b);journeyList.append(li);return b;});
  const card=make('section','workshop-step');const topline=make('div','focus-topline'),position=make('span','workshop-position'),time=make('span','workshop-time');topline.append(position,time);
  const title=make('h3','focus-title');title.id=`workshop-title-${i}`;title.tabIndex=-1;card.setAttribute('aria-labelledby',title.id);
  const action=make('p','workshop-action'),why=make('p','focus-why');card.append(topline,title,action,why);
  const bench=make('div','integrated-bench'),theoryPane=make('aside','integrated-theory-pane');theoryPane.setAttribute('aria-label','Teoría musical para esta canción');
  const theoryTitle=make('h3','integrated-pane-title','Entender para decidir');theoryPane.append(theoryTitle);
  // Chapter 5 teaches these same concepts inside the interactive harmony lab.
  if(i!==4){const theoryContent=make('div');theoryContent.innerHTML=integratedTheoryHTML(i);theoryPane.append(theoryContent);}
  const theoryHome=make('div','integrated-theory-experiments');theoryHome.dataset.workshopTheory=i;theoryHome.innerHTML=typeof theoryToolsHTML==='function'?theoryToolsHTML(i):'';if(theoryHome.firstElementChild)theoryPane.append(theoryHome);
  const quiz=lesson.querySelector('[data-quiz-box]');if(quiz){const check=details('Comprobá el concepto');check.append(quiz);theoryPane.append(check);}
  const example=details('Escuchar el ejemplo explicado'),listening=lesson.querySelector('.listening-question');if(listening)example.append(listening);const answer=make('p','',p.answer);example.append(answer);theoryPane.append(example);

  const library=make('dialog','focus-library');library.setAttribute('aria-label','Consultas del capítulo');const libraryTop=make('div','focus-library-top'),closeHelp=make('button','','Volver al taller');closeHelp.type='button';libraryTop.append(make('h3','','Consultas del capítulo'),closeHelp);const resources=make('div','focus-resources');library.append(libraryTop,resources);
  plan.open=false;plan.querySelector('summary').textContent='Plan completo y práctica opcional';resources.append(plan);const cycleBrief=lesson.querySelector('.cycle-brief');if(cycleBrief)plan.append(cycleBrief);
  const equipment=details('Preparar el OP–XY y guardar el proyecto');for(const selector of ['.bar-recipe','.arrange-recipe','.lesson-flow']){const el=lesson.querySelector(selector);if(el)equipment.append(el);}resources.append(equipment);
  const extra=details('Más orientación para esta canción');for(const selector of ['.recall','.creative-brief','.finish','.revisit','.next-lesson']){const el=lesson.querySelector(selector);if(el)extra.append(el);}resources.append(extra);
  const original=lesson.querySelector('[data-stage-panel="0"]'),reference=details('Otras explicaciones y diagramas');if(original)while(original.firstChild)reference.append(original.firstChild);resources.append(reference);
  const integration=lesson.querySelector('.song-integrate');if(integration){const container=details('Transferencia opcional a la pieza final');container.append(integration);resources.append(container);}
  // Preserve the original nodes and [data-lab] ancestry: the editor, saved
  // events, reference versions and playback handlers remain authoritative.
  const complete=details('Detalles del editor y del patrón');complete.classList.add('focus-complete');while(lab.firstChild)complete.append(lab.firstChild);resources.append(complete);
  const groups={},group=(name,cls='')=>{const el=make('div',`focus-tool ${cls}`);el.dataset.focusTool=name;groups[name]=el;return el;};
  const take=(selector,target,label=false)=>{const el=complete.querySelector(selector);if(!el)return null;target.append(label?el.closest('label'):el);return el;};
  const instrument=make('section','integrated-instrument');instrument.setAttribute('aria-label','Componer en el OP–XY');
  const material=make('p','integrated-material'),instrumentHead=make('div','integrated-instrument-heading');instrumentHead.append(make('h3','','Tu OP–XY'),material);instrument.append(instrumentHead);
  const mobileJump=make('nav','integrated-mobile-jumps');mobileJump.setAttribute('aria-label','Moverse por el taller');
  for(const [label,target] of [['Ir al OP–XY ↓',instrument],['Ver teoría ↓',theoryPane]]){const jump=make('button','',label);jump.type='button';jump.addEventListener('click',()=>{target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});});mobileJump.append(jump);}card.append(mobileJump);
  const backToTask=make('button','integrated-back-to-task','Volver a la consigna ↑');backToTask.type='button';backToTask.addEventListener('click',()=>{title.focus({preventScroll:true});card.scrollIntoView({block:'start',behavior:'instant'});});instrumentHead.append(backToTask);
  const transport=make('div','focus-transport'),play=group('play');take('[data-play]',play);take('[data-stop]',play);take('[data-loop]',play,true);transport.append(play);const tempo=group('tempo');take('[data-bpm]',tempo,true);transport.append(tempo);
  const pulse=group('pulse'),pulseButton=make('button','','Escuchar cuatro pulsos ▶'),pulseStatus=make('span');pulseButton.type='button';pulseButton.dataset.focusPulses='';pulseStatus.dataset.focusPulseStatus='';pulse.append(pulseButton,pulseStatus);transport.append(pulse);pulseButton.addEventListener('click',()=>playFocusPulses(i));
  const returnButton=take('[data-variant="c"]',transport);returnButton.dataset.focusReturn='';returnButton.textContent='Volver a mi composición';
  const audioStatus=take('.audio-status',instrument);audioStatus.textContent='';
  const controls=make('div','focus-context'),continuation=group('continue');take('[data-continue]',continuation);controls.append(continuation);const track=group('track');take('[data-track-select]',track,true);controls.append(track);const bar=group('bar');take('[data-bar-select]',bar,true);controls.append(bar);
  instrument.append(transport,controls);take('.sim-photo',instrument);take('.sim-screen',instrument);take('.blind-message',instrument);
  const selection=make('p','focus-selection');selection.setAttribute('aria-live','polite');instrument.append(selection);
  const hint=make('p','integrated-edit-hint');instrument.append(hint);
  const grid=group('grid','focus-grid'),strip=complete.querySelector('.seq-strip').closest('.scroll'),beats=make('div','focus-beats');['Pulso 1','Pulso 2','Pulso 3','Pulso 4'].forEach(t=>beats.append(make('span','',t)));grid.append(beats,strip);instrument.append(grid);
  const precision=details('Teclas y duración de las notas');precision.classList.add('integrated-precision');
  const keyboard=group('keys','focus-keyboard');['n4','u3','n5','u4','n6','n7','u5','n8','u6','n9','u7','n10'].forEach(key=>{const b=make('button',key[0]==='u'?'accidental':'');b.type='button';b.dataset.key=key;keyboard.append(b);});precision.append(keyboard);
  const noteTools=make('div','focus-tools'),length=group('length');take('[data-length]',length,true);noteTools.append(length);const octave=group('octave');take('[data-key-octave]',octave,true);noteTools.append(octave);const clear=group('clear');take('[data-clear]',clear);noteTools.append(clear);precision.append(noteTools);instrument.append(precision);
  const editTools=make('div','focus-tools'),move=group('move');take('[data-move-attack="-1"]',move);take('[data-move-attack="1"]',move);editTools.append(move);const copy=group('copy');take('.bar-copy-controls',copy);editTools.append(copy);const blind=group('blind');take('[data-reveal]',blind);editTools.append(blind);instrument.append(editTools);
  const versions=details('Comparar mis versiones');versions.classList.add('integrated-versions');const compare=group('compare');take('[data-keep-version]',compare);take('[data-variant="r"]',compare);take('[data-restore-version]',compare);versions.append(compare);take('.version-status',versions);instrument.append(versions);
  // These are preview actions, not extra editable compositions.
  const models=take('.model-references',instrument);models.querySelectorAll('[data-variant]').forEach(b=>{b.dataset.preview=i;b.dataset.v=b.dataset.variant;b.removeAttribute('data-variant');b.removeAttribute('aria-pressed');b.textContent='Escuchar '+b.textContent+' ▶';});
  const inspector=details('Notas y recorrido de mi composición');take('.step-inspector',inspector);take('.lab-order',inspector);instrument.append(inspector);
  instrument.append(audioStatus);const saved=take('.save-idea-status',instrument);
  const reflection=make('section','focus-reflection'),reflectionNode=lesson.querySelector('.reflection');if(reflectionNode)reflection.append(reflectionNode);
  const expected=make('p','workshop-result'),completion=make('p','focus-completion');completion.textContent=`Terminás el capítulo cuando: ${p.check}`;
  const nav=make('nav','workshop-step-nav');nav.setAttribute('aria-label',`Continuar el capítulo ${i+1}`);const previous=make('button','','← Atrás'),next=make('button','workshop-next','Hecho, continuar →'),help=make('button','focus-help','Consultar el capítulo');previous.type=next.type=help.type='button';previous.dataset.workshopPrevious='';next.dataset.workshopNext='';help.setAttribute('aria-haspopup','dialog');nav.append(previous,help,next);const resume=make('p','workshop-resume');resume.setAttribute('role','status');
  lab.append(instrument,reflection,expected,completion,nav,resume,library);slot.append(lab);bench.append(theoryPane,slot);workspace.append(journey,card,bench);panel.append(workspace);
  lesson.querySelectorAll('.stage-nav,.stage-pager').forEach(n=>n.hidden=true);lesson.querySelectorAll('[data-stage-panel]').forEach(n=>n.hidden=n!==panel);lesson.querySelectorAll('[data-stage]').forEach(n=>n.setAttribute('aria-current',n.dataset.stage==='2'?'step':'false'));
  lesson.querySelector(':scope > h2').classList.add('focus-chapter-title');
  labs[i].variant='c';labs[i].edit=true;
  const storageKey=COURSE_KEY+'workshop-step-'+i,doneKey=COURSE_KEY+'workshop-done-'+i;let current=0,done=new Set();
  try{const n=Number(localStorage.getItem(storageKey));if(Number.isInteger(n)&&n>=0&&n<6)current=n;const parsed=JSON.parse(localStorage.getItem(doneKey)||'[]');if(Array.isArray(parsed))done=new Set(parsed.filter(n=>Number.isInteger(n)&&n>=0&&n<6));}catch{}
  function render(focus=false,persist=false){
   const profile=profiles[current],enabled=new Set(profile.tools);workspace.dataset.activity=current;
   position.textContent=`Ahora · paso ${current+1} de 6`;time.textContent=`${activities[current].minutes} min`;title.textContent=profile.title;action.textContent=profile.instruction;why.textContent=profile.why;
   stepButtons.forEach((b,n)=>{b.setAttribute('aria-current',n===current?'step':'false');b.querySelector('.integrated-step-state').textContent=n===current?'Estás acá':done.has(n)?'Hecho':'';});
   Object.entries(groups).forEach(([name,node])=>node.classList.toggle('activity-tool',enabled.has(name)));
   groups.pulse.hidden=!(i===0&&current===0);groups.continue.hidden=!continuation.firstElementChild;groups.bar.hidden=p.bars===1;
   groups.copy.hidden=!enabled.has('copy');groups.move.hidden=!enabled.has('move');groups.blind.hidden=!enabled.has('blind');
   precision.open=enabled.has('keys')||enabled.has('length')||enabled.has('octave');versions.open=enabled.has('compare');
   reflection.hidden=!enabled.has('reflection');completion.hidden=!enabled.has('close');
   if(enabled.has('reflection')){const label=reflection.querySelector('label');label.textContent=i===15&&current===5?'Anotá el germen nuevo: compás, paso, nota y duración. Conservá arriba la reflexión de tu pieza terminada.':'¿Qué cambiaste, qué escuchaste y qué querés probar al volver?';reflection.querySelector('textarea').rows=3;}
   // Required experiments are opened where the current instruction asks for them.
   const tools=theoryHome.querySelector('[data-theory-tools]');if(tools){for(const [token,selector] of [['interval','.theory-interval-reference'],['triad','.theory-transfer'],['listening','.theory-listening']]){const el=tools.querySelector(selector);if(el&&el.tagName==='DETAILS')el.open=enabled.has(token);}}
   expected.textContent=`Te llevás de este paso: ${activities[current].deliverable}`;previous.hidden=current===0;next.textContent=current===5?(i===15?'Terminar y ver mi recorrido →':'Terminar capítulo →'):'Hecho, continuar →';
   if(persist){try{localStorage.setItem(storageKey,String(current));localStorage.setItem(doneKey,JSON.stringify([...done]));resume.textContent='Tu paso queda recordado para cuando vuelvas.';}catch{resume.textContent='No se pudo recordar el paso; anotá su número para retomar.';}}else resume.textContent=current?'Retomás en el paso donde quedaste.':'';
   renderLab(i);if(focus){title.focus({preventScroll:true});card.scrollIntoView({block:'start',behavior:'instant'});}
  }
  const returnToC=()=>{halt();labs[i].variant='c';labs[i].edit=true;labs[i].blind=false;for(const sel of ['.sim-photo','.sim-screen','.step-inspector','.lab-order'])lab.querySelector(sel).hidden=false;strip.hidden=false;const reveal=lab.querySelector('[data-reveal]');reveal.textContent='ocultar notas para escuchar';reveal.setAttribute('aria-pressed','true');lab.querySelector('.blind-message').hidden=true;renderLab(i);};
  stepButtons.forEach((b,n)=>b.addEventListener('click',()=>{returnToC();current=n;render(true,true);}));
  previous.addEventListener('click',()=>{if(current>0){returnToC();current--;render(true,true);}});
  next.addEventListener('click',()=>{returnToC();done.add(current);if(current<5){current++;render(true,true);}else{render(false,true);location.hash=i===15?'#ruta-16h':`#e${i+2}`;}});
  help.addEventListener('click',()=>{halt();library.showModal();});closeHelp.addEventListener('click',()=>library.close());library.addEventListener('close',()=>{returnToC();render();help.focus({preventScroll:true});});window.addEventListener('hashchange',()=>{if(library.open)library.close();});
  lesson.dataset.workshopReady='true';render();
 });
}
