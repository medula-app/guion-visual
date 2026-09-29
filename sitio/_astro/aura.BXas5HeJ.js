var e=e=>`/guion-visual/sitio/`+e.replace(/^\//,``),t=`
  varying vec3 vNormal;
  varying vec3 vPosVista;
  varying vec3 vPosLocal;
  void main() {
    vec4 pv = modelViewMatrix * vec4(position, 1.0);
    vPosVista = pv.xyz;
    vPosLocal = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * pv;
  }
`,n=`
  precision highp float;
  uniform sampler2D uFondo;
  uniform vec2 uRes;
  uniform float uTiempo;
  uniform vec2 uLuz;
  uniform float uOscuro;
  varying vec3 vNormal;
  varying vec3 vPosVista;
  varying vec3 vPosLocal;

  const int MUESTRAS = 10;

  // estudio: degradado de cielo + tres cajas de luz
  vec3 estudio(vec3 r) {
    vec3 base = mix(vec3(0.01, 0.04, 0.16), vec3(0.55, 0.7, 1.0), smoothstep(-0.6, 0.9, r.y)) * 0.28;
    float techo = smoothstep(0.52, 0.6, r.y) * (1.0 - smoothstep(0.3, 0.42, abs(r.x + 0.15)));
    float der = smoothstep(0.72, 0.8, r.x) * (1.0 - smoothstep(0.22, 0.34, abs(r.y - 0.12)));
    float izq = smoothstep(0.8, 0.88, -r.x) * (1.0 - smoothstep(0.1, 0.2, abs(r.y + 0.25)));
    return base + vec3(1.0) * (techo * 2.2 + der * 1.4) + vec3(0.7, 0.85, 1.0) * izq * 1.1;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(-vPosVista);
    // cara frontal casi plana: ondulación lenta (vidrio líquido)
    float frente = smoothstep(0.92, 0.99, n.z);
    float t = uTiempo * 0.6;
    n.xy += frente * 0.045 * vec2(sin(vPosLocal.y * 0.012 + t) + 0.5 * sin(vPosLocal.x * 0.02 - t * 1.3),
                                  cos(vPosLocal.x * 0.011 - t * 0.8) + 0.5 * cos(vPosLocal.y * 0.018 + t));
    n = normalize(n);

    vec2 uv = gl_FragCoord.xy / uRes;
    vec3 ojo = -v;
    float ndv = max(dot(n, v), 0.0);

    // refracción con dispersión: la imagen se corre según cuánto se curva el
    // vidrio (n.xy), no según la mirada; así la cara plana queda limpia y el
    // canto dobla fuerte. Cada canal se corre distinto: el prisma del borde.
    vec3 refr = vec3(0.0);
    vec2 curva = n.xy;
    for (int i = 0; i < MUESTRAS; i++) {
      float d = float(i) / float(MUESTRAS) * 0.035;
      refr.r += texture2D(uFondo, uv - curva * (0.11 + d)).r;
      refr.g += texture2D(uFondo, uv - curva * (0.11 + d * 2.0)).g;
      refr.b += texture2D(uFondo, uv - curva * (0.11 + d * 3.0)).b;
    }
    refr /= float(MUESTRAS);

    // el vidrio grueso absorbe: los cantos se ven más hondos y azules
    float grosor = pow(1.0 - ndv, 1.6);
    vec3 absorcion = mix(vec3(1.0), vec3(0.62, 0.78, 1.0), grosor);
    vec3 color = refr * absorcion * (1.0 - 0.3 * grosor);

    // reflejo del estudio según Fresnel
    float fresnel = 0.04 + 0.96 * pow(1.0 - ndv, 4.0);
    vec3 r = reflect(ojo, n);
    color += estudio(r) * fresnel * 1.1;

    // brillos especulares duros; la luz principal sigue al puntero
    vec3 l1 = normalize(vec3(uLuz.x * 1.2 - 0.4, 0.8 + uLuz.y * 0.6, 0.9));
    vec3 l2 = normalize(vec3(0.9, -0.4, 0.6));
    float s1 = pow(max(dot(n, normalize(l1 + v)), 0.0), 220.0);
    float s2 = pow(max(dot(n, normalize(l2 + v)), 0.0), 90.0);
    color += vec3(1.0) * s1 * 2.4 + vec3(0.75, 0.88, 1.0) * s2 * 0.7;

    // un filo de luz en el borde de la cara frontal
    color += vec3(0.9, 0.95, 1.0) * smoothstep(0.55, 0.9, 1.0 - abs(n.z)) * 0.18;

    color = mix(color, color * vec3(0.8, 0.9, 1.15), uOscuro * 0.4);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`,r=`
  precision highp float;
  uniform sampler2D uFondo;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uFondo, vUv);
    #include <colorspace_fragment>
  }
`,i=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`,a=`
  precision highp float;
  varying vec2 vUv;
  uniform float uTiempo;
  uniform float uScroll;
  uniform float uAspecto;
  uniform float uCaja;
  uniform vec2 uPuntero;
  uniform float uFuerza;
  
  // ruido simplex 2D (Ashima)
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  float fbm(vec2 p) {
    float s = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) { s += a * snoise(p); p *= 2.02; a *= 0.5; }
    return s;
  }


  void main() {
    float aspecto = uAspecto;
    vec2 p = vec2(vUv.x * aspecto, vUv.y);
    float t = uTiempo * 0.045; // uTiempo ya viene escalado por la velocidad

    // el puntero hunde y arrastra el fluido
    vec2 dp = p - vec2(uPuntero.x * aspecto, uPuntero.y);
    float cerca = exp(-dot(dp, dp) * 7.0) * uFuerza;
    p += normalize(dp + 1e-4) * cerca * 0.06;

    // domain warping a baja frecuencia: masas blandas que se doblan lento
    vec2 q = vec2(fbm(p * 0.55 + vec2(0.0, t)), fbm(p * 0.55 + vec2(5.2, -t * 0.8)));
    vec2 r = vec2(fbm(p * 0.5 + 1.1 * q + vec2(1.7 - t * 0.6, 9.2 + uScroll * 0.3)),
                  fbm(p * 0.5 + 1.1 * q + vec2(8.3, 2.8 + t * 0.5)));
    float campo = fbm(p * 0.42 + 0.9 * r);

    // la masa azul vive a la izquierda y respira; el scroll la pasea por la página
    vec2 centro = vec2(0.3 * aspecto + 0.14 * sin(uScroll * 1.3 + t * 1.2), 0.56 - 0.2 * sin(uScroll * 0.9));
    float masa = 1.0 - smoothstep(0.0, 1.15, length((vec2(vUv.x * aspecto, vUv.y) - centro) * vec2(0.8, 1.05)));
    float d = clamp(masa * 1.3 + campo * 0.32 - 0.1, 0.0, 1.0);
    // en caja (p. ej. el panel del Cerebro): el azul llena el centro y la bruma blanca solo asoma en los bordes
    float borde = smoothstep(0.42, 0.95, length((vUv - 0.5) * vec2(1.0, 1.25)));
    d = mix(d, clamp(0.8 + campo * 0.16 - borde * 0.6, 0.0, 1.0), uCaja);

    // flujo: el desplazamiento del fluido, para que los puntos viajen con él
    vec2 flujo = 1.1 * q + 0.9 * r + vec2(t * 1.5, uScroll * 0.6);
    gl_FragColor = vec4(d, flujo, 1.0);
  }
`,o=`
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uCampo;
  uniform float uPuntillismo;
  uniform float uTamPunto;
  uniform float uArrastre;
  uniform float uPixel;
  uniform float uOscuro;
  uniform vec3 uNucleo;
  uniform vec3 uMedula;
  uniform vec3 uImpulso;
  uniform vec3 uAire;
  uniform vec3 uBruma;
  uniform vec3 uHielo;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 degradado(float d) {
    vec3 col = uHielo;
    col = mix(col, uBruma, smoothstep(0.02, 0.32, d));
    col = mix(col, uAire, smoothstep(0.22, 0.52, d));
    col = mix(col, uImpulso, smoothstep(0.42, 0.7, d));
    col = mix(col, uMedula, smoothstep(0.6, 0.84, d));
    col = mix(col, uNucleo, smoothstep(0.76, 1.0, d));
    return col;
  }

  void main() {
    vec4 c = texture2D(uCampo, vUv);
    float d = c.r;
    vec2 flujo = c.gb;

    // la rejilla de puntos está anclada al fluido: se estira y viaja con él
    float celda = max(1.0, uTamPunto * uPixel);
    vec2 coord = gl_FragCoord.xy / celda + flujo * uArrastre;
    float umbral = hash(floor(coord)) - 0.5;
    // cada punto es el mismo degradado, un poco adelantado o atrasado
    float amplitud = uPuntillismo * (0.1 + 0.16 * smoothstep(0.0, 0.25, d));
    float dp = clamp(d + umbral * amplitud, 0.0, 1.0);
    vec3 col = degradado(dp);

    // modo oscuro: la noche azul, con los mismos puntos
    vec3 noche = mix(vec3(0.012, 0.02, 0.07), col * vec3(0.55, 0.7, 1.0), smoothstep(0.25, 0.95, dp));
    col = mix(col, noche, uOscuro);

    gl_FragColor = vec4(pow(max(col, 0.0), vec3(2.2)), 1.0);
    #include <colorspace_fragment>
  }
`,s={uNucleo:`#013ecc`,uMedula:`#0853e0`,uImpulso:`#1b75fd`,uAire:`#63a7fc`,uBruma:`#c6dffd`,uHielo:`#f2f7fe`},c={velocidad:.35,puntillismo:.7,tamPunto:1.6,arrastre:18,fluidez:.5};export{c as a,t as c,i,e as l,s as n,r as o,o as r,n as s,a as t};