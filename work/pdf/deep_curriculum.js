// Talleres fundacionales: cada actividad es práctica activa y cada sesión suma 60 minutos.
const DEEP_CURRICULUM = [
  {
    activities:[
      {minutes:8,action:'Con metrónomo a 75 BPM, marcá cuatro pulsos con la mano durante ocho vueltas y atacá Do sólo en 1 y 9.',deliverable:'Una toma de ocho vueltas donde el pulso no se detiene en los silencios.'},
      {minutes:10,action:'Programá Do en pasos 1, 5, 9 y 13; escuchá dos vueltas y quitá los ataques 5 y 13 sin cambiar BPM.',deliverable:'Comparación A/B: lleno (1/5/9/13) y espaciado (1/9).'},
      {minutes:12,action:'Hacé tres rondas: 1) 1/9, 2) 1/5/9, 3) 1/9/13. Elegí cuál hace que el reinicio se sienta más claro.',deliverable:'Patrón de un compás con una decisión de espacio explicada.'},
      {minutes:10,action:'Copiá el patrón y mové sólo un ataque a otro comienzo de pulso; señalá si alteraste ritmo o tempo.',deliverable:'Dos patrones que difieren en una posición, no en velocidad.'},
      {minutes:12,action:'Llevá la opción elegida a tu maqueta y dejá una vuelta completa sin ningún ataque en un pulso.',deliverable:'Escena de 4/4 de un compás reproducible.'},
      {minutes:8,action:'Reproducí sin mirar la grilla y decí en voz baja o anotá dónde están 1, 5, 9 y 13.',deliverable:'Autochequeo de pulso y mapa de 16 pasos.'}
    ],
    theory:'En 4/4 hay cuatro pulsos por compás. En la grilla usada aquí hay 16 pasos, cuatro por pulso: 1, 5, 9 y 13 son los comienzos. El tempo (BPM) mide la velocidad del pulso; un ataque es el comienzo de un sonido. Quitar ataques cambia el ritmo y la densidad, no hace más lento el tempo.',
    workedExample:'A: Do corto en 1, 5, 9 y 13. B: exactamente los mismos 75 BPM y la misma duración de compás, pero Do sólo en 1 y 9. Paso 1: dejá correr A y marcá los cuatro pulsos. Paso 2: cambiá a B sin detener reproducción. Paso 3: el pie sigue cuatro pulsos aunque oigas dos ataques. Paso 4: B no es “más lento”; tiene dos huecos. Paso 5: probá Do en 1, 9 y 13: el ataque 13 empuja hacia el reinicio. Paso 6: conservá la variante cuya pausa tenga una función audible.',
    misconception:'“Si hay menos notas, bajó el tempo.” Se oye como confusión al intentar contar sólo los ataques. Aislalo con el pie o un click: mantené cuatro pulsos mientras suena B. Corregí moviendo un ataque entre 1/5/9/13, nunca el BPM, hasta poder nombrar qué cambió.',
    application:'Tu canción recibe un patrón rítmico de un compás en una pista corta. Anotá su nombre y la versión elegida; será el material que vuelve en los talleres 2, 11 y 12.',
    mastery:'Puedo mantener cuatro pulsos sobre silencios y explicar, con la grilla, la diferencia entre tempo, ataque y espacio.',
    sources:[{title:'Open Music Theory — Basics of Rhythm',url:'https://musictheory.pugetsound.edu/mt21c/MusicTheory.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Reconstruí de oído el patrón del taller 1 y escribí tres ataques en el compás 1.',deliverable:'Pregunta rítmica de un compás.'},
      {minutes:10,action:'Copiala al compás 2; en tres rondas mové sólo el último ataque: temprano, tarde y omitido.',deliverable:'Tres respuestas comparables.'},
      {minutes:12,action:'Alargá una nota sin mover su inicio y después acortala: distinguí duración de posición.',deliverable:'Dos versiones con el mismo ataque inicial y distinta duración.'},
      {minutes:8,action:'Elegí pregunta y respuesta y tocá o programá cuatro repeticiones sin agregar alturas.',deliverable:'Frase rítmica de dos compases estable.'},
      {minutes:12,action:'Transferí el ritmo a un sonido diferente, conservando pasos y duraciones; evaluá qué permanece reconocible.',deliverable:'Misma frase con un timbre alternativo.'},
      {minutes:8,action:'Cerrá con una respuesta propia que deje al menos un pulso de aire.',deliverable:'Motivo de dos compases listo para melodizar.'}
    ],
    theory:'Un motivo es una idea breve reconocible; puede ser sólo rítmica. La pregunta presenta una figura y la respuesta la confirma, desplaza o completa. Un paso vacío puede ser silencio o la continuación de una nota anterior: por eso ataque y duración son dos decisiones distintas.',
    workedExample:'Pregunta: Do corto en pasos 1, 7 y 11 del compás 1. Respuesta A repite 1, 7 y 11. Respuesta B conserva 1 y 7, pero mueve 11 a 13. Primero oí A: igualdad afirma la figura. Luego B: el último golpe cae al comienzo del pulso 4 y suena como respuesta más asentada. Una alternativa es dejar 11 pero alargarlo hasta 14: no cambia el inicio, cambia cuánto espacio ocupa. Elegí B si querés dirección hacia el reinicio; elegí A si querés insistencia.',
    misconception:'“Para que la respuesta sea distinta tengo que cambiar todas las notas.” Eso borra el parentesco. Se oye como dos ideas sin conversación. Aislá el último ataque: conservá dos posiciones de la pregunta y cambiá sólo una; recién después decidí si falta contraste.',
    application:'Guardá el motivo de dos compases como la semilla de tu canción. No agregues acordes todavía: en el taller 3 conservarás su ritmo y cambiarás alturas.',
    mastery:'Puedo crear una respuesta que sea reconocible por relación con la pregunta y describir si cambié ataque, duración o silencio.',
    sources:[{title:'Open Music Theory — Motive and melodic alteration',url:'https://musictheory.pugetsound.edu/mt21c/preface-1.html'}]
  },
  {
    activities:[
      {minutes:8,action:'Ubicá y tocá Do–Re–Mi–Sol en el layout; nombrá las distancias en semitonos 2, 4 y 7 desde Do.',deliverable:'Mapa de cuatro alturas y sus intervalos.'},
      {minutes:12,action:'Aplicá el ritmo anterior a Do–Re–Mi–Sol y luego a Sol–Mi–Re–Do.',deliverable:'Dos compases con contornos ascendente y descendente.'},
      {minutes:10,action:'Transponé toda la primera figura dos semitonos sin tocar el ritmo.',deliverable:'Figura transpuesta que conserva 0/+2/+4/+7.'},
      {minutes:10,action:'Hacé tres rondas cambiando sólo el último intervalo: terminar en Mi, Sol o Do.',deliverable:'Tres finales con una distancia identificada.'},
      {minutes:12,action:'Escribí dos compases propios con tres o cuatro alturas y un punto alto deliberado.',deliverable:'Melodía de dos compases con contorno anotado.'},
      {minutes:8,action:'Reproducí la melodía desde otra altura y comprobá que reconocés el dibujo.',deliverable:'Prueba auditiva de transposición.'}
    ],
    theory:'Un semitono es la distancia mínima entre alturas consecutivas; Mi–Fa también mide un semitono. Un intervalo compara dos notas: Do–Re = 2 semitonos, Do–Mi = 4, Do–Sol = 7. Contorno significa subir, bajar o repetir. Transponer desplaza todas las notas por igual y conserva intervalos y ritmo.',
    workedExample:'Tomá Do–Re–Mi–Sol: desde Do las distancias son 0, +2, +4, +7; su contorno asciende por pasos y termina con salto. Para transportarlo dos semitonos, empezá en Re y sumá las mismas distancias: Re–Mi–Fa#–La. No copies “botones vecinos”: verificá cada intervalo. Alternativa: Sol–Mi–Re–Do usa las mismas alturas del primer conjunto, pero su contorno cae; sirve como respuesta. Si el final en Sol queda suspendido, probar Do no “arregla” una regla: cambia la sensación de llegada que estudiarás con un centro tonal.',
    misconception:'“Transponer es elegir otra primera nota.” Si las demás no se mueven igual, el motivo cambia. Se oye una forma distinta aunque el ritmo siga. Corregí anotando semitonos desde la primera nota y reconstruyendo cada distancia.',
    application:'Conservá un contorno melódico de dos compases sobre el motivo rítmico. Será tu melodía candidata para la escala, armonización y forma.',
    mastery:'Puedo describir el contorno, medir intervalos simples en semitonos y trasladar una figura conservando sus distancias.',
    sources:[{title:'Open Music Theory — Music Theory for the 21st-Century Classroom',url:'https://musictheory.pugetsound.edu/mt21c/MusicTheory.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Construí Do mayor desde Do con T–T–ST–T–T–T–ST y escribí Do Re Mi Fa Sol La Si Do.',deliverable:'Escala y grados 1–7 correctos.'},
      {minutes:10,action:'Dejá un Do grave como drone durante cuatro compases; improvisá sólo Do, Re, Mi, Sol y La.',deliverable:'Prueba de centro tonal con cinco notas.'},
      {minutes:10,action:'Hacé tres finales idénticos salvo por la última nota: Do, Re y Si.',deliverable:'Tres cierres comparables.'},
      {minutes:10,action:'Marcá qué notas de tu melodía son grado 1, 3 o 5; no cambies aún las que no lo sean.',deliverable:'Melodía etiquetada por grados.'},
      {minutes:12,action:'Escribí una escena de cuatro compases: presentar, explorar, volver, finalizar.',deliverable:'Melodía de cuatro compases sobre drone.'},
      {minutes:8,action:'Quitá el drone, escuchá otra vez y reforzá sólo un final si el centro se perdió.',deliverable:'Versión con decisión de llegada consciente.'}
    ],
    theory:'Una escala mayor organiza notas por tono–tono–semitono–tono–tono–tono–semitono. En Do mayor los grados son Do=1, Re=2… Si=7. El centro tonal se construye por repetición, bajo y llegada; no aparece automáticamente por usar las notas “correctas”. Un drone permite oír relaciones sin exigir tocar piano ni cantar.',
    workedExample:'Con Do grave sostenido, programá cuatro compases. Compás 1: Mi–Sol presenta 3–5. Compás 2: La–Sol–Mi explora arriba. Compás 3: Re–Mi vuelve hacia alturas estables. Compás 4: Re–Do termina en 2–1. El Do final coincide con el drone y suele afirmar centro. Alternativa: terminá en Re: el material es el mismo, pero deja continuación. No llames “incorrecto” a Re; elegilo si el siguiente compás responde. La fórmula T–T–ST explica por qué Mi–Fa y Si–Do quedan juntos.',
    misconception:'“La escala es una secuencia obligatoria.” Se oye una escalera sin frase. Aislá un compás y elegí dos o tres grados objetivo; usá otros para conectar. Corregí priorizando llegadas, no agregando las ocho notas.',
    application:'Expandí tu melodía a cuatro compases y anotá su final elegido. La escena 1 de tu proyecto ahora tiene ritmo, contorno y una referencia tonal.',
    mastery:'Puedo construir Do mayor por intervalos, nombrar grados y justificar por escucha una llegada a 1 o una suspensión en 2/7.',
    sources:[{title:'Open Music Theory — Scale, rhythm and harmony index',url:'https://musictheory.pugetsound.edu/mt21c/MusicTheory.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Construí y tocá C = Do–Mi–Sol y Am = La–Do–Mi, primero juntas y luego una nota por vez.',deliverable:'Dos tríadas nombradas por notas.'},
      {minutes:10,action:'Contá desde cada raíz: C 0/4/7, Am 0/3/7; repetí con F y G.',deliverable:'Cuatro tríadas verificadas por semitonos.'},
      {minutes:12,action:'Programá C en compás 1 y Am en 2; en tres rondas cambiá sólo el orden de los compases.',deliverable:'Dos progresiones de dos compases.'},
      {minutes:8,action:'Separá raíz, tercera y quinta en pistas o pasos y escuchá cuál nota cambia entre color mayor/menor.',deliverable:'Identificación auditiva de la tercera.'},
      {minutes:12,action:'Construí Re menor sin mirar: Re–Fa–La; comprobá 0/3/7.',deliverable:'Tríada menor transferida a otra raíz.'},
      {minutes:8,action:'Elegí dos acordes para apoyar dos compases de tu material.',deliverable:'Acompañamiento mínimo escrito por notas y símbolo.'}
    ],
    theory:'Una tríada tiene raíz, tercera y quinta. Mayor = 0, 4, 7 semitonos desde la raíz; menor = 0, 3, 7. C es Do–Mi–Sol y Am es La–Do–Mi. C→Am no significa “bajar la tercera de C”: cambia la raíz de Do a La, aunque ambas tríadas comparten Do y Mi.',
    workedExample:'Construí C: Do a Mi suma 4 semitonos; Mi a Sol suma 3. Construí Am: La a Do suma 3; Do a Mi suma 4. Paso 1: escribí ambas ternas. Paso 2: advertí las notas comunes Do y Mi. Paso 3: reemplazá C por Am en el segundo compás: cambia el bajo/la raíz y la quinta relación, no sólo una tecla. Paso 4: alternativa, C→F usa Do común y desplaza Mi→Fa, Sol→La. Escuchá antes de asignar una emoción fija a mayor o menor.',
    misconception:'“Una tríada menor es la mayor con cualquier tercera bajada.” Se oye un acorde sin raíz coherente. Aislá la nota más baja y nombrá la raíz antes de medir. Corregí reconstruyendo 0/3/7 desde esa raíz.',
    application:'Añadí una pista armónica de dos compases a tu escena, escrita como notas concretas. Conservá la melodía; el taller 6 decide qué acorde la apoya mejor.',
    mastery:'Puedo construir mayor y menor desde una raíz, explicar 4+3 frente a 3+4 y distinguir raíz de una nota compartida.',
    sources:[{title:'Berklee Online — Harmony 2 learning outcomes',url:'https://online.berklee.edu/courses/harmony-2'}]
  },
  {
    activities:[
      {minutes:8,action:'Extraé las notas largas o acentuadas de tu melodía de cuatro compases.',deliverable:'Lista de cuatro notas objetivo.'},
      {minutes:12,action:'Bajo una nota Mi sostenida, probá C y Am; etiquetá Mi como tercera y quinta.',deliverable:'Dos acompañamientos para la misma melodía.'},
      {minutes:10,action:'Añadí una nota breve Re entre Do y Mi sobre C y escuchá su función de paso.',deliverable:'Ejemplo de nota no perteneciente al acorde resuelta.'},
      {minutes:10,action:'Probá un acorde por compás y luego uno cada dos compases sin alterar melodía.',deliverable:'Dos ritmos armónicos comparables.'},
      {minutes:12,action:'Armonizá tus cuatro compases con C, Am, F o G, justificando una nota objetivo por acorde.',deliverable:'Mapa melodía–acorde–relación.'},
      {minutes:8,action:'Elegí una versión por recorrido completo, no por contar cuántos acordes tiene.',deliverable:'Armonización A/B seleccionada.'}
    ],
    theory:'Armonizar es escoger acordes que sostienen una melodía. Una nota del acorde pertenece a la tríada; una nota de paso puede conectar dos notas de acorde y no necesita ser eliminada si su movimiento y duración la hacen clara. El ritmo armónico es la frecuencia con que cambian acordes, independiente del ritmo de la melodía.',
    workedExample:'Melodía: Mi larga en compás 1, Fa breve hacia Mi en 2, La larga en 3, Sol en 4. Opción A: C–C–Am–G. Mi es tercera de C, Fa funciona como paso hacia Mi, La es raíz de Am, Sol es raíz de G. Opción B: C–Am–F–C: la primera Mi sigue funcionando, ahora Mi es quinta de Am en compás 2; Fa es raíz de F. Construí ambas sin tocar melodía. Elegí A si el reposo largo de C te ayuda; B si el cambio bajo La te da contraste. Ninguna depende de una “escala única” que ordene todo.',
    misconception:'“Cada nota debe pertenecer al acorde actual.” El resultado puede sonar rígido y borrar movimiento. Aislá la nota sospechosa: si entra entre dos notas de acorde por paso y dura poco, probá conservarla. Corregí sólo si no resuelve o tapa una llegada importante.',
    application:'Tu escena 1 queda con melodía intacta y una armonización de cuatro compases. Anotá el ritmo armónico elegido para poder revisarlo después.',
    mastery:'Puedo justificar acordes por notas objetivo, reconocer una nota de paso y comparar dos armonizaciones sin cambiar la melodía.',
    sources:[{title:'Open Music Theory — Voice leading with non-chord tones',url:'https://musictheory.pugetsound.edu/mt21c/MusicTheory.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Construí C, F y G y nombrá I, IV y V en Do mayor.',deliverable:'Mapa I=C, IV=F, V=G.'},
      {minutes:10,action:'Programá C–F–G–C, raíz en bajo al inicio de cada compás.',deliverable:'Cadencia de cuatro compases.'},
      {minutes:10,action:'Compará C–F–G–C con C–F–G–G sin modificar el resto.',deliverable:'Dos finales contextualizados.'},
      {minutes:10,action:'Mantené un acorde dos compases y después cambialo cada compás; mantené el mismo bajo rítmico.',deliverable:'Prueba de ritmo armónico.'},
      {minutes:12,action:'Escribí una progresión propia con I, IV, V y opcional vi=Am para comienzo o final.',deliverable:'Escena de cuatro compases con intención declarada.'},
      {minutes:8,action:'Usá la melodía existente y corregí sólo una llegada que choque con tu objetivo.',deliverable:'Cadencia integrada a la canción.'}
    ],
    theory:'En Do mayor, I=C, IV=F, V=G y vi=Am. La función tonal describe relaciones: I establece referencia, IV se aleja y V suele preparar I en este contexto. Los números romanos no son pistas ni teclas. La “resolución” depende de bajo, contexto y continuación; no es una etiqueta emocional universal.',
    workedExample:'Escribí C–F–G–C. Paso 1: C con bajo Do hace visible I. Paso 2: F desplaza la raíz hacia IV y aleja del inicio. Paso 3: G contiene Si, grado 7 que puede querer subir a Do, y prepara. Paso 4: C vuelve a bajo Do y la melodía puede cerrar en Do. Alternativa: dejá G en el cuarto compás si vas a repetir una sección o entrar a otra; se escucha abierto porque no llegó I. Cambiar acordes cada pulso no es “más armónico”: puede tapar el motivo.',
    misconception:'“V siempre tiene que resolver o está mal.” Se oye una frase forzada si necesitabas continuidad. Aislá los últimos dos compases: compará G→C y G→G. Corregí según si querés cierre o puerta a la próxima escena.',
    application:'Usá la progresión como esqueleto de tu primera escena de cuatro compases, con bajo en raíces. La próxima sesión conserva funciones pero mejora el movimiento entre voces.',
    mastery:'Puedo nombrar I/IV/V en Do, crear una llegada contextual y separar ritmo armónico de ritmo de bajo o melodía.',
    sources:[{title:'Berklee Online — Harmony 2: functional harmony',url:'https://online.berklee.edu/courses/harmony-2'}]
  },
  {
    activities:[
      {minutes:8,action:'Tocá C en posición Do–Mi–Sol y luego Am como La–Do–Mi; marcá las dos notas comunes.',deliverable:'Lista de notas que se conservan.'},
      {minutes:12,action:'Reescribí Am como Do–Mi–La para conservar Do y Mi arriba; bajá sólo Sol→La.',deliverable:'C→Am con una voz movida por tono.'},
      {minutes:10,action:'Probá F como Do–Fa–La después de C y compará con Fa–La–Do.',deliverable:'Dos inversiones de F y su bajo identificado.'},
      {minutes:10,action:'Hacé tres rondas de C–Am–F–G moviendo cada voz a la nota más cercana disponible.',deliverable:'Voicing de cuatro compases con movimientos anotados.'},
      {minutes:12,action:'Separá bajo de acorde: tocá una raíz grave y un voicing sin raíz encima.',deliverable:'Prueba de que raíz no siempre es nota más grave del voicing.'},
      {minutes:8,action:'Aplicá el voicing que mejor deja oír melodía en tu escena.',deliverable:'Acompañamiento con registro despejado.'}
    ],
    theory:'Voice leading es cómo cada nota de un acorde llega a una nota del siguiente. Las notas comunes pueden quedarse; las demás suelen moverse poco. Una inversión pone otra nota del acorde abajo en un voicing. La raíz define el acorde, pero no tiene por qué ser la nota más grave de cada pista si el bajo ya la declara.',
    workedExample:'C = Do–Mi–Sol. Para Am no uses necesariamente La–Do–Mi: ordená Do–Mi–La. Do y Mi permanecen; Sol sube un tono a La. Para F, probá Do–Fa–La: Do queda, Mi sube semitono a Fa, La llega desde Sol por tono. La secuencia superior C: Do–Mi–Sol → Am: Do–Mi–La → F: Do–Fa–La muestra economía. Agregá bajo Do–La–Fa–Sol en otra pista para que la raíz sea inequívoca. Alternativa con raíces en bloque funciona, pero salta más y puede competir con melodía.',
    misconception:'“La raíz siempre debe ser la nota más grave de todo.” La raíz se identifica por el acorde que construiste, no por buscar automáticamente la nota más baja del voicing. Se oye un arreglo embarrado cuando bajo y acorde duplican extremos sin necesidad. Aislá la pista de bajo: si ya declara la raíz del acorde, probá un voicing superior. Corregí nombrando primero el acorde y conservando notas comunes antes de sumar notas.',
    application:'Reemplazá los bloques de tu escena por voicings cercanos y deja la pista de bajo con raíces. Conservá el bloque original como A/B de textura.',
    mastery:'Puedo encontrar notas comunes, mover otras por la menor distancia práctica y explicar diferencia entre raíz e inversión.',
    sources:[{title:'Open Music Theory — Voice Leading',url:'https://musictheory.pugetsound.edu/mt21c/VoiceLeading.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Construí Dm7=Re–Fa–La–Do, G7=Sol–Si–Re–Fa y Cmaj7=Do–Mi–Sol–Si.',deliverable:'Tres séptimas escritas por notas.'},
      {minutes:10,action:'Aislá terceras y séptimas: Dm7 Fa/Do, G7 Si/Fa, Cmaj7 Mi/Si.',deliverable:'Dos voces guía programadas.'},
      {minutes:10,action:'Mové Do→Si y Fa→Mi en la transición Dm7–G7–Cmaj7.',deliverable:'Resolución de voces guía audible.'},
      {minutes:10,action:'Añadí raíces en bajo Re–Sol–Do sin duplicar todas las voces internas.',deliverable:'ii–V–I de cuatro compases.'},
      {minutes:12,action:'Escribí una melodía que apunte a Si sobre G7 y a Do o Mi sobre Cmaj7.',deliverable:'Dos notas objetivo con función armónica.'},
      {minutes:8,action:'Compará la versión con guías y otra que sólo recorra la escala; elegí por dirección.',deliverable:'A/B de conducción armónica.'}
    ],
    theory:'Las séptimas añaden una cuarta nota a una tríada. En ii–V–I de Do: Dm7–G7–Cmaj7. Las voces guía, normalmente tercera y séptima, revelan función: en Dm7 Fa/Do; en G7 Si/Fa; en Cmaj7 Mi/Si. Una escala es material disponible, pero no decide sola qué nota expresa el movimiento de acorde.',
    workedExample:'Compás 1 Dm7: bajo Re, voces guía Fa y Do. Compás 2 G7: bajo Sol, Fa se mantiene como séptima y Do baja semitono a Si, tercera de G7. Compás 3 Cmaj7: Fa baja a Mi, tercera de C; Si puede quedarse como séptima mayor. Así se oyen dos líneas: Do→Si y Fa→Mi. Paso 4: añadí La o Re sólo si no tapa esas líneas. Alternativa: una melodía Sol–La–Si–Do funciona porque aterriza en la tercera de G7 y luego raíz de C, no porque “sube una escala” sin contexto.',
    misconception:'“Con conocer la escala ya sé qué tocar sobre cada acorde.” Se oye una línea indiferente al cambio armónico. Aislá sólo tercera y séptima durante la progresión; luego agrega una nota melódica que llegue a ellas. Corregí mirando función de llegada, no cantidad de notas.',
    application:'Crea una escena de cuatro compases con ii–V–I y voces guía claras. Es una herramienta nueva, no una obligación para cada sección de tu pieza.',
    mastery:'Puedo construir ii–V–I, localizar terceras/séptimas y hacer audibles Do→Si y Fa→Mi.',
    sources:[{title:'Open Music Theory — Introduction to Jazz Theory',url:'https://musictheory.pugetsound.edu/mt21c/IntroductionToJazzTheory.html'},{title:'Berklee Online — Harmony 2 guide tones',url:'https://online.berklee.edu/courses/harmony-2'}]
  },
  {
    activities:[
      {minutes:10,action:'Programá las raíces del blues de 12 compases: C7×4, F7×2, C7×2, G7, F7, C7×2.',deliverable:'Mapa de forma de 12 compases.'},
      {minutes:10,action:'Tocá una frase de dos compases con pregunta en 1 y respuesta en 3; repetila sobre C7 y F7.',deliverable:'Riff con forma localizada.'},
      {minutes:10,action:'Probá tercera menor (Mib) y tercera mayor (Mi) sobre C7, una por vez, resolviendo a nota del acorde.',deliverable:'Dos colores de blues sin mezcla accidental.'},
      {minutes:10,action:'Programá el mismo patrón recto y luego una relación larga/corta aproximada 2:1 en pares de subdivisión.',deliverable:'Comparación straight/swing.'},
      {minutes:12,action:'Grabá cuatro compases de phrasing: dejá hueco después de cada respuesta.',deliverable:'Mini solo/riff de cuatro compases con aire.'},
      {minutes:8,action:'Elegí straight o swing según el resultado y anotá que swing no es un valor universal fijo.',deliverable:'Decisión de feel y frase.'}
    ],
    theory:'El blues de 12 compases organiza funciones repetidas, no reinicia el conteo cuando un acorde se repite. El swing didáctico puede pensar pares de subdivisión como largo/corto cercano a 2:1; en práctica esa relación varía con tempo, estilo y músicos. La tercera menor y mayor sobre dominante son colores estilísticos: probalas como tensión y resolución, no como licencia para cualquier nota.',
    workedExample:'Contá 1–12: C7 en 1–4; F7 en 5–6; C7 en 7–8; G7 en 9; F7 en 10; C7 en 11–12. Escribí pregunta Mi–Sol en compás 1 y respuesta Mib→Mi en 3: Mib crea roce contra C7 y Mi lo resuelve. Repetí el gesto en compás 5 pero deja espacio para que el cambio a F7 se oiga. Alternativa straight: ataques iguales en la grilla. Alternativa swing: el primero de cada pareja dura más; no cambies BPM. Si el patrón se vuelve borroso, vuelve a straight y conserva el riff.',
    misconception:'“Swing es una cuantización exacta que siempre se aplica.” Se oye rígido o fuera de estilo si se impone. Aislá dos ataques consecutivos y compará largo/corto contra iguales. Corregí por phrasing y huecos, no por una fracción obligatoria.',
    application:'Añadí un estudio de 12 compases separado de tu canción principal; conserva un riff de pregunta/respuesta para reutilizar sin copiar una canción comercial.',
    mastery:'Puedo contar los 12 compases, distinguir feel de tempo y usar b3→3 como gesto situado y resuelto.',
    sources:[{title:'Open Music Theory — Introduction to Jazz Theory',url:'https://musictheory.pugetsound.edu/mt21c/IntroductionToJazzTheory.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Elegí un motivo de dos compases y duplicalo hasta formar A de cuatro compases.',deliverable:'Sección A identificable.'},
      {minutes:10,action:'Creá A′ cambiando sólo registro: subí el motivo una octava, sin cambiar ritmo ni notas de clase.',deliverable:'A/A′ comparables.'},
      {minutes:10,action:'Creá una tercera prueba quitando acordes durante dos compases, manteniendo bajo o melodía.',deliverable:'A con densidad reducida.'},
      {minutes:10,action:'Probá el mismo patrón con sonido corto y sostenido a nivel parecido.',deliverable:'Comparación de timbre sin cambio de notas.'},
      {minutes:12,action:'Ordená A–A′ en ocho compases y asigná un papel a cada pista: pulso, bajo, armonía, motivo o textura.',deliverable:'Mapa de textura por compás.'},
      {minutes:8,action:'Quitá una capa que no tenga papel audible y justificá la decisión.',deliverable:'Versión más clara de ocho compases.'}
    ],
    theory:'Registro es altura relativa: una misma nota en otra octava cambia su lugar en la mezcla. Textura describe relación entre capas; densidad, cuánto material ocupa el tiempo. A′ conserva suficiente de A para reconocerse, pero transforma una variable. Volumen no es la única forma de contraste: registro, duración y presencia de capas también arreglan.',
    workedExample:'A, compases 1–4: motivo Do–Mi en pista melódica, bajo y voicing suave. A′, 5–8: el mismo ritmo y grados, una octava más arriba; quitá el voicing en 5–6 y dejalo volver en 7–8. Paso 1: se reconoce el motivo porque ritmo y contorno permanecen. Paso 2: el registro despeja bajo. Paso 3: menos capas en 5–6 hace que la reentrada tenga forma. Alternativa: conservá registro y cambiá duración a más corta; elegí una sola transformación principal para poder oír causa.',
    misconception:'“Desarrollar exige acordes nuevos.” Se oye una colección de ideas sin identidad. Aislá el motivo: si puede reconocerse con menos capas o en otra octava, ya hay desarrollo. Corregí transformando una variable antes de inventar material.',
    application:'Tu proyecto tiene A de cuatro y A′ de cuatro. Conservá los patrones independientes: A es referencia, A′ es variación auditable.',
    mastery:'Puedo producir contraste por registro o textura, nombrar el rol de cada capa y mantener una identidad entre A y A′.',
    sources:[{title:'Open Music Theory — Motive and melodic alteration',url:'https://musictheory.pugetsound.edu/mt21c/preface-1.html'}]
  },
  {
    activities:[
      {minutes:10,action:'Dibujá cuatro escenas de cuatro compases: A, A′, B y A″; elegí función para cada una.',deliverable:'Plano de forma de 16 compases.'},
      {minutes:10,action:'Convertí tu motivo en pregunta de dos compases y respuesta de dos, conservando un intervalo o ritmo.',deliverable:'A de cuatro compases completa.'},
      {minutes:10,action:'Construí A′ desde A con una variación única ya probada.',deliverable:'A′ relacionado, no copia accidental.'},
      {minutes:10,action:'Diseñá B cambiando una prioridad: armonía, registro o densidad; anotá qué A se conserva.',deliverable:'Contraste B explicado.'},
      {minutes:12,action:'Hacé A″ como regreso con una conclusión distinta: final en 1, menos capas o duración final larga.',deliverable:'Regreso con cierre propio.'},
      {minutes:8,action:'Escuchá las 16 barras y marcá dónde vuelve identidad y dónde aparece contraste.',deliverable:'Mapa temporal con revisión de forma.'}
    ],
    theory:'La forma organiza repetición y diferencia. A presenta identidad; A′ la transforma; B contrasta; A″ vuelve con perspectiva. No son cuatro escenas de cuatro que “equivalen” a 32: son 16 compases. El desarrollo puede invertir contorno, cambiar ritmo, ampliar duración o desplazar registro, siempre reteniendo algo reconocible.',
    workedExample:'A: pregunta rítmica en compases 1–2 y respuesta en 3–4, sobre C–Am–F–G. A′: mismo motivo, una octava alta y sin armonía en 5. B: Am–F–C–G y respuesta más larga en 7–8; conserva el ritmo inicial como hilo. A″: retorna C–Am–F–C y final Do largo. Paso a paso, cada sección tiene una decisión: presentar, variar, contrastar, concluir. Alternativa: B puede conservar armonía y cambiar sólo densidad; no cambies todo a la vez.',
    misconception:'“Para una forma debo rellenar compases con material nuevo.” Se oye un collage. Aislá el motivo entre escenas: si desaparece, recuperá ritmo o intervalo en B. Corregí con una relación concreta, no con más capas.',
    application:'Armá una maqueta de 16 compases como cuatro escenas de cuatro. Aún no es el arreglo de 32; esa expansión llega en la revisión final.',
    mastery:'Puedo diagramar A–A′–B–A″, distinguir 16 de 32 compases y explicar qué vuelve y qué cambia.',
    sources:[{title:'Open Music Theory — Motive, phrase and form orientation',url:'https://musictheory.pugetsound.edu/mt21c/preface-1.html'}]
  },
  {
    activities:[
      {minutes:10,action:'En pista 1 programá bombo 1/9, caja 5/13 y hi-hat 3/7/11/15 durante un compás.',deliverable:'Patrón de batería de 16 pasos.'},
      {minutes:10,action:'En pista 3 programá bajo en raíz paso 1 y quinta o nota de dirección en 9 para C–Am–F–G.',deliverable:'Bajo de cuatro compases.'},
      {minutes:10,action:'Dejá la melodía en pista 5 entrar recién en paso 13; compará con entrada en 1.',deliverable:'Dos posiciones de entrada auditables.'},
      {minutes:10,action:'Mové sólo un hi-hat de 3 a 4; conservá bombo, caja y BPM.',deliverable:'A/B de empuje rítmico.'},
      {minutes:12,action:'Repetí ocho compases: batería estable, bajo siguiendo armonía y motivo respirando.',deliverable:'Base A de ocho compases.'},
      {minutes:8,action:'Silenciá hi-hat y luego un ataque de bajo para diagnosticar si la base tapa la melodía.',deliverable:'Decisión de densidad por función.'}
    ],
    theory:'Los instrumentos y pistas se mapean en este proyecto, no son una verdad universal de MIDI: aquí pista 1=batería, 3=bajo, 5=melodía. El bombo puede afirmar apoyo, caja organizar respuesta y hats mostrar subdivisión. El bajo relaciona raíces y dirección, pero no debe duplicar cada golpe de bombo para cumplir su función.',
    workedExample:'Compás C: bombo en 1/9, caja 5/13, hats 3/7/11/15. Bajo Do en 1 por ocho pasos y Sol en 9 por seis. Melodía espera hasta 13. Paso 1: bombo y bajo coinciden al inicio; paso 2: bajo se separa en 9 y crea línea, no una copia de kick; paso 3: el hueco antes de 13 hace legible la melodía. En Am cambia bajo a La/E, no batería. Alternativa: mover hat 3→4 cambia empuje sin cambiar tempo ni “corregir” el patrón.',
    misconception:'“El bajo debe golpear donde golpea el bombo.” Se oye pesado y sin dirección. Aislá ambas pistas: mantené raíz en 1, quitá o desplazá el ataque de bajo en 9. Conservá la opción que deje oír armonía y motivo.',
    application:'Añadí una base de ocho compases bajo tu A/A′. Cada pista conserva un papel escrito; no llenes pasos para demostrar uso de canales.',
    mastery:'Puedo programar el patrón especificado, hacer que bajo siga armonía sin clonarse al bombo y proteger una entrada melódica.',
    sources:[{title:'Teenage Engineering OP–XY guides',url:'https://teenage.engineering/guides/op-xy'}]
  },
  {
    activities:[
      {minutes:10,action:'Escuchá A y anotá una cualidad que no querés perder: ritmo, bajo, motivo o color.',deliverable:'Criterio de identidad para B.'},
      {minutes:10,action:'Antes de editar, en ARRANGE copiá por pista los patrones que cambiarás: M2 copia M1 y M3 pega la variante; confirmá que B usa el patrón nuevo.',deliverable:'A protegida y B apuntando a patrones independientes.'},
      {minutes:10,action:'Construí B con Am–F–C–G; conserva un elemento rítmico de A.',deliverable:'Armonía contrastante de cuatro compases.'},
      {minutes:10,action:'Quitá hats en el primer compás de B y probá la melodía una octava arriba en los últimos dos.',deliverable:'Dos contrastes controlados.'},
      {minutes:12,action:'Alterná A→B→A y verificá tres veces que A no cambió al editar B.',deliverable:'Forma de ocho compases recuperable.'},
      {minutes:8,action:'Hacé B alternativa cambiando sólo densidad, no armonía; elegí una por escucha.',deliverable:'Dos estrategias de contraste comparadas.'}
    ],
    theory:'El contraste sirve a la forma cuando conserva una relación con A. Puede cambiar progresión, registro o densidad; no necesita cambiar todo. En OP–XY, copiar una escena no garantiza que el contenido de patrón que editarás sea independiente: copiá los patrones de cada pista que variarás y verifica cuál selecciona B antes de alterar notas.',
    workedExample:'A usa C–Am–F–G con base completa. Para B, paso 1: copia el patrón de armonía y melodía por pista; paso 2: seleccioná los nuevos patrones en la escena B; paso 3: escribe Am–F–C–G; paso 4: quita hats en el primer compás; paso 5: sube sólo los compases finales de la melodía una octava. A conserva su motivo y pulso, B cambia destino, aire y registro. Alternativa: deja C–Am–F–G pero retira armonía en 1–2; es contraste por densidad.',
    misconception:'“Copié la escena, así que A está segura.” Puede sonar que A cambia junto a B porque ambas escenas apuntan al mismo patrón. Aislalo volviendo a A después de editar una nota en B. Corregí copiando el patrón de esa pista y seleccionándolo en B antes de editar.',
    application:'Tu maqueta suma B de cuatro compases independiente de A. Documentá qué material conserva y qué dos decisiones hacen audible el contraste.',
    mastery:'Puedo proteger patrones de A, recuperar A sin cambios y construir B con contraste trazable, no accidental.',
    sources:[{title:'Teenage Engineering — OP–XY Arrange guide',url:'https://teenage.engineering/guides/op-xy/arrange'}]
  },
  {
    activities:[
      {minutes:10,action:'Escuchá el límite A→B y anotá qué esperás que entre en B.',deliverable:'Objetivo de transición de una frase.'},
      {minutes:10,action:'En el compás 4 quitá el bombo de 9 y la caja de 13; dejá respirar el último pulso.',deliverable:'Transición por sustracción.'},
      {minutes:10,action:'Añadí Sol de textura en paso 15, duración 2, y hacé entrar bajo La en paso 1 del compás 5.',deliverable:'Anticipación y destino audibles.'},
      {minutes:10,action:'Compará con una versión sin Sol y otra sin corte de batería; cambiá una variable por ronda.',deliverable:'Tres A/B con causa identificable.'},
      {minutes:12,action:'Diseñá además un cierre de ocho compases por retirada o nota sostenida, no por llenar un fill.',deliverable:'Entrada y salida intencionales.'},
      {minutes:8,action:'Si usás automatización por pasos, registrá un solo movimiento que puedas describir; si no aporta, eliminá esa decisión.',deliverable:'Automatización justificada o ausencia deliberada.'}
    ],
    theory:'Una transición relaciona secciones mediante sustracción, sostén, anticipación o textura. La anticipación sugiere un destino antes de que llegue; no reemplaza una forma. Automatizar un parámetro sólo vale si cambia algo audible que podés describir. No se presupone una ruta de firmware: trabajá con lo que tu unidad muestre y compara antes/después.',
    workedExample:'En el compás 4 de A, deja bombo sólo en 1 y omite caja 13. En paso 15 agrega Sol corto de textura. En compás 5, B entra con bajo La en 1 y hats desde 3. Paso 1: retirar golpes baja densidad. Paso 2: Sol cerca del límite orienta hacia la nueva zona. Paso 3: la entrada completa de B se percibe por contraste. Alternativa: silencio de un pulso sin Sol; si comunica mejor, no agregues la nota. Nunca sumes fill, nota y automatización simultáneamente en la primera prueba.',
    misconception:'“Una transición debe llenar el último compás.” Se oye una entrada sin aire y no permite saber qué produjo el cambio. Aislá quitando una sola capa. Corregí empezando por sustracción y restaurando sólo lo necesario.',
    application:'Conectá A′→B y prepará el regreso B→A″; guarda versión seca y, sólo si ayuda, una versión con un movimiento adicional.',
    mastery:'Puedo señalar qué se retira, qué anticipa y qué entra, y comparar transiciones modificando una sola variable por vez.',
    sources:[{title:'Teenage Engineering — OP–XY guide collection',url:'https://teenage.engineering/guides/op-xy'}]
  },
  {
    activities:[
      {minutes:10,action:'Escuchá los ocho compases de maqueta sin tocar controles y anotá un problema observable, no una impresión vaga.',deliverable:'Diagnóstico único: motivo tapado, bajo confuso, B sin contraste o final abierto.'},
      {minutes:10,action:'Construí versión A de balance quitando una nota del voicing cuando entra melodía; no modifiques todas las pistas.',deliverable:'Versión A por menor densidad.'},
      {minutes:10,action:'Construí versión B restaurando el voicing pero retirando otra capa en el mismo lugar.',deliverable:'Versión B con hipótesis alternativa.'},
      {minutes:10,action:'Compará A/B a volumen parecido con rúbrica: motivo, bajo+bombo, A/B, transición, final.',deliverable:'Rúbrica con evidencia corta por criterio.'},
      {minutes:12,action:'Elegí una versión y expandí con ocho escenas de cuatro compases a A(8)–A′(8)–B(8)–A″(8).',deliverable:'Plano expandible de 32 compases, no cuatro escenas de cuatro.'},
      {minutes:8,action:'Escuchá el orden completo y conserva una versión anterior junto a la elegida y su razón.',deliverable:'Maqueta final y revisión reversible.'}
    ],
    theory:'Revisar es diagnosticar causa y probar una corrección aislada. Balance inicial prioriza rol, registro y densidad antes de efectos: si melodía y voicing compiten, quitar una nota puede resolver más que cambiar muchos controles. Una maqueta de 8 compases puede expandirse a 32 como A(8)–A′(8)–B(8)–A″(8): son ocho escenas de cuatro compases.',
    workedExample:'Problema: en el compás 5 la melodía no se distingue. Versión A: voicing de pista armónica Do–Mi–La pierde Mi mientras la melodía entra; quedan Do–La y se abre registro. Versión B: restaura el voicing completo pero silencia hats en ese compás. Paso 1: ambas reducen densidad, no “bajan un fader” que no fue modelado. Paso 2: escucha a igual volumen. Paso 3: si A deja clara melodía sin perder armonía, elige A; si B conserva mejor color, elige B. Luego duplicá escenas, sin editar A al crear sus variaciones.',
    misconception:'“Revisar es tocar todo hasta que parezca mejor.” Se oye imposible atribuir causa y se pierden versiones útiles. Aislá un problema por pasada, cambia una decisión, compara contra copia. Corregí por causa: densidad, registro, función o transición.',
    application:'Entrega una maqueta de ocho compases o una forma A(8)–A′(8)–B(8)–A″(8) de 32, dos versiones comparables y una decisión escrita por escucha.',
    mastery:'Puedo usar una rúbrica, proponer dos correcciones causales y elegir una versión sin confundir densidad con amplitud.',
    sources:[{title:'Berklee Online — Harmony 2: analysis, composition and arranging',url:'https://online.berklee.edu/courses/harmony-2'},{title:'Open Music Theory — Voice leading and jazz theory',url:'https://musictheory.pugetsound.edu/mt21c/MusicTheory.html'}]
  }
];

function courseMinutes(){
  return DEEP_CURRICULUM.reduce((sum, session) => sum + session.activities.reduce((n, activity) => n + activity.minutes, 0), 0);
}
