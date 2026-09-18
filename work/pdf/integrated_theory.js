// Visible musical explanations for the integrated workshop.
// These examples explain decisions; the learner's composition remains in C.
function integratedTheoryTable(caption,heads,rows){
  return `<figure class="theory-diagram"><figcaption>${caption}</figcaption><div class="theory-table-scroll"><table><thead><tr>${heads.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,k)=>k?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div></figure>`;
}
const INTEGRATED_THEORY=[
  {
    title:'El tiempo sigue aunque no toques',
    sections:[
      {title:'Pulso, tempo y ritmo',body:`<p>El <strong>pulso</strong> es la referencia regular que podés seguir con el pie. El <strong>tempo</strong> indica su velocidad: 75 BPM significa 75 pulsos por minuto. El <strong>ritmo</strong> es la manera en que tus sonidos y silencios se organizan sobre esa referencia.</p><p>Si tocás menos notas, el pulso puede seguir igual. Esa diferencia te permite dejar aire sin que tu canción se vuelva más lenta.</p>`},
      {title:'Un compás como mapa',body:`<p>Acá trabajamos en <strong>4/4</strong>: cuatro pulsos por compás. La grilla los divide en 16 pasos. Cada pulso ocupa cuatro pasos; sus comienzos son 1, 5, 9 y 13.</p>${integratedTheoryTable('La misma duración, distinta cantidad de ataques',['Pulso','1','2','3','4'],[['Paso inicial','1','5','9','13'],['Una opción','Do','—','Do','—']])}<p>Un <strong>ataque</strong> es el comienzo de una nota. Los guiones indican pulsos sin un nuevo ataque: para que haya silencio, la nota anterior debe haber terminado.</p>`},
      {title:'Elegir un gesto reconocible',body:`<p>Dos notas de la misma altura ya pueden construir una idea. Por ahora, Do sirve para escuchar el ritmo sin tener que decidir también una melodía. Conservá una versión y probá quitar o mover un solo ataque.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿podés seguir los cuatro pulsos durante el hueco y reconocer dónde vuelve tu idea?</p>`}
    ]
  },
  {
    title:'Una respuesta nace de algo que ya conocemos',
    sections:[
      {title:'Motivo y variación',body:`<p>Un <strong>motivo</strong> es una idea breve que reconocés cuando vuelve. Puede identificarse por sus ataques, sus duraciones o su recorrido de alturas. Todavía alcanza con una sola altura: el ritmo de tu primer compás ya es material musical.</p><p>La respuesta conserva algo del motivo y cambia otro rasgo. Repetir el comienzo y modificar el final permite escuchar tanto el parentesco como la diferencia.</p>`},
      {title:'Mover y alargar hacen cosas distintas',body:`<p>Un ataque entre pulsos usa una <strong>subdivisión</strong>. El paso 7 cae a mitad del segundo pulso: no hace falta acelerar el tempo para tocar allí.</p>${integratedTheoryTable('Dentro del segundo pulso',['Posición','Inicio','¼','½','¾'],[['Paso','5','6','7','8']])}<p><strong>Mover</strong> un ataque cambia cuándo comienza. <strong>Alargarlo</strong> cambia hasta cuándo sigue. Si una nota empieza en 5 y dura cuatro pasos, ocupa 5–8: esos pasos no están vacíos aunque sólo tengan un ataque.</p>`},
      {title:'Escuchar una relación',body:`<p>Copiá tu compás y transformá una decisión en el segundo. Un final más tardío puede acercar la respuesta al próximo comienzo; uno más corto puede abrir un hueco. El efecto depende de la frase completa.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿qué rasgo permite reconocer la pregunta en la respuesta, y qué hace que el segundo compás aporte algo?</p>`}
    ]
  },
  {
    title:'Dar dirección a tu ritmo con alturas',
    sections:[
      {title:'Dos maneras de medir una distancia',body:`<p>El <strong>intervalo</strong> relaciona dos alturas. Para medir semitonos, empezá en cero y contá saltos entre teclas consecutivas. Do→Mi mide cuatro: Do♯, Re, Mi♭, Mi. Un <strong>tono</strong> equivale a dos semitonos; Mi→Fa tiene uno.</p><p>El nombre del intervalo cuenta nombres de notas, incluidos ambos extremos: Do (1), Re (2), Mi (3). Por eso Do→Mi es una <strong>tercera</strong>; sus cuatro semitonos precisan que es mayor.</p>`},
      {title:'El contorno dibuja el recorrido',body:`${integratedTheoryTable('Desde Do, dos medidas complementarias',['Destino','Nombres contados','Semitonos'],[['Re','Do–Re: segunda','2'],['Mi','Do–Re–Mi: tercera','4'],['Sol','Do–Re–Mi–Fa–Sol: quinta','7']])}<p>Subir, bajar y repetir forman el <strong>contorno</strong>. Do–Mi–Sol sube; Sol–Mi–Do baja. Si mantenés los ataques y cambiás alturas, conservás el ritmo mientras probás otra dirección. Elegir tres alturas entre Do, Re, Mi, Sol y La alcanza para esta primera pieza.</p>`},
      {title:'La última respuesta tiene otra función',body:`<p>Cuatro compases pueden presentar, responder, retomar y concluir. El final puede llegar a una nota que la frase hizo importante, reducir ataques o dejar silencio. Ninguna nota produce cierre por sí sola: escuchá cómo llegás a ella.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> al comparar el final en Do y en Re con el mismo ritmo, ¿qué cambia en las ganas de que la frase siga? Elegí el que complete tu recorrido.</p>`}
    ]
  },
  {
    title:'Una escala ofrece notas; una frase establece un centro',
    sections:[
      {title:'La fórmula de la escala mayor',body:`<p>La escala mayor sigue esta distancia entre notas: <strong>tono–tono–semitono–tono–tono–tono–semitono</strong>. Desde Do da Do, Re, Mi, Fa, Sol, La y Si; el siguiente Do completa la octava. En el teclado, los semitonos aparecen entre Mi–Fa y Si–Do.</p><p>La escala es una reserva organizada de alturas. Tu melodía puede usar sólo algunas, repetirlas y dejar huecos. Tocarlas todas en orden es una manera de estudiarlas, no una obligación al componer.</p>`},
      {title:'El grado necesita una escala de referencia',body:`${integratedTheoryTable('Posiciones en Do mayor',['Nota','Do','Re','Mi','Fa','Sol','La','Si'],[['Grado','1','2','3','4','5','6','7']])}<p><strong>Mi es grado 3 de Do mayor</strong> porque ocupa la tercera posición. Do→Mi mide cuatro semitonos: el número de grado y la cantidad de semitonos cuentan cosas distintas. Si la escala de referencia cambia, también puede cambiar el grado de esa misma nota.</p>`},
      {title:'Hacer sentir una llegada',body:`<p>El <strong>centro tonal</strong> es la altura que funciona como referencia en lo que escuchás. Repeticiones, bajo, acordes y finales ayudan a establecerlo. Usar las notas de Do mayor no basta para garantizar que Do se sienta como centro.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> compará terminar en Do y en La manteniendo el mismo apoyo grave en Do. ¿Cómo cambia la llegada? Ese final en La, por sí solo, no convierte la pieza en La menor.</p>`}
    ]
  },
  {
    title:'Construir un acorde y entender qué cambia',
    sections:[
      {title:'Raíz, tercera y quinta',body:`<p>Una <strong>tríada</strong> reúne raíz, tercera y quinta. La raíz da nombre al acorde; desde ella contamos los nombres de nota incluyendo el comienzo: Do (1), Re (2), Mi (3), Fa (4), Sol (5). Elegimos Do–Mi–Sol: <strong>C, Do mayor</strong>.</p><p>Para <strong>Am, La menor</strong>, empezamos desde La: La–Si–Do–Re–Mi. Su raíz es La, su tercera Do y su quinta Mi. La letra nombra la raíz; la <strong>m</strong> indica menor. C sin esa m representa aquí una tríada mayor.</p>`},
      {title:'El tipo de tercera define estas dos tríadas',body:`${integratedTheoryTable('Semitonos contados desde la raíz, que vale 0',['Tríada','Raíz','Tercera','Quinta'],[['Mayor','0','4','7'],['Menor','0','3','7'],['C','Do','Mi','Sol'],['Am','La','Do','Mi']])}<p>C→Cm conserva la raíz Do y baja Mi a Mi♭. <strong>C→Am cambia la raíz</strong> y conserva Do y Mi. Son comparaciones diferentes. «Tercera» cuenta tres nombres; mayor o menor precisa si mide cuatro o tres semitonos.</p>`},
      {title:'La misma nota puede tener otro papel',body:`<p>Mi sigue siendo grado 3 de la escala de Do mayor. Dentro de C es la tercera; dentro de Am, la quinta. Siempre nombrá la referencia: <strong>grado de la escala</strong> o <strong>intervalo desde la raíz del acorde</strong>.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> mantené una nota importante y compará C y Am debajo. ¿Qué cambia en su apoyo y en el paso al compás siguiente? Mayor y menor describen estructuras; no imponen emociones fijas.</p>`}
    ]
  },
  {
    title:'Una melodía conversa con los acordes',
    sections:[
      {title:'Pertenecer al acorde es una relación',body:`<p>Sobre Am, La–Do–Mi son notas de la tríada. Mi es su quinta y Fa queda fuera de ella. Eso permite describir una diferencia, pero no decide por vos cuál usar: una nota ajena al acorde puede aportar tensión, enlace o un color que quieras conservar.</p><p>La duración y la posición importan. Un Fa breve entre dos Mi no tiene necesariamente el mismo efecto que un Fa largo al comienzo de un compás. Escuchá lo que viene antes y después.</p>`},
      {title:'Paso y bordado describen recorridos',body:`${integratedTheoryTable('Dos figuras sobre Do mayor: Do–Mi–Sol',['Recorrido','Qué hace la nota central'],[['Do → Re → Mi','Re conecta dos notas del acorde por pasos'],['Mi → Fa → Mi','Fa se aleja de Mi y vuelve a ella']])}<p>La primera figura puede funcionar como <strong>nota de paso</strong>; la segunda, como <strong>bordado</strong>. Reconocerlas exige mirar el recorrido, su ritmo y el acorde. Una nota aislada no alcanza para asignarle esa función.</p>`},
      {title:'Revisar sin perder la causa',body:`<p>Elegí una nota larga o destacada de tu pieza. Conservá el acorde y probá otra altura; después escuchá la frase entera. En una comparación distinta podés conservar la altura y cambiar el acorde. Separar las pruebas ayuda a entender qué decisión produce cada efecto.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿esa nota aporta apoyo, roce o continuidad donde lo necesitás? Si aún no distinguís, concentrá la escucha en ese compás y después en la frase completa antes de decidir el cierre.</p>`}
    ]
  },
  {
    title:'Los acordes también construyen un recorrido',
    sections:[
      {title:'Los números romanos muestran relaciones',body:`<p>Ya construiste acordes desde sus raíces. Ahora podés ubicarlos dentro de una escala: en Do mayor, C nace en Do, F en Fa y G en Sol. Son <strong>I, IV y V</strong>. Am nace en La: <strong>vi</strong>. Usamos mayúsculas para estas tríadas mayores y minúsculas para la menor.</p><p>El número sitúa la raíz en la escala; no señala una pista ni la cantidad de notas. Nombrar relaciones permite reutilizar un recorrido desde otro centro cuando conozcas sus acordes.</p>`},
      {title:'Referencia, alejamiento y regreso',body:`${integratedTheoryTable('Un recorrido posible en Do mayor',['Función aquí','I','IV','V','I'],[['Acorde','C','F','G','C'],['Notas','Do–Mi–Sol','Fa–La–Do','Sol–Si–Re','Do–Mi–Sol']])}<p>En este contexto, I establece referencia, IV se aleja y V prepara un posible regreso a I. Esa <strong>función</strong> se escucha en la relación entre acordes y su continuación. No es una emoción fija ni una obligación de terminar siempre igual.</p>`},
      {title:'Cada cuánto cambia la armonía',body:`<p>El <strong>ritmo armónico</strong> es la frecuencia de cambio de los acordes. Uno por compás deja una espera distinta que uno cada dos. La melodía puede hacer muchos ataques mientras la armonía permanece.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> mantené la melodía y compará el último acorde C con G. ¿Cuál produce la llegada que buscás? Después podés probar sostener una armonía más tiempo y escuchar cómo cambia la espera.</p>`}
    ]
  },
  {
    title:'Cada acorde contiene líneas que pueden moverse',
    sections:[
      {title:'Las mismas notas, otra disposición',body:`<p>Do–Mi–Sol y Mi–Sol–Do contienen las mismas clases de nota: siguen formando C. Cambia su <strong>disposición</strong>, es decir, qué altura concreta ocupa cada voz. Una <strong>voz</strong> es una línea que podés seguir entre un acorde y el siguiente.</p><p>Escuchar esas líneas permite elegir el movimiento del acompañamiento: cerca, con saltos, más grave o más agudo. Una disposición también puede dejar espacio para que se distinga tu melodía.</p>`},
      {title:'Seguir un movimiento cada vez',body:`${integratedTheoryTable('Conectar C con F conservando una nota',['Voz','C','F','Movimiento'],[['Inferior','Do','Do','Se mantiene'],['Media','Mi','Fa','Sube un semitono'],['Superior','Sol','La','Sube un tono']])}<p>La <strong>conducción de voces</strong> estudia estos recorridos simultáneos. Conservar notas comunes y mover las demás poco es un recurso útil; los saltos también pueden servir a una intención. Compará manteniendo iguales el bajo y la melodía.</p>`},
      {title:'Raíz y bajo pueden ser distintos',body:`<p>La raíz nombra el acorde. El <strong>bajo</strong> es la nota más grave del conjunto. Si suena una nota del acorde distinta de la raíz en ese lugar, hay una inversión. Do–Fa–La arriba con Fa más grave en otra pista tiene Fa como bajo total: mirá todas las capas.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿podés seguir una voz entre dos acordes? Elegí su movimiento por lo que aporta a la frase, y comprobá después que el motivo principal sigue claro.</p>`}
    ]
  },
  {
    title:'Una séptima agrega color y una nueva línea',
    sections:[
      {title:'Ampliar una tríada',body:`<p>Al añadir otra tercera sobre la quinta de una tríada obtenemos un acorde de cuatro notas. La nueva nota forma una <strong>séptima respecto de la raíz</strong>. En G7, Sol–Si–Re–Fa, el Fa está a diez semitonos de Sol: es una séptima menor.</p><p>Los símbolos distinguen combinaciones concretas. Cmaj7 conserva la tríada mayor y añade Si; C7 conserva la misma tríada y añade Si♭. La séptima modifica el color sin convertir automáticamente la tríada en menor.</p>`},
      {title:'Construcción y movimiento',body:`${integratedTheoryTable('Escuchá qué nota se suma',['Símbolo','Tríada','Séptima','Semitonos desde raíz'],[['G7','Sol–Si–Re','Fa','10'],['Cmaj7','Do–Mi–Sol','Si','11'],['C7','Do–Mi–Sol','Si♭','10']])}<p>En <strong>G7→C</strong>, Fa puede bajar a Mi y Si puede subir a Do. Son movimientos de un semitono. Tocá primero Fa→Mi, después escuchalo con bajo Sol→Do y finalmente dentro de la pieza. El destino concreto de cada voz depende de tu disposición.</p>`},
      {title:'Elegir cuánto necesita tu final',body:`<p>Comparar G con G7 antes de C permite oír el aporte de Fa conservando el resto. Si el color ayuda, elegí su registro y resolución. Si ocupa demasiado espacio, la tríada sigue siendo una elección completa. La extensión ii–V–I queda para una práctica posterior.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿la nota añadida hace más clara la llegada, aporta un roce deseado o distrae del motivo? Decidí después de escuchar los cuatro compases.</p>`}
    ]
  },
  {
    title:'El groove vive en la colocación y en el aire',
    sections:[
      {title:'Riff y fraseo',body:`<p>Un <strong>riff</strong> es una figura que gana identidad cuando vuelve. Dos o tres ataques pueden alcanzar. El <strong>fraseo</strong> reúne decisiones sobre entradas, duraciones, acentos y silencios; organiza cómo se presenta esa figura sobre el pulso.</p><p>Mover una entrada un paso cambia su relación con la base. Acortar la última nota abre un hueco sin mover su comienzo. Repetí el riff y escuchá también la respuesta: el espacio puede ser parte de lo que recordás.</p>`},
      {title:'Color, forma y feel son decisiones diferentes',body:`${integratedTheoryTable('Recursos que podés probar por separado',['Decisión','Qué cambia'],[['Fraseo','Cuándo empieza y termina un gesto'],['Color de blues','Por ejemplo, Mi♭ breve → Mi sobre C7'],['Feel recto o swing','La distribución interna de las subdivisiones']])}<p>Sobre C7 = Do–Mi–Sol–Si♭, Mi♭→Mi puede crear y resolver un roce entre tercera menor y mayor. Su efecto depende de cómo entra y continúa. Ese gesto no determina una forma de doce compases.</p>`},
      {title:'Escuchar lo que ocurre entre pulsos',body:`<p>El swing puede retrasar la segunda corchea de un par manteniendo los BPM. La proporción 2:1 del ejemplo es una aproximación didáctica; en la música real varía y se combina con articulación y acentos. Tu groove también puede funcionar recto.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿qué pasa si el riff entra un paso después? Conservá notas y tempo para comparar, y elegí la colocación que deje responder a la base.</p>`}
    ]
  },
  {
    title:'Desarrollar es transformar algo reconocible',
    sections:[
      {title:'De A a A′',body:`<p>A presenta tu idea en cuatro compases. <strong>A′</strong> —se lee «A prima»— retoma ese material con una variación. Las dos mitades suman ocho compases. El parentesco puede sostenerse en el ritmo inicial, el contorno o un silencio que ya identifica al riff.</p><p>Una repetición permite reconocer; una transformación puede cambiar la función de lo que vuelve. No necesitás inventar una melodía diferente en cada compás para que la música avance.</p>`},
      {title:'Elegir una dimensión de cambio',body:`${integratedTheoryTable('Tres pruebas independientes',['Variable','Conservás','Transformás'],[['Registro','Ataques y clases de nota','La octava de la frase'],['Duración','Ataques y alturas','Cuánto sigue cada sonido'],['Textura','El motivo principal','Las capas que lo acompañan']])}<p>Una <strong>octava</strong> mide doce semitonos: Do4→Do5 cambia la altura concreta y conserva la clase de nota Do. El ritmo y el contorno pueden seguir haciendo reconocible el motivo. La <strong>textura</strong> describe cómo se combinan las capas, no sólo cuántas hay.</p>`},
      {title:'Comparar repetición con variación',body:`<p>Escuchá A+A y A+A′ desde el mismo punto. Si desaparece el parentesco, recuperá un rasgo claro en 5 o 7. Si la diferencia pasa inadvertida, hacé más evidente la transformación elegida antes de añadir otra.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿qué reconocés al llegar al compás 5 y qué cambió? Nombrá una sola variable y comprobá su efecto con todas las pistas, conservando la primera mitad.</p>`}
    ]
  },
  {
    title:'Hacer que una vuelta tenga un final',
    sections:[
      {title:'La forma organiza funciones',body:`<p>La <strong>forma</strong> relaciona lo que vuelve, cambia y concluye. Tus ocho compases ya presentan A y su variación A′. Ahora podés distinguir el paso entre mitades y el cierre: son dos lugares con funciones diferentes.</p><p>Una transición prepara una entrada; un final completa una pasada. Ambos pueden usar silencio o reducción de ataques, pero su efecto depende de lo que preceden y de lo que viene después.</p>`},
      {title:'El cierre también depende de la duración',body:`${integratedTheoryTable('Misma nota final y mismo ataque',['Prueba','Qué se modifica','Qué escuchar'],[['Más larga','Duración sostenida','El peso de la llegada'],['Más corta','Duración y silencio posterior','El espacio después de responder'],['Menos ataques','Cantidad de comienzos','La retirada de la actividad']])}<p>Apagar el loop evita que el regreso al principio oculte un final todavía indefinido. Una nota larga puede afirmar una llegada; una respuesta corta seguida de silencio también puede cerrar. Probá ambas en contexto, sin cambiar simultáneamente todas las capas.</p>`},
      {title:'Completar la forma que elegiste',body:`<p>Una base que repite puede servir para improvisar. Guardar además una versión con final te permite escuchar tu miniatura como pieza completa. Expandirla a un blues de doce compases sería otro trabajo: requeriría reorganizar frases y cambios armónicos.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> en una sola pasada, ¿el compás 8 se siente elegido como final o parece un corte? Compará desde el 7 y dejá unos segundos de silencio antes de volver a escuchar.</p>`}
    ]
  },
  {
    title:'Tu intención decide qué material hace falta',
    sections:[
      {title:'Convertir una intención en un encargo',body:`<p>Un <strong>encargo</strong> útil describe algo que después podés escuchar: «quiero que el riff se recuerde aunque quite la batería» o «la segunda mitad tendrá más espacio». Elegí tema instrumental o groove y recuperá dos herramientas que ya sepas usar.</p><p>La quinta pieza empieza con material nuevo. Recordar un procedimiento —motivo, respuesta, repetición, variación— te ayuda a decidir sin copiar las notas ni el ritmo de las piezas anteriores.</p>`},
      {title:'Las capas tienen funciones',body:`${integratedTheoryTable('Roles posibles: usá los que tu idea necesite',['Capa','Aporte posible'],[['Motivo','Una figura para reconocer'],['Bajo','Apoyo grave y dirección entre notas'],['Armonía','Relación de acordes bajo la frase'],['Batería','Apoyos, subdivisión y contraste']])}<p>El bajo puede señalar una raíz o acercarse a otra nota. La batería puede afirmar el pulso o dejar huecos. No tienen que duplicar todos sus ataques. En esta guía las pistas 1, 3, 4 y 5 ayudan a organizar esos roles; una pieza puede funcionar usando menos.</p>`},
      {title:'Elegir y comprobar el aporte',body:`<p>Inventá dos gérmenes y escuchalos con el encargo en mente. Desarrollá el elegido mediante pregunta y respuesta; agregá después el soporte que necesite. Quitar temporalmente una capa permite descubrir qué estaba haciendo, incluso si no faltan notas.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> cuando retirás un apoyo y lo reponés, ¿qué mejora al volver? Si no podés nombrar su función todavía, probá una base más simple y revisá la intención.</p>`}
    ]
  },
  {
    title:'El contraste necesita algo con lo que relacionarse',
    sections:[
      {title:'Identidad y diferencia',body:`<p>La segunda mitad puede cambiar armonía, ritmo, registro o textura. Llamarla <strong>A′</strong> destaca su parentesco con A; llamarla <strong>B</strong> destaca su contraste. Las letras ayudan a describir lo que escuchás, sin fijar una cantidad obligatoria de diferencias.</p><p>Elegí qué rasgo conservar: el inicio del riff, una respuesta o un hueco característico. Ese punto de contacto puede hacer que una transformación amplia todavía pertenezca a tu pieza.</p>`},
      {title:'Una intención admite varias soluciones',body:`${integratedTheoryTable('Si querés que la segunda mitad se sienta más abierta',['Prueba','Qué mantenés','Qué escuchás'],[['Subir registro','Ritmo y acompañamiento','El nuevo lugar de la melodía'],['Retirar una capa','Motivo y alturas','El espacio entre las líneas'],['Alargar un acorde','Su identidad y el motivo','La espera antes del cambio']])}<p>«Más abierto» es una intención personal que hay que verificar por oído. Subir de octava no garantiza ese resultado. Probá una alternativa, compará ambas mitades y conservá o descartá según lo que realmente escuches.</p>`},
      {title:'Una versión protegida permite elegir',body:`<p>Comparar requiere poder volver al punto de partida. Conservá el borrador y editá sólo 5–8. En el instrumento, dos escenas pueden compartir un patrón: comprobá que variás una copia independiente para proteger A.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> al pasar de 4 a 5, ¿aparecen identidad y diferencia? Describí «se conserva…; cambia…» y verificá que el contraste cumple tu encargo antes de combinar más transformaciones.</p>`}
    ]
  },
  {
    title:'Una transición relaciona dos lados del cambio',
    sections:[
      {title:'Preparar una entrada',body:`<p>La <strong>transición</strong> conecta lo que termina con lo que empieza. Quitar un ataque, sostener una nota o retirar una capa son alternativas para preparar B. Una señal funciona por su relación con la nueva entrada; escuchar sólo el último instante de A puede ocultar esa relación.</p><p>Elegí primero qué necesita el paso: aire, continuidad o una entrada más marcada. La intervención puede ser pequeña si cumple esa función en el recorrido.</p>`},
      {title:'Hueco parcial y anticipación',body:`${integratedTheoryTable('Dos recursos con efectos distintos',['Recurso','Qué ocurre','Qué comprobar'],[['Retirar una caja','Una capa deja de atacar','Si otras notas siguen sonando'],['Anticipar una nota','Aparece antes material de B','Su relación con ambos acordes']])}<p>Si siguen bajo y acordes, quitar una caja produce un <strong>hueco parcial</strong>, no silencio total. Una <strong>anticipación</strong> presenta antes una nota o gesto de lo que viene: si B empieza con Am, podés probar La antes de su llegada. Escuchá cómo se relaciona también con el acorde anterior.</p>`},
      {title:'Escuchar antes, durante y después',body:`<p>Compará desde el compás 3 al 6 para incluir contexto a ambos lados. Si retirás un ataque, conservá el resto en la primera prueba. La automatización del instrumento queda como opción posterior cuando puedas nombrar lo que necesita mejorar.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿la intervención hace más clara la llegada a 5? Después evaluá por separado el compás 8: preparar una nueva sección y terminar la pieza requieren decisiones propias.</p>`}
    ]
  },
  {
    title:'Revisar convierte una intuición en una decisión',
    sections:[
      {title:'Localizar el problema',body:`<p>«No me convence» puede empezar una revisión, pero hace falta ubicar qué escuchás: «en el compás 5 el acorde oculta el motivo» o «el último compás parece otra vuelta». Elegí la prioridad que más afecte al encargo original.</p><p>La <strong>claridad musical</strong> depende de relaciones: registro, duración, densidad y entradas pueden hacer que una idea sobresalga o compita con otra. Antes de sumar notas, probá localizar qué capa produce el problema.</p>`},
      {title:'Una hipótesis y una comparación',body:`${integratedTheoryTable('Un procedimiento para reutilizar',['Momento','Decisión concreta'],[['Observar','Ubicar un tramo y describir su efecto'],['Probar','Cambiar una variable y conservar el original'],['Reescuchar','Comparar el mismo tramo y luego la pieza'],['Elegir','Vincular la versión elegida con el encargo']])}<p>Si el acorde tapa la melodía, quitar una voz es una hipótesis posible. Puede despejar el motivo o perder un color necesario. La comparación decide; la herramienta no garantiza la mejora. Escuchá a nivel parecido y comprobá también las transiciones.</p>`},
      {title:'Transferir sin copiar',body:`<p>Después de terminar, inventá un germen nuevo de dos compases empezando por otro elemento. Recuperá el método de pregunta y respuesta con otro ritmo o contorno. Transportar la misma frase o cambiar su sonido puede ser útil, pero no comprueba todavía esa nueva decisión compositiva.</p><p class="theory-check"><strong>Escuchá en tu canción:</strong> ¿qué mejora podés mostrar entre antes y después? Anotá qué resolviste por tu cuenta y qué recurso precisaste consultar para orientar la próxima práctica.</p>`}
    ]
  }
];
function integratedTheoryHTML(i){
  const chapter=INTEGRATED_THEORY[i];
  if(!chapter)return '';
  return `<section class="integrated-theory" aria-labelledby="integrated-theory-${i}"><p class="theory-eyebrow">ENTENDER LO QUE COMPONÉS</p><h3 id="integrated-theory-${i}">${chapter.title}</h3>${chapter.sections.map(s=>`<section class="theory-section"><h4>${s.title}</h4>${s.body}</section>`).join('')}</section>`;
}
