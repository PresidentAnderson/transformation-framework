"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CollapseOfIdentity from "@/components/CollapseOfIdentity";
import CollapseOfIdentityEnhanced from "@/components/CollapseOfIdentityEnhanced";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function CollapseDemoPage() {
  const [showEnhanced, setShowEnhanced] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="text-center px-4 py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
        <motion.h1
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="inline w-8 h-8 mb-2 text-purple-600" />
          Collapse of Identity Demo
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Compare two versions of the transformational experience
        </motion.p>

        {/* Toggle Button */}
        <div className="flex gap-4 justify-center items-center">
          <Button
            onClick={() => setShowEnhanced(false)}
            variant={!showEnhanced ? "default" : "outline"}
            className="min-w-[140px]"
          >
            Standard Version
          </Button>
          <Button
            onClick={() => setShowEnhanced(true)}
            variant={showEnhanced ? "default" : "outline"}
            className="min-w-[140px] bg-purple-600 hover:bg-purple-700"
          >
            Enhanced 3D + Sound
          </Button>
        </div>

        {showEnhanced && (
          <motion.p
            className="mt-4 text-sm text-purple-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✨ Features: 3D collapse/rebirth animation, ambient sound, scroll-driven effects
          </motion.p>
        )}
      </header>

      {/* Content */}
      <motion.div
        key={showEnhanced ? "enhanced" : "standard"}
        initial={{ opacity: 0, x: showEnhanced ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showEnhanced ? <CollapseOfIdentityEnhanced /> : <CollapseOfIdentity />}
      </motion.div>

      {/* Footer */}
      <footer className="text-center py-8 px-4 border-t border-gray-200">
        <p className="text-gray-500 mb-4">Scroll down to experience the transformation</p>
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          variant="outline"
        >
          Back to Top
        </Button>
      </footer>
    </div>
  );
}
