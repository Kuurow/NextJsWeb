import { useEffect, useRef } from 'react';

const VS = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FS = `
precision highp float;
#extension GL_OES_standard_derivatives : enable
uniform vec2  u_res;
uniform float u_time;

vec3 m289v3(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec4 m289v4(vec4 x){ return x - floor(x*(1./289.))*289.; }
vec4 perm(vec4 x){ return m289v4((x*34.+1.)*x); }
vec4 tis(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

float snoise(vec3 v){
  const vec2 C = vec2(1./6., 1./3.);
  const vec4 D = vec4(0.,.5,1.,2.);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1. - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = m289v3(i);
  vec4 p = perm(perm(perm(
    i.z + vec4(0.,i1.z,i2.z,1.)) +
    i.y + vec4(0.,i1.y,i2.y,1.)) +
    i.x + vec4(0.,i1.x,i2.x,1.));
  float n_ = .142857142857;
  vec3  ns = n_*D.wyz - D.xzx;
  vec4 j   = p - 49.*floor(p*ns.z*ns.z);
  vec4 x_  = floor(j*ns.z);
  vec4 y_  = floor(j - 7.*x_);
  vec4 x   = x_*ns.x + ns.yyyy;
  vec4 y   = y_*ns.x + ns.yyyy;
  vec4 h   = 1. - abs(x) - abs(y);
  vec4 b0  = vec4(x.xy, y.xy);
  vec4 b1  = vec4(x.zw, y.zw);
  vec4 s0  = floor(b0)*2.+1.;
  vec4 s1  = floor(b1)*2.+1.;
  vec4 sh  = -step(h, vec4(0.));
  vec4 a0  = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1  = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0  = vec3(a0.xy, h.x);
  vec3 p1  = vec3(a0.zw, h.y);
  vec3 p2  = vec3(a1.xy, h.z);
  vec3 p3  = vec3(a1.zw, h.w);
  vec4 norm = tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m = max(.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.);
  m = m * m;
  return 42.*dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

vec2 rot2d(vec2 p, float a){
  float c = cos(a), s = sin(a);
  return vec2(p.x*c - p.y*s, p.x*s + p.y*c);
}

float curtain(vec2 p, float freq, float drift, float tilt, float phase, float t){
  float wx = snoise(vec3(p.x * 0.55, p.y * 0.30, t * 0.06 + phase)) * 0.55;
  float wy = snoise(vec3(p.x * 0.40 + 3.7, p.y * 0.25, t * 0.05 + phase + 1.3)) * 0.30;
  vec2  wp = p + vec2(wx, wy);
  vec2  rp = rot2d(wp, tilt);
  float band = sin(rp.x * freq + t * drift + phase);
  float shimmer = sin(rp.x * freq * 2.3 + t * drift * 1.7 + phase + 0.9) * 0.28;
  float raw = band + shimmer;
  float b = raw * 0.5 + 0.5;
  b = pow(clamp(b, 0.0, 1.0), 2.2);
  float venv = smoothstep(0.0, 0.28, p.y) * smoothstep(1.0, 0.68, p.y);
  return b * venv;
}

vec3 auroraPalette(float v, float layer){
  vec3 bg      = vec3(0.118, 0.071, 0.047);
  vec3 ember   = vec3(0.42,  0.26,  0.13);
  vec3 tan_c   = vec3(0.72,  0.56,  0.35);
  vec3 sand    = vec3(0.851, 0.769, 0.659);
  vec3 cream   = vec3(0.961, 0.933, 0.898);
  vec3 tint = mix(ember, tan_c, clamp(layer, 0.0, 1.0));
  vec3 c = bg;
  c = mix(c, tint,  smoothstep(0.05, 0.35, v));
  c = mix(c, sand,  smoothstep(0.30, 0.62, v));
  c = mix(c, cream, smoothstep(0.58, 0.88, v));
  return c;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float t  = u_time * 0.28;
  float c1 = curtain(uv, 5.8,  0.18,  0.00,  0.00, t);
  float c2 = curtain(uv, 8.3,  0.11,  0.06,  2.40, t);
  float c3 = curtain(uv, 3.9, -0.09, -0.05,  5.10, t);
  float c4 = curtain(uv, 11.2, 0.14,  0.09,  8.70, t);
  float c5 = curtain(uv, 6.7, -0.07, -0.03,  12.3, t);
  vec3 col = vec3(0.118, 0.071, 0.047);
  col += auroraPalette(c1, 0.0) * 0.40;
  col += auroraPalette(c2, 0.3) * 0.30;
  col += auroraPalette(c3, 0.6) * 0.25;
  col += auroraPalette(c4, 0.8) * 0.20;
  col += auroraPalette(c5, 1.0) * 0.18;
  col = col / (col + 0.55);
  float grain = snoise(vec3(gl_FragCoord.xy * 1.1, 47.3)) * 0.018;
  col = clamp(col + grain, 0.0, 1.0);
  float vig = 1.0 - 0.38 * pow(length(uv - vec2(0.5, 0.48)) * 1.5, 2.0);
  col *= clamp(vig, 0.0, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, src: string, type: number): WebGLShader | null {
    const s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(s));
        return null;
    }
    return s;
}

export default function AuroraCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
        if (!gl) {
            console.warn('WebGL not available');
            return;
        }

        gl.getExtension('OES_standard_derivatives');

        function resize() {
            if (!canvas || !gl) return;
            const dpr = Math.min(devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        window.addEventListener('resize', resize);
        resize();

        const vs = compileShader(gl, VS, gl.VERTEX_SHADER);
        const fs = compileShader(gl, FS, gl.FRAGMENT_SHADER);
        if (!vs || !fs) return;

        const prog = gl.createProgram();
        if (!prog) return;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(prog));
            return;
        }
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,  1, -1, -1,  1,
             1, -1,  1,  1, -1,  1,
        ]), gl.STATIC_DRAW);

        const aPos = gl.getAttribLocation(prog, 'a_pos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const uRes  = gl.getUniformLocation(prog, 'u_res');
        const uTime = gl.getUniformLocation(prog, 'u_time');

        let rafId: number;
        const t0 = performance.now();

        function frame() {
            if (!gl || !canvas) return;
            const t = (performance.now() - t0) * 0.001;
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, t);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            rafId = requestAnimationFrame(frame);
        }
        rafId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full block -z-10"
        />
    );
}
