'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// Types
interface CubeFaceInfo {
  name: string;
  dimension: string;
  description: string;
  color: string;
  practices: string[];
}

interface TransformationCubeProps {
  showHelpers?: boolean;
  autoRotate?: boolean;
  onFaceClick?: (faceInfo: CubeFaceInfo) => void;
}

interface ParticleProps {
  position: [number, number, number];
  color: string;
}

// Particle component for transformation energy
const Particle = ({ position, color }: ParticleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [phase] = useState(() => Math.random() * Math.PI * 2);
  const [speed] = useState(() => 0.5 + Math.random() * 0.5);
  const [radius] = useState(() => 2 + Math.random() * 1);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + phase;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.7) * radius;
      meshRef.current.position.z = Math.sin(t * 0.5) * radius;
      meshRef.current.scale.setScalar(0.8 + Math.sin(t * 2) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Axis Label component
const AxisLabel = ({ position, text, color }: { position: [number, number, number]; text: string; color: string }) => {
  return (
    <Text
      position={position}
      fontSize={0.3}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter-Bold.woff"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
    </Text>
  );
};

// Grid Helper component
const GridHelpers = () => {
  return (
    <group>
      <gridHelper args={[10, 10, '#444444', '#222222']} rotation={[0, 0, 0]} />
      <gridHelper args={[10, 10, '#444444', '#222222']} rotation={[Math.PI / 2, 0, 0]} />
      <gridHelper args={[10, 10, '#444444', '#222222']} rotation={[0, 0, Math.PI / 2]} />
    </group>
  );
};

// Axis Helper component
const AxisHelpers = () => {
  return (
    <group>
      {/* X Axis - Temporal (Indigo) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([-5, 0, 0, 5, 0, 0])}
            itemSize={3}
            args={[new Float32Array([-5, 0, 0, 5, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" linewidth={2} />
      </line>

      {/* Y Axis - Depth (Green) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, -5, 0, 0, 5, 0])}
            itemSize={3}
            args={[new Float32Array([0, -5, 0, 0, 5, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22c55e" linewidth={2} />
      </line>

      {/* Z Axis - Relational (Orange) */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, -5, 0, 0, 5])}
            itemSize={3}
            args={[new Float32Array([0, 0, -5, 0, 0, 5]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f97316" linewidth={2} />
      </line>
    </group>
  );
};

// Main Transformation Cube Component
export default function TransformationCube({
  showHelpers = true,
  autoRotate = false,
  onFaceClick,
}: TransformationCubeProps) {
  const cubeRef = useRef<THREE.Group>(null);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  // Face information
  const faceInfo: CubeFaceInfo[] = useMemo(() => [
    {
      name: 'Temporal +X',
      dimension: 'Temporal',
      description: 'Past, Present, Future awareness',
      color: '#6366f1',
      practices: ['Reflection', 'Mindfulness', 'Vision Setting']
    },
    {
      name: 'Temporal -X',
      dimension: 'Temporal',
      description: 'Time integration and flow',
      color: '#4f46e5',
      practices: ['Timeline Work', 'Future Self', 'Legacy Thinking']
    },
    {
      name: 'Depth +Y',
      dimension: 'Depth',
      description: 'Conscious awareness expansion',
      color: '#22c55e',
      practices: ['Meditation', 'Self-Inquiry', 'Shadow Work']
    },
    {
      name: 'Depth -Y',
      dimension: 'Depth',
      description: 'Subconscious exploration',
      color: '#16a34a',
      practices: ['Dream Work', 'Body Awareness', 'Somatic Healing']
    },
    {
      name: 'Relational +Z',
      dimension: 'Relational',
      description: 'Connection and community',
      color: '#f97316',
      practices: ['Authentic Communication', 'Empathy', 'Collaboration']
    },
    {
      name: 'Relational -Z',
      dimension: 'Relational',
      description: 'Self and other integration',
      color: '#ea580c',
      practices: ['Boundary Setting', 'Compassion', 'Service']
    },
  ], []);

  // Generate particles
  const particles = useMemo(() => {
    const colors = ['#6366f1', '#22c55e', '#f97316'];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      color: colors[i % colors.length],
    }));
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed((prev) => new Set(prev).add(e.key));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed((prev) => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle keyboard rotation
  useEffect(() => {
    const rotationSpeed = 0.02;
    let animationFrame: number;

    const updateRotation = () => {
      setRotation((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed.has('ArrowUp')) newX += rotationSpeed;
        if (keysPressed.has('ArrowDown')) newX -= rotationSpeed;
        if (keysPressed.has('ArrowLeft')) newY += rotationSpeed;
        if (keysPressed.has('ArrowRight')) newY -= rotationSpeed;

        return { x: newX, y: newY };
      });

      animationFrame = requestAnimationFrame(updateRotation);
    };

    if (keysPressed.size > 0) {
      animationFrame = requestAnimationFrame(updateRotation);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [keysPressed]);

  // Animation frame
  useFrame(({ clock }) => {
    if (cubeRef.current) {
      if (autoRotate) {
        cubeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
        cubeRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      } else {
        cubeRef.current.rotation.x = rotation.x;
        cubeRef.current.rotation.y = rotation.y;
      }
    }
  });

  // Face click handler
  const handleFaceClick = (faceIndex: number) => {
    if (onFaceClick) {
      onFaceClick(faceInfo[faceIndex]);
    }
  };

  // Face materials with hover effect
  const getFaceMaterial = (faceIndex: number) => {
    const isHovered = hoveredFace === faceIndex;
    const baseColor = faceInfo[faceIndex].color;

    return (
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={isHovered ? 0.5 : 0.2}
        transparent
        opacity={isHovered ? 0.9 : 0.7}
        side={THREE.DoubleSide}
        metalness={0.3}
        roughness={0.4}
      />
    );
  };

  return (
    <group>
      {/* Helpers */}
      {showHelpers && (
        <>
          <GridHelpers />
          <AxisHelpers />
        </>
      )}

      {/* Axis Labels */}
      <AxisLabel position={[3.5, 0, 0]} text="Temporal →" color="#6366f1" />
      <AxisLabel position={[-3.5, 0, 0]} text="← Temporal" color="#6366f1" />
      <AxisLabel position={[0, 3.5, 0]} text="Depth ↑" color="#22c55e" />
      <AxisLabel position={[0, -3.5, 0]} text="↓ Depth" color="#22c55e" />
      <AxisLabel position={[0, 0, 3.5]} text="Relational ↗" color="#f97316" />
      <AxisLabel position={[0, 0, -3.5]} text="↙ Relational" color="#f97316" />

      {/* Main Cube */}
      <group ref={cubeRef}>
        {/* Cube with individual face handling */}
        <mesh
          position={[1, 0, 0]}
          onClick={() => handleFaceClick(0)}
          onPointerOver={() => setHoveredFace(0)}
          onPointerOut={() => setHoveredFace(null)}
        >
          <planeGeometry args={[2, 2]} />
          {getFaceMaterial(0)}
        </mesh>

        <mesh
          position={[-1, 0, 0]}
          rotation={[0, Math.PI, 0]}
          onClick={() => handleFaceClick(1)}
          onPointerOver={() => setHoveredFace(1)}
          onPointerOut={() => setHoveredFace(null)}
        >
          <planeGeometry args={[2, 2]} />
          {getFaceMaterial(1)}
        </mesh>

        <mesh
          position={[0, 1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={() => handleFaceClick(2)}
          onPointerOver={() => setHoveredFace(2)}
          onPointerOut={() => setHoveredFace(null)}
        >
          <planeGeometry args={[2, 2]} />
          {getFaceMaterial(2)}
        </mesh>

        <mesh
          position={[0, -1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => handleFaceClick(3)}
          onPointerOver={() => setHoveredFace(3)}
          onPointerOut={() => setHoveredFace(null)}
        >
          <planeGeometry args={[2, 2]} />
          {getFaceMaterial(3)}
        </mesh>

        <mesh
          position={[0, 0, 1]}
          rotation={[0, Math.PI / 2, 0]}
          onClick={() => handleFaceClick(4)}
          onPointerOver={() => setHoveredFace(4)}
          onPointerOut={() => setHoveredFace(null)}
        >
          <planeGeometry args={[2, 2]} />
          {getFaceMaterial(4)}
        </mesh>

        <mesh
          position={[0, 0, -1]}
          rotation={[0, -Math.PI / 2, 0]}
          onClick={() => handleFaceClick(5)}
          onPointerOver={() => setHoveredFace(5)}
          onPointerOut={() => setHoveredFace(null)}
        >
          <planeGeometry args={[2, 2]} />
          {getFaceMaterial(5)}
        </mesh>

        {/* Edge wireframe */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
          <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </lineSegments>

        {/* Face Labels */}
        {hoveredFace !== null && (
          <Html position={[0, 0, 0]} center>
            <div
              className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg pointer-events-none"
              style={{ minWidth: '200px' }}
            >
              <h3 className="font-bold text-sm mb-1">{faceInfo[hoveredFace].name}</h3>
              <p className="text-xs text-gray-300">{faceInfo[hoveredFace].description}</p>
            </div>
          </Html>
        )}
      </group>

      {/* Particle Effects */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          position={particle.position}
          color={particle.color}
        />
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#6366f1" />
    </group>
  );
}
