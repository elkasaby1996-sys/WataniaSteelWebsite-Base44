import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ 
  badge, 
  title, 
  subtitle, 
  backgroundImage,
  children 
}) {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d] overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0">
          <img 
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {badge && (
            <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mt-4 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}