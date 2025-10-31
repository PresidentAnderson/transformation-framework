"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Users } from "lucide-react";

export default function ExampleScenario() {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-50 to-white shadow-xl border-2 border-indigo-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Example: Moving Through the 3D Field
            </h3>

            <div className="space-y-6">
              <motion.div
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-indigo-600 mb-2 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Temporal Flow: Possibility → Goal
                  </h4>
                  <p className="text-gray-700">
                    An individual starts with a <strong>Possibility</strong> — such as becoming a compassionate leader.
                    They set clear <strong>Goals</strong> and take consistent action, moving forward through time with purpose.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-green-600 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Depth of Consciousness: Awareness → Integrity
                  </h4>
                  <p className="text-gray-700">
                    As they embrace <strong>Responsibility</strong> for their growth and practice <strong>Integrity</strong>,
                    they deepen vertically along the consciousness axis — moving from surface awareness to authentic being.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-orange-600 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Relational Impact: Personal → Collective
                  </h4>
                  <p className="text-gray-700">
                    Their sustained <strong>Focus</strong> and <strong>Purpose</strong> propel them temporally,
                    while their positive influence on others radiates outward across the relational axis —
                    from self to community to systems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-indigo-50 via-green-50 to-orange-50 rounded-xl border-2 border-indigo-200"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-bold text-xl text-indigo-700 mb-3">
                  The Intersection: Emancipation
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  The intersection of all three dimensions manifests as <strong className="text-indigo-600">Emancipation</strong> —
                  complete alignment of thought, action, and connection. The individual becomes a living embodiment
                  of transformation, moving freely through time, grounded in deep integrity, and contributing
                  meaningfully to the collective evolution.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
