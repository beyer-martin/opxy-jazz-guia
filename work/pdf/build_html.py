import ast,base64,json
from pathlib import Path
from io import BytesIO
from PIL import Image
from quiet_photo import quiet_photo
root=Path(__file__).resolve().parents[2]
tree=ast.parse((root/'work/pdf/guia_v2.py').read_text())
values={}
for node in tree.body:
    if isinstance(node,ast.Assign):
        for t in node.targets:
            if isinstance(t,ast.Name) and t.id in ['exercises','sources','REWRITES']:
                values[t.id]=ast.literal_eval(node.value)
def change(v):
    if isinstance(v,str):
        for a,b in values['REWRITES'].items():v=v.replace(a,b)
        return v
    if isinstance(v,(list,tuple)):return [change(x) for x in v]
    return v
im=quiet_photo(root/'outputs/opxy_official_reference.png');s=im.width/1600
im=im.crop(tuple(round(x*s) for x in (115,550,1495,1050)))
im.thumbnail((2208,800));bg=Image.new('RGB',im.size,'#e5e5e5');bg.paste(im,mask=im.getchannel('A'))
buf=BytesIO();bg.save(buf,format='JPEG',quality=92)
data={'exercises':change(values['exercises']),'sources':values['sources'],'photo':'data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()}
html=(root/'work/pdf/manual.html').read_text().replace('__DATA__',json.dumps(data,ensure_ascii=False).replace('</','<\\/'))
html=html.replace('/*LEARNING_SUPPORT*/',(root/'work/pdf/learning_support.js').read_text())
html=html.replace('</style>','\n'+(root/'work/pdf/learning.css').read_text()+'\n</style>',1)
start=html.index("document.getElementById('lessons').innerHTML=")
end=html.index('</script>',start)
html=html[:start]+(root/'work/pdf/curriculum.js').read_text()+'\n'+(root/'work/pdf/deep_curriculum.js').read_text()+'\n'+(root/'work/pdf/lesson_lab.js').read_text()+'\n'+html[end:]
html=html.replace('</style>','\n'+(root/'work/pdf/lesson_lab.css').read_text()+'\n</style>',1)
html=html.replace('<div class="row"><h3>patrón → escena → canción</h3>', '''<div id="project-workflow" class="row"><h3>proyecto y guardado</h3><div><p>Antes de empezar otro proyecto, guardá tu trabajo: en PROJECT, M2 crea una versión. No dependas del auto save, porque puede estar desactivado.</p><p>Para trabajar desde cero: en PROJECT mantené M1. Para conservar una base y seguir en una copia: desde PROJECT, SHIFT + M2 (Save as), y escribí otro nombre. Usá JAZZ-01 a JAZZ-12 para reconocer tus ejercicios.</p><p>ARRANGE organiza el contenido; PROJECT lo guarda. El simulador de esta página no escribe en tu equipo.</p><p><a href="https://teenage.engineering/guides/op-xy/project" target="_blank" rel="noopener">Manual oficial: PROJECT ↗</a></p></div></div><div class="row"><h3>patrón → escena → canción</h3>''')
html=html.replace('En ARRANGE, SHIFT + un botón musical superior numerado selecciona la escena.', 'En ARRANGE, SHIFT + un botón musical superior numerado selecciona la escena. Una escena vacía copia la selección actual: para variar sin cambiar la base, creá copias independientes de los patrones que vas a editar.')
html=html.replace('<div id="lessons"></div>', '''<section id="bar-workflow"><div class="eyebrow">00 / preparación del secuenciador</div><h2>BAR: cuánto dura tu patrón.</h2><p>BAR está a la derecha del paso 16. No es una nota ni un paso adicional. La tabla de cada ejercicio indica la configuración de sus pistas y patrones.</p><ol class="instruction"><li><b>STOP y pista.</b> Seleccioná la pista y el patrón que vas a preparar; trabajá en una copia.</li><li><b>Escala 1.</b> Mantené BAR y seleccioná la escala con las teclas musicales superiores. Confirmá el valor 1 en pantalla: aquí un paso equivale a una semicorchea.</li><li><b>Compases.</b> Con BAR sostenido, + agrega y − quita. Desde un compás, una pulsación de + da dos; tres dan cuatro. Revisá antes de quitar compases que contengan material.</li><li><b>Final completo.</b> BAR + paso 16 deja completo el último compás. No lo confundas con mantener el paso 16 solo.</li><li><b>Compás visible.</b> Con el transporte detenido, tocá BAR para cambiar de compás. Hacerlo durante reproducción puede aislar el compás elegido.</li></ol><p><b>Otra cosa es cuánto dura una nota:</b> sostené su paso inicial y pulsá el paso final. Ejemplo: 1 + 4 da cuatro pasos; 1 + 16, un compás. Usá longitud completa, sin solapamiento.</p><p><a href="https://teenage.engineering/guides/op-xy/sequencer" target="_blank" rel="noopener">Manual oficial · sección 7.4, BAR ↗</a> · <a href="#e1">ir al ejercicio 1 →</a></p></section><div id="lessons"></div>''')
assert '__DATA__' not in html
html=html.replace('12 ejercicios · a tu ritmo · sin ejercicios de canto','6 bloques · 12 talleres · una creación propia en cada taller · sin ejercicios de canto')
html=html.replace('Ruta sugerida: 1-3 orientación y oído; 4-6 ritmo y armonía; 7-8 notas objetivo; 9-11 blues y fraseo; 12 composición. Repetí cada bloque tantas sesiones como necesites.','Ruta: 1–2 ritmo y espacio; 3–4 melodía; 5–6 armonía; 7–8 dirección; 9–10 lenguaje jazz; 11–12 desarrollo y forma. Volvé a una idea anterior después de una pausa y aplicá el recurso a material nuevo. No es una carrera de casillas: el objetivo es tomar decisiones musicales sin depender del modelo.')
(root/'outputs/opxy-jazz-guia-interactiva.html').write_text(html)
print('HTML autónomo generado:',len(html),'caracteres')
