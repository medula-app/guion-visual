import{t as e}from"./react.nYwdmC-a.js";import{n as t}from"./lenis.DFyoXoXe.js";import{A as n,C as r,D as i,E as a,F as o,I as s,L as c,M as l,N as u,O as d,P as f,R as p,S as m,T as h,_ as g,a as ee,b as _,c as te,d as v,f as y,g as b,h as x,i as ne,j as re,k as ie,l as ae,m as oe,n as se,o as S,p as ce,r as le,s as ue,t as de,u as fe,v as pe,w as C,x as me,y as he}from"./three.Dn5Vx_1g.js";import{a as w,c as T,i as E,l as D,n as ge,o as O,r as k,s as _e,t as A,u as ve}from"./capitulos.C0oQAB4r.js";import{a as j,c as ye,i as be,l as M,n as xe,o as Se,r as Ce,s as we,t as Te}from"./aura.BXas5HeJ.js";var N=[{ruta:`Clientes/Constructora Pehuén`,titulo:`Constructora Pehuén`,carpeta:`Clientes`,etiquetas:[`cliente`,`acuerdo`],lineas:[`Descuento de 6% en cemento para 200 sacos al mes.`,`Acordado el 12 de septiembre.`,`Diego le envía la cotización de fierro antes del viernes 19.`],enlaces:[`Procesos/Cotizaciones`,`Reuniones/2026-09-15 Comité comercial`]},{ruta:`Clientes/Inmobiliaria Maitén`,titulo:`Inmobiliaria Maitén`,carpeta:`Clientes`,etiquetas:[`cliente`],lineas:[`Cliente de la ferretería.`],enlaces:[`Procesos/Cotizaciones`]},{ruta:`Procesos/Cotizaciones`,titulo:`Cotizaciones`,carpeta:`Procesos`,etiquetas:[`proceso`],lineas:[`Los descuentos sobre 5% los aprueba la gerencia comercial.`],enlaces:[`Equipo/Quién es quién`]},{ruta:`Equipo/Quién es quién`,titulo:`Quién es quién`,carpeta:`Equipo`,etiquetas:[`equipo`],lineas:[`Paula Fuentes es la gerente comercial.`,`Diego está en ventas.`,`Marcela ve el stock.`],enlaces:[`Procesos/Cotizaciones`]},{ruta:`Reuniones/2026-09-15 Comité comercial`,titulo:`Comité comercial · 15 sep`,carpeta:`Reuniones`,etiquetas:[`reunion`,`tareas`],lineas:[`Diego envía la cotización de fierro a Constructora Pehuén antes del viernes 19.`,`Marcela revisa los quiebres de stock de pintura látex.`],enlaces:[`Clientes/Constructora Pehuén`]}];M(`/logos/zoho.svg`),M(`/logos/bsale.png`);var P=[{id:`pehuen`,nombre:`Constructora Pehuén`,rubro:`Construcción`,vendedor:`Diego`,ultima:`2026-09-24`,montoMes:1845e4,estado:`al-dia`,tendencia:[12.1,13.4,14.2,15.8,16.9,18.4]},{id:`maiten`,nombre:`Inmobiliaria Maitén`,rubro:`Inmobiliaria`,vendedor:`Paula`,ultima:`2026-09-22`,montoMes:987e4,estado:`por-cobrar`,tendencia:[6.2,7.1,6.8,8.4,9.1,9.9]},{id:`andalue`,nombre:`Constructora Andalué`,rubro:`Construcción`,vendedor:`Diego`,ultima:`2026-09-19`,montoMes:1423e4,estado:`al-dia`,tendencia:[15.2,14.8,13.9,14.6,13.8,14.2]},{id:`maipo`,nombre:`Obras del Maipo`,rubro:`Construcción`,vendedor:`Marcela`,ultima:`2026-08-30`,montoMes:612e4,estado:`atrasado`,tendencia:[9.4,8.8,8.1,7.3,6.9,6.1]},{id:`riquelme`,nombre:`Taller Riquelme`,rubro:`Taller`,vendedor:`Paula`,ultima:`2026-09-25`,montoMes:234e4,estado:`al-dia`,tendencia:[1.4,1.6,1.9,2.1,2.2,2.3]},{id:`coihues`,nombre:`Inmobiliaria Los Coihues`,rubro:`Inmobiliaria`,vendedor:`Diego`,ultima:`2026-09-12`,montoMes:1156e4,estado:`por-cobrar`,tendencia:[10.1,10.8,11.9,11.2,11.8,11.6]},{id:`maderas`,nombre:`Maderas del Sur`,rubro:`Maderera`,vendedor:`Marcela`,ultima:`2026-09-26`,montoMes:478e4,estado:`al-dia`,tendencia:[3.2,3.8,4.1,4.4,4.6,4.8]},{id:`aconcagua`,nombre:`Pinturas Aconcagua`,rubro:`Retail`,vendedor:`Paula`,ultima:`2026-09-03`,montoMes:391e4,estado:`atrasado`,tendencia:[5.1,4.9,4.6,4.2,4,3.9]},{id:`quillay`,nombre:`Edificios Quillay`,rubro:`Inmobiliaria`,vendedor:`Diego`,ultima:`2026-09-23`,montoMes:765e4,estado:`al-dia`,tendencia:[4.8,5.6,6.1,6.9,7.2,7.7]},{id:`tralca`,nombre:`Servicios Tralca`,rubro:`Servicios`,vendedor:`Marcela`,ultima:`2026-09-17`,montoMes:198e4,estado:`por-cobrar`,tendencia:[2.4,2.2,2.1,2.3,2,2]},{id:`litre`,nombre:`Constructora El Litre`,rubro:`Construcción`,vendedor:`Paula`,ultima:`2026-09-21`,montoMes:1289e4,estado:`al-dia`,tendencia:[8.9,9.6,10.8,11.4,12.2,12.9]},{id:`ruil`,nombre:`Mantenciones Ruil`,rubro:`Servicios`,vendedor:`Diego`,ultima:`2026-08-21`,montoMes:124e4,estado:`atrasado`,tendencia:[2.1,1.9,1.7,1.5,1.3,1.2]}],Ee=`2026-09-27`,F=30,De=(e,t=Ee)=>Math.round((Date.parse(t)-Date.parse(e))/864e5),Oe=e=>e.estado===`al-dia`?0:e.estado===`por-cobrar`?De(e.ultima):De(e.ultima)+F;[[`0–30 días`,0,30],[`31–60 días`,31,60],[`61–90 días`,61,90],[`Más de 90`,91,1/0]].map(([e,t,n])=>{let r=P.filter(e=>e.estado!==`al-dia`&&Oe(e)>=t&&Oe(e)<=n);return{tramo:e,monto:r.reduce((e,t)=>e+t.montoMes,0)/1e6,docs:r.length}}),e();var I=[{id:`Clientes`,color:`#3d8bff`,dir:new c(1,1,1)},{id:`Procesos`,color:`#7d6bff`,dir:new c(-1,-1,1)},{id:`Equipo`,color:`#35d0ff`,dir:new c(-1,1,-1)},{id:`Reuniones`,color:`#5b5cff`,dir:new c(1,-1,-1)}].map(e=>{let t=e.dir.normalize(),n=new c(0,1,0).addScaledVector(t,-t.y).normalize(),r=t.clone().addScaledVector(n,.62).normalize().multiplyScalar(1.12);return{...e,dir:t,rotulo:r}}),ke={constelacion:0,fibra:1,arco:2};function L(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ae(e,t,n){let r=()=>(n()+n()+n()-1.5)/1.5,i=new c().crossVectors(e,Math.abs(e.y)<.9?new c(0,1,0):new c(1,0,0)).normalize(),a=new c().crossVectors(e,i).normalize();return e.clone().addScaledVector(i,r()*t).addScaledVector(a,r()*t).normalize()}function R(e,t,n,r){let i=[];for(let a=0;a<=r;a++){let o=a/r,s=1-o;i.push(new c().addScaledVector(e,s*s).addScaledVector(t,2*s*o).addScaledVector(n,o*o))}return i}function je(e=1700,t=2600){let n=L(20260927),r=e*I.length+t,i=new Float32Array(r*3),a=new Float32Array(r),o=new Float32Array(r),s=new Float32Array(r),l=I.map(()=>[]),u=0;I.forEach((t,r)=>{for(let c=0;c<e;c++,u++){let e=Ae(t.dir,.62,n),c=1+(n()-.5)*.06;i.set([e.x*c,e.y*c,e.z*c],u*3),a[u]=r,o[u]=n(),s[u]=.6+n()**6*3.2,l[r].push(u)}});for(let e=0;e<t;e++,u++){let e=new c(n()*2-1,n()*2-1,n()*2-1).normalize(),t=1+(n()-.5)*.08;i.set([e.x*t,e.y*t,e.z*t],u*3),a[u]=I.length,o[u]=n(),s[u]=.35+n()*.6}let d=I.map(()=>0),f=N.map(e=>{let t=I.findIndex(t=>t.id===e.carpeta),r=d[t]++,i=Ae(I[t].dir,.2+r*.12,n);return{ruta:e.ruta,titulo:e.titulo,area:t,pos:i.multiplyScalar(1.01)}}),p=[],m=[],h=[],g=[],ee=[],_=[],te=[],v=(e,t,n,r,i,a,o,s=-1,c=-1)=>{p.push(e.x,e.y,e.z,t.x,t.y,t.z),m.push(n,n),h.push(r,r),g.push(i,a),ee.push(o,o),_.push(s,s),te.push(c,c)},y=e=>new c(i[e*3],i[e*3+1],i[e*3+2]),b=0;l.forEach((e,t)=>{for(let r=0;r<e.length;r+=2){let i=e[r],a=y(i),s=-1,c=.1;for(let t=0;t<60;t++){let t=e[Math.floor(n()*e.length)];if(t===i)continue;let r=a.distanceTo(y(t));r<c&&(c=r,s=t)}s>=0&&(v(a,y(s),t,ke.constelacion,0,1,o[i]),b++)}}),l.forEach((e,t)=>{let n=e.filter(e=>s[e]>1.2).slice(0,46);for(let e of n){let n=R(y(e),I[t].dir.clone().multiplyScalar(.55),new c(0,0,0),18);for(let r=0;r<n.length-1;r++)v(n[r],n[r+1],t,ke.fibra,r/(n.length-1),(r+1)/(n.length-1),o[e]);b++}});let x=new Set;return N.forEach((e,t)=>{for(let n of e.enlaces){let e=N.findIndex(e=>e.ruta===n);if(e<0)continue;let r=[t,e].sort().join(`-`);if(x.has(r))continue;x.add(r);let i=f[t].pos,a=f[e].pos,o=R(i,i.clone().add(a).multiplyScalar(.5).clone().setLength(Math.max(.15,1-i.distanceTo(a)*.42)),a,40);for(let n=0;n<o.length-1;n++)v(o[n],o[n+1],f[t].area,ke.arco,n/(o.length-1),(n+1)/(o.length-1),.5,t,e);b++}}),{memorias:{pos:i,area:a,semilla:o,tam:s,n:r},notas:f,lineas:{pos:new Float32Array(p),area:new Float32Array(m),tipo:new Float32Array(h),avance:new Float32Array(g),semilla:new Float32Array(ee),de:new Float32Array(_),a:new Float32Array(te)},conteo:{memorias:r,conexiones:b,porArea:l.map(e=>e.length)}}}function Me(e){let t=e/_e.length*Math.PI*2+.3;return new c(Math.cos(t)*3.3,Math.sin(t)*2.55,-.6+Math.sin(e*2.3)*1.1)}function Ne(){return _e.map((e,t)=>{let n=Me(t);return[n,n.clone().multiplyScalar(.42).add(new c(0,Math.sin(t*1.7)*.8,1.4)),new c(0,0,0)]})}var Pe=2.7;function Fe(e){let t=e/T.length*Math.PI*2;return new c(Math.sin(t)*Pe,Math.sin(e*1.9)*.35,Math.cos(t)*Pe)}function Ie(e){let t=D[e].x;return new c(t,.55,-Math.abs(t)*.28)}var Le=2.75;function Re(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}async function ze(e,t){let n=await(await fetch(e)).text(),r=new ne().parse(n),i=[];for(let e of r.paths)for(let t of e.toShapes(!0)){let{shape:e,holes:n}=t.extractPoints(14),r=e,a=n,s=o.triangulateShape(r,a),c=[...r,...a.flat()];for(let[e,t,n]of s)i.push(c[e].x,c[e].y,c[t].x,c[t].y,c[n].x,c[n].y)}let a=1/0,s=1/0,c=-1/0,l=-1/0;for(let e=0;e<i.length;e+=2)a=Math.min(a,i[e]),c=Math.max(c,i[e]),s=Math.min(s,i[e+1]),l=Math.max(l,i[e+1]);let u=(a+c)/2,d=(s+l)/2;for(let e=0;e<i.length;e+=2)i[e]=(i[e]-u)*t,i[e+1]=-(i[e+1]-d)*t;return new Float32Array(i)}function Be(e,t,n=!1){let r=e/512,i=new Float32Array(e*9*4),a=Re(20260928),o=()=>(a()+a()+a()-1.5)/1.5,s=t=>(n,r,a,o,s)=>{let c=(t*e+n)*4;i[c]=r,i[c+1]=a,i[c+2]=o,i[c+3]=s};{let n=s(O.simbolo),r=t.length/6,i=new Float32Array(r),o=0;for(let e=0;e<r;e++){let n=e*6,r=Math.abs((t[n+2]-t[n])*(t[n+5]-t[n+1])-(t[n+4]-t[n])*(t[n+3]-t[n+1]))/2;o+=r,i[e]=o}for(let s=0;s<e;s++){let e=a()*o,c=0,l=r-1;for(;c<l;){let t=c+l>>1;i[t]<e?c=t+1:l=t}let u=c*6,d=a(),f=a();d+f>1&&(d=1-d,f=1-f);let p=t[u]+(t[u+2]-t[u])*d+(t[u+4]-t[u])*f,m=t[u+1]+(t[u+3]-t[u+1])*d+(t[u+5]-t[u+1])*f,h=(a()<.7?a()<.5?-1:1:a()*2-1)*.2;n(s,p,m,h,a()*.9)}}{let t=s(O.islas),r=(n?w.movil:w.pc).map(e=>({pos:e.p,ry:e.r[1],w:ve[e.id][0]*e.s,h:ve[e.id][1]*e.s})),i=Math.floor(e*.8/r.length),c=0;for(r.forEach((e,n)=>{let[r,s,l]=e.pos,u=Math.cos(e.ry),d=Math.sin(e.ry),f=e.w*1.06+.1,p=e.h*1.06+.1;for(let e=0;e<i;e++,c++){let e=0,i=0,m=-.05;if(a()<.62){let t=a()*2*(f+p),n=Math.abs(o())*.09;t<f?(e=t-f/2,i=p/2+n):t<f+p?(e=f/2+n,i=p/2-(t-f)):t<2*f+p?(e=f/2-(t-f-p),i=-p/2-n):(e=-f/2-n,i=-p/2+(t-2*f-p))}else{let t=a()*Math.PI*2,n=.55+a()**2*.9;e=Math.cos(t)*f*n*.62,i=Math.sin(t)*p*n*.62,m=o()*.5}t(c,r+e*u+m*d,s+i,l-e*d+m*u,.15+n%3*.25+a()*.2)}});c<e;c++)t(c,o()*6,o()*3.6,-2+o()*3,a()*.5)}{let t=s(O.nervios),n=Math.floor(e*.14);for(let r=0;r<e;r++)if(r<n){let e=new c(o(),o(),o()).normalize().multiplyScalar(.55*Math.cbrt(a()));t(r,e.x,e.y,e.z,.95)}else{let e=Math.floor(a()*_e.length);t(r,a(),o()*.07,o()*.07,30+e)}}let l=je(Math.floor(e*.1),Math.floor(e*.08));{let t=s(O.cerebro),n=l.memorias;for(let r=0;r<e;r++)if(r<n.n)t(r,n.pos[r*3]*2,n.pos[r*3+1]*2,n.pos[r*3+2]*2,n.area[r]<3.5?10+n.area[r]:14);else{let e=Math.floor(a()*n.n),i=2*(.12+a()**.7*.85);t(r,n.pos[e*3]*i+o()*.04,n.pos[e*3+1]*i+o()*.04,n.pos[e*3+2]*i+o()*.04,n.area[e]<3.5?10+n.area[e]:14)}}{let t=s(O.orbe);for(let n=0;n<e;n++){let e=new c(o(),o(),o()).normalize().multiplyScalar(.25*Math.cbrt(a()));t(n,e.x,e.y,e.z,.4+a()*.5)}}{let t=s(O.lunas);for(let n=0;n<e;n++)if(a()<.9){let e=Math.floor(a()*T.length),r=Fe(e),i=new c(o(),o(),o()).normalize().multiplyScalar(.46*a()**.3);t(n,r.x+i.x,r.y+i.y,r.z+i.z,10+e)}else{let e=a()*Math.PI*2;t(n,Math.sin(e)*Pe,o()*.02,Math.cos(e)*Pe,.2)}}{let t=s(O.pantallas),n=1.7,r=1.12;for(let i=0;i<e;i++)if(a()<.2){let e=new c(o(),o()*.5,o()).normalize().multiplyScalar(.55*Math.cbrt(a()));t(i,e.x,-1.75+e.y,e.z,.9)}else{let e=Ie(Math.floor(a()*D.length)),s=0,c=0;if(a()<.4){let e=a()*2*2.8200000000000003;e<n?(s=e-n/2,c=r/2):e<2.8200000000000003?(s=n/2,c=r/2-(e-n)):e<4.52?(s=n/2-(e-n-r),c=-1.12/2):(s=-1.7/2,c=-1.12/2+(e-2*n-r))}else{let e=Math.floor(a()*6);s=-.73+a()*1.46*(e===0?.4:.6+e*37%10/25),c=r/2-.16-e*.16}let l=-e.x*.12;t(i,e.x+s*Math.cos(l),e.y+c,e.z+s*Math.sin(l)+o()*.02,.1+a()*.5)}}let u=new he(Le,1),d=new v(u,1);{let t=s(O.boveda),n=d.attributes.position.array,r=n.length/6,i=l.memorias;for(let s=0;s<e;s++)if(a()<.45){let e=s%i.n,n=1.24;t(s,i.pos[e*3]*n,i.pos[e*3+1]*n,i.pos[e*3+2]*n,i.area[e]<3.5?10+i.area[e]:14)}else{let e=Math.floor(a()*r)*6,i=a();t(s,n[e]+(n[e+3]-n[e])*i+o()*.012,n[e+1]+(n[e+4]-n[e+1])*i+o()*.012,n[e+2]+(n[e+5]-n[e+2])*i+o()*.012,.05+a()*.3)}}u.dispose();{let t=s(O.gotas);for(let n=0;n<e;n++){let e=a()<.4?1:a()<.5?0:2,r=new c(o(),o(),o()).normalize().multiplyScalar(a()**.3);t(n,r.x,r.y,r.z,20+e)}}let f=new fe(i,512,r*9,re,x);return f.needsUpdate=!0,{textura:f,filas:r,grafo:l,bordes:d,AREAS:I}}var z=(e,t,n=[0,0,0])=>({p:e,s:t,r:n,o:0}),Ve=e=>({p:[0,0,0],s:4e-4,r:[.4*Math.sin(e),1.6+e*.4,.5*Math.cos(e)],o:0}),He=w.pc.map(e=>e.id),Ue=e=>Object.fromEntries(e.map(e=>[e.id,{p:e.p,r:e.r,s:e.s}])),B={caos:Ue(w.pc),heads:Object.fromEntries(He.map((e,t)=>[e,Ve(t)])),cerebro:{chatgpt:z([-5.5,-.3,0],.0036,[0,.9,0]),claude:z([5.5,-.3,0],.0036,[0,-.9,0])},orbe:{chatgpt:{p:[-2.55,-.36,.8],r:[0,.34,0],s:.0041},claude:{p:[2.55,-.36,.8],r:[0,-.34,0],s:.0041},app:z([0,0,-3],.0018),tienda:z([2.5,-2.2,0],.003,[0,-.6,0])},centro:{chatgpt:z([-6,-.3,.8],.0035,[0,.9,0]),claude:z([6,-.3,.8],.0035,[0,-.9,0]),app:{p:[0,.3,.1],r:[.02,-.18,0],s:.0041},tienda:e=>({p:[1.05,-1.1+(1-E(0,.3,e))*-.6,1.7],r:[0,-.3,0],s:.0027,o:E(.04,.3,e)})},boveda:{app:z([0,0,-2.5],.0028),tienda:z([1.4,-2.4,1],.0029)}},We={caos:Ue(w.movil),heads:B.heads,cerebro:{chatgpt:z([0,-3.5,0],.0046),claude:z([0,-3.5,0],.0046)},orbe:{chatgpt:e=>({p:[0,-2.75,1.1],r:[0,0,0],s:.0054,o:1-E(.4,.47,e)}),claude:e=>({p:[0,-2.75,1.1],r:[0,0,0],s:.0054,o:E(.43,.5,e)}),app:z([0,0,-3],.0018),tienda:z([0,-3,0],.003)},centro:{chatgpt:z([0,-4,.8],.0046),claude:z([0,-4,.8],.0046),app:{p:[0,.55,0],r:[0,0,0],s:.0048},tienda:e=>({p:[.9,-.6,1.4],r:[0,-.12,0],s:.0036,o:E(.04,.3,e)})},boveda:B.boveda},V=(e,t)=>typeof e==`function`?e(t):e;function Ge(e,t,r){let i=new se;i.domElement.className=`mundo-pantallas__capa`,e.appendChild(i.domElement);let a=new u,o=r?We:B,s=new Map;Object.entries(t).forEach(([e,t],n)=>{let r=new de(t);r.visible=!1,a.add(r),s.set(e,{obj:r,el:t,visible:!1,k:n})});let l=new c,d=new c,f=new y,p=new y,m=new n,h=new n,g=!1;return{ajustar(e,t){i.setSize(e,t)},cuadro(e,t,n,r,c){let u=A[t]?.id,ee=A[Math.min(A.length-1,t+1)]?.id;g=!1,s.forEach((e,t)=>{let i=V(o[u]?.[t],n),a=V(o[ee]?.[t],0);if(!i&&!a){e.visible&&=(e.obj.visible=!1,!1);return}i||={...a,o:0},a||={...i,o:0};let s=(i.o??1)+((a.o??1)-(i.o??1))*r;if(s<.004){e.visible&&=(e.obj.visible=!1,!1);return}e.visible||=(e.obj.visible=!0,!0),g=!0,l.set(...i.p).lerp(d.set(...a.p),r),l.y+=Math.sin(c*.7+e.k*1.3)*.045,e.obj.position.copy(l),m.setFromEuler(f.set(...i.r??[0,0,0])),h.setFromEuler(p.set(...a.r??[0,0,0])),e.obj.quaternion.slerpQuaternions(m,h,r),e.obj.rotateZ(Math.sin(c*.5+e.k)*.008);let _=Math.exp(Math.log(i.s)+(Math.log(a.s)-Math.log(i.s))*r);e.obj.scale.setScalar(_),e.el.style.opacity=s.toFixed(3)}),g&&i.render(a,e),i.domElement.style.visibility=g?`visible`:`hidden`},destruir(){s.forEach(e=>a.remove(e.obj)),i.domElement.remove()}}}var Ke=`
  precision highp float;
  precision highp sampler2D;
  uniform sampler2D uFormas;
  uniform int uFilas;
  uniform int uA;
  uniform int uB;
  uniform float uMezcla;
  uniform float uTiempo;
  uniform float uPixel;
  uniform float uTam;
  uniform float uAlfa;
  uniform float uExplota;
  uniform float uPensar;
  uniform float uGiroA;
  uniform float uGiroB;
  uniform float uNoche;
  uniform vec3 uCurvas[42];
  uniform vec3 uGotaC[3];
  uniform float uGotaR[3];
  uniform vec3 uAreas[5];
  uniform vec3 uBruma;
  uniform vec3 uAire;
  uniform vec3 uImpulso;
  in float aI;
  in vec4 aAzar;
  out vec3 vColor;
  out float vAlfa;
  
  // desplazamiento suave y barato, casi un "curl": remolinos lentos
  vec3 remolino(vec3 p, float t) {
    return vec3(
      sin(p.y * 1.7 + t) + cos(p.z * 1.3 - t * 0.7),
      sin(p.z * 1.5 - t * 0.8) + cos(p.x * 1.9 + t * 0.6),
      sin(p.x * 1.4 + t * 0.9) + cos(p.y * 1.1 - t)
    ) * 0.5;
  }


  const int ORBE = 4;
  const int LUNAS = 5;

  vec4 leer(int forma) {
    int i = int(aI + 0.5);
    return texelFetch(uFormas, ivec2(i % 512, forma * uFilas + i / 512), 0);
  }

  mat3 giroY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
  }

  vec3 ubicar(int forma, vec4 d, float giro) {
    vec3 p = d.xyz;
    if (d.w > 29.5) {
      // nervio: la partícula recorre su curva hacia el núcleo, sin fin
      int k = int(d.w - 30.0 + 0.5) * 3;
      float t = fract(d.x + uTiempo * (0.05 + aAzar.y * 0.06));
      float u = 1.0 - t;
      p = u * u * uCurvas[k] + 2.0 * u * t * uCurvas[k + 1] + t * t * uCurvas[k + 2];
      p += vec3(d.y, d.z, d.y * 0.6) * (1.0 - t * 0.85);
    } else if (d.w > 19.5) {
      // gota de precios: esfera líquida que respira y tiembla
      int k = int(d.w - 20.0 + 0.5);
      float onda = 0.07 * sin(p.x * 3.0 + uTiempo * 1.6 + float(k)) * cos(p.y * 2.6 - uTiempo * 1.2) + 0.04 * sin(p.z * 4.0 + uTiempo * 2.1);
      p = uGotaC[k] + p * uGotaR[k] * (1.0 + onda);
    }
    if (forma == ORBE || forma == LUNAS) {
      // plasma: la orbe se revuelve más cuando piensa
      float centro = forma == LUNAS ? step(length(p), 0.9) : 1.0;
      p += remolino(p * 2.2, uTiempo * (0.6 + uPensar * 2.4)) * (0.03 + uPensar * 0.14) * centro;
    }
    return giroY(giro) * p;
  }

  vec3 colorDe(float w, float brillo) {
    if (w > 29.5) return mix(uAire, vec3(1.0), 0.35);
    if (w > 19.5) return mix(uImpulso, uAire, aAzar.y);
    if (w > 9.5) return uAreas[int(w - 10.0 + 0.5)];
    vec3 c = mix(uBruma, uAire, smoothstep(0.0, 0.5, w));
    return mix(c, uImpulso, smoothstep(0.5, 1.0, w));
  }

  void main() {
    vec4 dA = leer(uA);
    vec4 dB = leer(uB);
    vec3 pA = ubicar(uA, dA, uGiroA);
    vec3 pB = ubicar(uB, dB, uGiroB);

    // cada partícula sale con su propio retraso: la forma se deshace y se arma en ola
    float lt = clamp(uMezcla * 1.7 - aAzar.x * 0.7, 0.0, 1.0);
    float e = lt * lt * (3.0 - 2.0 * lt);
    vec3 p = mix(pA, pB, e);
    float vuelo = sin(3.14159 * lt);
    p += remolino(p * 0.55 + aAzar.xyz * 6.0, uTiempo * 0.5) * vuelo * (0.6 + aAzar.z * 0.9);
    // el quiebre: la nube se abre desde su centro
    p += normalize(p + 1e-4) * uExplota * (0.2 + aAzar.z * 1.3) + remolino(p * 1.3, uTiempo * 0.7) * uExplota * 0.25;
    // un temblor vivo siempre
    p += remolino(p * 3.0 + aAzar.yzx * 9.0, uTiempo * 0.9) * 0.012;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // los nervios brillan más cerca del núcleo
    float destello = 1.0;
    if (dA.w > 29.5 || dB.w > 29.5) destello = 1.0 + 0.8 * smoothstep(0.5, 1.0, fract(dA.x + uTiempo * (0.05 + aAzar.y * 0.06)));

    vColor = mix(colorDe(dA.w, 1.0), colorDe(dB.w, 1.0), e) * destello;
    // de día el cielo es azul claro: las partículas se aclaran para no perderse
    vColor = mix(vColor, vec3(1.0), (1.0 - uNoche) * 0.55);
    float centelleo = 0.7 + 0.3 * sin(uTiempo * (1.0 + aAzar.w * 2.5) + aAzar.x * 40.0);
    vAlfa = uAlfa * (0.3 + 0.7 * aAzar.w) * centelleo * mix(1.5, 1.0, uNoche);
    float tam = (0.9 + aAzar.w * aAzar.w * 2.6) * (1.0 + vuelo * 0.4 + uExplota * 0.6);
    // de día los puntos son un poco más grandes: el cielo claro los come
    tam *= mix(1.35, 1.0, uNoche);
    gl_PointSize = tam * uTam * uPixel * (7.0 / max(0.5, -mv.z));
  }
`,qe=`
  precision highp float;
  in vec3 vColor;
  in float vAlfa;
  out vec4 salida;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float disco = smoothstep(0.5, 0.0, d);
    float nucleo = smoothstep(0.18, 0.0, d);
    float a = (disco * 0.55 + nucleo * 0.8) * vAlfa;
    salida = vec4(vColor * a, a);
  }
`,Je=`
  precision highp float;
  uniform float uTiempo;
  uniform vec3 uAreas[5];
  in float aArea;
  in float aTipo;
  in float aAvance;
  in float aSemilla;
  out vec3 vColor;
  out float vAlfa;
  void main() {
    vColor = uAreas[int(aArea + 0.5)];
    float pulso = smoothstep(0.85, 1.0, fract(aAvance - uTiempo * 0.35 + aSemilla * 7.0));
    vAlfa = aTipo < 0.5 ? 0.1 : aTipo < 1.5 ? 0.08 + pulso * 0.7 : 0.55 + 0.35 * sin(uTiempo * 2.0 + aAvance * 6.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ye=`
  precision highp float;
  uniform float uAlfa;
  in vec3 vColor;
  in float vAlfa;
  out vec4 salida;
  void main() {
    float a = vAlfa * uAlfa;
    salida = vec4(vColor * a, a);
  }
`,Xe=`
  precision highp float;
  in float aT;
  out float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ze=`
  precision highp float;
  uniform vec3 uColor;
  uniform float uAlfa;
  uniform float uCorte;   // el trazo existe hasta aquí (0–1)
  uniform float uTiempo;
  in float vT;
  out vec4 salida;
  void main() {
    if (vT > uCorte) discard;
    float punta = smoothstep(uCorte - 0.12, uCorte, vT) * step(uCorte, 0.999);
    float a = uAlfa * (0.55 + punta * 1.5 + 0.2 * sin(vT * 40.0 - uTiempo * 6.0));
    salida = vec4(uColor * a, a);
  }
`,Qe=we.replace(`const int MUESTRAS = 10;`,`const int MUESTRAS = 10;
  uniform float uDisolver;
  float hash3(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
  float ruido3(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
  }`).replace(`void main() {`,`void main() {
    // astillas: celdas duras mezcladas con ruido suave; el umbral sube con el scroll
    float quiebre = ruido3(vPosLocal * 0.0065) * 0.62 + ruido3(vPosLocal * 0.024 + 7.0) * 0.38;
    if (quiebre < uDisolver) discard;
    float canto = 1.0 - smoothstep(uDisolver, uDisolver + 0.07, quiebre);`).replace(`gl_FragColor = vec4(color, 1.0);`,`color += vec3(0.55, 0.8, 1.0) * canto * 2.4 * step(0.001, uDisolver);
    gl_FragColor = vec4(color, 1.0);`),$e=`
  varying vec2 vUv;
  uniform float uSube;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy + vec2(0.0, uSube), 0.0, 1.0);
  }
`,et=`
  precision highp float;
  uniform sampler2D uMapa;
  uniform float uAlfa;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(uMapa, vUv);
    gl_FragColor = vec4(c.rgb, c.a * uAlfa);
  }
`,H={heads:k(`heads`),cerebro:k(`cerebro`),orbe:k(`orbe`),cierre:k(`cierre`)},tt=e=>new ae(e).convertSRGBToLinear(),nt=e=>new c(...e);async function rt(e,n){let o=new ee({canvas:e,antialias:!1,powerPreference:`high-performance`});if(!o.capabilities.isWebGL2)throw o.dispose(),Error(`sin WebGL 2`);o.setPixelRatio(Math.min(devicePixelRatio,n.movil?1.25:1.5));let v=n.pantallas?Ge(n.pantallas.contenedor,n.pantallas.hosts,n.movil):null,y=new p(2,2,{type:pe,minFilter:m,magFilter:m,depthBuffer:!1}),x={uTiempo:{value:12},uScroll:{value:0},uAspecto:{value:1},uPuntero:{value:new s(.5,.5)},uFuerza:{value:0}},re=new h(-1,1,1,-1,0,1),se=new u,de=new C(new d(2,2),new f({vertexShader:be,fragmentShader:Te,uniforms:x,depthWrite:!1}));de.frustumCulled=!1,se.add(de);let fe={uCampo:{value:y.texture},uPuntillismo:{value:j.puntillismo},uTamPunto:{value:j.tamPunto},uArrastre:{value:j.arrastre},uPixel:{value:o.getPixelRatio()},uOscuro:{value:0}};for(let[e,t]of Object.entries(xe)){let n=new ae(t);fe[e]={value:new c(n.r,n.g,n.b)}}let he=new u,w=new C(new d(2,2),new f({vertexShader:be,fragmentShader:Ce,uniforms:fe,depthWrite:!1,toneMapped:!1}));w.frustumCulled=!1,he.add(w);let T=document.createElement(`canvas`),D=new te(T);D.colorSpace=``;let O={uMapa:{value:D},uAlfa:{value:1},uSube:{value:0}},k=new C(new d(2,2),new f({vertexShader:$e,fragmentShader:et,uniforms:O,transparent:!0,depthWrite:!1,depthTest:!1}));k.frustumCulled=!1,k.renderOrder=1,he.add(k);let ve={uAlfa:{value:0}},M=new C(new d(2,2),new f({vertexShader:`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`uniform float uAlfa; void main(){ gl_FragColor = vec4(0.004, 0.008, 0.035, uAlfa); }`,uniforms:ve,transparent:!0,depthWrite:!1,depthTest:!1}));M.frustumCulled=!1,M.renderOrder=2,he.add(M);try{await document.fonts.load(`700 200px "Geist Variable"`)}catch{}let we=(e,t)=>{T.width=e,T.height=t;let r=T.getContext(`2d`);r.clearRect(0,0,e,t);let i=Math.min(e*(n.movil?.25:.235),t*.36);r.font=`700 ${i}px "Geist Variable", "Segoe UI", sans-serif`,r.letterSpacing=`${-i*.045}px`,r.textAlign=`center`,r.textBaseline=`middle`;let a=t*(n.movil?.34:.37),o=r.createLinearGradient(0,a-i/2,0,a+i/2);o.addColorStop(0,`rgba(255,255,255,0.98)`),o.addColorStop(1,`rgba(198,223,253,0.9)`),r.fillStyle=o,r.fillText(`MEDULA`,e/2,a),D.needsUpdate=!0},N=new p(2,2,{type:pe,depthBuffer:!1}),P=new u,Ee=new C(new d(2,2),new f({vertexShader:be,fragmentShader:Se,uniforms:{uFondo:{value:N.texture}},depthWrite:!1,depthTest:!1}));Ee.frustumCulled=!1,Ee.renderOrder=-1,P.add(Ee);let F=new a(38,1,.05,80),De=(n.movil?.6:.78)*.0024,Oe=`${n.base}marca-blanca.svg`,[I,ke]=await Promise.all([fetch(Oe).then(e=>e.text()),ze(Oe,De)]),L={uFondo:{value:N.texture},uRes:{value:new s(1,1)},uTiempo:{value:0},uLuz:{value:new s(0,0)},uOscuro:{value:0},uDisolver:{value:0}},Ae=new f({vertexShader:ye,fragmentShader:Qe,uniforms:L}),R=new g;{let e=new ne().parse(I).paths.flatMap(e=>e.toShapes(!0)),t=new ce(e,{depth:110,bevelEnabled:!0,bevelThickness:46,bevelSize:30,bevelSegments:12,curveSegments:14});t.deleteAttribute(`uv`);let n=le(t,.5);t.dispose(),n.center(),n.computeVertexNormals();let r=new C(n,Ae);r.scale.set(De,-De,De),R.add(r)}P.add(R);let je=512*(n.movil?64:192),{textura:Pe,filas:Fe,grafo:Ie,bordes:Le,AREAS:Re}=Be(je,ke,n.movil),z=new ue,Ve=new Float32Array(je),He=new Float32Array(je*4);for(let e=0;e<je;e++)Ve[e]=e,He.set([Math.random(),Math.random(),Math.random(),Math.random()],e*4);z.setAttribute(`position`,new S(new Float32Array(je*3),3)),z.setAttribute(`aI`,new S(Ve,1)),z.setAttribute(`aAzar`,new S(He,4));let Ue=[...Re.map(e=>tt(e.color).lerp(new ae(1,1,1),.25)),tt(`#8aa6e6`)].map(e=>new c(e.r,e.g,e.b)),B=e=>{let t=tt(e);return new c(t.r,t.g,t.b)},We=Ne().flat(),V={uFormas:{value:Pe},uFilas:{value:Fe},uA:{value:0},uB:{value:0},uMezcla:{value:0},uTiempo:{value:0},uPixel:{value:o.getPixelRatio()},uTam:{value:n.movil?1.25:1},uAlfa:{value:0},uExplota:{value:0},uPensar:{value:0},uGiroA:{value:0},uGiroB:{value:0},uNoche:{value:0},uCurvas:{value:We},uGotaC:{value:[new c(-3,0,0),new c(0,0,0),new c(3,0,0)]},uGotaR:{value:[1,1.3,1]},uAreas:{value:Ue},uBruma:{value:B(`#dbe9ff`)},uAire:{value:B(`#63a7fc`)},uImpulso:{value:B(`#1b75fd`)}},rt={transparent:!0,depthWrite:!1,blending:5,blendSrc:201,blendDst:201},it=new f({vertexShader:Ke,fragmentShader:qe,uniforms:V,glslVersion:b,...rt}),at=new ie(z,it);at.frustumCulled=!1,P.add(at);let ot=Ie.lineas,U=new ue;U.setAttribute(`position`,new S(ot.pos,3)),U.setAttribute(`aArea`,new S(ot.area,1)),U.setAttribute(`aTipo`,new S(ot.tipo,1)),U.setAttribute(`aAvance`,new S(ot.avance,1)),U.setAttribute(`aSemilla`,new S(ot.semilla,1));let st={uTiempo:{value:0},uAreas:{value:Ue},uAlfa:{value:0}},W=new me(U,new f({vertexShader:Je,fragmentShader:Ye,uniforms:st,glslVersion:b,...rt}));W.frustumCulled=!1,W.scale.setScalar(2),P.add(W),Le.setAttribute(`aT`,new S(new Float32Array(Le.attributes.position.count),1));let ct={uColor:{value:B(`#bcd6ff`)},uAlfa:{value:0},uCorte:{value:1},uTiempo:{value:0}},lt=new me(Le,new f({vertexShader:Xe,fragmentShader:Ze,uniforms:ct,glslVersion:b,...rt}));lt.frustumCulled=!1,P.add(lt);let ut=Ie.notas[0].pos.clone().multiplyScalar(2),dt=[],ft=[],pt=ut.clone().multiplyScalar(.5).add(new c(0,.9,.6));for(let e=0;e<80;e++){let t=e/79,n=1-t,r=new c().addScaledVector(new c,n*n).addScaledVector(pt,2*n*t).addScaledVector(ut,t*t);dt.push(r.x,r.y,r.z),ft.push(t)}let mt=new ue;mt.setAttribute(`position`,new oe(dt,3)),mt.setAttribute(`aT`,new oe(ft,1));let ht={uColor:{value:B(`#ffffff`)},uAlfa:{value:0},uCorte:{value:0},uTiempo:{value:0}},gt=new _(mt,new f({vertexShader:Xe,fragmentShader:Ze,uniforms:ht,glslVersion:b,...rt}));gt.frustumCulled=!1,P.add(gt);let G=1,K=1,_t=!1,vt=()=>{G=innerWidth,K=innerHeight,o.setSize(G,K,!1),F.aspect=G/K,F.updateProjectionMatrix(),v?.ajustar(G,K),y.setSize(Math.max(2,Math.round(G*.5)),Math.max(2,Math.round(K*.5)));let e=o.getDrawingBufferSize(new s);N.setSize(e.x,e.y),L.uRes.value.copy(e),x.uAspecto.value=G/K,we(e.x,e.y),_t=!1,zt()};addEventListener(`resize`,vt);let q={x:.5,y:.5,px:.5,py:.5,vel:0,sx:0,sy:0},yt=e=>{q.x=e.clientX/innerWidth,q.y=1-e.clientY/innerHeight};addEventListener(`pointermove`,yt,{passive:!0});let bt=0,J=0,xt=0,St=0,Ct=0,wt=0,Tt=null,Et=1,Y={x:0,y:0,vx:0,vy:0},X=new c,Z=new c,Q=new c,Dt=new l,Ot=new i(new c(0,0,1),0),$=0,kt=0,At=performance.now(),jt=0,Mt=!0,Nt=(e,t,n=.1)=>E(t-n,t+.1,e)*(1-E(t+.5,t+ge,e)),Pt=e=>{if(!Mt)return;jt=n.quieto?0:requestAnimationFrame(Pt);let t=Math.min(.05,(e-At)/1e3);At=e,n.quieto||($+=t),J=n.quieto?bt:J+(bt-J)*(1-Math.exp(-t*7));let i=A.length-1,a=Math.min(i,Math.max(0,Math.floor(J))),l=Math.min(1,J-a),u=A[a],d=A[Math.min(i,a+1)],f=u.transicion??.62,p=a<i?E(f,1,l):0;V.uA.value=u.forma,V.uB.value=d.forma,V.uMezcla.value=p;let m=$*.07;V.uGiroA.value=u.giro?m:0,V.uGiroB.value=d.giro?m:0;let h=E(.3,1.15,J),g=a===i?1-E(.08,.55,l):1,ee=J<H.orbe?h:g;L.uDisolver.value=ee,R.visible=ee<.999,V.uAlfa.value=J<H.orbe?E(.35,.9,J):1-E(i+.15,i+.6,J),V.uAlfa.value*=1-E(H.orbe-.2,H.orbe+.02,J)*(1-E(H.orbe+.9,H.orbe+.98,J)),V.uExplota.value=E(.7,1.3,J)*(1-E(1.45,1.75,J))*.5;let _=u.noche+(d.noche-u.noche)*p;fe.uOscuro.value=_,L.uOscuro.value=_*.6,V.uNoche.value=_,ve.uAlfa.value=_**1.6*.76,M.visible=ve.uAlfa.value>.002,O.uAlfa.value=1-E(.02,.55,J),O.uSube.value=J*.5;let te=u.lineas??0,b=d.lineas??0;st.uAlfa.value=(te+(b-te)*p)*(u.id===`cerebro`?E(0,.2,l):1);let ne=u.escalaLineas??1,ie=d.escalaLineas??1;W.scale.setScalar(2*(ne+(ie-ne)*p)),W.rotation.y=m,W.visible=st.uAlfa.value>.002;let ae=u.boveda??0,oe=d.boveda??0;ct.uAlfa.value=(ae+(oe-ae)*p)*.5*(u.id===`boveda`?E(0,.25,l):1),lt.rotation.y=m*.5,lt.visible=ct.uAlfa.value>.002,St+=(xt-St)*(1-Math.exp(-t*4)),wt+=(Ct-wt)*(1-Math.exp(-t*5)),V.uPensar.value=n.quieto?xt:St,ht.uCorte.value=n.quieto?Ct:wt,ht.uAlfa.value=u.id===`orbe`?1-p:0,gt.rotation.y=m,gt.visible=!1;let S=(e,t,n,r)=>{n.set(...e.cam),e.camFin&&n.lerp(nt(e.camFin),E(0,ge,t)),r.set(...e.mira)};S(u,l,X,Z);let ce=new c,le=new c;S(d,0,ce,le),X.lerp(ce,p),Z.lerp(le,p);let ue=u.lado+(d.lado-u.lado)*p,de=F.aspect<.9;if(de){let e=u.ladoMovil??u.lado*.5,t=e+((d.ladoMovil??d.lado*.5)-e)*p;X.y-=t,Z.y-=t}else X.x-=ue,Z.x-=ue;if(de){let e=1+(1/F.aspect-1)*.72;X.sub(Z).multiplyScalar(e).add(Z)}if(q.sx+=(q.x-.5-q.sx)*(1-Math.exp(-t*2.5)),q.sy+=(q.y-.5-q.sy)*(1-Math.exp(-t*2.5)),X.x+=q.sx*.5,X.y+=q.sy*.3,F.position.copy(X),F.lookAt(Z),F.updateMatrixWorld(),Tt){let e=2*Math.tan(r.degToRad(F.fov/2))*F.position.distanceTo(Z);Tt.forEach((t,n)=>{Dt.setFromCamera(new s(t.x/G*2-1,1-t.y/K*2),F);let r=V.uGotaC.value[n];Dt.ray.intersectPlane(Ot,r),V.uGotaR.value[n]=t.r/K*e*(n===1?Et:1)})}let pe=(q.x-.5)*.9,C=(q.y-.5)*.7;if(Y.vx+=((pe-Y.x)*30-Y.vx*9)*t,Y.vy+=((C-Y.y)*30-Y.vy*9)*t,Y.x+=Y.vx*t,Y.y+=Y.vy*t,R.position.set(0,Math.sin($*.8)*.05,0),R.rotation.set(-Y.y*.5+Math.sin($*.5)*.04,Y.x*.8+Math.sin($*.35)*.14,Math.sin($*.4)*.03),L.uLuz.value.set(Y.x,Y.y),L.uTiempo.value=$,V.uTiempo.value=$,st.uTiempo.value=$,ht.uTiempo.value=$,kt+=t,kt>=1/30||!_t){let e=kt;kt=0,x.uTiempo.value+=e*j.velocidad;let t=1-(1-(.012+j.fluidez*.03))**(e*60),n=q.x-q.px,r=q.y-q.py;q.px+=n*t,q.py+=r*t,q.vel=Math.min(1,q.vel*.97**(e*60)+Math.hypot(n,r)*.35*j.fluidez),x.uPuntero.value.set(q.px,q.py),x.uFuerza.value=q.vel,x.uScroll.value=J*.7,o.setRenderTarget(y),o.render(se,re),_t=!0}o.setRenderTarget(N),k.visible=O.uAlfa.value>.002,o.render(he,re),o.setRenderTarget(null),o.render(P,F),v?.cuadro(F,a,l,p,$),n.alCuadro&&n.alCuadro(Lt(J,m))},Ft=(e,t,n,r=1)=>(Q.copy(t).project(F),{id:e,x:(Q.x+1)/2*G,y:(1-Q.y)/2*K,vis:Q.z<1?n:0,frente:r}),It=(e,t)=>e.clone().applyAxisAngle(new c(0,1,0),t),Lt=(e,t)=>{let n=[],r=Nt(e,H.heads,.3);r>0&&_e.forEach((e,t)=>n.push(Ft(`head-${e.id}`,Me(t),r)));let i=Nt(e,H.cerebro);i>0&&Ie.notas.slice(0,5).forEach((e,r)=>{let a=It(e.pos.clone().multiplyScalar(2),t),o=Math.max(0,Q.subVectors(F.position,a).normalize().dot(a.clone().normalize()));n.push(Ft(`nota-${r}`,a,i*E(.05,.4,o),o))});let a=H.orbe,o=E(a-.28,a-.05,e)*(1-E(a+.9,a+.99,e));if(o>0){let e=Ft(`orbe`,new c(0,0,0),o);Q.set(0,0,0).addScaledVector(new c().setFromMatrixColumn(F.matrixWorld,1),1.05).project(F),e.tam=Math.abs((1-Q.y)/2*K-e.y)*2,n.push(e)}return n},Rt=0;function zt(){n.quieto&&!Rt&&(Rt=requestAnimationFrame(e=>{Rt=0,At=e,Pt(e)}))}return vt(),n.quieto||(jt=requestAnimationFrame(Pt)),{avance(e){bt=e,zt()},orbe(e,t){xt=e,Ct=t,zt()},gotas(e,t=1){Tt=e,Et=t,zt()},destruir(){Mt=!1,v?.destruir(),cancelAnimationFrame(jt),cancelAnimationFrame(Rt),removeEventListener(`resize`,vt),removeEventListener(`pointermove`,yt),[z,U,Le,mt].forEach(e=>e.dispose()),R.traverse(e=>e.geometry?.dispose()),[M.material,it,Ae,W.material,lt.material,gt.material,Ee.material,de.material,w.material,k.material].forEach(e=>e.dispose()),Pe.dispose(),D.dispose(),y.dispose(),N.dispose(),o.dispose(),t(o)}}}export{rt as crearMundo};