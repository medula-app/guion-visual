import{z as me,r as u,x as fe,j as e,V as re,S as pe,c as xe,q as k,I as ge,b as he,B as be}from"./index-CZTzXJFl.js";import{W as ye,S as ze,P as Me,G as Ee,c as X,B as ie,d as se,a as q,A as Se,b as we,F as ce,L as Ae,I as le,D as Ce,e as Q,f as je,C as _e}from"./three-D0KRdqyX.js";import{P as ue}from"./clientes-DpxNn7UL.js";const J=`
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
`,K=`
  uniform float uTiempo;
  uniform float uEnergia;
  uniform float uGiro;
  uniform float uContraccion;
  uniform float uOnda;
  uniform float uPixel;
`,ve=`
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
`,Te=`
  ${K}
  attribute float aSemilla;
  varying float vBrillo;
  varying float vFrente;
  varying vec3 vDir;
  ${J}
  ${ve}
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
`,Ne=`
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
`,Re=`
  ${K}
  attribute float aSemilla;
  varying float vAlfa;
  varying float vFrente;
  ${J}
  ${ve}
  void main() {
    vec3 p = desplazar(position, aSemilla);
    vFrente = normalize((modelViewMatrix * vec4(normalize(p), 0.0)).xyz).z;
    vAlfa = 0.5 + 0.5 * sin(uTiempo * 1.5 + aSemilla * 40.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`,Fe=`
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
`,Pe=`
  ${K}
  uniform float uCapa;
  varying vec3 vNormal;
  varying vec3 vVista;
  varying vec3 vDir;
  varying float vRuido;
  ${J}
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
`,Ve=`
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
`,De=`
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
`,Oe=`
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
`,Le=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ge=`
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
`,Ie={reposo:{energia:.12,giro:0,contraccion:1,tinte:0},escuchando:{energia:.3,giro:0,contraccion:.93,tinte:0},pensando:{energia:.45,giro:1,contraccion:.88,tinte:.55},hablando:{energia:.35,giro:.15,contraccion:1.02,tinte:.15}},_={cian:"#6fe3ff",azul:"#1b75fd",violeta:"#7d5cff",pensar:"#9b7bff",exito:"#7ef0ff",error:"#ff6a5c"},C=s=>new _e(s);function Be(s,m){const p=[],y=Math.PI*(3-Math.sqrt(5));for(let r=0;r<s;r++){const S=1-r/(s-1)*2,x=Math.sqrt(1-S*S),z=y*r;p.push(new X(Math.cos(z)*x*m,S*m,Math.sin(z)*x*m))}return p}function qe(s,m={}){const p=m.puntos??9e3,y=matchMedia("(prefers-reduced-motion: reduce)").matches,r=new ye({canvas:s,alpha:!0,antialias:!0,premultipliedAlpha:!1}),S=Math.min(devicePixelRatio,1.75);r.setPixelRatio(S),r.setClearColor(0,0);const x=new ze,z=new Me(32,1,.1,50);z.position.set(0,0,m.distancia??4.6);const g=new Ee;x.add(g);const i={uTiempo:{value:0},uEnergia:{value:.12},uGiro:{value:0},uContraccion:{value:1},uOnda:{value:-1},uPixel:{value:S},uFlash:{value:0},uCian:{value:C(_.cian)},uAzul:{value:C(_.azul)},uVioleta:{value:C(_.violeta)},uTinte:{value:C(_.pensar)},uMezclaTinte:{value:0}},M={transparent:!0,depthWrite:!1,blending:Se},O=Be(p,1),c=new Float32Array(p*3),h=new Float32Array(p);O.forEach((o,d)=>{const n=new X((Math.random()-.5)*.05,(Math.random()-.5)*.05,(Math.random()-.5)*.05),l=o.clone().add(n).normalize().multiplyScalar(1+(Math.random()-.5)*.05);c.set([l.x,l.y,l.z],d*3),h[d]=Math.random()});const j=new ie;j.setAttribute("position",new se(c,3)),j.setAttribute("aSemilla",new se(h,1));const R=new q({vertexShader:Te,fragmentShader:Ne,uniforms:i,...M});g.add(new we(j,R));let v=null,F=null;if(m.lineas!==!1){const o=[];for(let E=0;E<p;E+=3)o.push(E);const d=[],n=[],l=new X;for(const E of o){const L=new X(c[E*3],c[E*3+1],c[E*3+2]);let B=0;for(const H of o){if(H<=E||B>=2)continue;l.set(c[H*3],c[H*3+1],c[H*3+2]),L.distanceTo(l)<.085&&Math.random()<.55&&(d.push(L.x,L.y,L.z,l.x,l.y,l.z),n.push(h[E],h[E]),B++)}}v=new ie,v.setAttribute("position",new ce(d,3)),v.setAttribute("aSemilla",new ce(n,1)),F=new q({vertexShader:Re,fragmentShader:Fe,uniforms:i,...M}),g.add(new Ae(v,F))}const P=new le(1,24),G=[{r:.34,a:"#1b75fd",b:"#8ff0ff",i:.42},{r:.46,a:"#3b3dff",b:"#2f8bff",i:.3},{r:.58,a:"#7d5cff",b:"#1b75fd",i:.2}].map((o,d)=>{const n=new q({vertexShader:Pe,fragmentShader:Ve,uniforms:{...i,uCapa:{value:d},uColorA:{value:C(o.a)},uColorB:{value:C(o.b)},uIntensidad:{value:o.i}},...M,side:Ce}),l=new Q(P,n);return l.scale.setScalar(o.r),l.rotation.set(d*.7,d*1.3,0),g.add(l),{m:n,malla:l}}),U=new q({vertexShader:De,fragmentShader:Oe,uniforms:i,...M}),I=new Q(new le(1.1,16),U);g.add(I);const a=new q({vertexShader:Le,fragmentShader:Ge,uniforms:i,...M}),b=new Q(new je(4.2,4.2),a);b.position.z=-1.4,x.add(b);let w="reposo",T=0;const t={energia:.12,vEnergia:0,giro:0,contraccion:1,vContraccion:0,tinte:0};let V=C(_.pensar),A=0,N=-1,D=0;const f={x:0,y:0,ix:0,iy:0,vx:0,vy:0},Z=()=>{const{clientWidth:o,clientHeight:d}=s;!o||!d||(r.setSize(o,d,!1),z.aspect=o/d,z.updateProjectionMatrix())},ee=new ResizeObserver(Z);ee.observe(s),Z();let ae=!0;const oe=new IntersectionObserver(([o])=>ae=o.isIntersecting);oe.observe(s);const de=m.fps??60;let $=0,W=0,te=performance.now();const ne=o=>{W=requestAnimationFrame(ne);const d=Math.min(.05,(o-te)/1e3);if(te=o,!ae||($+=d,$<1/de-.002))return;const n=Math.min(.05,$);$=0;const l=Ie[w],E=Math.min(1,l.energia+T*.8);t.vEnergia+=((E-t.energia)*90-t.vEnergia*14)*n,t.energia+=t.vEnergia*n,t.giro+=(l.giro-t.giro)*Math.min(1,n*2.5),t.vContraccion+=((l.contraccion-t.contraccion)*60-t.vContraccion*9)*n,t.contraccion+=t.vContraccion*n,D=Math.max(0,D-n*.8),t.tinte+=(Math.max(l.tinte,D)-t.tinte)*Math.min(1,n*3),D<=0&&w==="pensando"&&(V=C(_.pensar)),A=A>0?Math.min(1,A+n*.9):0,A>=1&&(A=0),N>=0&&(N+=n),N>4&&(N=-1),i.uTiempo.value+=y?0:n,i.uEnergia.value=Math.max(0,t.energia),i.uGiro.value=t.giro,i.uContraccion.value=t.contraccion,i.uOnda.value=N,i.uFlash.value=A,i.uMezclaTinte.value=t.tinte,i.uTinte.value.copy(V),f.vx+=((f.x-f.ix)*40-f.vx*10)*n,f.vy+=((f.y-f.iy)*40-f.vy*10)*n,f.ix+=f.vx*n,f.iy+=f.vy*n,y||(g.rotation.y+=n*(.08+t.giro*.5)),g.rotation.x=f.iy*.35,g.rotation.z=-f.ix*.15,G.forEach(({malla:L},B)=>{y||(L.rotation.y+=n*(.1+B*.06)*(B%2?-1:1))}),r.render(x,z)};return W=requestAnimationFrame(ne),{estado(o){w=o,o==="pensando"&&(V=C(_.pensar))},nivel(o){T=Math.max(0,Math.min(1,o))},puntero(o,d){f.x=o,f.y=d},pulso(o){if(o==="tecleo"){t.vEnergia+=1.4;return}N=0,A=.001,t.vEnergia+=o==="error"?3:2.2,V=C(o==="error"?_.error:_.exito),D=1,o==="error"&&(t.vContraccion-=1.5)},destruir(){cancelAnimationFrame(W),ee.disconnect(),oe.disconnect(),j.dispose(),R.dispose(),v?.dispose(),F?.dispose(),P.dispose(),G.forEach(({m:o})=>o.dispose()),I.geometry.dispose(),U.dispose(),b.geometry.dispose(),a.dispose(),r.dispose(),me(r)}}}function Ue({className:s,opciones:m,alListo:p}){const y=u.useRef(null),r=u.useRef(p);r.current=p;const S=u.useRef(null),x=fe(S),[z,g]=u.useState(0);return u.useEffect(()=>{x||g(i=>i+1)},[x]),u.useEffect(()=>{if(!x)return;const i=y.current,M=qe(i,m),O=r.current?.(M);let c=null,h=0;const j=R=>{c=R,!h&&(h=requestAnimationFrame(()=>{if(h=0,!c)return;const v=i.getBoundingClientRect();if(v.bottom<0||v.top>innerHeight)return;const F=(c.clientX-(v.left+v.width/2))/Math.max(innerWidth/2,1),P=(c.clientY-(v.top+v.height/2))/Math.max(innerHeight/2,1);M.puntero(Math.max(-1,Math.min(1,F)),Math.max(-1,Math.min(1,P)))}))};return addEventListener("pointermove",j,{passive:!0}),()=>{cancelAnimationFrame(h),removeEventListener("pointermove",j),typeof O=="function"&&O(),M.destruir()}},[x]),e.jsxs(e.Fragment,{children:[e.jsx("span",{ref:S,className:"sentinela","aria-hidden":"true"}),e.jsx("canvas",{ref:y,className:s,"aria-hidden":"true"},z)]})}const $e={reposo:"En reposo",escuchando:"Escuchando",pensando:"Pensando",hablando:"Hablando"},He={buscador:"Buscar en la memoria",chat:"Medula en el chat",cabezas:"Cabezas y brazos",notas:"Notas y memoria",estados:"Estados",acceso:"Acceso",orbe:"Este orbe"},Xe={tecleo:"Alguien escribe",pensar:"Buscando en la memoria",hablar:"Respondiendo",exito:"Salió bien",guardar:"Se guardó en la memoria",error:"Algo falló"};function We(s){const m=s.toLowerCase();return ue.find(y=>y.pregunta.toLowerCase().split(/\W+/).filter(r=>r.length>4).some(r=>m.includes(r)))?.respuesta??"No encontré eso en la memoria de Ferretería Los Andes. Puedo anotarlo si me dices en qué nota va."}function Ye(){const s=u.useRef(null),m=u.useRef(null),[p,y]=u.useState("reposo"),[r,S]=u.useState(""),[x,z]=u.useState(""),[g,i]=u.useState(!1),[M,O]=u.useState([]),[c,h]=u.useState("apagado"),[j,R]=u.useState(0),v=u.useRef(null),F=u.useRef(0),P=u.useRef(!1);P.current=g;const Y=a=>(m.current=a,s.current=be(a,{alEstado:y,alSubtitulo:S,conVoz:()=>P.current,alSenal:b=>{const w=new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit",second:"2-digit"});O(T=>[{...b,id:++F.current,hora:w},...T].slice(0,6))}}),()=>s.current?.destruir()),G=a=>{a.trim()&&(z(a),k.pensar("orbe"),setTimeout(()=>{const b=We(a);k.decir("orbe",b)},1300))},U=async()=>{if(v.current){I();return}try{const a=await navigator.mediaDevices.getUserMedia({audio:!0}),b=new AudioContext,w=b.createAnalyser();w.fftSize=512,b.createMediaStreamSource(a).connect(w);const T=new Uint8Array(w.fftSize);s.current?.estado("escuchando");let t=0;const V=()=>{w.getByteTimeDomainData(T);let A=0;for(const D of T)A+=((D-128)/128)**2;const N=Math.sqrt(A/T.length);t+=(Math.min(1,N*5)-t)*.3,m.current?.nivel(t),R(t),v.current.raf=requestAnimationFrame(V)};v.current={stream:a,ctx:b,raf:requestAnimationFrame(V)},h("activo")}catch{h("negado")}},I=()=>{const a=v.current;a&&(cancelAnimationFrame(a.raf),a.stream.getTracks().forEach(b=>b.stop()),a.ctx.close(),v.current=null,m.current?.nivel(0),R(0),h("apagado"),s.current?.estado("reposo"))};return u.useEffect(()=>()=>I(),[]),e.jsx("section",{className:"lab",id:"orbe",children:e.jsxs(re,{radio:44,refractar:!1,className:"lab__lamina lamina-vidrio",children:[e.jsxs("header",{className:"lab__cabeza",children:[e.jsx("p",{className:"eyebrow",children:"Producto · Medula"}),e.jsx("h2",{className:"lab__titulo",children:"La cara de Medula, viva"}),e.jsx("p",{className:"lab__bajada",children:"Miles de memorias forman su cáscara y un plasma de luz se dobla adentro. Escucha, piensa y habla, y reacciona en vivo a lo que pasa en toda la página: busca en ⌘K, conecta una cabeza o provoca un error, y mira. Si le das el micrófono, late con tu voz."})]}),e.jsxs("div",{className:"orbe-escena",children:[e.jsxs("div",{className:`orbe-escenario orbe-escenario--${p}`,children:[e.jsx(Ue,{className:"orbe-escenario__lienzo",alListo:Y}),e.jsxs("p",{className:"orbe-escenario__estado","aria-live":"polite",children:[e.jsx("i",{"aria-hidden":"true"}),$e[p]]}),e.jsx("p",{className:`orbe-escenario__subtitulo ${r?"es-visible":""}`,children:r})]}),e.jsxs("div",{className:"orbe-panel",children:[e.jsx(pe,{etiqueta:"Estado del orbe",valor:p,alCambiar:a=>s.current?.estado(a),opciones:[{valor:"reposo",texto:"Reposo"},{valor:"escuchando",texto:"Escucha"},{valor:"pensando",texto:"Piensa"},{valor:"hablando",texto:"Habla"}]}),e.jsxs("form",{className:"orbe-pregunta",onSubmit:a=>{a.preventDefault(),G(x)},children:[e.jsxs("label",{className:"campo__caja",htmlFor:"orbe-pregunta",children:[e.jsx(xe,{}),e.jsx("input",{id:"orbe-pregunta",value:x,onChange:a=>{z(a.target.value),k.tecleo("orbe")},placeholder:"Pregúntale algo a la empresa…",autoComplete:"off"})]}),e.jsx(re,{como:"button",type:"submit",radio:"pildora",bisel:12,refraccion:20,className:"boton-ico chat__enviar","aria-label":"Preguntar",children:e.jsx(ge,{})})]}),e.jsx("div",{className:"orbe-sugerencias",children:ue.map(a=>e.jsx("button",{type:"button",className:"sugerencia",onClick:()=>G(a.pregunta),children:a.pregunta},a.pregunta))}),e.jsxs("div",{className:"orbe-opciones",children:[e.jsxs("label",{className:"orbe-voz",children:[e.jsx("input",{type:"checkbox",checked:g,onChange:a=>i(a.target.checked)}),e.jsx("span",{children:"Que lo diga en voz alta"})]}),e.jsxs("button",{type:"button",className:`boton boton--fantasma orbe-mic ${c==="activo"?"es-activo":""}`,onClick:U,"aria-pressed":c==="activo",children:[e.jsx(he,{}),c==="activo"?"Apagar micrófono":"Usar mi micrófono",c==="activo"&&e.jsx("span",{className:"orbe-mic__nivel","aria-hidden":"true",children:e.jsx("i",{style:{transform:`scaleX(${j})`}})})]})]}),c==="negado"&&e.jsx("p",{className:"orbe-aviso",children:"El navegador no dio permiso para el micrófono. Puedes habilitarlo en el candado de la barra de direcciones."}),e.jsxs("div",{className:"orbe-registro",children:[e.jsx("p",{className:"nota__rotulo",children:"Lo que está pasando en la página"}),M.length?e.jsx("ol",{children:M.map(a=>e.jsxs("li",{className:`orbe-registro__item orbe-registro__item--${a.tipo}`,children:[e.jsx("i",{"aria-hidden":"true"}),e.jsxs("span",{children:[e.jsx("strong",{children:Xe[a.tipo]})," · ",He[a.origen]??a.origen]}),e.jsx("time",{children:a.hora})]},a.id))}):e.jsx("p",{className:"nota__vacio",children:"Todavía nada. Usa el buscador, conecta una cabeza o simula un error en Estados."})]})]})]})]})})}export{Ye as OrbeIA};
