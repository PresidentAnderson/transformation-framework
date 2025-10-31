"use client";

import { motion } from "framer-motion";

export default function FormulaSection() {
  return (
    <section className="mb-16">
      <motion.div
        className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 px-4 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        role="region"
        aria-label="Transformation Formula"
      >
        <div className="text-center break-words">
          T(x, y, z) = ((A + R + S + I + F + N + Po + G + B + In + Cn) × P<sup>C</sup>) + (As + Ev + Cl + E)
        </div>
      </motion.div>

      <motion.p
        className="text-gray-500 italic mt-4 text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Transformation expressed as a multidimensional field where temporal flow, depth, and relational impact converge.
      </motion.p>

      <motion.div
        className="mt-8 max-w-4xl mx-auto bg-gray-50 rounded-xl p-6 shadow-inner"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4 text-indigo-700">Formula Components</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-indigo-600 mb-2">Core Variables</h4>
            <ul className="space-y-1 text-gray-700">
              <li><strong>A</strong> - Awareness</li>
              <li><strong>R</strong> - Responsibility</li>
              <li><strong>S</strong> - Surrender</li>
              <li><strong>I</strong> - Integrity</li>
              <li><strong>F</strong> - Focus</li>
              <li><strong>N</strong> - Nurture</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-600 mb-2">Temporal & Relational</h4>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Po</strong> - Possibility</li>
              <li><strong>G</strong> - Goal</li>
              <li><strong>B</strong> - Being</li>
              <li><strong>In</strong> - Interpersonal</li>
              <li><strong>Cn</strong> - Collective</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-600 mb-2">Amplifiers</h4>
            <ul className="space-y-1 text-gray-700">
              <li><strong>P</strong> - Purpose</li>
              <li><strong>C</strong> - Courage</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2">Outcomes</h4>
            <ul className="space-y-1 text-gray-700">
              <li><strong>As</strong> - Assurance</li>
              <li><strong>Ev</strong> - Evolution</li>
              <li><strong>Cl</strong> - Clarity</li>
              <li><strong>E</strong> - Emancipation</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
