"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { SoundWaveIcon } from "@/components/SoundWaveIcon";
import * as THREE from "three";

// Ambient sound hook
function useAmbientSound(scrollYProgress: any, isEnabled: boolean) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillators = useRef<any[]>([]);

  useEffect(() => {
    if (!isEnabled || typeof window === "undefined") return;

    audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioCtxRef.current;

    // Create two oscillators: low hum + harmonic tone
    const low = ctx.createOscillator();
    const high = ctx.createOscillator();
    const lowGain = ctx.createGain();
    const highGain = ctx.createGain();

    low.type = "sine";
    low.frequency.value = 60; // low hum
    high.type = "triangle";
    high.frequency.value = 420; // harmonic tone

    lowGain.gain.value = 0.05;
    highGain.gain.value = 0.0;

    low.connect(lowGain).connect(ctx.destination);
    high.connect(highGain).connect(ctx.destination);

    low.start();
    high.start();

    oscillators.current = [low, high, lowGain, highGain];

    return () => {
      oscillators.current.forEach((node) => {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      });
      if (ctx.state !== "closed") ctx.close();
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled || !scrollYProgress) return;

    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      const [, , lowGain, highGain] = oscillators.current;
      if (!lowGain || !highGain) return;

      // Fade between sounds based on scroll position
      const collapsePhase = Math.max(0, 1 - Math.min(v * 2, 1));
      const rebirthPhase = Math.max(0, (v - 0.5) * 2);

      lowGain.gain.value = 0.05 * collapsePhase; // hum fades out
      highGain.gain.value = 0.05 * rebirthPhase; // harmonic fades in
    });

    return () => unsubscribe();
  }, [scrollYProgress, isEnabled]);
}

// 3D Transforming fragments component
function TransformingFragments({ scrollYProgress }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const explode = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 2.5, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.1, 0.08, 0]);
  const sphereOpacity = useTransform(scrollYProgress, [0.7, 0.9, 1], [0, 0.4, 0.8]);
  const sphereScale = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  const [explodeVal, setExplodeVal] = useState(0);
  const [opacityVal, setOpacityVal] = useState(0.15);
  const [sphereOpacityVal, setSphereOpacityVal] = useState(0);
  const [sphereScaleVal, setSphereScaleVal] = useState(0);

  useEffect(() => {
    const unsubscribes = [
      explode.on("change", setExplodeVal),
      opacity.on("change", setOpacityVal),
      sphereOpacity.on("change", setSphereOpacityVal),
      sphereScale.on("change", setSphereScaleVal),
    ];
    return () => unsubscribes.forEach((u) => u());
  }, [explode, opacity, sphereOpacity, sphereScale]);

  // Create fragments
  const fragments = Array.from({ length: 25 }).map((_, i) => {
    const offset = (Math.random() - 0.5) * 2;
    const x = offset + (Math.random() - 0.5) * explodeVal;
    const y = offset + (Math.random() - 0.5) * explodeVal;
    const z = offset + (Math.random() - 0.5) * explodeVal;

    return (
      <mesh key={i} position={[x, y, z]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#a78bfa" transparent opacity={opacityVal} wireframe />
      </mesh>
    );
  });

  return (
    <group ref={groupRef}>
      {fragments}

      {/* Rebirth sphere */}
      <mesh scale={sphereScaleVal}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial
          color="#a78bfa"
          transparent
          opacity={sphereOpacityVal}
          emissive="#a78bfa"
          emissiveIntensity={2}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

export default function CollapseOfIdentityEnhanced() {
  const { scrollYProgress } = useScroll();
  const [soundEnabled, setSoundEnabled] = useState(false);

  useAmbientSound(scrollYProgress, soundEnabled);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <section
      id="collapse-of-identity-enhanced"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900"
      role="region"
      aria-labelledby="collapse-heading-enhanced"
    >
      {/* 3D Background Animation */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[3, 3, 5]} intensity={1} />
            <TransformingFragments scrollYProgress={scrollYProgress} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.7}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10 pointer-events-none" />

      {/* Sound Toggle Button */}
      <motion.button
        onClick={toggleSound}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2
                   rounded-full bg-indigo-600/30 backdrop-blur border border-indigo-400/40
                   text-indigo-200 text-sm hover:bg-indigo-600/50 transition-all duration-300
                   shadow-lg hover:shadow-indigo-500/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={soundEnabled ? "Disable ambient sound" : "Enable ambient sound"}
      >
        <SoundWaveIcon active={soundEnabled} />
        <span>{soundEnabled ? "Sound Off" : "Sound On"}</span>
      </motion.button>

      <div className="max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="collapse-heading-enhanced"
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-purple-400" aria-hidden="true" />
            The Collapse of the Old Identity Model
          </h2>
          <motion.p
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            True transformation cannot coexist with the old model of identity. The self built for
            survival, approval, or predictability must dissolve to make space for who you are
            becoming.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* The Old Model */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full bg-white/5 border-2 border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-red-300">The Old Model</h3>
                </div>
                <ul className="space-y-3 text-gray-300" role="list">
                  <li>
                    Rooted in <em className="font-semibold text-red-300">comparison, control, and consistency</em>.
                  </li>
                  <li>Operates through labels and rigid narratives ("I am this", "I am not that").</li>
                  <li>Creates comfort through repetition, not growth.</li>
                  <li>Protects the ego from uncertainty — but also from evolution.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Collapse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Card className="h-full bg-white/5 border-2 border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-purple-300">The Collapse</h3>
                </div>
                <ul className="space-y-3 mb-4 text-gray-300" role="list">
                  <li>
                    <strong className="text-indigo-300">Temporal Flow (X):</strong> breaks linear progress — you stop measuring life by milestones.
                  </li>
                  <li>
                    <strong className="text-green-300">Depth (Y):</strong> dissolves self-image — awareness replaces identity.
                  </li>
                  <li>
                    <strong className="text-orange-300">Relational (Z):</strong> removes separation — being becomes interconnectedness.
                  </li>
                </ul>
                <div className="p-4 bg-purple-900/30 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    This collapse feels like loss, but it's actually liberation. What's falling apart isn't{" "}
                    <em className="font-semibold">you</em> — it's what's been standing in your way.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Completion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Card className="h-full bg-white/5 border-2 border-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-green-300">The Completion</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Transformation completes when there's nothing left to defend. When purpose flows freely through
                  time, integrity anchors awareness, and compassion shapes all relations — the old identity ends,
                  and true being begins.
                </p>
                <motion.blockquote
                  className="border-l-4 border-purple-400 pl-4 py-2 bg-purple-900/20 rounded-r-lg"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-200 font-medium italic text-base">
                    "The end of identity is not annihilation — it's emancipation."
                  </p>
                </motion.blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
