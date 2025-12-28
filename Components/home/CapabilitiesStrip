import React from 'react';
import { Factory, ShieldCheck, Award, Clock, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    icon: Factory,
    title: '700 Tons/Day',
    subtitle: 'Production Capacity',
    color: 'bg-[#7B1F32]'
  },
  {
    icon: ShieldCheck,
    title: 'Ashghal Approved',
    subtitle: 'Certified Vendor',
    color: 'bg-[#1E3A5F]'
  },
  {
    icon: Award,
    title: 'ISO Certified',
    subtitle: '9001 • 14001 • 45001',
    color: 'bg-[#7B1F32]'
  },
  {
    icon: Clock,
    title: '1–2 Hour Delivery',
    subtitle: 'Straight Bar Supply',
    color: 'bg-[#1E3A5F]'
  },
  {
    icon: Wrench,
    title: 'Custom Fabrication',
    subtitle: 'Any Shape Available',
    color: 'bg-[#7B1F32]'
  }
];

export default function CapabilitiesStrip() {
  return (
    <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 lg:p-8 flex flex-col items-center text-center border-b lg:border-b-0 border-r border-gray-100 last:border-r-0 hover:bg-gray-50/50 transition-colors group ${
                  index >= 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className={`${cap.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <cap.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{cap.title}</h3>
                <p className="text-gray-500 text-sm">{cap.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}