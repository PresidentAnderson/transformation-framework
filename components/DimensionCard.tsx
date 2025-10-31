import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface Phase {
  id: string;
  name: string;
  completed: boolean;
}

export interface DimensionData {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
  phases: Phase[];
  progress: number; // 0-100
}

interface DimensionCardProps {
  dimension: DimensionData;
  onSelect: (dimensionId: string) => void;
  isActive: boolean;
}

const DimensionCard: React.FC<DimensionCardProps> = ({
  dimension,
  onSelect,
  isActive,
}) => {
  const IconComponent = dimension.icon;
  const completedPhases = dimension.phases.filter((p) => p.completed).length;
  const totalPhases = dimension.phases.length;

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const hoverVariants = {
    rest: {
      scale: 1,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
    },
  };

  const borderVariants = {
    rest: {
      borderColor: isActive ? dimension.color : '#e5e7eb',
    },
    hover: {
      borderColor: dimension.color,
    },
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: `${dimension.progress}%` },
    transition: { duration: 1, ease: 'easeOut' },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <motion.button
        variants={hoverVariants}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(dimension.id)}
        className={`relative w-full h-full p-6 rounded-lg border-2 transition-colors duration-200 text-left bg-white ${
          isActive ? 'bg-opacity-100' : 'bg-opacity-100'
        }`}
        style={{
          borderColor: isActive ? dimension.color : '#e5e7eb',
        }}
        onMouseEnter={(e) => {
          const element = e.currentTarget as HTMLElement;
          element.style.borderColor = dimension.color;
        }}
        onMouseLeave={(e) => {
          const element = e.currentTarget as HTMLElement;
          element.style.borderColor = isActive
            ? dimension.color
            : '#e5e7eb';
        }}
        aria-label={`${dimension.title} dimension. ${completedPhases} of ${totalPhases} phases completed. ${dimension.progress}% progress.`}
        aria-pressed={isActive}
        role="tab"
      >
        {/* Background accent */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 -z-10"
          style={{ backgroundColor: dimension.color }}
          animate={{ opacity: isActive ? 0.05 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Icon section */}
        <motion.div
          className="mb-4 inline-block p-3 rounded-lg"
          style={{ backgroundColor: `${dimension.color}20` }}
          animate={{
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
          role="img"
          aria-label={`${dimension.title} icon`}
        >
          <IconComponent
            size={28}
            style={{ color: dimension.color }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
          animate={{
            color: isActive ? dimension.color : '#111827',
          }}
          transition={{ duration: 0.2 }}
        >
          {dimension.title}
        </motion.h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {dimension.description}
        </p>

        {/* Progress section */}
        <div className="space-y-2 mt-auto">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: dimension.color }}
              initial={{ width: 0 }}
              animate={{ width: `${dimension.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              aria-label={`Progress: ${dimension.progress}%`}
              role="progressbar"
              aria-valuenow={dimension.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          {/* Progress text */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-700">
              {completedPhases}/{totalPhases} phases
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: dimension.color }}
            >
              {dimension.progress}%
            </span>
          </div>

          {/* Phase indicators */}
          <div className="flex gap-1 mt-3 pt-3 border-t border-gray-200">
            {dimension.phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                className="flex-1 h-1 rounded-full"
                style={{
                  backgroundColor: phase.completed ? dimension.color : '#e5e7eb',
                }}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
                role="img"
                aria-label={`${phase.name}: ${phase.completed ? 'completed' : 'not completed'}`}
              />
            ))}
          </div>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ backgroundColor: dimension.color }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-label="This dimension is currently selected"
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default DimensionCard;
