// Each cycle makes a new piece. Inside a cycle, the learner continues their C.
const SONG_CYCLES = [
 {id:1,from:0,to:2,title:'Una melodía que se sostiene sola',result:'Miniatura de 4 compases con motivo, respuesta y final.',support:'Escuchá un ejemplo breve; después elegí tus ataques y alturas.',test:'Con la grilla oculta, inventá una respuesta distinta que conserve el ritmo del motivo.'},
 {id:2,from:3,to:5,title:'Una canción con dos colores',result:'Tema nuevo de 4 compases con melodía y acompañamiento.',support:'Probá primero tus notas. Consultá el ejemplo sólo para resolver una duda.',test:'Elegí otro acorde para una nota importante y explicá qué cambió al escucharlo.'},
 {id:3,from:6,to:8,title:'Un tema que sabe adónde va',result:'Tema nuevo de 4 compases con una llegada armónica elegida.',support:'Partí de una intención de llegada; los acordes son opciones, no una receta.',test:'Compará dos finales y elegí uno sin necesitar que el ejemplo te dé la respuesta.'},
 {id:4,from:9,to:11,title:'Un groove con espacio para tocar',result:'Pieza nueva de 8 compases: groove, variación y cierre.',support:'Elegí vos el motivo y el recorrido. Usá las preguntas para revisar.',test:'Improvisá una respuesta en teclas, recuperá un fragmento y convertílo en parte de la pieza.'},
 {id:5,from:12,to:15,title:'Una pieza dirigida por vos',result:'Pieza nueva de 8 compases con roles claros, contraste y final.',support:'Escribí tu encargo, decidí por dónde empezar y consultá recursos cuando hagan falta.',test:'Detectá un problema, ensayá dos soluciones y empezá otro germen sin copiar las notas del modelo.'}
];
function cycleForLesson(i){return SONG_CYCLES.find(c=>i>=c.from&&i<=c.to);}
function cycleVersion(i){const c=cycleForLesson(i);return `PIEZA-${String(c.id).padStart(2,'0')} · versión ${i-c.from+1}`;}
function cycleBriefHTML(i){const c=cycleForLesson(i),first=i===c.from,last=i===c.to;return `<div class="cycle-brief"><p class="cycle-label">PIEZA ${c.id} DE 5 · CAPÍTULO ${i-c.from+1} DE ${c.to-c.from+1}</p><h3>${esc(c.title)}</h3><p><b>Al terminar este ciclo:</b> ${esc(c.result)}</p><p><b>${first?'Hoy empezás una pieza nueva':'Hoy retomás tu pieza'}:</b> ${first?'Usá lo aprendido en las anteriores con un germen nuevo. No necesitás copiar sus notas.':`Abrí tu versión del capítulo ${i}; conservá lo que funciona y aplicá la decisión de hoy.`}</p><p><b>Ayuda disponible:</b> ${esc(c.support)}</p>${last?`<p class="cycle-test"><b>Probá tu autonomía:</b> ${esc(c.test)} Podés consultar nombres de notas y controles.</p>`:''}<p class="muted">30 minutos de recorrido principal; hasta 30 más si querés profundizar. Si se termina tu tiempo, guardá y anotá el próximo paso. Las duraciones son una orientación.</p></div>`;}
function continueIdea(i,overwrite=false){
 const c=cycleForLesson(i);
 if(!c||i===c.from)return {ok:false,message:'Este capítulo empieza una pieza nueva.'};
 const source=validatedEvents(labs[i-1].events,lessonPlans[i-1].bars);
 if(!source||!source.length)return {ok:false,message:`No hay una idea C válida en el capítulo ${i}. Volvé allí o reconstruí tu versión del OP–XY.`};
 if(source.some(e=>e.at+e.len>lessonPlans[i].bars*16))return {ok:false,message:'Tu versión anterior es más larga que este espacio. Conservála en su capítulo y usá la transferencia por rangos si querés extraer una parte.'};
 if(labs[i].events.length&&!overwrite)return {ok:false,message:'C ya tiene material: no se reemplazó.'};
 const previous=captureIdea(i),oldSong=i===15?cloneEvents(songState.events):null;
 labs[i].events=cloneEvents(source);labs[i].tempo=labs[i-1].tempo;labs[i].swing=labs[i-1].swing;
 if(!saveIdea(i)){Object.assign(labs[i],previous);if(oldSong)songState.events=oldSong;return {ok:false,message:'El navegador no pudo guardar la continuación; tu idea anterior sigue intacta.'};}
 labs[i].variant='c';labs[i].edit=true;labs[i].bar=0;labs[i].step=0;
 return {ok:true,message:`Continuás tu C del capítulo ${i}, con todas sus pistas. La fuente queda guardada allí; los compases nuevos quedan vacíos para que los desarrolles.`};
}
function copyIdeaBar(i,toBar,overwrite=false){
 const s=labs[i],from=s.bar,to=Number(toBar),bars=lessonPlans[i].bars;
 if(s.variant!=='c'||!s.edit||!Number.isInteger(to)||to<0||to>=bars||to===from)return {ok:false,message:'Elegí C en edición y un compás destino diferente.'};
 const source=validatedEvents(s.events,bars);
 if(!source)return {ok:false,message:'No se pudo copiar: la idea contiene datos inválidos.'};
 const copy=source.filter(e=>Math.floor(e.at/16)===from).map(e=>({...e,at:e.at+(to-from)*16,notes:[...e.notes]}));
 if(!copy.length)return {ok:false,message:'El compás de origen está vacío.'};
 if(source.some(e=>Math.floor(e.at/16)===to)&&!overwrite)return {ok:false,message:'El destino conserva su contenido.'};
 const before=cloneEvents(s.events),oldSong=i===15?cloneEvents(songState.events):null;
 s.events=source.filter(e=>Math.floor(e.at/16)!==to).concat(copy);
 if(!saveIdea(i)){s.events=before;if(oldSong)songState.events=oldSong;return {ok:false,message:'No se pudo guardar; tu versión sigue intacta.'};}
 return {ok:true,message:`Compás ${from+1} copiado al ${to+1}, con todas sus pistas. Ahora variá la copia para desarrollar tu pieza.`};
}
