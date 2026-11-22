import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { palettes, useTheme } from "../lib/theme.jsx";

/** The interactive 3D centrepiece: a faceted crystal inside a wireframe knot, with orbiting satellites. */
function Scene({ pal, pointer, animate }) {
  const group = useRef();
  const ico = useRef();
  const knot = useRef();
  const ring = useRef();
  const sats = useRef([]);

  const dust = useMemo(() => {
    const n = 260;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.7 + Math.random() * 1.1;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th);
      a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      a[i * 3 + 2] = r * Math.cos(ph);
    }
    return a;
  }, []);

  useFrame((state, dt) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    group.current.rotation.y += (p.x * 0.7 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-p.y * 0.45 - group.current.rotation.x) * 0.05;
    ico.current.rotation.x += dt * 0.25;
    ico.current.rotation.y += dt * 0.35;
    knot.current.rotation.x -= dt * 0.12;
    knot.current.rotation.z += dt * 0.18;
    ring.current.rotation.z += dt * 0.08;
    const s = 1 + Math.sin(t * 1.4) * 0.03;
    ico.current.scale.setScalar(s);
    sats.current.forEach((m, i) => {
      if (!m) return;
      const a = t * (0.5 + i * 0.18) + i * 2.1;
      const r = 2.15 + i * 0.28;
      m.position.set(Math.cos(a) * r, Math.sin(a * 0.9 + i) * 0.9, Math.sin(a) * r);
      m.rotation.x += dt * 1.2;
      m.rotation.y += dt * 0.9;
    });
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 4]} intensity={90} color={pal.neon} />
      <pointLight position={[-4, -2, 3]} intensity={70} color={pal.lime} />
      <directionalLight position={[0, 5, 2]} intensity={1.1} color="#ffffff" />

      <mesh ref={ico}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color={pal.violet} metalness={0.55} roughness={0.22} flatShading emissive={pal.violet} emissiveIntensity={0.18} />
      </mesh>

      <mesh ref={knot}>
        <torusKnotGeometry args={[1.85, 0.34, 160, 14, 2, 3]} />
        <meshBasicMaterial color={pal.lime} wireframe transparent opacity={0.34} />
      </mesh>

      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.55, 0.012, 8, 120]} />
        <meshBasicMaterial color={pal.neon} transparent opacity={0.65} />
      </mesh>

      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (sats.current[i] = el)}>
          {i === 1 ? <octahedronGeometry args={[0.2]} /> : i === 2 ? <boxGeometry args={[0.28, 0.28, 0.28]} /> : <sphereGeometry args={[0.17, 20, 20]} />}
          <meshStandardMaterial color={i === 1 ? pal.lime : pal.neon} metalness={0.4} roughness={0.25} emissive={i === 1 ? pal.lime : pal.neon} emissiveIntensity={0.35} />
        </mesh>
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial color={pal.neon} size={0.025} sizeAttenuation transparent opacity={0.8} />
      </points>
    </group>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const pal = palettes[theme];
  const pointer = useRef({ x: 0, y: 0 });
  const wrap = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", move);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full" aria-hidden="true">
      <Canvas
        key={theme}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 10.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={reduce ? "demand" : active ? "always" : "never"}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0, 0, 0), 0);
        }}
      >
        <Scene pal={pal} pointer={pointer} animate={!reduce} />
      </Canvas>
    </div>
  );
}
