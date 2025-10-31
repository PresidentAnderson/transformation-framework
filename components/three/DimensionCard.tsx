'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { CubeFaceInfo } from './types';

interface DimensionCardProps {
  faceInfo: CubeFaceInfo | null;
  onClose: () => void;
  position?: 'left' | 'right' | 'center';
}

export default function DimensionCard({
  faceInfo,
  onClose,
  position = 'right',
}: DimensionCardProps) {
  if (!faceInfo) return null;

  const positionClasses = {
    left: 'left-4 top-1/2 -translate-y-1/2',
    right: 'right-4 top-1/2 -translate-y-1/2',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const slideDirection = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    center: { scale: 0.8, opacity: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={slideDirection[position]}
        animate={{ x: 0, scale: 1, opacity: 1 }}
        exit={slideDirection[position]}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`absolute ${positionClasses[position]} z-50`}
      >
        <div
          className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-lg text-white rounded-xl shadow-2xl border border-white/10 overflow-hidden max-w-md"
          style={{
            boxShadow: `0 0 30px ${faceInfo.color}40, 0 10px 40px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Header with gradient */}
          <div
            className="relative h-24 flex items-end p-6"
            style={{
              background: `linear-gradient(135deg, ${faceInfo.color}40 0%, ${faceInfo.color}20 100%)`,
            }}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-1">{faceInfo.name}</h2>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                style={{
                  backgroundColor: faceInfo.color + '30',
                  border: `1px solid ${faceInfo.color}60`,
                  color: faceInfo.color,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: faceInfo.color }}
                />
                {faceInfo.dimension} Dimension
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group"
              aria-label="Close dimension details"
            >
              <svg
                className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Decorative gradient overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at top right, ${faceInfo.color}60 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {faceInfo.description}
              </p>
            </div>

            {/* Practices */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: faceInfo.color }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Transformative Practices
              </h3>
              <ul className="space-y-3">
                {faceInfo.practices.map((practice, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: faceInfo.color + '30',
                        color: faceInfo.color,
                        border: `1px solid ${faceInfo.color}60`,
                      }}
                    >
                      {index + 1}
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed flex-1">
                      {practice}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Click other cube faces to explore different dimensions</span>
              </div>
            </div>
          </div>

          {/* Animated border effect */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${faceInfo.color}20 0%, transparent 50%, ${faceInfo.color}20 100%)`,
              opacity: 0.3,
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
