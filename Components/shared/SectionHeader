import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ 
  badge, 
  title, 
  subtitle,
  centered = true,
  className = '' 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${centered ? 'text-center' : ''} mb-12 lg:mb-16 ${className}`}
    >
      {badge && (
        <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">
          {badge}
        </span>
      )}
      <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}