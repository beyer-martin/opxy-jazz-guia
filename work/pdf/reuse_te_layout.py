from pathlib import Path
from lxml import html,etree
from copy import deepcopy
from io import BytesIO
from PIL import Image
from quiet_photo import quiet_photo
import base64,json,re

root=Path(__file__).resolve().parents[2];assets=root/'work/pdf/te-reference'
source=html.fromstring((root/'work/pdf/reference-layout.html').read_text())
previous=(root/'outputs/opxy-jazz-guia-interactiva.html').read_text()
data=json.loads(re.search(r'<script id="data" type="application/json">(.*?)</script>',previous,re.S).group(1))
photo=quiet_photo(root/'outputs/opxy_official_reference.png');s=photo.width/1600
photo=photo.crop(tuple(round(x*s) for x in (115,550,1495,1050)));photo.thumbnail((2208,800))
bg=Image.new('RGB',photo.size,'#0f0e12');bg.paste(photo,mask=photo.getchannel('A'));buf=BytesIO();bg.save(buf,format='JPEG',quality=93)
data['photo']='data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()

# Original stylesheet files and original generated 12-column layout rules.
css='\n'.join((assets/p).read_text() for p in ['root.NRW9iUxr.css','te013.uBLyftda.css','link.vCOxmn-l.css'])
def embed_url(m):
    name=m.group(1).split('/')[-1].strip('"\'')
    p=assets/name
    if p.exists():return 'url(data:font/woff2;base64,'+base64.b64encode(p.read_bytes()).decode()+')'
    return 'url(data:,)'
css=re.sub(r'url\(([^)]+)\)',embed_url,css)
css+='\n'+next(x for x in source.xpath('//style/text()') if 'ls-12-980-' in x)
css+='\n'+source.xpath('//style/text()')[0]

# Actual DOM of the official overview: floats, responsive columns, hotspot
# rectangles, numbered callouts, icon key, and header are retained.
overview=deepcopy(source.get_element_by_id('interface-overview'))
overview.set('id','official-overview')
for span in overview.xpath('.//span'):
    if span.text=='2. layout':span.text='0. el instrumento'
for a in overview.xpath('.//a'):
    href=a.get('href','')
    if '# ' in href:continue
    if '#' in href:
        a.set('data-guide-part',href.split('#')[-1]);a.set('href','#mapa')
    else:a.set('href','#index')
    a.attrib.pop('data-discover',None)
    if a.text and a.text.strip()=='back to index':a.text='volver al índice'
translations={'main modes':'modos','modules':'módulos','tracks':'pistas','sequencer':'secuenciador','transport controls':'transporte','keyboard':'teclado','sample':'sample','projects':'proyectos','tempo':'tempo','com':'com','players':'players','bar':'bar','volume':'volumen','encoders':'encoders'}
for a in overview.xpath('.//a'):
    if a.text:
        for old,new in translations.items():a.text=a.text.replace(old,new)
# Remove the original English workflow paragraphs; lessons supply their own.
for child in list(overview):
    if 'the OP–XY workflow' in child.text_content():overview.remove(child)
# Populate the SVG placeholders that the React site normally hydrates.
svg_source=(assets/'6731e8d7f430b9ee1a804922_mono.svg').read_text()
svg=etree.fromstring(svg_source.encode());svg.set('viewBox','0 0 740 265');svg.set('width','100%');svg.set('height','100%')
clip=svg.find('.//{*}clipPath').get('id')
for g in svg.iter():
    if g.get('clip-path'):g.set('clip-path',f'url(#{clip})')
style=etree.Element('{http://www.w3.org/2000/svg}style');style.text='.f{fill:#7f7f7f}.s{stroke:#b2b2b2;stroke-width:.65}';svg.insert(0,style)
for i,div in enumerate(overview.xpath('.//div[@class="svg"]')):
    if len(div):continue
    if i==1:
        mobile=etree.fromstring((assets/'6749acddbed1d606463e548d_mono.svg').read_bytes())
        width=mobile.get('width');height=mobile.get('height')
        if not mobile.get('viewBox'):mobile.set('viewBox',f'0 0 {width} {height}')
        mobile.set('width','100%');mobile.set('height','100%')
        mobile.insert(0,deepcopy(style));div.append(mobile)
    else:div.append(deepcopy(svg))
for img in overview.xpath('.//img'):
    file=assets/img.get('src','').rsplit('/',1)[-1]
    if file.exists():img.set('src','data:image/svg+xml;base64,'+base64.b64encode(file.read_bytes()).decode())
# A single SVG owns artwork and markers. The copied site's absolute / float
# wrappers depend on its React layout runtime and cannot safely position these
# independently in this standalone document.
controls=[
 ('modos',80,110,'Elegí INSTRUMENT para trabajar con las pistas musicales.'),
 ('módulos',235,110,'M1-M4 están debajo de la pantalla. No son los botones de pista.'),
 ('pistas',485,110,'Los ocho botones bajo los encoders seleccionan la pista. Empezá por la 4.'),
 ('secuenciador',380,151,'Fila de 16 pasos: decide cuándo suenan las notas. Contá desde la izquierda.'),
 ('transporte',58,224,'RECORD, PLAY y STOP controlan la grabación y reproducción; + y - cambian la octava.'),
 ('teclado',438,230,'Las dos filas inferiores a la derecha de SHIFT son las notas. La primera es Fa.'),
 ('sample',670,32,'Abre las funciones de muestreo.'),
 ('proyectos',112,73,'Permite gestionar proyectos.'),
 ('tempo',153,73,'Ajusta velocidad, metrónomo y swing.'),
 ('com',670,73,'Acceso a configuración y conexiones.'),
 ('players',670,113,'Efectos de notas, como arpegios. Desactivalos para los primeros ejercicios.'),
 ('bar',670,154,'Extensión y parámetros temporales del patrón.'),
 ('volumen',112,33,'Control de volumen general.'),
 ('encoders',525,50,'Cuatro controles giratorios para editar los parámetros de la pantalla.')]
NS='http://www.w3.org/2000/svg'
svg.set('class','control-map-svg');svg.set('role','img');svg.set('aria-label','Mapa de los 14 controles del OP-XY');svg.set('preserveAspectRatio','xMidYMid meet')
for n,(label,x,y,description) in enumerate(controls,1):
    a=etree.SubElement(svg,'{'+NS+'}a',href='#control-description',attrib={'data-control':str(n),'aria-label':str(n)+'. '+label})
    etree.SubElement(a,'{'+NS+'}circle',cx=str(x),cy=str(y),r='8',attrib={'class':'control-pin'})
    t=etree.SubElement(a,'{'+NS+'}text',x=str(x),y=str(y+3),attrib={'class':'control-pin-text'});t.text=str(n)
legend=''.join(f'<button type="button" data-control="{n}" aria-pressed="false"><span>{n:02}</span>{label}</button>' for n,(label,*_) in enumerate(controls,1))
official='<section id="official-overview" class="control-overview"><div class="control-heading"><h2>0. mapa de controles</h2><a href="#index">volver al índice ↑</a></div><div class="control-map-frame">'+etree.tostring(svg,encoding='unicode')+'</div><div class="control-legend">'+legend+'</div><p id="control-description" role="status">Elegí un número del dibujo o de la lista para identificar el control.</p></section>'

# The route bundle contains the viewport visibility predicate below. Retain
# its exact implementation and use it to stop sound after leaving the trainer.
route=(assets/'te013.DxRvs9i9.js').read_text()
predicate=re.search(r'function Qr\(e\)\{[^}]+\}',route).group(0)
original_css=previous.split('<style>',1)[1].split('</style>',1)[0]
overrides='''
:root{--paper:#0f0e12;--ink:#b2b2b2;--muted:#949494;--line:#3f3e43;--accent:#e5e5e5;--client-width:min(100vw,1180px)}
html,body{background:#0f0e12!important;color:#b2b2b2;font-family:te-20,Arial,sans-serif;font-weight:100}
header{border:0;padding-top:35px}header span{font-family:te-40,sans-serif;font-weight:100;font-size:18px}
.wrap{max-width:1180px;padding:0 54px}.original-layout{max-width:1180px;margin:0 -54px}.page.original-layout{overflow:visible;display:flow-root}
.original-layout .svg{width:100%;height:100%}.original-layout .svg svg{display:block}
.original-layout .cond.desktop{display:block}.original-layout .cond.mobile{display:none}
.original-layout .box>div.svg{position:relative}.original-layout a:hover{color:#fff}
h1{font-family:te-40,sans-serif;font-weight:100;font-size:44px;line-height:1.15;letter-spacing:0;margin:75px 0 35px}
h2{font-family:te-40,sans-serif;font-size:40px;font-weight:100;letter-spacing:0;margin-bottom:35px}
h3,.diagram-title{font-family:te-40,sans-serif;font-weight:100;font-size:24px}.intro{font-size:20px;max-width:590px}
p{font-weight:100;line-height:1.3}b,strong{font-weight:300}button,input,select{font-family:te-20,Arial,sans-serif;font-weight:300;color:#b2b2b2;background:#0f0e12;border:1px solid #68676b;border-radius:0}
button:hover,button:focus-visible{background:#29282d;color:#e5e5e5}button[aria-pressed=true]{background:#b2b2b2;color:#0f0e12}
.index{grid-template-columns:repeat(4,1fr);gap:0 24px;padding:25px 0 60px}.index a{border:0;padding:5px 0;font-size:17px;text-decoration:underline}
section{border:0;padding:60px 0 75px}.row{grid-template-columns:1fr 3fr;border:0;padding:22px 0;gap:35px}.row h3{color:#b2b2b2;font-size:21px}.row>div{max-width:720px}.eyebrow{font-size:15px;letter-spacing:0}
.note-label{fill:#b2b2b2;font-family:te-20,Arial,sans-serif}.leader{stroke:#b2b2b2}.note-ring{stroke:#e5e5e5;stroke-width:3}
.assignment{border:0}.assignment div{padding:12px 18px 12px 0}.assignment b{font-family:te-40;font-size:36px}.assignment span{font-size:18px}.selected{color:#e5e5e5}
.toolbar input{background:#0f0e12}.cell{border-color:#55545a}.cell.active{background:#b2b2b2;color:#0f0e12}.cell strong{color:#949494}.cell.active strong{color:#3c3c3c}.cell.current{box-shadow:inset 0 -4px #e84235}
.trainer{border-color:#55545a}.trainer p{max-width:720px}.tip{border-left:1px solid #b2b2b2}.stop-all{background:#252429}.static-grid td,.static-grid th{border-color:#48474c}.source{font-size:16px}
.guidecols{display:grid;grid-template-columns:1fr 1fr;gap:40px}.guidecols p{font-size:18px}.guidecols .row{display:block;padding-top:12px}.guidecols .row h3{margin-bottom:18px}
@media(max-width:767px){:root{--client-width:100vw}.wrap{padding:0 24px}.original-layout{margin:0 -24px}.original-layout .cond.desktop{display:none}.original-layout .cond.mobile{display:block}.index{grid-template-columns:1fr 1fr}.row,.guidecols{display:block}.row h3{margin-bottom:14px}h2{font-size:31px}h1{font-size:36px}.original-layout .box .box svg{max-width:100%}}
@media print{html,body{background:#fff!important;color:#222!important}.original-layout{display:none}.note-label{fill:#222}.leader{stroke:#444}.wrap{padding:0}button{display:none}.row{grid-template-columns:120px 1fr}h2,h3,.row h3{color:#222}.index{display:none}}
#index.index{display:block;padding:35px 0 65px;scroll-margin-top:28px}
#index .toc-heading{margin-bottom:32px}#index .toc-heading h2{font-size:28px;margin:0 0 10px}#index .toc-heading p{font-size:15px;margin:0;color:#949494}
#index .toc-columns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:65px}
#index .toc-column{min-width:0}#index .toc-group{margin:0 0 30px}#index .toc-group h3{font-family:te-20,Arial,sans-serif;font-size:14px;font-weight:300;line-height:1.4;margin:0 0 7px;color:#949494}
#index a.toc-link{display:grid;grid-template-columns:32px minmax(0,1fr) 16px;gap:12px;align-items:baseline;padding:10px 0;border:0;border-top:1px solid #343338;text-decoration:none;font-size:19px;line-height:1.28;color:#b2b2b2}
#index .toc-number{font-variant-numeric:tabular-nums;color:#85848b;font-size:15px}#index .toc-title{overflow-wrap:break-word}#index .toc-arrow{font-size:15px;color:#68676f;text-align:right}
#index a.toc-link:hover{color:#fff}#index a.toc-link:hover .toc-arrow{color:#fff}#index a.toc-link:focus-visible{outline:1px solid #eee;outline-offset:4px}
@media(max-width:767px){#index .toc-columns{grid-template-columns:1fr}#index a.toc-link{font-size:18px}#index.index{padding-top:24px;padding-bottom:35px}}
@media print{#index.index{display:none}}
.control-overview{position:relative;clear:both;width:100%;max-width:100%;margin:0;padding:50px 0 20px;overflow:hidden}
.control-heading{display:flex;justify-content:space-between;align-items:baseline;gap:20px;flex-wrap:wrap}.control-heading h2{margin-bottom:28px}.control-heading a{font-size:16px;white-space:nowrap}
.control-map-frame{position:relative;width:100%;margin:16px 0 30px;aspect-ratio:740/265}
.control-map-frame>.control-map-svg{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:100%;overflow:hidden}
.control-map-svg .control-pin{fill:#e5e5e5;stroke:#0f0e12;stroke-width:1}.control-map-svg .control-pin-text{fill:#0f0e12;font-family:te-20,Arial,sans-serif;font-size:9px;font-weight:300;text-anchor:middle;pointer-events:none}
.control-map-svg a:hover .control-pin,.control-map-svg a:focus .control-pin,.control-map-svg a.selected .control-pin{fill:#ff6559}
.control-legend{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 30px;width:100%;margin:0 0 22px}
.control-legend button{display:flex;gap:14px;align-items:baseline;text-align:left;border:0;border-top:1px solid #333239;padding:11px 0;font-size:18px;line-height:1.3;min-width:0;background:transparent;color:#b2b2b2}
.control-legend button span{font-size:14px;font-variant-numeric:tabular-nums;color:#85848c;min-width:22px}
.control-legend button:hover,.control-legend button[aria-pressed=true]{color:#fff;background:transparent}.control-legend button[aria-pressed=true] span{color:#ff6559}
#control-description{font-size:17px;line-height:1.4;min-height:65px;max-width:800px;margin:0;padding:14px 0;border-top:1px solid #555}
@media(max-width:767px){.control-legend{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 20px}.control-legend button{font-size:16px}.control-heading h2{font-size:28px}.control-map-svg .control-pin{r:10}.control-map-svg .control-pin-text{font-size:11px}}
'''
out=previous.replace('<style>'+original_css+'</style>','<style data-origin="teenage.engineering/original-css">'+css+'</style><style>'+original_css+overrides+(root/'work/pdf/lesson_lab.css').read_text()+'</style>')
out=re.sub(r'<h1>.*?</h1>','<h1>OP–XY<br>composición y jazz.</h1>',out,count=1,flags=re.S)
out=out.replace('<section id="mapa">',official+'<section id="mapa">',1)
out=out.replace('<script id="data" type="application/json">'+re.search(r'<script id="data" type="application/json">(.*?)</script>',previous,re.S).group(1)+'</script>','<script id="data" type="application/json">'+json.dumps(data,ensure_ascii=False).replace('</','<\\/')+'</script>')
out=out.replace("'use strict';","'use strict';\n"+predicate,1)
# Audio is now owned by the per-lesson simulator. Do not inject the obsolete
# single-trainer #seq visibility guard into its playback scheduler.
# Pair compact paragraphs like the reference instead of stacking boxed cards.
out=out.replace("${rows(n===1?'programá':'tocá y escuchá',steps)}${rows('en el secuenciador',opxy.replace", "<div class=\"guidecols\">${rows(n===1?'programá':'tocá y escuchá',steps)}${rows('en el secuenciador',opxy.replace")
out=out.replace("</a>)'))}${rows('compará',listen)}", "</a>)'))}</div><div class=\"guidecols\">${rows('compará',listen)}")
out=out.replace("${rows('cuándo avanzar',advance)}<label", "${rows('cuándo avanzar',advance)}</div><label")
extra='const CONTROL_DESCRIPTIONS='+json.dumps([q[3] for q in controls],ensure_ascii=False)+''';
document.querySelectorAll('[data-control]').forEach(el=>el.addEventListener('click',event=>{
event.preventDefault();const n=Number(el.dataset.control);
document.querySelectorAll('[data-control]').forEach(other=>{const selected=Number(other.dataset.control)===n;other.classList.toggle('selected',selected);if(other.tagName.toLowerCase()==='button')other.setAttribute('aria-pressed',selected)});
document.getElementById('control-description').textContent=CONTROL_DESCRIPTIONS[n-1];
}));
'''
out=out.replace('\n</script>\n</html>',extra+'\n</script>\n</html>')
out=out.replace('La estructura visual toma como referencia la guía oficial; este cuaderno no es una publicación de Teenage Engineering.','Se reutilizan el HTML de su vista general, sus hojas CSS, fuentes y dibujo vectorial, además de una función de visibilidad del JavaScript original. El secuenciador didáctico es propio. Este cuaderno no es una publicación de Teenage Engineering.')
(root/'outputs/opxy-jazz-guia-estilo-original.html').write_text(out)
print('Manual rebuilt using original HTML, CSS, four font files, overview SVG, and viewport JS.')
