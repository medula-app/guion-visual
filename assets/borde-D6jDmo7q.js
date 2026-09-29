import{W as G,C as A,a as P,m as D,S as T,e as F,f as L,T as O}from"./three-D0KRdqyX.js";import{z as E}from"./index-CZTzXJFl.js";const N=`
  precision highp float;
  uniform vec2 uRes;
  uniform float uT;
  uniform float uGiro;       // avance del flujo alrededor del borde
  uniform float uDerrame;    // 0–1: cuánto se derramó desde el orbe
  uniform vec2 uOrigen;      // centro de la gota, en píxeles
  uniform float uNivel;      // la voz engrosa la luz
  uniform float uPensar;     // tinte violeta al pensar
  uniform float uDestello;   // 0–1, decae tras un evento
  uniform vec3 uColorDestello;

  float hash(float n) { return fract(sin(n) * 43758.5453); }
  float ruido(float x) {
    float i = floor(x), f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(hash(i), hash(i + 1.0), u);
  }

  vec3 gama(float x) {
    // los azules de Medula con un violeta de Siri, en ciclo
    vec3 c0 = vec3(0.106, 0.459, 0.992);
    vec3 c1 = vec3(0.435, 0.890, 1.0);
    vec3 c2 = vec3(0.490, 0.361, 1.0);
    vec3 c3 = vec3(0.753, 0.482, 1.0);
    vec3 c4 = vec3(0.231, 0.239, 1.0);
    float f = fract(x) * 5.0;
    vec3 a = f < 1.0 ? mix(c0, c1, f) : f < 2.0 ? mix(c1, c2, f - 1.0) : f < 3.0 ? mix(c2, c3, f - 2.0) : f < 4.0 ? mix(c3, c4, f - 3.0) : mix(c4, c0, f - 4.0);
    return a;
  }

  void main() {
    vec2 p = gl_FragCoord.xy;
    vec2 c = uRes * 0.5;
    // distancia al borde (rectángulo con esquinas apenas redondeadas)
    vec2 q = abs(p - c) - (c - 18.0);
    float d = -(min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - 18.0);
    d = max(d, 0.0);

    // posición a lo largo del contorno (0–1), para el color y el grosor
    float s = atan(p.y - c.y, (p.x - c.x) * uRes.y / uRes.x) / 6.2831853 + 0.5;

    // grosor orgánico: ruido a lo largo del contorno que se mueve con el tiempo
    float n = ruido(s * 9.0 + uT * 0.7) * 0.6 + ruido(s * 23.0 - uT * 1.1) * 0.4;
    float escala = min(uRes.x, uRes.y) / 900.0;
    float ancho = (26.0 + n * 38.0 + uNivel * 70.0) * max(escala, 0.55);

    float halo = exp(-d / ancho) * 0.85;
    float cuerpo = exp(-d / (ancho * 0.22));
    float filo = exp(-d / 2.2);

    vec3 col = gama(s + uGiro);
    col = mix(col, vec3(0.62, 0.42, 1.0), uPensar * 0.45);
    float a = halo * 0.75 + cuerpo * 0.6;
    // se suma luz ya multiplicada por su intensidad y al final se divide por
    // el alfa: la mezcla del navegador vuelve a multiplicar (si no, oscurece)
    vec3 luz = col * a + mix(col, vec3(1.0), 0.65) * filo * 0.9;
    float alfa = clamp(a + filo * 0.8, 0.0, 1.0);

    // derrame: la luz solo existe dentro de un círculo que crece desde el orbe
    float r = length(p - uOrigen);
    float R = uDerrame * length(uRes) * 1.15;
    float dentro = 1.0 - smoothstep(R * 0.7, R, r);
    luz *= dentro;
    alfa *= dentro;

    // destello: una ola de color que recorre el borde entero
    float fl = uDestello * exp(-d / (ancho * 0.6)) * (0.6 + 0.4 * sin(s * 12.566 + uT * 6.0));
    luz += uColorDestello * fl;
    alfa = clamp(alfa + fl, 0.0, 1.0);
    luz = min(luz / max(alfa, 0.001), vec3(1.0));

    gl_FragColor = vec4(luz, alfa);
  }
`,b={reposo:.03,escuchando:.06,pensando:.28,hablando:.12};function _(n,S){const z=matchMedia("(prefers-reduced-motion: reduce)").matches,l=new G({canvas:n,alpha:!0,antialias:!1,premultipliedAlpha:!1}),s=.5;l.setPixelRatio(1),l.setClearColor(0,0);const a={uRes:{value:new D(1,1)},uT:{value:0},uGiro:{value:0},uDerrame:{value:0},uOrigen:{value:new D},uNivel:{value:0},uPensar:{value:0},uDestello:{value:0},uColorDestello:{value:new A("#8ff4ff")}},R=new P({vertexShader:"void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:N,uniforms:a,transparent:!0}),c=new T,f=new F(new L(2,2),R);f.frustumCulled=!1,c.add(f);const C=new O(-1,1,1,-1,0,1);l.compile(c,C);const d=()=>{const e=Math.max(2,Math.round(innerWidth*s)),o=Math.max(2,Math.round(innerHeight*s));l.setSize(e,o,!1),a.uRes.value.set(e,o)};addEventListener("resize",d),d();let u="reposo",r=0,m=b.reposo,M=0,v=0,p=0,t=0,h=0,x=performance.now(),g=!0;const y=e=>{const o=Math.min(.25,(e-x)/1e3);x=e;const i=u==="reposo"?0:1;r+=(i-r)*(1-Math.exp(-o*(i?3.2:1.6))),z&&(r=i),m+=(b[u]-m)*(1-Math.exp(-o*2)),p+=((u==="pensando"?1:0)-p)*(1-Math.exp(-o*3)),v+=(M-v)*(1-Math.exp(-o*14)),t=Math.max(0,t-o*1.1),z||(a.uT.value+=o,a.uGiro.value=(a.uGiro.value+o*m)%1),a.uDerrame.value=r,a.uNivel.value=v,a.uPensar.value=p,a.uDestello.value=t;const w=S();if(a.uOrigen.value.set(w.x*s,(innerHeight-w.y)*s),l.render(c,C),!i&&r<.003&&t<=0){l.clear(),n.dataset.dormido="",g=!0;return}h=requestAnimationFrame(y)},q=()=>{g&&(g=!1,delete n.dataset.dormido,x=performance.now(),h=requestAnimationFrame(y))};return n.dataset.dormido="",{estado(e){u=e,e!=="reposo"&&q()},nivel(e){M=e},pulso(e){e!=="tecleo"&&(a.uColorDestello.value.set(e==="error"?"#ff5a4e":"#8ff4ff"),t=1,q())},destruir(){cancelAnimationFrame(h),removeEventListener("resize",d),f.geometry.dispose(),R.dispose(),l.dispose(),E(l)}}}export{_ as crearBorde};
