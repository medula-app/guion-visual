import{z as We,r as L,x as Xe,y as He,j as n,V as Le,a as Ke,e as Je,c as Ze,d as ea,q as qe}from"./index-CZTzXJFl.js";import{N as K,P as Ie}from"./clientes-DpxNn7UL.js";import{c as g,W as aa,S as ta,P as oa,G as Re,C as na,B as $e,d as Y,a as be,A as ge,b as ra,L as Ve,E as sa,I as ia,g as la,h as ca,i as ua,j as da,e as ma,k as pa,Q as ye,l as fa,m as va,M as ce}from"./three-D0KRdqyX.js";import{B as ha,a as ke}from"./Boton-DMp7D1Se.js";const $=[{id:"Clientes",color:"#3d8bff",dir:new g(1,1,1)},{id:"Procesos",color:"#7d6bff",dir:new g(-1,-1,1)},{id:"Equipo",color:"#35d0ff",dir:new g(-1,1,-1)},{id:"Reuniones",color:"#5b5cff",dir:new g(1,-1,-1)}].map(i=>{const p=i.dir.normalize(),r=new g(0,1,0).addScaledVector(p,-p.y).normalize(),u=p.clone().addScaledVector(r,.62).normalize().multiplyScalar(1.12);return{...i,dir:p,rotulo:u}}),we={constelacion:0,fibra:1,arco:2};function xa(i){let p=i>>>0;return()=>{p=p+1831565813>>>0;let r=p;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}function Be(i,p,r){const u=()=>(r()+r()+r()-1.5)/1.5,b=new g().crossVectors(i,Math.abs(i.y)<.9?new g(0,1,0):new g(1,0,0)).normalize(),C=new g().crossVectors(i,b).normalize();return i.clone().addScaledVector(b,u()*p).addScaledVector(C,u()*p).normalize()}function Ge(i,p,r,u){const b=[];for(let C=0;C<=u;C++){const z=C/u,v=1-z;b.push(new g().addScaledVector(i,v*v).addScaledVector(p,2*v*z).addScaledVector(r,z*z))}return b}function ba(i=1700,p=2600){const r=xa(20260927),u=i*$.length+p,b=new Float32Array(u*3),C=new Float32Array(u),z=new Float32Array(u),v=new Float32Array(u),J=$.map(()=>[]);let y=0;$.forEach((l,m)=>{for(let h=0;h<i;h++,y++){const f=Be(l.dir,.62,r),S=1+(r()-.5)*.06;b.set([f.x*S,f.y*S,f.z*S],y*3),C[y]=m,z[y]=r(),v[y]=.6+Math.pow(r(),6)*3.2,J[m].push(y)}});for(let l=0;l<p;l++,y++){const m=new g(r()*2-1,r()*2-1,r()*2-1).normalize(),h=1+(r()-.5)*.08;b.set([m.x*h,m.y*h,m.z*h],y*3),C[y]=$.length,z[y]=r(),v[y]=.35+r()*.6}const V=$.map(()=>0),w=K.map(l=>{const m=$.findIndex(S=>S.id===l.carpeta),h=V[m]++,f=Be($[m].dir,.2+h*.12,r);return{ruta:l.ruta,titulo:l.titulo,area:m,pos:f.multiplyScalar(1.01)}}),d=[],W=[],ae=[],Q=[],j=[],Z=[],k=[],X=(l,m,h,f,S,N,e,t=-1,c=-1)=>{d.push(l.x,l.y,l.z,m.x,m.y,m.z),W.push(h,h),ae.push(f,f),Q.push(S,N),j.push(e,e),Z.push(t,t),k.push(c,c)},A=l=>new g(b[l*3],b[l*3+1],b[l*3+2]);let F=0;J.forEach((l,m)=>{for(let h=0;h<l.length;h+=2){const f=l[h],S=A(f);let N=-1,e=.1;for(let t=0;t<60;t++){const c=l[Math.floor(r()*l.length)];if(c===f)continue;const T=S.distanceTo(A(c));T<e&&(e=T,N=c)}N>=0&&(X(S,A(N),m,we.constelacion,0,1,z[f]),F++)}}),J.forEach((l,m)=>{const h=l.filter(f=>v[f]>1.2).slice(0,46);for(const f of h){const S=A(f),N=$[m].dir.clone().multiplyScalar(.55),e=Ge(S,N,new g(0,0,0),18);for(let t=0;t<e.length-1;t++)X(e[t],e[t+1],m,we.fibra,t/(e.length-1),(t+1)/(e.length-1),z[f]);F++}});const H=new Set;return K.forEach((l,m)=>{for(const h of l.enlaces){const f=K.findIndex(B=>B.ruta===h);if(f<0)continue;const S=[m,f].sort().join("-");if(H.has(S))continue;H.add(S);const N=w[m].pos,e=w[f].pos,c=N.clone().add(e).multiplyScalar(.5).clone().setLength(Math.max(.15,1-N.distanceTo(e)*.42)),T=Ge(N,c,e,40);for(let B=0;B<T.length-1;B++)X(T[B],T[B+1],w[m].area,we.arco,B/(T.length-1),(B+1)/(T.length-1),.5,m,f);F++}}),{memorias:{pos:b,area:C,semilla:z,tam:v,n:u},notas:w,lineas:{pos:new Float32Array(d),area:new Float32Array(W),tipo:new Float32Array(ae),avance:new Float32Array(Q),semilla:new Float32Array(j),de:new Float32Array(Z),a:new Float32Array(k)},conteo:{memorias:u,conexiones:F,porArea:J.map(l=>l.length)}}}const ga="#5b7fc4",D={lejos:3.6,cerca:2.25,min:1.7,max:6},ya=`
  uniform float uTiempo;
  uniform float uPixel;
  uniform float uFoco;      // área en foco (-1 = ninguna)
  uniform float uPensar;    // 0–1, el cerebro "busca"
  uniform vec3 uColores[5];
  attribute float aArea;
  attribute float aSemilla;
  attribute float aTam;
  varying vec3 vColor;
  varying float vAlfa;
  void main() {
    vec3 p = position;
    // respiración: la cáscara late apenas, más al pensar
    p *= 1.0 + sin(uTiempo * 1.3 + aSemilla * 30.0) * (0.004 + uPensar * 0.01);
    vec4 mundo = modelMatrix * vec4(p, 1.0);
    vec4 mv = viewMatrix * mundo;
    // de frente o de espaldas a la cámara
    vec3 normal = normalize(mat3(modelMatrix) * normalize(position));
    vec3 aCam = normalize(cameraPosition - mundo.xyz);
    float frente = dot(normal, aCam);
    float lado = mix(0.18, 1.0, smoothstep(-0.35, 0.45, frente));
    float enFoco = (uFoco < -0.5 || abs(uFoco - aArea) < 0.5) ? 1.0 : 0.12;
    float centelleo = 0.65 + 0.35 * sin(uTiempo * (0.8 + aSemilla * 2.2) + aSemilla * 70.0);
    vColor = uColores[int(aArea + 0.5)];
    vAlfa = lado * enFoco * centelleo * (aArea > 3.5 ? 0.6 : 1.0);
    gl_PointSize = (1.3 + aTam * 1.6) * uPixel * (2.8 / -mv.z) * (1.0 + uPensar * 0.25);
    gl_Position = projectionMatrix * mv;
  }
`,wa=`
  varying vec3 vColor;
  varying float vAlfa;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float disco = smoothstep(0.5, 0.05, d);
    float centro = smoothstep(0.16, 0.0, d);
    gl_FragColor = vec4(vColor + centro * 0.6, (disco * 0.75 + centro) * vAlfa);
  }
`,ja=`
  uniform float uFoco;
  uniform float uNota;      // nota enfocada (-1 = ninguna)
  uniform vec3 uColores[5];
  attribute float aArea;
  attribute float aTipo;
  attribute float aAvance;
  attribute float aSemilla;
  attribute float aDe;
  attribute float aA;
  varying vec3 vColor;
  varying float vTipo;
  varying float vAvance;
  varying float vSemilla;
  varying float vFrente;
  varying float vEnFoco;
  varying float vSentido;   // arcos: +1 sale de la nota enfocada, -1 llega a ella, 0 ajeno
  void main() {
    vec4 mundo = modelMatrix * vec4(position, 1.0);
    vec3 aCam = normalize(cameraPosition - mundo.xyz);
    float r = length(position);
    vec3 normal = normalize(mat3(modelMatrix) * (r > 0.001 ? position / r : vec3(0.0, 0.0, 1.0)));
    // las fibras de adentro no se apagan tanto por estar "detrás"
    vFrente = mix(1.0, smoothstep(-0.4, 0.5, dot(normal, aCam)), smoothstep(0.6, 0.95, r));
    vColor = uColores[int(aArea + 0.5)];
    vTipo = aTipo;
    vAvance = aAvance;
    vSemilla = aSemilla;
    vEnFoco = (uFoco < -0.5 || abs(uFoco - aArea) < 0.5) ? 1.0 : 0.1;
    vSentido = 0.0;
    if (uNota > -0.5) {
      if (abs(aDe - uNota) < 0.5) vSentido = 1.0;
      else if (abs(aA - uNota) < 0.5) vSentido = -1.0;
    }
    gl_Position = projectionMatrix * viewMatrix * mundo;
  }
`,Aa=`
  uniform float uTiempo;
  uniform float uPensar;
  uniform float uNota;
  varying vec3 vColor;
  varying float vTipo;
  varying float vAvance;
  varying float vSemilla;
  varying float vFrente;
  varying float vEnFoco;
  varying float vSentido;
  float pulso(float fase, float ancho) {
    float d = fract(fase);
    return smoothstep(ancho, 0.0, d) * smoothstep(0.0, 0.02, d) + smoothstep(1.0 - 0.02, 1.0, d);
  }
  void main() {
    float a;
    vec3 col = vColor;
    if (vTipo < 0.5) {
      // constelación: hilo fino
      a = 0.11;
    } else if (vTipo < 1.5) {
      // fibra: pulsos que bajan de la cáscara al núcleo; al pensar, más y más rápido
      float vel = 0.18 + uPensar * 0.9;
      float p = pulso(vSemilla * 7.0 + uTiempo * vel - vAvance, 0.12);
      a = 0.07 + p * (0.35 + uPensar * 0.55);
      col = mix(col, vec3(1.0), p * 0.5);
    } else {
      // arco entre notas reales: siempre visible; si toca la nota enfocada,
      // brilla y los pulsos salen de ella
      float activo = abs(vSentido);
      float dir = vSentido >= 0.0 ? vAvance : 1.0 - vAvance;
      float p = pulso(uTiempo * 0.55 - dir, 0.18) * activo;
      a = (uNota > -0.5 ? mix(0.12, 0.7, activo) : 0.4) + p * 0.9;
      col = mix(col, vec3(1.0), 0.35 + p * 0.5);
    }
    gl_FragColor = vec4(col, a * vFrente * max(vEnFoco, abs(vSentido)));
  }
`;function Sa(i,p,r){const u=matchMedia("(prefers-reduced-motion: reduce)").matches,b=new aa({canvas:i,antialias:!0,alpha:!0}),C=Math.min(devicePixelRatio,1.75);b.setPixelRatio(C),b.setClearColor(0,0);const z=new ta,v=new oa(40,1,.05,50);let J=1,y=D.lejos,V=D.lejos;v.position.set(0,0,y);const w=new Re;z.add(w);const d=ba(),W=$,ae=[...W.map(a=>a.color),ga];let Q=null;const j={uTiempo:{value:0},uPixel:{value:C},uFoco:{value:-1},uNota:{value:-1},uPensar:{value:0},uColores:{value:ae.map(a=>new na(a))}},Z={transparent:!0,depthWrite:!1,blending:ge},k=new $e;k.setAttribute("position",new Y(d.memorias.pos,3)),k.setAttribute("aArea",new Y(d.memorias.area,1)),k.setAttribute("aSemilla",new Y(d.memorias.semilla,1)),k.setAttribute("aTam",new Y(d.memorias.tam,1));const X=new be({vertexShader:ya,fragmentShader:wa,uniforms:j,...Z});w.add(new ra(k,X));const A=d.lineas,F=new $e;F.setAttribute("position",new Y(A.pos,3)),F.setAttribute("aArea",new Y(A.area,1)),F.setAttribute("aTipo",new Y(A.tipo,1)),F.setAttribute("aAvance",new Y(A.avance,1)),F.setAttribute("aSemilla",new Y(A.semilla,1)),F.setAttribute("aDe",new Y(A.de,1)),F.setAttribute("aA",new Y(A.a,1));const H=new be({vertexShader:ja,fragmentShader:Aa,uniforms:j,...Z});w.add(new Ve(F,H));const l=new Re,m=new sa(new ia(.075,1)),h=new la({color:12574975,transparent:!0,opacity:.55,blending:ge,depthWrite:!1});l.add(new Ve(m,h));const f=(()=>{const a=document.createElement("canvas");a.width=a.height=128;const o=a.getContext("2d"),s=o.createRadialGradient(64,64,0,64,64,64);return s.addColorStop(0,"rgba(190,225,255,1)"),s.addColorStop(.25,"rgba(90,150,255,0.45)"),s.addColorStop(1,"rgba(40,80,255,0)"),o.fillStyle=s,o.fillRect(0,0,128,128),new ca(a)})(),S=new ua({map:f,blending:ge,depthWrite:!1,transparent:!0}),N=new da(S);N.scale.setScalar(.4),l.add(N),w.add(l);const e=new be({vertexShader:`varying vec3 vN; varying vec3 vV;
      void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = -mv.xyz; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec3 vN; varying vec3 vV; uniform float uPensar;
      void main() { float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 3.5);
        gl_FragColor = vec4(mix(vec3(0.25, 0.5, 1.0), vec3(0.6, 0.45, 1.0), uPensar), f * (0.32 + uPensar * 0.2)); }`,uniforms:j,...Z}),t=new ma(new pa(1.06,64,48),e);z.add(t);const c=()=>{const{clientWidth:a,clientHeight:o}=i;!a||!o||(b.setSize(a,o,!1),v.aspect=a/o,J=Math.max(1,1.3/(Math.tan(ce.degToRad(v.fov/2))*(a/o)*D.lejos)),v.updateProjectionMatrix())},T=new ResizeObserver(c);T.observe(i),c();const B=new ye().setFromEuler(new fa(.35,-.6,0));w.quaternion.copy(B);const x=new va(0,0);let M=null,G=-10;const te=new g(0,1,0),q=new g(1,0,0),R=new ye,_=(a,o)=>{R.setFromAxisAngle(te,a),w.quaternion.premultiply(R),R.setFromAxisAngle(q,o),w.quaternion.premultiply(R)};let ue=new g(0,0,1);const De=a=>{const o=a.clone().normalize().applyQuaternion(w.quaternion);return new ye().setFromUnitVectors(o,ue).multiply(w.quaternion.clone())},se=(a,o)=>{if(x.set(0,0),V=o?D.cerca:D.lejos,!a){M=null;return}const s=v.aspect<.9;ue=o&&!s?new g(-.42,.06,1).normalize():o?new g(0,.3,1).normalize():new g(0,0,1);const I=De(a);M={desde:w.quaternion.clone(),hasta:I,t:0,dur:u?.001:1.3}},ee=new Map;let O={activo:!1,x:0,y:0,t:0,movido:0},de=0;const je=a=>{if(i.setPointerCapture(a.pointerId),ee.set(a.pointerId,{x:a.clientX,y:a.clientY}),ee.size===2){const[o,s]=[...ee.values()];de=Math.hypot(o.x-s.x,o.y-s.y)}O={activo:!0,x:a.clientX,y:a.clientY,t:performance.now(),movido:0},M=null,x.set(0,0),G=ne},Ae=a=>{if(ee.has(a.pointerId)&&ee.set(a.pointerId,{x:a.clientX,y:a.clientY}),ee.size===2){const[o,s]=[...ee.values()],I=Math.hypot(o.x-s.x,o.y-s.y);de&&(V=ce.clamp(V*(de/I),D.min,D.max)),de=I;return}if(O.activo){const o=a.clientX-O.x,s=a.clientY-O.y,I=performance.now(),re=Math.max(1,I-O.t)/1e3,P=.0055*(y/D.lejos);_(o*P,s*P),x.set(o*P/re,s*P/re),O={activo:!0,x:a.clientX,y:a.clientY,t:I,movido:O.movido+Math.abs(o)+Math.abs(s)},G=ne,p.alPasarMemoria?.(null);return}Qe(a)},me=a=>{ee.delete(a.pointerId),ee.size<2&&(de=0);const o=O.activo&&O.movido<6;performance.now()-O.t>80&&x.set(0,0),O.activo=!1,o&&a.target===i&&p.alTocarNota?.(Q)},Se=a=>{if(!a.ctrlKey&&!a.metaKey){p.alPedirCtrl?.();return}a.preventDefault(),V=ce.clamp(V*Math.exp(a.deltaY*.0012),D.min,D.max),G=ne},Ce=()=>{se(null,!1),p.alTocarNota?.(null)};i.addEventListener("pointerdown",je),i.addEventListener("pointermove",Ae),i.addEventListener("pointerup",me),i.addEventListener("pointercancel",me),i.addEventListener("wheel",Se,{passive:!1}),i.addEventListener("dblclick",Ce);const oe=new g;let Ne=0;const Qe=a=>{const o=performance.now();if(o-Ne<60)return;Ne=o;const s=i.getBoundingClientRect(),I=a.clientX-s.left,re=a.clientY-s.top,P=d.memorias.pos;let E=-1,ie=121;for(let le=0;le<d.memorias.n;le+=1){if(oe.set(P[le*3],P[le*3+1],P[le*3+2]).applyQuaternion(w.quaternion),oe.z<.1)continue;oe.project(v);const Ue=(oe.x*.5+.5)*s.width,Ye=(-oe.y*.5+.5)*s.height,Ee=(Ue-I)**2+(Ye-re)**2;Ee<ie&&(ie=Ee,E=le)}const xe=E>=0?d.memorias.rutas?.[E]??null:null;if(Q=xe,E<0||(d.memorias.rutas?!xe:d.memorias.area[E]>3.5))return p.alPasarMemoria?.(null);oe.set(P[E*3],P[E*3+1],P[E*3+2]).applyQuaternion(w.quaternion).project(v),p.alPasarMemoria?.({area:d.memorias.area[E],x:(oe.x*.5+.5)*s.width,y:(-oe.y*.5+.5)*s.height,ruta:xe??void 0})};let Me=!1;const ze=new IntersectionObserver(([a])=>Me=a.isIntersecting);ze.observe(i);let ne=0,pe=0,Fe=0,he=0,Te=performance.now();const fe=d.notas.map(a=>({ruta:a.ruta,x:0,y:0,visible:0})),ve=W.map(()=>({x:0,y:0,visible:0})),U=new g,_e=new g,Pe=a=>{he=requestAnimationFrame(Pe);const o=(a-Te)/1e3,s=Math.min(.05,o);if(Te=a,!Me)return;if(ne+=s,j.uTiempo.value+=u?0:s,pe+=(Fe-pe)*Math.min(1,s*3),j.uPensar.value=pe,M){M.t=Math.min(1,M.t+Math.min(.25,o)/M.dur);const P=1-Math.pow(1-M.t,3);w.quaternion.slerpQuaternions(M.desde,M.hasta,P),M.t>=1&&(M=null)}else O.activo||(x.lengthSq()>1e-6?(_(x.x*s,x.y*s),x.multiplyScalar(Math.pow(.04,s))):!u&&ne-G>5&&j.uNota.value<-.5&&_(s*.05,0));y+=(V-y)*Math.min(1,s*4),v.position.z=y*J,l.rotation.y+=s*.4,l.rotation.x+=s*.15,N.scale.setScalar(.34+Math.sin(ne*2)*.03+pe*.3),b.render(z,v);const I=i.clientWidth,re=i.clientHeight;d.notas.forEach((P,E)=>{U.copy(P.pos).applyQuaternion(w.quaternion),_e.copy(v.position).sub(U).normalize();const ie=U.clone().normalize().dot(_e);U.project(v),fe[E].x=(U.x*.5+.5)*I,fe[E].y=(-U.y*.5+.5)*re,fe[E].visible=ce.smoothstep(ie,-.15,.25)}),W.forEach((P,E)=>{U.copy(P.rotulo).applyQuaternion(w.quaternion);const ie=U.clone().normalize().z;U.project(v),ve[E].x=(U.x*.5+.5)*I,ve[E].y=(-U.y*.5+.5)*re,ve[E].visible=ce.smoothstep(ie,-.2,.3)}),p.alCuadro?.(fe,ve)};return he=requestAnimationFrame(Pe),{grafo:d,enfocarNota(a){const o=d.notas.findIndex(s=>s.ruta===a);j.uNota.value=o,j.uFoco.value=-1,se(o>=0?d.notas[o].pos:null,o>=0)},enfocarArea(a,o=!1){j.uFoco.value=a??-1,o&&a!==null&&(j.uNota.value=-1,se(W[a].dir,!1))},enfocarRuta(a){const o=d.notas.findIndex(I=>I.ruta===a);if(o>=0)return j.uNota.value=o,j.uFoco.value=-1,se(d.notas[o].pos,!0);const s=d.memorias.rutas?.indexOf(a)??-1;s<0||(j.uNota.value=-1,j.uFoco.value=d.memorias.area[s],se(new g(d.memorias.pos[s*3],d.memorias.pos[s*3+1],d.memorias.pos[s*3+2]),!0))},pensar(a){Fe=a?1:0},vistaGeneral(){j.uNota.value=-1,j.uFoco.value=-1,se(null,!1)},zoom(a){V=ce.clamp(V*a,D.min,D.max)},girarTeclado(a,o){M=null,x.set(a,o),G=ne},destruir(){cancelAnimationFrame(he),T.disconnect(),ze.disconnect(),i.removeEventListener("pointerdown",je),i.removeEventListener("pointermove",Ae),i.removeEventListener("pointerup",me),i.removeEventListener("pointercancel",me),i.removeEventListener("wheel",Se),i.removeEventListener("dblclick",Ce),k.dispose(),X.dispose(),F.dispose(),H.dispose(),m.dispose(),h.dispose(),S.dispose(),t.geometry.dispose(),e.dispose(),f.dispose(),b.dispose(),We(b)}}}const Oe=i=>i.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");function Fa(){const i=L.useRef(null),p=L.useRef(null),r=L.useRef(null),[u,b]=L.useState(null),[C,z]=L.useState(null),[v,J]=L.useState(""),[y,V]=L.useState(null),[w,d]=L.useState(!1),[W,ae]=L.useState(!1),[Q,j]=L.useState(null),Z=L.useRef(0),k=L.useRef(null),X=L.useMemo(()=>{const e=Oe(v.trim());return e?new Set(K.filter(t=>Oe([t.titulo,t.ruta,...t.lineas].join(" ")).includes(e)).map(t=>t.ruta)):new Set},[v]),A=e=>{b(e),z(null),r.current?.enfocarNota(e?.ruta??null)},F=L.useRef(null),H=Xe(F),[l,m]=L.useState(0);L.useEffect(()=>{H||m(e=>e+1)},[H]),L.useEffect(()=>{if(!H)return;const e=i.current,t=new Map,c=Sa(e,{alCuadro:(x,M)=>{const G=p.current;if(!G)return;const te=(q,R,_)=>{const ue=q.id+R;t.get(ue)!==_&&(t.set(ue,_),q.style.setProperty(R==="tr"?"transform":R==="op"?"opacity":R==="pe"?"pointer-events":"z-index",_))};x.forEach((q,R)=>{const _=G.children.namedItem(`nota-${R}`);_&&(te(_,"tr",`translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0)`),te(_,"op",q.visible.toFixed(2)),te(_,"pe",q.visible>.3?"auto":"none"),te(_,"zi",String(Math.round(q.visible*10))))}),M.forEach((q,R)=>{const _=G.children.namedItem(`area-${R}`);_&&(te(_,"tr",`translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0)`),te(_,"op",(q.visible*.95).toFixed(2)))})},alTocarNota:x=>{x===null&&(b(null),c.vistaGeneral())},alPasarMemoria:x=>{const M=k.current;x&&M&&(M.style.transform=`translate3d(${x.x.toFixed(0)}px, ${x.y.toFixed(0)}px, 0)`),V(G=>G?.area===x?.area?G:x)},alPedirCtrl:()=>{d(!0),clearTimeout(Z.current),Z.current=window.setTimeout(()=>d(!1),1600)}});r.current=c,j(c.grafo.conteo);let T=0;const B=He(x=>{x.tipo==="pensar"&&(c.pensar(!0),ae(!0),clearTimeout(T),T=window.setTimeout(()=>{c.pensar(!1),ae(!1)},2600)),(x.tipo==="hablar"||x.tipo==="exito"||x.tipo==="guardar")&&(clearTimeout(T),T=window.setTimeout(()=>{c.pensar(!1),ae(!1)},400))});return()=>{B(),clearTimeout(T),c.destruir(),r.current=null}},[H]);const h=()=>{const e=Ie[Math.floor(Math.random()*Ie.length)],t=K.find(c=>c.ruta===e.fuentes[0])??null;A(null),qe.pensar("cerebro"),window.setTimeout(()=>{A(t),qe.decir("cerebro",e.respuesta)},1800)},f=e=>{e.preventDefault();const t=K.find(c=>X.has(c.ruta));t&&A(t)},S=e=>{if(e.target.tagName==="INPUT")return;const t=r.current;if(!t)return;const c=1.6;if(e.key==="ArrowLeft")t.girarTeclado(-c,0);else if(e.key==="ArrowRight")t.girarTeclado(c,0);else if(e.key==="ArrowUp")t.girarTeclado(0,-c);else if(e.key==="ArrowDown")t.girarTeclado(0,c);else if(e.key==="+"||e.key==="=")t.zoom(.85);else if(e.key==="-")t.zoom(1.18);else if(e.key==="Escape")A(null);else return;e.preventDefault()},N=u?[...new Set([...u.enlaces,...K.filter(e=>e.enlaces.includes(u.ruta)).map(e=>e.ruta)])]:[];return n.jsx("section",{className:"lab",id:"cerebro",children:n.jsxs(Le,{radio:44,refractar:!1,className:"lab__lamina lamina-vidrio",children:[n.jsxs("header",{className:"lab__cabeza",children:[n.jsx("p",{className:"eyebrow",children:"Producto · Cerebro 3D"}),n.jsx("h2",{className:"lab__titulo",children:"Toda la memoria, en un globo que se mueve"}),n.jsx("p",{className:"lab__bajada",children:"Cada área de la empresa es una región de luz. Las fibras bajan hasta Medula, al centro, y laten cada vez que alguien le pregunta algo. Arrastra para girar, toca una nota para viajar hasta ella y ver con qué se conecta."})]}),n.jsxs("div",{className:`cerebro2 ${W?"es-pensando":""}`,onKeyDown:S,children:[n.jsx("span",{ref:F,className:"sentinela","aria-hidden":"true"}),n.jsx("canvas",{ref:i,className:"cerebro2__lienzo",tabIndex:0,"aria-label":"Cerebro de la empresa en 3D. Flechas para girar, más y menos para acercar, Escape para volver."},l),n.jsxs("div",{ref:p,className:"cerebro2__capa",children:[$.map((e,t)=>n.jsx("span",{id:`area-${t}`,className:`area-3d ${C===t?"es-foco":""}`,style:{"--c":e.color},"aria-hidden":"true",children:e.id},e.id)),K.map((e,t)=>{const c=u&&u.ruta!==e.ruta&&!N.includes(e.ruta);return n.jsxs("button",{id:`nota-${t}`,type:"button",className:`estrella ${u?.ruta===e.ruta?"es-foco":""} ${X.has(e.ruta)?"es-hallada":""} ${c?"es-lejana":""}`,onClick:()=>A(e),children:[n.jsx("i",{"aria-hidden":"true"}),n.jsx("span",{children:e.titulo})]},e.ruta)})]}),y&&!u&&n.jsxs("span",{ref:k,className:"cerebro2__memoria",style:{transform:`translate3d(${y.x}px, ${y.y}px, 0)`},"aria-hidden":"true",children:["Memoria de ejemplo · ",$[y.area].id]}),n.jsxs("div",{className:"cerebro2__arriba",children:[n.jsxs("form",{className:"cerebro2__buscar",onSubmit:f,role:"search",children:[n.jsx(Ke,{}),n.jsx("input",{id:"cerebro-buscar",value:v,onChange:e=>J(e.target.value),placeholder:"Buscar una nota…","aria-label":"Buscar una nota en el cerebro",autoComplete:"off"}),v&&n.jsx("span",{className:"cerebro2__hallazgos",children:X.size})]}),n.jsx("div",{className:"cerebro2__leyenda",role:"group","aria-label":"Áreas",children:$.map((e,t)=>n.jsxs("button",{type:"button",className:`leyenda-area ${C===t?"es-activa":""}`,style:{"--c":e.color},"aria-pressed":C===t,onPointerEnter:()=>!u&&C===null&&r.current?.enfocarArea(t),onPointerLeave:()=>!u&&C===null&&r.current?.enfocarArea(null),onClick:()=>{const c=C===t?null:t;z(c),b(null),c===null?r.current?.vistaGeneral():r.current?.enfocarArea(c,!0)},children:[n.jsx("i",{"aria-hidden":"true"}),e.id,Q&&n.jsx("small",{children:Q.porArea[t].toLocaleString("es-CL")})]},e.id))})]}),n.jsx(Le,{radio:26,bisel:22,refraccion:36,className:`cerebro2__ficha ${u?"es-visible":""}`,"aria-live":"polite",children:u&&n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"nota__ruta",children:u.ruta}),n.jsx("strong",{children:u.titulo}),n.jsx("ul",{children:u.lineas.map(e=>n.jsx("li",{children:e},e))}),n.jsx("p",{className:"nota__rotulo",children:"Conectada con"}),n.jsx("div",{className:"respuesta__fuentes",children:N.map(e=>n.jsxs("button",{type:"button",className:"fuente",onClick:()=>A(K.find(t=>t.ruta===e)??null),children:[n.jsx(Je,{})," ",e]},e))}),n.jsx("button",{type:"button",className:"boton boton--fantasma",onClick:()=>A(null),children:"Vista general"})]})}),n.jsxs("div",{className:"cerebro2__abajo",children:[n.jsx("p",{className:"cerebro2__cifras",children:Q?`${$.length} áreas · ${K.length} notas · ${Q.memorias.toLocaleString("es-CL")} memorias de ejemplo · ${Q.conexiones.toLocaleString("es-CL")} conexiones`:""}),n.jsxs("div",{className:"cerebro2__acciones",children:[n.jsx(ha,{icono:n.jsx(Ze,{}),cargando:W?"Buscando…":void 0,onClick:h,children:"Simular una pregunta"}),n.jsx(ke,{etiqueta:"Acercar",variante:"noche",onClick:()=>r.current?.zoom(.82),children:n.jsx(ea,{})}),n.jsx(ke,{etiqueta:"Alejar",variante:"noche",onClick:()=>r.current?.zoom(1.22),children:n.jsx("span",{"aria-hidden":"true",children:"−"})})]})]}),n.jsx("p",{className:`cerebro2__pista ${w?"es-visible":""}`,role:"status",children:"Usa Ctrl + rueda (o pellizca) para acercar"})]})]})})}export{Fa as Cerebro};
