import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Gauge, Settings } from 'lucide-react';

const machines = [
  {
    name: 'Schnell Machines',
    description: 'Stirrup machines and barwisers for high-speed production with exceptional precision',
    features: ['Stirrup Machines', 'Barwisers', 'Automatic Operation', 'High Speed'],
    image: 'https://www.schnellgroup.com/gallery-schnell/prodotti/Bar-Wiser-28-P0.png'
  },
  {
    name: 'Oscam Lines',
    description: 'Single and double benders for versatile rebar bending operations',
    features: ['Single Benders', 'Double Benders', 'Precision Bending', 'Heavy Duty'],
    image: 'https://oscam.com/wp-content/uploads/2022/05/DiTaglio03b.jpg'
  },
  {
    name: 'MEP Machines',
    description: 'Advanced stirrup machines for complex shape fabrication',
    features: ['Stirrup Production', 'Complex Shapes', 'Tight Tolerances', 'Reliable Performance'],
    image: 'https://5.imimg.com/data5/ZG/LD/ZG/SELLER-1637136/automatic-stirrup-bending-machine.png'
  }
];

const stats = [
  { icon: Zap, value: '700+', label: 'Tons/Day Capacity' },
  { icon: Target, value: '±1mm', label: 'Cutting Accuracy' },
  { icon: Gauge, value: '32mm', label: 'Max Diameter' },
  { icon: Settings, value: '24/7', label: 'Operation Ready' }
];

export default function MachinesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#7B1F32] font-semibold tracking-wide uppercase text-sm">Our Machinery</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
            World-Class Equipment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art Schnell and Oscam machinery for unmatched precision and speed
          </p>
        </motion.div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-[#7B1F32] mx-auto mb-3" />
              <div className="text-3xl font-black text-gray-900">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Machines Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {machines.map((machine, index) => (
            <motion.div
              key={machine.name}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-gray-50 rounded-3xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={machine.image} 
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">{machine.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-600 text-lg mb-6">{machine.description}</p>
                <div className="flex flex-wrap gap-3">
                  {machine.features.map((feature) => (
                    <span 
                      key={feature}
                      className="bg-[#7B1F32]/10 text-[#7B1F32] px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}