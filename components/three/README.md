# 3D Transformation Cube Components

Advanced 3D visualization components for the Personal Transformation Model using React Three Fiber.

## Components

### `Scene3D.tsx`
The main wrapper component that provides the Canvas and client-side rendering.

**Features:**
- Client-side only rendering (prevents SSR issues)
- Responsive canvas setup
- Orbit controls for camera manipulation
- Background stars for visual appeal
- Keyboard shortcuts (H for helpers, ? for help)
- UI overlays with controls and dimension legend
- Accessibility features (ARIA labels, keyboard navigation)
- Loading fallback component

**Props:**
```typescript
interface Scene3DProps {
  showHelpers?: boolean;        // Show grid and axis helpers
  autoRotate?: boolean;          // Auto-rotate the cube
  enableOrbitControls?: boolean; // Enable mouse orbit controls
  showStars?: boolean;           // Show background stars
  className?: string;            // Additional CSS classes
  onFaceClick?: (faceInfo: CubeFaceInfo) => void; // Face click callback
}
```

### `TransformationCube.tsx`
The interactive 3D cube with all transformation dimensions.

**Features:**
- Interactive 3D cube with 6 faces
- Color-coded dimensions:
  - Temporal (X-axis): Indigo (#6366f1)
  - Depth (Y-axis): Green (#22c55e)
  - Relational (Z-axis): Orange (#f97316)
- Click handlers for each face
- Hover effects with tooltips
- Keyboard controls (Arrow keys for rotation)
- Particle effects (30 animated particles)
- Smooth spring animations
- Axis labels and helpers
- Grid helpers (toggleable)
- Edge wireframe
- Dynamic lighting

**Props:**
```typescript
interface TransformationCubeProps {
  showHelpers?: boolean;
  autoRotate?: boolean;
  onFaceClick?: (faceInfo: CubeFaceInfo) => void;
}
```

**Face Information Structure:**
```typescript
interface CubeFaceInfo {
  name: string;           // e.g., "Temporal +X"
  dimension: string;      // "Temporal", "Depth", or "Relational"
  description: string;    // Description of the dimension
  color: string;          // Hex color code
  practices: string[];    // Related practices
}
```

## Usage Example

### Basic Usage
```tsx
import Scene3D from '@/components/three/Scene3D';

export default function Page() {
  return (
    <div className="w-full h-screen">
      <Scene3D />
    </div>
  );
}
```

### Advanced Usage with Callbacks
```tsx
'use client';

import { useState } from 'react';
import Scene3D from '@/components/three/Scene3D';
import type { CubeFaceInfo } from '@/components/three/types';

export default function TransformationViewer() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceInfo | null>(null);

  const handleFaceClick = (faceInfo: CubeFaceInfo) => {
    setSelectedFace(faceInfo);
    console.log('Face clicked:', faceInfo);
  };

  return (
    <div className="relative w-full h-screen">
      <Scene3D
        showHelpers={true}
        autoRotate={false}
        enableOrbitControls={true}
        showStars={true}
        onFaceClick={handleFaceClick}
      />

      {selectedFace && (
        <div className="absolute top-1/2 left-4 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-2">{selectedFace.name}</h2>
          <p className="text-gray-600 mb-4">{selectedFace.description}</p>
          <h3 className="font-semibold mb-2">Practices:</h3>
          <ul className="list-disc list-inside">
            {selectedFace.practices.map((practice, i) => (
              <li key={i}>{practice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Keyboard Controls

- **Arrow Keys** (↑ ↓ ← →): Rotate the cube manually
- **H**: Toggle grid and axis helpers
- **?**: Show help dialog with all controls
- **Mouse Drag**: Orbit camera around cube
- **Mouse Wheel**: Zoom in/out
- **Click on Faces**: Trigger onFaceClick callback with face details

## Dimensions

### Temporal Dimension (X-axis - Indigo)
- **+X Face**: Past, Present, Future awareness
  - Practices: Reflection, Mindfulness, Vision Setting
- **-X Face**: Time integration and flow
  - Practices: Timeline Work, Future Self, Legacy Thinking

### Depth Dimension (Y-axis - Green)
- **+Y Face**: Conscious awareness expansion
  - Practices: Meditation, Self-Inquiry, Shadow Work
- **-Y Face**: Subconscious exploration
  - Practices: Dream Work, Body Awareness, Somatic Healing

### Relational Dimension (Z-axis - Orange)
- **+Z Face**: Connection and community
  - Practices: Authentic Communication, Empathy, Collaboration
- **-Z Face**: Self and other integration
  - Practices: Boundary Setting, Compassion, Service

## Performance Optimization

- Uses React Three Fiber's efficient rendering
- Particle system optimized with useMemo
- Smooth animations via useFrame hook
- Responsive canvas with device pixel ratio optimization
- Suspense boundaries for lazy loading

## Accessibility Features

- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Visual indicators (tooltips, highlights)
- Semantic HTML in overlays
- Status announcements for screen readers

## Dependencies

- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers for R3F
- `three`: 3D library
- `framer-motion`: Animation library (optional, for enhanced animations)

## Browser Support

- Modern browsers with WebGL support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Black screen or no rendering
- Ensure component is only rendered client-side
- Check that WebGL is supported in browser
- Verify all dependencies are installed

### Performance issues
- Reduce particle count in TransformationCube.tsx
- Disable stars with `showStars={false}`
- Reduce shadow quality in Canvas settings

### TypeScript errors
- Ensure `@types/three` is installed
- Check that all imports are correct
- Verify TypeScript version compatibility

## Future Enhancements

- [ ] VR/AR support
- [ ] Multi-touch gestures for mobile
- [ ] Custom particle shapes
- [ ] Animation presets
- [ ] Save/load camera positions
- [ ] Export as image/video
- [ ] Sound effects on interaction
- [ ] Theme customization
