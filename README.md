# Multidimensional Transformation Framework

An interactive web application exploring the dimensions of human transformation through advanced 3D visualization and conceptual design.

![Transformation Framework](https://img.shields.io/badge/Status-Production-green)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🌟 Features

### Interactive 3D Visualization
- **Advanced 3D Cube** - Fully interactive transformation cube using React Three Fiber
- **Axis Labels** - Color-coded labels for X (Temporal), Y (Depth), Z (Relational) dimensions
- **Click Interactions** - Click cube faces to reveal detailed dimension information
- **Particle Effects** - 30 animated particles representing transformation energy
- **Keyboard Controls** - Arrow keys for rotation, H to toggle helpers, ? for help
- **Responsive Camera** - Smooth orbit controls with zoom and rotation
- **Hover Effects** - Visual feedback with emissive materials and opacity changes

### Component Architecture
- **Modular Design** - Fully reusable components with TypeScript support
- **State Management** - Zustand store for complex state orchestration
- **Performance Optimized** - Lazy loading, code splitting, and optimized renders
- **Accessibility First** - ARIA labels, keyboard navigation, screen reader support
- **Responsive** - Mobile-first design that adapts to all screen sizes

### Three Transformation Dimensions

1. **Temporal Flow (X-Axis)** - Journey through time: Possibility → Goal → Emancipation
2. **Depth of Consciousness (Y-Axis)** - Inner growth: Awareness → Responsibility → Integrity
3. **Relational Impact (Z-Axis)** - Connection expansion: Personal → Interpersonal → Collective

### Collapse of Identity Experience

**Enhanced Version Features:**
- **3D Visualization** - Cube fragments scatter and reform into a glowing sphere
- **Scroll-Driven Animation** - Transformation tied to user scroll progress
- **Ambient Sound** - Web Audio API generates evolving soundscape
  - 60Hz sine wave during collapse (grounding)
  - 420Hz triangle wave during rebirth (harmonic)
  - Smooth crossfade between states
- **Interactive Sound Toggle** - Animated sound wave icon with on/off control
- **Symbolic Journey** - Visual metaphor of ego dissolution and integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd personal-transformation-model

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main landing page
│   ├── cube-demo/           # Simple 3D cube demo
│   ├── transformation-3d/   # Advanced 3D demo
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Base UI components (Button, Card)
│   ├── three/               # 3D visualization components
│   │   ├── TransformationCube.tsx
│   │   ├── Scene3D.tsx
│   │   ├── DimensionCard.tsx
│   │   └── types.ts
│   ├── DimensionCard.tsx    # Dimension info card
│   ├── DimensionGrid.tsx    # Responsive dimension grid
│   ├── FormulaSection.tsx   # Transformation formula
│   └── ExampleScenario.tsx  # Use case example
├── store/
│   └── useTransformationStore.ts  # Zustand state management
├── lib/
│   └── utils.ts             # Utility functions
└── hooks/                   # Custom React hooks
```

## 🎮 Keyboard Controls

- **Arrow Keys** - Rotate the transformation cube
- **H** - Toggle grid and axis helpers
- **?** - Show help overlay
- **Mouse Drag** - Orbit camera around cube
- **Mouse Scroll** - Zoom in/out
- **Click Faces** - Show dimension details

## 🎨 Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion 12** - Advanced animations
- **React Three Fiber 9.4** - React renderer for Three.js
- **React Three Drei 10.7** - Helper components for R3F
- **Three.js 0.181** - 3D graphics library
- **Zustand 5.0** - Lightweight state management
- **Lucide React** - Icon library

## 📊 The Transformation Formula

```
T(x, y, z) = ((A + R + S + I + F + N + Po + G + B + In + Cn) × P^C) + (As + Ev + Cl + E)
```

Where:
- **Core Variables**: Awareness, Responsibility, Surrender, Integrity, Focus, Nurture
- **Temporal & Relational**: Possibility, Goal, Being, Interpersonal, Collective
- **Amplifiers**: Purpose (P), Courage (C)
- **Outcomes**: Assurance, Evolution, Clarity, Emancipation

## 🌐 Demo Pages

1. **Main Page** (`/`) - Complete transformation framework experience
2. **Cube Demo** (`/cube-demo`) - Basic 3D cube implementation
3. **Advanced 3D** (`/transformation-3d`) - Full-featured 3D visualization
4. **Collapse Demo** (`/collapse-demo`) - Identity collapse with 3D animation & ambient sound

## 🔧 Configuration

### Customizing Dimensions

Edit the `dimensions` array in `app/page.tsx`:

```typescript
const dimensions: DimensionData[] = [
  {
    id: "temporal",
    title: "Temporal Flow (X-Axis)",
    description: "Your description...",
    color: "#6366f1",
    icon: Clock,
    phases: [...],
    progress: 67,
  },
  // Add more dimensions...
];
```

### Customizing 3D Scene

Modify `components/three/TransformationCube.tsx`:
- Adjust particle count
- Change colors
- Modify animations
- Add custom geometries

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Semantic HTML structure
- High contrast color schemes

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the static export:

```bash
npm run build
```

Deploy the `.next` directory to your hosting platform.

## 📝 License

© 2025 The Transformation Framework Project

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- 3D powered by [Three.js](https://threejs.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Built with ❤️ for personal transformation and growth**
