"use client";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Clock, Layers, Network } from "lucide-react";
import DimensionGrid from "@/components/DimensionGrid";
import FormulaSection from "@/components/FormulaSection";
import ExampleScenario from "@/components/ExampleScenario";
import { Button } from "@/components/ui/button";
import type { DimensionData } from "@/components/DimensionCard";

// Dynamic import for 3D component (client-side only)
const Scene3D = dynamic(() => import("@/components/three/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-inner flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading 3D Visualization...</p>
      </div>
    </div>
  ),
});

// Dimension data
const dimensions: DimensionData[] = [
  {
    id: "temporal",
    title: "Temporal Flow (X-Axis)",
    description: "Tracks the journey from Possibility → Goal → Emancipation. Represents time and progress — the unfolding of action and purpose.",
    color: "#6366f1",
    icon: Clock,
    phases: [
      { id: "possibility", name: "Possibility", completed: true },
      { id: "goal", name: "Goal", completed: true },
      { id: "emancipation", name: "Emancipation", completed: false },
    ],
    progress: 67,
  },
  {
    id: "depth",
    title: "Depth of Consciousness (Y-Axis)",
    description: "Describes inner growth from Awareness → Responsibility → Integrity. The vertical axis of transformation and authenticity.",
    color: "#22c55e",
    icon: Layers,
    phases: [
      { id: "awareness", name: "Awareness", completed: true },
      { id: "responsibility", name: "Responsibility", completed: false },
      { id: "integrity", name: "Integrity", completed: false },
    ],
    progress: 33,
  },
  {
    id: "relational",
    title: "Relational Impact (Z-Axis)",
    description: "Expansion through Personal → Interpersonal → Collective awareness. The horizontal axis of connection and contribution.",
    color: "#f97316",
    icon: Network,
    phases: [
      { id: "personal", name: "Personal", completed: true },
      { id: "interpersonal", name: "Interpersonal", completed: true },
      { id: "collective", name: "Collective", completed: true },
    ],
    progress: 100,
  },
];

export default function TransformationWebsite() {
  const [selectedDimension, setSelectedDimension] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <header className="text-center px-4 py-12 sm:py-16">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-indigo-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Multidimensional Transformation Framework
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Explore the dimensions of human transformation — time, depth, and relationship —
          through interactive visualization and conceptual design.
        </motion.p>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive 3D Visualization Section */}
        <section className="mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl font-semibold mb-6 text-indigo-600 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Interactive 3D Transformation Cube
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading 3D Scene...</p>
                </div>
              </div>
            }>
              <Scene3D />
            </Suspense>
          </motion.div>

          <motion.p
            className="text-sm text-gray-600 italic mt-4 text-center px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Rotate and zoom to explore the X (Temporal), Y (Depth), and Z (Relational) dimensions.
            Click faces for details, use arrow keys to rotate, press H to toggle helpers.
          </motion.p>
        </section>

        {/* Dimensions Overview Section */}
        <DimensionGrid
          dimensions={dimensions}
          selectedDimensionId={selectedDimension}
          onDimensionSelect={setSelectedDimension}
          title="The Three Dimensions"
          subtitle="Each dimension represents a unique pathway of transformation"
        />

        {/* Formula Section */}
        <FormulaSection />

        {/* Example Scenario Section */}
        <ExampleScenario />

        {/* Footer Section */}
        <footer className="text-center py-12 mt-16 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 mb-4">© 2025 The Transformation Framework Project</p>
            <Button
              className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              Learn More
            </Button>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}
