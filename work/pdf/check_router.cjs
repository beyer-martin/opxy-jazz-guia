const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync('work/pdf/lesson_lab.js','utf8');
const code=src.match(/function coursePages\(\)[\s\S]*?function routeCourse\(\)[\s\S]*?\n(?=if\(document\.body\))/)[0];
const pages=[...Array.from({length:16},(_,i)=>`e${i+1}`),'bar-workflow','official-overview','arreglo','rutina','fuentes','ruta-16h'].map(id=>({id,hidden:false,contains(node){return node===this||node?.owner===this}}));
const byId=new Map(pages.map(x=>[x.id,x]));const mapa={id:'mapa',owner:byId.get('official-overview')},nested={id:'nested',owner:byId.get('e7')};byId.set('mapa',mapa);byId.set('nested',nested);const index={hidden:false};let halts=0;
const document={body:{},querySelectorAll(q){assert.equal(q,'.lesson');return pages.filter(x=>/^e\d+$/.test(x.id))},getElementById(id){return id==='index'?index:byId.get(id)||null}};
const box={document,location:{hash:''},audioRun:null,halt(){halts++}};vm.createContext(box);vm.runInContext(code,box);
function visible(){return pages.filter(x=>!x.hidden).map(x=>x.id)}function route(hash){box.location.hash=hash;box.routeCourse()}
for(const hash of ['', '#index','#invalid']){route(hash);assert.equal(index.hidden,false,hash);assert.deepEqual(visible(),[],hash)}
for(let n=1;n<=16;n++){route(`#e${n}`);assert.equal(index.hidden,true);assert.deepEqual(visible(),[`e${n}`])}
for(const id of ['bar-workflow','official-overview','arreglo','rutina','fuentes','ruta-16h']){route(`#${id}`);assert.deepEqual(visible(),[id])}
route('#mapa');assert.deepEqual(visible(),['official-overview']);route('#nested');assert.deepEqual(visible(),['e7']);
const sentinel=byId.get('e7');route('#e7');assert.strictEqual(byId.get('e7'),sentinel,'navegar no recrea la página ni C');box.audioRun=3;route('#e8');assert.equal(halts,1,'cambio de página detiene audio');
box.audioRun=3;route('#index');assert.equal(halts,2,'volver al índice detiene audio oculto');box.audioRun=3;route('#invalid');assert.equal(halts,3,'hash inválido tampoco deja audio oculto');
console.log(`PASS router: ${pages.length} páginas, índice/hash inválido, 16 talleres, 6 referencias, anclas internas, identidad y halt.`);
