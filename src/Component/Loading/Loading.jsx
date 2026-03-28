import React from "react";
import { motion } from 'framer-motion';
import { PenTool } from "lucide-react";

export default function Loading() {
return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-transparent">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <motion.div
          className="absolute w-24 height-24 border-2 border-indigo-200 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner Rotating Progress Circle */}
        <motion.div
          className="w-16 h-16 border-t-2 border-r-2 border-indigo-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Central Icon */}
        <motion.div
          className="absolute text-indigo-600"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <PenTool size={28} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Narrative Loading Text */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg font-medium text-slate-700 italic">
          "Every story has a lesson..."
        </p>
        <motion.div 
          className="mt-2 flex justify-center gap-1"
          initial="start"
          animate="end"
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
              variants={{
                start: { opacity: 0.3 },
                end: { opacity: 1 },
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
