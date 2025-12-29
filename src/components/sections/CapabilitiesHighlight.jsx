import React from 'react';
import { motion } from 'framer-motion';
import { capabilities } from '@/components/sections/CapabilitiesStrip';

export default function CapabilitiesHighlight() {
  return (
    <section className="bg-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl shadow-black/40 border border-white/10 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 lg:p-8 flex flex-col items-center text-center hover:bg-white/5 transition-colors group ${
                  index >= 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className={`${cap.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <cap.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{cap.title}</h3>
                <p className="text-gray-300 text-sm">{cap.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
