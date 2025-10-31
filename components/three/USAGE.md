# 3D Transformation Cube - Usage Guide

## Quick Start

### 1. Basic Implementation (5 minutes)

Create a new page and import the Scene3D component:

```tsx
'use client';

import Scene3D from '@/components/three/Scene3D';

export default function MyPage() {
  return (
    <div className="w-full h-screen">
      <Scene3D />
    </div>
  );
}
```

That's it! You now have a fully functional 3D transformation cube.

### 2. Intermediate Implementation (10 minutes)

Add interactivity with face click handlers:

```tsx
'use client';

import { useState } from 'react';
import Scene3D from '@/components/three/Scene3D';
import type { CubeFaceInfo } from '@/components/three/types';

export default function MyPage() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceInfo | null>(null);

  const handleFaceClick = (faceInfo: CubeFaceInfo) => {
    setSelectedFace(faceInfo);
    console.log('Face clicked:', faceInfo);
  };

  return (
    <div className="w-full h-screen">
      <Scene3D onFaceClick={handleFaceClick} />

      {selectedFace && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded shadow">
          <h2>{selectedFace.name}</h2>
          <p>{selectedFace.description}</p>
        </div>
      )}
    </div>
  );
}
```

### 3. Advanced Implementation (15 minutes)

Use all features including the DimensionCard component:

```tsx
'use client';

import { useState } from 'react';
import { Scene3D, DimensionCard } from '@/components/three';
import type { CubeFaceInfo } from '@/components/three/types';

export default function MyPage() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceInfo | null>(null);
  const [showHelpers, setShowHelpers] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="relative w-full h-screen">
      <Scene3D
        showHelpers={showHelpers}
        autoRotate={autoRotate}
        enableOrbitControls={true}
        showStars={true}
        onFaceClick={setSelectedFace}
      />

      {/* Control Panel */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded shadow">
        <label>
          <input
            type="checkbox"
            checked={showHelpers}
            onChange={(e) => setShowHelpers(e.target.checked)}
          />
          Show Helpers
        </label>
        <label>
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
          />
          Auto Rotate
        </label>
      </div>

      {/* Dimension Card */}
      <DimensionCard
        faceInfo={selectedFace}
        onClose={() => setSelectedFace(null)}
        position="right"
      />
    </div>
  );
}
```

## Component Reference

### Scene3D

The main wrapper component that sets up the Canvas and rendering environment.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHelpers` | `boolean` | `true` | Show grid and axis helpers |
| `autoRotate` | `boolean` | `false` | Enable automatic cube rotation |
| `enableOrbitControls` | `boolean` | `true` | Enable mouse orbit controls |
| `showStars` | `boolean` | `true` | Show background star field |
| `className` | `string` | `''` | Additional CSS classes |
| `onFaceClick` | `(faceInfo: CubeFaceInfo) => void` | `undefined` | Callback when a cube face is clicked |

**Example:**

```tsx
<Scene3D
  showHelpers={true}
  autoRotate={false}
  enableOrbitControls={true}
  showStars={true}
  className="my-custom-class"
  onFaceClick={(faceInfo) => console.log(faceInfo)}
/>
```

### TransformationCube

The interactive 3D cube component (usually used within Scene3D).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHelpers` | `boolean` | `true` | Show grid and axis helpers |
| `autoRotate` | `boolean` | `false` | Enable automatic rotation |
| `onFaceClick` | `(faceInfo: CubeFaceInfo) => void` | `undefined` | Callback when a face is clicked |

**Example:**

```tsx
<Canvas>
  <TransformationCube
    showHelpers={true}
    autoRotate={false}
    onFaceClick={(faceInfo) => console.log(faceInfo)}
  />
</Canvas>
```

### DimensionCard

An animated card component for displaying dimension details.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `faceInfo` | `CubeFaceInfo \| null` | `null` | Face information to display |
| `onClose` | `() => void` | required | Callback when card is closed |
| `position` | `'left' \| 'right' \| 'center'` | `'right'` | Card position on screen |

**Example:**

```tsx
<DimensionCard
  faceInfo={selectedFace}
  onClose={() => setSelectedFace(null)}
  position="right"
/>
```

## Type Definitions

### CubeFaceInfo

```typescript
interface CubeFaceInfo {
  name: string;           // e.g., "Temporal +X"
  dimension: string;      // "Temporal", "Depth", or "Relational"
  description: string;    // Face description
  color: string;          // Hex color (e.g., "#6366f1")
  practices: string[];    // Array of practice names
}
```

### Example Face Data

```typescript
{
  name: 'Temporal +X',
  dimension: 'Temporal',
  description: 'Past, Present, Future awareness',
  color: '#6366f1',
  practices: ['Reflection', 'Mindfulness', 'Vision Setting']
}
```

## Keyboard Controls

| Key | Action |
|-----|--------|
| `↑` (Arrow Up) | Rotate cube upward |
| `↓` (Arrow Down) | Rotate cube downward |
| `←` (Arrow Left) | Rotate cube left |
| `→` (Arrow Right) | Rotate cube right |
| `H` | Toggle grid/axis helpers |
| `?` | Show help dialog |

## Mouse Controls

| Action | Result |
|--------|--------|
| Drag | Orbit camera around cube |
| Scroll | Zoom in/out |
| Click Face | Show dimension details |
| Hover Face | Show tooltip |

## Customization Examples

### Custom Colors

To customize the cube colors, modify the `faceInfo` array in `TransformationCube.tsx`:

```typescript
const faceInfo: CubeFaceInfo[] = [
  {
    name: 'Custom Face',
    dimension: 'Temporal',
    description: 'Your description',
    color: '#ff0000', // Your custom color
    practices: ['Practice 1', 'Practice 2', 'Practice 3']
  },
  // ... more faces
];
```

### Custom Particle Count

In `TransformationCube.tsx`, modify the particle generation:

```typescript
const particles = useMemo(() => {
  const colors = ['#6366f1', '#22c55e', '#f97316'];
  return Array.from({ length: 50 }, (_, i) => ({ // Change from 30 to 50
    id: i,
    position: [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
    ] as [number, number, number],
    color: colors[i % colors.length],
  }));
}, []);
```

### Custom Camera Position

In `Scene3D.tsx`, modify the camera setup:

```tsx
<PerspectiveCamera
  makeDefault
  position={[8, 8, 8]} // Change from [5, 5, 5]
  fov={60}             // Change from 50
/>
```

### Disable Background Stars

```tsx
<Scene3D showStars={false} />
```

### Custom Styling

Add Tailwind classes or custom CSS:

```tsx
<Scene3D
  className="rounded-lg shadow-2xl border-4 border-indigo-500"
/>
```

## Integration Examples

### With State Management (Zustand)

```typescript
// store/cube-store.ts
import { create } from 'zustand';
import type { CubeFaceInfo } from '@/components/three/types';

interface CubeStore {
  selectedFace: CubeFaceInfo | null;
  setSelectedFace: (face: CubeFaceInfo | null) => void;
}

export const useCubeStore = create<CubeStore>((set) => ({
  selectedFace: null,
  setSelectedFace: (face) => set({ selectedFace: face }),
}));

// In your component
import { useCubeStore } from '@/store/cube-store';

export default function MyPage() {
  const { selectedFace, setSelectedFace } = useCubeStore();

  return (
    <Scene3D onFaceClick={setSelectedFace} />
  );
}
```

### With Analytics

```tsx
import { analytics } from '@/lib/analytics';

export default function MyPage() {
  const handleFaceClick = (faceInfo: CubeFaceInfo) => {
    // Track analytics
    analytics.track('cube_face_clicked', {
      dimension: faceInfo.dimension,
      face: faceInfo.name,
    });

    // Your handler logic
    console.log(faceInfo);
  };

  return <Scene3D onFaceClick={handleFaceClick} />;
}
```

### With Router Navigation

```tsx
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();

  const handleFaceClick = (faceInfo: CubeFaceInfo) => {
    // Navigate to detail page
    router.push(`/dimensions/${faceInfo.dimension.toLowerCase()}`);
  };

  return <Scene3D onFaceClick={handleFaceClick} />;
}
```

## Responsive Design

### Full Screen on Mobile

```tsx
<div className="w-full h-screen md:h-[600px] lg:h-[800px]">
  <Scene3D />
</div>
```

### Side-by-Side on Desktop

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div className="h-[500px]">
    <Scene3D />
  </div>
  <div className="p-8">
    {/* Your content */}
  </div>
</div>
```

## Performance Tips

1. **Reduce Particle Count**: Lower the particle count for better performance on low-end devices
2. **Disable Stars**: Set `showStars={false}` to improve performance
3. **Disable Auto-Rotate**: Auto-rotation requires continuous rendering
4. **Use Static Camera**: Disable orbit controls for static presentations
5. **Limit Shadow Rendering**: Shadows are computationally expensive

## Troubleshooting

### Issue: Black screen or component not rendering

**Solution**: Ensure the component is marked as `'use client'` and the container has a defined height:

```tsx
'use client';

export default function MyPage() {
  return (
    <div className="h-screen"> {/* Height is required! */}
      <Scene3D />
    </div>
  );
}
```

### Issue: TypeScript errors

**Solution**: Import types from the types file:

```tsx
import type { CubeFaceInfo } from '@/components/three/types';
```

### Issue: SSR errors

**Solution**: The Scene3D component already handles this, but ensure you're using Next.js 13+ with the App Router and the page is marked as client-side:

```tsx
'use client'; // This must be at the top of the file
```

### Issue: Performance issues

**Solution**: Reduce visual complexity:

```tsx
<Scene3D
  showStars={false}
  enableOrbitControls={false}
  // Reduce particles in TransformationCube.tsx
/>
```

## Demo Pages

Two demo pages are included:

1. **Basic Demo**: `/cube-demo`
   - Simple implementation with basic controls
   - Good starting point for learning

2. **Advanced Demo**: `/transformation-3d`
   - Full-featured implementation
   - Shows all capabilities
   - Production-ready example

Visit these pages after running `npm run dev` to see the components in action.

## Additional Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers Documentation](https://github.com/pmndrs/drei)
- [Three.js Documentation](https://threejs.org/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review FEATURES.md for complete feature list
3. Examine the demo pages for implementation examples
4. Refer to the inline comments in the source code

---

**Created**: 2025-10-31
**Version**: 1.0.0
**License**: Use freely in your Personal Transformation Model project
