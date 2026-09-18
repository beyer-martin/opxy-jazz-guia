// Versiones propias separadas de los modelos del curso.
function loadOwnVersion(i){
 try{
  const raw=JSON.parse(localStorage.getItem(COURSE_KEY+'reference-'+i)||'null');
  if(!raw)return null;
  const events=validatedEvents(raw.events,16);
  if(!events)return null;
  const p=lessonPlans[i],bars=Math.max(p.bars,...events.map(e=>Math.floor(e.at/16)+1));
  while(p.form.length<bars)p.form.push('material anterior');
  p.bars=bars;
  return {events,tempo:validTempo(raw.tempo,p.tempo),swing:!!raw.swing};
 }catch{return null;}
}
function keepOwnVersion(i){
 const s=labs[i];
 if(s.variant!=='c')return {ok:false,message:'Volvé a Mi composición (C) para conservar tu versión actual.'};
 const snapshot={events:cloneEvents(s.events),tempo:s.tempo,swing:s.swing};
 try{localStorage.setItem(COURSE_KEY+'reference-'+i,JSON.stringify({version:1,...snapshot}));}
 catch{return {ok:false,message:'No se pudo guardar la referencia. La anterior sigue disponible.'};}
 s.reference=snapshot;
 return {ok:true,message:'Versión conservada. Ahora cambiá tu composición y compará ambas con reproducir.'};
}
function restoreOwnVersion(i){
 const s=labs[i];
 if(!s.reference)return {ok:false,message:'Primero conservá una versión de tu composición.'};
 const before=captureIdea(i);
 Object.assign(s,{events:cloneEvents(s.reference.events),tempo:s.reference.tempo,swing:s.reference.swing});
 const ok=commitEdit(i,before,'Recuperaste tu versión guardada. La referencia sigue disponible.');
 if(ok){s.variant='c';s.edit=true;}
 return {ok,message:ok?'Recuperaste tu versión guardada. La referencia sigue disponible.':'No se pudo guardar el cambio; tu composición actual se conserva.'};
}
function moveAttack(i,delta){
 const s=labs[i],events=selectedEvents(i),at=s.bar*16+s.step,to=at+delta;
 if(s.variant!=='c'||!s.edit||!events.length||![-1,1].includes(delta))return {ok:false,message:'Elegí un paso con ataque dentro de tu composición.'};
 if(Math.floor(to/16)!==s.bar||events.some(e=>to+e.len>(s.bar+1)*16))return {ok:false,message:'La nota no cabe en ese lugar con su duración actual. Elegí otro paso.'};
 if(s.events.some(e=>e.t===s.track&&e.at===to))return {ok:false,message:'El paso de destino ya tiene un ataque. No se reemplazó ninguna nota.'};
 const before=captureIdea(i);
 s.events=s.events.map(e=>e.t===s.track&&e.at===at?{...e,at:to,notes:[...e.notes]}:e);
 const message=`Ataque movido al paso ${to%16+1}; conserva sus notas y duración.`;
 const ok=commitEdit(i,before,message);
 if(ok)moveTo(i,to);
 return {ok,message:ok?message:'No se pudo guardar el movimiento; el ataque sigue en su lugar.'};
}
function ownVersionsHTML(){return `<div class="idea-versions"><h4>Compará tus propias versiones</h4><p>Conservá la actual, probá un cambio y alterná entre las dos. Cada una conserva su tempo y fraseo; mantenelos iguales para comparar otra decisión.</p><div class="toolbar"><button data-keep-version>conservar mi versión actual</button><button data-variant="r" aria-pressed="false">Mi versión guardada</button><button data-restore-version>recuperar versión guardada</button></div><p class="version-status" role="status">Todavía no conservaste una referencia para comparar.</p></div>`;}
