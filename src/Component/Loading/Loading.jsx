import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BookOpen, User, MoreHorizontal } from 'lucide-react'; // Using Lucide as a modern React Icon set

const Skeleton = ({ className }) => (
  <div className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${className}`}>
    {/* The Shimmer Effect */}
    <motion.div
      className="absolute inset-0"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      }}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      }}
    />
  </div>
);

const LessonSkeletonCard = () => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-5">
    {/* Header: Author Info */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-2 w-16 rounded-full" />
        </div>
      </div>
      <MoreHorizontal className="text-slate-300" size={20} />
    </div>

    {/* Body: The Lesson Title & Content */}
    <div className="space-y-3">
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-3 w-2/3 rounded-full" />
      </div>
    </div>

    {/* Footer: Stats/Tags */}
    <div className="pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800">
      <div className="flex gap-2">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  </div>
);

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Header Skeleton */}
      <div className="mb-10 space-y-4">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-4 w-64 rounded-full" />
      </div>

      {/* Grid of Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <LessonSkeletonCard />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;