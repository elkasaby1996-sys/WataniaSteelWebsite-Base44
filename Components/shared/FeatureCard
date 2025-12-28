import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'maroon',
  index = 0 
}) {
  const colorClasses = {
    maroon: 'bg-[#7B1F32]',
    navy: 'bg-[#1E3A5F]',
    green: 'bg-green-600',
    amber: 'bg-amber-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all group"
    >
      <div className={`${colorClasses[color]} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#7B1F32] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}