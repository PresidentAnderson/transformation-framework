"use client";

import { motion } from "framer-motion";

interface SoundWaveIconProps {
  active: boolean;
}

export function SoundWaveIcon({ active }: SoundWaveIconProps) {
  const bars = [0, 1, 2, 3];

  return (
    <div className="flex gap-[2px] items-end h-4 w-5" aria-hidden="true">
      {bars.map((i) => (
        <motion.span
          key={i}
          animate={{
            scaleY: active ? [0.4, 1, 0.4] : 0.4,
          }}
          transition={{
            duration: 0.6 + i * 0.1,
            repeat: active ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="w-[2px] bg-indigo-300 rounded-full origin-bottom"
        />
      ))}
    </div>
  );
}
