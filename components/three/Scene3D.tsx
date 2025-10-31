'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import TransformationCube from './TransformationCube';

interface Scene3DProps {
  showHelpers?: boolean;
  autoRotate?: boolean;
  enableOrbitControls?: boolean;
  showStars?: boolean;
  className?: string;
  onFaceClick?: (faceInfo: any) => void;
}

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
      <p className="text-white text-sm">Loading 3D Experience...</p>
    </div>
  </div>
);

// Scene content component
const SceneContent = ({
  showHelpers = true,
  autoRotate = false,
  enableOrbitControls = true,
  showStars = true,
  onFaceClick,
}: Omit<Scene3DProps, 'className'>) => {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />

      {/* Controls */}
      {enableOrbitControls && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping
        />
      )}

      {/* Background Stars */}
      {showStars && (
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      )}

      {/* Main Cube */}
      <TransformationCube
        showHelpers={showHelpers}
        autoRotate={autoRotate}
        onFaceClick={onFaceClick}
      />

      {/* Environment lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <hemisphereLight
        args={['#ffffff', '#444444', 0.6]}
        position={[0, 50, 0]}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0f172a', 10, 50]} />
    </>
  );
};

// Main Scene3D component - client-side only wrapper
export default function Scene3D({
  showHelpers = true,
  autoRotate = false,
  enableOrbitControls = true,
  showStars = true,
  className = '',
  onFaceClick,
}: Scene3DProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [helpersVisible, setHelpersVisible] = useState(showHelpers);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle helpers with 'H' key
      if (e.key === 'h' || e.key === 'H') {
        setHelpersVisible((prev) => !prev);
      }

      // Focus instructions with '?' key
      if (e.key === '?') {
        alert(
          'Keyboard Controls:\n\n' +
          '• Arrow Keys: Rotate cube\n' +
          '• H: Toggle helpers (grid/axes)\n' +
          '• Mouse Drag: Orbit view\n' +
          '• Mouse Wheel: Zoom in/out\n' +
          '• Click Faces: View dimension details'
        );
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isMounted]);

  // Don't render on server
  if (!isMounted) {
    return <LoadingFallback />;
  }

  return (
    <div
      ref={canvasRef}
      className={`relative w-full h-full ${className}`}
      role="application"
      aria-label="3D Transformation Cube Visualization"
      tabIndex={0}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
      >
        <Suspense fallback={null}>
          <SceneContent
            showHelpers={helpersVisible}
            autoRotate={autoRotate}
            enableOrbitControls={enableOrbitControls}
            showStars={showStars}
            onFaceClick={onFaceClick}
          />
        </Suspense>
      </Canvas>

      {/* UI Overlay - Controls Info */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-xs space-y-1 pointer-events-none">
        <div className="font-bold text-sm mb-2">Controls</div>
        <div className="flex items-center gap-2">
          <kbd className="bg-white/20 px-2 py-1 rounded">↑ ↓ ← →</kbd>
          <span>Rotate cube</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="bg-white/20 px-2 py-1 rounded">H</kbd>
          <span>Toggle helpers</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="bg-white/20 px-2 py-1 rounded">?</kbd>
          <span>Show all controls</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-indigo-300">🖱️</span>
          <span>Drag to orbit</span>
        </div>
      </div>

      {/* UI Overlay - Dimension Legend */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-xs space-y-2 pointer-events-none">
        <div className="font-bold text-sm mb-2">Dimensions</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-500 rounded"></div>
          <span>Temporal (X-axis)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Depth (Y-axis)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Relational (Z-axis)</span>
        </div>
      </div>

      {/* Accessibility announcement region */}
      <div className="sr-only" role="status" aria-live="polite">
        Interactive 3D cube representing transformation dimensions. Use arrow keys to rotate,
        click on faces for details. Press question mark for full controls.
      </div>
    </div>
  );
}
