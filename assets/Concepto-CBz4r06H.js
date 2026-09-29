import{r as R,x as ce,y as le,z as ue,j as r,V as de}from"./index-CZTzXJFl.js";import{W as pe,S as me,P as ve,V as fe,C as U,a as he,b as Me,G as xe,c as se,B as be,F as N,M as F}from"./three-D0KRdqyX.js";const C=24,G=24,$=-1.9,re=1.9,we=2.35,B=m=>({x:.1*Math.sin(m*Math.PI*2),z:.32*Math.sin(m*Math.PI*1.6+.4)}),ne=m=>F.lerp($,re,m);function Te(){const m=[],h=[],A=[],E=[],y=[],V=[],b=(s,n,i,o,u,c=-1,l=0)=>{m.push(s,n,i),h.push(Math.random()),A.push(o),E.push(u),y.push(c),V.push(l)};for(let s=0;s<C;s++){const n=s/(C-1),i=ne(n),o=B(n),u=F.lerp(1.25,.62,n);for(let c=0;c<380;c++){const l=Math.random()*Math.PI*2,d=(.3+Math.random()*.1)*u;b(o.x+Math.cos(l)*d*1.15,i+(Math.random()-.5)*.07,o.z+.1+Math.sin(l)*d*.8,0,n)}for(let c=0;c<80;c++){const l=c%3,d=Math.random();let M=0,w=0;l===0&&(M=.34+d*.36,w=-.14-d*.1),l===1&&(M=-.34-d*.36,w=-.14-d*.1),l===2&&(M=(Math.random()-.5)*.04,w=-.34-d*.42),b(o.x+M*u,i-d*.08+(Math.random()-.5)*.03,o.z+w*u,0,n)}for(let c=0;c<2;c++){const l=c?1:-1,d=s*2+c,M=1.1+Math.random()*.5,w=.25+Math.random()*.3,T=(Math.random()-.5)*.9;for(let I=0;I<70;I++){const S=Math.random(),_=1-S,z=o.x+l*(.12+_*M)*Math.cos(T),j=o.z+(.12+_*M)*Math.sin(T)*.8,P=i-_*_*w+(Math.random()-.5)*.025;b(z+(Math.random()-.5)*.02,P,j+(Math.random()-.5)*.02,3,n,d,S)}}}for(let s=0;s<2600;s++){const n=Math.random(),i=B(n),o=Math.random()*Math.PI*2,u=Math.sqrt(Math.random())*.075;b(i.x+Math.cos(o)*u,F.lerp(-2.05,2.2,n),i.z-.05+Math.sin(o)*u,1,n)}const p=B(1);for(let s=0;s<900;s++){const n=new se(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),i=.18+Math.pow(Math.random(),.6)*.3;b(p.x+n.x*i*1.2,we+n.y*i*.8,p.z+n.z*i,4,1)}for(let s=0;s<4800;s++){const n=Math.random(),i=B(n),o=Math.random()*Math.PI*2,u=.95+Math.pow(Math.random(),1.8)*1.8,c=Math.floor(Math.random()*7),l=o*.35+c*.9;b(i.x+Math.cos(l)*u,ne(n)+(Math.random()-.5)*.3,i.z+Math.sin(l)*u*.7,2,n)}const x=new be;return x.setAttribute("position",new N(m,3)),x.setAttribute("aSemilla",new N(h,1)),x.setAttribute("aTipo",new N(A,1)),x.setAttribute("aAltura",new N(E,1)),x.setAttribute("aNervio",new N(y,1)),x.setAttribute("aAvance",new N(V,1)),x}const ye=`
  uniform float uTiempo;
  uniform float uPixel;
  uniform float uCerebro;
  uniform vec4 uImp[${G}];  // x altura en el canal (-1 = aún en su nervio), y intensidad, z nervio, w avance en el nervio
  attribute float aSemilla;
  attribute float aTipo;
  attribute float aAltura;
  attribute float aNervio;
  attribute float aAvance;
  varying float vPulso;
  varying float vTipo;
  varying float vProfundidad;

  void main() {
    vec3 p = position;
    // deriva lenta de la nube (cada partícula a su ritmo)
    if (aTipo > 1.5 && aTipo < 2.5) {
      float w = uTiempo * (0.12 + aSemilla * 0.1) + aSemilla * 6.2831;
      p += vec3(sin(w), cos(w * 0.8), sin(w * 1.3)) * 0.04;
    }

    float pulso = 0.0;
    for (int i = 0; i < ${G}; i++) {
      vec4 im = uImp[i];
      if (im.y <= 0.0) continue;
      if (im.x >= 0.0) {
        // en el canal: la columna se enciende alrededor de su altura
        float d = aAltura - im.x;
        float cerca = exp(-d * d * 900.0);
        float conduce = aTipo < 0.5 ? 0.55 : (aTipo < 1.5 ? 1.0 : (aTipo < 2.5 ? 0.12 : 0.0));
        pulso += cerca * conduce * im.y;
      } else if (aTipo > 2.5 && aTipo < 3.5 && abs(aNervio - im.z) < 0.5) {
        // en su nervio: un punto de luz que corre hacia el canal
        float d = aAvance - im.w;
        pulso += exp(-d * d * 260.0) * im.y * 1.3;
      }
    }
    if (aTipo > 3.5) pulso += uCerebro * (0.55 + 0.45 * sin(uTiempo * 3.0 + aSemilla * 20.0));
    vPulso = clamp(pulso, 0.0, 1.0);
    vTipo = aTipo;

    // el anillo se abre un poco cuando pasa el impulso
    if (aTipo < 0.5) p.xz *= 1.0 + vPulso * 0.1;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vProfundidad = clamp((-mv.z - 3.0) / 5.0, 0.0, 1.0);
    float base = aTipo < 0.5 ? 2.0 : (aTipo < 1.5 ? 2.5 : (aTipo < 2.5 ? 1.5 + aSemilla * 1.5 : (aTipo < 3.5 ? 1.4 : 1.8)));
    gl_PointSize = base * (1.0 + vPulso * 2.2) * uPixel * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,_e=`
  uniform vec3 uTinta;
  uniform vec3 uImpulso;
  uniform vec3 uCielo;
  varying float vPulso;
  varying float vTipo;
  varying float vProfundidad;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float disco = smoothstep(0.5, 0.18, d);
    vec3 base = vTipo > 1.5 && vTipo < 2.5 ? uCielo : uTinta;
    vec3 col = mix(base, uImpulso, vPulso);
    float alfa = vTipo > 1.5 && vTipo < 2.5 ? 0.4 : (vTipo > 2.5 && vTipo < 3.5 ? 0.5 : (vTipo > 0.5 && vTipo < 1.5 ? 0.85 : 0.6));
    alfa = mix(alfa, 1.0, vPulso) * mix(1.0, 0.35, vProfundidad);
    gl_FragColor = vec4(col, disco * alfa);
  }
`;function ge({className:m,oscuro:h=!1}){const A=R.useRef(null),E=R.useRef(null),y=ce(E),[V,b]=R.useState(0);return R.useEffect(()=>{y||b(p=>p+1)},[y]),R.useEffect(()=>{const p=A.current;if(!p||!y)return;const x=matchMedia("(prefers-reduced-motion: reduce)").matches,s=new pe({canvas:p,alpha:!0,antialias:!0,powerPreference:"high-performance"}),n=Math.min(window.devicePixelRatio,2);s.setPixelRatio(n);const i=new me,o=new ve(34,1,.1,50);o.position.set(0,.15,7.6);const u=h?{tinta:"#a9c8ff",impulso:"#ffffff",cielo:"#3f7fe8"}:{tinta:"#0b2a8c",impulso:"#1b75fd",cielo:"#8fb8fb"},c=Array.from({length:G},()=>new fe(-1,0,-1,0)),l={uTiempo:{value:0},uPixel:{value:n},uCerebro:{value:0},uImp:{value:c},uTinta:{value:new U(u.tinta)},uImpulso:{value:new U(u.impulso)},uCielo:{value:new U(u.cielo)}},d=new he({uniforms:l,vertexShader:ye,fragmentShader:_e,transparent:!0,depthWrite:!1}),M=Te(),w=new Me(M,d),T=new xe;T.add(w),T.rotation.z=-.08,i.add(T);const I=()=>{const{clientWidth:e,clientHeight:a}=p;!e||!a||(s.setSize(e,a,!1),o.aspect=e/a,o.position.z=e/a<.8?10:7.6,o.updateProjectionMatrix())},S=new ResizeObserver(I);S.observe(p),I();const _=Array.from({length:G},()=>({activo:!1,nervio:0,fase:"nervio",avanceNervio:0,altura:0,vel:0,velNervio:0,intensidad:0}));let z=0;const j=(e={})=>{const a=_.find(g=>!g.activo);if(!a)return;const f=e.vertebra??Math.min(C-2,Math.floor(Math.pow(Math.random(),1.6)*(C-1)));Object.assign(a,{activo:!0,nervio:f*2+(Math.random()<.5?0:1),fase:e.baja?"canal":"nervio",avanceNervio:0,altura:e.baja?1:f/(C-1),vel:(e.baja?-1:1)*(.22+Math.random()*.3),velNervio:.9+Math.random()*.8,intensidad:(e.fuerza??1)*(.7+Math.random()*.3)})};let P=0,W=0;const O=[],H=(e,a=!1)=>{for(let f=0;f<e;f++)O.push(window.setTimeout(()=>j({baja:a}),f*(120+Math.random()*160)))};let Z=scrollY;const D=()=>{P=Math.min(9,P+Math.abs(scrollY-Z)/60),Z=scrollY};addEventListener("scroll",D,{passive:!0});const ie=le(e=>{e.tipo==="pensar"&&H(7),e.tipo==="hablar"&&H(4,!0),(e.tipo==="exito"||e.tipo==="guardar")&&H(3),e.tipo==="tecleo"&&j({fuerza:.6})}),J=e=>{const a=p.getBoundingClientRect(),f=-((e.clientY-a.top)/a.height)*2+1,g=new se(0,f,.5).unproject(o).sub(o.position).normalize(),t=o.position.y+g.y*(o.position.z/-g.z),k=F.clamp((t-$)/(re-$),0,.95),q=Math.round(k*(C-1));for(let L=0;L<3;L++)O.push(window.setTimeout(()=>j({vertebra:q,fuerza:1.1}),L*90))};p.addEventListener("pointerdown",J);const Y={x:0,y:0},v={x:0,y:0,vx:0,vy:0},K=e=>{Y.x=(e.clientX/innerWidth-.5)*2,Y.y=(e.clientY/innerHeight-.5)*2};addEventListener("pointermove",K,{passive:!0});let Q=!0;const ee=new IntersectionObserver(([e])=>Q=e.isIntersecting);ee.observe(p);let ae=.5,X=0,te=performance.now();const oe=e=>{X=requestAnimationFrame(oe);const a=Math.min(.05,(e-te)/1e3);if(te=e,!Q)return;for(l.uTiempo.value+=a,P*=Math.pow(.35,a),W-=a*(1+P);W<=0;)j(),W+=-Math.log(1-Math.random())/.9;_.forEach((t,k)=>{const q=c[k];if(!t.activo){q.set(-1,0,-1,0);return}if(t.fase==="nervio"){t.avanceNervio+=a*t.velNervio,t.avanceNervio>=1&&(t.fase="canal"),q.set(-1,t.intensidad,t.nervio,Math.min(1,t.avanceNervio));return}t.altura+=a*t.vel,t.altura>=1?(z=Math.min(1.4,z+.45*t.intensidad),t.activo=!1):t.altura<=0&&(t.activo=!1);const L=t.vel<0?t.intensidad*Math.min(1,t.altura*2+.2):t.intensidad;q.set(t.activo?t.altura:-1,t.activo?L:0,-1,0)}),z*=Math.pow(.25,a),l.uCerebro.value=Math.min(1,z);const f=38,g=11;v.vx+=((Y.x-v.x)*f-v.vx*g)*a,v.vy+=((Y.y-v.y)*f-v.vy*g)*a,v.x+=v.vx*a,v.y+=v.vy*a,ae+=a*.12,T.rotation.y=ae+v.x*.45,T.rotation.x=v.y*.14,s.render(i,o)};return x?(c.slice(0,5).forEach((e,a)=>e.set(.15+a*.18,.9,-1,0)),l.uCerebro.value=.6,s.render(i,o)):X=requestAnimationFrame(oe),()=>{cancelAnimationFrame(X),O.forEach(clearTimeout),S.disconnect(),ee.disconnect(),ie(),removeEventListener("pointermove",K),removeEventListener("scroll",D),p.removeEventListener("pointerdown",J),M.dispose(),d.dispose(),s.dispose(),ue(s)}},[h,y]),r.jsxs(r.Fragment,{children:[r.jsx("span",{ref:E,className:"sentinela","aria-hidden":"true"}),r.jsx("canvas",{ref:A,className:m,"aria-hidden":"true"},V)]})}const ze=[{nivel:"C1",titulo:"Cerebro",texto:"ChatGPT o Claude: el asistente que tu empresa ya usa."},{nivel:"T6",titulo:"Médula",texto:"La memoria de la empresa: acuerdos, clientes, procesos y quién es quién."},{nivel:"L3",titulo:"Cabezas",texto:"Zoho, Bsale, Chipax: los sistemas donde nace la información."}];function Ne({tema:m}){return r.jsx("section",{className:"lab",id:"concepto",children:r.jsxs(de,{radio:44,refractar:!1,className:"lab__lamina lamina-vidrio concepto",children:[r.jsxs("div",{className:"concepto__texto",children:[r.jsx("p",{className:"eyebrow",children:"Identidad · El concepto"}),r.jsx("h2",{className:"lab__titulo",children:"No es el cerebro. Es lo que lo conecta."}),r.jsx("p",{className:"lab__bajada",children:"Tu empresa ya tiene un cerebro: el asistente de IA que usa todos los días. Lo que le falta es una médula que lo una con todo lo demás. Por ahí sube la información, desde tus sistemas hasta la respuesta."}),r.jsx("ol",{className:"concepto__niveles",children:ze.map(h=>r.jsxs("li",{children:[r.jsx("span",{className:"lamina__nivel",children:h.nivel}),r.jsxs("span",{children:[r.jsx("strong",{children:h.titulo}),h.texto]})]},h.nivel))}),r.jsx("p",{className:"concepto__pista",children:"Cada impulso es un dato que entra por un nervio y sube hasta el cerebro. Haz scroll y entran más; toca la columna para mandar uno desde ahí."})]}),r.jsxs("div",{className:"concepto__columna",children:[r.jsx(ge,{oscuro:m==="oscuro",className:"concepto__lienzo"},m),r.jsx("span",{className:"concepto__marca concepto__marca--c1","aria-hidden":"true",children:"C1 · cerebro"}),r.jsx("span",{className:"concepto__marca concepto__marca--t6","aria-hidden":"true",children:"T6 · médula"}),r.jsx("span",{className:"concepto__marca concepto__marca--l3","aria-hidden":"true",children:"L3 · cabezas"})]})]})})}export{Ne as Concepto};
