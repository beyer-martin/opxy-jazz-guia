from pathlib import Path
from io import BytesIO
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import pypdfium2 as pdfium

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/opxy-jazz-cuaderno-visual-v3.pdf'
FONT='/System/Library/Fonts/Supplemental/'
pdfmetrics.registerFont(TTFont('Arial',FONT+'Arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialB',FONT+'Arial Bold.ttf'))
pdfmetrics.registerFontFamily('Arial',normal='Arial',bold='ArialB',italic='Arial',boldItalic='ArialB')
W,H=595.28,841.89
INK='#242424'; GREEN='#444444'; MINT='#FFFFFF'; GRAY='#666666'
c=canvas.Canvas(str(OUT),pagesize=(W,H)); c.setTitle('Del saxo al OP-XY | Cuaderno visual de jazz'); c.setAuthor('Guía personalizada')
photo=Image.open(ROOT/'outputs/opxy_official_reference.png').convert('RGBA')
scale=photo.width/1600
crop=(115,550,1495,1050)
img=ImageReader(photo.crop(tuple(round(v*scale) for v in crop)))
xs=[399,474,548,622,696,770,845,919,993,1067,1142,1216,1290,1364]
names=['Fa','Sol','La','Si','Do','Re','Mi','Fa','Sol','La','Si','Do','Re','Mi']
upperx=[437,511,585,734,808,955,1030,1105,1254,1328]
uppernames=['Fa#','Sol#','Sib','Do#','Mib','Fa#','Sol#','Sib','Do#','Mib']
page=0
REWRITES={
'Cantá Do-Mi-Sol-Mi y buscá esos botones.':'Tocá Do-Mi-Sol-Mi lentamente y ubicá esos botones.',
'Reproducí y cantá encima sin tocar.':'Reproducí y seguí el recorrido de las notas sin tocar.',
'Cantá Sol-La mientras alternás los acordes.':'Escuchá el movimiento Sol-La mientras alternás los acordes.',
'Cantá una frase de hasta cuatro notas durante dos compases.':'Tocá y grabá una frase de hasta cuatro notas durante dos compases.',
'Encontrala en el teclado en los dos compases siguientes.':'Escuchá la grabación y repetila de memoria en los dos compases siguientes.',
'Empezá cantando sólo dos notas si hace falta.':'Empezá con una frase de sólo dos notas si hace falta.',
'se parece a lo cantado':'se parece a la primera grabación',
'Cantá Si antes de agregarlo.':'Tocá Si por separado; escuchalo antes de agregarlo al acorde.',
'Cantá primero Do-Si-Si y después Fa-Fa-Mi.':'Tocá por separado primero Do-Si-Si y después Fa-Fa-Mi.',
'si cantás tensión-resolución antes de tocar':'si reconocés de oído la tensión y su resolución',
'Cantá la pregunta y su respuesta, como si fueran dos frases de saxo.':'Escuchá la pregunta y su respuesta como dos frases de saxo.',
'una frase corta que puedas cantar':'una frase corta que puedas recordar de oído',
'Escuchá varias veces y cantá su ritmo.':'Escuchá varias veces y marcá su ritmo con un dedo sobre la mesa.',
'3 min: cantá y buscá notas.':'3 min: escuchá una frase grabada y buscá sus notas.',
'¿Puedo cantar mi idea?':'¿Reconozco mi idea al escucharla?',
}
def revised(txt):
    for old,new in REWRITES.items():txt=txt.replace(old,new)
    return txt
def text(txt,x,y,size=10,color=INK,bold=False):
    c.setFillColor(HexColor(color));c.setFont('ArialB' if bold else 'Arial',size);c.drawString(x,y,txt)
def para(txt,y,size=10.5,width=515):
    txt=revised(txt)
    p=Paragraph(txt,ParagraphStyle('p',fontName='Arial',fontSize=size,leading=size*1.4,textColor=HexColor(INK)))
    _,h=p.wrap(width,1000)
    assert y-h>38,('overflow',page,y,h,txt[:50])
    p.drawOn(c,40,y-h);return y-h-10
def start(kicker,title,sub):
    global page
    if page:c.showPage()
    page+=1;c.setFillColor(HexColor('#E5E5E5'));c.rect(0,0,W,H,fill=1,stroke=0)
    text('OP-XY  /  DEL SAXO AL TECLADO',40,812,8,GRAY,True)
    text(kicker.lower(),40,778,9,GRAY);text(title.lower(),40,748,25,INK)
    para(sub,729,10)
    c.setStrokeColor(HexColor('#BBBBBB'));c.line(40,34,555,34)
    text('Foto original + overlays programáticos · Edición revisada',40,21,7,GRAY)
    text(str(page),540,21,8,GRAY)
def overlay(title,keys,top,height=154,seq=None,iw=515,track=None):
    text(title,40,top,11,GREEN,True)
    ih=iw*500/1380; y=top-13-ih
    c.drawImage(img,40,y,width=iw,height=ih,mask='auto')
    for key in keys:
        if isinstance(key,tuple): idx=key[1]; px=upperx[idx];py=911;name=uppernames[idx]
        else:px=xs[key];py=986;name=names[key]
        xx=40+(px-115)*iw/1380;yy=y+ih-(py-550)*iw/1380
        c.setStrokeColor(HexColor(MINT));c.setLineWidth(1.8);c.circle(xx,yy,11,stroke=1,fill=0)
        ly=y-12 if not isinstance(key,tuple) else y+ih+2
        c.setStrokeColor(HexColor('#888888'))
        c.line(xx,yy-12 if not isinstance(key,tuple) else yy+12,xx,ly+8 if not isinstance(key,tuple) else ly-2)
        c.setFont('ArialB',9);c.setFillColor(HexColor(GREEN));c.drawCentredString(xx,ly,name)
    if seq:
        for n in seq:
            xx=40+(177+(n-1)*74.2-115)*iw/1380; yy=y+ih-(838-550)*iw/1380
            c.setStrokeColor(HexColor('#FFBA55'));c.setLineWidth(2);c.circle(xx,yy,10,stroke=1,fill=0)
    if track:
        xx=40+(770+(track-1)*74.2-115)*iw/1380; yy=y+ih-(762-550)*iw/1380
        c.setStrokeColor(HexColor('#80B9FF'));c.setLineWidth(2.5);c.circle(xx,yy,12,stroke=1,fill=0)
    return y-29
def section(label,body,y):
    text(label.lower(),40,y,11,GREEN,True);return para(body,y-12,10)
def grid(labels,y):
    cw=515/len(labels)
    for i,lab in enumerate(labels):
        c.setFillColor(HexColor('#E4EEE9'));c.roundRect(40+i*cw,y-37,cw-3,35,4,fill=1,stroke=0)
        c.setFillColor(HexColor(INK));c.setFont('Arial',9);c.drawCentredString(40+i*cw+(cw-3)/2,y-23,lab)
    return y-52

start('Tu ruta','Del saxo al OP-XY','12 ejercicios progresivos · oído, armonía, secuencias e improvisación')
y=overlay('Un instrumento real. Un mapa que coincide con tus manos.',[4,6,8],683)
y=section('QUÉ VAS A APRENDER','Vas a pasar de tres notas a una pieza de 16 compases. Cada ejercicio conecta lo que escuchás con las teclas, después con un acompañamiento y finalmente con una pequeña decisión de composición.',y)
y=section('TU PUNTO DE PARTIDA','Tocaste saxo y conociste escalas, pero el teclado es nuevo. Recuperamos el oído sin dar por recordada la teoría. Las letras, acordes y ritmos se explican antes de usarlos. No hace falta leer pentagramas.',y)
y=section('CÓMO ESTUDIAR','Trabajá 20 minutos, cuatro días por semana. Hacé un ejercicio nuevo y repasá uno anterior. La ruta puede ocupar 4-8 semanas: el criterio de avance importa más que el calendario.',y)
y=section('UN LÍMITE ÚTIL','Esto enseña lenguaje de jazz y composición en las teclas compactas del OP-XY. La técnica de piano acústico y la independencia de ambas manos requieren práctica específica; aquí el secuenciador hará de acompañante.',y)

start('01 / orientación','Primero, encontrá las notas','Sin transposición · las letras se refieren a notas de concierto, no a la escritura transpuesta del saxo.')
y=overlay('La fila inferior empieza en Fa. Do está en el quinto botón.',[0,4,7,11],680)
y=para('<b>Fila inferior, desde la derecha de SHIFT:</b><br/>Fa · Sol · La · Si · Do · Re · Mi · Fa · Sol · La · Si · Do · Re · Mi',y)
y=para('<b>Fila superior musical:</b> Fa# · Sol# · Sib | Do# · Mib | Fa# · Sol# · Sib | Do# · Mib. Sus botones llevan números. La fila gris de 16 botones que está encima es el <b>secuenciador</b>, no el teclado.',y)
y=section('EL IDIOMA DE LOS ACORDES','C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si. “m” significa menor; “7” agrega séptima menor; “maj7” agrega séptima mayor. Un # sube un semitono y un b lo baja. Entre Mi-Fa y Si-Do ya hay un semitono.',y)
y=section('PREPARACIÓN','Elegí una pista con sonido polifónico claro y sin arpegiador ni transposición automática. Al pulsar tres botones deben sonar tres notas estables. Usá + / - para cambiar el registro cuando haga falta. Las posiciones de las notas se repiten aunque cambie la octava. [1, 2]',y)

start('02 / preparación visual','Qué botón hace qué','Empezá en modo INSTRUMENT. Para el primer ejercicio alcanza una sola pista.')
y=overlay('Azul: pista 4 · Blanco: notas · Ámbar: pasos donde escribir',[4,6,8],680,seq=[1,5,9,13],track=4)
# The track cards have an explicit hierarchy and purpose, not tiny labels.
for j,(num,title,role) in enumerate([(1,'BATERÍA','Más adelante'),(3,'BAJO','Raíces graves'),(4,'ARMONÍA','Empezá acá'),(5,'MELODÍA','Para improvisar')]):
    x=40+j*130
    c.setFillColor(HexColor('#C7C7C7' if num==4 else '#DCDCDC'));c.rect(x,y-57,125,57,fill=1,stroke=0)
    text(str(num),x+10,y-25,22,INK,True);text(title,x+39,y-19,9,INK,True);text(role,x+39,y-39,8,GRAY)
y-=80
y=section('1  ELEGÍ EL SONIDO','Seleccioná la pista 4, marcada en azul. Cargá un piano o sintetizador polifónico. Esta asignación es la propuesta de la guía; no describe los sonidos de fábrica.',y)
y=section('2  ELEGÍ CUÁNDO SUENA','Los círculos blancos marcan notas. Los círculos ámbar marcan pasos. Tocá Do y pulsá el paso 1: acabás de escribir Do al inicio del compás. Contá los pasos desde la izquierda.',y)
y=section('3  ESCUCHÁ Y EDITÁ','PLAY reproduce el patrón. STOP lo detiene. Sostené un paso para ver sus notas; mientras lo sostenés, pulsá una nota para agregarla o quitarla. Usá un patrón vacío para el ejercicio siguiente. [3]',y)
y=section('AJUSTE PARA LAS GRILLAS','70 BPM · 4/4 · escala temporal de pista 1 · 16 pasos. Los pulsos caen en 1, 5, 9 y 13. Para ejercicios de varios compases, BAR + “+” agrega compases; BAR cambia el visible. [3]',y)

def roll(y):
    left=80;cw=475/16;rh=25
    for beat in range(4):
        text('PULSO '+str(beat+1),left+beat*4*cw+8,y,9,GREEN,True)
    for i in range(16):
        c.setFont('ArialB' if i%4==0 else 'Arial',9);c.setFillColor(HexColor(INK));c.drawCentredString(left+(i+.5)*cw,y-20,str(i+1))
    for row,note in enumerate(['Sol','Mi','Do']):
        yy=y-32-(row+1)*rh;text(note,40,yy+8,10,INK,True)
        for i in range(16):
            c.setFillColor(HexColor('#CCCCCC' if (i//4)%2==0 else '#D8D8D8'));c.rect(left+i*cw,yy,cw-1,rh-1,stroke=0,fill=1)
    for row,step in [(2,1),(1,5),(0,9),(1,13)]:
        yy=y-32-(row+1)*rh
        c.setFillColor(HexColor(GREEN));c.roundRect(left+(step-1)*cw+2,yy+3,4*cw-5,rh-7,3,fill=1,stroke=0)
        text('●',left+(step-1)*cw+7,yy+8,9,'#FFFFFF')
    return y-123

def first_exercise():
    start('Ejercicio 01 / secuenciador','Programá Do-Mi-Sol-Mi','6 minutos · 70 BPM · pista 4 · patrón vacío de un compás')
    y=overlay('Blanco: las tres notas · Ámbar: pasos 1, 5, 9 y 13',[4,6,8],680,seq=[1,5,9,13],track=4)
    text('ASÍ QUEDA EL COMPÁS EN EL SECUENCIADOR',40,y,10,GREEN,True)
    y=roll(y-25)
    y=para('<b>Leé de izquierda a derecha.</b> Cada bloque oscuro comienza en un paso marcado y dura cuatro pasos: un pulso. Filas = notas; columnas = tiempo.',y,9.5)
    y=section('ESCRIBÍ LAS CUATRO NOTAS','Tocá <b>Do → paso 1</b>. Tocá <b>Mi → paso 5</b>. Tocá <b>Sol → paso 9</b>. Tocá <b>Mi → paso 13</b>. Son cuatro ataques, no un acorde. [3]',y)
    y=section('DALES DURACIÓN Y REPRODUCÍ','Sostené 1 y pulsá 4; después 5 + 8, 9 + 12 y 13 + 16. Son pares de <b>pasos</b>. Elegí longitud completa, sin solapamiento. Pulsá PLAY: escuchá Do-Mi-Sol-Mi durante cuatro vueltas. [3]',y)
    y=section('CAMBIÁ UNA COSA','Con STOP, sostené el paso 13: quitá Mi y agregá Do. Reproducí de nuevo y compará el final. Avanzá cuando puedas cambiarlo y volver a Mi sin consultar la foto.',y)
    y=para('<b>Qué aprendiste:</b> las notas de C (Do mayor) separadas forman un arpegio; el secuenciador decide cuándo empieza y cuánto dura cada una.',y,9.5)

exercises=[
('Tres notas, una frase','6 min · 70 BPM · arpegio y acorde', [('C · Do mayor',[4,6,8])],
'Un acorde combina notas. Un arpegio presenta sus notas sucesivamente. C contiene Do, Mi y Sol: raíz, tercera y quinta.',
'1. Cantá Do-Mi-Sol-Mi y buscá esos botones.<br/>2. Tocá una nota por pulso, cuatro vueltas: Do / Mi / Sol / Mi.<br/>3. Tocá las tres juntas durante cuatro pulsos; soltá y repetí.<br/>4. Alterná un compás de arpegio y uno de acorde, cuatro veces.',
'La frase separada y el bloque tienen el mismo material. Escuchá la tercera, Mi: es parte del color mayor.',
'Grabá dos compases en la pista 4: uno separado y uno en bloque. Reproducí y cantá encima sin tocar.',
'Avanzá cuando completes cuatro alternancias sin frenar. Si cuesta, bajá a 55 BPM; si sale, inventá otro orden con las mismas notas.'),
('Una nota cambia el color','8 min · 70 BPM · inversión y conducción de voces',[('C · Do-Mi-Sol',[4,6,8]),('Am/C · Do-Mi-La',[4,6,9])],
'Am contiene La-Do-Mi. Aquí Do queda abajo: es su primera inversión, escrita Am/C. Compartir notas hace más suave el cambio.',
'1. Tocá C cuatro pulsos.<br/>2. Conservá la posición de Do y Mi; mové Sol a La. Tocá Am/C cuatro pulsos.<br/>3. Repetí ocho vueltas. Soltá y volvé a atacar cada bloque al cambiar de compás.',
'Cantá Sol-La mientras alternás los acordes. Compará el color; evitá pensar que mayor siempre significa alegre y menor siempre triste.',
'Grabá dos compases de acordes en pista 4. En pista 3 podés agregar las raíces Do y La en registro grave: eso hará más evidente la identidad de cada acorde.',
'Avanzá si anticipás el cambio sin buscar botones. Probá después dos pulsos por acorde.'),
('Tu oído dirige los dedos','8 min · 65-80 BPM · pentatónica y memoria',[('Do pentatónica · Do-Re-Mi-Sol-La',[4,5,6,8,9])],
'La pentatónica mayor tiene cinco notas. Es un vocabulario inicial, no una obligación de tocar todo el conjunto en cada frase.',
'1. Poné en loop C y Am del ejercicio 2.<br/>2. Cantá una frase de hasta cuatro notas durante dos compases.<br/>3. Encontrala en el teclado en los dos compases siguientes.<br/>4. Repetí el intercambio cinco veces; dejá al menos un pulso vacío en cada frase.',
'Si no encontrás una nota, conservá el ritmo y buscá por aproximación. Empezá cantando sólo dos notas si hace falta.',
'Usá la pista 5 para tocar sobre el loop, primero sin grabar. Grabá una sola respuesta y escuchá si se parece a lo cantado.',
'Avanzá cuando reproduzcas tres de cinco frases reconocibles. Desafío: repetí una frase empezando un pulso más tarde.'),
('Mismo motivo, otro ritmo','8 min · 75 BPM · repetición y silencio',[('Material: Mi-Sol-La',[6,8,9])],
'Un motivo es una idea breve reconocible. Cambiar su ritmo permite desarrollar una melodía sin agregar muchas notas.',
'1. Sobre el loop C-Am, tocá Mi en 1, Sol en 2 y La en 3; callá en 4.<br/>2. En la vuelta siguiente tocá Mi en 1, Sol en “y” de 2 y La en 4.<br/>3. Alterná las versiones. Contá “1 y 2 y 3 y 4 y”.',
'La segunda frase evita caer siempre en los pulsos. Conservá el silencio: no alargues todas las notas hasta la siguiente.',
'En un compás recto, programá la versión 1 en pasos 1/5/9 y la versión 2 en 1/7/13. Elegí notas cortas para que se oigan los huecos.',
'Avanzá si podés palmear ambas versiones mientras el loop sigue. Desafío: inventá una tercera conservando el orden Mi-Sol-La.'),
('La séptima abre el acorde','10 min · 65 BPM · mayor séptima',[('C · Do-Mi-Sol',[4,6,8]),('Cmaj7 · Do-Mi-Sol-Si',[4,6,8,10])],
'Cmaj7 agrega Si al acorde C. Desde Do, Si es la séptima mayor. C7 sería distinto: lleva Sib; lo usaremos en el blues.',
'1. Tocá C durante cuatro pulsos y Cmaj7 durante cuatro.<br/>2. Cantá Si antes de agregarlo.<br/>3. Arpegiá Do-Mi-Sol-Si y regresá.<br/>4. Hacé cuatro alternancias, escuchando la nota nueva.',
'Si y Do están a un semitono cuando se acercan en el registro. Esa fricción puede ser expresiva; no es un error.',
'Si cuatro notas incomodan, escribilas en un paso una por una mientras lo sostenés. El instrumento mantiene la armonía y vos podés escuchar cada voz.',
'Avanzá cuando puedas explicar y localizar la diferencia C / Cmaj7 / C7: el último cambia Si por Sib, no por La.'),
('ii-V-I con dos voces','12 min · 65-75 BPM · terceras y séptimas',[('Dm7: Do-Fa · raíz Re en el bajo',[4,7]),('G7: Si-Fa · raíz Sol en el bajo',[3,7]),('Cmaj7: Si-Mi · raíz Do en el bajo',[3,6])],
'En Do mayor, ii = Dm7, V = G7, I = Cmaj7. Las terceras y séptimas definen mucho del acorde. Estos pares necesitan el bajo para explicitar las raíces.',
'Tocá Do-Fa / Si-Fa / Si-Mi / Si-Mi: un par por compás. Repetí seis vueltas. Do baja a Si; luego Fa baja a Mi. Son movimientos de semitono.',
'Cantá primero Do-Si-Si y después Fa-Fa-Mi. Escuchá cómo cada voz tiene su pequeña melodía.',
'Loop de cuatro compases. Pista 4: los pares. Pista 3: Re / Sol / Do / Do, un registro más grave. Primero grabá el bajo; luego añadí acordes.',
'Avanzá si reconocés la llegada a Cmaj7 y podés tocar los pares sin detenerte. Este será tu acompañamiento central.'),
('Improvisar con destinos','10 min · 70 BPM · notas objetivo',[('Destinos: Fa → Si → Mi',[7,3,6])],
'Una nota objetivo es una llegada elegida. Aquí usamos la tercera de cada acorde: Fa sobre Dm7, Si sobre G7 y Mi sobre Cmaj7.',
'1. Poné el loop de cuatro compases del ejercicio 6.<br/>2. Tocá Fa / Si / Mi / silencio, una llegada al comienzo de cada compás.<br/>3. En la siguiente vuelta agregá sólo una nota antes de cada llegada.<br/>4. Terminá con dos compases de frase y dos de espacio.',
'Las llegadas deben seguir oyéndose aunque agregues notas. No hace falta recorrer toda la escala para improvisar.',
'Grabá una toma en pista 5. Escuchala con el bajo y luego sin acordes. ¿Todavía se percibe la dirección de la frase?',
'Avanzá cuando aciertes las tres llegadas en cuatro vueltas. Si cuesta, sostené cada nota todo el compás.'),
('Aproximación cromática','10 min · 65 BPM · tensión y resolución',[('Hacia Fa: Mi → Fa',[6,7]),('Hacia Si: Sib → Si',[10,('u',7)]),('Hacia Mi: Mib → Mi',[6,('u',4)])],
'Una aproximación cromática está a un semitono del destino. Aquí viene desde abajo. Sib y Mib son botones de la fila superior musical.',
'Sobre ii-V-I, tocá Mi en “y” de 4 antes de Dm7 y Fa en el 1. Antes de G7: Sib-Si. Antes de Cmaj7: Mib-Mi. Usá el Si superior en esa pareja. Practicá una sola llegada hasta que suene clara.',
'La tensión breve pide continuación. No te quedes detenido en la aproximación: resolvé en el pulso siguiente.',
'Con corcheas rectas, “y” de 4 es paso 15; el destino es paso 1 del compás siguiente. Para la primera llegada necesitás la vuelta del loop o un compás previo.',
'Avanzá si cantás tensión-resolución antes de tocar. Después usá sólo una aproximación por vuelta para evitar un efecto mecánico.'),
('Blues: tocar una forma','12 min · 75 BPM · doce compases',[('C7 sin quinta · Do-Mi-Sib',[4,6,('u',7)]),('F7 sin quinta · Fa-La-Mib',[0,2,('u',4)]),('G7 sin quinta · Sol-Si-Fa',[1,3,7])],
'Blues básico en Do: C7 C7 C7 C7 / F7 F7 C7 C7 / G7 F7 C7 C7. Son tres filas de cuatro compases; no es todavía un jazz blues con sustituciones.',
'Un acorde por compás, cuatro pulsos. Decí el número de compás en voz alta. Tocá primero sólo las raíces Do/Fa/Sol; luego los bloques marcados.',
'La llegada al compás 5 cambia a F7; el 9 va a G7. Aprendé esos puntos de referencia antes de llenar el espacio.',
'Podés practicar primero con metrónomo. Para el acompañamiento, armá tres escenas de cuatro compases que correspondan a las tres filas y ordénalas en canción (p. 17).',
'Avanzá si completás dos vueltas sin perder el compás 5 ni el 9. Los bloques omiten la quinta para caber cómodamente.'),
('Blues: pregunta y respuesta','10 min · 75 BPM · vocabulario limitado',[('Paleta inicial · Do-Mib-Fa-Sol-Sib',[4,7,8,('u',4),('u',7)])],
'Estas cinco notas forman la pentatónica menor de Do. Sobre el blues mayor, Mib contrasta con Mi: esa mezcla de colores es parte del lenguaje.',
'En los compases 1-2, tocá una pregunta de tres notas; callá en 3-4. Respondé en 5-6 con el mismo ritmo y otro final; callá en 7-8. En 9-12, repetí una idea y terminá en Do.',
'Repetir ayuda a que el oyente recuerde. Cantá la pregunta y su respuesta, como si fueran dos frases de saxo.',
'Tocá sobre el blues del ejercicio 9. Grabá una vuelta sin borrar los silencios. En otra toma, caé en Mi al volver a C7 para comparar el color con Mib.',
'Avanzá si reconocés tu motivo al escucharlo después. Extensión: añadí Solb entre Fa y Sol sólo como paso breve; no es imprescindible.'),
('Swing y una frase de oído','12 min · 75-90 BPM · escucha e imitación',[('Dos notas bastan · Do-Mi',[4,6])],
'El swing no es sólo cambiar un porcentaje: importan acentos, articulación y ubicación en el pulso. Empezá imitando una frase corta que puedas cantar.',
'1. Elegí dos segundos de un solo de jazz que te guste.<br/>2. Escuchá varias veces y cantá su ritmo.<br/>3. Tocá ese ritmo sólo con Do y Mi.<br/>4. Buscá después las alturas de oído, una a una, fuera del acompañamiento si hace falta.',
'Compará tu duración, silencios y acentos con la grabación. Buscá la semejanza del fraseo antes que la velocidad.',
'Grabá en vivo. Compará cuantización completa y menor cuantización; una corrección fuerte puede borrar parte de tu fraseo. Para comparar groove por pista, usá BAR y el encoder gris claro. [3]',
'Avanzá si otra persona podría reconocer el ritmo de la frase. Usala luego con un final propio; eso conecta transcripción y composición.'),
('Tu primera pieza','20 min · 75 BPM · motivo, contraste y forma',[('A: colores de Cmaj7 · Si-Mi',[3,6]),('B: color de Am · Do-Mi-La',[4,6,9])],
'Componé 16 compases: A (4) + A con variación (4) + B (4) + A final (4). A usa el ii-V-I del ejercicio 6; B alterna C-Am dos veces.',
'1. Inventá un motivo de tres notas para A.<br/>2. En A variada, conservá notas y cambiá ritmo.<br/>3. En B, dejá más silencios y destacá La.<br/>4. En A final, recuperá el motivo y cerrá en Do o Mi.',
'El contraste debe dejar reconocible la idea original. Si todo cambia a la vez, reducí la variación a un solo aspecto.',
'Creá una escena por sección con bajo, acordes y melodía. La pista 1 puede quedar muda: no necesitás batería para terminar. Ordená A, A variada, B, A final en canción (p. 17).',
'Terminaste cuando podés reproducir la forma completa y reconocer el motivo en tres secciones. Grabá o conservá una versión antes de seguir corrigiendo.')
]
for i,(title,sub,diagrams,concept,steps,listen,opxy,advance) in enumerate(exercises,1):
    if i==1:
        first_exercise()
        continue
    start(f'Ejercicio {i:02d} / práctica',title,sub)
    # Multiple chord photos use separate pages for generous, readable images.
    y=680
    if len(diagrams)==1:
        y=overlay(diagrams[0][0],diagrams[0][1],y)
        for label,body in [('APRENDÉ',concept),('TOCÁ',steps),('ESCUCHÁ',listen),('EN EL OP-XY',opxy),('CRITERIO DE AVANCE',advance)]:y=section(label,body,y)
    else:
        for title2,keys in diagrams:y=overlay(title2,keys,y,iw=450 if len(diagrams)==3 else 515)
        start(f'Ejercicio {i:02d} / instrucciones',title,'Usá las fotos de la página anterior como referencia de posición.')
        y=680
        for label,body in [('APRENDÉ',concept),('TOCÁ',steps),('ESCUCHÁ',listen),('EN EL OP-XY',opxy.replace('(p. 17)','(ver «De patrones a una canción»)')),('CRITERIO DE AVANCE',advance)]:y=section(label,body,y)
        y=section('REGISTRO DE PRÁCTICA','Fecha: __________________   Tempo cómodo: __________<br/><br/>Lo que escuché: __________________________________________________<br/><br/>Lo que voy a repetir: ______________________________________________',y-10)

start('Referencia / arreglo','De patrones a una canción','Un patrón pertenece a una pista; una escena reúne patrones de varias pistas. [4]')
y=680
y=section('ARMAR UNA VARIACIÓN','En ARRANGE elegí la pista. M2 copia el patrón; M1 crea uno nuevo; M3 pega. Modificá esa copia para la nueva sección. Repetí sólo en las pistas que cambian. [4]',y)
y=section('AGRUPAR Y ORDENAR','En ARRANGE, SHIFT + un botón musical superior numerado selecciona una escena. Seleccioná los patrones deseados por pista con el encoder blanco. La escena dura lo que su patrón más largo. [4]',y)
y=section('CANCIÓN','Desde ARRANGE, SHIFT + ARRANGE abre canción. Con SHIFT y los botones superiores numerados ingresás las escenas en orden. Usá un espacio de canción vacío para tu nueva forma. [4]',y)
y=section('PARA EL BLUES','Escena 1: C7 / C7 / C7 / C7.<br/>Escena 2: F7 / F7 / C7 / C7.<br/>Escena 3: G7 / F7 / C7 / C7.<br/>Cada patrón armónico dura cuatro compases a escala de pista 1. Orden: 1, 2, 3. Si hay bajo, sus cambios coinciden con los acordes.',y)
y=section('PARA LA PIEZA FINAL','Cuatro escenas de cuatro compases: A, A variada, B y A final. Ninguna pista debe alargar por accidente una sección. Escuchá primero bajo y acordes; agregá la melodía después.',y)
y=section('TU SIGUIENTE RECURSO','Duplicá una sección y modificá un solo parámetro de timbre a lo largo de ella. La automatización puede apoyar un crecimiento musical, pero la melodía y la forma deberían funcionar también sin ese efecto.',y)

start('Plan / evaluación','Una rutina que deja aprendizaje','No avances por haber leído la página: avanzá por poder escuchar y tocar lo que propone.')
y=680
for label,body in [('20 MINUTOS','3 min: cantá y buscá notas. 5 min: repasá un ejercicio conocido. 8 min: trabajá el nuevo. 4 min: grabá una toma, escuchá y anotá una mejora.'),('RUTA SUGERIDA','Bloque 1: ejercicios 1-3, orientación y oído.<br/>Bloque 2: 4-6, ritmo y armonía.<br/>Bloque 3: 7-8, improvisación con dirección.<br/>Bloque 4: 9-11, forma blues y fraseo.<br/>Cierre: ejercicio 12. Cada bloque puede llevar varias sesiones.'),('RECORDAR SIN MIRAR','Al día siguiente, probá el ejercicio durante un minuto antes de abrir la guía. Después compará con la foto. Revisitá el ejercicio tres sesiones más tarde y mezclalo con otro ya aprendido.'),('CUATRO PREGUNTAS DESPUÉS DE GRABAR','¿Seguí el pulso? ¿Sé en qué acorde o compás estoy? ¿Puedo cantar mi idea? ¿Puedo repetirla o variarla a propósito? Elegí una sola respuesta débil para la siguiente sesión.'),('CUANDO TE TRABÁS','Bajá el tempo; reducí de tres notas a dos; quitá batería; practicá sólo el cambio difícil. Volvé a poner las capas una por una. No reinicies siempre desde el primer compás.'),('CUANDO YA SALE','Transportá el ii-V-I a Fa: Gm7-C7-Fmaj7. Raíces Sol-Do-Fa; voces guía Fa-Sib → Mi-Sib → Mi-La. Encontrá primero esas notas sin velocidad y verificá que la resolución se mantenga.')]:y=section(label,body,y)

start('Fuentes / alcance','De dónde sale este cuaderno','Ejercicios originales adaptados a tu experiencia; no son un método oficial de Teenage Engineering.')
y=680
sources=[
('1. Teenage Engineering · Layout','https://teenage.engineering/guides/op-xy/layout','Disposición de teclado, controles de octava y separación del secuenciador.'),
('2. Teenage Engineering · Get started','https://teenage.engineering/guides/op-xy/get-started','Referencia a Fa como tecla más grave y al flujo inicial del instrumento.'),
('3. Teenage Engineering · Sequencer','https://teenage.engineering/guides/op-xy/sequencer','Grabación, edición, extensión de compases, cuantización y groove.'),
('4. Teenage Engineering · Arrange','https://teenage.engineering/guides/op-xy/arrange','Copias de patrones, escenas y orden de canción.'),
('5. Berklee · Basic Improvisation','https://online.berklee.edu/courses/basic-improvisation','El programa reúne blues, motivos, ritmo, transcripción y aproximaciones cromáticas; aquí se adaptan esos ejes en tareas pequeñas.'),
('6. Berklee · Contrapuntal Improvisation','https://www.berklee.edu/berklee-today/fall-2003/contrapuntal-improvisation','Terceras y séptimas como líneas de voces guía, aplicadas en el ejercicio 6.'),
('7. Jazz Tutorial · Beginner Jazz Piano Improvisation','https://jazztutorial.com/articles/beginner-jazz-piano-improvisation-lesson','ii-V-I en una tonalidad, notas de acorde y aproximación desde un semitono inferior.'),
('8. Jamey Aebersold · Quick Start Guide','https://www.jazzbooks.com/mm5/samples/V24ES.pdf','Práctica con acompañamiento y oído; el OP-XY funciona aquí como base repetible.'),
('9. Fotografía original · Teenage Engineering','https://teenage.engineering/store/op-xy','Foto oficial del OP-XY. Recorte y marcas programáticas; sin regenerar los botones.')]
for title,url,desc in sources:
    y=para(f'<b><link href="{url}" color="#227565">{title}</link></b><br/>{desc}',y,9.5)
y=para('Fuentes consultadas: septiembre de 2026. Los enlaces son clicables. Diseño basado en la estructura visual de la guía oficial, adaptado a este cuaderno personal. La versión HTML permite explorar el instrumento y editar el primer patrón. Los tiempos y criterios de avance son propuestas de práctica, no promesas de dominio.',y,9)
c.save()
# Render every page and assemble contact sheets for visual inspection.
doc=pdfium.PdfDocument(str(OUT)); thumbs=[]
for n in range(len(doc)):
    bitmap=doc[n].render(scale=1.3).to_pil().convert('RGB')
    bitmap.save(ROOT/f'work/pdf/v3-page-{n+1:02}.png')
    bitmap.thumbnail((298,421));thumbs.append(bitmap)
for group in range((len(thumbs)+7)//8):
    sheet=Image.new('RGB',(1192,842),'#aaa')
    for j,im in enumerate(thumbs[group*8:(group+1)*8]):sheet.paste(im,((j%4)*298,(j//4)*421))
    sheet.save(ROOT/f'work/pdf/v3-contact-{group+1}.png')
print(f'{len(doc)} pages | {OUT}')
