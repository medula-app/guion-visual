const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/mundo.48dy5kwR.js","_astro/react.nYwdmC-a.js","_astro/lenis.DFyoXoXe.js","_astro/three.Dn5Vx_1g.js","_astro/capitulos.C0oQAB4r.js","_astro/aura.BtZR5dys.js"])))=>i.map(i=>d[i]);
import{t as e}from"./react.nYwdmC-a.js";import{t}from"./react-dom.q8N1F7SK.js";import{t as n}from"./jsx-runtime.hGNRxWI7.js";import{n as r,r as i,t as a}from"./lenis.DFyoXoXe.js";import{E as o,L as s,N as c,O as l,P as u,_ as d,a as f,k as p,l as m,m as h,o as g,s as _,w as v,x as y,y as b}from"./three.Dn5Vx_1g.js";import{i as x,r as S,s as C,t as w,u as T}from"./capitulos.C0oQAB4r.js";var E=e(),D=t(),O=`
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`,k=`
  uniform float uTiempo;
  uniform float uEnergia;
  uniform float uGiro;
  uniform float uContraccion;
  uniform float uOnda;
  uniform float uPixel;
`,A=`
  vec3 desplazar(vec3 base, float semilla) {
    vec3 dir = normalize(base);
    float t = uTiempo;
    // remolino: al pensar, cada latitud gira a distinta velocidad
    float ang = uGiro * (0.6 + 0.8 * sin(dir.y * 3.0 + t * 0.7)) * t * 0.35;
    float c = cos(ang), s = sin(ang);
    dir = vec3(c * dir.x - s * dir.z, dir.y, s * dir.x + c * dir.z);
    float n = snoise(dir * 1.7 + vec3(0.0, t * 0.22, t * 0.1));
    // ola que sale desde el frente después de cada evento
    float frente = dir.z * 0.5 + 0.5;
    float ola = sin(frente * 10.0 - uOnda * 9.0) * exp(-uOnda * 1.2) * step(0.0, uOnda) * smoothstep(0.0, 0.25, uOnda + 0.001);
    float r = length(base) * uContraccion * (1.0 + n * (0.035 + uEnergia * 0.2) + ola * 0.06);
    r += (semilla - 0.5) * 0.04;
    return dir * r;
  }
`,ee=`
  ${k}
  attribute float aSemilla;
  varying float vBrillo;
  varying float vFrente;
  varying vec3 vDir;
  ${O}
  ${A}
  void main() {
    vec3 p = desplazar(position, aSemilla);
    vDir = normalize(position);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFrente = normalize((modelViewMatrix * vec4(normalize(p), 0.0)).xyz).z;
    // centelleo: cada punto a su ritmo; las "estrellas" son pocas y brillan más
    float estrella = step(0.965, aSemilla);
    vBrillo = (0.55 + 0.45 * sin(uTiempo * (1.2 + aSemilla * 2.0) + aSemilla * 60.0)) * (1.0 + estrella * 1.6);
    float tam = (1.6 + aSemilla * 2.4 + estrella * 4.5) * (1.0 + uEnergia * 0.7);
    gl_PointSize = tam * uPixel * (3.2 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,te=`
  uniform vec3 uCian;
  uniform vec3 uAzul;
  uniform vec3 uVioleta;
  uniform vec3 uTinte;
  uniform float uMezclaTinte;
  uniform float uEnergia;
  varying float vBrillo;
  varying float vFrente;
  varying vec3 vDir;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float disco = smoothstep(0.5, 0.0, d);
    float nucleo = smoothstep(0.18, 0.0, d);
    vec3 col = mix(uAzul, uCian, vDir.y * 0.5 + 0.5);
    col = mix(col, uVioleta, smoothstep(0.2, 0.9, vDir.x * 0.5 + 0.5) * 0.55);
    col = mix(col, uTinte, uMezclaTinte);
    // los puntos del otro lado de la esfera se ven más tenues
    float lado = mix(0.28, 1.0, smoothstep(-0.6, 0.5, vFrente));
    float a = (disco * 0.7 + nucleo * 1.0) * vBrillo * lado * (0.85 + uEnergia * 0.6);
    gl_FragColor = vec4(col * (1.0 + nucleo * 0.8), a);
  }
`,ne=`
  ${k}
  attribute float aSemilla;
  varying float vAlfa;
  varying float vFrente;
  ${O}
  ${A}
  void main() {
    vec3 p = desplazar(position, aSemilla);
    vFrente = normalize((modelViewMatrix * vec4(normalize(p), 0.0)).xyz).z;
    vAlfa = 0.5 + 0.5 * sin(uTiempo * 1.5 + aSemilla * 40.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,re=`
  uniform vec3 uAzul;
  uniform vec3 uTinte;
  uniform float uMezclaTinte;
  uniform float uEnergia;
  uniform float uGiro;
  varying float vAlfa;
  varying float vFrente;
  void main() {
    float lado = mix(0.15, 1.0, smoothstep(-0.5, 0.6, vFrente));
    vec3 col = mix(uAzul * 1.3, uTinte, uMezclaTinte);
    gl_FragColor = vec4(col, (0.05 + uEnergia * 0.16 + uGiro * 0.08) * vAlfa * lado);
  }
`,ie=`
  ${k}
  uniform float uCapa;
  varying vec3 vNormal;
  varying vec3 vVista;
  varying vec3 vDir;
  varying float vRuido;
  ${O}
  void main() {
    vec3 dir = normalize(position);
    float t = uTiempo * (0.35 + uCapa * 0.15) * (1.0 + uGiro * 1.5);
    float n = snoise(dir * (0.75 + uCapa * 0.22) + vec3(t, t * 0.7 + uCapa * 3.0, -t * 0.5));
    vRuido = n;
    float amp = 0.05 + uEnergia * 0.16;
    vec3 p = position * uContraccion * (1.0 + n * amp);
    vDir = dir;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vVista = -mv.xyz;
    vNormal = normalize(normalMatrix * normalize(position + dir * n * amp));
    gl_Position = projectionMatrix * mv;
  }
`,ae=`
  uniform float uTiempo;
  uniform float uEnergia;
  uniform float uCapa;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uTinte;
  uniform float uMezclaTinte;
  uniform float uIntensidad;
  varying vec3 vNormal;
  varying vec3 vVista;
  varying vec3 vDir;
  varying float vRuido;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vVista);
    float ndv = abs(dot(n, v));
    // se ve más en el borde (velo) y en las crestas del ruido (cintas de luz)
    float borde = pow(1.0 - ndv, 1.6);
    float cinta = smoothstep(-0.1, 0.8, vRuido) * 0.55;
    vec3 col = mix(uColorA, uColorB, vRuido * 0.5 + 0.5);
    col = mix(col, uTinte, uMezclaTinte * 0.8);
    float a = (borde * 0.75 + cinta * 0.5) * uIntensidad * (0.7 + uEnergia * 0.8);
    gl_FragColor = vec4(col, a);
  }
`,oe=`
  varying vec3 vNormal;
  varying vec3 vVista;
  varying vec3 vDir;
  varying float vRuido;
  void main() {
    vDir = normalize(position);
    vRuido = 0.0;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vVista = -mv.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`,se=`
  uniform float uEnergia;
  uniform vec3 uTinte;
  uniform float uMezclaTinte;
  varying vec3 vNormal;
  varying vec3 vVista;
  varying vec3 vDir;
  varying float vRuido;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vVista);
    float ndv = max(dot(n, v), 0.0);
    float filo = pow(1.0 - ndv, 4.0);
    float brillo = pow(max(dot(n, normalize(vec3(-0.35, 0.6, 0.72))), 0.0), 60.0);
    vec3 col = mix(vec3(0.62, 0.8, 1.0), uTinte, uMezclaTinte * 0.6);
    gl_FragColor = vec4(col, filo * (0.35 + uEnergia * 0.3) + brillo * 0.35);
  }
`,ce=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,le=`
  uniform float uEnergia;
  uniform float uFlash;
  uniform vec3 uAzul;
  uniform vec3 uTinte;
  uniform float uMezclaTinte;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float halo = exp(-d * d * 3.2) * (0.22 + uEnergia * 0.35);
    // anillo de destello que se expande tras un evento
    float anillo = exp(-pow((d - uFlash * 0.9) * 9.0, 2.0)) * (1.0 - uFlash) * step(0.001, uFlash);
    vec3 col = mix(uAzul, uTinte, uMezclaTinte);
    gl_FragColor = vec4(col, halo + anillo * 0.6);
  }
`,ue={reposo:{energia:.12,giro:0,contraccion:1,tinte:0},escuchando:{energia:.3,giro:0,contraccion:.93,tinte:0},pensando:{energia:.45,giro:1,contraccion:.88,tinte:.55},hablando:{energia:.35,giro:.15,contraccion:1.02,tinte:.15}},j={cian:`#6fe3ff`,azul:`#1b75fd`,violeta:`#7d5cff`,pensar:`#9b7bff`,exito:`#7ef0ff`,error:`#ff6a5c`},M=e=>new m(e);function de(e,t){let n=[],r=Math.PI*(3-Math.sqrt(5));for(let i=0;i<e;i++){let a=1-i/(e-1)*2,o=Math.sqrt(1-a*a),c=r*i;n.push(new s(Math.cos(c)*o*t,a*t,Math.sin(c)*o*t))}return n}function N(e,t={}){let n=t.puntos??9e3,i=matchMedia(`(prefers-reduced-motion: reduce)`).matches,a=new f({canvas:e,alpha:!0,antialias:!0,premultipliedAlpha:!1}),m=Math.min(devicePixelRatio,1.75);a.setPixelRatio(m),a.setClearColor(0,0);let x=new c,S=new o(32,1,.1,50);S.position.set(0,0,t.distancia??4.6);let C=new d;x.add(C);let w={uTiempo:{value:0},uEnergia:{value:.12},uGiro:{value:0},uContraccion:{value:1},uOnda:{value:-1},uPixel:{value:m},uFlash:{value:0},uCian:{value:M(j.cian)},uAzul:{value:M(j.azul)},uVioleta:{value:M(j.violeta)},uTinte:{value:M(j.pensar)},uMezclaTinte:{value:0}},T={transparent:!0,depthWrite:!1,blending:2},E=de(n,1),D=new Float32Array(n*3),O=new Float32Array(n);E.forEach((e,t)=>{let n=new s((Math.random()-.5)*.05,(Math.random()-.5)*.05,(Math.random()-.5)*.05),r=e.clone().add(n).normalize().multiplyScalar(1+(Math.random()-.5)*.05);D.set([r.x,r.y,r.z],t*3),O[t]=Math.random()});let k=new _;k.setAttribute(`position`,new g(D,3)),k.setAttribute(`aSemilla`,new g(O,1));let A=new u({vertexShader:ee,fragmentShader:te,uniforms:w,...T});C.add(new p(k,A));let N=null,P=null;if(t.lineas!==!1){let e=[];for(let t=0;t<n;t+=3)e.push(t);let t=[],r=[],i=new s;for(let n of e){let a=new s(D[n*3],D[n*3+1],D[n*3+2]),o=0;for(let s of e)s<=n||o>=2||(i.set(D[s*3],D[s*3+1],D[s*3+2]),a.distanceTo(i)<.085&&Math.random()<.55&&(t.push(a.x,a.y,a.z,i.x,i.y,i.z),r.push(O[n],O[n]),o++))}N=new _,N.setAttribute(`position`,new h(t,3)),N.setAttribute(`aSemilla`,new h(r,1)),P=new u({vertexShader:ne,fragmentShader:re,uniforms:w,...T}),C.add(new y(N,P))}let fe=new b(1,24),F=[{r:.34,a:`#1b75fd`,b:`#8ff0ff`,i:.42},{r:.46,a:`#3b3dff`,b:`#2f8bff`,i:.3},{r:.58,a:`#7d5cff`,b:`#1b75fd`,i:.2}].map((e,t)=>{let n=new u({vertexShader:ie,fragmentShader:ae,uniforms:{...w,uCapa:{value:t},uColorA:{value:M(e.a)},uColorB:{value:M(e.b)},uIntensidad:{value:e.i}},...T,side:2}),r=new v(fe,n);return r.scale.setScalar(e.r),r.rotation.set(t*.7,t*1.3,0),C.add(r),{m:n,malla:r}}),I=new u({vertexShader:oe,fragmentShader:se,uniforms:w,...T}),L=new v(new b(1.1,16),I);C.add(L);let R=new u({vertexShader:ce,fragmentShader:le,uniforms:w,...T}),z=new v(new l(4.2,4.2),R);z.position.z=-1.4,x.add(z);let B=`reposo`,V=0,H={energia:.12,vEnergia:0,giro:0,contraccion:1,vContraccion:0,tinte:0},U=M(j.pensar),W=0,G=-1,K=0,q={x:0,y:0,ix:0,iy:0,vx:0,vy:0},J=()=>{let{clientWidth:t,clientHeight:n}=e;t&&n&&(a.setSize(t,n,!1),S.aspect=t/n,S.updateProjectionMatrix())},Y=new ResizeObserver(J);Y.observe(e),J();let pe=!0,me=new IntersectionObserver(([e])=>pe=e.isIntersecting);me.observe(e);let he=t.fps??60,X=0,Z=0,ge=performance.now(),_e=e=>{Z=requestAnimationFrame(_e);let t=Math.min(.05,(e-ge)/1e3);if(ge=e,!pe||(X+=t,X<1/he-.002))return;let n=Math.min(.05,X);X=0;let r=ue[B],o=Math.min(1,r.energia+V*.8);H.vEnergia+=((o-H.energia)*90-H.vEnergia*14)*n,H.energia+=H.vEnergia*n,H.giro+=(r.giro-H.giro)*Math.min(1,n*2.5),H.vContraccion+=((r.contraccion-H.contraccion)*60-H.vContraccion*9)*n,H.contraccion+=H.vContraccion*n,K=Math.max(0,K-n*.8),H.tinte+=(Math.max(r.tinte,K)-H.tinte)*Math.min(1,n*3),K<=0&&B===`pensando`&&(U=M(j.pensar)),W=W>0?Math.min(1,W+n*.9):0,W>=1&&(W=0),G>=0&&(G+=n),G>4&&(G=-1),w.uTiempo.value+=i?0:n,w.uEnergia.value=Math.max(0,H.energia),w.uGiro.value=H.giro,w.uContraccion.value=H.contraccion,w.uOnda.value=G,w.uFlash.value=W,w.uMezclaTinte.value=H.tinte,w.uTinte.value.copy(U),q.vx+=((q.x-q.ix)*40-q.vx*10)*n,q.vy+=((q.y-q.iy)*40-q.vy*10)*n,q.ix+=q.vx*n,q.iy+=q.vy*n,i||(C.rotation.y+=n*(.08+H.giro*.5)),C.rotation.x=q.iy*.35,C.rotation.z=-q.ix*.15,F.forEach(({malla:e},t)=>{i||(e.rotation.y+=n*(.1+t*.06)*(t%2?-1:1))}),a.render(x,S)};return Z=requestAnimationFrame(_e),{estado(e){B=e,e===`pensando`&&(U=M(j.pensar))},nivel(e){V=Math.max(0,Math.min(1,e))},puntero(e,t){q.x=e,q.y=t},pulso(e){if(e===`tecleo`){H.vEnergia+=1.4;return}G=0,W=.001,H.vEnergia+=e===`error`?3:2.2,U=M(e===`error`?j.error:j.exito),K=1,e===`error`&&(H.vContraccion-=1.5)},destruir(){cancelAnimationFrame(Z),Y.disconnect(),me.disconnect(),k.dispose(),A.dispose(),N?.dispose(),P?.dispose(),fe.dispose(),F.forEach(({m:e})=>e.dispose()),L.geometry.dispose(),I.dispose(),z.geometry.dispose(),R.dispose(),a.dispose(),r(a)}}}var P=n();function fe({className:e,opciones:t,alListo:n}){let r=(0,E.useRef)(null),a=(0,E.useRef)(n);a.current=n;let o=(0,E.useRef)(null),s=i(o),[c,l]=(0,E.useState)(0);return(0,E.useEffect)(()=>{s||l(e=>e+1)},[s]),(0,E.useEffect)(()=>{if(!s)return;let e=r.current,n=N(e,t),i=a.current?.(n),o=null,c=0,l=t=>{o=t,!c&&(c=requestAnimationFrame(()=>{if(c=0,!o)return;let t=e.getBoundingClientRect();if(t.bottom<0||t.top>innerHeight)return;let r=(o.clientX-(t.left+t.width/2))/Math.max(innerWidth/2,1),i=(o.clientY-(t.top+t.height/2))/Math.max(innerHeight/2,1);n.puntero(Math.max(-1,Math.min(1,r)),Math.max(-1,Math.min(1,i)))}))};return addEventListener(`pointermove`,l,{passive:!0}),()=>{cancelAnimationFrame(c),removeEventListener(`pointermove`,l),typeof i==`function`&&i(),n.destruir()}},[s]),(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`span`,{ref:o,className:`sentinela`,"aria-hidden":`true`}),(0,P.jsx)(`canvas`,{ref:r,className:e,"aria-hidden":`true`},c)]})}var F={eyebrow:`El cerebro`,titulo:[`Y todo se vuelve`,`un cerebro.`],bajada:`Cada cliente, reunión y proceso queda como una memoria enlazada a las demás. Como lo recuerda tu mejor persona, pero sin olvidar nada.`,memorias:[`Constructora Pehuén`,`Inmobiliaria Maitén`,`Lista de precios 2026`,`Quién es quién`,`Comité comercial · 15 sep`],comparacion:{titulo:`Un cuaderno te hace trabajar. Un cerebro trabaja para ti.`,antes:`Apps de notas`,despues:`Medula`,filas:[[`Tú escribes todo`,`Se escribe solo desde tus apps`],[`Tú ordenas y enlazas`,`Se ordena y se enlaza solo`],[`Buscas palabras`,`Le preguntas y te responde`],[`Un archivo en tu computador`,`Todo tu equipo, en vivo`]]}},I={eyebrow:`Tu IA + Medula`,titulo:[`Pregúntale a tu IA.`,`Piensa con tu cerebro.`],bajada:`ChatGPT y Claude consultan tu cerebro, responden con lo que sabe tu empresa y te dicen de dónde lo sacaron. Y con tu permiso, también anotan.`,chatgpt:{pregunta:`¿Qué descuento le dimos a Constructora Pehuén en cemento?`,herramienta:`Consultó 2 memorias`,respuesta:`Un 6 % en cemento, para 200 sacos al mes. Lo acordó Paula el 12 de septiembre. Queda pendiente la cotización de fierro: Diego la envía antes del viernes 19.`,fuentes:[`Clientes/Constructora Pehuén`,`Reuniones/Comité comercial · 15 sep`]},claude:{pregunta:`Anota que Inmobiliaria Maitén pidió cotizar 40 planchas OSB.`,herramienta:`Quiere escribir en 1 memoria`,ruta:`Clientes/Inmobiliaria Maitén`,agrega:`28 sep · Pidió cotización de 40 planchas OSB de 15 mm.`,guardar:`Guardar`,cancelar:`Cancelar`,respuesta:`Listo. Quedó en la memoria de Inmobiliaria Maitén y tu equipo ya lo ve.`},areas:[{nombre:`Comercial`,pregunta:`¿Qué le ofrecimos a Pehuén la última vez?`},{nombre:`Operaciones`,pregunta:`¿Qué tareas quedaron del comité del 15?`},{nombre:`Gerencia`,pregunta:`¿Quién nos debe hace más de 60 días?`}],nota:`Ejemplo con una empresa ficticia: una distribuidora de materiales de construcción.`},L=`/guion-visual/sitio/`,R=e=>`${L}img/logos/png/${e}.png`;function z({id:e,children:t,oscuro:n}){let[r,i]=T[e];return(0,P.jsxs)(`div`,{className:`pz pz--${e}${n?` pz--oscura`:``}`,"data-pantalla":e,style:{width:r,height:i},children:[(0,P.jsx)(`div`,{className:`pz__lamina`,children:t}),(0,P.jsx)(`span`,{className:`pz__canto`,"aria-hidden":`true`})]})}function B({titulo:e,icono:t,color:n,claro:r}){return(0,P.jsxs)(`div`,{className:`pz-win${r?` pz-win--claro`:``}`,style:n?{background:n}:void 0,children:[t&&(0,P.jsx)(`img`,{src:R(t),alt:``,width:16,height:16}),(0,P.jsx)(`span`,{className:`pz-win__titulo`,children:e}),(0,P.jsxs)(`span`,{className:`pz-win__botones`,"aria-hidden":`true`,children:[(0,P.jsx)(`i`,{children:`─`}),(0,P.jsx)(`i`,{children:`▢`}),(0,P.jsx)(`i`,{children:`✕`})]})]})}var V=[{de:`Paula Fuentes`,color:`#1f7aec`,texto:`Le dejé el 6 % a Pehuén en cemento, 200 sacos al mes 👍`,hora:`10:14`},{de:`Diego Soto`,color:`#c2185b`,texto:`ok, ¿y el fierro?`,hora:`10:15`},{yo:!0,texto:`Mándales la cotización antes del viernes`,hora:`10:16`},{de:`Marcela Rojas`,color:`#00897b`,texto:`¿alguien sabe dónde quedó la lista de precios nueva?`,hora:`11:02`},{de:`Diego Soto`,color:`#c2185b`,texto:`creo que en el Drive de Paula 🤷‍♂️`,hora:`11:03`},{de:`Tomás Andrade`,color:`#6d4c41`,texto:`¿Cuánto nos debe Mantenciones Ruil?`,hora:`12:40`,nuevo:!0}];function H(){return(0,P.jsx)(z,{id:`whatsapp`,children:(0,P.jsxs)(`div`,{className:`pz-wa`,children:[(0,P.jsxs)(`div`,{className:`pz-wa__cabeza`,children:[(0,P.jsx)(`span`,{className:`pz-wa__avatar`,children:`🧱`}),(0,P.jsxs)(`span`,{className:`pz-wa__grupo`,children:[(0,P.jsx)(`b`,{children:`Ventas Los Andes`}),(0,P.jsx)(`small`,{children:`Paula, Diego, Marcela, Tomás, tú`})]}),(0,P.jsx)(`span`,{className:`pz-wa__iconos`,"aria-hidden":`true`,children:`⌕ ⋮`})]}),(0,P.jsxs)(`div`,{className:`pz-wa__hilo`,children:[(0,P.jsx)(`span`,{className:`pz-wa__dia`,children:`Hoy`}),V.map((e,t)=>(0,P.jsxs)(`div`,{className:`pz-wa__msj${e.yo?` pz-wa__msj--yo`:``}${e.nuevo?` pz-wa__msj--nuevo`:``}`,children:[!e.yo&&(0,P.jsx)(`b`,{style:{color:e.color},children:e.de}),(0,P.jsx)(`span`,{children:e.texto}),(0,P.jsxs)(`small`,{children:[e.hora,e.yo&&(0,P.jsx)(`em`,{children:` ✓✓`})]})]},t)),(0,P.jsxs)(`div`,{className:`pz-wa__escribe`,children:[(0,P.jsx)(`i`,{}),(0,P.jsx)(`i`,{}),(0,P.jsx)(`i`,{})]})]}),(0,P.jsxs)(`div`,{className:`pz-wa__caja`,children:[(0,P.jsx)(`span`,{children:`☺`}),(0,P.jsx)(`span`,{className:`pz-wa__campo`,children:`Escribe un mensaje`}),(0,P.jsx)(`span`,{className:`pz-wa__mic`,children:`🎤`})]})]})})}var U=[[`CEM-25`,`Cemento especial 25 kg`,`saco`,`5.490`,`8 %`,`1.240`],[`FIE-10`,`Fierro estriado 10 mm × 6 m`,`barra`,`7.990`,`5 %`,`860`],[`OSB-15`,`Plancha OSB 15 mm`,`unidad`,`18.900`,`6 %`,`312`],[`PIN-LT`,`Pintura látex blanca 1 gl`,`galón`,`12.490`,`10 %`,`48`],[`YES-10`,`Yeso cartón 10 mm`,`plancha`,`6.290`,`7 %`,`530`],[`CLA-3`,`Clavo corriente 3"`,`kg`,`1.890`,`4 %`,`2.100`],[`MAL-AC`,`Malla acma C-92`,`unidad`,`24.500`,`5 %`,`96`],[`AIS-50`,`Lana mineral 50 mm`,`rollo`,`21.990`,`6 %`,`74`],[`CER-60`,`Cerámica piso 60 × 60`,`m²`,`9.990`,`12 %`,`410`]];function W(){return(0,P.jsx)(z,{id:`excel`,children:(0,P.jsxs)(`div`,{className:`pz-xl`,children:[(0,P.jsx)(B,{titulo:`Lista de precios 2026.xlsx  -  Excel`,icono:`microsoftexcel`,color:`#0e6b37`}),(0,P.jsx)(`div`,{className:`pz-xl__cinta`,children:[`Archivo`,`Inicio`,`Insertar`,`Disposición`,`Fórmulas`,`Datos`,`Revisar`,`Vista`].map((e,t)=>(0,P.jsx)(`span`,{className:t===1?`on`:``,children:e},e))}),(0,P.jsxs)(`div`,{className:`pz-xl__formula`,children:[(0,P.jsx)(`span`,{className:`pz-xl__celda`,children:`E4`}),(0,P.jsx)(`span`,{className:`pz-xl__fx`,children:`fx`}),(0,P.jsx)(`span`,{children:`=SI(D4>15000;6%;5%)`})]}),(0,P.jsxs)(`div`,{className:`pz-xl__grilla`,children:[(0,P.jsxs)(`div`,{className:`pz-xl__fila pz-xl__fila--letras`,children:[(0,P.jsx)(`i`,{}),(0,P.jsx)(`span`,{children:`A`}),(0,P.jsx)(`span`,{children:`B`}),(0,P.jsx)(`span`,{children:`C`}),(0,P.jsx)(`span`,{children:`D`}),(0,P.jsx)(`span`,{children:`E`}),(0,P.jsx)(`span`,{children:`F`})]}),(0,P.jsxs)(`div`,{className:`pz-xl__fila pz-xl__fila--titulo`,children:[(0,P.jsx)(`i`,{children:`1`}),(0,P.jsx)(`span`,{children:`Código`}),(0,P.jsx)(`span`,{children:`Producto`}),(0,P.jsx)(`span`,{children:`Unidad`}),(0,P.jsx)(`span`,{children:`Precio lista`}),(0,P.jsx)(`span`,{children:`Desc. máx.`}),(0,P.jsx)(`span`,{children:`Stock`})]}),U.map((e,t)=>(0,P.jsxs)(`div`,{className:`pz-xl__fila${t===2?` sel`:``}`,children:[(0,P.jsx)(`i`,{children:t+2}),e.map((e,t)=>(0,P.jsx)(`span`,{className:t>=3?`num`:``,children:e},t))]},t))]}),(0,P.jsxs)(`div`,{className:`pz-xl__hojas`,children:[(0,P.jsx)(`span`,{className:`on`,children:`Precios`}),(0,P.jsx)(`span`,{children:`Descuentos`}),(0,P.jsx)(`span`,{children:`Stock`}),(0,P.jsx)(`span`,{children:`+`})]})]})})}function G(){return(0,P.jsx)(z,{id:`crm`,children:(0,P.jsxs)(`div`,{className:`pz-crm`,children:[(0,P.jsxs)(`div`,{className:`pz-crm__nav`,children:[(0,P.jsx)(`img`,{src:R(`zoho`),alt:``,width:38,height:38}),(0,P.jsx)(`span`,{className:`on`,children:`Inicio`}),(0,P.jsx)(`span`,{children:`Leads`}),(0,P.jsx)(`span`,{children:`Contactos`}),(0,P.jsx)(`span`,{children:`Cuentas`}),(0,P.jsx)(`span`,{className:`act`,children:`Tratos`}),(0,P.jsx)(`span`,{children:`Actividades`})]}),(0,P.jsxs)(`div`,{className:`pz-crm__cuerpo`,children:[(0,P.jsxs)(`div`,{className:`pz-crm__cabeza`,children:[(0,P.jsx)(`span`,{className:`pz-crm__ini`,children:`CP`}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`b`,{children:`Constructora Pehuén`}),(0,P.jsx)(`small`,{children:`Trato · Cemento y fierro obra Los Aromos`})]}),(0,P.jsx)(`span`,{className:`pz-crm__btn`,children:`Editar`})]}),(0,P.jsx)(`div`,{className:`pz-crm__etapas`,children:[`Calificación`,`Propuesta`,`Negociación`,`Cierre`].map((e,t)=>(0,P.jsx)(`span`,{className:t<3?`hecha`:``,children:e},e))}),(0,P.jsxs)(`div`,{className:`pz-crm__campos`,children:[(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`small`,{children:`Monto`}),(0,P.jsx)(`b`,{children:`$8.450.000`})]}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`small`,{children:`Dueño`}),(0,P.jsx)(`b`,{children:`Paula Fuentes`})]}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`small`,{children:`Cierre estimado`}),(0,P.jsx)(`b`,{children:`30-09-2026`})]}),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`small`,{children:`Probabilidad`}),(0,P.jsx)(`b`,{children:`75 %`})]})]}),(0,P.jsxs)(`div`,{className:`pz-crm__notas`,children:[(0,P.jsx)(`small`,{children:`Notas`}),(0,P.jsxs)(`p`,{children:[(0,P.jsx)(`b`,{children:`Paula F.`}),` Aprobado 6 % en cemento por volumen (200 sacos/mes). Falta cotizar fierro.`]}),(0,P.jsxs)(`p`,{children:[(0,P.jsx)(`b`,{children:`Diego S.`}),` Llamé al jefe de obra, quiere despacho los lunes.`]})]})]})]})})}var K=[{de:`Constructora Pehuén`,asunto:`Cotización fierro 10 mm`,extracto:`Hola Diego, quedamos atentos a la cotización para…`,hora:`10:32`,nuevo:!0},{de:`Inmobiliaria Maitén`,asunto:`Re: despacho planchas OSB`,extracto:`¿Podrían confirmar si llegan el jueves a la obra de…`,hora:`09:58`,nuevo:!0},{de:`Chipax`,asunto:`Factura 4821 vencida hace 67 días`,extracto:`Mantenciones Ruil tiene un saldo pendiente de…`,hora:`09:12`},{de:`Paula Fuentes`,asunto:`Acta comité comercial 15 sep`,extracto:`Adjunto el acta con los acuerdos y las tareas de…`,hora:`ayer`},{de:`Transportes Andino`,asunto:`Programación de despachos semana 40`,extracto:`Les enviamos la programación actualizada con…`,hora:`ayer`},{de:`Bsale`,asunto:`Resumen de ventas de septiembre`,extracto:`Tus ventas del mes suman $142.380.000, un 8 %…`,hora:`26 sep`}];function q(){return(0,P.jsx)(z,{id:`gmail`,children:(0,P.jsxs)(`div`,{className:`pz-gm`,children:[(0,P.jsxs)(`div`,{className:`pz-gm__barra`,children:[(0,P.jsx)(`span`,{className:`pz-gm__menu`,children:`☰`}),(0,P.jsx)(`img`,{src:R(`gmail`),alt:``,width:26,height:26}),(0,P.jsx)(`span`,{className:`pz-gm__marca`,children:`Gmail`}),(0,P.jsx)(`span`,{className:`pz-gm__buscar`,children:`⌕  Buscar correo`})]}),(0,P.jsxs)(`div`,{className:`pz-gm__cuerpo`,children:[(0,P.jsxs)(`div`,{className:`pz-gm__lado`,children:[(0,P.jsx)(`span`,{className:`pz-gm__redactar`,children:`✎ Redactar`}),(0,P.jsxs)(`span`,{className:`on`,children:[`Recibidos `,(0,P.jsx)(`b`,{children:`128`})]}),(0,P.jsx)(`span`,{children:`Destacados`}),(0,P.jsx)(`span`,{children:`Enviados`}),(0,P.jsx)(`span`,{children:`Borradores`})]}),(0,P.jsx)(`div`,{className:`pz-gm__lista`,children:K.map((e,t)=>(0,P.jsxs)(`div`,{className:`pz-gm__fila${e.nuevo?` nuevo`:``}`,children:[(0,P.jsx)(`span`,{className:`pz-gm__de`,children:e.de}),(0,P.jsxs)(`span`,{className:`pz-gm__asunto`,children:[(0,P.jsx)(`b`,{children:e.asunto}),` — `,e.extracto]}),(0,P.jsx)(`span`,{className:`pz-gm__hora`,children:e.hora})]},t))})]})]})})}var J=[{n:`Lista de precios 2026.xlsx`,t:`microsoftexcel`,c:`#e6f4ea`},{n:`Contrato Pehuén.pdf`,t:`pdf`,c:`#fce8e6`},{n:`Acta comité 15-sep.docx`,t:`googledocs`,c:`#e8f0fe`},{n:`Fotos obra Maitén`,t:`carpeta`,c:`#f1f3f4`},{n:`Proveedores.xlsx`,t:`googlesheets`,c:`#e6f4ea`},{n:`Procedimiento despachos.pdf`,t:`pdf`,c:`#fce8e6`}];function Y(){return(0,P.jsx)(z,{id:`drive`,children:(0,P.jsxs)(`div`,{className:`pz-dr`,children:[(0,P.jsxs)(`div`,{className:`pz-dr__barra`,children:[(0,P.jsx)(`img`,{src:R(`googledrive`),alt:``,width:26,height:26}),(0,P.jsx)(`span`,{children:`Drive`}),(0,P.jsx)(`span`,{className:`pz-dr__buscar`,children:`⌕  Buscar en Drive`})]}),(0,P.jsxs)(`div`,{className:`pz-dr__ruta`,children:[`Mi unidad  ›  Comercial  ›  `,(0,P.jsx)(`b`,{children:`2026`})]}),(0,P.jsx)(`div`,{className:`pz-dr__grilla`,children:J.map(e=>(0,P.jsxs)(`div`,{className:`pz-dr__archivo`,children:[(0,P.jsx)(`span`,{className:`pz-dr__vista`,style:{background:e.c},children:e.t===`pdf`?(0,P.jsx)(`b`,{className:`pz-dr__pdf`,children:`PDF`}):e.t===`carpeta`?(0,P.jsx)(`b`,{className:`pz-dr__carpeta`,children:`▰`}):(0,P.jsx)(`img`,{src:R(e.t),alt:``,width:34,height:34})}),(0,P.jsx)(`span`,{className:`pz-dr__nombre`,children:e.n})]},e.n))})]})})}var pe=[{dia:0,desde:1,largo:2,t:`Comité comercial`,c:`#039be5`},{dia:1,desde:3,largo:1.5,t:`Visita obra Pehuén`,c:`#33b679`},{dia:2,desde:.5,largo:1,t:`Despacho Maitén`,c:`#f4511e`},{dia:3,desde:2.5,largo:2,t:`Reunión Transportes Andino`,c:`#8e24aa`},{dia:4,desde:1,largo:1,t:`Cobranza Ruil`,c:`#e67c73`}];function me(){return(0,P.jsx)(z,{id:`calendario`,children:(0,P.jsxs)(`div`,{className:`pz-ca`,children:[(0,P.jsxs)(`div`,{className:`pz-ca__barra`,children:[(0,P.jsx)(`img`,{src:R(`googlecalendar`),alt:``,width:26,height:26}),(0,P.jsx)(`span`,{children:`Calendar`}),(0,P.jsx)(`span`,{className:`pz-ca__hoy`,children:`Hoy`}),(0,P.jsx)(`b`,{children:`Septiembre 2026`})]}),(0,P.jsx)(`div`,{className:`pz-ca__dias`,children:[`LUN 15`,`MAR 16`,`MIÉ 17`,`JUE 18`,`VIE 19`].map(e=>(0,P.jsxs)(`span`,{children:[e.split(` `)[0],(0,P.jsx)(`b`,{children:e.split(` `)[1]})]},e))}),(0,P.jsxs)(`div`,{className:`pz-ca__cuerpo`,children:[[9,10,11,12,13,14].map(e=>(0,P.jsxs)(`span`,{className:`pz-ca__hora`,style:{top:(e-9)*52},children:[e,`:00`]},e)),pe.map(e=>(0,P.jsx)(`span`,{className:`pz-ca__evento`,style:{left:`calc(40px + ${e.dia} * (100% - 40px) / 5)`,top:e.desde*52,height:e.largo*52-4,background:e.c},children:e.t},e.t))]})]})})}function he(){let e=I.chatgpt;return(0,P.jsx)(z,{id:`chatgpt`,children:(0,P.jsxs)(`div`,{className:`pz-cg`,"data-chat":`chatgpt`,"data-paso":`0`,children:[(0,P.jsxs)(`div`,{className:`pz-cg__barra`,children:[(0,P.jsxs)(`span`,{className:`pz-cg__modelo`,children:[`ChatGPT `,(0,P.jsx)(`span`,{children:`5`}),` `,(0,P.jsx)(`i`,{children:`⌄`})]}),(0,P.jsx)(`span`,{className:`pz-cg__compartir`,children:`⇪ Compartir`})]}),(0,P.jsxs)(`div`,{className:`pz-cg__hilo`,children:[(0,P.jsx)(`p`,{className:`pz-cg__yo`,"data-el":`enviada`,children:e.pregunta}),(0,P.jsxs)(`div`,{className:`pz-cg__herr`,"data-el":`herramienta`,children:[(0,P.jsx)(`img`,{src:`${L}marca.svg`,alt:``,width:16,height:16}),(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`b`,{children:`Medula`}),` `,(0,P.jsx)(`em`,{"data-el":`estado`,children:`Buscando en tu cerebro…`})]})]}),(0,P.jsx)(`p`,{className:`pz-cg__resp`,"data-el":`respuesta`,"data-texto":e.respuesta}),(0,P.jsx)(`div`,{className:`pz-cg__fuentes`,"data-el":`fuentes`,children:e.fuentes.map(e=>(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`img`,{src:`${L}marca.svg`,alt:``,width:12,height:12}),e]},e))})]}),(0,P.jsxs)(`div`,{className:`pz-cg__caja`,children:[(0,P.jsx)(`span`,{className:`pz-cg__mas`,children:`+`}),(0,P.jsxs)(`span`,{className:`pz-cg__app`,children:[(0,P.jsx)(`img`,{src:`${L}marca.svg`,alt:``,width:14,height:14}),`Medula`]}),(0,P.jsx)(`span`,{className:`pz-cg__campo`,"data-el":`campo`,"data-texto":e.pregunta,"data-vacio":`Pregunta lo que quieras`}),(0,P.jsx)(`span`,{className:`pz-cg__enviar`,children:`↑`})]})]})})}function X(){let e=I.claude;return(0,P.jsx)(z,{id:`claude`,children:(0,P.jsxs)(`div`,{className:`pz-cl`,"data-chat":`claude`,"data-paso":`0`,children:[(0,P.jsxs)(`div`,{className:`pz-cl__barra`,children:[(0,P.jsx)(`img`,{src:R(`claude`),alt:``,width:20,height:20}),(0,P.jsx)(`span`,{children:`Cotización Maitén`}),(0,P.jsx)(`span`,{className:`pz-cl__modelo`,children:`Opus`})]}),(0,P.jsxs)(`div`,{className:`pz-cl__hilo`,children:[(0,P.jsx)(`p`,{className:`pz-cl__yo`,"data-el":`enviada`,children:e.pregunta}),(0,P.jsxs)(`div`,{className:`pz-cl__herr`,"data-el":`herramienta`,children:[(0,P.jsx)(`img`,{src:`${L}marca.svg`,alt:``,width:16,height:16}),(0,P.jsxs)(`span`,{children:[(0,P.jsx)(`b`,{children:`Medula`}),` · `,e.herramienta]})]}),(0,P.jsxs)(`div`,{className:`pz-cl__permiso`,"data-el":`permiso`,children:[(0,P.jsxs)(`p`,{className:`pz-cl__permiso-t`,children:[`Claude quiere usar `,(0,P.jsx)(`b`,{children:`Medula`}),` para escribir en:`]}),(0,P.jsx)(`p`,{className:`pz-cl__ruta`,children:e.ruta}),(0,P.jsxs)(`p`,{className:`pz-cl__agrega`,children:[`+ `,e.agrega]}),(0,P.jsxs)(`div`,{className:`pz-cl__botones`,children:[(0,P.jsx)(`span`,{className:`si`,"data-el":`guardar`,children:`Permitir`}),(0,P.jsx)(`span`,{children:`Denegar`})]})]}),(0,P.jsx)(`p`,{className:`pz-cl__resp`,"data-el":`respuesta`,"data-texto":e.respuesta})]}),(0,P.jsxs)(`div`,{className:`pz-cl__caja`,children:[(0,P.jsx)(`span`,{className:`pz-cl__campo`,"data-el":`campo`,"data-texto":e.pregunta,"data-vacio":`Responde a Claude…`}),(0,P.jsx)(`span`,{className:`pz-cl__enviar`,children:`↑`})]})]})})}function Z(){let e=[],t=7,n=()=>(t=t*16807%2147483647)/2147483647;[[190,150,70,38],[330,120,55,26],[120,300,60,30],[300,290,80,44],[420,230,45,18]].forEach(([t,r,i,a],o)=>{for(let s=0;s<a;s++){let a=n()*Math.PI*2,s=Math.sqrt(n())*i;e.push([t+Math.cos(a)*s,r+Math.sin(a)*s,1.6+n()*3.2,o])}});let r=[`#0853e0`,`#1b75fd`,`#63a7fc`,`#013ecc`,`#3d8bfd`];return(0,P.jsxs)(`svg`,{viewBox:`0 0 520 420`,className:`pz-app__grafo`,"aria-hidden":`true`,children:[e.slice(0,90).map((t,n)=>{let r=e[(n*37+11)%e.length];return(0,P.jsx)(`line`,{x1:t[0],y1:t[1],x2:r[0],y2:r[1],stroke:`#0853e0`,strokeOpacity:.09,strokeWidth:.8},`l${n}`)}),e.map(([e,t,n,i],a)=>(0,P.jsx)(`circle`,{cx:e,cy:t,r:n,fill:r[i],fillOpacity:.35+a%5*.12},a)),(0,P.jsx)(`circle`,{cx:330,cy:120,r:7,fill:`#0853e0`,stroke:`#fff`,strokeWidth:2.5}),(0,P.jsx)(`text`,{x:342,y:112,fontSize:11,fill:`#37352f`,fontWeight:600,children:`Constructora Pehuén`})]})}function ge(){return(0,P.jsx)(z,{id:`app`,children:(0,P.jsxs)(`div`,{className:`pz-app`,children:[(0,P.jsxs)(`div`,{className:`pz-app__lado`,children:[(0,P.jsxs)(`span`,{className:`pz-app__marca`,children:[(0,P.jsx)(`img`,{src:`${L}marca.svg`,alt:``,width:18,height:18}),`Medula`]}),(0,P.jsx)(`span`,{className:`on`,children:`◉ Cerebro`}),(0,P.jsx)(`span`,{children:`⌁ Heads`}),(0,P.jsx)(`span`,{children:`⚙ Configuración`}),(0,P.jsx)(`span`,{className:`pz-app__sep`,children:`Fijados`}),(0,P.jsx)(`span`,{children:`▸ Clientes`}),(0,P.jsx)(`span`,{children:`▸ Procesos`}),(0,P.jsx)(`span`,{children:`▸ Reuniones`})]}),(0,P.jsxs)(`div`,{className:`pz-app__centro`,children:[(0,P.jsxs)(`div`,{className:`pz-app__buscar`,children:[`⌕  Pregúntale a tu cerebro o busca una memoria…  `,(0,P.jsx)(`kbd`,{children:`Ctrl O`})]}),(0,P.jsx)(Z,{}),(0,P.jsxs)(`div`,{className:`pz-app__areas`,children:[(0,P.jsx)(`span`,{style:{"--c":`#0853e0`},children:`Comercial`}),(0,P.jsx)(`span`,{style:{"--c":`#63a7fc`},children:`Operaciones`}),(0,P.jsx)(`span`,{style:{"--c":`#013ecc`},children:`Gerencia`})]})]}),(0,P.jsxs)(`div`,{className:`pz-app__memoria`,children:[(0,P.jsx)(`small`,{children:`Clientes / Constructora Pehuén`}),(0,P.jsx)(`b`,{children:`Constructora Pehuén`}),(0,P.jsxs)(`div`,{className:`pz-app__props`,children:[(0,P.jsx)(`span`,{children:`#cliente`}),(0,P.jsx)(`span`,{children:`#columna/comercial`}),(0,P.jsx)(`span`,{children:`Zoho CRM`})]}),(0,P.jsx)(`p`,{children:`Constructora de Temuco. Obra Los Aromos, 120 casas.`}),(0,P.jsxs)(`p`,{children:[(0,P.jsx)(`b`,{children:`Acuerdo:`}),` 6 % en cemento por 200 sacos al mes (12 sep, `,(0,P.jsx)(`u`,{children:`Paula Fuentes`}),`).`]}),(0,P.jsxs)(`p`,{children:[(0,P.jsx)(`b`,{children:`Pendiente:`}),` cotización de fierro, la envía `,(0,P.jsx)(`u`,{children:`Diego Soto`}),` antes del 19.`]}),(0,P.jsxs)(`p`,{className:`pz-app__enlaces`,children:[`Enlaces: `,(0,P.jsx)(`u`,{children:`Comité comercial · 15 sep`}),` · `,(0,P.jsx)(`u`,{children:`Lista de precios 2026`})]})]})]})})}var _e=[{n:`Cotizador`,d:`Arma cotizaciones con tu lista de precios`,por:`Materiales Los Andes`,c:`#0853e0`,i:`₵`},{n:`Despachos`,d:`Sigue cada despacho y avisa al cliente`,por:`Comunidad`,c:`#00897b`,i:`⛟`},{n:`Cobranza`,d:`Detecta facturas vencidas y prepara el recordatorio`,por:`Comunidad`,c:`#e8590c`,i:`$`},{n:`Resumen semanal`,d:`Lo importante de la semana, cada lunes`,por:`Medula`,c:`#ae3ec9`,i:`✦`}];function ve(){return(0,P.jsx)(z,{id:`tienda`,children:(0,P.jsxs)(`div`,{className:`pz-ti`,children:[(0,P.jsxs)(`div`,{className:`pz-ti__cabeza`,children:[(0,P.jsx)(`b`,{children:`Tienda de Medula`}),(0,P.jsx)(`span`,{children:`Pronto`})]}),(0,P.jsx)(`div`,{className:`pz-ti__lista`,children:_e.map(e=>(0,P.jsxs)(`div`,{className:`pz-ti__app`,children:[(0,P.jsx)(`span`,{className:`pz-ti__icono`,style:{background:e.c},children:e.i}),(0,P.jsxs)(`span`,{className:`pz-ti__txt`,children:[(0,P.jsx)(`b`,{children:e.n}),(0,P.jsx)(`small`,{children:e.d}),(0,P.jsxs)(`em`,{children:[`por `,e.por]})]}),(0,P.jsx)(`span`,{className:`pz-ti__instalar`,children:`Instalar`})]},e.n))}),(0,P.jsx)(`div`,{className:`pz-ti__crea`,children:`＋ Crea tu propia herramienta con la API de Medula`})]})})}var ye={whatsapp:H,excel:W,crm:G,gmail:q,drive:Y,calendario:me,chatgpt:he,claude:X,app:ge,tienda:ve},be=new WeakMap,xe=(e,t,n)=>Math.min(1,Math.max(0,(n-e)/(t-e)));function Se(e){let t=e.querySelector(`[data-el="respuesta"]`);if(!t)return;let n=t.dataset.texto??``;t.textContent=``,n.split(` `).forEach((e,n)=>{let r=document.createElement(`span`);r.className=`pz-palabra`,r.textContent=(n?` `:``)+e,t.appendChild(r)})}function Ce(e,t){if(!e)return;let n=be.get(e);n||(n={paso:-1,letras:-1,palabras:-1,armado:!1},be.set(e,n)),n.armado||(Se(e),n.armado=!0);let r=e.dataset.chat===`claude`?{escribe:[.06,.3],envia:.3,busca:.36,responde:.62,fuentes:.62,fin:.9}:{escribe:[.06,.32],envia:.32,busca:.38,responde:.5,fuentes:.86,fin:.84},i=t<r.escribe[0]?0:t<r.envia?1:t<r.busca?2:t<r.responde?3:t<r.fuentes?4:5,a=e.querySelector(`[data-el="campo"]`),o=a?.dataset.texto??``,s=i===1?Math.round(xe(r.escribe[0],r.escribe[1]-.02,t)*o.length):0,c=i>=4?Math.round(xe(r.responde,r.fin,t)*1e3):0;if(i!==n.paso){n.paso=i,e.dataset.paso=String(i);let t=e.querySelector(`[data-el="estado"]`);t&&(t.textContent=i>=4?I.chatgpt.herramienta:`Buscando en tu cerebro…`)}if(a&&s!==n.letras&&(n.letras=s,a.innerHTML=``,s>0)){a.textContent=o.slice(0,s);let e=document.createElement(`span`);e.className=`pz-cursor`,a.appendChild(e)}if(c!==n.palabras){n.palabras=c;let t=e.querySelectorAll(`.pz-palabra`),r=Math.round(c/1e3*t.length);t.forEach((e,t)=>e.classList.toggle(`ya`,t<r))}}function we(e,t){if(!e)return;let n=t>.45?`1`:`0`;e.dataset.paso!==n&&(e.dataset.paso=n)}var Te=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),Ee=function(e){return`/guion-visual/sitio/`+e},De={},Oe=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Ee(t,n),t=s(t),t in De)return;De[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Te,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},ke=640,Ae=.758,Q={caos:S(`caos`),orbe:S(`orbe`),precios:S(`precios`)},je=e=>`/guion-visual/sitio/img/logos/png/${e}.png`,Me={outlook:`microsoftoutlook`},Ne=[...C.map(e=>({id:`head-${e.id}`,clase:`r-head`,contenido:(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`img`,{src:je(Me[e.id]??e.id),alt:``,width:22,height:22}),(0,P.jsx)(`span`,{children:e.nombre})]})})),...F.memorias.map((e,t)=>({id:`nota-${t}`,clase:`r-nota`,contenido:e}))],Pe=[.03,.43],Fe=[.47,.84],$=(e,t,n)=>Math.min(1,Math.max(0,(n-e)/(t-e)));function Ie(e,t){return e<=.04?`reposo`:t?e<.36?`escuchando`:e<.62?`pensando`:`hablando`:e<.38?`escuchando`:e<.5?`pensando`:`hablando`}function Le(){let e=(0,E.useRef)(null),t=(0,E.useRef)(null),n=(0,E.useRef)(null),r=(0,E.useRef)(null),i=(0,E.useRef)(null),o=(0,E.useRef)(null),s=(0,E.useRef)(`reposo`),[c,l]=(0,E.useState)(!1),u=(0,E.useRef)(!1),[d]=(0,E.useState)(()=>Object.fromEntries(Object.keys(ye).map(e=>{let t=document.createElement(`div`);return t.className=`mundo-pantallas__host`,[e,t]})));return(0,E.useEffect)(()=>{let c=document.documentElement,f=matchMedia(`(prefers-reduced-motion: reduce)`).matches,p=matchMedia(`(max-width: 760px), (pointer: coarse)`).matches,m=null,h=!0,g=null;f||(g=new a({lerp:.085,smoothWheel:!0,allowNestedScroll:!0,anchors:{offset:0}}));let _=()=>[...document.querySelectorAll(`section[data-capitulo], div[data-capitulo]`)].sort((e,t)=>Number(e.dataset.capitulo)-Number(t.dataset.capitulo)),v=_(),y=new Map;t.current?.querySelectorAll(`[data-rotulo]`).forEach(e=>y.set(e.dataset.rotulo,e));let b=()=>d.chatgpt.querySelector(`[data-chat]`),S=()=>d.claude.querySelector(`[data-chat]`),C=e=>d[e].querySelector(`.pz`),T=e=>{let t=new Set,n=e.find(e=>e.id===`orbe`),r=!!n&&n.vis>.001;r!==u.current&&(u.current=r,l(r));let a=i.current;if(a&&n&&n.tam){let e=n.tam/(Ae*ke);a.style.transform=`translate3d(${n.x.toFixed(1)}px, ${n.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${e.toFixed(4)})`,a.style.opacity=n.vis.toFixed(3)}for(let n of e){if(n.id===`orbe`)continue;let e=y.get(n.id);e&&(t.add(n.id),e.style.transform=`translate3d(${n.x.toFixed(1)}px, ${n.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${(.86+n.frente*.14).toFixed(3)})`,e.style.opacity=n.vis.toFixed(3),e.style.visibility=n.vis>.01?`visible`:`hidden`)}y.forEach((e,n)=>{!t.has(n)&&e.style.visibility!==`hidden`&&(e.style.visibility=`hidden`,e.style.opacity=`0`)})},E=!1,D=-1;Oe(async()=>{let{crearMundo:e}=await import(`./mundo.48dy5kwR.js`);return{crearMundo:e}},__vite__mapDeps([0,1,2,3,4,5])).then(({crearMundo:t})=>t(e.current,{base:`/guion-visual/sitio/`,movil:p,quieto:f,alCuadro:T,pantallas:n.current?{contenedor:n.current,hosts:d}:void 0})).then(e=>{if(!h)return e.destruir();m=e,c.classList.add(`mundo-listo`)}).catch(()=>{E=!0,c.classList.add(`sin-mundo`)});let O=0,k=-1,A=()=>document.querySelector(`[data-capitulo="${Q.orbe}"]`),ee=e=>{O=requestAnimationFrame(ee),g?.raf(e),(!v.length||!v[0].isConnected)&&(v=_());let t=0;for(let e of v){let n=e.getBoundingClientRect(),r=Number(e.dataset.capitulo),i=-n.top/Math.max(1,n.height);e.style.setProperty(`--v`,x(-.3,.06,i).toFixed(3)),n.top<=.5&&(t=r+Math.min(.9999,Math.max(0,i)))}if(Math.abs(t-k)>1e-4){k=t,m?.avance(t);let e=Math.floor(t),n=t-e,i=w[e]?.id;e===Q.caos&&we(C(`whatsapp`),n);let a=e<Q.orbe,l=e>Q.orbe,u=a?0:l?1:$(Pe[0],Pe[1],n),d=a?0:l?1:$(Fe[0],Fe[1],n);Ce(b(),u),Ce(S(),d);let f=e===Q.orbe&&n>Fe[0]-.02,h=C(`chatgpt`),g=C(`claude`);h&&h.dataset.activo!==String(!f)&&(h.dataset.activo=String(!f)),g&&g.dataset.activo!==String(f)&&(g.dataset.activo=String(f));let _=A();if(_){let t=!a&&!l?f?`claude`:`chatgpt`:``;_.dataset.turno!==t&&(_.dataset.turno=t);let r=e===Q.orbe?String(Math.min(2,Math.floor($(.05,.86,n)*3))):`0`;_.dataset.area!==r&&(_.dataset.area=r)}let v=e===Q.orbe?f?Ie(d,!0):Ie(u,!1):l?`hablando`:`reposo`;if(v!==s.current){let e=o.current;e&&(e.estado(v),v===`hablando`&&s.current===`pensando`&&e.pulso(`exito`)),s.current=v}let y=v===`pensando`?1:v===`escuchando`?.35:v===`hablando`?.12:0;m?.orbe(y,0),c.dataset.capitulo=i??``,E&&r.current&&e!==D&&(D=e,r.current.src=`/guion-visual/sitio/capturas/descenso/c${e}${p?`-movil`:``}.jpg`),c.style.setProperty(`--noche`,String(w[e]?.noche??0))}if(m){if(t>Q.precios-.7&&t<Q.precios+1){let e=[...document.querySelectorAll(`[data-gota]`)].filter(e=>e.offsetParent);if(e.length>=2){let t=e.length===2?[e[0],e[1],e[1]]:e.slice(0,3);m.gotas(t.map(e=>{let t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height*.45,r:Math.min(t.width,t.height)*.36}}),Number(t[1].dataset.escala??1))}}else m.gotas(null)}};return O=requestAnimationFrame(ee),()=>{h=!1,cancelAnimationFrame(O),g?.destroy(),m?.destruir(),c.classList.remove(`mundo-listo`)}},[d]),(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`canvas`,{ref:e,className:`mundo`,"aria-hidden":`true`}),(0,P.jsx)(`img`,{ref:r,className:`mundo-fijo`,alt:``,"aria-hidden":`true`,decoding:`async`}),(0,P.jsx)(`div`,{ref:n,className:`mundo-pantallas`,"aria-hidden":`true`}),Object.entries(ye).map(([e,t])=>(0,D.createPortal)((0,P.jsx)(t,{}),d[e],e)),(0,P.jsx)(`div`,{ref:i,className:`orbe-real`,"aria-hidden":`true`,style:{width:ke,height:ke,opacity:0},children:c&&(0,P.jsx)(fe,{className:`orbe-real__lienzo`,alListo:e=>(o.current=e,e.estado(s.current),()=>{o.current=null})})}),(0,P.jsx)(`div`,{ref:t,className:`rotulos`,"aria-hidden":`true`,children:Ne.map(e=>(0,P.jsx)(`div`,{"data-rotulo":e.id,className:`rotulo ${e.clase}`,style:{visibility:`hidden`,opacity:0},children:e.contenido},e.id))})]})}export{Le as default};