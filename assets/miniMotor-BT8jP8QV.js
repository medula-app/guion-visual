import{W as G,S as B,T as S,a as I,m as P,e as j,f as O,C as U}from"./three-D0KRdqyX.js";import{z as W}from"./index-CZTzXJFl.js";const L=`
  precision highp float;
  varying vec2 vUv;
  uniform float uT;
  uniform float uEnergia;
  uniform float uGiro;
  uniform float uFlash;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  uniform vec2 uInclina;

  vec2 rot(vec2 p, float a) { float c = cos(a), s = sin(a); return vec2(c * p.x - s * p.y, s * p.x + c * p.y); }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float ang = atan(uv.y, uv.x);
    // gota líquida: el contorno ondula, casi nada en reposo y mucho al hablar
    float ola = sin(ang * 3.0 + uT * 2.1) * 0.5 + sin(ang * 5.0 - uT * 2.7) * 0.3 + sin(ang * 2.0 + uT * 1.3) * 0.4;
    float R = 0.76 + 0.025 * sin(uT * 1.6) + uEnergia * 0.05 + ola * (0.008 + uEnergia * 0.075);
    float borde = fwidth(r) * 1.5;
    float dentro = 1.0 - smoothstep(R - borde, R + borde, r);

    vec3 col = vec3(0.0);
    float alfa = 0.0;

    if (r < R + borde) {
      vec2 p = uv / R;
      float z = sqrt(max(0.0, 1.0 - dot(p, p)));
      // remolino: gira más al centro que al borde, más rápido al pensar
      float vel = 0.35 + uGiro * 1.6;
      p = rot(p, (1.0 - length(p)) * (0.8 + uGiro * 2.5) + uT * vel * 0.3);
      // tres manchas de luz en órbitas distintas
      float s = 0.55 + uEnergia * 0.5;
      vec2 c1 = 0.42 * vec2(sin(uT * vel * 1.1), cos(uT * vel * 0.9));
      vec2 c2 = 0.46 * vec2(cos(uT * vel * 0.7 + 2.0), sin(uT * vel * 1.3 + 1.0));
      vec2 c3 = 0.38 * vec2(sin(uT * vel * 1.5 + 4.0), cos(uT * vel * 0.6 + 3.0));
      float w1 = exp(-dot(p - c1, p - c1) / (0.18 * s));
      float w2 = exp(-dot(p - c2, p - c2) / (0.16 * s));
      float w3 = exp(-dot(p - c3, p - c3) / (0.12 * s));
      vec3 fondo = mix(vec3(0.03, 0.08, 0.32), uA * 0.5, 0.55);
      col = fondo + uA * w1 * 1.35 + uB * w2 * 1.25 + uC * w3 * 1.1;
      // vidrio: sombra abajo, canto de luz, brillo arriba a la izquierda
      col *= mix(0.75, 1.0, smoothstep(-0.9, 0.4, uv.y / R));
      float fres = pow(1.0 - z, 2.5);
      col += mix(uB, vec3(1.0), 0.5) * fres * 0.55;
      vec2 hl = uv / R - vec2(-0.32, 0.38) - uInclina * 0.12;
      float brillo = exp(-dot(hl * vec2(1.0, 1.6), hl * vec2(1.0, 1.6)) * 22.0);
      col += vec3(1.0) * brillo * 0.75;
      // canto iridiscente: un filo de color que gira alrededor de la gota
      float filo = smoothstep(0.78, 0.98, length(uv) / R);
      vec3 iris = mix(uB, uC, sin(ang * 2.0 + uT * 1.4) * 0.5 + 0.5);
      col += mix(iris, vec3(1.0), 0.25) * filo * (0.55 + uEnergia * 0.6);
      alfa = dentro;
    }

    // halo afuera, más fuerte con energía
    float fuera = max(0.0, r - R);
    float halo = exp(-fuera * 12.0) * (0.3 + uEnergia * 0.6) * (1.0 - dentro);
    // anillo de destello que sale tras un evento
    float anillo = exp(-pow((r - (R + uFlash * 0.28)) * 28.0, 2.0)) * (1.0 - uFlash) * step(0.001, uFlash);
    vec3 luz = mix(uB, uA, 0.4);
    col += luz * (halo + anillo * 1.2);
    alfa = max(alfa, clamp(halo + anillo, 0.0, 1.0));
    gl_FragColor = vec4(col, alfa);
  }
`,i={reposo:["#1b75fd","#6fe3ff","#3b3dff"],escuchando:["#2f8bff","#8ff0ff","#1b75fd"],pensando:["#7d5cff","#3b3dff","#c07bff"],hablando:["#2f8bff","#6fe3ff","#7d5cff"]},_={reposo:.1,escuchando:.35,pensando:.45,hablando:.3},k={reposo:0,escuchando:.1,pensando:1,hablando:.25};function V(m){const z=matchMedia("(prefers-reduced-motion: reduce)").matches,s=new G({canvas:m,alpha:!0,antialias:!1,premultipliedAlpha:!1});s.setPixelRatio(Math.min(devicePixelRatio,2.5)),s.setClearColor(0,0);const w=new B,E=new S(-1,1,1,-1,0,1),r=e=>new U(e),n={uT:{value:0},uEnergia:{value:.1},uGiro:{value:0},uFlash:{value:0},uA:{value:r(i.reposo[0])},uB:{value:r(i.reposo[1])},uC:{value:r(i.reposo[2])},uInclina:{value:new P}},T=new I({vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:L,uniforms:n,transparent:!0}),h=new j(new O(2,2),T);h.frustumCulled=!1,w.add(h);const R=()=>{const{clientWidth:e,clientHeight:o}=m;e&&o&&s.setSize(e,o,!1)},A=new ResizeObserver(R);A.observe(m),R();let f="reposo",M=0;const a={energia:.1,v:0,giro:0},l={a:r(i.reposo[0]),b:r(i.reposo[1]),c:r(i.reposo[2])};let c=null,v=0,t=0;const d={x:0,y:0},F=r("#ff5a4e"),q=r("#8ff4ff");let g=0,y=performance.now(),b=!1;const C=e=>{if(g=requestAnimationFrame(C),document.hidden||(b=!b,b&&f==="reposo"&&t===0&&Math.abs(a.v)<.05))return;const o=Math.min(.05,(e-y)/1e3);y=e;const x=Math.min(1,_[f]+M*.8);a.v+=((x-a.energia)*120-a.v*14)*o,a.energia+=a.v*o,a.giro+=(k[f]-a.giro)*Math.min(1,o*3);const u=Math.min(1,o*4);v=Math.max(0,v-o*.9);const p=c?v:0;n.uA.value.lerp(c&&p>0?l.a.clone().lerp(c,p):l.a,u),n.uB.value.lerp(c&&p>0?l.b.clone().lerp(c,p):l.b,u),n.uC.value.lerp(l.c,u),t>0&&(t=t+o*1.1>=1?0:t+o*1.1),n.uT.value+=z?0:o,n.uEnergia.value=Math.max(0,a.energia),n.uGiro.value=a.giro,n.uFlash.value=t,n.uInclina.value.set(d.x,-d.y),s.render(w,E)};return g=requestAnimationFrame(C),{estado(e){f=e;const[o,x,u]=i[e];l.a.set(o),l.b.set(x),l.c.set(u)},nivel(e){M=Math.max(0,Math.min(1,e))},puntero(e,o){d.x=e,d.y=o},pulso(e){if(e==="tecleo"){a.v+=1.6;return}t=.001,a.v+=e==="error"?3.5:2.6,c=e==="error"?F:q,v=1},destruir(){cancelAnimationFrame(g),A.disconnect(),h.geometry.dispose(),T.dispose(),s.dispose(),W(s)}}}export{V as crearMiniOrbe};
