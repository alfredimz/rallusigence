'use client'

import { useEffect, useRef } from 'react'
import styles from './HeroShader.module.css'

// Fondo WebGL del hero: ondas de "seda" teal fluyendo (fbm noise), inspirado en el
// efecto DisplacementFilter de los sitios Actinver del archivo de la agencia.
// Reglas de performance: carga en idle (después del LCP), DPR cap 1.75, se pausa
// fuera de viewport, respeta prefers-reduced-motion (no monta nada), fallback = el
// gradiente CSS existente del placeholder.

const VERTEX = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  uv.x *= uRes.x / max(uRes.y, 1.0);
  float t = uTime * 0.055;

  // Dominio deformado: ondas dentro de ondas (la "seda")
  vec2 q = vec2(fbm(uv * 1.6 + vec2(t, -t * 0.7)), fbm(uv * 1.6 - vec2(t * 0.8, t)));
  float n = fbm(uv * 2.2 + q * 1.7 + vec2(-t * 0.5, t * 0.3));

  vec3 deep = vec3(0.125, 0.706, 0.694);   /* #20B4B1 */
  vec3 light = vec3(0.49, 0.91, 0.90);     /* #7DE8E6 */
  vec3 col = mix(deep, light, smoothstep(0.25, 0.85, n));

  float alpha = smoothstep(0.3, 0.95, n) * 0.30;
  gl_FragColor = vec4(col, alpha);
}
`

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let alive = true
    let raf = 0
    let visible = true
    let cleanup: () => void = () => {}

    const start = async () => {
      const { Renderer, Program, Mesh, Triangle } = await import('ogl')
      if (!alive || !canvas.isConnected || !canvas.parentElement) return

      const renderer = new Renderer({
        canvas,
        dpr: Math.min(window.devicePixelRatio || 1, 1.75),
        alpha: true,
        antialias: false,
      })
      const gl = renderer.gl
      const geometry = new Triangle(gl)
      const program = new Program(gl, {
        vertex: VERTEX,
        fragment: FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [1, 1] },
        },
        transparent: true,
      })
      const mesh = new Mesh(gl, { geometry, program })

      const resize = () => {
        const parent = canvas.parentElement
        if (!parent) return
        renderer.setSize(parent.clientWidth, parent.clientHeight)
        program.uniforms.uRes.value = [parent.clientWidth, parent.clientHeight]
      }
      resize()
      window.addEventListener('resize', resize)

      const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
      io.observe(canvas)

      const t0 = performance.now()
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop)
        if (!visible) return
        program.uniforms.uTime.value = (t - t0) / 1000
        renderer.render({ scene: mesh })
      }
      raf = requestAnimationFrame(loop)
      canvas.classList.add(styles.on)

      cleanup = () => {
        cancelAnimationFrame(raf)
        io.disconnect()
        window.removeEventListener('resize', resize)
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
    }

    // Cargar después del trabajo crítico (LCP primero)
    const idle: (cb: () => void) => void =
      'requestIdleCallback' in window
        ? (cb) => (window as Window & { requestIdleCallback: (cb: () => void, o?: object) => void }).requestIdleCallback(cb, { timeout: 2500 })
        : (cb) => { setTimeout(cb, 900) }
    idle(() => { if (alive) void start() })

    return () => { alive = false; cleanup() }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
