import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DimensionCard, { DimensionData } from './DimensionCard';

interface DimensionGridProps {
  dimensions: DimensionData[];
  onDimensionSelect?: (dimensionId: string) => void;
  selectedDimensionId?: string;
  title?: string;
  subtitle?: string;
}

const DimensionGrid: React.FC<DimensionGridProps> = ({
  dimensions,
  onDimensionSelect,
  selectedDimensionId,
  title = 'Transformation Dimensions',
  subtitle = 'Select a dimension to view your progress',
}) => {
  const [localSelected, setLocalSelected] = useState<string | undefined>(
    selectedDimensionId
  );

  const activeId = selectedDimensionId ?? localSelected;

  const handleDimensionSelect = (dimensionId: string) => {
    setLocalSelected(dimensionId);
    onDimensionSelect?.(dimensionId);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section */}
      <motion.div
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="mb-8 text-center"
        role="region"
        aria-label="Dimensions header"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-600 text-base sm:text-lg"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Grid container */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="tablist"
        aria-label="Dimension cards"
      >
        {dimensions.map((dimension) => (
          <motion.div
            key={dimension.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DimensionCard
              dimension={dimension}
              onSelect={handleDimensionSelect}
              isActive={activeId === dimension.id}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {dimensions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
          role="status"
          aria-live="polite"
        >
          <p className="text-gray-500 text-lg">
            No dimensions available. Please check back soon.
          </p>
        </motion.div>
      )}

      {/* Mobile accessibility info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center text-xs text-gray-500 sm:hidden"
        role="status"
        aria-live="polite"
      >
        Tap a dimension card to select and view details
      </motion.div>
    </div>
  );
};

export default DimensionGrid;
