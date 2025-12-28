import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, value, label, color = 'maroon', delay = 0 }) {
  const colorClasses = {
    maroon: 'bg-[#7B1F32]',
    navy: 'bg-[#1E3A5F]',
    green: 'bg-green-600',
    blue: 'bg-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4"
    >
      {Icon && (
        <Icon className={`w-6 h-6 ${colorClasses[color]} text-white rounded-lg p-1 mb-2`} />
      )}
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
}