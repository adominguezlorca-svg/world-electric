import { useEffect, useRef } from "react";

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  className?: string;
}

export function Lightning({
  hue = 220,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  className,
}: LightningProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const resize = () => {
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vs = `attribute vec2 aPosition; void main(){ gl_Position = vec4(aPosition,0.,1.); }`;
    const fs = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      #define OCTAVE_COUNT 10
      vec3 hsv2rgb(vec3 c){ vec3 rgb = clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.); return c.z*mix(vec3(1.),rgb,c.y); }
      float hash11(float p){ p=fract(p*.1031); p*=p+33.33; p*=p+p; return fract(p); }
      float hash12(vec2 p){ vec3 p3=fract(vec3(p.xyx)*.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
      mat2 rotate2d(float t){ float c=cos(t),s=sin(t); return mat2(c,-s,s,c); }
      float noise(vec2 p){ vec2 ip=floor(p), fp=fract(p);
        float a=hash12(ip), b=hash12(ip+vec2(1,0)), c=hash12(ip+vec2(0,1)), d=hash12(ip+vec2(1,1));
        vec2 t=smoothstep(0.,1.,fp); return mix(mix(a,b,t.x),mix(c,d,t.x),t.y);
      }
      float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<OCTAVE_COUNT;i++){ v+=a*noise(p); p*=rotate2d(.45); p*=2.; a*=.5; } return v; }
      void main(){
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv = 2.*uv - 1.;
        uv.x *= iResolution.x / iResolution.y;
        uv.x += uXOffset;
        uv += 2.*fbm(uv*uSize + .8*iTime*uSpeed) - 1.;
        float dist = abs(uv.x);
        vec3 base = hsv2rgb(vec3(uHue/360., .7, .8));
        vec3 col = base * pow(mix(0., .07, hash11(iTime*uSpeed))/dist, 1.) * uIntensity;
        gl_FragColor = vec4(col, 1.);
      }
    `;

    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const vsh = compile(vs, gl.VERTEX_SHADER);
    const fsh = compile(fs, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vsh); gl.attachShader(prog, fsh);
    gl.linkProgram(prog); gl.useProgram(prog);

    const verts = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");
    const uHue = gl.getUniformLocation(prog, "uHue");
    const uX = gl.getUniformLocation(prog, "uXOffset");
    const uSp = gl.getUniformLocation(prog, "uSpeed");
    const uIn = gl.getUniformLocation(prog, "uIntensity");
    const uSz = gl.getUniformLocation(prog, "uSize");

    const t0 = performance.now();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVis = () => { /* tick re-checks document.hidden */ };
    document.addEventListener("visibilitychange", onVis);
    const tick = () => {
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform1f(uHue, hue);
      gl.uniform1f(uX, xOffset);
      gl.uniform1f(uSp, speed);
      gl.uniform1f(uIn, intensity);
      gl.uniform1f(uSz, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(tick);
    };
    if (!reduced) raf = requestAnimationFrame(tick);
    else {
      // single static frame
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, 0);
      gl.uniform1f(uHue, hue);
      gl.uniform1f(uX, xOffset);
      gl.uniform1f(uSp, speed);
      gl.uniform1f(uIn, intensity);
      gl.uniform1f(uSz, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className={className ?? "w-full h-full block"} />;
}