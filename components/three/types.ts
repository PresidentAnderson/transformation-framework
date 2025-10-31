// Type definitions for 3D Transformation Cube components

export interface CubeFaceInfo {
  name: string;
  dimension: 'Temporal' | 'Depth' | 'Relational';
  description: string;
  color: string;
  practices: string[];
}

export interface TransformationCubeProps {
  showHelpers?: boolean;
  autoRotate?: boolean;
  onFaceClick?: (faceInfo: CubeFaceInfo) => void;
}

export interface Scene3DProps {
  showHelpers?: boolean;
  autoRotate?: boolean;
  enableOrbitControls?: boolean;
  showStars?: boolean;
  className?: string;
  onFaceClick?: (faceInfo: CubeFaceInfo) => void;
}

export interface ParticleProps {
  position: [number, number, number];
  color: string;
}

export interface AxisLabelProps {
  position: [number, number, number];
  text: string;
  color: string;
}

export interface CubeRotation {
  x: number;
  y: number;
}

export interface ParticleData {
  id: number;
  position: [number, number, number];
  color: string;
}

export type DimensionType = 'Temporal' | 'Depth' | 'Relational';

export type FaceIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface KeyboardControls {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  h: boolean;
  H: boolean;
}
