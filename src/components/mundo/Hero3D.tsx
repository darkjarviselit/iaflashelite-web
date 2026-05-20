"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";
import { TerminalAnimated } from "@/components/mundo/TerminalAnimated";

const PARTICLE_COUNT = 200;

function WorldSphere() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const haloRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += delta * 0.16;
            sphereRef.current.rotation.x += delta * 0.05;
        }
        if (haloRef.current) {
            haloRef.current.rotation.y -= delta * 0.08;
        }
    });

    return (
        <group>
            <mesh ref={sphereRef}>
                <sphereGeometry args={[1.72, 64, 64]} />
                <meshBasicMaterial
                    color="#00e5ff"
                    opacity={0.24}
                    transparent
                    wireframe
                />
            </mesh>
            <mesh ref={haloRef} scale={1.04}>
                <sphereGeometry args={[1.72, 32, 32]} />
                <meshBasicMaterial
                    color="#A855F7"
                    depthWrite={false}
                    opacity={0.045}
                    side={THREE.BackSide}
                    transparent
                />
            </mesh>
            <mesh scale={1.1}>
                <sphereGeometry args={[1.72, 32, 32]} />
                <meshBasicMaterial
                    color="#00e5ff"
                    depthWrite={false}
                    opacity={0.035}
                    transparent
                />
            </mesh>
        </group>
    );
}

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const next = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
            const radius = 2.3 + Math.random() * 2.6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            next[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            next[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            next[i * 3 + 2] = radius * Math.cos(phi);
        }
        return next;
    }, []);
    const velocities = useMemo(() => {
        const next = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < next.length; i += 1) {
            next[i] = (Math.random() - 0.5) * 0.006;
        }
        return next;
    }, []);

    useFrame(({ clock }, delta) => {
        const points = pointsRef.current;
        if (!points) return;
        const attribute = points.geometry.getAttribute("position") as THREE.BufferAttribute;
        const array = attribute.array as Float32Array;
        const step = Math.min(delta, 0.033) * 60;

        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
            const ix = i * 3;
            velocities[ix] += Math.sin(clock.elapsedTime * 0.7 + i) * 0.00008;
            velocities[ix + 1] += Math.cos(clock.elapsedTime * 0.6 + i * 0.37) * 0.00008;
            velocities[ix + 2] += Math.sin(clock.elapsedTime * 0.5 + i * 0.19) * 0.00008;
            array[ix] += velocities[ix] * step;
            array[ix + 1] += velocities[ix + 1] * step;
            array[ix + 2] += velocities[ix + 2] * step;

            const distance = Math.hypot(array[ix], array[ix + 1], array[ix + 2]);
            if (distance > 5.7 || distance < 1.85) {
                velocities[ix] *= -0.9;
                velocities[ix + 1] *= -0.9;
                velocities[ix + 2] *= -0.9;
            }
        }

        points.rotation.y = clock.elapsedTime * 0.018;
        attribute.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#00e5ff"
                depthWrite={false}
                opacity={0.72}
                size={0.03}
                sizeAttenuation
                transparent
            />
        </points>
    );
}

function CameraRig({ compact = false }: { compact?: boolean }) {
    const { camera } = useThree();

    useFrame(({ clock }) => {
        const t = clock.elapsedTime * 0.08;
        camera.position.x = Math.sin(t) * (compact ? 0.35 : 0.5);
        camera.position.y = Math.cos(t * 0.8) * (compact ? 0.18 : 0.28);
        camera.lookAt(0, 0, 0);
    });

    return null;
}

export function BrainCanvas({ compact = false }: { compact?: boolean }) {
    return (
        <Canvas
            camera={{ position: [0, 0, compact ? 4.7 : 4.35], fov: compact ? 42 : 48 }}
            dpr={[1, 1.5]}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
            }}
        >
            <ambientLight intensity={0.6} />
            <pointLight color="#00e5ff" intensity={compact ? 35 : 48} position={[2.2, 2, 3]} />
            <pointLight color="#A855F7" intensity={14} position={[-3, -1.5, -2]} />
            <Float floatIntensity={compact ? 0.25 : 0.45} rotationIntensity={0.18} speed={1.2}>
                <WorldSphere />
            </Float>
            <Particles />
            <CameraRig compact={compact} />
            <Preload all />
        </Canvas>
    );
}

export function Hero3D() {
    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-onyx">
            <div className="absolute inset-0 opacity-90">
                <BrainCanvas />
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.22),transparent_34%),linear-gradient(180deg,rgba(10,10,10,0.1),#0a0a0a_92%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_160_160%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.85%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
            />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1180px] flex-col items-center justify-center px-6 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Badge variant="cyan">★ MUNDO G.I.R.U · v1.0</Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, filter: "blur(18px)", y: 24 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-8 max-w-6xl text-5xl font-bold tracking-tight text-paper sm:text-6xl md:text-8xl"
                >
                    <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: [0, 0.55, 0], x: [-10, 8, 0] }}
                        transition={{ delay: 0.52, duration: 0.42 }}
                        className="absolute inset-0 text-flash"
                    >
                        EL PRIMER MUNDO DE AGENTES IA
                    </motion.span>
                    <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: [0, 0.45, 0], x: [10, -6, 0] }}
                        transition={{ delay: 0.58, duration: 0.38 }}
                        className="absolute inset-0 text-[#A855F7]"
                    >
                        EL PRIMER MUNDO DE AGENTES IA
                    </motion.span>
                    <span className="relative">EL PRIMER MUNDO DE AGENTES IA</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary md:text-2xl"
                >
                    Descarga tu agente. Entrénalo. Compite contra el mundo.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.44, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 w-full max-w-2xl"
                >
                    <TerminalAnimated large />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.72, duration: 0.7 }}
                    className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary"
                >
                    <span>GRATIS</span>
                    <span className="h-1 w-1 rounded-full bg-flash" />
                    <span>SIN REGISTRO</span>
                    <span className="h-1 w-1 rounded-full bg-flash" />
                    <span>CÓDIGO ABIERTO</span>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-flash"
                aria-hidden="true"
            >
                <ChevronsDown size={28} />
            </motion.div>
        </section>
    );
}
