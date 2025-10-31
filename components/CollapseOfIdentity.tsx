"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";

export default function CollapseOfIdentity() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="collapse-of-identity"
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "radial-gradient(circle at top, rgba(167, 139, 250, 0.05), rgba(0, 0, 0, 0.02))",
      }}
      role="region"
      aria-labelledby="collapse-heading"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            id="collapse-heading"
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-purple-400" aria-hidden="true" />
            The Collapse of the Old Identity Model
          </h2>
          <motion.p
            className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            True transformation cannot coexist with the old model of identity.
            The self built for survival, approval, or predictability must dissolve
            to make space for who you are becoming.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* The Old Model */}
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-500" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-red-700">
                    The Old Model
                  </h3>
                </div>
                <ul className="space-y-3" role="list">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                    <span>
                      Rooted in <em className="font-semibold text-red-600">comparison, control, and consistency</em>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                    <span>
                      Operates through labels and rigid narratives ("I am this", "I am not that").
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                    <span>
                      Creates comfort through repetition, not growth.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                    <span>
                      Protects the ego from uncertainty — but also from evolution.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Collapse */}
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-500" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-purple-700">
                    The Collapse
                  </h3>
                </div>
                <ul className="space-y-3 mb-4" role="list">
                  <li className="text-gray-700">
                    <strong className="text-indigo-600">Temporal Flow (X):</strong> breaks linear progress — you stop measuring life by milestones.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-green-600">Depth (Y):</strong> dissolves self-image — awareness replaces identity.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Relational (Z):</strong> removes separation — being becomes interconnectedness.
                  </li>
                </ul>
                <div className="p-4 bg-purple-100/50 rounded-lg border-l-4 border-purple-400">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This collapse feels like loss, but it's actually liberation.
                    What's falling apart isn't <em className="font-semibold">you</em> — it's what's been standing in your way.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Completion */}
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-green-700">
                    The Completion
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Transformation completes when there's nothing left to defend.
                  When purpose flows freely through time, integrity anchors awareness,
                  and compassion shapes all relations — the old identity ends, and true being begins.
                </p>
                <motion.blockquote
                  className="border-l-4 border-purple-400 pl-4 py-2 bg-gradient-to-r from-purple-50 to-transparent rounded-r-lg"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-gray-800 font-medium italic text-base">
                    "The end of identity is not annihilation — it's emancipation."
                  </p>
                </motion.blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional insight section */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="inline-block p-6 bg-gradient-to-r from-purple-100 via-violet-100 to-indigo-100 rounded-2xl shadow-lg border border-purple-200">
            <p className="text-gray-700 text-sm sm:text-base max-w-2xl">
              The three dimensions work together to dismantle the old structure:
              <span className="block mt-2 font-semibold text-purple-700">
                Time releases you from the past, Depth reveals your true nature, and Connection shows you belong to everything.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
